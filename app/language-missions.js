// Five silent, touch-first missions. Choices are checked together only once.
const LANGUAGE_MISSION_THEMES = [
  { id: "lengua-escenas", title: "¿Qué está haciendo?", description: "Observá la escena y encontrá la acción entre verbos parecidos.", missionMode: "scene", activityLabel: "6 escenas · Mirar y leer" },
  { id: "lengua-reparar", title: "Repará la oración", description: "Descubrí qué palabra no coincide con la imagen y cambiala.", missionMode: "repair", activityLabel: "6 escenas · Detectives de palabras" },
  { id: "lengua-camino", title: "Palabras en el camino", description: "Construí una oración con palabras sueltas. Podés moverlas antes de comprobar.", missionMode: "words", activityLabel: "5 oraciones · Fichas para armar" },
  { id: "lengua-bolsa", title: "La bolsa de ingredientes", description: "Leé la receta y prepará la bolsa. Hay alimentos de otras recetas.", missionMode: "bag", activityLabel: "4 recetas · Elegí todo lo necesario" },
  { id: "lengua-secuencia", title: "Primero, después, al final", description: "Reconstruí los pasos de una preparación que quedó desordenada.", missionMode: "sequence", activityLabel: "4 preparaciones · Ordená los pasos" }
].map((theme) => ({ ...theme, randomExerciseCount: Number(theme.activityLabel[0]), exercises: [{ id: theme.id, type: "language-mission" }] }));

const LM_SCENES = [
  { id: "cantar", verb: "canta", subject: "La nena", complement: "una canción", options: ["canta", "habla", "escucha", "baila"], wrong: "escucha", clue: "Tiene la boca abierta y las notas salen de su voz." },
  { id: "saltar", verb: "salta", subject: "El nene", complement: "sobre el tronco", options: ["salta", "corre", "camina", "trepa"], wrong: "camina", clue: "Los dos pies están en el aire, por encima del tronco." },
  { id: "nadar", verb: "nada", subject: "La nena", complement: "en la pileta", options: ["nada", "flota", "salta", "corre"], wrong: "corre", clue: "Mueve los brazos y las piernas dentro del agua." },
  { id: "comer", verb: "come", subject: "El nene", complement: "una manzana", options: ["come", "corta", "lava", "guarda"], wrong: "lava", clue: "La manzana llega a su boca y tiene un mordisco." },
  { id: "beber", verb: "bebe", subject: "La nena", complement: "un vaso de agua", options: ["bebe", "sirve", "lava", "llena"], wrong: "sirve", clue: "El vaso está inclinado junto a su boca." },
  { id: "leer", verb: "lee", subject: "El nene", complement: "un cuento", options: ["lee", "escribe", "dibuja", "recorta"], wrong: "dibuja", clue: "Mira las páginas de un libro abierto; no tiene un lápiz." },
  { id: "escribir", verb: "escribe", subject: "La nena", complement: "una palabra", options: ["escribe", "lee", "pinta", "recorta"], wrong: "lee", clue: "Usa un lápiz para dejar letras en la hoja." },
  { id: "pintar", verb: "pinta", subject: "El nene", complement: "un cuadro", options: ["pinta", "dibuja", "escribe", "limpia"], wrong: "limpia", clue: "Usa un pincel y una paleta de colores frente al cuadro." },
  { id: "dormir", verb: "duerme", subject: "La nena", complement: "en la cama", options: ["duerme", "se despierta", "lee", "juega"], wrong: "lee", clue: "Tiene los ojos cerrados, está tapada y aparecen las zetas del sueño." },
  { id: "correr", verb: "corre", subject: "El nene", complement: "por el parque", options: ["corre", "camina", "salta", "trepa"], wrong: "trepa", clue: "Avanza rápido, con los brazos doblados y una pierna hacia atrás." },
  { id: "dibujar", verb: "dibuja", subject: "La nena", complement: "una casa", options: ["dibuja", "escribe", "pinta", "recorta"], wrong: "recorta", clue: "Usa un lápiz y en la hoja aparece una casa." },
  { id: "cocinar", verb: "cocina", subject: "El papá", complement: "una sopa", options: ["cocina", "sirve", "come", "lava"], wrong: "sirve", clue: "Revuelve la olla que está sobre la cocina." }
];

const LM_FOODS = {
  manzana: ["Manzana", "🍎"], banana: ["Banana", "🍌"], naranja: ["Naranja", "🍊"], frutilla: ["Frutilla", "🍓"], pera: ["Pera", "🍐"], uva: ["Uva", "🍇"], durazno: ["Durazno", "🍑"],
  pan: ["Pan", "🍞"], queso: ["Queso", "🧀"], jamon: ["Jamón", "🥓"], tomate: ["Tomate", "🍅"], lechuga: ["Lechuga", "🥬"], huevo: ["Huevo", "🥚"], atun: ["Atún", "🐟"],
  yogur: ["Yogur", "🥣"], avena: ["Avena", "🌾"], miel: ["Miel", "🍯"], leche: ["Leche", "🥛"], azucar: ["Azúcar", '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 17 24 7 41 17 24 27Z" fill="#fff" stroke="#8498ae" stroke-width="2"/><path d="M7 17v20l17 10V27Z" fill="#e7edf1" stroke="#8498ae" stroke-width="2"/><path d="M24 27v20l17 -10V17Z" fill="#cdd9e2" stroke="#8498ae" stroke-width="2"/></svg>'], cacao: ["Cacao", "🍫"],
  aceite: ["Aceite", "🫙"], sal: ["Sal", "🧂"], pepino: ["Pepino", "🥒"], zanahoria: ["Zanahoria", "🥕"], limon: ["Limón", "🍋"], manteca: ["Manteca", "🧈"], mermelada: ["Mermelada", "🫙"], arroz: ["Arroz", "🍚"], agua: ["Agua", "💧"]
};
const LM_RECIPES = [
  { id: "frutas", title: "Ensalada de frutas", text: "Cortá manzana, banana y naranja. Poné las frutas en un bol y agregá frutilla.", needed: ["manzana", "banana", "naranja", "frutilla"], extra: ["pera", "uva", "durazno"], result: "🍨" },
  { id: "sandwich", title: "Sándwich del recreo", text: "Sobre el pan colocá queso y jamón. Agregá tomate y lechuga. Tapá con otra rebanada de pan.", needed: ["pan", "queso", "jamon", "tomate", "lechuga"], extra: ["huevo", "atun", "manteca"], result: "🥪" },
  { id: "yogur", title: "Yogur con frutas", text: "Mezclá yogur con banana y frutilla. Al final, agregá avena.", needed: ["yogur", "banana", "frutilla", "avena"], extra: ["manzana", "miel", "naranja"], result: "🥣" },
  { id: "licuado", title: "Licuado de banana", text: "Colocá banana y leche en la licuadora. Agregá azúcar y mezclá.", needed: ["banana", "leche", "azucar"], extra: ["cacao", "frutilla", "yogur", "avena"], result: "🥤" },
  { id: "ensalada", title: "Ensalada para el almuerzo", text: "Poné tomate y lechuga en un bol. Agregá aceite y sal. Mezclá todo.", needed: ["tomate", "lechuga", "aceite", "sal"], extra: ["pepino", "zanahoria", "limon"], result: "🥗" },
  { id: "tostadas", title: "Tostadas con queso", text: "Tostá el pan. Colocá queso sobre las tostadas y agregá rodajas de tomate.", needed: ["pan", "queso", "tomate"], extra: ["jamon", "manteca", "mermelada"], result: "🍞" },
  { id: "chocolatada", title: "Leche chocolatada", text: "Mezclá leche con cacao en una taza. Endulzá con azúcar.", needed: ["leche", "cacao", "azucar"], extra: ["banana", "miel", "yogur"], result: "☕" },
  { id: "arroz", title: "Arroz con tomate", text: "Cociná arroz en agua con sal. Después, agregá tomate cortado.", needed: ["arroz", "agua", "sal", "tomate"], extra: ["queso", "zanahoria", "aceite"], result: "🍚" }
];
// Every sequence has a necessary dependency; no preprinted ordinal gives away the order.
const LM_SEQUENCES = [
  { id: "sandwich", title: "Un sándwich", result: "🥪", steps: ["Poné una rebanada de pan en el plato.", "Colocá queso sobre esa rebanada.", "Tapá el queso con otra rebanada de pan.", "Guardá el sándwich armado en la vianda."] },
  { id: "jugo", title: "Jugo de naranja", result: "🥤", steps: ["Un adulto corta las naranjas por la mitad.", "Exprimí las mitades en la jarra.", "Serví el jugo de la jarra en un vaso.", "Tomá el jugo del vaso."] },
  { id: "tostada", title: "Tostadas con mermelada", result: "🍞", steps: ["Poné el pan en la tostadora.", "Un adulto retira el pan ya tostado.", "Untá las tostadas con mermelada.", "Colocá las tostadas untadas en el plato."] },
  { id: "banana", title: "Banana con yogur", result: "🥣", steps: ["Pelá la banana.", "Un adulto corta la banana pelada.", "Poné los trozos en un bol con yogur.", "Mezclá el yogur con los trozos."] },
  { id: "galletas", title: "Galletitas con queso", result: "🧀", steps: ["Abrí el paquete de galletitas.", "Sacá las galletitas del paquete al plato.", "Untá con queso las galletitas del plato.", "Guardá las galletitas untadas en una caja."] },
  { id: "chocolate", title: "Una chocolatada", result: "☕", steps: ["Verté leche en la taza vacía.", "Agregá cacao a la leche de la taza.", "Revolvé la leche y el cacao con una cuchara.", "Tomá la chocolatada ya mezclada."] }
];

function lmDifferentOrder(values) {
  const order = shuffled(values);
  if (order.every((value, index) => value === values[index])) order.push(order.shift());
  return order;
}
function createLanguageMissionExercises(theme) {
  const mode = theme.missionMode;
  const pool = mode === "bag" ? LM_RECIPES : mode === "sequence" ? LM_SEQUENCES : LM_SCENES;
  // Cycle the whole bank between plays; the last play's failures get another context first.
  const key = `ian-language-mission-bag-v1-${mode}`;
  let remaining = [];
  try { remaining = JSON.parse(localStorage.getItem(key) || "[]"); } catch { /* A damaged bag never prevents play. */ }
  if (!Array.isArray(remaining)) remaining = [];
  remaining = remaining.filter((id, index, list) => pool.some((item) => item.id === id) && list.indexOf(id) === index);
  const picked = [];
  while (picked.length < theme.randomExerciseCount) {
    if (!remaining.length) remaining = shuffled(pool.filter((item) => !picked.includes(item.id)).map((item) => item.id));
    const id = remaining.shift();
    if (!picked.includes(id)) picked.push(id);
  }
  try { localStorage.setItem(key, JSON.stringify(remaining)); } catch { /* Offline/private storage is optional. */ }
  return picked.map((id) => {
    const source = pool.find((item) => item.id === id);
    const exercise = { ...clone(source), id: `mission-${mode}-${id}`, sourceId: id, type: "language-mission", mode };
    if (mode === "scene" || mode === "repair") exercise.options = shuffled(source.options);
    if (mode === "repair") {
      exercise.words = `${source.subject} ${source.wrong} ${source.complement}`.split(" ");
      exercise.verbIndex = source.subject.split(" ").length;
    }
    if (mode === "words") {
      exercise.words = `${source.subject.toLowerCase()} ${source.verb} ${source.complement}`.split(" ");
      exercise.order = lmDifferentOrder(exercise.words.map((_, index) => index));
    }
    if (mode === "bag") exercise.options = shuffled([...source.needed, ...source.extra]);
    if (mode === "sequence") exercise.order = lmDifferentOrder(source.steps.map((_, index) => index));
    return exercise;
  });
}
function currentLanguageMission() {
  const exercise = session?.exercises?.[session.index];
  if (route.view !== "run" || exercise?.type !== "language-mission") return null;
  const state = session.languageMissions[exercise.id];
  return state ? { exercise, state } : null;
}

function lmChoiceButton(value, label, selected, checked, extra = "", action = "lm-pick") {
  return `<button type="button" class="lm-choice ${selected ? "is-selected" : ""}" data-action="${action}" data-value="${escapeHtml(String(value))}" aria-pressed="${selected}" ${checked ? "disabled" : ""}>${extra}<span>${escapeHtml(label)}</span><i aria-hidden="true">${selected ? "●" : "○"}</i></button>`;
}
function lmChosenSentence(exercise, state) {
  return state.placed.map((index) => exercise.words[index]).join(" ");
}
function lmCanonicalSentence(exercise) { return `${exercise.subject} ${exercise.verb} ${exercise.complement}.`; }
function lmRenderTask(exercise, state) {
  if (exercise.mode === "scene") return `<div class="lm-stage">${renderLanguageScene(exercise.sourceId, state.checked)}</div><div class="lm-options">${exercise.options.map((verb) => lmChoiceButton(verb, verb, state.choice === verb, state.checked)).join("")}</div>`;
  if (exercise.mode === "repair") return `<div class="lm-repair-layout"><div class="lm-stage">${renderLanguageScene(exercise.sourceId, state.checked)}</div><div><p class="lm-sentence-buttons">${exercise.words.map((word, index) => `<button class="lm-word ${state.wordIndex === index ? "is-selected" : ""}" type="button" data-action="lm-word" data-index="${index}" aria-pressed="${state.wordIndex === index}" ${state.checked ? "disabled" : ""}>${escapeHtml(state.wordIndex === index && state.choice ? state.choice : word)}</button>`).join(" ")}<span>.</span></p><p class="lm-instruction">Tocá la palabra que cambiarías. Después elegí su reemplazo.</p><div class="lm-options">${exercise.options.map((verb) => lmChoiceButton(verb, verb, state.choice === verb, state.checked)).join("")}</div></div></div>`;
  if (exercise.mode === "words" || exercise.mode === "sequence") {
    const isWords = exercise.mode === "words";
    const items = isWords ? exercise.words : exercise.steps;
    const slots = state.placed.map((index, position) => `<button class="lm-slot is-filled" type="button" data-action="lm-return" data-position="${position}" ${state.checked ? "disabled" : ""}>${!isWords ? `<b>${position + 1}</b>` : ""}<span>${escapeHtml(items[index])}</span><small aria-hidden="true">↩</small></button>`).join("");
    const empty = Array.from({ length: items.length - state.placed.length }, (_, i) => `<span class="lm-slot is-empty">${!isWords ? `<b>${state.placed.length + i + 1}</b>` : "●"}</span>`).join("");
    return `<div class="lm-arrange-layout"><aside class="lm-stage">${isWords ? renderLanguageScene(exercise.sourceId, state.checked) : `<div class="lm-kitchen-scene"><div class="lm-dish ${state.checked && state.isCorrect ? "is-ready" : ""}">${lmKitchenIllustration(exercise)}</div><div class="lm-tiny-friend">${pacmanVerbSprite()}</div><strong>${escapeHtml(exercise.title)}</strong></div>`}</aside><div class="lm-arrange-area"><div class="lm-slots ${isWords ? "lm-word-slots" : "lm-step-slots"}" aria-label="${isWords ? "Tu oración" : "Tu secuencia"}">${slots}${empty}</div><p class="lm-instruction">Tocá una ficha para ponerla. Tocá una ficha colocada para retirarla.</p><div class="lm-bank ${isWords ? "lm-word-bank" : "lm-step-bank"}">${exercise.order.filter((index) => !state.placed.includes(index)).map((index) => `<button type="button" class="lm-bank-token" data-action="lm-place" data-index="${index}" ${state.checked ? "disabled" : ""}>${escapeHtml(items[index])}</button>`).join("")}</div></div></div>`;
  }
  const bag = state.selected.map((id) => `<span class="lm-bag-token" aria-label="${escapeHtml(LM_FOODS[id][0])}">${LM_FOODS[id][1]}</span>`).join("");
  return `<div class="lm-shopping-layout"><aside class="lm-recipe"><span class="lm-label">LA RECETA</span><h3>${escapeHtml(exercise.title)}</h3><p>${escapeHtml(exercise.text)}</p><div class="lm-shopping-bag"><div class="lm-bag-handle"></div><div class="lm-bag-items" aria-label="Alimentos elegidos">${bag || '<span class="lm-bag-empty">Tu bolsa</span>'}</div><div class="lm-bag-logo">${pacmanVerbSprite()}</div></div></aside><div class="lm-pantry"><span class="lm-label">LA DESPENSA</span><div class="lm-food-options">${exercise.options.map((id) => lmChoiceButton(id, LM_FOODS[id][0], state.selected.includes(id), state.checked, `<span class="lm-food-icon" aria-hidden="true">${LM_FOODS[id][1]}</span>`)).join("")}</div></div></div>`;
}
function lmCanCheck(exercise, state) {
  if (state.checked) return false;
  if (exercise.mode === "scene") return exercise.options.includes(state.choice);
  if (exercise.mode === "repair") return Number.isInteger(state.wordIndex) && exercise.options.includes(state.choice);
  if (exercise.mode === "bag") return state.selected.length > 0;
  return state.placed.length === (exercise.mode === "words" ? exercise.words.length : exercise.steps.length);
}
function renderLanguageMissionRunner(exercise) {
  const state = session.languageMissions[exercise.id];
  const previousScene = document.querySelector(".lm-scene-wrap");
  const instructions = {
    scene: ["Mirá con atención", "¿Qué acción muestra la escena?"],
    repair: ["Detectives de palabras", "Repará la oración para que cuente la escena."],
    words: ["Palabras en el camino", "Armá la oración. Empezá por quién y seguí con la acción."],
    bag: ["La bolsa de ingredientes", "Elegí todo lo que usa la receta."],
    sequence: ["Primero, después, al final", "Ordená los pasos para que la preparación funcione."]
  };
  const [label, prompt] = instructions[exercise.mode];
  const feedback = !state.checked ? "Podés cambiar tu respuesta antes de comprobar." : state.isCorrect ? `¡Lo resolviste! ${state.explanation}` : `Miremos qué pasó. ${state.explanation}`;
  renderShell(`<section class="runner lm-runner lm-mode-${exercise.mode}"><header class="lm-topbar"><button class="lm-exit" type="button" data-action="cancel-run">${icon("arrow")}Lengua</button><div><span class="lm-label">LENGUA · CLUB DE LAS MISIONES</span><strong>${escapeHtml(session.themeTitle)}</strong></div><span class="lm-round">${session.index + 1} / ${session.exercises.length}</span></header>${renderPacmanVerbTrail(session.index + (state.checked ? 1 : 0), session.exercises.length)}<article class="lm-board ${state.checked ? state.isCorrect ? "lm-success" : "lm-review" : ""}"><div class="lm-heading"><div><span class="lm-label">${label}</span><h2 id="lm-question" tabindex="-1">${prompt}</h2></div><span class="lm-cherry" aria-hidden="true">🍒</span></div>${lmRenderTask(exercise, state)}<footer class="lm-controls"><p class="lm-feedback ${state.checked ? state.isCorrect ? "is-correct" : "is-review" : ""}" role="status" aria-live="polite">${escapeHtml(feedback)}</p>${state.checked ? `<button class="lm-primary" type="button" data-action="lm-next">${session.index + 1 === session.exercises.length ? "Ver mi recorrido" : "Otro desafío"} →</button>` : `<button class="lm-primary" type="button" data-action="lm-check" ${lmCanCheck(exercise, state) ? "" : "disabled"}>Comprobar ${icon("check")}</button>`}</footer></article></section>`);
  if (previousScene?.dataset.scene === exercise.sourceId) document.querySelector(".lm-scene-wrap")?.replaceWith(previousScene);
}
function languageMissionAction(action, target) {
  const current = currentLanguageMission();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "lm-replay") {
    const scene = document.querySelector(".lm-scene");
    if (scene) { scene.classList.remove("lmv-playing"); void scene.getBoundingClientRect(); scene.classList.add("lmv-playing"); }
    return;
  }
  if (action === "lm-next") {
    if (!state.checked) return;
    session.index += 1;
    render();
    document.querySelector("#lm-question, #lm-finish-title")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }
  if (state.checked) return;
  if (action === "lm-check") return checkLanguageMission(exercise, state);
  if (action === "lm-pick") {
    const value = target.dataset.value;
    if (!exercise.options?.includes(value)) return;
    if (exercise.mode === "bag") state.selected = state.selected.includes(value) ? state.selected.filter((id) => id !== value) : [...state.selected, value];
    else if (exercise.mode === "scene" || exercise.mode === "repair") state.choice = value;
    else return;
  } else if (action === "lm-word") {
    const index = Number(target.dataset.index);
    if (exercise.mode !== "repair" || !Number.isInteger(index) || index < 0 || index >= exercise.words.length) return;
    state.wordIndex = index;
  } else if (action === "lm-place") {
    const index = Number(target.dataset.index);
    const items = exercise.mode === "words" ? exercise.words : exercise.mode === "sequence" ? exercise.steps : null;
    if (!items || !Number.isInteger(index) || index < 0 || index >= items.length || state.placed.includes(index)) return;
    state.placed.push(index);
  } else if (action === "lm-return") {
    const position = Number(target.dataset.position);
    if (!["words", "sequence"].includes(exercise.mode) || !Number.isInteger(position) || position < 0 || position >= state.placed.length) return;
    state.placed.splice(position, 1);
  } else return;
  // Keep the document position stable while every touch updates the scene.
  const y = window.scrollY;
  render();
  window.scrollTo({ top: y, behavior: "auto" });
  const selector = action === "lm-place" || action === "lm-return" ? '[data-action="lm-check"]' : `[data-action="${action}"][${action === "lm-word" ? "data-index" : "data-value"}="${action === "lm-word" ? Number(target.dataset.index) : target.dataset.value}"]`;
  document.querySelector(selector)?.focus({ preventScroll: true });
}
function checkLanguageMission(exercise, state) {
  if (!lmCanCheck(exercise, state)) return;
  let selected = state.choice;
  let correct = exercise.verb;
  if (exercise.mode === "scene" || exercise.mode === "repair") {
    state.isCorrect = state.choice === exercise.verb && (exercise.mode !== "repair" || state.wordIndex === exercise.verbIndex);
    state.explanation = `${lmCanonicalSentence(exercise)} ${exercise.clue}`;
    if (exercise.mode === "repair") {
      selected = exercise.words.map((word, index) => index === state.wordIndex ? state.choice : word).join(" ");
      correct = lmCanonicalSentence(exercise);
    }
  } else if (exercise.mode === "words") {
    selected = lmChosenSentence(exercise, state);
    correct = exercise.words.join(" ");
    // Identical articles have distinct touch IDs but are interchangeable in the answer.
    state.isCorrect = selected === correct;
    state.explanation = lmCanonicalSentence(exercise);
  } else if (exercise.mode === "bag") {
    state.isCorrect = state.selected.length === exercise.needed.length && exercise.needed.every((id) => state.selected.includes(id));
    correct = exercise.needed.map((id) => LM_FOODS[id][0]).join(", ");
    selected = state.selected.map((id) => LM_FOODS[id][0]).join(", ");
    state.explanation = `Esta receta usa: ${correct.toLowerCase()}.`;
  } else {
    state.isCorrect = state.placed.every((index, position) => index === position);
    selected = state.placed.map((index) => exercise.steps[index]).join(" → ");
    correct = exercise.steps.join(" → ");
    state.explanation = `El orden es: ${correct}`;
  }
  state.checked = true;
  if (state.isCorrect) session.score += 1;
  session.answers.push({ prompt: exercise.title || lmCanonicalSentence(exercise), support: session.themeTitle, selected, correct, isCorrect: state.isCorrect });
  render();
  document.querySelector('[data-action="lm-next"]')?.focus({ preventScroll: true });
}
function renderLanguageMissionFinish() {
  renderShell(`<section class="runner lm-runner lm-finish"><span class="lm-label">LENGUA · CLUB DE LAS MISIONES</span><div class="lm-finish-friends" aria-hidden="true">${pacmanVerbGhost("#85d9e6")}${pacmanVerbSprite()}${pacmanVerbGhost()}</div><h2 id="lm-finish-title" tabindex="-1">¡Misión terminada!</h2><p>Completaste ${session.exercises.length} desafíos.</p>${renderPacmanVerbTrail(session.exercises.length, session.exercises.length)}<div class="lm-collection" aria-label="${session.score} respuestas correctas de ${session.exercises.length}">${session.answers.map((answer) => `<span class="${answer.isCorrect ? "is-earned" : ""}" aria-label="${answer.isCorrect ? "Resuelto" : "Para repasar"}">${answer.isCorrect ? "🍒" : "📖"}</span>`).join("")}</div><p>${session.score} resueltos al comprobar · ${session.exercises.length - session.score} para seguir practicando</p><div class="lm-finish-actions"><button class="lm-primary" type="button" data-action="start" data-mode="activity" data-subject="lengua" data-theme="${escapeHtml(session.themeId)}">Otra misión ↻</button><button class="lm-exit" type="button" data-action="cancel-run">Volver a Lengua</button></div></section>`);
}
