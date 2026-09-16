const STORAGE_KEY = "ian-escuela-data-v1";
const MULTIPLICATION_BAG_KEY = "ian-multiplication-bag-v1";
const ENGLISH_BAG_KEY = "ian-english-bag-v1";
const ENGLISH_REVIEW_KEY = "ian-english-review-v1";
const CIRCLE_GEOMETRY_BAG_KEY = "ian-circle-geometry-bag-v2";
const CIRCLE_GEOMETRY_REVIEW_KEY = "ian-circle-geometry-review-v2";
const COMMUNICATION_RECENTS_KEY = "ian-communication-recents-v2";
const COMMUNICATION_MESSAGE_RECENTS_KEY = "ian-communication-message-recents-v1";
const COMMUNICATION_GENERAL_RECENTS_SCOPE = "general";

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H21"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H21v20H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 6h8"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-4.5 4-8 12-10 1.6 8-1.8 16-8 16Z"/><path d="M4 13c4 0 7-2 10-6"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
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
  { id: "ingles", title: "Inglés", icon: "language", color: "#7c5cdb" }
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

const COMMUNICATION_PICTOS = {
  yo: { label: "Yo", phrase: "yo", image: "yo.png", color: "#4b7bec" },
  estoy: { label: "Estoy", phrase: "estoy", image: "yo.png", color: "#4b7bec" },
  tengo: { label: "Tengo", phrase: "tengo", image: "yo.png", color: "#4b7bec" },
  "me-siento": { label: "Me siento", phrase: "me siento", image: "yo.png", color: "#7c5cdb" },
  si: { label: "SI", phrase: "si", image: "si.png", color: "#4f9d69" },
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
  adios: { label: "Adios", phrase: "adios", image: "adios.png", color: "#4b7bec" },
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
  { id: "quick-si", label: "SI", picto: "si", sequence: ["si"], color: "#4f9d69" },
  { id: "quick-no", label: "NO", picto: "no", sequence: ["no"], color: "#c44747" },
  { id: "quick-hambre", label: "Hambre", message: "Tengo hambre", picto: "hambre", sequence: ["tengo", "hambre"], color: "#f07167" },
  { id: "quick-enojado", label: "Enojado", message: "Estoy enojado", picto: "enfadado", sequence: ["estoy", "enfadado"], color: "#c44747" },
  { id: "quick-hola", label: "Hola", picto: "hola", sequence: ["hola"], color: "#4f9d69" },
  { id: "quick-adios", label: "Adios", picto: "adios", sequence: ["adios"], color: "#4b7bec" },
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
      { id: "bienestar", title: "Bienestar", pictos: ["descanso", "silencio", "auriculares", "abrazo", "solo", "medicina", "frio", "calor", "dormir", "tele", "musica", "ruido", "esperar", "parar", "mas"] },
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
      { id: "cuerpo", title: "Cuerpo", pictos: ["cabeza", "oido", "mano", "brazo", "pierna", "espalda", "dolor-estomago", "dolor-garganta", "dolor-cabeza", "dolor-oido", "dolor-mano", "dolor-brazo", "doler", "tos", "fiebre"] },
      { id: "ayuda", title: "Ayuda", pictos: ["necesito-ayuda", "doctor", "medicina", "descanso", "silencio", "maestra", "terapeuta", "terapia", "psicologa", "fono", "esperar", "no-entiendo", "gracias", "hablar", "oir"] }
    ]
  },
  {
    id: "me-siento",
    title: "Me siento",
    color: "#7c5cdb",
    sequence: ["me-siento"],
    groups: [
      { id: "recientes", title: "Recientes", pictos: [] },
      { id: "emociones", title: "Emociones", pictos: ["contento", "triste", "enfadado", "miedo", "nervioso", "cansado", "aburrido", "tranquilo", "asustado", "calma", "me-gusta", "no-me-gusta", "no-quiero", "quiero", "hola"] },
      { id: "cuerpo", title: "Cuerpo", pictos: ["mareado", "enfermo", "frio", "calor", "dolor", "solo", "dolor-cabeza", "dolor-estomago", "dolor-garganta", "dolor-oido", "dolor-mano", "dolor-brazo", "tos", "fiebre", "clinica"] }
    ]
  },
  {
    id: "yo-tengo",
    title: "Yo tengo",
    color: "#ffb703",
    sequence: ["yo", "tengo"],
    groups: [
      { id: "recientes", title: "Recientes", pictos: [] },
      { id: "sensaciones", title: "Sensaciones", pictos: ["hambre", "frio", "calor", "miedo", "dolor", "mareado", "cansado", "enfermo", "beber", "comer", "descanso", "ruido", "dormir", "tos", "fiebre"] },
      { id: "social", title: "Social", pictos: ["turno", "lapiz", "cuaderno", "tarea", "agua", "medicina", "hablar", "oir", "compartir", "juntos", "hola", "gracias", "perdon", "familia", "esperar"] }
    ]
  }
];

const DEFAULT_DATA = {
  settings: {
    appName: "Ian Escuela",
    studentName: "Ian"
  },
  subjects: [
    {
      id: "lengua",
      title: "Lengua",
      icon: "book",
      color: "#f07167",
      themes: [
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
          activityLabel: "3 juegos · 18 desafíos",
          randomExerciseCount: 18,
          pacmanAngleSequence: true,
          exercises: [
            {
              id: "pacman-reconocer-angulos",
              type: "pacman-angle",
              stage: "classify",
              prompt: "¿Qué ángulo es?"
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

let data = loadData();
let route = { view: "home" };
let session = null;
let englishAudio = null;
let communicationSentence = [];
let communicationWrittenText = "";
let communicationTextPosition = 0;
let communicationStarter = null;
let communicationGroup = null;
let communicationCategory = null;
let communicationPresentation = false;
let communicationNegated = false;

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
  const roundsByStage = { classify: classifyRounds, build: buildRounds, maze: mazeRounds };
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
        fixed.id === "cs-naturales" && !savedThemes?.some((theme) => theme?.id === "partes-planta");
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
            ]
          : baseThemes;
      return {
        ...fixed,
        themes: clone(themesWithCurrentLanguageActivities)
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
  if (nextRoute.view !== "run") stopEnglishAudio();
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
  if (route.view === "subject") return subjectById(route.subjectId)?.title || "Materia";
  if (route.view === "theme") {
    const subject = subjectById(route.subjectId);
    return `${subject?.title || "Materia"} / ${themeById(subject, route.themeId)?.title || "Tema"}`;
  }
  return "Actividad";
}

function render() {
  const focusedActivityTypes = ["matching", "sound-choice", "sound-gallery", "drag-matching", "sum-choice-grid", "ghost-sum", "ghost-multiplication", "animal-sound", "rhyme-puzzle", "plant-labeling", "english-vocabulary", "circle-geometry", "pacman-angle", "instructional-recipe", "recipe-photo-matching"];
  const isFocusedActivity =
    route.view === "run" && focusedActivityTypes.includes(session?.exercises?.[session.index]?.type);
  document.documentElement.classList.toggle("communication-mode", route.view === "communication");
  document.body.classList.toggle("communication-mode", route.view === "communication");
  document.documentElement.classList.toggle("matching-mode", isFocusedActivity);
  document.body.classList.toggle("matching-mode", isFocusedActivity);
  const isDragMatchingActivity = route.view === "run" && session?.exercises?.[session.index]?.type === "drag-matching";
  document.documentElement.classList.toggle("drag-matching-mode", isDragMatchingActivity);
  document.body.classList.toggle("drag-matching-mode", isDragMatchingActivity);
  if (route.view === "school") return renderSchool();
  if (route.view === "communication") return renderCommunication();
  if (route.view === "subject") return renderSubject(route.subjectId);
  if (route.view === "theme") return renderTheme(route.subjectId, route.themeId);
  if (route.view === "run") return renderRunner();
  return renderHome();
}

function renderHome() {
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
        </div>
      </section>
    </main>
  `;
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
  const tokens = communicationSentence
    .map((id, pictoIndex) => {
      const card = communicationPicto(id);
      return card ? { type: "picto", id, pictoIndex, phrase: card.phrase || "" } : null;
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
  const parts = entry.pictos.map((id) => communicationPicto(id)?.phrase || "").filter(Boolean);
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
  const activeGridCards = `${recentMessageCards}${categoryCards}${activeGroupPictos
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

  const themes = subject.themes.length
    ? subject.themes
        .map(
          (theme) => `
        <article class="item-card">
          <div class="item-card-header">
            <span class="tile-mark" style="--subject-color:${subject.color}">${icon(subject.icon)}</span>
            <div class="item-card-body">
              <h3>${escapeHtml(theme.title)}</h3>
              <p>${escapeHtml(theme.description || "Tema sin descripcion")}</p>
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
              exercise.type === "matching"
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
                : exercise.type === "english-vocabulary"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 6} palabras diferentes cada vez</span><span class="pill">Con audio en inglés</span></div>`
                : exercise.type === "circle-geometry"
                  ? `<div class="pill-row"><span class="pill">${theme.randomExerciseCount || 10} desafíos variados</span><span class="pill">Banco de 48 situaciones</span></div>`
                : exercise.type === "pacman-angle"
                  ? `<div class="pill-row"><span class="pill">6 desafíos</span><span class="pill">Juego visual</span></div>`
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
        <h2>${escapeHtml(theme.title)}</h2>
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

  const exercises = theme.pacmanAngleSequence
    ? createPacmanAngleExercises(theme)
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
    circleGeometryLearning: exercises.some((exercise) => exercise.type === "circle-geometry"),
    circleRetryKeys: [],
    englishRetryWords: [],
    englishExtraFillers: 0
  };
  route = { view: "run" };
  render();
  if (exercises[0]?.type === "english-vocabulary") {
    window.setTimeout(() => playEnglishVocabularyAudio(), 120);
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
  const feedbackMessage = state.message || "Escuchá la palabra y tocá la opción correcta.";
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
        <div class="english-word-prompt">
          <span class="english-touch-label">${escapeHtml(exercise.prompt)}</span>
          <strong>${escapeHtml(exercise.word).toUpperCase()}</strong>
          <button class="english-audio-button" type="button" data-action="english-vocabulary-audio" aria-label="Escuchar ${escapeHtml(exercise.word)}">${icon("speaker")}<span>Escuchar</span></button>
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
  const stageLabels = { classify: "RECONOCER", build: "CONSTRUIR", maze: "USAR GIROS" };
  const content = exercise.stage === "classify"
    ? renderPacmanClassify(exercise, state, round)
    : exercise.stage === "build"
      ? renderPacmanBuild(exercise, state, round)
      : renderPacmanMaze(exercise, state, round);
  const category = PACMAN_ANGLE_CATEGORIES[round.category];
  const feedback = state.answered
    ? `${icon("check")}${exercise.stage === "maze" ? `${round.degrees}° · ` : ""}${escapeHtml(category.label.toUpperCase())}`
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
          <h2>${exercise.stage === "build" ? `HACÉ ${round.degrees}°` : escapeHtml(exercise.prompt.toUpperCase())}</h2>
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
  const guide = document.querySelector(".pacman-target-guide");
  const feedback = document.querySelector(".pacman-feedback");
  mouth?.setAttribute("d", geometry.mouthPath);
  arc?.setAttribute("d", geometry.arcPath);
  firstRay?.setAttribute("x2", geometry.firstRay.x);
  firstRay?.setAttribute("y2", geometry.firstRay.y);
  secondRay?.setAttribute("x2", geometry.secondRay.x);
  secondRay?.setAttribute("y2", geometry.secondRay.y);
  if (output) output.textContent = `${Math.round(degrees)}°`;
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
      selected: "Completó los seis desafíos",
      correct: "Completó los seis desafíos",
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
  const isCorrect = exercise.stage === "classify" ? value === round.category : Number(value) === round.degrees;
  state.selectedId = value;
  if (!isCorrect) {
    state.wrongId = value;
    state.errors += 1;
    state.message = exercise.stage === "classify" ? PACMAN_ANGLE_CATEGORIES[round.category].clue : "MIRÁ EL GIRO";
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

function renderRunner() {
  if (!session) return setRoute({ view: "home" });
  const total = session.exercises.length;
  const done = session.index >= total;
  if (done) return renderFinish();

  const exercise = session.exercises[session.index];
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
  if (exercise.type === "pacman-angle") return renderPacmanAngleRunner(exercise);
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

  renderShell(`
    <section class="screen">
      <div class="finish-panel">
        <div class="finish-score">${percent}%</div>
        <h2>${modeLabel}</h2>
        <p>${session.score} respuestas correctas de ${total}</p>
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
  }
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
  if (scopeId === COMMUNICATION_GENERAL_RECENTS_SCOPE) {
    communicationStarter = null;
    communicationGroup = null;
    communicationCategory = null;
  }
  render();
}

function addCommunicationPicto(id) {
  if (!communicationPicto(id)) return;
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

function setCommunicationSequence(ids) {
  communicationSentence = ids.filter((id) => communicationPicto(id)).slice(0, 12);
  render();
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
    communicationPresentation = false;
    return render();
  }
  communicationStarter = null;
  communicationGroup = null;
  communicationCategory = null;
  communicationNegated = false;
  setCommunicationSequence(quick.sequence);
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
  communicationSentence = [];
  communicationWrittenText = "";
  communicationTextPosition = 0;
  communicationStarter = null;
  communicationGroup = null;
  communicationCategory = null;
  communicationPresentation = false;
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
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "home") return setRoute({ view: "home" });
  if (action === "school") return setRoute({ view: "school" });
  if (action === "communication") return setRoute({ view: "communication" });
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
  if (action === "communication-present") return showCommunicationPresentation();
  if (action === "communication-close-presentation") {
    communicationPresentation = false;
    return render();
  }
  if (action === "communication-clear") return clearCommunicationSentence();
  if (action === "remove-communication-token") return removeCommunicationToken(Number(target.dataset.index));
  if (action === "open-subject") return setRoute({ view: "subject", subjectId: target.dataset.subject });
  if (action === "open-theme") return setRoute({ view: "theme", subjectId: target.dataset.subject, themeId: target.dataset.theme });
  if (action === "start") return startSession(target.dataset.subject, target.dataset.theme, target.dataset.mode);
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
  if (action === "pacman-angle-check") return checkPacmanAngleBuild();
  if (action === "pacman-angle-slider") return;
  if (action === "recipe-start") return startInstructionalRecipe();
  if (action === "recipe-answer") return answerRecipeStep(target.dataset.item);
  if (action === "recipe-continue") return continueInstructionalRecipe();
  if (action === "recipe-finish") return finishInstructionalRecipe();
  if (action === "recipe-match-step") return selectRecipeMatchStep(target.dataset.step);
  if (action === "recipe-match-photo") return selectRecipeMatchPhoto(target.dataset.photo);
  if (action === "recipe-match-finish") return finishRecipePhotoMatching();
  if (action === "answer") return answer(Number(target.dataset.index));
  if (action === "next") return nextQuestion();
  if (action === "cancel-run") {
    const subjectId = session?.subjectId;
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

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

render();
