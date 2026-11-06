const CACHE_NAME = "ian-escuela-v180";
const PICTO_FILES = [
  "./assets/pictos/adios.png",
  "./assets/pictos/abrazo.png",
  "./assets/pictos/abuela.png",
  "./assets/pictos/abrir.png",
  "./assets/pictos/aburrido.png",
  "./assets/pictos/agua.png",
  "./assets/pictos/amigo.png",
  "./assets/pictos/aula.png",
  "./assets/pictos/auriculares.png",
  "./assets/pictos/asustado.png",
  "./assets/pictos/autobus.png",
  "./assets/pictos/bano.png",
  "./assets/pictos/banarse.png",
  "./assets/pictos/beber.png",
  "./assets/pictos/beso.png",
  "./assets/pictos/brazo.png",
  "./assets/pictos/cabeza.png",
  "./assets/pictos/caca.png",
  "./assets/pictos/calma.png",
  "./assets/pictos/champu.png",
  "./assets/pictos/carro.png",
  "./assets/pictos/cepillarse-dientes.png",
  "./assets/pictos/calor.png",
  "./assets/pictos/cansado.png",
  "./assets/pictos/carino.png",
  "./assets/pictos/casa.png",
  "./assets/pictos/cerrar.png",
  "./assets/pictos/comer.png",
  "./assets/pictos/companero.png",
  "./assets/pictos/contento.png",
  "./assets/pictos/cosquillas.png",
  "./assets/pictos/cuaderno.png",
  "./assets/pictos/descanso.png",
  "./assets/pictos/dar-mano.png",
  "./assets/pictos/dibujar.png",
  "./assets/pictos/doctor.png",
  "./assets/pictos/doler.png",
  "./assets/pictos/dolor.png",
  "./assets/pictos/dolor-brazo.png",
  "./assets/pictos/dolor-cabeza.png",
  "./assets/pictos/dolor-estomago.png",
  "./assets/pictos/dolor-garganta.png",
  "./assets/pictos/dolor-mano.png",
  "./assets/pictos/dolor-oido.png",
  "./assets/pictos/enfadado.png",
  "./assets/pictos/enfermo.png",
  "./assets/pictos/escribir.png",
  "./assets/pictos/escuela.png",
  "./assets/pictos/espalda.png",
  "./assets/pictos/esperar.png",
  "./assets/pictos/fono.png",
  "./assets/pictos/frio.png",
  "./assets/pictos/galletas.png",
  "./assets/pictos/gaseosa.png",
  "./assets/pictos/gracias.png",
  "./assets/pictos/hambre.png",
  "./assets/pictos/hola.png",
  "./assets/pictos/ir.png",
  "./assets/pictos/helado.png",
  "./assets/pictos/juguete.png",
  "./assets/pictos/jugar.png",
  "./assets/pictos/lapiz.png",
  "./assets/pictos/lavarse-manos.png",
  "./assets/pictos/leer.png",
  "./assets/pictos/leche.png",
  "./assets/pictos/leche-chocolatada.png",
  "./assets/pictos/limpiarse-cola.png",
  "./assets/pictos/lengua.png",
  "./assets/pictos/jugo.png",
  "./assets/pictos/lavarse-cara.png",
  "./assets/pictos/maestra.png",
  "./assets/pictos/mama.png",
  "./assets/pictos/mano.png",
  "./assets/pictos/mareado.png",
  "./assets/pictos/mas.png",
  "./assets/pictos/matematicas.png",
  "./assets/pictos/medicina.png",
  "./assets/pictos/me-gusta.png",
  "./assets/pictos/miedo.png",
  "./assets/pictos/necesitar.png",
  "./assets/pictos/necesito-ayuda.png",
  "./assets/pictos/nervioso.png",
  "./assets/pictos/no.png",
  "./assets/pictos/no-entiendo.png",
  "./assets/pictos/no-me-gusta.png",
  "./assets/pictos/no-quiero.png",
  "./assets/pictos/oido.png",
  "./assets/pictos/otra-vez.png",
  "./assets/pictos/papa.png",
  "./assets/pictos/parar.png",
  "./assets/pictos/perdon.png",
  "./assets/pictos/pierna.png",
  "./assets/pictos/pis.png",
  "./assets/pictos/precio.png",
  "./assets/pictos/papel-higienico.png",
  "./assets/pictos/pan.png",
  "./assets/pictos/panaderia.png",
  "./assets/pictos/plaza.png",
  "./assets/pictos/psicologa.png",
  "./assets/pictos/quiero.png",
  "./assets/pictos/recreo.png",
  "./assets/pictos/rio.png",
  "./assets/pictos/ruido.png",
  "./assets/pictos/salir.png",
  "./assets/pictos/seno-carla.png",
  "./assets/pictos/seno-maribel.png",
  "./assets/pictos/si.png",
  "./assets/pictos/silencio.png",
  "./assets/pictos/shopping.png",
  "./assets/pictos/solo.png",
  "./assets/pictos/supermercado.png",
  "./assets/pictos/tarea.png",
  "./assets/pictos/terapeuta.png",
  "./assets/pictos/terapia.png",
  "./assets/pictos/terminar.png",
  "./assets/pictos/trabajar.png",
  "./assets/pictos/tranquilo.png",
  "./assets/pictos/triste.png",
  "./assets/pictos/turno.png",
  "./assets/pictos/volver.png",
  "./assets/pictos/clinica.png",
  "./assets/pictos/columpio.png",
  "./assets/pictos/coche.png",
  "./assets/pictos/compartir.png",
  "./assets/pictos/cocinar.png",
  "./assets/pictos/cuarto-bano.png",
  "./assets/pictos/dinero.png",
  "./assets/pictos/dormir.png",
  "./assets/pictos/ducha.png",
  "./assets/pictos/escoger.png",
  "./assets/pictos/farmacia.png",
  "./assets/pictos/fiebre.png",
  "./assets/pictos/familia.png",
  "./assets/pictos/hablar.png",
  "./assets/pictos/juntos.png",
  "./assets/pictos/musica.png",
  "./assets/pictos/tomate.png",
  "./assets/pictos/naranja.png",
  "./assets/pictos/frutilla.png",
  "./assets/pictos/banana.png",
  "./assets/pictos/carne.png",
  "./assets/pictos/pollo.png",
  "./assets/pictos/mimos.png",
  "./assets/pictos/caricias.png",
  "./assets/pictos/dormir-acompanado.png",
  "./assets/pictos/consuelo.png",
  "./assets/pictos/cuidar.png",
  "./assets/pictos/oir.png",
  "./assets/pictos/parque.png",
  "./assets/pictos/pelota.png",
  "./assets/pictos/ropa.png",
  "./assets/pictos/secar.png",
  "./assets/pictos/zapatillas.png",
  "./assets/pictos/tele.png",
  "./assets/pictos/tos.png",
  "./assets/pictos/toalla.png",
  "./assets/pictos/banera.png",
  "./assets/pictos/jabon.png",
  "./assets/pictos/agua-caliente.png",
  "./assets/pictos/agua-fria.png",
  "./assets/pictos/ticket.png",
  "./assets/pictos/bolsa.png",
  "./assets/pictos/pizza.png",
  "./assets/pictos/macarrones.png",
  "./assets/pictos/arroz.png",
  "./assets/pictos/empanada.png",
  "./assets/pictos/pure.png",
  "./assets/pictos/yogur.png",
  "./assets/pictos/chocolate.png",
  "./assets/pictos/caramelo.png",
  "./assets/pictos/medialuna.png",
  "./assets/pictos/tostada.png",
  "./assets/pictos/magdalena.png",
  "./assets/pictos/sandwich-jamon-queso.png",
  "./assets/pictos/sandwich-salame-queso.jpg",
  "./assets/pictos/sandwich-milanesa.jpg",
  "./assets/pictos/hamburguesa.png",
  "./assets/pictos/choripan.png",
  "./assets/pictos/yo.png"
];
const ENGLISH_FILES = [
  "./assets/english/book.png",
  "./assets/english/eraser.png",
  "./assets/english/ruler.png",
  "./assets/english/scissors.png",
  "./assets/english/glue.png",
  "./assets/english/backpack.png",
  "./assets/english/pen.png",
  "./assets/english/crayons.png",
  "./assets/english/audio/red.mp3",
  "./assets/english/audio/blue.mp3",
  "./assets/english/audio/yellow.mp3",
  "./assets/english/audio/green.mp3",
  "./assets/english/audio/orange.mp3",
  "./assets/english/audio/purple.mp3",
  "./assets/english/audio/black.mp3",
  "./assets/english/audio/white.mp3",
  "./assets/english/audio/pencil.mp3",
  "./assets/english/audio/notebook.mp3",
  "./assets/english/audio/book.mp3",
  "./assets/english/audio/eraser.mp3",
  "./assets/english/audio/ruler.mp3",
  "./assets/english/audio/scissors.mp3",
  "./assets/english/audio/glue.mp3",
  "./assets/english/audio/backpack.mp3",
  "./assets/english/audio/pen.mp3",
  "./assets/english/audio/crayons.mp3",
  "./assets/english/audio/one.mp3",
  "./assets/english/audio/two.mp3",
  "./assets/english/audio/three.mp3",
  "./assets/english/audio/four.mp3",
  "./assets/english/audio/five.mp3",
  "./assets/english/audio/six.mp3",
  "./assets/english/audio/seven.mp3",
  "./assets/english/audio/eight.mp3",
  "./assets/english/audio/nine.mp3",
  "./assets/english/audio/ten.mp3"
];
const SUPPORT_AUDIO_FILES = [
  ...Array.from({ length: 21 }, (_, value) => `./assets/supports/audio/numbers/${value}.mp3`),
  ...[
    "rojo",
    "azul",
    "amarillo",
    "verde",
    "naranja",
    "violeta",
    "rosa",
    "celeste",
    "marron",
    "gris",
    "blanco",
    "negro"
  ].map((color) => `./assets/supports/audio/colors/${color}.mp3`)
];
const MULTIPLICATION_AUDIO_FILES = Array.from({ length: 10 }, (_, tableIndex) =>
  Array.from(
    { length: 10 },
    (_, multiplierIndex) => `./assets/supports/audio/multiplication/${tableIndex + 1}x${multiplierIndex + 1}.mp3`
  )
).flat();
const COMMUNICATION_AUDIO_FILES = [
  "quick-si",
  "quick-no",
  "quick-hambre",
  "quick-enojado",
  "quick-hola",
  "quick-adios",
  "quick-no-quiero",
  "quick-bano",
  "quick-ayuda"
].map((id) => `./assets/communication/audio/${id}.mp3`);
const RECIPE_FILES = [
  "./assets/recipe/paso-1-arroz-agua.jpg",
  "./assets/recipe/paso-2-arroz-cocido.jpg",
  "./assets/recipe/paso-3-bife-plancha.jpg",
  "./assets/recipe/paso-4-tomate-sal.jpg",
  "./assets/recipe/paso-5-plato-listo.jpg"
];
const SOFIA_LANGUAGE_FILES = [
  "./assets/language/sofia/audio/grammar/prompts/armar-oracion.mp3",
  "./assets/language/sofia/audio/grammar/prompts/tocar-sujeto.mp3",
  "./assets/language/sofia/audio/grammar/prompts/tocar-verbo.mp3",
  "./assets/language/sofia/audio/grammar/prompts/tocar-predicado.mp3",
  "./assets/language/sofia/audio/grammar/prompts/probar-otra-vez.mp3",
  ...[
    "01-ian-come-una-manzana.mp3",
    "02-sofia-lee-un-cuento.mp3",
    "03-el-perro-corre-en-el-patio.mp3",
    "04-la-nena-patea-la-pelota.mp3",
    "05-el-gato-duerme-en-la-cama.mp3",
    "06-papa-cocina-la-cena.mp3",
    "07-la-maestra-escribe-una-palabra.mp3",
    "08-ian-guarda-los-juguetes.mp3"
  ].map((file) => `./assets/language/sofia/audio/grammar/sentences/${file}`),
  "./assets/language/sofia/audio/recipe/intro.mp3",
  "./assets/language/sofia/audio/recipe/complete.mp3",
  ...[
    "01-pelar-las-papas.mp3",
    "02-papas-en-la-olla.mp3",
    "03-hervir-las-papas.mp3",
    "04-papas-al-colador.mp3",
    "05-aplastar-las-papas.mp3",
    "06-manteca-y-leche.mp3",
    "07-agregar-sal.mp3",
    "08-preparar-el-huevo.mp3",
    "09-carne-por-el-huevo.mp3",
    "10-carne-por-pan-rallado.mp3",
    "11-cocinar-la-milanesa.mp3",
    "12-servir-el-plato.mp3"
  ].map((file) => `./assets/language/sofia/audio/recipe/steps/${file}`)
];
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./pacman-language.js",
  "./pacman-language.css",
  "./language-missions.js",
  "./language-scenes.js",
  "./language-missions.css",
  "./technology.js",
  "./technology.css",
  "./capacity-lab.js",
  "./capacity-lab.css",
  "./weight-lab.js",
  "./weight-lab.css",
  "./school-arcade.js",
  "./school-arcade.css",
  "./pacman-quests.js",
  "./pacman-quests.css",
  "./english-family.js",
  "./english-family.css",
  "./earth-layers.js",
  "./earth-layers.css",
  "./social-farm.js",
  "./social-farm.css",
  "./pacman-worlds.js",
  "./pacman-worlds.css",
  "./pacman-discoveries.js",
  "./pacman-discoveries.css",
  "./parish-visit.js",
  "./parish-visit.css",
  "./pacman-memory.js",
  "./pacman-memory.css",
  "./pacman-explorer.js",
  "./pacman-explorer.css",
  "./story-books.js",
  "./story-video.js",
  ...["el-ultimo-entrenador", "carnaval-en-el-zoo", "ratita-gris-y-ratita-azul", "mocho-y-el-espantapajaros", "la-vuelta-al-mundo", "la-casa-del-arbol", "una-noche-de-muchos-dias"].map(id => `./assets/stories/${id}/cuento-completo.mp4`),
  "./story-support.js",
  "./story-support.css",
  ...["cover.jpg", "abuelo.jpg", "equipo.jpg", "entrenador-5s.mp4", "audio/ages.mp3", "audio/photo.mp3"].map(file => `./assets/stories/el-ultimo-entrenador/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/el-ultimo-entrenador/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/el-ultimo-entrenador/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  ...["cover.jpg", "leon.jpg", "leon-disfrazado.jpg", "audio/costume.mp3", "audio/fantasy.mp3"].map(file => `./assets/stories/carnaval-en-el-zoo/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/carnaval-en-el-zoo/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/carnaval-en-el-zoo/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  ...["cover.jpg", "ratita-gris.jpg", "ratita-azul.jpg", "huevo.jpg", "pichon.jpg", "gorriona.jpg", "canasta.jpg", "nido.jpg", "audio/friends.mp3", "audio/egg.mp3"].map(file => `./assets/stories/ratita-gris-y-ratita-azul/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/ratita-gris-y-ratita-azul/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/ratita-gris-y-ratita-azul/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  ...["cover.jpg", "espantapajaros.jpg", "mama.jpg", "audio/figure.mp3", "audio/dream.mp3"].map(file => `./assets/stories/mocho-y-el-espantapajaros/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/mocho-y-el-espantapajaros/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/mocho-y-el-espantapajaros/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  ...["cover.jpg", "jirafa-hormiga.jpg", "manzana.svg", "audio/block.mp3", "audio/giraffe.mp3"].map(file => `./assets/stories/la-vuelta-al-mundo/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/la-vuelta-al-mundo/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/la-vuelta-al-mundo/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  ...["cover.jpg", "pino.jpg", "casa-imaginada.jpg", "tanque.jpg", "audio/pine.mp3", "audio/tank.mp3"].map(file => `./assets/stories/la-casa-del-arbol/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/la-casa-del-arbol/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/la-casa-del-arbol/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  ...["cover.jpg", "dragon.jpg", "dragon-dormido.jpg", "audio/dragon.mp3", "audio/noise.mp3"].map(file => `./assets/stories/una-noche-de-muchos-dias/${file}`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/una-noche-de-muchos-dias/scene-${String(index + 1).padStart(2, "0")}.jpg`),
  ...Array.from({ length:8 }, (_, index) => `./assets/stories/una-noche-de-muchos-dias/audio/scene-${String(index + 1).padStart(2, "0")}.mp3`),
  "./assets/supports/parish/medalla1-1.jpg",
  "./assets/sociales/campo/figuras.png",
  "./assets/sociales/campo/campo.jpeg",
  "./assets/sociales/campo/ambientes.jpeg",
  ...["grandmother", "grandfather", "mother", "father", "sister", "sisters", "brother", "brothers"].map((word) => `./assets/english/family/audio/${word}.mp3`),
  ...["grandpa-maternal", "grandma-paternal", "grandma-maternal", "dad", "mom", "iara", "maria", "camilo", "aimar", "ian"].map((person) => `./assets/english/family/photos/${person}.png`),
  "./vendor/gsap.min.js",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./assets/plantas-partes-ejemplo.jpeg",
  "./assets/plantas-partes-actividad.png",
  ...PICTO_FILES,
  ...ENGLISH_FILES,
  ...SUPPORT_AUDIO_FILES,
  ...MULTIPLICATION_AUDIO_FILES,
  ...COMMUNICATION_AUDIO_FILES,
  ...RECIPE_FILES,
  ...SOFIA_LANGUAGE_FILES
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // El reproductor pide fragmentos del MP4, también cuando no hay conexión.
  if (event.request.headers.has("range") && new URL(event.request.url).pathname.endsWith(".mp4")) {
    event.respondWith(caches.match(event.request.url).then(async cached => {
      if (!cached) return fetch(event.request);
      const match = /^bytes=(\d*)-(\d*)$/.exec(event.request.headers.get("range"));
      if (!match || (!match[1] && !match[2])) return cached;
      const buffer = await cached.arrayBuffer();
      const size = buffer.byteLength;
      const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
      const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
      if (start >= size || start > end) return new Response(null, { status:416, headers:{ "Content-Range":`bytes */${size}` } });
      return new Response(buffer.slice(start, end + 1), { status:206, headers:{ "Content-Type":cached.headers.get("content-type") || "video/mp4", "Accept-Ranges":"bytes", "Content-Range":`bytes ${start}-${end}/${size}`, "Content-Length":String(end - start + 1) } });
    }));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        // The first install precaches bare filenames; HTML requests versioned assets.
        const assetUrl = new URL(event.request.url);
        if (assetUrl.origin === self.location.origin && /\.(js|css)$/.test(assetUrl.pathname) && assetUrl.searchParams.has("v")) {
          assetUrl.searchParams.delete("v");
          return caches.match(assetUrl.href);
        }
        return undefined;
      })
  );
});
