// Original, offline activities. One editable response, one check, manual advance.
const SCHOOL_EXPEDITION_THEMES = [
  { subject: "lengua", expeditionMode: "causes", title: "Detectives del porqué", description: "Leé una pequeña historia y descubrí qué hizo que algo pasara.", badge: "LEER Y COMPRENDER", accent: "#f5b79c", lesson: "Buscamos causas y consecuencias.", symbol: "01" },
  { subject: "cs-naturales", expeditionMode: "food", title: "La red de la vida", description: "Conectá seres vivos y descubrí quién sirve de alimento a quién.", badge: "SERES VIVOS CONECTADOS", accent: "#a7d9b0", lesson: "Seguimos el camino del alimento.", symbol: "02" },
  { subject: "cs-sociales", expeditionMode: "journey", title: "El viaje de los productos", description: "Seguí productos, personas y trabajos desde su origen hasta el negocio.", badge: "LOS VIAJES DE LOS PRODUCTOS", accent: "#a4ccef", lesson: "Conectamos el campo y la ciudad.", symbol: "03" },
  { subject: "matematicas", expeditionMode: "fractions", title: "Pizzería de las fracciones", description: "Prepará pedidos con medios, cuartos y octavos de una pizza.", badge: "PARTES DE UN ENTERO", accent: "#f3ce72", lesson: "Distintas porciones, la misma cantidad.", symbol: "04" },
  { subject: "ingles", expeditionMode: "clothes", title: "Ready for the weather", description: "Leé una prenda y un color en inglés y prepará la ropa para salir.", badge: "CLOTHES & COLOURS", accent: "#c9b8ed", lesson: "Leemos dos pistas en inglés.", symbol: "05" },
  { subject: "tecnologia", expeditionMode: "design", title: "El taller de los inventos", description: "Elegí un material para cada necesidad y mirá cómo funciona.", badge: "DISEÑAR Y PROBAR", accent: "#9edbd7", lesson: "Elegimos materiales por sus propiedades.", symbol: "06" }
].map(t => ({ ...t, id: `expedition-${t.expeditionMode}`, activityLabel: "NUEVO · 5 desafíos animados", randomExerciseCount: 5,
  exercises: [{ id: `expedition-${t.expeditionMode}`, type: "school-expedition", prompt: t.title }] }));

const SE_STORIES = [
  ["rain", "Luna dejó su dibujo en el patio. Empezó a llover y el papel se mojó.", "¿Por qué se mojó el dibujo?", "Porque le cayó lluvia.", ["Porque Luna lo guardó.", "Porque salió el sol.", "Porque el papel era grande."], "La lluvia cayó sobre el dibujo que estaba afuera. Esa es la causa de que se mojara."],
  ["wind", "Tomás abrió la ventana. Una ráfaga de viento hizo volar las hojas de su cuaderno.", "¿Qué hizo volar las hojas?", "El viento que entró.", ["La luz de la ventana.", "El color del cuaderno.", "La mesa de Tomás."], "Al abrir la ventana entró viento, y ese viento movió las hojas."],
  ["spill", "La pelota golpeó el vaso. El vaso se volcó y el agua cayó sobre la mesa.", "¿Por qué se volcó el vaso?", "Porque lo golpeó la pelota.", ["Porque la mesa estaba seca.", "Porque alguien bebió agua.", "Porque el vaso estaba lejos."], "El golpe de la pelota hizo que el vaso perdiera el equilibrio y se volcara."],
  ["dark", "Se cortó la electricidad mientras Eva leía. Como la habitación quedó oscura, buscó una linterna.", "¿Por qué Eva buscó una linterna?", "Porque la habitación quedó oscura.", ["Porque terminó de leer.", "Porque quería abrir la puerta.", "Porque el libro estaba mojado."], "Eva necesitaba luz para seguir leyendo. La oscuridad explica que buscara la linterna."],
  ["ice", "Nico dejó un cubito en un plato al sol. Un rato después encontró agua en el plato.", "¿Por qué había agua en el plato?", "Porque el calor derritió el hielo.", ["Porque llovió dentro de casa.", "Porque el plato se rompió.", "Porque Nico agregó otro cubito."], "El hielo recibió calor del sol y se derritió. Por eso quedó agua líquida."],
  ["ball", "Mora pateó la pelota hacia el arco. La pelota cruzó la línea y su equipo festejó el gol.", "¿Qué hizo el equipo después del gol?", "Festejó.", ["Guardó la pelota antes del partido.", "Cerró la ventana.", "Empezó a regar el pasto."], "El gol ocurrió primero; el festejo vino después, como consecuencia."],
  ["umbrella", "Santi vio que comenzaba a llover. Abrió el paraguas para caminar sin mojarse.", "¿Para qué abrió Santi el paraguas?", "Para protegerse de la lluvia.", ["Para secar la vereda.", "Para que lloviera más.", "Para guardar sus zapatillas."], "El paraguas cubre a Santi y evita que la lluvia le caiga directamente encima."],
  ["kite", "El viento empujaba con fuerza el barrilete. Amalia sostuvo el hilo y lo vio subir.", "¿Qué ayudó al barrilete a subir?", "El viento que lo empujaba.", ["La sombra de Amalia.", "El color del hilo.", "Una piedra en el suelo."], "El viento empujó el barrilete. Amalia sostuvo el hilo mientras el barrilete subía."],
  ["cloth", "Un vaso de agua se volcó en la mesa. Julia buscó un paño y secó el charco.", "¿Por qué Julia buscó un paño?", "Para secar el agua derramada.", ["Para llenar el vaso.", "Para abrir una ventana.", "Para inflar la pelota."], "El agua derramada explica la acción de Julia: usó el paño para absorberla."],
  ["dark", "Leo encendió la linterna. Ahora pudo ver la llave que estaba debajo de la mesa.", "¿Qué le permitió ver la llave?", "La luz de la linterna.", ["El ruido de la puerta.", "La forma de la mesa.", "El tamaño de la llave."], "La linterna iluminó el lugar oscuro. Gracias a esa luz, Leo pudo encontrar la llave."]
];
const SE_LIFE = {
  grass: ["Pasto", "grass"], leaf: ["Hojas", "leaf"], corn: ["Granos de maíz", "corn"], seed: ["Semillas", "seed"], algae: ["Algas", "algae"],
  hopper: ["Saltamontes", "hopper"], caterpillar: ["Oruga", "caterpillar"], rabbit: ["Conejo", "rabbit"], mouse: ["Ratón", "mouse"], snail: ["Caracol", "snail"], waterSnail: ["Caracol acuático", "snail"],
  frog: ["Rana", "frog"], bird: ["Zorzal", "bird"], fox: ["Zorro", "fox"], owl: ["Lechuza", "owl"], fish: ["Pez que come caracoles", "fish"],
  sparrow: ["Gorrión", "bird"], hawk: ["Halcón", "hawk"], zebra: ["Cebra", "zebra"], lion: ["León", "lion"]
};
// Arrows always point from food to consumer. These are simplified examples,
// not a claim that an animal eats only one food or has only one predator.
const SE_CHAINS = [
  ["En el pastizal", ["grass", "hopper", "frog"], "fox"],
  ["Entre las hojas", ["leaf", "caterpillar", "bird"], "rabbit"],
  ["Cerca del bosque", ["grass", "rabbit", "fox"], "hopper"],
  ["Junto al cultivo", ["corn", "mouse", "owl"], "frog"],
  ["En el agua dulce", ["algae", "waterSnail", "fish"], "rabbit"],
  ["En la pradera", ["seed", "sparrow", "hawk"], "frog"],
  ["En la sabana", ["grass", "zebra", "lion"], "owl"],
  ["En el jardín", ["leaf", "snail", "bird"], "zebra"]
];
const SE_PRODUCTS = [
  ["El pan", "bread", [["Campo", "Se cultiva y cosecha trigo.", "wheat"], ["Molino", "Se muelen los granos y se obtiene harina.", "mill"], ["Panadería", "Se amasa y hornea el pan con la harina.", "bakery"], ["Negocio", "Se vende el pan a las familias.", "shop"]]],
  ["La leche envasada", "milk", [["Tambo", "Se ordeñan las vacas.", "farm"], ["Transporte refrigerado", "La leche viaja fría a la planta.", "truck"], ["Planta láctea", "Se trata y envasa la leche.", "factory"], ["Almacén", "Se vende la leche envasada.", "shop"]]],
  ["La remera de algodón", "shirt", [["Campo", "Se cosecha el algodón.", "cotton"], ["Hilandería", "Las fibras se transforman en hilo.", "mill"], ["Taller textil", "Con el hilo se hace tela y se cose la remera.", "factory"], ["Tienda", "Se venden las remeras.", "shop"]]],
  ["La mesa de madera", "table", [["Plantación forestal", "Se cultivan y cortan árboles para madera.", "tree"], ["Aserradero", "Los troncos se cortan en tablas.", "mill"], ["Carpintería", "Se construye la mesa con las tablas.", "workshop"], ["Mueblería", "Se vende la mesa terminada.", "shop"]]],
  ["El jugo de manzana", "juice", [["Finca", "Se cosechan las manzanas.", "tree"], ["Transporte", "Las manzanas viajan a la planta.", "truck"], ["Planta de jugos", "Se extrae y envasa el jugo.", "factory"], ["Almacén", "Se vende el jugo envasado.", "shop"]]],
  ["La salsa de tomate", "tomato", [["Huerta", "Se cosechan los tomates.", "farm"], ["Transporte", "Los tomates viajan a la fábrica.", "truck"], ["Fábrica", "Se prepara y envasa la salsa.", "factory"], ["Supermercado", "Se vende la salsa envasada.", "shop"]]],
  ["El pulóver de lana", "wool", [["Campo", "Se obtiene lana al esquilar las ovejas.", "farm"], ["Hilandería", "La lana limpia se transforma en hilo.", "mill"], ["Taller de tejido", "Se teje el pulóver con el hilo de lana.", "workshop"], ["Tienda", "Se vende el pulóver.", "shop"]]],
  ["La miel en frasco", "honey", [["Colmenar", "Apicultores retiran panales con miel.", "farm"], ["Sala de extracción", "Se extrae la miel de los panales.", "workshop"], ["Envasado", "Se llenan y cierran los frascos de miel.", "factory"], ["Negocio", "Se venden los frascos de miel.", "shop"]]]
];
const SE_GARMENTS = { coat: "Campera", shirt: "Remera", boots: "Botas", hat: "Gorro", scarf: "Bufanda", shorts: "Pantalón corto" };
const SE_COLOURS = { blue: ["Azul", "#4c7ecd"], red: ["Rojo", "#cf4c55"], green: ["Verde", "#40836a"], yellow: ["Amarillo", "#edbd44"] };
const SE_OUTFITS = [
  ["cold", "coat", "blue"], ["hot", "shirt", "red"], ["rainy", "boots", "yellow"], ["cold", "scarf", "green"],
  ["hot", "shorts", "blue"], ["snowy", "hat", "red"], ["cold", "coat", "green"], ["hot", "shirt", "yellow"],
  ["rainy", "boots", "red"], ["snowy", "scarf", "blue"], ["cold", "hat", "yellow"], ["hot", "shorts", "green"]
];
const SE_MATERIALS = {
  film: ["Lámina plástica", "#8fc9cf", "sheet"], cotton: ["Tela de algodón", "#e9be97", "fabric"], paper: ["Papel", "#f2ead1", "sheet"],
  card: ["Cartón grueso", "#bb9169", "sheet"], clear: ["Acrílico transparente", "#a5cfd9", "sheet"], wood: ["Tabla de madera", "#b88b5e", "wood"],
  elastic: ["Banda de goma elástica", "#bd879f", "elastic"], sponge: ["Esponja", "#e6c961", "sponge"], mirror: ["Espejo", "#acc4d5", "mirror"]
};
const SE_DESIGNS = [
  ["rain", "Un techo para la casita", "Tiene que impedir que las gotas atraviesen la cubierta.", "film", ["cotton", "paper"], "La lámina plástica es impermeable: las gotas resbalan sin atravesarla."],
  ["absorb", "Una toalla para secarse", "Necesitamos un material que absorba el agua.", "cotton", ["film", "clear"], "La tela de algodón absorbe agua. Por eso se usa en muchas toallas."],
  ["light", "Una ventana para mirar", "Tiene que dejar pasar la luz y permitir ver con claridad.", "clear", ["card", "wood"], "El acrílico transparente deja pasar la luz y permite ver a través de él."],
  ["rigid", "Un estante para libros", "Necesitamos una pieza rígida que sostenga los libros sin doblarse.", "wood", ["cotton", "sponge"], "Una tabla de madera de buen espesor es rígida y puede sostener los libros."],
  ["stretch", "Una banda para sujetar lápices", "Debe estirarse y después recuperar su forma.", "elastic", ["paper", "card"], "La goma elástica se estira y recupera su forma al dejar de tirar."],
  ["absorb", "Un paño para juntar un charco", "Elegí algo que absorba el agua de la mesa.", "sponge", ["clear", "film"], "Los poros de la esponja retienen agua. Así puede absorber un pequeño charco."],
  ["fold", "Una caja liviana", "Necesitamos una lámina que se pueda plegar y mantenga la forma de la caja.", "card", ["cotton", "elastic"], "El cartón grueso se puede plegar y tiene suficiente rigidez para una caja liviana."],
  ["reflect", "Un espejo para vernos", "La superficie tiene que reflejar una imagen clara.", "mirror", ["wood", "cotton"], "La superficie lisa del espejo refleja la luz y permite ver una imagen."],
  ["rain", "Una cubierta para la mochila", "Queremos que la lluvia no atraviese la cubierta.", "film", ["paper", "sponge"], "La lámina plástica no absorbe el agua y evita que las gotas la atraviesen."],
  ["light", "Una ventanita de observación", "Hay que mirar las plantas a través de una pared del modelo.", "clear", ["wood", "card"], "Una lámina de acrílico transparente permite observar las plantas del otro lado."]
];

function withSchoolExpeditionThemes(subjectId, themes) {
  const additions = SCHOOL_EXPEDITION_THEMES.filter(t => t.subject === subjectId);
  return [...additions, ...themes.filter(t => !additions.some(a => a.id === t?.id))];
}
function createSchoolExpeditionExercises(theme) {
  const mode = theme.expeditionMode;
  let rounds = [];
  if (mode === "causes") rounds = saTake(SE_STORIES, "expedition-causes").map(([scene, text, prompt, answer, distractors, explanation]) => ({ scene, text, prompt, options: shuffled([answer, ...distractors]), correct: answer, explanation }));
  if (mode === "food") rounds = saTake(SE_CHAINS, "expedition-food").map(([place, correct]) => ({ place, correct, options: shuffled([...correct]), prompt: "Armá el camino del alimento.", explanation: `${SE_LIFE[correct[0]][0]} → ${SE_LIFE[correct[1]][0].toLowerCase()} → ${SE_LIFE[correct[2]][0].toLowerCase()}. La flecha va desde el alimento hacia quien lo come. Es un ejemplo: los seres vivos pueden tener otros alimentos y relaciones.` }));
  if (mode === "journey") rounds = saTake(SE_PRODUCTS, "expedition-journey").map(([product, art, stages]) => ({ product, art, stages, correct: [0, 1, 2, 3], options: shuffled([0, 1, 2, 3]), prompt: "Conectá los trabajos en el orden del viaje.", explanation: stages.map(s => `${s[0]}: ${s[1]}`).join(" ") + " Los transportes conectan los lugares. Este recorrido está simplificado." }));
  if (mode === "fractions") {
    const pool = [[1,2,2],[1,2,4],[1,2,8],[1,4,4],[1,4,8],[3,4,4],[3,4,8],[1,8,8],[3,8,8],[5,8,8],[7,8,8],[2,4,8]];
    rounds = saTake(pool, "expedition-fractions").map(([numerator, denominator, slices]) => ({ numerator, denominator, slices, correct: numerator * slices / denominator, prompt: `Prepará ${numerator}/${denominator} de pizza.`, explanation: `La pizza entera tiene ${slices} porciones iguales. ${numerator}/${denominator} de esta pizza son ${numerator * slices / denominator} de esas porciones.${denominator !== slices ? ` Por eso ${numerator}/${denominator} y ${numerator * slices / denominator}/${slices} representan la misma cantidad.` : ""}` }));
  }
  if (mode === "clothes") rounds = saTake(SE_OUTFITS, "expedition-clothes").map(([weather, garment, colour]) => ({ weather, correct: [garment, colour], options: shuffled(Object.keys(SE_GARMENTS)), colours: shuffled(Object.keys(SE_COLOURS)), prompt: "Prepará la prenda y el color del mensaje.", clue: `It is ${weather}. Choose ${garment === "boots" || garment === "shorts" ? "" : "a "}${colour} ${garment === "shirt" ? "T-shirt" : garment}.`, explanation: `${weather} = ${{cold:"frío",hot:"caluroso",rainy:"lluvioso",snowy:"nevado"}[weather]}. ${garment === "shirt" ? "T-shirt" : garment} = ${SE_GARMENTS[garment].toLowerCase()}; ${colour} = ${SE_COLOURS[colour][0].toLowerCase()}.` }));
  if (mode === "design") rounds = saTake(SE_DESIGNS, "expedition-design").map(([test, name, need, correct, distractors, explanation]) => ({ test, name, need, correct, options: shuffled([correct, ...distractors]), prompt: "Elegí un material que sirva para este diseño.", explanation }));
  return rounds.map((r, i) => ({ ...r, mode, id: `${theme.id}-${i}`, type: "school-expedition" }));
}
function createSchoolExpeditionState() { return { choice: null, sequence: [], pieces: [], garment: null, colour: null, touched: false, checked: false, isCorrect: false }; }
function seCurrent() {
  const exercise = session?.exercises?.[session.index];
  return route.view === "run" && exercise?.type === "school-expedition" ? { exercise, state: session.expeditions[exercise.id] } : null;
}
function seCanCheck(e, s) {
  if (s.checked) return false;
  if (["food", "journey"].includes(e.mode)) return s.sequence.length === e.correct.length;
  if (e.mode === "fractions") return s.touched;
  if (e.mode === "clothes") return !!(s.garment && s.colour);
  return e.options.includes(s.choice);
}
function seSelected(e, s) { return ["food", "journey"].includes(e.mode) ? [...s.sequence] : e.mode === "fractions" ? s.pieces.length : e.mode === "clothes" ? [s.garment, s.colour] : s.choice; }

// Small original vector illustrations share an ink outline, paper colours and
// articulated groups. SVGs never encode the answer in an accessible label.
function seSvg(body, viewBox = "0 0 120 100", label = "") {
  return `<svg viewBox="${viewBox}" ${label ? `role="img" aria-label="${escapeHtml(label)}"` : 'aria-hidden="true"'} xmlns="http://www.w3.org/2000/svg"><g stroke="#294c50" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`;
}
function seArt(id, color = "#8dbeb5") {
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#294c50" stroke="none"/>`;
  const blades = '<path d="M28 83Q24 50 14 44M34 83Q37 42 48 35M44 83Q53 54 64 48M53 83Q62 48 78 40M65 83Q77 62 91 58" stroke="#4d9562" stroke-width="7" fill="none"/>';
  const earAnimal = (ears, fill, face = "") => `${ears}<ellipse cx="60" cy="66" rx="34" ry="21" fill="${fill}"/><circle cx="83" cy="46" r="19" fill="${fill}"/><path d="M36 80h16M65 82h16" stroke-width="7"/>${eye(90,43)}<path d="m101 49-6 4"/>${face}`;
  const bird = (fill, hawk = false) => `<g class="se-animal"><ellipse cx="58" cy="59" rx="30" ry="22" fill="${fill}"/><circle cx="82" cy="39" r="17" fill="${fill}"/><path d="m98 38 14 7-15 5" fill="#e4b55a"/><path class="se-wing" d="M60 50q-35-6-26 25 29 4 34-13" fill="${hawk ? "#8f7867" : "#81a5b3"}"/><path d="m29 60-19-11 5 23 18-2M53 80v11m19-10v10M45 91h15m5 0h15" fill="${fill}"/>${eye(87,36)}</g>`;
  const drawings = {
    grass: blades, leaf: '<path class="se-leaf" d="M26 80Q11 18 94 17 103 72 26 80Z" fill="#83b882"/><path d="M22 86 77 34m-35 35-7-26m20 13 21 1" fill="none"/>',
    algae: '<path d="M31 86q-20-23 0-43t-2-31M57 86q22-20 2-38t3-30M84 86q-20-19-1-40t-1-26" fill="none" stroke="#6aa98d" stroke-width="10"/>',
    corn: '<path d="M40 77Q12 44 30 30l19 21M70 79q35-34 16-50L65 53" fill="#80ac75"/><rect x="42" y="14" width="31" height="68" rx="15" fill="#e8c765"/><path d="M53 21v52m10-52v52M45 32h26M44 45h28M45 58h26" stroke="#b3924c" stroke-width="2"/>',
    seed: '<g fill="#cead6d"><ellipse cx="38" cy="53" rx="10" ry="18" transform="rotate(-30 38 53)"/><ellipse cx="75" cy="38" rx="10" ry="18" transform="rotate(30 75 38)"/><ellipse cx="73" cy="77" rx="10" ry="18" transform="rotate(60 73 77)"/></g>',
    rabbit: earAnimal('<ellipse cx="75" cy="20" rx="7" ry="22" fill="#d9c9b5"/><ellipse cx="90" cy="20" rx="7" ry="22" fill="#d9c9b5"/>', "#d9c9b5", '<circle cx="25" cy="64" r="9" fill="#fff8e7"/>'),
    mouse: earAnimal('<circle cx="74" cy="29" r="13" fill="#b7b9bc"/><circle cx="95" cy="28" r="12" fill="#b7b9bc"/>', "#b7b9bc", '<path d="M28 69Q1 91 9 48" fill="none" stroke="#bc92a4" stroke-width="4"/>'),
    fox: '<path d="M44 69Q5 31 14 84q17 6 34-4" fill="#d99a65"/><path d="M13 68q-4 9 1 16l16-2" fill="#fff0d7"/><ellipse cx="60" cy="68" rx="26" ry="19" fill="#d99a65"/><path d="m66 49 1-34 16 14 16-15 4 35-18 22Z" fill="#d99a65"/><path d="m69 48 16 23 16-23-16 8Z" fill="#fff0d7"/> '+eye(77,43)+eye(93,43)+'<path d="m82 57 4 3 4-3M45 81v8m26-8v8"/>',
    frog: '<ellipse cx="59" cy="65" rx="34" ry="23" fill="#8ab77a"/><path d="M31 65Q1 71 19 87h24M87 65q30 7 12 22H76" fill="#8ab77a"/><circle cx="44" cy="38" r="15" fill="#a7ce8e"/><circle cx="78" cy="38" r="15" fill="#a7ce8e"/>'+eye(44,37)+eye(78,37)+'<path d="M43 61q17 15 34 0" fill="none"/>',
    caterpillar: '<g class="se-animal" fill="#a4bf73">'+[23,39,55,71].map((x,i)=>`<circle cx="${x}" cy="${65-i*3}" r="14"/>`).join("")+'<circle cx="88" cy="45" r="19"/><path d="m82 26-7-12m18 12 6-12M25 78v8m18-11v11m18-14v11m17-14v11"/>'+eye(94,42)+'</g>',
    hopper: '<ellipse cx="61" cy="55" rx="32" ry="12" fill="#9fb878"/><circle cx="91" cy="46" r="13" fill="#adc88b"/><path d="m50 57-24 22h27M69 57 89 78h16M90 33l-5-20m10 21 8-19M36 58l-17 9" fill="none" stroke-width="4"/>'+eye(96,43),
    snail: '<path d="M17 79h70q18 0 16-23l-3-12-7 17H68" fill="#b0bd87"/><circle cx="51" cy="55" r="28" fill="#d6b68c"/><path d="M52 69c-22 0-22-31-2-31 20 0 18 22 4 22-9 0-9-12-2-12M97 46l-4-15m9 16 7-14" fill="none"/>'+eye(94,31)+eye(109,33),
    bird: bird("#b9cdd3"), hawk: bird("#bca88d", true),
    owl: '<path d="m30 29 4-18 19 14h17l18-14 3 20q20 62-31 61-47-2-30-63Z" fill="#cbbd9e"/><ellipse cx="61" cy="59" rx="26" ry="29" fill="#f2e6cc"/><circle cx="45" cy="41" r="14" fill="#fff5db"/><circle cx="77" cy="41" r="14" fill="#fff5db"/>'+eye(46,42)+eye(76,42)+'<path d="m57 51 5 9 5-9M43 88v6m34-6v6" fill="#d9a65a"/>',
    fish: '<path d="m29 51-21-20v41l21-15" fill="#8bb5c2"/><ellipse cx="65" cy="52" rx="37" ry="24" fill="#9cc6cb"/><path d="m53 30 11-14 15 15M63 57l-8 15 21-7M82 34q-11 19 0 36" fill="#6fa0b0"/>'+eye(90,47),
    zebra: '<ellipse cx="56" cy="57" rx="34" ry="21" fill="#f5ecd9"/><path d="m74 49 4-28 20-6 11 22-14 10-4 22M31 72v18m17-14v14m20-14v14m16-21v21" fill="#f5ecd9"/><path d="M36 41v31m13-35v39m14-37v36m15-39 15 7M21 53 9 44M83 22l-4-12m15 7 3-11" stroke-width="5"/>'+eye(99,30),
    lion: '<ellipse cx="54" cy="65" rx="32" ry="20" fill="#d4b06a"/><path d="M30 77v13m37-10v10M26 63Q2 63 11 34" fill="none" stroke="#c19b59" stroke-width="5"/><circle cx="85" cy="43" r="30" fill="#ad7951"/><circle cx="85" cy="43" r="21" fill="#ddbb79"/>'+eye(78,39)+eye(94,39)+'<path d="m82 49 4 4 4-4m-4 4v6"/>',
    wheat: '<path d="M58 88V13m0 20-18-13m18 30L37 37m21 30L39 55m19-14 20-16M58 58l23-16M58 75l19-15" stroke="#c7a14f" stroke-width="7" fill="none"/>',
    tree: '<path d="M55 85V43h12v42" fill="#ab805c"/><path d="M27 51q-17-26 9-33 13-22 34-8 31-4 28 25 18 26-21 29Z" fill="#8fb58c"/>',
    cotton: '<path d="M59 88V53m0 14L34 57m25 18 24-15" fill="none" stroke="#8eaa79" stroke-width="5"/><g fill="#fff8ea"><circle cx="41" cy="38" r="19"/><circle cx="63" cy="26" r="21"/><circle cx="81" cy="42" r="20"/><circle cx="57" cy="49" r="20"/></g>',
    farm: '<path d="M12 47 48 16l36 31v42H12Z" fill="#c88c76"/><path d="M3 49 48 10l44 39" fill="none" stroke-width="5"/><rect x="35" y="59" width="26" height="30" fill="#f1d5a5"/><path d="M92 90V56m-5 15h24m-24 12h24" stroke="#91ac7d" stroke-width="5"/>',
    mill: '<path d="m41 90 8-58h26l8 58Z" fill="#d0b98c"/><circle class="se-wheel" cx="62" cy="37" r="6" fill="#506e72"/><g class="se-mill-blades" fill="#b7d3d4"><path d="m62 32-8-26h13v26ZM67 37l28-7v13H67ZM62 42l7 27H56V42ZM57 37l-28 7V31h28Z"/></g><path d="M56 90V74h12v16" fill="#506e72"/>',
    bakery: '<path d="M20 44h80v45H20Z" fill="#eed6aa"/><path d="m15 43 14-27h62l14 27" fill="#be7e70"/><path d="M24 47h72M32 47v13m14-13v13m14-13v13m14-13v13m14-13v13" stroke="#9fbba5" stroke-width="10"/><rect x="53" y="66" width="27" height="23" fill="#557f87"/><ellipse cx="37" cy="74" rx="9" ry="5" fill="#c29253"/>',
    factory: '<path d="M15 88V44l25 12V36l25 17V31h25v57Z" fill="#98b6bd"/><path d="M79 31V10h11v21" fill="#d5c0a0"/><path d="M27 68h9m14 0h9m14 0h9" stroke="#f5e3ac" stroke-width="9"/><path d="M51 88V77h17v11" fill="#526e74"/>',
    workshop: '<path d="M17 88V41l43-28 43 28v47Z" fill="#cbb898"/><path d="M11 44 60 11l49 33" fill="none" stroke-width="5"/><path d="M32 65h54M39 65v24m40-24v24" stroke="#607f80" stroke-width="6"/><path d="m49 53 19-20 9 8-20 20Z" fill="#a5c2c8"/>',
    shop: '<path d="M17 42h86v47H17Z" fill="#ebd5af"/><path d="m11 43 12-24h74l12 24Z" fill="#8db8b3"/><path d="M22 45v10m18-10v10m20-10v10m20-10v10m18-10v10" stroke="#f5efdb" stroke-width="12"/><rect x="31" y="66" width="24" height="16" fill="#a4cbd2"/><path d="M70 89V64h21v25" fill="#597d85"/>',
    truck: '<rect x="9" y="28" width="63" height="43" rx="5" fill="#8eb8b4"/><path d="M72 43h19l18 19v15H72Z" fill="#d4b780"/><path d="M80 49h9l12 13H80Z" fill="#d8ebdf"/><circle class="se-wheel" cx="30" cy="79" r="11" fill="#405b63"/><circle class="se-wheel" cx="88" cy="79" r="11" fill="#405b63"/><circle cx="30" cy="79" r="4" fill="#c7d6cf"/><circle cx="88" cy="79" r="4" fill="#c7d6cf"/>',
    bread: '<path d="M16 70q0-45 44-45t44 45q0 13-15 13H31q-15 0-15-13Z" fill="#dab373"/><path d="m38 45-7 16m30-23-7 18m29-12-7 17" stroke="#a57b4e" stroke-width="5"/>',
    milk: '<path d="m42 9 30 0 6 14 4 65H33l4-65Z" fill="#f5f0d8"/><path d="M38 43h42v24H36Z" fill="#9ac2c7"/><path d="M40 22h36"/><path d="M43 9V4h28v5" fill="#8bb2bb"/>',
    table: '<path d="M14 45h92v14H14Zm10 14v31m71-31v31" fill="#bb926d" stroke-width="5"/>',
    juice: '<path d="m34 19 8-10h35l8 10v69H34Z" fill="#b2ca88"/><path d="M37 41h45v30H37Z" fill="#f6e5b6"/><circle cx="60" cy="56" r="10" fill="#c98567"/><path d="M60 45V38l7-4"/>',
    tomato: '<path d="M32 30h56v59H32Z" fill="#ca8169"/><rect x="28" y="20" width="64" height="12" rx="4" fill="#a9bb8a"/><circle cx="60" cy="59" r="18" fill="#f0d5ae"/><circle cx="60" cy="60" r="10" fill="#c2745f"/><path d="m54 51 6 6 6-6" stroke="#7e9c70"/>',
    honey: '<rect x="30" y="24" width="60" height="65" rx="13" fill="#dcb65d"/><rect x="32" y="14" width="56" height="13" rx="4" fill="#8aab94"/><path d="M35 46h50v25H35Z" fill="#f2e2b7"/><path d="m60 48 9 6v11l-9 5-9-5V54Z" fill="#c99d4f"/>',
    wool: '<circle cx="60" cy="50" r="35" fill="#c0a1b8"/><path d="M35 25q37 5 49 42M25 40q40 2 56 38M42 19Q18 49 43 80M60 16Q34 51 64 84M73 21q-10 18 3 34M87 76q23-3 24 15" fill="none" stroke="#8d718d"/>',
    sheet: `<path d="m25 18 64 0 12 61-65 7Z" fill="${color}"/><path d="m36 29 43-2m-39 14 45-2m-43 15 45-2" opacity=".3"/>`,
    fabric: `<path d="m22 21 68 0 10 57-66 8Z" fill="${color}"/><path d="M34 30h48M35 42h49M37 55h49M38 68h49M43 27v48m13-48v46m14-46v44" opacity=".3"/>`,
    wood: `<path d="m20 31 74-13 10 47-74 19Z" fill="${color}"/><path d="m32 43 57-12M35 54l51-10M38 66l51-12" stroke="#8f664a" opacity=".7"/>`,
    sponge: `<rect x="20" y="26" width="82" height="54" rx="11" fill="${color}"/>`+[30,49,68,87].map((x,i)=>`<circle cx="${x}" cy="${43+i%2*15}" r="4" fill="#b6a14e" stroke="none"/>`).join(""),
    elastic: `<ellipse cx="60" cy="51" rx="39" ry="23" fill="none" stroke="${color}" stroke-width="13"/>`,
    mirror: '<rect x="30" y="10" width="61" height="79" rx="28" fill="#91acb4"/><rect x="36" y="16" width="49" height="67" rx="23" fill="#d5e8e8"/><path d="m46 48 26-21m-27 35 29-23" stroke="#fff9e9" stroke-width="5"/>'
  };
  if (Object.hasOwn(SE_GARMENTS, id)) return seGarment(id, color);
  return seSvg(drawings[id] || drawings.bread);
}
function seGarment(id, color) {
  const shapes = {
    coat: '<path d="m41 17-20 9-12 33 18 6 9-22-3 43h54l-3-43 9 22 18-6-12-33-20-9-19 12Z"/><path d="M60 30v55M39 65h13m16 0h13M43 19l17 11 17-11" fill="none"/>',
    shirt: '<path d="m41 19-20 10-12 23 20 11 9-16v37h44V47l9 16 20-11-12-23-20-10q-19 17-38 0Z"/>',
    boots: '<path d="M20 15h27v49l12 9v13H15V72l5-7ZM70 15h27v49l12 9v13H65V72l5-7Z"/><path d="M16 78h42m8 0h42M21 29h25m25 0h25" fill="none"/>',
    hat: '<path d="M25 63q0-45 35-45t35 45Z"/><rect x="18" y="61" width="84" height="18" rx="7"/><circle cx="60" cy="13" r="9"/><path d="M40 35v22m20-30v30m20-22v22" opacity=".4"/>',
    scarf: '<path d="M19 24h82v23H67v40H42V47H19Z"/><path d="M44 76h21M48 82v12m10-12v12M28 28v15m57-15v15" fill="none"/>',
    shorts: '<path d="M30 18h60l9 66H67L60 53l-7 31H21Z"/><path d="M31 29h58M60 30v23" fill="none"/>'
  };
  return seSvg(`<g fill="${color}">${shapes[id]}</g>`);
}

function sePerson() {
  return '<g class="se-person"><path d="M228 170v35m25-35v35" stroke="#3d6577" stroke-width="12"/><path d="M218 117q20-15 44 0l5 55h-53Z" fill="#d7aa80"/><path d="M218 125l-16 35m59-35 15 35" stroke="#d7aa80" stroke-width="11"/><circle cx="240" cy="94" r="22" fill="#efd0ab"/><path d="M218 89q0-31 25-22 27-1 18 23l-9-16-30 14" fill="#5f5c51"/><circle cx="233" cy="94" r="2" fill="#294c50"/><circle cx="249" cy="94" r="2" fill="#294c50"/><path d="M233 105q8 6 14 0" fill="none"/></g>';
}
function seStoryScene(e) {
  const sun = '<g class="se-sun"><circle cx="402" cy="45" r="22" fill="#eccb73"/><path d="M402 13V5m0 80v-8m-32-32h-8m80 0h-8m-55-23-6-6m52 52-6-6m-40 0-6 6m52-52-6 6" stroke="#c5a353"/></g>';
  const cloud = '<g class="se-cloud"><path d="M44 55q-10-21 13-25 15-27 40-6 29-8 33 18 15 23-16 23H56Z" fill="#b4ced3"/></g>';
  const rain = Array.from({length:9},(_,i)=>`<path class="se-drop" d="m${46+i*10} ${80+i%3*12}-4 15" stroke="#76aebc" stroke-width="3"/>`).join("");
  const table = '<path d="M74 162h128v9H74Zm13 9v40m100-40v40" fill="#b99972" stroke-width="4"/>';
  const scene = {
    rain: `${cloud}${rain}<g class="se-paper"><path d="m107 137 66-4 6 34-66 5Z" fill="#f7ebce"/><path d="m123 151 18-10 19 16" fill="none" stroke="#b3897a"/></g>${sePerson()}<path d="M240 70V26m-53 30q50-71 100 0Z" fill="#92b9a0"/><path d="M190 56h95"/>`,
    wind: `${sun}<path class="se-breeze" d="M24 72h102q30 0 22-16t-23-2M16 94h150M41 115h88q33 0 26 19" fill="none" stroke="#88b2b5" stroke-width="4"/>${sePerson()}<g class="se-paper"><path d="m120 154 45-6 7 29-45 5Z" fill="#f3e6c5"/><path d="m129 161 30-5m-28 14 30-5" stroke="#b1ac91"/></g>`,
    spill: `${table}<g class="se-glass"><path d="m121 118 29 0-3 43h-23Z" fill="#c9e1dd"/><path d="M124 138h23v20h-23Z" fill="#8fc3cb" stroke="none"/></g><circle class="se-ball" cx="42" cy="143" r="17" fill="#d69778"/><ellipse class="se-puddle" cx="160" cy="163" rx="34" ry="5" fill="#8fc3cb" stroke="none"/>${sePerson()}`,
    dark: `<rect x="43" y="31" width="113" height="106" rx="6" fill="#698b94"/><path d="M100 32v104M44 84h112" stroke="#e3d8b6" stroke-width="6"/>${sePerson()}<path class="se-beam" d="m278 151 145-79v132Z" fill="#f8dc87" opacity=".2" stroke="none"/><path d="m267 142 27-4 3 15-27 4Z" fill="#7ca5a8"/><path d="M346 189h24m-8 0v-7m-7 7v-7" stroke="#d1b766" stroke-width="5"/>`,
    ice: `${sun}<ellipse cx="167" cy="184" rx="74" ry="13" fill="#e8e3cb"/><ellipse class="se-puddle" cx="167" cy="180" rx="44" ry="8" fill="#a2cdd2" stroke="none"/><g class="se-ice"><path d="m141 127 40-7 12 43-40 7Z" fill="#b6dde0"/><path d="m150 132 21-4m-17 13 20-4" stroke="#f7f4dc"/></g>${sePerson()}`,
    ball: `${sun}<path d="M328 195V85h111v110m-109-94h106m-106 22h106m-106 22h106m-106 22h106M350 87v108m22-108v108m22-108v108m22-108v108" fill="none" stroke="#91ada4" stroke-width="2"/>${sePerson()}<circle class="se-ball" cx="177" cy="187" r="17" fill="#e2bc76"/><path class="se-cheer" d="m216 46-11-14m36 7V20m24 26 13-16" stroke="#d6ac60" stroke-width="4"/>`
  };
  scene.umbrella = `${cloud}${rain}${sePerson()}<path d="M240 70V26m-53 30q50-71 100 0Z" fill="#92b9a0"/><path d="M190 56h95"/>`;
  scene.kite = `${sun}<path class="se-breeze" d="M24 72h102M16 94h150M41 115h88" fill="none" stroke="#88b2b5" stroke-width="4"/>${sePerson()}<g class="se-kite"><path d="m99 38 26 26-26 33-23-33Z" fill="#d8af73"/><path d="M99 38v59M76 64h49m-26 33q-8 15 3 21" fill="none"/><path d="M99 97q43 68 110 62" fill="none" stroke="#8d9f8a" stroke-width="1.5"/></g>`;
  scene.cloth = `${table}${sePerson()}<ellipse class="se-puddle" cx="143" cy="162" rx="40" ry="7" fill="#8fc3cb" stroke="none"/><g class="se-cloth"><path d="m169 135 39 4-5 27-41-3Z" fill="#d4ba84"/><path d="m174 141 25 3m-27 5 25 3" stroke="#b09669"/></g>`;
  return seSvg(`<rect width="480" height="224" rx="22" fill="${e.scene === "dark" ? "#344f60" : "#e5eddf"}" stroke="none"/><path d="M0 195q143-27 270-5t210 0v34H0Z" fill="#c1d0ad" stroke="none"/>${scene[e.scene]}`, "0 0 480 224");
}
function seMaterialTest(e) {
  const color = SE_MATERIALS[e.correct][1];
  const surface = `<path class="se-sample" d="M117 119h246v15H117Z" fill="${color}"/>`;
  const drops = Array.from({length:7},(_,i)=>`<path class="se-drop" d="M${157+i*26} ${34+i%2*13}q-9 13 0 13t0-13Z" fill="#81b6c7" stroke="none"/>`).join("");
  const scenes = {
    rain: `${surface}${drops}<path class="se-runoff" d="m126 133-20 25m251-25 20 25" stroke="#81b6c7" stroke-width="4"/><path d="M151 196v-47h178v47" fill="#e4c79a"/><path d="m137 149 103-54 103 54" fill="#a7c3ac"/><path d="M224 196v-30h28v30" fill="#799da1"/>`,
    absorb: `${surface}<ellipse class="se-puddle" cx="242" cy="180" rx="99" ry="11" fill="#8fc3cb" stroke="none"/><g class="se-water-rise">${drops}</g><path class="se-soaked" d="M128 121h224v10H128Z" fill="#639caa" opacity=".1" stroke="none"/>`,
    light: '<circle cx="92" cy="111" r="25" fill="#e8c86c"/><path class="se-light-ray" d="M126 84h267M126 111h267M126 138h267" stroke="#d3b258" stroke-width="5"/><rect x="224" y="47" width="34" height="132" rx="5" fill="#a5cfd9" opacity=".7"/><path d="M337 175v-27m0 13q-27-34-31-7 18 15 31 7m0-7q21-35 30-12-8 18-30 12" fill="#92b58b"/><path d="M310 177h53l-8 27h-37Z" fill="#c99e7b"/>',
    rigid: `${surface}<path d="M137 134v64m204-64v64" stroke="#9d947a" stroke-width="9"/><g class="se-books"><path d="M188 55h23v62h-23Z" fill="#bb8e87"/><path d="M215 42h30v75h-30Z" fill="#8faeac"/><path d="M249 61h26v56h-26Z" fill="#c7ae76"/><path d="m281 51 21-5 16 64-21 5Z" fill="#a29ab4"/></g>`,
    stretch: '<g class="se-stretch"><ellipse cx="240" cy="111" rx="76" ry="32" fill="none" stroke="#bd879f" stroke-width="14"/><path d="m165 111-24-4m174 4 24-4" stroke-width="8"/></g><path d="M216 165h48l-7 34h-34Z" fill="#c7b38a"/><path d="M229 162v-28m12 28v-34m12 34v-25" stroke="#9aaa95" stroke-width="6"/>',
    fold: '<path d="M169 128h142v70H169Z" fill="#c4a172"/><path d="m169 128 36-27h71l35 27Z" fill="#dfc292"/><path class="se-box-flap-left" d="m169 128-42-25 37-34 41 32Z" fill="#d2b381"/><path class="se-box-flap-right" d="m276 101 41-32 37 34-43 25Z" fill="#d2b381"/><path d="M240 130v65" stroke="#ad895b"/>',
    reflect: '<path class="se-light-ray" d="m99 173 143-66-143-66" stroke="#e0c06b" stroke-width="6" fill="none"/><rect x="238" y="26" width="19" height="163" rx="7" fill="#a8c6ce"/><path d="M269 47h6m-6 26h6m-6 26h6m-6 26h6m-6 26h6" stroke="#73939c" stroke-width="5"/><circle cx="93" cy="174" r="17" fill="#d5ad76"/>'
  };
  return seSvg(`<rect width="480" height="224" rx="22" fill="#e9eddf" stroke="none"/><path d="M30 204h420" stroke="#b3bfa9"/>${scenes[e.test]}`, "0 0 480 224");
}

function seChoice(value, label, art, selected, locked, action = "se-pick", extra = "") {
  return `<button type="button" class="se-choice ${selected ? "is-selected" : ""}" data-action="${action}" data-value="${escapeHtml(String(value))}" aria-pressed="${selected}" ${locked ? "disabled" : ""} ${extra}>${art ? `<span class="se-choice-art">${art}</span>` : ""}<span>${escapeHtml(label)}</span><i aria-hidden="true">${selected ? "✓" : "+"}</i></button>`;
}
function seSequenceTask(e, s) {
  const food = e.mode === "food", size = e.correct.length;
  const label = v => food ? SE_LIFE[v][0] : e.stages[v][0];
  const art = v => seArt(food ? SE_LIFE[v][1] : e.stages[v][2]);
  const slots = Array.from({length:size},(_,i) => {
    const v = s.sequence[i];
    return `${i ? `<span class="se-link" aria-label="${food ? "sirve de alimento a" : "después"}">→</span>` : ""}<button type="button" class="se-slot ${v !== undefined ? "is-filled" : ""}" data-action="se-remove" data-index="${i}" ${s.checked || v === undefined ? "disabled" : ""} aria-label="Lugar ${i+1}${v !== undefined ? `: ${escapeHtml(label(v))}. Tocar para quitar` : ": vacío"}"><small>${String(i+1).padStart(2,"0")}</small>${v !== undefined ? `${art(v)}<strong>${escapeHtml(label(v))}</strong>` : '<span class="se-slot-empty">+</span>'}</button>`;
  }).join("");
  return `<div class="se-context"><span>${food ? "UN EJEMPLO DE CADENA" : "SEGUIMOS UN PRODUCTO"}</span><strong>${escapeHtml(food ? e.place : e.product)}</strong></div><div class="se-sequence se-sequence-${size}" role="group" aria-label="${food ? "Desde el alimento hacia quien lo come" : "Etapas del circuito productivo"}">${slots}</div><p class="se-hint">${food ? "La flecha significa «sirve de alimento a». Elegí tres seres vivos." : "Empezá por el origen. Elegí las cuatro etapas."} Tocá una ficha colocada para quitarla.</p><div class="se-bank ${food ? "se-life-bank" : "se-journey-bank"}">${e.options.map(v => `<button type="button" class="se-choice" data-action="se-add" data-value="${v}" ${s.checked || s.sequence.includes(v) || s.sequence.length === size ? "disabled" : ""}><span class="se-choice-art">${art(v)}</span><strong>${escapeHtml(label(v))}</strong>${!food ? `<span class="se-card-detail">${escapeHtml(e.stages[v][1])}</span>` : ""}<i aria-hidden="true">+</i></button>`).join("")}</div>`;
}
function sePizzaPath(i, total, radius = 94, center = 110) {
  const angle = n => n * 2 * Math.PI / total - Math.PI / 2;
  const point = n => [center + radius * Math.cos(angle(n)), center + radius * Math.sin(angle(n))];
  const a = point(i), b = point(i + 1);
  return `M${center} ${center}L${a.join(" ")}A${radius} ${radius} 0 0 1 ${b.join(" ")}Z`;
}
function sePizzaClip(i, total) {
  const pts = Array.from({length:13},(_,j) => { const a=(i+j/12)*2*Math.PI/total-Math.PI/2; return `${50+49*Math.cos(a)}% ${50+49*Math.sin(a)}%`; });
  return `polygon(50% 50%,${pts.join(",")})`;
}
function seFractionTask(e, s) {
  const frac = `<span class="se-fraction" aria-label="${e.numerator} sobre ${e.denominator}"><b>${e.numerator}</b><b>${e.denominator}</b></span>`;
  return `<div class="se-pizza-layout"><div class="se-order"><span>EL PEDIDO</span>${frac}<strong>de una pizza entera</strong><p>Esta pizza está cortada en <b>${e.slices} partes iguales</b>.</p></div><div class="se-pizza" role="group" aria-label="Pizza de ${e.slices} porciones iguales. Tocá para agregar o quitar cada porción."><div class="se-plate"></div>${Array.from({length:e.slices},(_,i)=>{
    const on=s.pieces.includes(i), middle=(i+.5)*2*Math.PI/e.slices-Math.PI/2, x=110+61*Math.cos(middle), y=110+61*Math.sin(middle);
    return `<button type="button" class="se-slice ${on?"is-picked":""}" data-action="se-slice" data-index="${i}" style="clip-path:${sePizzaClip(i,e.slices)};--se-slice-x:${Math.cos(middle)*28}px;--se-slice-y:${Math.sin(middle)*28}px" aria-label="Porción ${i+1} de ${e.slices}" aria-pressed="${on}" ${s.checked?"disabled":""}>${seSvg(`<path d="${sePizzaPath(i,e.slices)}" fill="${on?"#e8bd65":"#e0d7bd"}" stroke="#b29566" stroke-width="2"/><path d="${sePizzaPath(i,e.slices,80)}" fill="${on?"#edcc7c":"#eee7d1"}" stroke="#c9b68e" stroke-width="1"/><circle cx="${x}" cy="${y}" r="9" fill="${on?"#bf7762":"#ccc4ae"}" stroke="none"/><path d="m${x-10} ${y+15} 8-5" stroke="${on?"#79965f":"#b0b29c"}" stroke-width="4"/>`,"0 0 220 220")}</button>`;
  }).join("")}</div></div><div class="se-pizza-caption"><span><b>${s.pieces.length}</b> de ${e.slices} porciones elegidas</span><button type="button" class="se-small" data-action="se-clear" ${s.checked||!s.pieces.length?"disabled":""}>Vaciar pedido</button></div><p class="se-hint">Tocá las porciones que querés servir. Podés quitarlas antes de comprobar.</p>`;
}
function seOutfitScene(s, weather) {
  const color = s.colour ? SE_COLOURS[s.colour][1] : "#bcc4b5";
  return `<div class="se-outfit-scene" aria-label="Vista previa de tu elección"><div class="se-outfit-weather">${pdWeatherIcon({cold:"cloudy",hot:"sunny",rainy:"rainy",snowy:"snowy"}[weather])}</div>${seSvg(`<rect width="300" height="260" rx="22" fill="#e5e7dc" stroke="none"/><ellipse cx="149" cy="237" rx="74" ry="10" fill="#c4cdba" stroke="none"/><path d="M133 181v45m32-45v45" stroke="#64838b" stroke-width="15"/><path d="m125 105-17 57m66-57 17 57" stroke="#e5c39e" stroke-width="12"/><path d="M127 97h45l8 86h-61Z" fill="#b9c6bd"/><circle cx="150" cy="70" r="30" fill="#e8c9a7"/><path d="M119 64q-2-42 33-31 37-3 27 32l-14-23-41 19" fill="#5b5c54"/><circle cx="140" cy="70" r="2.5" fill="#294c50"/><circle cx="161" cy="70" r="2.5" fill="#294c50"/><path d="M140 83q10 7 20 0" fill="none"/>`,"0 0 300 260")}<div class="se-worn se-worn-${s.garment||"none"}">${s.garment?seGarment(s.garment,color):""}</div><span class="se-preview-label">${s.checked?"PRENDA DEL MENSAJE":"TU ELECCIÓN"}</span></div>`;
}
function seClothesTask(e, s) {
  return `<div class="se-message" lang="en">${escapeHtml(e.clue)}</div><div class="se-clothes-layout">${seOutfitScene(s.checked?{...s,garment:e.correct[0],colour:e.correct[1]}:s,e.weather)}<div class="se-wardrobe"><fieldset><legend>1. Elegí la prenda</legend><div class="se-garments">${e.options.map(v=>seChoice(v,SE_GARMENTS[v],seGarment(v,"#b5c5bb"),s.garment===v,s.checked,"se-garment")).join("")}</div></fieldset><fieldset><legend>2. Elegí el color</legend><div class="se-colours">${e.colours.map(v=>seChoice(v,SE_COLOURS[v][0],`<i class="se-swatch" style="background:${SE_COLOURS[v][1]}"></i>`,s.colour===v,s.checked,"se-colour")).join("")}</div></fieldset></div></div>`;
}
function seTask(e, s) {
  if (["food","journey"].includes(e.mode)) return seSequenceTask(e,s);
  if (e.mode === "fractions") return seFractionTask(e,s);
  if (e.mode === "clothes") return seClothesTask(e,s);
  if (e.mode === "causes") return `<div class="se-reading"><span>LEÉ LA HISTORIA</span><p>${escapeHtml(e.text)}</p></div><div class="se-scene">${seStoryScene(e)}</div><div class="se-text-options">${e.options.map(v=>seChoice(v,v,"",s.choice===v,s.checked)).join("")}</div>`;
  return `<div class="se-brief"><strong>${escapeHtml(e.name)}</strong><p>${escapeHtml(e.need)}</p></div><div class="se-scene ${s.checked?"":"se-hidden-test"}">${s.checked?seMaterialTest(e):seSvg('<rect width="480" height="224" rx="22" fill="#e9eddf" stroke="none"/><path d="M60 193h360M90 193V98m300 95V98M75 98h330" stroke="#9ba89a" stroke-width="8"/><path d="m205 100 17-47h38l17 47" fill="#c2baa1"/><circle cx="240" cy="134" r="28" fill="#e3cc91"/><path d="M231 124q3-12 15-5t-6 17v7m0 10v1" fill="none" stroke="#7c806c" stroke-width="4"/>',"0 0 480 224")}</div><div class="se-materials">${e.options.map(v=>seChoice(v,SE_MATERIALS[v][0],seArt(SE_MATERIALS[v][2],SE_MATERIALS[v][1]),s.choice===v,s.checked)).join("")}</div>`;
}

let seAnimation = null;
function stopSchoolExpeditionAnimation() { seAnimation?.kill(); seAnimation = null; }
function seAnimate(e, s, replay = false) {
  stopSchoolExpeditionAnimation();
  const root = document.querySelector(".se-runner");
  if (!root || !window.gsap || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const q = selector => root.querySelectorAll(selector);
  const tl = window.gsap.timeline({ defaults: { ease:"power2.inOut", duration:.65 } });
  seAnimation = tl;
  if (!s.checked) {
    if (!replay) tl.from(q(".se-scene,.se-sequence,.se-pizza-layout,.se-outfit-scene"),{opacity:.5,y:8,duration:.45});
    return;
  }
  if (e.mode === "causes") {
    if (e.scene === "rain" || e.scene === "umbrella") tl.fromTo(q(".se-drop"),{y:-14,opacity:0},{y:58,opacity:1,stagger:.07,duration:.75});
    if (e.scene === "wind" || e.scene === "kite") tl.fromTo(q(".se-breeze"),{x:-15,opacity:0},{x:22,opacity:1}).fromTo(q(e.scene === "kite"?".se-kite":".se-paper"),{x:0,y:0,rotation:0},{x:100,y:-45,rotation:15,svgOrigin:"140 160",duration:1.3},"-=.4");
    if (e.scene === "spill") tl.fromTo(q(".se-ball"),{x:0},{x:72,duration:.6}).fromTo(q(".se-glass"),{rotation:0,svgOrigin:"145 162"},{rotation:70,svgOrigin:"145 162",duration:.6}).fromTo(q(".se-puddle"),{scaleX:.1,opacity:0,svgOrigin:"160 163"},{scaleX:1,opacity:1,duration:.7},"-=.25");
    if (e.scene === "cloth") tl.fromTo(q(".se-cloth"),{x:0,y:0},{x:-51,y:12,duration:.8}).fromTo(q(".se-puddle"),{scaleX:1,opacity:1,svgOrigin:"143 162"},{scaleX:.1,opacity:0,duration:1},.4);
    if (e.scene === "dark") tl.fromTo(q(".se-beam"),{opacity:0},{opacity:.8,duration:.85});
    if (e.scene === "ice") tl.fromTo(q(".se-ice"),{scaleY:1,opacity:1,svgOrigin:"167 175"},{scaleY:.05,svgOrigin:"167 175",opacity:0,duration:1.5}).fromTo(q(".se-puddle"),{scaleX:.4,svgOrigin:"167 180"},{scaleX:1.3,duration:1.5},0);
    if (e.scene === "ball") tl.fromTo(q(".se-ball"),{x:0,rotation:0},{x:200,rotation:340,svgOrigin:"177 187",duration:1.2}).from(q(".se-cheer"),{opacity:0,scale:.5,svgOrigin:"240 35",duration:.5});
  }
  if (e.mode === "food" || e.mode === "journey") {
    tl.from(q(".se-solution-card"),{opacity:0,y:15,stagger:.2});
    tl.fromTo(q(".se-travel-dot"),{left:"6%",opacity:0},{left:"92%",opacity:1,duration:2.2,ease:"none"},.3);
    if (e.mode === "food") tl.to(q(".se-solution-card svg"),{y:-5,stagger:.15,yoyo:true,repeat:1,duration:.35},.7);
    else tl.fromTo(q(".se-courier"),{left:"1%"},{left:"83%",duration:2.7,ease:"none"},.3);
    if(e.mode === "journey" && q(".se-mill-blades").length) tl.fromTo(q(".se-mill-blades"),{rotation:0,svgOrigin:"62 37"},{rotation:180,svgOrigin:"62 37",duration:2},.2);
  }
  if (e.mode === "fractions") tl.to(q(".se-slice.is-picked"),{x:(i,t)=>parseFloat(t.style.getPropertyValue("--se-slice-x")),y:(i,t)=>parseFloat(t.style.getPropertyValue("--se-slice-y")),stagger:.08,duration:.7}).to(q(".se-slice.is-picked"),{x:0,y:0,stagger:.05,duration:.7});
  if (e.mode === "clothes") tl.from(q(".se-worn"),{x:35,y:-12,opacity:0,duration:.8}).from(q(".se-outfit-weather"),{y:-12,opacity:0,duration:.6},.3);
  if (e.mode === "design") {
    if (e.test === "rain") tl.fromTo(q(".se-drop"),{y:-10,opacity:0},{y:80,opacity:1,stagger:.09,duration:.8}).from(q(".se-runoff"),{opacity:0,duration:.5});
    if (e.test === "absorb") tl.fromTo(q(".se-sample"),{y:0},{y:52,duration:.5}).fromTo(q(".se-puddle"),{scaleX:1,opacity:1,svgOrigin:"242 180"},{scaleX:.1,opacity:0,svgOrigin:"242 180",duration:1.1}).fromTo(q(".se-soaked"),{y:0,opacity:.1},{y:52,opacity:.8},.5).fromTo(q(".se-water-rise"),{y:150,opacity:0},{y:126,opacity:.8,duration:1},.5);
    if (e.test === "light" || e.test === "reflect") tl.fromTo(q(".se-light-ray"),{strokeDasharray:500,strokeDashoffset:500},{strokeDashoffset:0,duration:1.8});
    if (e.test === "rigid") tl.from(q(".se-books"),{y:-30,opacity:0,duration:1,ease:"bounce.out"});
    if (e.test === "fold") tl.fromTo(q(".se-box-flap-left"),{rotation:-24,svgOrigin:"169 128"},{rotation:0,duration:.9}).fromTo(q(".se-box-flap-right"),{rotation:24,svgOrigin:"311 128"},{rotation:0,duration:.9},0);
    if (e.test === "stretch") tl.fromTo(q(".se-stretch"),{scaleX:1,svgOrigin:"240 111"},{scaleX:1.5,svgOrigin:"240 111",duration:.9}).to(q(".se-stretch"),{scaleX:1,duration:1,ease:"elastic.out(1,.5)"});
  }
  tl.fromTo(q(".se-guide-pacman"),{x:-6},{x:12,duration:.5,repeat:1,yoyo:true},0);
}
function seSolution(e,s) {
  if (!s.checked || !["food","journey"].includes(e.mode)) return "";
  return `<div class="se-solution"><span>${s.isCorrect?"EL CAMINO QUE CONECTASTE":"MIRÁ ESTE RECORRIDO"}</span><div class="se-solution-track ${e.mode==="journey"?"se-product-route":""}">${e.correct.map((v,i)=>`<div class="se-solution-card">${seArt(e.mode==="food"?SE_LIFE[v][1]:e.stages[v][2])}<strong>${escapeHtml(e.mode==="food"?SE_LIFE[v][0]:e.stages[v][0])}</strong></div>${i<e.correct.length-1?'<b aria-hidden="true">→</b>':""}`).join("")}<i class="se-travel-dot" aria-hidden="true"></i>${e.mode==="journey"?`<div class="se-courier" aria-hidden="true">${seArt("truck")}<span>${seArt(e.art)}</span></div>`:""}</div></div>`;
}
function renderSchoolExpeditionRunner(e, animate = false) {
  const s=session.expeditions[e.id], theme=SCHOOL_EXPEDITION_THEMES.find(t=>t.expeditionMode===e.mode);
  stopSchoolExpeditionAnimation();
  renderShell(`<section class="se-runner se-${e.mode} ${s.checked?"se-checked":""}" style="--se-accent:${theme.accent}"><header class="se-header"><button type="button" class="se-back" data-action="cancel-run">${icon("arrow")} ${escapeHtml(session.subjectTitle)}</button><div><span>LAS EXPEDICIONES DE PAC-MAN</span><h1>${escapeHtml(theme.title)}</h1></div><b>${session.index+1}<small> / ${session.exercises.length}</small></b></header><div class="se-layout"><aside class="se-guide"><div class="se-guide-top"><span>EXPEDICIÓN ${theme.symbol}</span><b>${theme.badge}</b></div><div class="se-guide-art" aria-hidden="true"><span class="se-orbit"></span><div class="se-guide-pacman">${pwPacman()}</div><span class="se-guide-star">✦</span><span class="se-guide-dots">· · ·</span></div><h2>Una idea.<br>Un nuevo camino.</h2><p>${theme.lesson}</p><ol class="se-progress" aria-label="Progreso">${session.exercises.map((_,i)=>`<li class="${i<session.index||i===session.index&&s.checked?"is-done":i===session.index?"is-current":""}" aria-label="Desafío ${i+1}${i<session.index||i===session.index&&s.checked?": terminado":i===session.index?": actual":""}">${i<session.index||i===session.index&&s.checked?"✓":i+1}</li>`).join("")}</ol><span class="se-pace">A TU RITMO · SIN RELOJ</span></aside><article class="se-board"><div class="se-board-top"><span>PENSÁ · PROBÁ · DESCUBRÍ</span><b>${String(session.index+1).padStart(2,"0")}</b></div><h2 id="se-question" tabindex="-1">${escapeHtml(e.prompt)}</h2>${seTask(e,s)}${seSolution(e,s)}<footer class="se-controls"><div class="se-feedback ${s.checked?"is-checked":""}" role="status" aria-live="polite">${s.checked?`<strong>${s.isCorrect?"¡Encontraste el camino!":"Vamos a descubrirlo juntos."}</strong><p>${escapeHtml(e.explanation)}</p>`:'<p>Podés cambiar tu respuesta. Comprobá cuando esté lista.</p>'}</div><div class="se-actions">${s.checked?'<button type="button" class="se-small" data-action="se-replay">↻ Ver animación</button>':""}<button type="button" class="se-primary" data-action="${s.checked?"se-next":"se-check"}" ${!s.checked&&!seCanCheck(e,s)?"disabled":""}>${s.checked?session.index+1===session.exercises.length?"Terminar expedición":"Siguiente desafío →":"Comprobar"}</button></div></footer></article></div></section>`);
  if (animate) seAnimate(e,s);
}
function schoolExpeditionAction(action,target) {
  const current=seCurrent(); if(!current)return;
  const {exercise:e,state:s}=current;
  if(action==="se-next") {
    if(!s.checked)return;
    stopSchoolExpeditionAnimation(); session.index++; render(); window.scrollTo({top:0,behavior:"auto"});
    document.querySelector("#se-question,#se-finish-title")?.focus({preventScroll:true}); return;
  }
  if(action==="se-replay") { if(s.checked)seAnimate(e,s,true); return; }
  if(s.checked)return;
  const {value}=target.dataset; const index=Number(target.dataset.index); let focus=null;
  if(action==="se-pick") {
    if(!["causes","design"].includes(e.mode)||!e.options.includes(value))return;
    s.choice=value; focus=`[data-action="se-pick"][data-value="${CSS.escape(value)}"]`;
  } else if(action==="se-add") {
    const v=e.mode==="journey"?Number(value):value;
    if(!["food","journey"].includes(e.mode)||!e.options.includes(v)||s.sequence.includes(v)||s.sequence.length>=e.correct.length)return;
    s.sequence.push(v); focus=`[data-action="se-remove"][data-index="${s.sequence.length-1}"]`;
  } else if(action==="se-remove") {
    if(!["food","journey"].includes(e.mode)||!Number.isInteger(index)||index<0||index>=s.sequence.length)return;
    s.sequence.splice(index,1); focus='[data-action="se-add"]:not(:disabled)';
  } else if(action==="se-slice") {
    if(e.mode!=="fractions"||!Number.isInteger(index)||index<0||index>=e.slices)return;
    s.pieces=s.pieces.includes(index)?s.pieces.filter(v=>v!==index):[...s.pieces,index]; s.touched=true;
    focus=`[data-action="se-slice"][data-index="${index}"]`;
  } else if(action==="se-clear") {
    if(e.mode!=="fractions")return; s.pieces=[];s.touched=true;focus='[data-action="se-slice"]';
  } else if(action==="se-garment"||action==="se-colour") {
    if(e.mode!=="clothes")return;
    if(action==="se-garment"&&e.options.includes(value))s.garment=value;
    else if(action==="se-colour"&&e.colours.includes(value))s.colour=value; else return;
    focus=`[data-action="${action}"][data-value="${value}"]`;
  } else if(action==="se-check") {
    if(!seCanCheck(e,s))return;
    const selected=seSelected(e,s); s.isCorrect=JSON.stringify(selected)===JSON.stringify(e.correct);s.checked=true;
    if(s.isCorrect)session.score++;
    session.answers.push({prompt:e.prompt,selected:clone(selected),correct:clone(e.correct),isCorrect:s.isCorrect});
    focus='[data-action="se-next"]';
  } else return;
  const scroll=window.scrollY;
  renderSchoolExpeditionRunner(e,action==="se-check"); window.scrollTo({top:scroll,behavior:"auto"});
  document.querySelector(focus)?.focus({preventScroll:true});
}
function renderSchoolExpeditionFinish() {
  stopSchoolExpeditionAnimation();
  const t=SCHOOL_EXPEDITION_THEMES.find(t=>t.id===session.themeId);
  renderShell(`<section class="se-runner se-finish" style="--se-accent:${t.accent}"><span>EXPEDICIÓN COMPLETA · ${escapeHtml(session.subjectTitle)}</span><div class="se-finish-art" aria-hidden="true">${pacmanVerbGhost("#a7d9b0")}${pwPacman()}${pacmanVerbGhost("#c9b8ed")}</div><h2 id="se-finish-title" tabindex="-1">¡Un nuevo camino, ${escapeHtml(data.settings.studentName||"Ian")}!</h2><p>${t.lesson}</p><div class="se-finish-stamps" aria-label="Resultados">${session.answers.map((a,i)=>`<span aria-label="Desafío ${i+1}: ${a.isCorrect?"resuelto":"para repasar"}">${a.isCorrect?"✓":"↗"}</span>`).join("")}</div><strong>${session.score} de ${session.exercises.length} desafíos resueltos</strong><p>Podés volver a explorar con nuevos desafíos.</p><div class="se-finish-actions"><button type="button" class="se-primary" data-action="start" data-subject="${session.subjectId}" data-theme="${session.themeId}" data-mode="activity">Otra expedición</button><button type="button" class="se-back" data-action="cancel-run">Volver a ${escapeHtml(session.subjectTitle)}</button></div></section>`);
}
