// An original, offline block-programming adventure. No audio, lives or timer.
const PX_SAVE_KEY = "ian-pacman-explorer-v1";
const PX_MAX_BLOCKS = 18;
const PX_MAX_STEPS = 80;
const PX_WORLDS = [
  { id: "garden", title: "El jardín secreto", short: "Jardín", subtitle: "Un camino por descubrir", color: "#23816b", icon: "leaf" },
  { id: "ruins", title: "Las puertas del sol", short: "Ruinas", subtitle: "Llaves, puertas y sorpresas", color: "#bb6045", icon: "key" },
  { id: "space", title: "El archipiélago lunar", short: "Espacio", subtitle: "Grandes ideas, pocos bloques", color: "#7054b5", icon: "star" }
];
const PX_COMMANDS = {
  right: { label: "Derecha", icon: "right", type: "move", dx: 1, dy: 0, angle: 0 },
  up: { label: "Arriba", icon: "up", type: "move", dx: 0, dy: -1, angle: -90 },
  left: { label: "Izquierda", icon: "left", type: "move", dx: -1, dy: 0, angle: 180 },
  down: { label: "Abajo", icon: "down", type: "move", dx: 0, dy: 1, angle: 90 },
  take: { label: "Recoger", icon: "hand", type: "action" },
  open: { label: "Abrir puerta", icon: "key", type: "action" }
};
const PX_LEVELS = [
  { name: "La primera cereza", world: 0, start: [0,3], goal: [3,3], cherries: [[2,3]], path: [[0,3],[1,3],[2,3],[3,3]],
    commands: ["right","take"], hint: "Derecha mueve una casilla. Recoger toma la cereza de la casilla donde está Pac-Man.", solution: ["right","right","take","right"] },
  { name: "A la vuelta del jardín", world: 0, start: [0,4], goal: [2,2], cherries: [[2,4]], path: [[0,4],[1,4],[2,4],[2,3],[2,2]],
    commands: ["right","up","take"], hint: "El sendero dobla hacia arriba después de la cereza.", solution: ["right","right","take","up","up"] },
  { name: "Una merienda para Azul", world: 0, start: [0,3], goal: [4,1], cherries: [[2,3],[2,1]], path: [[0,3],[1,3],[2,3],[2,2],[2,1],[3,1],[4,1]],
    commands: ["right","up","take"], hint: "Azul te espera con dos cerezas. Acordate de recoger cada una.", friend: true,
    solution: ["right","right","take","up","up","take","right","right"] },
  { name: "El sendero del estanque", world: 0, start: [0,4], goal: [4,1], cherries: [[1,2],[3,1]], path: [[0,4],[1,4],[1,3],[1,2],[2,2],[3,2],[3,1],[4,1]],
    commands: ["right","up","take"], hint: "Seguí las baldosas claras para rodear el estanque.",
    solution: ["right","up","up","take","right","right","up","take","right"] },
  { name: "La llave dorada", world: 1, start: [0,3], goal: [4,1], key: [1,3], door: [3,3], cherries: [[4,2]], path: [[0,3],[1,3],[2,3],[3,3],[4,3],[4,2],[4,1]],
    commands: ["right","up","take","open"], hint: "Recogé la llave. Abrí la puerta desde una casilla de al lado y después cruzá.",
    solution: ["right","take","right","open","right","right","up","take","up"] },
  { name: "Un pequeño desvío", world: 1, start: [0,3], goal: [4,1], key: [1,4], door: [3,3], cherries: [[4,2]], path: [[0,3],[1,3],[1,4],[2,3],[3,3],[4,3],[4,2],[4,1]],
    commands: ["right","up","down","take","open"], hint: "La llave está abajo del sendero. Podés bajar a buscarla y volver a subir.",
    solution: ["right","down","take","up","right","open","right","right","up","take","up"] },
  { name: "El arco del atardecer", world: 1, start: [4,4], goal: [0,1], key: [4,3], door: [2,2], cherries: [[1,2]], path: [[4,4],[4,3],[3,3],[3,2],[2,2],[1,2],[1,1],[0,1]],
    commands: ["right","up","left","down","take","open"], hint: "Esta vez el portal queda a la izquierda. Las flechas siempre señalan la misma dirección.",
    solution: ["up","take","left","up","open","left","left","take","up","left"] },
  { name: "El tesoro de las ruinas", world: 1, start: [4,1], goal: [4,4], key: [3,1], door: [2,2], cherries: [[1,3],[3,4]], path: [[4,1],[3,1],[3,2],[2,2],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4]],
    commands: ["right","up","left","down","take","open"], hint: "Primero buscá la llave. Después seguí el sendero hasta las dos cerezas.", friend: true,
    solution: ["left","take","down","open","left","left","down","take","down","right","right","take","right"] },
  { name: "El puente de estrellas", world: 2, start: [0,3], goal: [4,3], cherries: [[3,3]], path: [[0,3],[1,3],[2,3],[3,3],[4,3]],
    commands: ["right","take"], repeat: true, hint: "Poné Derecha dentro de Repetir y elegí 3 veces. Recoger va después, fuera de la repetición.",
    solution: [{op:"repeat",count:3,body:[{op:"right"}]},"take","right"] },
  { name: "Tres lunas de cereza", world: 2, start: [0,3], goal: [4,3], cherries: [[1,3],[2,3],[3,3]], path: [[0,3],[1,3],[2,3],[3,3],[4,3]],
    commands: ["right","take"], repeat: true, hint: "Se repite una pareja de acciones: Derecha y Recoger. Las dos pueden ir dentro del mismo Repetir.",
    solution: [{op:"repeat",count:3,body:[{op:"right"},{op:"take"}]},"right"] },
  { name: "Una escalera entre planetas", world: 2, start: [0,4], goal: [4,1], cherries: [[3,1]], path: [[0,4],[1,4],[1,3],[2,3],[2,2],[3,2],[3,1],[4,1]],
    commands: ["right","up","take"], repeat: true, hint: "Cada escalón tiene Derecha y Arriba. Probá repetir ese grupo tres veces.",
    solution: [{op:"repeat",count:3,body:[{op:"right"},{op:"up"}]},"take","right"] },
  { name: "El gran portal lunar", world: 2, cols: 6, start: [0,4], goal: [5,0], key: [1,4], door: [2,4], cherries: [[5,1]], path: [[0,4],[1,4],[2,4],[2,3],[3,3],[3,2],[4,2],[4,1],[5,1],[5,0]],
    commands: ["right","up","take","open"], repeat: true, hint: "La llave y la puerta van primero. Después se repite el grupo Arriba y Derecha.", friend: true,
    solution: ["right","take","open","right",{op:"repeat",count:3,body:[{op:"up"},{op:"right"}]},"take","up"] }
].map((level, index) => ({ ...level, id: `island-${index+1}`, cols: level.cols || 5, rows: 5, index }));

let pxState = null;
let pxProgress = null;
let pxRunId = 0;
let pxTween = null;
let pxResolveAnimation = null;
let pxIntroAnimation = null;

function pxIcon(name, extra = "") {
  const paths = {
    right:'<path d="M5 12h14m-6-6 6 6-6 6"/>', left:'<path d="M19 12H5m6-6-6 6 6 6"/>',
    up:'<path d="M12 19V5m-6 6 6-6 6 6"/>', down:'<path d="M12 5v14m-6-6 6 6 6-6"/>',
    play:'<path d="m9 5 11 7-11 7Z"/>', step:'<path d="m5 5 10 7-10 7ZM19 5v14"/>',
    pause:'<path d="M8 5v14M16 5v14"/>', reset:'<path d="M4 9a8 8 0 1 1 0 7M4 3v6h6"/>',
    check:'<path d="m5 12 4 4L19 6"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
    key:'<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9m-3-3 3-3m-6 0 3-3"/>',
    leaf:'<path d="M20 4C9 2 2 9 6 16s15 3 14-12ZM4 20 15 9"/>',
    star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z"/>',
    hand:'<path d="M8 12V5a2 2 0 0 1 4 0v6-3a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v5c0 4-3 6-6 6h-1c-2 0-3-1-4-2l-5-5a2 2 0 0 1 3-3l1 1Z"/>',
    loop:'<path d="M6 7h11l-3-3m3 3-3 3M18 17H7l3 3m-3-3 3-3M4 8v6M20 16v-6"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    flag:'<path d="M5 21V3m0 1c6-4 8 4 14 0v10c-6 4-8-4-14 0"/>',
    book:'<path d="M3 4h6c2 0 3 1 3 3 0-2 1-3 3-3h6v15h-6c-2 0-3 1-3 2 0-1-1-2-3-2H3ZM12 7v14"/>',
    bulb:'<path d="M8 15a7 7 0 1 1 8 0l-1 3H9ZM10 21h4"/>',
    sound:'<path d="M7 14H3v-4h4l5-5v14Zm9-6c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>'
  };
  return `<svg class="px-icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.star}</svg>`;
}

function pxArt(name, extra = "") {
  const shapes = {
    pac: '<path d="M25 43q-14 2-13 19v13q0 7 9 8l14-3Z" fill="#257b88"/><path d="M19 45v27" stroke="#74bec5" stroke-width="4" stroke-linecap="round"/><path class="px-mouth" d="M53 54 91 32a43 43 0 1 0 0 44Z" fill="#ffda55"/><path d="M27 24q16-17 38-9" stroke="#fff09d" stroke-width="7" stroke-linecap="round"/><circle cx="57" cy="32" r="5" fill="#20354a"/><circle cx="58" cy="30" r="1.5" fill="white"/><path d="m24 67 10 13 15-4" stroke="#dc8b43" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M41 88v5M64 88v5" stroke="#415b65" stroke-width="7" stroke-linecap="round"/>',
    cherry: '<path d="M37 57q4-31 31-37M66 58q-5-23 2-38" stroke="#4b7d50" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M65 23q21-12 24 2-20 11-24-2Z" fill="#70ae61"/><circle cx="34" cy="69" r="24" fill="#d85263"/><circle cx="70" cy="70" r="23" fill="#ee6b75"/><path d="M23 59q4-6 10-6M61 59q4-6 9-5" stroke="#ffbdad" stroke-width="6" fill="none" stroke-linecap="round"/>',
    key: '<path d="m53 51 32 32-10 10-9-9 7-7-8-8-7 7-12-12Z" fill="#d99d38"/><path d="m51 46 34 34-7 7-9-9 5-5-8-8-6 6-13-13Z" fill="#ffda76"/><circle cx="34" cy="32" r="24" fill="#d99d38"/><circle cx="34" cy="29" r="23" fill="#ffdb73"/><circle cx="34" cy="29" r="10" fill="#c9913c"/><path d="M20 19q8-9 17-7" fill="none" stroke="#fff0b5" stroke-width="5" stroke-linecap="round"/>',
    tree: '<ellipse cx="51" cy="92" rx="34" ry="6" fill="#123c31" opacity=".13"/><path d="M45 46h13v43q-6 7-15 2Z" fill="#a97a50"/><path d="m49 72-12-14m17 7 12-14" stroke="#a97a50" stroke-width="7" stroke-linecap="round"/><path d="M20 56C-4 34 24 11 40 19 44-2 78 0 80 20c30-2 31 40 5 43-10 17-35 15-41 4-12 6-22 1-24-11Z" fill="#4c9879"/><path d="M22 42C10 28 27 13 40 21 45 5 69 7 74 23 57 20 53 36 38 33c-10-3-10 12-16 9Z" fill="#7cba8a"/><path d="M67 39q17-5 18 8" stroke="#91c992" stroke-width="5" fill="none" stroke-linecap="round"/>',
    rock: '<path d="m8 68 14-36 34-15 28 16 11 39-31 16-40-4Z" fill="#8b9ca0"/><path d="m8 68 34 3 14-54-34 15Z" fill="#b3c0b8"/><path d="m42 71 22 17 31-16-20-18Z" fill="#718c8e"/><path d="m28 36 15-8" stroke="#d4dad1" stroke-width="5" stroke-linecap="round"/>',
    plant: '<path d="M51 88V43M50 69 32 51m19 6 19-22" stroke="#679b64" stroke-width="5" fill="none"/><path d="M48 66Q7 70 18 35q32-4 30 31ZM54 49q-5-33 30-35 14 32-30 35Z" fill="#8bb579"/><path d="M50 40q-25-23-3-35 26 11 3 35Z" fill="#b4cc8d"/><ellipse cx="50" cy="91" rx="24" ry="5" fill="#4a796b" opacity=".15"/>',
    crystal: '<path d="m19 68 7-39 23-21 27 16 14 44-32 26Z" fill="#a8a2df"/><path d="m49 8-5 59 14 27 8-61Z" fill="#d2caf3"/><path d="m19 68 25-1L26 29Z" fill="#827fc2"/><path d="m66 33 24 35-14-44Z" fill="#bab6eb"/><path d="m37 27 8-9" stroke="#f5e9ff" stroke-width="4" stroke-linecap="round"/>',
    cactus: '<path d="M43 89V22a11 11 0 0 1 22 0v67M43 57H29q-9 0-9-9V36a7 7 0 0 1 14 0v6h9m22 23h11q10 0 10-10V42a7 7 0 0 0-14 0v9h-7" fill="#69a08a"/><path d="M53 21v62M27 37v9M79 42v13" stroke="#9ac2a2" stroke-width="3" stroke-linecap="round"/><ellipse cx="54" cy="92" rx="28" ry="5" fill="#a07756" opacity=".16"/>',
    friend: '<path d="M17 84V45a33 33 0 0 1 66 0v39l-11-8-11 8-11-8-11 8-11-8Z" fill="#68bfd0"/><path d="M23 44a27 27 0 0 1 26-26" stroke="#a1e0e4" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="39" cy="45" rx="10" ry="12" fill="white"/><ellipse cx="65" cy="45" rx="10" ry="12" fill="white"/><circle cx="40" cy="47" r="5" fill="#295372"/><circle cx="66" cy="47" r="5" fill="#295372"/><path d="M42 64q9 7 17 0" stroke="#356c85" stroke-width="4" fill="none" stroke-linecap="round"/>',
    door: '<path d="M16 94V42a34 34 0 0 1 68 0v52Z" fill="#ac7961"/><path d="M23 94V43a27 27 0 0 1 54 0v51Z" fill="#fff1bc"/><g class="px-door-leaf"><path d="M27 94V44a23 23 0 0 1 46 0v50Z" fill="#47887e"/><path d="M34 41v48m15-60v60m16-48v48" stroke="#356e6c" stroke-width="3"/><path d="M28 58h44M28 81h44" stroke="#b9bb8a" stroke-width="5"/><circle cx="61" cy="69" r="5" fill="#ffe09c"/></g><path d="M13 94h74" stroke="#8b725f" stroke-width="6" stroke-linecap="round"/>',
    portal: '<ellipse cx="50" cy="91" rx="37" ry="8" fill="#285d70" opacity=".16"/><path d="M16 90V42a34 34 0 0 1 68 0v48Z" fill="#8babb3"/><path d="M23 89V43a27 27 0 0 1 54 0v46Z" fill="#a8e0cb"/><path d="M30 88V44a20 20 0 0 1 40 0v44Z" fill="#d9f0cc"/><path d="M38 44q2-12 12-12" stroke="#fff7ce" stroke-width="5" fill="none" stroke-linecap="round"/><path d="m50 51 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#fff7dc"/><path d="M12 92h76" stroke="#769ba5" stroke-width="6" stroke-linecap="round"/>',
    flag: '<path d="M33 91V15" stroke="#a0794f" stroke-width="6" stroke-linecap="round"/><path d="M36 16h42l-12 16 12 16H36Z" fill="#d7a65c"/><path d="M36 17h18v14H36Zm18 14h12l12 16H54Z" fill="#f8df9b"/><ellipse cx="35" cy="93" rx="24" ry="5" fill="#846c4e" opacity=".15"/>'
  };
  return `<svg class="px-art px-art-${name} ${extra}" viewBox="0 0 100 100" aria-hidden="true">${shapes[name] || shapes.star || ""}</svg>`;
}

function pxSame(a, b) { return Boolean(a && b && a[0] === b[0] && a[1] === b[1]); }
function pxKey(point) { return point.join(","); }
function pxInitialWorld(level) { return { position: [...level.start], cherries: [], key: false, door: false, angle: 0 }; }
function pxWon(level, world) { return pxSame(world.position, level.goal) && world.cherries.length === level.cherries.length && (!level.door || world.door); }

function pxApply(level, before, op) {
  const world = { ...before, position: [...before.position], cherries: [...before.cherries] };
  const command = PX_COMMANDS[op];
  if (!command || !level.commands.includes(op)) return { world, error: "Ese bloque no está disponible en esta misión." };
  if (command.type === "move") {
    const next = [world.position[0] + command.dx, world.position[1] + command.dy];
    if (!level.path.some(point => pxSame(point, next))) return { world, error: "Ahí termina el sendero. Revisá esta flecha." };
    if (level.door && pxSame(level.door, next) && !world.door) return { world, error: "La puerta está cerrada. Buscá la llave y usá Abrir puerta desde al lado." };
    world.position = next; world.angle = command.angle;
  } else if (op === "take") {
    const cherry = level.cherries.find(point => pxSame(point, world.position) && !world.cherries.includes(pxKey(point)));
    if (cherry) world.cherries.push(pxKey(cherry));
    else if (level.key && pxSame(level.key, world.position) && !world.key) world.key = true;
    else return { world, error: "Para recoger, Pac-Man tiene que estar sobre una cereza o una llave." };
  } else if (op === "open") {
    if (!level.door || world.door) return { world, error: "Esta puerta ya está abierta." };
    if (!world.key) return { world, error: "Primero recogé la llave dorada." };
    if (Math.abs(world.position[0] - level.door[0]) + Math.abs(world.position[1] - level.door[1]) !== 1) return { world, error: "Acercate a una casilla de la puerta para abrirla." };
    world.door = true;
  }
  return { world, error: "" };
}

function pxBlockCount(program) { return program.reduce((n, block) => n + 1 + (block.op === "repeat" ? block.body.length : 0), 0); }
function pxValidProgram(program, level) {
  if (!Array.isArray(program) || program.length > PX_MAX_BLOCKS) return [];
  const result = [];
  for (const block of program) {
    if (!block || typeof block !== "object") return [];
    if (block.op === "repeat") {
      if (!level.repeat || ![2,3,4].includes(block.count) || !Array.isArray(block.body) || block.body.length > PX_MAX_BLOCKS || block.body.some(child => !child || !level.commands.includes(child.op))) return [];
      result.push({op:"repeat",count:block.count,body:block.body.map(child => ({op:child.op}))});
    } else {
      if (!level.commands.includes(block.op)) return [];
      result.push({op:block.op});
    }
  }
  return pxBlockCount(result) <= PX_MAX_BLOCKS ? result : [];
}
function pxExpand(program) {
  const steps = [];
  for (let i = 0; i < program.length; i++) {
    const block = program[i];
    if (block.op === "repeat") {
      if (!block.body.length) return { steps: [], error: "Agregá un bloque dentro de Repetir.", path: String(i) };
      for (let repeat = 0; repeat < block.count; repeat++) for (let j = 0; j < block.body.length; j++) steps.push({op:block.body[j].op,path:`${i}.${j}`,iteration:repeat+1,count:block.count});
    } else steps.push({op:block.op,path:String(i),iteration:0,count:0});
    if (steps.length > PX_MAX_STEPS) return { steps: [], error: "Este plan es muy largo. Probá con menos bloques.", path: String(i) };
  }
  return { steps, error: "", path: "" };
}

function pxReadProgress() {
  if (pxProgress) return pxProgress;
  let saved; try { saved = JSON.parse(localStorage.getItem(PX_SAVE_KEY)); } catch {}
  const completed = Array.isArray(saved?.completed) ? [...new Set(saved.completed.filter(id => PX_LEVELS.some(level => level.id === id)))] : [];
  return pxProgress = { completed, quiet: saved?.quiet === true, draft: saved?.draft || null };
}
function pxUnlocked() {
  const progress = pxReadProgress();
  const first = PX_LEVELS.findIndex(level => !progress.completed.includes(level.id));
  return first < 0 ? PX_LEVELS.length - 1 : first;
}
function pxSave() {
  const progress = pxReadProgress();
  if (pxState?.level !== undefined) progress.draft = { level:pxState.level, program:pxState.program, cursor:pxState.cursor, paused:["running","paused"].includes(pxState.phase) };
  try { localStorage.setItem(PX_SAVE_KEY, JSON.stringify(progress)); } catch {}
}
function pxQuiet() { return pxReadProgress().quiet || Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches); }
function pxLevel() { return PX_LEVELS[pxState?.level ?? 0]; }

function pxCancelAnimation() {
  if (pxTween) pxTween.kill();
  pxTween = null;
  if (pxResolveAnimation) { const resolve = pxResolveAnimation; pxResolveAnimation = null; resolve(); }
  pxIntroAnimation?.revert(); pxIntroAnimation = null;
}
function leavePacmanExplorer() {
  pxRunId++;
  pxCancelAnimation();
  if (pxState?.phase === "running") { pxState.phase = "paused"; pxState.feedback = "Tu plan está en pausa. Podés seguir cuando quieras."; }
  pxSave();
}
function pxLoadLevel(index, restore = false) {
  if (!Number.isInteger(index) || index < 0 || index > pxUnlocked()) return;
  leavePacmanExplorer();
  const level = PX_LEVELS[index], draft = pxReadProgress().draft;
  const program = restore && draft?.level === index ? pxValidProgram(draft.program, level) : [];
  pxState = { screen:"play", level:index, program, world:pxInitialWorld(level), cursor:0, phase:"edit", selected:null, insert:null,
    highlight:"", hint:false, pauseRequested:false, feedback: index === 0 ? "Tocá los bloques para armar tu plan. Después, Ejecutar." : "Armá tu plan y descubrí el camino." };
  if (restore && draft?.level === index && draft.paused && Number.isInteger(draft.cursor)) {
    const expanded = pxExpand(program);
    const cursor = Math.min(expanded.steps.length, Math.max(0, draft.cursor));
    for (let i = 0; i < cursor; i++) {
      const result = pxApply(level, pxState.world, expanded.steps[i].op);
      if (result.error) break;
      pxState.world = result.world; pxState.cursor++;
    }
    if (pxState.cursor) { pxState.phase = "paused"; pxState.feedback = "Tu plan te espera. Podés seguir paso a paso."; }
  }
  pxSave();
  renderPacmanExplorer(true);
}

function pxPosition(point, level = pxLevel()) { return `left:${(point[0]+.5)/level.cols*100}%;top:${(point[1]+.5)/level.rows*100}%`; }
function pxBoard(level, world, preview = false) {
  const theme = PX_WORLDS[level.world];
  const decorations = [];
  for (let y = 0; y < level.rows; y++) for (let x = 0; x < level.cols; x++) {
    if (level.path.some(point => pxSame(point,[x,y]))) continue;
    const hash = (x*7+y*11+level.index*3)%9;
    if (hash === 0 || hash === 3 || hash === 6) decorations.push({point:[x,y],kind:level.world === 0 ? (hash===3?"plant":"tree") : level.world === 1 ? (hash===3?"rock":"cactus") : (hash===3?"rock":"crystal")});
  }
  return `<div class="px-world px-world-${theme.id} ${preview ? "px-world-preview" : ""}" style="--cols:${level.cols};--rows:${level.rows}" aria-label="${preview ? 'Una isla con Pac-Man y su camino' : escapeHtml(level.name) + '. Sendero de '+level.cols+' columnas y '+level.rows+' filas.'}" role="img">
    <div class="px-sky"><span class="px-orbit"></span><span class="px-cloud px-cloud-one"></span><span class="px-cloud px-cloud-two"></span><i class="px-sky-star px-sky-star-one">✦</i><i class="px-sky-star px-sky-star-two">✧</i></div>
    <div class="px-island-shadow"></div><div class="px-island"><div class="px-island-edge"></div><div class="px-board" style="aspect-ratio:${level.cols}/${level.rows}">
      ${Array.from({length:level.cols*level.rows},(_,i)=>{const p=[i%level.cols,Math.floor(i/level.cols)];const path=level.path.some(item=>pxSame(item,p));return `<span class="px-tile ${path?'px-path':'px-grass'} ${pxSame(p,level.start)?'px-start-tile':''} ${pxSame(p,level.goal)?'px-goal-tile':''}" style="--tile:${i%4}">${path?'<i></i>':(i%5===0?'<b>✧</b>':'')}</span>`;}).join("")}
      <span class="px-landmark px-start-flag" style="${pxPosition(level.start,level)}">${pxArt("flag")}</span>
      ${decorations.map(item=>`<span class="px-decoration px-decoration-${item.kind}" style="${pxPosition(item.point,level)}">${pxArt(item.kind)}</span>`).join("")}
      <span class="px-landmark px-portal ${pxWon(level,world)?'is-ready':''}" style="${pxPosition(level.goal,level)}">${pxArt("portal")}<i class="px-portal-glow"></i></span>
      ${level.friend?`<span class="px-friend" style="${pxPosition([Math.max(0,level.goal[0]-.55),Math.max(0,level.goal[1]-.55)],level)}">${pxArt("friend")}</span>`:""}
      ${level.cherries.map((point,i)=>`<span class="px-object px-cherry ${world.cherries.includes(pxKey(point))?'is-collected':''}" data-px-cherry="${pxKey(point)}" style="${pxPosition(point,level)};--delay:${i*.4}s">${pxArt("cherry")}</span>`).join("")}
      ${level.key?`<span class="px-object px-key ${world.key?'is-collected':''}" data-px-key style="${pxPosition(level.key,level)}">${pxArt("key")}</span>`:""}
      ${level.door?`<span class="px-landmark px-door ${world.door?'is-open':''}" data-px-door style="${pxPosition(level.door,level)}">${pxArt("door")}</span>`:""}
      <span class="px-player" data-px-player style="${pxPosition(world.position,level)}"><i class="px-player-shadow"></i><span class="px-player-hop"><span class="px-player-turn" style="transform:rotate(${world.angle}deg)">${pxArt("pac")}</span></span></span>
    </div></div><span class="px-world-tag">${pxIcon(theme.icon)}${theme.short.toUpperCase()} · ISLA ${level.index%4+1}</span>
  </div>`;
}

function pxHeader(library = false) {
  return `<header class="px-header"><button type="button" class="px-back" data-action="${library?'supports':'px-library'}">${pxIcon("left")}<span>${library?'Mis apoyos':'Mis islas'}</span></button>
    <span class="px-brand">${pxArt("pac")}<span>PAC-MAN<strong>explorador</strong></span></span>
    <button type="button" class="px-motion-button" data-action="px-motion" aria-pressed="${pxReadProgress().quiet}" aria-label="${pxReadProgress().quiet?'Activar animaciones':'Reducir animaciones'}">${pxIcon("leaf")}<span>${pxReadProgress().quiet?'Movimiento reducido':'Menos movimiento'}</span></button></header>`;
}
function pxLibrary() {
  const progress = pxReadProgress(), unlocked = pxUnlocked(), draft = progress.draft;
  const resume = Number.isInteger(draft?.level) && draft.level >= 0 && draft.level <= unlocked && !progress.completed.includes(PX_LEVELS[draft.level].id) ? draft.level : unlocked;
  const allDone = progress.completed.length === PX_LEVELS.length;
  return `${pxHeader(true)}<div class="px-library-content"><section class="px-hero"><div class="px-hero-copy"><p class="px-eyebrow"><span></span>UNA AVENTURA, BLOQUE A BLOQUE</p><h1>Pequeños pasos.<br><em>Grandes descubrimientos.</em></h1><p class="px-hero-description">Prepará el camino de Pac-Man.<br>Juntá cerezas, abrí puertas y explorá nuevas islas.</p>
    <button type="button" class="px-primary px-hero-start" data-action="px-level" data-value="${resume}" data-restore="true">${allDone?'Volver a explorar':progress.completed.length || draft?.program?.length?'Seguir mi aventura':'Empezar la aventura'}${pxIcon("right")}</button>
    <div class="px-hero-note">${pxIcon("flag")}<span>${progress.completed.length} de 12 islas descubiertas</span><b>·</b><span>Sin reloj</span></div></div>
    <div class="px-hero-art">${pxBoard(PX_LEVELS[0],pxInitialWorld(PX_LEVELS[0]),true)}<span class="px-hero-sticker px-sticker-code">${pxIcon("right")}<span>Vos armás el plan.</span></span><span class="px-hero-sticker px-sticker-star">${pxIcon("star")}¡Vamos, Ian!</span></div></section>
    <section class="px-worlds" aria-label="Los tres mundos">${PX_WORLDS.map((world,w)=>{const available=unlocked>=w*4;const complete=PX_LEVELS.slice(w*4,w*4+4).filter(level=>progress.completed.includes(level.id)).length;return `<article class="px-world-card px-card-${world.id} ${available?'':'is-locked'}"><div class="px-world-card-top"><span class="px-world-emblem">${pxIcon(world.icon)}</span><span>MUNDO 0${w+1}</span><small>${complete}/4</small></div><h2>${world.title}</h2><p>${world.subtitle}</p><div class="px-island-buttons">${PX_LEVELS.slice(w*4,w*4+4).map(level=>{const done=progress.completed.includes(level.id);return `<button type="button" data-action="px-level" data-value="${level.index}" class="${done?'is-done':''} ${level.index===unlocked?'is-next':''}" ${level.index>unlocked?'disabled':''} aria-label="Isla ${level.index+1}: ${level.name}${done?', completada':level.index>unlocked?', por descubrir':''}">${done?pxIcon('check'):level.index>unlocked?pxIcon('lock'):level.index+1}</button>`;}).join('')}</div>${!available?`<span class="px-world-lock">${pxIcon('lock')}Se abre al completar el mundo anterior</span>`:''}</article>`;}).join('')}</section>
    <footer class="px-library-footer"><span>${pxIcon('leaf')}A tu ritmo. Podés probar todas las veces que quieras.</span><span>12 ISLAS · 3 MUNDOS · TU PROPIO CAMINO</span></footer></div>`;
}

function pxCommandButton(op) {
  const command = PX_COMMANDS[op];
  return `<button type="button" class="px-command px-command-${command.type}" data-action="px-add" data-value="${op}" ${pxState.phase==='running'||pxState.phase==='complete'||pxBlockCount(pxState.program)>=PX_MAX_BLOCKS?'disabled':''}>${pxIcon(command.icon)}<span>${command.label}</span><b aria-hidden="true">+</b></button>`;
}
function pxProgramRow(block, path, number) {
  const command = PX_COMMANDS[block.op];
  const selected = pxState.selected === path;
  return `<div class="px-code-row ${selected?'is-selected':''}" data-px-step="${path}"><span class="px-step-number">${number}</span><button type="button" class="px-code-block px-code-${command.type}" data-action="px-select" data-value="${path}" aria-label="Paso ${number}: ${command.label}. Tocar para editar." aria-pressed="${selected}" ${pxState.phase==='running'?'disabled':''}>${pxIcon(command.icon)}<strong>${command.label}</strong><span class="px-block-grip" aria-hidden="true">⠿</span></button></div>`;
}
function pxProgram() {
  if (!pxState.program.length) return `<div class="px-empty-plan"><span>${pxIcon('right')}${pxIcon('up')}${pxIcon('hand')}</span><strong>Tu aventura empieza acá</strong><p>Tocá un bloque de abajo<br>para agregarlo a tu plan.</p><i>↓</i></div>`;
  return pxState.program.map((block,i)=>block.op==='repeat'?`<div class="px-repeat ${pxState.insert===i?'is-inserting':''} ${pxState.selected===String(i)?'is-selected':''}" data-px-step="${i}"><div class="px-repeat-top"><button type="button" data-action="px-select" data-value="${i}" class="px-repeat-title" ${pxState.phase==='running'?'disabled':''}>${pxIcon('loop')}Repetir</button><div class="px-repeat-counter"><button type="button" data-action="px-count" data-index="${i}" data-value="-1" aria-label="Repetir menos veces" ${block.count<=2||pxState.phase==='running'?'disabled':''}>−</button><strong>${block.count}<small>veces</small></strong><button type="button" data-action="px-count" data-index="${i}" data-value="1" aria-label="Repetir más veces" ${block.count>=4||pxState.phase==='running'?'disabled':''}>+</button></div></div><div class="px-repeat-body">${block.body.map((child,j)=>pxProgramRow(child,`${i}.${j}`,j+1)).join('')}<button type="button" class="px-repeat-insert" data-action="px-inside" data-index="${i}" ${pxState.phase==='running'?'disabled':''}>${pxState.insert===i?'Tocá los bloques para ponerlos acá':'+ Agregar dentro'}</button></div></div>`:pxProgramRow(block,String(i),i+1)).join('');
}
function pxObjectives(level, world) {
  return `<span class="px-objective ${world.cherries.length===level.cherries.length?'is-done':''}" data-px-cherry-count>${pxArt('cherry')}<b>${world.cherries.length}<i>/ ${level.cherries.length}</i></b></span>${level.key?`<span class="px-objective ${world.key?'is-done':''}" data-px-key-count>${pxArt('key')}${world.key?pxIcon('check'):'<b>Llave</b>'}</span>`:''}<span class="px-objective ${pxSame(world.position,level.goal)?'is-done':''}" data-px-goal-count>${pxIcon('flag')}<b>Portal</b></span>`;
}
function pxPlayScreen() {
  const level = pxLevel(), theme = PX_WORLDS[level.world], running = pxState.phase==='running', complete=pxState.phase==='complete';
  const count = pxBlockCount(pxState.program);
  return `${pxHeader()}<div class="px-play-content"><header class="px-mission-header"><div><p class="px-eyebrow">${theme.title.toUpperCase()}<span class="px-mission-index">MISIÓN ${String(level.index+1).padStart(2,'0')} / 12</span></p><h1>${level.name}</h1></div><div class="px-mission-goals" aria-label="Objetivos de la misión">${pxObjectives(level,pxState.world)}</div></header>
    <div class="px-play-layout"><section class="px-scene-panel" aria-label="El mapa de la misión">${pxBoard(level,pxState.world)}<div class="px-scene-caption"><span>${pxIcon('flag')}La bandera marca el inicio.</span><span>${pxIcon('star')}Recogé ${level.cherries.length===1?'la cereza':'las cerezas'} y llegá al portal.</span></div>
      ${complete?`<div class="px-victory" role="status"><div class="px-victory-seal">${pxIcon('star')}</div><span>ISLA DESCUBIERTA</span><h2>${level.index===11?'¡Una gran aventura, Ian!':'¡Abriste el camino!'}</h2><p>${level.index===11?'Exploraste los tres mundos con tus propios planes.':'Tu plan llevó a Pac-Man hasta el portal.'}</p><button type="button" class="px-primary" data-action="${level.index===11?'px-library':'px-next'}">${level.index===11?'Ver mis islas':'La próxima isla'}${pxIcon('right')}</button><button type="button" class="px-text-button" data-action="px-reset">Probar otro plan</button></div>`:''}</section>
      <section class="px-workshop" aria-label="Armá tu programa"><div class="px-workshop-heading"><span class="px-editor-mark">${pxIcon('book')}</span><div><h2>Mi plan</h2><p>Los bloques se leen de arriba hacia abajo.</p></div><span class="px-block-count">${count}<i>/${PX_MAX_BLOCKS}</i></span></div>
        <div class="px-program-scroll" data-px-program tabindex="0" aria-label="Bloques de tu plan">${pxProgram()}</div>
        <div class="px-edit-tools">${pxState.selected!==null&&!running&&!complete?`<span>Editar bloque</span><button type="button" data-action="px-order" data-value="-1" aria-label="Subir el bloque seleccionado">${pxIcon('up')}</button><button type="button" data-action="px-order" data-value="1" aria-label="Bajar el bloque seleccionado">${pxIcon('down')}</button><button type="button" data-action="px-remove" aria-label="Quitar el bloque seleccionado">${pxIcon('trash')}</button><button type="button" data-action="px-deselect" aria-label="Terminar de editar">${pxIcon('check')}</button>`:`<span>${pxState.insert!==null?`${pxIcon('loop')}Agregando dentro de Repetir`:'Elegí los bloques para tu aventura.'}</span>${pxState.insert!==null?'<button type="button" class="px-outside" data-action="px-outside">Seguir debajo ↓</button>':pxState.program.length&&!['running','complete'].includes(pxState.phase)?'<button type="button" class="px-clear-plan" data-action="px-clear">Borrar plan</button>':''}`}</div>
        <div class="px-palette" aria-label="Bloques disponibles">${level.commands.map(pxCommandButton).join('')}${level.repeat?`<button type="button" class="px-command px-command-repeat" data-action="px-repeat" ${running||complete||count>=PX_MAX_BLOCKS?'disabled':''}>${pxIcon('loop')}<span>Repetir</span><b aria-hidden="true">+</b></button>`:''}</div>
        <div class="px-plan-feedback ${pxState.phase==='error'?'is-error':''}" role="status" aria-live="polite" aria-atomic="true"><span class="px-feedback-dot"></span><p data-px-feedback>${escapeHtml(pxState.feedback)}</p></div>
        <div class="px-run-controls">${running?`<button type="button" class="px-primary" data-action="px-pause" ${pxState.pauseRequested?'disabled':''}>${pxIcon('pause')}${pxState.pauseRequested?'Pausando…':'Pausa'}</button>`:`<button type="button" class="px-primary" data-action="px-run" ${!count||complete?'disabled':''}>${pxIcon('play')}${pxState.phase==='paused'?'Seguir mi plan':'Ejecutar'}</button>`}<button type="button" class="px-step-button" data-action="px-step" ${!count||running||complete?'disabled':''}>${pxIcon('step')}<span>Ver un paso</span></button><button type="button" class="px-reset-button" data-action="px-reset" aria-label="Volver al inicio conservando los bloques" ${running?'disabled':''}>${pxIcon('reset')}</button></div>
      </section></div><footer class="px-play-footer"><button type="button" class="px-hint-button" data-action="px-hint" aria-expanded="${pxState.hint}" ${running?'disabled':''}>${pxIcon('bulb')}${pxState.hint?'Guardar pista':'Una pista'}</button><p>${pxState.hint?escapeHtml(level.hint):'Probá, mirá qué pasa y cambiá tu plan. Cada intento es un descubrimiento.'}</p><span>${pxIcon('leaf')}Sin reloj · Sin apuro</span></footer></div>`;
}

function renderPacmanExplorer(animate = false) {
  pxIntroAnimation?.revert(); pxIntroAnimation=null;
  if (!pxState) pxState = {screen:"library"};
  renderShell(`<section class="px-screen ${pxQuiet()?'px-quiet':''} px-theme-${pxState.screen==='play'?PX_WORLDS[pxLevel().world].id:'garden'}">${pxState.screen==='play'?pxPlayScreen():pxLibrary()}</section>`);
  if (pxState.screen==='play') pxHighlight();
  if (animate && window.gsap && !pxQuiet()) {
    pxIntroAnimation=window.gsap.context(()=>{
      if(pxState.screen==='library'){
        window.gsap.from(".px-hero-copy > *, .px-world-card", {opacity:0,y:16,duration:.65,stagger:.07,ease:"power3.out",clearProps:"all"});
        window.gsap.from(".px-hero-art", {opacity:0,y:24,rotation:2,duration:.9,ease:"power3.out",clearProps:"all"});
      }else window.gsap.from(".px-mission-header,.px-scene-panel,.px-workshop", {opacity:0,y:16,duration:.6,stagger:.08,ease:"power3.out",clearProps:"all"});
    }, document.querySelector('.px-screen'));
  }
}

function pxHighlight() {
  for (const row of document.querySelectorAll?.('[data-px-step]') || []) row.classList.toggle('is-current',row.dataset.pxStep===pxState.highlight);
}
function pxResetForEdit() {
  pxRunId++; pxCancelAnimation();
  pxState.world=pxInitialWorld(pxLevel()); pxState.cursor=0; pxState.phase='edit'; pxState.highlight=''; pxState.pauseRequested=false;
  pxState.feedback="Tu plan está listo para probar desde la bandera.";
}
function pxSelectedContainer() {
  if (pxState.selected===null) return null;
  const parts=pxState.selected.split('.').map(Number);
  if (parts.some(index=>!Number.isInteger(index)||index<0)) return null;
  if (parts.length===1 && parts[0]<pxState.program.length) return {list:pxState.program,index:parts[0],parent:null};
  if (parts.length===2 && pxState.program[parts[0]]?.op==='repeat' && parts[1]<pxState.program[parts[0]].body.length) return {list:pxState.program[parts[0]].body,index:parts[1],parent:parts[0]};
  return null;
}
function pxAnimateStep(before, after, step, failed = false) {
  const player=document.querySelector('[data-px-player]');
  if (!player || !window.gsap || pxQuiet()) return Promise.resolve();
  const level=pxLevel(), gsap=window.gsap;
  return new Promise(resolve=>{
    pxResolveAnimation=resolve;
    const done=()=>{pxResolveAnimation=null;pxTween=null;player.classList.remove('is-walking');resolve();};
    const timeline=pxTween=gsap.timeline({onComplete:done});
    if (failed) { timeline.to(player,{x:5,duration:.07,repeat:3,yoyo:true,ease:'sine.inOut'}).set(player,{x:0}); return; }
    if (PX_COMMANDS[step.op].type==='move') {
      player.classList.add('is-walking');
      const turn=player.querySelector('.px-player-turn');
      gsap.set(turn,{rotation:after.angle});
      timeline.to(player,{left:`${(after.position[0]+.5)/level.cols*100}%`,top:`${(after.position[1]+.5)/level.rows*100}%`,duration:.55,ease:'power1.inOut'})
        .to(player.querySelector('.px-player-hop'),{y:-9,duration:.25,repeat:1,yoyo:true,ease:'sine.inOut'},0).to({}, {duration:.14});
    } else if (step.op==='take') {
      const item=before.key!==after.key?document.querySelector('[data-px-key]'):[...document.querySelectorAll('[data-px-cherry]')].find(node=>after.cherries.includes(node.dataset.pxCherry)&&!before.cherries.includes(node.dataset.pxCherry));
      if (item) timeline.to(item,{y:-25,scale:1.3,rotation:12,duration:.25,ease:'power2.out'}).to(item,{y:-58,scale:.2,opacity:0,duration:.3,ease:'power2.in'});
      timeline.to(player.querySelector('.px-player-hop'),{y:-8,duration:.18,repeat:1,yoyo:true,ease:'sine.inOut'},0).to({}, {duration:.15});
    } else {
      const leaf=document.querySelector('.px-door-leaf');
      if (leaf) timeline.to(leaf,{scaleX:.05,opacity:.25,transformOrigin:'25% 90%',duration:.65,ease:'power2.inOut'});
      timeline.to({}, {duration:.18});
    }
  });
}
function pxSyncWorld() {
  const world=pxState.world, level=pxLevel();
  const player=document.querySelector('[data-px-player]');
  if (player) { player.style.left=`${(world.position[0]+.5)/level.cols*100}%`; player.style.top=`${(world.position[1]+.5)/level.rows*100}%`; player.classList.remove('is-walking'); }
  for (const item of document.querySelectorAll?.('[data-px-cherry]')||[]) item.classList.toggle('is-collected',world.cherries.includes(item.dataset.pxCherry));
  document.querySelector('[data-px-key]')?.classList.toggle('is-collected',world.key);
  document.querySelector('[data-px-door]')?.classList.toggle('is-open',world.door);
  const objectives=document.querySelector('.px-mission-goals'); if(objectives) objectives.innerHTML=pxObjectives(level,world);
}
function pxComplete() {
  pxState.phase='complete'; pxState.feedback='¡Tu plan llegó al portal!';
  const progress=pxReadProgress(); if(!progress.completed.includes(pxLevel().id))progress.completed.push(pxLevel().id);
  pxSave(); renderPacmanExplorer();
  if(window.gsap&&!pxQuiet()) {
    const gsap=window.gsap;
    pxIntroAnimation=gsap.context(()=>{
      gsap.from('.px-victory',{opacity:0,y:18,scale:.93,duration:.6,ease:'back.out(1.4)',clearProps:'all'});
      gsap.from('.px-victory-seal',{scale:.2,rotation:-60,duration:.8,ease:'back.out(2)',clearProps:'all'});
    },document.querySelector('.px-screen'));
  }
}
async function pxExecute(oneStep = false) {
  if(route.view!=='support-explorer'||pxState?.screen!=='play'||['running','complete'].includes(pxState.phase)||!pxState.program.length)return;
  const expanded=pxExpand(pxState.program);
  if(expanded.error){pxState.phase='error';pxState.feedback=expanded.error;pxState.highlight=expanded.path;return renderPacmanExplorer();}
  if(pxState.phase!=='paused')pxResetForEdit();
  const run=++pxRunId;
  pxState.phase='running';pxState.pauseRequested=false;renderPacmanExplorer();
  while(pxState.cursor<expanded.steps.length){
    if(run!==pxRunId||route.view!=='support-explorer')return;
    const step=expanded.steps[pxState.cursor],before=pxState.world,result=pxApply(pxLevel(),before,step.op);
    pxState.highlight=step.path;pxHighlight();
    const row=[...document.querySelectorAll?.('[data-px-step]')||[]].find(item=>item.dataset.pxStep===step.path);
    row?.scrollIntoView?.({block:'nearest',behavior:pxQuiet()?'instant':'smooth'});
    const status=document.querySelector('[data-px-feedback]');
    if(status)status.textContent=step.iteration?`${PX_COMMANDS[step.op].label} · Repetición ${step.iteration} de ${step.count}`:`Paso ${pxState.cursor+1}: ${PX_COMMANDS[step.op].label}`;
    if(result.error){
      await pxAnimateStep(before,before,step,true);
      if(run!==pxRunId)return;
      pxState.phase='error';pxState.feedback=result.error;pxSave();renderPacmanExplorer();return;
    }
    pxState.world=result.world;pxState.cursor++;pxSave();
    await pxAnimateStep(before,result.world,step);
    if(run!==pxRunId||route.view!=='support-explorer')return;
    pxSyncWorld();
    if((oneStep||pxState.pauseRequested)&&pxState.cursor<expanded.steps.length){pxState.phase='paused';pxState.feedback='Paso listo. Podés ver otro paso o seguir el plan.';pxSave();renderPacmanExplorer();return;}
  }
  if(pxWon(pxLevel(),pxState.world))return pxComplete();
  pxState.phase='error';pxState.feedback=pxState.world.cherries.length<pxLevel().cherries.length?'El plan terminó. Todavía hay cerezas para recoger.':"El plan terminó. Falta llegar al portal.";pxSave();renderPacmanExplorer();
}

function pacmanExplorerAction(action,target) {
  if(action==='px-open') {
    if(route.view!=='supports')return;
    if(!pxState)pxState={screen:'library'};
    setRoute({view:'support-explorer'});renderPacmanExplorer(true);return;
  }
  if(route.view!=='support-explorer')return;
  if(action==='px-library'){leavePacmanExplorer();pxState={screen:'library'};return renderPacmanExplorer(true);}
  if(action==='px-motion'){pxReadProgress().quiet=!pxReadProgress().quiet;pxSave();if(pxState?.phase==='running')leavePacmanExplorer();return renderPacmanExplorer();}
  if(action==='px-level')return pxLoadLevel(Number(target.dataset.value),target.dataset.restore==='true');
  if(pxState?.screen!=='play')return;
  if(action==='px-hint'){if(pxState.phase==='running')return;pxState.hint=!pxState.hint;return renderPacmanExplorer();}
  if(action==='px-pause'&&pxState.phase==='running'){pxState.pauseRequested=true;const button=document.querySelector('[data-action="px-pause"]');if(button){button.disabled=true;button.textContent='Pausando…';}return;}
  if(pxState.phase==='running')return;
  if(action==='px-next'&&pxState.phase==='complete')return pxLoadLevel(pxState.level+1);
  if(action==='px-reset'){pxResetForEdit();pxState.selected=null;pxState.insert=null;pxSave();return renderPacmanExplorer();}
  if(pxState.phase==='complete')return;
  if(action==='px-clear'){pxState.program=[];pxState.insert=null;pxState.selected=null;pxResetForEdit();pxSave();return renderPacmanExplorer();}
  if(action==='px-run')return pxExecute();
  if(action==='px-step')return pxExecute(true);
  if(action==='px-select'){
    pxState.selected=target.dataset.value;
    if(!pxSelectedContainer())pxState.selected=null;
    return renderPacmanExplorer();
  }
  if(action==='px-deselect'){pxState.selected=null;return renderPacmanExplorer();}
  if(action==='px-inside'){
    const i=Number(target.dataset.index);if(!Number.isInteger(i)||pxState.program[i]?.op!=='repeat')return;
    pxState.insert=i;pxState.selected=null;return renderPacmanExplorer();
  }
  if(action==='px-outside'){pxState.insert=null;pxState.selected=null;return renderPacmanExplorer();}
  let changed=false;
  if(action==='px-add'&&pxLevel().commands.includes(target.dataset.value)&&pxBlockCount(pxState.program)<PX_MAX_BLOCKS){
    const block={op:target.dataset.value};
    if(pxState.insert!==null&&pxState.program[pxState.insert]?.op==='repeat')pxState.program[pxState.insert].body.push(block);else pxState.program.push(block);
    pxState.selected=null;changed=true;
  }else if(action==='px-repeat'&&pxLevel().repeat&&pxBlockCount(pxState.program)<PX_MAX_BLOCKS){
    pxState.program.push({op:'repeat',count:2,body:[]});pxState.insert=pxState.program.length-1;pxState.selected=null;changed=true;
  }else if(action==='px-count'){
    const i=Number(target.dataset.index),delta=Number(target.dataset.value),block=pxState.program[i];
    if(!Number.isInteger(i)||block?.op!=='repeat'||![1,-1].includes(delta))return;
    const count=block.count+delta;if(count<2||count>4)return;block.count=count;changed=true;
  }else if(['px-order','px-remove'].includes(action)){
    const selected=pxSelectedContainer();if(!selected)return;
    if(action==='px-remove'){
      selected.list.splice(selected.index,1);
      if(selected.parent===null){if(pxState.insert===selected.index)pxState.insert=null;else if(pxState.insert>selected.index)pxState.insert--;}
      pxState.selected=null;changed=true;
    }else{
      const delta=Number(target.dataset.value),next=selected.index+delta;if(![1,-1].includes(delta)||next<0||next>=selected.list.length)return;
      [selected.list[selected.index],selected.list[next]]=[selected.list[next],selected.list[selected.index]];
      if(selected.parent===null&&pxState.insert!==null){if(pxState.insert===selected.index)pxState.insert=next;else if(pxState.insert===next)pxState.insert=selected.index;}
      pxState.selected=selected.parent===null?String(next):`${selected.parent}.${next}`;changed=true;
    }
  }
  if(changed){
    pxResetForEdit();pxSave();renderPacmanExplorer();
    const scroll=document.querySelector('[data-px-program]');if(scroll&&action.startsWith('px-add'))scroll.scrollTop=scroll.scrollHeight;
    if(window.gsap&&!pxQuiet()&&['px-add','px-repeat'].includes(action))window.gsap.from('.px-code-row:last-child .px-code-block,.px-repeat:last-child',{y:8,scale:.97,opacity:.4,duration:.25,ease:'power2.out',clearProps:'all'});
  }
}

document.addEventListener('visibilitychange',()=>{
  if(document.hidden&&route.view==='support-explorer'&&pxState?.phase==='running'){leavePacmanExplorer();renderPacmanExplorer();}
});
