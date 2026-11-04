import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" },
  Audio: class { constructor() { throw Error("The farm must be silent"); } },
  window: { addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {} },
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: { getElementById: () => app, querySelector: () => null,
    documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } },
    addEventListener: (type, cb) => listeners.set(type, cb) }
});
const html = await readFile(new URL("../app/index.html", import.meta.url), "utf8");
for (const match of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
  if (!match[1].startsWith("vendor/")) vm.runInContext(await readFile(new URL(`../app/${match[1]}`, import.meta.url), "utf8"), context, { filename: match[1] });
}
const run = (code) => vm.runInContext(code, context);
const click = (action, value, pointer = {}) => {
  const target = { dataset: { action, value }, closest: () => ({ getBoundingClientRect: () => ({ left: 100, top: 50, width: 600, height: 400 }) }) };
  listeners.get("click")({ detail: 0, target: { closest: () => target }, ...pointer });
};
const start = () => run("startSession('cs-sociales', 'campo-cuidados', 'activity')");
const choose = (value) => { click("farm-choice", value); click("farm-check"); };

// Updates preserve saved names and custom social themes, without duplicates.
run(`var previous = clone(DEFAULT_DATA); previous.settings.studentName = 'Mi nombre';
  previous.subjects.find(s => s.id === 'cs-sociales').themes.push({ id: 'propio', title: 'Propio', exercises: [] });
  var migrated = normalizeData(normalizeData(previous));`);
assert.equal(run("migrated.settings.studentName"), "Mi nombre");
assert.equal(run("migrated.subjects.find(s => s.id === 'cs-sociales').themes.filter(t => !t.worldMode && !t.discoveryMode)[0].id"), "campo-cuidados");
assert.equal(run("migrated.subjects.find(s => s.id === 'cs-sociales').themes.filter(t => t.id === 'campo-cuidados').length"), 1);
assert.equal(run("migrated.subjects.find(s => s.id === 'cs-sociales').themes.some(t => t.id === 'propio')"), true);
assert.equal(run("migrated.subjects.filter(s => s.id !== 'cs-sociales').some(s => s.themes.some(t => t.farmActivity))"), false);

start();
click("farm-next"); click("farm-check"); click("farm-choice", "invalid");
assert.equal(run("session.farm.step"), 0);
assert.equal(run("session.farm.choice"), null);
assert.equal(run("session.answers.length"), 0);
choose("salt");
assert.equal(run("session.farm.isCorrect"), false);
click("farm-next"); click("farm-choice", "plain"); click("farm-check");
assert.equal(run("session.farm.choice"), "salt", "Confirmed answers stay locked");
assert.equal(run("session.answers.length"), 1, "Repeated taps do not score twice");
click("farm-retry"); choose("plain"); click("farm-next");
assert.equal(run("session.farm.step"), 1);
assert.equal(run("session.score"), 0, "Retry preserves the first attempt");
for (const correct of ["grass", "water"]) {
  choose(correct); click("farm-next");
}
assert.equal(run("session.farm.stage"), 1);
for (const correct of ["grass", "water", "person"]) {
  click("farm-choice", correct === "water" ? "grass" : "water");
  choose(correct);
  assert.equal(run("session.farm.isCorrect"), true);
  click("farm-next");
}
assert.equal(run("session.farm.stage"), 2);
click("farm-place", "grass");
assert.equal(run("session.farm.pending"), null, "Choose a figure before placing");
click("farm-token", "farmer"); click("farm-place", "grass"); click("farm-check");
assert.equal(run("session.farm.isCorrect"), false, "The person cannot answer the cow instruction");
click("farm-retry"); click("farm-token", "cow-b"); click("farm-place", "water"); click("farm-check");
assert.equal(run("session.farm.isCorrect"), false, "Cows belong on land");
click("farm-retry"); click("farm-place", "grass", { detail: 1, clientX: 280, clientY: 250 });
assert.equal(run("session.farm.pending.x"), 30);
assert.equal(run("session.farm.pending.y"), 50);
click("farm-check"); click("farm-token", "farmer"); click("farm-next");
assert.equal(run("session.farm.placed['cow-b'].x"), 30);
click("farm-token", "cow-b");
assert.equal(run("session.farm.selected"), null, "A pasted cow cannot be reused for the second cow");
click("farm-token", "cow-a"); click("farm-place", "grass"); click("farm-check"); click("farm-next");
click("farm-token", "farmer"); click("farm-place", "grass"); click("farm-check"); click("farm-next");
assert.equal(run("Object.keys(session.farm.placed).length"), 3);
assert.equal(run("session.farm.step"), 3);
choose("water"); click("farm-next");
assert.equal(run("session.farm.finished"), true);
assert.equal(run("session.answers.length"), 10);
assert.equal(run("session.score"), 8);
assert.match(app.innerHTML, /¡Este es tu campo!/);
assert.match(app.innerHTML, /Un recurso natural para beber/);
const finished = run("JSON.stringify(session.farm)");
click("farm-next"); click("farm-check"); click("farm-token", "cow-a");
assert.equal(run("JSON.stringify(session.farm)"), finished);
const ids = [...app.innerHTML.matchAll(/\bid="(farm-[^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, "SVG clips have distinct IDs");
click("farm-restart");
assert.equal(run("session.farm.stage"), 0);
assert.equal(run("session.answers.length"), 0);
click("cancel-run"); click("farm-next");
assert.equal(run("session"), null);
assert.equal(run("route.subjectId"), "cs-sociales");

// Keyboard/pointer placement stays in bounds; correct options vary positions.
const positions = new Set();
for (let pass = 0; pass < 40; pass++) {
  const state = run("createFarmState()");
  assert.equal(new Set(state.landscapes).size, 3);
  positions.add(state.landscapes.indexOf("plain"));
  for (const options of state.needs) assert.equal(new Set(options).size, 3);
}
assert.equal(positions.size, 3);
console.log("Campo: tres estaciones, 10 pasos, fotos, migración, respuestas editables, reintentos, doble toque, colocación táctil y teclado verificados.");
