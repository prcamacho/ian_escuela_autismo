const STORAGE_KEY = "ian-escuela-data-v1";

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H21"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H21v20H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 6h8"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-4.5 4-8 12-10 1.6 8-1.8 16-8 16Z"/><path d="M4 13c4 0 7-2 10-6"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/>',
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
  { id: "matematicas", title: "Matematicas", icon: "calc", color: "#1f7a8c" }
];

const PICTO_PATH = "assets/pictos/";

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
  cabeza: { label: "Cabeza", phrase: "cabeza", image: "cabeza.png", color: "#c44747" },
  oido: { label: "Oido", phrase: "oido", image: "oido.png", color: "#c44747" },
  mano: { label: "Mano", phrase: "mano", image: "mano.png", color: "#c44747" },
  brazo: { label: "Brazo", phrase: "brazo", image: "brazo.png", color: "#c44747" },
  pierna: { label: "Pierna", phrase: "pierna", image: "pierna.png", color: "#c44747" },
  espalda: { label: "Espalda", phrase: "espalda", image: "espalda.png", color: "#c44747" }
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
      { id: "bienestar", title: "Bienestar", pictos: ["descanso", "silencio", "auriculares", "abrazo", "solo", "medicina", "frio", "calor"] },
      { id: "comida", title: "Comida", pictos: ["agua", "pan", "gaseosa", "jugo", "leche", "galletas", "helado", "comer"] },
      { id: "actividades", title: "Hacer", pictos: ["jugar", "dibujar", "leer", "escribir", "recreo", "tarea", "otra-vez", "terminar"] },
      { id: "personas", title: "Personas y lugares", pictos: ["mama", "papa", "maestra", "companero", "terapeuta", "casa", "escuela", "aula"] },
      { id: "escuela", title: "Escuela", pictos: ["lapiz", "cuaderno", "tarea", "recreo", "leer", "escribir", "seno-carla", "seno-maribel"] },
      { id: "salidas", title: "Salidas", pictos: ["rio", "plaza", "supermercado", "shopping", "panaderia", "casa", "escuela", "recreo"] },
      { id: "compras", title: "Compras", pictos: ["comprar-pan", "comprar-gaseosa", "comprar-helado", "comprar-zapatillas", "comprar-juguete"] }
    ]
  },
  {
    id: "me-duele",
    title: "Me duele",
    color: "#c44747",
    sequence: ["doler"],
    groups: [
      { id: "cuerpo", title: "Cuerpo", pictos: ["cabeza", "oido", "mano", "brazo", "pierna", "espalda", "dolor-estomago", "dolor-garganta"] },
      { id: "ayuda", title: "Ayuda", pictos: ["necesito-ayuda", "doctor", "medicina", "descanso", "silencio", "maestra"] }
    ]
  },
  {
    id: "me-siento",
    title: "Me siento",
    color: "#7c5cdb",
    sequence: ["me-siento"],
    groups: [
      { id: "emociones", title: "Emociones", pictos: ["contento", "triste", "enfadado", "miedo", "nervioso", "cansado", "aburrido", "tranquilo"] },
      { id: "cuerpo", title: "Cuerpo", pictos: ["mareado", "enfermo", "frio", "calor", "dolor", "solo"] }
    ]
  },
  {
    id: "yo-tengo",
    title: "Yo tengo",
    color: "#ffb703",
    sequence: ["yo", "tengo"],
    groups: [
      { id: "sensaciones", title: "Sensaciones", pictos: ["hambre", "frio", "calor", "miedo", "dolor", "mareado", "cansado", "enfermo"] },
      { id: "social", title: "Social", pictos: ["turno", "lapiz", "cuaderno", "tarea", "agua", "medicina"] }
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
          id: "vocales",
          title: "Vocales",
          description: "Reconocer letras por vista y sonido.",
          exercises: [
            {
              id: "vocal-a",
              prompt: "Toca la letra A",
              support: "A",
              options: [
                { text: "A", visual: "A" },
                { text: "E", visual: "E" },
                { text: "O", visual: "O" },
                { text: "I", visual: "I" }
              ],
              correctIndex: 0
            },
            {
              id: "vocal-o",
              prompt: "Toca la letra O",
              support: "O",
              options: [
                { text: "U", visual: "U" },
                { text: "O", visual: "O" },
                { text: "A", visual: "A" },
                { text: "E", visual: "E" }
              ],
              correctIndex: 1
            }
          ]
        },
        {
          id: "silabas",
          title: "Silabas simples",
          description: "Unir sonido y silaba escrita.",
          exercises: [
            {
              id: "ma",
              prompt: "Toca MA",
              support: "MA",
              options: [
                { text: "MA", visual: "MA" },
                { text: "ME", visual: "ME" },
                { text: "PA", visual: "PA" },
                { text: "SA", visual: "SA" }
              ],
              correctIndex: 0
            }
          ]
        },
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
          title: "Relacionar multiplicaciones",
          description: "Arrastrar cada multiplicacion hasta su resultado.",
          activityLabel: "2 actividades interactivas",
          exercises: [
            {
              id: "multiplicaciones-espacio",
              type: "drag-matching",
              prompt: "Arrastra cada multiplicacion hasta su resultado",
              support: "🚀",
              pairs: [
                { id: "cuatro-por-cuatro", expression: "4 × 4", result: "16" },
                { id: "seis-por-dos", expression: "6 × 2", result: "12" },
                { id: "dos-por-cinco", expression: "2 × 5", result: "10" },
                { id: "cinco-por-tres", expression: "5 × 3", result: "15" }
              ]
            },
            {
              id: "multiplicaciones-espacio-2",
              type: "drag-matching",
              prompt: "Arrastra cada multiplicacion hasta su resultado",
              support: "🌟",
              pairs: [
                { id: "cuatro-por-dos", expression: "4 × 2", result: "8" },
                { id: "cinco-por-cuatro", expression: "5 × 4", result: "20" },
                { id: "cuatro-por-tres", expression: "4 × 3", result: "12" }
              ]
            }
          ]
        },
        {
          id: "sumas-resultados",
          title: "Sumas: elegir el resultado",
          description: "Toca la respuesta correcta en cada suma.",
          activityLabel: "2 actividades interactivas",
          exercises: [
            {
              id: "sumas-resultados-1",
              type: "sum-choice-grid",
              prompt: "Toca el resultado correcto de cada suma",
              rows: [
                { id: "suma-3-8", expression: "3 + 8", options: ["8", "10", "7", "9", "11"], correctIndex: 4 },
                { id: "suma-4-6", expression: "4 + 6", options: ["10", "6", "5", "7", "8"], correctIndex: 0 },
                { id: "suma-6-2", expression: "6 + 2", options: ["5", "8", "6", "9", "2"], correctIndex: 1 },
                { id: "suma-6-8", expression: "6 + 8", options: ["14", "15", "10", "13", "16"], correctIndex: 0 }
              ]
            },
            {
              id: "sumas-resultados-2",
              type: "sum-choice-grid",
              prompt: "Toca el resultado correcto de cada suma",
              rows: [
                { id: "suma-7-7", expression: "7 + 7", options: ["4", "14", "24", "13", "10"], correctIndex: 1 },
                { id: "suma-10-3", expression: "10 + 3", options: ["12", "13", "14", "11", "15"], correctIndex: 1 },
                { id: "suma-12-2", expression: "12 + 2", options: ["12", "13", "20", "14", "11"], correctIndex: 3 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

let data = loadData();
let route = { view: "home" };
let session = null;
let communicationSentence = [];
let communicationStarter = null;
let communicationGroup = null;
let communicationPresentation = false;
let communicationNegated = false;

const app = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");

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
      const hasPreviousMathActivity =
        fixed.id === "matematicas" &&
        !(savedThemes?.length === 1 &&
          savedThemes[0]?.id === "numeros-1-10" &&
          savedThemes[0]?.exercises?.length === 2 &&
          savedThemes[0].exercises.every(
            (exercise) => exercise?.type === "drag-matching" && [3, 4].includes(exercise.pairs?.length)
          ));
      const hasPreviousNaturalActivity =
        fixed.id === "cs-naturales" && !savedThemes?.some((theme) => theme?.id === "partes-planta");
      return {
        ...fixed,
          themes: clone(
            hasLegacySocialActivity || hasPreviousSoundActivity || hasPreviousTwoSoundActivities || hasPreviousSoundChoiceActivity || hasPreviousMathActivity || hasPreviousNaturalActivity
              ? fallback?.themes || []
            : savedThemes || fallback?.themes || []
        )
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
  return subject.themes.reduce((sum, theme) => sum + theme.exercises.length, 0);
}

function setRoute(nextRoute) {
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
  const focusedActivityTypes = ["matching", "sound-choice", "sound-gallery", "drag-matching", "sum-choice-grid", "plant-labeling"];
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

function communicationPhrase() {
  return communicationSentence
    .map((id) => communicationPicto(id)?.phrase || "")
    .filter(Boolean)
    .join(" ");
}

function pictoImage(card, className = "") {
  const version = card.imageVersion ? `?v=${card.imageVersion}` : "";
  return `<img class="${className}" src="${PICTO_PATH}${card.image}${version}" alt="" loading="lazy" decoding="async" />`;
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

function renderCommunication() {
  const activeStarter = communicationStarterById(communicationStarter);
  const starterSequence = communicationStarterSequence(activeStarter);
  const activeGroup =
    activeStarter?.groups.find((group) => group.id === communicationGroup) || activeStarter?.groups[0];
  const phrase = communicationPhrase();
  const canPresent =
    communicationSentence.length > 0 &&
    (!activeStarter || communicationSentence.length > starterSequence.length);
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
  const sentenceTokens = communicationSentence.length
    ? communicationSentence
        .map((id, index) => {
          const card = communicationPicto(id);
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
  const presentationTokens = communicationSentence
    .map((id) => {
      const card = communicationPicto(id);
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
  const groupTabs = activeStarter
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
  const builderContent = activeStarter
    ? `
      <div class="builder-title" style="--card-color:${builderColor}">
        <span>${escapeHtml(phrase || activeStarter.title)}</span>
        ${showButton}
      </div>
      <div class="builder-chips">${groupTabs}</div>
      <div class="picto-grid compact-picto-grid">${(activeGroup?.pictos || []).map((id) => renderPictoButton(id)).join("")}</div>
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
        <button class="clear-sentence" type="button" data-action="communication-clear" ${communicationSentence.length ? "" : "disabled"}>${icon("trash")}Limpiar</button>
      </article>
      <section class="communication-builder" aria-label="Armar frase">${builderContent}</section>
      ${
        communicationPresentation && communicationSentence.length
          ? `
            <section class="communication-presentation" role="dialog" aria-modal="true" aria-label="Mostrar mensaje">
              <button class="presentation-close" type="button" data-action="communication-close-presentation" aria-label="Cerrar mensaje">${icon("x")}</button>
              <div class="presentation-content">
                <div class="presentation-tokens ${communicationSentence.length > 4 ? "is-many" : ""}">${presentationTokens}</div>
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
                : exercise.type === "drag-matching"
                  ? `<div class="pill-row"><span class="pill">${exercise.pairs.length} multiplicaciones para relacionar</span></div>`
                : exercise.type === "sum-choice-grid"
                  ? `<div class="pill-row"><span class="pill">${exercise.rows.length} sumas para resolver</span></div>`
                : exercise.type === "plant-labeling"
                  ? `<div class="pill-row"><span class="pill">Conocer y ubicar ${exercise.parts.length} partes</span></div>`
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
        <span class="pill">${theme.exercises.length} ejercicios</span>
      </div>
      <div class="grid theme-grid">${exercises}</div>
    </section>
  `);
}

function startSession(subjectId, themeId, mode) {
  const subject = subjectById(subjectId);
  const theme = themeById(subject, themeId);
  if (!subject || !theme || !theme.exercises.length) return;

  const exercises = clone(theme.exercises);
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
    plantLabeling: Object.fromEntries(
      exercises
        .filter((exercise) => exercise.type === "plant-labeling")
        .map((exercise) => [
          exercise.id,
          { learning: true, placements: {}, labelOrder: shuffled(exercise.parts.map((part) => part.id)), checked: false, isCorrect: false, message: "" }
        ])
    )
  };
  route = { view: "run" };
  render();
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

function renderRunner() {
  if (!session) return setRoute({ view: "home" });
  const total = session.exercises.length;
  const done = session.index >= total;
  if (done) return renderFinish();

  const exercise = session.exercises[session.index];
  if (exercise.type === "sound-gallery") return renderSoundGalleryRunner(exercise);
  if (exercise.type === "drag-matching") return renderDragMatchingRunner(exercise);
  if (exercise.type === "sum-choice-grid") return renderSumChoiceRunner(exercise);
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

function addCommunicationPicto(id) {
  if (!communicationPicto(id)) return;
  const activeStarter = communicationStarterById(communicationStarter);
  if (activeStarter) {
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
  communicationNegated = false;
  setCommunicationSequence(quick.sequence);
}

function selectCommunicationStarter(id) {
  const starter = communicationStarterById(id);
  if (!starter) return;
  communicationStarter = starter.id;
  communicationGroup = starter.groups[0]?.id || null;
  communicationNegated = false;
  communicationSentence = starter.sequence.filter((pictoId) => communicationPicto(pictoId));
  render();
}

function resetCommunicationStarter() {
  communicationStarter = null;
  communicationGroup = null;
  communicationNegated = false;
  render();
}

function removeCommunicationToken(index) {
  if (index < 0 || index >= communicationSentence.length) return;
  const activeStarter = communicationStarterById(communicationStarter);
  if (activeStarter) {
    const starterSequence = communicationStarterSequence(activeStarter);
    if (index < starterSequence.length) return clearCommunicationSentence();
    communicationSentence = starterSequence.filter((pictoId) => communicationPicto(pictoId));
    render();
    return;
  }
  communicationSentence.splice(index, 1);
  if (!communicationSentence.length) resetCommunicationStarter();
  else render();
}

function clearCommunicationSentence() {
  communicationSentence = [];
  communicationStarter = null;
  communicationGroup = null;
  communicationPresentation = false;
  communicationNegated = false;
  render();
}

let activeDragMatchResult = null;
let suppressDragMatchClick = false;
let activePlantLabel = null;
let suppressPlantClick = false;

document.addEventListener("dragstart", (event) => {
  const result = event.target.closest('[data-action="drag-match-result"]');
  if (!result) return;
  activeDragMatchResult = result.dataset.result;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activeDragMatchResult);
  result.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="drag-match-result"]')?.classList.remove("is-dragging");
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
});

document.addEventListener("pointerup", (event) => {
  if (!activeDragMatchResult) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="drag-match-slot"]');
  const resultId = activeDragMatchResult;
  document.querySelectorAll(".is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activeDragMatchResult = null;
  if (slot) {
    suppressDragMatchClick = true;
    placeDragMatchingResult(resultId, slot.dataset.pair);
  }
});

document.addEventListener("dragstart", (event) => {
  const label = event.target.closest('[data-action="plant-label"]');
  if (!label) return;
  activePlantLabel = label.dataset.label;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", activePlantLabel);
  label.classList.add("is-dragging");
});

document.addEventListener("dragend", (event) => {
  event.target.closest('[data-action="plant-label"]')?.classList.remove("is-dragging");
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
});

document.addEventListener("pointerup", (event) => {
  if (!activePlantLabel) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-action="plant-slot"]');
  const labelId = activePlantLabel;
  document.querySelectorAll(".plant-label-chip.is-dragging").forEach((element) => element.classList.remove("is-dragging"));
  activePlantLabel = null;
  if (slot) {
    suppressPlantClick = true;
    placePlantLabel(labelId, slot.dataset.position);
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
  if (action === "communication-group") {
    communicationGroup = target.dataset.group || null;
    return render();
  }
  if (action === "add-picto") return addCommunicationPicto(target.dataset.picto);
  if (action === "communication-present" && communicationSentence.length) {
    communicationPresentation = true;
    return render();
  }
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
  if (action === "sound-gallery-show") return showSoundGalleryItem(target.dataset.item);
  if (action === "sound-gallery-close") return closeSoundGalleryItem();
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
