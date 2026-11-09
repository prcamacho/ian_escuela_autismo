import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";

const root = resolve(import.meta.dirname, "..");
const app = { innerHTML: "" };
const storage = new Map();
const played = [];
let now = 1_000_000;

class TestDate extends Date {
  static now() {
    return now;
  }
}

class TestAudio {
  constructor(src) {
    this.src = src;
    this.listeners = new Map();
    played.push(this);
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  play() {
    if (TestAudio.failNext) { TestAudio.failNext = false; throw Error("Audio unavailable"); }
    this.started = true;
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
  }

  removeEventListener(type, listener) {
    this.listeners.set(type, (this.listeners.get(type) || []).filter(item => item !== listener));
  }

  emit(type) {
    for (const listener of this.listeners.get(type) || []) listener();
  }
}

const context = vm.createContext({
  Audio: TestAudio,
  Date: TestDate,
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key)
  },
  document: {
    getElementById: () => app,
    querySelector: () => null,
    documentElement: { classList: { toggle() {} } },
    body: { classList: { toggle() {} } },
    addEventListener() {}
  },
  window: {
    navigator: { userAgent: "test", standalone: false },
    matchMedia: () => ({ matches: false }),
    addEventListener() {},
    scrollTo() {},
    setInterval: () => 1,
    clearInterval() {}
  },
  navigator: {},
  location: { protocol: "file:" },
  setTimeout,
  clearTimeout
});

const scriptFiles = [...(readFileSync(new URL("../app/index.html", import.meta.url), "utf8"))
  .matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)]
  .map(match => match[1]).filter(file => !file.startsWith("vendor/"));
for (const file of scriptFiles) {
  vm.runInContext(readFileSync(resolve(root, "app", file), "utf8"), context);
}
const run = (code) => vm.runInContext(code, context);

const quickIds = run("COMMUNICATION_QUICK_ACTIONS.map((item) => item.id)");
for (const id of quickIds) {
  const asset = resolve(root, "app/assets/communication/audio", `${id}.mp3`);
  assert.ok(statSync(asset).size > 1000, `${id} debe tener audio`);
}

run('route = { view: "communication" }; selectCommunicationQuick("quick-bano")');
assert.equal(played.length, 1);
assert.equal(played[0].started, true);
assert.equal(run("communicationPhrase()"), "necesito ir al baño");
assert.ok(app.innerHTML.includes("communication-presentation"));

for (const [step, delay] of [2_000, 5_000, 10_000, 30_000, 60_000, 60_000].entries()) {
  played.at(-1).emit("ended");
  now += delay - 1;
  run('selectCommunicationQuick("quick-bano")');
  assert.equal(played.length, 1 + step, "la espera mantiene el mensaje visual sin repetir el audio");
  assert.ok(app.innerHTML.includes("presentation-audio-status"));
  now += 1;
  const before = played.length;
  run('selectCommunicationQuick("quick-bano")');
  assert.equal(played.length, before + 1, `el audio vuelve tras ${delay} ms`);
}

played.at(-1).emit("ended");
run('communicationQuickAudioStatesMemory = {}');
run('selectCommunicationQuick("quick-bano")');
assert.equal(played.length, 7, "la espera del picto persiste en almacenamiento");
now += 2_000;
run('selectCommunicationQuick("quick-ayuda")');
assert.equal(played.length, 8, "otro picto conserva su primera escucha independiente");
played.at(-1).emit("ended");
now += 5 * 60_000;
run('selectCommunicationQuick("quick-bano")');
assert.equal(played.length, 9, "tras cinco minutos sin uso el picto vuelve a empezar");
played.at(-1).emit("ended");
assert.equal(run('communicationQuickAudioRemainingMs("quick-bano")'), 2_000, "la secuencia reinicia en dos segundos");

run('setRoute({ view: "support-multiplication" })');
now += 2_000;
run("playMultiplicationSupportAudio()");
assert.equal(played.length, 10, "la primera escucha de una operación es libre");
assert.equal(played.at(-1).volume, 0.7, "Tablas limita también el reproductor web al 70 %");
assert.ok(app.innerHTML.includes('data-form="support-multiplication-answer"'));
played.at(-1).emit("ended");
now += 9_999;
run("playMultiplicationSupportAudio()");
assert.equal(played.length, 10, "la espera de diez segundos no alcanza para repetir sin responder");
run('unlockMultiplicationSupportAudio("999")');
run("playMultiplicationSupportAudio()");
assert.equal(played.length, 10, "un resultado incorrecto no desbloquea");
run('unlockMultiplicationSupportAudio(String(multiplicationSupportCurrent.product))');
run("playMultiplicationSupportAudio()");
assert.equal(played.length, 10, "el resultado correcto no adelanta la espera de diez segundos");
now += 1;
run("playMultiplicationSupportAudio()");
assert.equal(played.length, 11, "el resultado correcto habilita una repetición");
played.at(-1).emit("ended");
now += 10_000;
run("playMultiplicationSupportAudio()");
assert.equal(played.length, 11, "cada nueva repetición vuelve a requerir respuesta");
run("showNextMultiplicationSupportOperation(); playMultiplicationSupportAudio()");
assert.equal(played.length, 12, "una operación nueva tiene primera escucha libre");

// Regresión real de la A8: pausa de octubre de 2026 con reloj en agosto de 2025.
now = 1754689819649;
run('appSpeechNextAtMemory = 0; multiplicationAudioNextAtMemory = 0');
storage.set("ian-app-speech-next-at-v1", "1790938475548");
storage.delete("ian-multiplication-audio-next-at-v1");
assert.equal(run("multiplicationAudioRemainingMs()"), 0, "la fecha futura heredada no bloquea Tablas durante 419 días");
assert.equal(storage.has("ian-app-speech-next-at-v1"), false, "la pausa inválida se elimina del almacenamiento");

for (const [key, setter, reader, limit] of [
  ["ian-app-speech-next-at-v1", "setAppSpeechNextAt", "appSpeechRemainingMs", 2_000],
  ["ian-multiplication-audio-next-at-v1", "setMultiplicationAudioNextAt", "multiplicationAudioRemainingMs", 10_000]
]) {
  run(`${setter}(Date.now() + ${limit})`);
  assert.equal(run(`${reader}()`), limit, "la pausa normal conserva su límite");
  now += limit - 1;
  assert.equal(run(`${reader}()`), 1, "la pausa no se libera antes de tiempo");
  now += 1;
  assert.equal(run(`${reader}()`), 0, "la pausa vence normalmente");
  run(`${setter}(Date.now() + ${limit})`);
  now -= 60_000;
  assert.equal(run(`${reader}()`), 0, "un retroceso del reloj invalida la pausa en memoria y disco");
  assert.equal(storage.has(key), false);
  for (const invalid of ["Infinity", "NaN", String(now + limit + 1)]) {
    storage.set(key, invalid);
    assert.equal(run(`${reader}()`), 0, "un dato corrupto o fuera de límite no bloquea el audio");
  }
}

storage.delete("ian-communication-general-recents-v1");
storage.set("ian-communication-recents-v2", JSON.stringify({ "yo-quiero": ["tele"], "me-siento": ["triste"] }));
assert.deepEqual(JSON.parse(run("JSON.stringify(readGeneralCommunicationRecents().slice(0, 2))")), [{ kind: "picto", id: "tele" }, { kind: "picto", id: "triste" }], "se conservan los pictos anteriores de distintas secciones");
run('selectCommunicationStarter("yo-quiero"); addCommunicationPicto("casa")');
assert.equal(run("readGeneralCommunicationRecents()[0].id"), "casa");
run('communicationWrittenText = "mensaje general"; showCommunicationPresentation()');
assert.equal(run("readGeneralCommunicationRecents()[0].kind"), "message", "los mensajes entran en el mismo orden de uso");
run('selectCommunicationStarter("me-siento"); addCommunicationPicto("triste")');
assert.equal(run("readGeneralCommunicationRecents()[0].id"), "triste");
const recentGrid = run("renderGeneralCommunicationRecents()");
assert.ok(recentGrid.indexOf('data-picto="triste"') < recentGrid.indexOf("mensaje general"), "el último picto aparece antes que mensajes antiguos");
run("selectGeneralCommunicationRecent(1)");
assert.equal(run("readGeneralCommunicationRecents()[0].kind"), "message", "reutilizar un mensaje lo lleva al primer lugar");
assert.equal(run("communicationStarter"), "yo-quiero", "el mensaje conserva su inicio original");
run('addCommunicationPicto("casa"); addCommunicationPicto("casa")');
assert.equal(run('readGeneralCommunicationRecents().filter(entry => entry.id === "casa").length'), 1, "reutilizar no duplica tarjetas");
assert.equal(run("readGeneralCommunicationRecents()[0].id"), "casa");

// El techo Android se aplica antes de sonar y se libera al terminar, salir o
// fallar. Una respuesta nativa tardía nunca reproduce una operación abandonada.
const flush = () => new Promise(resolve => setImmediate(resolve));
const volumeCalls = [];
let allowVolume;
context.window.Capacitor = { isNativePlatform: () => true, Plugins: { StoryVolume: {
  begin: args => { volumeCalls.push(["begin", args.token]); return new Promise(resolve => { allowVolume = resolve; }); },
  refresh: args => { volumeCalls.push(["refresh", args.token]); return Promise.resolve(); },
  end: args => { volumeCalls.push(["end", args.token]); return Promise.resolve(); }
} } };
run("stopMultiplicationSupportAudio(); setAppSpeechNextAt(0); setMultiplicationAudioNextAt(0); drawMultiplicationSupportOperation(); playMultiplicationSupportAudio()");
const nativeAudio = played.at(-1);
assert.equal(nativeAudio.started, undefined, "no suena antes de que Android aplique el techo");
allowVolume(); await flush(); assert.equal(nativeAudio.started, true);
now += 1000; nativeAudio.emit("timeupdate"); assert.equal(volumeCalls.at(-1)[0], "refresh");
nativeAudio.emit("ended"); assert.equal(volumeCalls.at(-1)[0], "end");
assert.equal(run("appSpeechAudio"), null);

now += 10_000;
run("drawMultiplicationSupportOperation(); playMultiplicationSupportAudio()");
const abandoned = played.at(-1);
run("stopMultiplicationSupportAudio()"); assert.equal(volumeCalls.at(-1)[0], "end");
allowVolume(); await flush(); assert.equal(abandoned.started, undefined);

context.window.Capacitor.Plugins.StoryVolume.begin = () => Promise.reject(Error("Volume unavailable"));
run("toast = () => {}");
now += 10_000;
run("drawMultiplicationSupportOperation(); playMultiplicationSupportAudio()");
await flush();
assert.equal(run("appSpeechAudio"), null);
assert.equal(run("multiplicationSupportAudioPlayed"), false);
assert.equal(run("multiplicationAudioRemainingMs()"), 0, "un fallo de volumen permite reintentar");

delete context.window.Capacitor;
TestAudio.failNext = true;
run("drawMultiplicationSupportOperation(); playMultiplicationSupportAudio()");
assert.equal(run("appSpeechAudio"), null);
assert.equal(run("multiplicationSupportAudioPlayed"), false, "un fallo síncrono tampoco consume la escucha");
console.log("Audio y recientes verificados: pausas, techo de volumen de Tablas, fallos, navegación y orden de uso.");
