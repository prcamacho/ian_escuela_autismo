import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { randomUUID } from "node:crypto";
import http from "node:http";
import { createCompanionServer } from "./server.mjs";
import { createSessionConfig } from "./session-config.mjs";

const offer = "v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n";
async function setup(t, options = {}) {
  const calls = { create: 0, close: 0 };
  const app = createCompanionServer({ apiKey: "test-secret-never-served", cooldownMs: 0, provider: {
    async create() { calls.create++; return { id: "opaque-session-id", sdp: "answer" }; },
    async attach(id, onEnd) { return { async close() { calls.close++; onEnd("closed"); return true; } }; },
  }, ...options });
  app.server.listen(0, "127.0.0.1"); await once(app.server, "listening");
  t.after(() => app.shutdown());
  const origin = `http://127.0.0.1:${app.server.address().port}`;
  const config = await (await fetch(`${origin}/api/companion/config`, { headers: options.deviceToken ? { Authorization: `Bearer ${options.deviceToken}` } : {} })).json();
  const post = (route, payload, headers = {}) => fetch(`${origin}/api/companion/${route}`, { method: "POST", headers: { "Content-Type": "application/json", Origin: origin, ...headers }, body: JSON.stringify({ csrf: config.csrf, lease: randomUUID(), ...payload }) });
  return { app, origin, config, post, calls };
}
test("servidor sirve el ejercicio pero no secretos, archivos del servidor ni service worker", async t => {
  const { origin } = await setup(t);
  for (const path of ["/.env", "/companion/../.env", "/companion/%2e%2e%5c.env", "/companion/server.mjs", "/package.json", "/service-worker.js"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
    assert.ok(!(await response.text()).includes("test-secret-never-served"));
  }
  const home = await (await fetch(origin)).text();
  assert.ok(home.includes("/companion/local-flag.js"));
  const exercise = await fetch(origin + "/companion/");
  assert.equal(exercise.status, 200);
  assert.equal(exercise.headers.get("cache-control"), "no-store");
  assert.ok((await exercise.text()).includes("Quiero hablar"));
});
test("origen, token, host y tamaño se verifican antes de crear sesiones", async t => {
  const { origin, post, calls } = await setup(t);
  assert.equal((await post("session", { sdp: offer }, { Origin: "https://otro-sitio.example" })).status, 403);
  assert.equal((await post("session", { sdp: offer, csrf: "incorrecto" })).status, 403);
  assert.equal((await post("session", { sdp: "no SDP" })).status, 400);
  assert.equal((await post("session", { sdp: "x".repeat(66_000) })).status, 413);
  const hostStatus = await new Promise((resolve, reject) => {
    http.get(origin, { headers: { Host: "attacker.example" } }, response => { response.resume(); resolve(response.statusCode); }).on("error", reject);
  });
  assert.equal(hostStatus, 403);
  assert.equal(calls.create, 0);
});
test("una sola conversación; finalizar cierra proveedor y libera otra ronda", async t => {
  const { post, calls } = await setup(t);
  const lease = randomUUID();
  assert.equal((await post("session", { sdp: offer, lease })).status, 201);
  assert.equal((await post("session", { sdp: offer })).status, 409);
  assert.equal((await post("heartbeat", { lease: randomUUID() })).status, 410);
  assert.equal((await post("heartbeat", { lease })).status, 200);
  assert.deepEqual(await (await post("stop", { lease })).json(), { closed: true });
  assert.deepEqual(await (await post("stop", { lease })).json(), { closed: true });
  assert.equal(calls.create, 1); assert.equal(calls.close, 1);
  assert.equal((await post("session", { sdp: offer })).status, 201);
});
test("una creación que termina después de cancelar se cierra, sin quedar huérfana", async t => {
  let release;
  let didCreate;
  const started = new Promise(resolve => { didCreate = resolve; });
  let closes = 0;
  const { post } = await setup(t, { provider: {
    async create() { didCreate(); await new Promise(resolve => { release = resolve; }); return { id: "late", sdp: "answer" }; },
    async attach(id, end) { return { async close() { closes++; end("closed"); return true; } }; },
  } });
  const lease = randomUUID();
  const creating = post("session", { lease, sdp: offer });
  await started;
  await post("stop", { lease });
  release();
  assert.equal((await creating).status, 409);
  assert.equal(closes, 1);
});
test("el servidor cierra una sesión sin latidos aunque el navegador desaparezca", async t => {
  const { post, calls } = await setup(t, { heartbeatMs: 30 });
  const lease = randomUUID();
  await post("session", { sdp: offer, lease });
  await new Promise(resolve => setTimeout(resolve, 650));
  assert.equal(calls.close, 1);
  assert.equal((await post("heartbeat", { lease })).status, 410);
});
test("un cierre no confirmado nunca se reporta luego como confirmado", async t => {
  const { post } = await setup(t, { provider: {
    async create() { return { id: "session", sdp: "answer" }; },
    async attach() { return { async close() { return false; } }; },
  } });
  const lease = randomUUID();
  await post("session", { sdp: offer, lease });
  assert.deepEqual(await (await post("stop", { lease })).json(), { closed: false });
  assert.deepEqual(await (await post("stop", { lease })).json(), { closed: false });
});
test("la configuración no guarda sesiones ni incorpora datos del perfil escolar", () => {
  const config = createSessionConfig();
  assert.equal(config.store, false);
  assert.equal(config.model, "gpt-live-1");
  assert.ok(!JSON.stringify(config).includes("Ian"));
  assert.deepEqual(config.delegation.responses.tools.map(tool => tool.name), ["consultar_turno", "elegir_picto", "mostrar_opciones", "registrar_intento", "cerrar_conversacion"]);
});

test("servicio de Internet exige credencial de tablet y no publica la app ni las claves", async t => {
  const deviceToken = "a".repeat(64);
  const { origin, config, calls } = await setup(t, { apiOnly: true, deviceToken });
  assert.equal((await fetch(origin + "/health")).status, 200);
  for (const path of ["/", "/companion/", "/.env", "/.companion-device.json"]) assert.equal((await fetch(origin + path)).status, 404);
  for (const headers of [{}, { Authorization: "Bearer incorrecta" }]) {
    assert.equal((await fetch(origin + "/api/companion/config", { headers })).status, 401);
    assert.equal((await fetch(origin + "/api/companion/session", { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ csrf: config.csrf, lease: randomUUID(), sdp: offer }) })).status, 401);
  }
  assert.equal(calls.create, 0);
  assert.ok(!JSON.stringify(config).includes(deviceToken));
  const lease = randomUUID();
  const headers = { Authorization: `Bearer ${deviceToken}`, "Content-Type": "application/json" };
  assert.equal((await fetch(origin + "/api/companion/session", { method: "POST", headers, body: JSON.stringify({ csrf: config.csrf, lease, sdp: offer }) })).status, 201);
  assert.equal(calls.create, 1);
  assert.equal((await fetch(origin + "/api/companion/stop", { method: "POST", headers, body: JSON.stringify({ csrf: config.csrf, lease }) })).status, 200);
});

test("servicio de Internet se niega a arrancar sin credencial", () => {
  assert.throws(() => createCompanionServer({ apiOnly: true }), /credencial/);
});
