// Four independent workshops inspired by the supplied weight and length worksheets.
// Each board is committed once; choosing alone never reveals whether an answer is right.
const TECHNOLOGY_THEMES = [
  { id: "taller-peso", title: "El taller del peso", technologyMode: "weight", description: "Compará objetos y descubrí qué cuenta una balanza.", activityLabel: "Peso · Más, menos e igual" },
  { id: "herramienta-justa", title: "La herramienta justa", technologyMode: "tools", description: "Elegí con qué medir en cada situación.", activityLabel: "Instrumentos · Elegir y relacionar" },
  { id: "medir-unidades", title: "Medidas con cubitos", technologyMode: "units", description: "Medí objetos usando unidades del mismo tamaño.", activityLabel: "Longitud · Unidades iguales" },
  { id: "regla-pacman", title: "La regla de Pac-Man", technologyMode: "ruler", description: "Seguí las marcas y descubrí cuánto mide cada objeto.", activityLabel: "Longitud · Centímetros" },
  { id: "litros-completar", title: "Llená un litro", capacityMode: "fill", description: "Volcá medios y cuartos. Mirá cómo juntos forman un litro.", activityLabel: "LITROS · Llenar · 5 desafíos", accent: "#93dcda", number: "12" },
  { id: "litros-botellas", title: "Botellas que se juntan", capacityMode: "sum", description: "Juntá el agua de las botellas y descubrí cuántos litros hay.", activityLabel: "LITROS · Sumar · 5 desafíos", accent: "#a9cafa", number: "13" },
  { id: "litros-capacidad", title: "¿Cabe más o menos?", capacityMode: "compare", description: "Probá con un litro: ¿se llena, sobra agua o queda lugar?", activityLabel: "LITROS · Comparar · 5 desafíos", accent: "#ffda82", number: "14" }
].map((theme) => ({ ...theme, exercises: [{ id: theme.id, type: theme.capacityMode ? "capacity-lab" : "technology-lab", prompt: theme.title }] }));

const TECH_LABELS = {
  pencil: "Lápiz", chair: "Silla", fridge: "Heladera", feather: "Pluma", book: "Libro",
  balloon: "Globo", key: "Llave", stone: "Piedra", carrot: "Zanahoria", brush: "Pincel",
  ruler: "Regla", scale: "Balanza", tape: "Cinta métrica", clock: "Reloj", thermometer: "Termómetro",
  block: "Cubito", clip: "Clip", scissors: "Tijera", bottle: "Botella", ribbon: "Cinta"
};
const TECH_INFO = {
  weight: { number: "01", accent: "#ffd45c", icon: "scale", subtitle: "Más, menos… ¿o igual?", instruction: "Elegí una respuesta en cada mesa. Después comprobá el tablero.", rule: "En una balanza, el plato que baja pesa más. Si quedan a la misma altura, pesan igual." },
  tools: { number: "02", accent: "#89ddca", icon: "tape", subtitle: "Cada medida tiene su herramienta", instruction: "Pensá qué querés medir. Elegí el instrumento para cada misión.", rule: "La balanza sirve para pesar. La regla mide longitudes. La cinta métrica se puede doblar y rodear objetos." },
  units: { number: "03", accent: "#bdb0f8", icon: "block", subtitle: "Una unidad al lado de la otra", instruction: "Contá los cubitos que ocupa cada objeto. Elegí el número.", rule: "Usá unidades iguales, sin huecos ni montarlas una sobre otra. Contá los espacios ocupados, no las rayas." },
  ruler: { number: "04", accent: "#ffb09b", icon: "ruler", subtitle: "Del principio al final", instruction: "Mirá dónde empieza y termina. Elegí cuántos centímetros mide.", rule: "Cada espacio entre dos números mide 1 cm. Si el objeto no empieza en 0, contá los espacios desde su comienzo." }
};

function techArt(id, extraClass = "") {
  const art = {
    pencil: '<path d="M25 97 33 69 85 17Q91 11 98 18Q105 25 99 31L47 83Z" fill="#ffd45c"/><path d="m85 17 14 14-10 10-14-14Z" fill="#fb9c96"/><path d="m33 69 14 14-22 14Z" fill="#f6d7aa"/><path d="m25 97 5-16 11 11Z" fill="#233c50"/><path d="m42 73 42-42"/>',
    chair: '<path d="M30 53V16H89V53" fill="#9ce1ce"/><path d="M31 26H88M31 41H88"/><path d="m22 63 56-8 24 17-54 12Z" fill="#eeb47e"/><path d="M24 65V104H34V77M49 84V110H59V82M91 76V104H101V73" fill="#d99a63"/>',
    fridge: '<rect x="27" y="9" width="66" height="100" rx="9" fill="#b2ddf5"/><path d="M27 48H93M38 23V36M38 59V78"/><rect x="67" y="19" width="15" height="16" rx="2" fill="#ffcd76"/><path d="M37 109V113M84 109V113"/>',
    feather: '<path d="M24 99C10 64 61 4 91 15C116 35 59 94 24 99Z" fill="#bdb0f8"/><path d="M17 110 88 23M38 83 31 58M53 68 47 38M52 69 78 69M69 51 96 41"/>',
    book: '<path d="M25 18Q49 8 91 17V103Q49 94 25 108Z" fill="#f69a8e"/><path d="M25 18V108Q14 102 14 94V25Q14 18 25 18Z" fill="#d77573"/><path d="M35 39H77M35 52H66M25 97Q48 84 91 94"/><path d="M71 17V36L64 30 57 36V16" fill="#ffda71"/>',
    balloon: '<ellipse cx="60" cy="43" rx="34" ry="38" fill="#fb9bb8"/><path d="m60 82-6 9h12Z" fill="#ed7ba0"/><path d="M60 91q15 14 0 24M43 25q-7 5-8 16"/>',
    key: '<path d="M72 49 34 101 18 90 26 80 33 85 39 77 34 71 58 40" fill="#ffd45c"/><circle cx="79" cy="30" r="24" fill="#ffd45c"/><circle cx="79" cy="30" r="9" fill="#fff"/>',
    stone: '<path d="m18 89 2-43 26-25 39 4 22 29-9 40-49 12Z" fill="#9faebe"/><path d="m20 46 29 13 36-34M49 59v47M49 59l58-5" stroke="#718399"/>',
    carrot: '<path d="M45 36Q91 25 84 53L33 110Q21 117 25 96Z" fill="#f9a458"/><path d="m53 35-7-22q11-7 15 16L70 7q14 2 1 26l21-16q14 9-12 23" fill="#8bd7ab"/><path d="m42 55 15 5M34 77l13 5M61 75l11 3"/>',
    brush: '<path d="M48 69 54 15Q60-5 66 15L72 69" fill="#d2a3e3"/><path d="M34 69H85V86H34Z" fill="#b4c8d8"/><path d="M34 86H85L94 112Q60 103 25 112Z" fill="#edba85"/><path d="M43 91v13M57 92v11M73 91l3 13"/>',
    ruler: '<rect x="8" y="38" width="104" height="44" rx="6" fill="#ffd45c"/><path d="M21 39v23M34 39v13M47 39v23M60 39v13M73 39v23M86 39v13M99 39v23"/>',
    tape: '<path d="M16 83h67V57" fill="none" stroke="#ffd45c" stroke-width="23"/><path d="M23 74v12M38 74v7M53 74v12"/><rect x="48" y="17" width="60" height="62" rx="20" fill="#8dd8c8"/><circle cx="78" cy="47" r="18" fill="#effcf6"/><path d="m71 48 6 5 10-14"/>',
    scale: '<path d="M60 19V101M33 105h54M17 32h86"/><circle cx="60" cy="31" r="7" fill="#ffd45c"/><path d="m24 33-15 37h30Zm72 0L81 70h30Z" fill="none"/><path d="M8 70q15 24 32 0M80 70q16 24 32 0" fill="#8edaca"/>',
    clock: '<circle cx="60" cy="62" r="44" fill="#b9b0f3"/><circle cx="60" cy="62" r="33" fill="#fff"/><path d="M60 38v24l19 12M60 18V8M49 8h22"/><circle cx="60" cy="62" r="3" fill="#233c50"/>',
    thermometer: '<path d="M48 74V20a12 12 0 0 1 24 0v54a23 23 0 1 1-24 0Z" fill="#e3f3fb"/><path d="M60 38v48" stroke="#f09390" stroke-width="9"/><circle cx="60" cy="94" r="13" fill="#f09390"/><path d="M79 27h10M79 43h6M79 59h10"/>',
    block: '<path d="m16 32 42-19 46 19v58l-43 19-45-19Z" fill="#bcb0f7"/><path d="m16 32 45 20 43-20M61 52v57"/>',
    clip: '<path d="M43 94V31c0-31 39-31 39 0v57c0 23-28 23-28 0V34c0-11 14-11 14 0v47" fill="none" stroke="#768eac" stroke-width="9"/>',
    scissors: '<circle cx="31" cy="88" r="18" fill="#ffb29d"/><circle cx="90" cy="88" r="18" fill="#ffb29d"/><path d="m42 75 37-65 2 44-35 31M78 75 41 10l-2 44 35 31" fill="#b5c9d7"/><circle cx="60" cy="57" r="5" fill="#fff"/>',
    bottle: '<path d="M46 24h28v20q17 9 17 25v36H29V69q0-16 17-25Z" fill="#a8dded"/><rect x="45" y="12" width="30" height="13" rx="3" fill="#8bc5bb"/><path d="M29 67h62v24H29Z" fill="#fff2c4"/>',
    ribbon: '<path d="M10 42h100l-12 18 12 18H10l12-18Z" fill="#c1b0f3"/><path d="M28 53h64M28 66h64" stroke="#927ec8"/>'
  };
  return `<svg class="tech-art ${extraClass}" viewBox="0 0 120 120" aria-hidden="true"><g stroke="#294251" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${art[id] || art.block}</g></svg>`;
}

function techOption(value, label, art) { return { value: String(value), label: label || String(value), art }; }

function techPick(pool, key) {
  // Prefer unseen situations over the previous visit; storage is optional in private mode.
  let previous = [];
  try { previous = JSON.parse(localStorage.getItem(`ian-tech-${key}`) || "[]"); } catch {}
  if (!Array.isArray(previous)) previous = [];
  const fresh = pool.filter((item) => !previous.includes(item.id));
  const item = shuffled(fresh.length ? fresh : pool)[0];
  try { localStorage.setItem(`ian-tech-${key}`, JSON.stringify([...previous, item.id].slice(-Math.max(1, pool.length - 1)))); } catch {}
  return item;
}

function createTechnologyExercises(theme) {
  const mode = theme.technologyMode;
  let cards;
  if (mode === "weight") {
    const daily = techPick([
      { id: "home", items: ["pencil", "chair", "fridge"] },
      { id: "desk", items: ["feather", "book", "chair"] },
      { id: "room", items: ["key", "chair", "fridge"] }
    ], "weight-daily");
    const more = Math.random() < 0.5;
    const correct = daily.items[more ? 2 : 0];
    cards = [{ id: daily.id, kind: "objects", prompt: `¿Cuál pesa ${more ? "más" : "menos"} en la vida real?`, objects: shuffled(daily.items), correct,
      options: shuffled(daily.items.map((id) => techOption(id, TECH_LABELS[id]))),
      explanation: `${TECH_LABELS[correct]} es el objeto que pesa ${more ? "más" : "menos"} de estos tres. Los dibujos no muestran el tamaño real.` }];
    const pairs = [
      { id: "balloon-key", objects: ["balloon", "key"], heavy: 1 },
      { id: "stone-feather", objects: ["stone", "feather"], heavy: 0 },
      { id: "book-pencil", objects: ["book", "pencil"], heavy: 0 },
      { id: "key-feather", objects: ["key", "feather"], heavy: 0 }
    ];
    const pair = techPick(pairs, "weight-balance");
    const flipped = Math.random() < 0.5;
    const objects = flipped ? [...pair.objects].reverse() : [...pair.objects];
    const heavy = flipped ? 1 - pair.heavy : pair.heavy;
    cards.push({ id: pair.id, kind: "balance", objects, heavy, prompt: "Según la balanza, ¿qué pesa más?", correct: objects[heavy],
      options: shuffled([...objects.map((id) => techOption(id, TECH_LABELS[id])), techOption("equal", "Pesan igual")]),
      explanation: `${TECH_LABELS[objects[heavy]]} pesa más: su plato está más abajo. El tamaño del dibujo no decide el peso.` });
    const equal = Math.random() < 0.5;
    const lastObjects = shuffled(["bottle", "book"]);
    const lastHeavy = equal ? -1 : Math.floor(Math.random() * 2);
    cards.push({ id: "compare-loaded", kind: "balance", objects: lastObjects, heavy: lastHeavy, prompt: "En esta balanza, ¿qué pesa menos?", correct: equal ? "equal" : lastObjects[1 - lastHeavy],
      options: shuffled([...lastObjects.map((id) => techOption(id, TECH_LABELS[id])), techOption("equal", "Pesan igual")]),
      explanation: equal ? "Los platos están a la misma altura. Estos dos objetos pesan igual." : `${TECH_LABELS[lastObjects[1 - lastHeavy]]} pesa menos: su plato queda más arriba.` });
  } else if (mode === "tools") {
    const missions = [
      [{ id: "fruit", object: "carrot", prompt: "Queremos pesar las zanahorias.", correct: "scale", explanation: "La balanza permite comparar o medir el peso de las zanahorias." },
       { id: "parcel", object: "book", prompt: "Queremos saber cuánto pesa un libro.", correct: "scale", explanation: "Para saber cuánto pesa el libro, lo ponemos en una balanza." }],
      [{ id: "draw", object: "pencil", prompt: "Necesitamos una herramienta rígida para medir y trazar una línea recta.", correct: "ruler", explanation: "La regla tiene marcas para medir y un borde rígido para trazar líneas rectas." },
       { id: "straight", object: "brush", prompt: "Queremos medir el pincel y dibujar una línea igual de larga con la misma herramienta.", correct: "ruler", explanation: "La regla mide el pincel y su borde permite dibujar una línea recta de ese largo." }],
      [{ id: "around", object: "bottle", prompt: "Queremos medir alrededor de la botella, siguiendo su forma.", correct: "tape", explanation: "La cinta métrica es flexible: puede rodear la botella. Una regla rígida no se curva." },
       { id: "ribbon", object: "ribbon", prompt: "Queremos medir alrededor de la cintura para hacer un cinturón.", correct: "tape", explanation: "La cinta métrica se dobla y rodea la cintura para medir todo su contorno." }]
    ];
    cards = shuffled(missions.map((pool, index) => ({ ...techPick(pool, `tools-${index}`), kind: "tool", options: shuffled(["scale", "ruler", "tape"].map((id) => techOption(id, TECH_LABELS[id], id))) })));
    // A tool can be selected more than once; there is no forced one-to-one matching.
  } else {
    const objects = shuffled(["pencil", "brush", "ribbon", "key", "carrot", "book"]).slice(0, 3);
    const lengths = shuffled([3, 4, 5, 6, 7]).slice(0, 3);
    cards = objects.map((object, index) => {
      const length = lengths[index];
      const start = mode === "ruler" && index === 2 ? 2 : 0;
      return { id: `${object}-${start}-${length}`, kind: mode, object, length, start,
        prompt: mode === "units" ? `¿Cuántos cubitos mide?` : `¿Cuántos centímetros mide?`,
        correct: String(length), options: Array.from({ length: 10 }, (_, number) => techOption(number + 1)),
        explanation: mode === "units" ? `Ocupa ${length} cubitos iguales, colocados juntos. Mide ${length} unidades.`
          : start ? `Empieza en ${start} y termina en ${start + length}. Hay ${length} espacios: ${start + length} − ${start} = ${length} cm.`
            : `Empieza en 0 y termina en ${length}. Mide ${length} cm.` };
    });
  }
  return [{ id: theme.id, type: "technology-lab", mode, cards }];
}

function renderTechnologyMenu(subject) {
  renderShell(`<section class="screen tech-menu">
    <div class="toolbar"><button class="btn btn-ghost" type="button" data-action="school">${icon("arrow")}Escuela</button><span class="tech-menu-tag">EXPLORAR · MEDIR · DESCUBRIR</span></div>
    <header class="tech-hero">
      <div><span class="tech-eyebrow">EL LABORATORIO DE PAC-MAN</span><h2>Tecnología</h2><p>Grandes descubrimientos <br>con pequeñas medidas.</p><span class="tech-hero-note">Elegí un taller para empezar.</span></div>
      <div class="tech-hero-art" aria-hidden="true"><span class="tech-hero-orbit">${techArt("ruler")}</span><span class="tech-hero-player">${pacmanVerbSprite()}</span><span class="tech-hero-dots">● ● ●</span><span class="tech-hero-scale">${techArt("scale")}</span><span class="tech-hero-ghost">${pacmanVerbGhost("#92dfcc")}</span></div>
    </header>
    <div class="tech-workshops">${subject.themes.map((theme) => {
      const info = theme.expeditionMode ? { accent: theme.accent, number: "12" } : theme.capacityMode ? { accent: theme.accent, number: theme.number, icon: "bottle" } : theme.discoveryMode ? { accent: theme.accent, number: "11" } : theme.weightMode ? { accent: theme.accent, number: theme.number, icon: "scale" } : theme.worldMode ? { accent: "#9fd8de", number: "07" } : theme.questMode ? { accent: "#b6a1ee", number: "06" } : theme.arcadeMode ? { accent: "#dbb83f", icon: "ruler", number: "05" } : TECH_INFO[theme.technologyMode] || TECH_INFO.tools;
      return `<article class="tech-workshop ${theme.expeditionMode ? "se-theme-card" : theme.discoveryMode ? "pd-theme-card" : theme.worldMode ? "pw-theme-card" : theme.questMode ? "pq-theme-card" : ""}" style="--tech-accent:${info.accent}"><div class="tech-workshop-art">${theme.expeditionMode || theme.discoveryMode || theme.worldMode || theme.questMode ? pacmanVerbSprite() : techArt(info.icon)}<span>${info.number}</span></div><div class="tech-workshop-body"><h3>${escapeHtml(theme.title)}</h3><p>${escapeHtml(theme.description || "")}</p><span class="tech-workshop-label">${escapeHtml(theme.activityLabel || "Taller")}</span></div><button class="tech-start" type="button" data-action="start" data-mode="activity" data-subject="tecnologia" data-theme="${escapeHtml(theme.id)}" aria-label="Empezar ${escapeHtml(theme.title)}">Explorar <span aria-hidden="true">→</span></button></article>`;
    }).join("")}</div>
  </section>`);
}

function techBalance(card) {
  const leftY = card.heavy === -1 ? 63 : card.heavy === 0 ? 80 : 46;
  const rightY = card.heavy === -1 ? 63 : card.heavy === 1 ? 80 : 46;
  return `<svg class="tech-balance" viewBox="0 0 320 206" role="img" aria-label="${escapeHtml(card.heavy === -1 ? "Balanza: ambos platos están a la misma altura." : `Balanza: el plato de ${TECH_LABELS[card.objects[card.heavy]]} está más abajo.`)}">
    <path d="M23 181H297" stroke="#c5dcd6" stroke-width="2"/>
    <path d="M136 181H184L169 165V67H151V165Z" fill="#8cbcaf" stroke="#294251" stroke-width="3"/>
    <path class="tech-beam" d="M62 ${leftY}L258 ${rightY}" fill="none" stroke="#294251" stroke-width="7" stroke-linecap="round"/>
    ${[leftY, rightY].map((y, index) => `<g class="tech-pan" transform="translate(${index ? 258 : 62} ${y})"><path d="M0 0-43 74H43Z" fill="none" stroke="#6d8b90" stroke-width="2"/><svg x="-32" y="12" width="64" height="64" viewBox="0 0 120 120">${techArt(card.objects[index])}</svg><path d="M-45 74Q0 112 45 74Z" fill="${index ? "#bdadf0" : "#91ddcb"}" stroke="#294251" stroke-width="3"/></g>`).join("")}
    <circle cx="160" cy="63" r="10" fill="#ffd45c" stroke="#294251" stroke-width="3"/>
    <text x="62" y="201" text-anchor="middle">${TECH_LABELS[card.objects[0]]}</text><text x="258" y="201" text-anchor="middle">${TECH_LABELS[card.objects[1]]}</text>
  </svg>`;
}

// Horizontal silhouettes use their whole viewBox: the endpoints, guide lines and
// measurement ticks share the same coordinates. No inference from an emoji's size.
function techMeasuredObject(id, x, width) {
  const drawings = {
    pencil: '<path d="M0 30 15 11H91Q100 11 100 20V40Q100 49 91 49H15Z" fill="#ffd45c"/><path d="M15 11V49L0 30Z" fill="#efca9b"/><path d="m0 30 6-8v16Z" fill="#294251"/><path d="M86 11V49H93Q100 49 100 40V20Q100 11 93 11Z" fill="#f49d9c"/><path d="M15 23H85M15 37H85"/>',
    brush: '<path d="M0 8H27V52H0L4 30Z" fill="#d9a978"/><path d="M25 8H37V52H25Z" fill="#bbced9"/><path d="M37 14Q54 22 91 22Q100 22 100 30Q100 38 91 38Q54 38 37 46Z" fill="#c0abec"/><path d="M8 15V43M16 15V44"/>',
    ribbon: '<path d="M0 12H100L92 30 100 48H0L8 30Z" fill="#baacf0"/><path d="M17 24H83M17 36H83" stroke="#9382ca"/>',
    key: '<ellipse cx="16" cy="30" rx="16" ry="24" fill="#ffd45c"/><path d="M31 24H100V42H91V36H80V43H68V36H31Z" fill="#ffd45c"/><ellipse cx="13" cy="30" rx="6" ry="11" fill="#fff"/>',
    carrot: '<path d="M0 30Q68 3 80 17Q92 30 80 43Q68 57 0 30Z" fill="#f8a05b"/><path d="M82 25 100 7V20L90 30 100 40V53L82 35Z" fill="#80c6a5"/><path d="M35 22V32M52 28V43M69 15V28"/>',
    book: '<path d="M0 7H100V53H0Z" fill="#f39c8f"/><path d="M9 7V53M24 18H84M24 26H64M0 45H100"/><path d="M79 7V30L71 23 64 30V7" fill="#ffd45c"/>'
  };
  return `<svg x="${x}" y="22" width="${width}" height="65" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><g stroke="#294251" stroke-width="1.3" stroke-linejoin="round">${drawings[id] || drawings.ribbon}</g></svg>`;
}

function techMeasure(card, checked) {
  const unit = 26, startX = 28 + card.start * unit, endX = startX + card.length * unit;
  const isRuler = card.kind === "ruler";
  return `<svg class="tech-measure" viewBox="0 0 320 192" role="img" aria-label="${escapeHtml(`${TECH_LABELS[card.object]} junto a ${isRuler ? "una regla de centímetros" : "una fila de cubitos iguales"}`)}">
    ${techMeasuredObject(card.object, startX, card.length * unit)}
    <path d="M${startX} 13V105M${endX} 13V105" fill="none" stroke="#6a8897" stroke-width="1.5" stroke-dasharray="3 4"/>
    ${isRuler ? `<rect x="19" y="104" width="278" height="60" rx="6" fill="#ffdf82" stroke="#bc9947" stroke-width="1.5"/>
      ${Array.from({ length: 11 }, (_, index) => `<path d="M${28 + index * unit} 104v15" stroke="#294251" stroke-width="2"/><text x="${28 + index * unit}" y="146" text-anchor="middle">${index}</text>`).join("")}<text x="285" y="182" text-anchor="end" class="tech-unit-label">cm</text>`
      : Array.from({ length: 10 }, (_, index) => `<g><rect x="${28 + index * unit}" y="105" width="26" height="32" fill="${index < card.length ? "#bcadf1" : "#edf0f4"}" stroke="${index < card.length ? "#7866ad" : "#c7d1d7"}" stroke-width="1.3"/><path d="m${32 + index * unit} 109 5 4h14" fill="none" stroke="${index < card.length ? "#dcd1fa" : "#fff"}"/></g>`).join("") + '<text x="160" y="166" text-anchor="middle" class="tech-unit-label">1 cubito = 1 unidad</text>'}
    ${checked ? `<path class="tech-measure-reveal" d="M${startX} 92H${endX}" stroke="#217f68" stroke-width="5" stroke-linecap="round"/>${Array.from({ length: card.length }, (_, index) => `<circle class="tech-count-dot" cx="${startX + (index + 0.5) * unit}" cy="93" r="3" fill="#fff"/>`).join("")}` : ""}
  </svg>`;
}

function renderTechnologyCard(card, index, state) {
  const selected = state.choices[index];
  const isCorrect = selected === card.correct;
  const numeric = card.kind === "units" || card.kind === "ruler";
  let visual;
  if (card.kind === "balance") visual = techBalance(card);
  else if (numeric) visual = techMeasure(card, state.checked);
  else if (card.kind === "tool") visual = `<div class="tech-mission-object">${techArt(card.object)}<span class="tech-object-tag">${TECH_LABELS[card.object]}</span></div>`;
  else visual = `<div class="tech-object-trio">${card.objects.map((id) => `<div>${techArt(id)}<span>${TECH_LABELS[id]}</span></div>`).join("")}</div>`;
  return `<article class="tech-station ${state.checked ? isCorrect ? "is-right" : "is-review" : ""}" aria-labelledby="tech-question-${index}">
    <div class="tech-station-heading"><span>MESA ${index + 1}</span><span class="tech-status-dot">${state.checked ? isCorrect ? "✓ Resuelto" : "↗ Para repasar" : selected !== undefined ? "● Elegido" : "○ Por resolver"}</span></div>
    <h3 id="tech-question-${index}">${escapeHtml(card.prompt)}</h3>
    <div class="tech-station-visual">${visual}</div>
    ${card.kind === "objects" ? '<p class="tech-scale-note">Dibujos sin escala real</p>' : numeric ? `<p class="tech-scale-note">${TECH_LABELS[card.object]} · ${card.start ? 'Atención al punto de inicio' : 'Mirá los dos extremos'}</p>` : '<p class="tech-scale-note">Observá antes de elegir</p>'}
    <div class="tech-options ${numeric ? "tech-number-options" : ""} ${card.kind === "tool" ? "tech-tool-options" : ""}" role="group" aria-labelledby="tech-question-${index}">${card.options.map((option) => `<button type="button" class="tech-option ${selected === option.value ? "is-selected" : ""} ${state.checked && selected === option.value ? isCorrect ? "is-right" : "is-review" : ""}" data-action="technology-select" data-card="${index}" data-value="${option.value}" aria-pressed="${selected === option.value}" ${state.checked ? "disabled" : ""}>${option.art ? techArt(option.art) : ""}<span>${escapeHtml(option.label)}</span></button>`).join("")}</div>
    ${state.checked ? `<div class="tech-explanation"><strong>${isCorrect ? "¡Lo pensaste bien!" : "Miremos qué nos muestra"}</strong><p>${escapeHtml(card.explanation)}</p></div>` : ""}
  </article>`;
}

function renderTechnologyRunner(exercise) {
  const state = session.technology;
  const info = TECH_INFO[exercise.mode];
  const answered = Object.keys(state.choices).length;
  const initial = !state.entered;
  state.entered = true;
  renderShell(`<section class="tech-lab" style="--tech-accent:${info.accent}">
    <header class="tech-lab-header"><button class="tech-back" type="button" data-action="cancel-run">${icon("arrow")}Tecnología</button><span class="tech-eyebrow">TALLER ${info.number} · PAC-MAN</span><span class="tech-lab-state">${state.checked ? "Tablero terminado" : "A tu ritmo"}</span></header>
    <div class="tech-lab-title"><div><h2>${escapeHtml(session.themeTitle)}</h2><p>${info.subtitle}</p></div><div class="tech-lab-friends" aria-hidden="true">${pacmanVerbSprite()}<span>● ●</span>${pacmanVerbGhost("#9cdece")}</div></div>
    <div class="tech-guide"><span aria-hidden="true">✦</span><p>${info.rule}</p></div>
    <p class="tech-instruction">${info.instruction}</p>
    <div class="tech-board">${exercise.cards.map((card, index) => renderTechnologyCard(card, index, state)).join("")}</div>
    <footer class="tech-lab-footer"><div class="tech-footer-copy" role="status" aria-live="polite" tabindex="-1" id="tech-result"><strong>${state.checked ? `${session.score} de ${exercise.cards.length} respuestas correctas` : `${answered} de ${exercise.cards.length} mesas listas`}</strong><span>${state.checked ? "Mirá las explicaciones. Después elegí cómo seguir." : answered === exercise.cards.length ? "Revisá tus elecciones y confirmá una sola vez." : "Podés cambiar tus elecciones antes de comprobar."}</span></div>
      ${state.checked ? `<div class="tech-finish-buttons"><button type="button" class="tech-back" data-action="start" data-subject="tecnologia" data-theme="${escapeHtml(session.themeId)}" data-mode="activity">Otro tablero ↻</button><button type="button" class="tech-check" data-action="cancel-run">Volver a los talleres →</button></div>`
        : `<button type="button" class="tech-check" data-action="technology-check" ${answered === exercise.cards.length ? "" : "disabled"}>Comprobar tablero <span aria-hidden="true">✓</span></button>`}
    </footer>
  </section>`);
  if (initial && window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.gsap.from(".tech-station", { opacity: 0, y: 16, duration: 0.45, stagger: 0.09, clearProps: "all" });
    window.gsap.from(".tech-lab-friends .pv-pacman", { x: -30, rotation: -12, duration: 0.6, ease: "back.out(1.4)", clearProps: "all" });
  }
}

function currentTechnology() {
  const exercise = session?.exercises?.[session.index];
  return route.view === "run" && exercise?.type === "technology-lab" && session.technology ? { exercise, state: session.technology } : null;
}

function selectTechnologyAnswer(index, value) {
  const current = currentTechnology();
  if (!current || current.state.checked || !Number.isInteger(index)) return;
  const card = current.exercise.cards[index];
  if (!card?.options.some((option) => option.value === value)) return;
  current.state.choices[index] = value;
  render();
  document.querySelector(`[data-action="technology-select"][data-card="${index}"][data-value="${value}"]`)?.focus({ preventScroll: true });
}

function checkTechnologyAnswers() {
  const current = currentTechnology();
  if (!current || current.state.checked) return;
  const { exercise, state } = current;
  if (!exercise.cards.every((card, index) => card.options.some((option) => option.value === state.choices[index]))) return;
  state.checked = true;
  session.answers = exercise.cards.map((card, index) => ({ prompt: card.prompt, selected: state.choices[index], correct: card.correct, isCorrect: state.choices[index] === card.correct, attempts: 1 }));
  session.score = session.answers.filter((answer) => answer.isCorrect).length;
  render();
  document.querySelector("#tech-result")?.focus({ preventScroll: true });
  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.gsap.from(".tech-explanation", { opacity: 0, y: 10, duration: 0.4, stagger: 0.1, clearProps: "all" });
    if (exercise.mode === "units" || exercise.mode === "ruler") {
      window.gsap.from(".tech-measure-reveal", { scaleX: 0, transformOrigin: "left center", duration: 0.8, clearProps: "all" });
      window.gsap.from(".tech-count-dot", { opacity: 0, duration: 0.2, stagger: 0.09, clearProps: "all" });
    }
    if (exercise.mode === "weight") window.gsap.from(".tech-pan", { y: -8, duration: 0.65, ease: "elastic.out(1, 0.5)" });
    if (session.score > 0) {
      window.gsap.to(".tech-lab-friends .pv-pacman", { x: 42, duration: 0.7, ease: "power2.inOut" });
      window.gsap.to(".tech-lab-friends > span", { opacity: 0, delay: 0.35, duration: 0.3 });
    }
  }
}
