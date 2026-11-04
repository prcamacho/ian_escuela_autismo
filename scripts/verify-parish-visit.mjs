import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const silent = () => { throw new Error("La anticipación debe permanecer sin audio"); };
const context = vm.createContext({
  console, navigator: {}, location: { protocol: "file:" }, Audio: silent,
  window: { addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {}, speechSynthesis: { speak: silent } },
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
const click = (action, value) => listeners.get("click")({ target: { closest: () => ({ dataset: { action, value } }) } });
const snapshot = () => run("JSON.stringify(parishVisitState)");

// Enter through the actual main menu, without changing school sessions or settings.
const previousData = run("JSON.stringify(data)");
click("supports");
assert.match(app.innerHTML, /Visita a la parroquia/);
for (const action of ["turner-open", "support-numbers-open", "support-colors-open", "support-multiplication-open"]) assert.ok(app.innerHTML.includes(action));
click("pv-open");
assert.equal(run("route.view"), "support-parish-visit");
assert.match(app.innerHTML, /Conozco el lugar/);
assert.match(app.innerHTML, /Profes|profes/);
click("pv-detail", "entrance"); click("pv-detail", "entrance"); click("pv-detail", "tower");
assert.equal(run("parishVisitState.discovered.length"), 2);
assert.match(app.innerHTML, /pv-photo-highlight/);
const beforeInvalid = snapshot();
click("pv-detail", "unknown"); click("pv-chapter", "99"); click("pv-stop", "4"); click("pv-change-next"); click("pv-message", "bye");
assert.equal(snapshot(), beforeInvalid);

// Every message is available in every chapter and preserves the current position.
for (let chapter = 0; chapter < 6; chapter++) {
  click("pv-chapter", String(chapter));
  for (const [id, label] of [["help", "Necesito ayuda"], ["pause", "Necesito una pausa"], ["bathroom", "Necesito ir al baño"], ["no", "No quiero"], ["next", "¿Qué hacemos ahora?"]]) {
    assert.ok(app.innerHTML.includes(`data-value="${id}"`));
    const beforeMessage = snapshot();
    click("pv-message", id);
    assert.match(app.innerHTML, new RegExp(label));
    assert.match(app.innerHTML, /Se lo muestro al adulto/);
    assert.ok(!app.innerHTML.includes('data-action="pv-next"'));
    const showing = snapshot(); click("pv-next"); click("pv-chapter", "0");
    assert.equal(snapshot(), showing, "Hidden controls cannot advance while a message is displayed");
    click("pv-message-close");
    assert.equal(snapshot(), beforeMessage);
  }
}

// Follow the complete journey; no presumed games, indoor route, or trip home.
click("pv-chapter", "1");
for (let stop = 0; stop < 5; stop++) {
  assert.equal(run("parishVisitState.stop"), stop);
  click("pv-walk");
}
assert.equal(run("parishVisitState.stop"), 4);
assert.match(app.innerHTML, /qué hacemos después/);
click("pv-stop", "0");
assert.equal(run("parishVisitState.stop"), 0);
for (const value of ["-1", "5", "1.2", "garbage"]) click("pv-stop", value);
assert.equal(run("parishVisitState.stop"), 0);

click("pv-next");
for (const card of ["people", "activity", "show"]) click("pv-card", card);
click("pv-card", "show");
assert.equal(run("parishVisitState.cards.length"), 2, "An expanded card can be closed");
click("pv-card", "show");
assert.equal(run("parishVisitState.cards.length"), 3);
assert.match(app.innerHTML, /Todavía no sabemos cuáles serán las actividades/);
assert.match(app.innerHTML, /Educación Física/);
assert.match(app.innerHTML, /Practicantes/);
assert.match(app.innerHTML, /Mostrame cómo se hace/);
assert.ok(!/misa|rezar|pelota|silbato|volvemos a|mañana/.test(app.innerHTML));
click("pv-next");
assert.equal(run("parishVisitState.chapter"), 3);
assert.match(app.innerHTML, /Un grupo se va y llega otro/);
assert.match(app.innerHTML, /El lugar que conozco/);
assert.ok(app.innerHTML.includes('src="./assets/supports/parish/medalla1-1.jpg"'));
for (let step = 0; step < 3; step++) {
  assert.equal(run("parishVisitState.changeStep"), step);
  for (const [id, title] of [["bye", "Chau, profes"], ["moment", "Necesito un momento"], ["next", "¿Qué hacemos ahora?"]]) {
    const before = snapshot();
    click("pv-message", id);
    assert.ok(app.innerHTML.includes(title));
    const showing = snapshot();
    click("pv-change-next"); click("pv-change-back"); click("pv-change-reset");
    assert.equal(snapshot(), showing, "A displayed message never moves the change of group forward");
    click("pv-message-close");
    assert.equal(snapshot(), before, "Returning preserves the exact step, without rewarding or penalizing a message");
  }
  click("pv-change-next");
}
assert.equal(run("parishVisitState.changeStep"), 2);
assert.match(app.innerHTML, /Ahora hay otros profes/);
assert.match(app.innerHTML, /Un adulto me dice si seguimos o terminamos/);
click("pv-chapter", "0"); click("pv-chapter", "3");
assert.equal(run("parishVisitState.changeStep"), 2);
click("pv-change-back"); click("pv-change-back"); click("pv-change-back");
assert.equal(run("parishVisitState.changeStep"), 0);
click("pv-change-next"); click("pv-change-reset");
assert.equal(run("parishVisitState.changeStep"), 0);
click("pv-change-next");
click("pv-next"); click("pv-next"); click("pv-next");
assert.equal(run("parishVisitState.chapter"), 5);
assert.match(app.innerHTML, /Mi visita a la parroquia/);
assert.match(app.innerHTML, /Un grupo puede despedirse y dar lugar a otro/);

// Exit/reenter keeps progress; restarting is explicit and clears discoveries.
const finished = snapshot();
click("supports"); click("pv-next");
assert.equal(snapshot(), finished);
click("pv-open");
assert.equal(snapshot(), finished);
click("pv-restart");
assert.equal(run("parishVisitState.chapter"), 0);
assert.equal(run("parishVisitState.discovered.length + parishVisitState.cards.length"), 0);
assert.equal(run("parishVisitState.changeStep"), 0);
click("pv-back");
assert.equal(run("parishVisitState.chapter"), 0);
assert.equal(run("JSON.stringify(data)"), previousData);
assert.equal(run("session"), null);

// Every rendered local resource exists and is included in the offline cache.
const workerContext = vm.createContext({ self: { addEventListener() {} }, URL });
vm.runInContext(`${await readFile(new URL("../app/service-worker.js", import.meta.url), "utf8")}\nglobalThis.files = APP_FILES;`, workerContext);
const offline = new Set(workerContext.files);
async function checkRenderedAssets() {
  for (const [, file] of app.innerHTML.matchAll(/src="\.\/([^"?]+)"/g)) {
    await access(new URL(`../app/${file}`, import.meta.url));
    assert.ok(offline.has(`./${file}`), `Missing offline resource: ${file}`);
  }
}
for (let chapter = 0; chapter < 6; chapter++) {
  click("pv-chapter", String(chapter));
  await checkRenderedAssets();
}
click("pv-chapter", "3");
for (let step = 0; step < 3; step++) {
  await checkRenderedAssets();
  for (const id of ["bye", "moment"]) {
    click("pv-message", id); await checkRenderedAssets(); click("pv-message-close");
  }
  click("pv-change-next");
}
for (const file of ["parish-visit.js", "parish-visit.css"]) assert.ok(offline.has(`./${file}`));
console.log("Visita verificada: seis partes, cambio de profes en tres pasos, despedida y pedido de tiempo sin avance automático, cinco apoyos globales, retorno, reinicio y recursos offline.");
