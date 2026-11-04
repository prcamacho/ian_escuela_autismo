// One new Pac-Man mission per school subject. Answers are editable until a
// single commit; no partial correctness or disappearing distractors.
const SCHOOL_ARCADE_THEMES = [
  { subject: "lengua", arcadeMode: "sentence", title: "Mensajes del laberinto", description: "Encontrá quién hace la acción y qué hace en cada oración." },
  { subject: "cs-naturales", arcadeMode: "materials", title: "El depósito de Pac-Man", description: "Organizá tres objetos según su material. Puede haber materiales repetidos." },
  { subject: "cs-sociales", arcadeMode: "sounds", title: "La ruta de los sonidos", description: "Armá un recorrido siguiendo una secuencia de sonidos escritos." },
  { subject: "matematicas", arcadeMode: "multiply", title: "Energía para el laberinto", description: "Contá grupos iguales y escribí cuántos puntos hay en total." },
  { subject: "ingles", arcadeMode: "english", title: "La mochila de Pac-Man", description: "Combiná cantidad, color y útil escolar leyendo tres pistas en inglés." },
  { subject: "tecnologia", arcadeMode: "measure", title: "El puente a medida", description: "Leé la regla y construí un puente del largo justo." }
].map((theme) => ({ ...theme, id: `arcade-${theme.arcadeMode}`, activityLabel: "NUEVO · 5 desafíos", randomExerciseCount: 5, exercises: [{ id: `arcade-${theme.arcadeMode}`, type: "school-arcade" }] }));

const SA_SENTENCES = [
  ["La nena", "guarda", "los juguetes"], ["El perro", "busca", "la pelota"],
  ["La maestra", "escribe", "una palabra"], ["El nene", "riega", "las plantas"],
  ["La abuela", "prepara", "la sopa"], ["El gato", "mira", "la ventana"],
  ["La cocinera", "lava", "las verduras"], ["El abuelo", "lee", "un cuento"],
  ["La niña", "dibuja", "una casa"], ["El jardinero", "junta", "las hojas"]
];
const SA_MATERIALS = { plastic: "Plástico", wood: "Madera", metal: "Metal" };
const SA_SOUNDS = [
  { id: "phone", name: "Teléfono", sound: "Rin rin", emoji: "☎️" },
  { id: "clock", name: "Reloj", sound: "Tic tac", emoji: "⏰" },
  { id: "train", name: "Tren", sound: "Chuuu chuuuu", emoji: "🚂" },
  { id: "drum", name: "Tambor", sound: "Pom pom", emoji: "🥁" },
  { id: "door", name: "Puerta", sound: "Toc toc", emoji: "🚪" },
  { id: "bell", name: "Timbre", sound: "Ding dong", emoji: "🔔" }
];
const SA_COLORS = [
  ["red", "rojo", "#e74450"], ["blue", "azul", "#2865c7"], ["yellow", "amarillo", "#ffce35"],
  ["green", "verde", "#259368"], ["orange", "naranja", "#ed8525"], ["purple", "violeta", "#8653bb"]
];
const SA_SUPPLIES = [
  ["pencil", "lápiz", "assets/pictos/lapiz.png"], ["book", "libro", "assets/english/book.png"],
  ["ruler", "regla", "assets/english/ruler.png"], ["eraser", "goma", "assets/english/eraser.png"]
];
const SA_NUMBERS = ["one", "two", "three", "four", "five", "six"];

function withSchoolArcadeThemes(subjectId, themes) {
  const additions = SCHOOL_ARCADE_THEMES.filter((theme) => theme.subject === subjectId);
  return [...additions, ...themes.filter((theme) => !additions.some((addition) => addition.id === theme?.id))];
}

// A shuffled bag crosses session boundaries so replaying does not simply
// present the same five answers again. Storage is optional (offline/private mode).
function saTake(pool, mode, count = 5) {
  const key = `ian-school-arcade-v1-${mode}`;
  let remaining = [];
  try { remaining = JSON.parse(localStorage.getItem(key) || "[]"); } catch { /* fresh bag */ }
  remaining = Array.isArray(remaining) ? [...new Set(remaining.filter((i) => Number.isInteger(i) && i >= 0 && i < pool.length))] : [];
  const selected = [];
  while (selected.length < Math.min(count, pool.length)) {
    if (!remaining.length) remaining = shuffled(pool.map((_, i) => i).filter((i) => !selected.includes(i)));
    const next = remaining.shift();
    if (!selected.includes(next)) selected.push(next);
  }
  try { localStorage.setItem(key, JSON.stringify(remaining)); } catch { /* session still works */ }
  return selected.map((i) => clone(pool[i]));
}

function createSchoolArcadeExercises(theme) {
  const mode = theme.arcadeMode;
  let rounds;
  if (mode === "sentence") {
    rounds = saTake(SA_SENTENCES, mode).map(([who, verb, object]) => {
      const predicate = `${verb} ${object}`;
      return { prompt: "Separá quién hace la acción y qué hace.", sentence: `${who} ${predicate}.`,
        options: shuffled([who, verb, object, predicate, `${who} ${verb}`, who.split(" ").slice(1).join(" ")]),
        fields: ["¿Quién?", "¿Qué hace?"], correct: [who, predicate],
        explanation: `«${who}» es el sujeto. «${predicate}» es el predicado completo: incluye la acción y lo que la acompaña.` };
    });
  } else if (mode === "materials") {
    const sets = [["bottle", "duck", "key"], ["chair", "spoon", "boat"], ["comb", "hanger", "chair"], ["key", "spoon", "bag"], ["boat", "bottle", "chair"], ["duck", "comb", "key"], ["spoon", "chair", "hanger"], ["bag", "boat", "bottle"], ["hanger", "key", "spoon"], ["chair", "duck", "boat"]];
    rounds = saTake(sets, mode).map((items) => {
      const objects = shuffled(items);
      return { prompt: "Elegí el material de cada objeto.", objects, options: shuffled(Object.keys(SA_MATERIALS)),
        fields: objects.map((id) => PLASTIC_OBJECTS[id].label), correct: objects.map((id) => PLASTIC_OBJECTS[id].material),
        explanation: objects.map((id) => `${PLASTIC_OBJECTS[id].label}: ${SA_MATERIALS[PLASTIC_OBJECTS[id].material].toLowerCase()}`).join(" · ") + "." };
    });
  } else if (mode === "sounds") {
    const paths = [[0, 1, 0], [2, 3, 4], [5, 4, 5], [1, 2, 3], [4, 0, 4], [3, 5, 2], [2, 1, 2], [0, 5, 3], [1, 4, 1], [3, 0, 5]];
    rounds = saTake(paths, mode).map((indices) => ({ prompt: "Seguí los sonidos. Armá la ruta en ese orden.",
      clues: indices.map((i) => SA_SOUNDS[i].sound), correct: indices.map((i) => SA_SOUNDS[i].id),
      options: shuffled(SA_SOUNDS.map((s) => s.id)), explanation: indices.map((i) => `${SA_SOUNDS[i].sound}: ${SA_SOUNDS[i].name.toLowerCase()}`).join(" → ") + "." }));
  } else if (mode === "multiply") {
    const pool = [2, 3, 4, 5].flatMap((groups) => [2, 3, 4, 5].map((each) => ({ groups, each })));
    rounds = saTake(pool, mode).map(({ groups, each }) => ({ prompt: "¿Cuántos puntos hay en total?", groups, each, correct: String(groups * each),
      explanation: `${groups} grupos de ${each}: ${Array(groups).fill(each).join(" + ")} = ${groups * each}. ${groups} × ${each} = ${groups * each}.` }));
  } else if (mode === "english") {
    const pool = SA_NUMBERS.flatMap((word, i) => SA_COLORS.map((color, c) => ({ number: i + 1, word, color: color[0], supply: SA_SUPPLIES[(i + c) % SA_SUPPLIES.length][0] })));
    rounds = saTake(pool, mode).map((item) => ({ ...item, prompt: "Leé las tres pistas y prepará el pedido.",
      colors: shuffled(SA_COLORS.map((c) => c[0])), supplies: shuffled(SA_SUPPLIES.map((s) => s[0])),
      fields: ["Cantidad", "Color", "Útil"], correct: [String(item.number), item.color, item.supply],
      explanation: `${item.word} = ${item.number} · ${item.color} = ${SA_COLORS.find((c) => c[0] === item.color)[1]} · ${item.supply} = ${SA_SUPPLIES.find((s) => s[0] === item.supply)[1]}.` }));
  } else if (mode === "measure") {
    const pool = [1, 2, 3, 4].flatMap((start) => [3, 4, 5, 6].filter((length) => start + length <= 10).map((length) => ({ start, length })));
    rounds = saTake(pool, mode).map(({ start, length }) => ({ prompt: "¿Cuántos centímetros debe medir el puente?", start, length, correct: String(length),
      explanation: `Va de ${start} a ${start + length}. Contamos los espacios: ${start + length} − ${start} = ${length} cm. La marca final no es el largo.` }));
  } else return [];
  return rounds.map((round, index) => ({ ...round, mode, id: `${theme.id}-${index}`, type: "school-arcade" }));
}

function saCurrent() {
  const exercise = session?.exercises?.[session.index];
  if (route.view !== "run" || exercise?.type !== "school-arcade") return null;
  return { exercise, state: session.schoolArcade[exercise.id] };
}
function saButton(value, label, selected, disabled, field = 0, art = "") {
  return `<button type="button" class="sa-option ${selected ? "is-selected" : ""}" data-action="sa-pick" data-field="${field}" data-value="${escapeHtml(String(value))}" aria-pressed="${selected}" ${disabled ? "disabled" : ""}>${art}<span>${escapeHtml(label)}</span></button>`;
}
function saWorld(exercise, state) {
  return `<aside class="sa-world ${state.checked && state.isCorrect ? "sa-won" : ""}" data-round="${exercise.id}" data-phase="${state.checked}" aria-label="${state.checked && state.isCorrect ? "Pac-Man festeja tu respuesta" : "El recorrido de Pac-Man"}">
    <div class="sa-world-label">MISIÓN ${String(session.index + 1).padStart(2, "0")}<span>● ● ●</span></div>
    <svg class="sa-maze" viewBox="0 0 320 235" aria-hidden="true">
      <path class="sa-maze-wall" d="M8 130H92V36H259V134H312V186H207V88H144V186H8ZM18 40H65V105H18M171 118H182V207M280 40H302V105H280M18 212H144M218 212H302"/>
      <g fill="#f5df99">${[[60, 160], [96, 160], [118, 133], [118, 99], [144, 62], [177, 62], [207, 62], [233, 91], [233, 125], [257, 160]].map(([x, y], i) => `<circle class="sa-dot sa-dot-${i}" cx="${x}" cy="${y}" r="3.5"/>`).join("")}</g>
      <g class="sa-ghost" transform="translate(52 61)"><path d="M-13 13V0a13 13 0 0126 0v13l-6-4-7 4-7-4z" fill="#71d8d0"/><ellipse cx="-5" cy="0" rx="4" ry="5" fill="white"/><ellipse cx="5" cy="0" rx="4" ry="5" fill="white"/><circle cx="-3" cy="0" r="2" fill="#173154"/><circle cx="7" cy="0" r="2" fill="#173154"/></g>
      <g class="sa-cherry" transform="translate(282 159)"><path d="M-6 0Q-6-18 7-23Q3-10 7 0" fill="none" stroke="#8ce2ae" stroke-width="3"/><circle cx="-7" cy="3" r="8" fill="#ff647e"/><circle cx="8" cy="5" r="8" fill="#f64168"/><circle cx="-9" cy="1" r="2" fill="#ffbbc8"/></g>
      <g class="sa-player"><g class="sa-face"><path class="sa-jaw-top" d="M0 0L14-14A20 20 0 00-20 0Z" fill="#ffdc48"/><path class="sa-jaw-bottom" d="M0 0L14 14A20 20 0 01-20 0Z" fill="#ffdc48"/><circle cx="-2" cy="-10" r="2.4" fill="#172c45"/></g></g>
      <g class="sa-spark" transform="translate(282 159)" fill="#ffe477"><path d="M0-31L4-11 0-5-4-11ZM31 0L11 4 5 0 11-4ZM0 31L-4 11 0 5 4 11ZM-31 0L-11-4-5 0-11 4Z"/></g>
    </svg><div class="sa-world-caption">${state.checked ? state.isCorrect ? "¡Excelente, Ian!" : "Cada desafío nos enseña." : "Pensá. Prepará. Comprobá."}</div>
    <div class="sa-stops" aria-label="${session.index + (state.checked ? 1 : 0)} de ${session.exercises.length} desafíos completos">${session.exercises.map((_, i) => `<span class="${i < session.index || i === session.index && state.checked ? "is-done" : i === session.index ? "is-current" : ""}">${i + 1}</span>`).join("")}</div>
  </aside>`;
}
function saNumberPad(exercise, state) {
  return `<div class="sa-number-entry"><div class="sa-answer-display"><span>Tu respuesta</span><output aria-live="polite">${state.number || "—"}</output>${exercise.mode === "measure" ? "<b>cm</b>" : "<b>puntos</b>"}</div><div class="sa-keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "erase"].map((key) => `<button type="button" data-action="sa-digit" data-value="${key}" aria-label="${key === "clear" ? "Borrar todo" : key === "erase" ? "Borrar último número" : key}" ${state.checked ? "disabled" : ""}>${key === "clear" ? "C" : key === "erase" ? "⌫" : key}</button>`).join("")}</div></div>`;
}
function saMeasureArt(exercise, state) {
  const x = 30 + exercise.start * 28;
  const end = x + exercise.length * 28;
  return `<svg class="sa-ruler ${state.checked && state.isCorrect ? "is-built" : ""}" viewBox="0 0 340 224" role="img" aria-label="Regla en centímetros. El puente va de la marca ${exercise.start} a la marca ${exercise.start + exercise.length}.">
    <path d="M12 110H328V191H12Z" fill="#daf1f2"/><path d="M12 155Q40 139 70 155T130 155T190 155T250 155T328 155M12 177Q40 161 70 177T130 177T190 177T250 177T328 177" stroke="#9cd8e1" stroke-width="3" fill="none"/>
    <path d="M12 72H${x}V140H12ZM${end} 72H328V140H${end}Z" fill="#456984"/><path d="M12 72H${x}M${end} 72H328" stroke="#8accb4" stroke-width="8"/>
    <path d="M${x} 51V166M${end} 51V166" stroke="#c64a6d" stroke-width="2" stroke-dasharray="4 4"/>
    <path class="sa-bridge" d="M${x} 79H${end}" stroke="#e3a458" stroke-width="12"/><path d="M${x} 54H${end}" stroke="#c64a6d" stroke-width="2"/>
    <rect x="22" y="166" width="296" height="47" rx="5" fill="#fff5cd" stroke="#d4b65e"/>
    ${Array.from({ length: 11 }, (_, n) => `<path d="M${30 + n * 28} 166v${n % 5 === 0 ? 18 : 12}" stroke="#374961" stroke-width="2"/><text x="${30 + n * 28}" y="202" text-anchor="middle" fill="#253b55" font-size="13" font-weight="700">${n}</text>`).join("")}
    <text x="170" y="30" text-anchor="middle" fill="#324964" font-size="16" font-weight="700">El espacio entre las dos orillas</text>
  </svg>`;
}
function saTask(exercise, state) {
  const disabled = state.checked;
  if (exercise.mode === "sentence") return `<p class="sa-sentence">${escapeHtml(exercise.sentence)}</p><div class="sa-field-tabs">${exercise.fields.map((field, i) => `<button type="button" data-action="sa-field" data-field="${i}" class="${state.activeField === i ? "is-active" : ""}" aria-pressed="${state.activeField === i}" ${disabled ? "disabled" : ""}><small>${field}</small><strong>${escapeHtml(state.values[i] || "Tocá y elegí")}</strong></button>`).join("")}</div><p class="sa-hint">Elegí una respuesta para cada casillero.</p><div class="sa-options sa-words">${exercise.options.map((word) => saButton(word, word, state.values[state.activeField] === word, disabled, state.activeField)).join("")}</div>`;
  if (exercise.mode === "materials") return `<p class="sa-hint">Un material se puede usar más de una vez.</p><div class="sa-material-cards">${exercise.objects.map((id, i) => `<div class="sa-material-card"><div class="sa-object-art">${renderPlasticObjectSvg(id)}</div><strong>${escapeHtml(PLASTIC_OBJECTS[id].label)}</strong><div class="sa-material-choices" role="group" aria-label="Material de ${escapeHtml(PLASTIC_OBJECTS[id].label)}">${exercise.options.map((material) => saButton(material, SA_MATERIALS[material], state.values[i] === material, disabled, i)).join("")}</div></div>`).join("")}</div>`;
  if (exercise.mode === "sounds") return `<div class="sa-sound-clues">${exercise.clues.map((clue, i) => `<span><small>${i + 1}</small>${escapeHtml(clue)}</span>`).join('<b aria-hidden="true">→</b>')}</div><div class="sa-route-slots">${Array.from({ length: 3 }, (_, i) => {
    const item = SA_SOUNDS.find((s) => s.id === state.path[i]);
    return `<button type="button" data-action="sa-remove" data-index="${i}" ${disabled || !item ? "disabled" : ""} aria-label="${item ? `Quitar ${item.name} del paso ${i + 1}` : `Paso ${i + 1} vacío`}"><small>${i + 1}</small>${item ? `<span aria-hidden="true">${item.emoji}</span><b>${item.name}</b>` : '<span class="sa-empty">+</span>'}</button>`;
  }).join("")}</div><p class="sa-hint">Tocá en orden. Podés repetir un objeto o quitarlo del recorrido.</p><div class="sa-options sa-sound-options">${exercise.options.map((id) => { const item = SA_SOUNDS.find((s) => s.id === id); return saButton(id, item.name, false, disabled || state.path.length === 3, 0, `<span class="sa-object-emoji" aria-hidden="true">${item.emoji}</span>`); }).join("")}</div>`;
  if (exercise.mode === "multiply") return `<div class="sa-numeric-layout"><div class="sa-energy"><div class="sa-equation">${exercise.groups} <span>×</span> ${exercise.each} <span>=</span> ?</div><div class="sa-energy-groups" aria-label="${exercise.groups} grupos con ${exercise.each} puntos en cada uno">${Array.from({ length: exercise.groups }, (_, i) => `<div class="sa-energy-group"><small>Grupo ${i + 1}</small><div>${Array.from({ length: exercise.each }, () => '<i></i>').join("")}</div></div>`).join("")}</div></div>${saNumberPad(exercise, state)}</div>`;
  if (exercise.mode === "english") return `<div class="sa-english-clues" lang="en"><strong>${exercise.word}</strong><i>·</i><strong>${exercise.color}</strong><i>·</i><strong>${exercise.supply}</strong></div><div class="sa-english-fields"><fieldset><legend>Cantidad</legend><div class="sa-options sa-count-options">${SA_NUMBERS.map((_, i) => saButton(String(i + 1), String(i + 1), state.values[0] === String(i + 1), disabled)).join("")}</div></fieldset><fieldset><legend>Color</legend><div class="sa-options sa-color-options">${exercise.colors.map((id) => { const color = SA_COLORS.find((c) => c[0] === id); return saButton(id, color[1], state.values[1] === id, disabled, 1, `<i class="sa-swatch" style="background:${color[2]}"></i>`); }).join("")}</div></fieldset><fieldset><legend>Útil</legend><div class="sa-options sa-supply-options">${exercise.supplies.map((id) => { const supply = SA_SUPPLIES.find((s) => s[0] === id); return saButton(id, supply[1], state.values[2] === id, disabled, 2, `<img src="${supply[2]}" alt=""/>`); }).join("")}</div></fieldset></div>`;
  return `<div class="sa-numeric-layout"><div>${saMeasureArt(exercise, state)}<p class="sa-hint">Cada espacio entre dos marcas mide 1 cm.</p></div>${saNumberPad(exercise, state)}</div>`;
}
function saCanCheck(exercise, state) {
  if (state.checked) return false;
  if (["multiply", "measure"].includes(exercise.mode)) return /^\d{1,2}$/.test(state.number);
  if (exercise.mode === "sounds") return state.path.length === 3;
  return exercise.fields.every((_, i) => typeof state.values[i] === "string" && state.values[i].length > 0);
}
function renderSchoolArcadeRunner(exercise) {
  const state = session.schoolArcade[exercise.id];
  const oldWorld = document.querySelector(".sa-world");
  const feedback = state.checked ? `${state.isCorrect ? "¡Muy bien! Lo resolviste." : "Vamos a aprender de esta respuesta."} ${exercise.explanation}` : "Prepará toda tu respuesta. Después tocá Comprobar.";
  renderShell(`<section class="sa-runner"><header class="sa-topbar"><button class="sa-back" type="button" data-action="cancel-run">${icon("arrow")}${escapeHtml(session.subjectTitle)}</button><div><span>PAC-MAN · ESCUELA</span><strong>${escapeHtml(session.themeTitle)}</strong></div><b>${session.index + 1} / ${session.exercises.length}</b></header><div class="sa-layout">${saWorld(exercise, state)}<article class="sa-board ${state.checked ? state.isCorrect ? "sa-correct" : "sa-review" : ""}"><span class="sa-eyebrow">${escapeHtml(session.subjectTitle)} · A TU RITMO</span><h2 id="sa-question" tabindex="-1">${exercise.prompt}</h2>${saTask(exercise, state)}<footer class="sa-controls"><p class="sa-feedback" role="status" aria-live="polite">${escapeHtml(feedback)}</p>${state.checked ? `<button type="button" class="sa-primary" data-action="sa-next">${session.index + 1 === session.exercises.length ? "Ver mi recorrido" : "Siguiente"} →</button>` : `<button type="button" class="sa-primary" data-action="sa-check" ${saCanCheck(exercise, state) ? "" : "disabled"}>Comprobar ${icon("check")}</button>`}</footer></article></div></section>`);
  // Keep ambient animation from restarting on every answer edit.
  if (oldWorld?.dataset.round === exercise.id && oldWorld.dataset.phase === String(state.checked)) document.querySelector(".sa-world")?.replaceWith(oldWorld);
}
function schoolArcadeAction(action, target) {
  const current = saCurrent();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "sa-next") {
    if (!state.checked) return;
    session.index += 1;
    render();
    document.querySelector("#sa-question, #sa-finish-title")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }
  if (state.checked) return;
  if (action === "sa-check") {
    if (!saCanCheck(exercise, state)) return;
    const selected = ["multiply", "measure"].includes(exercise.mode) ? state.number : exercise.mode === "sounds" ? state.path : exercise.fields.map((_, i) => state.values[i]);
    state.isCorrect = JSON.stringify(selected) === JSON.stringify(exercise.correct);
    state.checked = true;
    if (state.isCorrect) session.score += 1;
    session.answers.push({ prompt: exercise.prompt, support: session.themeTitle, selected: clone(selected), correct: clone(exercise.correct), isCorrect: state.isCorrect });
  } else if (action === "sa-field") {
    const field = Number(target.dataset.field);
    if (exercise.mode !== "sentence" || ![0, 1].includes(field)) return;
    state.activeField = field;
  } else if (action === "sa-pick") {
    const value = target.dataset.value;
    const field = Number(target.dataset.field);
    if (exercise.mode === "sounds") {
      if (!exercise.options.includes(value) || state.path.length >= 3) return;
      state.path.push(value);
    } else {
      if (!Number.isInteger(field) || field < 0 || field >= (exercise.fields?.length || 0)) return;
      const allowed = exercise.mode === "english" ? [SA_NUMBERS.map((_, i) => String(i + 1)), exercise.colors, exercise.supplies][field] : exercise.options;
      if (!allowed?.includes(value)) return;
      state.values[field] = value;
    }
  } else if (action === "sa-remove") {
    const index = Number(target.dataset.index);
    if (exercise.mode !== "sounds" || !Number.isInteger(index) || index < 0 || index >= state.path.length) return;
    state.path.splice(index, 1);
  } else if (action === "sa-digit") {
    if (!["multiply", "measure"].includes(exercise.mode)) return;
    const value = target.dataset.value;
    if (value === "clear") state.number = "";
    else if (value === "erase") state.number = state.number.slice(0, -1);
    else if (/^\d$/.test(value)) state.number = state.number === "0" ? value : (state.number + value).slice(0, 2);
    else return;
  } else return;
  const y = window.scrollY;
  render();
  window.scrollTo({ top: y, behavior: "auto" });
  if (state.checked) document.querySelector('[data-action="sa-next"]')?.focus({ preventScroll: true });
}
function renderSchoolArcadeFinish() {
  const total = session.exercises.length;
  renderShell(`<section class="sa-runner sa-finish"><span class="sa-eyebrow">PAC-MAN · ${escapeHtml(session.subjectTitle)}</span><div class="sa-finish-friends" aria-hidden="true">${pacmanVerbGhost("#71d8d0")}${pacmanVerbSprite()}${pacmanVerbGhost("#ff91ad")}</div><h2 id="sa-finish-title" tabindex="-1">${session.score === total ? "¡Excelente recorrido, Ian!" : "¡Recorrido completo, Ian!"}</h2><p>Resolviste ${session.score} de ${total} desafíos al comprobar.</p><div class="sa-earned" aria-label="Resultados del recorrido">${session.answers.map((answer, i) => `<span aria-label="Desafío ${i + 1}: ${answer.isCorrect ? "correcto" : "para repasar"}">${answer.isCorrect ? "★" : "○"}</span>`).join("")}</div><p>${session.score === total ? "¡Pensaste, resolviste y ayudaste a Pac-Man!" : "Podés seguir practicando con nuevos desafíos."}</p><div class="sa-finish-actions"><button class="sa-primary" type="button" data-action="start" data-subject="${escapeHtml(session.subjectId)}" data-theme="${escapeHtml(session.themeId)}" data-mode="activity">Otra partida ↻</button><button class="sa-back" type="button" data-action="cancel-run">Volver a ${escapeHtml(session.subjectTitle)}</button></div></section>`);
}
