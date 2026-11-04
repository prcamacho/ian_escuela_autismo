import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import WebSocket from "ws";

const execute = promisify(execFile);
const mode = process.argv[2];
if (!["snapshot", "verify"].includes(mode)) throw Error("Use snapshot before updating, then verify.");
const serial = process.argv[3] || "R8MT100KBQD";
if (!["R8MT100KBQD", "3109RH1010027680"].includes(serial)) throw Error("Unknown tablet.");
const adbPath = `${process.env.ANDROID_HOME || "C:/Users/pablo/AppData/Local/Android/Sdk"}/platform-tools/adb.exe`;
const adb = async (...args) => (await execute(adbPath, ["-s", serial, ...args], { windowsHide: true })).stdout.trim();
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const pid = (await adb("shell", "pidof", "com.ian.escuela")).split(/\s+/)[0];
assert.match(pid, /^\d+$/);
await adb("forward", "tcp:9224", `localabstract:webview_devtools_remote_${pid}`);
const pages = await (await fetch("http://127.0.0.1:9224/json/list")).json();
const page = pages.find(item => item.type === "page" && item.url.startsWith("https://localhost"));
assert.ok(page, "App WebView not found");
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.once("open", resolve); socket.once("error", reject); });
let nextId = 0;
const pending = new Map();
socket.on("message", bytes => {
  const result = JSON.parse(bytes.toString());
  const item = pending.get(result.id);
  if (!item) return;
  pending.delete(result.id); clearTimeout(item.timeout);
  if (result.error) item.reject(Error(result.error.message)); else item.resolve(result.result);
});
function command(method, params) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timeout = setTimeout(() => { pending.delete(id); reject(Error(`Timed out: ${method}`)); }, 20_000);
    pending.set(id, { resolve, reject, timeout }); socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, timeout: 15_000 });
  if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
const snapshotExpression = `(() => {
  const storyKey = key => key.startsWith('ian-story-') || key === 'ian-escuela-story-progress-v1';
  const entries = Object.entries(localStorage).sort(([a],[b]) => a.localeCompare(b));
  return { story: entries.filter(([key]) => storyKey(key)), other: entries.filter(([key]) => !storyKey(key)),
    route: JSON.parse(JSON.stringify(route)), support: JSON.parse(JSON.stringify(storySupportState)), playing: Boolean(storyAudio || appSpeechAudio || (typeof storyFilm !== 'undefined' && storyFilm?.session)),
    multiplication: {table:multiplicationSupportTable, current:multiplicationSupportCurrent, deck:multiplicationSupportDeck,
      played:multiplicationSupportAudioPlayed, unlocked:multiplicationSupportReplayUnlocked, error:multiplicationSupportAnswerError,
      nextAt:multiplicationAudioNextAtMemory, speechNextAt:appSpeechNextAtMemory} };
})()`;
const checksum = entries => createHash("sha256").update(JSON.stringify(entries)).digest("hex");
const directory = new URL("../tmp/story-policy-device/", import.meta.url);
const backupPath = new URL(`${serial}.json`, directory);
let originalVolume, saved;
try {
  if (mode === "snapshot") {
    let current = await evaluate(snapshotExpression);
    const until = Date.now() + 40_000;
    if (current.playing) console.log("Esperando a que termine la locución actual antes de guardar el estado.");
    while (current.playing && Date.now() < until) { await delay(1000); current = await evaluate(snapshotExpression); }
    assert.equal(current.playing, false, "Wait until the current narration ends before updating");
    const backup = { ...current, otherChecksum: checksum(current.other) };
    delete backup.other;
    await mkdir(directory, { recursive: true });
    await writeFile(backupPath, JSON.stringify(backup, null, 2));
    console.log("Estado previo guardado; los datos de otras secciones se comprobarán mediante su huella.");
  } else {
    const before = JSON.parse(await readFile(backupPath, "utf8"));
    saved = await evaluate(snapshotExpression);
    assert.equal(checksum(saved.other), before.otherChecksum, "Update must preserve all other app data");
    const status = () => evaluate("window.Capacitor.Plugins.StoryVolume.status()");
    const native = async (method, token) => evaluate(`window.Capacitor.Plugins.StoryVolume.${method}({token:${JSON.stringify(token)}})`);
    const setVolume = level => adb("shell", "cmd", "media_session", "volume", "--stream", "3", "--set", String(level));
    const press = (key, count) => adb("shell", "input", "keyevent", ...Array(count).fill(String(key)));
    const initial = await status(); originalVolume = initial.current;
    const ceiling = Math.floor(initial.maximum * 0.7);

    await setVolume(initial.maximum);
    let result = await native("begin", "verify-restore");
    assert.equal(result.current, ceiling); assert.equal(result.active, true);
    result = await native("end", "verify-restore"); assert.equal(result.current, initial.maximum);

    await setVolume(Math.min(3, ceiling));
    result = await native("begin", "verify-lower"); assert.equal(result.current, Math.min(3, ceiling));
    await native("end", "verify-lower");

    await setVolume(initial.maximum);
    await native("begin", "verify-buttons");
    await press(24, 12); result = await status(); assert.equal(result.current, ceiling);
    await native("refresh", "verify-buttons");
    await press(25, 3); result = await status(); assert.equal(result.current, ceiling - 3);
    await press(24, 1); result = await status(); assert.equal(result.current, ceiling - 2);
    result = await native("end", "verify-buttons"); assert.equal(result.current, ceiling - 2); assert.equal(result.active, false);

    await native("begin", "verify-external");
    await setVolume(initial.maximum); await delay(700);
    result = await status(); assert.ok(result.current <= ceiling);
    await native("end", "verify-external");
    await setVolume(ceiling); await press(24, 1);
    result = await status(); assert.ok(result.current > ceiling, "Physical buttons return to normal outside narration");
    await setVolume(originalVolume);
    console.log(`Botones verificados: techo ${ceiling}/${initial.maximum}, bajar/subir, nivel inicial menor y restauración.`);

    await evaluate(`(() => {
      for (const key of Object.keys(localStorage)) if (key.startsWith('ian-story-')) localStorage.removeItem(key);
      storyAudioCooldownMemory = {}; storyListeningMemory = null;
      storySupportState = {id: STORY_BOOKS[0].id, scene: 0, panel: 'read'};
      setRoute({view:'support-story'});
    })()`);
    const waitFor = async (expression, timeout = 12_000) => {
      const until = Date.now() + timeout;
      while (Date.now() < until) { if (await evaluate(expression)) return; await delay(150); }
      throw Error(`Condition did not complete: ${expression}`);
    };
    const playScene = async () => {
      await evaluate("storyPlayAudio()");
      await waitFor("Boolean(storyAudio && !storyAudio.paused && storyAudio.currentTime > 0)");
      const current = await status(); assert.equal(current.active, true); assert.ok(current.current <= ceiling);
      await evaluate("storyAudio.playbackRate = 8");
      await waitFor("storyAudio === null");
      await waitFor("window.Capacitor.Plugins.StoryVolume.status().then(value => !value.active)");
    };
    await playScene();
    let remaining = await evaluate("storyAudioRemainingMs()"); assert.ok(remaining > 295_000 && remaining <= 300_000);
    assert.equal(await evaluate("storyListening().readings[STORY_BOOKS[0].id].heard.length"), 1);
    await evaluate("storyPlayAudio()"); assert.equal(await evaluate("storyAudio === null"), true);
    await evaluate("storySupportAction('story-next', {dataset:{}})");
    assert.equal(await evaluate("storyAudioRemainingMs()"), 0); await playScene();
    await evaluate("setRoute({view:'support-stories'}); storySupportAction('story-open', {dataset:{value:STORY_BOOKS[1].id}})");
    remaining = await evaluate("storyAudioRemainingMs()"); assert.ok(remaining > 295_000 && remaining <= 300_000);
    assert.equal(await evaluate("document.querySelector('[data-action=story-listen]').disabled"), true);

    // Seed only this isolated test reading, then verify that a real final audio
    // completes it and activates the two-minute rule.
    await evaluate(`(() => {
      const id = STORY_BOOKS[0].id;
      storySupportState = {id, scene: 7, panel:'read'};
      storyListening().readings[id].heard = [0,1,2,3,4,5,6];
      setRoute({view:'support-story'});
    })()`);
    await playScene(); assert.equal(await evaluate("storyListening().last.complete"), true);
    await evaluate("setRoute({view:'support-stories'}); storySupportAction('story-open', {dataset:{value:STORY_BOOKS[1].id}})");
    remaining = await evaluate("storyAudioRemainingMs()"); assert.ok(remaining > 115_000 && remaining <= 120_000);
    console.log("Locuciones reales verificadas: repetición 5 minutos, siguiente inmediata y cambio de cuento 5/2 minutos.");

    await evaluate("setAppSpeechNextAt(0); setMultiplicationAudioNextAt(0); openSupportMultiplication()");
    await setVolume(initial.maximum);
    await evaluate(`(() => {
      playMultiplicationSupportAudio();
      const audio = multiplicationSupportAudio;
      audio.loop = true;
      window.__volumeAuditAudio = audio;
      window.__volumeAuditEvents = [];
      for (const type of ['playing','pause','ended','error']) audio.addEventListener(type, () => window.__volumeAuditEvents.push({type,time:audio.currentTime}));
    })()`);
    await waitFor("Boolean(multiplicationSupportAudio && !multiplicationSupportAudio.paused && multiplicationSupportAudio.currentTime > 0)");
    result = await status(); assert.equal(result.active, true); assert.equal(result.current, ceiling);
    await press(24, 12); result = await status();
    assert.equal(result.active, true); assert.ok(result.current <= ceiling);
    const beforeDown = result.current;
    await press(25, 1); result = await status(); assert.ok(result.current < beforeDown);
    const chosenVolume = result.current;
    await evaluate("if(multiplicationSupportAudio) { multiplicationSupportAudio.loop = false; multiplicationSupportAudio.playbackRate = 8; }");
    await waitFor("appSpeechAudio === null");
    await waitFor("window.Capacitor.Plugins.StoryVolume.status().then(value => !value.active)");
    result = await status(); assert.equal(result.current, chosenVolume);
    assert.equal(await evaluate("multiplicationSupportAudioPlayed && !multiplicationSupportReplayUnlocked"), true);

    await evaluate("setAppSpeechNextAt(0); setMultiplicationAudioNextAt(0); showNextMultiplicationSupportOperation(); playMultiplicationSupportAudio(); showNextMultiplicationSupportOperation()");
    await waitFor("window.Capacitor.Plugins.StoryVolume.status().then(value => !value.active)");
    assert.equal(await evaluate("appSpeechAudio === null"), true);
    console.log("Tablas verificadas: locución real con techo de volumen, botones, respuesta para repetir y liberación al cambiar de operación.");
  }
} finally {
  if (saved) {
    await evaluate(`(() => {
      storyAudio?.storyFinish?.();
      stopMultiplicationSupportAudio();
      delete window.__volumeAuditAudio; delete window.__volumeAuditEvents;
      for (const key of Object.keys(localStorage)) if (key.startsWith('ian-story-') || key === 'ian-escuela-story-progress-v1') localStorage.removeItem(key);
      for (const [key,value] of ${JSON.stringify(saved.story)}) localStorage.setItem(key,value);
      for (const key of ['ian-multiplication-audio-next-at-v1','ian-app-speech-next-at-v1']) localStorage.removeItem(key);
      for (const [key,value] of ${JSON.stringify(saved.other.filter(([key]) => ["ian-multiplication-audio-next-at-v1", "ian-app-speech-next-at-v1"].includes(key)))}) localStorage.setItem(key,value);
      const multiplication = ${JSON.stringify(saved.multiplication)};
      multiplicationSupportTable = multiplication.table;
      multiplicationSupportCurrent = multiplication.current;
      multiplicationSupportDeck = multiplication.deck;
      multiplicationSupportAudioPlayed = multiplication.played;
      multiplicationSupportReplayUnlocked = multiplication.unlocked;
      multiplicationSupportAnswerError = multiplication.error;
      multiplicationAudioNextAtMemory = multiplication.nextAt;
      appSpeechNextAtMemory = multiplication.speechNextAt;
      storyAudioCooldownMemory = {}; storyListeningMemory = null;
      storySupportState = ${JSON.stringify(saved.support)};
      setRoute(${JSON.stringify(saved.route)});
    })()`);
    if (originalVolume !== undefined) await adb("shell", "cmd", "media_session", "volume", "--stream", "3", "--set", String(originalVolume));
    const restored = await evaluate(snapshotExpression);
    assert.equal(checksum(restored.other), checksum(saved.other), "Device checks must not alter school data");
    console.log("Estado de lectura y volumen restaurados; datos de otras secciones conservados.");
  }
  socket.close();
  await adb("forward", "--remove", "tcp:9224");
}
