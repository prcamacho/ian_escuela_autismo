import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
  if (!match[1].startsWith("vendor/")) vm.runInContext(await readFile(new URL(`../app/${match[1]}`, import.meta.url), "utf8"), context, { filename: match[1] });
}
const run = (code) => vm.runInContext(code, context);
const click = (action, data = {}) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, ...data } }) } });
const themes = run("PACMAN_QUEST_THEMES");
assert.equal(themes.length, 6);
assert.equal(new Set(themes.map((t) => t.subject)).size, 6);
run(`var previous = clone(DEFAULT_DATA);
  previous.settings.studentName = 'Conservar';
  previous.subjects.forEach(s => { s.themes = s.themes.filter(t => !t.questMode); s.themes.push({ id: 'custom-' + s.id, title: 'Propio', exercises: [] }); });
  var migrated = normalizeData(normalizeData(previous));`);
assert.equal(run("migrated.settings.studentName"), "Conservar");
assert.equal(run("migrated.subjects.filter(s => s.themes.filter(t => t.questMode).length === 1).length"), 6);
assert.equal(run("migrated.subjects.filter(s => s.themes.some(t => t.id === 'custom-' + s.id)).length"), 6);
for (const word of run("PQ_WORDS")) {
  assert.equal(word[1].join(""), word[0]);
  await access(new URL(`../app/assets/pictos/${word[2]}`, import.meta.url));
}

// Solve boards independently with breadth-first search. Accept any safe route,
// including a longer valid route, rather than requiring one memorized sequence.
function solve(board) {
  const queue = [[...board.start, []]], seen = new Set();
  while (queue.length) {
    const [x, y, path] = queue.shift();
    if (x === board.goal[0] && y === board.goal[1]) return path;
    const key = `${x},${y}`;
    if (seen.has(key)) continue;
    seen.add(key);
    for (const [id, dx, dy] of [["up", 0, -1], ["right", 1, 0], ["down", 0, 1], ["left", -1, 0]]) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < 5 && ny >= 0 && ny < 4 && !board.walls.some(([wx, wy]) => wx === nx && wy === ny)) queue.push([nx, ny, [...path, id]]);
    }
  }
  throw new Error("Board has no solution");
}
for (const board of run("PQ_BOARDS")) {
  const path = solve(board);
  assert.ok(path.length <= 8);
  const trace = run(`pqTrace(${JSON.stringify(board)}, ${JSON.stringify(path)})`);
  assert.equal(trace.reached, true);
  assert.equal(trace.blocked, false);
}
const board = run("PQ_BOARDS[0]");
assert.equal(run(`pqTrace(PQ_BOARDS[0], ${JSON.stringify(["right", "left", ...solve(board)])}).reached`), true);

for (let pass = 0; pass < 15; pass++) for (const theme of themes) {
  const rounds = run(`createPacmanQuestExercises(PACMAN_QUEST_THEMES.find(t => t.id === '${theme.id}'))`);
  assert.equal(rounds.length, 5);
  assert.equal(new Set(rounds.map((r) => JSON.stringify([r.prompt, r.word, r.total, r.guests, r.clue, r.color, r.start, r.goal]))).size, 5);
  for (const round of rounds) {
    if (round.mode === "syllables") {
      assert.notEqual(round.tokens.join(""), round.word);
      assert.deepEqual([...round.tokens].sort(), [...round.correct].sort());
    }
    if (round.mode === "sharing") assert.equal(round.correct.reduce((sum, n) => sum + n, 0), round.total);
    if (round.options) {
      assert.equal(new Set(round.options).size, round.options.length);
      assert.ok(round.options.includes(round.correct));
    }
  }
  if (theme.questMode === "positions") assert.equal(new Set(rounds.map((r) => r.correct)).size, 3);
}

function answer(round, wrong = false) {
  if (round.mode === "syllables") {
    const previousLength = run("pqCurrent().state.sequence.length");
    for (let i = 0; i < previousLength; i++) click("pq-remove", { index: "0" });
    const used = new Set(), indices = round.correct.map((token) => {
      const index = round.tokens.findIndex((t, i) => t === token && !used.has(i)); used.add(index); return index;
    });
    if (wrong) [indices[0], indices[1]] = [indices[1], indices[0]];
    for (const index of indices) click("pq-token", { index: String(index) });
  } else if (round.mode === "sharing") {
    const portions = run("[...pqCurrent().state.portions]");
    for (let i = 0; i < portions.length; i++) for (let n = 0; n < portions[i]; n++) click("pq-serve", { index: String(i), delta: "-1" });
    for (let i = 0; i < round.guests; i++) for (let n = 0; n < (wrong ? i === 0 ? round.total : 0 : round.total / round.guests); n++) click("pq-serve", { index: String(i), delta: "1" });
  } else if (round.mode === "coding") {
    click("pq-clear");
    const outside = round.start[1] === 3 ? "down" : round.start[1] === 0 ? "up" : round.start[0] === 0 ? "left" : "right";
    for (const value of wrong ? [outside] : solve(round)) click("pq-command", { value });
  } else click("pq-choice", { value: wrong ? round.options.find((v) => v !== round.correct) : round.correct });
}
for (const theme of themes) {
  click("open-subject", { subject: theme.subject });
  assert.ok(app.innerHTML.includes(theme.title));
  click("start", { subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.match(app.innerHTML, /pq-runner/);
  for (let i = 0; i < 5; i++) {
    const round = run("pqCurrent().exercise");
    click("pq-check"); click("pq-next");
    assert.equal(run("session.index"), i, "Incomplete work cannot be submitted or skipped");
    for (const action of ["pq-choice", "pq-token", "pq-command", "pq-remove", "pq-serve"]) click(action, { value: "invalid", index: "99", delta: "9" });
    assert.equal(run("pqCanCheck(pqCurrent().exercise, pqCurrent().state)"), false);
    answer(round, true);
    assert.equal(run("session.answers.length"), i, "Editing alone must not grade");
    assert.doesNotMatch(app.innerHTML, /pq-success/);
    if (i) answer(round);
    click("pq-check");
    assert.equal(run("pqCurrent().state.isCorrect"), i !== 0);
    assert.equal(run("session.answers.length"), i + 1);
    const locked = run("JSON.stringify(pqCurrent().state)");
    answer(round); click("pq-check"); click("pq-replay");
    assert.equal(run("JSON.stringify(pqCurrent().state)"), locked);
    assert.equal(run("session.answers.length"), i + 1);
    click("pq-next"); click("pq-next");
    assert.equal(run("session.index"), i + 1, "A double tap must not skip a fresh challenge");
  }
  assert.match(app.innerHTML, /Aventura completa/);
  assert.match(app.innerHTML, /4 de 5/);
  click("start", { subject: theme.subject, theme: theme.id, mode: "activity" });
  assert.equal(run("session.score"), 0);
  assert.equal(run("session.answers.length"), 0);
  click("cancel-run");
  assert.equal(run("session"), null);
  assert.equal(run("route.subjectId"), theme.subject);
}
console.log("Aventuras Pac-Man: seis materias, 90 partidas generadas, 30 desafíos completos, migración, sílabas repetidas, repartos y rutas verificados.");
