// A new, independent activity for each subject. Selections never reveal answers;
// each complete response is checked once and navigation remains manual.
const PACMAN_WORLD_THEMES = [
  { subject: "lengua", worldMode: "opposites", title: "El portal de los opuestos", description: "Buscá palabras que significan lo contrario y abrí el portal de Pac-Man.", accent: "#f4b7a1", badge: "PALABRAS" },
  { subject: "cs-naturales", worldMode: "habitats", title: "Expedición animal", description: "Acompañá a los animales hasta el ambiente donde viven.", accent: "#9bd7bd", badge: "NATURALEZA" },
  { subject: "cs-sociales", worldMode: "jobs", title: "Los amigos del barrio", description: "Descubrí quién realiza cada trabajo para ayudar a la comunidad.", accent: "#a9c9f4", badge: "COMUNIDAD" },
  { subject: "matematicas", worldMode: "patterns", title: "El tren de los números", description: "Descubrí cómo cambia cada serie y completá el vagón que falta.", accent: "#ffd772", badge: "NÚMEROS" },
  { subject: "ingles", worldMode: "actions", title: "Pac-Man in action", description: "Leé una acción en inglés y elegí la escena que la representa.", accent: "#c6b5ed", badge: "ENGLISH" },
  { subject: "tecnologia", worldMode: "making", title: "La fábrica de las cerezas", description: "Ordená tres pasos para transformar materiales en objetos.", accent: "#9fd8de", badge: "CREAR" }
].map(theme => ({ ...theme, id: `pacworld-${theme.worldMode}`, activityLabel: "NUEVO · Pac-Man · 5 desafíos", randomExerciseCount: 5,
  exercises: [{ id: `pacworld-${theme.worldMode}`, type: "pacman-world", prompt: theme.title }] }));

const PW_OPPOSITES = [
  ["abierta", "cerrada", "La puerta está abierta.", "grande", "limpia"],
  ["alto", "bajo", "El árbol es alto.", "verde", "fuerte"],
  ["lleno", "vacío", "El vaso está lleno.", "redondo", "nuevo"],
  ["día", "noche", "Pac-Man pasea de día.", "sol", "calle"],
  ["rápido", "lento", "El tren va rápido.", "lejos", "azul"],
  ["grande", "pequeño", "El castillo es grande.", "alto", "viejo"],
  ["frío", "caliente", "El té está frío.", "rico", "dulce"],
  ["limpio", "sucio", "El plato está limpio.", "blanco", "nuevo"],
  ["cerca", "lejos", "La cereza está cerca.", "roja", "arriba"],
  ["subir", "bajar", "Pac-Man quiere subir.", "mirar", "comer"],
  ["encendido", "apagado", "El farol está encendido.", "amarillo", "brillante"],
  ["entrar", "salir", "Pac-Man quiere entrar.", "jugar", "buscar"]
];
const PW_HABITATS = {
  sea: { label: "Mar", emoji: "🌊", sky: "#cfedf6", ground: "#70b8d1" },
  desert: { label: "Desierto", emoji: "🌵", sky: "#fff0ca", ground: "#e7bb79" },
  forest: { label: "Selva", emoji: "🌳", sky: "#d6efdf", ground: "#6ca787" },
  polar: { label: "Ambiente polar", emoji: "🧊", sky: "#dceefa", ground: "#b6d5e7" },
  pond: { label: "Laguna", emoji: "🌿", sky: "#e3f0dd", ground: "#8dc5bb" },
  savanna: { label: "Sabana", emoji: "🌾", sky: "#fff0d9", ground: "#cebb7d" }
};
const PW_ANIMALS = [
  ["delfín", "🐬", "sea"], ["ballena", "🐋", "sea"], ["camello", "🐪", "desert"],
  ["dromedario", "🐪", "desert"], ["mono de la selva", "🐒", "forest"],
  ["gorila", "🦍", "forest"], ["pingüino emperador", "🐧", "polar"],
  ["oso polar", "🐻‍❄️", "polar"], ["rana", "🐸", "pond"], ["pato de laguna", "🦆", "pond"],
  ["león", "🦁", "savanna"], ["jirafa", "🦒", "savanna"]
];
const PW_JOBS = {
  baker: ["Panadera", "🥖"], teacher: ["Maestro", "📚"], firefighter: ["Bombera", "🚒"],
  gardener: ["Jardinero", "🌱"], mail: ["Cartera", "✉️"], builder: ["Albañil", "🧱"],
  vet: ["Veterinaria", "🐾"], driver: ["Chofer de colectivo", "🚌"]
};
const PW_JOB_MISSIONS = [
  ["Amase y hornee pan para la panadería.", "baker"], ["Enseñe a leer a los chicos en la escuela.", "teacher"],
  ["Apague un incendio con su equipo y una manguera.", "firefighter"], ["Plante flores y cuide el jardín de la plaza.", "gardener"],
  ["Reparta las cartas del barrio.", "mail"], ["Construya una pared con ladrillos.", "builder"],
  ["Revise a un perro en la veterinaria.", "vet"], ["Conduzca el colectivo por su recorrido.", "driver"],
  ["Prepare los panes que compran los vecinos.", "baker"], ["Explique una actividad en el aula.", "teacher"],
  ["Cuide los árboles del jardín.", "gardener"], ["Lleve una carta hasta la casa de Pac-Man.", "mail"]
];
const PW_ACTIONS = {
  jump: ["Saltar", "jump"], sleep: ["Dormir", "sleep"], eat: ["Comer", "eat"],
  read: ["Leer", "read"], run: ["Correr", "run"], drink: ["Beber", "drink"]
};
const PW_MAKING = [
  ["Una mesa de madera", "🪵", ["Medir la madera", "Cortar las piezas", "Unir las piezas"]],
  ["Un dibujo pintado", "🎨", ["Preparar la hoja", "Dibujar con lápiz", "Pintar el dibujo"]],
  ["Un frasco decorado", "🫙", ["Lavar el frasco", "Secar el frasco", "Decorar el frasco"]],
  ["Una figura de arcilla", "🏺", ["Amasar la arcilla", "Dar forma a la figura", "Dejarla secar"]],
  ["Una casa de cartón", "🏠", ["Dibujar las piezas", "Recortar las piezas", "Pegarlas para armar la casa"]],
  ["Una remera con botones", "👕", ["Marcar dónde van los botones", "Coser los botones", "Probar que abrochen"]],
  ["Una caja envuelta", "🎁", ["Medir el papel", "Recortar el papel", "Envolver la caja"]],
  ["Un cartel para el aula", "🪧", ["Elegir el mensaje", "Escribirlo en el cartón", "Colgar el cartel"]],
  ["Un collar de cuentas", "📿", ["Cortar un hilo", "Pasar las cuentas", "Anudar los extremos"]],
  ["Una maceta pintada", "🪴", ["Limpiar la maceta", "Pintarla", "Esperar que seque"]]
];

function withPacmanWorldThemes(subjectId, themes) {
  const additions = PACMAN_WORLD_THEMES.filter(t => t.subject === subjectId);
  return [...additions, ...themes.filter(t => !additions.some(a => a.id === t?.id))];
}
function pwOptions(correct, pool, count = 4) {
  return shuffled([correct, ...shuffled(pool.filter(v => v !== correct)).slice(0, count - 1)]);
}
function createPacmanWorldExercises(theme) {
  const mode = theme.worldMode;
  let rounds = [];
  if (mode === "opposites") rounds = saTake(PW_OPPOSITES, `world-${mode}`).map(([word, correct, sentence, ...others]) => ({
    prompt: `¿Qué palabra significa lo contrario de «${word}»?`, word, sentence, correct,
    options: shuffled([correct, word, ...others]), explanation: `«${word}» y «${correct}» tienen significados opuestos.`
  }));
  if (mode === "habitats") rounds = saTake(PW_ANIMALS, `world-${mode}`).map(([animal, emoji, correct]) => ({
    prompt: `¿En qué ambiente vive este animal?`, animal, emoji, correct, options: pwOptions(correct, Object.keys(PW_HABITATS)),
    explanation: `El ${animal} vive en este ambiente: ${PW_HABITATS[correct].label.toLowerCase()}.`
  }));
  if (mode === "jobs") rounds = saTake(PW_JOB_MISSIONS, `world-${mode}`).map(([mission, correct]) => ({
    prompt: "¿A quién necesita Pac-Man?", mission, correct, options: pwOptions(correct, Object.keys(PW_JOBS)),
    explanation: `${PW_JOBS[correct][0]}: esta persona realiza el trabajo que necesita Pac-Man.`
  }));
  if (mode === "patterns") {
    const pool = [1, 2, 3, 5, 10].flatMap(step => [0, 1, 2, 3].map(start => ({ start: start * step, step })));
    rounds = saTake(pool, `world-${mode}`).map(({ start, step }) => {
      const series = Array.from({ length: 5 }, (_, i) => start + i * step);
      const missing = shuffled([2, 3, 4])[0], correct = String(series[missing]);
      return { prompt: "¿Qué número falta en el tren?", series, missing, step, correct,
        options: shuffled([correct, String(series[missing] + 1), String(series[missing] + step + 1), String(Math.max(0, series[missing] - 1))]),
        explanation: `La serie aumenta de ${step} en ${step}: ${series.join(" → ")}. Falta el ${correct}.` };
    });
  }
  if (mode === "actions") {
    rounds = saTake(Object.keys(PW_ACTIONS), `world-${mode}`).map(correct => ({
      prompt: "Leé la palabra y elegí qué hace Pac-Man.", word: correct, correct,
      options: pwOptions(correct, Object.keys(PW_ACTIONS), 3), explanation: `«${correct}» significa ${PW_ACTIONS[correct][0].toLowerCase()}.`
    }));
  }
  if (mode === "making") rounds = saTake(PW_MAKING, `world-${mode}`).map(([product, emoji, steps]) => {
    let tokens = shuffled(steps.map((_, i) => String(i)));
    if (tokens.join("") === "012") tokens = [tokens[1], tokens[2], tokens[0]];
    return { prompt: "Ordená los pasos: primero, después y al final.", product, emoji, steps, tokens,
      correct: ["0", "1", "2"], explanation: `${steps.map((step, i) => `${i + 1}. ${step}`).join(" → ")}.` };
  });
  return rounds.map((round, i) => ({ ...round, mode, id: `${theme.id}-${i}`, type: "pacman-world" }));
}

function pwPacman(extra = "") {
  return `<svg class="pw-pacman ${extra}" viewBox="0 0 100 100" aria-hidden="true"><g class="pw-mouth-top"><path d="M50 50 94 25A50 50 0 0 0 0 50Z" fill="#ffda48"/><circle cx="51" cy="19" r="5" fill="#152a45"/></g><path class="pw-mouth-bottom" d="M50 50 94 75A50 50 0 0 1 0 50Z" fill="#ffda48"/></svg>`;
}
function pwSideWorld(exercise, state) {
  const completed = session.index + (state.checked ? 1 : 0);
  const theme = PACMAN_WORLD_THEMES.find(t => t.worldMode === exercise.mode);
  return `<aside class="pw-world" data-round="${exercise.id}" data-phase="${state.checked}"><div class="pw-world-kicker"><span>UN MUNDO POR DESCUBRIR</span><b>0${PACMAN_WORLD_THEMES.indexOf(theme) + 1}</b></div><h2>${theme.badge}</h2><div class="pw-maze ${state.isCorrect ? "is-celebrating" : ""}" aria-hidden="true"><svg viewBox="0 0 280 270" class="pw-maze-lines"><g fill="none" stroke="#527bb3" stroke-width="4" stroke-linejoin="round"><path d="M20 98V22h93v28H49v48M166 22h94v76h-29V50h-65M20 175v73h93v-28H49v-45M166 220h65v-45h29v73h-94M91 99h98v73H91Z"/></g>${Array.from({length:9}, (_,i) => `<circle class="pw-dot" cx="${57+i*23}" cy="135" r="2.6" fill="#ffe49b" style="--pw-eat-delay:${.15+i*.23}s"/>`).join("")}</svg><div class="pw-maze-player">${pwPacman()}</div><div class="pw-maze-ghost">${pacmanVerbGhost("#a7d9dc")}</div><span class="pw-cherry">🍒</span><div class="pw-stars">✦ <span>✧</span> ✦</div></div><p class="pw-world-caption">${state.checked ? state.isCorrect ? "¡Un paso más en tu aventura!" : "Cada desafío nos enseña algo." : "Pensá, elegí y descubrí."}</p><div class="pw-progress" aria-label="${completed} de ${session.exercises.length} desafíos completados">${session.exercises.map((_, i) => `<span class="${i < completed ? "is-complete" : i === completed ? "is-current" : ""}">${i < completed ? "✓" : i + 1}</span>`).join("")}</div><p class="pw-pace">A tu ritmo · Sin reloj</p></aside>`;
}
function pwHabitatArt(id) {
  const info = PW_HABITATS[id];
  const details = {
    sea: '<path d="M0 75q25-15 50 0t50 0t50 0t50 0M0 103q25-15 50 0t50 0t50 0t50 0" fill="none" stroke="#e6f9ff" stroke-width="4"/><path d="m75 74 22-9v18Z" fill="#ffd46a"/><ellipse cx="67" cy="74" rx="17" ry="10" fill="#ffd46a"/>',
    desert: '<path d="M0 110Q55 58 113 107T200 94V140H0Z" fill="#d9a962"/><path d="M141 117V62m0 25h-17V72m17 25h16V79" fill="none" stroke="#518d67" stroke-width="9" stroke-linecap="round"/>',
    forest: '<path d="M35 140V60M104 140V45M165 140V60" stroke="#8b7555" stroke-width="9"/><g fill="#3d805e"><circle cx="35" cy="55" r="31"/><circle cx="104" cy="40" r="38"/><circle cx="165" cy="55" r="32"/></g>',
    polar: '<path d="m0 118 40-64 39 64 50-88 62 88Z" fill="#fff"/><path d="m40 54 13 22-15-5-12 7Z" fill="#b6d5e7"/><path d="m103 111 20-22 23 22-8 17h-30Z" fill="#d9f1ff"/>',
    pond: '<ellipse cx="103" cy="100" rx="84" ry="31" fill="#64adbf"/><ellipse cx="90" cy="102" rx="18" ry="6" fill="#8fca83"/><path d="M19 125V71m0 25-10-14m10 23 12-19M177 130V67m0 27-11-15" stroke="#558453" stroke-width="4" fill="none"/>',
    savanna: '<path d="M134 125V64m0 15-18-17m18 21 20-20" fill="none" stroke="#8e7657" stroke-width="7"/><path d="M87 57Q97 24 129 40Q170 19 184 57Z" fill="#74865a"/><path d="m24 125-4-21m4 21 7-15m21 19-4-22m4 22 8-13" stroke="#9d9157" stroke-width="3"/>'
  };
  return `<svg viewBox="0 0 200 140" aria-hidden="true"><rect width="200" height="140" rx="13" fill="${info.sky}"/><circle cx="27" cy="26" r="13" fill="#ffda7b"/><path d="M0 98Q80 70 200 98V140H0Z" fill="${info.ground}"/>${details[id]}</svg>`;
}
function pwActionArt(id) {
  const props = {
    jump: '<rect x="52" y="101" width="95" height="10" rx="5" fill="#aab9d2"/><path d="m47 80 9-15m94 15-9-15" stroke="#8b77b2" stroke-width="3"/>',
    sleep: '<rect x="44" y="90" width="118" height="20" rx="8" fill="#b2a2de"/><path d="M44 78v40m118-30v30" stroke="#8876af" stroke-width="6"/><text x="129" y="44" fill="#7764a0" font-size="22" font-weight="700">Z z</text>',
    eat: '<path d="M139 69q0-22 15-25m-15 25q1-19-9-25" stroke="#5e9269" stroke-width="3" fill="none"/><circle cx="130" cy="76" r="10" fill="#df647c"/><circle cx="149" cy="78" r="10" fill="#e77b89"/>',
    read: '<path d="M86 88q17-12 35 0v32q-18-12-35 0-18-12-35 0V88q17-12 35 0Z" fill="#8dbdc7" stroke="#4f889d" stroke-width="2"/><path d="M86 89v30" stroke="#4f889d" stroke-width="2"/>',
    run: '<path d="M25 53h27M18 66h29M27 79h23M25 114h140" fill="none" stroke="#94acc3" stroke-width="4" stroke-linecap="round"/>',
    drink: '<path d="M130 77h33l-4 36h-25Z" fill="#8dc3dc" stroke="#5689a2" stroke-width="2"/><path d="M146 90V58h-21" fill="none" stroke="#7c739d" stroke-width="4"/>'
  };
  return `<svg viewBox="0 0 200 140" class="pw-action-art" aria-hidden="true"><rect width="200" height="140" rx="13" fill="#f1edf8"/>${props[id]}<g class="pw-action-${id}">${pqPacman(id === "sleep" ? 88 : id === "run" ? 94 : 83, id === "sleep" ? 69 : id === "jump" ? 52 : 65, 28)}</g></svg>`;
}
function pwOption(exercise, state, value, index) {
  let art = "", label = value;
  if (exercise.mode === "habitats") { art = `<div class="pw-habitat-visual">${pwHabitatArt(value)}${state.checked && state.isCorrect && value === exercise.correct ? `<span class="pw-animal-arrival" aria-hidden="true">${exercise.emoji}</span>` : ""}</div>`; label = PW_HABITATS[value].label; }
  if (exercise.mode === "jobs") { art = `<span class="pw-job-art" aria-hidden="true">${PW_JOBS[value][1]}</span>`; label = PW_JOBS[value][0]; }
  if (exercise.mode === "actions") { art = pwActionArt(value); label = PW_ACTIONS[value][0]; }
  return `<button type="button" class="pw-option ${state.choice === value ? "is-selected" : ""}" data-action="pw-choice" data-value="${escapeHtml(value)}" aria-pressed="${state.choice === value}" ${state.checked ? "disabled" : ""}>${art}<span>${escapeHtml(label)}</span><i aria-hidden="true">${state.choice === value ? "✓" : String(index + 1).padStart(2, "0")}</i></button>`;
}
function pwTask(exercise, state) {
  let clue;
  if (exercise.mode === "opposites") clue = `<div class="pw-clue pw-word-clue"><span>${escapeHtml(exercise.sentence)}</span><strong>${escapeHtml(exercise.word)}</strong><small>Buscá su opuesto ↓</small></div>`;
  if (exercise.mode === "habitats") clue = `<div class="pw-clue pw-animal-clue"><span aria-hidden="true">${exercise.emoji}</span><strong>${escapeHtml(exercise.animal)}</strong></div>`;
  if (exercise.mode === "jobs") clue = `<div class="pw-clue pw-mission">${pwPacman()}<p>Buscamos a alguien que…<strong>${escapeHtml(exercise.mission)}</strong></p></div>`;
  if (exercise.mode === "patterns") clue = `<div class="pw-train" aria-label="Serie: ${exercise.series.map((n, i) => i === exercise.missing ? 'espacio vacío' : n).join(', ')}">${exercise.series.map((n, i) => `<div class="pw-wagon ${i === exercise.missing ? "is-missing" : ""}"><span>${i === exercise.missing ? state.checked ? n : "?" : n}</span><i></i><i></i></div>`).join("")}</div><p class="pw-task-hint">Mirá cuánto aumenta entre un vagón y el siguiente.</p>`;
  if (exercise.mode === "actions") clue = `<div class="pw-clue pw-english-clue"><small>WHAT DOES PAC-MAN DO?</small><strong lang="en">${exercise.word}</strong><span>Elegí la escena ↓</span></div>`;
  if (exercise.mode === "making") return `<div class="pw-product"><span aria-hidden="true">${exercise.emoji}</span><strong>${escapeHtml(exercise.product)}</strong></div><div class="pw-step-slots">${["Primero", "Después", "Al final"].map((label, i) => `<button type="button" data-action="pw-remove" data-index="${i}" ${state.checked || !state.sequence[i] ? "disabled" : ""} aria-label="${label}: ${state.sequence[i] ? escapeHtml(exercise.steps[Number(state.sequence[i])]) + '. Tocar para quitar' : 'sin elegir'}"><small>0${i + 1} · ${label}</small><strong>${state.sequence[i] ? escapeHtml(exercise.steps[Number(state.sequence[i])]) : "+"}</strong>${state.sequence[i] && !state.checked ? '<span>Quitar ×</span>' : ""}</button>`).join("")}</div><p class="pw-task-hint">Tocá los pasos en orden. Podés quitarlos para cambiar el recorrido.</p><div class="pw-step-bank">${exercise.tokens.map(value => `<button type="button" data-action="pw-step" data-value="${value}" ${state.checked || state.sequence.includes(value) ? "disabled" : ""}>${escapeHtml(exercise.steps[Number(value)])}<span aria-hidden="true">＋</span></button>`).join("")}</div>`;
  return `${clue}<div class="pw-options pw-options-${exercise.mode}" role="group" aria-labelledby="pw-question">${exercise.options.map((value, i) => pwOption(exercise, state, value, i)).join("")}</div>`;
}
function pwCurrent() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.pacmanWorld?.[exercise?.id];
  return route.view === "run" && exercise?.type === "pacman-world" && state ? { exercise, state } : null;
}
function pwCanCheck(exercise, state) {
  return !state.checked && (exercise.mode === "making" ? state.sequence.length === 3 : exercise.options.includes(state.choice));
}
function renderPacmanWorldRunner(exercise) {
  const state = session.pacmanWorld[exercise.id], theme = PACMAN_WORLD_THEMES.find(t => t.worldMode === exercise.mode);
  const oldWorld = document.querySelector(".pw-world");
  const feedback = state.checked ? `${state.isCorrect ? "¡Lo descubriste!" : "Vamos a aprenderlo juntos."} ${exercise.explanation}` : "Podés cambiar tu respuesta antes de comprobar.";
  renderShell(`<section class="pw-runner pw-${exercise.mode} ${state.checked ? state.isCorrect ? "pw-success" : "pw-review" : ""}" style="--pw-accent:${theme.accent}"><header class="pw-header"><button class="pw-back" type="button" data-action="cancel-run">${icon("arrow")}${escapeHtml(session.subjectTitle)}</button><div><span>PAC-MAN · NUEVOS MUNDOS</span><strong>${escapeHtml(session.themeTitle)}</strong></div><b>DESAFÍO <span>${session.index + 1} / ${session.exercises.length}</span></b></header><div class="pw-layout">${pwSideWorld(exercise, state)}<article class="pw-board"><div class="pw-board-heading"><span>${theme.badge} · EXPLORÁ Y APRENDÉ</span><span aria-hidden="true">✦</span></div><h2 id="pw-question" tabindex="-1">${escapeHtml(exercise.prompt)}</h2>${pwTask(exercise, state)}<footer class="pw-controls"><p role="status" aria-live="polite">${escapeHtml(feedback)}</p>${state.checked ? `<button class="pw-primary" type="button" data-action="pw-next">${session.index + 1 === session.exercises.length ? "Ver mi aventura" : "Siguiente desafío"} →</button>` : `<button class="pw-primary" type="button" data-action="pw-check" ${pwCanCheck(exercise, state) ? "" : "disabled"}>Comprobar ${icon("check")}</button>`}</footer></article></div></section>`);
  if (oldWorld?.dataset.round === exercise.id && oldWorld.dataset.phase === String(state.checked)) document.querySelector(".pw-world")?.replaceWith(oldWorld);
}
function pacmanWorldAction(action, target) {
  const current = pwCurrent();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "pw-next") {
    if (!state.checked) return;
    session.index++; render(); window.scrollTo({ top: 0, behavior: "auto" });
    document.querySelector("#pw-question, #pw-finish-title")?.focus({ preventScroll: true }); return;
  }
  if (state.checked) return;
  if (action === "pw-choice") {
    if (!exercise.options?.includes(target.dataset.value)) return;
    state.choice = target.dataset.value;
  } else if (action === "pw-step") {
    const value = target.dataset.value;
    if (exercise.mode !== "making" || !exercise.tokens.includes(value) || state.sequence.includes(value) || state.sequence.length >= 3) return;
    state.sequence.push(value);
  } else if (action === "pw-remove") {
    const index = Number(target.dataset.index);
    if (exercise.mode !== "making" || !Number.isInteger(index) || index < 0 || index >= state.sequence.length) return;
    state.sequence.splice(index, 1);
  } else if (action === "pw-check") {
    if (!pwCanCheck(exercise, state)) return;
    const selected = exercise.mode === "making" ? state.sequence : state.choice;
    state.isCorrect = JSON.stringify(selected) === JSON.stringify(exercise.correct);
    state.checked = true;
    if (state.isCorrect) session.score++;
    session.answers.push({ prompt: exercise.prompt, selected: clone(selected), correct: clone(exercise.correct), isCorrect: state.isCorrect });
  } else return;
  const y = window.scrollY;
  render(); window.scrollTo({ top: y, behavior: "auto" });
  if (state.checked) document.querySelector('[data-action="pw-next"]')?.focus({ preventScroll: true });
  else if (action === "pw-choice") document.querySelector(`[data-action="pw-choice"][data-value="${CSS.escape(state.choice)}"]`)?.focus({ preventScroll: true });
  else document.querySelector('[data-action="pw-step"]:not(:disabled), [data-action="pw-check"]:not(:disabled)')?.focus({ preventScroll: true });
}
function renderPacmanWorldFinish() {
  const theme = PACMAN_WORLD_THEMES.find(t => t.id === session.themeId);
  renderShell(`<section class="pw-runner pw-finish" style="--pw-accent:${theme.accent}"><span class="pw-finish-kicker">PAC-MAN · ${escapeHtml(session.subjectTitle)}</span><div class="pw-finish-cast" aria-hidden="true">${pacmanVerbGhost("#a7d9dc")}${pwPacman()}${pacmanVerbGhost("#deb0ca")}</div><h2 id="pw-finish-title" tabindex="-1">¡Mundo explorado, ${escapeHtml(data.settings.studentName || "Ian")}!</h2><p>Completaste los ${session.exercises.length} desafíos.</p><div class="pw-results">${session.answers.map((a, i) => `<span aria-label="Desafío ${i + 1}: ${a.isCorrect ? "correcto" : "para repasar"}">${a.isCorrect ? "★" : "○"}</span>`).join("")}</div><strong>${session.score} de ${session.exercises.length} respuestas correctas</strong><p>Siempre hay algo nuevo por descubrir.</p><div class="pw-finish-actions"><button type="button" class="pw-primary" data-action="start" data-subject="${session.subjectId}" data-theme="${session.themeId}" data-mode="activity">Volver a explorar ↻</button><button type="button" class="pw-back" data-action="cancel-run">Volver a ${escapeHtml(session.subjectTitle)}</button></div></section>`);
}
