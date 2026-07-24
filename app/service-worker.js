const CACHE_NAME = "ian-escuela-v14";
const PICTO_FILES = [
  "./assets/pictos/adios.png",
  "./assets/pictos/abrazo.png",
  "./assets/pictos/abrir.png",
  "./assets/pictos/aburrido.png",
  "./assets/pictos/agua.png",
  "./assets/pictos/aula.png",
  "./assets/pictos/auriculares.png",
  "./assets/pictos/bano.png",
  "./assets/pictos/beber.png",
  "./assets/pictos/brazo.png",
  "./assets/pictos/cabeza.png",
  "./assets/pictos/caca.png",
  "./assets/pictos/calor.png",
  "./assets/pictos/cansado.png",
  "./assets/pictos/casa.png",
  "./assets/pictos/cerrar.png",
  "./assets/pictos/comer.png",
  "./assets/pictos/companero.png",
  "./assets/pictos/contento.png",
  "./assets/pictos/cuaderno.png",
  "./assets/pictos/descanso.png",
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
  "./assets/pictos/gracias.png",
  "./assets/pictos/hambre.png",
  "./assets/pictos/hola.png",
  "./assets/pictos/ir.png",
  "./assets/pictos/jugar.png",
  "./assets/pictos/lapiz.png",
  "./assets/pictos/leer.png",
  "./assets/pictos/lengua.png",
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
  "./assets/pictos/psicologa.png",
  "./assets/pictos/quiero.png",
  "./assets/pictos/recreo.png",
  "./assets/pictos/ruido.png",
  "./assets/pictos/salir.png",
  "./assets/pictos/si.png",
  "./assets/pictos/silencio.png",
  "./assets/pictos/solo.png",
  "./assets/pictos/tarea.png",
  "./assets/pictos/terapeuta.png",
  "./assets/pictos/terapia.png",
  "./assets/pictos/terminar.png",
  "./assets/pictos/trabajar.png",
  "./assets/pictos/tranquilo.png",
  "./assets/pictos/triste.png",
  "./assets/pictos/turno.png",
  "./assets/pictos/volver.png",
  "./assets/pictos/yo.png"
];
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  ...PICTO_FILES
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

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
