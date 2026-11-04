import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const listeners = new Map(), storage = new Map(), app = { innerHTML: "" };
const forbiddenAudio = () => { throw Error("El juego de memoria debe ser silencioso"); };
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" }, Audio: forbiddenAudio,
  window: { scrollY: 0, addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }),
    setTimeout() { throw Error("La memoria no debe avanzar con temporizadores"); }, speechSynthesis: { speak: forbiddenAudio } },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: { getElementById: () => app, querySelector: () => null,
    documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } },
    addEventListener: (type, callback) => listeners.set(type, callback) }
});
const html = await readFile(new URL("../app/index.html", import.meta.url), "utf8");
for (const [, file] of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
  if (!file.startsWith("vendor/")) vm.runInContext(await readFile(new URL(`../app/${file}`, import.meta.url), "utf8"), context, { filename: file });
}
const run = code => vm.runInContext(code, context);
const click = (action, data = {}) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, ...data }, setAttribute() {} }) } });
const state = () => JSON.parse(run("JSON.stringify(pmState)"));

// Each shuffled deck contains precisely two copies of each chosen character.
for (let repeat = 0; repeat < 120; repeat++) for (const pairs of [2, 4, 6]) {
  const deck = run(`createPacmanMemoryState(${pairs}).deck`);
  assert.equal(deck.length, pairs * 2);
  assert.equal(new Set(deck).size, pairs);
  assert.equal(deck.filter(id => id === "pacman").length, 2);
  for (const friend of new Set(deck)) assert.equal(deck.filter(id => id === friend).length, 2);
}
assert.equal(run("createPacmanMemoryState(999).pairs"), 2);

click("supports");
assert.match(app.innerHTML, /Memoria con amigos/);
click("pm-open");
assert.equal(run("route.view"), "support-memory");
assert.match(app.innerHTML, /Cada amigo tiene/);
click("pm-level", { value: "999" });
assert.equal(run("pmSelectedPairs"), 2);

for (const pairs of [2, 4, 6]) {
  click("pm-level", { value: String(pairs) });
  click("pm-start");
  assert.equal(state().pairs, pairs);
  assert.match(app.innerHTML, /Tarjetas de memoria/);
  const initialDeck = state().deck;
  click("pm-start");
  assert.deepEqual(state().deck, initialDeck, "Double start cannot reshuffle the active game");
  for (const value of ["-1", "99", "NaN", "1.5"]) click("pm-card", { value });
  assert.deepEqual(state().selected, []);

  // Looking at cards cannot produce a match and only ends on Ian's action.
  click("pm-peek");
  click("pm-card", { value: "0" });
  assert.equal(state().peek, true);
  assert.deepEqual(state().selected, []);
  click("pm-pause");
  click("pm-hide");
  assert.equal(state().peek, true);
  click("pm-unpause");
  click("pm-hide");
  assert.equal(state().peek, false);

  // Same-card double tap, mismatches and a third card cannot score.
  const different = initialDeck.findIndex(id => id !== initialDeck[0]);
  click("pm-card", { value: "0" });
  click("pm-card", { value: "0" });
  assert.deepEqual(state().selected, [0]);
  click("pm-peek");
  assert.equal(state().peek, false);
  click("pm-card", { value: String(different) });
  assert.equal(state().mismatch, true);
  const mismatch = state();
  click("pm-card", { value: "1" });
  click("pm-peek");
  assert.deepEqual(state(), mismatch);
  click("pm-pause");
  click("pm-continue");
  assert.equal(state().mismatch, true);
  click("pm-unpause");
  click("pm-continue");
  assert.deepEqual(state().selected, []);
  assert.equal(state().found.length, 0);
  click("pm-continue");
  assert.equal(state().found.length, 0);

  // Pause/resume, navigation and changing the setup preserve the active deck.
  click("pm-card", { value: "0" });
  click("supports");
  assert.equal(state().paused, true);
  const outsideState = state();
  click("pm-card", { value: "1" });
  assert.deepEqual(state(), outsideState, "Actions outside the memory route are ignored");
  click("pm-open");
  assert.equal(state().paused, true);
  click("pm-unpause");
  click("pm-setup");
  click("pm-level", { value: "6" });
  click("pm-resume-game");
  assert.equal(state().pairs, pairs);
  assert.deepEqual(state().deck, initialDeck);
  assert.deepEqual(state().selected, [0]);
  const second = initialDeck.findIndex((id, index) => index !== 0 && id === initialDeck[0]);
  click("pm-card", { value: String(second) });
  assert.equal(state().found.length, 1);
  click("pm-card", { value: "0" });
  assert.deepEqual(state().selected, [], "Matched cards cannot be selected again");
  for (const friend of new Set(initialDeck.slice().filter(id => id !== initialDeck[0]))) {
    const indices = initialDeck.flatMap((id, index) => id === friend ? [index] : []);
    for (const index of indices) click("pm-card", { value: String(index) });
  }
  assert.equal(state().complete, true);
  assert.equal(state().found.length, pairs);
  const completed = state();
  click("pm-card", { value: "0" }); click("pm-peek"); click("pm-pause");
  assert.deepEqual(state(), completed);
  click("pm-again");
  assert.equal(state().pairs, pairs);
  assert.equal(state().complete, false);
  assert.deepEqual(state().found, []);
  click("pm-setup");
}

// Optional animation has no bearing on correctness or progression.
click("pm-motion");
assert.equal(run("pmQuiet"), true);
click("pm-motion");
assert.equal(run("pmQuiet"), false);
assert.equal(run("pmReducedMotion()"), true, "OS reduced motion is always respected");
click("pm-start");
assert.equal(state().found.length, 0);
console.log("Memoria Pac-Man: 360 mazos y partidas de 2, 4 y 6 parejas; doble toque, errores, bloqueo, ayuda, pausa, navegación, reinicio y movimiento reducido verificados.");
