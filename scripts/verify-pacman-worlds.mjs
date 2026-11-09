import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const noAudio = () => { throw new Error("New worlds must remain silent"); };
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
const themes = run("PACMAN_WORLD_THEMES");
assert.equal(themes.length, 6);
assert.equal(new Set(themes.map(t => t.subject)).size, 6);

// Updating old installations adds exactly one activity per subject, first in
// the menu, without losing custom activities, earlier lessons or preferences.
run(`var old = clone(DEFAULT_DATA);
  old.settings.studentName = 'Nombre conservado';
  old.subjects.forEach(s => { s.themes = s.themes.filter(t => !t.worldMode); s.themes.push({ id: 'custom-' + s.id, title: 'Propio', exercises: [] }); });
  var migrated = normalizeData(normalizeData(old));`);
assert.equal(run("migrated.settings.studentName"), "Nombre conservado");
for (const theme of themes) {
  assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes.find(t => !t.expeditionMode && !t.discoveryMode).id`), theme.id);
  assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes.filter(t => t.worldMode).length`), 1);
  assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes.some(t => t.id === 'custom-${theme.subject}')`), true);
  const previous = run(`old.subjects.find(s => s.id === '${theme.subject}').themes.map(t => t.id)`);
  for (const id of previous) assert.equal(run(`migrated.subjects.find(s => s.id === '${theme.subject}').themes.some(t => t.id === ${JSON.stringify(id)})`), true);
}

// Exercise data is checked independently of rendering and checking logic.
for (let pass = 0; pass < 80; pass++) for (let index = 0; index < themes.length; index++) {
  const rounds = run(`createPacmanWorldExercises(PACMAN_WORLD_THEMES[${index}])`);
  assert.equal(rounds.length, 5);
  const identities = rounds.map(r => JSON.stringify([r.word, r.animal, r.mission, r.series, r.product]));
  assert.equal(new Set(identities).size, 5);
  for (const round of rounds) {
    if (round.options) {
      assert.equal(new Set(round.options).size, round.options.length);
      assert.equal(round.options.filter(v => v === round.correct).length, 1);
    }
    if (round.mode === "opposites") assert.notEqual(round.correct, round.word);
    if (round.mode === "habitats") assert.equal(run(`PW_ANIMALS.find(a => a[0] === ${JSON.stringify(round.animal)})[2]`), round.correct);
    if (round.mode === "patterns") {
      for (let i = 1; i < round.series.length; i++) assert.equal(round.series[i] - round.series[i - 1], round.step);
      assert.equal(Number(round.correct), round.series[round.missing]);
      assert.ok(round.missing >= 2 && round.missing <= 4);
    }
    if (round.mode === "making") {
      assert.equal(round.tokens.length, 3);
      assert.notEqual(round.tokens.join(""), "012");
      assert.equal([...round.correct].join(""), "012");
      assert.ok(round.correct.every(v => round.tokens.includes(v)));
    }
  }
}

function answer(round, wrong = false) {
  if (round.mode === "making") {
    while (run("pwCurrent().state.sequence.length")) click("pw-remove", { index: "0" });
    for (const value of wrong ? ["1", "0", "2"] : round.correct) click("pw-step", { value });
  } else click("pw-choice", { value: wrong ? round.options.find(v => v !== round.correct) : round.correct });
}
for (const theme of themes) {
  click("open-subject", { subject: theme.subject });
  assert.ok(app.innerHTML.includes(theme.title));
  click("start", { subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.match(app.innerHTML, /pw-board/);
  for (let i = 0; i < 5; i++) {
    const round = run("pwCurrent().exercise");
    click("pw-check"); click("pw-next");
    assert.equal(run("session.index"), i, "Incomplete work cannot be checked or skipped");
    click("pw-choice", { value: "invalid" }); click("pw-step", { value: "99" }); click("pw-remove", { index: "-1" });
    assert.equal(run("pwCanCheck(pwCurrent().exercise, pwCurrent().state)"), false);
    answer(round, true);
    if (round.mode === "making") {
      click("pw-step", { value: "1" });
      assert.equal(run("pwCurrent().state.sequence.length"), 3, "One token cannot be used twice");
    }
    assert.equal(run("session.answers.length"), i, "Editing must not reveal correctness");
    assert.doesNotMatch(app.innerHTML, /pw-success|Vamos a aprenderlo juntos/);
    if (i > 0) answer(round);
    click("pw-check");
    assert.equal(run("session.answers.length"), i + 1);
    assert.equal(run("pwCurrent().state.isCorrect"), i > 0);
    assert.ok(app.innerHTML.includes(round.explanation.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")));
    const locked = run("JSON.stringify(pwCurrent().state)");
    if (round.mode === "making") { click("pw-remove", { index: "0" }); click("pw-step", { value: "0" }); }
    else click("pw-choice", { value: round.correct });
    click("pw-check");
    assert.equal(run("JSON.stringify(pwCurrent().state)"), locked);
    assert.equal(run("session.score"), i);
    click("pw-next"); click("pw-next");
    assert.equal(run("session.index"), i + 1, "Double-next cannot skip a fresh round");
  }
  assert.match(app.innerHTML, /Mundo explorado/);
  assert.match(app.innerHTML, /4 de 5 respuestas correctas/);
  assert.equal(run("session.answers.length"), 5);
  click("start", { subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.equal(run("session.score"), 0);
  assert.equal(run("session.answers.length"), 0);
  click("cancel-run");
  assert.equal(run("session"), null);
  assert.equal(run("route.subjectId"), theme.subject);
}

// Optional rotation storage can be corrupted or unavailable without blocking play.
for (const theme of themes) {
  storage.set(`ian-school-arcade-v1-world-${theme.worldMode}`, '{"invalid":true}');
  assert.equal(run(`createPacmanWorldExercises(PACMAN_WORLD_THEMES.find(t => t.id === '${theme.id}')).length`), 5);
}
run("localStorage.getItem = () => { throw Error('Unavailable'); }; localStorage.setItem = () => { throw Error('Unavailable'); };");
for (const theme of themes) assert.equal(run(`createPacmanWorldExercises(PACMAN_WORLD_THEMES.find(t => t.id === '${theme.id}')).length`), 5);
console.log("Nuevos mundos Pac-Man: 480 partidas, seis aventuras completas, migración, respuestas incorrectas, edición, bloqueo, doble toque, reinicio y uso sin almacenamiento verificados.");
