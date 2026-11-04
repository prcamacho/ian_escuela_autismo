const STORY_PROGRESS_KEY = "ian-escuela-story-progress-v1";
const STORY_AUDIO_COOLDOWN_MS = 300_000;
const STORY_AUDIO_COOLDOWN_PREFIX = "ian-story-audio-next-at-v2:";
const STORY_AUDIO_LEGACY_COOLDOWN_PREFIX = "ian-story-audio-next-at-v1:";
const STORY_LISTENING_KEY = "ian-story-listening-v1";
const STORY_COMPLETE_CHANGE_MS = 120_000;
let storySupportState = null;
let storyAudio = null;
let storyAudioCooldownMemory = {};
let storyAudioTimer = null;
let storyListeningMemory = null;
let storyAudioSequence = 0;

function storySaveListening() {
  try { localStorage.setItem(STORY_LISTENING_KEY, JSON.stringify(storyListeningMemory)); } catch {}
}

function storyListening() {
  if (storyListeningMemory) return storyListeningMemory;
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORY_LISTENING_KEY)); } catch {}
  const state = storyListeningMemory = { readings: {}, last: null, pending: null };
  for (const book of STORY_BOOKS) {
    const reading = saved?.readings?.[book.id];
    state.readings[book.id] = {
      heard: Array.isArray(reading?.heard) ? [...new Set(reading.heard.filter(index => Number.isInteger(index) && index >= 0 && index < book.scenes.length))] : [],
      restart: reading?.restart === true
    };
  }
  const validLast = last => last && STORY_BOOKS.some(book => book.id === last.bookId)
    && Number.isFinite(last.at) && last.at > 0 && last.at <= Date.now();
  if (validLast(saved?.last)) state.last = { bookId: saved.last.bookId, at: saved.last.at, complete: saved.last.complete === true && storyReadingComplete(saved.last.bookId) };
  // Si Android cerró el proceso, la última señal de reproducción conserva la
  // espera. Una locución interrumpida nunca completa una escena.
  const pending = saved?.pending;
  if (validLast(pending) && typeof pending.slot === "string" && pending.slot.startsWith(`${pending.bookId}:`)) {
    state.last = { bookId: pending.bookId, at: pending.at, complete: storyReadingComplete(pending.bookId) };
    setStoryAudioNextAt(pending.slot, pending.at + STORY_AUDIO_COOLDOWN_MS);
  }
  return state;
}

function storyReadingComplete(bookId) {
  const book = STORY_BOOKS.find(item => item.id === bookId);
  return Boolean(book && storyListeningMemory?.readings[bookId]?.heard.length === book.scenes.length);
}

function storyChangeNextAt() {
  const last = storyListening().last;
  if (!last || last.bookId === storyBook()?.id || last.at > Date.now()) return 0;
  return last.at + (last.complete ? STORY_COMPLETE_CHANGE_MS : STORY_AUDIO_COOLDOWN_MS);
}

function storyBook() {
  return STORY_BOOKS.find(book => book.id === storySupportState?.id);
}

function storyAsset(book, file) {
  return `./assets/stories/${book.id}/${file}`;
}

function storySceneImage(index) {
  return `scene-${String(index + 1).padStart(2, "0")}.jpg`;
}

function storySavedProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(STORY_PROGRESS_KEY) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch { return {}; }
}

function storyRemember() {
  if (!storyBook()) return;
  try {
    localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify({ ...storySavedProgress(), [storySupportState.id]: storySupportState.scene }));
  } catch { /* El recorrido también se conserva en memoria. */ }
}

function storyAudioSlot() {
  const book = storyBook();
  if (!book) return null;
  if (storySupportState.panel === "read") return `${book.id}:scene-${storySupportState.scene + 1}`;
  return book.helps[storySupportState.panel] ? `${book.id}:help-${storySupportState.panel}` : null;
}

function setStoryAudioNextAt(slot, value) {
  const nextAt = value > Date.now() ? value : 0;
  storyAudioCooldownMemory[slot] = nextAt;
  try {
    if (nextAt) localStorage.setItem(STORY_AUDIO_COOLDOWN_PREFIX + slot, String(nextAt));
    else localStorage.removeItem(STORY_AUDIO_COOLDOWN_PREFIX + slot);
  } catch { /* La espera se conserva en memoria si falla el almacenamiento. */ }
}

function storyAudioNextAt(slot) {
  if (!slot) return 0;
  const nextAt = boundedAudioNextAt(STORY_AUDIO_COOLDOWN_PREFIX + slot, storyAudioCooldownMemory[slot] || 0,
    STORY_AUDIO_COOLDOWN_MS, value => setStoryAudioNextAt(slot, value));
  if (nextAt) return nextAt;
  // Las esperas vigentes de dos minutos pasan a cinco desde el mismo inicio.
  // Las ya vencidas no vuelven a bloquear una sección.
  let legacyNextAt = 0;
  try { legacyNextAt = Number(localStorage.getItem(STORY_AUDIO_LEGACY_COOLDOWN_PREFIX + slot)); } catch {}
  const remaining = legacyNextAt - Date.now();
  if (Number.isFinite(legacyNextAt) && remaining > 0 && remaining <= 120_000) {
    const migratedNextAt = legacyNextAt + STORY_AUDIO_COOLDOWN_MS - 120_000;
    setStoryAudioNextAt(slot, migratedNextAt);
    return migratedNextAt;
  }
  return 0;
}

function storyAudioRemainingMs() {
  const changeAt = storyChangeNextAt();
  return Math.max(0, storyAudioNextAt(storyAudioSlot()) - Date.now(), changeAt - Date.now());
}

function storyListenLabel() {
  if (storyAudio) return "Escuchando…";
  const seconds = Math.ceil(storyAudioRemainingMs() / 1000);
  return seconds ? `Escuchar en ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}` : "Escuchar";
}

function storyInteractionLocked() {
  return route.view === "support-story" && Boolean(storyAudio);
}

function storyLockControls() {
  const locked = storyInteractionLocked();
  for (const button of document.querySelectorAll?.(".story-screen button") || []) {
    if (locked) {
      if (button.dataset.storyVoiceDisabled === undefined) button.dataset.storyVoiceDisabled = String(button.disabled);
      button.disabled = true;
    } else if (button.dataset.storyVoiceDisabled !== undefined) {
      button.disabled = button.dataset.storyVoiceDisabled === "true";
      delete button.dataset.storyVoiceDisabled;
    }
  }
}

function storyAudioControls() {
  const playing = Boolean(storyAudio);
  storyLockControls();
  const listen = document.querySelector('[data-action="story-listen"]');
  if (listen) {
    listen.disabled = playing || storyAudioRemainingMs() > 0;
    listen.textContent = storyListenLabel();
  }
}

function stopStoryAudioTimer() {
  if (storyAudioTimer !== null) window.clearInterval(storyAudioTimer);
  storyAudioTimer = null;
}

function syncStoryAudioControls() {
  stopStoryAudioTimer();
  storyAudioControls();
  if (route.view !== "support-story" || document.hidden || !document.querySelector('[data-action="story-listen"]') || storyAudioRemainingMs() <= 0) return;
  storyAudioTimer = window.setInterval(() => {
    storyAudioControls();
    if (route.view !== "support-story" || document.hidden || storyAudioRemainingMs() <= 0) stopStoryAudioTimer();
  }, 1000);
}

function stopStoryMedia() {
  stopStoryFilm();
  if (storyInteractionLocked()) return;
  stopStoryAudioTimer();
  if (storyAudio) {
    const audio = storyAudio;
    storyAudio = null;
    audio.onended = null;
    audio.onerror = null;
    audio.onplaying = null;
    audio.pause();
    audio.currentTime = 0;
  }
  const video = document.querySelector(".story-video");
  if (video) { video.pause(); video.currentTime = 0; video.hidden = true; }
  const poster = document.querySelector(".story-scene-image");
  if (poster) poster.hidden = false;
  const movement = document.querySelector('[data-action="story-clip"]');
  if (movement) movement.textContent = "Ver movimiento";
  storyAudioControls();
}

function storyAges(book) {
  return `<div class="story-ages">
    <figure><img src="${storyAsset(book, "scene-02.jpg")}" alt="El entrenador cuando era joven"><figcaption>ANTES<br><strong>Entrenador joven</strong></figcaption></figure>
    <figure><img src="${storyAsset(book, "abuelo.jpg")}" alt="El mismo hombre, ya mayor"><figcaption>AHORA<br><strong>Abuelo</strong></figcaption></figure>
  </div>`;
}

function renderStoryLibrary() {
  stopStoryMedia();
  renderShell(`<section class="screen story-library">
    <div class="screen-actions"><button class="btn btn-ghost" type="button" data-action="supports">${icon("arrow")}Mis apoyos</button></div>
    <div class="section-title"><div><p class="eyebrow">LEO A MI RITMO</p><h2>Cuentos</h2></div></div>
    <div class="story-books">${STORY_BOOKS.map(book => `<button class="story-book" type="button" data-action="story-open" data-value="${book.id}">
      <img src="${storyAsset(book, "cover.jpg")}" alt="Portada del cuento ${escapeHtml(book.title)}">
      <span><strong>${escapeHtml(book.title)}</strong><small>${escapeHtml(book.author)}</small><b>${Number(storySavedProgress()[book.id]) > 0 ? "Continuar el cuento" : "Leer el cuento"} <span aria-hidden="true">→</span></b></span>
    </button>`).join("")}</div>
    <p class="story-credits">${STORY_BOOKS.map(book => `${book.author} · Ilustraciones de ${book.illustrator} · ${book.source}`).join("<br>")}</p>
  </section>`);
}

function renderStorySupport() {
  if (storyInteractionLocked()) return;
  stopStoryMedia();
  const book = storyBook();
  if (!book) return setRoute({ view: "support-stories" });
  const state = storySupportState;
  if (!["read", ...(book.video ? ["video"] : []), ...Object.keys(book.helps)].includes(state.panel)) state.panel = "read";
  const scene = book.scenes[state.scene];
  let content;
  if (state.panel === "read") {
    content = `<div class="story-reading"><div class="story-art"><img class="story-scene-image" src="${storyAsset(book, storySceneImage(state.scene))}" alt="${scene.alt}">
      ${scene.clip ? `<video class="story-video" src="${storyAsset(book, scene.clip)}" preload="none" controls muted playsinline disablepictureinpicture controlslist="nodownload noremoteplayback" aria-label="Cinco segundos de movimiento del entrenador, sin audio" hidden></video>` : ""}</div>
      <div class="story-copy"><p class="story-kicker">ESCENA ${state.scene + 1} DE ${book.scenes.length}</p><h2 id="story-title" tabindex="-1">${scene.title}</h2><p class="story-sentence">${scene.text}</p>${storyListenButtons()}
      ${scene.clip && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? '<button class="btn btn-ghost story-movement" type="button" data-action="story-clip">Ver movimiento</button>' : ""}
      <div class="story-page-action">${state.scene < book.scenes.length - 1 ? '<button class="btn btn-primary" type="button" data-action="story-next">Siguiente →</button>' : '<button class="btn btn-ghost" type="button" data-action="story-restart">Leer desde el principio</button>'}</div></div></div>`;
  } else if (state.panel === "video") {
    content = storyFilmMarkup(book);
  } else if (state.panel === "ages") {
    content = `<div class="story-helper-layout">${storyAges(book)}<div class="story-copy"><p class="story-kicker">ES LA MISMA PERSONA</p><h2 id="story-title" tabindex="-1">Antes y ahora</h2><p class="story-sentence">${book.helps.ages.text}</p><p class="story-detail">La E de la ropa significa <strong>entrenador</strong>.</p>${storyListenButtons()}${storyReturnButton()}</div></div>`;
  } else if (state.panel === "photo") {
    content = `<div class="story-helper-layout"><img class="story-photo" src="${storyAsset(book, "equipo.jpg")}" alt="El entrenador aparece en la foto del equipo"><div class="story-copy"><p class="story-kicker">MIRO LA FOTO Y LOS NOMBRES</p><h2 id="story-title" tabindex="-1">Falta su nombre</h2><p class="story-sentence">El entrenador aparece en la imagen.</p><p class="story-sentence">Su nombre falta en la lista de nombres.</p>${storyListenButtons()}${storyReturnButton()}</div></div>`;
  } else {
    const help = book.helps[state.panel];
    const pictures = help.images.length > 1
      ? `<div class="story-ages">${help.images.map(item => `<figure><img src="${storyAsset(book,item.file)}" alt="${escapeHtml(item.alt)}"><figcaption>${escapeHtml(item.label)}<br><strong>${escapeHtml(item.caption)}</strong></figcaption></figure>`).join("")}</div>`
      : `<img class="story-photo" src="${storyAsset(book,help.images[0].file)}" alt="${escapeHtml(help.images[0].alt)}">`;
    content = `<div class="story-helper-layout">${pictures}<div class="story-copy"><p class="story-kicker">${escapeHtml(help.kicker)}</p><h2 id="story-title" tabindex="-1">${escapeHtml(help.title)}</h2><p class="story-sentence">${escapeHtml(help.text)}</p>${storyListenButtons()}${storyReturnButton()}</div></div>`;
  }
  const tabs = [["read", "El cuento"], ...Object.entries(book.helps).map(([id,help]) => [id,help.tab || help.title]), ...(book.video ? [["video", "Video"]] : [])];
  renderShell(`<section class="story-screen">
    <header class="story-top"><button class="btn btn-ghost" type="button" data-action="story-library">${icon("arrow")}Cuentos</button><span>${book.title}</span></header>
    <nav class="story-tabs" aria-label="Partes del cuento">${tabs.map(([id,label]) => `<button type="button" data-action="story-panel" data-value="${id}" ${state.panel === id ? 'aria-current="page"' : ""}>${label}</button>`).join("")}</nav>
    <div class="story-content">${content}</div>
  </section>`);
  syncStoryAudioControls();
  if (state.panel === "video") setupStoryFilm();
}

function storyReturnButton() {
  return '<div class="story-page-action"><button class="btn btn-ghost" type="button" data-action="story-panel" data-value="read">Volver al cuento</button></div>';
}

function storyListenButtons() {
  return `<div class="story-listen"><button class="btn btn-primary" type="button" data-action="story-listen" ${storyAudio || storyAudioRemainingMs() > 0 ? "disabled" : ""}>${storyListenLabel()}</button></div><p class="story-audio-status" role="status"></p>`;
}

function storyPlayAudio() {
  const book = storyBook(), state = storySupportState;
  if (!book || storyAudio || state.panel === "video") return;
  if (storyAudioRemainingMs() > 0) return syncStoryAudioControls();
  stopStoryMedia();
  const file = state.panel === "read" ? `scene-${String(state.scene + 1).padStart(2, "0")}` : state.panel;
  const audio = new Audio(storyAsset(book, `audio/${file}.mp3`));
  const slot = storyAudioSlot();
  const scene = state.panel === "read" ? state.scene : null;
  const listening = storyListening();
  const token = `story-${Date.now()}-${++storyAudioSequence}`;
  const native = window.Capacitor?.isNativePlatform?.() === true;
  const volume = native ? window.Capacitor?.Plugins?.StoryVolume : null;
  let started = false;
  let lastHeartbeat = 0;
  // En Android se limita el volumen multimedia real; en la web, el reproductor.
  audio.volume = native ? 1 : 0.7;
  audio.onvolumechange = () => { if (!native && audio.volume > 0.7) audio.volume = 0.7; };
  // Reservar antes de consultar Android también evita dobles toques.
  storyAudio = audio;
  const markStarted = () => {
    if (started || storyAudio !== audio) return;
    started = true;
    const reading = listening.readings[book.id];
    if (reading.restart || (listening.last?.bookId !== book.id && storyReadingComplete(book.id))) reading.heard = [];
    reading.restart = false;
    listening.pending = { bookId: book.id, slot, scene, at: Date.now() };
    setStoryAudioNextAt(slot, Date.now() + STORY_AUDIO_COOLDOWN_MS);
    storySaveListening();
  };
  const finish = (completed, message = "") => {
    if (storyAudio !== audio) return;
    if (started) {
      if (completed && scene !== null && !listening.readings[book.id].heard.includes(scene)) listening.readings[book.id].heard.push(scene);
      listening.last = { bookId: book.id, at: Date.now(), complete: storyReadingComplete(book.id) };
      listening.pending = null;
      setStoryAudioNextAt(slot, Date.now() + STORY_AUDIO_COOLDOWN_MS);
      storySaveListening();
    }
    audio.onplaying = audio.onended = audio.onerror = audio.ontimeupdate = audio.onpause = audio.onvolumechange = null;
    audio.storyFinish = null;
    audio.pause();
    if (volume) Promise.resolve(volume.end({ token })).catch(() => {});
    storyAudio = null;
    syncStoryAudioControls();
    const status = document.querySelector(".story-audio-status");
    if (status) status.textContent = message;
  };
  const failed = () => finish(false, started ? "El audio se interrumpió. Podés seguir leyendo." : "El audio no pudo empezar. Podés volver a tocar Escuchar.");
  audio.storyFinish = () => finish(false);
  audio.onplaying = markStarted;
  audio.onended = () => finish(true);
  audio.onerror = failed;
  audio.onpause = () => { if (!audio.ended) finish(false, "El audio se interrumpió. Podés seguir leyendo."); };
  audio.ontimeupdate = () => {
    if (!started || storyAudio !== audio || Date.now() - lastHeartbeat < 1000) return;
    lastHeartbeat = Date.now();
    listening.pending.at = Date.now();
    setStoryAudioNextAt(slot, Date.now() + STORY_AUDIO_COOLDOWN_MS);
    storySaveListening();
    if (volume) Promise.resolve(volume.refresh({ token })).catch(failed);
  };
  syncStoryAudioControls();
  const status = document.querySelector(".story-audio-status");
  if (status) status.textContent = "";
  const play = () => {
    if (storyAudio !== audio) { if (volume) Promise.resolve(volume.end({ token })).catch(() => {}); return; }
    try { Promise.resolve(audio.play()).then(markStarted, failed); } catch { failed(); }
  };
  if (native) {
    if (!volume) return finish(false, "Actualizá la aplicación para escuchar con el límite de volumen.");
    try { Promise.resolve(volume.begin({ token })).then(play, failed); } catch { failed(); }
  } else play();
}

function storySupportAction(action, target) {
  if (storyInteractionLocked()) return;
  if (action === "story-library") return setRoute({ view: "support-stories" });
  if (action === "story-open") {
    const book = STORY_BOOKS.find(item => item.id === target.dataset.value);
    if (!book || route.view !== "support-stories") return;
    if (storySupportState?.id !== book.id) {
      const saved = storySavedProgress()[book.id];
      storySupportState = { id:book.id, scene:Number.isInteger(saved) ? Math.max(0, Math.min(book.scenes.length - 1, saved)) : 0, panel:"read" };
    }
    return setRoute({ view: "support-story" });
  }
  const book = storyBook(), state = storySupportState;
  if (route.view !== "support-story" || !book) return;
  if (action === "story-video-play") return playStoryFilm();
  if (action === "story-video-pause") return pauseStoryFilm();
  if (action === "story-listen") return storyPlayAudio();
  if (action === "story-clip") {
    if (state.panel !== "read" || !book.scenes[state.scene].clip || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const video = document.querySelector(".story-video");
    if (!video) return;
    const wasPlaying = !video.hidden;
    stopStoryMedia();
    syncStoryAudioControls();
    if (wasPlaying) return;
    video.hidden = false;
    video.muted = true;
    const poster = document.querySelector(".story-scene-image");
    if (poster) poster.hidden = true;
    const button = document.querySelector('[data-action="story-clip"]');
    if (button) button.textContent = "Volver a la imagen";
    video.onerror = () => { if (document.querySelector(".story-video") !== video) return; stopStoryMedia(); syncStoryAudioControls(); const status=document.querySelector(".story-audio-status"); if(status) status.textContent="Podés seguir mirando la imagen."; };
    try { Promise.resolve(video.play()).catch(() => video.onerror?.()); } catch { video.onerror(); }
    return;
  }
  if (action === "story-panel") {
    if (!["read", ...(book.video ? ["video"] : []), ...Object.keys(book.helps)].includes(target.dataset.value)) return;
    state.panel = target.dataset.value;
  } else if (action === "story-next" && state.panel === "read") state.scene = Math.min(book.scenes.length - 1, state.scene + 1);
  else if (action === "story-restart" && state.panel === "read") {
    state.scene = 0;
    storyListening().readings[book.id].restart = true;
    storySaveListening();
  }
  else return;
  storyRemember();
  render();
  document.querySelector("#story-title")?.focus({ preventScroll:true });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopStoryMedia();
  else if (route.view === "support-story") { setupStoryFilm(); syncStoryAudioControls(); }
});

window.addEventListener("pagehide", () => { stopStoryFilm(); storyAudio?.storyFinish?.(); });
