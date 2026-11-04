import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import vm from "node:vm";

const app = { innerHTML: "" }, storage = new Map(), played = [], listeners = new Map();
let now = 1_000_000, failPlayback = false;
class Clock extends Date { static now() { return now; } }
class Sound {
  constructor(src) { this.src = src; this.listeners = new Map(); played.push(this); }
  addEventListener(name, fn) { this.listeners.set(name, [...(this.listeners.get(name) || []), fn]); }
  play() { if (failPlayback) throw new Error("missing audio"); return Promise.resolve(); }
  pause() { this.paused = true; }
  emit(name) { for (const fn of this.listeners.get(name) || []) fn(); }
}
const context = vm.createContext({
  console, Date: Clock, Audio: Sound, navigator: {}, location: { protocol: "file:" }, setTimeout, clearTimeout,
  window: { navigator: { standalone: false }, addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: false }), setInterval: () => 1, clearInterval() {}, setTimeout() {} },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
  document: { getElementById: () => app, querySelector: () => null, querySelectorAll: () => [], documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } }, addEventListener: (name, fn) => listeners.set(name, fn) }
});
const html = readFileSync(new URL("../app/index.html", import.meta.url), "utf8");
for (const [, file] of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
  if (!file.startsWith("vendor/")) vm.runInContext(readFileSync(new URL(`../app/${file}`, import.meta.url), "utf8"), context, { filename: file });
}
const run = code => vm.runInContext(code, context);
const click = dataset => listeners.get("click")({ target: { closest: () => ({ dataset }) } });
const start = mode => run(`startSession("ingles", "english-family-${mode}", "activity")`);

run(`var oldData = clone(DEFAULT_DATA); oldData.settings.studentName = 'Conservar'; oldData.subjects.find(s => s.id === 'ingles').themes = [{id:'personal',title:'Mi tema',exercises:[]}]; var migrated = normalizeData(normalizeData(oldData));`);
assert.equal(run("migrated.settings.studentName"), "Conservar");
assert.equal(run("migrated.subjects.find(s => s.id === 'ingles').themes.filter(t => t.familyMode).length"), 3);
assert.ok(run("migrated.subjects.find(s => s.id === 'ingles').themes.some(t => t.id === 'personal')"));
for (const word of run("Object.keys(FAMILY_WORDS)")) assert.ok(statSync(new URL(`../app/assets/english/family/audio/${word}.mp3`, import.meta.url)).size > 1000);
for (const person of run("Object.keys(FAMILY_PEOPLE)")) assert.ok(statSync(new URL(`../app/assets/english/family/photos/${person}.png`, import.meta.url)).size > 1000);

// Every word appears once, exactly one semantic answer, portraits match number.
for (let pass = 0; pass < 100; pass++) for (const mode of ["listen", "plural"]) {
  const rounds = run(`createFamilyExercises(FAMILY_THEMES.find(t => t.familyMode === '${mode}'))`);
  assert.equal(new Set(rounds.map(r => r.word)).size, mode === "listen" ? 8 : 4);
  for (const round of rounds) {
    assert.equal(round.options.filter(w => w === round.word).length, 1);
    assert.equal(new Set(round.options).size, round.options.length);
    for (const [word, ids] of Object.entries(round.portraits)) {
      assert.equal(ids.length, ["sisters", "brothers"].includes(word) ? 2 : 1);
      assert.equal(new Set(ids).size, ids.length);
      for (const id of ids) assert.equal(run(`FAMILY_PEOPLE['${id}'].word`), word.replace(/s$/, ""));
    }
  }
}
start("tree");
assert.ok(app.innerHTML.includes("El árbol de Ian"));
assert.equal(played.length, 0, "no audio on entry or photo selection");
click({ action: "family-person", person: "grandma-paternal" });
assert.ok(app.innerHTML.includes("Grandmother"));
click({ action: "family-group", word: "sisters" });
assert.equal(run("familyCurrent().state.word"), "sisters");
assert.equal(played.length, 0);

run('playFamilyAudio("sisters")');
assert.equal(played.length, 1);
for (const [step, delay] of [2000, 5000, 10000, 30000, 60000, 60000].entries()) {
  run('playFamilyAudio("sisters"); playFamilyAudio("brothers")');
  assert.equal(played.length, step + 1, "no overlap or rapid repeats");
  played.at(-1).emit("ended");
  now += delay - 1;
  run('playFamilyAudio("sisters")');
  assert.equal(played.length, step + 1, "delay not yet finished");
  now += 1;
  run('playFamilyAudio("sisters")');
  assert.equal(played.length, step + 2, "progressive per-word delay");
}
played.at(-1).emit("ended");
run('communicationQuickAudioStatesMemory = {}');
start("listen");
const count = played.length;
run('playFamilyAudio("sisters")');
assert.equal(played.length, count, "same limit across exercises and storage reload");
now += 2000;
run('playFamilyAudio("brothers")');
assert.equal(played.length, count + 1, "another word has its own limit");
run('setRoute({view:"home"})');
assert.ok(played.at(-1).paused);
assert.equal(run("appSpeechAudio"), null);
assert.equal(run("communicationQuickAudioRemainingMs('family-brothers')"), 2000, "interrupted sound still counts");
now += 5 * 60_000;
start("tree");
run('playFamilyAudio("sisters")');
played.at(-1).emit("ended");
assert.equal(run("communicationQuickAudioRemainingMs('family-sisters')"), 2000, "five-minute inactivity resets sequence");
now -= 60_000;
assert.equal(run("communicationQuickAudioRemainingMs('family-sisters')"), 0, "clock rollback recovers");
assert.equal(run("appSpeechRemainingMs()"), 0);
failPlayback = true;
run('playFamilyAudio("father")');
assert.equal(run("appSpeechAudio"), null);
assert.equal(run("communicationQuickAudioRemainingMs('family-father')"), 0, "failed playback can retry");
assert.ok(app.innerHTML.includes("No se pudo escuchar"));
failPlayback = false;
run('playFamilyAudio("father")');
played.at(-1).emit("error");
assert.equal(run("appSpeechAudio"), null);
assert.equal(run("familyAudio"), null);

for (const mode of ["listen", "plural"]) for (const wrong of [false, true]) {
  start(mode);
  const rounds = run("session.exercises");
  for (const round of rounds) {
    click({ action: "family-next", round: round.id });
    assert.equal(run("familyCurrent().exercise.id"), round.id, "cannot skip unanswered question");
    const bad = round.options.find(w => w !== round.word);
    click({ action: "family-choice", word: bad });
    click({ action: "family-choice", word: wrong ? bad : round.word });
    click({ action: "family-check", round: round.id });
    const answers = run("session.answers.length");
    click({ action: "family-check", round: round.id });
    click({ action: "family-choice", word: wrong ? round.word : bad });
    assert.equal(run("session.answers.length"), answers, "single check and locked answer");
    assert.equal(run("familyCurrent().state.correct"), !wrong);
    click({ action: "family-next", round: round.id });
    const index = run("session.index");
    click({ action: "family-next", round: round.id });
    assert.equal(run("session.index"), index, "stale/double next cannot skip");
  }
  assert.equal(run("session.score"), wrong ? 0 : rounds.length);
  assert.ok(app.innerHTML.includes("¡Terminaste, Ian!"));
}
console.log("Familia: 200 partidas, cuatro recorridos, fotos, migración, respuestas, pausas progresivas, navegación, reloj y errores de audio verificados.");
