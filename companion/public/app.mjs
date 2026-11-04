import { Conversation, PICTOS } from "./conversation.mjs";
import { VoiceSession } from "./voice.mjs";
import { VoiceWave } from "./wave.mjs";
import { nativeConfiguration } from "./transport.mjs";

const nativeConfig = await nativeConfiguration();
if (nativeConfig && !nativeConfig.enabled) {
  location.replace("/");
  throw new Error("Compañero no habilitado en esta tablet.");
}

const $ = selector => document.querySelector(selector);
const conversation = new Conversation();
const preview = new URLSearchParams(location.search).get("preview") === "1";
const Session = preview ? (await import("./preview.mjs")).PreviewSession : VoiceSession;
let active = false;
const captions = { user: { text: "", end: -10000 }, assistant: { text: "", end: -10000 } };
const wave = new VoiceWave($("#wave"), speaking => {
  if (voice.state === "live") $("#voice-state").textContent = speaking ? "Mi compañero está hablando" : "Te escucho";
});
const voice = new Session({
  audio: $("#voice-audio"),
  onState(state, detail) {
    active = ["live", "muted"].includes(state);
    $("#welcome").hidden = active;
    $("#turn").hidden = !active;
    $("#start-button").hidden = active || state === "closing";
    $("#start-button").disabled = state === "connecting";
    $("#cancel-button").hidden = state !== "connecting";
    $("#conversation-controls").hidden = !active;
    $("#mute-button").innerHTML = state === "muted" ? "Seguir hablando" : '<span aria-hidden="true">Ⅱ</span> Pausa';
    $("#voice-state").textContent = ({ live: "Te escucho", muted: "En pausa", connecting: "Conectando…", closing: "Terminando…", error: "No pude conectar" })[state] || "A tu ritmo";
    $("#connection-message").textContent = state === "error" || (!active && !["connecting", "closing"].includes(state) && detail && detail !== "Voz desconectada") ? detail : "";
    $("#sound-button").hidden = !detail?.includes("Activar sonido");
    wave.setActive(active && state !== "muted");
    renderTurn();
  },
  onMedia(kind, stream) { wave.attach(kind, stream); },
  onCaption(speaker, event) {
    if (speaker === "user" && event.delta?.trim()) conversation.noteSpeech();
    const caption = captions[speaker];
    if (event.start_ms - caption.end > 2200) caption.text = "";
    caption.text = (caption.text + event.delta).slice(-600); caption.end = event.end_ms;
    $(`#${speaker}-caption`).textContent = caption.text;
  },
  onTool(name, args) {
    let result;
    if (name === "consultar_turno") return { ok: true, ...conversation.context() };
    if (name === "mostrar_opciones") result = conversation.showOptions(args);
    else if (name === "elegir_picto") result = conversation.choose(args.picto, { spoken: true, turn: args.turno });
    else if (name === "registrar_intento") result = conversation.validate(args);
    else if (name === "cerrar_conversacion") { setTimeout(() => void voice.stop("Terminamos. ¡Hasta la próxima!"), 900); return { ok: true }; }
    else return { ok: false };
    renderTurn();
    return result;
  },
});

function makePicto(id, interactive) {
  const picto = PICTOS[id];
  const element = document.createElement(interactive ? "button" : "div");
  element.className = "picto";
  const img = document.createElement("img"); img.src = picto.image; img.alt = ""; img.draggable = false;
  const label = document.createElement("span"); label.textContent = picto.label;
  element.append(img, label);
  if (interactive) { element.type = "button"; element.addEventListener("click", () => choose(id)); }
  return element;
}
function renderTurn() {
  const choosing = conversation.phase === "choice";
  $("#question").textContent = choosing ? conversation.question : conversation.phase === "practice" ? "Probamos juntos" : "Te estoy escuchando";
  $("#pictos").hidden = !choosing;
  $("#practice").hidden = choosing;
  $("#pictos").replaceChildren(...conversation.options.map(id => makePicto(id, true)));
  $("#chosen-picto").replaceChildren(...(conversation.selected ? [makePicto(conversation.selected, false)] : []));
  $("#word-cue").textContent = conversation.target ? `«${conversation.target}»` : "";
  $("#feedback").textContent = conversation.feedback || (conversation.phase === "practice" ? "A tu ritmo" : "");
  $("#repeat-button").hidden = choosing;
  $("#change-button").hidden = choosing;
  $("#pictos").querySelectorAll("button").forEach(button => { button.disabled = voice.state === "muted"; });
  $("#repeat-button").disabled = voice.state === "muted";
  $("#change-button").disabled = voice.state === "muted";
}
function shareTurn() { voice.context(`Estado real de la interfaz: ${JSON.stringify(conversation.context())}.`); }
function choose(id) {
  if (voice.state !== "live") return;
  const result = conversation.choose(id);
  if (!result.ok) return;
  renderTurn(); shareTurn();
  voice.instruct(`La persona acaba de elegir el picto ${PICTOS[id].label}. Es una elección por toque, NO una palabra hablada. Decí ahora una sola vez: "${result.instruccion}". Después esperá su voz. No registres un intento por este clic. Turno ${conversation.turn}.`);
}
$("#start-button").addEventListener("click", async () => {
  conversation.reset(); $("#voice-audio").muted = false;
  for (const speaker of Object.keys(captions)) { captions[speaker] = { text: "", end: -10000 }; $(`#${speaker}-caption`).textContent = "…"; }
  await wave.prepare().catch(() => {});
  void voice.start(`La persona tocó Quiero hablar. Empezá con las opciones ya presentes: ${JSON.stringify(conversation.context())}.`);
});
$("#repeat-button").addEventListener("click", () => {
  if (voice.state !== "live") return;
  conversation.repeat(); renderTurn(); shareTurn();
  voice.instruct(`La persona pidió escuchar otra vez. Modelá lentamente solo: "${conversation.target}". Esperá sin validar por este botón.`);
});
$("#change-button").addEventListener("click", () => {
  if (voice.state !== "live") return;
  conversation.reset(); renderTurn(); shareTurn();
  voice.instruct("La persona pidió cambiar. Ya ve Pac-Man, pelota y música. Preguntá '¿Qué elegimos ahora?' y esperá.");
});
for (const id of ["#end-button", "#cancel-button"]) $(id).addEventListener("click", () => void voice.stop());
$("#mute-button").addEventListener("click", () => {
  voice.toggleMute(); $("#voice-audio").muted = voice.state === "muted";
  if (voice.state === "live") voice.instruct("Terminó la pausa. Retomá brevemente el turno actual y esperá.");
});
$("#sound-button").addEventListener("click", async () => { try { await $("#voice-audio").play(); $("#sound-button").hidden = true; } catch { $("#connection-message").textContent = "Revisá el volumen y el permiso de sonido del navegador."; } });
$("#options-button").addEventListener("click", () => { $("#options").hidden = !$("#options").hidden; $("#options-button").setAttribute("aria-expanded", String(!$("#options").hidden)); });
$("#captions-toggle").addEventListener("change", event => { $("#captions").hidden = !event.target.checked; });
$("#home").addEventListener("click", async event => { event.preventDefault(); await voice.stop(); location.assign("/"); });
voice.configure().then(config => { if (!config.voiceConfigured) $("#connection-message").textContent = "Falta configurar el servicio de voz."; }).catch(error => { $("#connection-message").textContent = error.message; });
if (preview) {
  const panel = document.createElement("aside"); panel.className = "preview-panel";
  const label = document.createElement("p"); label.textContent = "Vista previa · sin micrófono ni consumo de API"; panel.append(label);
  for (const [text, result] of [["Simular palabra", "logrado"], ["Simular aproximación", "aproximacion"], ["Simular no entendido", "no_claro"]]) {
    const button = document.createElement("button"); button.textContent = text; button.className = "soft-button";
    button.addEventListener("click", () => { if (!active) return; conversation.noteSpeech(); voice.onTool("registrar_intento", { turno: conversation.turn, resultado: result }); }); panel.append(button);
  }
  document.querySelector("main").append(panel);
}
