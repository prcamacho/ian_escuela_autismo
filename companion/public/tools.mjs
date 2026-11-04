// One executor per connection. Do not also execute these calls on the sideband.
export class ConversationToolHandler {
  constructor({ send, execute }) { this.send = send; this.execute = execute; this.responses = new Map(); this.seen = new Map(); }
  async handle(envelope) {
    if (envelope.type !== "response.event") return;
    const event = envelope.event;
    const key = envelope.delegation_id || "current";
    if (event.type === "response.created") {
      this.responses.set(key, { id: event.response.id, calls: [], completed: false });
      return;
    }
    const response = this.responses.get(key);
    if (!response) return;
    if (event.type === "response.output_item.done" && event.item?.type === "function_call") {
      const item = event.item;
      if (response.calls.some(call => call.id === item.call_id)) return;
      let work = this.seen.get(item.call_id);
      if (!work) {
        work = Promise.resolve().then(() => {
          try {
            const args = JSON.parse(item.arguments);
            if (!["consultar_turno", "mostrar_opciones", "elegir_picto", "registrar_intento", "cerrar_conversacion"].includes(item.name) || !args || typeof args !== "object" || Array.isArray(args)) throw new Error();
            return this.execute(item.name, args);
          } catch { return { ok: false, message: "No se pudo interpretar la acción. Consultá el turno actual." }; }
        });
        this.seen.set(item.call_id, work);
      }
      response.calls.push({ id: item.call_id, work });
    }
    if (event.type === "response.completed" && !response.completed) {
      response.completed = true;
      if (!response.calls.length) return;
      for (const call of response.calls) {
        this.send({ type: "response.item.create", item: { type: "function_call_output", call_id: call.id, output: JSON.stringify(await call.work) } });
      }
      this.send({ type: "response.create" });
    }
  }
}
