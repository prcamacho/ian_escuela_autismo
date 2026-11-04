import WebSocket from "ws";
import { randomUUID } from "node:crypto";
import { createSessionConfig } from "./session-config.mjs";

export class VoiceError extends Error {
  constructor(code, status = 502) { super(code); this.code = code; this.status = status; }
}

export function createOpenAIProvider(apiKey) {
  return {
    async create(sdp) {
      if (!apiKey) throw new VoiceError("missing_key", 503);
      let response;
      try {
        response = await fetch("https://api.openai.com/v1/live/sessions", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ session: createSessionConfig(), transport: { type: "webrtc", sdp } }),
          signal: AbortSignal.timeout(20_000),
        });
      } catch { throw new VoiceError("provider_unreachable"); }
      if (!response.ok) {
        // Never forward provider response bodies, SDP, credentials or transcripts to logs.
        const codes = { 401: "invalid_key", 403: "permissions", 429: "quota" };
        throw new VoiceError(codes[response.status] || "provider_error");
      }
      const result = await response.json();
      if (!result.session?.id || !result.transport?.sdp) throw new VoiceError("invalid_answer");
      return { id: result.session.id, sdp: result.transport.sdp };
    },
    attach(id, onEnd) {
      return new Promise((resolve, reject) => {
        const socket = new WebSocket(`wss://api.openai.com/v1/live/sessions/${encodeURIComponent(id)}/attach`, {
          headers: { Authorization: `Bearer ${apiKey}` }, handshakeTimeout: 8000,
        });
        let opened = false;
        let confirmed = false;
        let closing;
        let finishClose;
        const controller = {
          close() {
            if (closing) return closing;
            closing = new Promise((done) => {
              const timer = setTimeout(() => { socket.terminate(); done(confirmed); }, 2500);
              finishClose = () => { clearTimeout(timer); socket.close(); done(confirmed); };
              if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: "session.close", event_id: randomUUID() }));
              else finishClose();
            });
            return closing;
          },
        };
        socket.on("open", () => { opened = true; resolve(controller); });
        socket.on("message", (bytes) => {
          // The sideband owns lifecycle only. Conversation tools run once, in the browser.
          // Audio and transcript events are discarded, never persisted.
          let event;
          try { event = JSON.parse(bytes.toString()); } catch { return; }
          if (event.type === "session.closed") {
            confirmed = true;
            finishClose?.();
            onEnd("closed");
          }
        });
        socket.on("error", () => { if (!opened) reject(new VoiceError("session_control_unavailable")); });
        socket.on("close", () => {
          if (!opened) reject(new VoiceError("session_control_unavailable"));
          finishClose?.();
          onEnd(confirmed ? "closed" : "control_lost");
        });
      });
    },
  };
}
