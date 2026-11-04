import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { Conversation, PICTOS } from "./public/conversation.mjs";
import { ConversationToolHandler } from "./public/tools.mjs";

test("elegir picto propone una palabra pero no valida sin voz", () => {
  const c = new Conversation();
  assert.equal(c.choose("pacman").ok, true);
  assert.equal(c.target, "Pac-Man");
  assert.equal(c.phase, "practice");
  assert.equal(c.validate({ turno: c.turn, resultado: "logrado" }).ok, false);
  c.noteSpeech();
  assert.equal(c.validate({ turno: c.turn, resultado: "logrado" }).ok, true);
  assert.equal(c.feedback, "¡Te escuché!");
});
test("dos intentos no claros simplifican y luego permiten cambiar sin bucle", () => {
  const c = new Conversation(); c.choose("pelota");
  const old = c.turn; c.noteSpeech(); c.validate({ turno: c.turn, resultado: "no_claro" });
  assert.equal(c.target, "pe"); assert.equal(c.phase, "practice");
  assert.equal(c.validate({ turno: old, resultado: "logrado" }).ok, false);
  assert.equal(c.validate({ turno: c.turn, resultado: "logrado" }).ok, false);
  c.noteSpeech(); c.validate({ turno: c.turn, resultado: "no_claro" });
  assert.equal(c.phase, "acknowledged"); assert.equal(c.feedback, "Podés elegir otra cosa");
});
test("aproximación se reconoce; repetir abre otro turno sin reutilizar voz", () => {
  const c = new Conversation(); c.choose("musica"); c.noteSpeech();
  c.validate({ turno: c.turn, resultado: "aproximacion" });
  assert.equal(c.feedback, "¡Escuché tu intento!");
  c.repeat(); assert.equal(c.phase, "practice"); assert.equal(c.heard, false);
});
test("elección espontánea por voz puede reconocerse sin exigir repetición", () => {
  const c = new Conversation();
  assert.equal(c.choose("pelota", { spoken: true }).ok, false);
  c.noteSpeech(); assert.equal(c.choose("pelota", { spoken: true }).ok, true);
  assert.equal(c.validate({ turno: c.turn, resultado: "logrado" }).ok, true);
});
test("cambiar de tema invalida resultados viejos y restringe pictos", () => {
  const c = new Conversation(); c.choose("pacman"); c.noteSpeech(); const old = c.turn;
  assert.equal(c.showOptions({ opciones: ["agua", "comer"], pregunta: "¿Qué querés?", estrategia: "pedido" }).ok, true);
  assert.equal(c.validate({ turno: old, resultado: "logrado" }).ok, false);
  assert.equal(c.choose("pacman").ok, false);
  c.choose("agua"); assert.equal(c.target, "quiero agua");
  assert.equal(c.showOptions({ opciones: ["agua", "desconocido"], pregunta: "¿Qué?", estrategia: "sonido" }).ok, false);
});
test("todos los pictos del catálogo están disponibles localmente", async () => {
  for (const picto of Object.values(PICTOS)) {
    const path = picto.image.startsWith("/assets/") ? new URL(`../app${picto.image}`, import.meta.url) : new URL(`./public/${picto.image}`, import.meta.url);
    await access(path);
  }
});
test("herramientas duplicadas se ejecutan una vez y devuelven resultados antes de continuar", async () => {
  const sent = []; let executed = 0;
  const handler = new ConversationToolHandler({ send: event => sent.push(event), execute: () => { executed++; return { ok: true }; } });
  const event = value => handler.handle({ type: "response.event", delegation_id: "a", event: value });
  await event({ type: "response.created", response: { id: "r" } });
  const call = { type: "response.output_item.done", item: { type: "function_call", call_id: "c", name: "consultar_turno", arguments: "{}" } };
  await event(call); await event(call); await event({ type: "response.completed" }); await event({ type: "response.completed" });
  assert.equal(executed, 1);
  assert.deepEqual(sent.map(item => item.type), ["response.item.create", "response.create"]);
});
