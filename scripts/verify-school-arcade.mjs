import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" },
  window: { addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {} },
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: { getElementById: () => app, querySelector: () => null,
    documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } },
    addEventListener: (type, cb) => listeners.set(type, cb) }
});
const html = await readFile(new URL("../app/index.html", import.meta.url), "utf8");
for (const match of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
  if (match[1].startsWith("vendor/")) continue;
  vm.runInContext(await readFile(new URL(`../app/${match[1]}`, import.meta.url), "utf8"), context, { filename: match[1] });
}
const run = (code) => vm.runInContext(code, context);
const click = (dataset) => listeners.get("click")({ target: { closest: () => ({ dataset }) } });
const themes = run("SCHOOL_ARCADE_THEMES");
assert.equal(themes.length, 6);

// Existing installations receive exactly one addition per subject, preserve
// personal material and settings, and can repeat the migration without duplicates.
run(`var previous = clone(DEFAULT_DATA);
  previous.settings.studentName = 'Conservar';
  previous.subjects.forEach(s => { s.themes = s.themes.filter(t => !t.arcadeMode); s.themes.push({ id: 'custom-' + s.id, title: 'Propio', exercises: [] }); });
  var migrated = normalizeData(normalizeData(previous));`);
assert.equal(run("migrated.settings.studentName"), "Conservar");
assert.equal(run("migrated.subjects.filter(s => s.themes.filter(t => t.arcadeMode).length === 1).length"), 6);
assert.equal(run("migrated.subjects.filter(s => s.themes.some(t => t.id === 'custom-' + s.id)).length"), 6);

// Validate generation across bag boundaries, all representations and no repeat
// within a game. Reading the final ruler mark is deliberately not the answer.
for (let pass = 0; pass < 60; pass++) for (let index = 0; index < themes.length; index++) {
  const rounds = run(`createSchoolArcadeExercises(SCHOOL_ARCADE_THEMES[${index}])`);
  assert.equal(rounds.length, 5);
  const identities = rounds.map(r => JSON.stringify([r.sentence, r.objects, r.clues, r.groups, r.each, r.word, r.color, r.supply, r.start, r.length]));
  assert.equal(new Set(identities).size, 5);
  for (const round of rounds) {
    if (round.options) assert.equal(new Set(round.options).size, round.options.length);
    if (round.mode === "sentence") {
      assert.ok(round.correct.every(answer => round.options.includes(answer)));
      assert.equal(round.correct.join(" ") + ".", round.sentence);
    }
    if (round.mode === "materials") for (const [i, id] of round.objects.entries()) {
      assert.equal(round.correct[i], run(`PLASTIC_OBJECTS[${JSON.stringify(id)}].material`));
    }
    if (round.mode === "sounds") assert.ok(round.correct.every(id => round.options.includes(id)));
    if (round.mode === "multiply") assert.equal(Number(round.correct), round.groups * round.each);
    if (round.mode === "measure") {
      assert.ok(round.start > 0 && round.start + round.length <= 10);
      assert.equal(Number(round.correct), round.length);
      assert.notEqual(Number(round.correct), round.start + round.length);
    }
  }
}

function answer(round, wrong = false) {
  if (["multiply", "measure"].includes(round.mode)) {
    click({ action: "sa-digit", value: "clear" });
    for (const digit of wrong ? "99" : round.correct) click({ action: "sa-digit", value: digit });
  } else if (round.mode === "sounds") {
    const length = run("saCurrent().state.path.length");
    for (let i = 0; i < length; i++) click({ action: "sa-remove", index: "0" });
    const values = [...round.correct];
    if (wrong) values[0] = round.options.find(id => id !== values[0]);
    for (const value of values) click({ action: "sa-pick", field: "0", value });
  } else {
    for (const [field, value] of round.correct.entries()) {
      const options = round.mode === "english" ? [Array.from({ length: 6 }, (_, i) => String(i + 1)), round.colors, round.supplies][field] : round.options;
      click({ action: "sa-pick", field: String(field), value: wrong && field === 0 ? options.find(option => option !== value) : value });
    }
  }
}

for (const theme of themes) {
  click({ action: "open-subject", subject: theme.subject });
  assert.ok(app.innerHTML.includes(theme.title), `New activity appears in ${theme.subject}`);
  click({ action: "start", subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.match(app.innerHTML, /sa-board/);
  for (let i = 0; i < 5; i++) {
    const round = run("saCurrent().exercise");
    click({ action: "sa-check" });
    click({ action: "sa-next" });
    assert.equal(run("session.index"), i, "No skipping or checking incomplete work");
    click({ action: "sa-pick", field: "99", value: "not-an-option" });
    click({ action: "sa-digit", value: "x" });
    assert.equal(run("saCanCheck(saCurrent().exercise, saCurrent().state)"), false);
    answer(round, true);
    assert.equal(run("session.answers.length"), i, "Editing must not grade or give correctness hints");
    if (i !== 0) answer(round);
    assert.doesNotMatch(app.innerHTML, /sa-won/);
    click({ action: "sa-check" });
    assert.equal(run("session.answers.length"), i + 1);
    assert.equal(run("saCurrent().state.isCorrect"), i !== 0);
    const locked = run("JSON.stringify(saCurrent().state)");
    answer(round);
    click({ action: "sa-check" });
    assert.equal(run("JSON.stringify(saCurrent().state)"), locked, "An error cannot be solved by trying options after confirmation");
    assert.equal(run("session.answers.length"), i + 1, "Double taps must not create results");
    assert.equal(run("session.score"), i);
    click({ action: "sa-next" });
    click({ action: "sa-next" });
    assert.equal(run("session.index"), i + 1, "Double-next cannot skip the next challenge");
  }
  assert.match(app.innerHTML, /Recorrido completo/);
  assert.match(app.innerHTML, /4 de 5/);
  click({ action: "start", subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.equal(run("session.score"), 0);
  assert.equal(run("session.answers.length"), 0);
  click({ action: "cancel-run" });
  assert.equal(run("session"), null);
  assert.equal(run("route.subjectId"), theme.subject);
}

// Corrupt optional rotation storage never prevents opening an activity.
for (const theme of themes) {
  storage.set(`ian-school-arcade-v1-${theme.arcadeMode}`, '{"bad":true}');
  assert.equal(run(`createSchoolArcadeExercises(SCHOOL_ARCADE_THEMES.find(t => t.id === '${theme.id}')).length`), 5);
}
console.log("Escuela Pac-Man: 360 partidas, seis recorridos completos, migración, edición, bloqueo, doble toque y reinicio verificados.");
