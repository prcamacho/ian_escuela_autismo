import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import vm from "node:vm";
const flush = () => new Promise(resolve => setImmediate(resolve));

const html = await readFile(new URL("../app/index.html", import.meta.url), "utf8");
const sources = await Promise.all([...html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)]
  .map(([, file]) => file).filter(file => !file.startsWith("vendor/"))
  .map(async file => [file, await readFile(new URL(`../app/${file}`, import.meta.url), "utf8")]));

function createApp({ storage = new Map(), volume } = {}) {
  const app = { innerHTML: "" }, listeners = new Map(), windowListeners = new Map(), audios = [];
  let now = 1_000_000;
  class TestDate extends Date { static now() { return now; } }
  class AudioMock {
    constructor(src) { this.src = src; this.currentTime = 0; this.paused = true; audios.push(this); }
    play() {
      if (AudioMock.failNext) { AudioMock.failNext = false; throw Error("Playback unavailable"); }
      this.paused = false; this.onplaying?.(); return Promise.resolve();
    }
    pause() { this.mutedAtPause = this.muted; this.paused = true; }
  }
  const context = vm.createContext({ console, Date: TestDate, Audio: AudioMock, navigator: {}, location: { protocol: "file:" },
    window: { navigator: {}, addEventListener: (name, callback) => windowListeners.set(name, callback), scrollTo() {},
      matchMedia: () => ({ matches: false }), setTimeout() {}, speechSynthesis: {},
      ...(volume ? { Capacitor: { isNativePlatform: () => true, Plugins: { StoryVolume: volume } } } : {}) },
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    document: { getElementById: () => app, querySelector: () => null, documentElement: { classList: { toggle() {} } },
      body: { classList: { toggle() {} } }, addEventListener: (name, callback) => listeners.set(name, callback) }
  });
  for (const [file, source] of sources) vm.runInContext(source, context, { filename: file });
  const run = code => vm.runInContext(code, context);
  const click = (action, value) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, value } }) } });
  const books = JSON.parse(run("JSON.stringify(STORY_BOOKS)"));
  const open = id => { click("story-library"); click("story-open", id); };
  const finish = (duration = 10_000) => { now += duration; const audio = audios.at(-1); audio.ended = true; audio.paused = true; audio.onended?.(); };
  const complete = () => {
    for (let index = run("storySupportState.scene"); index < 8; index++) {
      const before = audios.length; click("story-listen"); assert.equal(audios.length, before + 1); finish(1000);
      if (index < 7) click("story-next");
    }
  };
  return { app, context, run, click, books, open, audios, storage, finish, complete, AudioMock, windowListeners,
    setHidden: hidden => { context.document.hidden = hidden; listeners.get('visibilitychange')(); },
    advance: ms => { now += ms; }, setNow: value => { now = value; }, now: () => now,
    remaining: () => run("storyAudioRemainingMs()"), state: () => JSON.parse(run("JSON.stringify(storyListening())")) };
}

const initial = createApp(), books = initial.books;
assert.equal(books.length, 7);
const [A, B, C] = books.map(book => book.id);
const audited = new Set();

// Every scene and helper: manual playback, end-based exact deadlines, persisted
// waits, no auto playback, and navigation locked for the entire narration.
for (const book of books) {
  const h = createApp();
  const schoolBefore = h.run("JSON.stringify(data)");
  h.click("supports"); assert.match(h.app.innerHTML, /Cuentos/);
  h.open(book.id); assert.equal(h.audios.length, 0);
  const sections = [...book.scenes.map((_, scene) => ({ scene, panel: "read", slot: `scene-${scene + 1}` })),
    ...Object.keys(book.helps).map(panel => ({ scene: 7, panel, slot: `help-${panel}` }))];
  for (const section of sections) {
    h.run(`storySupportState.scene=${section.scene}; render()`); h.click("story-panel", section.panel);
    assert.equal(h.remaining(), 0, "A different section of the same book is immediately available");
    const before = h.audios.length;
    h.click("story-listen"); assert.equal(h.audios.length, before + 1);
    const snapshot = h.run("JSON.stringify(storySupportState)"), screen = h.app.innerHTML;
    for (const action of ["story-next", "story-restart", "story-library", "story-stop", "supports", "home", "story-listen"]) h.click(action);
    h.click("story-panel", "read"); h.run("setRoute({view:'home'});render();stopStoryMedia()");
    assert.equal(h.run("JSON.stringify(storySupportState)"), snapshot);
    assert.equal(h.app.innerHTML, screen);
    assert.equal(h.run("route.view"), "support-story");
    assert.equal(h.audios.length, before + 1);
    assert.equal(h.audios.at(-1).paused, false);
    h.finish(12_000); assert.equal(h.remaining(), 300_000, "Five minutes start at the end, not the beginning");
    h.run("storyAudioCooldownMemory={}"); h.open(book.id); h.click("story-panel", section.panel);
    assert.equal(h.remaining(), 300_000);
    h.advance(299_999); h.click("story-listen"); assert.equal(h.audios.length, before + 1);
    assert.equal(h.remaining(), 1);
    h.advance(1); assert.equal(h.run("storyAudio"), null, "Expiry never starts audio");
    h.click("story-listen"); assert.equal(h.audios.length, before + 2); h.finish();
    audited.add(`${book.id}:${section.slot}`);
  }
  assert.equal(h.state().last.complete, true, "Helpers are optional for completion");
  assert.equal(h.run("JSON.stringify(data)"), schoolBefore);
  assert.doesNotMatch(h.app.innerHTML, /story-prev|story-pause|story-bottom|Repaso/);
}
assert.equal(audited.size, 70);

// Screen lock is a lifecycle interruption, even though user navigation is
// locked. It must stop every scene/helper without completing the reading.
let interrupted = 0;
for (const book of books) {
  const h = createApp(); h.open(book.id);
  const sections = [...book.scenes.map((_, scene) => ({scene,panel:'read'})),
    ...Object.keys(book.helps).map(panel=>({scene:7,panel}))];
  for(const section of sections){
    h.run(`storySupportState.scene=${section.scene};render()`);h.click('story-panel',section.panel);
    h.click('story-listen');
    const audio=h.audios.at(-1), count=h.audios.length;
    assert.equal(h.run('storyInteractionLocked()'),true);
    h.advance(1200);h.setHidden(true);
    assert.equal(audio.paused,true,`${book.id}: ${section.panel} must stop when hidden`);
    assert.equal(audio.mutedAtPause,true,'Silence before pausing and restoring volume');
    assert.equal(h.run('storyAudio'),null);
    assert.equal(h.run('storyInteractionLocked()'),false);
    assert.equal(h.state().pending,null);
    assert.equal(h.state().readings[book.id].heard.length,0,'Interrupted scenes never count as completed');
    assert.equal(h.remaining(),300000,'Five minutes start at interruption');
    h.setHidden(false);
    assert.equal(h.audios.length,count,'Unlocking never resumes narration');
    h.click('story-listen');assert.equal(h.audios.length,count);
    h.run('storyAudioCooldownMemory={}');assert.equal(h.remaining(),300000);
    h.advance(300000);
    interrupted++;
  }
}
assert.equal(interrupted,70);

{
  const h=createApp();h.open(A);h.setHidden(true);
  h.run('storyPlayAudio()');assert.equal(h.audios.length,0,'A hidden page cannot start a narration');
}

{
  let allow;
  const calls=[];
  const h=createApp({volume:{begin:()=>new Promise(resolve=>{allow=resolve;}),end:args=>{calls.push(args);return Promise.resolve();}}});
  h.open(A);h.click('story-listen');
  const audio=h.audios.at(-1);
  h.setHidden(true);h.setHidden(false);allow();await flush();
  assert.equal(audio.paused,true,'A late native response cannot start audio after screen lock');
  assert.equal(audio.mutedAtPause,true);assert.equal(h.run('storyAudio'),null);
  assert.ok(calls.length>0);assert.equal(h.state().pending,null);
}

{
  const h = createApp(); h.open(A); h.click("story-listen"); h.finish();
  h.open(B); assert.equal(h.remaining(), 300_000);
  h.advance(240_000); h.click("story-listen"); assert.equal(h.audios.length, 1);
  h.open(C); assert.equal(h.remaining(), 60_000, "Browsing and blocked taps never restart the clock");
  h.open(A); h.click("story-next"); assert.equal(h.remaining(), 0);
  h.click("story-panel", Object.keys(books[0].helps)[0]); assert.equal(h.remaining(), 0);
  h.open(B); h.advance(59_999); assert.equal(h.remaining(), 1);
  h.advance(1); h.click("story-listen"); assert.equal(h.audios.length, 2); h.finish();
  h.open(C); assert.equal(h.remaining(), 300_000, "The last audible book becomes the new source");
}

{
  const h = createApp(); h.open(A);
  for (let i = 0; i < 7; i++) h.click("story-next");
  h.click("story-listen"); h.finish(); h.open(B);
  assert.equal(h.remaining(), 300_000, "Skipping to the final scene does not complete a book");
}

{
  const h = createApp(); h.open(A); h.complete();
  assert.equal(h.state().last.complete, true);
  h.open(B); assert.equal(h.remaining(), 120_000);
  h.advance(119_999); h.click("story-listen"); assert.equal(h.audios.length, 8);
  h.advance(1); h.click("story-listen"); h.finish();
  h.open(A); assert.equal(h.remaining(), 300_000);
  h.advance(300_000); h.click("story-listen"); h.finish();
  assert.equal(h.state().readings[A].heard.length, 1, "Returning to an already completed book starts a fresh reading");
  h.open(C); assert.equal(h.remaining(), 300_000, "A past completion is not a permanent two-minute privilege");
}

{
  const h = createApp(); h.open(B); h.complete(); h.advance(120_000);
  h.open(A); h.complete(); h.open(B);
  assert.equal(h.remaining(), 172_000, "The target scene's five-minute wait can exceed the source's two-minute wait");
  h.advance(120_000); assert.equal(h.remaining(), 52_000);
}

{
  const h = createApp(); h.open(A); h.complete(); h.click("story-restart");
  assert.ok(h.remaining() > 0, "Restart never clears per-scene waits");
  h.advance(300_000); h.click("story-listen"); h.finish();
  assert.equal(h.state().readings[A].heard.length, 1); h.open(B); assert.equal(h.remaining(), 300_000);
}

{
  const h = createApp(); h.open(A); h.click("story-listen"); h.finish();
  const next = createApp({ storage: h.storage }); next.setNow(h.now()); next.open(B);
  assert.equal(next.remaining(), 300_000, "Cross-book waits survive a full reload");
  next.open(A); next.click("story-next"); assert.equal(next.remaining(), 0);
  for (let i = 1; i < 8; i++) { next.click("story-listen"); next.finish(); if (i < 7) next.click("story-next"); }
  next.open(B); assert.equal(next.remaining(), 120_000, "A reading can be completed over several visits");
}

{
  const h = createApp(); h.open(A); h.click("story-listen"); h.advance(7000); h.audios.at(-1).ontimeupdate();
  const next = createApp({ storage: h.storage }); next.setNow(h.now()); next.open(B);
  assert.equal(next.remaining(), 300_000, "An abruptly closed process preserves the latest playback time");
  assert.deepEqual(next.state().readings[A].heard, []);
  next.open(A); assert.equal(next.remaining(), 300_000);
}

{
  const h = createApp(); h.open(A); h.AudioMock.failNext = true; h.click("story-listen");
  assert.equal(h.remaining(), 0); assert.equal(h.state().last, null);
  h.click("story-listen"); h.advance(5000); h.audios.at(-1).onerror();
  assert.equal(h.remaining(), 300_000); assert.deepEqual(h.state().readings[A].heard, []);
  h.open(B); assert.equal(h.remaining(), 300_000);
}

{
  const h = createApp(); h.open(A); h.click("story-listen"); h.advance(4000);
  h.windowListeners.get("pagehide")();
  assert.equal(h.run("storyAudio"), null); assert.equal(h.remaining(), 300_000);
  assert.deepEqual(h.state().readings[A].heard, []);
}

{
  const h = createApp(); h.open(A); h.click("story-listen"); h.finish();
  h.context.localStorage.getItem = h.context.localStorage.setItem = () => { throw Error("Storage unavailable"); };
  h.open(B); assert.equal(h.remaining(), 300_000, "Memory retains restrictions when storage fails");
}

// Native playback waits for the real ceiling and releases it on every exit.
{
  const calls = []; let allow;
  const volume = { begin: args => { calls.push(["begin", args.token]); return new Promise(resolve => { allow = resolve; }); },
    refresh: args => { calls.push(["refresh", args.token]); return Promise.resolve(); },
    end: args => { calls.push(["end", args.token]); return Promise.resolve(); } };
  const h = createApp({ volume }); h.open(A); h.click("story-listen");
  assert.equal(h.audios.at(-1).paused, true); h.click("story-listen"); assert.equal(h.audios.length, 1);
  allow(); await flush(); assert.equal(h.audios.at(-1).paused, false);
  h.advance(1000); h.audios.at(-1).ontimeupdate(); assert.equal(calls.at(-1)[0], "refresh");
  h.finish(); assert.equal(calls.at(-1)[0], "end");
  h.click("story-next"); h.click("story-listen"); h.windowListeners.get("pagehide")();
  allow(); await flush(); assert.equal(h.audios.at(-1).paused, true);
  h.click("story-listen"); allow(); await flush();
  h.audios.at(-1).onerror(); assert.equal(calls.at(-1)[0], "end");
}

{
  const h = createApp({ volume: { begin: () => Promise.reject(Error("Native volume unavailable")), end: () => Promise.resolve() } });
  h.open(A); h.click("story-listen"); await flush();
  assert.equal(h.audios.at(-1).paused, true); assert.equal(h.remaining(), 0); assert.equal(h.state().last, null);
}

{
  const h = createApp(), slot = `${A}:help-ages`;
  const key = h.run("STORY_AUDIO_LEGACY_COOLDOWN_PREFIX") + slot;
  h.storage.set(key, String(h.now() + 60_000));
  const deadline = h.now() + 240_000;
  assert.equal(h.run(`storyAudioNextAt(${JSON.stringify(slot)})`), deadline);
  h.advance(10_000); h.run("storyAudioCooldownMemory={}");
  assert.equal(h.run(`storyAudioNextAt(${JSON.stringify(slot)})`), deadline);
  h.setNow(deadline); assert.equal(h.run(`storyAudioNextAt(${JSON.stringify(slot)})`), 0);
  h.storage.set(key, "invalid"); assert.equal(h.run(`storyAudioNextAt(${JSON.stringify(slot)})`), 0);
}

for (const book of books) {
  const base = new URL(`../app/assets/stories/${book.id}/`, import.meta.url);
  const texts = JSON.parse(await readFile(new URL("audio/texts.json", base), "utf8"));
  const expected = { ...Object.fromEntries(book.scenes.map((scene, i) => [`scene-${String(i + 1).padStart(2, "0")}`, scene.text])),
    ...Object.fromEntries(Object.entries(book.helps).map(([key, value]) => [key, value.text])) };
  assert.deepEqual(texts, expected, "Narration must match the displayed text");
  for (const name of Object.keys(expected)) assert.ok((await stat(new URL(`audio/${name}.mp3`, base))).size > 1000);
  for (let i = 0; i < book.scenes.length; i++) await stat(new URL(`scene-${String(i + 1).padStart(2, "0")}.jpg`, base));
  await stat(new URL("cover.jpg", base));
  for (const helper of Object.values(book.helps)) for (const item of helper.images || []) await stat(new URL(item.file, base));
}

const workerListeners = new Map();
const worker = vm.createContext({ URL, Response, Request, console, self: { addEventListener: (name, callback) => workerListeners.set(name, callback) },
  caches: { match: async () => new Response(Uint8Array.from({ length: 16 }, (_, i) => i), { headers: { "Content-Type": "video/mp4" } }) },
  fetch: () => { throw Error("Offline test must use the cache"); } });
vm.runInContext(await readFile(new URL("../app/service-worker.js", import.meta.url), "utf8"), worker);
for (const [range, status, bytes] of [["bytes=0-3", 206, [0, 1, 2, 3]], ["bytes=14-", 206, [14, 15]], ["bytes=-3", 206, [13, 14, 15]], ["bytes=12-999", 206, [12, 13, 14, 15]], ["bytes=99-", 416, []]]) {
  let response; workerListeners.get("fetch")({ request: new Request("https://localhost/clip.mp4", { headers: { Range: range } }), respondWith: value => response = value });
  const result = await response; assert.equal(result.status, status); assert.deepEqual([...new Uint8Array(await result.arrayBuffer())], bytes);
}
console.log("Cuentos verificados: 70 audios, interrupción al ocultar/bloquear sin completar la escena ni reanudar sola, cinco minutos desde el final, cambio de cuento 2/5 minutos, lecturas completas, persistencia, fallos y puente de volumen Android.");
