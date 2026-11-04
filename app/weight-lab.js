// All masses use integer quarter-kilos. Every visible weight comes from wlWeight:
// its fixed CSS dimensions never depend on its container, exercise or animation.
const WEIGHT_LAB_THEMES = [
  { id: "pesas-completar-kilo", weightMode: "complete", title: "Completá un kilo", description: "Juntá medios y cuartos para formar un kilogramo.", accent: "#ffd777", number: "08" },
  { id: "pesas-balanza", weightMode: "compare", title: "La balanza de Pac-Man", description: "Compará grupos de pesas: más, menos o igual.", accent: "#a6dbce", number: "09" },
  { id: "pesas-mercado", weightMode: "market", title: "Los pedidos de Pac-Man", description: "Prepará cada pedido con pesas de un kilo, medio y cuarto.", accent: "#cab9ed", number: "10" }
].map(theme => ({ ...theme, activityLabel: "PESAS · 5 desafíos", randomExerciseCount: 5,
  exercises: [{ id: theme.id, type: "weight-lab", prompt: theme.title }] }));

function withWeightLabThemes(subjectId, themes) {
  if (subjectId !== "tecnologia") return themes;
  const rest = themes.filter(theme => !WEIGHT_LAB_THEMES.some(item => item.id === theme.id));
  const at = rest.findIndex(theme => theme.id === "taller-peso");
  rest.splice(at < 0 ? rest.length : at, 0, ...WEIGHT_LAB_THEMES);
  return rest;
}

const WL_MASSES = {
  4: { label: "1 kg", name: "un kilogramo", className: "kilo", width: 76, height: 96 },
  2: { label: "1/2 kg", name: "medio kilogramo", className: "half", width: 61, height: 77 },
  1: { label: "1/4 kg", name: "un cuarto de kilogramo", className: "quarter", width: 47, height: 60 }
};
function wlMassLabel(units) {
  const whole = Math.floor(units / 4), fraction = ["", "1/4", "1/2", "3/4"][units % 4];
  return `${whole || !fraction ? whole : ""}${whole && fraction ? " " : ""}${fraction} kg`;
}
function wlSum(weights) { return weights.reduce((sum, units) => sum + units, 0); }
function wlWeight(units) {
  const mass = WL_MASSES[units];
  return `<svg class="wl-weight wl-${mass.className}" data-mass="${units}" width="${mass.width}" height="${mass.height}" viewBox="0 0 160 200" role="img" aria-label="Pesa de ${mass.name}"><g fill="#fff6d9" stroke="#34495a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M49 35C47 49 10 48 8 72V162Q8 192 38 194Q80 201 122 194Q152 192 152 162V72C150 48 113 49 111 35Z"/><path d="M8 72Q80 96 152 72" fill="#f3e3b7"/><path d="M49 35q0 15-12 18M111 35q0 15 12 18" fill="none"/><ellipse cx="80" cy="30" rx="42" ry="16" fill="#fffcf0"/></g>${units === 4 ? '<text x="80" y="147" font-size="35" font-weight="800">1 kg</text>' : `<text x="80" y="132" font-size="33" font-weight="750">1/${units === 2 ? "2" : "4"}</text><text x="80" y="168" font-size="30" font-weight="700">kg</text>`}</svg>`;
}

function createWeightLabExercises(theme) {
  let rounds;
  if (theme.weightMode === "complete") {
    rounds = [
      { initial: [], allowed: [2], instruction: "Usá pesas de medio kilo." },
      { initial: [], allowed: [1], instruction: "Usá pesas de cuarto kilo." },
      { initial: [2], allowed: [1], instruction: "Ya hay medio kilo. Agregá cuartos para llegar a un kilo." },
      { initial: [1, 1], allowed: [2], instruction: "Ya hay dos cuartos. Agregá lo que falta." },
      { initial: [1], allowed: [2, 1], instruction: "Ya hay un cuarto. Completá con medios o cuartos." }
    ].map((item, i) => ({ ...item, key: `complete-${i}`, target: 4, prompt: "Completá un kilogramo", explanation: "Un kilo equivale a dos medios o a cuatro cuartos. Un medio y dos cuartos también forman un kilo." }));
  } else if (theme.weightMode === "compare") {
    const equal = shuffled([[[4], [2, 2]], [[2], [1, 1]], [[4], [1, 1, 1, 1]], [[2, 1], [1, 1, 1]]])[0];
    const unequal = shuffled([[[4], [2, 1]], [[2], [1]], [[2, 2], [1, 1, 1]], [[4, 1], [2, 2]], [[2, 1], [1, 1]]]).slice(0, 4);
    rounds = shuffled([equal, ...unequal]).map((pair, i) => {
      const [left, right] = Math.random() < .5 ? pair : [...pair].reverse();
      const less = i % 2 === 1, leftTotal = wlSum(left), rightTotal = wlSum(right);
      const correct = leftTotal === rightTotal ? "equal" : (leftTotal > rightTotal) !== less ? "left" : "right";
      return { key: `compare-${i}`, left, right, less, correct, options: shuffled(["left", "equal", "right"]),
        prompt: `¿Qué plato pesa ${less ? "menos" : "más"}?`, instruction: "Sumá las pesas de cada plato. Después elegí.",
        explanation: `Izquierdo: ${wlMassLabel(leftTotal)}. Derecho: ${wlMassLabel(rightTotal)}. ${leftTotal === rightTotal ? "Pesan igual: la balanza queda equilibrada." : `El plato ${leftTotal > rightTotal ? "izquierdo" : "derecho"} pesa más y baja; el otro pesa menos y sube.`}` };
    });
  } else {
    const orders = shuffled([
      { target: 3, fruit: "🍓", food: "frutillas" }, { target: 4, fruit: "🍎", food: "manzanas" },
      { target: 5, fruit: "🍐", food: "peras" }, { target: 6, fruit: "🍊", food: "naranjas" },
      { target: 7, fruit: "🍋", food: "limones" }, { target: 8, fruit: "🍒", food: "cerezas" }
    ]).slice(0, 5);
    rounds = orders.map(item => ({ ...item, key: `market-${item.target}`, initial: [], allowed: [4, 2, 1],
      prompt: `Prepará ${wlMassLabel(item.target)} de ${item.food}`, instruction: "Tocá las pesas que necesitás. Podés combinar kilos, medios y cuartos.",
      explanation: `El pedido pesa ${wlMassLabel(item.target)}. Hay distintas combinaciones correctas: lo que importa es la suma de todas las pesas.` }));
  }
  return rounds.map(item => ({ ...item, id: `${theme.id}-${item.key}`, type: "weight-lab", mode: theme.weightMode }));
}
function createWeightLabState(exercise) {
  return { placed: [], choice: null, checked: false, isCorrect: false, added: null, serial: 0, explanation: "" };
}
function wlCurrent() {
  const exercise = session?.exercises?.[session.index], state = session?.weightLab?.[exercise?.id];
  return route.view === "run" && exercise?.type === "weight-lab" && state ? { exercise, state } : null;
}
function wlCanCheck(exercise, state) {
  return !state.checked && (exercise.mode === "compare" ? exercise.options.includes(state.choice) : state.placed.length > 0);
}
function wlPacman() {
  return '<svg class="wl-pacman" viewBox="0 0 100 100" aria-hidden="true"><g class="wl-mouth-top"><path d="M50 50 94 25A50 50 0 0 0 0 50Z" fill="#ffda48"/><circle cx="51" cy="19" r="5" fill="#152a45"/></g><path class="wl-mouth-bottom" d="M50 50 94 75A50 50 0 0 1 0 50Z" fill="#ffda48"/></svg>';
}
function wlTrack(state) {
  return `<div class="wl-track ${state.checked && state.isCorrect ? "wl-cheer" : ""}" data-round="${session.index}" data-phase="${state.checked}" aria-hidden="true"><span class="wl-track-line"></span><span class="wl-player" style="--wl-start:${Math.round(session.index * 17)}%;--wl-stop:${Math.round((session.index + 1) * 17)}%">${wlPacman()}</span>${session.exercises.map((_, i) => `<span class="wl-dot ${i < session.index || i === session.index && state.isCorrect ? "is-eaten" : ""}" style="left:${(i + 1) * 17}%"></span>`).join("")}<span class="wl-track-ghost">${pacmanVerbGhost("#b8c0ef")}</span><span class="wl-sparks">✦ · ✧ · ✦</span></div>`;
}
function wlShelf() {
  return `<aside class="wl-shelf" aria-label="Conocé las pesas"><div class="wl-shelf-title"><span>LAS TRES PESAS</span><small>Cada una conserva su tamaño.</small></div><div class="wl-reference">${[4, 2, 1].map(units => `<div>${wlWeight(units)}<span>${units === 4 ? "Un kilo" : units === 2 ? "Medio kilo" : "Cuarto kilo"}</span></div>`).join("")}</div></aside>`;
}
function wlBuilder(exercise, state) {
  const totalCount = (exercise.initial?.length || 0) + state.placed.length;
  return `<div class="wl-build"><div class="wl-tray" aria-label="Pesas elegidas"><span class="wl-tray-label">${exercise.initial.length ? "COMPLETÁ ESTAS PESAS" : "ARMÁ EL PESO ACÁ"}</span><div class="wl-placed">${exercise.initial.map(units => `<span class="wl-fixed" title="Pesa inicial">${wlWeight(units)}<small>Ya estaba</small></span>`).join("")}${state.placed.map((token, index) => `<button class="wl-chip ${state.added === token.id ? "wl-new" : ""}" type="button" data-action="wl-remove" data-index="${index}" ${state.checked ? "disabled" : ""} aria-label="Quitar pesa de ${WL_MASSES[token.units].name}">${wlWeight(token.units)}<small>${state.checked ? "✓" : "×"}</small></button>`).join("")}${!totalCount ? '<span class="wl-empty">＋<small>Tocá una pesa de abajo</small></span>' : ""}</div></div><div class="wl-bank" role="group" aria-label="Agregar pesas">${exercise.allowed.map(units => `<button type="button" class="wl-add" data-action="wl-add" data-mass="${units}" ${state.checked || state.placed.length >= 8 ? "disabled" : ""} aria-label="Agregar pesa de ${WL_MASSES[units].name}">${wlWeight(units)}<span>Agregar +</span></button>`).join("")}<p>${state.placed.length >= 8 ? "Podés quitar pesas para cambiar la combinación." : "Tocá para agregar.<br>Tocá una pesa elegida para quitarla."}</p></div></div>`;
}
function wlBalance(exercise, state) {
  const difference = wlSum(exercise.left) - wlSum(exercise.right);
  const tilt = state.checked ? Math.sign(difference) : 0;
  return `<div class="wl-balance ${state.checked ? "wl-weighed" : ""}" style="--wl-tilt:${tilt}"><div class="wl-pans">${[exercise.left, exercise.right].map((weights, i) => `<div class="wl-pan wl-pan-${i}"><div class="wl-pan-weights">${weights.map(wlWeight).join("")}</div><span>${i ? "Derecho" : "Izquierdo"}${state.checked ? ` · ${wlMassLabel(wlSum(weights))}` : ""}</span></div>`).join("")}</div><div class="wl-beam"></div><div class="wl-pillar"></div><div class="wl-base"></div><span class="wl-pivot"></span></div><div class="wl-choices" role="group" aria-labelledby="wl-question">${exercise.options.map(value => `<button type="button" data-action="wl-choice" data-value="${value}" class="${state.choice === value ? "is-selected" : ""}" aria-pressed="${state.choice === value}" ${state.checked ? "disabled" : ""}>${value === "left" ? "← El izquierdo" : value === "right" ? "El derecho →" : "= Pesan igual"}</button>`).join("")}</div>`;
}
function renderWeightLabRunner(exercise) {
  const state = session.weightLab[exercise.id], theme = WEIGHT_LAB_THEMES.find(item => item.weightMode === exercise.mode);
  const oldTrack = document.querySelector(".wl-track");
  const feedback = state.checked ? `${state.isCorrect ? "¡Muy bien!" : "Vamos a repasarlo."} ${state.explanation}` : "Podés cambiar tu respuesta antes de comprobar.";
  renderShell(`<section class="wl-runner ${state.checked ? state.isCorrect ? "wl-success" : "wl-review" : ""}" style="--wl-accent:${theme.accent}"><header class="wl-header"><button class="wl-back" data-action="cancel-run" type="button">${icon("arrow")}Tecnología</button><div><span>EL MERCADO DE LAS PESAS</span><strong>${escapeHtml(session.themeTitle)}</strong></div><b>${session.index + 1}<small> / ${session.exercises.length}</small></b></header>${wlTrack(state)}<div class="wl-layout"><div class="wl-sidebar"><div class="wl-order"><span>${exercise.mode === "compare" ? "MIRÁ LOS DOS PLATOS" : "EL OBJETIVO"}</span>${exercise.mode === "market" ? `<div class="wl-fruit" aria-hidden="true">${exercise.fruit}</div><strong>${wlMassLabel(exercise.target)}</strong><p>de ${exercise.food}</p>` : exercise.mode === "complete" ? `<div class="wl-goal-weight">${wlWeight(4)}</div><strong>Un kilogramo</strong><p>Juntá lo que falta.</p>` : `<div class="wl-order-scale">${techArt("scale")}</div><strong>Más, menos o igual</strong><p>La balanza se mueve al comprobar.</p>`}</div>${wlShelf()}</div><article class="wl-board"><span class="wl-kicker">${exercise.mode === "complete" ? "01 · COMPLETAR" : exercise.mode === "compare" ? "02 · COMPARAR" : "03 · COMBINAR"}</span><h2 id="wl-question" tabindex="-1">${escapeHtml(exercise.prompt)}</h2><p class="wl-instruction">${escapeHtml(exercise.instruction)}</p>${exercise.mode === "compare" ? wlBalance(exercise, state) : wlBuilder(exercise, state)}<footer class="wl-controls"><p role="status" aria-live="polite">${escapeHtml(feedback)}</p>${state.checked ? `<button class="wl-primary" type="button" data-action="wl-next">${session.index + 1 === session.exercises.length ? "Ver resultado" : "Siguiente"} →</button>` : `<button class="wl-primary" type="button" data-action="wl-check" ${wlCanCheck(exercise, state) ? "" : "disabled"}>Comprobar ${icon("check")}</button>`}</footer></article></div></section>`);
  if (oldTrack?.dataset.round === String(session.index) && oldTrack.dataset.phase === String(state.checked)) document.querySelector(".wl-track")?.replaceWith(oldTrack);
  state.added = null;
}
function weightLabAction(action, target) {
  const current = wlCurrent();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "wl-next") {
    if (!state.checked) return;
    session.index++; render(); window.scrollTo({ top: 0, behavior: "auto" });
    document.querySelector("#wl-question, #wl-finish-title")?.focus({ preventScroll: true }); return;
  }
  if (state.checked) return;
  let focusSelector;
  if (action === "wl-add") {
    const units = Number(target.dataset.mass);
    if (exercise.mode === "compare" || !exercise.allowed.includes(units) || state.placed.length >= 8) return;
    const id = ++state.serial;
    state.placed.push({ units, id }); state.added = id;
    focusSelector = `[data-action="wl-add"][data-mass="${units}"]:not(:disabled)`;
  } else if (action === "wl-remove") {
    const index = Number(target.dataset.index);
    if (exercise.mode === "compare" || !Number.isInteger(index) || index < 0 || index >= state.placed.length) return;
    state.placed.splice(index, 1);
    focusSelector = `[data-action="wl-remove"][data-index="${Math.min(index, state.placed.length - 1)}"], [data-action="wl-add"]:not(:disabled)`;
  } else if (action === "wl-choice") {
    if (exercise.mode !== "compare" || !exercise.options.includes(target.dataset.value)) return;
    state.choice = target.dataset.value;
    focusSelector = `[data-action="wl-choice"][data-value="${state.choice}"]`;
  } else if (action === "wl-check") {
    if (!wlCanCheck(exercise, state)) return;
    const total = exercise.mode === "compare" ? null : wlSum([...exercise.initial, ...state.placed.map(token => token.units)]);
    state.isCorrect = exercise.mode === "compare" ? state.choice === exercise.correct : total === exercise.target;
    state.checked = true;
    state.explanation = exercise.mode === "compare" ? exercise.explanation : `Tus pesas suman ${wlMassLabel(total)}. ${state.isCorrect ? exercise.explanation : `Para llegar a ${wlMassLabel(exercise.target)}, ${total < exercise.target ? `faltan ${wlMassLabel(exercise.target - total)}` : `sobran ${wlMassLabel(total - exercise.target)}`}. ${exercise.explanation}`}`;
    if (state.isCorrect) session.score++;
    session.answers.push({ prompt: exercise.prompt, selected: exercise.mode === "compare" ? state.choice : [...exercise.initial, ...state.placed.map(token => token.units)], correct: exercise.mode === "compare" ? exercise.correct : exercise.target, isCorrect: state.isCorrect });
    focusSelector = '[data-action="wl-next"]';
  } else return;
  const y = window.scrollY; render(); window.scrollTo({ top: y, behavior: "auto" });
  document.querySelector(focusSelector)?.focus({ preventScroll: true });
}
function renderWeightLabFinish() {
  renderShell(`<section class="wl-runner wl-finish"><span class="wl-kicker">EL MERCADO DE LAS PESAS · TECNOLOGÍA</span><div class="wl-finish-friends" aria-hidden="true">${pacmanVerbGhost("#a6dbce")}${pacmanVerbSprite()}${pacmanVerbGhost("#cab9ed")}</div><h2 id="wl-finish-title" tabindex="-1">¡Terminaste, ${escapeHtml(data.settings.studentName || "Ian")}!</h2><p>${escapeHtml(session.themeTitle)}</p><div class="wl-results">${session.answers.map((answer, index) => `<span aria-label="Desafío ${index + 1}: ${answer.isCorrect ? "correcto" : "para repasar"}">${answer.isCorrect ? "★" : "○"}</span>`).join("")}</div><strong>${session.score} de ${session.exercises.length} respuestas correctas</strong><p>1 kilo = 2 medios = 4 cuartos</p><div class="wl-finish-actions"><button class="wl-primary" type="button" data-action="start" data-subject="tecnologia" data-theme="${session.themeId}" data-mode="activity">Jugar otra vez ↻</button><button class="wl-back" type="button" data-action="cancel-run">Volver a Tecnología</button></div></section>`);
}
