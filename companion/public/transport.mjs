function nativePlugin() {
  if (!globalThis.window?.Capacitor?.isNativePlatform?.()) return null;
  const plugin = window.Capacitor.Plugins?.Companion;
  if (!plugin) throw new Error("Falta actualizar la aplicación para usar el compañero.");
  return plugin;
}

export async function nativeConfiguration() {
  const plugin = nativePlugin();
  return plugin ? plugin.getConfig() : null;
}

export async function request(route, payload, options = {}) {
  if (!["config", "session", "heartbeat", "stop"].includes(route)) throw new Error("Pedido no permitido.");
  const plugin = nativePlugin();
  if (plugin) {
    const result = await plugin.request({ route, ...(payload ? { payload } : {}) });
    return { ok: result.status >= 200 && result.status < 300, json: async () => result.body };
  }
  return fetch(`/api/companion/${route}`, payload ? {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), keepalive: options.keepalive || false,
    signal: AbortSignal.timeout(route === "session" ? 35000 : 6000),
  } : { cache: "no-store" });
}

export function closeOnExit(payload) {
  if (nativePlugin()) { void request("stop", payload).catch(() => {}); return; }
  navigator.sendBeacon("/api/companion/stop", new Blob([JSON.stringify(payload)], { type: "application/json" }));
}
