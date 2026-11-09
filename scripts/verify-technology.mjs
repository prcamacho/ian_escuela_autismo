import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../app/", import.meta.url);
const storage = new Map();
const app = { innerHTML: "" };
const listeners = new Map();
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" },
  Audio: class { constructor() { throw new Error("Technology must never play audio"); } },
  window: { addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {} },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  document: {
    getElementById: () => app, querySelector: () => null,
    documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } },
    addEventListener: (type, callback) => listeners.set(type, callback)
  }
});
const scriptFiles = [...(await readFile(new URL("../app/index.html", import.meta.url), "utf8"))
  .matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)]
  .map(match => match[1]).filter(file => !file.startsWith("vendor/"));
for (const file of scriptFiles) {
  vm.runInContext(await readFile(new URL(file, root), "utf8"), context, { filename: file });
}
const run = code => vm.runInContext(code, context);
const click = dataset => listeners.get("click")({ target: { closest: () => ({ dataset }) } });

// Migration from all five pre-existing subjects preserves custom themes and settings.
run(`var old = clone(DEFAULT_DATA); old.subjects = old.subjects.filter(s => s.id !== 'tecnologia');
  old.settings.studentName = 'Nombre conservado';
  old.subjects[0].themes.push({ id: 'custom', title: 'Conservar', exercises: [] });
  var migrated = normalizeData(normalizeData(old));`);
assert.equal(run("migrated.subjects.length"), 6);
assert.equal(run("migrated.settings.studentName"), "Nombre conservado");
assert.equal(run("migrated.subjects.find(s=>s.id==='tecnologia').themes.length"), run("DEFAULT_DATA.subjects.find(s=>s.id==='tecnologia').themes.length"));
assert.equal(run("migrated.subjects.flatMap(s=>s.themes).filter(t=>t.id==='custom').length"), 1);
run("migrated.subjects.find(s=>s.id==='tecnologia').themes.push({id:'personal-tech',title:'Personal',exercises:[]}); migrated = normalizeData(migrated)");
assert.equal(run("migrated.subjects.find(s=>s.id==='tecnologia').themes.length"), run("DEFAULT_DATA.subjects.find(s=>s.id==='tecnologia').themes.length + 1"));

// Validate every generated answer against the data that drives its visible geometry.
const weightPositions = new Set(), equality = new Set(), rulerLengths = new Set();
for (let pass = 0; pass < 150; pass++) for (let theme = 0; theme < 4; theme++) {
  const board = run(`createTechnologyExercises(TECHNOLOGY_THEMES[${theme}])[0]`);
  assert.equal(board.cards.length, 3);
  for (const card of board.cards) {
    assert.equal(card.options.filter(option => option.value === card.correct).length, 1);
    assert.equal(new Set(card.options.map(option => option.value)).size, card.options.length);
    if (card.kind === "balance") {
      weightPositions.add(card.options.findIndex(option => option.value === card.correct));
      equality.add(card.heavy);
      if (card.heavy === -1) assert.equal(card.correct, "equal");
      else assert.equal(card.correct, card.objects[card.prompt.includes("menos") ? 1 - card.heavy : card.heavy]);
    }
    if (card.kind === "units" || card.kind === "ruler") {
      assert.ok(card.start + card.length <= 10);
      assert.equal(Number(card.correct), card.length);
      assert.equal(card.options.length, 10);
      rulerLengths.add(card.length);
    }
  }
  if (board.mode === "ruler") {
    assert.equal(board.cards.filter(card => card.start > 0).length, 1);
    assert.notEqual(Number(board.cards[2].correct), board.cards[2].start + board.cards[2].length);
  }
}
assert.equal(weightPositions.size, 3);
assert.equal(equality.size, 3);
assert.equal(rulerLengths.size, 5);

// Drive the actual delegated click handler: incomplete submission, edits before
// confirmation, wrong answer, double tap, attempts after locking, restart and exit.
for (const theme of ["taller-peso", "herramienta-justa", "medir-unidades", "regla-pacman"]) {
  click({ action: "start", subject: "tecnologia", theme, mode: "activity" });
  assert.match(app.innerHTML, /tech-board/);
  assert.equal(run("session.exercises.length"), 1, "One independent board, not an auto-advancing sequence");
  click({ action: "technology-check" });
  assert.equal(run("session.technology.checked"), false);
  click({ action: "technology-select", card: "99", value: "invalid" });
  assert.equal(run("Object.keys(session.technology.choices).length"), 0);
  const cards = run("session.exercises[0].cards");
  for (const [index, card] of cards.entries()) {
    click({ action: "technology-select", card: String(index), value: card.correct });
    if (index === 0) click({ action: "technology-select", card: "0", value: card.options.find(option => option.value !== card.correct).value });
  }
  assert.equal(run("session.answers.length"), 0, "Selection alone cannot reveal correctness");
  assert.doesNotMatch(app.innerHTML, /class="tech-explanation"/);
  click({ action: "technology-check" });
  assert.equal(run("session.score"), 2);
  assert.equal(run("session.answers.length"), 3);
  assert.equal(run("session.technology.checked"), true);
  assert.match(app.innerHTML, /Miremos qué nos muestra/);
  const choices = run("JSON.stringify(session.technology.choices)");
  click({ action: "technology-select", card: "0", value: cards[0].correct });
  click({ action: "technology-check" });
  assert.equal(run("JSON.stringify(session.technology.choices)"), choices);
  assert.equal(run("session.score"), 2);
  assert.equal(run("session.answers.length"), 3);
  assert.equal(run("session.index"), 0, "No automatic advance after correction");
  click({ action: "start", subject: "tecnologia", theme, mode: "activity" });
  assert.equal(run("session.technology.checked"), false);
  assert.equal(run("Object.keys(session.technology.choices).length"), 0);
  click({ action: "cancel-run" });
  assert.equal(run("session"), null);
  assert.equal(run("route.subjectId"), "tecnologia");
  assert.match(app.innerHTML, /El taller del peso/);
}

// Corrupt or unavailable optional history must not prevent starting a workshop.
storage.set("ian-tech-weight-daily", '"corrupt"');
run("createTechnologyExercises(TECHNOLOGY_THEMES[0])");
run("localStorage.setItem = () => { throw new Error('Storage unavailable'); }; createTechnologyExercises(TECHNOLOGY_THEMES[1])");
console.log("Tecnología: 600 tableros, migración, medidas, silencio y cuatro recorridos con confirmación única verificados.");
