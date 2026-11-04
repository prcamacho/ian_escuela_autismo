import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../app/", import.meta.url);
const storage = new Map(), app = { innerHTML: "" }, listeners = new Map();
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" },
  Audio: class { constructor() { throw new Error("Earth activity must not play audio"); } },
  window: { addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {} },
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: { getElementById: () => app, querySelector: () => null, querySelectorAll: () => [],
    documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } },
    addEventListener: (type, callback) => listeners.set(type, callback) }
});
for (const file of ["pacman-language.js", "language-missions.js", "language-scenes.js", "weight-lab.js", "technology.js", "school-arcade.js", "pacman-quests.js", "english-family.js", "earth-layers.js", "social-farm.js", "pacman-worlds.js", "pacman-discoveries.js", "app.js"]) {
  vm.runInContext(await readFile(new URL(file, root), "utf8"), context, { filename: file });
}
const run = (code) => vm.runInContext(code, context);
const click = (action, value) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, value } }) } });
const start = () => listeners.get("click")({ target: { closest: () => ({ dataset: { action: "start", subject: "cs-naturales", theme: "tierra-pacman", mode: "activity" } }) } });

// An existing installation receives exactly one activity, preserving personal data.
run(`var old = clone(DEFAULT_DATA); old.settings.studentName = 'Conservar nombre';
  old.subjects.find(s => s.id === 'cs-naturales').themes = [{id:'personal', title:'Mi tema', exercises:[]}];
  var migrated = normalizeData(normalizeData(old));`);
assert.equal(run("migrated.settings.studentName"), "Conservar nombre");
for (const id of ["personal", "tierra-pacman", "partes-planta", "plasticos"]) {
  assert.equal(run(`migrated.subjects.find(s => s.id === 'cs-naturales').themes.filter(t => t.id === '${id}').length`), 1);
}

// Real delegated events: no bypassing exploration, no unintended auto advance.
start();
assert.equal(run("session.earth.stage"), 0);
click("earth-next");
assert.equal(run("session.earth.stage"), 0);
click("earth-zoom");
assert.equal(run("session.earth.surface"), true);
click("earth-next");
assert.equal(run("session.earth.stage"), 1);
click("earth-next");
assert.equal(run("session.earth.stage"), 1);
click("earth-toggle");
assert.equal(run("session.earth.open"), true);
click("earth-toggle");
assert.equal(run("session.earth.open"), false);
click("earth-next");
assert.equal(run("session.earth.stage"), 2);
click("earth-next");
assert.equal(run("session.earth.stage"), 2);
click("earth-layer", "inner");
assert.equal(run("session.earth.layer"), "crust", "Inner core is introduced after the three main layers");
click("earth-layer", "mantle");
click("earth-layer", "core");
click("earth-split");
assert.equal(run("session.earth.split"), true);
click("earth-next");
assert.equal(run("session.earth.stage"), 2);
click("earth-layer", "inner");
click("earth-next");
assert.equal(run("session.earth.stage"), 3);

for (let index = 0; index < 6; index++) {
  const card = run("session.earth.practice[session.earth.practiceIndex]");
  click("earth-check");
  assert.equal(run("session.earth.checked"), false);
  click("earth-choice", "invalid");
  assert.equal(run("session.earth.choice"), null);
  click("earth-choice", card.correct);
  const wrong = (card.options || card.sites).find((id) => id !== card.correct);
  if (index === 0) click("earth-choice", wrong);
  assert.equal(run("session.answers.length"), index, "Choosing is editable and does not score");
  click("earth-check");
  assert.equal(run("session.answers.length"), index + 1);
  assert.equal(run("session.earth.practiceIndex"), index, "Checking does not move to another task");
  const saved = run("JSON.stringify(session.answers)");
  const choice = run("session.earth.choice");
  click("earth-choice", wrong);
  click("earth-check");
  assert.equal(run("session.earth.choice"), choice, "Answers lock after confirmation");
  assert.equal(run("JSON.stringify(session.answers)"), saved, "Double taps cannot score twice");
  click("earth-review");
  assert.equal(run("session.earth.stage"), 2);
  click("earth-layer", "crust");
  click("earth-resume");
  assert.equal(run("session.earth.stage"), 3);
  assert.equal(run("session.earth.checked"), true);
  assert.equal(run("JSON.stringify(session.answers)"), saved, "Exploring preserves the current response");
  click("earth-practice-next");
}
assert.equal(run("session.earth.finished"), true);
assert.equal(run("session.score"), 5);
assert.match(app.innerHTML, /5 de 6/);
click("earth-check"); click("earth-practice-next");
assert.equal(run("session.answers.length"), 6);
click("earth-practice-again");
assert.equal(run("session.earth.practiceIndex"), 0);
assert.equal(run("session.answers.length"), 0);
click("cancel-run");
assert.equal(run("session"), null);
assert.equal(run("route.subjectId"), "cs-naturales");

// Every generated practice has unique, valid answers, and multiple depictions.
const positions = new Set();
for (let pass = 0; pass < 120; pass++) {
  const cards = run("createEarthPractice()");
  assert.equal(cards.length, 6);
  assert.equal(cards.filter((card) => card.flat).length, 3);
  assert.equal(cards.filter((card) => card.split).length, 2);
  for (const card of cards) {
    const choices = card.options || card.sites;
    assert.equal(new Set(choices).size, choices.length);
    assert.equal(choices.filter((id) => id === card.correct).length, 1);
    positions.add(choices.indexOf(card.correct));
  }
}
assert.equal(positions.size, 4);

// With real-motion enabled, exit cancels the timeline and stale callbacks are inert.
run(`var motions = []; window.matchMedia = () => ({matches:false});
  window.gsap = { timeline(config) { var motion = {config, killed:false, kill(){this.killed=true}, from(){return this}, to(){return this}, fromTo(){return this}}; motions.push(motion); return motion; } };`);
start();
click("earth-zoom");
assert.equal(run("session.earth.busy"), true);
const motionIndex = run("motions.length - 1");
click("earth-zoom"); click("earth-next");
assert.equal(run("motions.length - 1"), motionIndex, "Controls cannot interrupt an instructional transition");
click("cancel-run");
assert.equal(run(`motions[${motionIndex}].killed`), true);
run(`motions[${motionIndex}].config.onComplete()`);
assert.equal(run("session"), null, "An old animation cannot reopen a closed session");
start();
click("earth-zoom");
run("motions[motions.length - 1].config.onComplete()");
assert.equal(run("session.earth.surface"), true);
assert.equal(run("session.earth.busy"), false);
console.log("Tierra: recorrido completo, migración, 720 desafíos, ayudas, respuestas bloqueadas, movimiento reducido y cancelación de animaciones verificados.");
