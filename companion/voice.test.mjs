import test from "node:test";
import assert from "node:assert/strict";
import { VoiceSession } from "./public/voice.mjs";

function setup(t, { captureError, delayCapture, delayedCreate } = {}) {
  const original = {};
  const replace = (key, value) => {
    original[key] = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value, writable: true });
  };
  const track = { stopped: false, enabled: true, stop() { this.stopped = true; } };
  const stream = { getTracks: () => [track] };
  const requests = [];
  const sent = [];
  const states = [];
  let pc;
  class Channel extends EventTarget {
    readyState = "open";
    send(value) { sent.push(JSON.parse(value)); }
    emit(event) { this.dispatchEvent(new MessageEvent("message", { data: JSON.stringify(event) })); }
  }
  class Peer extends EventTarget {
    iceGatheringState = "complete";
    localDescription = { sdp: "v=0\r\nm=audio simulated" };
    connectionState = "connected";
    constructor() { super(); pc = this; }
    addTrack() {}
    createDataChannel() { return this.channel = new Channel(); }
    async createOffer() { return this.localDescription; }
    async setLocalDescription() {}
    async setRemoteDescription() { this.channel.emit({ type: "session.started" }); }
    close() { this.connectionState = "closed"; }
  }
  replace("window", new EventTarget());
  window.RTCPeerConnection = Peer;
  replace("RTCPeerConnection", Peer);
  replace("document", new EventTarget());
  replace("navigator", { mediaDevices: {}, sendBeacon(url, body) { requests.push({ url, beacon: true }); return true; } });
  replace("fetch", async (url, options = {}) => {
    const payload = options.body ? JSON.parse(options.body) : undefined;
    requests.push({ url, payload });
    if (url.endsWith("/config")) return Response.json({ csrf: "test-token", voiceConfigured: true });
    if (url.endsWith("/session")) { if (delayedCreate) await delayedCreate; return Response.json({ sdp: "answer", maxSessionSeconds: 180 }); }
    return Response.json({ closed: true });
  });
  const audio = { srcObject: null, pause() {}, async play() {} };
  const voice = new VoiceSession({ audio, onState: (state, detail) => states.push({ state, detail }), onCaption() {}, onTool: () => ({ ok: true }), onTime() {}, capture: async () => {
    if (captureError) throw captureError;
    if (delayCapture) await delayCapture;
    return stream;
  } });
  t.after(async () => {
    await voice.stop();
    for (const [key, descriptor] of Object.entries(original)) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; }
  });
  return { voice, track, requests, sent, states, get pc() { return pc; } };
}

test("cargar configuración no abre micrófono ni crea sesiones pagas", async t => {
  const env = setup(t);
  await env.voice.configure();
  assert.deepEqual(env.requests.map(item => item.url), ["/api/companion/config"]);
  assert.equal(env.pc, undefined);
});
test("voz conecta, saluda, pausa y libera micrófono al terminar", async t => {
  const env = setup(t);
  await env.voice.start("Juego local");
  assert.equal(env.voice.state, "live");
  assert.ok(env.sent.some(event => event.type === "session.instructions.append"));
  env.voice.toggleMute();
  assert.equal(env.track.enabled, false);
  assert.equal(env.voice.state, "muted");
  env.voice.toggleMute();
  assert.equal(env.track.enabled, true);
  await env.voice.stop();
  assert.equal(env.track.stopped, true);
  assert.equal(env.pc.connectionState, "closed");
  assert.equal(env.voice.state, "idle");
  assert.ok(env.sent.some(event => event.type === "session.close"));
  assert.equal(env.requests.filter(item => item.url.endsWith("/session")).length, 1);
});
test("denegar micrófono no crea ni consume una sesión", async t => {
  const env = setup(t, { captureError: new DOMException("denied", "NotAllowedError") });
  await env.voice.start("Juego local");
  assert.equal(env.voice.state, "error");
  assert.ok(env.states.at(-1).detail.includes("permiso"));
  assert.ok(!env.requests.some(item => item.url.endsWith("/session")));
});
test("cancelar mientras se espera permiso apaga cualquier micrófono que llegue tarde", async t => {
  let release;
  const env = setup(t, { delayCapture: new Promise(resolve => { release = resolve; }) });
  const connecting = env.voice.start("Juego local");
  await new Promise(resolve => setImmediate(resolve));
  await env.voice.stop();
  release(); await connecting;
  assert.equal(env.track.stopped, true);
  assert.ok(!env.requests.some(item => item.url.endsWith("/session")));
});
test("cancelar durante la creación vuelve a cerrar la respuesta tardía", async t => {
  let release;
  const env = setup(t, { delayedCreate: new Promise(resolve => { release = resolve; }) });
  const connecting = env.voice.start("Juego local");
  await new Promise(resolve => setImmediate(resolve));
  await env.voice.stop();
  release(); await connecting;
  assert.equal(env.track.stopped, true);
  assert.equal(env.pc.connectionState, "closed");
  assert.equal(env.requests.filter(item => item.url.endsWith("/stop")).length, 2);
});
test("salir de la página cierra pistas y notifica al servidor sin esperar", async t => {
  const env = setup(t);
  await env.voice.start("Juego local");
  window.dispatchEvent(new Event("pagehide"));
  assert.equal(env.track.stopped, true);
  assert.equal(env.pc.connectionState, "closed");
  assert.ok(env.requests.some(item => item.beacon));
});
