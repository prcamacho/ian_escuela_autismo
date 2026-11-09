const STORAGE_KEY = "ian-escuela-data-v1";
let nativeCompanionEnabled = false;
const MULTIPLICATION_BAG_KEY = "ian-multiplication-bag-v1";
const ENGLISH_BAG_KEY = "ian-english-bag-v1";
const ENGLISH_REVIEW_KEY = "ian-english-review-v1";
const CIRCLE_GEOMETRY_BAG_KEY = "ian-circle-geometry-bag-v2";
const CIRCLE_GEOMETRY_REVIEW_KEY = "ian-circle-geometry-review-v2";
const COMMUNICATION_RECENTS_KEY = "ian-communication-recents-v2";
const COMMUNICATION_MESSAGE_RECENTS_KEY = "ian-communication-message-recents-v1";
const COMMUNICATION_GENERAL_RECENTS_SCOPE = "general";
const COMMUNICATION_UNIFIED_RECENTS_KEY = "ian-communication-general-recents-v1";
const TURN_GROUPS_KEY = "ian-turn-groups-v1";
const APP_SPEECH_NEXT_AT_KEY = "ian-app-speech-next-at-v1";
const APP_SPEECH_COOLDOWN_MS = 2_000;
const COMMUNICATION_QUICK_AUDIO_STATES_KEY = "ian-communication-quick-audio-states-v1";
const COMMUNICATION_QUICK_AUDIO_DELAYS_MS = [2_000, 5_000, 10_000, 30_000, 60_000];
const COMMUNICATION_QUICK_AUDIO_RESET_MS = 5 * 60_000;
const MULTIPLICATION_AUDIO_COOLDOWN_KEY = "ian-multiplication-audio-next-at-v1";
const MULTIPLICATION_AUDIO_COOLDOWN_MS = 10_000;
let limitedSpeechSequence = 0;

// Interruptor temporal: conserva audios y lógica para poder reactivarlos más adelante.
const VOICE_PLAYBACK_ENABLED = false;

const TURN_COLORS = ["#2b7a78", "#7c5cdb", "#c95f50", "#3b8f5a", "#b36b00", "#2f6fb0", "#a34272", "#5d6b82", "#00838f", "#8a5a44"];

const SUPPORT_NUMBER_WORDS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
  "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"
];

const SUPPORT_COLORS = [
  { id: "rojo", label: "Rojo", value: "#e43f3f", ink: "#ffffff" },
  { id: "azul", label: "Azul", value: "#2878d0", ink: "#ffffff" },
  { id: "amarillo", label: "Amarillo", value: "#f4ce3e", ink: "#272727" },
  { id: "verde", label: "Verde", value: "#43a45b", ink: "#ffffff" },
  { id: "naranja", label: "Naranja", value: "#ef8b32", ink: "#272727" },
  { id: "violeta", label: "Violeta", value: "#8059cc", ink: "#ffffff" },
  { id: "rosa", label: "Rosa", value: "#ed76a6", ink: "#272727" },
  { id: "celeste", label: "Celeste", value: "#55bce6", ink: "#272727" },
  { id: "marron", label: "Marrón", value: "#8d5b3e", ink: "#ffffff" },
  { id: "gris", label: "Gris", value: "#858a91", ink: "#ffffff" },
  { id: "blanco", label: "Blanco", value: "#ffffff", ink: "#272727" },
  { id: "negro", label: "Negro", value: "#252525", ink: "#ffffff" }
];

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H21"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H21v20H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 6h8"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-4.5 4-8 12-10 1.6 8-1.8 16-8 16Z"/><path d="M4 13c4 0 7-2 10-6"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18h1.4a2.1 2.1 0 0 0 0-4.2h-.8a1.7 1.7 0 0 1 0-3.4H15a6 6 0 0 0 6-6C21 4.9 16.9 3 12 3Z"/><circle cx="7.5" cy="10" r=".8" fill="currentColor" stroke="none"/><circle cx="10" cy="6.8" r=".8" fill="currentColor" stroke="none"/><circle cx="14.2" cy="6.5" r=".8" fill="currentColor" stroke="none"/><circle cx="17.2" cy="9" r=".8" fill="currentColor" stroke="none"/>',
  turns: '<path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="m7 21-4-4 4-4"/><path d="M21 17H3"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  undo: '<path d="M9 7 4 12l5 5"/><path d="M4 12h9a7 7 0 0 1 7 7"/>',
  language: '<path d="M4 5h9M8.5 3v2c0 4-2 7-5 9"/><path d="M5 10c2 2 4 3 7 4"/><path d="m14 20 4-10 4 10M15.5 17h5"/>',
  speaker: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8.5 8.5 0 0 1 0 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M8 17V9M13 17V5M18 17v-6"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  upload: '<path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m6 6 1 15h10l1-15"/><path d="M10 11v6M14 11v6"/>',
  arrow: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.1 2.1 0 1 1-2.98 2.98l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.66V21a2.1 2.1 0 1 1-4.2 0v-.06A1.8 1.8 0 0 0 8.4 19.3a1.8 1.8 0 0 0-1.98.36l-.04.04a2.1 2.1 0 1 1-2.98-2.98l.04-.04A1.8 1.8 0 0 0 3.8 14.7a1.8 1.8 0 0 0-1.66-1.1H2a2.1 2.1 0 1 1 0-4.2h.06A1.8 1.8 0 0 0 3.7 8.3a1.8 1.8 0 0 0-.36-1.98l-.04-.04A2.1 2.1 0 1 1 6.28 3.3l.04.04A1.8 1.8 0 0 0 8.3 3.7h.1A1.8 1.8 0 0 0 9.5 2.06V2a2.1 2.1 0 1 1 4.2 0v.06A1.8 1.8 0 0 0 14.8 3.7a1.8 1.8 0 0 0 1.98-.36l.04-.04A2.1 2.1 0 1 1 19.8 6.28l-.04.04a1.8 1.8 0 0 0-.36 1.98v.1A1.8 1.8 0 0 0 21.04 9.5H21a2.1 2.1 0 1 1 0 4.2h-.06A1.8 1.8 0 0 0 19.4 15z"/>',
  backspace: '<path d="M21 4H8l-5 8 5 8h13z"/><path d="M18 9l-6 6M12 9l6 6"/>'
};

const FIXED_SUBJECTS = [
  { id: "lengua", title: "Lengua", icon: "book", color: "#f07167" },
  { id: "cs-naturales", title: "Cs Naturales", icon: "leaf", color: "#4f9d69" },
  { id: "cs-sociales", title: "Cs Sociales", icon: "globe", color: "#4b7bec" },
  { id: "matematicas", title: "Matematicas", icon: "calc", color: "#1f7a8c" },
  { id: "ingles", title: "Inglés", icon: "language", color: "#7c5cdb" },
  { id: "tecnologia", title: "Tecnología", icon: "settings", color: "#177e89" }
];

const PICTO_PATH = "assets/pictos/";

const CIRCLE_GEOMETRY_CATEGORIES = {
  circle: {
    label: "Círculo",
    shortLabel: "círculo",
    explanation: "tiene borde e interior"
  },
  circumference: {
    label: "Circunferencia",
    shortLabel: "circunferencia",
    explanation: "tiene solamente borde"
  }
};

const PACMAN_ANGLE_CATEGORIES = {
  acute: { label: "Agudo", degrees: 45, clue: "MENOS DE 90°" },
  right: { label: "Recto", degrees: 90, clue: "90°" },
  obtuse: { label: "Obtuso", degrees: 130, clue: "MÁS DE 90°" },
  straight: { label: "Llano", degrees: 180, clue: "180°" },
  reflex: { label: "Cóncavo", degrees: 270, clue: "MÁS DE 180°" },
  full: { label: "Completo", degrees: 360, clue: "360°" }
};

const MATERIAL_CATEGORIES = {
  plastic: { label: "Plástico", color: "#2f9e66" },
  wood: { label: "Madera", color: "#b46a2d" },
  metal: { label: "Metal", color: "#708090" }
};

const PLASTIC_OBJECTS = {
  bottle: { label: "Botella", material: "plastic", visual: "bottle" },
  clearBottle: { label: "Botella", material: "plastic", visual: "clear-bottle" },
  duck: { label: "Pato", material: "plastic", visual: "duck" },
  hanger: { label: "Percha", material: "plastic", visual: "hanger" },
  bag: { label: "Bolsa", material: "plastic", visual: "bag" },
  ball: { label: "Pelota", material: "plastic", visual: "ball" },
  comb: { label: "Peine", material: "plastic", visual: "comb" },
  raincoat: { label: "Piloto", material: "plastic", visual: "raincoat" },
  sponge: { label: "Esponja", material: "plastic", visual: "sponge" },
  chair: { label: "Silla", material: "wood", visual: "chair" },
  boat: { label: "Bote", material: "wood", visual: "boat" },
  spoon: { label: "Cuchara", material: "metal", visual: "spoon" },
  key: { label: "Llave", material: "metal", visual: "key" }
};

const COMMUNICATION_PICTOS = {
  yo: { label: "Yo", phrase: "yo", image: "yo.png", color: "#4b7bec" },
  estoy: { label: "Estoy", phrase: "estoy", image: "yo.png", color: "#4b7bec" },
  tengo: { label: "Tengo", phrase: "tengo", image: "yo.png", color: "#4b7bec" },
  "me-siento": { label: "Me siento", phrase: "me siento", image: "yo.png", color: "#7c5cdb" },
  si: { label: "SÍ", phrase: "sí", image: "si.png", color: "#4f9d69" },
  no: { label: "NO", phrase: "no", image: "no.png", color: "#c44747" },
  quiero: { label: "Quiero", phrase: "quiero", image: "quiero.png", color: "#1f7a8c" },
  necesitar: { label: "Necesito", phrase: "necesito", image: "necesitar.png", color: "#1f7a8c" },
  "necesito-ayuda": { label: "Ayuda", phrase: "necesito ayuda", image: "necesito-ayuda.png", color: "#4b7bec" },
  "no-quiero": { label: "No quiero", phrase: "no quiero", image: "no-quiero.png", color: "#c44747" },
  mas: { label: "Mas", phrase: "mas", image: "mas.png", color: "#4f9d69" },
  terminar: { label: "Termine", phrase: "termine", image: "terminar.png", color: "#1f7a8c" },
  doler: { label: "Me duele", phrase: "me duele", image: "doler.png", color: "#c44747" },
  "me-gusta": { label: "Me gusta", phrase: "me gusta", image: "me-gusta.png", color: "#4f9d69" },
  "no-me-gusta": { label: "No me gusta", phrase: "no me gusta", image: "no-me-gusta.png", color: "#c44747" },
  "no-entiendo": { label: "No entiendo", phrase: "no entiendo", image: "no-entiendo.png", color: "#ffb703" },
  esperar: { label: "Esperar", phrase: "esperar", image: "esperar.png", color: "#7c5cdb" },
  parar: { label: "Parar", phrase: "parar", image: "parar.png", color: "#c44747" },
  ir: { label: "Ir", phrase: "ir", image: "ir.png", color: "#1f7a8c" },
  salir: { label: "Salir", phrase: "salir", image: "salir.png", color: "#f07167" },
  volver: { label: "Volver", phrase: "volver", image: "volver.png", color: "#4b7bec" },
  "otra-vez": { label: "Otra vez", phrase: "otra vez", image: "otra-vez.png", color: "#7c5cdb" },
  abrir: { label: "Abrir", phrase: "abrir", image: "abrir.png", color: "#1f7a8c" },
  cerrar: { label: "Cerrar", phrase: "cerrar", image: "cerrar.png", color: "#c44747" },
  agua: { label: "Agua", phrase: "agua", image: "agua.png", imageVersion: "17", color: "#1f7a8c" },
  beber: { label: "Beber", phrase: "beber", image: "beber.png", color: "#1f7a8c" },
  comer: { label: "Comer", phrase: "comer", image: "comer.png", color: "#4f9d69" },
  pan: { label: "Pan", phrase: "pan", image: "pan.png", color: "#ffb703" },
  gaseosa: { label: "Gaseosa", phrase: "gaseosa", image: "gaseosa.png", imageVersion: "2", color: "#4b7bec" },
  jugo: { label: "Jugo", phrase: "jugo", image: "jugo.png", color: "#f07167" },
  leche: { label: "Leche", phrase: "leche", image: "leche.png", color: "#1f7a8c" },
  galletas: { label: "Galletas", phrase: "galletas", image: "galletas.png", color: "#ffb703" },
  helado: { label: "Helado", phrase: "helado", image: "helado.png", color: "#7c5cdb" },
  rio: { label: "Rio", phrase: "ir al rio", image: "rio.png", color: "#4b7bec" },
  plaza: { label: "Plaza", phrase: "ir a la plaza", image: "plaza.png", color: "#4f9d69" },
  supermercado: { label: "Supermercado", phrase: "ir al supermercado", image: "supermercado.png", color: "#4f9d69" },
  shopping: { label: "Shopping", phrase: "ir al shopping", image: "shopping.png", color: "#7c5cdb" },
  panaderia: { label: "Panaderia", phrase: "ir a la panaderia", image: "panaderia.png", imageVersion: "2", color: "#ffb703" },
  zapatillas: { label: "Zapatillas", phrase: "zapatillas", image: "zapatillas.png", color: "#f07167" },
  juguete: { label: "Juguete", phrase: "un juguete", image: "juguete.png", color: "#f07167" },
  "comprar-pan": { label: "Pan", phrase: "comprar pan", image: "pan.png", color: "#ffb703" },
  "comprar-gaseosa": { label: "Gaseosa", phrase: "comprar gaseosa", image: "gaseosa.png", color: "#4b7bec" },
  "comprar-helado": { label: "Helado", phrase: "comprar helado", image: "helado.png", color: "#7c5cdb" },
  "comprar-zapatillas": { label: "Zapatillas", phrase: "comprar zapatillas", image: "zapatillas.png", color: "#f07167" },
  "comprar-juguete": { label: "Juguete", phrase: "comprar un juguete", image: "juguete.png", color: "#f07167" },
  hambre: { label: "Hambre", phrase: "hambre", image: "hambre.png", color: "#f07167" },
  bano: { label: "Baño", phrase: "ir al baño", image: "bano.png", color: "#4f9d69" },
  pis: { label: "Pis", phrase: "hacer pis", image: "pis.png", color: "#4f9d69" },
  caca: { label: "Caca", phrase: "hacer caca", image: "caca.png", color: "#4f9d69" },
  "lavarse-manos": { label: "Lavarse las manos", phrase: "lavarse las manos", image: "lavarse-manos.png", color: "#1f7a8c" },
  "limpiarse-cola": { label: "Limpiarse la cola", phrase: "limpiarse la cola", image: "limpiarse-cola.png", color: "#4f9d69" },
  "cepillarse-dientes": { label: "Cepillarse los dientes", phrase: "cepillarse los dientes", image: "cepillarse-dientes.png", color: "#1f7a8c" },
  banarse: { label: "Bañarse", phrase: "bañarse", image: "banarse.png", color: "#4b7bec" },
  descanso: { label: "Descanso", phrase: "descanso", image: "descanso.png", color: "#ffb703" },
  silencio: { label: "Silencio", phrase: "silencio", image: "silencio.png", color: "#7c5cdb" },
  ruido: { label: "Ruido", phrase: "me molesta el ruido", image: "ruido.png", color: "#c44747" },
  auriculares: { label: "Auriculares", phrase: "auriculares", image: "auriculares.png", color: "#7c5cdb" },
  frio: { label: "Frio", phrase: "frio", image: "frio.png", color: "#4b7bec" },
  calor: { label: "Calor", phrase: "calor", image: "calor.png", color: "#f07167" },
  mareado: { label: "Mareado", phrase: "mareado", image: "mareado.png", color: "#c44747" },
  enfermo: { label: "Enfermo", phrase: "enfermo", image: "enfermo.png", color: "#c44747" },
  medicina: { label: "Medicina", phrase: "medicina", image: "medicina.png", color: "#4b7bec" },
  solo: { label: "Solo", phrase: "solo", image: "solo.png", color: "#7c5cdb" },
  contento: { label: "Contento", phrase: "contento", image: "contento.png", color: "#4f9d69" },
  triste: { label: "Triste", phrase: "triste", image: "triste.png", color: "#4b7bec" },
  enfadado: { label: "Enojado", phrase: "enojado", image: "enfadado.png", color: "#c44747" },
  miedo: { label: "Miedo", phrase: "miedo", image: "miedo.png", color: "#7c5cdb" },
  nervioso: { label: "Nervioso", phrase: "nervioso", image: "nervioso.png", color: "#ffb703" },
  cansado: { label: "Cansado", phrase: "cansado", image: "cansado.png", color: "#ffb703" },
  aburrido: { label: "Aburrido", phrase: "aburrido", image: "aburrido.png", color: "#7c5cdb" },
  tranquilo: { label: "Tranquilo", phrase: "tranquilo", image: "tranquilo.png", color: "#4f9d69" },
  dolor: { label: "Dolor", phrase: "dolor", image: "dolor.png", color: "#c44747" },
  "dolor-cabeza": { label: "Cabeza", phrase: "cabeza", image: "dolor-cabeza.png", color: "#c44747" },
  "dolor-estomago": { label: "Estomago", phrase: "estomago", image: "dolor-estomago.png", color: "#c44747" },
  "dolor-garganta": { label: "Garganta", phrase: "garganta", image: "dolor-garganta.png", color: "#c44747" },
  "dolor-oido": { label: "Oido", phrase: "oido", image: "dolor-oido.png", color: "#c44747" },
  "dolor-mano": { label: "Mano", phrase: "mano", image: "dolor-mano.png", color: "#c44747" },
  "dolor-brazo": { label: "Brazo", phrase: "brazo", image: "dolor-brazo.png", color: "#c44747" },
  escuela: { label: "Escuela", phrase: "escuela", image: "escuela.png", imageVersion: "2", color: "#4b7bec" },
  aula: { label: "Aula", phrase: "aula", image: "aula.png", color: "#4b7bec" },
  maestra: { label: "Maestra", phrase: "maestra", image: "maestra.png", color: "#4b7bec" },
  "seno-carla": { label: "Seño Carla", phrase: "seño Carla", image: "seno-carla.png", imageVersion: "1", color: "#4b7bec" },
  "seno-maribel": { label: "Seño Maribel", phrase: "seño Maribel", image: "seno-maribel.png", imageVersion: "1", color: "#4b7bec" },
  companero: { label: "Companero", phrase: "companero", image: "companero.png", color: "#4b7bec" },
  recreo: { label: "Recreo", phrase: "recreo", image: "recreo.png", color: "#4f9d69" },
  tarea: { label: "Tarea", phrase: "tarea", image: "tarea.png", color: "#ffb703" },
  cuaderno: { label: "Cuaderno", phrase: "cuaderno", image: "cuaderno.png", color: "#4b7bec" },
  lapiz: { label: "Lapiz", phrase: "lapiz", image: "lapiz.png", color: "#ffb703" },
  leer: { label: "Leer", phrase: "leer", image: "leer.png", color: "#4b7bec" },
  escribir: { label: "Escribir", phrase: "escribir", image: "escribir.png", color: "#4b7bec" },
  matematicas: { label: "Matematicas", phrase: "matematicas", image: "matematicas.png", color: "#1f7a8c" },
  lengua: { label: "Lengua", phrase: "lengua", image: "lengua.png", color: "#f07167" },
  trabajar: { label: "Trabajar", phrase: "trabajar", image: "trabajar.png", color: "#1f7a8c" },
  turno: { label: "Turno", phrase: "mi turno", image: "turno.png", color: "#7c5cdb" },
  jugar: { label: "Jugar", phrase: "jugar", image: "jugar.png", color: "#4f9d69" },
  dibujar: { label: "Dibujar", phrase: "dibujar", image: "dibujar.png", color: "#ffb703" },
  mama: { label: "Mama", phrase: "mama", image: "mama.png", color: "#f07167" },
  papa: { label: "Papa", phrase: "papa", image: "papa.png", color: "#4b7bec" },
  casa: { label: "Casa", phrase: "casa", image: "casa.png", imageVersion: "2", color: "#4f9d69" },
  terapeuta: { label: "Terapeuta", phrase: "terapeuta", image: "terapeuta.png", color: "#7c5cdb" },
  terapia: { label: "Terapia", phrase: "terapia", image: "terapia.png", color: "#7c5cdb" },
  doctor: { label: "Doctor", phrase: "doctor", image: "doctor.png", color: "#c44747" },
  fono: { label: "Fono", phrase: "fonoaudiologa", image: "fono.png", color: "#7c5cdb" },
  psicologa: { label: "Psicologa", phrase: "psicologa", image: "psicologa.png", color: "#7c5cdb" },
  hola: { label: "Hola", phrase: "hola", image: "hola.png", color: "#4f9d69" },
  adios: { label: "Adiós", phrase: "adiós", image: "adios.png", color: "#4b7bec" },
  gracias: { label: "Gracias", phrase: "gracias", image: "gracias.png", color: "#4f9d69" },
  perdon: { label: "Perdon", phrase: "perdon", image: "perdon.png", color: "#ffb703" },
  abrazo: { label: "Abrazo", phrase: "abrazo", image: "abrazo.png", color: "#f07167" },
  beso: { label: "Beso", phrase: "un beso", image: "beso.png", color: "#f07167" },
  cosquillas: { label: "Cosquillas", phrase: "cosquillas", image: "cosquillas.png", color: "#ffb703" },
  carino: { label: "Cariño", phrase: "cariño", image: "carino.png", color: "#f07167" },
  amigo: { label: "Amigo", phrase: "un amigo", image: "amigo.png", color: "#4b7bec" },
  "dar-mano": { label: "Dar la mano", phrase: "dar la mano", image: "dar-mano.png", color: "#4f9d69" },
  cabeza: { label: "Cabeza", phrase: "cabeza", image: "cabeza.png", color: "#c44747" },
  oido: { label: "Oido", phrase: "oido", image: "oido.png", color: "#c44747" },
  mano: { label: "Mano", phrase: "mano", image: "mano.png", color: "#c44747" },
  brazo: { label: "Brazo", phrase: "brazo", image: "brazo.png", color: "#c44747" },
  pierna: { label: "Pierna", phrase: "pierna", image: "pierna.png", color: "#c44747" },
  espalda: { label: "Espalda", phrase: "espalda", image: "espalda.png", color: "#c44747" },
  clinica: { label: "Clinica", phrase: "clinica", image: "clinica.png", color: "#c44747" },
  farmacia: { label: "Farmacia", phrase: "farmacia", image: "farmacia.png", color: "#4f9d69" },
  dormir: { label: "Dormir", phrase: "dormir", image: "dormir.png", color: "#7c5cdb" },
  tele: { label: "Tele", phrase: "ver la tele", image: "tele.png", color: "#7c5cdb" },
  musica: { label: "Musica", phrase: "musica", image: "musica.png", color: "#7c5cdb" },
  pelota: { label: "Pelota", phrase: "jugar con la pelota", image: "pelota.png", color: "#4f9d69" },
  columpio: { label: "Columpio", phrase: "columpio", image: "columpio.png", color: "#4f9d69" },
  familia: { label: "Familia", phrase: "familia", image: "familia.png", color: "#f07167" },
  abuela: { label: "Abuela", phrase: "abuela", image: "abuela.png", color: "#f07167" },
  cocinar: { label: "Cocinar", phrase: "cocinar", image: "cocinar.png", color: "#ffb703" },
  dinero: { label: "Dinero", phrase: "dinero", image: "dinero.png", color: "#ffb703" },
  ropa: { label: "Ropa", phrase: "ropa", image: "ropa.png", color: "#f07167" },
  carro: { label: "Carrito", phrase: "carrito de compra", image: "carro.png", color: "#4b7bec" },
  bolsa: { label: "Bolsa", phrase: "bolsa", image: "bolsa.png", color: "#f07167" },
  ticket: { label: "Ticket", phrase: "ticket", image: "ticket.png", color: "#ffb703" },
  escoger: { label: "Elegir", phrase: "elegir", image: "escoger.png", color: "#1f7a8c" },
  precio: { label: "Precio", phrase: "precio", image: "precio.png", color: "#ffb703" },
  "papel-higienico": { label: "Papel higienico", phrase: "papel higienico", image: "papel-higienico.png", color: "#1f7a8c" },
  banera: { label: "Banera", phrase: "banera", image: "banera.png", color: "#1f7a8c" },
  jabon: { label: "Jabon", phrase: "jabon", image: "jabon.png", color: "#4f9d69" },
  toalla: { label: "Toalla", phrase: "toalla", image: "toalla.png", color: "#4b7bec" },
  "agua-caliente": { label: "Agua caliente", phrase: "agua caliente", image: "agua-caliente.png", color: "#f07167" },
  "agua-fria": { label: "Ducha refrescante", phrase: "ducha refrescante", image: "agua-fria.png", color: "#4b7bec" },
  ducha: { label: "Ducha", phrase: "ducha", image: "ducha.png", color: "#1f7a8c" },
  champu: { label: "Champu", phrase: "champu", image: "champu.png", color: "#7c5cdb" },
  secar: { label: "Secarse", phrase: "secarse", image: "secar.png", color: "#4b7bec" },
  "lavarse-cara": { label: "Lavarse la cara", phrase: "lavarse la cara", image: "lavarse-cara.png", color: "#1f7a8c" },
  autobus: { label: "Autobus", phrase: "autobus", image: "autobus.png", color: "#4b7bec" },
  coche: { label: "Coche", phrase: "coche", image: "coche.png", color: "#4b7bec" },
  parque: { label: "Parque", phrase: "ir al parque", image: "parque.png", color: "#4f9d69" },
  "cuarto-bano": { label: "Bano", phrase: "ir al bano", image: "cuarto-bano.png", color: "#4f9d69" },
  tos: { label: "Tos", phrase: "tos", image: "tos.png", color: "#c44747" },
  fiebre: { label: "Fiebre", phrase: "fiebre", image: "fiebre.png", color: "#c44747" },
  asustado: { label: "Asustado", phrase: "asustado", image: "asustado.png", color: "#7c5cdb" },
  calma: { label: "Calma", phrase: "calma", image: "calma.png", color: "#4f9d69" },
  hablar: { label: "Hablar", phrase: "hablar", image: "hablar.png", color: "#1f7a8c" },
  oir: { label: "Oir", phrase: "oir", image: "oir.png", color: "#1f7a8c" },
  compartir: { label: "Compartir", phrase: "compartir", image: "compartir.png", color: "#4f9d69" },
  juntos: { label: "Juntos", phrase: "juntos", image: "juntos.png", color: "#4f9d69" },
  mimos: { label: "Mimos", phrase: "mimos", image: "mimos.png", color: "#f07167" },
  caricias: { label: "Caricias", phrase: "caricias", image: "caricias.png", color: "#f07167" },
  "dormir-acompanado": { label: "Dormir acompanado", phrase: "dormir acompanado", image: "dormir-acompanado.png", color: "#7c5cdb" },
  consuelo: { label: "Consuelo", phrase: "consuelo", image: "consuelo.png", color: "#4b7bec" },
  "estar-juntos": { label: "Estar juntos", phrase: "estar juntos", image: "juntos.png", color: "#4f9d69" },
  escuchar: { label: "Escuchar", phrase: "escuchar", image: "oir.png", color: "#1f7a8c" },
  cuidar: { label: "Cuidar", phrase: "cuidar", image: "cuidar.png", color: "#4f9d69" },
  "leche-chocolatada": { label: "Leche chocolatada", phrase: "leche chocolatada", image: "leche-chocolatada.png", color: "#7c5cdb" },
  tomate: { label: "Tomate", phrase: "tomate", image: "tomate.png", color: "#f07167" },
  naranja: { label: "Naranja", phrase: "naranja", image: "naranja.png", color: "#ffb703" },
  frutilla: { label: "Frutilla", phrase: "frutilla", image: "frutilla.png", color: "#f07167" },
  banana: { label: "Banana", phrase: "banana", image: "banana.png", color: "#ffb703" },
  carne: { label: "Carne", phrase: "carne", image: "carne.png", color: "#c44747" },
  pollo: { label: "Pollo", phrase: "pollo", image: "pollo.png", color: "#ffb703" },
  pizza: { label: "Pizza", phrase: "pizza", image: "pizza.png", color: "#f07167" },
  macarrones: { label: "Fideos", phrase: "fideos", image: "macarrones.png", color: "#ffb703" },
  arroz: { label: "Arroz", phrase: "arroz", image: "arroz.png", color: "#ffb703" },
  empanada: { label: "Empanada", phrase: "empanada", image: "empanada.png", color: "#f07167" },
  pure: { label: "Puré", phrase: "puré", image: "pure.png", color: "#ffb703" },
  yogur: { label: "Yogur", phrase: "yogur", image: "yogur.png", color: "#7c5cdb" },
  chocolate: { label: "Chocolate", phrase: "chocolate", image: "chocolate.png", color: "#7c5cdb" },
  caramelo: { label: "Caramelo", phrase: "caramelo", image: "caramelo.png", color: "#f07167" },
  medialuna: { label: "Medialuna", phrase: "medialuna", image: "medialuna.png", color: "#ffb703" },
  tostada: { label: "Tostada", phrase: "tostada", image: "tostada.png", color: "#ffb703" },
  magdalena: { label: "Magdalena", phrase: "magdalena", image: "magdalena.png", color: "#f07167" },
  "sandwich-jamon-queso": {
    label: "Sándwich de jamón y queso",
    phrase: "sándwich de jamón y queso",
    image: "sandwich-jamon-queso.png",
    color: "#ffb703"
  },
  "sandwich-salame-queso": {
    label: "Sándwich de salame y queso",
    phrase: "sándwich de salame y queso",
    image: "sandwich-salame-queso.jpg",
    photo: true,
    color: "#c44747"
  },
  "sandwich-milanesa": {
    label: "Sándwich de milanesa",
    phrase: "sándwich de milanesa",
    image: "sandwich-milanesa.jpg",
    photo: true,
    color: "#4f9d69"
  },
  hamburguesa: { label: "Hamburguesa", phrase: "hamburguesa", image: "hamburguesa.png", color: "#f07167" },
  choripan: { label: "Choripán", phrase: "choripán", image: "choripan.png", color: "#c44747" }
};

const COMMUNICATION_CATEGORIES = {
  alimentos: {
    id: "alimentos",
    title: "Alimentos",
    parentId: null,
    representativePicto: "comer",
    childIds: ["comidas", "bebidas", "golosinas", "frutas", "panes", "sandwiches"]
  },
  comidas: {
    id: "comidas",
    title: "Comidas",
    parentId: "alimentos",
    representativePicto: "pizza",
    childIds: [],
    pictos: ["pizza", "macarrones", "arroz", "empanada", "pure", "carne", "pollo", "tomate", "yogur"]
  },
  bebidas: {
    id: "bebidas",
    title: "Bebidas",
    parentId: "alimentos",
    representativePicto: "jugo",
    childIds: [],
    pictos: ["agua", "gaseosa", "jugo", "leche-chocolatada", "leche"]
  },
  golosinas: {
    id: "golosinas",
    title: "Golosinas",
    parentId: "alimentos",
    representativePicto: "caramelo",
    childIds: [],
    pictos: ["galletas", "helado", "chocolate", "caramelo"]
  },
  frutas: {
    id: "frutas",
    title: "Frutas",
    parentId: "alimentos",
    representativePicto: "banana",
    childIds: [],
    pictos: ["naranja", "frutilla", "banana"]
  },
  panes: {
    id: "panes",
    title: "Panes",
    parentId: "alimentos",
    representativePicto: "pan",
    childIds: [],
    pictos: ["pan", "medialuna", "tostada", "magdalena"]
  },
  sandwiches: {
    id: "sandwiches",
    title: "Sándwiches",
    parentId: "alimentos",
    representativePicto: "sandwich-jamon-queso",
    childIds: [],
    pictos: ["sandwich-jamon-queso", "sandwich-salame-queso", "sandwich-milanesa", "hamburguesa", "choripan"]
  }
};

const COMMUNICATION_QUICK_ACTIONS = [
  { id: "quick-si", label: "SÍ", picto: "si", sequence: ["si"], color: "#4f9d69" },
  { id: "quick-no", label: "NO", picto: "no", sequence: ["no"], color: "#c44747" },
  { id: "quick-hambre", label: "Hambre", message: "Tengo hambre", picto: "hambre", sequence: ["tengo", "hambre"], color: "#f07167" },
  { id: "quick-enojado", label: "Enojado", message: "Estoy enojado", picto: "enfadado", sequence: ["estoy", "enfadado"], color: "#c44747" },
  { id: "quick-hola", label: "Hola", picto: "hola", sequence: ["hola"], color: "#4f9d69" },
  { id: "quick-adios", label: "Adiós", picto: "adios", sequence: ["adios"], color: "#4b7bec" },
  { id: "quick-no-quiero", label: "No quiero", picto: "no-quiero", sequence: ["no-quiero"], color: "#c44747" },
  { id: "quick-bano", label: "Baño", message: "Necesito ir al baño", picto: "bano", sequence: ["necesitar", "bano"], color: "#4f9d69" },
  { id: "quick-ayuda", label: "Ayuda", message: "Necesito ayuda", picto: "necesito-ayuda", sequence: ["necesito-ayuda"], color: "#4b7bec" }
];

const COMMUNICATION_STARTERS = [
  {
    id: "yo-quiero",
    title: "Yo quiero",
    color: "#1f7a8c",
    sequence: ["yo", "quiero"],
    groups: [
      { id: "recientes", title: "Recientes", pictos: [] },
      { id: "bienestar", title: "Bienestar", pictos: ["descanso", "silencio", "auriculares", "abrazo", "solo", "medicina", "dormir", "tele", "musica", "esperar", "parar", "mas"] },
      { id: "bano", title: "Baño", pictos: ["pis", "caca", "limpiarse-cola", "lavarse-manos", "cepillarse-dientes", "banarse", "papel-higienico", "banera", "jabon", "toalla", "agua-caliente", "agua-fria", "lavarse-cara", "champu", "secar"] },
      { id: "amor", title: "Amor", pictos: ["abrazo", "beso", "cosquillas", "carino", "amigo", "dar-mano", "mimos", "caricias", "dormir-acompanado", "consuelo", "estar-juntos", "hablar", "escuchar", "compartir", "cuidar"] },
      { id: "alimentos", title: "Alimentos", categoryId: "alimentos", pictos: [] },
      { id: "actividades", title: "Hacer", pictos: ["jugar", "dibujar", "leer", "escribir", "recreo", "tarea", "otra-vez", "terminar", "trabajar", "musica", "pelota", "columpio", "cocinar", "esperar", "parar"] },
      { id: "personas", title: "Personas", pictos: ["mama", "papa", "maestra", "companero", "terapeuta", "aula", "familia", "abuela", "doctor", "fono", "psicologa", "amigo", "abrazo", "hola", "gracias"] },
      { id: "escuela", title: "Escuela", pictos: ["lapiz", "cuaderno", "tarea", "recreo", "leer", "escribir", "seno-carla", "seno-maribel", "matematicas", "lengua", "trabajar", "hablar", "oir", "compartir", "juntos"] },
      { id: "lugares", title: "Lugares", pictos: ["rio", "plaza", "supermercado", "shopping", "panaderia", "casa", "escuela", "recreo", "parque", "autobus", "coche", "clinica", "farmacia", "cuarto-bano", "salir"] },
      { id: "compras", title: "Compras", pictos: ["comprar-pan", "comprar-gaseosa", "comprar-helado", "comprar-zapatillas", "comprar-juguete", "carro", "bolsa", "ticket", "escoger", "precio", "supermercado", "shopping", "panaderia", "dinero", "ropa"] }
    ]
  },
  {
    id: "me-duele",
    title: "Me duele",
    color: "#c44747",
    sequence: ["doler"],
    groups: [
      { id: "recientes", title: "Recientes", pictos: [] },
      { id: "cuerpo", title: "Cuerpo", pictos: ["cabeza", "oido", "mano", "brazo", "pierna", "espalda", "dolor-estomago", "dolor-garganta"] }
    ]
  },
  {
    id: "me-siento",
    title: "Me siento",
    color: "#7c5cdb",
    sequence: ["me-siento"],
    groups: [
      { id: "recientes", title: "Recientes", pictos: [] },
      { id: "emociones", title: "Emociones", pictos: ["contento", "triste", "enfadado", "miedo", "nervioso", "cansado", "aburrido", "tranquilo", "asustado", "calma"] },
      { id: "cuerpo", title: "Cuerpo", pictos: ["mareado", "enfermo", "frio", "calor", "solo"] }
    ]
  },
  {
    id: "yo-tengo",
    title: "Yo tengo",
    color: "#ffb703",
    sequence: ["yo", "tengo"],
    groups: [
      { id: "recientes", title: "Recientes", pictos: [] },
      { id: "sensaciones", title: "Sensaciones", pictos: ["hambre", "frio", "calor", "miedo", "dolor", "tos", "fiebre"] },
      { id: "cosas", title: "Cosas", pictos: ["lapiz", "cuaderno", "tarea", "agua", "medicina", "dinero", "ropa", "juguete", "pelota", "ticket", "bolsa"] }
    ]
  }
];

const COMMUNICATION_STARTER_PHRASES = {
  "yo-quiero": {
    abrazo: "un abrazo",
    solo: "estar solo",
    mama: "ver a mamá",
    papa: "ver a papá",
    maestra: "hablar con la maestra",
    companero: "estar con un compañero",
    terapeuta: "hablar con mi terapeuta",
    familia: "estar con mi familia",
    abuela: "ver a mi abuela",
    doctor: "ver al doctor",
    fono: "hablar con la fonoaudióloga",
    psicologa: "hablar con la psicóloga",
    "seno-carla": "hablar con la seño Carla",
    "seno-maribel": "hablar con la seño Maribel"
  },
  "me-duele": {
    cabeza: "la cabeza",
    oido: "el oído",
    mano: "la mano",
    brazo: "el brazo",
    pierna: "la pierna",
    espalda: "la espalda",
    "dolor-estomago": "el estómago",
    "dolor-garganta": "la garganta"
  },
  "me-siento": {
    miedo: "con miedo",
    calma: "en calma",
    frio: "con frío",
    calor: "con calor"
  },
  "yo-tengo": {
    lapiz: "un lápiz",
    cuaderno: "un cuaderno",
    pelota: "una pelota",
    ticket: "un ticket",
    bolsa: "una bolsa"
  }
};

const DEFAULT_DATA = {
  settings: {
    appName: "Ian Escuela",
    studentName: "Ian"
  },
  subjects: [
    {
      id: "tecnologia", title: "Tecnología", icon: "settings", color: "#177e89",
      themes: withWeightLabThemes("tecnologia", TECHNOLOGY_THEMES)
    },
    {
      id: "lengua",
      title: "Lengua",
      icon: "book",
      color: "#f07167",
      themes: [
        ...LANGUAGE_MISSION_THEMES,
        ...PACMAN_LANGUAGE_THEMES,
        {
          id: "onomatopeyas-animales",
          title: "Sonidos de animales",
          description: "Relacionar cada onomatopeya con el animal correcto.",
          activityLabel: "6 sonidos diferentes",
          randomExerciseCount: 6,
          animalSoundPool: [
            { id: "gato", label: "Gato", visual: "🐱", sound: "MIAU MIAU" },
            { id: "lobo", label: "Lobo", visual: "🐺", sound: "AUUUU" },
            { id: "pollito", label: "Pollito", visual: "🐥", sound: "PÍO PÍO" },
            { id: "gallo", label: "Gallo", visual: "🐓", sound: "COCOROCÓ" },
            { id: "abeja", label: "Abeja", visual: "🐝", sound: "BZZZZZ" },
            { id: "pato", label: "Pato", visual: "🦆", sound: "CUAC CUAC" }
          ],
          exercises: [
            {
              id: "elegir-animal-por-sonido",
              type: "animal-sound",
              prompt: "¿Qué animal hace este sonido?"
            }
          ]
        },
        {
          id: "rompecabezas-rimas",
          title: "Rompecabezas de rimas",
          description: "Unir las palabras que terminan con sonidos parecidos.",
          activityLabel: "9 rompecabezas",
          randomExerciseCount: 9,
          rhymePairPool: [
            {
              id: "pato-gato",
              words: [
                { id: "pato", label: "Pato", visual: "🦆" },
                { id: "gato", label: "Gato", visual: "🐱" }
              ]
            },
            {
              id: "queso-hueso",
              words: [
                { id: "queso", label: "Queso", visual: "🧀" },
                { id: "hueso", label: "Hueso", visual: "🦴" }
              ]
            },
            {
              id: "lechuga-tortuga",
              words: [
                { id: "lechuga", label: "Lechuga", visual: "🥬" },
                { id: "tortuga", label: "Tortuga", visual: "🐢" }
              ]
            },
            {
              id: "fresa-mesa",
              words: [
                { id: "fresa", label: "Fresa", visual: "🍓" },
                { id: "mesa", label: "Mesa", visual: "╦" }
              ]
            },
            {
              id: "avion-camion",
              words: [
                { id: "avion", label: "Avión", visual: "✈️" },
                { id: "camion", label: "Camión", visual: "🚚" }
              ]
            },
            {
              id: "dinero-cartero",
              words: [
                { id: "dinero", label: "Dinero", visual: "💰" },
                { id: "cartero", label: "Cartero", visual: "📬" }
              ]
            },
            {
              id: "vestido-nido",
              words: [
                { id: "vestido", label: "Vestido", visual: "👗" },
                { id: "nido", label: "Nido", visual: "🪺" }
              ]
            },
            {
              id: "foca-boca",
              words: [
                { id: "foca", label: "Foca", visual: "🦭" },
                { id: "boca", label: "Boca", visual: "👄" }
              ]
            },
            {
              id: "galleta-bicicleta",
              words: [
                { id: "galleta", label: "Galleta", visual: "🍪" },
                { id: "bicicleta", label: "Bicicleta", visual: "🚲" }
              ]
            }
          ],
          exercises: [
            {
              id: "unir-palabras-que-riman",
              type: "rhyme-puzzle",
              prompt: "Buscá la palabra que rima"
            }
          ]
        },
        {
          id: "texto-instructivo-receta",
          title: "Texto instructivo: una receta",
          description: "Leer instrucciones breves y relacionarlas con fotografías.",
          activityLabel: "2 ejercicios",
          exercises: [
            {
              id: "receta-bife-arroz-tomate",
              type: "instructional-recipe",
              prompt: "Bife a la plancha con arroz y tomate",
              ingredients: [
                { id: "beef", label: "1 bife", image: "assets/pictos/carne.png" },
                { id: "rice", label: "1 taza de arroz", image: "assets/pictos/arroz.png" },
                { id: "tomato", label: "1 tomate", image: "assets/pictos/tomate.png" },
                { id: "water", label: "Agua", image: "assets/pictos/agua.png" },
                { id: "salt", label: "Sal", visual: "🧂" }
              ],
              workspaceItems: [
                { id: "rice", label: "Arroz", image: "assets/pictos/arroz.png" },
                { id: "beef", label: "Bife", image: "assets/pictos/carne.png" },
                { id: "tomato", label: "Tomate", image: "assets/pictos/tomate.png" },
                { id: "plate", label: "Plato", visual: "🍽️" }
              ],
              steps: [
                {
                  id: "prepare-rice",
                  segments: [
                    { text: "Primero", kind: "connector" },
                    { text: ", " },
                    { text: "colocar", kind: "verb" },
                    { text: " el arroz y el agua en una olla." }
                  ],
                  question: "¿Qué alimento colocamos en la olla?",
                  expectedAction: "rice",
                  reflection: "Primero, colocamos el arroz en la olla."
                },
                {
                  id: "cook-rice",
                  segments: [
                    { text: "Luego", kind: "connector" },
                    { text: ", " },
                    { text: "cocinar", kind: "verb" },
                    { text: " el arroz." }
                  ],
                  question: "¿Qué alimento cocinamos?",
                  expectedAction: "rice",
                  reflection: "Luego, cocinamos el arroz."
                },
                {
                  id: "grill-beef",
                  segments: [
                    { text: "Después", kind: "connector" },
                    { text: ", " },
                    { text: "cocinar", kind: "verb" },
                    { text: " el bife en la plancha." }
                  ],
                  question: "¿Qué alimento cocinamos en la plancha?",
                  expectedAction: "beef",
                  reflection: "Después, cocinamos el bife."
                },
                {
                  id: "prepare-tomato",
                  segments: [
                    { text: "A continuación", kind: "connector" },
                    { text: ", " },
                    { text: "cortar", kind: "verb" },
                    { text: " el tomate y " },
                    { text: "agregarle", kind: "verb" },
                    { text: " sal." }
                  ],
                  question: "¿Qué alimento cortamos?",
                  expectedAction: "tomato",
                  reflection: "A continuación, cortamos el tomate y agregamos sal."
                },
                {
                  id: "serve-meal",
                  segments: [
                    { text: "Por último", kind: "connector" },
                    { text: ", " },
                    { text: "servir", kind: "verb" },
                    { text: " el arroz, el bife y el tomate en el plato." }
                  ],
                  question: "¿Dónde servimos la comida?",
                  expectedAction: "plate",
                  reflection: "Por último, servimos la comida en el plato."
                }
              ]
            },
            {
              id: "unir-receta-con-fotos",
              type: "recipe-photo-matching",
              prompt: "Uní cada instrucción con su foto",
              support: "Tocá una instrucción y después una foto.",
              photoOrder: ["grill-beef", "serve-meal", "prepare-rice", "prepare-tomato", "cook-rice"],
              steps: [
                {
                  id: "prepare-rice",
                  text: "Primero, colocar el arroz y el agua en una olla.",
                  image: "assets/recipe/paso-1-arroz-agua.jpg"
                },
                {
                  id: "cook-rice",
                  text: "Luego, cocinar el arroz.",
                  image: "assets/recipe/paso-2-arroz-cocido.jpg"
                },
                {
                  id: "grill-beef",
                  text: "Después, cocinar el bife en la plancha.",
                  image: "assets/recipe/paso-3-bife-plancha.jpg"
                },
                {
                  id: "prepare-tomato",
                  text: "A continuación, cortar el tomate y agregarle sal.",
                  image: "assets/recipe/paso-4-tomate-sal.jpg"
                },
                {
                  id: "serve-meal",
                  text: "Por último, servir el arroz, el bife y el tomate en el plato.",
                  image: "assets/recipe/paso-5-plato-listo.jpg"
                }
              ]
            }
          ]
        },
        {
          id: "oraciones-psp-sofia",
          title: "Armamos oraciones",
          description: "Ordenar oraciones cortas y reconocer sujeto, verbo y predicado.",
          activityLabel: "8 oraciones · PSP Sofía",
          randomExerciseCount: 8,
          credit: "Propuesta por PSP Sofía",
          exercises: [
            {
              id: "sujeto-verbo-predicado-sofia",
              type: "sentence-builder",
              prompt: "Armá la oración",
              sentences: [
                { id: "ian-manzana", subject: "Ian", verb: "come", complement: "una manzana", visual: "👦|🍎", audio: "01-ian-come-una-manzana.mp3" },
                { id: "sofia-cuento", subject: "Sofía", verb: "lee", complement: "un cuento", visual: "👩‍🏫|📖", audio: "02-sofia-lee-un-cuento.mp3" },
                { id: "perro-patio", subject: "El perro", verb: "corre", complement: "en el patio", visual: "🐕|🌳", audio: "03-el-perro-corre-en-el-patio.mp3" },
                { id: "nena-pelota", subject: "La nena", verb: "patea", complement: "la pelota", visual: "👧|⚽", audio: "04-la-nena-patea-la-pelota.mp3" },
                { id: "gato-cama", subject: "El gato", verb: "duerme", complement: "en la cama", visual: "🐈|🛏️", audio: "05-el-gato-duerme-en-la-cama.mp3" },
                { id: "papa-cena", subject: "Papá", verb: "cocina", complement: "la cena", visual: "👨‍🍳|🍲", audio: "06-papa-cocina-la-cena.mp3" },
                { id: "maestra-palabra", subject: "La maestra", verb: "escribe", complement: "una palabra", visual: "👩‍🏫|✏️", audio: "07-la-maestra-escribe-una-palabra.mp3" },
                { id: "ian-juguetes", subject: "Ian", verb: "guarda", complement: "los juguetes", visual: "👦|🧸", audio: "08-ian-guarda-los-juguetes.mp3" }
              ]
            }
          ]
        },
        {
          id: "milanesa-pure-psp-sofia",
          title: "Milanesa con puré",
          description: "Seguir una receta paso a paso con imágenes y animaciones.",
          activityLabel: "12 pasos · PSP Sofía",
          randomExerciseCount: 12,
          credit: "Propuesta por PSP Sofía",
          exercises: [
            {
              id: "receta-milanesa-pure-sofia",
              type: "sofia-recipe",
              prompt: "Milanesa con puré",
              ingredients: [
                { label: "Papas", visual: "🥔" },
                { label: "Carne", image: "assets/pictos/carne.png" },
                { label: "Huevo", visual: "🥚" },
                { label: "Pan rallado", visual: "🍞" },
                { label: "Manteca", visual: "🧈" },
                { label: "Leche", image: "assets/pictos/leche.png" },
                { label: "Sal", visual: "🧂" }
              ],
              steps: [
                { id: "peel", section: "pure", text: "Primero, un adulto pela las papas.", short: "Pelar las papas", visual: "🥔|🔪", scene: "peel", audio: "01-pelar-las-papas.mp3", options: ["peel", "bread", "serve"] },
                { id: "pot", section: "pure", text: "Después, pone las papas en una olla con agua.", short: "Ponerlas en la olla", visual: "🥔|🍲", scene: "pot", audio: "02-papas-en-la-olla.mp3", options: ["pot", "egg", "salt"] },
                { id: "boil", section: "pure", text: "Luego, hierve las papas.", short: "Hervir las papas", visual: "🍲|♨️", scene: "boil", audio: "03-hervir-las-papas.mp3", options: ["boil", "dip", "serve"] },
                { id: "drain", section: "pure", text: "Pasa las papas al colador.", short: "Pasarlas al colador", visual: "🥔|💧", scene: "drain", audio: "04-papas-al-colador.mp3", options: ["drain", "cook", "milk"] },
                { id: "mash", section: "pure", text: "Aplasta las papas para hacer el puré.", short: "Aplastar las papas", visual: "🥔|🥣", scene: "mash", audio: "05-aplastar-las-papas.mp3", options: ["mash", "egg", "bread"] },
                { id: "milk", section: "pure", text: "Agrega manteca y leche.", short: "Agregar manteca y leche", visual: "🧈|🥛", scene: "milk", audio: "06-manteca-y-leche.mp3", options: ["milk", "peel", "cook"] },
                { id: "salt", section: "pure", text: "Agrega un poco de sal.", short: "Agregar sal", visual: "🧂|🥣", scene: "salt", audio: "07-agregar-sal.mp3", options: ["salt", "pot", "dip"] },
                { id: "egg", section: "milanesa", text: "Para la milanesa, prepara el huevo.", short: "Preparar el huevo", visual: "🥚|🥣", scene: "egg", audio: "08-preparar-el-huevo.mp3", options: ["egg", "drain", "serve"] },
                { id: "dip", section: "milanesa", text: "Pasa la carne por el huevo.", short: "Pasarla por el huevo", visual: "🥩|🥚", scene: "dip", audio: "09-carne-por-el-huevo.mp3", options: ["dip", "milk", "boil"] },
                { id: "bread", section: "milanesa", text: "Pasa la carne por el pan rallado.", short: "Pasarla por pan rallado", visual: "🥩|🍞", scene: "bread", audio: "10-carne-por-pan-rallado.mp3", options: ["bread", "mash", "salt"] },
                { id: "cook", section: "milanesa", text: "Un adulto cocina la milanesa.", short: "Cocinar la milanesa", visual: "🍳|🥩", scene: "cook", audio: "11-cocinar-la-milanesa.mp3", options: ["cook", "pot", "egg"] },
                { id: "serve", section: "plate", text: "Por último, sirve la milanesa con el puré.", short: "Servir el plato", visual: "🍽️|✨", scene: "serve", audio: "12-servir-el-plato.mp3", options: ["serve", "peel", "drain"] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "cs-naturales",
      title: "Cs Naturales",
      icon: "leaf",
      color: "#4f9d69",
      themes: [
        {
          id: "tierra-pacman",
          title: "La Tierra: donde vivimos",
          description: "Descubrí la superficie y las capas de la Tierra con Pac-Man.",
          activityLabel: "Explorar · Abrir el modelo · Practicar",
          earthLayers: true,
          exercises: [{ id: "tierra-descubrir", type: "earth-layers", prompt: "La Tierra: donde vivimos" }]
        },
        {
          id: "partes-planta",
          title: "Las partes de la planta",
          description: "Conocer y reconocer flor, tallo, hoja y raiz.",
          activityLabel: "Aprender y practicar",
          exercises: [
            {
              id: "rotular-planta",
              type: "plant-labeling",
              prompt: "Arrastra cada palabra hasta la parte correcta",
              parts: [
                { id: "flor", label: "Flor", position: "flower" },
                { id: "tallo", label: "Tallo", position: "stem" },
                { id: "hoja", label: "Hoja", position: "leaf" },
                { id: "raiz", label: "Raiz", position: "root" }
              ]
            }
          ]
        },
        {
          id: "plasticos",
          title: "Los plásticos",
          description: "Reconocer materiales y observar sus propiedades.",
          activityLabel: "3 juegos · 18 desafíos",
          randomExerciseCount: 18,
          plasticMaterialsSequence: true,
          exercises: [
            {
              id: "plasticos-encontrar",
              type: "plastic-materials",
              stage: "find",
              prompt: "Tocá el de plástico"
            },
            {
              id: "plasticos-clasificar",
              type: "plastic-materials",
              stage: "material",
              prompt: "¿De qué es?"
            },
            {
              id: "plasticos-propiedades",
              type: "plastic-materials",
              stage: "property",
              prompt: "Probamos el plástico"
            }
          ]
        }
      ]
    },
    {
      id: "cs-sociales",
      title: "Cs Sociales",
      icon: "globe",
      color: "#4b7bec",
      themes: [
        {
          id: "objetos-sonidos",
          title: "Objetos y sonidos",
          description: "Une cada objeto con el sonido que le corresponde.",
          exercises: [
            {
              id: "objetos-sonidos-1",
              type: "matching",
              prompt: "Uní cada dibujo con su sonido",
              support: "Tocá un dibujo y después su sonido.",
              pairs: [
                { id: "tren", label: "Tren", visual: "🚂", sound: "Chuuu chuuuu" },
                { id: "reloj", label: "Reloj", visual: "⏰", sound: "Tic tac" },
                { id: "telefono", label: "Teléfono", visual: "☎️", sound: "Ring ring" },
                { id: "tambor", label: "Tambor", visual: "🥁", sound: "Pom pom pom" }
              ]
            },
            {
              id: "objetos-sonidos-2",
              type: "matching",
              prompt: "Uní cada dibujo con su sonido",
              support: "Tocá un dibujo y después su sonido.",
              pairs: [
                { id: "puerta", label: "Puerta", visual: "🚪", sound: "Toc toc" },
                { id: "timbre", label: "Timbre", visual: "🔔", sound: "Ding dong" },
                { id: "ambulancia", label: "Ambulancia", visual: "🚑", sound: "Piii piii" },
                { id: "silbato", label: "Silbato", visual: "📣", sound: "Fiu fiu" }
              ]
            }
          ]
        },
        {
          id: "animales-sonidos",
          title: "Animales y sonidos",
          description: "Une cada animal con el sonido que le corresponde.",
          exercises: [
            {
              id: "animales-sonidos-1",
              type: "matching",
              prompt: "Uní cada animal con su sonido",
              support: "Tocá un animal y después su sonido.",
              pairs: [
                { id: "perro", label: "Perro", visual: "🐶", sound: "Guau guau" },
                { id: "gato", label: "Gato", visual: "🐱", sound: "Miau" },
                { id: "vaca", label: "Vaca", visual: "🐮", sound: "Muuu" },
                { id: "pato", label: "Pato", visual: "🦆", sound: "Cuac cuac" }
              ]
            },
            {
              id: "animales-sonidos-2",
              type: "matching",
              prompt: "Uní cada animal con su sonido",
              support: "Tocá un animal y después su sonido.",
              pairs: [
                { id: "burro", label: "Burro", visual: "🫏", sound: "Hia hia" },
                { id: "gallo", label: "Gallo", visual: "🐓", sound: "Quiquiriquí" },
                { id: "caballo", label: "Caballo", visual: "🐴", sound: "Hiiii" },
                { id: "chancho", label: "Chancho", visual: "🐷", sound: "Oinc oinc" }
              ]
            }
          ]
        },
        {
          id: "que-sonido-hace",
          title: "¿Qué sonido hace?",
          description: "Toca un dibujo para descubrir su sonido.",
          activityLabel: "12 sonidos",
          exercises: [
            {
              id: "galeria-sonidos",
              type: "sound-gallery",
              prompt: "Tocá un dibujo para ver su sonido.",
              items: [
                { id: "fantasma", label: "Fantasma", visual: "👻", sound: "Boooo" },
                { id: "bomba", label: "Bomba", visual: "💣", sound: "Bummm" },
                { id: "tren", label: "Tren", visual: "🚂", sound: "Chuuu chuuuu" },
                { id: "campana", label: "Campana", visual: "🔔", sound: "Talán talán" },
                { id: "puerta", label: "Puerta", visual: "🚪", sound: "Toc toc" },
                { id: "moto", label: "Moto", visual: "🏍️", sound: "Rummm" },
                { id: "reloj", label: "Reloj", visual: "⏰", sound: "Tic tac" },
                { id: "timbre", label: "Timbre", visual: "🔘", sound: "Ding dong" },
                { id: "telefono", label: "Teléfono", visual: "☎️", sound: "Rin rin" },
                { id: "globo", label: "Globo", visual: "🎈", sound: "Ploooop" },
                { id: "ambulancia", label: "Ambulancia", visual: "🚑", sound: "Piii piii" },
                { id: "tambor", label: "Tambor", visual: "🥁", sound: "Pom pom pom" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "matematicas",
      title: "Matematicas",
      icon: "calc",
      color: "#1f7a8c",
      themes: [
        {
          id: "numeros-1-10",
          title: "Multiplicar con fantasmas",
          description: "Contar fantasmas y elegir el resultado.",
          activityLabel: "5 multiplicaciones diferentes cada vez",
          randomExerciseCount: 5,
          multiplicationPool: {
            easy: [[1, 1], [1, 2], [2, 1], [1, 3], [3, 1], [2, 2], [2, 3], [3, 2], [3, 3], [1, 4]],
            medium: [[4, 1], [2, 4], [4, 2], [3, 4], [4, 3], [4, 4], [1, 5], [5, 1], [2, 5], [5, 2]],
            challenge: [[3, 5], [5, 3], [4, 5], [5, 4], [5, 5]]
          },
          exercises: [
            {
              id: "multiplicaciones-fantasmas",
              type: "ghost-multiplication",
              prompt: "Tocá los fantasmas y elegí el resultado"
            }
          ]
        },
        {
          id: "sumas-resultados",
          title: "Sumas con fantasmas",
          description: "Juntar cantidades y elegir el resultado.",
          activityLabel: "5 sumas diferentes cada vez",
          randomExerciseCount: 5,
          sumPool: {
            easy: [[1, 1], [1, 2], [1, 3], [2, 2]],
            medium: [[1, 4], [2, 3], [1, 5], [2, 4], [3, 3]],
            challenge: [[2, 5], [3, 4], [3, 5], [4, 4], [4, 5]]
          },
          exercises: [
            {
              id: "sumas-fantasmas",
              type: "ghost-sum",
              prompt: "Juntá los fantasmas y elegí el resultado"
            }
          ]
        },
        {
          id: "circulo-circunferencia",
          title: "¿Círculo o circunferencia?",
          description: "Clasificar, observar partes, transformar figuras y aplicar la definición.",
          activityLabel: "10 desafíos variados de un banco de 48",
          randomExerciseCount: 10,
          circleGeometryPool: true,
          exercises: [
            {
              id: "circulos-y-circunferencias",
              type: "circle-geometry",
              prompt: "Pensá antes de elegir"
            }
          ]
        },
        {
          id: "angulos-pacman",
          title: "Ángulos con Pac-Man",
          description: "Reconocer, construir y usar ángulos jugando.",
          activityLabel: "4 juegos · 22 desafíos",
          randomExerciseCount: 22,
          pacmanAngleSequence: true,
          exercises: [
            {
              id: "pacman-reconocer-angulos",
              type: "pacman-angle",
              stage: "classify",
              prompt: "¿Qué ángulo es?"
            },
            {
              id: "pacman-comparar-angulos",
              type: "pacman-angle",
              stage: "compare",
              prompt: "Compará las bocas"
            },
            {
              id: "pacman-construir-angulos",
              type: "pacman-angle",
              stage: "build",
              prompt: "Abrí la boca"
            },
            {
              id: "pacman-girar-laberinto",
              type: "pacman-angle",
              stage: "maze",
              prompt: "¿Cuánto gira?"
            }
          ]
        },
        {
          id: "rectas-laberinto",
          title: "Cruces del laberinto",
          description: "Distinguir rectas paralelas, perpendiculares y oblicuas.",
          activityLabel: "8 desafíos con rectas",
          randomExerciseCount: 8,
          geometryQuest: "lines",
          exercises: [{ id: "rectas-pacman", type: "geometry-quest", prompt: "Mirá los caminos" }]
        },
        {
          id: "cuerpos-ruedan",
          title: "¿Quién rueda?",
          description: "Probar qué cuerpos geométricos ruedan suavemente.",
          activityLabel: "6 cuerpos para probar",
          randomExerciseCount: 6,
          geometryQuest: "rolling",
          exercises: [{ id: "ruedan-pacman", type: "geometry-quest", prompt: "¿Rueda suavemente?" }]
        },
        {
          id: "partes-cubo",
          title: "Explorá el cubo",
          description: "Reconocer caras, aristas y vértices; después contarlos.",
          activityLabel: "7 desafíos del cubo",
          randomExerciseCount: 7,
          geometryQuest: "cube-parts",
          exercises: [{ id: "partes-cubo-pacman", type: "geometry-quest", prompt: "Explorá el cubo" }]
        },
        {
          id: "armar-cubo",
          title: "Armá el cubo",
          description: "Completar seis caras y plegar el desarrollo del cubo.",
          activityLabel: "4 cubos para armar",
          randomExerciseCount: 4,
          geometryQuest: "cube-net",
          exercises: [{ id: "red-cubo-pacman", type: "geometry-quest", prompt: "Completá la cara que falta" }]
        }
      ]
    },
    {
      id: "ingles",
      title: "Inglés",
      icon: "language",
      color: "#7c5cdb",
      themes: [
        {
          id: "ingles-colores",
          title: "Colors",
          description: "Escuchar y reconocer los colores en inglés.",
          activityLabel: "6 colores diferentes cada vez",
          randomExerciseCount: 6,
          englishMode: "colors",
          englishVocabularyPool: [
            { id: "red", label: "Red", color: "#e63946", audio: "red.mp3" },
            { id: "blue", label: "Blue", color: "#277da1", audio: "blue.mp3" },
            { id: "yellow", label: "Yellow", color: "#f4d35e", audio: "yellow.mp3" },
            { id: "green", label: "Green", color: "#43aa8b", audio: "green.mp3" },
            { id: "orange", label: "Orange", color: "#f8961e", audio: "orange.mp3" },
            { id: "purple", label: "Purple", color: "#7c5cdb", audio: "purple.mp3" },
            { id: "black", label: "Black", color: "#25262b", audio: "black.mp3" },
            { id: "white", label: "White", color: "#ffffff", audio: "white.mp3" }
          ],
          exercises: [
            { id: "reconocer-colores-ingles", type: "english-vocabulary", prompt: "Touch the color" }
          ]
        },
        {
          id: "ingles-utiles",
          title: "School supplies",
          description: "Escuchar una palabra y elegir el útil escolar correcto.",
          activityLabel: "6 útiles diferentes cada vez",
          randomExerciseCount: 6,
          englishMode: "supplies",
          englishVocabularyPool: [
            { id: "pencil", label: "Pencil", image: "assets/pictos/lapiz.png", audio: "pencil.mp3" },
            { id: "notebook", label: "Notebook", image: "assets/pictos/cuaderno.png", audio: "notebook.mp3" },
            { id: "book", label: "Book", image: "assets/english/book.png", audio: "book.mp3" },
            { id: "eraser", label: "Eraser", image: "assets/english/eraser.png", audio: "eraser.mp3" },
            { id: "ruler", label: "Ruler", image: "assets/english/ruler.png", audio: "ruler.mp3" },
            { id: "scissors", label: "Scissors", image: "assets/english/scissors.png", audio: "scissors.mp3" },
            { id: "glue", label: "Glue", image: "assets/english/glue.png", audio: "glue.mp3" },
            { id: "backpack", label: "Backpack", image: "assets/english/backpack.png", audio: "backpack.mp3" },
            { id: "pen", label: "Pen", image: "assets/english/pen.png", audio: "pen.mp3" },
            { id: "crayons", label: "Crayons", image: "assets/english/crayons.png", audio: "crayons.mp3" }
          ],
          exercises: [
            { id: "reconocer-utiles-ingles", type: "english-vocabulary", prompt: "Touch the school supply" }
          ]
        },
        {
          id: "ingles-numeros",
          title: "Numbers",
          description: "Escuchar el número en inglés y elegir la cantidad correcta.",
          activityLabel: "6 números diferentes cada vez",
          randomExerciseCount: 6,
          englishMode: "numbers",
          englishVocabularyPool: [
            { id: "one", label: "One", value: 1, audio: "one.mp3" },
            { id: "two", label: "Two", value: 2, audio: "two.mp3" },
            { id: "three", label: "Three", value: 3, audio: "three.mp3" },
            { id: "four", label: "Four", value: 4, audio: "four.mp3" },
            { id: "five", label: "Five", value: 5, audio: "five.mp3" },
            { id: "six", label: "Six", value: 6, audio: "six.mp3" },
            { id: "seven", label: "Seven", value: 7, audio: "seven.mp3" },
            { id: "eight", label: "Eight", value: 8, audio: "eight.mp3" },
            { id: "nine", label: "Nine", value: 9, audio: "nine.mp3" },
            { id: "ten", label: "Ten", value: 10, audio: "ten.mp3" }
          ],
          exercises: [
            { id: "reconocer-numeros-ingles", type: "english-vocabulary", prompt: "Touch the number" }
          ]
        }
      ]
    }
  ]
};

DEFAULT_DATA.subjects.forEach((subject) => {
  subject.themes = withPacmanDiscoveryThemes(subject.id, withPacmanWorldThemes(subject.id, withPacmanQuestThemes(subject.id, withFamilyThemes(subject.id, withSchoolArcadeThemes(subject.id, subject.themes)))));
  subject.themes = withSchoolExpeditionThemes(subject.id, subject.themes);
});

let data = loadData();
let route = { view: "home" };
let session = null;
let englishAudio = null;
let languageAudio = null;
let communicationSentence = [];
let communicationWrittenText = "";
let communicationTextPosition = 0;
let communicationStarter = null;
let communicationGroup = null;
let communicationCategory = null;
let communicationPresentation = false;
let communicationNegated = false;
let communicationQuickAudio = null;
let communicationQuickAudioFinish = null;
let communicationAudioStatus = "";
let communicationQuickAudioStatesMemory = {};
let turnerDraft = { title: "", participants: [] };
let turnerSession = null;
let supportAudio = null;
let supportNumberMode = "show";
let supportNumberRange = 10;
let supportSelectedNumber = null;
let supportCount = 0;
let supportColorMode = "show";
let supportSelectedColor = null;
let multiplicationSupportTable = 0;
let multiplicationSupportDeck = [];
let multiplicationSupportCurrent = null;
let multiplicationSupportAudio = null;
let multiplicationSupportCooldownTimer = null;
let multiplicationAudioNextAtMemory = 0;
let multiplicationSupportAudioPlayed = false;
let multiplicationSupportReplayUnlocked = false;
let multiplicationSupportAnswerError = "";
let appSpeechAudio = null;
let appSpeechNextAtMemory = 0;
let deferredPwaInstallPrompt = null;
let pwaInstallMode = null;

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");

document.addEventListener("contextmenu", (event) => event.preventDefault(), { capture: true });
document.addEventListener("selectstart", (event) => event.preventDefault(), { capture: true });

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function icon(name) {
  const path = ICONS[name] || ICONS.home;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function shuffled(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

let lastGhostSumSignature = "";

function ghostSumOptions(result, maximum = 10) {
  const values = new Set([result]);
  for (const distance of [1, 2]) {
    for (const offset of shuffled([-distance, distance])) {
      const candidate = result + offset;
      if (candidate > 0 && candidate <= maximum) values.add(candidate);
      if (values.size === 3) break;
    }
    if (values.size === 3) break;
  }
  return shuffled([...values]);
}

function createGhostSumExercises(theme) {
  const pool = theme.sumPool || {};
  const orientPair = ([first, second]) => (first !== second && Math.random() < 0.5 ? [second, first] : [first, second]);
  const easy = shuffled(pool.easy || []).slice(0, 2).map(orientPair);
  const medium = shuffled(pool.medium || []).slice(0, 2).map(orientPair);
  const challenge = shuffled(pool.challenge || []).slice(0, 1).map(orientPair);
  let ordered = [...shuffled(easy), ...shuffled(medium), ...challenge];
  let signature = ordered.map((pair) => pair.join("+")).join("|");
  if (signature === lastGhostSumSignature && ordered.length > 1) {
    [ordered[0], ordered[1]] = [ordered[1], ordered[0]];
    signature = ordered.map((pair) => pair.join("+")).join("|");
  }
  lastGhostSumSignature = signature;

  return ordered.map(([left, right], index) => {
    const result = left + right;
    return {
      id: uid(`suma-fantasma-${index + 1}`),
      type: "ghost-sum",
      prompt: "Juntá los fantasmas y elegí el resultado",
      left,
      right,
      result,
      options: ghostSumOptions(result)
    };
  });
}

function multiplicationPairKey(pair) {
  return `${pair[0]}x${pair[1]}`;
}

function readMultiplicationBag() {
  try {
    const saved = JSON.parse(localStorage.getItem(MULTIPLICATION_BAG_KEY) || "{}");
    return {
      easy: Array.isArray(saved.easy) ? saved.easy : [],
      medium: Array.isArray(saved.medium) ? saved.medium : [],
      challenge: Array.isArray(saved.challenge) ? saved.challenge : []
    };
  } catch {
    return { easy: [], medium: [], challenge: [] };
  }
}

function takeMultiplicationPairs(pool, savedKeys, amount) {
  const pairsByKey = new Map(pool.map((pair) => [multiplicationPairKey(pair), pair]));
  const remaining = [...new Set(savedKeys)].filter((key) => pairsByKey.has(key));
  if (remaining.length < amount) {
    const refill = shuffled([...pairsByKey.keys()]).filter((key) => !remaining.includes(key));
    remaining.push(...refill);
  }
  const selectedKeys = remaining.splice(0, amount);
  return {
    selected: selectedKeys.map((key) => pairsByKey.get(key)),
    remaining
  };
}

function createGhostMultiplicationExercises(theme) {
  const pool = theme.multiplicationPool || {};
  const bag = readMultiplicationBag();
  const easy = takeMultiplicationPairs(pool.easy || [], bag.easy, 2);
  const medium = takeMultiplicationPairs(pool.medium || [], bag.medium, 2);
  const challenge = takeMultiplicationPairs(pool.challenge || [], bag.challenge, 1);

  try {
    localStorage.setItem(
      MULTIPLICATION_BAG_KEY,
      JSON.stringify({ easy: easy.remaining, medium: medium.remaining, challenge: challenge.remaining })
    );
  } catch {
    // La actividad puede continuar aunque el dispositivo no permita guardar el avance de la bolsa.
  }

  return [...easy.selected, ...medium.selected, ...challenge.selected].map(([groupCount, groupSize], index) => {
    const result = groupCount * groupSize;
    return {
      id: uid(`multiplicacion-fantasma-${index + 1}`),
      type: "ghost-multiplication",
      prompt: "Tocá los fantasmas y elegí el resultado",
      groupCount,
      groupSize,
      result,
      options: ghostSumOptions(result, 25)
    };
  });
}

function createAnimalSoundExercises(theme) {
  const animals = theme.animalSoundPool || [];
  return shuffled(animals).map((animal, index) => {
    const distractors = shuffled(animals.filter((candidate) => candidate.id !== animal.id)).slice(0, 2);
    return {
      id: uid(`sonido-animal-${index + 1}`),
      type: "animal-sound",
      prompt: "¿Qué animal hace este sonido?",
      sound: animal.sound,
      correctAnimalId: animal.id,
      options: shuffled([animal, ...distractors]).map((option) => ({ ...option }))
    };
  });
}

function createRhymePuzzleExercises(theme) {
  const pairs = theme.rhymePairPool || [];
  const allWords = pairs.flatMap((pair) => pair.words || []);
  return shuffled(pairs).map((pair, index) => {
    const reverse = Math.random() < 0.5;
    const sourceWord = pair.words[reverse ? 1 : 0];
    const correctWord = pair.words[reverse ? 0 : 1];
    const pairWordIds = new Set(pair.words.map((word) => word.id));
    const distractors = shuffled(allWords.filter((word) => !pairWordIds.has(word.id))).slice(0, 2);
    return {
      id: uid(`rompecabezas-rima-${index + 1}`),
      type: "rhyme-puzzle",
      prompt: "Buscá la palabra que rima",
      pairId: pair.id,
      sourceWord: { ...sourceWord },
      correctWordId: correctWord.id,
      options: shuffled([correctWord, ...distractors]).map((word) => ({ ...word }))
    };
  });
}

function readStoredList(storageKey, scopeId) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return Array.isArray(saved?.[scopeId]) ? saved[scopeId] : [];
  } catch {
    return [];
  }
}

function writeStoredList(storageKey, scopeId, values) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    localStorage.setItem(storageKey, JSON.stringify({ ...saved, [scopeId]: values }));
  } catch {
    // La actividad sigue funcionando aunque el almacenamiento local no este disponible.
  }
}

function updateEnglishReview(themeId, wordId, needsReview) {
  const current = readStoredList(ENGLISH_REVIEW_KEY, themeId).filter((id) => id !== wordId);
  writeStoredList(ENGLISH_REVIEW_KEY, themeId, needsReview ? [wordId, ...current].slice(0, 10) : current);
}

function takeEnglishVocabularyTargets(theme) {
  const pool = theme.englishVocabularyPool || [];
  const poolById = new Map(pool.map((item) => [item.id, item]));
  const amount = Math.min(theme.randomExerciseCount || 6, pool.length);
  const reviewIds = [...new Set(readStoredList(ENGLISH_REVIEW_KEY, theme.id))]
    .filter((id) => poolById.has(id))
    .slice(0, 2);
  let remaining = [...new Set(readStoredList(ENGLISH_BAG_KEY, theme.id))].filter((id) => poolById.has(id));
  const selectedIds = [...reviewIds];
  remaining = remaining.filter((id) => !selectedIds.includes(id));

  while (selectedIds.length < amount) {
    if (!remaining.length) {
      remaining = shuffled(pool.map((item) => item.id).filter((id) => !selectedIds.includes(id)));
    }
    const nextId = remaining.shift();
    if (!nextId) break;
    if (!selectedIds.includes(nextId)) selectedIds.push(nextId);
  }

  writeStoredList(ENGLISH_BAG_KEY, theme.id, remaining);
  return selectedIds.map((id) => poolById.get(id)).filter(Boolean);
}

function englishVocabularyDistractors(theme, target) {
  const candidates = (theme.englishVocabularyPool || []).filter((item) => item.id !== target.id);
  if (theme.englishMode !== "numbers") return shuffled(candidates).slice(0, 3);
  return shuffled(candidates)
    .sort((first, second) => Math.abs(first.value - target.value) - Math.abs(second.value - target.value))
    .slice(0, 3);
}

function createEnglishVocabularyExercise(theme, target, retryCount = 0) {
  const options = shuffled([target, ...englishVocabularyDistractors(theme, target)]).map((item) => ({ ...item }));
  return {
    id: uid(`ingles-${theme.englishMode}-${target.id}`),
    type: "english-vocabulary",
    prompt: "Touch",
    mode: theme.englishMode,
    wordId: target.id,
    word: target.label,
    audio: target.audio,
    correctId: target.id,
    retryCount,
    options
  };
}

function createEnglishVocabularyExercises(theme) {
  return takeEnglishVocabularyTargets(theme).map((target) => createEnglishVocabularyExercise(theme, target));
}

function pacmanAngleCategoryForDegrees(degrees) {
  if (degrees >= 360) return "full";
  if (degrees > 180) return "reflex";
  if (degrees === 180) return "straight";
  if (degrees > 90) return "obtuse";
  if (degrees === 90) return "right";
  return "acute";
}

function pacmanCategoryOptions(category) {
  const optionSets = {
    acute: ["acute", "right", "obtuse"],
    right: ["acute", "right", "obtuse"],
    obtuse: ["acute", "right", "obtuse"],
    straight: ["right", "obtuse", "straight"]
  };
  return shuffled(optionSets[category] || ["acute", "right", "obtuse"]);
}

function pacmanDegreeOptions(degrees) {
  const optionSets = {
    45: [45, 90, 180],
    90: [45, 90, 180],
    135: [90, 135, 180],
    180: [90, 180, 360],
    270: [180, 270, 360],
    360: [180, 270, 360]
  };
  return shuffled(optionSets[degrees] || [degrees, 90, 180]);
}

function createPacmanAngleExercises(theme) {
  const classifyRounds = [
    [45, 0, 104],
    [90, 90, 92],
    [130, 210, 108],
    [180, 0, 98],
    [65, 315, 86],
    [150, 135, 112]
  ].map(([degrees, orientation, radius], index) => {
    const category = pacmanAngleCategoryForDegrees(degrees);
    return {
      id: `clasificar-${index + 1}`,
      degrees,
      category,
      orientation,
      radius,
      options: pacmanCategoryOptions(category)
    };
  });
  const buildRounds = [
    [25, 120],
    [85, 25],
    [45, 120],
    [90, 25],
    [130, 70],
    [180, 110],
    [30, 150],
    [120, 45]
  ].map(([degrees, initial], index) => ({
    id: `construir-${index + 1}`,
    degrees,
    initial,
    category: pacmanAngleCategoryForDegrees(degrees)
  }));
  const mazeRounds = [90, 45, 180, 135, 270, 360].map((degrees, index) => ({
    id: `giro-${index + 1}`,
    degrees,
    category: pacmanAngleCategoryForDegrees(degrees),
    options: pacmanDegreeOptions(degrees)
  }));
  const compareRounds = [
    { id: "comparar-mayor", degreesA: 25, degreesB: 85, prompt: "¿Cuál boca se abre más?", correctId: "B", clue: "Mirá el espacio entre los dos bordes." },
    { id: "comparar-menor", degreesA: 25, degreesB: 85, prompt: "¿Cuál boca se abre menos?", correctId: "A", clue: "Buscá la abertura más pequeña." }
  ];
  const roundsByStage = { classify: classifyRounds, compare: compareRounds, build: buildRounds, maze: mazeRounds };
  return theme.exercises.map((exercise) => ({
    ...clone(exercise),
    rounds: roundsByStage[exercise.stage] || []
  }));
}

function createGeometryQuestExercises(theme) {
  const mode = theme.geometryQuest;
  let rounds = [];
  if (mode === "lines") {
    rounds = [
      ["parallel", 0], ["perpendicular", 0], ["oblique", 0],
      ["parallel", 50], ["perpendicular", 32], ["oblique", 80]
    ].map(([kind, orientation], index) => ({
      id: `rectas-${index + 1}`,
      type: "choose",
      kind,
      orientation,
      prompt: "¿Cómo son estas rectas?",
      options: shuffled(["parallel", "perpendicular", "oblique"]),
      correctId: kind,
      clue: kind === "parallel" ? "No se cruzan." : kind === "perpendicular" ? "Se cruzan y forman 90°." : "Se cruzan, pero no forman 90°."
    }));
    rounds.push(
      { id: "girar-90", type: "turn", prompt: "Girá hasta formar 90°", target: 90, initial: 35, clue: "Buscá el ángulo recto: 90°." },
      { id: "girar-45", type: "turn", prompt: "Girá hasta formar 45°", target: 45, initial: 110, clue: "Buscá el ángulo agudo: 45°." }
    );
  } else if (mode === "rolling") {
    rounds = shuffled([
      ["sphere", "Esfera", true], ["cylinder", "Cilindro", true], ["cone", "Cono", true],
      ["cube", "Cubo", false], ["pyramid", "Pirámide", false], ["prism", "Prisma rectangular", false]
    ]).map(([shape, label, rolls]) => ({
      id: `rueda-${shape}`,
      type: "choose",
      shape,
      label,
      prompt: `¿${shape === "sphere" || shape === "pyramid" ? "La" : "El"} ${label.toLowerCase()} rueda suavemente?`,
      options: shuffled(["yes", "no"]),
      correctId: rolls ? "yes" : "no",
      clue: rolls ? "Tiene una superficie curva." : "Sus caras son planas."
    }));
  } else if (mode === "cube-parts") {
    rounds = [
      ["face", "La parte amarilla, ¿qué es?", ["face", "edge", "vertex"], "Una cara es una superficie cuadrada."],
      ["edge", "La línea roja, ¿qué es?", ["face", "edge", "vertex"], "Una arista une dos caras."],
      ["vertex", "El punto amarillo, ¿qué es?", ["face", "edge", "vertex"], "Un vértice es una esquina."],
      ["faces", "¿Cuántas caras tiene?", ["6", "8", "12"], "Tiene 6 caras cuadradas."],
      ["edges", "¿Cuántas aristas tiene?", ["6", "8", "12"], "Tiene 12 aristas."],
      ["vertices", "¿Cuántos vértices tiene?", ["6", "8", "12"], "Tiene 8 vértices."],
      ["equal", "¿Sus aristas son iguales?", ["yes", "no"], "En un cubo, las 12 aristas miden lo mismo."]
    ].map(([part, prompt, options, clue], index) => ({
      id: `cubo-parte-${index + 1}`,
      type: "choose",
      part,
      prompt,
      options: shuffled(options),
      correctId: ({ face: "face", edge: "edge", vertex: "vertex", faces: "6", edges: "12", vertices: "8", equal: "yes" })[part],
      clue
    }));
  } else if (mode === "cube-net") {
    const netLayouts = [
      {
        fixed: [[2, 0], [2, 1], [2, 2], [2, 3], [3, 1]],
        slots: { a: [1, 1], b: [3, 0], c: [3, 2] },
        correctId: "a"
      },
      {
        fixed: [[2, 0], [2, 1], [2, 2], [2, 3], [1, 2]],
        slots: { a: [1, 1], b: [3, 0], c: [1, 3] },
        correctId: "b"
      },
      {
        fixed: [[0, 2], [1, 2], [2, 2], [3, 2], [1, 1]],
        slots: { a: [0, 1], b: [2, 3], c: [2, 1] },
        correctId: "b"
      },
      {
        fixed: [[0, 2], [1, 2], [2, 2], [3, 2], [2, 3]],
        slots: { a: [1, 1], b: [1, 3], c: [3, 3] },
        correctId: "a"
      }
    ];
    rounds = netLayouts.map((layout, index) => ({
      id: `red-cubo-${index + 1}`,
      type: "net",
      prompt: "¿Dónde va la sexta cara para armar el cubo?",
      fixed: layout.fixed,
      slots: layout.slots,
      options: shuffled(Object.keys(layout.slots)),
      correctId: layout.correctId,
      clue: "Evitá formar un bloque de cuatro cuadrados."
    }));
  }
  return theme.exercises.map((exercise) => ({ ...clone(exercise), mode, rounds }));
}

function createPlasticMaterialsExercises(theme) {
  const findRounds = [
    ["bottle", "chair", "spoon"],
    ["key", "duck", "boat"],
    ["hanger", "spoon", "chair"],
    ["boat", "bag", "key"],
    ["ball", "chair", "spoon"],
    ["key", "comb", "boat"]
  ].map((objectIds, index) => {
    const correctId = objectIds.find((id) => PLASTIC_OBJECTS[id]?.material === "plastic");
    return {
      id: `encontrar-${index + 1}`,
      correctId,
      objectIds: shuffled(objectIds)
    };
  });
  const materialRounds = ["bottle", "chair", "key", "duck", "boat", "spoon"].map((objectId, index) => ({
    id: `material-${index + 1}`,
    objectId,
    correctId: PLASTIC_OBJECTS[objectId].material,
    options: shuffled(["plastic", "wood", "metal"])
  }));
  const propertyRounds = [
    { id: "propiedad-1", objectId: "bag", prompt: "¿Se dobla?", correctId: "yes", effect: "bend" },
    { id: "propiedad-2", objectId: "hanger", prompt: "¿Se dobla?", correctId: "no", effect: "rigid" },
    { id: "propiedad-3", objectId: "clearBottle", prompt: "¿Se ve a través?", correctId: "yes", effect: "transparent" },
    { id: "propiedad-4", objectId: "duck", prompt: "¿Se ve a través?", correctId: "no", effect: "opaque" },
    { id: "propiedad-5", objectId: "raincoat", prompt: "¿Absorbe agua?", correctId: "no", effect: "repel" },
    { id: "propiedad-6", objectId: "sponge", prompt: "¿Absorbe agua?", correctId: "yes", effect: "absorb" }
  ];
  const roundsByStage = { find: findRounds, material: materialRounds, property: propertyRounds };
  return theme.exercises.map((exercise) => ({
    ...clone(exercise),
    rounds: roundsByStage[exercise.stage] || []
  }));
}

function createCircleGeometryScenarioPool() {
  const fills = ["#168aad", "#ef476f", "#7b2cbf", "#f77f00", "#2a9d8f", "#4361ee"];
  const classify = Array.from({ length: 12 }, (_, index) => ({
    id: `classify-${index + 1}`,
    challengeType: "classify",
    concept: index % 2 === 0 ? "circle" : "circumference",
    variant: index,
    fill: fills[index % fills.length]
  }));
  const highlightedObjects = [
    ["galletita", "La cara de la galletita", "circle"],
    ["aro", "El aro de hula-hula", "circumference"],
    ["moneda", "La cara de la moneda", "circle"],
    ["plato-borde", "El borde del plato", "circumference"],
    ["cartel", "La cara del cartel", "circle"],
    ["pulsera", "La pulsera", "circumference"],
    ["pizza", "Toda la superficie de la pizza", "circle"],
    ["reloj-borde", "El borde del reloj", "circumference"],
    ["reloj-cara", "La cara del reloj", "circle"],
    ["rueda-borde", "El borde exterior de la rueda", "circumference"],
    ["plato-cara", "La superficie del plato", "circle"],
    ["lazo", "El lazo redondo cerrado", "circumference"]
  ].map(([objectKind, objectLabel, concept], index) => ({
    id: `highlight-${objectKind}`,
    challengeType: "highlight",
    concept,
    objectKind,
    objectLabel,
    variant: index,
    fill: fills[index % fills.length]
  }));
  const transform = Array.from({ length: 12 }, (_, index) => ({
    id: `transform-${index + 1}`,
    challengeType: "transform",
    concept: index % 2 === 0 ? "circle" : "circumference",
    variant: index,
    fill: fills[(index + 2) % fills.length]
  }));
  const find = Array.from({ length: 12 }, (_, index) => ({
    id: `find-${index + 1}`,
    challengeType: "find",
    concept: index % 2 === 0 ? "circle" : "circumference",
    variant: index,
    fill: fills[(index + 4) % fills.length]
  }));
  return [...classify, ...highlightedObjects, ...transform, ...find];
}

function updateCircleGeometryReview(themeId, reviewKey, needsReview) {
  const current = readStoredList(CIRCLE_GEOMETRY_REVIEW_KEY, themeId).filter((item) => item !== reviewKey);
  writeStoredList(CIRCLE_GEOMETRY_REVIEW_KEY, themeId, needsReview ? [reviewKey, ...current].slice(0, 8) : current);
}

function takeCircleGeometryScenarios(theme, challengeType, concept, amount, pool) {
  const matchingPool = pool.filter((scenario) => scenario.challengeType === challengeType && scenario.concept === concept);
  const byId = new Map(matchingPool.map((scenario) => [scenario.id, scenario]));
  const scopeId = `${theme.id}:${challengeType}:${concept}`;
  let remaining = [...new Set(readStoredList(CIRCLE_GEOMETRY_BAG_KEY, scopeId))].filter((id) => byId.has(id));
  const selectedIds = [];

  while (selectedIds.length < amount) {
    if (!remaining.length) {
      remaining = shuffled(matchingPool.map((scenario) => scenario.id).filter((id) => !selectedIds.includes(id)));
    }
    const nextId = remaining.shift();
    if (!nextId) break;
    if (!selectedIds.includes(nextId)) selectedIds.push(nextId);
  }

  writeStoredList(CIRCLE_GEOMETRY_BAG_KEY, scopeId, remaining);
  return selectedIds.map((id) => byId.get(id)).filter(Boolean);
}

function createCircleGeometryExercise(scenario, retryCount = 0) {
  const exercise = {
    id: uid(`geometria-${scenario.id}`),
    type: "circle-geometry",
    scenarioId: scenario.id,
    challengeType: scenario.challengeType,
    concept: scenario.concept,
    reviewKey: `${scenario.challengeType}:${scenario.concept}`,
    retryCount,
    variant: scenario.variant,
    fill: scenario.fill,
    objectKind: scenario.objectKind,
    objectLabel: scenario.objectLabel
  };
  if (scenario.challengeType === "classify") {
    exercise.prompt = "¿Qué figura ves?";
    exercise.correctId = scenario.concept;
    exercise.options = Object.entries(CIRCLE_GEOMETRY_CATEGORIES).map(([id, item]) => ({ id, label: item.label }));
  } else if (scenario.challengeType === "highlight") {
    exercise.prompt = "¿Qué figura representa la parte destacada?";
    exercise.correctId = scenario.concept;
    exercise.options = Object.entries(CIRCLE_GEOMETRY_CATEGORIES).map(([id, item]) => ({ id, label: item.label }));
  } else if (scenario.challengeType === "transform") {
    exercise.prompt = scenario.concept === "circle" ? "Convertí esta circunferencia en un círculo" : "Convertí este círculo en una circunferencia";
    exercise.correctId = scenario.concept === "circle" ? "fill" : "erase";
    exercise.options = [
      { id: "fill", label: "Pintar el interior" },
      { id: "erase", label: "Borrar el interior" }
    ];
  } else {
    exercise.prompt =
      scenario.concept === "circle"
        ? "Tocá el círculo: es redondo y tiene borde e interior"
        : "Tocá la circunferencia: es un borde redondo y cerrado";
    const shapes = shuffled([
      { id: `${scenario.id}-disk`, label: "Figura rellena", visualKind: "disk" },
      { id: `${scenario.id}-outline`, label: "Borde redondo cerrado", visualKind: "outline" },
      { id: `${scenario.id}-arc`, label: "Arco abierto", visualKind: "arc" },
      { id: `${scenario.id}-oval`, label: "Óvalo", visualKind: "oval" }
    ]);
    exercise.correctId = shapes.find((shape) => shape.visualKind === (scenario.concept === "circle" ? "disk" : "outline"))?.id;
    exercise.options = shapes;
  }
  return exercise;
}

function createCircleGeometryExercises(theme) {
  const pool = createCircleGeometryScenarioPool();
  const classifyExtraConcept = Math.random() < 0.5 ? "circle" : "circumference";
  const highlightExtraConcept = classifyExtraConcept === "circle" ? "circumference" : "circle";
  const distribution = [
    ["classify", "circle", classifyExtraConcept === "circle" ? 2 : 1],
    ["classify", "circumference", classifyExtraConcept === "circumference" ? 2 : 1],
    ["highlight", "circle", highlightExtraConcept === "circle" ? 2 : 1],
    ["highlight", "circumference", highlightExtraConcept === "circumference" ? 2 : 1],
    ["transform", "circle", 1],
    ["transform", "circumference", 1],
    ["find", "circle", 1],
    ["find", "circumference", 1]
  ];
  const selected = distribution.flatMap(([challengeType, concept, amount]) =>
    takeCircleGeometryScenarios(theme, challengeType, concept, amount, pool)
  );
  const reviewKeys = new Set(readStoredList(CIRCLE_GEOMETRY_REVIEW_KEY, theme.id));
  const ordered = [];
  const remaining = shuffled(selected);
  while (remaining.length) {
    const previous = ordered[ordered.length - 1];
    let nextIndex = remaining.findIndex(
      (scenario) =>
        scenario.challengeType !== previous?.challengeType &&
        scenario.concept !== previous?.concept &&
        (!ordered.length || !reviewKeys.has(`${scenario.challengeType}:${scenario.concept}`) || ordered.length >= 2)
    );
    if (nextIndex < 0) nextIndex = remaining.findIndex((scenario) => scenario.challengeType !== previous?.challengeType);
    if (nextIndex < 0) nextIndex = 0;
    ordered.push(remaining.splice(nextIndex, 1)[0]);
  }
  return ordered.slice(0, theme.randomExerciseCount || 10).map((scenario) => createCircleGeometryExercise(scenario));
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return normalizeData(DEFAULT_DATA);
    const parsed = JSON.parse(saved);
    return normalizeData(parsed);
  } catch {
    return normalizeData(DEFAULT_DATA);
  }
}

function normalizeData(value) {
  const source = value && typeof value === "object" ? value : {};
  const settings = source.settings && typeof source.settings === "object" ? source.settings : {};
  const sourceSubjects = Array.isArray(source.subjects) ? source.subjects : [];
  const defaultSubjects = DEFAULT_DATA.subjects;

  return {
    settings: {
      appName: String(settings.appName || DEFAULT_DATA.settings.appName),
      studentName: String(settings.studentName || DEFAULT_DATA.settings.studentName)
    },
    subjects: FIXED_SUBJECTS.map((fixed) => {
      const saved = sourceSubjects.find((subject) => subject?.id === fixed.id);
      const fallback = defaultSubjects.find((subject) => subject.id === fixed.id);
      const savedThemes = Array.isArray(saved?.themes) ? saved.themes : null;
      const hasLegacySocialActivity =
        fixed.id === "cs-sociales" &&
        savedThemes?.length === 1 &&
        savedThemes[0]?.id === "lugares" &&
        savedThemes[0]?.exercises?.length === 1 &&
        savedThemes[0]?.exercises?.[0]?.id === "escuela";
      const hasPreviousSoundActivity =
        fixed.id === "cs-sociales" && savedThemes?.length === 1 && savedThemes[0]?.id === "dibujos-sonidos";
      const hasPreviousTwoSoundActivities =
        fixed.id === "cs-sociales" &&
        savedThemes?.length === 2 &&
        savedThemes.some((theme) => theme?.id === "objetos-sonidos") &&
        savedThemes.some((theme) => theme?.id === "animales-sonidos");
      const hasPreviousSoundChoiceActivity =
        fixed.id === "cs-sociales" &&
        savedThemes?.some(
          (theme) =>
            theme?.id === "que-sonido-hace" &&
            theme?.exercises?.length === 4 &&
            theme.exercises.every((exercise) => exercise?.type === "sound-choice")
        );
      const hasPreviousLanguageActivity =
        fixed.id === "lengua" &&
        (!savedThemes?.some((theme) => theme?.id === "onomatopeyas-animales") ||
          !savedThemes?.some((theme) => theme?.id === "rompecabezas-rimas"));
      const hasPreviousMathActivity =
        fixed.id === "matematicas" &&
        !savedThemes?.some((theme) => theme?.id === "angulos-pacman");
      const hasPreviousNaturalActivity =
        fixed.id === "cs-naturales" &&
        (!savedThemes?.some((theme) => theme?.id === "partes-planta") ||
          !savedThemes?.some((theme) => theme?.id === "plasticos"));
      const baseThemes =
        hasLegacySocialActivity || hasPreviousSoundActivity || hasPreviousTwoSoundActivities || hasPreviousSoundChoiceActivity || hasPreviousLanguageActivity || hasPreviousMathActivity || hasPreviousNaturalActivity
          ? fallback?.themes || []
          : savedThemes || fallback?.themes || [];
      const themesWithCurrentLanguageActivities =
        fixed.id === "lengua"
          ? [
              ...baseThemes.map((theme) => {
                if (theme?.id !== "texto-instructivo-receta") return theme;
                return (fallback?.themes || []).find((defaultTheme) => defaultTheme.id === theme.id) || theme;
              }),
              ...(fallback?.themes || []).filter(
                (defaultTheme) => !baseThemes.some((theme) => theme?.id === defaultTheme.id)
              )
            ].sort((a, b) => Number(Boolean(b.missionMode)) - Number(Boolean(a.missionMode)))
          : baseThemes;
      const themesWithCurrentMathActivities = fixed.id === "matematicas"
        ? [
            ...themesWithCurrentLanguageActivities.map((theme) =>
              theme?.id === "angulos-pacman"
                ? (fallback?.themes || []).find((defaultTheme) => defaultTheme.id === theme.id) || theme
                : theme
            ),
            ...(fallback?.themes || []).filter(
              (defaultTheme) => !themesWithCurrentLanguageActivities.some((theme) => theme?.id === defaultTheme.id)
            )
          ]
        : themesWithCurrentLanguageActivities;
      const themesWithCurrentNaturalActivities = fixed.id === "cs-naturales"
        ? [
            ...(savedThemes || themesWithCurrentMathActivities).map((theme) =>
              theme?.id === "tierra-pacman"
                ? fallback.themes.find((item) => item.id === theme.id)
                : theme
            ),
            ...(fallback?.themes || []).filter((theme) =>
              !(savedThemes || themesWithCurrentMathActivities).some((item) => item?.id === theme.id)
            )
          ]
        : themesWithCurrentMathActivities;
      return {
        ...fixed,
        themes: clone(withSchoolExpeditionThemes(fixed.id, withPacmanDiscoveryThemes(fixed.id, withPacmanWorldThemes(fixed.id, withFarmTheme(fixed.id, withPacmanQuestThemes(fixed.id, withFamilyThemes(fixed.id, withSchoolArcadeThemes(fixed.id, fixed.id === "tecnologia"
          ? withWeightLabThemes(fixed.id, [...themesWithCurrentMathActivities, ...(fallback?.themes || []).filter(
              (theme) => !themesWithCurrentMathActivities.some((savedTheme) => savedTheme?.id === theme.id)
            )])
          : themesWithCurrentNaturalActivities))))))))
      };
    })
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function subjectById(id) {
  return data.subjects.find((subject) => subject.id === id);
}

function themeById(subject, id) {
  return subject?.themes.find((theme) => theme.id === id);
}

function allExercisesCount(subject) {
  return subject.themes.reduce((sum, theme) => sum + (theme.randomExerciseCount || theme.exercises.length), 0);
}

function setRoute(nextRoute) {
  storyUsageSync();
  if (typeof storyInteractionLocked === "function" && storyInteractionLocked()) return;
  if (typeof stopStoryMedia === "function") stopStoryMedia();
  if (route.view === "support-memory" && nextRoute.view !== "support-memory") leavePacmanMemory();
  if (route.view === "support-explorer" && nextRoute.view !== "support-explorer") leavePacmanExplorer();
  stopPacmanQuestAnimation();
  stopSchoolExpeditionAnimation();
  if (typeof stopCapacityAnimation === "function") stopCapacityAnimation();
  if (typeof stopEarthAnimation === "function") stopEarthAnimation();
  stopFamilyAudio();
  if (nextRoute.view !== "run") stopEnglishAudio();
  if (nextRoute.view !== "run") stopLanguageAudio();
  if (nextRoute.view !== "support-numbers" && nextRoute.view !== "support-colors") stopSupportAudio();
  if (nextRoute.view !== "communication") stopCommunicationQuickAudio();
  if (nextRoute.view !== "support-multiplication") {
    stopMultiplicationSupportAudio();
    stopMultiplicationCooldownTimer();
  }
  route = nextRoute;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function renderShell(content) {
  const subtitle = route.view === "home" ? "Inicio" : subtitleForRoute();
  app.innerHTML = `
    <header class="topbar">
      <button class="logo" type="button" data-action="home" aria-label="Inicio">${icon("home")}</button>
      <div class="brand">
        <h1>${escapeHtml(data.settings.appName || "Ian Escuela")}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
    </header>
    <main class="main">${content}</main>
  `;
}

function subtitleForRoute() {
  if (route.view === "school") return "Escuela";
  if (route.view === "communication") return "Me Comunico";
  if (route.view === "supports") return "Mis apoyos";
  if (route.view === "support-stories" || route.view === "support-story") return "Mis apoyos / Cuentos";
  if (route.view === "support-memory") return "Mis apoyos / Memoria con amigos";
  if (route.view === "support-explorer") return "Mis apoyos / Pac-Man explorador";
  if (route.view === "support-parish-visit") return "Mis apoyos / Visita a la parroquia";
  if (route.view === "support-numbers") return "Mis apoyos / Números";
  if (route.view === "support-colors") return "Mis apoyos / Colores";
  if (route.view === "support-multiplication") return "Mis apoyos / Tablas";
  if (route.view === "turner-setup") return "Mis apoyos / Turnos";
  if (route.view === "turner-live" || route.view === "turner-finish") return "Turnos";
  if (route.view === "subject") return subjectById(route.subjectId)?.title || "Materia";
  if (route.view === "theme") {
    const subject = subjectById(route.subjectId);
    return `${subject?.title || "Materia"} / ${themeById(subject, route.themeId)?.title || "Tema"}`;
  }
  return "Actividad";
}

function render() {
  storyUsageSync();
  if (typeof storyInteractionLocked === "function" && storyInteractionLocked()) return;
  document.documentElement.classList.toggle("story-mode", route.view === "support-story");
  document.body.classList.toggle("story-mode", route.view === "support-story");
  document.documentElement.classList.toggle("memory-mode", route.view === "support-memory");
  document.body.classList.toggle("memory-mode", route.view === "support-memory");
  document.documentElement.classList.toggle("explorer-mode", route.view === "support-explorer");
  document.body.classList.toggle("explorer-mode", route.view === "support-explorer");
  const focusedActivityTypes = ["earth-layers", "matching", "sound-choice", "sound-gallery", "drag-matching", "sum-choice-grid", "ghost-sum", "ghost-multiplication", "animal-sound", "rhyme-puzzle", "plant-labeling", "english-vocabulary", "circle-geometry", "pacman-angle", "pacman-verbs", "language-mission", "geometry-quest", "plastic-materials", "instructional-recipe", "recipe-photo-matching", "sentence-builder", "sofia-recipe"];
  focusedActivityTypes.push("capacity-lab");
  focusedActivityTypes.push("social-farm");
  if (session?.exercises?.[0]?.type === "weight-lab") focusedActivityTypes.push("weight-lab");
  if (session?.exercises?.[0]?.type === "pacman-world") focusedActivityTypes.push("pacman-world");
  if (session?.exercises?.[0]?.type === "pacman-discovery") focusedActivityTypes.push("pacman-discovery");
  if (session?.exercises?.[0]?.type === "school-expedition") focusedActivityTypes.push("school-expedition");
  const isFocusedActivity =
    route.view === "run" && (focusedActivityTypes.includes(session?.exercises?.[session.index]?.type) || session?.exercises?.[0]?.type === "pacman-verbs" || session?.exercises?.[0]?.type === "language-mission" || session?.exercises?.[0]?.type === "technology-lab" || session?.exercises?.[0]?.type === "school-arcade" || session?.exercises?.[0]?.type === "pacman-quest" || session?.exercises?.[0]?.type === "english-family");
  document.documentElement.classList.toggle("communication-mode", route.view === "communication");
  document.body.classList.toggle("communication-mode", route.view === "communication");
  const supportFocusMode = route.view === "support-numbers" || route.view === "support-colors" || route.view === "support-multiplication";
  document.documentElement.classList.toggle("support-focus-mode", supportFocusMode);
  document.body.classList.toggle("support-focus-mode", supportFocusMode);
  document.documentElement.classList.toggle("parish-visit-mode", route.view === "support-parish-visit");
  document.body.classList.toggle("parish-visit-mode", route.view === "support-parish-visit");
  const turnerMode = route.view === "turner-live" || route.view === "turner-finish";
  document.documentElement.classList.toggle("turner-mode", turnerMode);
  document.body.classList.toggle("turner-mode", turnerMode);
  document.documentElement.classList.toggle("matching-mode", isFocusedActivity);
  document.body.classList.toggle("matching-mode", isFocusedActivity);
  const isDragMatchingActivity = route.view === "run" && session?.exercises?.[session.index]?.type === "drag-matching";
  document.documentElement.classList.toggle("drag-matching-mode", isDragMatchingActivity);
  document.body.classList.toggle("drag-matching-mode", isDragMatchingActivity);
  if (isStoryRoute() && storyBreakRemainingMs() > 0) return renderStoryRest();
  if (route.view === "school") return renderSchool();
  if (route.view === "communication") return renderCommunication();
  if (route.view === "supports") return renderSupports();
  if (route.view === "support-stories") return renderStoryLibrary();
  if (route.view === "support-story") return renderStorySupport();
  if (route.view === "support-memory") return renderPacmanMemory();
  if (route.view === "support-explorer") return renderPacmanExplorer();
  if (route.view === "support-parish-visit") return renderParishVisit();
  if (route.view === "support-numbers") return renderSupportNumbers();
  if (route.view === "support-colors") return renderSupportColors();
  if (route.view === "support-multiplication") return renderSupportMultiplication();
  if (route.view === "turner-setup") return renderTurnerSetup();
  if (route.view === "turner-live") return renderTurnerLive();
  if (route.view === "turner-finish") return renderTurnerFinish();
  if (route.view === "subject") return renderSubject(route.subjectId);
  if (route.view === "theme") return renderTheme(route.subjectId, route.themeId);
  if (route.view === "run") return renderRunner();
  return renderHome();
}

function renderHome() {
  const installCallout = renderPwaInstallCallout();
  app.innerHTML = `
    <main class="home-screen">
      <section class="home-panel" aria-label="Inicio">
        <div class="home-greeting">
          <h1>Hola, ${escapeHtml(data.settings.studentName || "Ian")}</h1>
        </div>
        <div class="home-actions">
          <button class="home-card home-card-school" type="button" data-action="school">
            <span class="home-card-icon">${icon("book")}</span>
            <span>Escuela</span>
          </button>
          <button class="home-card home-card-communication" type="button" data-action="communication">
            <span class="home-card-icon">${icon("message")}</span>
            <span>Me comunico</span>
          </button>
          <button class="home-card home-card-supports" type="button" data-action="supports">
            <span class="home-card-icon">${icon("users")}</span>
            <span>Mis apoyos</span>
          </button>
          ${isCompanionEnabled() ? `<button class="home-card home-card-communication" type="button" data-action="companion"><span class="home-card-icon">${icon("speaker")}</span><span>Mi compañero</span></button>` : ""}
        </div>
        ${installCallout}
      </section>
    </main>
  `;
}

function isNativeAppRuntime() {
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

function isCompanionEnabled() {
  return isNativeAppRuntime() ? nativeCompanionEnabled : window.IAN_COMPANION_ENABLED === true;
}

async function loadNativeCompanion() {
  if (!isNativeAppRuntime()) return;
  try {
    const config = await window.Capacitor.Plugins.Companion.getConfig();
    nativeCompanionEnabled = config.enabled === true;
    if (route.view === "home") render();
  } catch { nativeCompanionEnabled = false; }
}

function isInstalledPwa() {
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosBrowser() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !isNativeAppRuntime();
}

function renderPwaInstallCallout() {
  if (window.IAN_COMPANION_ENABLED === true) return "";
  if (!pwaInstallMode || isNativeAppRuntime() || isInstalledPwa()) return "";
  const label = pwaInstallMode === "ios" ? "Cómo instalar" : "Instalar app";
  const description =
    pwaInstallMode === "ios"
      ? "Agregala a la pantalla de inicio para usarla como una app."
      : "Instalala en este dispositivo y tenela siempre a mano.";
  return `
    <aside class="pwa-install-card" aria-label="Instalar App de Ian">
      <span class="pwa-install-icon">${icon("download")}</span>
      <span class="pwa-install-copy"><strong>${label}</strong><small>${description}</small></span>
      <button class="btn btn-primary" type="button" data-action="pwa-install">${icon("download")}${label}</button>
    </aside>
  `;
}

async function requestPwaInstall() {
  if (deferredPwaInstallPrompt) {
    const prompt = deferredPwaInstallPrompt;
    deferredPwaInstallPrompt = null;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice?.outcome === "accepted") {
      pwaInstallMode = null;
      render();
      return;
    }
    pwaInstallMode = "prompt";
    return;
  }

  if (isIosBrowser()) {
    openModal({
      title: "Instalar en iPhone o iPad",
      body: `
        <div class="pwa-ios-instructions">
          <p>1. Abrí esta página en Safari.</p>
          <p>2. Tocá el botón <strong>Compartir</strong>.</p>
          <p>3. Elegí <strong>Agregar a inicio</strong> y activá <strong>Abrir como app web</strong>.</p>
        </div>
      `,
      submitText: "Entendido",
      onSubmit: closeModal
    });
  }
}

function setupPwaInstall() {
  if (isNativeAppRuntime() || isInstalledPwa()) return;

  if (isIosBrowser()) pwaInstallMode = "ios";

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPwaInstallPrompt = event;
    pwaInstallMode = "prompt";
    if (route.view === "home") render();
  });

  window.addEventListener("appinstalled", () => {
    deferredPwaInstallPrompt = null;
    pwaInstallMode = null;
    if (route.view === "home") render();
    toast("App instalada");
  });
}

function renderSupports() {
  renderShell(`
    <section class="screen supports-screen">
      <div class="screen-actions">
        <button class="btn btn-ghost" type="button" data-action="home">${icon("arrow")}Inicio</button>
      </div>
      <div class="section-title supports-title">
        <div>
          <p class="eyebrow">RECURSOS DE APOYO</p>
          <h2>Mis apoyos</h2>
        </div>
      </div>
      <div class="supports-grid">
        <button class="support-tool-card support-tool-explorer" type="button" data-action="px-open">
          <span class="support-tool-icon">${pxArt("pac")}</span>
          <span class="support-tool-copy"><strong>Pac-Man explorador</strong><small>Islas de código · Armá tu aventura con bloques</small></span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-stories" type="button" data-action="story-library">
          <span class="support-tool-icon"><img src="./assets/stories/el-ultimo-entrenador/cover.jpg" alt="" /></span>
          <span class="support-tool-copy"><strong>Cuentos</strong><small>El último entrenador · Leer a mi ritmo</small></span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-memory" type="button" data-action="pm-open">
          <span class="support-tool-icon">${pmSprite("pacman")}</span>
          <span class="support-tool-copy">
            <strong>Memoria con amigos</strong>
            <small>Pac-Man · Encontrá las parejas</small>
          </span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-parish" type="button" data-action="pv-open">
          <span class="support-tool-icon"><img src="./assets/supports/parish/medalla1-1.jpg" alt="" /></span>
          <span class="support-tool-copy">
            <strong>Visita a la parroquia</strong>
            <small>Medalla Milagrosa · Profes de UCASAL</small>
          </span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-turner" type="button" data-action="turner-open">
          <span class="support-tool-icon">${icon("turns")}</span>
          <span class="support-tool-copy">
            <strong>Turnos</strong>
            <small>Ahora · Después · Esperan</small>
          </span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-numbers" type="button" data-action="support-numbers-open">
          <span class="support-tool-icon">123</span>
          <span class="support-tool-copy">
            <strong>Números</strong>
            <small>Mostrar · Contar</small>
          </span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-colors" type="button" data-action="support-colors-open">
          <span class="support-tool-icon">${icon("palette")}</span>
          <span class="support-tool-copy">
            <strong>Colores</strong>
            <small>Mostrar · Elegir</small>
          </span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
        <button class="support-tool-card support-tool-multiplication" type="button" data-action="support-multiplication-open">
          <span class="support-tool-icon">×</span>
          <span class="support-tool-copy">
            <strong>Tablas</strong>
            <small>Ver · Escuchar con pausa</small>
          </span>
          <span class="support-tool-arrow" aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  `);
}

function appSpeechNextAt() {
  return boundedAudioNextAt(APP_SPEECH_NEXT_AT_KEY, appSpeechNextAtMemory, APP_SPEECH_COOLDOWN_MS, setAppSpeechNextAt);
}

// Una fecha guardada deja de ser válida si el reloj retrocede o el dato se corrompe.
// El límite también se comprueba al leer, incluyendo el valor de esta sesión.
function boundedAudioNextAt(key, memory, limitMs, reset) {
  const now = Date.now();
  const valid = (value) => Number.isFinite(value) && value > now && value - now <= limitMs;
  let stored = 0;
  try {
    stored = Number(localStorage.getItem(key));
  } catch {}
  const nextAt = Math.max(valid(memory) ? memory : 0, valid(stored) ? stored : 0);
  if (memory !== nextAt || stored !== nextAt) {
    reset(nextAt);
  }
  return nextAt;
}

function setAppSpeechNextAt(value) {
  appSpeechNextAtMemory = value > Date.now() ? value : 0;
  try {
    if (appSpeechNextAtMemory) localStorage.setItem(APP_SPEECH_NEXT_AT_KEY, String(appSpeechNextAtMemory));
    else localStorage.removeItem(APP_SPEECH_NEXT_AT_KEY);
  } catch {
    // El límite sigue funcionando durante esta sesión si falla el almacenamiento.
  }
}

function appSpeechRemainingMs() {
  return Math.max(0, appSpeechNextAt() - Date.now());
}

function communicationQuickAudioStates() {
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNICATION_QUICK_AUDIO_STATES_KEY) || "{}");
    return { ...(saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {}), ...communicationQuickAudioStatesMemory };
  } catch {
    return { ...communicationQuickAudioStatesMemory };
  }
}

function communicationQuickAudioState(id) {
  const state = communicationQuickAudioStates()[id];
  if (!state || !Number.isFinite(state.lastAt) || Date.now() - state.lastAt >= COMMUNICATION_QUICK_AUDIO_RESET_MS || state.lastAt > Date.now()) {
    return { plays: 0, lastAt: 0, nextAt: 0 };
  }
  return state;
}

function communicationQuickAudioRemainingMs(id) {
  return Math.max(0, (Number(communicationQuickAudioState(id).nextAt) || 0) - Date.now());
}

function advanceCommunicationQuickAudio(id) {
  const previous = communicationQuickAudioState(id);
  const plays = Math.min(COMMUNICATION_QUICK_AUDIO_DELAYS_MS.length, (Number(previous.plays) || 0) + 1);
  const lastAt = Date.now();
  const state = { plays, lastAt, nextAt: lastAt + COMMUNICATION_QUICK_AUDIO_DELAYS_MS[plays - 1] };
  communicationQuickAudioStatesMemory[id] = state;
  try {
    localStorage.setItem(COMMUNICATION_QUICK_AUDIO_STATES_KEY, JSON.stringify(communicationQuickAudioStates()));
  } catch {
    // La espera se mantiene en memoria si falla el almacenamiento.
  }
}

function releaseAppSpeech(audio, applyCooldown) {
  if (appSpeechAudio !== audio) return false;
  audio.releaseVolumeCeiling?.();
  appSpeechAudio = null;
  if (applyCooldown) setAppSpeechNextAt(Date.now() + APP_SPEECH_COOLDOWN_MS);
  if (route.view === "support-multiplication") startMultiplicationCooldownTimer();
  return true;
}

function stopAppSpeech(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  releaseAppSpeech(audio, true);
}

function playAppSpeech(audio, onFailure = () => {}, limitVolume = false) {
  if (appSpeechAudio || appSpeechRemainingMs() > 0) return false;
  appSpeechAudio = audio;
  audio.addEventListener("ended", () => releaseAppSpeech(audio, true), { once: true });
  const fail = () => {
    if (appSpeechAudio !== audio) return;
    audio.pause();
    if (releaseAppSpeech(audio, false)) onFailure();
  };
  audio.addEventListener("error", fail, { once: true });
  if (limitVolume) return playAppSpeechWithVolumeCeiling(audio, fail);
  try {
    Promise.resolve(audio.play()).catch(fail);
  } catch {
    fail();
    return false;
  }
  return true;
}

function playAppSpeechWithVolumeCeiling(audio, fail) {
  const native = window.Capacitor?.isNativePlatform?.() === true;
  const volume = native ? window.Capacitor?.Plugins?.StoryVolume : null;
  const token = `tablas-${Date.now()}-${++limitedSpeechSequence}`;
  let canceled = false, lastHeartbeat = 0;
  const clamp = () => { if (!native && audio.volume > 0.7) audio.volume = 0.7; };
  const refresh = () => {
    if (canceled || appSpeechAudio !== audio || Date.now() - lastHeartbeat < 1000) return;
    lastHeartbeat = Date.now();
    if (volume) Promise.resolve(volume.refresh({ token })).catch(fail);
  };
  const paused = () => { if (!audio.ended) releaseAppSpeech(audio, true); };
  audio.releaseVolumeCeiling = () => {
    if (canceled) return;
    canceled = true;
    audio.removeEventListener?.("timeupdate", refresh);
    audio.removeEventListener?.("volumechange", clamp);
    audio.removeEventListener?.("pause", paused);
    audio.releaseVolumeCeiling = null;
    if (volume) Promise.resolve(volume.end({ token })).catch(() => {});
  };
  audio.addEventListener("timeupdate", refresh);
  audio.addEventListener("volumechange", clamp);
  audio.addEventListener("pause", paused);
  const play = () => {
    if (canceled || appSpeechAudio !== audio) { if (volume) Promise.resolve(volume.end({ token })).catch(() => {}); return; }
    try { Promise.resolve(audio.play()).catch(fail); return true; } catch { fail(); return false; }
  };
  if (native) {
    if (!volume) { fail(); return false; }
    try { Promise.resolve(volume.begin({ token })).then(play, fail); } catch { fail(); return false; }
  } else {
    audio.volume = Math.min(audio.volume, 0.7);
    return play();
  }
  return true;
}

function stopSupportAudio() {
  if (!supportAudio) return;
  supportAudio.pause();
  supportAudio.currentTime = 0;
  supportAudio = null;
}

function playSupportAudio(kind, id) {
  if (!VOICE_PLAYBACK_ENABLED) return;
  stopSupportAudio();
  supportAudio = new Audio(`./assets/supports/audio/${kind}/${id}.mp3`);
  supportAudio.preload = "auto";
  supportAudio.play().catch(() => {});
}

function supportNumberDots(value) {
  if (value === 0) return `<span class="support-zero-label">NINGUNO</span>`;
  return Array.from({ length: value }, (_, index) => `<span style="--dot-delay:${index * 0.015}s"></span>`).join("");
}

function supportNumberPreview(value, empty = false) {
  if (empty) {
    return `
      <div class="support-preview-empty">
        <span class="support-preview-empty-icon">123</span>
        <strong>Elegí un número</strong>
      </div>
    `;
  }
  return `
    <div class="support-number-value">${value}</div>
    <div class="support-number-word">${escapeHtml(SUPPORT_NUMBER_WORDS[value])}</div>
    <div class="support-number-dots ${value > 10 ? "is-many" : ""}" aria-label="${value} elementos">
      ${supportNumberDots(value)}
    </div>
    ${
      VOICE_PLAYBACK_ENABLED
        ? `<button class="support-replay-button" type="button" data-action="support-number-replay" data-value="${value}">
            ${icon("speaker")}Escuchar
          </button>`
        : ""
    }
  `;
}

function openSupportNumbers() {
  supportNumberMode = "show";
  supportNumberRange = 10;
  supportSelectedNumber = null;
  setRoute({ view: "support-numbers" });
}

function renderSupportNumbers() {
  const isCounter = supportNumberMode === "count";
  const previewValue = isCounter ? supportCount : supportSelectedNumber;
  const numbers = Array.from({ length: supportNumberRange + 1 }, (_, value) => value)
    .map(
      (value) => `
        <button class="support-number-button ${supportSelectedNumber === value ? "is-selected" : ""}" type="button" data-action="support-number-select" data-value="${value}">
          ${value}
        </button>
      `
    )
    .join("");

  const controls = isCounter
    ? `
      <div class="support-counter-controls">
        <button type="button" data-action="support-count-change" data-delta="-1" ${supportCount === 0 ? "disabled" : ""} aria-label="Restar uno">−</button>
        <strong>${supportCount}</strong>
        <button type="button" data-action="support-count-change" data-delta="1" ${supportCount === 20 ? "disabled" : ""} aria-label="Sumar uno">+</button>
      </div>
      <button class="support-reset-button" type="button" data-action="support-count-reset" ${supportCount === 0 ? "disabled" : ""}>Volver a 0</button>
    `
    : `
      <div class="support-range-row" aria-label="Rango de números">
        <span>RANGO</span>
        ${[5, 10, 20]
          .map(
            (range) => `<button class="${supportNumberRange === range ? "is-selected" : ""}" type="button" data-action="support-number-range" data-range="${range}">0–${range}</button>`
          )
          .join("")}
      </div>
      <div class="support-number-grid range-${supportNumberRange}">${numbers}</div>
    `;

  renderShell(`
    <section class="screen support-resource-screen support-numbers-screen">
      <div class="screen-actions support-resource-nav">
        <button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button>
        <div class="support-mode-tabs" role="group" aria-label="Modo de números">
          <button class="${!isCounter ? "is-selected" : ""}" type="button" data-action="support-number-mode" data-mode="show">Mostrar</button>
          <button class="${isCounter ? "is-selected" : ""}" type="button" data-action="support-number-mode" data-mode="count">Contar</button>
        </div>
      </div>
      <div class="support-resource-heading">
        <p class="eyebrow">NÚMEROS</p>
        <h2>${isCounter ? "¿Cuántos hay?" : "Elegí un número"}</h2>
      </div>
      <div class="support-resource-layout">
        <article class="support-control-card ${isCounter ? "is-counter" : ""}">${controls}</article>
        <article class="support-preview-card support-number-preview ${previewValue === null ? "is-empty" : ""}" aria-live="polite">
          ${supportNumberPreview(previewValue ?? 0, previewValue === null)}
        </article>
      </div>
    </section>
  `);
  animateSupportPreview(".support-number-preview:not(.is-empty)");
}

function selectSupportNumber(value) {
  const number = Math.max(0, Math.min(Number(value) || 0, supportNumberRange));
  supportSelectedNumber = number;
  playSupportAudio("numbers", number);
  render();
}

function changeSupportCount(delta) {
  supportCount = Math.max(0, Math.min(20, supportCount + Number(delta || 0)));
  playSupportAudio("numbers", supportCount);
  render();
}

function resetSupportCount() {
  supportCount = 0;
  playSupportAudio("numbers", 0);
  render();
}

function supportColorById(id) {
  return SUPPORT_COLORS.find((color) => color.id === id) || null;
}

function supportColorPreview(color) {
  if (!color) {
    return `
      <div class="support-preview-empty">
        <span class="support-preview-empty-icon">${icon("palette")}</span>
        <strong>Elegí un color</strong>
      </div>
    `;
  }
  return `
    <div class="support-color-fill" style="--support-color:${color.value};--support-ink:${color.ink}">
      <strong>${escapeHtml(color.label)}</strong>
      ${
        VOICE_PLAYBACK_ENABLED
          ? `<button class="support-color-replay" type="button" data-action="support-color-replay" data-color="${color.id}">
              ${icon("speaker")}Escuchar
            </button>`
          : ""
      }
    </div>
  `;
}

function openSupportColors() {
  supportColorMode = "show";
  supportSelectedColor = null;
  setRoute({ view: "support-colors" });
}

function renderSupportColors() {
  const isRandom = supportColorMode === "random";
  const selected = supportColorById(supportSelectedColor);
  const palette = SUPPORT_COLORS.map(
    (color) => `
      <button class="support-color-button ${supportSelectedColor === color.id ? "is-selected" : ""}" type="button" data-action="support-color-select" data-color="${color.id}">
        <span style="--swatch:${color.value}"></span>
        <strong>${escapeHtml(color.label)}</strong>
      </button>
    `
  ).join("");

  renderShell(`
    <section class="screen support-resource-screen support-colors-screen">
      <div class="screen-actions support-resource-nav">
        <button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button>
        <div class="support-mode-tabs" role="group" aria-label="Modo de colores">
          <button class="${!isRandom ? "is-selected" : ""}" type="button" data-action="support-color-mode" data-mode="show">Mostrar</button>
          <button class="${isRandom ? "is-selected" : ""}" type="button" data-action="support-color-mode" data-mode="random">Elegir</button>
        </div>
      </div>
      <div class="support-resource-heading">
        <p class="eyebrow">COLORES</p>
        <h2>${isRandom ? "Elegir un color" : "Tocá un color"}</h2>
      </div>
      <div class="support-resource-layout">
        <article class="support-control-card support-color-controls ${isRandom ? "is-random" : ""}">
          ${
            isRandom
              ? `<button class="support-random-color-button" type="button" data-action="support-color-random">${icon("turns")}<span>Elegir color</span></button>`
              : `<div class="support-color-grid">${palette}</div>`
          }
        </article>
        <article class="support-preview-card support-color-preview ${selected ? "" : "is-empty"}" aria-live="polite">
          ${supportColorPreview(selected)}
        </article>
      </div>
    </section>
  `);
  animateSupportPreview(".support-color-preview:not(.is-empty)");
}

function selectSupportColor(id) {
  const color = supportColorById(id);
  if (!color) return;
  supportSelectedColor = color.id;
  playSupportAudio("colors", color.id);
  render();
}

function pickRandomSupportColor() {
  const choices = SUPPORT_COLORS.filter((color) => color.id !== supportSelectedColor);
  const color = choices[Math.floor(Math.random() * choices.length)] || SUPPORT_COLORS[0];
  supportSelectedColor = color.id;
  playSupportAudio("colors", color.id);
  render();
}

function multiplicationSupportPool(table = 0) {
  const tables = table ? [table] : Array.from({ length: 10 }, (_, index) => index + 1);
  return tables.flatMap((factorA) =>
    Array.from({ length: 10 }, (_, index) => {
      const factorB = index + 1;
      return { id: `${factorA}x${factorB}`, factorA, factorB, product: factorA * factorB };
    })
  );
}

function drawMultiplicationSupportOperation() {
  if (!multiplicationSupportDeck.length) {
    multiplicationSupportDeck = shuffled(multiplicationSupportPool(multiplicationSupportTable));
  }
  let next = multiplicationSupportDeck.pop() || { id: "1x1", factorA: 1, factorB: 1, product: 1 };
  if (next.id === multiplicationSupportCurrent?.id && multiplicationSupportDeck.length) {
    const replacement = multiplicationSupportDeck.pop();
    multiplicationSupportDeck.unshift(next);
    next = replacement;
  }
  multiplicationSupportCurrent = next;
  multiplicationSupportAudioPlayed = false;
  multiplicationSupportReplayUnlocked = false;
  multiplicationSupportAnswerError = "";
  return next;
}

function openSupportMultiplication() {
  multiplicationSupportTable = 0;
  multiplicationSupportDeck = [];
  multiplicationSupportCurrent = null;
  drawMultiplicationSupportOperation();
  setRoute({ view: "support-multiplication" });
}

function stopMultiplicationSupportAudio() {
  if (!multiplicationSupportAudio) return;
  stopAppSpeech(multiplicationSupportAudio);
  multiplicationSupportAudio = null;
}

function stopMultiplicationCooldownTimer() {
  if (!multiplicationSupportCooldownTimer) return;
  window.clearInterval(multiplicationSupportCooldownTimer);
  multiplicationSupportCooldownTimer = null;
}

function multiplicationAudioNextAt() {
  return boundedAudioNextAt(MULTIPLICATION_AUDIO_COOLDOWN_KEY, multiplicationAudioNextAtMemory, MULTIPLICATION_AUDIO_COOLDOWN_MS, setMultiplicationAudioNextAt);
}

function setMultiplicationAudioNextAt(value) {
  multiplicationAudioNextAtMemory = value > Date.now() ? value : 0;
  try {
    if (value > Date.now()) localStorage.setItem(MULTIPLICATION_AUDIO_COOLDOWN_KEY, String(value));
    else localStorage.removeItem(MULTIPLICATION_AUDIO_COOLDOWN_KEY);
  } catch {}
}

function multiplicationAudioRemainingMs() {
  return Math.max(0, multiplicationAudioNextAt() - Date.now(), appSpeechRemainingMs());
}

function renderMultiplicationGroups(operation) {
  const groups = Array.from({ length: operation.factorA }, (_, groupIndex) => {
    const dots = Array.from({ length: operation.factorB }, () => "<i></i>").join("");
    return `<span class="multiplication-visual-group group-${(groupIndex % 5) + 1}" style="--item-columns:${Math.min(operation.factorB, 5)}">${dots}</span>`;
  }).join("");
  return `
    <div class="multiplication-groups" style="--group-columns:${Math.min(operation.factorA, 5)}" aria-label="${operation.factorA} grupos de ${operation.factorB}">
      ${groups}
    </div>
  `;
}

function updateMultiplicationAudioControl() {
  if (route.view !== "support-multiplication") return stopMultiplicationCooldownTimer();
  const button = document.querySelector('[data-action="support-multiplication-audio"]');
  const label = button?.querySelector('[data-role="multiplication-audio-label"]');
  const status = document.querySelector('[data-role="multiplication-audio-status"]');
  const progress = document.querySelector('[data-role="multiplication-audio-progress"]');
  if (!button || !label || !status || !progress) return;

  const remainingMs = multiplicationAudioRemainingMs();
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const speaking = Boolean(appSpeechAudio);
  const needsAnswer = multiplicationSupportAudioPlayed && !multiplicationSupportReplayUnlocked;
  button.disabled = speaking || remainingMs > 0 || needsAnswer;
  label.textContent = speaking ? "Reproduciendo..." : needsAnswer ? "Escribí el resultado" : remainingMs > 0 ? `Esperá ${remainingSeconds} s` : "Escuchar operación";
  status.textContent = speaking
    ? "Escuchá la operación."
    : needsAnswer
      ? "Para volver a escuchar, escribí el resultado."
      : remainingMs > 0
        ? "Resultado listo. Esperá para escuchar otra vez."
        : "El audio está disponible.";
  progress.style.setProperty("--cooldown", `${Math.min(100, (remainingMs / MULTIPLICATION_AUDIO_COOLDOWN_MS) * 100)}%`);
  progress.setAttribute("aria-valuenow", String(remainingSeconds));

  if (remainingMs <= 0 && !speaking) {
    setMultiplicationAudioNextAt(0);
    stopMultiplicationCooldownTimer();
  }
}

function startMultiplicationCooldownTimer() {
  stopMultiplicationCooldownTimer();
  updateMultiplicationAudioControl();
  if (appSpeechAudio || multiplicationAudioRemainingMs() > 0) {
    multiplicationSupportCooldownTimer = window.setInterval(updateMultiplicationAudioControl, 200);
  }
}

function renderSupportMultiplication() {
  const operation = multiplicationSupportCurrent || drawMultiplicationSupportOperation();
  const remainingSeconds = Math.ceil(multiplicationAudioRemainingMs() / 1000);
  const speaking = Boolean(appSpeechAudio);
  const needsAnswer = multiplicationSupportAudioPlayed && !multiplicationSupportReplayUnlocked;
  const tableButtons = [0, ...Array.from({ length: 10 }, (_, index) => index + 1)]
    .map(
      (table) => `
        <button class="${multiplicationSupportTable === table ? "is-selected" : ""}" type="button" data-action="support-multiplication-table" data-table="${table}">
          ${table === 0 ? "Todas" : table}
        </button>
      `
    )
    .join("");
  const repeatedAddition = Array.from({ length: operation.factorA }, () => operation.factorB).join(" + ");

  renderShell(`
    <section class="screen support-resource-screen multiplication-support-screen">
      <div class="screen-actions support-resource-nav">
        <button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button>
        <span class="multiplication-audio-rule">${icon("pause")}1 audio cada 10 segundos</span>
      </div>
      <div class="support-resource-heading multiplication-support-heading">
        <p class="eyebrow">TABLAS DEL 1 AL 10</p>
        <h2>Mirar, pensar y escuchar</h2>
      </div>
      <div class="multiplication-support-layout">
        <aside class="multiplication-table-panel">
          <div>
            <span class="multiplication-panel-label">ELEGÍ UNA TABLA</span>
            <p>Las operaciones aparecen siempre mezcladas.</p>
          </div>
          <div class="multiplication-table-grid" aria-label="Elegir tabla">${tableButtons}</div>
          <div class="multiplication-help-note">
            <strong>${multiplicationSupportTable === 0 ? "Práctica variada" : `Tabla del ${multiplicationSupportTable}`}</strong>
            <span>El botón siguiente nunca se bloquea.</span>
          </div>
        </aside>
        <article class="multiplication-operation-card" aria-live="polite">
          <span class="multiplication-operation-kicker">TABLA DEL ${operation.factorA}</span>
          <div class="multiplication-equation">
            <strong>${operation.factorA}</strong><span>×</span><strong>${operation.factorB}</strong><span>=</span><b>${operation.product}</b>
          </div>
          ${renderMultiplicationGroups(operation)}
          <p class="multiplication-repeated-addition">${repeatedAddition} = <strong>${operation.product}</strong></p>
          <div class="multiplication-audio-area">
            ${multiplicationSupportAudioPlayed && !multiplicationSupportReplayUnlocked ? `
              <form class="multiplication-replay-form" data-form="support-multiplication-answer">
                <label for="multiplication-replay-answer">Para escuchar de nuevo, escribí el resultado</label>
                <div class="multiplication-replay-input-row">
                  <input id="multiplication-replay-answer" name="answer" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off" aria-describedby="multiplication-answer-error" />
                  <button type="submit">Desbloquear audio</button>
                </div>
                <span id="multiplication-answer-error" class="multiplication-answer-error" role="status">${escapeHtml(multiplicationSupportAnswerError)}</span>
              </form>
            ` : ""}
            <button class="multiplication-listen-button" type="button" data-action="support-multiplication-audio" ${speaking || remainingSeconds > 0 || needsAnswer ? "disabled" : ""}>
              ${icon("speaker")}<span data-role="multiplication-audio-label">${speaking ? "Reproduciendo..." : needsAnswer ? "Escribí el resultado" : remainingSeconds > 0 ? `Esperá ${remainingSeconds} s` : "Escuchar operación"}</span>
            </button>
            <button class="multiplication-next-button" type="button" data-action="support-multiplication-next">
              ${icon("turns")}<span>Otra operación</span>
            </button>
          </div>
          <div class="multiplication-cooldown-copy" data-role="multiplication-audio-status">
            ${speaking ? "Escuchá la operación." : needsAnswer ? "Para volver a escuchar, escribí el resultado." : remainingSeconds > 0 ? "Resultado listo. Esperá para escuchar otra vez." : "El audio está disponible."}
          </div>
          <div class="multiplication-cooldown-progress" data-role="multiplication-audio-progress" role="progressbar" aria-label="Espera para el próximo audio" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${remainingSeconds}" style="--cooldown:${Math.min(100, (multiplicationAudioRemainingMs() / MULTIPLICATION_AUDIO_COOLDOWN_MS) * 100)}%"><i></i></div>
        </article>
      </div>
    </section>
  `);
  startMultiplicationCooldownTimer();
}

function selectMultiplicationSupportTable(value) {
  const table = Number(value);
  if (!Number.isInteger(table) || table < 0 || table > 10) return;
  stopMultiplicationSupportAudio();
  multiplicationSupportTable = table;
  multiplicationSupportDeck = [];
  drawMultiplicationSupportOperation();
  render();
}

function showNextMultiplicationSupportOperation() {
  stopMultiplicationSupportAudio();
  drawMultiplicationSupportOperation();
  render();
}

function unlockMultiplicationSupportAudio(answer) {
  if (!multiplicationSupportAudioPlayed || multiplicationSupportReplayUnlocked || !multiplicationSupportCurrent) return;
  const entered = String(answer || "").trim();
  if (!/^\d{1,3}$/.test(entered) || Number(entered) !== multiplicationSupportCurrent.product) {
    multiplicationSupportAnswerError = "Revisá el resultado y probá otra vez.";
    const error = document.querySelector("#multiplication-answer-error");
    if (error) error.textContent = multiplicationSupportAnswerError;
    return;
  }
  multiplicationSupportReplayUnlocked = true;
  multiplicationSupportAnswerError = "";
  render();
}

function playMultiplicationSupportAudio() {
  const operation = multiplicationSupportCurrent;
  if (!operation || appSpeechAudio || multiplicationAudioRemainingMs() > 0 ||
      (multiplicationSupportAudioPlayed && !multiplicationSupportReplayUnlocked)) return updateMultiplicationAudioControl();

  const wasReplay = multiplicationSupportAudioPlayed;
  const audio = new Audio(`./assets/supports/audio/multiplication/${operation.id}.mp3`);
  multiplicationSupportAudio = audio;
  audio.preload = "auto";
  audio.volume = 1;
  audio.addEventListener("ended", () => {
    if (multiplicationSupportAudio === audio) multiplicationSupportAudio = null;
  }, { once: true });
  audio.addEventListener("error", () => {
    if (multiplicationSupportAudio === audio) multiplicationSupportAudio = null;
  }, { once: true });
  if (!playAppSpeech(audio, () => {
    if (multiplicationSupportAudio === audio) multiplicationSupportAudio = null;
    setMultiplicationAudioNextAt(0);
    multiplicationSupportAudioPlayed = wasReplay;
    multiplicationSupportReplayUnlocked = wasReplay;
    toast("No se pudo reproducir el audio");
    if (route.view === "support-multiplication") render();
  }, true)) return updateMultiplicationAudioControl();
  multiplicationSupportAudioPlayed = true;
  multiplicationSupportReplayUnlocked = false;
  setMultiplicationAudioNextAt(Date.now() + MULTIPLICATION_AUDIO_COOLDOWN_MS);
  render();
}

function animateSupportPreview(selector) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = document.querySelector(selector);
  if (!target) return;
  gsap.from(target, { scale: 0.94, opacity: 0.35, duration: 0.35, ease: "back.out(1.3)" });
  gsap.from(`${selector} .support-number-dots > span`, { scale: 0, duration: 0.22, stagger: 0.015, delay: 0.08, ease: "back.out(2)" });
}

function cleanTurnerName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 28);
}

function turnerParticipant(name, index, color) {
  return {
    id: uid("turn-person"),
    name: cleanTurnerName(name),
    color: TURN_COLORS.includes(color) ? color : TURN_COLORS[index % TURN_COLORS.length]
  };
}

function turnerInitial(name) {
  return Array.from(cleanTurnerName(name))[0]?.toLocaleUpperCase("es") || "?";
}

function readTurnGroups() {
  try {
    const saved = JSON.parse(localStorage.getItem(TURN_GROUPS_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved
      .map((group) => ({
        id: String(group?.id || uid("turn-group")),
        label: cleanTurnerName(group?.label),
        participants: Array.isArray(group?.participants)
          ? group.participants
              .map((person, index) => ({
                name: cleanTurnerName(person?.name),
                color: TURN_COLORS.includes(person?.color) ? person.color : TURN_COLORS[index % TURN_COLORS.length]
              }))
              .filter((person) => person.name)
          : []
      }))
      .filter((group) => group.label && group.participants.length >= 2);
  } catch {
    return [];
  }
}

function writeTurnGroups(groups) {
  try {
    localStorage.setItem(TURN_GROUPS_KEY, JSON.stringify(groups));
  } catch {
    toast("No se pudo guardar el grupo");
  }
}

function captureTurnerDraftFields() {
  const titleInput = document.querySelector("#turnerActivityTitle");
  if (titleInput) turnerDraft.title = cleanTurnerName(titleInput.value);
}

function openTurnerSetup(reset = true) {
  if (reset) turnerDraft = { title: "", participants: [] };
  turnerSession = null;
  setRoute({ view: "turner-setup" });
}

function renderTurnerSetup() {
  const groups = readTurnGroups();
  const groupList = groups.length
    ? groups
        .map(
          (group) => `
            <div class="turner-saved-group">
              <button type="button" data-action="turner-use-group" data-group="${escapeHtml(group.id)}">
                <strong>${escapeHtml(group.label)}</strong>
                <span>${group.participants.length} personas</span>
              </button>
              <button class="turner-group-delete" type="button" data-action="turner-delete-group" data-group="${escapeHtml(group.id)}" aria-label="Eliminar grupo ${escapeHtml(group.label)}">${icon("trash")}</button>
            </div>
          `
        )
        .join("")
    : `<p class="turner-saved-empty">Todavía no hay grupos guardados.</p>`;

  const participants = turnerDraft.participants.length
    ? turnerDraft.participants
        .map(
          (person, index) => `
            <div class="turner-person-row" style="--turn-color:${person.color}">
              <span class="turner-person-initial" aria-hidden="true">${escapeHtml(turnerInitial(person.name))}</span>
              <strong>${escapeHtml(person.name)}</strong>
              <div class="turner-person-actions">
                <button type="button" data-action="turner-person-up" data-id="${escapeHtml(person.id)}" ${index === 0 ? "disabled" : ""} aria-label="Subir a ${escapeHtml(person.name)}">${icon("arrow")}</button>
                <button type="button" data-action="turner-person-down" data-id="${escapeHtml(person.id)}" ${index === turnerDraft.participants.length - 1 ? "disabled" : ""} aria-label="Bajar a ${escapeHtml(person.name)}">${icon("arrow")}</button>
                <button class="is-remove" type="button" data-action="turner-person-remove" data-id="${escapeHtml(person.id)}" aria-label="Quitar a ${escapeHtml(person.name)}">${icon("x")}</button>
              </div>
            </div>
          `
        )
        .join("")
    : `
        <div class="turner-people-empty">
          <span>${icon("users")}</span>
          <strong>Agregá los nombres</strong>
          <small>Se necesitan al menos 2 personas.</small>
        </div>
      `;

  renderShell(`
    <section class="screen turner-setup-screen">
      <div class="screen-actions turner-setup-nav">
        <button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button>
        <span class="turner-no-photos">Sin fotos</span>
      </div>
      <div class="turner-setup-heading">
        <p class="eyebrow">PREPARAR</p>
        <h2>¿Quiénes participan?</h2>
      </div>
      <div class="turner-setup-layout">
        <article class="turner-setup-card turner-people-card">
          <form class="turner-add-form" data-form="turner-participant">
            <label for="turnerParticipantName">Nombre</label>
            <div>
              <input id="turnerParticipantName" name="name" maxlength="28" autocomplete="off" placeholder="Escribí un nombre" />
              <button class="btn btn-primary" type="submit">${icon("plus")}Agregar</button>
            </div>
          </form>
          <div class="turner-person-list" aria-live="polite">${participants}</div>
        </article>
        <aside class="turner-setup-side">
          <article class="turner-setup-card turner-options-card">
            <label class="turner-title-field" for="turnerActivityTitle">
              <span>Actividad <small>(opcional)</small></span>
              <input id="turnerActivityTitle" maxlength="28" autocomplete="off" placeholder="Ej: Armamos una torre" value="${escapeHtml(turnerDraft.title)}" />
            </label>
            <button class="btn turner-save-group-button" type="button" data-action="turner-save-group" ${turnerDraft.participants.length >= 2 ? "" : "disabled"}>${icon("download")}Guardar grupo</button>
            <button class="btn btn-primary turner-start-button" type="button" data-action="turner-start" ${turnerDraft.participants.length >= 2 ? "" : "disabled"}>${icon("play")}Empezar</button>
          </article>
          <article class="turner-setup-card turner-groups-card">
            <h3>Grupos guardados</h3>
            <div class="turner-saved-groups">${groupList}</div>
          </article>
        </aside>
      </div>
    </section>
  `);
}

function addTurnerParticipant(name) {
  captureTurnerDraftFields();
  const cleanName = cleanTurnerName(name);
  if (!cleanName) {
    toast("Escribí un nombre");
    document.querySelector("#turnerParticipantName")?.focus();
    return;
  }
  turnerDraft.participants.push(turnerParticipant(cleanName, turnerDraft.participants.length));
  render();
  window.requestAnimationFrame(() => document.querySelector("#turnerParticipantName")?.focus());
}

function moveTurnerParticipant(id, direction) {
  captureTurnerDraftFields();
  const index = turnerDraft.participants.findIndex((person) => person.id === id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= turnerDraft.participants.length) return;
  [turnerDraft.participants[index], turnerDraft.participants[nextIndex]] = [turnerDraft.participants[nextIndex], turnerDraft.participants[index]];
  render();
}

function removeTurnerParticipant(id) {
  captureTurnerDraftFields();
  turnerDraft.participants = turnerDraft.participants.filter((person) => person.id !== id);
  render();
}

function saveTurnerGroup() {
  captureTurnerDraftFields();
  if (turnerDraft.participants.length < 2) return;
  openModal({
    title: "Guardar grupo",
    body: `
      <label class="field">
        <span>Nombre del grupo</span>
        <input id="turnerGroupName" maxlength="28" autocomplete="off" placeholder="Ej: Familia" />
      </label>
    `,
    submitText: "Guardar",
    onSubmit: () => {
      const label = cleanTurnerName(modalRoot.querySelector("#turnerGroupName")?.value);
      if (!label) {
        toast("Escribí un nombre para el grupo");
        modalRoot.querySelector("#turnerGroupName")?.focus();
        return;
      }
      const groups = readTurnGroups();
      groups.push({
        id: uid("turn-group"),
        label,
        participants: turnerDraft.participants.map(({ name, color }) => ({ name, color }))
      });
      writeTurnGroups(groups);
      closeModal();
      render();
      toast("Grupo guardado");
    }
  });
}

function useTurnerGroup(groupId) {
  captureTurnerDraftFields();
  const group = readTurnGroups().find((item) => item.id === groupId);
  if (!group) return;
  turnerDraft.participants = group.participants.map((person, index) => turnerParticipant(person.name, index, person.color));
  render();
}

function deleteTurnerGroup(groupId) {
  const groups = readTurnGroups();
  const group = groups.find((item) => item.id === groupId);
  if (!group || !confirm(`¿Eliminar el grupo ${group.label}?`)) return;
  writeTurnGroups(groups.filter((item) => item.id !== groupId));
  render();
}

function startTurner() {
  captureTurnerDraftFields();
  if (turnerDraft.participants.length < 2) {
    toast("Agregá al menos 2 personas");
    return;
  }
  turnerSession = {
    title: turnerDraft.title || "Nuestros turnos",
    participants: clone(turnerDraft.participants),
    currentIndex: 0,
    round: 1,
    paused: false,
    history: []
  };
  setRoute({ view: "turner-live" });
}

function turnerQueue() {
  if (!turnerSession?.participants.length) return [];
  const { participants, currentIndex } = turnerSession;
  return Array.from({ length: participants.length - 1 }, (_, offset) => participants[(currentIndex + offset + 1) % participants.length]);
}

function turnerPersonBadge(person, className = "") {
  return `
    <span class="turner-person-badge ${className}" style="--turn-color:${person.color}">
      <span>${escapeHtml(turnerInitial(person.name))}</span>
      <strong>${escapeHtml(person.name)}</strong>
    </span>
  `;
}

function renderTurnerLive() {
  if (!turnerSession?.participants?.length) return openTurnerSetup(false);
  const current = turnerSession.participants[turnerSession.currentIndex];
  const queue = turnerQueue();
  const next = queue[0];
  const waiting = queue.slice(1);
  const waitingMarkup = waiting.length
    ? waiting.map((person) => turnerPersonBadge(person, "is-waiting")).join("")
    : `<span class="turner-waiting-empty">Nadie más</span>`;

  renderShell(`
    <section class="turner-live-screen ${turnerSession.paused ? "is-paused" : ""}">
      <div class="turner-live-bar">
        <button class="btn btn-ghost" type="button" data-action="turner-exit">${icon("arrow")}Salir</button>
        <div class="turner-live-title">
          <strong>${escapeHtml(turnerSession.title)}</strong>
          <span>Vuelta ${turnerSession.round} · ${turnerSession.participants.length} personas</span>
        </div>
        <span class="turner-live-count" aria-hidden="true">${turnerSession.participants.length}</span>
      </div>
      <div class="turner-live-content">
        <article class="turner-now-card" style="--turn-color:${current.color}">
          <span class="turner-stage-label">AHORA</span>
          <span class="turner-now-initial" aria-hidden="true">${escapeHtml(turnerInitial(current.name))}</span>
          <h2>${escapeHtml(current.name)}</h2>
        </article>
        <aside class="turner-queue-panel">
          <div class="turner-next-card" style="--turn-color:${next.color}">
            <span class="turner-stage-label">DESPUÉS</span>
            ${turnerPersonBadge(next, "is-next")}
          </div>
          <div class="turner-waiting-card">
            <span class="turner-stage-label">ESPERAN</span>
            <div class="turner-waiting-list">${waitingMarkup}</div>
          </div>
        </aside>
      </div>
      <div class="turner-main-actions">
        <button class="turner-decline-button" type="button" data-action="turner-decline">NO QUIERO</button>
        <button class="turner-done-button" type="button" data-action="turner-next">${icon("check")}TERMINÉ</button>
      </div>
      <div class="turner-secondary-actions">
        <button type="button" data-action="turner-undo" ${turnerSession.history.length ? "" : "disabled"}>${icon("undo")}Atrás</button>
        <button type="button" data-action="turner-pause">${icon("pause")}Pausa</button>
        <button type="button" data-action="turner-add-live">${icon("plus")}Agregar</button>
        <button class="is-finish" type="button" data-action="turner-finish">${icon("x")}Finalizar</button>
      </div>
      ${
        turnerSession.paused
          ? `<div class="turner-pause-overlay"><span>${icon("pause")}</span><h2>PAUSA</h2><button type="button" data-action="turner-pause">${icon("play")}Continuar</button></div>`
          : ""
      }
    </section>
  `);
  animateTurnerScreen();
}

function animateTurnerScreen() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".turner-now-card", { scale: 0.9, y: 18, opacity: 0, duration: 0.42, ease: "back.out(1.45)" });
  gsap.from(".turner-next-card", { x: 20, opacity: 0, duration: 0.34, delay: 0.08, ease: "power2.out" });
  gsap.from(".turner-person-badge.is-waiting", { y: 9, opacity: 0, duration: 0.25, stagger: 0.04, delay: 0.15 });
}

function advanceTurner() {
  if (!turnerSession || turnerSession.paused) return;
  turnerSession.history.push({ currentIndex: turnerSession.currentIndex, round: turnerSession.round });
  const nextIndex = (turnerSession.currentIndex + 1) % turnerSession.participants.length;
  if (nextIndex === 0) turnerSession.round += 1;
  turnerSession.currentIndex = nextIndex;
  render();
}

function undoTurner() {
  if (!turnerSession?.history.length) return;
  const previous = turnerSession.history.pop();
  turnerSession.currentIndex = previous.currentIndex;
  turnerSession.round = previous.round;
  render();
}

function toggleTurnerPause() {
  if (!turnerSession) return;
  turnerSession.paused = !turnerSession.paused;
  render();
}

function addLiveTurnerParticipant() {
  if (!turnerSession) return;
  openModal({
    title: "Agregar persona",
    body: `
      <label class="field">
        <span>Nombre</span>
        <input id="turnerLiveName" maxlength="28" autocomplete="off" placeholder="Escribí un nombre" />
      </label>
    `,
    submitText: "Agregar",
    onSubmit: () => {
      const name = cleanTurnerName(modalRoot.querySelector("#turnerLiveName")?.value);
      if (!name) {
        toast("Escribí un nombre");
        modalRoot.querySelector("#turnerLiveName")?.focus();
        return;
      }
      turnerSession.participants.push(turnerParticipant(name, turnerSession.participants.length));
      closeModal();
      render();
    }
  });
}

function finishTurner() {
  if (!turnerSession) return;
  setRoute({ view: "turner-finish" });
}

function exitTurnerToSetup() {
  if (turnerSession) {
    turnerDraft = {
      title: turnerSession.title === "Nuestros turnos" ? "" : turnerSession.title,
      participants: clone(turnerSession.participants)
    };
  }
  turnerSession = null;
  setRoute({ view: "turner-setup" });
}

function restartTurner() {
  if (!turnerSession) return openTurnerSetup();
  turnerSession.currentIndex = 0;
  turnerSession.round = 1;
  turnerSession.paused = false;
  turnerSession.history = [];
  setRoute({ view: "turner-live" });
}

function renderTurnerFinish() {
  if (!turnerSession) return setRoute({ view: "supports" });
  renderShell(`
    <section class="turner-finish-screen">
      <div class="turner-finish-mark">${icon("check")}</div>
      <p class="eyebrow">TURNOS</p>
      <h2>Actividad terminada</h2>
      <p>${turnerSession.participants.length} personas participaron.</p>
      <div class="turner-finish-people">
        ${turnerSession.participants.map((person) => turnerPersonBadge(person, "is-finished")).join("")}
      </div>
      <div class="turner-finish-actions">
        <button class="btn btn-primary" type="button" data-action="turner-restart">${icon("turns")}Otra vez</button>
        <button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button>
      </div>
    </section>
  `);
  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.from(".turner-finish-mark", { scale: 0.2, rotation: -14, opacity: 0, duration: 0.65, ease: "elastic.out(1, 0.55)" });
    gsap.from(".turner-person-badge.is-finished", { y: 22, opacity: 0, duration: 0.35, stagger: 0.07, delay: 0.18, ease: "back.out(1.4)" });
  }
}

function renderSchool() {
  const subjects = data.subjects
    .map(
      (subject) => `
      <button class="card-button fixed-subject-card" type="button" data-action="open-subject" data-subject="${subject.id}" style="--subject-color:${subject.color}">
        <span class="subject-mark">${icon(subject.icon)}</span>
        <span>
          <h3>${escapeHtml(subject.title)}</h3>
          <p>${subject.themes.length} temas / ${allExercisesCount(subject)} ejercicios</p>
        </span>
      </button>
    `
    )
    .join("");

  renderShell(`
    <section class="screen">
      <div class="grid subject-grid school-grid">${subjects}</div>
    </section>
  `);
}

function communicationPicto(id) {
  return COMMUNICATION_PICTOS[id];
}

function communicationStarterById(id) {
  return COMMUNICATION_STARTERS.find((starter) => starter.id === id);
}

function communicationStarterSequence(starter) {
  if (starter?.id === "yo-quiero" && communicationNegated) return ["no-quiero"];
  return starter?.sequence || [];
}

function communicationPhraseForPicto(id, index, starter = communicationStarterById(communicationStarter)) {
  const defaultPhrase = communicationPicto(id)?.phrase || "";
  if (!starter || index < communicationStarterSequence(starter).length) return defaultPhrase;
  return COMMUNICATION_STARTER_PHRASES[starter.id]?.[id] || defaultPhrase;
}

function communicationCategoryById(id) {
  return COMMUNICATION_CATEGORIES[id];
}

function communicationCategoryLineage(id) {
  const lineage = [];
  let category = communicationCategoryById(id);
  while (category && lineage.length < 8) {
    lineage.unshift(category);
    category = communicationCategoryById(category.parentId);
  }
  return lineage;
}

function communicationRecentScopeExists(scopeId) {
  return Boolean(communicationStarterById(scopeId) || communicationCategoryById(scopeId));
}

function readGeneralCommunicationRecents() {
  try {
    const saved = localStorage.getItem(COMMUNICATION_UNIFIED_RECENTS_KEY);
    const entries = saved !== null ? JSON.parse(saved) : [
      ...Object.entries(JSON.parse(localStorage.getItem(COMMUNICATION_RECENTS_KEY) || "{}"))
        .flatMap(([, ids]) => Array.isArray(ids) ? ids.map((id) => ({ kind: "picto", id })) : []),
      ...Object.entries(JSON.parse(localStorage.getItem(COMMUNICATION_MESSAGE_RECENTS_KEY) || "{}"))
        .flatMap(([scope, messages]) => Array.isArray(messages) ? messages.map((message) => ({ kind: "message", scope, message })) : [])
    ];
    const seen = new Set();
    return (Array.isArray(entries) ? entries : []).filter((entry) => {
      if (!entry || (entry.kind !== "picto" && entry.kind !== "message")) return false;
      if (entry.kind === "picto" ? !communicationPicto(entry.id) : !normalizeCommunicationRecentMessage(entry.message)) return false;
      const signature = generalCommunicationRecentSignature(entry);
      if (seen.has(signature)) return false;
      seen.add(signature);
      return true;
    }).slice(0, 15);
  } catch { return []; }
}

function generalCommunicationRecentSignature(entry) {
  return entry.kind === "picto" ? `picto:${entry.id}` : `message:${communicationRecentMessageSignature(normalizeCommunicationRecentMessage(entry.message))}`;
}

function rememberGeneralCommunicationRecent(entry) {
  try {
    const signature = generalCommunicationRecentSignature(entry);
    const entries = [entry, ...readGeneralCommunicationRecents().filter((recent) => generalCommunicationRecentSignature(recent) !== signature)].slice(0, 15);
    localStorage.setItem(COMMUNICATION_UNIFIED_RECENTS_KEY, JSON.stringify(entries));
  } catch {}
}

function renderGeneralCommunicationRecents() {
  return readGeneralCommunicationRecents().map((entry, index) => {
    if (entry.kind === "picto") return renderPictoButton(entry.id);
    return renderCommunicationRecentMessage(entry.scope, entry.message, index)
      .replace('data-action="communication-recent-message"', 'data-action="communication-general-recent"');
  }).join("");
}

function selectGeneralCommunicationRecent(index) {
  const entry = readGeneralCommunicationRecents()[index];
  if (!entry || entry.kind !== "message") return;
  const message = normalizeCommunicationRecentMessage(entry.message);
  rememberGeneralCommunicationRecent(entry);
  communicationStarter = communicationStarterById(entry.scope)?.id || null;
  communicationGroup = communicationStarter ? "recientes" : null;
  communicationCategory = null;
  communicationSentence = [...message.pictos];
  communicationWrittenText = message.text;
  communicationTextPosition = message.textPosition;
  communicationNegated = message.negated;
  communicationPresentation = false;
  communicationAudioStatus = "";
  render();
}

function readCommunicationRecents(scopeId) {
  if (!communicationRecentScopeExists(scopeId)) return [];
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNICATION_RECENTS_KEY) || "{}");
    const recents = saved?.[scopeId];
    if (!Array.isArray(recents)) return [];
    return [...new Set(recents.filter((id) => communicationPicto(id)))].slice(0, 15);
  } catch {
    return [];
  }
}

function rememberCommunicationPicto(scopeId, id) {
  if (!communicationRecentScopeExists(scopeId) || !communicationPicto(id)) return;
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNICATION_RECENTS_KEY) || "{}");
    const recents = [id, ...readCommunicationRecents(scopeId).filter((recentId) => recentId !== id)].slice(0, 15);
    localStorage.setItem(COMMUNICATION_RECENTS_KEY, JSON.stringify({ ...saved, [scopeId]: recents }));
  } catch {
    // La app sigue funcionando aunque el almacenamiento local no este disponible.
  }
}

function communicationMessageScopeExists(scopeId) {
  return scopeId === COMMUNICATION_GENERAL_RECENTS_SCOPE || communicationRecentScopeExists(scopeId);
}

function normalizeCommunicationRecentMessage(entry) {
  if (!entry || typeof entry !== "object") return null;
  const text = String(entry.text || "").trim().replace(/\s+/g, " ").slice(0, 180);
  if (!text) return null;
  const pictos = Array.isArray(entry.pictos)
    ? entry.pictos.filter((id) => communicationPicto(id)).slice(0, 12)
    : [];
  return {
    pictos,
    text,
    textPosition: Math.max(0, Math.min(Number(entry.textPosition) || 0, pictos.length)),
    negated: Boolean(entry.negated)
  };
}

function readCommunicationRecentMessages(scopeId) {
  if (!communicationMessageScopeExists(scopeId)) return [];
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNICATION_MESSAGE_RECENTS_KEY) || "{}");
    const messages = saved?.[scopeId];
    if (!Array.isArray(messages)) return [];
    return messages.map(normalizeCommunicationRecentMessage).filter(Boolean).slice(0, 15);
  } catch {
    return [];
  }
}

function communicationRecentMessageSignature(entry) {
  return JSON.stringify([entry.pictos, entry.text.toLocaleLowerCase("es"), entry.textPosition, entry.negated]);
}

function rememberCommunicationMessage(scopeId, entry) {
  if (!communicationMessageScopeExists(scopeId)) return;
  const normalized = normalizeCommunicationRecentMessage(entry);
  if (!normalized) return;
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNICATION_MESSAGE_RECENTS_KEY) || "{}");
    const signature = communicationRecentMessageSignature(normalized);
    const messages = [
      normalized,
      ...readCommunicationRecentMessages(scopeId).filter(
        (recent) => communicationRecentMessageSignature(recent) !== signature
      )
    ].slice(0, 15);
    localStorage.setItem(COMMUNICATION_MESSAGE_RECENTS_KEY, JSON.stringify({ ...saved, [scopeId]: messages }));
  } catch {
    // La app sigue funcionando aunque el almacenamiento local no este disponible.
  }
}

function communicationCompositionTokens() {
  const activeStarter = communicationStarterById(communicationStarter);
  const tokens = communicationSentence
    .map((id, pictoIndex) => {
      const card = communicationPicto(id);
      return card
        ? { type: "picto", id, pictoIndex, phrase: communicationPhraseForPicto(id, pictoIndex, activeStarter) }
        : null;
    })
    .filter(Boolean);
  const text = communicationWrittenText.trim();
  if (text) {
    const position = Math.max(0, Math.min(communicationTextPosition, tokens.length));
    tokens.splice(position, 0, { type: "text", text, phrase: text });
  }
  return tokens;
}

function communicationHasContent() {
  return communicationSentence.length > 0 || Boolean(communicationWrittenText.trim());
}

function communicationPhrase() {
  return communicationCompositionTokens()
    .map((token) => token.phrase || "")
    .filter(Boolean)
    .join(" ");
}

function pictoImage(card, className = "") {
  const version = card.imageVersion ? `?v=${card.imageVersion}` : "";
  const imageClass = `${className}${card.photo ? " is-photo" : ""}`;
  return `<img class="${imageClass}" src="${PICTO_PATH}${card.image}${version}" alt="" loading="lazy" decoding="async" />`;
}

function renderPictoButton(id, action = "add-picto", className = "picto-card") {
  const card = communicationPicto(id);
  if (!card) return "";
  const activeStarter = communicationStarterById(communicationStarter);
  const starterSequence = communicationStarterSequence(activeStarter);
  const isSelectedChoice =
    action === "add-picto" &&
    activeStarter &&
    communicationSentence.length > starterSequence.length &&
    communicationSentence[starterSequence.length] === id;
  return `
    <button class="${className}${isSelectedChoice ? " is-selected" : ""}" type="button" data-action="${action}" data-picto="${id}" style="--card-color:${card.color}">
      <span class="picto-image">${pictoImage(card, "picto-img")}</span>
      <span class="picto-label">${escapeHtml(card.label)}</span>
    </button>
  `;
}

function communicationRecentMessagePhrase(entry) {
  const starter = communicationStarterById(communicationStarter);
  const parts = entry.pictos
    .map((id, index) => communicationPhraseForPicto(id, index, starter))
    .filter(Boolean);
  parts.splice(Math.max(0, Math.min(entry.textPosition, parts.length)), 0, entry.text);
  return parts.filter(Boolean).join(" ");
}

function renderCommunicationRecentMessage(scopeId, entry, index, className = "picto-card") {
  const phrase = communicationRecentMessagePhrase(entry);
  const previewPictos = entry.pictos
    .slice(0, 3)
    .map((id) => communicationPicto(id))
    .filter(Boolean);
  const writePicto = communicationPicto("escribir");
  const preview = previewPictos.length
    ? previewPictos.map((card) => pictoImage(card, "recent-message-picto")).join("")
    : writePicto
      ? pictoImage(writePicto, "recent-message-write-picto")
      : icon("edit");
  return `
    <button class="${className} recent-message-card" type="button" data-action="communication-recent-message" data-scope="${scopeId}" data-index="${index}" style="--card-color:#7c5cdb" aria-label="Usar mensaje reciente: ${escapeHtml(phrase)}">
      <span class="recent-message-visual" aria-hidden="true">${preview}</span>
      <span class="recent-message-content">
        <span class="recent-message-badge">Reciente</span>
        <span class="recent-message-label">${escapeHtml(phrase)}</span>
      </span>
    </button>
  `;
}

function renderCommunicationCategoryButton(id) {
  const category = communicationCategoryById(id);
  const card = communicationPicto(category?.representativePicto);
  if (!category || !card) return "";
  return `
    <button class="picto-card category-picto-card" type="button" data-action="communication-category" data-category="${category.id}" style="--card-color:${card.color}">
      <span class="picto-image">
        ${pictoImage(card, "picto-img")}
        <span class="category-picto-arrow" aria-hidden="true">›</span>
      </span>
      <span class="picto-label">${escapeHtml(category.title)}</span>
    </button>
  `;
}

function communicationCategoryPictos(category) {
  if (!category) return [];
  if (category.id !== "alimentos") return category.pictos || [];
  return readCommunicationRecents(category.id).slice(0, 15);
}

function renderCommunicationCategoryNav(activeStarter, activeCategory) {
  if (!activeStarter || !activeCategory) return "";
  const lineage = communicationCategoryLineage(activeCategory.id);
  const backAction = activeCategory.parentId ? "communication-category-back" : "communication-starter-groups";
  const backButton = `
    <button class="builder-chip is-navigation-back" type="button" data-action="${backAction}">
      <span aria-hidden="true">←</span> Volver
    </button>
  `;

  if (!activeCategory.parentId) {
    const recentsButton = `
      <button class="builder-chip is-active" type="button" data-action="communication-category" data-category="${activeCategory.id}">
        Recientes
      </button>
    `;
    const children = (activeCategory.childIds || [])
      .map((categoryId) => {
        const category = communicationCategoryById(categoryId);
        if (!category) return "";
        return `
          <button class="builder-chip" type="button" data-action="communication-category" data-category="${category.id}">
            ${escapeHtml(category.title)}
          </button>
        `;
      })
      .join("");
    return `${backButton}${recentsButton}${children}`;
  }

  const starterButton = `
    <button class="builder-chip is-navigation-trail" type="button" data-action="communication-starter-groups">
      ${escapeHtml(activeStarter.title)}
    </button>
  `;
  const categoryTrail = lineage
    .slice(-3)
    .map(
      (category) => `
        <button class="builder-chip is-navigation-trail ${category.id === activeCategory.id ? "is-active" : ""}" type="button" data-action="communication-category" data-category="${category.id}">
          ${escapeHtml(category.title)}
        </button>
      `
    )
    .join("");
  return `${backButton}${starterButton}${categoryTrail}`;
}

function renderCommunication() {
  const activeStarter = communicationStarterById(communicationStarter);
  const starterSequence = communicationStarterSequence(activeStarter);
  const activeGroup =
    activeStarter?.groups.find((group) => group.id === communicationGroup) || activeStarter?.groups[0];
  const activeCategory = activeGroup?.categoryId
    ? communicationCategoryById(communicationCategory) || communicationCategoryById(activeGroup.categoryId)
    : null;
  const activeRecentScope =
    activeGroup?.id === "recientes"
      ? activeStarter?.id
      : activeCategory?.id === "alimentos"
        ? activeCategory.id
        : null;
  const activeRecentMessages = activeRecentScope
    ? readCommunicationRecentMessages(activeRecentScope).slice(0, 5)
    : [];
  const recentPictoLimit = Math.max(0, 15 - activeRecentMessages.length);
  const activeGroupPictos =
    activeGroup?.id === "recientes"
      ? readCommunicationRecents(activeStarter?.id).slice(0, recentPictoLimit)
      : activeCategory
        ? communicationCategoryPictos(activeCategory).slice(0, recentPictoLimit)
        : activeGroup?.pictos || [];
  const compositionTokens = communicationCompositionTokens();
  const phrase = communicationPhrase();
  const canPresent =
    Boolean(communicationWrittenText.trim()) ||
    (communicationSentence.length > 0 &&
      (!activeStarter || communicationSentence.length > starterSequence.length));
  const canToggleNegation =
    activeStarter?.id === "yo-quiero" && communicationSentence.length > starterSequence.length;
  const builderColor = activeStarter?.id === "yo-quiero" && communicationNegated ? "#c44747" : activeStarter?.color;
  const showButton = canPresent
    ? `<button class="show-sentence" type="button" data-action="communication-present">Mostrar</button>`
    : "";
  const quickButtons = COMMUNICATION_QUICK_ACTIONS.map((quick) => {
    const displayQuick =
      quick.id === "quick-no-quiero" && canToggleNegation && communicationNegated
        ? { ...quick, label: "Quiero", message: "Quiero", picto: "quiero", color: "#1f7a8c" }
        : quick;
    const card = communicationPicto(displayQuick.picto);
    if (!card) return "";
    return `
      <button class="quick-picto" type="button" data-action="communication-quick" data-quick="${quick.id}" aria-label="${escapeHtml(displayQuick.message || displayQuick.label)}" style="--card-color:${displayQuick.color}">
        <span class="quick-picto-image">${pictoImage(card, "quick-picto-img")}</span>
        <span>${escapeHtml(displayQuick.label)}</span>
      </button>
    `;
  }).join("");
  const sentenceTokens = compositionTokens.length
    ? compositionTokens
        .map((token, index) => {
          if (token.type === "text") {
            return `
              <button class="sentence-token sentence-text-token" type="button" data-action="communication-write" aria-label="Editar texto: ${escapeHtml(token.text)}" style="--card-color:#7c5cdb">
                <span class="sentence-text-edit" aria-hidden="true">${icon("edit")}</span>
                <span class="sentence-text-value">${escapeHtml(token.text)}</span>
              </button>
            `;
          }
          const card = communicationPicto(token.id);
          if (!card) return "";
          return `
            <button class="sentence-token" type="button" data-action="remove-communication-token" data-index="${index}" style="--card-color:${card.color}">
              ${pictoImage(card, "sentence-token-img")}
              <span>${escapeHtml(card.label)}</span>
            </button>
          `;
        })
        .join("")
    : `<div class="sentence-empty">Armar frase</div>`;
  const presentationTokens = compositionTokens
    .map((token) => {
      if (token.type === "text") {
        return `
          <div class="presentation-token presentation-text-token" style="--card-color:#7c5cdb">
            <span>${escapeHtml(token.text)}</span>
          </div>
        `;
      }
      const card = communicationPicto(token.id);
      if (!card) return "";
      return `
        <div class="presentation-token" style="--card-color:${card.color}">
          ${pictoImage(card, "presentation-token-img")}
          <span>${escapeHtml(card.label)}</span>
        </div>
      `;
    })
    .join("");
  const starterButtons = COMMUNICATION_STARTERS.map(
    (starter) => `
      <button class="starter-card" type="button" data-action="communication-starter" data-starter="${starter.id}" style="--card-color:${starter.color}">
        <span class="starter-card-title">${escapeHtml(starter.title)}</span>
      </button>
    `
  ).join("");
  const groupTabs = activeCategory
    ? renderCommunicationCategoryNav(activeStarter, activeCategory)
    : activeStarter
      ? activeStarter.groups
          .map(
            (group) => `
              <button class="builder-chip ${activeGroup?.id === group.id ? "is-active" : ""}" type="button" data-action="communication-group" data-group="${group.id}">
                ${escapeHtml(group.title)}
              </button>
            `
          )
          .join("")
      : "";
  const categoryCards =
    activeCategory && activeCategory.id !== "alimentos"
      ? (activeCategory.childIds || []).map((id) => renderCommunicationCategoryButton(id)).join("")
      : "";
  const recentMessageCards = activeRecentMessages
    .map((entry, index) => renderCommunicationRecentMessage(activeRecentScope, entry, index))
    .join("");
  const activeGridCards = activeGroup?.id === "recientes" ? renderGeneralCommunicationRecents() : `${recentMessageCards}${categoryCards}${activeGroupPictos
    .map((id) => renderPictoButton(id))
    .join("")}`;
  const builderContent = activeStarter
    ? `
      <div class="builder-title" style="--card-color:${builderColor}">
        <span>${escapeHtml(phrase || activeStarter.title)}</span>
        ${showButton}
      </div>
      <div class="builder-chips">${groupTabs}</div>
      <div class="picto-grid compact-picto-grid">${activeGridCards}</div>
    `
    : `
      ${
        phrase
          ? `
            <div class="builder-title builder-title-message" style="--card-color:#1f7a8c">
              <span>${escapeHtml(phrase)}</span>
              ${showButton}
            </div>
          `
          : ""
      }
      <div class="starter-grid">${starterButtons}</div>
    `;

  app.innerHTML = `
    <main class="communication-immersive">
      <button class="comm-home" type="button" data-action="home" aria-label="Volver al inicio">${icon("home")}</button>
      <section class="quick-rail" aria-label="Mensajes rapidos">${quickButtons}</section>
      <article class="immersive-sentence" aria-live="polite">
        <div class="sentence-output">${sentenceTokens}</div>
        <div class="sentence-controls">
          <button class="write-sentence" type="button" data-action="communication-write">${icon("edit")}Escribir</button>
          <button class="clear-sentence" type="button" data-action="communication-clear" ${communicationHasContent() ? "" : "disabled"}>${icon("trash")}Limpiar</button>
        </div>
      </article>
      <section class="communication-builder" aria-label="Armar frase">${builderContent}</section>
      ${
        communicationPresentation && communicationHasContent()
          ? `
            <section class="communication-presentation" role="dialog" aria-modal="true" aria-label="Mostrar mensaje">
              <button class="presentation-close" type="button" data-action="communication-close-presentation" aria-label="Cerrar mensaje">${icon("x")}</button>
              <div class="presentation-content">
                <div class="presentation-tokens ${compositionTokens.length > 4 ? "is-many" : ""}">${presentationTokens}</div>
                <p class="presentation-phrase">${escapeHtml(phrase)}</p>
                ${communicationAudioStatus ? `<p class="presentation-audio-status" role="status">${escapeHtml(communicationAudioStatus)}</p>` : ""}
              </div>
            </section>
          `
          : ""
      }
    </main>
  `;
}

function renderSubject(subjectId) {
  const subject = subjectById(subjectId);
  if (!subject) return setRoute({ view: "school" });
  if (subject.id === "tecnologia") return renderTechnologyMenu(subject);

  const themeDescription = (theme) => {
    if (VOICE_PLAYBACK_ENABLED || !theme?.englishMode) return theme.description || "Tema sin descripcion";
    if (theme.englishMode === "colors") return "Reconocer los colores escritos en inglés.";
    if (theme.englishMode === "supplies") return "Leer una palabra y elegir el útil escolar correcto.";
    return "Leer el número en inglés y elegir la cantidad correcta.";
  };

  const themes = subject.themes.length
    ? subject.themes
        .map(
          (theme) => `
        <article class="item-card ${theme.expeditionMode ? "se-theme-card" : theme.discoveryMode ? "pd-theme-card" : theme.worldMode ? "pw-theme-card" : theme.farmActivity ? "farm-theme-card" : theme.questMode ? "pq-theme-card" : theme.earthLayers ? "earth-theme-card" : theme.arcadeMode ? "sa-theme-card" : theme.missionMode ? "lm-theme-card" : theme.pacmanVerbMode ? "pv-theme-card" : ""}">
          <div class="item-card-header">
            <span class="tile-mark" style="--subject-color:${subject.color}">${theme.expeditionMode || theme.discoveryMode || theme.worldMode || theme.farmActivity || theme.questMode || theme.earthLayers || theme.pacmanVerbMode || theme.missionMode || theme.arcadeMode ? pacmanVerbSprite() : icon(subject.icon)}</span>
            <div class="item-card-body">
              <h3>${escapeHtml(theme.title)}</h3>
              <p>${escapeHtml(themeDescription(theme))}</p>
              ${theme.credit ? `<span class="theme-credit-badge">★ ${escapeHtml(theme.credit)}</span>` : ""}
              <span class="pill-row">
                <span class="pill">${escapeHtml(theme.activityLabel || `${theme.exercises.length} ${theme.exercises.length === 1 ? "ronda" : "rondas"}`)}</span>
              </span>
            </div>
          </div>
          <div class="inline-actions">
            <button class="btn btn-primary" type="button" data-action="start" data-mode="activity" data-subject="${subject.id}" data-theme="${theme.id}">${icon("play")}Empezar</button>
          </div>
        </article>
      `
        )
        .join("")
    : `<div class="empty-state"><h2>No hay temas todavia</h2><p>Agrega el primer tema de ${escapeHtml(subject.title)}.</p></div>`;

  renderShell(`
    <section class="screen">
      <div class="toolbar">
        <button class="btn btn-ghost" type="button" data-action="school">${icon("arrow")}Escuela</button>
      </div>
      <div class="section-title">
        <h2>${escapeHtml(subject.title)}</h2>
        <span class="pill">${subject.themes.length} actividades / ${allExercisesCount(subject)} rondas</span>
      </div>
      <div class="grid theme-grid">${themes}</div>
    </section>
  `);
}

function renderTheme(subjectId, themeId) {
  const subject = subjectById(subjectId);
  const theme = themeById(subject, themeId);
  if (!subject || !theme) return setRoute({ view: "school" });

  const exercises = theme.exercises.length
    ? theme.exercises
        .map(
          (exercise, index) => {
            const preview =
              exercise.type === "social-farm"
                ? `<div class="pill-row"><span class="pill">3 estaciones: ambiente, cuidados y mi campo</span></div>`
                : exercise.type === "pacman-quest"
                ? `<div class="pill-row"><span class="pill">${escapeHtml(theme.activityLabel)}</span></div>`
                : exercise.type === "matching"
                ? `<div class="pill-row">${exercise.pairs
                    .map((pair) => `<span class="pill">${escapeHtml(pair.visual)} ${escapeHtml(pair.label)}</span>`)
                    .join("")}</div>`
                : exercise.type === "animal-sound"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 6} sonidos para descubrir</span></div>`
                : exercise.type === "rhyme-puzzle"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 9} parejas para unir</span></div>`
                : exercise.type === "drag-matching"
                  ? `<div class="pill-row"><span class="pill">${exercise.pairs.length} multiplicaciones para relacionar</span></div>`
                : exercise.type === "sum-choice-grid"
                  ? `<div class="pill-row"><span class="pill">${exercise.rows.length} sumas para resolver</span></div>`
                : exercise.type === "ghost-sum"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 5} sumas con objetos para contar</span></div>`
                : exercise.type === "ghost-multiplication"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 5} multiplicaciones con fantasmas</span></div>`
                : exercise.type === "plant-labeling"
                  ? `<div class="pill-row"><span class="pill">Conocer y ubicar ${exercise.parts.length} partes</span></div>`
                : exercise.type === "english-family"
                  ? `<div class="pill-row"><span class="pill">Fotos de mi familia · Audio con pausa</span></div>`
                : exercise.type === "english-vocabulary"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 6} palabras diferentes cada vez</span><span class="pill">${VOICE_PLAYBACK_ENABLED ? "Con audio en inglés" : "Actividad visual"}</span></div>`
                : exercise.type === "circle-geometry"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 10} desafíos variados</span><span class="pill">Banco de 48 situaciones</span></div>`
                : exercise.type === "pacman-angle"
                  ? `<div class="pill-row"><span class="pill">${exercise.stage === "build" ? 8 : exercise.stage === "compare" ? 2 : 6} desafíos</span><span class="pill">Juego visual</span></div>`
                : exercise.type === "geometry-quest"
                  ? `<div class="pill-row"><span class="pill">${theme.activityLabel}</span><span class="pill">Juego visual</span></div>`
                : exercise.type === "plastic-materials"
                  ? `<div class="pill-row"><span class="pill">6 desafíos</span><span class="pill">Objetos grandes</span></div>`
                : exercise.type === "sentence-builder"
                  ? `<div class="pill-row"><span class="pill">${exercise.sentences.length} oraciones</span><span class="pill">Sujeto · Verbo · Predicado</span></div>`
                : exercise.type === "pacman-verbs"
                  ? `<div class="pill-row"><span class="pill">${escapeHtml(theme.activityLabel)}</span></div>`
                : exercise.type === "sofia-recipe"
                  ? `<div class="pill-row"><span class="pill">${exercise.steps.length} pasos visuales</span>${VOICE_PLAYBACK_ENABLED ? '<span class="pill">Con audio</span>' : ""}</div>`
                : exercise.type === "instructional-recipe"
                  ? `<div class="pill-row"><span class="pill">${exercise.steps.length} instrucciones</span><span class="pill">Sin respuestas por descarte</span></div>`
                : exercise.type === "recipe-photo-matching"
                  ? `<div class="pill-row"><span class="pill">${exercise.steps.length} instrucciones</span><span class="pill">Fotos reales</span></div>`
                : `<div class="pill-row">
                    ${exercise.options
                      .map(
                        (option, optionIndex) =>
                          `<span class="pill">${optionIndex === exercise.correctIndex ? "OK " : ""}${escapeHtml(option.text)}</span>`
                      )
                      .join("")}
                  </div>`;
            return `
        <article class="exercise-card">
          <h3>${index + 1}. ${escapeHtml(exercise.prompt)}</h3>
          <p>${escapeHtml(exercise.support || "Sin apoyo visual")}</p>
          ${preview}
        </article>
      `;
          }
        )
        .join("")
    : `<div class="empty-state"><h2>No hay ejercicios todavia</h2><p>Agrega actividades tactiles para este tema.</p></div>`;

  renderShell(`
    <section class="screen">
      <div class="toolbar">
        <button class="btn btn-ghost" type="button" data-action="open-subject" data-subject="${subject.id}">${icon("arrow")}${escapeHtml(subject.title)}</button>
        <div class="screen-actions">
          <button class="btn btn-primary" type="button" data-action="start" data-mode="activity" data-subject="${subject.id}" data-theme="${theme.id}" ${theme.exercises.length ? "" : "disabled"}>${icon("play")}Empezar</button>
        </div>
      </div>
      <div class="section-title">
        <div>
          <h2>${escapeHtml(theme.title)}</h2>
          ${theme.credit ? `<span class="theme-credit-badge">★ ${escapeHtml(theme.credit)}</span>` : ""}
        </div>
        <span class="pill">${theme.randomExerciseCount || theme.exercises.length} ejercicios</span>
      </div>
      <div class="grid theme-grid">${exercises}</div>
    </section>
  `);
}

function startSession(subjectId, themeId, mode) {
  const subject = subjectById(subjectId);
  const theme = themeById(subject, themeId);
  if (!subject || !theme || !theme.exercises.length) return;
  stopFamilyAudio();
  familyAudioError = "";

  if (typeof stopCapacityAnimation === "function") stopCapacityAnimation();
  const exercises = theme.expeditionMode
    ? createSchoolExpeditionExercises(theme)
    : theme.capacityMode
    ? createCapacityExercises(theme)
    : theme.discoveryMode
    ? createPacmanDiscoveryExercises(theme)
    : theme.weightMode
    ? createWeightLabExercises(theme)
    : theme.worldMode
    ? createPacmanWorldExercises(theme)
    : theme.questMode
    ? createPacmanQuestExercises(theme)
    : theme.familyMode
    ? createFamilyExercises(theme)
    : theme.arcadeMode
    ? createSchoolArcadeExercises(theme)
    : theme.technologyMode
    ? createTechnologyExercises(theme)
    : theme.missionMode
    ? createLanguageMissionExercises(theme)
    : theme.pacmanVerbMode
    ? createPacmanVerbExercises(theme)
    : theme.plasticMaterialsSequence
    ? createPlasticMaterialsExercises(theme)
    : theme.pacmanAngleSequence
    ? createPacmanAngleExercises(theme)
    : theme.geometryQuest
    ? createGeometryQuestExercises(theme)
    : theme.circleGeometryPool
    ? createCircleGeometryExercises(theme)
    : theme.englishVocabularyPool
    ? createEnglishVocabularyExercises(theme)
    : theme.sumPool
    ? createGhostSumExercises(theme)
    : theme.multiplicationPool
      ? createGhostMultiplicationExercises(theme)
      : theme.animalSoundPool
        ? createAnimalSoundExercises(theme)
        : theme.rhymePairPool
          ? createRhymePuzzleExercises(theme)
      : clone(theme.exercises);
  session = {
    id: uid("session"),
    subjectId,
    subjectTitle: subject.title,
    themeId,
    themeTitle: theme.title,
    mode,
    index: 0,
    score: 0,
    selectedIndex: null,
    soundChoiceWrongIndex: null,
    soundGalleryItemId: null,
    answers: [],
    exercises,
    expeditions: Object.fromEntries(exercises.filter((exercise) => exercise.type === "school-expedition")
      .map((exercise) => [exercise.id, createSchoolExpeditionState()])),
    capacity: Object.fromEntries(exercises.filter((exercise) => exercise.type === "capacity-lab")
      .map((exercise) => [exercise.id, createCapacityState(exercise)])),
    capacityLesson: theme.capacityMode ? { active: true, unit: 2, parts: [], busy: false } : null,
    discoveries: Object.fromEntries(exercises.filter((exercise) => exercise.type === "pacman-discovery")
      .map((exercise) => [exercise.id, createPacmanDiscoveryState(exercise)])),
    weightLab: Object.fromEntries(exercises.filter((exercise) => exercise.type === "weight-lab")
      .map((exercise) => [exercise.id, createWeightLabState(exercise)])),
    earth: theme.earthLayers ? createEarthState() : null,
    farm: theme.farmActivity ? createFarmState() : null,
    pacmanWorld: Object.fromEntries(exercises.filter((exercise) => exercise.type === "pacman-world")
      .map((exercise) => [exercise.id, { choice: null, sequence: [], checked: false, isCorrect: false }])),
    pacmanQuest: Object.fromEntries(exercises.filter((exercise) => exercise.type === "pacman-quest")
      .map((exercise) => [exercise.id, { choice: null, sequence: [], portions: Array(exercise.guests || 0).fill(0), checked: false, isCorrect: false, explanation: "" }])),
    family: Object.fromEntries(exercises.filter((exercise) => exercise.type === "english-family")
      .map((exercise) => [exercise.id, { person: "mom", word: "mother", choice: null, checked: false, correct: false }])),
    schoolArcade: Object.fromEntries(exercises.filter((exercise) => exercise.type === "school-arcade")
      .map((exercise) => [exercise.id, { values: {}, activeField: 0, path: [], number: "", checked: false, isCorrect: false }])),
    technology: theme.technologyMode ? { choices: {}, checked: false } : null,
    languageMissions: Object.fromEntries(exercises.filter((exercise) => exercise.type === "language-mission")
      .map((exercise) => [exercise.id, { checked: false, isCorrect: false, choice: null, wordIndex: null, selected: [], placed: [], explanation: "" }])),
    matching: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "matching")
        .map((exercise) => [
          exercise.id,
          {
            selectedPicture: null,
            selectedSound: null,
            matchedIds: [],
            soundOrder: shuffled(exercise.pairs.map((pair) => pair.id)),
            message: ""
          }
        ])
    ),
    dragMatching: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "drag-matching")
        .map((exercise) => [
          exercise.id,
          {
            placements: {},
            resultOrder: shuffled(exercise.pairs.map((pair) => pair.id)),
            checked: false,
            isCorrect: false,
            message: ""
          }
        ])
    ),
    sumChoice: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "sum-choice-grid")
        .map((exercise) => [
          exercise.id,
          { selections: {}, checked: false, isCorrect: false, message: "" }
        ])
    ),
    ghostSums: Object.fromEntries(
      exercises
        .filter((exercise) => ["ghost-sum", "ghost-multiplication"].includes(exercise.type))
        .map((exercise) => [
          exercise.id,
          {
            movedGhosts: [],
            countedGhosts: [],
            selectedAnswer: null,
            checked: false,
            isCorrect: false,
            message: "",
            lastMovedGhost: null,
            lastReturnedGhost: null,
            lastMovedGroup: null,
            lastReturnedGroup: null,
            helpOpen: false,
            helpRow: null,
            helpColumn: null
          }
        ])
    ),
    animalSounds: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "animal-sound")
        .map((exercise) => [
          exercise.id,
          { selectedAnimalId: null, checked: false, isCorrect: false, message: "" }
        ])
    ),
    rhymePuzzles: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "rhyme-puzzle")
        .map((exercise) => [
          exercise.id,
          { selectedWordId: null, checked: false, isCorrect: false, message: "" }
        ])
    ),
    plantLabeling: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "plant-labeling")
        .map((exercise) => [
          exercise.id,
          { learning: true, placements: {}, labelOrder: shuffled(exercise.parts.map((part) => part.id)), checked: false, isCorrect: false, message: "" }
        ])
    ),
    englishVocabulary: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "english-vocabulary")
        .map((exercise) => [
          exercise.id,
          { selectedId: null, answered: false, isCorrect: false, message: "" }
        ])
    ),
    circleGeometry: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "circle-geometry")
        .map((exercise) => [
          exercise.id,
          { selectedId: null, answered: false, isCorrect: false, message: "" }
        ])
    ),
    pacmanVerbs: Object.fromEntries(
      exercises.filter((exercise) => exercise.type === "pacman-verbs")
        .map((exercise) => [exercise.id, { answered: false, wrongChoice: null, errors: 0 }])
    ),
    pacmanAngles: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "pacman-angle")
        .map((exercise) => [
          exercise.id,
          {
            roundIndex: 0,
            currentDegrees: exercise.rounds?.[0]?.initial ?? 90,
            selectedId: null,
            wrongId: null,
            answered: false,
            showGuide: false,
            message: "",
            errors: 0
          }
        ])
    ),
    geometryQuests: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "geometry-quest")
        .map((exercise) => [exercise.id, {
          roundIndex: 0,
          currentDegrees: exercise.rounds?.[0]?.initial ?? 0,
          selectedId: null,
          answered: false,
          folded: false,
          showGuide: false,
          message: "",
          errors: 0
        }])
    ),
    plasticMaterials: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "plastic-materials")
        .map((exercise) => [
          exercise.id,
          {
            roundIndex: 0,
            selectedId: null,
            wrongId: null,
            answered: false,
            message: "",
            errors: 0
          }
        ])
    ),
    instructionalRecipe: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "instructional-recipe")
        .map((exercise) => [
          exercise.id,
          {
            phase: "intro",
            stepIndex: 0,
            completedSteps: 0,
            message: "",
            retry: false
          }
        ])
    ),
    recipePhotoMatching: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "recipe-photo-matching")
        .map((exercise) => [
          exercise.id,
          {
            selectedStepId: null,
            matches: {},
            message: ""
          }
        ])
    ),
    sentenceBuilders: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "sentence-builder")
        .map((exercise) => [
          exercise.id,
          {
            roundIndex: 0,
            phase: "build",
            placed: [],
            fragmentOrder: shuffled(["subject", "verb", "complement"]),
            identified: [],
            wrongPart: null,
            message: ""
          }
        ])
    ),
    sofiaRecipes: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "sofia-recipe")
        .map((exercise) => [
          exercise.id,
          {
            phase: "intro",
            stepIndex: 0,
            optionOrder: shuffled(exercise.steps[0]?.options || []),
            wrongId: null,
            message: ""
          }
        ])
    ),
    circleGeometryLearning: exercises.some((exercise) => exercise.type === "circle-geometry"),
    circleRetryKeys: [],
    englishRetryWords: [],
    englishExtraFillers: 0
  };
  route = { view: "run" };
  render();
  if (["language-mission", "school-expedition"].includes(exercises[0]?.type)) window.scrollTo({ top: 0, behavior: "auto" });
  if (exercises[0]?.type === "english-vocabulary") {
    window.setTimeout(() => playEnglishVocabularyAudio(), 120);
  }
  if (exercises[0]?.type === "sentence-builder") {
    window.setTimeout(() => playLanguageAudio("grammar/prompts/armar-oracion.mp3"), 160);
  }
  if (exercises[0]?.type === "sofia-recipe") {
    window.setTimeout(() => playLanguageAudio("recipe/intro.mp3"), 160);
  }
}

function renderMatchingBoard(exercise, matchingState, answered) {
  const pairsById = new Map(exercise.pairs.map((pair) => [pair.id, pair]));
  const renderPicture = (pair) => {
    const isMatched = matchingState.matchedIds.includes(pair.id);
    const isSelected = matchingState.selectedPicture === pair.id;
    return `
      <button class="matching-card matching-picture ${isMatched ? "is-matched" : ""} ${isSelected ? "is-selected" : ""}" type="button" data-action="matching-select" data-kind="picture" data-pair="${escapeHtml(pair.id)}" ${isMatched || answered ? "disabled" : ""}>
        <span class="matching-visual" aria-hidden="true">${escapeHtml(pair.visual)}</span>
        <span>${escapeHtml(pair.label)}</span>
      </button>
    `;
  };
  const renderSound = (pair) => {
    const isMatched = matchingState.matchedIds.includes(pair.id);
    const isSelected = matchingState.selectedSound === pair.id;
    return `
      <button class="matching-card matching-sound ${isMatched ? "is-matched" : ""} ${isSelected ? "is-selected" : ""}" type="button" data-action="matching-select" data-kind="sound" data-pair="${escapeHtml(pair.id)}" ${isMatched || answered ? "disabled" : ""}>
        ${escapeHtml(pair.sound)}
      </button>
    `;
  };

  return `
    <div class="matching-board" aria-label="Emparejar dibujos y sonidos">
      <div class="matching-column">
        <span class="matching-heading">Dibujos</span>
        ${exercise.pairs.map(renderPicture).join("")}
      </div>
      <div class="matching-column">
        <span class="matching-heading">Sonidos</span>
        ${matchingState.soundOrder.map((id) => renderSound(pairsById.get(id))).join("")}
      </div>
    </div>
  `;
}

function renderDragMatchingBoard(exercise, dragState) {
  const pairsById = new Map(exercise.pairs.map((pair) => [pair.id, pair]));
  const placedIds = Object.values(dragState.placements);
  const statusFor = (pairId) => {
    if (!dragState.checked) return "";
    return dragState.placements[pairId] === pairId ? "is-correct" : "is-wrong";
  };
  const rows = exercise.pairs
    .map((pair) => {
      const placedId = dragState.placements[pair.id];
      const placedPair = placedId ? pairsById.get(placedId) : null;
      return `
        <div class="drag-match-row">
          <div class="drag-match-expression">${escapeHtml(pair.expression)}</div>
          <div class="drag-match-arrow" aria-hidden="true">→</div>
          <button class="drag-match-slot ${placedPair ? "has-answer" : ""} ${statusFor(pair.id)}" type="button" data-action="drag-match-slot" data-pair="${escapeHtml(pair.id)}" aria-label="Resultado para ${escapeHtml(pair.expression)}">
            ${placedPair ? escapeHtml(placedPair.result) : "Soltá aquí"}
          </button>
        </div>
      `;
    })
    .join("");
  const results = dragState.resultOrder
    .map((id) => {
      const pair = pairsById.get(id);
      const isPlaced = placedIds.includes(id);
      return `
        <button class="drag-match-result ${isPlaced ? "is-placed" : ""}" type="button" draggable="true" data-action="drag-match-result" data-result="${escapeHtml(id)}" ${isPlaced ? "disabled" : ""} aria-label="Arrastrar resultado ${escapeHtml(pair.result)}">
          ${escapeHtml(pair.result)}
        </button>
      `;
    })
    .join("");

  return `
    <div class="drag-match-board" aria-label="Relacionar multiplicaciones con resultados">
      <div class="drag-match-list">${rows}</div>
      <div class="drag-match-results-label">Resultados</div>
      <div class="drag-match-results">${results}</div>
    </div>
  `;
}

function renderDragMatchingRunner(exercise) {
  const dragState = session.dragMatching[exercise.id];
  const total = session.exercises.length;
  const complete = Object.keys(dragState.placements).length === exercise.pairs.length;
  const feedbackMessage = dragState.message || (complete ? "Ya completaste todas las asociaciones." : "Arrastrá todos los resultados para continuar.");
  const feedbackClass = dragState.checked && dragState.isCorrect ? "good" : dragState.checked ? "bad" : "wait";

  renderShell(`
    <section class="runner matching-runner drag-matching-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${total}</span><span>Actividad</span></div>
      </div>
      <article class="question-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <div class="question-support">${escapeHtml(exercise.support || "")}</div>
        ${renderDragMatchingBoard(exercise, dragState)}
        <div class="feedback ${feedbackClass}" aria-live="polite">${feedbackMessage}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="check-drag-matching" ${complete && !dragState.checked ? "" : "disabled"}>${icon("check")}Verificar resultados</button>
      </div>
    </section>
  `);
}

function renderSumChoiceRunner(exercise) {
  const state = session.sumChoice[exercise.id];
  const complete = Object.keys(state.selections).length === exercise.rows.length;
  const rows = exercise.rows
    .map((row) => {
      const selectedIndex = state.selections[row.id];
      const options = row.options
        .map((option, index) => {
          const selected = selectedIndex === index;
          const status = state.checked ? (selected ? (index === row.correctIndex ? "is-correct" : "is-wrong") : "") : selected ? "is-selected" : "";
          return `<button class="sum-choice-option ${status}" type="button" data-action="sum-choice-select" data-row="${escapeHtml(row.id)}" data-option="${index}" aria-label="${escapeHtml(row.expression)}: ${escapeHtml(option)}">${escapeHtml(option)}</button>`;
        })
        .join("");
      return `<div class="sum-choice-row"><div class="sum-choice-expression">${escapeHtml(row.expression)} =</div><div class="sum-choice-options">${options}</div></div>`;
    })
    .join("");
  const feedbackClass = state.checked && state.isCorrect ? "good" : state.checked ? "bad" : "wait";
  const feedbackMessage = state.message || (complete ? "Ya respondiste todas las sumas." : "Toca una respuesta en cada fila.");
  renderShell(`
    <section class="runner matching-runner sum-choice-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${session.exercises.length}</span><span>Actividad</span></div>
      </div>
      <article class="question-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <div class="sum-choice-board" aria-label="Elegir resultados de sumas">${rows}</div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${feedbackMessage}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="check-sum-choice" ${complete && !state.checked ? "" : "disabled"}>${icon("check")}Verificar resultados</button>
      </div>
    </section>
  `);
}

function renderGhostSumGroup(exercise, state, side) {
  const amount = exercise[side];
  const moved = new Set(state.movedGhosts);
  const label = side === "left" ? "primer número" : "segundo número";
  const ghosts = Array.from({ length: amount }, (_, index) => {
    const token = `${side}-${index + 1}`;
    if (moved.has(token)) return `<span class="ghost-origin-placeholder" aria-hidden="true"></span>`;
    const returnedClass = state.lastReturnedGhost === token ? "is-returning" : "";
    return `<button class="ghost-token ghost-origin-token ${returnedClass}" type="button" data-action="ghost-sum-toggle-ghost" data-token="${token}" aria-label="Mover fantasma ${index + 1} del ${label}"><span aria-hidden="true">👻</span></button>`;
  }).join("");
  return `<div class="ghost-sum-term"><strong>${amount}</strong><div class="ghost-origin-grid" aria-label="${amount} fantasmas del ${label}">${ghosts}</div></div>`;
}

function renderGhostSumRunner(exercise) {
  const state = session.ghostSums[exercise.id];
  const total = exercise.left + exercise.right;
  const allMoved = state.movedGhosts.length === total;
  const ready = allMoved && state.selectedAnswer !== null;
  const counted = new Set(state.countedGhosts || []);
  const movedGhosts = state.movedGhosts
    .map((token) => {
      const arrivingClass = state.lastMovedGhost === token ? "is-arriving" : "";
      const countedClass = counted.has(token) ? "is-counted" : "";
      return `<button class="ghost-token ghost-tray-token ${arrivingClass} ${countedClass}" type="button" data-action="ghost-tray-count-toggle" data-token="${escapeHtml(token)}" aria-label="${counted.has(token) ? "Fantasma ya contado; tocar para desmarcar" : "Marcar este fantasma como contado"}" aria-pressed="${counted.has(token)}"><span aria-hidden="true">👻</span></button>`;
    })
    .join("");
  const answerStatus = state.checked ? (state.isCorrect ? "is-correct" : "is-wrong") : state.selectedAnswer !== null ? "has-answer" : "";
  const options = exercise.options
    .map((value) => {
      const selected = state.selectedAnswer === value;
      return `<button class="ghost-sum-answer-option ${selected ? "is-placed" : ""}" type="button" draggable="true" data-action="ghost-sum-answer" data-answer="${value}" ${selected ? "disabled" : ""} aria-label="Respuesta ${value}">${value}</button>`;
    })
    .join("");
  let feedbackMessage = state.message;
  if (!feedbackMessage) {
    if (!state.movedGhosts.length) feedbackMessage = "Tocá los fantasmas para juntarlos.";
    else if (!allMoved) feedbackMessage = "Seguí tocando los fantasmas.";
    else if (state.selectedAnswer === null) feedbackMessage = "Tocá cada fantasma para marcarlo mientras contás y elegí el resultado.";
    else feedbackMessage = "Ya podés verificar el resultado.";
  }
  const feedbackClass = state.checked && state.isCorrect ? "good" : state.checked ? "bad" : "wait";

  renderShell(`
    <section class="runner matching-runner ghost-sum-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${session.exercises.length}</span><span>Suma</span></div>
      </div>
      <article class="question-panel ghost-sum-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <div class="ghost-sum-workspace">
          <div class="ghost-sum-equation" aria-label="${exercise.left} más ${exercise.right}">
            ${renderGhostSumGroup(exercise, state, "left")}
            <span class="ghost-sum-sign" aria-hidden="true">+</span>
            ${renderGhostSumGroup(exercise, state, "right")}
            <span class="ghost-sum-sign" aria-hidden="true">=</span>
          </div>
          <div class="ghost-sum-result-panel">
            <section class="ghost-sum-tray" aria-label="Lugar para juntar los fantasmas">
              <div class="ghost-tray-toolbar"><button class="ghost-clear-button" type="button" data-action="ghost-tray-clear" ${state.movedGhosts.length ? "" : "disabled"}>Limpiar</button></div>
              <div class="ghost-tray-grid">${movedGhosts || `<span class="ghost-tray-hint">Tocá los fantasmas</span>`}</div>
            </section>
            <section class="ghost-sum-answer-area">
              <span>Resultado</span>
              <button class="ghost-sum-answer-slot ${answerStatus}" type="button" data-action="ghost-sum-answer-slot" aria-label="Espacio para el resultado">${state.selectedAnswer ?? "?"}</button>
            </section>
          </div>
        </div>
        <div class="ghost-sum-options-area">
          <span>Arrastrá o tocá una respuesta</span>
          <div class="ghost-sum-answer-options">${options}</div>
        </div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${escapeHtml(feedbackMessage)}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="check-ghost-sum" ${ready && !state.checked ? "" : "disabled"}>${icon("check")}Verificar resultado</button>
      </div>
    </section>
  `);
}

function renderGhostMultiplicationGroup(exercise, state, groupIndex) {
  const moved = new Set(state.movedGhosts);
  const groupId = `group-${groupIndex + 1}`;
  const sourceColumns = Math.min(exercise.groupSize, 2);
  const sourceTokenSize = exercise.groupCount >= 5 || exercise.groupSize >= 4 ? 24 : exercise.groupCount >= 4 || exercise.groupSize >= 3 ? 26 : 30;
  const ghosts = Array.from({ length: exercise.groupSize }, (_, ghostIndex) => {
    const token = `group-${groupIndex + 1}-${ghostIndex + 1}`;
    if (moved.has(token)) return `<span class="ghost-origin-placeholder" aria-hidden="true"></span>`;
    const returnedClass = state.lastReturnedGroup === groupId ? "is-returning" : "";
    return `<button class="ghost-token ghost-origin-token ${returnedClass}" type="button" data-action="ghost-sum-toggle-ghost" data-token="${token}" aria-label="Mover este conjunto de fantasmas"><span aria-hidden="true">👻</span></button>`;
  }).join("");
  return `
    <section class="ghost-multiply-group" style="--source-columns: ${sourceColumns}; --source-token-size: ${sourceTokenSize}px" aria-label="Conjunto de fantasmas">
      <div class="ghost-multiply-group-grid">${ghosts}</div>
    </section>
  `;
}

function renderMultiplicationHelp(exercise, state) {
  const numbers = [1, 2, 3, 4, 5];
  const hasResult = state.helpRow !== null && state.helpColumn !== null;
  const equation = hasResult
    ? `${state.helpRow} × ${state.helpColumn} = ${state.helpRow * state.helpColumn}`
    : "Elegí un número de cada borde";
  const columnHeaders = numbers
    .map((number) => `<th scope="col"><button class="multiplication-table-header ${state.helpColumn === number ? "is-selected" : ""}" type="button" data-action="multiplication-help-axis" data-axis="column" data-value="${number}" aria-pressed="${state.helpColumn === number}">${number}</button></th>`)
    .join("");
  const rows = numbers
    .map((row) => {
      const cells = numbers
        .map((column) => {
          const classes = [
            state.helpRow === row ? "is-row-highlighted" : "",
            state.helpColumn === column ? "is-column-highlighted" : "",
            state.helpRow === row && state.helpColumn === column ? "is-result" : ""
          ].filter(Boolean).join(" ");
          return `<td class="${classes}"><span>${row * column}</span></td>`;
        })
        .join("");
      return `
        <tr>
          <th scope="row"><button class="multiplication-table-header ${state.helpRow === row ? "is-selected" : ""}" type="button" data-action="multiplication-help-axis" data-axis="row" data-value="${row}" aria-pressed="${state.helpRow === row}">${row}</button></th>
          ${cells}
        </tr>
      `;
    })
    .join("");

  return `
    <div class="multiplication-help-backdrop" role="dialog" aria-modal="true" aria-labelledby="multiplication-help-title">
      <section class="multiplication-help-dialog">
        <header class="multiplication-help-header">
          <div>
            <h2 id="multiplication-help-title">Tabla pitagórica hasta el 5</h2>
            <p>Buscá <strong>${exercise.groupCount}</strong> a la izquierda y <strong>${exercise.groupSize}</strong> arriba.</p>
          </div>
          <button class="btn btn-ghost multiplication-help-close" type="button" data-action="multiplication-help-close" aria-label="Cerrar ayuda">${icon("x")}Cerrar</button>
        </header>
        <div class="multiplication-help-equation ${hasResult ? "has-result" : ""}" aria-live="polite">${equation}</div>
        <table class="multiplication-table" aria-label="Tabla pitagórica del uno al cinco">
          <thead><tr><th class="multiplication-table-corner" aria-label="Por">×</th>${columnHeaders}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    </div>
  `;
}

function renderGhostMultiplicationRunner(exercise) {
  const state = session.ghostSums[exercise.id];
  const total = exercise.result;
  const trayTokenSize = exercise.groupCount >= 5 || total >= 20 ? 18 : exercise.groupCount >= 4 || total >= 15 ? 20 : exercise.groupCount >= 3 || total >= 10 ? 22 : 24;
  const allMoved = state.movedGhosts.length === total;
  const ready = allMoved && state.selectedAnswer !== null;
  const groups = Array.from({ length: exercise.groupCount }, (_, index) => renderGhostMultiplicationGroup(exercise, state, index)).join("");
  const movedSet = new Set(state.movedGhosts);
  const countedSet = new Set(state.countedGhosts || []);
  const movedGroups = Array.from({ length: exercise.groupCount }, (_, groupIndex) => {
    const groupId = `group-${groupIndex + 1}`;
    const groupTokens = Array.from({ length: exercise.groupSize }, (_, ghostIndex) => `${groupId}-${ghostIndex + 1}`)
      .filter((token) => movedSet.has(token));
    if (!groupTokens.length) return "";
    const arrivingClass = state.lastMovedGroup === groupId ? "is-arriving" : "";
    const ghosts = groupTokens
      .map((token) => `<button class="ghost-token ghost-tray-token ${countedSet.has(token) ? "is-counted" : ""}" type="button" data-action="ghost-tray-count-toggle" data-token="${escapeHtml(token)}" aria-label="${countedSet.has(token) ? "Fantasma ya contado; tocar para desmarcar" : "Marcar este fantasma como contado"}" aria-pressed="${countedSet.has(token)}"><span aria-hidden="true">👻</span></button>`)
      .join("");
    return `<div class="ghost-multiply-tray-group ${arrivingClass}" style="--group-size: ${exercise.groupSize}" aria-label="Conjunto acumulado">${ghosts}</div>`;
  })
    .join("");
  const answerStatus = state.checked ? (state.isCorrect ? "is-correct" : "is-wrong") : state.selectedAnswer !== null ? "has-answer" : "";
  const options = exercise.options
    .map((option) => {
      const selected = state.selectedAnswer === option;
      return `<button class="ghost-sum-answer-option ${selected ? "is-placed" : ""}" type="button" draggable="true" data-action="ghost-sum-answer" data-answer="${option}" ${selected ? "disabled" : ""} aria-label="Respuesta ${option}">${option}</button>`;
    })
    .join("");
  let feedbackMessage = state.message;
  if (!feedbackMessage) {
    if (!state.movedGhosts.length) feedbackMessage = "Tocá los fantasmas para llevarlos al total.";
    else if (!allMoved) feedbackMessage = "Seguí tocando los fantasmas.";
    else if (state.selectedAnswer === null) feedbackMessage = "Tocá cada fantasma para marcarlo mientras contás y elegí el resultado.";
    else feedbackMessage = "Ya podés verificar el resultado.";
  }
  const feedbackClass = state.checked && state.isCorrect ? "good" : state.checked ? "bad" : "wait";

  renderShell(`
    <section class="runner matching-runner ghost-sum-runner ghost-multiply-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${session.exercises.length}</span><span>Multiplicación</span></div>
      </div>
      <article class="question-panel ghost-sum-panel ghost-multiply-panel">
        <div class="ghost-multiply-title-row">
          <p class="question-text">${escapeHtml(exercise.prompt)}</p>
          <button class="btn multiplication-help-button" type="button" data-action="multiplication-help-open">¿ Ayuda ?</button>
        </div>
        <div class="ghost-multiply-workspace">
          <div class="ghost-multiply-groups-area">
            <div class="ghost-multiply-equation"><strong>${exercise.groupCount}</strong><span>×</span><strong>${exercise.groupSize}</strong><span>=</span><b>?</b></div>
            <div class="ghost-multiply-groups" style="--group-count: ${exercise.groupCount}">${groups}</div>
          </div>
          <div class="ghost-sum-result-panel ghost-multiply-result-panel">
            <div class="ghost-sum-tray">
              <div class="ghost-tray-toolbar"><button class="ghost-clear-button" type="button" data-action="ghost-tray-clear" ${state.movedGhosts.length ? "" : "disabled"}>Limpiar</button></div>
              <div class="ghost-tray-grid ghost-multiply-tray-grid" style="--group-count: ${exercise.groupCount}; --group-size: ${exercise.groupSize}; --tray-token-size: ${trayTokenSize}px">${movedGroups || `<span class="ghost-tray-hint">Tocá los fantasmas</span>`}</div>
            </div>
            <div class="ghost-sum-answer-area">
              <span>Resultado</span>
              <button class="ghost-sum-answer-slot ${answerStatus}" type="button" data-action="ghost-sum-answer-slot" aria-label="Espacio para el resultado">${state.selectedAnswer ?? "?"}</button>
            </div>
          </div>
        </div>
        <div class="ghost-sum-options-area">
          <span>Arrastrá o tocá una respuesta</span>
          <div class="ghost-sum-answer-options">${options}</div>
        </div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${escapeHtml(feedbackMessage)}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="check-ghost-sum" ${ready && !state.checked ? "" : "disabled"}>${icon("check")}Verificar resultado</button>
      </div>
      ${state.helpOpen ? renderMultiplicationHelp(exercise, state) : ""}
    </section>
  `);
}

function renderAnimalSoundRunner(exercise) {
  const state = session.animalSounds[exercise.id];
  const selectedAnimal = exercise.options.find((animal) => animal.id === state.selectedAnimalId) || null;
  const ready = selectedAnimal && !state.checked;
  const targetStatus = state.checked ? (state.isCorrect ? "is-correct" : "is-wrong") : selectedAnimal ? "has-answer" : "";
  const options = exercise.options
    .map((animal) => {
      const selected = state.selectedAnimalId === animal.id;
      const checkedStatus = state.checked && selected ? (state.isCorrect ? "is-correct" : "is-wrong") : "";
      return `
        <button class="animal-sound-option ${selected ? "is-selected" : ""} ${checkedStatus}" type="button" draggable="true" data-action="animal-sound-option" data-animal="${escapeHtml(animal.id)}" ${selected ? "disabled" : ""} aria-label="${escapeHtml(animal.label)}">
          <span class="animal-sound-option-visual" aria-hidden="true">${escapeHtml(animal.visual)}</span>
          <strong>${escapeHtml(animal.label)}</strong>
        </button>
      `;
    })
    .join("");
  const feedbackMessage = state.message || (selectedAnimal ? "Ya podés verificar tu respuesta." : "Tocá o arrastrá un animal hasta el cuadro.");
  const feedbackClass = state.checked && state.isCorrect ? "good" : state.checked ? "bad" : "wait";

  renderShell(`
    <section class="runner matching-runner animal-sound-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${session.exercises.length}</span><span>Lengua</span></div>
      </div>
      <article class="question-panel animal-sound-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <button class="animal-sound-target ${targetStatus}" type="button" data-action="animal-sound-slot" aria-label="${escapeHtml(exercise.sound)}. Espacio para colocar el animal">
          <span class="animal-sound-word">${escapeHtml(exercise.sound)}</span>
          <span class="animal-sound-target-answer">
            ${selectedAnimal ? `<span class="animal-sound-target-visual" aria-hidden="true">${escapeHtml(selectedAnimal.visual)}</span><strong>${escapeHtml(selectedAnimal.label)}</strong>` : ""}
          </span>
        </button>
        <div class="animal-sound-options" aria-label="Animales para elegir">${options}</div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${escapeHtml(feedbackMessage)}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="check-animal-sound" ${ready ? "" : "disabled"}>${icon("check")}Verificar resultado</button>
      </div>
    </section>
  `);
}

function renderRhymePuzzleRunner(exercise) {
  const state = session.rhymePuzzles[exercise.id];
  const selectedWord = exercise.options.find((word) => word.id === state.selectedWordId) || null;
  const ready = selectedWord && !state.checked;
  const targetStatus = state.checked ? (state.isCorrect ? "is-correct" : "is-wrong") : selectedWord ? "has-answer" : "";
  const options = exercise.options
    .map((word) => {
      const selected = state.selectedWordId === word.id;
      const checkedStatus = state.checked && selected ? (state.isCorrect ? "is-correct" : "is-wrong") : "";
      return `
        <button class="rhyme-option ${selected ? "is-selected" : ""} ${checkedStatus}" type="button" draggable="true" data-action="rhyme-option" data-word="${escapeHtml(word.id)}" ${selected ? "disabled" : ""} aria-label="${escapeHtml(word.label)}">
          <span class="rhyme-word-visual rhyme-word-${escapeHtml(word.id)}" aria-hidden="true">${escapeHtml(word.visual)}</span>
          <strong>${escapeHtml(word.label)}</strong>
        </button>
      `;
    })
    .join("");
  const feedbackMessage = state.message || (selectedWord ? "Las piezas están listas para verificar." : "Tocá o arrastrá la pieza que rima.");
  const feedbackClass = state.checked && state.isCorrect ? "good" : state.checked ? "bad" : "wait";

  renderShell(`
    <section class="runner matching-runner rhyme-puzzle-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${session.exercises.length}</span><span>Lengua</span></div>
      </div>
      <article class="question-panel rhyme-puzzle-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <div class="rhyme-puzzle-join ${selectedWord ? "is-joined" : ""}">
          <div class="rhyme-puzzle-piece rhyme-source-piece">
            <span class="rhyme-word-visual rhyme-word-${escapeHtml(exercise.sourceWord.id)}" aria-hidden="true">${escapeHtml(exercise.sourceWord.visual)}</span>
            <strong>${escapeHtml(exercise.sourceWord.label)}</strong>
          </div>
          <button class="rhyme-puzzle-piece rhyme-target-piece ${targetStatus}" type="button" data-action="rhyme-slot" aria-label="Espacio para la palabra que rima con ${escapeHtml(exercise.sourceWord.label)}">
            ${selectedWord ? `<span class="rhyme-word-visual rhyme-word-${escapeHtml(selectedWord.id)}" aria-hidden="true">${escapeHtml(selectedWord.visual)}</span><strong>${escapeHtml(selectedWord.label)}</strong>` : `<span class="rhyme-piece-empty" aria-hidden="true">?</span>`}
          </button>
        </div>
        <div class="rhyme-options" aria-label="Piezas para elegir">${options}</div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${escapeHtml(feedbackMessage)}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="check-rhyme" ${ready ? "" : "disabled"}>${icon("check")}Verificar resultado</button>
      </div>
    </section>
  `);
}

function renderPlantDiagram(exercise, state, learning) {
  const partsById = new Map(exercise.parts.map((part) => [part.id, part]));
  const slots = exercise.parts
    .map((part) => {
      const placedId = state?.placements?.[part.position];
      const placedPart = placedId ? partsById.get(placedId) : null;
      const status = state?.checked ? (placedPart?.id === part.id ? "is-correct" : placedPart ? "is-wrong" : "") : "";
      return learning
        ? ""
        : `<button class="plant-drop-slot plant-slot-${part.position} ${placedPart ? "has-answer" : ""} ${status}" type="button" data-action="plant-slot" data-position="${escapeHtml(part.position)}" aria-label="Ubicación para una parte de la planta">${placedPart ? escapeHtml(placedPart.label) : "Soltá aquí"}</button>`;
    })
    .join("");
  const pointers = learning
    ? ""
    : `<span class="plant-pointer plant-pointer-flower" aria-hidden="true">→</span><span class="plant-pointer plant-pointer-stem" aria-hidden="true">←</span><span class="plant-pointer plant-pointer-leaf" aria-hidden="true">→</span><span class="plant-pointer plant-pointer-root" aria-hidden="true">←</span>`;
  return `<div class="plant-diagram ${learning ? "is-learning" : "is-activity"}"><img class="plant-reference-image" src="./assets/plantas-partes-${learning ? "ejemplo.jpeg" : "actividad.png"}" alt="${learning ? "Planta con sus partes señaladas" : "Planta sin nombres para completar"}" />${pointers}${slots}</div>`;
}

function renderPlantLearningRunner(exercise, state) {
  renderShell(`
    <section class="runner matching-runner plant-runner">
      <div class="matching-session-bar"><button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button><div class="matching-session-status"><span>Aprendemos</span><span>Planta</span></div></div>
      <article class="question-panel plant-learning-panel">
        <p class="question-text">Conocé las partes de una planta</p>
        ${renderPlantDiagram(exercise, state, true)}
        <div class="plant-learning-legend"><span><strong>Raíz</strong> absorbe agua</span><span><strong>Tallo</strong> sostiene</span><span><strong>Hoja</strong> recibe luz</span><span><strong>Flor</strong> forma semillas</span></div>
      </article>
      <div class="answer-actions"><button class="btn btn-primary" type="button" data-action="plant-start">${icon("play")}Empezar actividad</button></div>
    </section>
  `);
}

function renderPlantLabelingRunner(exercise) {
  const state = session.plantLabeling[exercise.id];
  const complete = Object.keys(state.placements).length === exercise.parts.length;
  const partsById = new Map(exercise.parts.map((part) => [part.id, part]));
  const labels = state.labelOrder
    .map((id) => {
      const part = partsById.get(id);
      const isPlaced = Object.values(state.placements).includes(id);
      return `<button class="plant-label-chip ${isPlaced ? "is-placed" : ""}" type="button" draggable="true" data-action="plant-label" data-label="${escapeHtml(id)}" ${isPlaced ? "disabled" : ""}>${escapeHtml(part.label)}</button>`;
    })
    .join("");
  const feedbackClass = state.checked && state.isCorrect ? "good" : state.checked ? "bad" : "wait";
  const feedbackMessage = state.message || (complete ? "Ya completaste todas las partes." : "Arrastrá cada palabra a la parte correspondiente.");
  renderShell(`
    <section class="runner matching-runner plant-runner">
      <div class="matching-session-bar"><button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button><div class="matching-session-status"><span>Actividad</span><span>Planta</span></div></div>
      <article class="question-panel plant-activity-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        ${renderPlantDiagram(exercise, state, false)}
        <div class="plant-labels" aria-label="Palabras para arrastrar">${labels}</div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${feedbackMessage}</div>
      </article>
      <div class="answer-actions"><button class="btn btn-primary" type="button" data-action="check-plant" ${complete && !state.checked ? "" : "disabled"}>${icon("check")}Verificar resultados</button></div>
    </section>
  `);
}

function renderSoundGalleryRunner(exercise) {
  const selectedItem = exercise.items.find((item) => item.id === session.soundGalleryItemId);
  const galleryItems = exercise.items
    .map(
      (item) => `
        <button class="sound-gallery-card" type="button" data-action="sound-gallery-show" data-item="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.label)}">
          <span class="sound-gallery-card-visual" aria-hidden="true">${escapeHtml(item.visual)}</span>
          <span>${escapeHtml(item.label)}</span>
        </button>
      `
    )
    .join("");

  renderShell(`
    <section class="runner matching-runner sound-gallery-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status">
          <span>${exercise.items.length} sonidos</span>
          <span>Actividad</span>
        </div>
      </div>
      <article class="question-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <div class="sound-gallery-grid" aria-label="Dibujos y sonidos">${galleryItems}</div>
      </article>
    </section>
    ${
      selectedItem
        ? `
          <section class="sound-gallery-presentation" role="dialog" aria-modal="true" aria-label="${escapeHtml(selectedItem.label)}: ${escapeHtml(selectedItem.sound)}">
            <button class="presentation-close" type="button" data-action="sound-gallery-close" aria-label="Cerrar">${icon("x")}</button>
            <div class="sound-gallery-presentation-content">
              <span class="sound-gallery-presentation-visual" aria-hidden="true">${escapeHtml(selectedItem.visual)}</span>
              <div>
                <p class="sound-gallery-presentation-name">${escapeHtml(selectedItem.label)}</p>
                <p class="sound-gallery-presentation-sound">${escapeHtml(selectedItem.sound)}</p>
              </div>
            </div>
          </section>
        `
        : ""
    }
  `);
}

function renderEnglishVocabularyVisual(option, mode) {
  if (mode === "colors") {
    return `
      <svg class="english-color-pencil" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M25 88 78 35l18 18-53 53-25 7z" fill="${escapeHtml(option.color)}" stroke="#25313a" stroke-width="4" stroke-linejoin="round"/>
        <path d="m78 35 9-9c4-4 10-4 14 0l4 4c4 4 4 10 0 14l-9 9z" fill="#f2b6aa" stroke="#25313a" stroke-width="4"/>
        <path d="m18 113 7-25 18 18z" fill="#f2d49b" stroke="#25313a" stroke-width="4" stroke-linejoin="round"/>
      </svg>
    `;
  }
  if (mode === "supplies") {
    return `<img class="english-supply-image" src="./${escapeHtml(option.image)}" alt="" />`;
  }
  const dots = Array.from({ length: option.value }, (_, index) => `<span aria-hidden="true" class="english-number-dot dot-${(index % 4) + 1}"></span>`).join("");
  return `<span class="english-number-quantity" aria-hidden="true">${dots}</span>`;
}

function renderEnglishVocabularyRunner(exercise) {
  const state = session.englishVocabulary[exercise.id];
  if (!state) return;
  const total = session.exercises.length;
  const feedbackClass = state.answered ? (state.isCorrect ? "good" : "bad") : "wait";
  const feedbackMessage = state.message || (VOICE_PLAYBACK_ENABLED ? "Escuchá la palabra y tocá la opción correcta." : "Mirá la palabra y tocá la opción correcta.");
  const options = exercise.options
    .map((option) => {
      const selected = state.selectedId === option.id;
      const status = selected && state.answered ? (state.isCorrect ? "is-correct" : "is-wrong") : "";
      return `
        <button class="english-vocabulary-option ${status}" type="button" data-action="english-vocabulary-answer" data-option="${escapeHtml(option.id)}" ${state.answered ? "disabled" : ""} aria-label="${escapeHtml(option.label)}">
          ${renderEnglishVocabularyVisual(option, exercise.mode)}
        </button>
      `;
    })
    .join("");

  renderShell(`
    <section class="runner matching-runner english-vocabulary-runner english-${escapeHtml(exercise.mode)}-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${total}</span><span>Inglés</span></div>
      </div>
      <article class="question-panel english-vocabulary-panel">
        <div class="english-word-prompt ${VOICE_PLAYBACK_ENABLED ? "" : "voice-playback-disabled"}">
          <span class="english-touch-label">${escapeHtml(exercise.prompt)}</span>
          <strong>${escapeHtml(exercise.word).toUpperCase()}</strong>
          ${
            VOICE_PLAYBACK_ENABLED
              ? `<button class="english-audio-button" type="button" data-action="english-vocabulary-audio" aria-label="Escuchar ${escapeHtml(exercise.word)}">${icon("speaker")}<span>Escuchar</span></button>`
              : ""
          }
        </div>
        <div class="english-vocabulary-options english-options-${escapeHtml(exercise.mode)}" aria-label="Opciones">${options}</div>
        <div class="feedback ${feedbackClass}" aria-live="polite">${state.isCorrect ? icon("check") : state.answered ? icon("x") : ""}${escapeHtml(feedbackMessage)}</div>
      </article>
    </section>
  `);
}

function renderCircleGeometryLearning() {
  renderShell(`
    <section class="runner matching-runner circle-geometry-runner circle-learning-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>Antes de empezar</span><span>Matemáticas</span></div>
      </div>
      <article class="question-panel circle-learning-panel">
        <div class="circle-learning-title">
          <span>Recordemos</span>
          <h2>Círculo y circunferencia</h2>
        </div>
        <div class="circle-concept-grid">
          <section class="circle-concept-card circle-concept-disk">
            <svg viewBox="0 0 240 170" role="img" aria-label="Un círculo con el borde y el interior claramente coloreados">
              <circle cx="120" cy="82" r="62" fill="#168aad" stroke="#073b4c" stroke-width="9" />
              <text x="120" y="89" text-anchor="middle" fill="#ffffff" font-size="20" font-weight="900">INTERIOR</text>
            </svg>
            <div><strong>Círculo</strong><span class="circle-equation">BORDE + INTERIOR</span><span>Toda la superficie forma parte.</span></div>
          </section>
          <section class="circle-concept-card circle-concept-line">
            <svg viewBox="0 0 240 170" role="img" aria-label="Una circunferencia formada solamente por un borde fuerte">
              <circle cx="120" cy="82" r="62" fill="#ffffff" stroke="#ef476f" stroke-width="11" />
              <text x="120" y="89" text-anchor="middle" fill="#7b8790" font-size="18" font-weight="800">VACÍO</text>
            </svg>
            <div><strong>Circunferencia</strong><span class="circle-equation">SOLO BORDE</span><span>El interior no pertenece.</span></div>
          </section>
        </div>
        <div class="circle-learning-rule">
          <span class="circle-rule-eye" aria-hidden="true">👀</span>
          <p>No importa el color ni el tamaño. Pensá siempre: <strong>¿tiene interior o es solamente el borde?</strong></p>
        </div>
        <button class="btn btn-primary circle-start-button" type="button" data-action="circle-geometry-start">${icon("play")}Empezar los desafíos</button>
      </article>
    </section>
  `);
}

function renderCircleMiniShape(kind, color) {
  const shape =
    kind === "disk"
      ? `<circle cx="70" cy="58" r="42" fill="${escapeHtml(color)}" stroke="#25313a" stroke-width="6" />`
      : kind === "outline"
        ? `<circle cx="70" cy="58" r="42" fill="#ffffff" stroke="${escapeHtml(color)}" stroke-width="8" />`
        : kind === "arc"
          ? `<path d="M31 75 A44 44 0 1 1 102 87" fill="none" stroke="${escapeHtml(color)}" stroke-width="8" stroke-linecap="round" />`
          : `<ellipse cx="70" cy="58" rx="49" ry="31" fill="${escapeHtml(color)}" stroke="#25313a" stroke-width="6" />`;
  return `<svg class="circle-mini-shape" viewBox="0 0 140 116" aria-hidden="true">${shape}</svg>`;
}

function renderCircleHighlightedObject(exercise) {
  const highlight = "#d81b60";
  let drawing = "";
  if (exercise.objectKind === "galletita") {
    drawing = `<circle cx="250" cy="128" r="82" fill="#d99a54" stroke="#7a431d" stroke-width="8"/><circle cx="250" cy="128" r="72" fill="${highlight}" opacity="0.3"/><g fill="#603419"><circle cx="220" cy="95" r="8"/><circle cx="276" cy="87" r="7"/><circle cx="292" cy="136" r="9"/><circle cx="236" cy="154" r="7"/><circle cx="204" cy="137" r="6"/><circle cx="270" cy="169" r="6"/></g>`;
  } else if (exercise.objectKind === "aro") {
    drawing = `<circle cx="250" cy="128" r="84" fill="none" stroke="#ffe0ea" stroke-width="20"/><circle cx="250" cy="128" r="84" fill="none" stroke="${highlight}" stroke-width="12"/>`;
  } else if (exercise.objectKind === "moneda") {
    drawing = `<circle cx="250" cy="128" r="82" fill="#f6c453" stroke="#9c6b12" stroke-width="9"/><circle cx="250" cy="128" r="68" fill="${highlight}" opacity="0.28"/><text x="250" y="143" text-anchor="middle" fill="#8c5b0a" font-size="48" font-weight="900">$</text>`;
  } else if (exercise.objectKind === "plato-borde") {
    drawing = `<circle cx="250" cy="128" r="88" fill="#e6f3ff" stroke="#6f91ad" stroke-width="6"/><circle cx="250" cy="128" r="61" fill="#ffffff" stroke="#b7ccdd" stroke-width="4"/><circle cx="250" cy="128" r="84" fill="none" stroke="${highlight}" stroke-width="12"/>`;
  } else if (exercise.objectKind === "cartel") {
    drawing = `<path d="M250 202v48" stroke="#59636b" stroke-width="14"/><circle cx="250" cy="116" r="78" fill="${highlight}" stroke="#8f123e" stroke-width="9"/><rect x="205" y="103" width="90" height="25" rx="6" fill="#ffffff"/>`;
  } else if (exercise.objectKind === "pulsera") {
    drawing = `<circle cx="250" cy="128" r="79" fill="none" stroke="#f2b6cc" stroke-width="22"/><circle cx="250" cy="128" r="79" fill="none" stroke="${highlight}" stroke-width="11" stroke-dasharray="22 5"/>`;
  } else if (exercise.objectKind === "pizza") {
    drawing = `<circle cx="250" cy="128" r="84" fill="#f7c85f" stroke="#ad6528" stroke-width="10"/><path d="M250 44v168M166 128h168M191 69l118 118M309 69 191 187" stroke="#d38b32" stroke-width="4"/><g fill="#c83c3c"><circle cx="220" cy="92" r="9"/><circle cx="283" cy="101" r="9"/><circle cx="214" cy="154" r="9"/><circle cx="283" cy="164" r="9"/></g><circle cx="250" cy="128" r="76" fill="${highlight}" opacity="0.2"/>`;
  } else if (exercise.objectKind === "reloj-borde" || exercise.objectKind === "reloj-cara") {
    const faceHighlight = exercise.objectKind === "reloj-cara" ? `<circle cx="250" cy="128" r="70" fill="${highlight}" opacity="0.3"/>` : "";
    const rimHighlight = exercise.objectKind === "reloj-borde" ? `<circle cx="250" cy="128" r="83" fill="none" stroke="${highlight}" stroke-width="12"/>` : "";
    drawing = `<circle cx="250" cy="128" r="86" fill="#fff9e7" stroke="#52616b" stroke-width="8"/>${faceHighlight}<path d="M250 128V78M250 128l38 24" stroke="#25313a" stroke-width="8" stroke-linecap="round"/>${rimHighlight}`;
  } else if (exercise.objectKind === "rueda-borde") {
    drawing = `<circle cx="250" cy="128" r="84" fill="none" stroke="#4d5961" stroke-width="13"/><g stroke="#87939b" stroke-width="5"><path d="M250 44v168M166 128h168M191 69l118 118M309 69 191 187"/></g><circle cx="250" cy="128" r="13" fill="#4d5961"/><circle cx="250" cy="128" r="84" fill="none" stroke="${highlight}" stroke-width="7"/>`;
  } else if (exercise.objectKind === "plato-cara") {
    drawing = `<circle cx="250" cy="128" r="88" fill="#e6f3ff" stroke="#6f91ad" stroke-width="7"/><circle cx="250" cy="128" r="62" fill="${highlight}" opacity="0.42" stroke="#b7ccdd" stroke-width="4"/>`;
  } else {
    drawing = `<path d="M250 44c49 0 86 34 86 81 0 50-38 87-86 87s-86-37-86-87c0-47 37-81 86-81Z" fill="none" stroke="${highlight}" stroke-width="12" stroke-linecap="round"/>`;
  }
  return `
    <div class="circle-object-scene">
      <svg class="circle-geometry-diagram" viewBox="0 0 500 270" role="img" aria-label="Parte destacada en color rosa: ${escapeHtml(exercise.objectLabel)}">
        <rect x="3" y="3" width="494" height="264" rx="22" fill="#fffef9" stroke="#e6dfcf" stroke-width="4" />
        ${drawing}
      </svg>
      <strong class="circle-object-label"><span aria-hidden="true"></span>${escapeHtml(exercise.objectLabel)}</strong>
    </div>
  `;
}

function renderCircleGeometryScene(exercise, state) {
  if (exercise.challengeType === "highlight") return renderCircleHighlightedObject(exercise);
  const transformed = exercise.challengeType === "transform" && state.answered;
  const displayedConcept =
    exercise.challengeType === "transform" && !transformed
      ? exercise.concept === "circle"
        ? "circumference"
        : "circle"
      : exercise.concept;
  const radius = 72 + (exercise.variant % 3) * 9;
  const centerX = 250 + [-22, 0, 20][exercise.variant % 3];
  const fill = displayedConcept === "circle" ? exercise.fill : "#ffffff";
  const status = transformed
    ? `<g><rect x="160" y="224" width="180" height="34" rx="17" fill="#e4f5e9"/><text x="250" y="247" text-anchor="middle" fill="#237047" font-size="18" font-weight="900">AHORA: ${escapeHtml(CIRCLE_GEOMETRY_CATEGORIES[displayedConcept].label.toUpperCase())}</text></g>`
    : "";
  return `
    <svg class="circle-geometry-diagram" viewBox="0 0 500 280" role="img" aria-label="Figura redonda para observar">
      <rect x="3" y="3" width="494" height="274" rx="22" fill="#fffef9" stroke="#e6dfcf" stroke-width="4" />
      <circle cx="${centerX}" cy="130" r="${radius}" fill="${escapeHtml(fill)}" stroke="#25313a" stroke-width="9" />
      ${displayedConcept === "circle" ? `<circle cx="${centerX - 26}" cy="104" r="10" fill="#ffffff" opacity="0.3"/>` : ""}
      ${status}
    </svg>
  `;
}

function renderCircleAnswerIcon(optionId) {
  if (optionId === "circle") return `<span class="circle-answer-symbol is-disk" aria-hidden="true"></span>`;
  if (optionId === "circumference") return `<span class="circle-answer-symbol is-outline" aria-hidden="true"></span>`;
  if (optionId === "fill") {
    return `<svg class="circle-tool-icon" viewBox="0 0 70 70" aria-hidden="true"><circle cx="35" cy="35" r="25" fill="#168aad" stroke="#25313a" stroke-width="5"/><path d="m18 54 10-10" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/></svg>`;
  }
  return `<svg class="circle-tool-icon" viewBox="0 0 70 70" aria-hidden="true"><circle cx="35" cy="35" r="25" fill="#ffffff" stroke="#25313a" stroke-width="5"/><path d="m17 53 36-36" stroke="#ef476f" stroke-width="7" stroke-linecap="round"/></svg>`;
}

function renderCircleGeometryRunner(exercise) {
  const state = session.circleGeometry[exercise.id];
  if (!state) return;
  const total = session.exercises.length;
  const options = exercise.options
    .map((option) => {
      const selected = state.selectedId === option.id;
      const status = selected && state.answered ? (state.isCorrect ? "is-correct" : "is-wrong") : "";
      if (exercise.challengeType === "find") {
        return `
          <button class="circle-find-option ${status}" type="button" data-action="circle-geometry-answer" data-option="${escapeHtml(option.id)}" ${state.answered ? "disabled" : ""} aria-label="${escapeHtml(option.label)}">
            ${renderCircleMiniShape(option.visualKind, exercise.fill)}
          </button>
        `;
      }
      return `
        <button class="circle-geometry-option ${status}" type="button" data-action="circle-geometry-answer" data-option="${escapeHtml(option.id)}" ${state.answered ? "disabled" : ""}>
          ${renderCircleAnswerIcon(option.id)}
          <strong>${escapeHtml(option.label)}</strong>
        </button>
      `;
    })
    .join("");
  const feedbackClass = state.answered ? (state.isCorrect ? "good" : "bad") : "wait";
  const instructions = {
    classify: "Observá si la figura tiene interior o si es solamente el borde.",
    highlight: "Mirá solamente la parte rosa señalada en el objeto.",
    transform: "Pensá qué cambio necesita la figura.",
    find: "Usá la definición; no el color ni la posición."
  };
  const challengeLabels = {
    classify: "Clasificar",
    highlight: "Parte señalada",
    transform: "Transformar",
    find: "Buscar por definición"
  };
  const feedbackMessage = state.message || instructions[exercise.challengeType];
  const activityContent =
    exercise.challengeType === "find"
      ? `<div class="circle-find-grid" aria-label="Figuras para elegir">${options}</div>`
      : `<div class="circle-question-layout">
          <div class="circle-diagram-wrap">${renderCircleGeometryScene(exercise, state)}</div>
          <div class="circle-geometry-options" aria-label="Elegí una respuesta">${options}</div>
        </div>`;

  renderShell(`
    <section class="runner matching-runner circle-geometry-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${total}</span><span>Matemáticas</span></div>
      </div>
      <article class="question-panel circle-geometry-panel">
        <div class="circle-question-heading"><span>${escapeHtml(challengeLabels[exercise.challengeType])}</span><h2 class="circle-question-title">${escapeHtml(exercise.prompt)}</h2></div>
        ${activityContent}
        <div class="feedback ${feedbackClass}" aria-live="polite">${state.isCorrect ? icon("check") : state.answered ? icon("x") : ""}${escapeHtml(feedbackMessage)}</div>
      </article>
    </section>
  `);
}

function pacmanPolarPoint(cx, cy, radius, angle) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function pacmanArcPath(cx, cy, radius, degrees, orientation = 0) {
  if (degrees >= 359.5) {
    const start = pacmanPolarPoint(cx, cy, radius, orientation);
    const opposite = pacmanPolarPoint(cx, cy, radius, orientation + 180);
    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 1 1 ${opposite.x.toFixed(2)} ${opposite.y.toFixed(2)} A ${radius} ${radius} 0 1 1 ${start.x.toFixed(2)} ${start.y.toFixed(2)}`;
  }
  const safeDegrees = Math.max(0.1, degrees);
  const startAngle = orientation - safeDegrees / 2;
  const endAngle = orientation + safeDegrees / 2;
  const start = pacmanPolarPoint(cx, cy, radius, startAngle);
  const end = pacmanPolarPoint(cx, cy, radius, endAngle);
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${safeDegrees > 180 ? 1 : 0} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function pacmanSectorPath(cx, cy, radius, degrees, orientation = 0) {
  if (degrees >= 359.5) return pacmanArcPath(cx, cy, radius, 360, orientation);
  const safeDegrees = Math.max(0.1, degrees);
  const startAngle = orientation - safeDegrees / 2;
  const endAngle = orientation + safeDegrees / 2;
  const start = pacmanPolarPoint(cx, cy, radius, startAngle);
  const end = pacmanPolarPoint(cx, cy, radius, endAngle);
  return `M ${cx} ${cy} L ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${safeDegrees > 180 ? 1 : 0} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`;
}

function pacmanFigureGeometry(degrees, orientation = 0, radius = 104) {
  const orientationRadians = (orientation * Math.PI) / 180;
  const runwayOffset = 58;
  const cx = 220 - Math.cos(orientationRadians) * runwayOffset;
  const cy = 150 - Math.sin(orientationRadians) * runwayOffset;
  const firstRay = pacmanPolarPoint(cx, cy, radius + 3, orientation - degrees / 2);
  const secondRay = pacmanPolarPoint(cx, cy, radius + 3, orientation + degrees / 2);
  return {
    cx,
    cy,
    radius,
    mouthPath: pacmanSectorPath(cx, cy, radius + 5, degrees, orientation),
    arcPath: pacmanArcPath(cx, cy, Math.max(37, radius * 0.56), degrees, orientation),
    firstRay,
    secondRay,
    eye: pacmanPolarPoint(cx, cy, radius * 0.48, orientation - 92)
  };
}

function renderPacmanAngleFigure(degrees, { orientation = 0, radius = 104, guideDegrees = null } = {}) {
  const geometry = pacmanFigureGeometry(degrees, orientation, radius);
  const snackPoints = [radius + 32, radius + 68, radius + 104].map((distance) =>
    pacmanPolarPoint(geometry.cx, geometry.cy, distance, orientation)
  );
  const guidePath = guideDegrees === null
    ? ""
    : `<path class="pacman-target-guide" d="${pacmanArcPath(geometry.cx, geometry.cy, radius * 0.72, guideDegrees, orientation)}" />`;
  return `
    <div class="pacman-figure-wrap">
      <svg class="pacman-angle-figure" viewBox="0 0 470 300" role="img" aria-label="Pac-Man con una abertura de ${Math.round(degrees)} grados">
        <g class="pacman-hero">
          <circle cx="${geometry.cx}" cy="${geometry.cy}" r="${radius}" fill="#ffd60a" stroke="#2c2b25" stroke-width="7" />
          <path data-role="pacman-mouth" d="${geometry.mouthPath}" fill="#fffdf7" />
          <line data-role="pacman-ray-a" x1="${geometry.cx}" y1="${geometry.cy}" x2="${geometry.firstRay.x}" y2="${geometry.firstRay.y}" class="pacman-angle-ray" />
          <line data-role="pacman-ray-b" x1="${geometry.cx}" y1="${geometry.cy}" x2="${geometry.secondRay.x}" y2="${geometry.secondRay.y}" class="pacman-angle-ray" />
          <path data-role="pacman-angle-arc" d="${geometry.arcPath}" class="pacman-angle-arc" />
          ${guidePath}
          <circle class="pacman-eye" cx="${geometry.eye.x}" cy="${geometry.eye.y}" r="11" fill="#25262b" />
          <circle cx="${geometry.eye.x - 3}" cy="${geometry.eye.y - 4}" r="3" fill="#ffffff" />
        </g>
        <g class="pacman-snack-row" aria-hidden="true">
          <g transform="translate(${snackPoints[0].x.toFixed(2)} ${snackPoints[0].y.toFixed(2)})"><g class="pacman-snack-ghost">
              <path d="M-12 13V-2a12 12 0 0 1 24 0v15l-6-5-6 5-6-5-6 5Z" fill="#ef476f" />
              <circle cx="-4" cy="-3" r="3" fill="#fff" /><circle cx="5" cy="-3" r="3" fill="#fff" />
              <circle cx="-3" cy="-3" r="1.4" fill="#24343a" /><circle cx="6" cy="-3" r="1.4" fill="#24343a" />
            </g>
          </g>
          <g transform="translate(${snackPoints[1].x.toFixed(2)} ${snackPoints[1].y.toFixed(2)})"><g class="pacman-snack-ghost">
              <path d="M-12 13V-2a12 12 0 0 1 24 0v15l-6-5-6 5-6-5-6 5Z" fill="#40c7d9" />
              <circle cx="-4" cy="-3" r="3" fill="#fff" /><circle cx="5" cy="-3" r="3" fill="#fff" />
              <circle cx="-3" cy="-3" r="1.4" fill="#24343a" /><circle cx="6" cy="-3" r="1.4" fill="#24343a" />
            </g>
          </g>
          <g transform="translate(${snackPoints[2].x.toFixed(2)} ${snackPoints[2].y.toFixed(2)})"><g class="pacman-snack-ghost">
              <path d="M-12 13V-2a12 12 0 0 1 24 0v15l-6-5-6 5-6-5-6 5Z" fill="#f4a261" />
              <circle cx="-4" cy="-3" r="3" fill="#fff" /><circle cx="5" cy="-3" r="3" fill="#fff" />
              <circle cx="-3" cy="-3" r="1.4" fill="#24343a" /><circle cx="6" cy="-3" r="1.4" fill="#24343a" />
            </g>
          </g>
        </g>
      </svg>
      <span class="pacman-right-benchmark" aria-label="Ángulo recto de referencia"><i></i><strong>90°</strong></span>
    </div>
  `;
}

function renderPacmanAngleGlyph(categoryId) {
  const category = PACMAN_ANGLE_CATEGORIES[categoryId];
  if (!category) return "";
  const degrees = category.degrees;
  const cx = 45;
  const cy = 45;
  const radius = 29;
  const first = pacmanPolarPoint(cx, cy, radius, -degrees / 2);
  const second = pacmanPolarPoint(cx, cy, radius, degrees / 2);
  return `
    <svg class="pacman-angle-glyph" viewBox="0 0 90 90" aria-hidden="true">
      <line x1="${cx}" y1="${cy}" x2="${first.x}" y2="${first.y}" />
      <line x1="${cx}" y1="${cy}" x2="${second.x}" y2="${second.y}" />
      <path d="${pacmanArcPath(cx, cy, 20, degrees)}" />
      <circle cx="${cx}" cy="${cy}" r="4" />
    </svg>
  `;
}

function renderPacmanClassify(exercise, state, round) {
  const options = round.options.map((categoryId) => {
    const category = PACMAN_ANGLE_CATEGORIES[categoryId];
    const optionState = state.answered && categoryId === round.category
      ? "is-correct"
      : state.wrongId === categoryId
        ? "is-wrong"
        : "";
    return `
      <button class="pacman-choice ${optionState}" type="button" data-action="pacman-angle-answer" data-value="${categoryId}" ${state.answered || state.wrongId ? "disabled" : ""}>
        ${renderPacmanAngleGlyph(categoryId)}
        <strong>${escapeHtml(category.label)}</strong>
      </button>
    `;
  }).join("");
  return `
    <div class="pacman-stage-layout">
      ${renderPacmanAngleFigure(round.degrees, { orientation: round.orientation, radius: round.radius })}
      <div class="pacman-choice-grid" aria-label="Tipos de ángulo">${options}</div>
    </div>
  `;
}

function renderPacmanCompareFigure(degrees) {
  const cx = 105;
  const cy = 100;
  const radius = 72;
  const first = pacmanPolarPoint(cx, cy, radius, -degrees / 2);
  const second = pacmanPolarPoint(cx, cy, radius, degrees / 2);
  return `<svg class="pacman-compare-figure" viewBox="0 0 210 200" aria-hidden="true">
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#ffd60a" stroke="#25262b" stroke-width="6" />
    <path d="${pacmanSectorPath(cx, cy, radius + 3, degrees)}" fill="#fffdf7" />
    <line x1="${cx}" y1="${cy}" x2="${first.x}" y2="${first.y}" class="pacman-angle-ray" />
    <line x1="${cx}" y1="${cy}" x2="${second.x}" y2="${second.y}" class="pacman-angle-ray" />
    <path d="${pacmanArcPath(cx, cy, 41, degrees)}" class="pacman-angle-arc" />
    <circle cx="${cx - 7}" cy="${cy - 39}" r="7" fill="#25262b" />
  </svg>`;
}

function renderPacmanCompare(exercise, state, round) {
  const cards = [["A", round.degreesA], ["B", round.degreesB]].map(([id, degrees]) => {
    const status = state.answered && id === round.correctId ? "is-correct" : state.wrongId === id ? "is-wrong" : "";
    return `<button class="pacman-compare-card ${status}" type="button" data-action="pacman-angle-answer" data-value="${id}" ${state.answered || state.wrongId ? "disabled" : ""} aria-label="Pac-Man ${id}">
      <strong>${id}</strong>${renderPacmanCompareFigure(degrees)}
    </button>`;
  }).join("");
  return `<div class="pacman-compare-layout">
    <div class="pacman-compare-instruction">Los dos son ángulos agudos. Mirá cuánto se abre cada boca.</div>
    <div class="pacman-compare-cards">${cards}</div>
    <div class="pacman-compare-benchmark"><span>Referencia</span><strong>90°</strong><i></i></div>
  </div>`;
}

function renderPacmanBuild(exercise, state, round) {
  return `
    <div class="pacman-stage-layout pacman-build-layout">
      <div>
        ${renderPacmanAngleFigure(state.currentDegrees, { guideDegrees: state.showGuide ? round.degrees : null })}
        <output class="pacman-current-degrees" data-role="pacman-current-degrees">${Math.round(state.currentDegrees)}°</output>
      </div>
      <div class="pacman-build-controls">
        <div class="pacman-target-number"><strong>${round.degrees}°</strong></div>
        <input class="pacman-angle-slider" type="range" min="0" max="180" step="5" value="${state.currentDegrees}" data-action="pacman-angle-slider" aria-label="Abrir o cerrar la boca de Pac-Man" ${state.answered ? "disabled" : ""} />
        <div class="pacman-slider-labels" aria-hidden="true"><span>0°</span><span>90°</span><span>180°</span></div>
        <button class="btn btn-primary pacman-check-button" type="button" data-action="pacman-angle-check" ${state.answered ? "disabled" : ""}>${icon("check")}LISTO</button>
      </div>
    </div>
  `;
}

function renderPacmanMazeScene(round) {
  const cx = 250;
  const cy = 155;
  const radius = 100;
  const target = pacmanPolarPoint(cx, cy, radius, round.degrees);
  return `
    <div class="pacman-maze-scene">
      <svg viewBox="0 0 500 310" role="img" aria-label="Giro de Pac-Man">
        <defs>
          <marker id="pacman-turn-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#ef476f" /></marker>
        </defs>
        <path class="pacman-maze-wall" d="M40 45h110v42h78M460 265H350v-42h-76M42 265h100v-45h45M458 45H352v45h-48" />
        <circle class="pacman-maze-ring" cx="${cx}" cy="${cy}" r="${radius}" />
        <path class="pacman-turn-path" d="${pacmanArcPath(cx, cy, radius, round.degrees, 0)}" marker-end="url(#pacman-turn-arrow)" />
        <circle class="pacman-turn-center" cx="${cx}" cy="${cy}" r="7" />
        <g class="pacman-maze-player" style="transform-origin:${cx}px ${cy}px">
          <g transform="translate(${cx + radius} ${cy})">
            <circle cx="0" cy="0" r="27" fill="#ffd60a" stroke="#2c2b25" stroke-width="4" />
            <path d="M0 0 L30 -14 A31 31 0 0 1 30 14 Z" fill="#fffdf7" />
            <circle cx="-5" cy="-12" r="4" fill="#25262b" />
          </g>
        </g>
        <g class="pacman-maze-target" transform="translate(${target.x} ${target.y})">
          <circle r="15" fill="#ffffff" stroke="#ef476f" stroke-width="5" />
          <circle r="6" fill="#ef476f" />
        </g>
      </svg>
    </div>
  `;
}

function renderPacmanMaze(exercise, state, round) {
  const options = round.options.map((degrees) => {
    const optionState = state.answered && degrees === round.degrees
      ? "is-correct"
      : Number(state.wrongId) === degrees
        ? "is-wrong"
        : "";
    return `
      <button class="pacman-degree-choice ${optionState}" type="button" data-action="pacman-angle-answer" data-value="${degrees}" ${state.answered || state.wrongId !== null ? "disabled" : ""}>
        <strong>${degrees}°</strong>
      </button>
    `;
  }).join("");
  return `
    <div class="pacman-stage-layout pacman-maze-layout">
      ${renderPacmanMazeScene(round)}
      <div class="pacman-degree-grid" aria-label="Grados del giro">${options}</div>
    </div>
  `;
}

function animatePacmanAngleScreen(exercise, state, round) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.querySelector(".pacman-angle-runner");
  if (!root) return;
  gsap.from(root.querySelector(".pacman-stage-card"), { y: 18, opacity: 0, duration: 0.35, ease: "power2.out" });
  const snackGhosts = root.querySelectorAll(".pacman-snack-ghost");
  gsap.from(snackGhosts, { scale: 0, duration: 0.32, stagger: 0.08, delay: 0.12, ease: "back.out(2)" });
  if (state.wrongId !== null) {
    const wrong = root.querySelector(".is-wrong");
    if (wrong) gsap.fromTo(wrong, { x: -7 }, { x: 7, duration: 0.08, repeat: 3, yoyo: true, clearProps: "x" });
  }
  if (!state.answered) return;
  gsap.from(root.querySelector(".pacman-feedback"), { scale: 0.75, opacity: 0, duration: 0.35, ease: "back.out(1.8)" });
  if (exercise.stage === "compare") return;
  if (exercise.stage === "maze") {
    const player = root.querySelector(".pacman-maze-player");
    if (player) gsap.fromTo(player, { rotation: 0 }, { rotation: round.degrees, duration: Math.min(1.3, 0.45 + round.degrees / 420), ease: "power1.inOut" });
  } else {
    const hero = root.querySelector(".pacman-hero");
    const orientationRadians = (Number(round.orientation || 0) * Math.PI) / 180;
    const travelX = Math.cos(orientationRadians) * 105;
    const travelY = Math.sin(orientationRadians) * 105;
    gsap.killTweensOf(snackGhosts);
    const reward = gsap.timeline();
    reward.to(hero, { x: travelX, y: travelY, duration: 1.16, ease: "none" }, 0.2);
    snackGhosts.forEach((ghost, index) => {
      reward.to(ghost, { scale: 0, opacity: 0, duration: 0.16, ease: "back.in(2)" }, 0.46 + index * 0.36);
    });
  }
}

function renderPacmanAngleRunner(exercise) {
  const state = session.pacmanAngles[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round) return;
  const stageLabels = { classify: "RECONOCER", compare: "COMPARAR", build: "CONSTRUIR", maze: "USAR GIROS" };
  const content = exercise.stage === "classify"
    ? renderPacmanClassify(exercise, state, round)
    : exercise.stage === "compare"
      ? renderPacmanCompare(exercise, state, round)
    : exercise.stage === "build"
      ? renderPacmanBuild(exercise, state, round)
      : renderPacmanMaze(exercise, state, round);
  const category = PACMAN_ANGLE_CATEGORIES[round.category];
  const feedback = state.answered
    ? exercise.stage === "compare"
      ? `${icon("check")}${round.correctId === "B" ? "85° SE ABRE MÁS QUE 25°" : "25° SE ABRE MENOS QUE 85°"}`
      : `${icon("check")}${exercise.stage === "maze" ? `${round.degrees}° · ` : ""}${escapeHtml(category.label.toUpperCase())}`
    : escapeHtml(state.message || " ");
  const feedbackClass = state.answered ? "good" : state.message ? "bad" : "wait";

  renderShell(`
    <section class="runner matching-runner pacman-angle-runner pacman-${exercise.stage}-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${state.roundIndex + 1} de ${exercise.rounds.length}</span><span>${stageLabels[exercise.stage]}</span></div>
      </div>
      <article class="question-panel pacman-stage-card">
        <div class="pacman-stage-heading">
          <span>${session.index + 1} / ${session.exercises.length}</span>
          <h2>${exercise.stage === "build" ? `HACÉ ${round.degrees}°` : escapeHtml((round.prompt || exercise.prompt).toUpperCase())}</h2>
        </div>
        ${content}
        <div class="feedback pacman-feedback ${feedbackClass}" aria-live="polite">${feedback}</div>
      </article>
    </section>
  `);
  animatePacmanAngleScreen(exercise, state, round);
}

function updatePacmanAngleBuild(value) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "pacman-angle" || exercise.stage !== "build") return;
  const state = session.pacmanAngles[exercise.id];
  if (!state || state.answered) return;
  const degrees = Math.max(0, Math.min(180, Number(value) || 0));
  state.currentDegrees = degrees;
  state.showGuide = false;
  state.message = "";
  const geometry = pacmanFigureGeometry(degrees);
  const mouth = document.querySelector('[data-role="pacman-mouth"]');
  const arc = document.querySelector('[data-role="pacman-angle-arc"]');
  const firstRay = document.querySelector('[data-role="pacman-ray-a"]');
  const secondRay = document.querySelector('[data-role="pacman-ray-b"]');
  const output = document.querySelector('[data-role="pacman-current-degrees"]');
  const figure = document.querySelector(".pacman-angle-figure");
  const guide = document.querySelector(".pacman-target-guide");
  const feedback = document.querySelector(".pacman-feedback");
  mouth?.setAttribute("d", geometry.mouthPath);
  arc?.setAttribute("d", geometry.arcPath);
  firstRay?.setAttribute("x2", geometry.firstRay.x);
  firstRay?.setAttribute("y2", geometry.firstRay.y);
  secondRay?.setAttribute("x2", geometry.secondRay.x);
  secondRay?.setAttribute("y2", geometry.secondRay.y);
  if (output) output.textContent = `${Math.round(degrees)}°`;
  figure?.setAttribute("aria-label", `Pac-Man con una abertura de ${Math.round(degrees)} grados`);
  if (guide) guide.style.display = "none";
  if (feedback) {
    feedback.textContent = " ";
    feedback.className = "feedback pacman-feedback wait";
  }
}

function advancePacmanAngleRound(sessionId, exerciseId, roundIndex) {
  if (session?.id !== sessionId || session.exercises[session.index]?.id !== exerciseId) return;
  const exercise = session.exercises[session.index];
  const state = session.pacmanAngles[exerciseId];
  if (!state || state.roundIndex !== roundIndex) return;
  if (state.roundIndex + 1 < exercise.rounds.length) {
    state.roundIndex += 1;
    state.currentDegrees = exercise.rounds[state.roundIndex]?.initial ?? 90;
    state.selectedId = null;
    state.wrongId = null;
    state.answered = false;
    state.showGuide = false;
    state.message = "";
  } else {
    session.score += 1;
    session.answers.push({
      prompt: exercise.prompt,
      support: "Ángulos con Pac-Man",
      selected: `Completó los ${exercise.rounds.length} desafíos`,
      correct: `Completó los ${exercise.rounds.length} desafíos`,
      isCorrect: true,
      errors: state.errors
    });
    session.index += 1;
  }
  render();
}

function answerPacmanAngle(value) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "pacman-angle" || exercise.stage === "build") return;
  const state = session.pacmanAngles[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round || state.answered || state.wrongId !== null) return;
  const isCorrect = exercise.stage === "classify" ? value === round.category
    : exercise.stage === "compare" ? value === round.correctId
      : Number(value) === round.degrees;
  state.selectedId = value;
  if (!isCorrect) {
    state.wrongId = value;
    state.errors += 1;
    state.message = exercise.stage === "classify" ? PACMAN_ANGLE_CATEGORIES[round.category].clue
      : exercise.stage === "compare" ? round.clue : "MIRÁ EL GIRO";
    const sessionId = session.id;
    const exerciseId = exercise.id;
    const roundIndex = state.roundIndex;
    render();
    window.setTimeout(() => {
      const currentState = session?.pacmanAngles?.[exerciseId];
      if (session?.id !== sessionId || session?.exercises?.[session.index]?.id !== exerciseId || currentState?.roundIndex !== roundIndex || currentState.answered) return;
      currentState.wrongId = null;
      currentState.selectedId = null;
      currentState.message = "";
      render();
    }, 850);
    return;
  }
  state.answered = true;
  state.message = "";
  const sessionId = session.id;
  const exerciseId = exercise.id;
  const roundIndex = state.roundIndex;
  render();
  window.setTimeout(() => advancePacmanAngleRound(sessionId, exerciseId, roundIndex), exercise.stage === "maze" ? 1350 : 1500);
}

function checkPacmanAngleBuild() {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "pacman-angle" || exercise.stage !== "build") return;
  const state = session.pacmanAngles[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round || state.answered) return;
  if (Math.abs(state.currentDegrees - round.degrees) > 5) {
    state.errors += 1;
    state.showGuide = true;
    state.message = state.currentDegrees < round.degrees ? "ABRÍ MÁS" : "CERRÁ UN POCO";
    render();
    return;
  }
  state.currentDegrees = round.degrees;
  state.answered = true;
  state.showGuide = false;
  state.message = "";
  const sessionId = session.id;
  const exerciseId = exercise.id;
  const roundIndex = state.roundIndex;
  render();
  window.setTimeout(() => advancePacmanAngleRound(sessionId, exerciseId, roundIndex), 1500);
}

const GEOMETRY_QUEST_LABELS = {
  parallel: "Paralelas", perpendicular: "Perpendiculares", oblique: "Oblicuas",
  yes: "Sí", no: "No", face: "Cara", edge: "Arista", vertex: "Vértice",
  6: "6", 8: "8", 12: "12"
};

function geometryPacmanMark() {
  return '<g aria-hidden="true"><circle cx="39" cy="36" r="21" fill="#ffd60a" stroke="#2c2b25" stroke-width="3"/><path d="M39 36 59 25 A22 22 0 0 1 59 47 Z" fill="#fffdf7"/><circle cx="39" cy="23" r="2.6" fill="#2c2b25"/></g>';
}

function renderGeometryLinesScene(round, state) {
  const orientation = round.orientation || 0;
  const paths = round.type === "turn"
    ? `<line x1="105" y1="150" x2="355" y2="150" class="geometry-line-a" />
       <line data-role="geometry-moving-line" x1="105" y1="150" x2="355" y2="150" class="geometry-line-b" transform="rotate(${-state.currentDegrees} 230 150)" />
       ${state.showGuide ? `<line x1="105" y1="150" x2="355" y2="150" class="geometry-line-guide" transform="rotate(${-round.target} 230 150)" />` : ""}
       <circle cx="230" cy="150" r="9" fill="#ffd60a" stroke="#2c2b25" stroke-width="3" />`
    : `<g transform="rotate(${orientation} 230 150)">
        ${round.kind === "parallel"
          ? '<line x1="110" y1="105" x2="350" y2="105" class="geometry-line-a"/><line x1="110" y1="195" x2="350" y2="195" class="geometry-line-b"/>'
          : round.kind === "perpendicular"
            ? '<line x1="105" y1="150" x2="355" y2="150" class="geometry-line-a"/><line x1="230" y1="35" x2="230" y2="265" class="geometry-line-b"/>'
            : '<line x1="105" y1="150" x2="355" y2="150" class="geometry-line-a"/><line x1="125" y1="215" x2="335" y2="85" class="geometry-line-b"/>'}
      </g>`;
  return `<svg class="geometry-scene-svg" viewBox="0 0 460 300" role="img" aria-label="Dos rectas para observar">
    <rect x="7" y="8" width="446" height="284" rx="20" fill="#102a43"/>
    <path d="M30 77h55M370 77h62M30 235h55M370 235h62" fill="none" stroke="#277da1" stroke-width="13" stroke-linecap="round"/>
    ${paths}${geometryPacmanMark()}
    ${round.kind === "perpendicular" || (round.type === "turn" && state.answered && round.target === 90) ? '<path d="M230 150h26v-26" fill="none" stroke="#fff4a5" stroke-width="4"/>' : ""}
  </svg>`;
}

function renderGeometryRollingScene(round, state) {
  const shape = round.shape;
  let drawing = "";
  if (shape === "sphere") drawing = '<circle cx="225" cy="160" r="72" fill="#48b6f1" stroke="#175f9e" stroke-width="6"/><path d="M186 116c15-17 32-21 48-18" fill="none" stroke="#c8f4ff" stroke-width="12" stroke-linecap="round"/>';
  if (shape === "cylinder") drawing = '<path d="M135 129h170v104H135Z" fill="#47b3ed" stroke="#175f9e" stroke-width="6"/><ellipse cx="135" cy="181" rx="25" ry="52" fill="#75d2f7" stroke="#175f9e" stroke-width="6"/><ellipse cx="305" cy="181" rx="25" ry="52" fill="#248dd1" stroke="#175f9e" stroke-width="6"/>';
  if (shape === "cone") drawing = '<path d="M105 152 300 82v140Z" fill="#ffb85c" stroke="#a45a17" stroke-width="6"/><ellipse cx="300" cy="152" rx="25" ry="70" fill="#ffd18d" stroke="#a45a17" stroke-width="6"/>';
  if (shape === "cube") drawing = '<path d="M150 101h135v122H150Z" fill="#44b8e9" stroke="#175f9e" stroke-width="6"/><path d="M150 101 184 67h135l-34 34Z" fill="#87d8f4" stroke="#175f9e" stroke-width="6"/><path d="M285 101 319 67v122l-34 34Z" fill="#1885c4" stroke="#175f9e" stroke-width="6"/>';
  if (shape === "pyramid") drawing = '<path d="M217 62 123 216h195Z" fill="#ffc870" stroke="#9a611f" stroke-width="6"/><path d="M217 62 318 216l-71-16Z" fill="#f5a94f" stroke="#9a611f" stroke-width="5"/><path d="M123 216 247 200 318 216" fill="none" stroke="#9a611f" stroke-width="5"/>';
  if (shape === "prism") drawing = '<path d="M106 126h212v96H106Z" fill="#9b8eea" stroke="#51458d" stroke-width="6"/><path d="M106 126 145 87h212l-39 39Z" fill="#c2b6fa" stroke="#51458d" stroke-width="6"/><path d="M318 126 357 87v96l-39 39Z" fill="#7466c8" stroke="#51458d" stroke-width="6"/>';
  return `<svg class="geometry-scene-svg" viewBox="0 0 460 300" role="img" aria-label="${escapeHtml(round.label)} sobre un piso">
    <rect x="7" y="8" width="446" height="284" rx="20" fill="#f5fbff"/>
    <path d="M38 235h384" stroke="#72949b" stroke-width="6" stroke-linecap="round"/>
    <g class="geometry-rolling-object shape-${shape} ${state.answered && round.correctId === "yes" ? "is-rolling" : ""}">${drawing}</g>
    ${geometryPacmanMark()}
  </svg>`;
}

function renderGeometryCubeScene(round) {
  const part = round.part;
  const showVertices = part === "vertex" || part === "vertices";
  const vertices = [[85, 95], [255, 95], [255, 275], [85, 275], [145, 40], [315, 40], [315, 220], [145, 220]];
  return `<svg class="geometry-scene-svg" viewBox="0 0 420 330" role="img" aria-label="Cubo con aristas ocultas punteadas">
    <rect x="7" y="8" width="406" height="314" rx="20" fill="#f6fbff"/>
    <path d="M85 95 145 40h170l-60 55Z" fill="#9cdbf8" stroke="#244a65" stroke-width="5" stroke-linejoin="round"/>
    <path d="M255 95 315 40v180l-60 55Z" fill="#52a5db" stroke="#244a65" stroke-width="5" stroke-linejoin="round"/>
    <path d="M85 95h170v180H85Z" fill="${part === "face" ? "#ffd166" : "#78c6ee"}" stroke="#244a65" stroke-width="5"/>
    <path d="M85 275 145 220V40M145 220h170" fill="none" stroke="#244a65" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/>
    ${part === "edge" ? '<path d="M85 95h170" stroke="#ef476f" stroke-width="12" stroke-linecap="round"/>' : ""}
    ${showVertices ? vertices.map(([x, y], index) => `<circle cx="${x}" cy="${y}" r="${part === "vertex" && index === 2 ? 13 : 8}" fill="${part === "vertex" && index === 2 ? "#ffd60a" : "#ef476f"}" stroke="#24343a" stroke-width="3"/>`).join("") : ""}
    ${geometryPacmanMark()}
  </svg>`;
}

function renderGeometryNetScene(round, state) {
  if (state.folded) return `<div class="geometry-folded-cube">${renderGeometryCubeScene({ part: "face" })}<strong>¡Se armó el cubo!</strong></div>`;
  const cells = round.fixed.map(([x, y]) => `<span class="geometry-net-cell is-fixed" style="grid-column:${x + 1};grid-row:${y + 1}"></span>`).join("");
  const choices = round.options.map((optionId, index) => {
    const [x, y] = round.slots[optionId];
    if (state.answered && optionId !== round.correctId) return "";
    const filled = state.answered && optionId === round.correctId;
    return `<button class="geometry-net-cell is-option ${filled ? "is-filled" : ""} ${state.selectedId === optionId && !state.answered ? "is-wrong" : ""}" type="button" data-action="geometry-quest-answer" data-value="${optionId}" style="grid-column:${x + 1};grid-row:${y + 1}" aria-label="Ubicar la cara en la opción ${index + 1}" ${state.answered ? "disabled" : ""}>${filled ? "" : "+"}</button>`;
  }).join("");
  return `<div class="geometry-net-wrap"><div class="geometry-net-board">${cells}${choices}</div><span class="geometry-net-help">5 caras + 1 cara = 6 caras</span></div>`;
}

function renderGeometryQuestRunner(exercise) {
  const state = session.geometryQuests[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round) return;
  const scene = exercise.mode === "lines" ? renderGeometryLinesScene(round, state)
    : exercise.mode === "rolling" ? renderGeometryRollingScene(round, state)
      : exercise.mode === "cube-parts" ? renderGeometryCubeScene(round)
        : renderGeometryNetScene(round, state);
  const options = round.type === "choose" ? `<div class="geometry-choice-grid ${round.options.length === 2 ? "has-two" : ""}">
    ${round.options.map((id) => `<button class="geometry-choice ${state.answered && id === round.correctId ? "is-correct" : ""} ${!state.answered && state.selectedId === id ? "is-wrong" : ""}" type="button" data-action="geometry-quest-answer" data-value="${id}" ${state.answered ? "disabled" : ""}>${escapeHtml(GEOMETRY_QUEST_LABELS[id] || id)}</button>`).join("")}
  </div>` : round.type === "turn" ? `<div class="geometry-turn-controls">
    <output data-role="geometry-current-degrees">${state.currentDegrees}°</output>
    <input type="range" min="5" max="175" step="5" value="${state.currentDegrees}" data-action="geometry-quest-slider" aria-label="Girar la recta" ${state.answered ? "disabled" : ""} />
    <button class="btn btn-primary" type="button" data-action="geometry-quest-check" ${state.answered ? "disabled" : ""}>${icon("check")}LISTO</button>
  </div>` : "";
  const modeLabel = { lines: "RECTAS", rolling: "CUERPOS", "cube-parts": "PARTES DEL CUBO", "cube-net": "ARMAR EL CUBO" }[exercise.mode];
  const rightMessage = round.type === "net" && state.folded ? "¡CUBO ARMADO!" : round.type === "net" && state.answered ? "¡BIEN! AHORA PLEGÁ" : "¡BIEN!";
  return renderShell(`<section class="runner matching-runner geometry-quest-runner geometry-${exercise.mode}-runner">
    <div class="matching-session-bar">
      <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
      <div class="matching-session-status"><span>${state.roundIndex + 1} de ${exercise.rounds.length}</span><span>${modeLabel}</span></div>
    </div>
    <article class="question-panel geometry-quest-panel">
      <div class="geometry-quest-heading"><span>${escapeHtml(session.themeTitle)}</span><h2>${escapeHtml(round.prompt)}</h2></div>
      <div class="geometry-quest-layout"><div class="geometry-quest-scene">${scene}</div>${options}</div>
      <div class="geometry-quest-feedback ${state.answered ? "is-good" : state.message ? "is-hint" : ""}" role="status">${escapeHtml(state.answered ? rightMessage : state.message || " ")}</div>
      ${round.type === "net" && state.answered ? `<button class="btn btn-primary geometry-net-next" type="button" data-action="geometry-quest-${state.folded ? "next" : "fold"}">${state.folded ? "Siguiente" : "Plegar el cubo"}</button>` : ""}
    </article>
  </section>`);
}

function advanceGeometryQuestRound(sessionId, exerciseId, roundIndex) {
  if (session?.id !== sessionId || session.exercises[session.index]?.id !== exerciseId) return;
  const exercise = session.exercises[session.index];
  const state = session.geometryQuests[exerciseId];
  if (!state || state.roundIndex !== roundIndex) return;
  if (roundIndex + 1 < exercise.rounds.length) {
    state.roundIndex += 1;
    state.currentDegrees = exercise.rounds[state.roundIndex]?.initial ?? 0;
    state.selectedId = null;
    state.answered = false;
    state.folded = false;
    state.showGuide = false;
    state.message = "";
  } else {
    session.score += 1;
    session.answers.push({ prompt: exercise.prompt, support: session.themeTitle, selected: "Completó los desafíos", correct: "Completó los desafíos", isCorrect: true, errors: state.errors });
    session.index += 1;
  }
  render();
}

function answerGeometryQuest(value) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "geometry-quest") return;
  const state = session.geometryQuests[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round || round.type === "turn" || state.answered || !round.options.includes(value)) return;
  state.selectedId = value;
  if (value !== round.correctId) {
    state.errors += 1;
    state.message = round.clue;
    return render();
  }
  state.answered = true;
  state.message = "";
  const sessionId = session.id;
  const exerciseId = exercise.id;
  const roundIndex = state.roundIndex;
  render();
  if (round.type !== "net") window.setTimeout(() => advanceGeometryQuestRound(sessionId, exerciseId, roundIndex), exercise.mode === "rolling" ? 1800 : 1400);
}

function updateGeometryQuestTurn(value) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "geometry-quest") return;
  const state = session.geometryQuests[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || round?.type !== "turn" || state.answered) return;
  state.currentDegrees = Math.max(5, Math.min(175, Number(value) || 5));
  state.showGuide = false;
  state.message = "";
  document.querySelector('[data-role="geometry-moving-line"]')?.setAttribute("transform", `rotate(${-state.currentDegrees} 230 150)`);
  const output = document.querySelector('[data-role="geometry-current-degrees"]');
  if (output) output.textContent = `${state.currentDegrees}°`;
  document.querySelector(".geometry-line-guide")?.remove();
  const feedback = document.querySelector(".geometry-quest-feedback");
  if (feedback) { feedback.textContent = " "; feedback.className = "geometry-quest-feedback"; }
}

function checkGeometryQuestTurn() {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "geometry-quest") return;
  const state = session.geometryQuests[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || round?.type !== "turn" || state.answered) return;
  if (Math.abs(state.currentDegrees - round.target) > 5) {
    state.errors += 1;
    state.showGuide = true;
    state.message = state.currentDegrees < round.target ? "GIRÁ UN POCO MÁS" : "GIRÁ UN POCO MENOS";
    return render();
  }
  state.currentDegrees = round.target;
  state.answered = true;
  state.message = "";
  const sessionId = session.id;
  const exerciseId = exercise.id;
  const roundIndex = state.roundIndex;
  render();
  window.setTimeout(() => advanceGeometryQuestRound(sessionId, exerciseId, roundIndex), 1400);
}

function foldGeometryQuestNet() {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.mode !== "cube-net") return;
  const state = session.geometryQuests[exercise.id];
  if (!state?.answered || state.folded) return;
  state.folded = true;
  render();
}

function nextGeometryQuestNet() {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.mode !== "cube-net") return;
  const state = session.geometryQuests[exercise.id];
  if (!state?.folded) return;
  advanceGeometryQuestRound(session.id, exercise.id, state.roundIndex);
}

function renderPlasticObjectSvg(objectId) {
  const object = PLASTIC_OBJECTS[objectId];
  if (!object) return "";
  let drawing = "";
  if (object.visual === "bottle" || object.visual === "clear-bottle") {
    const transparent = object.visual === "clear-bottle";
    drawing = `
      ${transparent ? '<g class="plastic-transparency-stripes" stroke="#ef476f" stroke-width="7" opacity="0.72"><path d="M40 54h140M40 82h140M40 110h140M40 138h140" /></g>' : ""}
      <path d="M89 22h42v22c0 7 7 12 15 18 12 9 18 23 18 39v52c0 13-10 23-23 23H79c-13 0-23-10-23-23v-52c0-16 6-30 18-39 8-6 15-11 15-18Z" fill="${transparent ? "rgba(80,195,235,0.38)" : "#198ee8"}" stroke="#175f9e" stroke-width="7" />
      <rect x="84" y="14" width="52" height="20" rx="7" fill="#126fbd" stroke="#174d83" stroke-width="6" />
      <path d="M75 78c18-13 54-13 70 0M74 143h72" fill="none" stroke="#bdeeff" stroke-width="8" stroke-linecap="round" opacity="0.75" />
    `;
  } else if (object.visual === "duck") {
    drawing = `
      <ellipse cx="118" cy="120" rx="70" ry="43" fill="#ffd60a" stroke="#d89b00" stroke-width="7" />
      <circle cx="89" cy="72" r="39" fill="#ffd60a" stroke="#d89b00" stroke-width="7" />
      <path d="M53 73 20 83l33 17c12-4 17-17 0-27Z" fill="#f77f00" stroke="#c65c00" stroke-width="6" />
      <circle cx="78" cy="62" r="6" fill="#24343a" /><circle cx="76" cy="60" r="2" fill="#fff" />
      <path d="M109 117c22-19 48-18 64-4-14 22-46 29-64 4Z" fill="#f5b700" stroke="#d89b00" stroke-width="5" />
    `;
  } else if (object.visual === "hanger") {
    drawing = `
      <path d="M102 68c-16-9-17-34-2-45 18-13 40 1 36 19-2 10-12 15-20 19" fill="none" stroke="#1565c0" stroke-width="13" stroke-linecap="round" />
      <path d="m109 64-83 80c-7 7-2 18 8 18h152c11 0 15-13 7-19l-84-79Z" fill="#2f91ea" stroke="#125a9f" stroke-width="10" stroke-linejoin="round" />
      <path d="M60 143h100" stroke="#8ed4ff" stroke-width="7" stroke-linecap="round" />
    `;
  } else if (object.visual === "bag") {
    drawing = `
      <path d="M49 43h36v39h50V43h36l20 135H29Z" fill="#72d7f2" stroke="#2289bd" stroke-width="7" stroke-linejoin="round" />
      <path d="M85 43v39h50V43" fill="none" stroke="#2289bd" stroke-width="7" />
      <path d="M52 111c29-14 86-11 117 4M58 139c27-9 75-8 102 4" fill="none" stroke="#d2f7ff" stroke-width="7" stroke-linecap="round" opacity="0.8" />
    `;
  } else if (object.visual === "ball") {
    drawing = `
      <circle cx="110" cy="101" r="76" fill="#ffcf33" stroke="#24343a" stroke-width="7" />
      <path d="M110 25c18 22 23 48 17 76-7 31-1 54 18 69" fill="none" stroke="#ef476f" stroke-width="34" />
      <path d="M42 68c26 3 51 15 68 35 20 24 43 34 68 31" fill="none" stroke="#2f80ed" stroke-width="32" />
      <circle cx="110" cy="101" r="10" fill="#fff" stroke="#b9c4cf" stroke-width="5" />
    `;
  } else if (object.visual === "comb") {
    drawing = `
      <path d="M32 56h156v35H32Z" fill="#2389da" stroke="#155b9a" stroke-width="7" />
      <path d="M42 89v66M59 89v55M76 89v66M93 89v55M110 89v66M127 89v55M144 89v66M161 89v55M178 89v66" stroke="#155b9a" stroke-width="9" stroke-linecap="round" />
      <path d="M45 68h125" stroke="#9bddff" stroke-width="6" stroke-linecap="round" />
    `;
  } else if (object.visual === "chair") {
    drawing = `
      <rect x="56" y="25" width="108" height="91" rx="8" fill="#bd6b2c" stroke="#743b17" stroke-width="8" />
      <path d="M71 47h78M71 76h78" stroke="#f0a45c" stroke-width="11" stroke-linecap="round" />
      <rect x="42" y="103" width="136" height="36" rx="9" fill="#d27a34" stroke="#743b17" stroke-width="8" />
      <path d="M58 136v46M162 136v46" stroke="#743b17" stroke-width="13" stroke-linecap="round" />
    `;
  } else if (object.visual === "boat") {
    drawing = `
      <path d="M27 94h166c-14 55-47 76-83 76S42 149 27 94Z" fill="#c66b2b" stroke="#713812" stroke-width="8" />
      <path d="M43 113h135M54 137h109" stroke="#efad68" stroke-width="7" stroke-linecap="round" />
      <path d="m150 29-70 119M143 42l24-14" stroke="#8b4c1f" stroke-width="11" stroke-linecap="round" />
    `;
  } else if (object.visual === "spoon") {
    drawing = `
      <ellipse cx="75" cy="120" rx="48" ry="36" transform="rotate(-28 75 120)" fill="#dfe5ea" stroke="#68737c" stroke-width="8" />
      <path d="m104 93 83-66" stroke="#aeb8c0" stroke-width="22" stroke-linecap="round" />
      <path d="m108 89 75-59" stroke="#f7fafc" stroke-width="6" stroke-linecap="round" opacity="0.85" />
    `;
  } else if (object.visual === "key") {
    drawing = `
      <circle cx="66" cy="72" r="38" fill="none" stroke="#89949d" stroke-width="17" />
      <path d="m93 98 82 71M140 137l17-19M158 153l16-18" fill="none" stroke="#707b84" stroke-width="18" stroke-linecap="square" />
      <path d="m96 93 76 66" stroke="#d9e0e5" stroke-width="6" stroke-linecap="round" />
    `;
  } else if (object.visual === "raincoat") {
    drawing = `
      <path d="M78 49c3-28 61-28 64 0l29 28-20 25v72H69v-72L49 77Z" fill="#ffd23f" stroke="#be8500" stroke-width="8" stroke-linejoin="round" />
      <path d="M89 45c8 13 34 13 42 0M110 59v108M83 116h54" fill="none" stroke="#fff0a3" stroke-width="7" stroke-linecap="round" />
      <circle cx="110" cy="82" r="5" fill="#9c6b00" />
    `;
  } else if (object.visual === "sponge") {
    drawing = `
      <path d="M33 48c0-13 11-23 24-23h111c13 0 22 12 19 24l-25 103c-3 12-13 20-25 20H47c-14 0-25-12-23-26Z" fill="#f4c542" stroke="#b77c15" stroke-width="8" />
      <g fill="#c68e1d" opacity="0.8"><circle cx="61" cy="61" r="7"/><circle cx="102" cy="48" r="5"/><circle cx="150" cy="68" r="9"/><circle cx="74" cy="108" r="10"/><circle cx="125" cy="99" r="6"/><circle cx="145" cy="137" r="8"/><circle cx="53" cy="148" r="5"/><circle cx="105" cy="145" r="7"/></g>
    `;
  }
  return `<svg class="plastic-object-svg plastic-object-${escapeHtml(object.visual)}" viewBox="0 0 220 200" role="img" aria-label="${escapeHtml(object.label)}">${drawing}</svg>`;
}

function renderMaterialSymbol(materialId) {
  if (materialId === "plastic") {
    return `<svg viewBox="0 0 80 70" aria-hidden="true"><path d="M31 9h18v10c0 4 12 8 12 22v17c0 5-4 9-9 9H28c-5 0-9-4-9-9V41c0-14 12-18 12-22Z" fill="#42b883" stroke="#176744" stroke-width="5"/><path d="M29 43h22" stroke="#d9fff0" stroke-width="5"/></svg>`;
  }
  if (materialId === "wood") {
    return `<svg viewBox="0 0 80 70" aria-hidden="true"><rect x="9" y="15" width="62" height="42" rx="9" fill="#c87838" stroke="#713812" stroke-width="5"/><path d="M20 29c14-9 26 9 40 0M18 44c12-8 30 8 44 0" fill="none" stroke="#8d4c20" stroke-width="4" stroke-linecap="round"/></svg>`;
  }
  return `<svg viewBox="0 0 80 70" aria-hidden="true"><path d="m40 8 24 14v27L40 63 16 49V22Z" fill="#b9c3ca" stroke="#5d6870" stroke-width="5"/><circle cx="40" cy="35" r="12" fill="#f7fafc" stroke="#5d6870" stroke-width="5"/></svg>`;
}

function renderPlasticFindStage(state, round) {
  const choices = round.objectIds.map((objectId) => {
    const object = PLASTIC_OBJECTS[objectId];
    const status = state.answered && objectId === round.correctId ? "is-correct" : state.wrongId === objectId ? "is-wrong" : "";
    return `
      <button class="plastic-object-choice ${status}" type="button" data-action="plastic-material-answer" data-value="${objectId}" ${state.answered || state.wrongId ? "disabled" : ""}>
        ${renderPlasticObjectSvg(objectId)}
        <strong>${escapeHtml(object.label)}</strong>
      </button>
    `;
  }).join("");
  return `
    <div class="plastic-find-board">
      <div class="plastic-object-grid">${choices}</div>
      <div class="plastic-collection-bin" aria-hidden="true"><span>PLÁSTICO</span></div>
    </div>
  `;
}

function renderPlasticMaterialStage(state, round) {
  const object = PLASTIC_OBJECTS[round.objectId];
  const options = round.options.map((materialId) => {
    const category = MATERIAL_CATEGORIES[materialId];
    const status = state.answered && materialId === round.correctId ? "is-correct" : state.wrongId === materialId ? "is-wrong" : "";
    return `
      <button class="plastic-material-choice ${status}" type="button" data-action="plastic-material-answer" data-value="${materialId}" ${state.answered || state.wrongId ? "disabled" : ""} style="--material-color:${category.color}">
        <span>${renderMaterialSymbol(materialId)}</span><strong>${escapeHtml(category.label)}</strong>
      </button>
    `;
  }).join("");
  return `
    <div class="plastic-material-layout">
      <div class="plastic-feature-object">${renderPlasticObjectSvg(round.objectId)}<strong>${escapeHtml(object.label)}</strong></div>
      <div class="plastic-material-options">${options}</div>
    </div>
  `;
}

function renderPlasticPropertyStage(state, round) {
  const object = PLASTIC_OBJECTS[round.objectId];
  const choices = ["yes", "no"].map((value) => {
    const status = state.answered && value === round.correctId ? "is-correct" : state.wrongId === value ? "is-wrong" : "";
    return `<button class="plastic-yesno-choice ${status}" type="button" data-action="plastic-material-answer" data-value="${value}" ${state.answered || state.wrongId ? "disabled" : ""}><strong>${value === "yes" ? "SÍ" : "NO"}</strong></button>`;
  }).join("");
  const waterDemo = ["repel", "absorb"].includes(round.effect)
    ? `<div class="plastic-water-drops" aria-hidden="true"><i></i><i></i><i></i></div>`
    : "";
  return `
    <div class="plastic-property-layout">
      <div class="plastic-property-scene effect-${escapeHtml(round.effect)}">
        <div class="plastic-property-stripes" aria-hidden="true"></div>
        <div class="plastic-feature-object">${renderPlasticObjectSvg(round.objectId)}<strong>${escapeHtml(object.label)}</strong></div>
        ${waterDemo}
      </div>
      <div class="plastic-yesno-options">${choices}</div>
    </div>
  `;
}

function animatePlasticMaterialsScreen(exercise, state, round) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const root = document.querySelector(".plastic-materials-runner");
  if (!root) return;
  gsap.from(root.querySelector(".plastic-stage-card"), { y: 16, opacity: 0, duration: 0.3, ease: "power2.out" });
  gsap.from(root.querySelectorAll(".plastic-object-choice, .plastic-material-choice, .plastic-yesno-choice"), { y: 12, opacity: 0, duration: 0.28, stagger: 0.06, delay: 0.08, ease: "power2.out" });
  if (state.wrongId !== null) {
    const wrong = root.querySelector(".is-wrong");
    if (wrong) gsap.fromTo(wrong, { x: -7 }, { x: 7, duration: 0.08, repeat: 3, yoyo: true, clearProps: "x" });
  }
  if (!state.answered) return;
  gsap.from(root.querySelector(".plastic-feedback"), { scale: 0.8, opacity: 0, duration: 0.3, ease: "back.out(1.8)" });
  if (exercise.stage === "find") {
    const source = root.querySelector(".plastic-object-choice.is-correct .plastic-object-svg");
    const bin = root.querySelector(".plastic-collection-bin");
    if (source && bin) {
      const sourceBox = source.getBoundingClientRect();
      const targetBox = bin.getBoundingClientRect();
      gsap.to(source, { x: targetBox.left + targetBox.width / 2 - (sourceBox.left + sourceBox.width / 2), y: targetBox.top + targetBox.height / 2 - (sourceBox.top + sourceBox.height / 2), scale: 0.28, rotation: 8, opacity: 0.15, duration: 0.9, ease: "power2.in" });
      gsap.fromTo(bin, { scale: 0.94 }, { scale: 1.06, duration: 0.18, repeat: 1, yoyo: true, delay: 0.72 });
    }
  } else if (exercise.stage === "material") {
    const object = root.querySelector(".plastic-feature-object");
    const target = root.querySelector(".plastic-material-choice.is-correct");
    if (object && target) {
      const sourceBox = object.getBoundingClientRect();
      const targetBox = target.getBoundingClientRect();
      gsap.to(object, { x: targetBox.left + targetBox.width / 2 - (sourceBox.left + sourceBox.width / 2), y: targetBox.top + targetBox.height / 2 - (sourceBox.top + sourceBox.height / 2), scale: 0.32, opacity: 0.2, duration: 0.9, ease: "power2.in" });
    }
  } else {
    const visual = root.querySelector(".plastic-feature-object .plastic-object-svg");
    const drops = root.querySelectorAll(".plastic-water-drops i");
    if (round.effect === "bend") gsap.to(visual, { rotation: -9, skewX: 12, scaleX: 0.82, duration: 0.24, repeat: 3, yoyo: true, transformOrigin: "50% 90%" });
    if (round.effect === "rigid") gsap.fromTo(visual, { x: -5 }, { x: 5, duration: 0.08, repeat: 7, yoyo: true, clearProps: "x" });
    if (round.effect === "transparent") gsap.fromTo(root.querySelector(".plastic-property-stripes"), { opacity: 0 }, { opacity: 1, duration: 0.55, repeat: 1, yoyo: true });
    if (round.effect === "opaque") gsap.to(visual, { scale: 1.08, duration: 0.28, repeat: 2, yoyo: true, ease: "power1.inOut" });
    if (round.effect === "repel") gsap.fromTo(drops, { y: -60, opacity: 1 }, { y: 18, opacity: 1, duration: 0.42, stagger: 0.08, repeat: 1, yoyo: true, ease: "power2.in" });
    if (round.effect === "absorb") gsap.fromTo(drops, { y: -65, opacity: 1 }, { y: 35, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power2.in" });
  }
}

function renderPlasticMaterialsRunner(exercise) {
  const state = session.plasticMaterials[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round) return;
  const stageLabels = { find: "ENCONTRAR", material: "CLASIFICAR", property: "PROBAR" };
  const heading = exercise.stage === "property" ? round.prompt : exercise.prompt;
  const content = exercise.stage === "find"
    ? renderPlasticFindStage(state, round)
    : exercise.stage === "material"
      ? renderPlasticMaterialStage(state, round)
      : renderPlasticPropertyStage(state, round);
  let result = "";
  if (state.answered) {
    if (exercise.stage === "find") result = "PLÁSTICO";
    else if (exercise.stage === "material") result = MATERIAL_CATEGORIES[round.correctId].label.toUpperCase();
    else result = round.correctId === "yes" ? "SÍ" : "NO";
  }
  const feedbackClass = state.answered ? "good" : state.message ? "bad" : "wait";
  const feedback = state.answered ? `${icon("check")}${result}` : escapeHtml(state.message || " ");
  renderShell(`
    <section class="runner matching-runner plastic-materials-runner plastic-${exercise.stage}-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${state.roundIndex + 1} de ${exercise.rounds.length}</span><span>${stageLabels[exercise.stage]}</span></div>
      </div>
      <article class="question-panel plastic-stage-card">
        <div class="plastic-stage-heading"><span>${session.index + 1} / ${session.exercises.length}</span><h2>${escapeHtml(heading.toUpperCase())}</h2></div>
        ${content}
        <div class="feedback plastic-feedback ${feedbackClass}" aria-live="polite">${feedback}</div>
      </article>
    </section>
  `);
  animatePlasticMaterialsScreen(exercise, state, round);
}

function advancePlasticMaterialsRound(sessionId, exerciseId, roundIndex) {
  if (session?.id !== sessionId || session.exercises[session.index]?.id !== exerciseId) return;
  const exercise = session.exercises[session.index];
  const state = session.plasticMaterials[exerciseId];
  if (!state || state.roundIndex !== roundIndex) return;
  if (state.roundIndex + 1 < exercise.rounds.length) {
    state.roundIndex += 1;
    state.selectedId = null;
    state.wrongId = null;
    state.answered = false;
    state.message = "";
  } else {
    session.score += 1;
    session.answers.push({
      prompt: exercise.prompt,
      support: "Los plásticos",
      selected: "Completó los seis desafíos",
      correct: "Completó los seis desafíos",
      isCorrect: true,
      errors: state.errors
    });
    session.index += 1;
  }
  render();
}

function answerPlasticMaterials(value) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "plastic-materials") return;
  const state = session.plasticMaterials[exercise.id];
  const round = exercise.rounds?.[state?.roundIndex];
  if (!state || !round || state.answered || state.wrongId !== null) return;
  state.selectedId = value;
  if (value !== round.correctId) {
    state.wrongId = value;
    state.errors += 1;
    state.message = exercise.stage === "find" ? "BUSCÁ OTRO" : "MIRÁ OTRA VEZ";
    const sessionId = session.id;
    const exerciseId = exercise.id;
    const roundIndex = state.roundIndex;
    render();
    window.setTimeout(() => {
      const currentState = session?.plasticMaterials?.[exerciseId];
      if (session?.id !== sessionId || session?.exercises?.[session.index]?.id !== exerciseId || currentState?.roundIndex !== roundIndex || currentState.answered) return;
      currentState.selectedId = null;
      currentState.wrongId = null;
      currentState.message = "";
      render();
    }, 850);
    return;
  }
  state.answered = true;
  state.message = "";
  const sessionId = session.id;
  const exerciseId = exercise.id;
  const roundIndex = state.roundIndex;
  render();
  window.setTimeout(() => advancePlasticMaterialsRound(sessionId, exerciseId, roundIndex), 1450);
}

function recipeInstructionText(step) {
  return step.segments
    .map((segment) => {
      const className = segment.kind ? ` recipe-word-${segment.kind}` : "";
      return `<span class="recipe-word${className}">${escapeHtml(segment.text)}</span>`;
    })
    .join("");
}

function renderRecipeItemVisual(item, className = "") {
  if (item.image) {
    return `<img class="recipe-item-image ${className}" src="./${escapeHtml(item.image)}" alt="" aria-hidden="true" />`;
  }
  return `<span class="recipe-item-emoji ${className}" aria-hidden="true">${escapeHtml(item.visual || "•")}</span>`;
}

function renderRecipeProgress(exercise, state) {
  const dots = exercise.steps
    .map((step, index) => {
      const status = index < state.completedSteps ? "is-complete" : index === state.stepIndex && state.phase !== "complete" ? "is-current" : "";
      return `<span class="recipe-progress-dot ${status}" aria-label="Paso ${index + 1}${index < state.completedSteps ? " completo" : ""}">${index + 1}</span>`;
    })
    .join("");
  return `<div class="recipe-progress" aria-label="Progreso de la receta">${dots}</div>`;
}

function renderRecipeKitchenScene(state) {
  const ricePrepared = state.completedSteps >= 1;
  const riceCooked = state.completedSteps >= 2;
  const beefCooked = state.completedSteps >= 3;
  const tomatoReady = state.completedSteps >= 4;
  const mealServed = state.completedSteps >= 5;
  return `
    <div class="recipe-kitchen-scene ${mealServed ? "is-served" : ""}" aria-label="Estado de la preparación">
      <section class="recipe-station recipe-pot-station ${ricePrepared ? "is-active" : ""} ${riceCooked ? "is-ready" : ""}">
        <span class="recipe-station-label">Arroz</span>
        <span class="recipe-steam" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="recipe-scene-emoji" aria-hidden="true">🍲</span>
        <strong>${riceCooked ? "Cocido" : ricePrepared ? "En la olla" : "Por preparar"}</strong>
      </section>
      <section class="recipe-station recipe-griddle-station ${beefCooked ? "is-ready" : ""}">
        <span class="recipe-station-label">Bife</span>
        <span class="recipe-scene-emoji recipe-scene-beef" aria-hidden="true">🥩</span>
        <span class="recipe-scene-griddle" aria-hidden="true"></span>
        <strong>${beefCooked ? "Cocido" : "Por cocinar"}</strong>
      </section>
      <section class="recipe-station recipe-tomato-station ${tomatoReady ? "is-ready" : ""}">
        <span class="recipe-station-label">Tomate</span>
        <span class="recipe-scene-emoji" aria-hidden="true">${tomatoReady ? "🍅 ✨" : "🍅"}</span>
        <strong>${tomatoReady ? "Cortado y con sal" : "Por preparar"}</strong>
      </section>
      <section class="recipe-final-plate ${mealServed ? "is-ready" : ""}">
        <span aria-hidden="true">${mealServed ? "🍽️" : "○"}</span>
        <strong>${mealServed ? "¡Plato listo!" : "Plato"}</strong>
      </section>
    </div>
  `;
}

function renderRecipeIntro(exercise, state) {
  const ingredients = exercise.ingredients
    .map(
      (item) => `
        <div class="recipe-ingredient-card">
          ${renderRecipeItemVisual(item)}
          <strong>${escapeHtml(item.label)}</strong>
        </div>
      `
    )
    .join("");
  return `
    <div class="recipe-intro-layout">
      <section class="recipe-document" aria-label="Partes de la receta">
        <div class="recipe-document-section recipe-title-section">
          <span class="recipe-section-label">Título</span>
          <h2>${escapeHtml(exercise.prompt)}</h2>
        </div>
        <div class="recipe-document-section">
          <span class="recipe-section-label">Ingredientes</span>
          <div class="recipe-ingredient-grid">${ingredients}</div>
        </div>
        <div class="recipe-document-section recipe-preparation-preview">
          <span class="recipe-section-label">Preparación</span>
          <p>Explica los pasos en orden.</p>
          <div class="recipe-language-key">
            <span><i class="is-connector"></i>Palabras que ordenan</span>
            <span><i class="is-verb"></i>Acciones</span>
          </div>
        </div>
      </section>
      <aside class="recipe-intro-guide">
        <span class="recipe-guide-icon" aria-hidden="true">📖</span>
        <h3>Una receta es un texto instructivo</h3>
        <p>Indica qué necesitamos y qué acciones debemos realizar, paso a paso.</p>
        <button class="btn btn-primary recipe-main-button" type="button" data-action="recipe-start">${icon("play")}Empezar los 5 pasos</button>
      </aside>
    </div>
  `;
}

function renderRecipeAttempt(exercise, state) {
  const step = exercise.steps[state.stepIndex];
  const objects = exercise.workspaceItems
    .map(
      (item) => `
        <button class="recipe-object-button" type="button" data-action="recipe-answer" data-item="${escapeHtml(item.id)}">
          ${renderRecipeItemVisual(item)}
          <strong>${escapeHtml(item.label)}</strong>
        </button>
      `
    )
    .join("");
  return `
    <div class="recipe-action-layout recipe-guided-layout">
      ${renderRecipeProgress(exercise, state)}
      <section class="recipe-instruction-card ${state.retry ? "is-retry" : ""}">
        <span class="recipe-step-label">Paso ${state.stepIndex + 1}</span>
        <p>${recipeInstructionText(step)}</p>
      </section>
      <h3 class="recipe-guided-question">${escapeHtml(step.question)}</h3>
      <div class="recipe-object-grid" aria-label="Objetos de la cocina">${objects}</div>
      <div class="recipe-guided-feedback ${state.retry ? "is-retry" : ""}" role="status">${state.message ? `${icon("book")}<span>${escapeHtml(state.message)}</span>` : "Leé la oración y tocá una imagen."}</div>
    </div>
  `;
}

function renderRecipeResult(exercise, state) {
  const step = exercise.steps[state.stepIndex];
  const lastStep = state.completedSteps === exercise.steps.length;
  return `
    <div class="recipe-result-layout">
      ${renderRecipeProgress(exercise, state)}
      ${renderRecipeKitchenScene(state)}
      <div class="recipe-success-message">${icon("check")}<span>¡Sí! Encontraste la información en la instrucción.</span></div>
      <section class="recipe-reflection-card">
        <span>¿Qué hice?</span>
        <p>${escapeHtml(step.reflection)}</p>
      </section>
      <button class="btn btn-primary recipe-main-button" type="button" data-action="recipe-continue">${lastStep ? "Ver la receta terminada" : "Siguiente instrucción"}</button>
    </div>
  `;
}

function renderRecipeComplete(exercise) {
  return `
    <div class="recipe-complete-layout">
      <div class="recipe-confetti" aria-hidden="true">${Array.from({ length: 14 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
      <span class="recipe-complete-plate" aria-hidden="true">🍽️</span>
      <h2>¡Receta terminada!</h2>
      <p class="recipe-complete-title">${escapeHtml(exercise.prompt)}</p>
      <div class="recipe-structure-summary">
        <span><b>1</b>Título</span>
        <span><b>2</b>Ingredientes</span>
        <span><b>3</b>Instrucciones ordenadas</span>
      </div>
      <p class="recipe-definition"><strong>La receta es un texto instructivo:</strong> explica qué necesitamos y qué debemos hacer paso a paso.</p>
      <button class="btn btn-primary recipe-main-button" type="button" data-action="recipe-finish">${icon("check")}Terminar actividad</button>
    </div>
  `;
}

function animateRecipeScreen(state) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.requestAnimationFrame(() => {
    const root = document.querySelector(".instructional-recipe-runner");
    if (!root) return;
    if (state.phase === "intro") {
      gsap.from(root.querySelectorAll(".recipe-document-section, .recipe-intro-guide"), { y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.25)" });
      gsap.from(root.querySelectorAll(".recipe-ingredient-card"), { scale: 0.65, opacity: 0, duration: 0.4, stagger: 0.06, delay: 0.18, ease: "back.out(1.8)" });
    } else if (state.phase === "act") {
      gsap.from(".recipe-instruction-card", { y: 20, opacity: 0, duration: 0.4, ease: "back.out(1.25)" });
      gsap.from(root.querySelectorAll(".recipe-object-button"), { y: 18, opacity: 0, duration: 0.35, stagger: 0.035, ease: "power2.out" });
      if (state.retry) gsap.fromTo(".recipe-object-grid", { x: -7 }, { x: 7, duration: 0.08, repeat: 3, yoyo: true, clearProps: "x" });
    } else if (state.phase === "result") {
      gsap.from(".recipe-success-message", { scale: 0.75, opacity: 0, duration: 0.45, ease: "back.out(1.8)" });
      gsap.from(".recipe-reflection-card", { y: 22, opacity: 0, duration: 0.45, delay: 0.15, ease: "power2.out" });
    } else if (state.phase === "complete") {
      gsap.from(".recipe-complete-plate", { scale: 0.25, rotation: -18, opacity: 0, duration: 0.8, ease: "elastic.out(1, 0.55)" });
      gsap.from(root.querySelectorAll(".recipe-confetti i"), { y: -130, x: () => gsap.utils.random(-80, 80), rotation: () => gsap.utils.random(-240, 240), opacity: 0, duration: 1, stagger: 0.035, ease: "bounce.out" });
    }
  });
}

function renderInstructionalRecipeRunner(exercise) {
  const state = session.instructionalRecipe[exercise.id];
  if (!state) return;
  const phaseContent =
    state.phase === "intro"
      ? renderRecipeIntro(exercise, state)
      : state.phase === "act"
          ? renderRecipeAttempt(exercise, state)
          : state.phase === "result"
            ? renderRecipeResult(exercise, state)
            : renderRecipeComplete(exercise);
  const status = state.phase === "intro" || state.phase === "complete" ? "Texto instructivo" : `Paso ${Math.min(state.stepIndex + 1, exercise.steps.length)} de ${exercise.steps.length}`;
  renderShell(`
    <section class="runner matching-runner instructional-recipe-runner recipe-phase-${state.phase}">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${escapeHtml(status)}</span><span>Lengua</span></div>
      </div>
      <article class="question-panel recipe-panel">${phaseContent}</article>
    </section>
  `);
  animateRecipeScreen(state);
}

function startInstructionalRecipe() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.instructionalRecipe?.[exercise?.id];
  if (exercise?.type !== "instructional-recipe" || !state || state.phase !== "intro") return;
  state.phase = "act";
  render();
}

function answerRecipeStep(itemId) {
  const exercise = session?.exercises?.[session.index];
  const state = session?.instructionalRecipe?.[exercise?.id];
  const step = exercise?.steps?.[state?.stepIndex];
  if (exercise?.type !== "instructional-recipe" || !state || !step || state.phase !== "act" || !exercise.workspaceItems.some((item) => item.id === itemId)) return;
  if (itemId !== step.expectedAction) {
    state.retry = true;
    state.message = "Volvé a mirar la palabra importante y probá otra vez. Ninguna imagen desaparece.";
    return render();
  }
  state.completedSteps = state.stepIndex + 1;
  state.phase = "result";
  state.message = "";
  state.retry = false;
  render();
}

function continueInstructionalRecipe() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.instructionalRecipe?.[exercise?.id];
  if (exercise?.type !== "instructional-recipe" || !state || state.phase !== "result") return;
  if (state.completedSteps >= exercise.steps.length) {
    state.phase = "complete";
  } else {
    state.stepIndex += 1;
    state.phase = "act";
    state.message = "";
    state.retry = false;
  }
  render();
}

function finishInstructionalRecipe() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.instructionalRecipe?.[exercise?.id];
  if (exercise?.type !== "instructional-recipe" || !state || state.phase !== "complete") return;
  session.score += 1;
  session.answers.push({
    prompt: exercise.prompt,
    support: "Texto instructivo: receta",
    selected: "Reconoció la información de los cinco pasos",
    correct: "Reconoció la información de los cinco pasos",
    isCorrect: true
  });
  session.index += 1;
  render();
}

function renderRecipeMatchLines(exercise, state) {
  const total = exercise.steps.length;
  const lines = exercise.steps
    .filter((step) => state.matches[step.id] === step.id)
    .map((step) => {
      const stepIndex = exercise.steps.findIndex((candidate) => candidate.id === step.id);
      const photoIndex = exercise.photoOrder.indexOf(step.id);
      const startY = ((stepIndex + 0.5) / total) * 100;
      const endY = ((photoIndex + 0.5) / total) * 100;
      return `<path d="M 4 ${startY} C 35 ${startY}, 65 ${endY}, 91 ${endY}" marker-end="url(#recipe-arrow)" />`;
    })
    .join("");
  return `
    <svg class="recipe-match-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="recipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      ${lines}
    </svg>
  `;
}

function renderRecipePhotoMatchingRunner(exercise) {
  const state = session.recipePhotoMatching[exercise.id];
  if (!state) return;
  const stepsById = new Map(exercise.steps.map((step) => [step.id, step]));
  const matchedIds = new Set(Object.keys(state.matches));
  const complete = matchedIds.size === exercise.steps.length;
  const instructions = exercise.steps
    .map(
      (step, index) => `
        <button class="recipe-match-instruction ${state.selectedStepId === step.id ? "is-selected" : ""} ${matchedIds.has(step.id) ? "is-matched" : ""}" type="button" data-action="recipe-match-step" data-step="${escapeHtml(step.id)}">
          <b>${index + 1}</b><span>${escapeHtml(step.text)}</span>
        </button>
      `
    )
    .join("");
  const photos = exercise.photoOrder
    .map((stepId) => {
      const step = stepsById.get(stepId);
      const isMatched = matchedIds.has(stepId);
      return `
        <button class="recipe-match-photo ${isMatched ? "is-matched" : ""}" type="button" data-action="recipe-match-photo" data-photo="${escapeHtml(step.id)}" aria-label="Foto para: ${escapeHtml(step.text)}">
          <img src="./${escapeHtml(step.image)}" alt="" aria-hidden="true" />
        </button>
      `;
    })
    .join("");
  const feedbackMessage = complete ? "Uniste las cinco instrucciones." : state.message || exercise.support;
  return renderShell(`
    <section class="runner matching-runner recipe-photo-matching-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status"><span>${session.index + 1} de ${session.exercises.length}</span><span>Lengua</span></div>
      </div>
      <article class="question-panel recipe-photo-match-panel">
        <h2>${escapeHtml(exercise.prompt)}</h2>
        <p>${escapeHtml(exercise.support)}</p>
        <div class="recipe-match-board" aria-label="Unir instrucciones con fotografías">
          <div class="recipe-match-instructions">${instructions}</div>
          ${renderRecipeMatchLines(exercise, state)}
          <div class="recipe-match-photos">${photos}</div>
        </div>
        <div class="recipe-match-feedback ${complete ? "is-complete" : ""}" role="status">${escapeHtml(feedbackMessage)}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="recipe-match-finish" ${complete ? "" : "disabled"}>${icon("check")}Terminar</button>
      </div>
    </section>
  `);
}

function selectRecipeMatchStep(stepId) {
  const exercise = session?.exercises?.[session.index];
  const state = session?.recipePhotoMatching?.[exercise?.id];
  if (exercise?.type !== "recipe-photo-matching" || !state || !exercise.steps.some((step) => step.id === stepId)) return;
  state.selectedStepId = stepId;
  state.message = "Ahora tocá la foto.";
  render();
}

function selectRecipeMatchPhoto(photoId) {
  const exercise = session?.exercises?.[session.index];
  const state = session?.recipePhotoMatching?.[exercise?.id];
  if (exercise?.type !== "recipe-photo-matching" || !state || !exercise.steps.some((step) => step.id === photoId)) return;
  if (!state.selectedStepId) {
    state.message = "Primero, tocá una instrucción.";
    return render();
  }
  if (state.selectedStepId !== photoId) {
    state.selectedStepId = null;
    state.message = "No corresponde. Volvé a leer la instrucción.";
    return render();
  }
  state.matches[state.selectedStepId] = photoId;
  state.selectedStepId = null;
  state.message = "Bien. Uní otra instrucción.";
  render();
}

function finishRecipePhotoMatching() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.recipePhotoMatching?.[exercise?.id];
  if (exercise?.type !== "recipe-photo-matching" || !state || Object.keys(state.matches).length !== exercise.steps.length) return;
  session.score += 1;
  session.answers.push({
    prompt: exercise.prompt,
    support: "Texto instructivo: unir con fotos",
    selected: "Unió las cinco instrucciones con fotografías",
    correct: "Unió las cinco instrucciones con fotografías",
    isCorrect: true
  });
  session.index += 1;
  render();
}

function stopLanguageAudio() {
  if (!languageAudio) return;
  languageAudio.pause();
  languageAudio.currentTime = 0;
  languageAudio = null;
}

function playLanguageAudio(relativePath, onEnded) {
  if (!VOICE_PLAYBACK_ENABLED || !relativePath) return;
  stopLanguageAudio();
  const audio = new Audio(`./assets/language/sofia/audio/${relativePath}`);
  languageAudio = audio;
  audio.preload = "auto";
  audio.volume = 1;
  if (typeof onEnded === "function") {
    audio.addEventListener(
      "ended",
      () => {
        if (languageAudio === audio) languageAudio = null;
        onEnded();
      },
      { once: true }
    );
  }
  audio.play().catch(() => {});
}

function currentSentenceBuilder() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.sentenceBuilders?.[exercise?.id];
  const sentence = exercise?.sentences?.[state?.roundIndex];
  return exercise?.type === "sentence-builder" && state && sentence ? { exercise, state, sentence } : null;
}

function sentencePartText(sentence, part) {
  return part === "subject" ? sentence.subject : part === "verb" ? sentence.verb : sentence.complement;
}

function sentencePhasePrompt(phase) {
  if (phase === "identify-subject") return { text: "¿Quién hace la acción?", audio: "grammar/prompts/tocar-sujeto.mp3", label: "SUJETO" };
  if (phase === "identify-verb") return { text: "¿Qué hace?", audio: "grammar/prompts/tocar-verbo.mp3", label: "VERBO" };
  if (phase === "identify-predicate") return { text: "¿Qué decimos del sujeto?", audio: "grammar/prompts/tocar-predicado.mp3", label: "PREDICADO" };
  return { text: "Armá la oración", audio: "grammar/prompts/armar-oracion.mp3", label: "ORACIÓN" };
}

function playCurrentSentence() {
  const current = currentSentenceBuilder();
  if (!current) return;
  playLanguageAudio(`grammar/sentences/${current.sentence.audio}`);
}

function playCurrentSentencePrompt() {
  const current = currentSentenceBuilder();
  if (!current) return;
  playLanguageAudio(sentencePhasePrompt(current.state.phase).audio);
}

function renderSentenceProgress(exercise, state) {
  return exercise.sentences
    .map((_, index) => `<span class="sofia-progress-dot ${index < state.roundIndex ? "is-complete" : index === state.roundIndex ? "is-current" : ""}">${index + 1}</span>`)
    .join("");
}

function renderSentenceVisual(sentence) {
  return sentence.visual
    .split("|")
    .map((token, index) => `<span class="sentence-visual-token token-${index + 1}" aria-hidden="true">${escapeHtml(token)}</span>`)
    .join('<span class="sentence-visual-arrow" aria-hidden="true">→</span>');
}

function renderSentenceBuild(exercise, state, sentence) {
  const placed = state.placed
    .map((part) => `<span class="sentence-slot-token part-${part}">${escapeHtml(sentencePartText(sentence, part))}</span>`)
    .join("");
  const slots = Array.from({ length: 3 }, (_, index) => placed && index < state.placed.length ? "" : `<span class="sentence-empty-slot"></span>`).join("");
  const choices = state.fragmentOrder
    .filter((part) => !state.placed.includes(part))
    .map(
      (part) => `
        <button class="sentence-fragment ${state.wrongPart === part ? "is-wrong" : ""}" type="button" data-action="sentence-fragment" data-part="${part}">
          ${escapeHtml(sentencePartText(sentence, part))}
        </button>
      `
    )
    .join("");
  return `
    <div class="sentence-task-heading ${VOICE_PLAYBACK_ENABLED ? "" : "voice-playback-disabled"}">
      <span class="sentence-task-kicker">ORACIÓN</span>
      <h2>Armá la oración</h2>
      ${
        VOICE_PLAYBACK_ENABLED
          ? `<button class="sentence-audio-button" type="button" data-action="sentence-prompt-audio" aria-label="Escuchar consigna">${icon("speaker")}</button>`
          : ""
      }
    </div>
    <div class="sentence-slot-area">
      <div class="sentence-build-slots" aria-label="Oración en construcción">${placed}${slots}</div>
      <div class="sentence-kind-key" aria-hidden="true"><span>QUIÉN</span><span>QUÉ HACE</span><span>QUÉ MÁS</span></div>
    </div>
    <div class="sentence-fragment-bank">${choices}</div>
  `;
}

function renderSentenceIdentify(exercise, state, sentence) {
  const prompt = sentencePhasePrompt(state.phase);
  const subjectFound = state.identified.includes("subject");
  const verbFound = state.identified.includes("verb");
  const predicatePhase = state.phase === "identify-predicate";
  const subjectButton = `
    <button class="sentence-identify-part part-subject ${subjectFound ? "is-found" : ""} ${state.wrongPart === "subject" ? "is-wrong" : ""}" type="button" data-action="sentence-identify" data-part="subject">
      ${escapeHtml(sentence.subject)}${subjectFound ? "<small>SUJETO</small>" : ""}
    </button>
  `;
  const remaining = predicatePhase
    ? `
      <button class="sentence-predicate-choice ${state.wrongPart === "predicate" ? "is-wrong" : ""}" type="button" data-action="sentence-identify" data-part="predicate">
        <span class="part-verb is-found">${escapeHtml(sentence.verb)}<small>VERBO</small></span>
        <span class="part-complement">${escapeHtml(sentence.complement)}</span>
        <strong>PREDICADO</strong>
      </button>
    `
    : `
      <button class="sentence-identify-part part-verb ${verbFound ? "is-found" : ""} ${state.wrongPart === "verb" ? "is-wrong" : ""}" type="button" data-action="sentence-identify" data-part="verb">
        ${escapeHtml(sentence.verb)}${verbFound ? "<small>VERBO</small>" : ""}
      </button>
      <button class="sentence-identify-part part-complement ${state.wrongPart === "complement" ? "is-wrong" : ""}" type="button" data-action="sentence-identify" data-part="complement">${escapeHtml(sentence.complement)}</button>
    `;
  return `
    <div class="sentence-task-heading ${VOICE_PLAYBACK_ENABLED ? "" : "voice-playback-disabled"}">
      <span class="sentence-task-kicker">${prompt.label}</span>
      <h2>${escapeHtml(prompt.text)}</h2>
      ${
        VOICE_PLAYBACK_ENABLED
          ? `<button class="sentence-audio-button" type="button" data-action="sentence-prompt-audio" aria-label="Escuchar consigna">${icon("speaker")}</button>`
          : ""
      }
    </div>
    <div class="sentence-identify-row ${predicatePhase ? "is-predicate-phase" : ""}">${subjectButton}${remaining}</div>
    ${
      VOICE_PLAYBACK_ENABLED
        ? `<button class="sentence-listen-full" type="button" data-action="sentence-full-audio">${icon("speaker")}Escuchar oración</button>`
        : ""
    }
  `;
}

function renderSentenceResult(exercise, state, sentence) {
  const isLast = state.roundIndex === exercise.sentences.length - 1;
  return `
    <div class="sentence-result">
      <span class="sentence-result-check">${icon("check")}</span>
      <h2>¡Muy bien!</h2>
      <div class="sentence-analysis">
        <span class="analysis-subject">${escapeHtml(sentence.subject)}<small>SUJETO</small></span>
        <span class="analysis-predicate">
          <span class="analysis-verb">${escapeHtml(sentence.verb)}<small>VERBO</small></span>
          <span>${escapeHtml(sentence.complement)}</span>
          <strong>PREDICADO</strong>
        </span>
      </div>
      ${
        VOICE_PLAYBACK_ENABLED
          ? `<button class="sentence-listen-full" type="button" data-action="sentence-full-audio">${icon("speaker")}Escuchar oración</button>`
          : ""
      }
      <button class="btn btn-primary sentence-next-button" type="button" data-action="sentence-next">${isLast ? `${icon("check")}Terminar` : "Siguiente oración"}</button>
    </div>
  `;
}

function animateSentenceBuilder(state) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.requestAnimationFrame(() => {
    const root = document.querySelector(".sentence-builder-runner");
    if (!root) return;
    gsap.from(root.querySelectorAll(".sentence-visual-token"), { scale: 0.55, y: 18, opacity: 0, duration: 0.45, stagger: 0.1, ease: "back.out(1.8)" });
    if (state.phase === "build") gsap.from(root.querySelectorAll(".sentence-fragment"), { y: 18, opacity: 0, duration: 0.32, stagger: 0.05, ease: "power2.out" });
    if (state.phase === "result") gsap.from(root.querySelector(".sentence-analysis"), { scale: 0.78, opacity: 0, duration: 0.5, ease: "back.out(1.55)" });
    if (state.wrongPart) gsap.fromTo(root.querySelector(".is-wrong"), { x: -8 }, { x: 8, duration: 0.08, repeat: 4, yoyo: true, clearProps: "x" });
  });
}

function renderSentenceBuilderRunner(exercise) {
  const state = session.sentenceBuilders[exercise.id];
  const sentence = exercise.sentences[state.roundIndex];
  const content = state.phase === "build"
    ? renderSentenceBuild(exercise, state, sentence)
    : state.phase === "result"
      ? renderSentenceResult(exercise, state, sentence)
      : renderSentenceIdentify(exercise, state, sentence);
  renderShell(`
    <section class="runner matching-runner sentence-builder-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="sofia-session-title"><strong>Armamos oraciones</strong><span>★ PSP Sofía</span></div>
        <div class="matching-session-status"><span>${state.roundIndex + 1} de ${exercise.sentences.length}</span><span>Lengua</span></div>
      </div>
      <div class="sofia-progress-row">${renderSentenceProgress(exercise, state)}</div>
      <article class="question-panel sentence-builder-panel">
        <aside class="sentence-picture" aria-label="Ilustración de la oración">${renderSentenceVisual(sentence)}</aside>
        <section class="sentence-workspace">
          ${content}
          <div class="sentence-feedback ${state.wrongPart ? "is-retry" : ""}" role="status">${state.message ? escapeHtml(state.message) : " "}</div>
        </section>
      </article>
    </section>
  `);
  animateSentenceBuilder(state);
}

function chooseSentenceFragment(part) {
  const current = currentSentenceBuilder();
  if (!current || current.state.phase !== "build" || !["subject", "verb", "complement"].includes(part)) return;
  const { state, sentence } = current;
  const expected = ["subject", "verb", "complement"][state.placed.length];
  if (part !== expected) {
    state.wrongPart = part;
    state.message = state.placed.length === 0 ? "Buscá quién hace la acción." : "Probá con la parte que sigue.";
    render();
    playLanguageAudio("grammar/prompts/probar-otra-vez.mp3");
    return;
  }
  state.placed.push(part);
  state.wrongPart = null;
  state.message = "";
  if (state.placed.length === 3) {
    state.phase = "identify-subject";
    render();
    const sessionId = session.id;
    const roundIndex = state.roundIndex;
    playLanguageAudio(`grammar/sentences/${sentence.audio}`, () => {
      const latest = currentSentenceBuilder();
      if (session?.id === sessionId && latest?.state.roundIndex === roundIndex && latest.state.phase === "identify-subject") {
        playCurrentSentencePrompt();
      }
    });
    return;
  }
  render();
}

function identifySentencePart(part) {
  const current = currentSentenceBuilder();
  if (!current || !current.state.phase.startsWith("identify-")) return;
  const { state, sentence } = current;
  const expected = state.phase === "identify-subject" ? "subject" : state.phase === "identify-verb" ? "verb" : "predicate";
  if (part !== expected) {
    state.wrongPart = part;
    state.message = expected === "subject" ? "Buscá quién hace la acción." : expected === "verb" ? "Buscá la acción." : "El predicado incluye el verbo y lo que sigue.";
    render();
    playLanguageAudio("grammar/prompts/probar-otra-vez.mp3");
    return;
  }
  state.identified.push(expected);
  state.wrongPart = null;
  state.message = "";
  state.phase = expected === "subject" ? "identify-verb" : expected === "verb" ? "identify-predicate" : "result";
  render();
  if (state.phase === "result") playLanguageAudio(`grammar/sentences/${sentence.audio}`);
  else playCurrentSentencePrompt();
}

function advanceSentenceBuilder() {
  const current = currentSentenceBuilder();
  if (!current || current.state.phase !== "result") return;
  const { exercise, state } = current;
  stopLanguageAudio();
  if (state.roundIndex >= exercise.sentences.length - 1) {
    session.score += 1;
    session.answers.push({
      prompt: exercise.prompt,
      support: "Sujeto, verbo y predicado · PSP Sofía",
      selected: "Completó las ocho oraciones",
      correct: "Completó las ocho oraciones",
      isCorrect: true
    });
    session.index += 1;
    return render();
  }
  state.roundIndex += 1;
  state.phase = "build";
  state.placed = [];
  state.fragmentOrder = shuffled(["subject", "verb", "complement"]);
  state.identified = [];
  state.wrongPart = null;
  state.message = "";
  render();
  window.setTimeout(() => playCurrentSentencePrompt(), 120);
}

function recipeSectionInfo(section) {
  if (section === "pure") return { title: "Primero: el puré", color: "#d88b24" };
  if (section === "milanesa") return { title: "Después: la milanesa", color: "#c95f50" };
  return { title: "Al final: el plato", color: "#4f9d69" };
}

function renderSofiaRecipeVisual(step, compact = false) {
  const tokens = step.visual
    .split("|")
    .map((token, index) => `<span class="sofia-scene-token token-${index + 1}" aria-hidden="true">${escapeHtml(token)}</span>`)
    .join("");
  const effects = ["boil", "cook"].includes(step.scene)
    ? '<span class="sofia-steam" aria-hidden="true"><i></i><i></i><i></i></span>'
    : ["drain", "salt", "bread"].includes(step.scene)
      ? '<span class="sofia-particles" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'
      : "";
  return `<div class="sofia-recipe-scene scene-${step.scene} ${compact ? "is-compact" : ""}">${tokens}${effects}</div>`;
}

function renderSofiaRecipeIntro(exercise) {
  const ingredients = exercise.ingredients
    .map(
      (item) => `
        <div class="sofia-ingredient">
          ${item.image ? `<img src="./${escapeHtml(item.image)}" alt="" aria-hidden="true" />` : `<span aria-hidden="true">${escapeHtml(item.visual)}</span>`}
          <strong>${escapeHtml(item.label)}</strong>
        </div>
      `
    )
    .join("");
  return `
    <div class="sofia-recipe-intro">
      <section class="sofia-recipe-document">
        <span class="sofia-document-label">TÍTULO</span>
        <h2>${escapeHtml(exercise.prompt)}</h2>
        <span class="sofia-document-label">INGREDIENTES</span>
        <div class="sofia-ingredients">${ingredients}</div>
      </section>
      <aside class="sofia-recipe-guide">
        <div class="sofia-final-dish" aria-hidden="true"><span>🥩</span><span>🥔</span><b>🍽️</b></div>
        <span class="theme-credit-badge">★ Propuesta por PSP Sofía</span>
        <h3>Seguimos los pasos en orden</h3>
        <div class="sofia-recipe-path"><span>1 Puré</span><b>→</b><span>2 Milanesa</span><b>→</b><span>3 Plato</span></div>
        ${
          VOICE_PLAYBACK_ENABLED
            ? `<button class="sentence-audio-button" type="button" data-action="sofia-recipe-intro-audio" aria-label="Escuchar presentación">${icon("speaker")}</button>`
            : ""
        }
        <button class="btn btn-primary sofia-recipe-main" type="button" data-action="sofia-recipe-start">${icon("play")}Empezar</button>
      </aside>
    </div>
  `;
}

function renderSofiaRecipeChoice(exercise, state) {
  const step = exercise.steps[state.stepIndex];
  const section = recipeSectionInfo(step.section);
  const options = state.optionOrder
    .map((id) => exercise.steps.find((candidate) => candidate.id === id))
    .filter(Boolean)
    .map(
      (option) => `
        <button class="sofia-recipe-option ${state.wrongId === option.id ? "is-wrong" : ""}" type="button" data-action="sofia-recipe-answer" data-step="${escapeHtml(option.id)}">
          ${renderSofiaRecipeVisual(option, true)}
          <strong>${escapeHtml(option.short)}</strong>
        </button>
      `
    )
    .join("");
  return `
    <div class="sofia-recipe-choice" style="--section-color:${section.color}">
      <div class="sofia-recipe-section-title"><span>${escapeHtml(section.title)}</span><b>Paso ${state.stepIndex + 1} de ${exercise.steps.length}</b></div>
      <div class="sofia-instruction-card ${VOICE_PLAYBACK_ENABLED ? "" : "voice-playback-disabled"}">
        <p>${escapeHtml(step.text)}</p>
        ${
          VOICE_PLAYBACK_ENABLED
            ? `<button class="sentence-audio-button" type="button" data-action="sofia-recipe-step-audio" aria-label="Escuchar paso">${icon("speaker")}</button>`
            : ""
        }
      </div>
      <h3>Tocá la imagen</h3>
      <div class="sofia-recipe-options">${options}</div>
      <div class="sentence-feedback ${state.wrongId ? "is-retry" : ""}" role="status">${state.message ? escapeHtml(state.message) : " "}</div>
    </div>
  `;
}

function sofiaRecipeNextLabel(exercise, state) {
  const current = exercise.steps[state.stepIndex];
  const next = exercise.steps[state.stepIndex + 1];
  if (!next) return `${icon("check")}Ver el plato terminado`;
  if (current.section === "pure" && next.section === "milanesa") return "Ahora, la milanesa";
  if (current.section === "milanesa" && next.section === "plate") return "Ahora, armamos el plato";
  return "Siguiente paso";
}

function renderSofiaRecipeResult(exercise, state) {
  const step = exercise.steps[state.stepIndex];
  const section = recipeSectionInfo(step.section);
  return `
    <div class="sofia-recipe-result" style="--section-color:${section.color}">
      <span class="sofia-result-step">PASO ${state.stepIndex + 1}</span>
      ${renderSofiaRecipeVisual(step)}
      <div class="sofia-result-copy">
        <span class="sofia-result-check">${icon("check")}</span>
        <p>${escapeHtml(step.text)}</p>
        ${
          VOICE_PLAYBACK_ENABLED
            ? `<button class="sentence-audio-button" type="button" data-action="sofia-recipe-step-audio" aria-label="Escuchar paso">${icon("speaker")}</button>`
            : ""
        }
      </div>
      <button class="btn btn-primary sofia-recipe-main" type="button" data-action="sofia-recipe-next">${sofiaRecipeNextLabel(exercise, state)}</button>
    </div>
  `;
}

function renderSofiaRecipeComplete(exercise) {
  return `
    <div class="sofia-recipe-complete">
      <div class="sofia-recipe-confetti" aria-hidden="true">${Array.from({ length: 18 }, (_, index) => `<i style="--i:${index}"></i>`).join("")}</div>
      <span class="theme-credit-badge">★ Propuesta por PSP Sofía</span>
      <div class="sofia-complete-plate" aria-hidden="true"><span class="complete-milanesa">🥩</span><span class="complete-pure">🥔</span><b>🍽️</b></div>
      <h2>¡Receta terminada!</h2>
      <p>Milanesa con puré</p>
      <div class="sofia-recipe-summary"><span><b>1</b>Puré</span><span><b>2</b>Milanesa</span><span><b>3</b>Servir</span></div>
      <button class="btn btn-primary sofia-recipe-main" type="button" data-action="sofia-recipe-finish">${icon("check")}Terminar actividad</button>
    </div>
  `;
}

function animateSofiaRecipe(state) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.requestAnimationFrame(() => {
    const root = document.querySelector(".sofia-recipe-runner");
    if (!root) return;
    if (state.phase === "intro") {
      gsap.from(root.querySelectorAll(".sofia-ingredient"), { scale: 0.65, opacity: 0, duration: 0.38, stagger: 0.045, ease: "back.out(1.7)" });
    } else if (state.phase === "choose") {
      gsap.from(root.querySelectorAll(".sofia-recipe-option"), { y: 20, opacity: 0, duration: 0.38, stagger: 0.06, ease: "power2.out" });
      if (state.wrongId) gsap.fromTo(root.querySelector(".sofia-recipe-option.is-wrong"), { x: -8 }, { x: 8, duration: 0.08, repeat: 4, yoyo: true, clearProps: "x" });
    } else if (state.phase === "result") {
      gsap.from(root.querySelector(".sofia-recipe-scene"), { scale: 0.55, rotation: -6, opacity: 0, duration: 0.62, ease: "back.out(1.7)" });
      gsap.from(root.querySelectorAll(".sofia-scene-token"), { y: -18, duration: 0.55, stagger: 0.12, ease: "bounce.out" });
    } else if (state.phase === "complete") {
      gsap.from(root.querySelector(".sofia-complete-plate"), { scale: 0.25, rotation: -16, opacity: 0, duration: 0.8, ease: "elastic.out(1, 0.55)" });
      gsap.from(root.querySelectorAll(".sofia-recipe-confetti i"), { y: -150, x: () => gsap.utils.random(-90, 90), rotation: () => gsap.utils.random(-260, 260), opacity: 0, duration: 1.1, stagger: 0.025, ease: "bounce.out" });
    }
  });
}

function renderSofiaRecipeRunner(exercise) {
  const state = session.sofiaRecipes[exercise.id];
  const content = state.phase === "intro"
    ? renderSofiaRecipeIntro(exercise)
    : state.phase === "choose"
      ? renderSofiaRecipeChoice(exercise, state)
      : state.phase === "result"
        ? renderSofiaRecipeResult(exercise, state)
        : renderSofiaRecipeComplete(exercise);
  const status = state.phase === "intro" || state.phase === "complete" ? "Texto instructivo" : `${state.stepIndex + 1} de ${exercise.steps.length}`;
  renderShell(`
    <section class="runner matching-runner sofia-recipe-runner">
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="sofia-session-title"><strong>Milanesa con puré</strong><span>★ PSP Sofía</span></div>
        <div class="matching-session-status"><span>${escapeHtml(status)}</span><span>Lengua</span></div>
      </div>
      <article class="question-panel sofia-recipe-panel">${content}</article>
    </section>
  `);
  animateSofiaRecipe(state);
}

function currentSofiaRecipe() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.sofiaRecipes?.[exercise?.id];
  return exercise?.type === "sofia-recipe" && state ? { exercise, state, step: exercise.steps[state.stepIndex] } : null;
}

function playCurrentRecipeStep() {
  const current = currentSofiaRecipe();
  if (!current?.step) return;
  playLanguageAudio(`recipe/steps/${current.step.audio}`);
}

function startSofiaRecipe() {
  const current = currentSofiaRecipe();
  if (!current || current.state.phase !== "intro") return;
  current.state.phase = "choose";
  render();
  window.setTimeout(() => playCurrentRecipeStep(), 120);
}

function answerSofiaRecipe(stepId) {
  const current = currentSofiaRecipe();
  if (!current || current.state.phase !== "choose" || !current.state.optionOrder.includes(stepId)) return;
  const { state, step } = current;
  if (stepId !== step.id) {
    state.wrongId = stepId;
    state.message = "Mirá la frase y probá otra vez.";
    render();
    playLanguageAudio("grammar/prompts/probar-otra-vez.mp3");
    return;
  }
  state.phase = "result";
  state.wrongId = null;
  state.message = "";
  render();
  playCurrentRecipeStep();
}

function advanceSofiaRecipe() {
  const current = currentSofiaRecipe();
  if (!current || current.state.phase !== "result") return;
  const { exercise, state } = current;
  stopLanguageAudio();
  if (state.stepIndex >= exercise.steps.length - 1) {
    state.phase = "complete";
    render();
    playLanguageAudio("recipe/complete.mp3");
    return;
  }
  state.stepIndex += 1;
  state.phase = "choose";
  state.optionOrder = shuffled(exercise.steps[state.stepIndex].options);
  state.wrongId = null;
  state.message = "";
  render();
  window.setTimeout(() => playCurrentRecipeStep(), 120);
}

function finishSofiaRecipe() {
  const current = currentSofiaRecipe();
  if (!current || current.state.phase !== "complete") return;
  stopLanguageAudio();
  session.score += 1;
  session.answers.push({
    prompt: current.exercise.prompt,
    support: "Texto instructivo · PSP Sofía",
    selected: "Completó los doce pasos",
    correct: "Completó los doce pasos",
    isCorrect: true
  });
  session.index += 1;
  render();
}

function renderRunner() {
  if (!session) return setRoute({ view: "home" });
  const total = session.exercises.length;
  const done = session.index >= total;
  if (done) {
    if (session.exercises[0]?.type === "school-expedition") return renderSchoolExpeditionFinish();
    if (session.exercises[0]?.type === "capacity-lab") return renderCapacityFinish();
    if (session.exercises[0]?.type === "pacman-discovery") return renderPacmanDiscoveryFinish();
    if (session.exercises[0]?.type === "weight-lab") return renderWeightLabFinish();
    if (session.exercises[0]?.type === "pacman-world") return renderPacmanWorldFinish();
    if (session.exercises[0]?.type === "english-family") return renderFamilyFinish();
    if (session.exercises[0]?.type === "pacman-quest") return renderPacmanQuestFinish();
    if (session.exercises[0]?.type === "school-arcade") return renderSchoolArcadeFinish();
    if (session.exercises[0]?.type === "language-mission") return renderLanguageMissionFinish();
    return session.exercises[0]?.type === "pacman-verbs" ? renderPacmanVerbFinish() : renderFinish();
  }

  const exercise = session.exercises[session.index];
  if (exercise.type === "school-expedition") return renderSchoolExpeditionRunner(exercise);
  if (exercise.type === "capacity-lab") return renderCapacityRunner(exercise);
  if (exercise.type === "pacman-discovery") return renderPacmanDiscoveryRunner(exercise);
  if (exercise.type === "weight-lab") return renderWeightLabRunner(exercise);
  if (exercise.type === "pacman-world") return renderPacmanWorldRunner(exercise);
  if (exercise.type === "social-farm") return renderFarmRunner();
  if (exercise.type === "earth-layers") return renderEarthRunner();
  if (exercise.type === "english-family") return renderFamilyRunner(exercise);
  if (exercise.type === "pacman-quest") return renderPacmanQuestRunner(exercise);
  if (exercise.type === "school-arcade") return renderSchoolArcadeRunner(exercise);
  if (exercise.type === "language-mission") return renderLanguageMissionRunner(exercise);
  if (exercise.type === "technology-lab") return renderTechnologyRunner(exercise);
  if (exercise.type === "sound-gallery") return renderSoundGalleryRunner(exercise);
  if (exercise.type === "drag-matching") return renderDragMatchingRunner(exercise);
  if (exercise.type === "sum-choice-grid") return renderSumChoiceRunner(exercise);
  if (exercise.type === "ghost-sum") return renderGhostSumRunner(exercise);
  if (exercise.type === "ghost-multiplication") return renderGhostMultiplicationRunner(exercise);
  if (exercise.type === "animal-sound") return renderAnimalSoundRunner(exercise);
  if (exercise.type === "rhyme-puzzle") return renderRhymePuzzleRunner(exercise);
  if (exercise.type === "english-vocabulary") return renderEnglishVocabularyRunner(exercise);
  if (exercise.type === "instructional-recipe") return renderInstructionalRecipeRunner(exercise);
  if (exercise.type === "recipe-photo-matching") return renderRecipePhotoMatchingRunner(exercise);
  if (exercise.type === "sentence-builder") return renderSentenceBuilderRunner(exercise);
  if (exercise.type === "sofia-recipe") return renderSofiaRecipeRunner(exercise);
  if (exercise.type === "pacman-angle") return renderPacmanAngleRunner(exercise);
  if (exercise.type === "pacman-verbs") return renderPacmanVerbRunner(exercise);
  if (exercise.type === "geometry-quest") return renderGeometryQuestRunner(exercise);
  if (exercise.type === "plastic-materials") return renderPlasticMaterialsRunner(exercise);
  if (exercise.type === "circle-geometry") {
    return session.circleGeometryLearning ? renderCircleGeometryLearning() : renderCircleGeometryRunner(exercise);
  }
  if (exercise.type === "plant-labeling") {
    const plantState = session.plantLabeling[exercise.id];
    return plantState.learning ? renderPlantLearningRunner(exercise, plantState) : renderPlantLabelingRunner(exercise);
  }
  const answered = session.selectedIndex !== null;
  const progress = Math.round((session.index / total) * 100);
  const modeLabel = session.mode === "evaluation" ? "Evaluacion" : session.mode === "activity" ? "Actividad" : "Practica";
  const isMatchingActivity = exercise.type === "matching";
  const isSoundChoiceActivity = exercise.type === "sound-choice";
  const isFocusedActivity = isMatchingActivity || isSoundChoiceActivity;
  const answers = (exercise.options || [])
    .map((option, index) => {
      if (isSoundChoiceActivity) {
        let state = "";
        if (answered && index === exercise.correctIndex) state = "is-correct";
        if (!answered && session.soundChoiceWrongIndex === index) state = "is-wrong";
        return `
          <button class="sound-choice-btn ${state}" type="button" data-action="answer" data-index="${index}" ${answered ? "disabled" : ""}>
            ${escapeHtml(option.text)}
          </button>
        `;
      }
      let state = "";
      if (answered && session.mode !== "evaluation") {
        if (index === exercise.correctIndex) state = "is-correct";
        if (index === session.selectedIndex && index !== exercise.correctIndex) state = "is-wrong";
      }
      return `
        <button class="answer-btn ${state}" type="button" data-action="answer" data-index="${index}" ${answered ? "disabled" : ""}>
          <span class="answer-visual">${escapeHtml(option.visual || option.text.slice(0, 4))}</span>
          <span>${escapeHtml(option.text)}</span>
        </button>
      `;
    })
    .join("");
  const matchingState = isMatchingActivity ? session.matching[exercise.id] : null;
  const questionContent =
    isMatchingActivity
      ? renderMatchingBoard(exercise, matchingState, answered)
      : isSoundChoiceActivity
        ? `<div class="answers sound-choice-options">${answers}</div>`
      : `<div class="answers">${answers}</div>`;
  const feedbackMessage =
    isMatchingActivity
      ? matchingState.message || ""
      : isSoundChoiceActivity
        ? answered
          ? `${icon("check")}Correcto`
          : session.soundChoiceWrongIndex !== null
            ? `${icon("x")}Probemos otra vez`
            : " "
      : answered
        ? session.mode !== "evaluation"
          ? session.selectedIndex === exercise.correctIndex
            ? `${icon("check")}Correcto`
            : `${icon("x")}Probamos con otra en la proxima`
          : `${icon("check")}Respuesta guardada`
        : " ";
  const feedbackClass = isMatchingActivity
    ? answered || matchingState.message === "¡Bien!"
      ? "good"
      : "wait"
    : isSoundChoiceActivity
      ? answered
        ? "good"
        : "wait"
      : answered
        ? "good"
        : "wait";
  const supportContent = isSoundChoiceActivity
    ? `
      <div class="sound-choice-object">
        <span class="sound-choice-visual" aria-hidden="true">${escapeHtml(exercise.object?.visual || "")}</span>
        <span>${escapeHtml(exercise.object?.label || "")}</span>
      </div>
    `
    : escapeHtml(exercise.support || "?");
  const runnerNavigation = isFocusedActivity
    ? `
      <div class="matching-session-bar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <div class="matching-session-status">
          <span>${session.index + 1} de ${total}</span>
          <span>${modeLabel}</span>
        </div>
      </div>
    `
    : `
      <div class="toolbar">
        <button class="btn btn-ghost" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
        <span class="pill">${modeLabel}</span>
      </div>
      <div class="progress-wrap">
        <div class="progress-info">
          <span>${session.index + 1} de ${total}</span>
          <span>${escapeHtml(session.themeTitle)}</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="--progress:${progress}%"></div></div>
      </div>
    `;

  renderShell(`
    <section class="runner ${isFocusedActivity ? "matching-runner" : ""}">
      ${runnerNavigation}
      <article class="question-panel">
        <p class="question-text">${escapeHtml(exercise.prompt)}</p>
        <div class="question-support">${supportContent}</div>
        ${questionContent}
        <div class="feedback ${feedbackClass}" aria-live="polite">${feedbackMessage}</div>
      </article>
      <div class="answer-actions">
        <button class="btn btn-primary" type="button" data-action="next" ${answered ? "" : "disabled"}>${icon("check")}Siguiente</button>
      </div>
    </section>
  `);
}

function placeDragMatchingResult(resultId, pairId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const dragState = session.dragMatching[exercise?.id];
  if (exercise?.type !== "drag-matching" || !dragState) return;
  const alreadyPlacedPair = Object.keys(dragState.placements).find((key) => dragState.placements[key] === resultId);
  if (alreadyPlacedPair) delete dragState.placements[alreadyPlacedPair];
  dragState.placements[pairId] = resultId;
  dragState.checked = false;
  dragState.isCorrect = false;
  dragState.message = "";
  render();
}

function clearDragMatchingSlot(pairId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const dragState = session.dragMatching[exercise?.id];
  if (exercise?.type !== "drag-matching" || !dragState) return;
  delete dragState.placements[pairId];
  dragState.checked = false;
  dragState.isCorrect = false;
  dragState.message = "";
  render();
}

function checkDragMatching() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const dragState = session.dragMatching[exercise?.id];
  if (exercise?.type !== "drag-matching" || !dragState || Object.keys(dragState.placements).length !== exercise.pairs.length) return;
  dragState.checked = true;
  dragState.isCorrect = exercise.pairs.every((pair) => {
    const selected = exercise.pairs.find((candidate) => candidate.id === dragState.placements[pair.id]);
    return selected?.result === pair.result;
  });
  dragState.message = dragState.isCorrect ? "¡Muy bien! Todas las respuestas son correctas." : "Hay alguna respuesta para revisar. Podés moverla y volver a comprobar.";
  if (dragState.isCorrect) {
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({ prompt: exercise.prompt, support: exercise.support || "", selected: "Todas las respuestas", correct: "Todas las respuestas", isCorrect: true });
  }
  render();
  if (dragState.isCorrect) {
    window.setTimeout(() => {
      if (session?.exercises[session.index]?.id === exercise.id) nextQuestion();
    }, 850);
  }
}

function selectSumChoice(rowId, optionIndex) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.sumChoice[exercise?.id];
  if (exercise?.type !== "sum-choice-grid" || !state) return;
  if (!exercise.rows.some((row) => row.id === rowId && row.options[optionIndex] !== undefined)) return;
  state.selections[rowId] = optionIndex;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function checkSumChoice() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.sumChoice[exercise?.id];
  if (exercise?.type !== "sum-choice-grid" || !state || Object.keys(state.selections).length !== exercise.rows.length) return;
  state.checked = true;
  state.isCorrect = exercise.rows.every((row) => state.selections[row.id] === row.correctIndex);
  state.message = state.isCorrect ? "¡Muy bien! Todas las sumas están correctas." : "Hay alguna respuesta para revisar. Podés tocar otra opción y volver a comprobar.";
  if (state.isCorrect) {
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({ prompt: exercise.prompt, support: "", selected: "Todas las respuestas", correct: "Todas las respuestas", isCorrect: true });
  }
  render();
  if (state.isCorrect) {
    window.setTimeout(() => {
      if (session?.exercises[session.index]?.id === exercise.id) nextQuestion();
    }, 850);
  }
}

function toggleGhostSumGhost(tokenId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  if (!["ghost-sum", "ghost-multiplication"].includes(exercise?.type) || !state) return;

  let validToken = false;
  if (exercise.type === "ghost-sum") {
    const [side, rawIndex] = String(tokenId).split("-");
    const index = Number(rawIndex);
    validToken = ["left", "right"].includes(side) && Number.isInteger(index) && index >= 1 && index <= exercise[side];
  } else {
    const match = String(tokenId).match(/^group-(\d+)-(\d+)$/);
    const groupIndex = Number(match?.[1]);
    const ghostIndex = Number(match?.[2]);
    validToken = Boolean(match) && groupIndex >= 1 && groupIndex <= exercise.groupCount && ghostIndex >= 1 && ghostIndex <= exercise.groupSize;
  }
  if (!validToken) return;

  if (exercise.type === "ghost-multiplication") {
    const groupIndex = Number(String(tokenId).split("-")[1]);
    const groupId = `group-${groupIndex}`;
    const groupTokens = Array.from({ length: exercise.groupSize }, (_, index) => `${groupId}-${index + 1}`);
    const groupIsMoved = groupTokens.every((token) => state.movedGhosts.includes(token));
    if (groupIsMoved) {
      return;
    } else {
      state.movedGhosts = [...state.movedGhosts.filter((token) => !groupTokens.includes(token)), ...groupTokens];
      state.lastMovedGroup = groupId;
      state.lastReturnedGroup = null;
    }
    state.lastMovedGhost = null;
    state.lastReturnedGhost = null;
  } else if (state.movedGhosts.includes(tokenId)) {
    return;
  } else {
    state.movedGhosts.push(tokenId);
    state.lastMovedGhost = tokenId;
    state.lastReturnedGhost = null;
  }
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();

  const exerciseId = exercise.id;
  window.setTimeout(() => {
    const currentState = session?.ghostSums?.[exerciseId];
    if (!currentState) return;
    currentState.lastMovedGhost = null;
    currentState.lastReturnedGhost = null;
    currentState.lastMovedGroup = null;
    currentState.lastReturnedGroup = null;
  }, 320);
}

function toggleCountedGhost(tokenId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  if (!['ghost-sum', 'ghost-multiplication'].includes(exercise?.type) || !state?.movedGhosts.includes(tokenId)) return;
  const counted = new Set(state.countedGhosts || []);
  if (counted.has(tokenId)) counted.delete(tokenId);
  else counted.add(tokenId);
  state.countedGhosts = [...counted];
  render();
}

function clearGhostTray() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  if (!['ghost-sum', 'ghost-multiplication'].includes(exercise?.type) || !state || !state.movedGhosts.length) return;
  state.movedGhosts = [];
  state.countedGhosts = [];
  state.selectedAnswer = null;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  state.lastMovedGhost = null;
  state.lastReturnedGhost = null;
  state.lastMovedGroup = null;
  state.lastReturnedGroup = null;
  render();
}

function selectGhostSumAnswer(value) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  const answer = Number(value);
  if (!["ghost-sum", "ghost-multiplication"].includes(exercise?.type) || !state || !exercise.options.includes(answer)) return;
  state.selectedAnswer = answer;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function clearGhostSumAnswer() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  if (!["ghost-sum", "ghost-multiplication"].includes(exercise?.type) || !state || state.selectedAnswer === null) return;
  state.selectedAnswer = null;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function checkGhostSum() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  const isMultiplication = exercise?.type === "ghost-multiplication";
  const total = isMultiplication ? exercise.result : (exercise?.left || 0) + (exercise?.right || 0);
  if (!["ghost-sum", "ghost-multiplication"].includes(exercise?.type) || !state || state.movedGhosts.length !== total || state.selectedAnswer === null) return;
  state.checked = true;
  state.isCorrect = state.selectedAnswer === exercise.result;
  state.message = state.isCorrect ? "¡Muy bien! Juntaste y contaste todos los fantasmas." : "Contá otra vez los fantasmas y elegí otra respuesta.";
  if (state.isCorrect) {
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({
      prompt: isMultiplication ? `${exercise.groupCount} × ${exercise.groupSize}` : `${exercise.left} + ${exercise.right}`,
      support: "Fantasmas para contar",
      selected: String(state.selectedAnswer),
      correct: String(exercise.result),
      isCorrect: true
    });
  }
  render();
  if (state.isCorrect) {
    window.setTimeout(() => {
      if (session?.exercises[session.index]?.id === exercise.id) nextQuestion();
    }, 1000);
  }
}

function selectAnimalSoundAnswer(animalId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.animalSounds?.[exercise?.id];
  if (exercise?.type !== "animal-sound" || !state || !exercise.options.some((animal) => animal.id === animalId)) return;
  state.selectedAnimalId = animalId;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function clearAnimalSoundAnswer() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.animalSounds?.[exercise?.id];
  if (exercise?.type !== "animal-sound" || !state || state.selectedAnimalId === null) return;
  state.selectedAnimalId = null;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function checkAnimalSoundAnswer() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.animalSounds?.[exercise?.id];
  if (exercise?.type !== "animal-sound" || !state || state.selectedAnimalId === null || state.checked) return;
  state.checked = true;
  state.isCorrect = state.selectedAnimalId === exercise.correctAnimalId;
  state.message = state.isCorrect ? "¡Muy bien! Encontraste el animal." : "Ese animal no corresponde. Probá con otro.";
  if (state.isCorrect) {
    const selectedAnimal = exercise.options.find((animal) => animal.id === state.selectedAnimalId);
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({
      prompt: exercise.sound,
      support: "Sonido de animal",
      selected: selectedAnimal?.label || "",
      correct: selectedAnimal?.label || "",
      isCorrect: true
    });
  }
  render();
  if (state.isCorrect) {
    window.setTimeout(() => {
      if (session?.exercises[session.index]?.id === exercise.id) nextQuestion();
    }, 900);
  }
}

function selectRhymeAnswer(wordId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.rhymePuzzles?.[exercise?.id];
  if (exercise?.type !== "rhyme-puzzle" || !state || !exercise.options.some((word) => word.id === wordId)) return;
  state.selectedWordId = wordId;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function clearRhymeAnswer() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.rhymePuzzles?.[exercise?.id];
  if (exercise?.type !== "rhyme-puzzle" || !state || state.selectedWordId === null) return;
  state.selectedWordId = null;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function checkRhymeAnswer() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.rhymePuzzles?.[exercise?.id];
  if (exercise?.type !== "rhyme-puzzle" || !state || state.selectedWordId === null || state.checked) return;
  state.checked = true;
  state.isCorrect = state.selectedWordId === exercise.correctWordId;
  state.message = state.isCorrect ? "¡Muy bien! Las palabras riman." : "Estas palabras no riman. Probá con otra pieza.";
  if (state.isCorrect) {
    const selectedWord = exercise.options.find((word) => word.id === state.selectedWordId);
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({
      prompt: exercise.sourceWord.label,
      support: "Palabras que riman",
      selected: selectedWord?.label || "",
      correct: selectedWord?.label || "",
      isCorrect: true
    });
  }
  render();
  if (state.isCorrect) {
    window.setTimeout(() => {
      if (session?.exercises[session.index]?.id === exercise.id) nextQuestion();
    }, 900);
  }
}

function openMultiplicationHelp() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  if (exercise?.type !== "ghost-multiplication" || !state) return;
  state.helpOpen = true;
  state.helpRow = null;
  state.helpColumn = null;
  render();
}

function closeMultiplicationHelp() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  if (exercise?.type !== "ghost-multiplication" || !state) return;
  state.helpOpen = false;
  render();
}

function selectMultiplicationHelpAxis(axis, value) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.ghostSums[exercise?.id];
  const number = Number(value);
  if (exercise?.type !== "ghost-multiplication" || !state || !state.helpOpen || ![1, 2, 3, 4, 5].includes(number)) return;
  if (axis === "row") state.helpRow = number;
  else if (axis === "column") state.helpColumn = number;
  else return;
  render();
}

function startPlantActivity() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.plantLabeling[exercise?.id];
  if (exercise?.type !== "plant-labeling" || !state) return;
  state.learning = false;
  render();
}

function placePlantLabel(labelId, position) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.plantLabeling[exercise?.id];
  if (exercise?.type !== "plant-labeling" || !state || state.learning) return;
  const label = exercise.parts.find((part) => part.id === labelId);
  if (!label || !exercise.parts.some((part) => part.position === position)) return;
  const previousPosition = Object.keys(state.placements).find((key) => state.placements[key] === labelId);
  if (previousPosition) delete state.placements[previousPosition];
  state.placements[position] = labelId;
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function clearPlantSlot(position) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.plantLabeling[exercise?.id];
  if (exercise?.type !== "plant-labeling" || !state) return;
  delete state.placements[position];
  state.checked = false;
  state.isCorrect = false;
  state.message = "";
  render();
}

function checkPlant() {
  if (!session) return;
  const exercise = session.exercises[session.index];
  const state = session.plantLabeling[exercise?.id];
  if (exercise?.type !== "plant-labeling" || !state || Object.keys(state.placements).length !== exercise.parts.length) return;
  state.checked = true;
  state.isCorrect = exercise.parts.every((part) => state.placements[part.position] === part.id);
  state.message = state.isCorrect ? "¡Muy bien! Todas las partes están correctas." : "Hay alguna etiqueta para revisar. Podés moverla y volver a verificar.";
  if (state.isCorrect) {
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({ prompt: exercise.prompt, support: "Partes de la planta", selected: "Todas las etiquetas", correct: "Todas las etiquetas", isCorrect: true });
  }
  render();
  if (state.isCorrect) {
    window.setTimeout(() => {
      if (session?.exercises[session.index]?.id === exercise.id) nextQuestion();
    }, 850);
  }
}

function selectMatchingPair(kind, pairId) {
  if (!session || session.selectedIndex !== null) return;
  const exercise = session.exercises[session.index];
  if (exercise?.type !== "matching") return;
  const matchingState = session.matching[exercise.id];
  if (!matchingState || matchingState.matchedIds.includes(pairId)) return;

  if (kind === "picture") matchingState.selectedPicture = pairId;
  if (kind === "sound") matchingState.selectedSound = pairId;

  if (!matchingState.selectedPicture || !matchingState.selectedSound) {
    matchingState.message = "";
    return render();
  }

  const isMatch = matchingState.selectedPicture === matchingState.selectedSound;
  if (!isMatch) {
    matchingState.selectedPicture = null;
    matchingState.selectedSound = null;
    matchingState.message = "Probemos otra vez";
    return render();
  }

  matchingState.matchedIds.push(matchingState.selectedPicture);
  matchingState.selectedPicture = null;
  matchingState.selectedSound = null;
  const complete = matchingState.matchedIds.length === exercise.pairs.length;
  matchingState.message = complete ? "¡Terminaste esta ronda!" : "¡Bien!";

  if (complete) {
    session.selectedIndex = 0;
    session.score += 1;
    session.answers.push({
      prompt: exercise.prompt,
      support: exercise.support || "",
      selected: "Todas las parejas",
      correct: "Todas las parejas",
      isCorrect: true
    });
  }
  render();
}

function stopEnglishAudio() {
  if (!englishAudio) return;
  englishAudio.pause();
  englishAudio.currentTime = 0;
  englishAudio = null;
}

function playEnglishVocabularyAudio() {
  if (!VOICE_PLAYBACK_ENABLED) return;
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "english-vocabulary" || !exercise.audio) return;
  stopEnglishAudio();
  englishAudio = new Audio(`./assets/english/audio/${exercise.audio}`);
  englishAudio.volume = 1;
  englishAudio.play().catch(() => {});
}

function addEnglishVocabularyState(exercise) {
  session.englishVocabulary[exercise.id] = { selectedId: null, answered: false, isCorrect: false, message: "" };
}

function scheduleEnglishVocabularyReview(exercise) {
  if (exercise.retryCount > 0 || session.englishRetryWords.includes(exercise.wordId)) return;
  const subject = subjectById(session.subjectId);
  const theme = themeById(subject, session.themeId);
  if (!theme?.englishVocabularyPool) return;
  const remainingQuestions = session.exercises.length - session.index - 1;

  if (remainingQuestions >= 2) {
    const target = theme.englishVocabularyPool.find((item) => item.id === exercise.wordId);
    if (!target) return;
    const retry = createEnglishVocabularyExercise(theme, target, 1);
    const previousCorrectIndex = exercise.options.findIndex((option) => option.id === exercise.correctId);
    const retryCorrectIndex = retry.options.findIndex((option) => option.id === retry.correctId);
    if (retryCorrectIndex === previousCorrectIndex && retry.options.length > 1) {
      const swapIndex = (retryCorrectIndex + 1) % retry.options.length;
      [retry.options[retryCorrectIndex], retry.options[swapIndex]] = [retry.options[swapIndex], retry.options[retryCorrectIndex]];
    }
    session.exercises.splice(session.index + 3, 0, retry);
    session.englishRetryWords.push(exercise.wordId);
    addEnglishVocabularyState(retry);
    return;
  }

  if (remainingQuestions === 0 && session.englishExtraFillers < 1) {
    const usedIds = new Set(session.exercises.slice(Math.max(0, session.index - 2)).map((item) => item.wordId));
    const candidates = theme.englishVocabularyPool.filter((item) => item.id !== exercise.wordId && !usedIds.has(item.id));
    const fallbackCandidates = theme.englishVocabularyPool.filter((item) => item.id !== exercise.wordId);
    const fillerTarget = shuffled(candidates.length ? candidates : fallbackCandidates)[0];
    if (!fillerTarget) return;
    const filler = createEnglishVocabularyExercise(theme, fillerTarget, 1);
    session.exercises.push(filler);
    session.englishExtraFillers += 1;
    addEnglishVocabularyState(filler);
  }
}

function advanceEnglishVocabulary(sessionId, exerciseId) {
  if (session?.id !== sessionId || session.exercises[session.index]?.id !== exerciseId) return;
  session.index += 1;
  render();
  if (session?.exercises?.[session.index]?.type === "english-vocabulary") {
    window.setTimeout(() => playEnglishVocabularyAudio(), 120);
  }
}

function answerEnglishVocabulary(optionId) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "english-vocabulary") return;
  const state = session.englishVocabulary[exercise.id];
  if (!state || state.answered || !exercise.options.some((option) => option.id === optionId)) return;

  stopEnglishAudio();
  state.selectedId = optionId;
  state.answered = true;
  state.isCorrect = optionId === exercise.correctId;
  state.message = state.isCorrect ? "¡Muy bien!" : "Probemos con otra palabra.";
  if (state.isCorrect) {
    session.score += 1;
    updateEnglishReview(session.themeId, exercise.wordId, false);
  } else {
    updateEnglishReview(session.themeId, exercise.wordId, true);
    scheduleEnglishVocabularyReview(exercise);
  }
  session.answers.push({
    prompt: `${exercise.prompt} ${exercise.word}`,
    support: "Vocabulario en inglés",
    selected: exercise.options.find((option) => option.id === optionId)?.label || "",
    correct: exercise.word,
    isCorrect: state.isCorrect
  });
  const sessionId = session.id;
  const exerciseId = exercise.id;
  render();
  window.setTimeout(() => advanceEnglishVocabulary(sessionId, exerciseId), state.isCorrect ? 1050 : 850);
}

function startCircleGeometryActivity() {
  if (!session?.circleGeometryLearning) return;
  session.circleGeometryLearning = false;
  render();
}

function addCircleGeometryState(exercise) {
  session.circleGeometry[exercise.id] = { selectedId: null, answered: false, isCorrect: false, message: "" };
}

function scheduleCircleGeometryReview(exercise) {
  if (exercise.retryCount > 0 || session.circleRetryKeys.includes(exercise.reviewKey)) return;
  const remainingQuestions = session.exercises.length - session.index - 1;
  if (remainingQuestions < 2) return;

  const usedScenarioIds = new Set(session.exercises.map((item) => item.scenarioId).filter(Boolean));
  const candidates = createCircleGeometryScenarioPool().filter(
    (scenario) =>
      scenario.challengeType === exercise.challengeType &&
      scenario.concept === exercise.concept &&
      !usedScenarioIds.has(scenario.id) &&
      scenario.id !== exercise.scenarioId
  );
  const scenario = shuffled(candidates)[0];
  if (!scenario) return;
  const retry = createCircleGeometryExercise(scenario, 1);
  const spacing = remainingQuestions >= 3 ? Math.min(remainingQuestions + 1, 3 + Math.floor(Math.random() * 2)) : 3;
  session.exercises.splice(session.index + spacing, 0, retry);
  session.circleRetryKeys.push(exercise.reviewKey);
  addCircleGeometryState(retry);
}

function advanceCircleGeometry(sessionId, exerciseId) {
  if (session?.id !== sessionId || session.exercises[session.index]?.id !== exerciseId) return;
  session.index += 1;
  render();
}

function answerCircleGeometry(optionId) {
  const exercise = session?.exercises?.[session.index];
  if (exercise?.type !== "circle-geometry" || !exercise.options.some((option) => option.id === optionId)) return;
  const state = session.circleGeometry[exercise.id];
  if (!state || state.answered) return;

  state.selectedId = optionId;
  state.answered = true;
  state.isCorrect = optionId === exercise.correctId;
  const correctContent = CIRCLE_GEOMETRY_CATEGORIES[exercise.concept];
  const conceptWithArticle = exercise.concept === "circle" ? "un círculo" : "una circunferencia";
  if (exercise.challengeType === "transform") {
    const actionExplanation = exercise.concept === "circle" ? "pintar el interior" : "borrar el interior";
    state.message = state.isCorrect
      ? `¡Muy bien! Al ${actionExplanation}, ahora es ${conceptWithArticle}.`
      : `Para formar ${conceptWithArticle} hay que ${actionExplanation}. Después vas a probar con otra figura.`;
  } else {
    state.message = state.isCorrect
      ? `¡Muy bien! Es ${conceptWithArticle}: ${correctContent.explanation}.`
      : `Es ${conceptWithArticle}: ${correctContent.explanation}. Más adelante vas a resolver otra diferente.`;
  }
  if (state.isCorrect) {
    session.score += 1;
    updateCircleGeometryReview(session.themeId, exercise.reviewKey, false);
  } else {
    updateCircleGeometryReview(session.themeId, exercise.reviewKey, true);
    scheduleCircleGeometryReview(exercise);
  }
  const selectedOption = exercise.options.find((option) => option.id === optionId);
  const correctOption = exercise.options.find((option) => option.id === exercise.correctId);
  session.answers.push({
    prompt: exercise.prompt,
    support: "Círculo o circunferencia",
    selected: selectedOption?.label || "",
    correct: correctOption?.label || correctContent.label,
    isCorrect: state.isCorrect
  });
  const sessionId = session.id;
  const exerciseId = exercise.id;
  render();
  window.setTimeout(() => advanceCircleGeometry(sessionId, exerciseId), state.isCorrect ? 1500 : 2200);
}

function answer(index) {
  if (!session || session.selectedIndex !== null) return;
  const exercise = session.exercises[session.index];
  const isCorrect = index === exercise.correctIndex;
  if (exercise.type === "sound-choice" && !isCorrect) {
    session.soundChoiceWrongIndex = index;
    return render();
  }
  session.soundChoiceWrongIndex = null;
  session.selectedIndex = index;
  if (isCorrect) session.score += 1;
  session.answers.push({
    prompt: exercise.prompt,
    support: exercise.support || "",
    selected: exercise.options[index]?.text || "",
    correct: exercise.options[exercise.correctIndex]?.text || "",
    isCorrect
  });
  render();
}

function nextQuestion() {
  if (!session || session.selectedIndex === null) return;
  session.index += 1;
  session.selectedIndex = null;
  session.soundChoiceWrongIndex = null;
  render();
}

function showSoundGalleryItem(itemId) {
  if (!session) return;
  const exercise = session.exercises[session.index];
  if (exercise?.type !== "sound-gallery" || !exercise.items.some((item) => item.id === itemId)) return;
  session.soundGalleryItemId = itemId;
  render();
}

function closeSoundGalleryItem() {
  if (!session || session.exercises[session.index]?.type !== "sound-gallery") return;
  session.soundGalleryItemId = null;
  render();
}

function renderFinish() {
  const total = session.exercises.length;
  const percent = Math.round((session.score / total) * 100);
  const modeLabel = session.mode === "evaluation" ? "Evaluacion terminada" : "Actividad terminada";
  const geometryRounds = session.exercises.length === 1 && session.exercises[0]?.type === "geometry-quest"
    ? session.exercises[0].rounds?.length || 0
    : 0;

  renderShell(`
    <section class="screen">
      <div class="finish-panel">
        <div class="finish-score">${percent}%</div>
        <h2>${modeLabel}</h2>
        <p>${geometryRounds ? `Completaste ${geometryRounds} desafíos` : `${session.score} respuestas correctas de ${total}`}</p>
        <div class="inline-actions" style="justify-content:center">
          <button class="btn btn-primary" type="button" data-action="open-subject" data-subject="${session.subjectId}">${icon("list")}Actividades</button>
        </div>
      </div>
    </section>
  `);
}

function openThemeForm(subjectId, themeId) {
  const subject = subjectById(subjectId);
  if (!subject) return;
  const theme = themeById(subject, themeId) || { title: "", description: "", exercises: [] };
  openModal({
    title: themeId ? "Editar tema" : "Nuevo tema",
    body: `
      <form class="form-grid" data-form="theme">
        <div class="field">
          <label for="themeTitle">Nombre</label>
          <input id="themeTitle" name="title" value="${escapeHtml(theme.title)}" required autocomplete="off" />
        </div>
        <div class="field">
          <label for="themeDescription">Descripcion</label>
          <textarea id="themeDescription" name="description">${escapeHtml(theme.description || "")}</textarea>
        </div>
      </form>
    `,
    submitText: "Guardar",
    onSubmit: () => {
      const form = modalRoot.querySelector('[data-form="theme"]');
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      if (!payload.title.trim()) return;
      if (themeId) {
        Object.assign(theme, {
          title: payload.title.trim(),
          description: payload.description.trim()
        });
      } else {
        subject.themes.push({
          id: uid("theme"),
          title: payload.title.trim(),
          description: payload.description.trim(),
          exercises: []
        });
      }
      saveData();
      closeModal();
      render();
      toast("Tema guardado");
    }
  });
}

function openExerciseForm(subjectId, themeId, exerciseId) {
  const subject = subjectById(subjectId);
  const theme = themeById(subject, themeId);
  if (!theme) return;
  const exercise = theme.exercises.find((item) => item.id === exerciseId) || {
    prompt: "",
    support: "",
    options: [
      { text: "", visual: "" },
      { text: "", visual: "" },
      { text: "", visual: "" },
      { text: "", visual: "" }
    ],
    correctIndex: 0
  };
  const optionFields = exercise.options
    .map(
      (option, index) => `
      <div class="two-col">
        <div class="field">
          <label for="optionText${index}">Opcion ${index + 1}</label>
          <input id="optionText${index}" name="optionText${index}" value="${escapeHtml(option.text)}" autocomplete="off" />
        </div>
        <div class="field">
          <label for="optionVisual${index}">Apoyo ${index + 1}</label>
          <input id="optionVisual${index}" name="optionVisual${index}" value="${escapeHtml(option.visual || "")}" autocomplete="off" />
        </div>
      </div>
    `
    )
    .join("");

  openModal({
    title: exerciseId ? "Editar ejercicio" : "Nuevo ejercicio",
    body: `
      <form class="form-grid" data-form="exercise">
        <div class="field">
          <label for="prompt">Consigna</label>
          <input id="prompt" name="prompt" value="${escapeHtml(exercise.prompt)}" required autocomplete="off" />
        </div>
        <div class="field">
          <label for="support">Apoyo visual central</label>
          <input id="support" name="support" value="${escapeHtml(exercise.support || "")}" autocomplete="off" />
        </div>
        ${optionFields}
        <div class="field">
          <label for="correctIndex">Respuesta correcta</label>
          <select id="correctIndex" name="correctIndex">
            ${[0, 1, 2, 3]
              .map((index) => `<option value="${index}" ${exercise.correctIndex === index ? "selected" : ""}>Opcion ${index + 1}</option>`)
              .join("")}
          </select>
        </div>
      </form>
    `,
    submitText: "Guardar",
    onSubmit: () => {
      const form = modalRoot.querySelector('[data-form="exercise"]');
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const options = [0, 1, 2, 3]
        .map((index) => ({
          text: String(payload[`optionText${index}`] || "").trim(),
          visual: String(payload[`optionVisual${index}`] || "").trim()
        }))
        .filter((option) => option.text);
      if (!payload.prompt.trim() || options.length < 2) {
        toast("Necesita consigna y al menos dos opciones");
        return;
      }
      const correctIndex = Math.min(Number(payload.correctIndex) || 0, options.length - 1);
      const nextExercise = {
        id: exerciseId || uid("exercise"),
        prompt: payload.prompt.trim(),
        support: String(payload.support || "").trim(),
        options,
        correctIndex
      };
      if (exerciseId) {
        const index = theme.exercises.findIndex((item) => item.id === exerciseId);
        theme.exercises[index] = nextExercise;
      } else {
        theme.exercises.push(nextExercise);
      }
      saveData();
      closeModal();
      render();
      toast("Ejercicio guardado");
    }
  });
}

function openModal({ title, body, submitText, onSubmit }) {
  modalRoot.innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true">
      <div class="modal">
        <div class="modal-header">
          <h2>${escapeHtml(title)}</h2>
          <button class="btn btn-ghost icon-btn" type="button" data-action="close-modal" aria-label="Cerrar">${icon("x")}</button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-footer">
          <div class="form-actions">
            <button class="btn btn-primary" type="button" data-action="modal-submit">${icon("check")}${escapeHtml(submitText)}</button>
            <button class="btn btn-ghost" type="button" data-action="close-modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  modalRoot.querySelector('[data-action="modal-submit"]').addEventListener("click", onSubmit);
  const firstInput = modalRoot.querySelector("input, textarea, select, button");
  firstInput?.focus();
}

function closeModal() {
  modalRoot.innerHTML = "";
}

function toast(message) {
  const previous = document.querySelector(".toast");
  previous?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function openCommunicationWriter() {
  const editing = Boolean(communicationWrittenText.trim());
  openModal({
    title: editing ? "Editar texto" : "Escribir mensaje",
    body: `
      <label class="field communication-write-field">
        <span>Texto</span>
        <textarea id="communicationWrittenText" maxlength="180" rows="4" placeholder="Escribí lo que querés comunicar">${escapeHtml(communicationWrittenText)}</textarea>
        <small>Podés usarlo solo o combinarlo con pictos.</small>
      </label>
    `,
    submitText: editing ? "Guardar" : "Agregar al mensaje",
    onSubmit: () => {
      const input = modalRoot.querySelector("#communicationWrittenText");
      const text = String(input?.value || "").trim().replace(/\s+/g, " ").slice(0, 180);
      if (!text && !editing) {
        toast("Escribí un mensaje");
        input?.focus();
        return;
      }
      if (!editing) communicationTextPosition = communicationSentence.length;
      communicationWrittenText = text;
      communicationPresentation = false;
      closeModal();
      render();
    }
  });
}

function currentCommunicationMessageScopes() {
  const scopes = [];
  const starter = communicationStarterById(communicationStarter);
  if (starter) scopes.push(starter.id);
  communicationCategoryLineage(communicationCategory).forEach((category) => scopes.push(category.id));
  return [...new Set(scopes)];
}

function showCommunicationPresentation() {
  if (!communicationHasContent()) return;
  if (communicationWrittenText.trim()) {
    const entry = {
      pictos: [...communicationSentence],
      text: communicationWrittenText,
      textPosition: communicationTextPosition,
      negated: communicationNegated
    };
    currentCommunicationMessageScopes().forEach((scopeId) => rememberCommunicationMessage(scopeId, entry));
    rememberGeneralCommunicationRecent({ kind: "message", scope: communicationStarter || COMMUNICATION_GENERAL_RECENTS_SCOPE, message: entry });
  }
  communicationAudioStatus = "";
  communicationPresentation = true;
  render();
}

function selectCommunicationRecentMessage(scopeId, index) {
  const entry = readCommunicationRecentMessages(scopeId)[index];
  if (!entry) return;
  communicationSentence = [...entry.pictos];
  communicationWrittenText = entry.text;
  communicationTextPosition = entry.textPosition;
  communicationNegated = entry.negated;
  communicationPresentation = false;
  communicationAudioStatus = "";
  if (scopeId === COMMUNICATION_GENERAL_RECENTS_SCOPE) {
    communicationStarter = null;
    communicationGroup = null;
    communicationCategory = null;
  }
  render();
}

function addCommunicationPicto(id) {
  if (!communicationPicto(id)) return;
  rememberGeneralCommunicationRecent({ kind: "picto", id });
  const activeStarter = communicationStarterById(communicationStarter);
  if (activeStarter) {
    rememberCommunicationPicto(activeStarter.id, id);
    communicationCategoryLineage(communicationCategory).forEach((category) =>
      rememberCommunicationPicto(category.id, id)
    );
    communicationSentence = [...communicationStarterSequence(activeStarter), id];
    render();
    return;
  }
  if (communicationSentence.length >= 12) {
    toast("Frase completa");
    return;
  }
  communicationSentence.push(id);
  render();
}

function stopCommunicationQuickAudio() {
  if (!communicationQuickAudio) return;
  communicationQuickAudioFinish?.();
  stopAppSpeech(communicationQuickAudio);
  communicationQuickAudio = null;
  communicationQuickAudioFinish = null;
}

function playCommunicationQuickAudio(id) {
  const audio = new Audio(`./assets/communication/audio/${id}.mp3`);
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    advanceCommunicationQuickAudio(id);
  };
  communicationQuickAudio = audio;
  communicationQuickAudioFinish = finish;
  audio.preload = "auto";
  audio.volume = 1;
  audio.addEventListener("ended", () => {
    finish();
    if (communicationQuickAudio === audio) {
      communicationQuickAudio = null;
      communicationQuickAudioFinish = null;
    }
  }, { once: true });
  audio.addEventListener("error", () => {
    if (communicationQuickAudio === audio) {
      communicationQuickAudio = null;
      communicationQuickAudioFinish = null;
    }
  }, { once: true });
  if (!playAppSpeech(audio, () => {
    if (communicationQuickAudio === audio) {
      communicationQuickAudio = null;
      communicationQuickAudioFinish = null;
    }
    toast("No se pudo reproducir el mensaje");
  })) {
    communicationQuickAudio = null;
    communicationQuickAudioFinish = null;
  }
}

function selectCommunicationQuick(id) {
  const quick = COMMUNICATION_QUICK_ACTIONS.find((item) => item.id === id);
  if (!quick) return;
  const activeStarter = communicationStarterById(communicationStarter);
  const starterSequence = communicationStarterSequence(activeStarter);
  const canToggleNegation =
    activeStarter?.id === "yo-quiero" && communicationSentence.length > starterSequence.length;
  if (quick.id === "quick-no-quiero" && canToggleNegation) {
    const choice = communicationSentence[starterSequence.length];
    communicationNegated = !communicationNegated;
    communicationSentence = [...communicationStarterSequence(activeStarter), choice];
    communicationAudioStatus = "";
    communicationPresentation = true;
    return render();
  }
  stopCommunicationQuickAudio();
  communicationStarter = null;
  communicationGroup = null;
  communicationCategory = null;
  communicationNegated = false;
  communicationWrittenText = "";
  communicationTextPosition = 0;
  communicationSentence = quick.sequence.filter((pictoId) => communicationPicto(pictoId)).slice(0, 12);
  const quickRemainingMs = communicationQuickAudioRemainingMs(quick.id);
  const canSpeak = !appSpeechAudio && appSpeechRemainingMs() <= 0 && quickRemainingMs <= 0;
  communicationAudioStatus = quickRemainingMs > 0
    ? `El mensaje se muestra sin audio. Podés volver a escucharlo en ${Math.ceil(quickRemainingMs / 1000)} s.`
    : canSpeak ? "" : "El mensaje se muestra sin audio durante la pausa de 2 segundos.";
  communicationPresentation = true;
  render();
  if (canSpeak) playCommunicationQuickAudio(quick.id);
}

function selectCommunicationStarter(id) {
  const starter = communicationStarterById(id);
  if (!starter) return;
  communicationStarter = starter.id;
  communicationGroup = starter.groups[0]?.id || null;
  communicationCategory = null;
  communicationNegated = false;
  communicationSentence = starter.sequence.filter((pictoId) => communicationPicto(pictoId));
  render();
}

function selectCommunicationGroup(id) {
  const starter = communicationStarterById(communicationStarter);
  const group = starter?.groups.find((item) => item.id === id);
  if (!group) return;
  communicationGroup = group.id;
  communicationCategory = group.categoryId || null;
  render();
}

function selectCommunicationCategory(id) {
  const starter = communicationStarterById(communicationStarter);
  const group = starter?.groups.find((item) => item.id === communicationGroup);
  const category = communicationCategoryById(id);
  const lineage = communicationCategoryLineage(id);
  if (!group?.categoryId || !category || lineage[0]?.id !== group.categoryId) return;
  communicationCategory = category.id;
  render();
}

function showCommunicationStarterGroups() {
  const starter = communicationStarterById(communicationStarter);
  if (!starter) return;
  communicationGroup = starter.groups[0]?.id || null;
  communicationCategory = null;
  render();
}

function backCommunicationCategory() {
  const category = communicationCategoryById(communicationCategory);
  if (!category?.parentId) return showCommunicationStarterGroups();
  communicationCategory = category.parentId;
  render();
}

function resetCommunicationStarter() {
  communicationStarter = null;
  communicationGroup = null;
  communicationCategory = null;
  communicationNegated = false;
  render();
}

function removeCommunicationToken(index) {
  const token = communicationCompositionTokens()[index];
  if (!token) return;
  if (token.type === "text") {
    communicationWrittenText = "";
    communicationTextPosition = 0;
    communicationPresentation = false;
    render();
    return;
  }
  const activeStarter = communicationStarterById(communicationStarter);
  if (activeStarter) {
    const starterSequence = communicationStarterSequence(activeStarter);
    if (token.pictoIndex < starterSequence.length) return clearCommunicationSentence();
    communicationSentence = starterSequence.filter((pictoId) => communicationPicto(pictoId));
    render();
    return;
  }
  communicationSentence.splice(token.pictoIndex, 1);
  if (!communicationSentence.length && !communicationWrittenText.trim()) resetCommunicationStarter();
  else render();
}

function clearCommunicationSentence() {
  stopCommunicationQuickAudio();
  communicationSentence = [];
  communicationWrittenText = "";
  communicationTextPosition = 0;
  communicationStarter = null;
  communicationGroup = null;
  communicationCategory = null;
  communicationPresentation = false;
  communicationAudioStatus = "";
  communicationNegated = false;
  render();
}

let activeDragMatchResult = null;
let suppressDragMatchClick = false;
let activePlantLabel = null;
let suppressPlantClick = false;
let activeGhostSumAnswer = null;
let ghostSumAnswerPointerStart = null;
let suppressGhostSumClick = false;
let activeAnimalSound = null;
let animalSoundPointerStart = null;
let suppressAnimalSoundClick = false;
let activeRhymeWord = null;
let rhymePointerStart = null;
let suppressRhymeClick = false;
let touchDragPreview = null;
let touchDragSource = null;
let touchDragPointerId = null;
let touchDragDropSelector = "";
let touchDragHalfWidth = 0;
let touchDragHalfHeight = 0;

function clearTouchDragPreview() {
  touchDragPreview?.remove();
  touchDragSource?.classList.remove("is-touch-source", "is-dragging");
  document.querySelectorAll(".is-drag-over").forEach((element) => element.classList.remove("is-drag-over"));
  touchDragPreview = null;
  touchDragSource = null;
  touchDragPointerId = null;
  touchDragDropSelector = "";
  touchDragHalfWidth = 0;
  touchDragHalfHeight = 0;
}

function moveTouchDragPreview(clientX, clientY) {
  if (!touchDragPreview) return;
  const left = Math.max(touchDragHalfWidth + 8, Math.min(window.innerWidth - touchDragHalfWidth - 8, clientX));
  const preferredTop = clientY - touchDragHalfHeight - 12;
  const top = Math.max(touchDragHalfHeight + 8, Math.min(window.innerHeight - touchDragHalfHeight - 8, preferredTop));
  touchDragPreview.style.left = `${left}px`;
  touchDragPreview.style.top = `${top}px`;

  document.querySelectorAll(".is-drag-over").forEach((element) => element.classList.remove("is-drag-over"));
  document.elementFromPoint(clientX, clientY)?.closest(touchDragDropSelector)?.classList.add("is-drag-over");
}

function startTouchDragPreview(source, event, dropSelector) {
  clearTouchDragPreview();
  const sourceRect = source.getBoundingClientRect();
  const preview = source.cloneNode(true);
  preview.removeAttribute("data-action");
  preview.removeAttribute("draggable");
  preview.setAttribute("aria-hidden", "true");
  preview.classList.remove("is-placed");
  preview.classList.add("touch-drag-preview");
  preview.style.width = `${sourceRect.width}px`;
  preview.style.height = `${sourceRect.height}px`;
  document.body.appendChild(preview);

  touchDragPreview = preview;
  touchDragSource = source;
  touchDragPointerId = event.pointerId;
  touchDragDropSelector = dropSelector;
  touchDragHalfWidth = sourceRect.width / 2;
  touchDragHalfHeight = sourceRect.height / 2;
  source.classList.add("is-touch-source", "is-dragging");
  moveTouchDragPreview(event.clientX, event.clientY);
  event.preventDefault();
}

document.addEventListener("pointermove", (event) => {
  if (!touchDragPreview || event.pointerId !== touchDragPointerId) return;
  moveTouchDragPreview(event.clientX, event.clientY);
  event.preventDefault();
});

document.addEventListener("pointercancel", (event) => {
  if (!touchDragPreview || event.pointerId !== touchDragPointerId) return;
  clearTouchDragPreview();
  activeDragMatchResult = null;
  activePlantLabel = null;
  activeGhostSumAnswer = null;
  ghostSumAnswerPointerStart = null;
  activeAnimalSound = null;
  animalSoundPointerStart = null;
  activeRhymeWord = null;
  rhymePointerStart = null;
});

window.addEventListener("blur", () => {
  clearTouchDragPreview();
  activeDragMatchResult = null;
  activePlantLabel = null;
  activeGhostSumAnswer = null;
  ghostSumAnswerPointerStart = null;
  activeAnimalSound = null;
  animalSoundPointerStart = null;
  activeRhymeWord = null;
  rhymePointerStart = null;
});

document.addEventListener("dragstart", (event) => {
  const result = event.target.closest('[data-action="drag-match-result"]');
  if (!result) return;
  if (touchDragPreview) {
    event.preventDefault();
    return;
  }
  activeDragMatchResult = result.dataset.result;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activeDragMatchResult);
  result.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="drag-match-result"]')?.classList.remove("is-dragging");
  clearTouchDragPreview();
  activeDragMatchResult = null;
});

document.addEventListener("dragover", (event) => {
  if (event.target.closest('[data-action="drag-match-slot"]')) event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const slot = event.target.closest('[data-action="drag-match-slot"]');
  if (!slot) return;
  event.preventDefault();
  const resultId = event.dataTransfer.getData("text/plain") || activeDragMatchResult;
  if (resultId) placeDragMatchingResult(resultId, slot.dataset.pair);
});

document.addEventListener("pointerdown", (event) => {
  const result = event.target.closest('[data-action="drag-match-result"]');
  if (!result || result.disabled) return;
  activeDragMatchResult = result.dataset.result;
  result.classList.add("is-dragging");
  startTouchDragPreview(result, event, '[data-action="drag-match-slot"]');
});

document.addEventListener("pointerup", (event) => {
  if (!activeDragMatchResult) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="drag-match-slot"]');
  const resultId = activeDragMatchResult;
  clearTouchDragPreview();
  document.querySelectorAll(".is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activeDragMatchResult = null;
  if (slot) {
    suppressDragMatchClick = true;
    window.setTimeout(() => {
      suppressDragMatchClick = false;
    }, 0);
    placeDragMatchingResult(resultId, slot.dataset.pair);
  }
});

document.addEventListener("dragstart", (event) => {
  const label = event.target.closest('[data-action="plant-label"]');
  if (!label) return;
  if (touchDragPreview) {
    event.preventDefault();
    return;
  }
  activePlantLabel = label.dataset.label;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activePlantLabel);
  label.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="plant-label"]')?.classList.remove("is-dragging");
  clearTouchDragPreview();
  activePlantLabel = null;
});

document.addEventListener("dragover", (event) => {
  if (event.target.closest('[data-action="plant-slot"]')) event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const slot = event.target.closest('[data-action="plant-slot"]');
  if (!slot) return;
  event.preventDefault();
  const labelId = event.dataTransfer.getData("text/plain") || activePlantLabel;
  if (labelId) placePlantLabel(labelId, slot.dataset.position);
});

document.addEventListener("pointerdown", (event) => {
  const label = event.target.closest('[data-action="plant-label"]');
  if (!label || label.disabled) return;
  activePlantLabel = label.dataset.label;
  label.classList.add("is-dragging");
  startTouchDragPreview(label, event, '[data-action="plant-slot"]');
});

document.addEventListener("pointerup", (event) => {
  if (!activePlantLabel) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="plant-slot"]');
  const labelId = activePlantLabel;
  clearTouchDragPreview();
  document.querySelectorAll(".plant-label-chip.is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activePlantLabel = null;
  if (slot) {
    suppressPlantClick = true;
    window.setTimeout(() => {
      suppressPlantClick = false;
    }, 0);
    placePlantLabel(labelId, slot.dataset.position);
  }
});

document.addEventListener("dragstart", (event) => {
  const option = event.target.closest('[data-action="ghost-sum-answer"]');
  if (!option || option.disabled) return;
  if (touchDragPreview) {
    event.preventDefault();
    return;
  }
  activeGhostSumAnswer = option.dataset.answer;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activeGhostSumAnswer);
  option.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="ghost-sum-answer"]')?.classList.remove("is-dragging");
  clearTouchDragPreview();
  activeGhostSumAnswer = null;
  ghostSumAnswerPointerStart = null;
});

document.addEventListener("dragover", (event) => {
  if (event.target.closest('[data-action="ghost-sum-answer-slot"]')) event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const slot = event.target.closest('[data-action="ghost-sum-answer-slot"]');
  if (!slot) return;
  event.preventDefault();
  const answer = event.dataTransfer.getData("text/plain") || activeGhostSumAnswer;
  if (answer) selectGhostSumAnswer(answer);
});

document.addEventListener("pointerdown", (event) => {
  const option = event.target.closest('[data-action="ghost-sum-answer"]');
  if (!option || option.disabled) return;
  activeGhostSumAnswer = option.dataset.answer;
  ghostSumAnswerPointerStart = { x: event.clientX, y: event.clientY };
  option.classList.add("is-dragging");
  startTouchDragPreview(option, event, '[data-action="ghost-sum-answer-slot"]');
});

document.addEventListener("pointerup", (event) => {
  if (!activeGhostSumAnswer) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="ghost-sum-answer-slot"]');
  const answer = activeGhostSumAnswer;
  const distance = ghostSumAnswerPointerStart
    ? Math.hypot(event.clientX - ghostSumAnswerPointerStart.x, event.clientY - ghostSumAnswerPointerStart.y)
    : Number.POSITIVE_INFINITY;
  clearTouchDragPreview();
  document.querySelectorAll(".ghost-sum-answer-option.is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activeGhostSumAnswer = null;
  ghostSumAnswerPointerStart = null;
  if (slot || distance < 14) {
    suppressGhostSumClick = true;
    window.setTimeout(() => {
      suppressGhostSumClick = false;
    }, 0);
    selectGhostSumAnswer(answer);
  }
});

document.addEventListener("dragstart", (event) => {
  const option = event.target.closest('[data-action="animal-sound-option"]');
  if (!option || option.disabled) return;
  if (touchDragPreview) {
    event.preventDefault();
    return;
  }
  activeAnimalSound = option.dataset.animal;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activeAnimalSound);
  option.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="animal-sound-option"]')?.classList.remove("is-dragging");
  clearTouchDragPreview();
  activeAnimalSound = null;
  animalSoundPointerStart = null;
});

document.addEventListener("dragover", (event) => {
  if (event.target.closest('[data-action="animal-sound-slot"]')) event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const slot = event.target.closest('[data-action="animal-sound-slot"]');
  if (!slot) return;
  event.preventDefault();
  const animalId = event.dataTransfer.getData("text/plain") || activeAnimalSound;
  if (animalId) selectAnimalSoundAnswer(animalId);
});

document.addEventListener("pointerdown", (event) => {
  const option = event.target.closest('[data-action="animal-sound-option"]');
  if (!option || option.disabled) return;
  activeAnimalSound = option.dataset.animal;
  animalSoundPointerStart = { x: event.clientX, y: event.clientY };
  option.classList.add("is-dragging");
  startTouchDragPreview(option, event, '[data-action="animal-sound-slot"]');
});

document.addEventListener("pointerup", (event) => {
  if (!activeAnimalSound) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="animal-sound-slot"]');
  const animalId = activeAnimalSound;
  const distance = animalSoundPointerStart
    ? Math.hypot(event.clientX - animalSoundPointerStart.x, event.clientY - animalSoundPointerStart.y)
    : Number.POSITIVE_INFINITY;
  clearTouchDragPreview();
  document.querySelectorAll(".animal-sound-option.is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activeAnimalSound = null;
  animalSoundPointerStart = null;
  if (slot || distance < 14) {
    suppressAnimalSoundClick = true;
    window.setTimeout(() => {
      suppressAnimalSoundClick = false;
    }, 0);
    selectAnimalSoundAnswer(animalId);
  }
});

document.addEventListener("dragstart", (event) => {
  const option = event.target.closest('[data-action="rhyme-option"]');
  if (!option || option.disabled) return;
  if (touchDragPreview) {
    event.preventDefault();
    return;
  }
  activeRhymeWord = option.dataset.word;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activeRhymeWord);
  option.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="rhyme-option"]')?.classList.remove("is-dragging");
  clearTouchDragPreview();
  activeRhymeWord = null;
  rhymePointerStart = null;
});

document.addEventListener("dragover", (event) => {
  if (event.target.closest('[data-action="rhyme-slot"]')) event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const slot = event.target.closest('[data-action="rhyme-slot"]');
  if (!slot) return;
  event.preventDefault();
  const wordId = event.dataTransfer.getData("text/plain") || activeRhymeWord;
  if (wordId) selectRhymeAnswer(wordId);
});

document.addEventListener("pointerdown", (event) => {
  const option = event.target.closest('[data-action="rhyme-option"]');
  if (!option || option.disabled) return;
  activeRhymeWord = option.dataset.word;
  rhymePointerStart = { x: event.clientX, y: event.clientY };
  option.classList.add("is-dragging");
  startTouchDragPreview(option, event, '[data-action="rhyme-slot"]');
});

document.addEventListener("pointerup", (event) => {
  if (!activeRhymeWord) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="rhyme-slot"]');
  const wordId = activeRhymeWord;
  const distance = rhymePointerStart
    ? Math.hypot(event.clientX - rhymePointerStart.x, event.clientY - rhymePointerStart.y)
    : Number.POSITIVE_INFINITY;
  clearTouchDragPreview();
  document.querySelectorAll(".rhyme-option.is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activeRhymeWord = null;
  rhymePointerStart = null;
  if (slot || distance < 14) {
    suppressRhymeClick = true;
    window.setTimeout(() => {
      suppressRhymeClick = false;
    }, 0);
    selectRhymeAnswer(wordId);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches('[data-action="pacman-angle-slider"]')) {
    updatePacmanAngleBuild(event.target.value);
  }
  if (event.target.matches('[data-action="geometry-quest-slider"]')) {
    updateGeometryQuestTurn(event.target.value);
  }
});

document.addEventListener("submit", (event) => {
  const answerForm = event.target.closest('[data-form="support-multiplication-answer"]');
  if (answerForm) {
    event.preventDefault();
    return unlockMultiplicationSupportAudio(new FormData(answerForm).get("answer"));
  }
  const form = event.target.closest('[data-form="turner-participant"]');
  if (!form) return;
  event.preventDefault();
  const name = new FormData(form).get("name");
  addTurnerParticipant(name);
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (typeof storyInteractionLocked === "function" && storyInteractionLocked()) return;
  const action = target.dataset.action;
  if (action.startsWith("se-")) return schoolExpeditionAction(action, target);
  if (action.startsWith("pd-")) return pacmanDiscoveryAction(action, target);
  if (action.startsWith("story-")) return storySupportAction(action, target);
  if (action.startsWith("pm-")) return pacmanMemoryAction(action, target);
  if (action.startsWith("px-")) return pacmanExplorerAction(action, target);
  if (action.startsWith("wl-")) return weightLabAction(action, target);
  if (action.startsWith("pv-")) return parishVisitAction(action, target);
  if (action.startsWith("pw-")) return pacmanWorldAction(action, target);
  if (action.startsWith("farm-")) return farmAction(action, target, event);
  if (action.startsWith("earth-")) return earthAction(action, target);
  if (action.startsWith("family-")) return familyAction(action, target);
  if (action.startsWith("pq-")) return pacmanQuestAction(action, target);
  if (action.startsWith("sa-")) return schoolArcadeAction(action, target);
  if (action.startsWith("cl-")) return capacityAction(action, target);
  if (action === "technology-select") return selectTechnologyAnswer(Number(target.dataset.card), target.dataset.value);
  if (action === "technology-check") return checkTechnologyAnswers();

  if (action === "pwa-install") return requestPwaInstall();
  if (action === "home") return setRoute({ view: "home" });
  if (action === "companion" && isCompanionEnabled()) return window.location.assign("/companion/index.html");
  if (action === "school") return setRoute({ view: "school" });
  if (action === "communication") return setRoute({ view: "communication" });
  if (action === "supports") return setRoute({ view: "supports" });
  if (action === "support-numbers-open") return openSupportNumbers();
  if (action === "support-number-mode") {
    supportNumberMode = target.dataset.mode === "count" ? "count" : "show";
    stopSupportAudio();
    return render();
  }
  if (action === "support-number-range") {
    supportNumberRange = [5, 10, 20].includes(Number(target.dataset.range)) ? Number(target.dataset.range) : 10;
    if (supportSelectedNumber > supportNumberRange) supportSelectedNumber = null;
    return render();
  }
  if (action === "support-number-select") return selectSupportNumber(target.dataset.value);
  if (action === "support-number-replay") return playSupportAudio("numbers", target.dataset.value);
  if (action === "support-count-change") return changeSupportCount(target.dataset.delta);
  if (action === "support-count-reset") return resetSupportCount();
  if (action === "support-colors-open") return openSupportColors();
  if (action === "support-color-mode") {
    supportColorMode = target.dataset.mode === "random" ? "random" : "show";
    stopSupportAudio();
    return render();
  }
  if (action === "support-color-select") return selectSupportColor(target.dataset.color);
  if (action === "support-color-random") return pickRandomSupportColor();
  if (action === "support-color-replay") return playSupportAudio("colors", target.dataset.color);
  if (action === "support-multiplication-open") return openSupportMultiplication();
  if (action === "support-multiplication-table") return selectMultiplicationSupportTable(target.dataset.table);
  if (action === "support-multiplication-next") return showNextMultiplicationSupportOperation();
  if (action === "support-multiplication-audio") return playMultiplicationSupportAudio();
  if (action === "turner-open") return openTurnerSetup(true);
  if (action === "turner-person-up") return moveTurnerParticipant(target.dataset.id, -1);
  if (action === "turner-person-down") return moveTurnerParticipant(target.dataset.id, 1);
  if (action === "turner-person-remove") return removeTurnerParticipant(target.dataset.id);
  if (action === "turner-save-group") return saveTurnerGroup();
  if (action === "turner-use-group") return useTurnerGroup(target.dataset.group);
  if (action === "turner-delete-group") return deleteTurnerGroup(target.dataset.group);
  if (action === "turner-start") return startTurner();
  if (action === "turner-next" || action === "turner-decline") return advanceTurner();
  if (action === "turner-undo") return undoTurner();
  if (action === "turner-pause") return toggleTurnerPause();
  if (action === "turner-add-live") return addLiveTurnerParticipant();
  if (action === "turner-finish") return finishTurner();
  if (action === "turner-restart") return restartTurner();
  if (action === "turner-exit") return exitTurnerToSetup();
  if (action === "communication-quick") return selectCommunicationQuick(target.dataset.quick);
  if (action === "communication-starter") return selectCommunicationStarter(target.dataset.starter);
  if (action === "communication-group") return selectCommunicationGroup(target.dataset.group);
  if (action === "communication-category") return selectCommunicationCategory(target.dataset.category);
  if (action === "communication-category-back") return backCommunicationCategory();
  if (action === "communication-starter-groups") return showCommunicationStarterGroups();
  if (action === "add-picto") return addCommunicationPicto(target.dataset.picto);
  if (action === "communication-write") return openCommunicationWriter();
  if (action === "communication-recent-message") {
    return selectCommunicationRecentMessage(target.dataset.scope, Number(target.dataset.index));
  }
  if (action === "communication-general-recent") return selectGeneralCommunicationRecent(Number(target.dataset.index));
  if (action === "communication-present") return showCommunicationPresentation();
  if (action === "communication-close-presentation") {
    stopCommunicationQuickAudio();
    communicationPresentation = false;
    communicationAudioStatus = "";
    return render();
  }
  if (action === "communication-clear") return clearCommunicationSentence();
  if (action === "remove-communication-token") return removeCommunicationToken(Number(target.dataset.index));
  if (action === "open-subject") return setRoute({ view: "subject", subjectId: target.dataset.subject });
  if (action === "open-theme") return setRoute({ view: "theme", subjectId: target.dataset.subject, themeId: target.dataset.theme });
  if (action === "start") return startSession(target.dataset.subject, target.dataset.theme, target.dataset.mode);
  if (action.startsWith("lm-")) return languageMissionAction(action, target);
  if (action === "matching-select") return selectMatchingPair(target.dataset.kind, target.dataset.pair);
  if (action === "drag-match-slot") {
    if (suppressDragMatchClick) {
      suppressDragMatchClick = false;
      return;
    }
    if (target.classList.contains("has-answer")) return clearDragMatchingSlot(target.dataset.pair);
    return;
  }
  if (action === "plant-start") return startPlantActivity();
  if (action === "plant-slot") {
    if (suppressPlantClick) {
      suppressPlantClick = false;
      return;
    }
    if (target.classList.contains("has-answer")) return clearPlantSlot(target.dataset.position);
    return;
  }
  if (action === "plant-label") return;
  if (action === "check-plant") return checkPlant();
  if (action === "drag-match-result") return;
  if (action === "check-drag-matching") return checkDragMatching();
  if (action === "sum-choice-select") return selectSumChoice(target.dataset.row, Number(target.dataset.option));
  if (action === "check-sum-choice") return checkSumChoice();
  if (action === "multiplication-help-open") return openMultiplicationHelp();
  if (action === "multiplication-help-close") return closeMultiplicationHelp();
  if (action === "multiplication-help-axis") return selectMultiplicationHelpAxis(target.dataset.axis, target.dataset.value);
  if (action === "ghost-sum-toggle-ghost") return toggleGhostSumGhost(target.dataset.token);
  if (action === "ghost-tray-count-toggle") return toggleCountedGhost(target.dataset.token);
  if (action === "ghost-tray-clear") return clearGhostTray();
  if (action === "ghost-sum-answer") {
    if (suppressGhostSumClick) {
      suppressGhostSumClick = false;
      return;
    }
    return selectGhostSumAnswer(target.dataset.answer);
  }
  if (action === "ghost-sum-answer-slot") {
    if (suppressGhostSumClick) {
      suppressGhostSumClick = false;
      return;
    }
    return clearGhostSumAnswer();
  }
  if (action === "check-ghost-sum") return checkGhostSum();
  if (action === "animal-sound-option") {
    if (suppressAnimalSoundClick) {
      suppressAnimalSoundClick = false;
      return;
    }
    return selectAnimalSoundAnswer(target.dataset.animal);
  }
  if (action === "animal-sound-slot") {
    if (suppressAnimalSoundClick) {
      suppressAnimalSoundClick = false;
      return;
    }
    return clearAnimalSoundAnswer();
  }
  if (action === "check-animal-sound") return checkAnimalSoundAnswer();
  if (action === "rhyme-option") {
    if (suppressRhymeClick) {
      suppressRhymeClick = false;
      return;
    }
    return selectRhymeAnswer(target.dataset.word);
  }
  if (action === "rhyme-slot") {
    if (suppressRhymeClick) {
      suppressRhymeClick = false;
      return;
    }
    return clearRhymeAnswer();
  }
  if (action === "check-rhyme") return checkRhymeAnswer();
  if (action === "sound-gallery-show") return showSoundGalleryItem(target.dataset.item);
  if (action === "sound-gallery-close") return closeSoundGalleryItem();
  if (action === "english-vocabulary-audio") return playEnglishVocabularyAudio();
  if (action === "english-vocabulary-answer") return answerEnglishVocabulary(target.dataset.option);
  if (action === "circle-geometry-start") return startCircleGeometryActivity();
  if (action === "circle-geometry-answer") return answerCircleGeometry(target.dataset.option);
  if (action === "pacman-angle-answer") return answerPacmanAngle(target.dataset.value);
  if (action === "pacman-verb-answer") return answerPacmanVerb(Number(target.dataset.option));
  if (action === "pacman-verb-next") return nextPacmanVerb();
  if (action === "pacman-angle-check") return checkPacmanAngleBuild();
  if (action === "pacman-angle-slider") return;
  if (action === "geometry-quest-answer") return answerGeometryQuest(target.dataset.value);
  if (action === "geometry-quest-check") return checkGeometryQuestTurn();
  if (action === "geometry-quest-slider") return;
  if (action === "geometry-quest-fold") return foldGeometryQuestNet();
  if (action === "geometry-quest-next") return nextGeometryQuestNet();
  if (action === "plastic-material-answer") return answerPlasticMaterials(target.dataset.value);
  if (action === "recipe-start") return startInstructionalRecipe();
  if (action === "recipe-answer") return answerRecipeStep(target.dataset.item);
  if (action === "recipe-continue") return continueInstructionalRecipe();
  if (action === "recipe-finish") return finishInstructionalRecipe();
  if (action === "recipe-match-step") return selectRecipeMatchStep(target.dataset.step);
  if (action === "recipe-match-photo") return selectRecipeMatchPhoto(target.dataset.photo);
  if (action === "recipe-match-finish") return finishRecipePhotoMatching();
  if (action === "sentence-fragment") return chooseSentenceFragment(target.dataset.part);
  if (action === "sentence-identify") return identifySentencePart(target.dataset.part);
  if (action === "sentence-next") return advanceSentenceBuilder();
  if (action === "sentence-full-audio") return playCurrentSentence();
  if (action === "sentence-prompt-audio") return playCurrentSentencePrompt();
  if (action === "sofia-recipe-intro-audio") return playLanguageAudio("recipe/intro.mp3");
  if (action === "sofia-recipe-start") return startSofiaRecipe();
  if (action === "sofia-recipe-answer") return answerSofiaRecipe(target.dataset.step);
  if (action === "sofia-recipe-step-audio") return playCurrentRecipeStep();
  if (action === "sofia-recipe-next") return advanceSofiaRecipe();
  if (action === "sofia-recipe-finish") return finishSofiaRecipe();
  if (action === "answer") return answer(Number(target.dataset.index));
  if (action === "next") return nextQuestion();
  if (action === "cancel-run") {
    const subjectId = session?.subjectId;
    stopLanguageAudio();
    session = null;
    return setRoute(subjectId ? { view: "subject", subjectId } : { view: "home" });
  }
  if (action === "close-modal") return closeModal();
});

function deleteTheme(subjectId, themeId) {
  const subject = subjectById(subjectId);
  if (!subject) return;
  if (!confirm("Eliminar este tema y sus ejercicios?")) return;
  subject.themes = subject.themes.filter((theme) => theme.id !== themeId);
  saveData();
  render();
  toast("Tema eliminado");
}

function deleteExercise(subjectId, themeId, exerciseId) {
  const subject = subjectById(subjectId);
  const theme = themeById(subject, themeId);
  if (!theme) return;
  if (!confirm("Eliminar este ejercicio?")) return;
  theme.exercises = theme.exercises.filter((exercise) => exercise.id !== exerciseId);
  saveData();
  render();
  toast("Ejercicio eliminado");
}

function resetDemo() {
  if (!confirm("Restaurar la plantilla inicial? Se reemplaza el contenido actual.")) return;
  data = normalizeData(DEFAULT_DATA);
  saveData();
  render();
  toast("Plantilla restaurada");
}

if (window.IAN_COMPANION_ENABLED !== true) setupPwaInstall();
void loadNativeCompanion();

if (window.IAN_COMPANION_ENABLED !== true && !isNativeAppRuntime() && "serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js", { scope: "./", updateViaCache: "none" }).catch(() => {});
  });
}

render();
