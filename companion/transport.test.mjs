import test from "node:test";
import assert from "node:assert/strict";
import { request, closeOnExit, nativeConfiguration } from "./public/transport.mjs";

test("Android usa el puente nativo sin exponer claves ni hacer fetch al origen escolar", async t => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousFetch = globalThis.fetch;
  const calls = [];
  const plugin = { getConfig: async () => ({ enabled: true, connection: "internet" }), request: async args => { calls.push(args); return { status: 200, body: { closed: true } }; } };
  globalThis.window = { Capacitor: { isNativePlatform: () => true, Plugins: { Companion: plugin } } };
  globalThis.fetch = () => { throw new Error("Android no debe hacer fetch al origen escolar"); };
  t.after(() => { if (previous) Object.defineProperty(globalThis, "window", previous); else delete globalThis.window; globalThis.fetch = previousFetch; });
  assert.equal((await nativeConfiguration()).enabled, true);
  const response = await request("session", { csrf: "csrf", lease: "test", sdp: "offer" });
  assert.equal(response.ok, true);
  assert.deepEqual(calls[0], { route: "session", payload: { csrf: "csrf", lease: "test", sdp: "offer" } });
  closeOnExit({ csrf: "csrf", lease: "test" });
  assert.equal(calls[1].route, "stop");
  await assert.rejects(request("https://otro.example"), /no permitido/);
});
