// A concrete-to-diagram sequence. Exploration and practice have separate states;
// every animation is finite, cancellable and optional under reduced motion.
const EARTH_PARTS = {
  crust: { name: "Corteza", position: "La capa de afuera", text: "Es una capa fina de roca. Vivimos sobre ella.", extra: "Debajo del océano también hay corteza.", color: "#a86a38", point: [344, 119] },
  mantle: { name: "Manto", position: "Debajo de la corteza", text: "Es una capa muy gruesa de roca caliente.", extra: "Rodea al núcleo.", color: "#ee9b45", point: [363, 259] },
  core: { name: "Núcleo", position: "En el centro", text: "Es la parte central de la Tierra. Está formada principalmente por metales.", extra: "Tiene una parte externa y otra interna.", color: "#eb6d40", point: [283, 240] },
  outer: { name: "Núcleo externo", position: "Alrededor del núcleo interno", text: "Es la parte del núcleo que está alrededor. Sus metales están líquidos.", extra: "Está entre el manto y el núcleo interno.", color: "#eb6d40", point: [306, 202] },
  inner: { name: "Núcleo interno", position: "En el centro del núcleo", text: "Es la parte más interna. Sus metales están sólidos.", extra: "El núcleo externo lo rodea.", color: "#ffd151", point: [273, 250] }
};
let earthTimeline = null;

function createEarthPractice() {
  return [
    { id: "home", kind: "place", prompt: "¿Dónde va la casa?", support: "Tocá un lugar del modelo. Después comprobá.", sites: shuffled(["surface", "mantle", "inner"]), correct: "surface", explanation: "La casa va en la superficie. Vivimos sobre la corteza." },
    { id: "crust", kind: "name", prompt: "¿Cómo se llama la capa señalada?", focus: "crust", options: shuffled(["crust", "mantle", "core"]), correct: "crust", explanation: "Es la corteza: la capa fina de roca de afuera." },
    { id: "mantle", kind: "locate", prompt: "Señalá el manto", sites: shuffled(["crust", "mantle", "core"]), correct: "mantle", explanation: "El manto es la capa gruesa que está debajo de la corteza." },
    { id: "core", kind: "name", prompt: "¿Cómo se llama la parte del centro?", focus: "core", flat: true, options: shuffled(["crust", "mantle", "core"]), correct: "core", explanation: "Es el núcleo. Está en el centro de la Tierra." },
    { id: "outer", kind: "locate", prompt: "Señalá el núcleo externo", split: true, flat: true, sites: shuffled(["crust", "mantle", "outer", "inner"]), correct: "outer", explanation: "El núcleo externo rodea al núcleo interno." },
    { id: "inner", kind: "name", prompt: "¿Cómo se llama la parte señalada?", focus: "inner", split: true, flat: true, options: shuffled(["mantle", "outer", "inner"]), correct: "inner", explanation: "Es el núcleo interno. Está en el centro del núcleo." }
  ];
}

function createEarthState() {
  return { stage: 0, surface: false, open: false, hasOpened: false, split: false,
    layer: "crust", visited: ["crust"], busy: false, practice: createEarthPractice(),
    practiceIndex: 0, choice: null, checked: false, reviewing: false, finished: false, scene: "" };
}

function earthCurrent() {
  return route.view === "run" && session?.exercises?.[session.index]?.type === "earth-layers" ? session.earth : null;
}

function stopEarthAnimation() {
  earthTimeline?.kill();
  earthTimeline = null;
  if (typeof session !== "undefined" && session?.earth) session.earth.busy = false;
}

function earthMotion() {
  return Boolean(window.gsap) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function earthFocus(selector = "#earth-heading") {
  if (selector === "#earth-heading") window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelector(selector)?.focus({ preventScroll: true });
}

function earthAnimate(build, commit, focus = "#earth-heading") {
  const state = earthCurrent();
  if (!state || state.busy) return;
  if (!earthMotion()) { commit(); render(); earthFocus(focus); return; }
  state.busy = true;
  document.querySelectorAll(".earth-runner button:not([data-action='cancel-run'])").forEach((button) => { button.disabled = true; });
  earthTimeline = window.gsap.timeline({ onComplete: () => {
    earthTimeline = null;
    if (earthCurrent() !== state) return;
    state.busy = false;
    commit(); render(); earthFocus(focus);
  } });
  build(earthTimeline);
}

function earthHouseSvg(prefix = "earth-house") {
  return `<g stroke="#294d48" stroke-width="2" stroke-linejoin="round"><defs><linearGradient id="${prefix}-wall" x2=".7" y2="1"><stop stop-color="#fff1a8"/><stop offset="1" stop-color="#f5bf59"/></linearGradient><pattern id="${prefix}-bricks" width="12" height="8" patternUnits="userSpaceOnUse"><path d="M0 0H12M0 4H12M6 0V4M0 4V8M12 4V8" fill="none" stroke="#c48d39" stroke-width=".5" opacity=".42"/></pattern></defs><path d="M-22-28H22V0H-22Z" fill="url(#${prefix}-wall)"/><path d="M-22-28H22V0H-22Z" fill="url(#${prefix}-bricks)" stroke="none"/><path d="M11-44V-55H18V-37" fill="#d65b45"/><path d="m-28-28 28-23 28 23Z" fill="#e86c48"/><path d="M-13-40H13M-20-34H20" stroke="#ac4636" stroke-width="1"/><path d="M-5 0V-17H7V0" fill="#258d9b"/><circle cx="3" cy="-8" r="1.1" fill="#ffe59b" stroke="none"/><path d="M-16-20h7v8h-7Zm28 0h7v8h-7Z" fill="#8ce3f4"/><path d="m-15-19 5 5m23-5 5 5" stroke="#e5fcff" stroke-width="1.3"/></g>`;
}

function earthNeighborhood() {
  return `<g class="earth-neighborhood" transform="translate(250 87) scale(.67)">
    <ellipse cx="0" cy="5" rx="132" ry="13" fill="url(#earth-land)"/><ellipse cx="0" cy="5" rx="132" ry="13" fill="url(#earth-grass-texture)"/>
    <g transform="translate(-62 0)" stroke="#294d48" stroke-width="2" stroke-linejoin="round"><path d="M-34-43H34V0H-34Z" fill="#ffe6a0"/><path d="M-34-14H34M-34-8H34" stroke="#dcad62" stroke-width=".7"/><path d="m-41-43 41-20 41 20Z" fill="#398ec3"/><path d="M-25-49H25M-13-55H13" stroke="#b2e4f9" stroke-width="1"/><path d="M-7 0V-23H7V0" fill="#258d9b"/><path d="M-26-32h10v12h-10Zm42 0h10v12H16Z" fill="#8ce3f4"/><path d="M0-63V-85M0-85h23v13H0" fill="#f49065"/></g>
    <g transform="translate(40 0)">${earthHouseSvg()}</g>
    <g stroke="#805735" stroke-width="3"><path d="M92 0V-44M-115 0V-31"/><path d="M77-25Q62-45 84-50Q77-70 97-70Q115-70 113-51Q130-32 109-24Z" fill="url(#earth-leaves)" stroke="#407944"/><circle cx="-115" cy="-42" r="17" fill="url(#earth-leaves)" stroke="#407944"/><path d="M82-36l5-4M100-57l4-2M-120-46l4-3M-108-40l3-2" stroke="#d2ed93" stroke-width="2"/></g>
    <g transform="translate(-4 0)" stroke="#294d48" stroke-width="3" stroke-linecap="round"><circle cx="0" cy="-24" r="5" fill="#f0b680"/><path d="M0-17V-7m-6-6h12M0-7-5 0M0-7l5 7"/><path d="M-4-16h8v9h-8Z" fill="#f17b45"/></g>
  </g>`;
}

function earthCirclePath(radius) {
  return `M${250 + radius} 240a${radius} ${radius} 0 1 0 ${-2 * radius} 0a${radius} ${radius} 0 1 0 ${2 * radius} 0Z`;
}

function earthLayerPath(outer, inner = 0) {
  return earthCirclePath(outer) + (inner ? earthCirclePath(inner) : "");
}

function earthPoint(id, flat = false) {
  // A circular diagram offers space on both sides. Spread the touch targets
  // across it so 46px buttons remain separate even on a narrow screen.
  const flatPoints = { crust: [250, 90], mantle: [145, 255], core: [250, 240], outer: [310, 207], inner: [239, 257] };
  return id === "surface" ? [250, 86] : flat ? flatPoints[id] : EARTH_PARTS[id]?.point;
}

function earthMaterialDefs() {
  return `<radialGradient id="earth-ocean" cx="28%" cy="24%" r="85%"><stop stop-color="#76e5f6"/><stop offset=".58" stop-color="#219edb"/><stop offset="1" stop-color="#1460ab"/></radialGradient>
    <linearGradient id="earth-land" x2=".5" y2="1"><stop stop-color="#b8e16b"/><stop offset=".55" stop-color="#79bf4b"/><stop offset="1" stop-color="#4e923d"/></linearGradient>
    <radialGradient id="earth-leaves" cx="30%" cy="25%" r="80%"><stop stop-color="#b9dd63"/><stop offset=".55" stop-color="#6eaf46"/><stop offset="1" stop-color="#398447"/></radialGradient>
    <radialGradient id="earth-sphere-light" cx="25%" cy="20%" r="90%"><stop stop-color="#fff" stop-opacity=".2"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#174571" stop-opacity=".18"/></radialGradient>
    <radialGradient id="earth-crust-fill" cx="35%" cy="25%" r="85%"><stop stop-color="#d3a15b"/><stop offset="1" stop-color="#92532d"/></radialGradient>
    <radialGradient id="earth-mantle-fill" cx="40%" cy="30%" r="80%"><stop stop-color="#ffd58a"/><stop offset=".6" stop-color="#f3aa50"/><stop offset="1" stop-color="#d78032"/></radialGradient>
    <radialGradient id="earth-core-fill" cx="35%" cy="30%" r="85%"><stop stop-color="#ffb266"/><stop offset=".55" stop-color="#ef8050"/><stop offset="1" stop-color="#d95437"/></radialGradient>
    <radialGradient id="earth-inner-fill" cx="30%" cy="25%" r="85%"><stop stop-color="#fff6bf"/><stop offset=".45" stop-color="#ffdc65"/><stop offset="1" stop-color="#eab03b"/></radialGradient>
    <pattern id="earth-water-texture" width="30" height="20" patternUnits="userSpaceOnUse"><path d="M-5 7q5-4 10 0t10 0t10 0t10 0M10 17q5-3 10 0t10 0" fill="none" stroke="#d9faff" stroke-width=".8" opacity=".26"/></pattern>
    <pattern id="earth-grass-texture" width="22" height="19" patternUnits="userSpaceOnUse"><path d="m4 12 1-4 2 4m8 4 1-3 2 3" fill="none" stroke="#397e3f" stroke-width=".7" opacity=".32"/><circle cx="13" cy="5" r="1.1" fill="#e1f19a" opacity=".65"/></pattern>
    <pattern id="earth-stone-texture" width="19" height="16" patternUnits="userSpaceOnUse"><path d="m2 4 5-2 4 5-4 5-6-2Zm12 7 4-1 2 5-5 2Z" fill="#734627" fill-opacity=".25" stroke="#fce5ab" stroke-opacity=".35" stroke-width=".6"/></pattern>
    <pattern id="earth-mineral-texture" width="25" height="22" patternUnits="userSpaceOnUse"><path d="m2 7 5-4 6 3-2 6-7 1Zm13 11 4-5 5 3-1 4Z" fill="#b76b32" opacity=".16"/><path d="m3 6 4-2 4 2" fill="none" stroke="#fff1c4" stroke-width="1" opacity=".65"/><circle cx="18" cy="5" r="1.2" fill="#fff0bd" opacity=".7"/></pattern>
    <pattern id="earth-liquid-texture" width="36" height="28" patternUnits="userSpaceOnUse"><path d="M-6 8C2-1 10 17 20 7S32 6 43 11M1 23c9-9 15 8 29-1" fill="none" stroke="#fff1b8" stroke-width="1" opacity=".3"/></pattern>
    <pattern id="earth-metal-texture" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)"><path d="M0 3H13M0 6H13" stroke="#fff9d4" stroke-width=".65" opacity=".45"/><path d="M0 11H13" stroke="#c68c27" stroke-width=".5" opacity=".2"/></pattern>`;
}

function earthModel({ open = false, near = false, split = false, focus = "", flat = false, neighborhood = false, house = false } = {}) {
  const materials = { crust: ["crust", "stone"], mantle: ["mantle", "mineral"], core: ["core", "metal"], outer: ["core", "liquid"], inner: ["inner", "metal"] };
  const layers = [["crust", 154, 145], ["mantle", 145, 84], ...(split ? [["outer", 84, 44], ["inner", 44, 0]] : [["core", 84, 0]])];
  const continents = '<path d="M119 149C154 88 268 57 332 112Q352 133 319 142Q296 147 276 137Q255 126 239 140Q222 155 198 149Q178 140 160 158Q142 176 125 169Z"/><path d="M124 157Q152 130 178 147Q200 160 219 159Q236 174 219 188L194 186Q180 197 177 216L155 209Q140 187 125 181Z"/><path d="M167 216Q190 204 214 229Q229 250 208 269Q193 280 194 299Q184 325 170 341Q158 327 158 305Q164 281 151 263Q141 238 167 216Z"/><path d="M275 113Q307 99 338 122Q367 137 351 156L324 149Q310 151 302 171L278 163Q267 145 275 113Z"/><path d="M290 190Q315 172 341 189Q364 202 380 229L356 244Q351 276 328 294Q312 279 311 258L291 239Q303 220 281 210Z"/><path d="M332 319Q355 306 376 321L368 341Q347 347 331 336Z"/>';
  const terrain = `<circle cx="250" cy="240" r="154" fill="url(#earth-ocean)"/><circle cx="250" cy="240" r="154" fill="url(#earth-water-texture)"/><g fill="url(#earth-land)" stroke="#397c4b" stroke-opacity=".25" stroke-width=".8">${continents}</g><g fill="url(#earth-grass-texture)">${continents}</g><circle cx="250" cy="240" r="154" fill="url(#earth-sphere-light)"/>`;
  const pointer = focus && EARTH_PARTS[focus] ? earthPoint(focus, flat) : null;
  return `<svg class="earth-model" viewBox="0 0 500 440" role="img" aria-label="${near ? "Casas, una escuela y una persona sobre el suelo" : flat ? "Diagrama de las capas de la Tierra" : open ? "Modelo de la Tierra abierto para mostrar su interior" : "Modelo de la Tierra visto desde afuera"}${focus ? ", con una parte señalada" : ""}">
    <defs>${earthMaterialDefs()}<clipPath id="earth-world-clip"><circle cx="250" cy="240" r="154"/></clipPath><clipPath id="earth-half-clip"><path d="M250 80H440V405H250Z"/></clipPath><clipPath id="earth-shell-clip"><rect class="earth-shell-clip-rect" x="${open ? 404 : 250}" y="85" width="155" height="310"/></clipPath></defs>
    <g class="earth-camera" transform="${near ? "translate(-500 45) scale(3)" : "translate(0 0) scale(1)"}">
      <ellipse class="earth-ground-shadow" cx="250" cy="410" rx="115" ry="10" fill="#355d4a" opacity=".08"/>
      ${flat ? "" : `<circle cx="250" cy="240" r="165" fill="#bfebf4" opacity=".7"/><g clip-path="url(#earth-world-clip)">${terrain}</g>`}
      <g ${flat ? "" : 'clip-path="url(#earth-half-clip)"'}>
        <circle cx="250" cy="240" r="154" fill="#f8f4e9"/>
        ${layers.map(([id, outer, inner]) => `<g class="earth-layer" data-layer="${id}" opacity="${focus && focus !== id ? ".68" : "1"}"><path d="${earthLayerPath(outer, inner)}" fill="url(#earth-${materials[id][0]}-fill)" fill-rule="evenodd"/><path d="${earthLayerPath(outer, inner)}" fill="url(#earth-${materials[id][1]}-texture)" fill-rule="evenodd"/><path d="${earthLayerPath(outer, inner)}" fill="none" fill-rule="evenodd" stroke="${focus === id ? "#fff3ce" : "#81552c"}" stroke-opacity="${focus === id ? "1" : ".5"}" stroke-width="${focus === id ? "2.2" : "1"}"/></g>`).join("")}
      </g>
      ${flat ? "" : `<g class="earth-shell" clip-path="url(#earth-shell-clip)" opacity="${open ? "0" : "1"}">${terrain}</g><path class="earth-cut-line" d="M250 86V394" fill="none" stroke="#fff4dc" stroke-width="2" opacity="${open ? "1" : "0"}"/>`}
      <circle cx="250" cy="240" r="154" fill="none" stroke="#395e58" stroke-width="2"/>
      ${neighborhood ? earthNeighborhood() : ""}
      ${house ? `<g class="earth-answer-house" transform="translate(250 85) scale(.8)">${earthHouseSvg()}</g>` : ""}
      ${pointer ? `<g class="earth-pointer" transform="translate(${pointer[0]} ${pointer[1]})"><circle r="12" fill="#fffdf6" stroke="#294d48" stroke-width="2"/><circle r="4" fill="#294d48"/></g>` : ""}
    </g>
  </svg>`;
}

function earthCanPractice(state) {
  return ["crust", "mantle", "core", "outer", "inner"].every((id) => state.visited.includes(id));
}

function earthButton(action, text, { secondary = false, disabled = false, value = "" } = {}) {
  return `<button type="button" class="earth-button ${secondary ? "earth-button-secondary" : ""}" data-action="${action}" ${value ? `data-value="${value}"` : ""} ${disabled ? "disabled" : ""}>${text}</button>`;
}

function earthTrail(stage) {
  return `<ol class="earth-trail" aria-label="Pasos del recorrido">${["Superficie", "Por dentro", "Las capas", "Practicar"].map((label, index) => `<li class="${index === stage ? "is-current" : index < stage ? "is-done" : ""}" ${index === stage ? 'aria-current="step"' : ""}><span>${index < stage ? "✓" : index + 1}</span><b>${label}</b></li>`).join("")}</ol>`;
}

function earthGuide(message) {
  return `<div class="earth-guide"><div class="earth-guide-player" aria-hidden="true">${pacmanVerbSprite()}<span class="earth-guide-dots"><i></i><i></i><i></i></span></div><p>${message}</p></div>`;
}

function renderEarthRunner() {
  const state = earthCurrent();
  if (!state) return;
  let title, intro, visual, panel, footer;
  if (state.finished) return renderEarthFinish(state);
  if (state.stage === 0) {
    title = state.surface ? "Vivimos en la superficie" : "El suelo donde vivimos";
    intro = state.surface ? "La superficie es la parte de afuera de la Tierra." : "Las casas, la escuela y las personas están sobre el suelo.";
    visual = earthModel({ near: !state.surface, neighborhood: true });
    panel = `<span class="earth-card-kicker">${state.surface ? "EL PLANETA ENTERO" : "UN LUGAR CONOCIDO"}</span><h3>${state.surface ? "Todo esto está en la Tierra" : "Acá vivimos"}</h3><p>${state.surface ? "Este modelo representa nuestro planeta. Las casas se ven pequeñas porque la Tierra es enorme." : "El suelo que pisamos es parte de la superficie de la Tierra."}</p>${earthButton(state.surface ? "earth-near" : "earth-zoom", state.surface ? "Volver a ver de cerca" : "Ver el planeta ↗", { secondary: true })}`;
    footer = earthButton("earth-next", "Mirar por dentro →", { disabled: !state.surface });
  } else if (state.stage === 1) {
    title = "La Tierra también tiene un interior";
    intro = state.open ? "Es el mismo modelo. Ahora vemos sus partes de adentro." : "Desde afuera no podemos ver lo que hay adentro.";
    visual = earthModel({ open: state.open, neighborhood: true });
    panel = `<span class="earth-card-kicker">ENTERO Y ABIERTO</span><h3>${state.open ? "Miramos por dentro" : "Abrimos el modelo"}</h3><p>El corte del modelo nos ayuda a mostrar el interior de la Tierra.</p>${earthButton("earth-toggle", state.open ? "Cerrar el modelo" : "Abrir el modelo", { secondary: true })}<p class="earth-small">Podés abrirlo y cerrarlo las veces que quieras.</p>`;
    footer = earthButton("earth-next", "Descubrir las capas →", { disabled: !state.hasOpened });
  } else if (state.stage === 2) {
    title = "Cada parte tiene un nombre";
    intro = "Tocá un nombre y mirá su lugar en el modelo.";
    const ids = state.split ? ["crust", "mantle", "outer", "inner"] : ["crust", "mantle", "core"];
    const part = EARTH_PARTS[state.layer];
    visual = earthModel({ open: true, split: state.split, focus: state.layer });
    panel = `<div class="earth-layer-buttons" role="group" aria-label="Explorar las capas">${ids.map((id) => `<button type="button" class="earth-layer-button ${state.layer === id ? "is-selected" : ""}" data-action="earth-layer" data-value="${id}" aria-pressed="${state.layer === id}"><i style="--layer-color:${EARTH_PARTS[id].color}" aria-hidden="true"></i><span>${EARTH_PARTS[id].name}</span><small aria-label="${state.visited.includes(id) ? "Explorada" : "Por explorar"}">${state.visited.includes(id) ? "✓" : "○"}</small></button>`).join("")}</div><div class="earth-part-copy" aria-live="polite"><span class="earth-card-kicker">${part.position}</span><h3>${part.name}</h3><p>${part.text}</p><p class="earth-small">${part.extra}</p></div>${!state.split && ["crust", "mantle", "core"].every((id) => state.visited.includes(id)) ? earthButton("earth-split", "Ver las dos partes del núcleo", { secondary: true }) : ""}`;
    footer = earthButton(state.reviewing ? "earth-resume" : "earth-next", state.reviewing ? "Volver a mi desafío →" : "Practicar con Pac-Man →", { disabled: !state.reviewing && !earthCanPractice(state) });
  } else {
    const card = state.practice[state.practiceIndex];
    title = card.prompt;
    intro = card.support || (card.kind === "name" ? "Elegí un nombre. Después comprobá." : "Tocá un lugar del modelo. Después comprobá.");
    const marked = state.checked ? card.correct === "surface" ? "" : card.correct : card.focus || "";
    visual = earthModel({ open: true, split: card.split, flat: card.flat, focus: marked, house: card.kind === "place" && state.checked });
    if (card.sites && !(card.kind === "place" && state.checked)) visual += `<div class="earth-hotspots" role="group" aria-label="Lugares del modelo">${card.sites.map((id, index) => {
      const point = earthPoint(id, card.flat);
      return `<button type="button" class="earth-hotspot ${state.choice === id ? "is-selected" : ""} ${state.checked && id === card.correct ? "is-right" : ""}" style="left:${point[0] / 5}%;top:${point[1] / 4.4}%" data-action="earth-choice" data-value="${id}" aria-label="Elegir lugar ${index + 1}" aria-pressed="${state.choice === id}" ${state.checked ? "disabled" : ""}>${index + 1}</button>`;
    }).join("")}</div>`;
    panel = `<span class="earth-card-kicker">DESAFÍO ${state.practiceIndex + 1} DE ${state.practice.length}</span><div class="earth-practice-content">${card.kind === "place" ? `<div class="earth-house-token"><svg viewBox="-40 -60 80 70" aria-hidden="true">${earthHouseSvg("earth-token-house")}</svg><span>Una casa</span></div>` : card.kind === "locate" ? "<h3>Buscá su lugar</h3>" : ""}${card.options ? `<div class="earth-choices" role="group" aria-label="Nombres de las capas">${card.options.map((id) => `<button type="button" class="earth-choice ${state.choice === id ? "is-selected" : ""} ${state.checked && id === card.correct ? "is-right" : ""}" data-action="earth-choice" data-value="${id}" aria-pressed="${state.choice === id}" ${state.checked ? "disabled" : ""}>${EARTH_PARTS[id].name}</button>`).join("")}</div>` : '<p>Elegí uno de los lugares numerados.</p>'}</div><div id="earth-feedback" class="earth-feedback ${state.checked ? state.choice === card.correct ? "is-right" : "is-review" : ""}" role="status" tabindex="-1">${state.checked ? `<strong>${state.choice === card.correct ? "¡Lo descubriste!" : "Miremos juntos"}</strong><p>${card.explanation}</p>` : state.choice === null ? "Podés tomarte tu tiempo." : "Podés cambiar tu elección antes de comprobar."}</div>`;
    footer = state.checked ? earthButton("earth-practice-next", state.practiceIndex + 1 === state.practice.length ? "Ver mi recorrido →" : "Siguiente desafío →") : earthButton("earth-check", "Comprobar ✓", { disabled: state.choice === null });
  }
  const guide = state.stage === 0 ? "Estamos descubriendo el lugar donde vivimos." : state.stage === 1 ? "El modelo puede mostrarnos lo que hay adentro." : state.stage === 2 ? "Mirá dónde está cada parte." : "Te acompaño. Elegí a tu ritmo.";
  renderShell(`<section class="earth-runner"><header class="earth-header"><button class="earth-exit" type="button" data-action="cancel-run">${icon("arrow")}Cs Naturales</button><span>DESCUBRIMOS CON PAC-MAN</span><span class="earth-header-mark" aria-hidden="true">●</span></header>${earthTrail(state.stage)}<div class="earth-title"><span class="earth-eyebrow">LA TIERRA · DONDE VIVIMOS</span><h2 id="earth-heading" tabindex="-1">${title}</h2><p>${intro}</p></div><div class="earth-workspace"><div class="earth-visual-card"><div class="earth-visual ${state.stage === 0 && !state.surface ? "is-near" : ""}">${visual}</div><span class="earth-model-note">${state.stage === 0 && !state.surface ? "EL SUELO QUE PISAMOS" : state.stage === 3 && state.practice[state.practiceIndex].flat ? "EL MISMO PLANETA · OTRA VISTA" : "MODELO PARA APRENDER"}</span></div><article class="earth-info ${state.stage === 3 ? "earth-practice-info" : ""}">${panel}</article></div><footer class="earth-footer"><div class="earth-footer-start">${earthGuide(guide)}${state.stage === 3 ? earthButton("earth-review", "Volver a explorar", { secondary: true }) : state.stage > 0 ? earthButton("earth-back", "← Atrás", { secondary: true }) : ""}</div>${footer}</footer></section>`);
  const scene = `${state.stage}:${state.stage === 3 ? state.practiceIndex : ""}`;
  if (state.scene !== scene) {
    state.scene = scene;
    earthFocus();
    if (earthMotion()) {
    earthTimeline = window.gsap.timeline({ onComplete: () => { earthTimeline = null; } })
      .from(".earth-visual-card", { opacity: 0, y: 12, duration: .55, ease: "power2.out", clearProps: "all" })
      .from(".earth-info > *", { opacity: 0, y: 9, duration: .4, stagger: .055, ease: "power2.out", clearProps: "all" }, .12);
    }
  }
}

function renderEarthFinish(state) {
  const review = session.answers.filter((answer) => !answer.isCorrect);
  renderShell(`<section class="earth-runner earth-finish"><header class="earth-header"><button class="earth-exit" type="button" data-action="cancel-run">${icon("arrow")}Cs Naturales</button><span>RECORRIDO TERMINADO</span></header>${earthTrail(4)}<div class="earth-finish-layout"><div class="earth-finish-art">${earthModel({ open: true, split: true, neighborhood: true })}<div class="earth-finish-player">${pacmanVerbSprite()}</div></div><article><span class="earth-eyebrow">EXPLORASTE LA TIERRA</span><h2 id="earth-heading" tabindex="-1">¡Recorrido completo!</h2><p>Vivimos en la superficie. Debajo de la corteza están el manto y el núcleo.</p><div class="earth-finish-parts">${["crust", "mantle", "outer", "inner"].map((id) => `<span><i style="--layer-color:${EARTH_PARTS[id].color}"></i>${EARTH_PARTS[id].name}</span>`).join("")}</div><p class="earth-small">Reconociste ${session.score} de ${state.practice.length} respuestas al comprobar.${review.length ? " Podés volver a explorar y seguir practicando." : " ¡Relacionaste las partes en distintos dibujos!"}</p><div class="earth-finish-buttons">${earthButton("earth-restart", "Explorar otra vez ↻")}${earthButton("earth-practice-again", "Otra práctica", { secondary: true })}${earthButton("cancel-run", "Volver a Ciencias Naturales", { secondary: true })}</div></article></div></section>`);
  if (earthMotion()) earthTimeline = window.gsap.timeline({ onComplete: () => { earthTimeline = null; } }).from(".earth-finish-player", { x: -75, rotation: -16, duration: 1, ease: "power3.out", clearProps: "all" }).from(".earth-finish-parts span", { opacity: 0, y: 10, duration: .4, stagger: .1, clearProps: "all" }, .2);
}

function earthAction(action, target) {
  const state = earthCurrent();
  if (!state || state.busy) return;
  stopEarthAnimation();
  const value = target.dataset.value;
  if (action === "earth-zoom" && state.stage === 0 && !state.surface) {
    return earthAnimate((tl) => tl.to(".earth-camera", { attr: { transform: "translate(0 0) scale(1)" }, duration: 1.5, ease: "power3.inOut" }), () => { state.surface = true; });
  }
  if (action === "earth-near" && state.stage === 0 && state.surface) {
    return earthAnimate((tl) => tl.to(".earth-camera", { attr: { transform: "translate(-500 45) scale(3)" }, duration: 1.35, ease: "power3.inOut" }), () => { state.surface = false; });
  }
  if (action === "earth-toggle" && state.stage === 1) {
    const opening = !state.open;
    return earthAnimate((tl) => {
      tl.to(".earth-shell-clip-rect", { attr: { x: opening ? 404 : 250 }, duration: 1.1, ease: "power3.inOut" }, 0)
        .to(".earth-shell", { opacity: opening ? 0 : 1, duration: opening ? .2 : .01 }, opening ? .9 : 0)
        .to(".earth-cut-line", { opacity: opening ? 1 : 0, duration: .6 }, 0);
      if (opening) tl.fromTo(".earth-layer", { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: .8, stagger: .1, ease: "power3.out" }, .15);
    }, () => { state.open = opening; state.hasOpened = true; });
  }
  if (action === "earth-layer" && state.stage === 2) {
    const allowed = state.split ? ["crust", "mantle", "outer", "inner"] : ["crust", "mantle", "core"];
    if (!allowed.includes(value)) return;
    state.layer = value;
    if (!state.visited.includes(value)) state.visited.push(value);
    render(); earthFocus(`[data-action="earth-layer"][data-value="${value}"]`);
    if (earthMotion()) earthTimeline = window.gsap.timeline({ onComplete: () => { earthTimeline = null; } })
      .fromTo(`.earth-layer[data-layer="${value}"]`, { opacity: .25 }, { opacity: 1, duration: .65, ease: "power2.out" })
      .from(".earth-pointer circle", { attr: { r: 0 }, opacity: 0, duration: .55, stagger: .06, ease: "back.out(1.3)", clearProps: "opacity" }, 0)
      .from(".earth-part-copy", { opacity: 0, y: 5, duration: .35, clearProps: "all" }, .1);
    return;
  }
  if (action === "earth-split" && state.stage === 2 && !state.split && ["crust", "mantle", "core"].every((id) => state.visited.includes(id))) {
    state.split = true; state.layer = "outer"; state.visited.push("outer"); render(); earthFocus('[data-action="earth-layer"][data-value="outer"]');
    if (earthMotion()) earthTimeline = window.gsap.timeline({ onComplete: () => { earthTimeline = null; } }).fromTo('.earth-layer[data-layer="inner"]', { opacity: 0, scale: .6 }, { opacity: .68, scale: 1, svgOrigin: "250 240", duration: .9, ease: "power3.out", clearProps: "transform" });
    return;
  }
  if (action === "earth-next" && state.stage < 3) {
    if ((state.stage === 0 && !state.surface) || (state.stage === 1 && !state.hasOpened) || (state.stage === 2 && !earthCanPractice(state))) return;
    state.stage += 1; state.open = state.stage >= 2;
    render(); earthFocus(); return;
  }
  if (action === "earth-back" && state.stage > 0 && state.stage < 3) {
    state.stage -= 1; state.reviewing = false; render(); earthFocus(); return;
  }
  if (action === "earth-review" && state.stage === 3) { state.stage = 2; state.reviewing = true; render(); earthFocus(); return; }
  if (action === "earth-resume" && state.stage === 2 && state.reviewing) { state.stage = 3; state.reviewing = false; render(); earthFocus(); return; }
  if (action === "earth-choice" && state.stage === 3 && !state.checked && !state.finished) {
    const card = state.practice[state.practiceIndex];
    if (!(card.options || card.sites).includes(value)) return;
    state.choice = value; render(); earthFocus(`[data-action="earth-choice"][data-value="${value}"]`); return;
  }
  if (action === "earth-check" && state.stage === 3 && !state.checked && !state.finished) {
    const card = state.practice[state.practiceIndex];
    if (!(card.options || card.sites).includes(state.choice)) return;
    state.checked = true;
    const correct = state.choice === card.correct;
    session.answers.push({ prompt: card.prompt, selected: state.choice, correct: card.correct, isCorrect: correct, attempts: 1 });
    session.score += Number(correct);
    render(); earthFocus("#earth-feedback");
    if (earthMotion()) {
      earthTimeline = window.gsap.timeline({ onComplete: () => { earthTimeline = null; } }).from(".earth-feedback", { opacity: 0, y: 8, duration: .45, clearProps: "all" });
      if (correct) earthTimeline.to(".earth-guide-player .pv-pacman", { x: 53, duration: .85, ease: "power2.inOut" }, 0).to(".earth-guide-dots i", { opacity: 0, duration: .15, stagger: .16 }, .2);
      if (card.kind === "place") earthTimeline.from(".earth-answer-house", { y: -18, opacity: 0, duration: .7, ease: "power3.out", clearProps: "opacity" }, 0);
    }
    return;
  }
  if (action === "earth-practice-next" && state.stage === 3 && state.checked && !state.finished) {
    if (state.practiceIndex + 1 === state.practice.length) state.finished = true;
    else { state.practiceIndex += 1; state.choice = null; state.checked = false; }
    render(); earthFocus(); return;
  }
  if (action === "earth-restart" && state.finished) { session.earth = createEarthState(); session.answers = []; session.score = 0; render(); earthFocus(); return; }
  if (action === "earth-practice-again" && state.finished) {
    state.finished = false; state.stage = 3; state.practice = createEarthPractice(); state.practiceIndex = 0; state.choice = null; state.checked = false; state.scene = ""; session.answers = []; session.score = 0; render(); earthFocus();
  }
}
