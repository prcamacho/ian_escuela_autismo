import http from "node:http";
import { readFile, realpath } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { VoiceError, createOpenAIProvider } from "./provider.mjs";
import { SESSION_LIMIT_MS } from "./session-config.mjs";

const appRoot = fileURLToPath(new URL("../app/", import.meta.url));
const publicRoot = fileURLToPath(new URL("./public/", import.meta.url));
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".mp3": "audio/mpeg", ".webp": "image/webp", ".woff2": "font/woff2" };
const leasePattern = /^[a-zA-Z0-9-]{20,80}$/;

export function createCompanionServer({ apiKey = process.env.OPENAI_API_KEY, provider = createOpenAIProvider(apiKey), deviceToken = "", apiOnly = false, maxSessionMs = SESSION_LIMIT_MS, heartbeatMs = 20_000, cooldownMs = 2000 } = {}) {
  if (apiOnly && !/^[a-f0-9]{64}$/.test(deviceToken)) throw new Error("El servicio requiere una credencial de tablet válida.");
  const csrf = randomBytes(32).toString("hex");
  let active = null;
  let nextStart = 0;
  const closed = new Map();

  function json(res, status, data) {
    if (!res.destroyed) { res.writeHead(status, { "Content-Type": "application/json" }); res.end(JSON.stringify(data)); }
  }
  async function body(req) {
    if (!req.headers["content-type"]?.startsWith("application/json")) throw new VoiceError("invalid_request", 415);
    let size = 0;
    const chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 65536) throw new VoiceError("request_too_large", 413);
      chunks.push(chunk);
    }
    try { return JSON.parse(Buffer.concat(chunks).toString()); } catch { throw new VoiceError("invalid_request", 400); }
  }
  function rememberClosed(lease, confirmed = true) {
    closed.set(lease, confirmed);
    if (closed.size > 30) closed.delete(closed.keys().next().value);
  }
  async function stop(session) {
    if (!session) return true;
    session.cancelled = true;
    // A create request may finish after the browser has already cancelled it.
    if (!session.controller) return false;
    if (session.stopping) return session.stopping;
    session.stopping = (async () => {
      const confirmed = await session.controller.close();
      if (active === session) active = null;
      rememberClosed(session.lease, confirmed);
      return confirmed;
    })();
    return session.stopping;
  }

  const server = http.createServer(async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Permissions-Policy", "microphone=(self), camera=()");
    if (apiOnly && req.url === "/health" && req.method === "GET") return json(res, 200, { ok: true });
    const port = server.address()?.port;
    const allowedHosts = [`localhost:${port}`, `127.0.0.1:${port}`];
    if (!apiOnly && !allowedHosts.includes(req.headers.host)) return json(res, 403, { error: "local_only" });
    if (req.headers["sec-fetch-site"] === "cross-site") return json(res, 403, { error: "wrong_origin" });
    try {
      const path = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
      if (path.startsWith("/api/companion/")) {
        const expected = Buffer.from(`Bearer ${deviceToken}`);
        const supplied = Buffer.from(req.headers.authorization || "");
        const authorizedDevice = Boolean(deviceToken) && expected.length === supplied.length && timingSafeEqual(expected, supplied);
        if (deviceToken && !authorizedDevice) return json(res, 401, { error: "device_not_authorized" });
        if (req.method === "GET" && path === "/api/companion/config") return json(res, 200, { csrf, voiceConfigured: Boolean(apiKey), maxSessionSeconds: Math.floor(maxSessionMs / 1000) });
        if (req.method !== "POST") return json(res, 405, { error: "method" });
        if (!authorizedDevice && req.headers.origin !== `http://${req.headers.host}`) return json(res, 403, { error: "wrong_origin" });
        const payload = await body(req);
        if (payload?.csrf !== csrf) return json(res, 403, { error: "invalid_token" });
        if (!leasePattern.test(payload.lease || "")) return json(res, 400, { error: "invalid_request" });
        if (path === "/api/companion/stop") {
          if (active?.lease !== payload.lease) return json(res, 200, { closed: closed.get(payload.lease) === true });
          return json(res, 200, { closed: await stop(active) });
        }
        if (path === "/api/companion/heartbeat") {
          if (!active || active.lease !== payload.lease || active.cancelled) return json(res, 410, { error: "session_ended" });
          active.lastSeen = Date.now();
          return json(res, 200, { remainingSeconds: Math.max(0, Math.ceil((active.deadline - Date.now()) / 1000)) });
        }
        if (path !== "/api/companion/session") return json(res, 404, { error: "not_found" });
        if (!apiKey) return json(res, 503, { error: "missing_key" });
        if (typeof payload.sdp !== "string" || !payload.sdp.startsWith("v=0") || !payload.sdp.includes("m=audio")) return json(res, 400, { error: "invalid_offer" });
        if (active) return json(res, 409, { error: "session_busy" });
        if (Date.now() < nextStart || closed.has(payload.lease)) return json(res, 429, { error: "wait_before_retry" });
        nextStart = Date.now() + cooldownMs;
        const session = { lease: payload.lease, lastSeen: Date.now(), deadline: Date.now() + maxSessionMs, cancelled: false };
        active = session;
        res.on("close", () => { if (!res.writableEnded) void stop(session); });
        try {
          const result = await provider.create(payload.sdp);
          session.id = result.id;
          const onEnd = (reason) => {
            if (reason === "closed") { rememberClosed(session.lease); if (active === session) active = null; }
            else { session.cancelled = true; /* Browser also closes when heartbeat reports ended. */ }
          };
          try { session.controller = await provider.attach(result.id, onEnd); }
          catch {
            // Reattach once only to close the already-created session; never recreate it.
            try { session.controller = await provider.attach(result.id, onEnd); await stop(session); } catch { /* Primary WebRTC has not connected. */ }
            throw new VoiceError("session_control_unavailable");
          }
          if (session.cancelled || res.destroyed) { await stop(session); return json(res, 409, { error: "session_ended" }); }
          return json(res, 201, { sdp: result.sdp, maxSessionSeconds: Math.floor(maxSessionMs / 1000) });
        } catch (error) {
          if (active === session) active = null;
          rememberClosed(session.lease, !session.id);
          throw error;
        }
      }
      if (apiOnly) return json(res, 404, { error: "not_found" });
      if (!["GET", "HEAD"].includes(req.method)) return json(res, 405, { error: "method" });
      if (path === "/companion") { res.writeHead(302, { Location: "/companion/" }); return res.end(); }
      // Only these two public directories are served. The root .env is never reachable.
      const root = path.startsWith("/companion/") ? publicRoot : appRoot;
      const relative = root === publicRoot ? path.slice("/companion/".length) : path.slice(1);
      if (relative.split(/[\\/]/).some(p => p.startsWith(".")) || relative.includes(":")) throw new VoiceError("not_found", 404);
      if (relative === "service-worker.js") throw new VoiceError("not_found", 404);
      const file = await realpath(resolve(root, relative || "index.html"));
      if (!file.startsWith(resolve(root) + sep) || !mime[extname(file)]) throw new VoiceError("not_found", 404);
      let contents = await readFile(file);
      if (root === appRoot && file === resolve(appRoot, "index.html")) {
        contents = Buffer.from(contents.toString().replace('<script src="app.js', '<script src="/companion/local-flag.js"></script>\n    <script src="app.js'));
      }
      res.writeHead(200, { "Content-Type": mime[extname(file)], "Content-Length": contents.length });
      res.end(req.method === "HEAD" ? undefined : contents);
    } catch (error) {
      const status = error instanceof VoiceError ? error.status : error.code === "ENOENT" ? 404 : 500;
      json(res, status, { error: error instanceof VoiceError ? error.code : status === 404 ? "not_found" : "server_error" });
    }
  });
  server.requestTimeout = 30_000;
  const watchdog = setInterval(() => {
    if (active && (active.cancelled || Date.now() > active.deadline || Date.now() - active.lastSeen > heartbeatMs)) void stop(active);
  }, 500);
  watchdog.unref();
  server.on("close", () => clearInterval(watchdog));
  return { server, async shutdown() { clearInterval(watchdog); await stop(active); server.close(); server.closeIdleConnections(); } };
}
