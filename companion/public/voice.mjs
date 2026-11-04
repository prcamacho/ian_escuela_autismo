import { ConversationToolHandler } from "./tools.mjs";
import { request, closeOnExit } from "./transport.mjs";

const messages = {
  missing_key: "Falta configurar la clave en el archivo .env.",
  invalid_key: "La clave no es válida. Revisá la configuración de OpenAI.",
  permissions: "La clave necesita permiso de escritura para Live y Responses.",
  quota: "OpenAI no permitió la conexión. Revisá el saldo y los límites de la API.",
  session_busy: "Ya hay una conversación abierta. Cerrala antes de empezar otra.",
  wait_before_retry: "Esperá unos segundos antes de volver a conectar.",
  session_control_unavailable: "No se pudo establecer el control de la sesión de voz.",
  provider_unreachable: "No pude conectar con OpenAI. Revisá Internet.",
  provider_error: "OpenAI rechazó la conexión de voz. Revisá el acceso a GPT-Live.",
  session_ended: "La conversación terminó. Podés empezar otra.",
  device_not_authorized: "La voz está habilitada únicamente en la tablet autorizada.",
};
function withTimeout(promise, ms, fallback) {
  let timer;
  return Promise.race([promise, new Promise(resolve => { timer = setTimeout(() => resolve(fallback), ms); })]).finally(() => clearTimeout(timer));
}

export class VoiceSession {
  constructor({ audio, onState, onCaption, onTool, onTime = () => {}, onMedia = () => {}, capture = () => navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }) }) {
    Object.assign(this, { audio, onState, onCaption, onTool, onTime, onMedia, capture });
    this.state = "idle";
    this.config = null;
    this.generation = 0;
    this.onPageExit = () => this.emergencyClose();
    window.addEventListener("pagehide", this.onPageExit);
    window.addEventListener("offline", this.onPageExit);
    document.addEventListener("visibilitychange", () => { if (document.hidden) void this.stop("Voz cerrada al salir de la pantalla."); });
  }
  status(state, detail = "") { this.state = state; this.onState(state, detail); }
  async configure() {
    const response = await request("config");
    const config = await response.json();
    if (!response.ok) throw new Error(messages[config.error] || "No pude conectar con el compañero.");
    this.config = config;
    return this.config;
  }
  async post(endpoint, body, { keepalive = false } = {}) {
    const response = await request(endpoint, { ...body, csrf: this.config.csrf }, { keepalive });
    const result = await response.json();
    if (!response.ok) throw new Error(messages[result.error] || "No se pudo completar la conexión de voz.");
    return result;
  }
  send(event) {
    if (this.channel?.readyState !== "open" || !this.started) return false;
    this.channel.send(JSON.stringify({ event_id: crypto.randomUUID(), ...event }));
    return true;
  }
  context(content) { this.send({ type: "session.thinking.append", delegation_id: null, content }); }
  instruct(content) { this.send({ type: "session.instructions.append", delegation_id: null, content }); }
  async start(context) {
    if (!["idle", "error"].includes(this.state)) return;
    const generation = ++this.generation;
    this.status("connecting", "Conectando…");
    this.started = false;
    this.closeConfirmed = false;
    this.lease = crypto.randomUUID();
    const lease = this.lease;
    try {
      if (!this.config) await this.configure();
      if (!this.config.voiceConfigured) throw new Error(messages.missing_key);
      if (!window.RTCPeerConnection || !navigator.mediaDevices) throw new Error("La voz necesita Chrome o Edge en localhost o HTTPS.");
      const stream = await this.capture();
      if (generation !== this.generation) { stream.getTracks().forEach(track => track.stop()); return; }
      this.stream = stream;
      this.onMedia("input", stream);
      const pc = this.pc = new RTCPeerConnection();
      pc.addEventListener("track", event => {
        this.audio.srcObject = event.streams[0] || new MediaStream([event.track]);
        this.onMedia("output", this.audio.srcObject);
        this.audio.play().catch(() => this.onState(this.state, "Tocá Activar sonido para escuchar."));
      });
      pc.addEventListener("connectionstatechange", () => {
        if (pc.connectionState === "failed") void this.stop("Se perdió la conexión. Podés volver a empezar.");
        if (pc.connectionState === "disconnected") {
          clearTimeout(this.disconnectTimer);
          this.disconnectTimer = setTimeout(() => { if (pc.connectionState === "disconnected") void this.stop("Se perdió la conexión."); }, 4000);
        }
      });
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
      const channel = this.channel = pc.createDataChannel("oai-events");
      const tools = new ConversationToolHandler({ send: event => this.send(event), execute: (name, args) => this.onTool(name, args) });
      let startedResolve;
      const ready = new Promise(resolve => { startedResolve = resolve; });
      channel.addEventListener("message", ({ data }) => {
        let event;
        try { event = JSON.parse(data); } catch { return; }
        if (event.type === "session.started") { this.started = true; startedResolve(true); }
        if (event.type === "session.closed") { this.closeConfirmed = true; if (this.state !== "closing") void this.stop("Conversación terminada."); }
        if (event.type === "session.input_transcript.delta") this.onCaption("user", event);
        if (event.type === "session.output_transcript.delta") this.onCaption("assistant", event);
        if (event.type === "error") void this.stop("La sesión informó un error. Podés volver a empezar.");
        tools.handle(event).catch(() => void this.stop("No pude completar una acción de voz."));
      });
      channel.addEventListener("close", () => { if (["live", "muted"].includes(this.state)) void this.stop("Conversación desconectada."); });
      await pc.setLocalDescription(await pc.createOffer());
      if (pc.iceGatheringState !== "complete") {
        await withTimeout(new Promise(resolve => pc.addEventListener("icegatheringstatechange", () => { if (pc.iceGatheringState === "complete") resolve(); })), 6000);
      }
      if (generation !== this.generation) return;
      this.requested = true;
      const result = await this.post("session", { lease, sdp: pc.localDescription.sdp });
      if (generation !== this.generation) { await this.post("stop", { lease }).catch(() => {}); return; }
      await pc.setRemoteDescription({ type: "answer", sdp: result.sdp });
      const didStart = await withTimeout(ready, 12_000, false);
      if (generation !== this.generation) return;
      if (!didStart) throw new Error("No se pudo abrir el canal de voz. Revisá la conexión e intentá otra vez.");
      this.status("live", "Te escucho");
      this.context(context);
      this.instruct("Comenzá ahora con 'Hola. ¿Qué te gusta?'. Ya están visibles los pictos Pac-Man, pelota y música. Esperá la elección o una respuesta; no cambies esos pictos todavía.");
      this.deadline = Date.now() + result.maxSessionSeconds * 1000;
      this.heartbeat = setInterval(() => {
        this.post("heartbeat", { lease }).catch(() => void this.stop("La sesión terminó o perdió la conexión."));
      }, 5000);
      this.clock = setInterval(() => {
        const seconds = Math.max(0, Math.ceil((this.deadline - Date.now()) / 1000));
        this.onTime(seconds);
        if (!seconds) void this.stop("Terminó esta ronda de voz. Podés empezar otra.");
      }, 1000);
    } catch (error) {
      if (generation !== this.generation) return;
      const message = ["NotAllowedError", "PermissionDeniedError"].includes(error.name) ? "El micrófono no tiene permiso. Habilitalo en el navegador y volvé a empezar." : error.name === "NotFoundError" ? "No encontré un micrófono conectado." : error.message;
      await this.stop();
      this.status("error", message);
    }
  }
  toggleMute() {
    if (!["live", "muted"].includes(this.state)) return;
    const muted = this.state === "live";
    this.stream?.getTracks().forEach(track => { track.enabled = !muted; });
    this.send({ type: muted ? "session.input_audio.mute" : "session.input_audio.unmute" });
    this.status(muted ? "muted" : "live", muted ? "Micrófono pausado · la sesión sigue abierta" : "Te escucho");
  }
  releaseMedia() {
    clearInterval(this.heartbeat); clearInterval(this.clock); clearTimeout(this.disconnectTimer);
    this.stream?.getTracks().forEach(track => track.stop());
    this.stream = null;
    this.onMedia("input", null); this.onMedia("output", null);
    this.pc?.close(); this.pc = null;
    this.audio.pause(); this.audio.srcObject = null;
    this.channel = null; this.started = false;
  }
  async stop(message = "Voz desconectada") {
    if (this.state === "closing") return this.closing;
    if (this.state === "idle" && !this.pc) return;
    ++this.generation;
    this.status("closing", "Cerrando voz…");
    this.stream?.getTracks().forEach(track => track.stop());
    clearInterval(this.heartbeat); clearInterval(this.clock);
    this.send({ type: "session.close" });
    const lease = this.lease;
    this.closing = (async () => {
      let result;
      if (this.requested && this.config) result = await this.post("stop", { lease }).catch(() => null);
      this.releaseMedia();
      this.lease = null; this.requested = false;
      this.status("idle", result?.closed === false && !this.closeConfirmed ? "Micrófono cerrado. El servidor está finalizando la sesión." : message);
    })();
    return this.closing;
  }
  emergencyClose() {
    if (!this.lease) return;
    ++this.generation;
    this.send({ type: "session.close" });
    if (this.config && this.requested) {
      closeOnExit({ csrf: this.config.csrf, lease: this.lease });
    }
    this.status("closing");
    this.releaseMedia(); this.lease = null; this.requested = false;
    this.status("idle", "Voz desconectada");
  }
}
