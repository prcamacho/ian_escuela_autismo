import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const noAudio = () => { throw Error("Weight activities must stay silent"); };
const context = vm.createContext({ console, navigator: {}, location: { protocol: "file:" }, Audio: noAudio,
  window: { scrollY: 0, addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {} },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: { getElementById: () => app, querySelector: () => null,
    documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } },
    addEventListener: (type, fn) => listeners.set(type, fn) } });
const html = await readFile(new URL("../app/index.html", import.meta.url), "utf8");
for (const [, file] of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
  if (!file.startsWith("vendor/")) vm.runInContext(await readFile(new URL(`../app/${file}`, import.meta.url), "utf8"), context, { filename: file });
}
const run = source => vm.runInContext(source, context);
const tap = (action, data = {}) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, ...data } }) } });
const themes = run("WEIGHT_LAB_THEMES");
assert.equal(themes.length, 3);

// Upgrade an actual previous installation repeatedly, preserving all settings,
// custom and existing themes; put the three additions beside the weight workshop.
run(`var old = clone(DEFAULT_DATA); old.settings.studentName = 'Conservar';
  old.subjects.find(s => s.id === 'tecnologia').themes = old.subjects.find(s => s.id === 'tecnologia').themes.filter(t => !t.weightMode);
  old.subjects.find(s => s.id === 'tecnologia').themes.push({ id:'personal', title:'Propio', exercises:[] });
  var migrated = normalizeData(normalizeData(old));`);
assert.equal(run("migrated.settings.studentName"), "Conservar");
for (const subject of run("old.subjects")) for (const theme of subject.themes) {
  assert.equal(run(`migrated.subjects.find(s=>s.id==='${subject.id}').themes.some(t=>t.id==='${theme.id}')`), true);
}
const ids = run("migrated.subjects.find(s=>s.id==='tecnologia').themes.map(t=>t.id)");
assert.deepEqual([...ids.slice(ids.indexOf("taller-peso") - 3, ids.indexOf("taller-peso"))], Array.from(themes, t => t.id));
for (const theme of themes) assert.equal(ids.filter(id => id === theme.id).length, 1);

for (let pass = 0; pass < 100; pass++) for (let index = 0; index < themes.length; index++) {
  const rounds = run(`createWeightLabExercises(WEIGHT_LAB_THEMES[${index}])`);
  assert.equal(rounds.length, 5);
  assert.equal(new Set(rounds.map(r => r.id)).size, 5);
  if (index === 1) assert.ok(rounds.some(r => r.correct === "equal"));
  for (const round of rounds) {
    if (round.mode === "compare") {
      const left = round.left.reduce((a, b) => a + b, 0), right = round.right.reduce((a, b) => a + b, 0);
      const expected = left === right ? "equal" : round.less ? left < right ? "left" : "right" : left > right ? "left" : "right";
      assert.equal(round.correct, expected);
      assert.equal(new Set(round.options).size, 3);
    } else {
      const required = round.target - round.initial.reduce((a, b) => a + b, 0);
      assert.ok(Number.isInteger(required) && required > 0);
      // Independent exhaustive search proves every challenge can be completed
      // within the same limit as the touch controls.
      const reachable = new Set([0]);
      for (let depth = 0; depth < 8; depth++) for (const total of [...reachable]) for (const value of round.allowed) reachable.add(total + value);
      assert.ok(reachable.has(required));
    }
  }
}

function prepareCorrect(round) {
  if (round.mode === "compare") { tap("wl-choice", { value: round.correct }); return; }
  let remainder = round.target - round.initial.reduce((a, b) => a + b, 0);
  for (const units of round.allowed) while (remainder >= units) {
    tap("wl-add", { mass: String(units) }); remainder -= units;
  }
  assert.equal(remainder, 0);
}
for (const theme of themes) {
  tap("open-subject", { subject: "tecnologia" });
  assert.ok(app.innerHTML.includes(theme.title));
  tap("start", { subject: "tecnologia", theme: theme.id, mode: "activity" });
  assert.match(app.innerHTML, /wl-board/);
  for (let i = 0; i < 5; i++) {
    const round = run("wlCurrent().exercise");
    tap("wl-check"); tap("wl-next");
    assert.equal(run("session.index"), i);
    tap("wl-add", { mass: "7" }); tap("wl-choice", { value: "bad" }); tap("wl-remove", { index: "-1" });
    assert.equal(run("wlCanCheck(wlCurrent().exercise,wlCurrent().state)"), false);
    if (round.mode !== "compare") {
      tap("wl-add", { mass: String(round.allowed[0]) });
      tap("wl-remove", { index: "0" });
      assert.equal(run("wlCurrent().state.placed.length"), 0);
      assert.equal(run("wlCurrent().exercise.initial.length"), round.initial.length);
    }
    prepareCorrect(round);
    assert.equal(run("session.answers.length"), i);
    if (i === 0) {
      if (round.mode === "compare") tap("wl-choice", { value: round.options.find(v => v !== round.correct) });
      else tap("wl-add", { mass: String(round.allowed[0]) });
    }
    tap("wl-check");
    assert.equal(run("wlCurrent().state.isCorrect"), i !== 0);
    assert.equal(run("session.answers.length"), i + 1);
    const locked = run("JSON.stringify(wlCurrent().state)");
    tap("wl-check"); tap("wl-add", { mass: "1" }); tap("wl-remove", { index: "0" }); tap("wl-choice", { value: "left" });
    assert.equal(run("JSON.stringify(wlCurrent().state)"), locked);
    tap("wl-next"); tap("wl-next");
    assert.equal(run("session.index"), i + 1);
  }
  assert.match(app.innerHTML, /4 de 5 respuestas correctas/);
  tap("cancel-run");
}

// All possible small combinations are accepted by their mass, rather than
// demanding a single canned answer. Overweight and underweight ones fail.
for (let target = 3; target <= 8; target++) {
  for (let kilos = 0; kilos <= 2; kilos++) for (let halves = 0; halves <= 4; halves++) for (let quarters = 0; quarters <= 8; quarters++) {
    if (kilos + halves + quarters < 1 || kilos + halves + quarters > 8) continue;
    tap("start", { subject: "tecnologia", theme: "pesas-mercado", mode: "activity" });
    run(`session.exercises[0].target = ${target}`);
    for (const [units, count] of [[4, kilos], [2, halves], [1, quarters]]) for (let j = 0; j < count; j++) tap("wl-add", { mass: String(units) });
    tap("wl-check");
    assert.equal(run("wlCurrent().state.isCorrect"), 4 * kilos + 2 * halves + quarters === target);
  }
}
tap("start", { subject: "tecnologia", theme: "pesas-mercado", mode: "activity" });
for (let i = 0; i < 12; i++) tap("wl-add", { mass: "1" });
assert.equal(run("wlCurrent().state.placed.length"), 8);
for (const [units, width, height] of [[4, 76, 96], [2, 61, 77], [1, 47, 60]]) {
  const art = run(`wlWeight(${units})`);
  assert.match(art, new RegExp(`width="${width}" height="${height}"`));
  assert.match(art, /viewBox="0 0 160 200"/);
}
console.log("Pesas: 300 partidas, migración, 15 desafíos, combinaciones alternativas, errores y bloqueo verificados.");
