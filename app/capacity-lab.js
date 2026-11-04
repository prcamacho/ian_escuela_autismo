// Quantities are integer quarter-litres throughout. The same values drive the
// exercises, graduated cylinders, source levels and every transfer animation.
const CL_NAMES = { 1: "un cuarto de litro", 2: "medio litro", 4: "un litro" };
const CL_OBJECTS = [
  { id: "glass", name: "Vaso", units: 1 },
  { id: "bucket", name: "Balde", units: 20 },
  { id: "baby", name: "Mamadera", units: 1 },
  { id: "watering", name: "Regadera", units: 12 },
  { id: "bottle", name: "Botella", units: 4 },
  { id: "jug", name: "Jarra", units: 8 },
  { id: "cup", name: "Taza", units: 1 }
];
let capacityTimeline = null;
let capacityAnimationState = null;
let capacityArtSerial = 0;

function clTotal(parts) { return parts.reduce((sum, value) => sum + value, 0); }
function clLabel(units) {
  const whole = Math.floor(units / 4), fraction = ["", "1/4", "1/2", "3/4"][units % 4];
  return `${whole || !fraction ? whole : ""}${whole && fraction ? " " : ""}${fraction} L`;
}
function createCapacityExercises(theme) {
  let rounds;
  if (theme.capacityMode === "fill") {
    rounds = [
      { initial: [], allowed: [2], instruction: "Usá medios litros para llegar a la marca de 1 L." },
      { initial: [], allowed: [1], instruction: "Ahora usá cuartos de litro. Cada uno es más pequeño." },
      { initial: [2], allowed: [1], instruction: "Ya hay medio litro. Completá con cuartos." },
      { initial: [1, 1], allowed: [2], instruction: "Ya hay dos cuartos. Agregá lo que falta." },
      { initial: [1], allowed: [2, 1], instruction: "Ya hay un cuarto. Podés combinar medios y cuartos." }
    ].map(item => ({ ...item, target: 4, prompt: "Llená exactamente un litro" }));
  } else if (theme.capacityMode === "sum") {
    // All totals are whole litres, while bottle count deliberately differs.
    rounds = [[4, 2, 2], [2, 2, 2, 2, 2, 2], [4, 4, 2, 2, 2, 2], [4, 2, 2, 2, 2], [4, 4, 4, 4, 2, 2]]
      .map(bottles => ({ bottles: shuffled(bottles), options: shuffled([2, 3, 4, 5, 6]).map(value => value * 4),
        target: clTotal(bottles), prompt: "¿Cuántos litros hay en total?",
        instruction: "Contá el agua, no las botellas. Podés juntarla de a una para mirar." }));
  } else {
    const small = shuffled(CL_OBJECTS.filter(item => item.units < 4)).slice(0, 2);
    const big = shuffled(CL_OBJECTS.filter(item => item.units > 4)).slice(0, 2);
    rounds = shuffled([...small, ...big, CL_OBJECTS.find(item => item.units === 4)])
      .map(object => ({ object, correct: object.units < 4 ? "less" : object.units > 4 ? "more" : "equal",
        prompt: `¿Cuánto cabe en ${object.id === "baby" || object.id === "watering" || object.id === "bottle" || object.id === "jug" || object.id === "cup" ? "esta" : "este"} ${object.name.toLowerCase()}?`,
        instruction: "Compará su capacidad con un litro. Podés hacer la prueba con el agua." }));
  }
  return rounds.map((item, index) => ({ ...item, id: `${theme.id}-${index}`, mode: theme.capacityMode, type: "capacity-lab" }));
}
function createCapacityState() {
  return { parts: [], poured: 0, measured: false, choice: null, checked: false, isCorrect: false,
    busy: false, sourceUnits: null, message: "", supported: false };
}
function clCurrent() {
  const exercise = session?.exercises?.[session.index];
  if (route.view !== "run" || exercise?.type !== "capacity-lab") return null;
  return { exercise, state: session.capacity[exercise.id], lesson: session.capacityLesson };
}
function stopCapacityAnimation() {
  capacityTimeline?.kill(); capacityTimeline = null;
  if (capacityAnimationState) capacityAnimationState.busy = false;
  capacityAnimationState = null;
}
function clButton(action, text, attrs = "", disabled = false, kind = "") {
  return `<button type="button" class="cl-button ${kind}" data-action="${action}" ${attrs} ${disabled ? "disabled" : ""}>${text}</button>`;
}
function clMini(units, faded = false) {
  const id = `cl-mini-${++capacityArtSerial}`;
  return `<svg class="cl-mini ${faded ? "cl-emptied" : ""}" viewBox="0 0 72 116" role="img" aria-label="Botella con ${CL_NAMES[units]}"><defs><clipPath id="${id}"><path d="M27 17H45V29L56 44V102Q56 108 50 108H22Q16 108 16 102V44L27 29Z"/></clipPath></defs><path d="M27 17H45V29L56 44V102Q56 108 50 108H22Q16 108 16 102V44L27 29Z" fill="#e6f5fb"/><g clip-path="url(#${id})"><rect x="14" y="${108 - units * 19}" width="44" height="${units * 19}" fill="#218fdb"/><path d="M12 ${109 - units * 19}q12-5 24 0t24 0" fill="none" stroke="#9ae4ff" stroke-width="3"/></g><path d="M27 17H45V29L56 44V102Q56 108 50 108H22Q16 108 16 102V44L27 29Z" fill="none" stroke="#24516b" stroke-width="2.5"/><rect x="24" y="9" width="24" height="10" rx="3" fill="#ffdc69" stroke="#24516b" stroke-width="2"/><rect x="16" y="62" width="40" height="24" rx="3" fill="#fffdf5"/><text x="36" y="79" text-anchor="middle" fill="#173f58" font-size="13" font-weight="800">${clLabel(units)}</text></svg>`;
}
function clShape(kind) {
  if (kind === "bucket") return "M12 30H168L148 204Q90 221 32 204Z";
  if (kind === "glass") return "M26 20H154L139 211H41Z";
  if (kind === "baby" || kind === "bottle") return "M59 8H121V34L148 63V204Q148 216 136 216H44Q32 216 32 204V63L59 34Z";
  if (kind === "cup") return "M17 59H155L143 151Q135 193 86 193Q36 193 29 151Z";
  if (kind === "watering") return "M43 61Q90 47 139 61L151 202Q89 221 27 202Z";
  if (kind === "jug") return "M27 16H150L138 60L153 194Q153 216 129 216H44Q22 216 25 194L42 60Z";
  return "M12 8H168V204Q168 216 156 216H24Q12 216 12 204Z";
}
function clVessel({ x, y, width, height, units, capacity = 4, kind = "measure", role, ticks = false }) {
  const id = `cl-vessel-${++capacityArtSerial}`, shape = clShape(kind);
  // A straight graduated vessel has an exact constant cross-section. Everyday
  // silhouettes are illustrative and their stated capacity is always explicit.
  const bottom = 212, waterHeight = 200 * Math.min(units, capacity) / capacity;
  const extras = kind === "jug" || kind === "cup" ? '<path d="M153 62Q209 43 192 123Q184 150 151 151" fill="none" stroke="#608a9c" stroke-width="12"/>'
    : kind === "bucket" ? '<path d="M13 35Q-15 181 91 181Q197 181 168 35" fill="none" stroke="#7398a8" stroke-width="7"/>'
      : kind === "watering" ? '<path d="M43 86 9 47-4 58 28 161" fill="#ddeef3" stroke="#608a9c" stroke-width="4"/><path d="M128 69Q207-19 165 101" fill="none" stroke="#608a9c" stroke-width="10"/>'
        : kind === "baby" ? '<path d="M65 8V-8Q67-17 78-18L82-31Q90-43 99-31L103-18Q115-17 115-8V8" fill="#ffda7d" stroke="#608a9c" stroke-width="3"/>' : "";
  return `<g class="cl-${role}" transform="translate(${x} ${y})"><svg width="${width}" height="${height}" viewBox="-10 -44 220 270" overflow="visible" aria-hidden="true"><defs><clipPath id="${id}"><path d="${shape}"/></clipPath><linearGradient id="${id}-water" x2="1" y2="1"><stop stop-color="#4dcaf5"/><stop offset="1" stop-color="#1579cd"/></linearGradient></defs>${extras}<path d="${shape}" fill="#e8f6fa" fill-opacity=".65"/><g clip-path="url(#${id})"><rect class="cl-${role}-water" data-bottom="${bottom}" data-depth="200" data-capacity="${capacity}" x="0" y="${bottom - waterHeight}" width="180" height="${waterHeight}" fill="url(#${id}-water)"/><ellipse class="cl-${role}-surface" cx="90" cy="${bottom - waterHeight}" rx="84" ry="4" fill="#9aeaff" opacity="${units ? 1 : 0}"/>${[0, 1, 2, 3].map(i => `<circle class="cl-bubble" cx="${48 + i * 24}" cy="${185 - i * 18}" r="${3 + i % 2}" fill="#d7faff" opacity=".6"/>`).join("")}</g><path d="${shape}" fill="none" stroke="#46758d" stroke-width="3.5" stroke-linejoin="round"/><path d="M42 76V184" stroke="#fff" stroke-width="6" opacity=".65" stroke-linecap="round"/>${ticks ? Array.from({ length: capacity === 24 ? 6 : 4 }, (_, index) => {
    const value = capacity === 24 ? (index + 1) * 4 : index + 1;
    const yy = bottom - 200 * value / capacity;
    return `<path d="M134 ${yy}H168" stroke="${value === 4 ? '#c67b22' : '#5a8295'}" stroke-width="${value === 4 ? 3 : 2}" stroke-dasharray="${value === 4 ? '5 3' : 'none'}"/><text x="178" y="${yy + 5}" font-size="14" fill="#264e64" font-weight="${value === 4 ? 800 : 600}">${clLabel(value)}</text>`;
  }).join("") : ""}</svg></g>`;
}
function clScene({ units, source, capacity = 4, kind = "measure", label = "Jarra de 1 litro", ticks = true }) {
  return `<svg class="cl-scene" viewBox="0 0 740 300" role="img" aria-label="${escapeHtml(`Jarra de origen: ${clLabel(source)}. ${label}. Agua reunida: ${clLabel(units)}.`)}"><defs><linearGradient id="cl-table" x2="0" y2="1"><stop stop-color="#dbecec"/><stop offset="1" stop-color="#edf5ef"/></linearGradient></defs><ellipse cx="225" cy="256" rx="84" ry="12" fill="#aac8ce" opacity=".3"/><ellipse cx="466" cy="256" rx="121" ry="14" fill="#aac8ce" opacity=".3"/><path d="M48 263H684" stroke="#b6cecb" stroke-width="2"/><rect x="46" y="264" width="640" height="16" rx="8" fill="url(#cl-table)"/>
    <text x="217" y="24" class="cl-svg-label" text-anchor="middle">AGUA PARA VOLCAR</text><text x="470" y="24" class="cl-svg-label" text-anchor="middle">${escapeHtml(label.toUpperCase())}</text>
    ${clVessel({ x: 156, y: 48, width: 145, height: 205, units: source, role: "source" })}
    <path class="cl-stream" d="M273 88Q385 75 454 164" fill="none" stroke="#41b9f0" stroke-width="13" stroke-linecap="round" opacity="0"/>
    <path class="cl-stream-shine" d="M273 88Q385 75 454 164" fill="none" stroke="#b2f0ff" stroke-width="3" stroke-linecap="round" opacity="0"/>
    ${clVessel({ x: 368, y: 40, width: 190, height: 218, units, capacity, role: "target", kind, ticks })}
    <g class="cl-splash" opacity="0">${Array.from({ length: 9 }, (_, i) => `<ellipse cx="454" cy="160" rx="${2 + i % 3}" ry="${5 + i % 2}" fill="${i % 2 ? '#78d6f5' : '#289edb'}"/>`).join("")}</g>
    <text x="217" y="297" class="cl-svg-value" text-anchor="middle">${clLabel(source)}</text><text x="470" y="297" class="cl-svg-value cl-target-caption" text-anchor="middle">${clLabel(units)}</text>
  </svg>`;
}
function clProgress(state) {
  return `<div class="cl-progress" aria-label="Desafío ${session.index + 1} de ${session.exercises.length}"><span class="cl-progress-rail"></span>${session.exercises.map((_, i) => `<span class="cl-progress-stop ${i < session.index ? "cl-visited" : ""} ${i === session.index ? "cl-here" : ""}">${i === session.index ? pacmanVerbSprite() : '<i></i>'}</span>`).join("")}<span class="cl-progress-end">⚑</span></div>`;
}
function clGuide(lesson) {
  return `<aside class="cl-guide"><div class="cl-companion">${pacmanVerbSprite()}<span>EL LABORATORIO<br>DEL AGUA</span></div><h2>¡Mirá cómo<br>se junta!</h2><p>La misma agua puede estar en uno o en varios recipientes.</p><div class="cl-reference"><strong>1 litro</strong><span>= 2 medios litros</span><span>= 4 cuartos de litro</span></div><div class="cl-guide-note"><span>✦</span><p>${lesson ? "Vos elegís cuándo volcar. Mirá el agua bajar y subir." : "Podés mirar la explicación y volver a tu desafío."}</p></div>${!lesson ? clButton("cl-help", "Ver explicación ↻", "", false, "cl-quiet") : ""}</aside>`;
}
function clCanCheck(exercise, state) {
  return !state.busy && !state.checked && (exercise.mode === "fill" ? state.parts.length > 0 : state.choice !== null);
}
function clExplanation(exercise, state) {
  if (exercise.mode === "fill") {
    const total = clTotal([...exercise.initial, ...state.parts]);
    return total === 4 ? `${[...exercise.initial, ...state.parts].map(clLabel).join(" + ")} = 1 L. La jarra llegó a la marca.`
      : `Hay ${clLabel(total)}. Faltan ${clLabel(4 - total)} para llegar a un litro.`;
  }
  if (exercise.mode === "sum") return `${exercise.bottles.filter(n => n === 4).length} botellas llenas de 1 L y ${exercise.bottles.filter(n => n === 2).length} medios litros suman ${clLabel(exercise.target)}. Cada dos medios forman otro litro.`;
  const { object } = exercise;
  return object.units < 4 ? `Se llena con ${clLabel(object.units)}. Del litro sobra ${clLabel(4 - object.units)}: cabe menos de un litro.`
    : object.units === 4 ? "El litro entra justo y llena la botella. Cabe exactamente un litro."
      : `Caben ${clLabel(object.units)}. Después de volcar un litro todavía queda lugar: cabe más de un litro.`;
}
function renderCapacityRunner(exercise) {
  const state = session.capacity[exercise.id], lesson = session.capacityLesson, intro = lesson.active;
  const model = intro ? lesson : state;
  let scene, actions, top = "", prompt, instruction, feedback;
  if (intro) {
    const total = clTotal(lesson.parts);
    prompt = "Un litro, paso a paso";
    instruction = lesson.unit === 2 ? "Volcá dos medios litros. Mirá cómo llenan una jarra de un litro." : "Volcá cuatro cuartos. La misma jarra se llena con cuatro partes iguales.";
    scene = clScene({ units: total, source: model.sourceUnits ?? lesson.unit });
    top = `<div class="cl-tabs" role="group" aria-label="Elegir explicación">${[2, 1].map(unit => clButton("cl-lesson-unit", unit === 2 ? "Con medios litros" : "Con cuartos de litro", `data-units="${unit}" aria-pressed="${lesson.unit === unit}"`, model.busy, lesson.unit === unit ? "cl-selected" : "cl-quiet")).join("")}</div>`;
    actions = clButton("cl-demo", `Volcar ${lesson.unit === 2 ? '1/2' : '1/4'} L ↓`, "", model.busy || total >= 4, "cl-pour-button") + clButton("cl-lesson-reset", "Vaciar y repetir ↻", "", model.busy, "cl-quiet");
    feedback = total === 4 ? `¡La misma cantidad! ${lesson.parts.length} ${lesson.unit === 2 ? "medios" : "cuartos"} litros = 1 litro.` : total ? `${lesson.parts.map(clLabel).join(" + ")} = ${clLabel(total)}. Seguí mirando.` : "La jarra está vacía. Tocá Volcar para comenzar.";
  } else if (exercise.mode === "fill") {
    const total = clTotal([...exercise.initial, ...state.parts]);
    prompt = exercise.prompt; instruction = exercise.instruction;
    scene = clScene({ units: total, source: state.sourceUnits ?? exercise.allowed[0] });
    top = `<div class="cl-measure-note">META <b>1 L</b><span>${exercise.initial.length ? `Al empezar: ${clLabel(clTotal(exercise.initial))}` : "Empezamos con la jarra vacía"}</span></div>`;
    actions = exercise.allowed.map(unit => clButton("cl-pour", `Volcar ${clLabel(unit)} ↓`, `data-units="${unit}"`, state.checked || state.busy, "cl-pour-button")).join("") + clButton("cl-undo", "Deshacer ↶", "", !state.parts.length || state.checked || state.busy, "cl-quiet");
    feedback = state.message || "Mirá la marca de 1 L. Podés deshacer el último paso.";
  } else if (exercise.mode === "sum") {
    const total = clTotal(exercise.bottles.slice(0, state.poured));
    prompt = exercise.prompt; instruction = exercise.instruction;
    top = `<div class="cl-bottle-shelf" aria-label="Botellas para sumar">${exercise.bottles.map((unit, i) => `<span class="cl-shelf-bottle ${i === state.poured && !state.checked ? "cl-bottle-current" : ""}">${clMini(unit, i < state.poured)}<small>${clLabel(unit)}${i < state.poured ? ' ✓' : ''}</small></span>`).join("")}</div>`;
    scene = clScene({ units: total, source: state.sourceUnits ?? exercise.bottles[state.poured] ?? 0, capacity: 24, label: "Depósito de 6 litros" });
    actions = clButton("cl-collect", state.poured ? "Volcar la siguiente ↓" : "Juntar el agua ↓", "", state.busy || state.checked || state.poured >= exercise.bottles.length, "cl-pour-button") + `<div class="cl-answers" role="group" aria-label="Litros en total">${exercise.options.map(value => clButton("cl-choice", clLabel(value), `data-value="${value}" aria-pressed="${state.choice === String(value)}"`, state.busy || state.checked, state.choice === String(value) ? "cl-selected" : "")).join("")}</div>`;
    feedback = state.poured === exercise.bottles.length ? "Toda el agua está en el depósito. Elegí cuántos litros hay." : `Botellas volcadas: ${state.poured} de ${exercise.bottles.length}. Podés responder cuando quieras.`;
  } else {
    const amount = state.measured ? Math.min(exercise.object.units, 4) : 0;
    prompt = exercise.prompt; instruction = exercise.instruction;
    top = `<div class="cl-measure-note">${escapeHtml(exercise.object.name.toUpperCase())}<b>Capacidad: ${clLabel(exercise.object.units)}</b><span>Dibujo ilustrativo · Mirá la cantidad indicada</span></div>`;
    scene = clScene({ units: amount, source: state.sourceUnits ?? (state.measured ? 4 - amount : 4), capacity: exercise.object.units, kind: exercise.object.id, label: exercise.object.name, ticks: false });
    actions = clButton("cl-measure", "Probar con 1 litro ↓", "", state.busy || state.checked || state.measured, "cl-pour-button") + `<div class="cl-answers cl-comparisons" role="group" aria-label="Comparar con un litro">${[["less", "Menos de 1 L"], ["equal", "Justo 1 L"], ["more", "Más de 1 L"]].map(([value, text]) => clButton("cl-choice", text, `data-value="${value}" aria-pressed="${state.choice === value}"`, state.busy || state.checked, state.choice === value ? "cl-selected" : "")).join("")}</div>`;
    feedback = state.measured ? clExplanation(exercise, state) : "¿Se llenará antes, justo, o quedará lugar?";
  }
  if (!intro && state.checked) feedback = `${state.isCorrect ? "¡Muy bien!" : "Vamos a mirarlo juntos."} ${clExplanation(exercise, state)}`;
  renderShell(`<section class="cl-runner ${intro ? "cl-intro" : ""} ${state.checked && !intro ? state.isCorrect ? "cl-success" : "cl-review" : ""}"><header class="cl-header">${clButton("cl-exit", `${icon("arrow")}Tecnología`, "", false, "cl-back")}<div><span>LITROS CON PAC-MAN</span><strong>${escapeHtml(session.themeTitle)}</strong></div><b>${intro ? "Mirá" : `${session.index + 1} / ${session.exercises.length}`}</b></header>${clProgress(state)}<div class="cl-layout">${clGuide(intro)}<article class="cl-board" aria-busy="${model.busy}"><div class="cl-question"><span class="cl-kicker">${intro ? "PRIMERO EXPLORAMOS" : exercise.mode === "fill" ? "01 · LLENAR" : exercise.mode === "sum" ? "02 · JUNTAR" : "03 · COMPARAR"}</span><h2 id="cl-question" tabindex="-1">${escapeHtml(prompt)}</h2><p>${escapeHtml(instruction)}</p></div>${top}<div class="cl-stage ${model.busy ? 'cl-pouring' : ''}">${scene}</div><div class="cl-actions">${actions}</div></article></div><footer class="cl-footer"><p role="status" aria-live="polite">${escapeHtml(feedback)}</p>${intro ? clButton("cl-begin", "¡A jugar! →", "", model.busy, "cl-primary") : state.checked ? clButton("cl-next", session.index + 1 === session.exercises.length ? "Ver resultado →" : "Siguiente →", "", model.busy, "cl-primary") : clButton("cl-check", `Comprobar ${icon("check")}`, "", !clCanCheck(exercise, state), "cl-primary")}</footer></section>`);
}

function clAnimateTransfer(model, { before, after, source, capacity, sourceAfter = 0 }) {
  const root = document.querySelector(".cl-runner");
  const finish = () => {
    if (capacityAnimationState !== model) return;
    model.busy = false; model.sourceUnits = sourceAfter;
    capacityAnimationState = null; capacityTimeline = null;
    if (clCurrent()) render();
  };
  capacityAnimationState = model;
  if (!root || !window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
  const sourceWater = root.querySelector(".cl-source-water"), targetWater = root.querySelector(".cl-target-water");
  const surface = root.querySelector(".cl-target-surface"), caption = root.querySelector(".cl-target-caption");
  const sourceGroup = root.querySelector(".cl-source"), splash = root.querySelector(".cl-splash");
  const surfaceY = units => 40 + (256 - units / capacity * 200) / 270 * 218;
  const tl = window.gsap.timeline({ onComplete: finish }); capacityTimeline = tl;
  // All source loss equals target gain, including the remaining water when the
  // receiving vessel holds less than one litre. Timings leave time to observe.
  tl.set(sourceWater, { attr: { y: 212 - source * 50, height: source * 50 } })
    .set(targetWater, { attr: { y: 212 - before / capacity * 200, height: before / capacity * 200 } })
    .set(surface, { attr: { cy: 212 - before / capacity * 200, opacity: before ? 1 : 0 } })
    .set(caption, { textContent: clLabel(before) })
    .to(sourceGroup, { rotation: 53, svgOrigin: "273 88", duration: .8, ease: "power2.inOut" })
    .set(root.querySelectorAll(".cl-stream, .cl-stream-shine"), { attr: { d: `M273 88Q385 75 454 ${surfaceY(before)}` } }, "flow")
    .to(root.querySelectorAll(".cl-stream, .cl-stream-shine"), { opacity: 1, duration: .22 }, "flow")
    .to(root.querySelectorAll(".cl-stream, .cl-stream-shine"), { attr: { d: `M273 88Q385 75 454 ${surfaceY(after)}` }, duration: 2.1, ease: "none" }, "flow")
    .to(sourceWater, { attr: { y: 212 - sourceAfter * 50, height: sourceAfter * 50 }, duration: 2.1, ease: "none" }, "flow")
    .to(root.querySelector(".cl-source-surface"), { attr: { cy: 212 - sourceAfter * 50, opacity: sourceAfter ? 1 : 0 }, duration: 2.1, ease: "none" }, "flow")
    .to(targetWater, { attr: { y: 212 - after / capacity * 200, height: after / capacity * 200 }, duration: 2.1, ease: "none" }, "flow")
    .to(surface, { attr: { cy: 212 - after / capacity * 200, opacity: 1 }, duration: 2.1, ease: "none" }, "flow")
    .set(caption, { textContent: "El agua está pasando…" }, "flow")
    .set(splash, { opacity: 1, y: surfaceY(before) - 160 }, "flow")
    .to(splash, { y: surfaceY(after) - 160, duration: 2.1, ease: "none" }, "flow")
    .fromTo(splash.children, { x: 0, y: 0, opacity: .8 }, { x: i => (i - 4) * 8, y: i => -18 - (i % 3) * 13, opacity: 0, duration: .65, stagger: .08, repeat: 1, ease: "power1.out" }, "flow")
    .to(root.querySelectorAll(".cl-stream, .cl-stream-shine"), { opacity: 0, duration: .25 }, "flow+=2.1")
    .to(sourceGroup, { rotation: 0, duration: .7, ease: "power2.inOut" }, "flow+=2.25")
    .set(caption, { textContent: clLabel(after) })
    .to(surface, { scaleX: .92, transformOrigin: "center", duration: .15, yoyo: true, repeat: 3 }, "<")
    .to(root.querySelector(".cl-companion > svg"), { y: -12, rotation: -10, duration: .22, yoyo: true, repeat: 1 }, "<");
}

function capacityAction(action, target) {
  const current = clCurrent(); if (!current) return;
  const { exercise, state, lesson } = current;
  if (action === "cl-exit") { stopCapacityAnimation(); return setRoute({ view: "subject", subjectId: "tecnologia" }); }
  const model = lesson.active ? lesson : state;
  if (model.busy) return;
  if (action === "cl-help") { lesson.active = true; lesson.parts = []; lesson.sourceUnits = lesson.unit; render(); return; }
  if (lesson.active) {
    if (action === "cl-begin") { lesson.active = false; render(); return; }
    if (action === "cl-lesson-unit" || action === "cl-lesson-reset") {
      const unit = action === "cl-lesson-unit" ? Number(target.dataset.units) : lesson.unit;
      if (![1, 2].includes(unit)) return;
      lesson.unit = unit; lesson.parts = []; lesson.sourceUnits = unit; render(); return;
    }
    if (action !== "cl-demo" || clTotal(lesson.parts) >= 4) return;
    const before = clTotal(lesson.parts); lesson.parts.push(lesson.unit); lesson.sourceUnits = lesson.unit; lesson.busy = true;
    render(); clAnimateTransfer(lesson, { before, after: clTotal(lesson.parts), source: lesson.unit, capacity: 4 }); return;
  }
  if (action === "cl-next") {
    if (!state.checked) return;
    stopCapacityAnimation(); session.index++; render();
    document.querySelector("#cl-question, #cl-finish-title")?.focus({ preventScroll: true }); return;
  }
  if (state.checked) return;
  if (action === "cl-choice") {
    const value = target.dataset.value;
    const choices = exercise.mode === "sum" ? exercise.options.map(String) : exercise.mode === "compare" ? ["less", "equal", "more"] : [];
    if (!choices.includes(value)) return;
    state.choice = value;
  } else if (action === "cl-undo") {
    if (exercise.mode !== "fill" || !state.parts.length) return;
    state.parts.pop(); state.message = "Deshicimos el último paso. Podés probar otra combinación."; state.sourceUnits = exercise.allowed[0];
  } else if (action === "cl-pour" || action === "cl-collect" || action === "cl-measure") {
    let before, after, source, capacity, sourceAfter = 0;
    if (action === "cl-pour") {
      source = Number(target.dataset.units);
      if (exercise.mode !== "fill" || !exercise.allowed.includes(source)) return;
      before = clTotal([...exercise.initial, ...state.parts]); capacity = 4;
      if (before + source > 4) { state.message = "No entra toda esa cantidad. Deshacé un paso o probá una cantidad más pequeña."; render(); return; }
      state.parts.push(source); after = before + source; state.message = `${clLabel(before)} + ${clLabel(source)} = ${clLabel(after)}.`;
    } else if (action === "cl-collect") {
      if (exercise.mode !== "sum" || state.poured >= exercise.bottles.length) return;
      source = exercise.bottles[state.poured]; before = clTotal(exercise.bottles.slice(0, state.poured));
      state.poured++; after = before + source; capacity = 24; state.supported = true;
    } else {
      if (exercise.mode !== "compare" || state.measured) return;
      before = 0; source = 4; capacity = exercise.object.units; after = Math.min(4, capacity); sourceAfter = 4 - after;
      state.measured = true; state.supported = true;
    }
    state.sourceUnits = source; state.busy = true; render();
    clAnimateTransfer(state, { before, after, source, capacity, sourceAfter }); return;
  } else if (action === "cl-check") {
    if (!clCanCheck(exercise, state)) return;
    state.isCorrect = exercise.mode === "fill" ? clTotal([...exercise.initial, ...state.parts]) === 4
      : exercise.mode === "sum" ? Number(state.choice) === exercise.target : state.choice === exercise.correct;
    state.checked = true;
    session.score += state.isCorrect ? 1 : 0;
    session.answers.push({ prompt: exercise.prompt, support: session.themeTitle,
      selected: exercise.mode === "fill" ? clLabel(clTotal([...exercise.initial, ...state.parts])) : exercise.mode === "sum" ? clLabel(Number(state.choice)) : state.choice,
      correct: exercise.mode === "compare" ? exercise.correct : clLabel(exercise.target), isCorrect: state.isCorrect, visualSupport: state.supported });
  } else return;
  render();
}
function renderCapacityFinish() {
  stopCapacityAnimation();
  renderShell(`<section class="cl-runner cl-finish"><span class="cl-kicker">EL LABORATORIO DEL AGUA</span><div class="cl-finish-friends">${pacmanVerbGhost("#91dcd5")}${pacmanVerbSprite()}${pacmanVerbGhost("#a8cafa")}</div><h2 id="cl-finish-title" tabindex="-1">¡Terminaste, ${escapeHtml(data.settings.studentName || "Ian")}!</h2><p>${escapeHtml(session.themeTitle)}</p><div class="cl-stars">${session.answers.map(answer => `<span aria-label="${answer.isCorrect ? 'Correcto' : 'Para repasar'}">${answer.isCorrect ? '★' : '○'}</span>`).join("")}</div><strong>${session.score} de ${session.exercises.length} respuestas correctas</strong><div class="cl-finish-equivalence">1 litro = 2 medios = 4 cuartos</div><p>¡El agua se junta aunque cambie de recipiente!</p><div class="cl-finish-actions">${clButton("start", "Jugar otra vez ↻", `data-mode="activity" data-subject="tecnologia" data-theme="${session.themeId}"`, false, "cl-primary")}${clButton("cancel-run", "Volver a Tecnología", "", false, "cl-back")}</div></section>`);
}
