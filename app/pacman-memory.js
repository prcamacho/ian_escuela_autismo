// Memoria visual: cada paso espera a Ian. Sin reloj, audio ni avance automático.
const PM_FRIENDS = [
  { id: "pacman", label: "Pac-Man", color: "#ffda25" },
  { id: "cyan", label: "Fantasma celeste", color: "#24c3eb" },
  { id: "red", label: "Fantasma rojo", color: "#ff4356" },
  { id: "pink", label: "Fantasma rosa", color: "#f5a4c3" },
  { id: "orange", label: "Fantasma naranja", color: "#ff9e30" },
  { id: "blue", label: "Fantasma azul", color: "#297be0" }
];
const PM_LEVELS = [2, 4, 6];
let pmSelectedPairs = 2;
let pmState = null;
let pmAnimation = null;
let pmQuiet = false;

// Dibujos vectoriales inspirados en la referencia, con los personajes de pie.
function pmSprite(id, extraClass = "") {
  const friend = PM_FRIENDS.find(item => item.id === id) || PM_FRIENDS[0];
  const shape = id === "pacman"
    ? '<path class="pm-pac-body" d="M60 60 99 34a47 47 0 1 0 0 52Z" fill="#ffda25"/><circle cx="61" cy="30" r="4" fill="#121a31"/>'
    : `<path d="M25 88V54a35 35 0 0 1 70 0v34q0 9-8 4l-8-6-10 8-10-8-10 8-10-8-7 7q-7 4-7-5Z" fill="${friend.color}"/>${id === "blue"
      ? '<circle cx="47" cy="50" r="5" fill="#fff8df"/><circle cx="73" cy="50" r="5" fill="#fff8df"/><path d="m39 69 8-5 8 5 8-5 8 5 8-5" stroke="#fff8df" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<ellipse cx="47" cy="49" rx="12" ry="15" fill="white"/><ellipse cx="74" cy="49" rx="12" ry="15" fill="white"/><ellipse class="pm-pupil" cx="51" cy="52" rx="6" ry="8" fill="#075cc4"/><ellipse class="pm-pupil" cx="78" cy="52" rx="6" ry="8" fill="#075cc4"/>'}`;
  return `<svg class="pm-sprite ${extraClass}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="58" fill="#121a31"/>${shape}</svg>`;
}

function pmSymbol(name) {
  const paths = {
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    sparkle: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    leaf: '<path d="M19 4C7 3 2 10 6 16s14 3 13-12ZM6 18l8-9"/>',
    check: '<path d="m5 12 4 4L19 6"/>'
  };
  return `<svg class="pm-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`;
}

function pmShuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createPacmanMemoryState(pairs = 2) {
  const safePairs = PM_LEVELS.includes(pairs) ? pairs : 2;
  // Pac-Man está en todas las partidas; los otros amigos van cambiando.
  const friends = [PM_FRIENDS[0], ...pmShuffle(PM_FRIENDS.slice(1)).slice(0, safePairs - 1)];
  return {
    screen: "play", pairs: safePairs, friends: friends.map(friend => friend.id),
    deck: pmShuffle(friends.flatMap(friend => [friend.id, friend.id])),
    selected: [], found: [], mismatch: false, peek: false, paused: false, complete: false
  };
}

function pmChooseCard(state, index) {
  if (!state || state.screen !== "play" || state.paused || state.peek || state.complete || state.mismatch) return null;
  if (!Number.isInteger(index) || index < 0 || index >= state.deck.length || state.selected.includes(index) || state.found.includes(state.deck[index])) return null;
  state.selected.push(index);
  if (state.selected.length === 1) return "first";
  if (state.deck[state.selected[0]] !== state.deck[index]) {
    state.mismatch = true;
    return "different";
  }
  state.found.push(state.deck[index]);
  state.selected = [];
  state.complete = state.found.length === state.pairs;
  return state.complete ? "complete" : "match";
}

function stopPacmanMemoryAnimation() {
  pmAnimation?.revert();
  pmAnimation = null;
}

function leavePacmanMemory() {
  stopPacmanMemoryAnimation();
  if (pmState?.screen === "play" && !pmState.complete) pmState.paused = true;
}

function pmReducedMotion() {
  return pmQuiet || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function pmAnimate(kind, indices = []) {
  stopPacmanMemoryAnimation();
  const root = document.querySelector(".pm-screen");
  if (!root || !window.gsap || pmReducedMotion()) return;
  const gsap = window.gsap;
  pmAnimation = gsap.context(() => {
    if (kind === "enter") {
      gsap.from(".pm-intro-copy, .pm-intro-art, .pm-board-layout", { opacity: 0, y: 14, duration: .45, stagger: .08, clearProps: "all", ease: "power2.out" });
    }
    if (kind === "match" || kind === "complete") {
      // Animar el dibujo, separado del giro CSS de la tarjeta.
      const cards = indices.map(index => root.querySelector(`[data-pm-card="${index}"] .pm-card-front .pm-sprite`)).filter(Boolean);
      gsap.fromTo(cards, { scale: .94 }, { scale: 1, duration: .5, ease: "back.out(2)", clearProps: "transform" });
      const newestFriend = root.querySelector(`[data-pm-friend="${pmState.found.at(-1)}"]`);
      if (newestFriend) gsap.fromTo(newestFriend, { y: 4 }, { y: 0, duration: .4, clearProps: "transform" });
    }
    if (kind === "complete") {
      gsap.from(".pm-win-star", { scale: .3, rotation: -25, opacity: 0, duration: .7, stagger: .07, ease: "back.out(1.6)", clearProps: "all" });
    }
  }, root);
}

function pmIntroArt() {
  return `<div class="pm-intro-art" aria-hidden="true"><div class="pm-orbit pm-orbit-one"></div><div class="pm-orbit pm-orbit-two"></div>
    <span class="pm-art-spark pm-art-spark-one">✦</span><span class="pm-art-spark pm-art-spark-two">✧</span>
    <div class="pm-art-card pm-art-card-back"><span>?</span><i>BUSCÁ MI PAREJA</i></div>
    <div class="pm-art-card pm-art-card-front">${pmSprite("cyan")}<span>¡Somos iguales!</span></div>
    <div class="pm-art-card pm-art-card-twin">${pmSprite("cyan")}</div>
    <div class="pm-art-pac">${pmSprite("pacman")}<span>• • •</span></div>
    <span class="pm-art-note">Dos tarjetas. Un mismo amigo.</span>
  </div>`;
}

function pmIntro() {
  const resumable = pmState?.deck?.length && !pmState.complete;
  return `<div class="pm-intro"><div class="pm-intro-copy"><p class="pm-kicker">UN JUEGO PARA VOS</p>
    <h1 id="pm-title" tabindex="-1">Cada amigo tiene<br>su <em>pareja.</em></h1>
    <p class="pm-description">Mirá, recordá y encontrá los iguales.<br>Pac-Man y sus amigos te esperan.</p>
    <fieldset class="pm-levels"><legend>¿Con cuántas parejas jugamos?</legend><div>${PM_LEVELS.map((pairs, i) => `<button type="button" data-action="pm-level" data-value="${pairs}" aria-pressed="${pmSelectedPairs === pairs}"><strong>${pairs}</strong><span>parejas</span><small>${["Para empezar", "Un poco más", "Todos los amigos"][i]}</small>${pmSelectedPairs === pairs ? '<b aria-hidden="true">✓</b>' : ""}</button>`).join("")}</div></fieldset>
    <div class="pm-start-actions"><button type="button" class="pm-primary" data-action="pm-start">${resumable ? "Empezar una nueva" : "Empezar a jugar"}${pmSymbol("arrow")}</button>${resumable ? '<button type="button" class="pm-text-button" data-action="pm-resume-game">Seguir mi partida</button>' : ""}</div>
    <p class="pm-pace">${pmSymbol("leaf")}A tu ritmo, Ian. Cada descubrimiento cuenta.</p>
  </div>${pmIntroArt()}</div><div class="pm-friends-strip"><span>TUS COMPAÑEROS DE JUEGO</span><div>${PM_FRIENDS.map(friend => `<span title="${friend.label}">${pmSprite(friend.id)}</span>`).join("")}</div><p>Una pareja es el mismo personaje, dos veces.</p></div>`;
}

function pmCardMarkup(friendId, index) {
  return `<button type="button" class="pm-card" data-action="pm-card" data-value="${index}" data-pm-card="${index}">
    <span class="pm-card-content"><span class="pm-card-back" aria-hidden="true"><span class="pm-card-back-orbit"></span><b>?</b><i>DESCUBRÍ</i></span>
    <span class="pm-card-front" aria-hidden="true">${pmSprite(friendId)}<span>${PM_FRIENDS.find(friend => friend.id === friendId).label}</span></span></span>
    <span class="pm-card-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><span class="pm-card-check" aria-hidden="true">✓</span>
  </button>`;
}

function pmBoard() {
  const state = pmState;
  return `<div class="pm-board-layout"><aside class="pm-guide"><p class="pm-kicker">MEMORIA CON AMIGOS</p><h1 id="pm-title" tabindex="-1">Encontrá<br>los iguales<span>.</span></h1>
    <div class="pm-steps"><p><b>1</b><span>Tocá una tarjeta.</span></p><p><b>2</b><span>Buscá su pareja.</span></p></div>
    <div class="pm-progress-label"><span>Mis parejas</span><strong data-pm-count></strong></div>
    <div class="pm-progress-track" role="progressbar" aria-label="Parejas encontradas" aria-valuemin="0" aria-valuemax="${state.pairs}" aria-valuenow="0"><span data-pm-progress></span></div>
    <div class="pm-collection" aria-label="Mis amigos encontrados">${state.friends.map(id => `<span data-pm-friend="${id}" aria-label="${PM_FRIENDS.find(friend => friend.id === id).label}, por encontrar">${pmSprite(id)}</span>`).join("")}</div>
    <div class="pm-guide-tools"><button type="button" class="pm-help" data-action="pm-peek">${pmSymbol("eye")}Mirar las tarjetas</button><button type="button" class="pm-text-button" data-action="pm-setup">Cambiar parejas</button></div>
    <div class="pm-guide-pac" aria-hidden="true">${pmSprite("pacman")}<span>• • •</span></div><p class="pm-guide-note">Podés mirar y volver a intentar<br>todas las veces que quieras.</p>
  </aside><div class="pm-play-area"><div class="pm-board-top"><span><i></i> TU TABLERO</span><span>${state.pairs * 2} tarjetas · ${state.pairs} parejas</span></div>
    <div class="pm-board-wrap"><div class="pm-grid pm-grid-${state.pairs}" role="group" aria-label="Tarjetas de memoria">${state.deck.map(pmCardMarkup).join("")}</div>
    <div class="pm-pause-panel" hidden><span>${pmSymbol("leaf")}</span><h2>Una pausa</h2><p>Seguimos cuando quieras.</p><button type="button" class="pm-primary" data-action="pm-unpause">Seguir jugando${pmSymbol("arrow")}</button></div></div>
    <div class="pm-feedback"><div class="pm-feedback-copy"><span class="pm-feedback-icon" aria-hidden="true">${pmSymbol("sparkle")}</span><p role="status" aria-live="polite" aria-atomic="true" data-pm-status></p></div><button type="button" class="pm-primary pm-continue" data-action="pm-continue" hidden>Seguir buscando${pmSymbol("arrow")}</button><button type="button" class="pm-primary pm-hide" data-action="pm-hide" hidden>Ya las miré${pmSymbol("check")}</button></div>
    <div class="pm-win" hidden><div class="pm-win-stars" aria-hidden="true"><span class="pm-win-star">✦</span><span class="pm-win-star">✦</span><span class="pm-win-star">✦</span></div><h2>¡Encontraste a todos!</h2><p>Cada amigo ya tiene su pareja.</p><div><button type="button" class="pm-primary" data-action="pm-again">Volver a jugar${pmSymbol("arrow")}</button><button type="button" class="pm-text-button" data-action="pm-setup">Elegir otras parejas</button></div></div>
  </div></div>`;
}

function pmFocus(selector) {
  document.querySelector(selector)?.focus({ preventScroll: true });
}

function renderPacmanMemory(focusTitle = false) {
  stopPacmanMemoryAnimation();
  if (!pmState) pmState = { screen: "setup" };
  renderShell(`<section class="pm-screen ${pmQuiet ? "pm-quiet" : ""}" aria-label="Memoria con amigos">
    <header class="pm-header"><button type="button" class="pm-back" data-action="supports">${icon("arrow")}Mis apoyos</button><span class="pm-brand">${pmSprite("pacman")}MEMORIA <i>con amigos</i></span>
    <div class="pm-header-tools"><button type="button" class="pm-calm" data-action="pm-motion" aria-pressed="${pmQuiet}">${pmSymbol("leaf")}Menos movimiento</button>${pmState.screen === "play" && !pmState.complete ? `<button type="button" class="pm-pause-button" data-action="pm-pause" ${pmState.paused ? "disabled" : ""}>${pmSymbol("pause")}Pausa</button>` : ""}</div></header>
    ${pmState.screen === "play" ? pmBoard() : pmIntro()}<footer class="pm-footer"><span>PEQUEÑOS DESCUBRIMIENTOS, GRANDES SONRISAS.</span><span>${pmSymbol("leaf")}Sin reloj · A tu ritmo</span></footer>
  </section>`);
  if (pmState.screen === "play") pmUpdateBoard();
  if (focusTitle) {
    window.scrollTo({ top: 0, behavior: "instant" });
    pmFocus(pmState.paused ? '[data-action="pm-unpause"]' : "#pm-title");
  }
  pmAnimate("enter");
}

function pmUpdateBoard() {
  const state = pmState;
  const root = document.querySelector(".pm-screen");
  if (!root || state.screen !== "play") return;
  root.classList.toggle("pm-is-paused", state.paused);
  root.classList.toggle("pm-is-complete", state.complete);
  root.querySelectorAll("[data-pm-card]").forEach(card => {
    const index = Number(card.dataset.pmCard), id = state.deck[index];
    const found = state.found.includes(id);
    const open = found || state.peek || state.selected.includes(index);
    card.classList.toggle("is-open", open);
    card.classList.toggle("is-found", found);
    card.classList.toggle("is-different", state.mismatch && state.selected.includes(index));
    // aria-disabled conserva el foco al dar vuelta la tarjeta con el teclado.
    card.setAttribute("aria-disabled", String(found || state.paused || state.peek || state.mismatch || state.selected.includes(index) || state.complete));
    card.setAttribute("aria-pressed", String(open));
    card.setAttribute("aria-label", `Tarjeta ${index + 1}: ${state.paused ? "en pausa" : open ? PM_FRIENDS.find(friend => friend.id === id).label + (found ? ", pareja encontrada" : "") : "boca abajo. Tocar para descubrir"}`);
    card.tabIndex = found || state.paused || state.peek || state.mismatch || state.complete ? -1 : 0;
  });
  root.querySelector("[data-pm-count]").textContent = `${state.found.length} / ${state.pairs}`;
  root.querySelector("[data-pm-progress]").style.width = `${state.found.length / state.pairs * 100}%`;
  root.querySelector('[role="progressbar"]').setAttribute("aria-valuenow", String(state.found.length));
  root.querySelectorAll("[data-pm-friend]").forEach(friend => {
    const found = state.found.includes(friend.dataset.pmFriend);
    friend.classList.toggle("is-found", found);
    friend.setAttribute("aria-label", `${PM_FRIENDS.find(item => item.id === friend.dataset.pmFriend).label}, ${found ? "encontrado" : "por encontrar"}`);
  });
  const status = state.paused ? "Tu partida te espera." : state.complete ? `¡Lo lograste, Ian! Encontraste ${state.pairs} parejas.` : state.peek ? "Mirá dónde está cada amigo. Cuando quieras, tocá «Ya las miré»." : state.mismatch ? "Son diferentes. Miralas y después seguimos." : state.selected.length ? "Ahora buscá el mismo amigo en otra tarjeta." : state.found.length ? "¡Una pareja más! Busquemos las que faltan." : "Tocá una tarjeta para descubrir a un amigo.";
  const live = root.querySelector("[data-pm-status]");
  if (live.textContent !== status) live.textContent = status;
  root.querySelector('[data-action="pm-continue"]').hidden = !state.mismatch || state.paused;
  root.querySelector('[data-action="pm-hide"]').hidden = !state.peek || state.paused;
  root.querySelector('[data-action="pm-peek"]').disabled = state.paused || state.complete || state.peek || state.selected.length > 0 || state.mismatch;
  const pause = root.querySelector('[data-action="pm-pause"]');
  if (pause) { pause.disabled = state.paused; pause.hidden = state.complete; }
  root.querySelector(".pm-pause-panel").hidden = !state.paused;
  root.querySelector(".pm-grid").setAttribute("aria-hidden", String(state.paused));
  root.querySelector(".pm-win").hidden = !state.complete;
}

function pacmanMemoryAction(action, target) {
  if (action === "pm-open") {
    setRoute({ view: "support-memory" });
    pmFocus(pmState?.paused ? '[data-action="pm-unpause"]' : "#pm-title");
    return;
  }
  if (route.view !== "support-memory" || !pmState) return;
  if (action === "pm-motion") {
    pmQuiet = !pmQuiet;
    stopPacmanMemoryAnimation();
    const root = document.querySelector(".pm-screen");
    root?.classList.toggle("pm-quiet", pmQuiet);
    target.setAttribute("aria-pressed", String(pmQuiet));
    return;
  }
  if (action === "pm-level" && pmState.screen === "setup") {
    const pairs = Number(target.dataset.value);
    if (!PM_LEVELS.includes(pairs)) return;
    pmSelectedPairs = pairs;
    renderPacmanMemory();
    pmFocus(`[data-action="pm-level"][data-value="${pairs}"]`);
    return;
  }
  if ((action === "pm-start" && pmState.screen === "setup") || (action === "pm-again" && pmState.complete)) {
    if (action === "pm-again") pmSelectedPairs = pmState.pairs;
    pmState = createPacmanMemoryState(pmSelectedPairs);
    renderPacmanMemory(true);
    return;
  }
  if (action === "pm-resume-game" && pmState.screen === "setup" && pmState.deck?.length && !pmState.complete) {
    pmState.screen = "play";
    pmState.paused = false;
    renderPacmanMemory(true);
    return;
  }
  if (pmState.screen !== "play") return;
  if (action === "pm-setup") {
    pmState.screen = "setup";
    pmSelectedPairs = pmState.pairs;
    renderPacmanMemory(true);
  } else if (action === "pm-pause" && !pmState.complete) {
    stopPacmanMemoryAnimation();
    pmState.paused = true;
    pmUpdateBoard();
    pmFocus('[data-action="pm-unpause"]');
  } else if (action === "pm-unpause" && pmState.paused) {
    pmState.paused = false;
    pmUpdateBoard();
    pmFocus(pmState.peek ? '[data-action="pm-hide"]' : pmState.mismatch ? '[data-action="pm-continue"]' : '.pm-card[aria-disabled="false"]');
  } else if (!pmState.paused && !pmState.complete) {
    if (action === "pm-card") {
      const indices = [...pmState.selected, Number(target.dataset.value)];
      const outcome = pmChooseCard(pmState, Number(target.dataset.value));
      if (!outcome) return;
      pmUpdateBoard();
      pmAnimate(outcome, indices);
      if (outcome === "different") pmFocus('[data-action="pm-continue"]');
      if (outcome === "match") pmFocus('.pm-card[aria-disabled="false"]');
      if (outcome === "complete") {
        pmFocus('[data-action="pm-again"]');
        document.querySelector(".pm-win")?.scrollIntoView({ block: "nearest", behavior: pmReducedMotion() ? "instant" : "smooth" });
      }
    } else if (action === "pm-continue" && pmState.mismatch) {
      const first = pmState.selected[0];
      pmState.selected = [];
      pmState.mismatch = false;
      pmUpdateBoard();
      pmFocus(`[data-pm-card="${first}"]`);
    } else if (action === "pm-peek" && !pmState.peek && !pmState.selected.length && !pmState.mismatch) {
      pmState.peek = true;
      pmUpdateBoard();
      pmFocus('[data-action="pm-hide"]');
    } else if (action === "pm-hide" && pmState.peek) {
      pmState.peek = false;
      pmUpdateBoard();
      pmFocus('.pm-card[aria-disabled="false"]');
    }
  }
}
