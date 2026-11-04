// Six independent adventures. A complete answer is committed once; the child
// can edit freely before checking and advances manually after the explanation.
const PACMAN_QUEST_THEMES = [
  { subject: "lengua", questMode: "syllables", title: "La fábrica de palabras", description: "Ordená las sílabas y ayudá a Pac-Man a fabricar palabras." },
  { subject: "cs-naturales", questMode: "garden", title: "El jardín de Pac-Man", description: "Descubrí para qué sirven las raíces, el tallo, las hojas y las flores." },
  { subject: "cs-sociales", questMode: "neighborhood", title: "Una vuelta por el barrio", description: "Llevá a Pac-Man al lugar que necesita en cada misión." },
  { subject: "matematicas", questMode: "sharing", title: "La merienda de los fantasmas", description: "Repartí todos los puntos para que cada fantasma reciba la misma cantidad." },
  { subject: "ingles", questMode: "positions", title: "Where is Pac-Man?", description: "Leé on, under y next to. Elegí dónde está Pac-Man." },
  { subject: "tecnologia", questMode: "coding", title: "Programá a Pac-Man", description: "Armá un programa con flechas para llegar a la cereza sin tocar las paredes." }
].map((theme) => ({ ...theme, id: `pacquest-${theme.questMode}`, activityLabel: "NUEVO · Aventura Pac-Man · 5 desafíos", randomExerciseCount: 5,
  exercises: [{ id: `pacquest-${theme.questMode}`, type: "pacman-quest", prompt: theme.title }] }));

const PQ_WORDS = [
  ["pelota", ["pe", "lo", "ta"], "pelota.png"], ["casa", ["ca", "sa"], "casa.png"],
  ["tomate", ["to", "ma", "te"], "tomate.png"], ["banana", ["ba", "na", "na"], "banana.png"],
  ["mano", ["ma", "no"], "mano.png"], ["escuela", ["es", "cue", "la"], "escuela.png"],
  ["leche", ["le", "che"], "leche.png"], ["helado", ["he", "la", "do"], "helado.png"],
  ["jabón", ["ja", "bón"], "jabon.png"], ["cabeza", ["ca", "be", "za"], "cabeza.png"]
];
const PQ_PARTS = { root: "Raíces", stem: "Tallo", leaf: "Hojas", flower: "Flor" };
const PQ_GARDEN = [
  ["¿Qué parte toma agua del suelo?", "root", "Las raíces absorben agua del suelo."],
  ["¿Qué parte sostiene las hojas y la flor?", "stem", "El tallo sostiene las hojas y la flor."],
  ["¿Qué parte fabrica alimento usando la luz del sol?", "leaf", "Las hojas usan la luz del sol, agua y aire para fabricar alimento."],
  ["¿En qué parte se forman las semillas de esta planta?", "flower", "En esta planta, las semillas se forman a partir de la flor."],
  ["¿Qué parte fija la planta al suelo?", "root", "Las raíces sujetan la planta al suelo."],
  ["¿Por qué parte viaja el agua desde las raíces hacia las hojas?", "stem", "El agua sube por el tallo hasta las hojas."],
  ["¿Qué partes son verdes, anchas y salen a los lados del tallo?", "leaf", "Las hojas de esta planta son verdes y salen a los lados del tallo."],
  ["¿Qué parte tiene pétalos en esta planta?", "flower", "La flor tiene pétalos que pueden atraer a los insectos."],
];
const PQ_PLACES = {
  school: { label: "Escuela", emoji: "🏫", color: "#8cbcf1" }, library: { label: "Biblioteca", emoji: "📚", color: "#b3a0df" },
  bakery: { label: "Panadería", emoji: "🥖", color: "#edbb86" }, hospital: { label: "Hospital", emoji: "🏥", color: "#ecacb9" },
  park: { label: "Plaza", emoji: "🌳", color: "#8fcdb0" }, fire: { label: "Cuartel de bomberos", emoji: "🚒", color: "#ef9a88" }
};
const PQ_NEIGHBORHOOD = [
  ["Pac-Man quiere pedir prestado un cuento para leer en casa.", "library", "En la biblioteca podemos pedir libros prestados y luego devolverlos."],
  ["Pac-Man va a aprender con su maestra y sus compañeros.", "school", "En la escuela aprendemos con docentes y compañeros."],
  ["Pac-Man quiere comprar pan recién hecho.", "bakery", "En la panadería se prepara y se vende pan."],
  ["Pac-Man tiene un turno para que una médica lo revise.", "hospital", "En el hospital trabajan profesionales que cuidan nuestra salud."],
  ["Pac-Man quiere jugar en las hamacas del barrio.", "park", "La plaza es un espacio compartido para jugar y pasear."],
  ["Pac-Man quiere conocer el lugar donde trabajan los bomberos.", "fire", "Los bomberos guardan sus equipos y sus vehículos en el cuartel."],
  ["Pac-Man tiene que devolver el libro que pidió prestado.", "library", "Los libros prestados se devuelven a la biblioteca para que otras personas los lean."],
  ["Pac-Man quiere pasear entre árboles por un espacio público del barrio.", "park", "La plaza es un espacio público del barrio que cuidamos entre todos."]
];
const PQ_POSITIONS = { on: "sobre la mesa", under: "debajo de la mesa", "next to": "al lado de la mesa" };
const PQ_BOARDS = [
  { start: [0, 3], goal: [4, 1], walls: [[1, 1], [2, 1], [3, 3]] },
  { start: [0, 0], goal: [4, 2], walls: [[1, 0], [2, 2], [3, 3]] },
  { start: [4, 3], goal: [0, 1], walls: [[3, 3], [2, 1], [1, 0]] },
  { start: [2, 3], goal: [0, 0], walls: [[1, 2], [2, 1], [4, 0]] },
  { start: [0, 2], goal: [4, 0], walls: [[1, 2], [2, 1], [3, 3]] },
  { start: [4, 0], goal: [0, 3], walls: [[3, 0], [2, 2], [1, 1]] },
];
const PQ_DIRECTIONS = { up: [0, -1, "↑", "Arriba"], right: [1, 0, "→", "Derecha"], down: [0, 1, "↓", "Abajo"], left: [-1, 0, "←", "Izquierda"] };
let pqAnimation = null;

function withPacmanQuestThemes(subjectId, themes) {
  const additions = PACMAN_QUEST_THEMES.filter((theme) => theme.subject === subjectId);
  return [...additions, ...themes.filter((theme) => !additions.some((addition) => addition.id === theme?.id))];
}
function createPacmanQuestExercises(theme) {
  const mode = theme.questMode;
  let rounds;
  if (mode === "syllables") rounds = saTake(PQ_WORDS, `pq-${mode}`).map(([word, correct, image]) => {
    let tokens = shuffled(correct);
    if (tokens.join("") === word) tokens = [...tokens.slice(1), tokens[0]];
    return { prompt: "Armá el nombre del dibujo.", word, correct, image, tokens, explanation: `${correct.join(" · ")} → ${word}.` };
  });
  if (mode === "garden") rounds = saTake(PQ_GARDEN, `pq-${mode}`).map(([prompt, correct, explanation]) => ({ prompt, correct, explanation, options: shuffled(Object.keys(PQ_PARTS)) }));
  if (mode === "neighborhood") rounds = saTake(PQ_NEIGHBORHOOD, `pq-${mode}`).map(([prompt, correct, explanation]) => ({ prompt, correct, explanation,
    options: shuffled([correct, ...shuffled(Object.keys(PQ_PLACES).filter((id) => id !== correct)).slice(0, 3)]) }));
  if (mode === "sharing") rounds = saTake([[6, 2], [8, 2], [9, 3], [12, 3], [12, 4], [16, 4], [10, 2], [15, 3], [8, 4], [6, 3]], `pq-${mode}`).map(([total, guests]) => ({
    prompt: `Repartí ${total} puntos entre ${guests} fantasmas, en partes iguales.`, total, guests, correct: Array(guests).fill(total / guests),
    explanation: `${total} puntos entre ${guests} fantasmas: cada uno recibe ${total / guests}. ${Array(guests).fill(total / guests).join(" + ")} = ${total}.` }));
  if (mode === "positions") {
    // Include all three prepositions on every visit, with five different scenes.
    const pool = Object.keys(PQ_POSITIONS).flatMap((correct) => ["#b39add", "#7fc9bf", "#e6af7a"].map((color) => ({ correct, color })));
    const first = Object.keys(PQ_POSITIONS).map((position) => shuffled(pool.filter((r) => r.correct === position))[0]);
    rounds = shuffled([...first, ...shuffled(pool.filter((r) => !first.includes(r))).slice(0, 2)]).map((item) => ({ ...item,
      prompt: "Leé en inglés y elegí la escena.", clue: `Pac-Man is ${item.correct} the table.`, options: shuffled(Object.keys(PQ_POSITIONS)),
      explanation: `Pac-Man está ${PQ_POSITIONS[item.correct]}. «${item.correct}» indica esa posición en inglés.` }));
  }
  if (mode === "coding") rounds = saTake(PQ_BOARDS, `pq-${mode}`).map((board) => ({ ...board, prompt: "Programá el camino hasta la cereza.", explanation: "Cada flecha es una instrucción: mueve a Pac-Man una casilla en esa dirección." }));
  return (rounds || []).map((round, i) => ({ ...round, mode, id: `${theme.id}-${i}`, type: "pacman-quest" }));
}
function pqCurrent() {
  const exercise = session?.exercises?.[session.index];
  return route.view === "run" && exercise?.type === "pacman-quest" ? { exercise, state: session.pacmanQuest[exercise.id] } : null;
}
function stopPacmanQuestAnimation() { pqAnimation?.cancel(); pqAnimation = null; }
function pqPacman(x, y, size = 18) {
  return `<g transform="translate(${x} ${y}) scale(${size / 50})"><path d="M0 0 43-25A50 50 0 1 0 43 25Z" fill="#ffda48" stroke="#ad7b16" stroke-width="3"/><circle cx="2" cy="-27" r="5" fill="#20344e"/></g>`;
}
function pqPlant() {
  return `<svg class="pq-plant" viewBox="0 0 400 220" role="img" aria-label="Una planta con raíces bajo el suelo, tallo, hojas verdes y una flor con pétalos.">
    <rect width="400" height="220" rx="18" fill="#eaf6f4"/><circle cx="345" cy="39" r="22" fill="#ffd76b"/>
    <path d="M0 169Q100 156 200 169T400 166V220H0Z" fill="#b5805a"/><path d="M0 168Q100 155 200 168T400 165" fill="none" stroke="#76b17b" stroke-width="9"/>
    <g class="pq-part pq-part-root"><path d="M200 166v40m0-24-25 16m25-9 23 18m-23-12-12 18" stroke="#f9deaa" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <g class="pq-part pq-part-stem"><path d="M200 170V66" stroke="#3d945b" stroke-width="9" stroke-linecap="round"/></g>
    <g class="pq-part pq-part-leaf" fill="#64b97f" stroke="#398959" stroke-width="2"><path d="M197 129Q138 138 143 90Q187 85 197 129Z"/><path d="M204 111Q254 118 256 75Q216 73 204 111Z"/><path d="m150 98 45 29m53-44-42 26" fill="none"/></g>
    <g class="pq-part pq-part-flower"><g fill="#f3a9c8" stroke="#d47d9f" stroke-width="2">${Array.from({ length: 6 }, (_, i) => `<ellipse cx="200" cy="41" rx="12" ry="22" transform="rotate(${i * 60} 200 63)"/>`).join("")}</g><circle cx="200" cy="63" r="15" fill="#ffdb64"/></g>
    <g class="pq-garden-friend">${pqPacman(64, 146, 20)}</g><g class="pq-rain" fill="#69b6de"><path d="M113 25q-12 18 0 18t0-18M92 45q-10 15 0 15t0-15M129 51q-10 15 0 15t0-15"/></g>
  </svg>`;
}
function pqMap(exercise, state) {
  const stops = [[104, 111], [306, 111], [104, 166], [306, 166]];
  const destination = stops[exercise.options.indexOf(exercise.correct)];
  return `<svg class="pq-map" viewBox="0 0 410 280" role="img" aria-label="Mapa del barrio con ${exercise.options.map((id) => PQ_PLACES[id].label).join(", ")}.">
    <rect width="410" height="280" rx="18" fill="#e5f1ed"/><path d="M0 139H410M205 0V280" stroke="#bfd1d6" stroke-width="44"/><path d="M0 139H410M205 0V280" stroke="#fff" stroke-width="2" stroke-dasharray="8 8"/>
    ${exercise.options.map((id, i) => { const place = PQ_PLACES[id], x = i % 2 ? 252 : 50, y = i < 2 ? 13 : 179; return `<g transform="translate(${x} ${y})"><rect width="108" height="86" rx="9" fill="${place.color}"/><path d="M-4 13 54-6 112 13" fill="${place.color}" stroke="#5c7990" stroke-width="3"/><rect x="45" y="58" width="20" height="28" rx="3" fill="#49617c"/><text x="54" y="49" text-anchor="middle" font-size="29">${place.emoji}</text><circle cx="8" cy="13" r="12" fill="#fff"/><text x="8" y="18" text-anchor="middle" font-size="13" fill="#20344e" font-weight="800">${i + 1}</text></g>`; }).join("")}
    ${state.checked && state.isCorrect ? `<path class="pq-map-route" d="M205 139H${destination[0]}V${destination[1]}" fill="none" stroke="#da9a14" stroke-width="5" stroke-linecap="round"/>` : ""}
    <g class="pq-map-walker" style="--pq-x:${destination[0]}px;--pq-y:${destination[1]}px">${pqPacman(0, 0, 17)}</g>
  </svg>`;
}
function pqPositionArt(position, color) {
  const [x, y] = position === "on" ? [139, 45] : position === "under" ? [139, 122] : [37, 128];
  return `<svg viewBox="0 0 230 174" role="img" aria-label="Pac-Man ${PQ_POSITIONS[position]}"><rect width="230" height="174" rx="15" fill="#edf3f8"/><path d="M12 155H218" stroke="#b4c5d4" stroke-width="3"/><path d="M85 77V153M190 77V153" stroke="#795b49" stroke-width="10"/>${pqPacman(x, y, 21)}<rect x="72" y="67" width="132" height="14" rx="4" fill="${color}" stroke="#795b49" stroke-width="2"/></svg>`;
}
function pqTrace(exercise, commands) {
  let [x, y] = exercise.start;
  const points = [{ x, y }];
  for (const command of commands) {
    const direction = PQ_DIRECTIONS[command];
    if (!direction) return { points, blocked: true, reached: false };
    const nx = x + direction[0], ny = y + direction[1];
    if (nx < 0 || nx > 4 || ny < 0 || ny > 3 || exercise.walls.some(([wx, wy]) => wx === nx && wy === ny)) return { points, blocked: true, reached: false };
    x = nx; y = ny; points.push({ x, y });
  }
  return { points, blocked: false, reached: x === exercise.goal[0] && y === exercise.goal[1] };
}
function pqCodeBoard(exercise) {
  return `<div class="pq-code-grid" role="img" aria-label="Laberinto de 5 columnas y 4 filas. Pac-Man empieza en columna ${exercise.start[0] + 1}, fila ${exercise.start[1] + 1}; la cereza está en columna ${exercise.goal[0] + 1}, fila ${exercise.goal[1] + 1}. Paredes: ${exercise.walls.map(([x, y]) => `${x + 1}, ${y + 1}`).join("; ")}.">
    ${Array.from({ length: 20 }, (_, i) => { const x = i % 5, y = Math.floor(i / 5), wall = exercise.walls.some(([wx, wy]) => wx === x && wy === y), goal = exercise.goal[0] === x && exercise.goal[1] === y; return `<span class="pq-code-cell ${wall ? "is-wall" : ""}">${goal ? '<span class="pq-code-cherry">🍒</span>' : wall ? "" : "<i></i>"}</span>`; }).join("")}
    <span class="pq-code-player" style="left:${exercise.start[0] * 20}%;top:${exercise.start[1] * 25}%">${pacmanVerbSprite()}</span>
  </div>`;
}
function pqTask(exercise, state) {
  const disabled = state.checked ? "disabled" : "";
  if (exercise.mode === "syllables") return `<div class="pq-word-factory"><div class="pq-picture"><img src="assets/pictos/${exercise.image}" alt="Dibujo para armar su nombre"/>${pacmanVerbSprite("pq-factory-pacman")}</div><div class="pq-word-slots" aria-label="Palabra que estás armando">${exercise.correct.map((_, i) => {
    const token = state.sequence[i]; return `<button type="button" data-action="pq-remove" data-index="${i}" ${disabled || (token === undefined ? "disabled" : "")} aria-label="${token === undefined ? `Casillero ${i + 1} vacío` : `Quitar ${exercise.tokens[token]}`}">${token === undefined ? "·" : escapeHtml(exercise.tokens[token])}</button>`;
  }).join("")}</div></div><p class="sa-hint">Tocá las sílabas en orden. Tocá un casillero para sacar una.</p><div class="pq-syllables">${exercise.tokens.map((token, i) => `<button class="sa-option" type="button" data-action="pq-token" data-index="${i}" ${disabled || (state.sequence.includes(i) ? "disabled" : "")}>${escapeHtml(token)}</button>`).join("")}</div>`;
  if (exercise.mode === "garden") return `${pqPlant()}<div class="pq-choice-grid">${exercise.options.map((id) => pqChoice(id, PQ_PARTS[id], state)).join("")}</div>`;
  if (exercise.mode === "neighborhood") return `${pqMap(exercise, state)}<div class="pq-choice-grid">${exercise.options.map((id, i) => pqChoice(id, `${i + 1}. ${PQ_PLACES[id].label}`, state, `<span aria-hidden="true">${PQ_PLACES[id].emoji}</span>`)).join("")}</div>`;
  if (exercise.mode === "sharing") {
    const left = exercise.total - state.portions.reduce((sum, n) => sum + n, 0);
    return `<div class="pq-points-bank"><span>Por repartir</span><strong aria-live="polite">${left}</strong><div aria-hidden="true">${Array.from({ length: left }, () => "<i></i>").join("")}</div></div><div class="pq-ghost-tables">${state.portions.map((n, i) => `<div class="pq-ghost-table">${pacmanVerbGhost(["#89cfdb", "#e9a0bc", "#bdacf0", "#edb684"][i])}<strong>Fantasma ${i + 1}</strong><div class="pq-plate" aria-label="${n} puntos">${Array.from({ length: n }, () => "<i></i>").join("")}</div><output>${n}</output><div class="pq-serve-controls"><button type="button" data-action="pq-serve" data-index="${i}" data-delta="-1" aria-label="Quitar un punto al fantasma ${i + 1}" ${disabled || (!n ? "disabled" : "")}>−</button><button type="button" data-action="pq-serve" data-index="${i}" data-delta="1" aria-label="Dar un punto al fantasma ${i + 1}" ${disabled || (!left ? "disabled" : "")}>+</button></div></div>`).join("")}</div>`;
  }
  if (exercise.mode === "positions") return `<p class="pq-english-clue" lang="en">${escapeHtml(exercise.clue)}</p><div class="pq-position-options">${exercise.options.map((id, i) => pqChoice(id, `Escena ${i + 1}`, state, pqPositionArt(id, exercise.color))).join("")}</div>`;
  if (exercise.mode === "coding") return `<div class="pq-coding-layout">${pqCodeBoard(exercise)}<div class="pq-code-controls"><p class="sa-hint">Cada flecha mueve una casilla. Prepará hasta 8 instrucciones.</p><div class="pq-arrows">${Object.entries(PQ_DIRECTIONS).map(([id, d]) => `<button class="sa-option" type="button" data-action="pq-command" data-value="${id}" aria-label="${d[3]}" ${disabled || (state.sequence.length === 8 ? "disabled" : "")}>${d[2]}</button>`).join("")}</div><div class="pq-program" aria-label="Tu programa">${state.sequence.length ? state.sequence.map((id, i) => `<button type="button" data-action="pq-remove" data-index="${i}" aria-label="Quitar paso ${i + 1}: ${PQ_DIRECTIONS[id][3]}" ${disabled}>${PQ_DIRECTIONS[id][2]}<small>${i + 1}</small></button>`).join("") : '<span>Tus flechas van acá</span>'}</div><div class="pq-program-actions"><button class="pq-clear" type="button" data-action="pq-clear" aria-label="Borrar programa" ${disabled || (!state.sequence.length ? "disabled" : "")}>Borrar</button><button class="pq-replay" type="button" data-action="pq-replay" ${state.checked ? "" : 'disabled style="visibility:hidden"'}>Ver recorrido ↻</button></div></div></div>`;
  return "";
}
function pqChoice(value, label, state, art = "") {
  return `<button class="sa-option pq-choice ${state.choice === value ? "is-selected" : ""}" type="button" data-action="pq-choice" data-value="${value}" aria-pressed="${state.choice === value}" ${state.checked ? "disabled" : ""}>${art}<span>${escapeHtml(label)}</span></button>`;
}
function pqCanCheck(exercise, state) {
  if (state.checked) return false;
  if (exercise.mode === "syllables") return state.sequence.length === exercise.tokens.length;
  if (exercise.mode === "sharing") return state.portions.reduce((sum, n) => sum + n, 0) === exercise.total;
  if (exercise.mode === "coding") return state.sequence.length > 0;
  return exercise.options.includes(state.choice);
}
function pqAnimateCode(exercise, state) {
  stopPacmanQuestAnimation();
  const actor = document.querySelector(".pq-code-player");
  if (!actor || !state.checked) return;
  const points = pqTrace(exercise, state.sequence).points;
  const last = points[points.length - 1];
  actor.style.left = `${last.x * 20}%`; actor.style.top = `${last.y * 25}%`;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !actor.animate || points.length < 2) return;
  pqAnimation = actor.animate(points.map(({ x, y }) => ({ left: `${x * 20}%`, top: `${y * 25}%` })), { duration: (points.length - 1) * 350, easing: "linear", fill: "forwards" });
}
function renderPacmanQuestRunner(exercise) {
  stopPacmanQuestAnimation();
  const state = session.pacmanQuest[exercise.id];
  const oldWorld = document.querySelector(".sa-world");
  const feedback = state.checked ? `${state.isCorrect ? "¡Lo lograste, Ian!" : "Vamos a descubrirlo."} ${state.explanation}` : exercise.mode === "coding" ? "Podés cambiar tu programa antes de ejecutarlo." : "Podés cambiar tu respuesta antes de comprobar.";
  renderShell(`<section class="sa-runner pq-runner pq-${exercise.mode} ${state.checked ? state.isCorrect ? "pq-success" : "pq-review" : ""}"><header class="sa-topbar"><button class="sa-back" type="button" data-action="cancel-run">${icon("arrow")}${escapeHtml(session.subjectTitle)}</button><div><span>NUEVA AVENTURA · PAC-MAN</span><strong>${escapeHtml(session.themeTitle)}</strong></div><b>${session.index + 1} / ${session.exercises.length}</b></header><div class="sa-layout">${saWorld(exercise, state)}<article class="sa-board ${state.checked ? state.isCorrect ? "sa-correct" : "sa-review" : ""}"><span class="sa-eyebrow">${escapeHtml(session.subjectTitle)} · EXPLORÁ Y JUGÁ</span><h2 id="pq-question" tabindex="-1">${escapeHtml(exercise.prompt)}</h2>${pqTask(exercise, state)}<footer class="sa-controls"><p class="sa-feedback" role="status" aria-live="polite">${escapeHtml(feedback)}</p>${state.checked ? `<button class="sa-primary" type="button" data-action="pq-next">${session.index + 1 === session.exercises.length ? "Ver mi aventura" : "Siguiente"} →</button>` : `<button class="sa-primary" type="button" data-action="pq-check" ${pqCanCheck(exercise, state) ? "" : "disabled"}>${exercise.mode === "coding" ? "Ejecutar" : "Comprobar"} ${icon("check")}</button>`}</footer></article></div></section>`);
  if (oldWorld?.dataset.round === exercise.id && oldWorld.dataset.phase === String(state.checked)) document.querySelector(".sa-world")?.replaceWith(oldWorld);
  if (exercise.mode === "garden" && state.checked) document.querySelector(`.pq-part-${exercise.correct}`)?.classList.add("is-highlighted");
  if (exercise.mode === "coding") pqAnimateCode(exercise, state);
}
function pacmanQuestAction(action, target) {
  const current = pqCurrent();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "pq-next") {
    if (!state.checked) return;
    session.index++; render(); window.scrollTo({ top: 0, behavior: "auto" });
    document.querySelector("#pq-question, #pq-finish-title")?.focus({ preventScroll: true }); return;
  }
  if (action === "pq-replay" && exercise.mode === "coding" && state.checked) return pqAnimateCode(exercise, state);
  if (state.checked) return;
  if (action === "pq-check") {
    if (!pqCanCheck(exercise, state)) return;
    const selected = exercise.mode === "syllables" ? state.sequence.map((i) => exercise.tokens[i]) : exercise.mode === "sharing" ? state.portions : exercise.mode === "coding" ? state.sequence : state.choice;
    let correct = exercise.correct;
    state.explanation = exercise.explanation;
    if (exercise.mode === "coding") {
      const trace = pqTrace(exercise, state.sequence);
      state.isCorrect = trace.reached;
      correct = "Llegar a la cereza sin chocar";
      state.explanation = `${trace.reached ? "¡Tu programa llegó a la cereza!" : trace.blocked ? `El paso ${trace.points.length} encuentra una pared o el borde. Revisá el camino en la próxima misión.` : "El programa terminó antes de llegar a la cereza. Mirá dónde quedó Pac-Man."} ${exercise.explanation}`;
    } else state.isCorrect = JSON.stringify(selected) === JSON.stringify(correct);
    state.checked = true;
    if (state.isCorrect) session.score++;
    session.answers.push({ prompt: exercise.prompt, selected: clone(selected), correct: clone(correct), isCorrect: state.isCorrect });
  } else if (action === "pq-choice") {
    if (!exercise.options?.includes(target.dataset.value)) return;
    state.choice = target.dataset.value;
  } else if (action === "pq-token") {
    const i = Number(target.dataset.index);
    if (exercise.mode !== "syllables" || !Number.isInteger(i) || i < 0 || i >= exercise.tokens.length || state.sequence.includes(i)) return;
    state.sequence.push(i);
  } else if (action === "pq-command") {
    if (exercise.mode !== "coding" || !PQ_DIRECTIONS[target.dataset.value] || state.sequence.length >= 8) return;
    state.sequence.push(target.dataset.value);
  } else if (action === "pq-remove") {
    const i = Number(target.dataset.index);
    if (!["syllables", "coding"].includes(exercise.mode) || !Number.isInteger(i) || i < 0 || i >= state.sequence.length) return;
    state.sequence.splice(i, 1);
  } else if (action === "pq-clear") {
    if (exercise.mode !== "coding") return;
    state.sequence = [];
  } else if (action === "pq-serve") {
    const i = Number(target.dataset.index), delta = Number(target.dataset.delta);
    if (exercise.mode !== "sharing" || !Number.isInteger(i) || i < 0 || i >= exercise.guests || ![-1, 1].includes(delta)) return;
    if (state.portions[i] + delta < 0 || state.portions.reduce((sum, n) => sum + n, 0) + delta > exercise.total) return;
    state.portions[i] += delta;
  } else return;
  const y = window.scrollY;
  render(); window.scrollTo({ top: y, behavior: "auto" });
  if (state.checked) document.querySelector('[data-action="pq-next"]')?.focus({ preventScroll: true });
  else document.querySelector(`[data-action="${action}"]${target.dataset.value ? `[data-value="${target.dataset.value}"]` : target.dataset.index !== undefined ? `[data-index="${target.dataset.index}"]${target.dataset.delta ? `[data-delta="${target.dataset.delta}"]` : ""}` : ""}:not(:disabled)`)?.focus({ preventScroll: true });
}
function renderPacmanQuestFinish() {
  stopPacmanQuestAnimation();
  const name = escapeHtml(data.settings.studentName || "Ian");
  renderShell(`<section class="sa-runner sa-finish pq-finish"><span class="sa-eyebrow">AVENTURA PAC-MAN · ${escapeHtml(session.subjectTitle)}</span><div class="sa-finish-friends" aria-hidden="true">${pacmanVerbGhost("#89cfdb")}${pacmanVerbSprite()}${pacmanVerbGhost("#e9a0bc")}</div><h2 id="pq-finish-title" tabindex="-1">¡Aventura completa, ${name}!</h2><p>Resolviste ${session.score} de ${session.exercises.length} desafíos.</p><div class="sa-earned" aria-label="Resultados">${session.answers.map((answer, i) => `<span aria-label="Desafío ${i + 1}: ${answer.isCorrect ? "correcto" : "para repasar"}">${answer.isCorrect ? "★" : "○"}</span>`).join("")}</div><p>¡Gracias por acompañar a Pac-Man! Podés volver a jugar.</p><div class="sa-finish-actions"><button class="sa-primary" type="button" data-action="start" data-subject="${session.subjectId}" data-theme="${session.themeId}" data-mode="activity">Otra aventura ↻</button><button class="sa-back" type="button" data-action="cancel-run">Volver a ${escapeHtml(session.subjectTitle)}</button></div></section>`);
}
