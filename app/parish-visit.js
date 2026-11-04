// Anticipación visual. Las actividades concretas se explican durante la visita.
const PARISH_PHOTO = "./assets/supports/parish/medalla1-1.jpg";
const PARISH_CHAPTERS = ["El lugar", "El recorrido", "Los profes", "El cambio", "Puedo pedir", "Mi repaso"];
const PARISH_DETAILS = [
  { id: "entrance", label: "La entrada", text: "Esta es una entrada de la parroquia.", position: [52, 59, 15, 20] },
  { id: "tower", label: "La torre", text: "La torre está en la parte alta del edificio.", position: [73, 27, 14, 25] },
  { id: "tree", label: "Un árbol", text: "Hay árboles junto a la parroquia.", position: [1, 43, 13, 36] }
];
const PARISH_STOPS = [
  { label: "Escuela", image: "escuela", title: "Estoy en mi escuela", text: "Desde la escuela vamos a una parroquia que está muy cerca." },
  { label: "Caminamos", image: "ir", title: "Voy con mi grupo", text: "Camino con el grupo y el adulto que me acompaña." },
  { label: "Parroquia", image: null, title: "Llegamos a la parroquia", text: "Se llama Medalla Milagrosa. Está en la esquina de mi escuela." },
  { label: "Los profes", image: "maestra", title: "Nos encontramos con los profes", text: "Los profes de Educación Física de la UCASAL nos explican las actividades." },
  { label: "Terminamos", image: "terminar", title: "La visita tiene un final", text: "Cuando termina, el adulto que me acompaña me dice qué hacemos después." }
];
const PARISH_CARDS = [
  { id: "people", question: "¿Con quién?", image: "maestra", title: "Practicantes de Educación Física", text: "Son de la UCASAL. Pueden participar distintos grupos de profes." },
  { id: "activity", question: "¿Qué hacemos?", image: "oir", title: "Los profes nos lo explican", text: "Todavía no sabemos cuáles serán las actividades. Las vamos a conocer allí." },
  { id: "show", question: "¿Y si es nuevo?", image: "no-entiendo", title: "Puedo pedir que me muestren", text: "Puedo decir: “Mostrame cómo se hace” o “Quiero mirar primero”." }
];
const PARISH_MESSAGES = [
  { id: "help", label: "Ayuda", title: "Necesito ayuda", image: "necesito-ayuda", color: "#235e9b" },
  { id: "pause", label: "Pausa", title: "Necesito una pausa", image: "descanso", color: "#6750a0" },
  { id: "bathroom", label: "Baño", title: "Necesito ir al baño", image: "bano", color: "#196b72" },
  { id: "no", label: "No quiero", title: "No quiero", image: "no-quiero", color: "#a93c45" },
  { id: "next", label: "¿Qué sigue?", title: "¿Qué hacemos ahora?", image: "no-entiendo", color: "#80551b" }
];
const PARISH_CHANGE_MESSAGES = [
  { id: "bye", label: "Chau", title: "Chau, profes", image: "adios", color: "#196b65" },
  { id: "moment", label: "Un momento", title: "Necesito un momento", image: "esperar", color: "#6750a0" }
];
const PARISH_CHANGES = [
  { title: "Estoy con estos profes", text: "Compartimos una actividad.", next: "Este grupo termina y se despide.", button: "Ver la despedida" },
  { title: "Este grupo se despide", text: "Puedo saludar a mi manera o pedir un momento.", next: "En este juego, después llega otro grupo.", button: "Ver al otro grupo" },
  { title: "Ahora hay otros profes", text: "Me explican la próxima actividad.", next: "Un adulto me dice si seguimos o terminamos.", button: "Practicar otra vez" }
];
let parishVisitState = null;

function createParishVisitState() {
  return { chapter: 0, stop: 0, changeStep: 0, detail: null, discovered: [], cards: [], message: null };
}

function parishPicto(name, className = "") {
  return `<img class="${className}" src="./assets/pictos/${name}.png" alt="" decoding="async" />`;
}

function parishFootprint() {
  return '<svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><ellipse cx="14" cy="24" rx="7" ry="10" transform="rotate(25 14 24)"/><ellipse cx="24" cy="11" rx="7" ry="10" transform="rotate(25 24 11)"/></svg>';
}

function parishNeedButtons(compact = false) {
  return PARISH_MESSAGES.map(message => `<button type="button" class="pv-need ${compact ? "pv-need-compact" : ""}" data-action="pv-message" data-value="${message.id}" style="--pv-message-color:${message.color}">
    ${parishPicto(message.image)}<span>${compact ? message.label : message.title}</span>
  </button>`).join("");
}

function parishPlace() {
  const state = parishVisitState;
  const selected = PARISH_DETAILS.find(detail => detail.id === state.detail);
  return `<div class="pv-place-layout">
    <div class="pv-photo-card">
      <div class="pv-photo-scene">
        <img class="pv-parish-photo" src="${PARISH_PHOTO}" alt="Fachada de la parroquia Medalla Milagrosa de Salta, con entrada enrejada, torre y árboles." />
        ${selected ? `<span class="pv-photo-highlight" aria-hidden="true" style="left:${selected.position[0]}%;top:${selected.position[1]}%;width:${selected.position[2]}%;height:${selected.position[3]}%"></span>` : ""}
      </div>
      <span class="pv-photo-credit">Foto: Arzobispado de Salta · Publicada en 2019</span>
    </div>
    <div class="pv-place-copy">
      <span class="pv-kicker">MEDALLA MILAGROSA · SALTA</span>
      <h2 id="pv-title" tabindex="-1">Conozco el lugar</h2>
      <p>Voy a una parroquia cerca de mi escuela para hacer actividades con profes de la UCASAL.</p>
      <p class="pv-instruction">Tocá un detalle y buscalo en la foto.</p>
      <div class="pv-detail-buttons">${PARISH_DETAILS.map(detail => `<button type="button" data-action="pv-detail" data-value="${detail.id}" aria-pressed="${state.detail === detail.id}">${state.discovered.includes(detail.id) ? '<span aria-hidden="true">✓</span> ' : ""}${detail.label}</button>`).join("")}</div>
      <p class="pv-feedback" aria-live="polite">${selected ? selected.text : "Podemos mirar la foto juntos."}</p>
    </div>
  </div>`;
}

function parishJourney() {
  const state = parishVisitState;
  const stop = PARISH_STOPS[state.stop];
  return `<div class="pv-journey">
    <div class="pv-heading"><span class="pv-kicker">PASO A PASO</span><h2 id="pv-title" tabindex="-1">El camino de la visita</h2><p>Tocá una parada para verla. También podés avanzar con la huella.</p></div>
    <div class="pv-path" aria-label="Pasos de la visita">${PARISH_STOPS.map((item, index) => `<button type="button" class="pv-stop ${index === state.stop ? "is-current" : ""}" data-action="pv-stop" data-value="${index}" ${index === state.stop ? 'aria-current="step"' : ""}>
      <span class="pv-stop-number">${index + 1}</span>${item.image ? parishPicto(item.image) : `<img src="${PARISH_PHOTO}" alt="" />`}<strong>${item.label}</strong>
    </button>`).join("")}</div>
    <div class="pv-stop-story" aria-live="polite"><div class="pv-stop-art">${stop.image ? parishPicto(stop.image) : `<img class="pv-story-photo" src="${PARISH_PHOTO}" alt="La parroquia Medalla Milagrosa" />`}</div><div><h3>${stop.title}</h3><p>${stop.text}</p></div>
      ${state.stop < PARISH_STOPS.length - 1 ? `<button class="pv-walk" type="button" data-action="pv-walk">${parishFootprint()}<span>Otra parada</span></button>` : '<span class="pv-path-end">✓ Fin del recorrido</span>'}
    </div>
  </div>`;
}

function parishTeachers() {
  return `<div class="pv-heading"><span class="pv-kicker">UN ENCUENTRO CON LOS PROFES</span><h2 id="pv-title" tabindex="-1">¿Qué vamos a encontrar?</h2><p>Tocá las tarjetas para descubrirlo.</p></div>
    <div class="pv-teacher-cards">${PARISH_CARDS.map(card => {
      const open = parishVisitState.cards.includes(card.id);
      return `<button type="button" class="pv-teacher-card ${open ? "is-open" : ""}" data-action="pv-card" data-value="${card.id}" aria-expanded="${open}">
        <span class="pv-card-question">${card.question}</span>${parishPicto(card.image)}
        ${open ? `<strong>${card.title}</strong><span>${card.text}</span>` : '<strong class="pv-card-discover">Tocá para descubrir <span aria-hidden="true">＋</span></strong>'}
      </button>`;
    }).join("")}</div>`;
}

function parishChange() {
  const step = parishVisitState.changeStep;
  const scene = PARISH_CHANGES[step];
  const messages = [PARISH_CHANGE_MESSAGES[0], PARISH_CHANGE_MESSAGES[1], PARISH_MESSAGES.find(message => message.id === "next")];
  return `<div class="pv-change">
    <div class="pv-heading"><span class="pv-kicker">PRACTICAMOS JUNTOS</span><h2 id="pv-title" tabindex="-1">Un grupo se va y llega otro</h2><p>En este juego, vos hacés avanzar el cambio de profes.</p></div>
    <div class="pv-change-layout">
      <figure class="pv-change-place"><img src="${PARISH_PHOTO}" alt="La misma parroquia Medalla Milagrosa que reconozco en la foto" /><figcaption>El lugar que conozco</figcaption></figure>
      <div class="pv-change-story">
        <div class="pv-change-groups pv-change-step-${step}" aria-label="${step === 0 ? "Ahora: un grupo. Después: otro grupo." : step === 1 ? "Un grupo se despide. Otro grupo viene después." : "Un grupo se despidió. Ahora está el otro grupo."}">
          <div class="pv-change-group pv-change-first ${step === 0 ? "is-current" : ""}"><span class="pv-change-status">${step === 0 ? "AHORA" : step === 1 ? "SE DESPIDE" : "SE DESPIDIÓ"}</span>${parishPicto("maestra")}<strong>Un grupo</strong></div>
          <div class="pv-change-between">${step === 1 ? parishPicto("adios") : '<span aria-hidden="true">→</span>'}</div>
          <div class="pv-change-group pv-change-second ${step === 2 ? "is-current" : ""}"><span class="pv-change-status">${step === 2 ? "AHORA" : "DESPUÉS"}</span>${parishPicto("maestra")}<strong>Otro grupo</strong></div>
        </div>
        <div class="pv-change-caption" aria-live="polite"><h3>${scene.title}</h3><p>${scene.text}</p><p class="pv-change-next"><strong>Después:</strong> ${scene.next}</p></div>
      </div>
    </div>
    <div class="pv-change-controls"><button class="btn btn-ghost" type="button" data-action="pv-change-back" ${step === 0 ? "disabled" : ""}>${icon("arrow")}Un paso atrás</button><span>${step + 1} de 3</span><button class="btn btn-primary" type="button" data-action="${step === 2 ? "pv-change-reset" : "pv-change-next"}">${scene.button} <span aria-hidden="true">${step === 2 ? "↺" : "→"}</span></button></div>
    <div class="pv-change-choices" aria-label="Puedo expresarme durante el cambio"><strong>Puedo decir</strong>${messages.map(message => `<button type="button" data-action="pv-message" data-value="${message.id}" style="--pv-message-color:${message.color}">${parishPicto(message.image)}<span>${message.label}</span></button>`).join("")}</div>
  </div>`;
}

function parishRequests() {
  return `<div class="pv-heading"><span class="pv-kicker">MI VOZ TAMBIÉN CUENTA</span><h2 id="pv-title" tabindex="-1">Puedo decir lo que necesito</h2><p>Tocá un mensaje. Se lo podés mostrar al adulto que te acompaña.</p></div>
    <div class="pv-request-grid">${parishNeedButtons()}</div>
    <p class="pv-gentle-note">Podemos practicar juntos cualquiera de estos mensajes.</p>`;
}

function parishRecap() {
  return `<div class="pv-recap">
    <div class="pv-recap-photo"><img src="${PARISH_PHOTO}" alt="La parroquia Medalla Milagrosa de Salta" /></div>
    <div><span class="pv-kicker">YA CONOZCO UN POCO MÁS</span><h2 id="pv-title" tabindex="-1">Mi visita a la parroquia</h2>
      <ul class="pv-recap-list"><li>Reconozco la Medalla Milagrosa en la foto.</li><li>Me encuentro con practicantes de Educación Física de la UCASAL.</li><li>Un grupo puede despedirse y dar lugar a otro.</li><li>Puedo pedir un momento, ayuda o una pausa.</li><li>Un adulto me cuenta qué sigue y cuándo termina la visita.</li></ul>
      <button class="btn btn-primary" type="button" data-action="pv-restart">${icon("undo")}Volver a jugar</button>
    </div>
  </div>`;
}

function renderParishVisit() {
  if (!parishVisitState) parishVisitState = createParishVisitState();
  const state = parishVisitState;
  const message = [...PARISH_MESSAGES, ...PARISH_CHANGE_MESSAGES].find(item => item.id === state.message);
  const screens = [parishPlace, parishJourney, parishTeachers, parishChange, parishRequests, parishRecap];
  renderShell(`<section class="pv-screen ${message ? "is-message" : ""}" aria-label="Preparo mi visita a la parroquia">
    <div class="pv-top"><button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button><span>PREPARO MI VISITA</span></div>
    ${message ? `<div class="pv-message-screen" style="--pv-message-color:${message.color}">
      ${parishPicto(message.image)}<h2 id="pv-title" tabindex="-1">${message.title}</h2><p>Se lo muestro al adulto que me acompaña.</p>
      <button class="btn btn-primary" type="button" data-action="pv-message-close">${icon("arrow")}Volver al recorrido</button>
    </div>` : `<nav class="pv-chapters" aria-label="Partes del juego">${PARISH_CHAPTERS.map((label, index) => `<button type="button" data-action="pv-chapter" data-value="${index}" ${state.chapter === index ? 'aria-current="step"' : ""}><span>${index + 1}</span>${label}</button>`).join("")}</nav>
    <div class="pv-content">${screens[state.chapter]()}</div>
    <div class="pv-navigation"><button class="btn btn-ghost" type="button" data-action="pv-back" ${state.chapter === 0 ? "disabled" : ""}>${icon("arrow")}Atrás</button><span>${state.chapter + 1} de ${PARISH_CHAPTERS.length}</span>
      ${state.chapter < PARISH_CHAPTERS.length - 1 ? '<button class="btn btn-primary" type="button" data-action="pv-next">Seguir <span aria-hidden="true">→</span></button>' : '<button class="btn btn-primary" type="button" data-action="supports">Terminar <span aria-hidden="true">✓</span></button>'}
    </div>
    ${state.chapter === 4 ? "" : `<aside class="pv-need-bar" aria-label="Puedo pedir en cualquier momento"><strong>Puedo pedir</strong>${parishNeedButtons(true)}</aside>`}`}
  </section>`);
}

function parishVisitAction(action, target) {
  if (action === "pv-open") {
    if (!parishVisitState) parishVisitState = createParishVisitState();
    parishVisitState.message = null;
    setRoute({ view: "support-parish-visit" });
  } else {
    if (route.view !== "support-parish-visit" || !parishVisitState) return;
    const state = parishVisitState;
    const value = target.dataset.value;
    if (state.message && action !== "pv-message-close") return;
    if (action === "pv-chapter") {
      const chapter = Number(value);
      if (!Number.isInteger(chapter) || chapter < 0 || chapter >= PARISH_CHAPTERS.length) return;
      state.chapter = chapter;
    } else if (action === "pv-next") state.chapter = Math.min(PARISH_CHAPTERS.length - 1, state.chapter + 1);
    else if (action === "pv-back") state.chapter = Math.max(0, state.chapter - 1);
    else if (action === "pv-detail" && state.chapter === 0) {
      if (!PARISH_DETAILS.some(detail => detail.id === value)) return;
      state.detail = value;
      if (!state.discovered.includes(value)) state.discovered.push(value);
    } else if (action === "pv-stop" && state.chapter === 1) {
      const stop = Number(value);
      if (!Number.isInteger(stop) || stop < 0 || stop >= PARISH_STOPS.length) return;
      state.stop = stop;
    } else if (action === "pv-walk" && state.chapter === 1) state.stop = Math.min(PARISH_STOPS.length - 1, state.stop + 1);
    else if (action === "pv-change-next" && state.chapter === 3) state.changeStep = Math.min(PARISH_CHANGES.length - 1, state.changeStep + 1);
    else if (action === "pv-change-back" && state.chapter === 3) state.changeStep = Math.max(0, state.changeStep - 1);
    else if (action === "pv-change-reset" && state.chapter === 3) state.changeStep = 0;
    else if (action === "pv-card" && state.chapter === 2) {
      if (!PARISH_CARDS.some(card => card.id === value)) return;
      state.cards = state.cards.includes(value) ? state.cards.filter(id => id !== value) : [...state.cards, value];
    } else if (action === "pv-message") {
      if (!PARISH_MESSAGES.some(message => message.id === value) && !(state.chapter === 3 && PARISH_CHANGE_MESSAGES.some(message => message.id === value))) return;
      state.message = value;
    } else if (action === "pv-message-close") state.message = null;
    else if (action === "pv-restart") parishVisitState = createParishVisitState();
    else return;
    render();
  }
  // Replacing the screen must not leave keyboard focus on the document body.
  const contentAction = ["pv-detail", "pv-stop", "pv-walk", "pv-card", "pv-change-next", "pv-change-back", "pv-change-reset"].includes(action);
  const selector = contentAction
    ? `[data-action="${action}"]${target.dataset.value ? `[data-value="${target.dataset.value}"]` : ""}`
    : "#pv-title";
  const focusTarget = document.querySelector(selector) || document.querySelector("#pv-title");
  focusTarget?.focus({ preventScroll: !contentAction });
}
