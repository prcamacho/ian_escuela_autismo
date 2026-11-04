import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const noAudio = () => { throw Error("Discoveries must remain silent"); };
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" }, CSS: { escape: value => value }, Audio: noAudio,
  window: { scrollY: 0, addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {}, speechSynthesis: { speak: noAudio } },
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
const click = (action, data = {}) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, ...data } }) } });
const themes = run("PACMAN_DISCOVERY_THEMES");
assert.equal(themes.length, 6);
assert.equal(new Set(themes.map(t => t.subject)).size, 6);
run(`var old = clone(DEFAULT_DATA);
  old.settings.studentName = 'Conservar';
  old.subjects.forEach(s => { s.themes = s.themes.filter(t => !t.discoveryMode); s.themes.push({ id: 'custom-' + s.id, title: 'Propio', exercises: [] }); });
  var migrated = normalizeData(normalizeData(old));`);
assert.equal(run("migrated.settings.studentName"), "Conservar");
for (const theme of themes) {
  assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes[0].id`), theme.id);
  assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes.filter(t => t.discoveryMode).length`), 1);
  for (const id of run(`old.subjects.find(s => s.id === '${theme.subject}').themes.map(t => t.id)`)) {
    assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes.some(t => t.id === ${JSON.stringify(id)})`), true);
  }
}

// Check all content and bag boundaries, not just the first five examples.
for (let pass = 0; pass < 40; pass++) for (let i = 0; i < themes.length; i++) {
  const rounds = run(`createPacmanDiscoveryExercises(PACMAN_DISCOVERY_THEMES[${i}])`);
  assert.equal(rounds.length, 5);
  const identities = rounds.map(r => JSON.stringify([r.clues, r.scene, r.purpose, r.pattern, r.clue, r.variant]));
  assert.equal(new Set(identities).size, 5);
  for (const r of rounds) {
    if (r.mode === "mail") { assert.equal(new Set(r.options).size, 4); assert.ok(r.options.includes(r.correct)); assert.equal(r.clues.length, 2); }
    if (r.mode === "water") {
      assert.deepEqual([...r.correct], ({ "ice-heat": ["heat", "liquid"], "liquid-cool": ["cool", "ice"], "liquid-heat": ["heat", "gas"], "gas-cool": ["cool", "liquid"] })[`${r.initial}-${r.correct[0]}`]);
    }
    if (r.mode === "museum") {
      for (const field of ["past", "present"]) { assert.equal(new Set(r[field]).size, 3); assert.ok(r[field].includes(r.correct[0])); }
      assert.equal(run(`PD_EXHIBITS[${r.correct[0]}][0]`), r.purpose);
    }
    if (r.mode === "mirror") {
      assert.ok(r.pattern.length >= 6);
      for (let row = 0; row < 4; row++) for (let distance = 0; distance < 3; distance++) {
        assert.equal(r.pattern.includes(row * 3 + 2 - distance), r.correct.includes(row * 3 + distance));
      }
    }
    if (r.mode === "weather") { assert.equal(r.clue, `It is ${r.correct[0]}. It is ${r.correct[1]}.`); assert.ok(r.correct[0] !== "sunny" || r.correct[1] === "day"); }
    if (r.mode === "circuit") {
      assert.notEqual(r.battery, r.lamp); assert.equal(r.movable.length, 6);
      assert.equal(run(`pdCircuitClosed(${JSON.stringify(r)}, PD_RING_SOLUTION)`), true);
      assert.equal(run(`pdCircuitClosed(${JSON.stringify(r)}, ${JSON.stringify(r.rotations)})`), false);
    }
  }
}

// Independent perimeter oracle checks every wire configuration, including
// equivalent 180-degree rotations of straight wires. A visually plausible
// route with one unconnected return wire must never turn the lamp on.
const ring = [0, 1, 2, 5, 8, 7, 6, 3], neighborDirections = new Map();
for (const [j, cell] of ring.entries()) {
  const neighbors = [ring[(j + 7) % 8], ring[(j + 1) % 8]];
  neighborDirections.set(cell, neighbors.map(n => n === cell - 3 ? 0 : n === cell + 1 ? 1 : n === cell + 3 ? 2 : 3).sort());
}
run("var circuit = createPacmanDiscoveryExercises(PACMAN_DISCOVERY_THEMES[5])[0];");
const circuit = run("circuit");
for (let combination = 0; combination < 4096; combination++) {
  let bits = combination;
  const rotations = [...circuit.rotations];
  for (const cell of circuit.movable) { rotations[cell] = bits % 4; bits = Math.floor(bits / 4); }
  const expected = ring.every(cell => {
    const base = [0, 2, 6, 8].includes(cell) ? [0, 1] : [1, 3];
    return JSON.stringify(base.map(d => (d + rotations[cell]) % 4).sort()) === JSON.stringify(neighborDirections.get(cell));
  });
  assert.equal(run(`pdCircuitClosed(circuit, ${JSON.stringify(rotations)})`), expected);
}

function answer(r, wrong = false) {
  if (r.mode === "mail") click("pd-pick", { field: "parcel", value: wrong ? r.options.find(v => v !== r.correct) : r.correct });
  if (r.mode === "water") {
    click("pd-pick", { field: "change", value: wrong ? r.correct[0] === "heat" ? "cool" : "heat" : r.correct[0] });
    click("pd-pick", { field: "result", value: r.correct[1] });
  }
  if (r.mode === "museum") for (const [i, field] of ["past", "present"].entries()) click("pd-pick", { field, value: wrong && !i ? r[field].find(v => v !== r.correct[i]) : r.correct[i] });
  if (r.mode === "mirror") {
    click("pd-clear");
    for (const index of wrong ? r.correct.slice(1) : r.correct) click("pd-paint", { index: String(index) });
  }
  if (r.mode === "weather") {
    while (run("pdCurrent().state.values.weather") !== r.correct[0]) click("pd-weather-turn", { delta: "1" });
    click("pd-pick", { field: "time", value: wrong ? r.correct[1] === "day" ? "night" : "day" : r.correct[1] });
  }
  if (r.mode === "circuit") {
    for (const index of r.movable) while (run(`pdCurrent().state.rotations[${index}] % 4 !== PD_RING_SOLUTION[${index}]`)) click("pd-rotate", { index: String(index) });
    if (wrong) click("pd-rotate", { index: String(r.movable[0]) });
  }
}
for (const theme of themes) {
  click("open-subject", { subject: theme.subject }); assert.ok(app.innerHTML.includes(theme.title));
  click("start", { subject: theme.subject, theme: theme.id, mode: "activity" });
  for (let i = 0; i < 5; i++) {
    const round = run("pdCurrent().exercise");
    click("pd-check"); click("pd-next"); assert.equal(run("session.index"), i);
    click("pd-pick", { field: "__proto__", value: "invalid" }); click("pd-paint", { index: "12" }); click("pd-rotate", { index: "4" }); click("pd-weather-turn", { delta: "9" });
    assert.equal(run("pdCanCheck(pdCurrent().exercise, pdCurrent().state)"), false);
    answer(round, true);
    assert.equal(run("session.answers.length"), i, "Editing cannot grade or reveal correctness");
    assert.doesNotMatch(app.innerHTML, /pd-success|is-powered|is-delivered|is-answer/);
    if (i > 0) answer(round);
    click("pd-check");
    assert.equal(run("pdCurrent().state.isCorrect"), i > 0);
    assert.equal(run("session.score"), i);
    assert.equal(run("session.answers.length"), i + 1);
    const locked = run("JSON.stringify(pdCurrent().state)");
    click("pd-pick", { field: "result", value: "ice" }); click("pd-paint", { index: "0" }); click("pd-clear"); click("pd-rotate", { index: "0" }); click("pd-weather-turn", { delta: "1" }); click("pd-check"); click("pd-replay");
    assert.equal(run("JSON.stringify(pdCurrent().state)"), locked);
    assert.equal(run("session.answers.length"), i + 1);
    click("pd-next"); click("pd-next"); assert.equal(run("session.index"), i + 1, "Double taps cannot skip an unanswered round");
  }
  assert.match(app.innerHTML, /Cinco descubrimientos/); assert.match(app.innerHTML, /4 de 5 desafíos resueltos/);
  click("start", { subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.equal(run("session.score"), 0); assert.equal(run("session.answers.length"), 0);
  click("cancel-run"); assert.equal(run("session"), null); assert.equal(run("route.subjectId"), theme.subject);
}
// Correct reflections must still reject extra pixels. Circuit shortcuts through
// the center and missing/invalid rotations cannot count as a closed loop.
click("start", { subject: "matematicas", theme: "pacdiscovery-mirror", mode: "activity" });
const mirror = run("pdCurrent().exercise");
answer(mirror);
click("pd-paint", { index: String(Array.from({ length: 12 }, (_, i) => i).find(i => !mirror.correct.includes(i))) });
click("pd-check");
assert.equal(run("pdCurrent().state.isCorrect"), false, "Extra painted cells must not be ignored");
assert.equal(run("pdCircuitClosed(circuit, [])"), false);
assert.equal(run("pdCircuitClosed(circuit, Array(9).fill(-1))"), false);
for (const theme of themes) {
  storage.set(`ian-school-arcade-v1-discovery-${theme.discoveryMode}`, '{"invalid":true}');
  assert.equal(run(`createPacmanDiscoveryExercises(PACMAN_DISCOVERY_THEMES.find(t => t.id === '${theme.id}')).length`), 5);
}
run("localStorage.getItem = () => { throw Error('Unavailable'); }; localStorage.setItem = () => { throw Error('Unavailable'); };");
for (const theme of themes) assert.equal(run(`createPacmanDiscoveryExercises(PACMAN_DISCOVERY_THEMES.find(t => t.id === '${theme.id}')).length`), 5);
console.log("Descubrimientos Pac-Man: seis partidas completas, 240 bancos de desafíos, 4096 circuitos, migración, errores, edición, bloqueo, doble toque, reinicio y almacenamiento no disponible verificados.");
