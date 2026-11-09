import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../app/", import.meta.url);
const storage = new Map();
const appElement = { innerHTML: "" };
const listeners = new Map();
const context = vm.createContext({
  console,
  window: { IAN_COMPANION_ENABLED: true, addEventListener() {}, scrollTo() {}, setTimeout() {}, matchMedia: () => ({ matches: false }) },
  navigator: {}, location: { protocol: "file:" },
  localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: {
    getElementById: () => appElement,
    querySelector: () => null,
    documentElement: { classList: { toggle() {} } },
    body: { classList: { toggle() {} } },
    addEventListener: (event, callback) => listeners.set(event, callback)
  }
});
const scriptFiles = [...(await readFile(new URL("../app/index.html", import.meta.url), "utf8"))
  .matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)]
  .map(match => match[1]).filter(file => !file.startsWith("vendor/"));
for (const file of scriptFiles) {
  vm.runInContext(await readFile(new URL(file, root), "utf8"), context, { filename: file });
}
const run = (code) => vm.runInContext(code, context);

// Existing content and settings survive the automatic addition, even on repeated loads.
run(`
  var oldData = clone(DEFAULT_DATA);
  oldData.settings.studentName = "Nombre conservado";
  oldData.subjects.find(s => s.id === "lengua").themes = oldData.subjects.find(s => s.id === "lengua").themes.filter(t => !t.pacmanVerbMode);
  oldData.subjects.find(s => s.id === "lengua").themes.push({ id: "personal", title: "Mi tema", exercises: [] });
  var migrated = normalizeData(normalizeData(oldData));
`);
assert.equal(run('migrated.settings.studentName'), "Nombre conservado");
assert.equal(run('migrated.subjects.find(s => s.id === "lengua").themes.filter(t => t.pacmanVerbMode).length'), 2);
assert.equal(run('migrated.subjects.find(s => s.id === "lengua").themes.filter(t => t.id === "personal").length'), 1);

// Each shuffled session remains answerable and balances the three tenses.
const positions = new Set();
for (let attempt = 0; attempt < 100; attempt++) {
  for (const [themeIndex, expectedLength] of [[0, 8], [1, 6]]) {
    const rounds = run(`createPacmanVerbExercises(PACMAN_LANGUAGE_THEMES[${themeIndex}])`);
    assert.equal(rounds.length, expectedLength);
    assert.equal(new Set(rounds.map((round) => round.action)).size, expectedLength);
    for (const round of rounds) {
      assert.equal(round.options.length, 3);
      assert.equal(new Set(round.options).size, 3);
      assert.equal(round.options.filter((option) => option === round.correct).length, 1);
      positions.add(round.options.indexOf(round.correct));
    }
    if (themeIndex === 1) for (const time of ["past", "present", "future"]) {
      assert.equal(rounds.filter((round) => round.time.id === time).length, 2);
    }
  }
}
assert.equal(positions.size, 3);

// Exercise the real routing and delegated click handler through both complete games.
function click(dataset) {
  listeners.get("click")({ target: { closest: () => ({ dataset }) } });
}
for (const themeId of ["pacman-come-verbos", "pacman-tiempo"]) {
  click({ action: "start", subject: "lengua", theme: themeId, mode: "activity" });
  assert.match(appElement.innerHTML, /pv-challenge/);
  const total = run("session.exercises.length");
  for (let index = 0; index < total; index++) {
    click({ action: "pacman-verb-next" });
    assert.equal(run("session.index"), index, "Cannot skip an unanswered round");
    const round = run("session.exercises[session.index]");
    const wrongIndex = round.options.findIndex((option) => option !== round.correct);
    const correctIndex = round.options.indexOf(round.correct);
    click({ action: "pacman-verb-answer", option: "99" });
    assert.equal(run("session.answers.length"), index);
    click({ action: "pacman-verb-answer", option: String(wrongIndex) });
    assert.equal(run("session.index"), index);
    assert.equal(run("session.answers.length"), index);
    assert.match(appElement.innerHTML, /is-retry/);
    assert.equal((appElement.innerHTML.match(/data-action="pacman-verb-answer"/g) || []).length, 3);
    click({ action: "pacman-verb-answer", option: String(correctIndex) });
    click({ action: "pacman-verb-answer", option: String(correctIndex) });
    assert.equal(run("session.answers.length"), index + 1, "Double taps must not duplicate results");
    assert.equal(run("session.answers.at(-1).attempts"), 2);
    assert.equal(run("session.score"), 0, "A corrected answer must not count as first-try success");
    click({ action: "pacman-verb-next" });
  }
  assert.match(appElement.innerHTML, /¡Recorrido completo!/);
  click({ action: "start", subject: "lengua", theme: themeId, mode: "activity" });
  assert.equal(run("session.index"), 0);
  assert.equal(run("session.answers.length"), 0);
  run('answerPacmanVerb(session.exercises[0].options.indexOf(session.exercises[0].correct))');
  assert.equal(run("session.score"), 1);
  click({ action: "cancel-run" });
  assert.equal(run("session"), null);
  assert.equal(run("route.view"), "subject");
  assert.match(appElement.innerHTML, /Armamos oraciones/);
  assert.match(appElement.innerHTML, /Pac-Man come verbos/);
  assert.match(appElement.innerHTML, /Pac-Man viaja en el tiempo/);
}
console.log("Pac-Man Lengua: 200 partidas generadas, migración y ambos recorridos completos verificados.");
