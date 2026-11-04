// Original activities inspired by INTEF's primary-school sequence for verbs.
// Shared app helpers are resolved when the activity runs (app.js loads next).
const PACMAN_VERB_ACTIONS = [
  { id: "comer", verb: "come", ending: "una cereza roja", prop: "🍒", distractors: ["cereza", "roja"] },
  { id: "saltar", verb: "salta", ending: "una pared baja", prop: "🧱", distractors: ["pared", "baja"] },
  { id: "caminar", verb: "camina", ending: "por el camino azul", prop: "👣", distractors: ["camino", "azul"] },
  { id: "dormir", verb: "duerme", ending: "en una cama cómoda", prop: "🛏️", distractors: ["cama", "cómoda"] },
  { id: "beber", verb: "bebe", ending: "agua fresca", prop: "🥤", distractors: ["agua", "fresca"] },
  { id: "leer", verb: "lee", ending: "un libro divertido", prop: "📖", distractors: ["libro", "divertido"] },
  { id: "jugar", verb: "juega", ending: "con una pelota verde", prop: "⚽", distractors: ["pelota", "verde"] },
  { id: "mirar", verb: "mira", ending: "una estrella brillante", prop: "⭐", distractors: ["estrella", "brillante"] },
  { id: "buscar", verb: "busca", ending: "una llave amarilla", prop: "🔑", distractors: ["llave", "amarilla"] },
  { id: "pintar", verb: "pinta", ending: "un fantasma rosa", prop: "🎨", distractors: ["fantasma", "rosa"] },
  { id: "escuchar", verb: "escucha", ending: "música alegre", prop: "🎵", distractors: ["música", "alegre"] },
  { id: "empujar", verb: "empuja", ending: "una caja grande", prop: "📦", distractors: ["caja", "grande"] }
];

const PACMAN_VERB_TIMES = [
  { id: "past", cue: "Ayer", label: "Pasado", help: "Ya pasó", hint: "Ayer ya pasó. Buscá cómo contamos algo que ya ocurrió." },
  { id: "present", cue: "Hoy", label: "Presente", help: "Pasa ahora", hint: "Hoy pasa ahora. Buscá cómo contamos lo que hace hoy." },
  { id: "future", cue: "Mañana", label: "Futuro", help: "Va a pasar", hint: "Mañana todavía no llegó. Buscá cómo contamos lo que hará después." }
];

const PACMAN_VERB_CONJUGATIONS = [
  { id: "comer", ending: "una cereza", forms: ["comió", "come", "comerá"] },
  { id: "saltar", ending: "una pared", forms: ["saltó", "salta", "saltará"] },
  { id: "caminar", ending: "por el laberinto", forms: ["caminó", "camina", "caminará"] },
  { id: "mirar", ending: "una estrella", forms: ["miró", "mira", "mirará"] },
  { id: "buscar", ending: "una llave", forms: ["buscó", "busca", "buscará"] },
  { id: "jugar", ending: "con una pelota", forms: ["jugó", "juega", "jugará"] }
];

const PACMAN_LANGUAGE_THEMES = [
  {
    id: "pacman-come-verbos", title: "Pac-Man come verbos",
    description: "Encontrá la palabra que cuenta qué hace Pac-Man.",
    activityLabel: "8 desafíos · Reconocer acciones", randomExerciseCount: 8,
    pacmanVerbMode: "actions",
    exercises: [{ id: "pacman-verbos", type: "pacman-verbs", prompt: "¿Qué hace Pac-Man?" }]
  },
  {
    id: "pacman-tiempo", title: "Pac-Man viaja en el tiempo",
    description: "Completá las oraciones de ayer, hoy y mañana.",
    activityLabel: "6 desafíos · Pasado, presente y futuro", randomExerciseCount: 6,
    pacmanVerbMode: "time",
    exercises: [{ id: "pacman-tiempos", type: "pacman-verbs", prompt: "Elegí el verbo para completar" }]
  }
];

function createPacmanVerbExercises(theme) {
  if (theme.pacmanVerbMode === "time") {
    // Two of each tense, six distinct verbs, with a new pairing each play.
    const timeOrder = [...shuffled([0, 1, 2]), ...shuffled([0, 1, 2])];
    return shuffled(PACMAN_VERB_CONJUGATIONS).map((item, index) => {
      const timeIndex = timeOrder[index];
      const time = PACMAN_VERB_TIMES[timeIndex];
      const action = PACMAN_VERB_ACTIONS.find((candidate) => candidate.id === item.id);
      return {
        id: `pacman-time-${item.id}`, type: "pacman-verbs", mode: "time",
        action: item.id, prop: action.prop, time: { ...time },
        before: `${time.cue}, Pac-Man`, after: `${item.ending}.`,
        correct: item.forms[timeIndex], options: shuffled(item.forms),
        prompt: "Elegí el verbo para completar", hint: time.hint
      };
    });
  }
  return shuffled(PACMAN_VERB_ACTIONS).slice(0, 8).map((item) => ({
    id: `pacman-action-${item.id}`, type: "pacman-verbs", mode: "actions",
    action: item.id, prop: item.prop, before: "Pac-Man", after: `${item.ending}.`,
    correct: item.verb, options: shuffled([item.verb, ...item.distractors]),
    prompt: "¿Qué hace Pac-Man?", hint: "Buscá la palabra que cuenta qué hace Pac-Man."
  }));
}

function pacmanVerbSprite(extraClass = "") {
  return `<svg class="pv-pacman ${extraClass}" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 50 94 25A50 50 0 1 0 94 75Z" fill="#ffdc49"/><circle cx="54" cy="21" r="5" fill="#14223f"/></svg>`;
}

function pacmanVerbGhost(color = "#ff95be") {
  return `<svg class="pv-ghost" viewBox="0 0 80 88" aria-hidden="true"><path d="M5 83V38a35 35 0 0 1 70 0v45L63 73 51 83 40 73 28 83 16 73Z" fill="${color}"/><ellipse cx="29" cy="36" rx="10" ry="13" fill="white"/><ellipse cx="53" cy="36" rx="10" ry="13" fill="white"/><circle cx="32" cy="38" r="5" fill="#182b51"/><circle cx="56" cy="38" r="5" fill="#182b51"/></svg>`;
}

function renderPacmanVerbTrail(completed, total) {
  return `<div class="pv-trail" aria-label="${completed} de ${total} desafíos completados">
    <span class="pv-trail-label">TU RECORRIDO</span>
    <div class="pv-trail-track" aria-hidden="true">${Array.from({ length: total + 1 }, (_, index) =>
      `<span class="pv-trail-stop ${index < completed ? "is-eaten" : ""} ${index === completed ? "is-here" : ""}">${index === completed ? pacmanVerbSprite() : index === total ? "★" : "<i></i>"}</span>`
    ).join("")}</div>
    <strong>${completed} / ${total}</strong>
  </div>`;
}

function renderPacmanVerbScene(exercise, answered) {
  return `<div class="pv-scene pv-scene-${exercise.action} ${answered ? "is-celebrating" : ""}" aria-hidden="true">
    <svg class="pv-maze-art" viewBox="0 0 440 260" preserveAspectRatio="none">
      <g fill="none" stroke="#355fa6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 82V30Q18 18 30 18H158M202 18H410Q422 18 422 30V88M18 184V230Q18 242 30 242H190M236 242H410Q422 242 422 230V174"/>
        <path d="M62 58H126V88H62M266 60H374V88M64 202H132M316 202H374V172"/>
      </g>
      <path d="M22 134H418" stroke="#f6db84" stroke-width="5" stroke-dasharray="1 22" stroke-linecap="round"/>
    </svg>
    <div class="pv-scene-player">${pacmanVerbSprite()}${exercise.action === "dormir" ? '<span class="pv-sleep">Z z z</span>' : ""}</div>
    <span class="pv-scene-prop">${exercise.action === "jugar" ? '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="#79d798" stroke="#b2efbd" stroke-width="3"/><path d="M10 22Q40 40 70 22M10 58Q40 40 70 58M40 4Q20 40 40 76M40 4Q60 40 40 76" fill="none" stroke="#236f52" stroke-width="3"/></svg>' : exercise.prop}</span>
    <span class="pv-scene-friend">${pacmanVerbGhost()}</span>
    ${answered ? '<span class="pv-scene-spark">✦</span>' : ""}
  </div>`;
}

function currentPacmanVerb() {
  const exercise = session?.exercises?.[session.index];
  const state = session?.pacmanVerbs?.[exercise?.id];
  return route.view === "run" && exercise?.type === "pacman-verbs" && state ? { exercise, state } : null;
}

function renderPacmanVerbRunner(exercise) {
  const state = session.pacmanVerbs[exercise.id];
  const isTime = exercise.mode === "time";
  const completed = session.index + (state.answered ? 1 : 0);
  const sentence = `${escapeHtml(exercise.before)} ${isTime && !state.answered
    ? '<span class="pv-blank" aria-label="espacio para completar">…</span>'
    : `<span class="${state.answered ? "pv-found-verb" : ""}">${escapeHtml(exercise.correct)}</span>`} ${escapeHtml(exercise.after)}`;
  const feedback = state.answered
    ? isTime ? `¡Bien! ${exercise.correct} está en ${exercise.time.label.toLowerCase()}.` : `¡Bien! ${exercise.correct} es el verbo: cuenta la acción.`
    : state.wrongChoice !== null ? exercise.hint : isTime ? "Mirá cuándo pasa y tocá una palabra." : "Tocá el verbo para que Pac-Man se lo coma.";
  renderShell(`<section class="runner pv-runner ${isTime ? "pv-time-runner" : ""}">
    <header class="pv-topbar">
      <button class="pv-exit" type="button" data-action="cancel-run">${icon("arrow")}Salir</button>
      <div class="pv-title"><span>LENGUA · VERBOS</span><strong>${escapeHtml(session.themeTitle)}</strong></div>
      <span class="pv-round">${session.index + 1} de ${session.exercises.length}</span>
    </header>
    ${renderPacmanVerbTrail(completed, session.exercises.length)}
    <div class="pv-play-layout">
      <aside class="pv-world">
        <span class="pv-world-label">${isTime ? "EL TÚNEL DEL TIEMPO" : "EL LABERINTO DE LAS ACCIONES"}</span>
        ${renderPacmanVerbScene(exercise, state.answered)}
        ${isTime ? `<div class="pv-time-map" aria-label="Pista de tiempo">${PACMAN_VERB_TIMES.map((time) => `<div class="${exercise.time.id === time.id ? "is-current" : ""}"><strong>${time.cue}</strong><span>${time.label}</span><small>${time.help}</small></div>`).join("")}</div>`
          : '<p class="pv-world-note">Una acción, una palabra.<br><strong>¡Vamos a encontrar el verbo!</strong></p>'}
      </aside>
      <article class="pv-challenge">
        <span class="pv-kicker">${isTime ? `${exercise.time.cue.toUpperCase()} · ${exercise.time.label.toUpperCase()}` : "ENCONTRÁ LA ACCIÓN"}</span>
        <h2 id="pv-question" tabindex="-1">${exercise.prompt}</h2>
        <p class="pv-sentence">${sentence}</p>
        <div class="pv-choices" role="group" aria-labelledby="pv-question">${exercise.options.map((option, index) => `<button type="button" class="pv-choice ${state.answered && option === exercise.correct ? "is-correct" : ""} ${state.wrongChoice === index ? "is-retry" : ""}" data-action="pacman-verb-answer" data-option="${index}" ${state.answered ? "disabled" : ""}>
          <span class="pv-choice-token" aria-hidden="true">${state.answered && option === exercise.correct ? pacmanVerbSprite() : "●"}</span><strong>${escapeHtml(option)}</strong>${state.answered && option === exercise.correct ? '<span class="pv-choice-check" aria-hidden="true">✓</span>' : ""}
        </button>`).join("")}</div>
        <div class="pv-feedback ${state.answered ? "is-good" : ""}" role="status" aria-live="polite">${feedback}</div>
        <button class="pv-next" type="button" data-action="pacman-verb-next" ${state.answered ? "" : "disabled"}>${session.index === session.exercises.length - 1 ? "Ver mi recorrido" : "Siguiente desafío"}<span aria-hidden="true">→</span></button>
      </article>
    </div>
  </section>`);
}

function answerPacmanVerb(optionIndex) {
  const current = currentPacmanVerb();
  if (!current || current.state.answered || !Number.isInteger(optionIndex)) return;
  const { exercise, state } = current;
  const chosen = exercise.options[optionIndex];
  if (chosen === undefined) return;
  if (chosen !== exercise.correct) {
    state.errors += 1;
    state.wrongChoice = optionIndex;
    render();
    document.querySelector(`[data-action="pacman-verb-answer"][data-option="${optionIndex}"]`)?.focus({ preventScroll: true });
    return;
  }
  state.answered = true;
  state.wrongChoice = null;
  if (state.errors === 0) session.score += 1;
  session.answers.push({
    prompt: `${exercise.before} ${exercise.mode === "time" ? "…" : exercise.correct} ${exercise.after}`,
    support: session.themeTitle, selected: chosen, correct: exercise.correct,
    isCorrect: state.errors === 0, attempts: state.errors + 1
  });
  render();
  document.querySelector('[data-action="pacman-verb-next"]')?.focus({ preventScroll: true });
}

function nextPacmanVerb() {
  const current = currentPacmanVerb();
  if (!current?.state.answered) return;
  session.index += 1;
  render();
  document.querySelector("#pv-question, #pv-finish-title")?.focus({ preventScroll: true });
}

function renderPacmanVerbFinish() {
  const isTime = session.exercises[0]?.mode === "time";
  renderShell(`<section class="pv-runner pv-finish">
    <span class="pv-kicker">LENGUA · VERBOS</span>
    <div class="pv-finish-friends" aria-hidden="true">${pacmanVerbGhost("#80dcf2")}${pacmanVerbSprite()}${pacmanVerbGhost()}</div>
    <h2 id="pv-finish-title" tabindex="-1">¡Recorrido completo!</h2>
    <p>Ayudaste a Pac-Man a ${isTime ? "viajar por el pasado, el presente y el futuro" : "encontrar los verbos"}.</p>
    ${renderPacmanVerbTrail(session.exercises.length, session.exercises.length)}
    <div class="pv-learned">${session.exercises.map((exercise) => `<span>${isTime ? `<small>${exercise.time.cue}</small>` : ""}<strong>${escapeHtml(exercise.correct)}</strong></span>`).join("")}</div>
    <div class="pv-finish-actions">
      <button class="pv-next" type="button" data-action="start" data-mode="activity" data-subject="lengua" data-theme="${escapeHtml(session.themeId)}">Jugar otra vez <span aria-hidden="true">↻</span></button>
      <button class="pv-exit" type="button" data-action="cancel-run">Volver a Lengua</button>
    </div>
  </section>`);
}
