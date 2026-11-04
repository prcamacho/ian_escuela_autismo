export const PICTOS = {
  pacman: { label: "Pac-Man", word: "Pac-Man", sound: "pa", image: "./pacman.svg" },
  pelota: { label: "Pelota", word: "pelota", sound: "pe", image: "/assets/pictos/pelota.png" },
  musica: { label: "Música", word: "música", sound: "mu", image: "/assets/pictos/musica.png" },
  agua: { label: "Agua", word: "agua", sound: "a", image: "/assets/pictos/agua.png" },
  comer: { label: "Comer", word: "comer", sound: "co", image: "/assets/pictos/comer.png" },
  tele: { label: "Tele", word: "tele", sound: "te", image: "/assets/pictos/tele.png" },
  mas: { label: "Más", word: "más", sound: "ma", image: "/assets/pictos/mas.png" },
  otra_vez: { label: "Otra vez", word: "otra vez", sound: "otra", image: "/assets/pictos/otra-vez.png" },
  si: { label: "Sí", word: "sí", sound: "sí", image: "/assets/pictos/si.png" },
  no: { label: "No", word: "no", sound: "no", image: "/assets/pictos/no.png" },
  ayuda: { label: "Ayuda", word: "ayuda", sound: "ayu", image: "/assets/pictos/necesito-ayuda.png" },
};
export const STRATEGIES = ["imitacion", "sonido", "completar", "pedido"];
export const FIRST_OPTIONS = ["pacman", "pelota", "musica"];

export class Conversation {
  constructor() { this.turn = 0; this.reset(); }
  reset() {
    this.turn++;
    this.phase = "choice"; this.options = [...FIRST_OPTIONS]; this.question = "¿Qué te gusta?";
    this.strategy = "imitacion"; this.selected = null; this.target = "";
    this.attempts = 0; this.heard = false; this.feedback = ""; this.result = null;
  }
  showOptions({ opciones, pregunta, estrategia }) {
    if (!Array.isArray(opciones) || opciones.length < 2 || opciones.length > 3 || new Set(opciones).size !== opciones.length || opciones.some(id => !PICTOS[id]) || !STRATEGIES.includes(estrategia) || typeof pregunta !== "string" || !pregunta.trim() || pregunta.length > 100) return { ok: false, motivo: "Elegí dos o tres pictos válidos y una pregunta corta." };
    this.turn++; this.phase = "choice"; this.options = [...opciones]; this.question = pregunta.trim();
    this.strategy = estrategia; this.selected = null; this.target = ""; this.attempts = 0;
    this.heard = false; this.feedback = ""; this.result = null;
    return { ok: true, ...this.context() };
  }
  choose(id, { spoken = false, turn = this.turn } = {}) {
    if (turn !== this.turn || this.phase !== "choice" || !this.options.includes(id) || (spoken && !this.heard)) return { ok: false };
    const picto = PICTOS[id];
    this.turn++; this.selected = id; this.phase = "practice"; this.heard = spoken;
    this.target = this.strategy === "sonido" ? picto.sound : this.strategy === "pedido" ? `quiero ${picto.word}` : picto.word;
    this.feedback = ""; this.result = null;
    return { ok: true, ...this.context(), instruccion: this.invitation() };
  }
  invitation() {
    if (!this.selected) return this.question;
    const picto = PICTOS[this.selected];
    if (this.strategy === "completar") return `Ah, elegiste ${picto.word}. Completamos: quiero…`;
    return `Ah, querés ${picto.word}. Probá decir: ${this.target}.`;
  }
  noteSpeech() { if (["choice", "practice"].includes(this.phase)) this.heard = true; }
  repeat() {
    if (!this.selected) return;
    this.turn++; this.phase = "practice"; this.heard = false; this.result = null; this.feedback = ""; this.attempts = 0;
  }
  validate({ turno, resultado }) {
    if (turno !== this.turn || this.phase !== "practice") return { ok: false, motivo: "Ese turno ya cambió. Consultá el turno actual." };
    if (!this.heard) return { ok: false, motivo: "Todavía no llegó voz de la persona en este turno. Elegir un picto no es un intento hablado." };
    if (!["logrado", "aproximacion", "no_claro"].includes(resultado)) return { ok: false, motivo: "Resultado desconocido." };
    this.heard = false; this.attempts++; this.result = resultado;
    if (resultado === "logrado" || resultado === "aproximacion") {
      this.phase = "acknowledged";
      this.feedback = resultado === "logrado" ? "¡Te escuché!" : "¡Escuché tu intento!";
      return { ok: true, ...this.context(), siguiente: `Reconocé el intento brevemente, retomá ${PICTOS[this.selected].word} y esperá. Después podés ofrecer otras opciones. No afirmes pronunciación perfecta.` };
    }
    if (this.attempts < 2) {
      this.turn++; this.strategy = "sonido"; this.target = PICTOS[this.selected].sound;
      this.feedback = "Probamos más cortito";
      return { ok: true, ...this.context(), siguiente: `No quedó claro. Modelá una sola vez: ${this.target}. Después esperá. No digas que estuvo mal ni simules haberlo oído.` };
    }
    this.phase = "acknowledged"; this.feedback = "Podés elegir otra cosa";
    return { ok: true, ...this.context(), siguiente: "No quedó claro; aceptá la elección del picto y ofrecé otro tema. No sigas exigiendo repetir." };
  }
  context() {
    return { turno: this.turn, fase: this.phase, opciones: this.options, pregunta: this.question, estrategia: this.strategy, elegido: this.selected, objetivo: this.target, intentos: this.attempts, voz_recibida: this.heard, resultado: this.result };
  }
}
