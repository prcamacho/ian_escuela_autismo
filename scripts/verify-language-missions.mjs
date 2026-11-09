import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const storage = new Map();
const appElement = { innerHTML: "" };
const listeners = new Map();
const silentOnly = () => { throw new Error("Language missions must never request audio or speech"); };
const context = vm.createContext({
  console, Audio: silentOnly,
  window: { IAN_COMPANION_ENABLED: true, scrollY: 0, addEventListener() {}, scrollTo() {}, setTimeout() {}, matchMedia: () => ({ matches: false }), speechSynthesis: { speak: silentOnly } },
  navigator: {}, location: { protocol: "file:" },
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: { getElementById: () => appElement, querySelector: () => null, documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } }, addEventListener: (event, callback) => listeners.set(event, callback) }
});
const scriptFiles = [...(await readFile(new URL("../app/index.html", import.meta.url), "utf8"))
  .matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)]
  .map(match => match[1]).filter(file => !file.startsWith("vendor/"));
for (const file of scriptFiles) vm.runInContext(await readFile(new URL(`../app/${file}`, import.meta.url), "utf8"), context, { filename: file });
const run = (source) => vm.runInContext(source, context);
const click = (action, dataset = {}) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, ...dataset } }) } });
const current = () => run("session.exercises[session.index]");
const state = () => run("currentLanguageMission().state");

run(`var before = clone(DEFAULT_DATA); before.settings.studentName = "Ian conservado"; before.subjects.find(s => s.id === "lengua").themes = before.subjects.find(s => s.id === "lengua").themes.filter(t => !t.missionMode); before.subjects.find(s => s.id === "lengua").themes.push({ id: "personal", title: "Personal", exercises: [] }); var after = normalizeData(normalizeData(before));`);
assert.equal(run('after.settings.studentName'), "Ian conservado");
assert.equal(run('after.subjects.find(s => s.id === "lengua").themes.filter(t => t.missionMode).length'), 5);
assert.equal(run('after.subjects.find(s => s.id === "lengua").themes.filter(t => t.id === "personal").length'), 1);
assert.equal(run('after.subjects.find(s => s.id === "lengua").themes.filter(t => !t.arcadeMode && !t.questMode && !t.worldMode && !t.discoveryMode && !t.expeditionMode).slice(0, 5).every(t => Boolean(t.missionMode))'), true);

const themes = run("LANGUAGE_MISSION_THEMES");
for (const theme of themes) {
  const seen = new Set();
  const poolSize = theme.missionMode === "bag" ? 8 : theme.missionMode === "sequence" ? 6 : 12;
  // Same position must not encode correctness; complete banks must be visited between plays.
  const positions = new Set();
  storage.set(`ian-language-mission-bag-v1-${theme.missionMode}`, "not valid json");
  for (let i = 0; i < 120; i++) {
    const rounds = run(`createLanguageMissionExercises(LANGUAGE_MISSION_THEMES.find(t => t.id === ${JSON.stringify(theme.id)}))`);
    assert.equal(rounds.length, theme.randomExerciseCount);
    assert.equal(new Set(rounds.map(r => r.sourceId)).size, rounds.length);
    for (const round of rounds) {
      seen.add(round.sourceId);
      if (["scene", "repair"].includes(round.mode)) {
        assert.equal(new Set(round.options).size, 4);
        assert.ok(round.options.includes(round.verb));
        positions.add(round.options.indexOf(round.verb));
      }
      if (round.mode === "bag") {
        assert.ok(round.needed.length >= 3 && round.extra.length >= 3);
        assert.equal(new Set(round.options).size, round.options.length);
        assert.ok(round.needed.every(id => round.options.includes(id)));
        assert.ok(round.extra.every(id => !round.needed.includes(id)));
      }
      if (round.order) {
        assert.equal(new Set(round.order).size, round.order.length);
        assert.ok(round.order.some((value, index) => value !== index), "The initial order cannot be solved already");
      }
    }
    if (i === 2) assert.equal(seen.size, poolSize, "Bank is covered before repeatedly serving the same small set");
  }
  if (positions.size) assert.equal(positions.size, 4);
}

function chooseCorrect(round) {
  if (round.mode === "scene") click("lm-pick", { value: round.verb });
  if (round.mode === "repair") {
    click("lm-word", { index: String(round.verbIndex) });
    click("lm-pick", { value: round.verb });
  }
  if (round.mode === "bag") for (const id of round.needed) click("lm-pick", { value: id });
  if (["words", "sequence"].includes(round.mode)) for (let index = 0; index < round.order.length; index++) click("lm-place", { index: String(index) });
}
function chooseWrong(round) {
  if (round.mode === "scene") click("lm-pick", { value: round.options.find(v => v !== round.verb) });
  if (round.mode === "repair") { click("lm-word", { index: "0" }); click("lm-pick", { value: round.verb }); }
  if (round.mode === "bag") { for (const id of round.needed) click("lm-pick", { value: id }); click("lm-pick", { value: round.extra[0] }); }
  if (["words", "sequence"].includes(round.mode)) {
    const order = round.order.slice();
    // Force a noncanonical answer even if identical articles were exchanged.
    if (round.mode === "words") {
      while (order.map(i => round.words[i]).join(" ") === round.words.join(" ")) order.push(order.shift());
    }
    for (const index of order) click("lm-place", { index: String(index) });
  }
}
for (const theme of themes) for (const valid of [true, false]) {
  click("start", { subject: "lengua", theme: theme.id, mode: "activity" });
  assert.match(appElement.innerHTML, /lm-runner/);
  const total = run("session.exercises.length");
  for (let index = 0; index < total; index++) {
    const round = current();
    click("lm-check"); click("lm-next");
    assert.equal(run("session.index"), index, "Empty answers cannot advance");
    const untouched = JSON.stringify(state());
    click("lm-pick", { value: "invalid" }); click("lm-place", { index: "-1" }); click("lm-return", { position: "100" }); click("lm-word", { index: "100" });
    assert.equal(JSON.stringify(state()), untouched, "Malformed touches are ignored");
    if (valid) chooseCorrect(round); else chooseWrong(round);
    assert.equal(run("session.answers.length"), index, "Choosing must not reveal correctness");
    click("lm-check");
    assert.equal(state().isCorrect, valid);
    assert.equal(run("session.answers.length"), index + 1);
    const frozen = JSON.stringify(state());
    click("lm-check"); click("lm-pick", { value: round.options?.[0] }); click("lm-return", { position: "0" }); click("lm-place", { index: "0" }); click("lm-word", { index: "1" });
    assert.equal(JSON.stringify(state()), frozen, "All answers must remain frozen after one confirmation");
    assert.equal(run("session.answers.length"), index + 1, "Double check cannot duplicate score");
    assert.equal(run("session.score"), valid ? index + 1 : 0);
    assert.match(appElement.innerHTML, /lm-feedback/);
    assert.doesNotMatch(appElement.innerHTML, /<audio|Escuchar|speaker/);
    click("lm-next");
  }
  assert.match(appElement.innerHTML, /¡Misión terminada!/);
  click("cancel-run");
  assert.equal(run("session"), null);
  assert.equal(run("route.view"), "subject");
  for (const item of themes) assert.ok(appElement.innerHTML.includes(item.title));
}

// Removing a middle token preserves the relative order and returns only that token.
click("start", { subject: "lengua", theme: "lengua-camino", mode: "activity" });
click("lm-place", { index: "0" }); click("lm-place", { index: "1" }); click("lm-place", { index: "2" }); click("lm-place", { index: "1" });
assert.equal(state().placed.join(","), "0,1,2");
click("lm-return", { position: "1" });
assert.equal(state().placed.join(","), "0,2");
// Repeated words have interchangeable IDs, while their visible order still matters.
run(`session.exercises[0] = { id: session.exercises[0].id, type: "language-mission", mode: "words", subject: "El nene", verb: "salta", complement: "sobre el tronco", words: ["el", "nene", "salta", "sobre", "el", "tronco"], order: [4,1,2,3,0,5] }; currentLanguageMission().state.placed = [4,1,2,3,0,5];`);
click("lm-check");
assert.equal(state().isCorrect, true);
click("cancel-run");
console.log("Lengua: 600 partidas, cinco recorridos correctos e incorrectos, migración, bolsas, fichas, bloqueo y ausencia de audio verificados.");
