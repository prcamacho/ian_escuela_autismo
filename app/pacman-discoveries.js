// Six tactile discoveries. Each response is editable, checked once and followed
// by an explanation. Art is local SVG/CSS; no audio or network is needed.
const PACMAN_DISCOVERY_THEMES = [
  { subject: "lengua", discoveryMode: "mail", title: "El correo secreto", description: "Leé dos pistas, descubrí el objeto y enviá un paquete con Pac-Man.", accent: "#f3b6a0", badge: "LEER ENTRE PISTAS", symbol: "✉" },
  { subject: "cs-naturales", discoveryMode: "water", title: "El laboratorio del agua", description: "Decidí si hace falta calor o frío y anticipá cómo cambia el agua.", accent: "#9ddbc9", badge: "TRANSFORMACIONES", symbol: "◈" },
  { subject: "cs-sociales", discoveryMode: "museum", title: "El museo del antes y ahora", description: "Uní objetos de distintas épocas que resuelven la misma necesidad.", accent: "#b2cbee", badge: "LA VIDA CAMBIA", symbol: "⌛" },
  { subject: "matematicas", discoveryMode: "mirror", title: "El espejo del laberinto", description: "Encendé las casillas del otro lado y construí un dibujo simétrico.", accent: "#ffda72", badge: "SIMETRÍA", symbol: "▦" },
  { subject: "ingles", discoveryMode: "weather", title: "The weather machine", description: "Leé las pistas en inglés y cambiá el clima y el momento del día.", accent: "#c9b7ed", badge: "WEATHER & SKY", symbol: "☀" },
  { subject: "tecnologia", discoveryMode: "circuit", title: "La usina de las cerezas", description: "Girá los cables para cerrar un circuito y encender la lámpara de Pac-Man.", accent: "#a5dce5", badge: "CIRCUITOS", symbol: "ϟ" }
].map(theme => ({ ...theme, id: `pacdiscovery-${theme.discoveryMode}`, activityLabel: "NUEVO · Descubrimientos Pac-Man · 5 desafíos", randomExerciseCount: 5,
  exercises: [{ id: `pacdiscovery-${theme.discoveryMode}`, type: "pacman-discovery", prompt: theme.title }] }));

const PD_PARCELS = {
  paraguas: ["Paraguas", "☂", "assets/pictos/agua.png"], libro: ["Libro", "📖", "assets/english/book.png"],
  lapiz: ["Lápiz", "✏️", "assets/pictos/lapiz.png"], pelota: ["Pelota", "⚽", "assets/pictos/pelota.png"],
  llave: ["Llave", "🔑"], reloj: ["Reloj", "⏰"], toalla: ["Toalla", "🧺", "assets/pictos/toalla.png"],
  cuchara: ["Cuchara", "🥄"], peine: ["Peine", "🪮"], zapatos: ["Zapatillas", "👟", "assets/pictos/zapatillas.png"]
};
const PD_LETTERS = [
  ["paraguas", "Me abro sobre tu cabeza.", "Te ayudo a no mojarte cuando llueve."],
  ["libro", "Tengo páginas, pero no soy un cuaderno.", "Adentro podés leer un cuento."],
  ["lapiz", "Dejo un trazo sobre el papel.", "Cuando mi punta se gasta, me sacan punta."],
  ["pelota", "Puedo rodar por el piso.", "En un partido me patean hacia el arco."],
  ["llave", "Soy pequeña y tengo dientes, pero no como.", "Me girás en una cerradura para abrir la puerta."],
  ["reloj", "Tengo números y agujas, pero no coso.", "Te cuento qué hora es."],
  ["toalla", "Soy de tela y absorbo agua.", "Me usás para secarte después del baño."],
  ["cuchara", "Tengo un mango y una parte honda.", "Me usás para tomar la sopa."],
  ["peine", "Tengo muchos dientes en una fila.", "Ordeno el pelo sin cortarlo."],
  ["zapatos", "Vamos de a dos, uno en cada pie.", "Tenemos suela y cordones para caminar." ]
];
const PD_WATER_STATES = { ice: ["Hielo · sólido", "❄"], liquid: ["Agua · líquido", "💧"], gas: ["Vapor de agua · gas", "◌"] };
const PD_WATER_CASES = [
  ["Un cubito queda al sol y se derrite.", "ice", "heat", "liquid", "Al recibir calor, el hielo se derrite: pasa de sólido a líquido."],
  ["Un muñeco de hielo empieza a derretirse en un lugar cálido.", "ice", "heat", "liquid", "El hielo recibe calor del ambiente y se convierte en agua líquida."],
  ["Sacamos un hielo y lo dejamos en una mesa cálida.", "ice", "heat", "liquid", "Con el calor del ambiente, el hielo se derrite y pasa al estado líquido."],
  ["Ponemos una cubetera con agua en el congelador hasta que se congela.", "liquid", "cool", "ice", "Al perder calor en el congelador, el agua se congela: pasa de líquido a sólido."],
  ["Queremos convertir agua líquida en un cubito.", "liquid", "cool", "ice", "Hay que enfriar el agua lo suficiente para que se congele y forme hielo."],
  ["El agua de un pequeño recipiente se congela durante una noche muy fría.", "liquid", "cool", "ice", "El agua pierde calor y se congela: se convierte en hielo sólido."],
  ["El agua de un charquito se evapora con el calor del sol.", "liquid", "heat", "gas", "El agua líquida recibe calor y se evapora. El vapor de agua es un gas invisible."],
  ["Una tela mojada se seca al sol: el agua se evapora.", "liquid", "heat", "gas", "El agua de la tela recibe calor y pasa al aire como vapor de agua invisible."],
  ["En nuestro laboratorio imaginario, calentamos agua hasta que se evapora.", "liquid", "heat", "gas", "Con el calor, el agua líquida se convierte en vapor de agua. Lo representamos con puntos, porque es invisible."],
  ["El vapor de agua toca un espejo frío y forma gotitas.", "gas", "cool", "liquid", "El vapor pierde calor junto al espejo frío y se condensa: pasa de gas a líquido."],
  ["El vapor de agua encuentra una tapa fría y se vuelve gotas.", "gas", "cool", "liquid", "Al enfriarse, el vapor se condensa y forma agua líquida."],
  ["Queremos que el vapor de agua se condense en una superficie fría.", "gas", "cool", "liquid", "El vapor debe perder calor para condensarse en gotitas de agua líquida."]
];
// These are examples from different eras, not claims that older objects vanished.
const PD_EXHIBITS = [
  ["Iluminar una habitación", "Vela", "🕯️", "Lámpara eléctrica", "💡"],
  ["Enviar un mensaje escrito a alguien que está lejos", "Carta en papel", "✉️", "Mensaje por celular", "📱"],
  ["Escribir un texto", "Pluma con tinta", "🪶", "Teclado de computadora", "⌨️"],
  ["Encontrar un camino en una ciudad", "Mapa en papel", "🗺️", "Mapa en el celular", "📍"],
  ["Limpiar el polvo del piso", "Escoba", "🧹", "Aspiradora", "◉"],
  ["Mover aire para refrescarnos", "Abanico", "🪭", "Ventilador eléctrico", "✣"],
  ["Lavar la ropa", "Tabla de lavar a mano", "🧺", "Lavarropas", "▣"],
  ["Hacer cálculos", "Ábaco", "🧮", "Calculadora electrónica", "🔢"],
  ["Escuchar música grabada", "Gramófono", "📯", "Reproductor digital", "🎧"],
  ["Sacar fotografías", "Cámara con rollo", "📷", "Cámara digital", "📸"]
];
const PD_MIRRORS = [
  [0, 1, 3, 6, 7, 9], [2, 4, 5, 7, 10, 11], [0, 2, 3, 5, 6, 8, 9, 11],
  [1, 3, 4, 5, 7, 10], [0, 1, 2, 3, 6, 9, 10, 11], [0, 3, 4, 6, 7, 8, 9],
  [2, 4, 5, 6, 7, 8, 10], [1, 2, 3, 5, 6, 8, 10, 11],
  [0, 2, 4, 6, 8, 9, 11], [0, 1, 4, 6, 7, 9, 10], [1, 4, 6, 7, 8, 9, 11], [0, 2, 3, 4, 7, 10, 11]
];
const PD_WEATHER = { sunny: ["Sol", "Soleado"], cloudy: ["Nubes", "Nublado"], rainy: ["Lluvia", "Lluvioso"], snowy: ["Nieve", "Nevado"], windy: ["Viento", "Ventoso"] };
const PD_RING = [0, 1, 2, 5, 8, 7, 6, 3];
// North, east, south, west. Straight and elbow pieces are two-ended wires.
const PD_WIRE_BASE = { elbow: [0, 1], straight: [1, 3] };
const PD_RING_SOLUTION = [1, 0, 2, 1, 0, 1, 0, 0, 3];

function withPacmanDiscoveryThemes(subjectId, themes) {
  const additions = PACMAN_DISCOVERY_THEMES.filter(theme => theme.subject === subjectId);
  return [...additions, ...themes.filter(theme => !additions.some(item => item.id === theme?.id))];
}
function createPacmanDiscoveryExercises(theme) {
  const mode = theme.discoveryMode;
  let rounds = [];
  if (mode === "mail") rounds = saTake(PD_LETTERS, "discovery-mail").map(([correct, ...clues]) => ({
    prompt: "¿Qué objeto pide esta carta?", clues, correct,
    options: pwOptions(correct, Object.keys(PD_PARCELS)),
    explanation: `La respuesta es «${PD_PARCELS[correct][0].toLowerCase()}». Las dos pistas describen ese objeto.`
  }));
  if (mode === "water") rounds = saTake(PD_WATER_CASES, "discovery-water").map(([scene, initial, change, result, explanation]) => ({
    prompt: "Prepará el cambio y anticipá el resultado.", scene, initial, correct: [change, result], explanation
  }));
  if (mode === "museum") rounds = saTake(PD_EXHIBITS.map((_, i) => i), "discovery-museum").map(correct => ({
    prompt: "Elegí un objeto de cada época para la misma necesidad.", purpose: PD_EXHIBITS[correct][0], correct: [String(correct), String(correct)],
    past: pwOptions(String(correct), PD_EXHIBITS.map((_, i) => String(i)), 3),
    present: pwOptions(String(correct), PD_EXHIBITS.map((_, i) => String(i)), 3),
    explanation: `${PD_EXHIBITS[correct][1]} y ${PD_EXHIBITS[correct][3]} sirven para ${PD_EXHIBITS[correct][0].toLowerCase()}. Hoy también podemos usar objetos de antes.`
  }));
  if (mode === "mirror") rounds = saTake(PD_MIRRORS, "discovery-mirror").map(pattern => ({
    prompt: "Completá el dibujo como si se mirara en un espejo.", pattern,
    correct: pattern.map(i => Math.floor(i / 3) * 3 + 2 - i % 3).sort((a, b) => a - b),
    explanation: "Cada casilla debe quedar en la misma fila y a la misma distancia de la línea del espejo. Mirá el contorno de la solución."
  }));
  if (mode === "weather") {
    const pool = Object.keys(PD_WEATHER).flatMap(weather => (weather === "sunny" ? ["day"] : ["day", "night"]).map(time => ({ weather, time })));
    rounds = saTake(pool, "discovery-weather").map(({ weather, time }) => ({
      prompt: "Leé las dos pistas y prepará la ventana.", clue: `It is ${weather}. It is ${time}.`, correct: [weather, time],
      explanation: `${weather} = ${PD_WEATHER[weather][1].toLowerCase()} · ${time} = ${time === "day" ? "día" : "noche"}.`
    }));
  }
  if (mode === "circuit") rounds = saTake(Array.from({ length: 12 }, (_, i) => i), "discovery-circuit").map(variant => {
    const battery = [7, 3, 1, 5][variant % 4], lamp = 8 - battery;
    const movable = PD_RING.filter(i => i !== battery && i !== lamp);
    const rotations = PD_RING_SOLUTION.map((rotation, i) => movable.includes(i) ? rotation + 1 + (variant + i) % 3 : rotation);
    return { prompt: "Girá los cables y cerrá todo el recorrido.", variant, battery, lamp, movable, rotations,
      explanation: "La corriente necesita un camino cerrado: sale de un polo de la pila, pasa por la lámpara y vuelve al otro polo. Los extremos de cada cable deben coincidir con los de al lado." };
  });
  return rounds.map((round, i) => ({ ...round, mode, id: `${theme.id}-${i}`, type: "pacman-discovery" }));
}
function createPacmanDiscoveryState(exercise) {
  return { choice: null, values: {}, painted: [], rotations: [...(exercise.rotations || [])], touched: false, checked: false, isCorrect: false };
}
function pdCurrent() {
  const exercise = session?.exercises?.[session.index];
  return route.view === "run" && exercise?.type === "pacman-discovery" ? { exercise, state: session.discoveries[exercise.id] } : null;
}
function pdWireKind(index) { return [0, 2, 6, 8].includes(index) ? "elbow" : "straight"; }
function pdWireEnds(index, rotation) { return PD_WIRE_BASE[pdWireKind(index)].map(direction => (direction + rotation) % 4); }
function pdCircuitClosed(exercise, rotations) {
  if (!Array.isArray(rotations) || rotations.length !== 9 || rotations.some(r => !Number.isInteger(r) || r < 0)) return false;
  const seen = new Set(), queue = [exercise.battery], directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  while (queue.length) {
    const index = queue.shift();
    if (seen.has(index)) continue;
    seen.add(index);
    for (const direction of pdWireEnds(index, rotations[index])) {
      const [dx, dy] = directions[direction], x = index % 3 + dx, y = Math.floor(index / 3) + dy, neighbor = y * 3 + x;
      if (x < 0 || x > 2 || y < 0 || y > 2 || !PD_RING.includes(neighbor) || !pdWireEnds(neighbor, rotations[neighbor]).includes((direction + 2) % 4)) return false;
      if (!seen.has(neighbor)) queue.push(neighbor);
    }
  }
  return seen.size === 8 && seen.has(exercise.lamp);
}
function pdCanCheck(exercise, state) {
  if (exercise.mode === "mail") return exercise.options.includes(state.choice);
  if (exercise.mode === "water") return ["heat", "cool"].includes(state.values.change) && Object.hasOwn(PD_WATER_STATES, state.values.result);
  if (exercise.mode === "museum") return exercise.past.includes(state.values.past) && exercise.present.includes(state.values.present);
  if (exercise.mode === "weather") return Object.hasOwn(PD_WEATHER, state.values.weather) && ["day", "night"].includes(state.values.time);
  return state.touched;
}
function pdSelected(exercise, state) {
  if (exercise.mode === "mail") return state.choice;
  if (exercise.mode === "water") return [state.values.change, state.values.result];
  if (exercise.mode === "museum") return [state.values.past, state.values.present];
  if (exercise.mode === "weather") return [state.values.weather, state.values.time];
  if (exercise.mode === "mirror") return [...state.painted].sort((a, b) => a - b);
  return [...state.rotations];
}
function pdPick(field, value, label, state, art = "") {
  const selected = field === "parcel" ? state.choice === value : state.values[field] === value;
  return `<button type="button" class="pd-pick ${selected ? "is-selected" : ""}" data-action="pd-pick" data-field="${field}" data-value="${escapeHtml(value)}" aria-pressed="${selected}" ${state.checked ? "disabled" : ""}>${art}<span>${escapeHtml(label)}</span><i aria-hidden="true">${selected ? "●" : "○"}</i></button>`;
}
function pdParcelArt(id) {
  const [label, emoji, image] = PD_PARCELS[id];
  return image && id !== "paraguas" ? `<img src="${image}" alt="" draggable="false" />` : `<span class="pd-object-emoji" aria-hidden="true">${emoji}</span>`;
}
function pdMail(exercise, state) {
  return `<div class="pd-letter"><span class="pd-postmark" aria-hidden="true">PAC-POST<br>✦</span><small>PARA EL CORREO DE PAC-MAN</small>${exercise.clues.map((clue, i) => `<p><b>0${i + 1}</b>${escapeHtml(clue)}</p>`).join("")}</div><div class="pd-parcels">${exercise.options.map(id => pdPick("parcel", id, PD_PARCELS[id][0], state, pdParcelArt(id))).join("")}</div><div class="pd-delivery ${state.checked && state.isCorrect ? "is-delivered" : ""}" aria-hidden="true"><span class="pd-courier">${pwPacman()}</span><span class="pd-post-road"></span><span class="pd-package">${state.choice ? PD_PARCELS[state.choice][1] : "✉"}</span><span class="pd-recipient">${pacmanVerbGhost("#bdace8")}</span><span class="pd-delivery-spark">✦</span></div>`;
}
function pdWaterArt(form, extra = "") {
  return `<div class="pd-beaker pd-form-${form} ${extra}" aria-hidden="true"><span class="pd-beaker-glint"></span><div class="pd-water-body"></div><div class="pd-ice-cubes"><i></i><i></i><i></i></div><div class="pd-molecules">${Array.from({ length: 9 }, (_, i) => `<i style="--pd-i:${i};--pd-x:${12 + i % 3 * 30}%;--pd-y:${18 + Math.floor(i / 3) * 25}%"></i>`).join("")}</div><div class="pd-beaker-marks">—<br>—<br>—</div></div>`;
}
function pdWater(exercise, state) {
  const result = state.checked ? exercise.correct[1] : state.values.result;
  return `<p class="pd-situation">${escapeHtml(exercise.scene)}</p><div class="pd-water-workbench"><div class="pd-experiment"><div><small>AL COMENZAR</small>${pdWaterArt(exercise.initial)}<strong>${PD_WATER_STATES[exercise.initial][0]}</strong></div><span class="pd-transform-arrow" aria-hidden="true">→</span><div><small>${state.checked ? "ASÍ SE TRANSFORMA" : "TU PREDICCIÓN"}</small>${result ? pdWaterArt(result, state.checked ? "pd-transforming" : "") : '<div class="pd-beaker pd-beaker-empty" aria-hidden="true">?</div>'}<strong>${result ? PD_WATER_STATES[result][0] : "¿Cómo quedará?"}</strong></div></div><div class="pd-water-fields"><fieldset><legend>1. ¿Qué cambio necesita?</legend><div class="pd-two">${pdPick("change", "heat", "Recibir calor", state, '<span aria-hidden="true">☀</span>')}${pdPick("change", "cool", "Perder calor · enfriar", state, '<span aria-hidden="true">❄</span>')}</div></fieldset><fieldset><legend>2. ¿En qué se convierte?</legend><div class="pd-three">${Object.entries(PD_WATER_STATES).map(([id, [label, symbol]]) => pdPick("result", id, label, state, `<span aria-hidden="true">${symbol}</span>`)).join("")}</div></fieldset></div></div><p class="pd-note">El vapor de agua es invisible. Los puntitos nos ayudan a imaginarlo.</p>`;
}
function pdExhibitArt(id, present) {
  const art = {
    "3-true": '<rect x="18" y="3" width="30" height="57" rx="6" fill="#a5c6d6"/><rect x="22" y="10" width="22" height="40" rx="2" fill="#e2eddb"/><path d="m23 17 20 14-20 11m8-31 4 38" fill="none" stroke="#b8d0ad" stroke-width="4"/><path d="M28 37q-7-9 1-15t9 6Z" fill="#e9a48d"/><circle cx="30" cy="27" r="2" fill="#fff7e4"/><circle cx="33" cy="55" r="2" fill="#4c687b"/>',
    "4-true": '<path d="M24 32V20q0-16 17-12t14 21L44 49" fill="none" stroke="#657c86" stroke-width="5"/><path d="M12 27q-6 3-6 18v9h28V42q0-15-11-15Z" fill="#aac7ce"/><rect x="9" y="32" width="21" height="14" rx="6" fill="#cfe0df"/><circle cx="13" cy="55" r="5" fill="#526777"/><circle cx="30" cy="55" r="5" fill="#526777"/><path d="M36 52h21l3 7H33Z" fill="#ddb88c"/>',
    "5-true": '<path d="M32 38v19M19 60h26" fill="none" stroke="#6c8492" stroke-width="5"/><circle cx="32" cy="25" r="22" fill="#dde8e5" stroke="#839ba4" stroke-width="3"/><g class="pd-fan-blades" fill="#95c6bf"><path d="M32 25Q9 27 18 10q12-8 14 15M32 25q8-22 22-7 1 14-22 7M32 25q17 16-4 23-12-7 4-23"/></g><circle cx="32" cy="25" r="5" fill="#ddbd83"/>',
    "6-false": '<path d="M12 4h40v56H12Z" fill="#dfbd8c" stroke="#a78860" stroke-width="3"/><rect x="18" y="14" width="28" height="38" rx="3" fill="#b2bec3"/><path d="M19 21h26M19 27h26M19 33h26M19 39h26M19 45h26" stroke="#7e969e" stroke-width="3"/>',
    "6-true": '<rect x="8" y="4" width="48" height="56" rx="5" fill="#b4d0de" stroke="#7595a8" stroke-width="2"/><path d="M9 16h46" stroke="#7595a8" stroke-width="2"/><rect x="14" y="9" width="14" height="3" rx="1" fill="#ebf2ed"/><circle cx="47" cy="10" r="3" fill="#e5c78c"/><circle cx="32" cy="37" r="16" fill="#f0f5e9" stroke="#829ba8" stroke-width="3"/><circle cx="32" cy="37" r="11" fill="#8db7c9"/><path d="M23 39q7-5 18 0" stroke="#d6eced" stroke-width="3" fill="none"/>',
    "7-true": '<rect x="12" y="3" width="40" height="58" rx="5" fill="#9db6be"/><rect x="17" y="9" width="30" height="13" rx="2" fill="#dae4bf"/><path d="M20 30h4m7 0h4m7 0h3M20 40h4m7 0h4m7 0h3M20 50h4m7 0h4m7 0h3" stroke="#f3f6eb" stroke-width="5" stroke-linecap="round"/>',
    "8-false": '<path d="M10 47h44v13H10Z" fill="#bda078"/><ellipse cx="32" cy="46" rx="19" ry="5" fill="#6c7277"/><path d="M24 40V26l19-4" fill="none" stroke="#ab8b60" stroke-width="4"/><path d="m27 23 7-14 23-7-4 26-19 5Z" fill="#e3bd7d" stroke="#a88554" stroke-width="2"/><ellipse cx="53" cy="15" rx="6" ry="13" fill="#f5d79f" stroke="#a88554" stroke-width="2"/>',
    "8-true": '<rect x="17" y="3" width="30" height="58" rx="6" fill="#8fadb9"/><rect x="21" y="10" width="22" height="32" rx="3" fill="#e4e6d5"/><path d="M28 33V19l10-2v13" fill="none" stroke="#9f85ad" stroke-width="3"/><circle cx="25" cy="33" r="4" fill="#9f85ad"/><circle cx="35" cy="30" r="4" fill="#9f85ad"/><circle cx="32" cy="52" r="6" fill="#dce5dc"/>'
  }[`${id}-${present}`];
  return `<span class="pd-exhibit-art" aria-hidden="true">${art ? `<svg viewBox="0 0 64 64">${art}</svg>` : PD_EXHIBITS[Number(id)][present ? 4 : 2]}</span>`;
}
function pdMuseum(exercise, state) {
  return `<div class="pd-purpose"><span>LA MISMA NECESIDAD</span><strong>${escapeHtml(exercise.purpose)}</strong></div><div class="pd-museum-shelves">${["past", "present"].map((field, f) => `<fieldset class="pd-era pd-era-${field}"><legend>${f ? "AHORA · OTRA TECNOLOGÍA" : "ANTES · EN OTRAS ÉPOCAS"}</legend>${exercise[field].map(id => pdPick(field, id, PD_EXHIBITS[Number(id)][f ? 3 : 1], state, pdExhibitArt(id, Boolean(f)))).join("")}</fieldset>`).join("")}</div><div class="pd-time-bridge ${state.checked && state.isCorrect ? "is-connected" : ""}" aria-hidden="true"><span>ANTES</span><i></i><b>${pwPacman()}</b><i></i><span>AHORA</span></div><p class="pd-note">Los objetos cambian. Algunos de antes también se siguen usando.</p>`;
}
function pdMirror(exercise, state) {
  return `<div class="pd-mirror-caption"><span>EL MODELO</span><span>TU REFLEJO</span></div><div class="pd-mirror-grid" role="group" aria-label="Dibujo de cuatro filas, con tres columnas a cada lado del espejo">${Array.from({ length: 4 }, (_, row) => `<div class="pd-mirror-row">${Array.from({ length: 6 }, (_, col) => {
    const index = row * 3 + col % 3, left = col < 3, on = left ? exercise.pattern.includes(index) : state.painted.includes(index), answer = !left && state.checked && exercise.correct.includes(index);
    return left ? `<span class="pd-pixel pd-model ${on ? "is-on" : ""}" aria-label="Modelo: fila ${row + 1}, columna ${col + 1}, ${on ? "encendida" : "vacía"}">${on ? "●" : ""}</span>` : `<button type="button" class="pd-pixel ${on ? "is-on" : ""} ${answer ? "is-answer" : ""}" style="--pd-delay:${index * .045}s" data-action="pd-paint" data-index="${index}" aria-label="Reflejo: fila ${row + 1}, columna ${col - 2} desde el espejo" aria-pressed="${on}" ${state.checked ? "disabled" : ""}>${on ? "●" : ""}${answer && !on ? '<i aria-hidden="true">○</i>' : ""}</button>`;
  }).join("")}</div>`).join("")}<span class="pd-mirror-axis" aria-hidden="true"></span></div><div class="pd-mirror-tools"><p>Tocá para encender o apagar. Empezá por las casillas que están junto al espejo.</p><button class="pd-secondary" type="button" data-action="pd-clear" ${state.checked || !state.painted.length ? "disabled" : ""}>Borrar dibujo ↺</button></div>${state.checked ? '<p class="pd-note">El contorno verde marca las casillas que forman el reflejo.</p>' : ""}`;
}
function pdWeatherIcon(weather) {
  const sun = '<circle cx="40" cy="32" r="13" fill="#ffd675"/><path d="M40 9V3M40 61V55M17 32H10M70 32H63M23 15l-5-5M57 15l5-5M23 49l-5 5M57 49l5 5" stroke="#c2923f" stroke-width="3" stroke-linecap="round"/>';
  const cloud = '<path d="M17 42a11 11 0 0 1 5-21 18 18 0 0 1 34-1 12 12 0 1 1 4 24H20Z" fill="#c3d4e6" stroke="#7693b4" stroke-width="2"/>';
  const drawings = { sunny: sun, cloudy: cloud, rainy: `${cloud}<path d="m26 50-4 9m18-9-4 9m18-9-4 9" stroke="#629ac8" stroke-width="4" stroke-linecap="round"/>`, snowy: `${cloud}<g fill="#83a8c9"><circle cx="23" cy="54" r="3"/><circle cx="40" cy="59" r="3"/><circle cx="56" cy="53" r="3"/></g>`, windy: '<path d="M9 24h42q18 0 12-13t-17-2M9 36h55q17 0 12 13t-17 2M9 48h29" fill="none" stroke="#82acae" stroke-width="5" stroke-linecap="round"/>' };
  return `<svg viewBox="0 0 84 68" aria-hidden="true">${drawings[weather]}</svg>`;
}
function pdWeatherScene(weather, time) {
  return `<div class="pd-window pd-sky-${time} pd-weather-${weather}" aria-hidden="true"><span class="pd-celestial"></span><span class="pd-sky-stars">✧ · ✦</span><div class="pd-cloud pd-cloud-one"></div><div class="pd-cloud pd-cloud-two"></div><div class="pd-precipitation">${Array.from({ length: 11 }, (_, i) => `<i style="--pd-i:${i};left:${7 + i * 8}%"></i>`).join("")}</div><div class="pd-wind-lines"><i></i><i></i><i></i></div><div class="pd-hill"></div><div class="pd-window-house"><i></i><i></i></div><div class="pd-window-pacman">${pwPacman()}</div><span class="pd-window-ground"></span><span class="pd-window-frame"></span></div>`;
}
function pdWeather(exercise, state) {
  const weather = state.values.weather, time = state.values.time;
  return `<div class="pd-english-message" lang="en">${escapeHtml(exercise.clue)}</div>${pdWeatherScene(weather || "unset", time || "day")}<div class="pd-weather-controls"><fieldset><legend>1. Girá el selector del clima</legend><div class="pd-dial"><button type="button" class="pd-dial-arrow" data-action="pd-weather-turn" data-delta="-1" aria-label="Clima anterior" ${state.checked ? "disabled" : ""}>‹</button><div role="status">${weather ? pdWeatherIcon(weather) : '<span class="pd-dial-question">?</span>'}<strong>${weather ? PD_WEATHER[weather][0] : "Elegí un clima"}</strong></div><button type="button" class="pd-dial-arrow" data-action="pd-weather-turn" data-delta="1" aria-label="Clima siguiente" ${state.checked ? "disabled" : ""}>›</button></div></fieldset><fieldset><legend>2. Elegí cuándo sucede</legend><div class="pd-two">${pdPick("time", "day", "Día", state, '<span aria-hidden="true">☀</span>')}${pdPick("time", "night", "Noche", state, '<span aria-hidden="true">☾</span>')}</div></fieldset></div>`;
}
function pdCircuit(exercise, state) {
  const powered = state.checked && state.isCorrect;
  return `<div class="pd-circuit-stage ${powered ? "is-powered" : ""}" data-round="${exercise.id}" data-phase="${state.checked}"><div class="pd-circuit-grid" role="group" aria-label="Circuito de tres filas y tres columnas. Girá cada cable para unir sus extremos.">${Array.from({ length: 9 }, (_, i) => {
    if (i === 4) return `<div class="pd-power-friend" aria-hidden="true">${pwPacman()}<span>🍒</span></div>`;
    const movable = exercise.movable.includes(i), isLamp = i === exercise.lamp, isBattery = i === exercise.battery;
    const wire = pdWireKind(i) === "elbow" ? "M50 0V50H100" : "M0 50H100";
    const solution = state.checked && !state.isCorrect ? `<path class="pd-wire-guide" d="${wire}" transform="rotate(${PD_RING_SOLUTION[i] * 90} 50 50)"/>` : "";
    const drawing = `<svg viewBox="0 0 100 100" aria-hidden="true">${solution}<g class="pd-wire-rotor" style="transform:rotate(${state.rotations[i] * 90}deg)"><path class="pd-wire-track" d="${wire}"/><path class="pd-wire" d="${wire}"/><path class="pd-current" d="${wire}"/></g>${isLamp ? '<g class="pd-lamp-glow"><circle cx="50" cy="45" r="27"/></g><path class="pd-lamp-bulb" d="M37 56c-16-20-2-37 13-37s29 17 13 37l-4 8H41Z"/><path d="M42 68h16M44 74h12" stroke="#3e536c" stroke-width="5" stroke-linecap="round"/>' : isBattery ? '<rect x="24" y="32" width="52" height="36" rx="6" fill="#edf1de" stroke="#607553" stroke-width="3"/><path d="M33 50h12M61 44v12M55 50h12" stroke="#44573d" stroke-width="3"/>' : '<circle cx="50" cy="50" r="5" fill="#fcdfa0"/>'}</svg>`;
    return movable ? `<button type="button" class="pd-wire-tile" data-action="pd-rotate" data-index="${i}" aria-label="Girar cable: fila ${Math.floor(i / 3) + 1}, columna ${i % 3 + 1}. Extremos: ${pdWireEnds(i, state.rotations[i]).map(d => ["arriba", "derecha", "abajo", "izquierda"][d]).join(" y ")}." ${state.checked ? "disabled" : ""}>${drawing}<span aria-hidden="true">↻</span></button>` : `<div class="pd-wire-tile pd-wire-fixed" role="img" aria-label="${isLamp ? "Lámpara" : "Pila: polo positivo y polo negativo"}">${drawing}<small>${isLamp ? "LÁMPARA" : "PILA"}</small></div>`;
  }).join("")}</div><p class="pd-note">Tocá un cable para girarlo un cuarto de vuelta. La pila y la lámpara quedan fijas.</p></div>${state.checked && !state.isCorrect ? '<p class="pd-note">La línea verde punteada muestra cómo cerrar el circuito.</p>' : ""}${powered ? '<button class="pd-secondary pd-replay" type="button" data-action="pd-replay">Ver la corriente ↻</button>' : ""}`;
}
function pdTrail(state) {
  return `<div class="pd-trail" aria-label="${session.index + (state.checked ? 1 : 0)} de ${session.exercises.length} desafíos terminados">${session.exercises.map((_, i) => `<span class="${i < session.index || i === session.index && state.checked ? "is-done" : i === session.index ? "is-current" : ""}">${i < session.index || i === session.index && state.checked ? "★" : i + 1}</span>`).join("")}</div>`;
}
function renderPacmanDiscoveryRunner(exercise, replay = false) {
  const state = session.discoveries[exercise.id], theme = PACMAN_DISCOVERY_THEMES.find(t => t.discoveryMode === exercise.mode);
  const oldCircuit = replay ? null : document.querySelector(".pd-circuit-stage");
  const feedback = state.checked ? `${state.isCorrect ? "¡Lo descubriste!" : "Vamos a mirarlo juntos."} ${exercise.explanation}` : "Explorá y cambiá tu respuesta. Cuando esté lista, comprobá.";
  const task = { mail: pdMail, water: pdWater, museum: pdMuseum, mirror: pdMirror, weather: pdWeather, circuit: pdCircuit }[exercise.mode];
  renderShell(`<section class="pd-runner pd-${exercise.mode} ${state.checked ? state.isCorrect ? "pd-success" : "pd-review" : ""}" style="--pd-accent:${theme.accent}"><header class="pd-header"><button class="pd-back" type="button" data-action="cancel-run">${icon("arrow")} ${escapeHtml(session.subjectTitle)}</button><div><span>PAC-MAN · DESCUBRIMIENTOS</span><strong>${escapeHtml(session.themeTitle)}</strong></div><b>${session.index + 1}<span> / ${session.exercises.length}</span></b></header><div class="pd-layout"><aside class="pd-passport"><span class="pd-passport-label">PASAPORTE DE EXPLORADOR</span><div class="pd-emblem" aria-hidden="true"><span>${theme.symbol}</span>${pwPacman()}</div><h2>${theme.badge}</h2><p>Cada idea abre<br>un camino nuevo.</p>${pdTrail(state)}<span class="pd-pace">A tu ritmo · Sin reloj</span><div class="pd-passport-friends" aria-hidden="true">${pacmanVerbGhost("#99cfc8")}<span>· · ·</span>${pacmanVerbGhost("#c8b0e7")}</div></aside><article class="pd-board"><div class="pd-board-kicker"><span>EXPLORÁ · PENSÁ · DESCUBRÍ</span><span aria-hidden="true">✦</span></div><h2 id="pd-question" tabindex="-1">${escapeHtml(exercise.prompt)}</h2>${task(exercise, state)}<footer class="pd-controls"><p role="status" aria-live="polite">${escapeHtml(feedback)}</p>${state.checked ? `<button class="pd-primary" type="button" data-action="pd-next">${session.index + 1 === session.exercises.length ? "Ver mis descubrimientos" : "Siguiente desafío"} →</button>` : `<button class="pd-primary" type="button" data-action="pd-check" ${pdCanCheck(exercise, state) ? "" : "disabled"}>${exercise.mode === "circuit" ? "Probar circuito" : "Comprobar"} ${icon("check")}</button>`}</footer></article></div></section>`);
  // Keep the actual wire nodes between taps so each quarter-turn interpolates
  // from its current angle instead of restarting an animation on a new element.
  if (oldCircuit?.dataset.round === exercise.id && oldCircuit.dataset.phase === String(state.checked)) {
    for (const button of oldCircuit.querySelectorAll('[data-action="pd-rotate"]')) {
      const index = Number(button.dataset.index);
      button.querySelector(".pd-wire-rotor").style.transform = `rotate(${state.rotations[index] * 90}deg)`;
      button.setAttribute("aria-label", `Girar cable: fila ${Math.floor(index / 3) + 1}, columna ${index % 3 + 1}. Extremos: ${pdWireEnds(index, state.rotations[index]).map(d => ["arriba", "derecha", "abajo", "izquierda"][d]).join(" y ")}.`);
    }
    document.querySelector(".pd-circuit-stage")?.replaceWith(oldCircuit);
  }
}
function pacmanDiscoveryAction(action, target) {
  const current = pdCurrent();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "pd-next") {
    if (!state.checked) return;
    session.index++; render(); window.scrollTo({ top: 0, behavior: "auto" });
    document.querySelector("#pd-question, #pd-finish-title")?.focus({ preventScroll: true }); return;
  }
  if (action === "pd-replay" && exercise.mode === "circuit" && state.checked && state.isCorrect) { renderPacmanDiscoveryRunner(exercise, true); document.querySelector('[data-action="pd-replay"]')?.focus({ preventScroll: true }); return; }
  if (state.checked) return;
  const { field, value } = target.dataset;
  let focus = `[data-action="${action}"]`;
  if (action === "pd-pick") {
    const options = exercise.mode === "mail" && field === "parcel" ? exercise.options : exercise.mode === "water" && field === "change" ? ["heat", "cool"] : exercise.mode === "water" && field === "result" ? Object.keys(PD_WATER_STATES) : exercise.mode === "museum" && ["past", "present"].includes(field) ? exercise[field] : exercise.mode === "weather" && field === "time" ? ["day", "night"] : [];
    if (!options.includes(value)) return;
    if (field === "parcel") state.choice = value; else state.values[field] = value;
    focus += `[data-field="${field}"][data-value="${CSS.escape(value)}"]`;
  } else if (action === "pd-weather-turn") {
    const delta = Number(target.dataset.delta);
    if (exercise.mode !== "weather" || ![-1, 1].includes(delta)) return;
    const keys = Object.keys(PD_WEATHER), index = keys.indexOf(state.values.weather);
    state.values.weather = keys[index < 0 ? delta === 1 ? 0 : keys.length - 1 : (index + delta + keys.length) % keys.length];
    focus += `[data-delta="${delta}"]`;
  } else if (action === "pd-paint") {
    const index = Number(target.dataset.index);
    if (exercise.mode !== "mirror" || !Number.isInteger(index) || index < 0 || index >= 12) return;
    state.painted = state.painted.includes(index) ? state.painted.filter(i => i !== index) : [...state.painted, index]; state.touched = true;
    focus += `[data-index="${index}"]`;
  } else if (action === "pd-clear") {
    if (exercise.mode !== "mirror") return;
    state.painted = []; state.touched = false;
    focus = '[data-action="pd-paint"][data-index="0"]';
  } else if (action === "pd-rotate") {
    const index = Number(target.dataset.index);
    if (exercise.mode !== "circuit" || !Number.isInteger(index) || !exercise.movable.includes(index)) return;
    state.rotations[index]++; state.touched = true; focus += `[data-index="${index}"]`;
  } else if (action === "pd-check") {
    if (!pdCanCheck(exercise, state)) return;
    const selected = pdSelected(exercise, state);
    state.isCorrect = exercise.mode === "circuit" ? pdCircuitClosed(exercise, state.rotations) : JSON.stringify(selected) === JSON.stringify(exercise.correct);
    state.checked = true;
    if (state.isCorrect) session.score++;
    session.answers.push({ prompt: exercise.prompt, selected: clone(selected), correct: clone(exercise.correct ?? PD_RING_SOLUTION), isCorrect: state.isCorrect });
    focus = '[data-action="pd-next"]';
  } else return;
  const scroll = window.scrollY;
  render(); window.scrollTo({ top: scroll, behavior: "auto" });
  document.querySelector(focus)?.focus({ preventScroll: true });
}
function renderPacmanDiscoveryFinish() {
  const theme = PACMAN_DISCOVERY_THEMES.find(t => t.id === session.themeId);
  renderShell(`<section class="pd-runner pd-finish" style="--pd-accent:${theme.accent}"><span class="pd-finish-kicker">PASAPORTE COMPLETO · ${escapeHtml(session.subjectTitle)}</span><div class="pd-finish-cast" aria-hidden="true">${pacmanVerbGhost("#9ddbc9")}${pwPacman()}${pacmanVerbGhost("#c9b7ed")}</div><h2 id="pd-finish-title" tabindex="-1">¡Cinco descubrimientos, ${escapeHtml(data.settings.studentName || "Ian")}!</h2><p>Exploraste, pensaste y encontraste caminos nuevos.</p><div class="pd-stamps" aria-label="Resultados">${session.answers.map((answer, i) => `<span style="--pd-delay:${i * .1}s" aria-label="Desafío ${i + 1}: ${answer.isCorrect ? "correcto" : "para repasar"}">${answer.isCorrect ? "★" : "○"}</span>`).join("")}</div><strong>${session.score} de ${session.exercises.length} desafíos resueltos</strong><div class="pd-finish-actions"><button type="button" class="pd-primary" data-action="start" data-subject="${session.subjectId}" data-theme="${session.themeId}" data-mode="activity">Nuevos descubrimientos ↻</button><button type="button" class="pd-back" data-action="cancel-run">Volver a ${escapeHtml(session.subjectTitle)}</button></div></section>`);
}
