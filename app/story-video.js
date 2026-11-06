// Películas locales: solo reproducir/pausar, sin navegación ni volumen nativos.
const STORY_VIDEO_MAX_PERCENT = 60;
const STORY_VIDEO_RESTART_AFTER_MS = 300_000;
const STORY_VIDEO_START_TIMEOUT_MS = 12_000;
const STORY_VIDEO_PROGRESS_PREFIX = "ian-story-video-progress-v1:";
let storyFilmProgressMemory = {};
let storyFilm = null;
let storyFilmSequence = 0;

function storyFilmMarkup(book) {
  return `<div class="story-film-panel">
    <div class="story-film-frame"><video class="story-film" data-src="${storyAsset(book, book.video)}" poster="${storyAsset(book, "scene-01.jpg")}" preload="none" playsinline webkit-playsinline disablepictureinpicture disableremoteplayback controlslist="nofullscreen nodownload noremoteplayback" tabindex="-1" aria-label="Video de ${escapeHtml(book.title)}"></video></div>
    <div class="story-film-controls" aria-label="Reproducción del video">
      <button class="btn btn-primary" type="button" data-action="story-video-play"><span aria-hidden="true">▶</span> Reproducir</button>
      <button class="btn btn-ghost" type="button" data-action="story-video-pause" disabled><span aria-hidden="true">Ⅱ</span> Pausar</button>
    </div>
    <p class="story-film-status" role="status" aria-live="polite"></p>
  </div>`;
}

function clearStoryFilmPoint(bookId) {
  delete storyFilmProgressMemory[bookId];
  try { localStorage.removeItem(STORY_VIDEO_PROGRESS_PREFIX + bookId); } catch {}
}

function storyFilmSavedPoint(bookId) {
  let saved = storyFilmProgressMemory[bookId];
  try {
    const raw = localStorage.getItem(STORY_VIDEO_PROGRESS_PREFIX + bookId);
    if (raw !== null) saved = JSON.parse(raw);
  } catch {}
  if (!saved || !Number.isFinite(saved.time) || saved.time <= 0 || !Number.isFinite(saved.at)
    || saved.at > Date.now() || Date.now() - saved.at >= STORY_VIDEO_RESTART_AFTER_MS) {
    clearStoryFilmPoint(bookId);
    return null;
  }
  return saved;
}

function rememberStoryFilmPoint(film) {
  if (film.video.ended) return clearStoryFilmPoint(film.bookId);
  // Salir de una pestaña que ya estaba pausada no vuelve a empezar los cinco minutos.
  if (!film.playing || !Number.isFinite(film.video.currentTime) || film.video.currentTime <= 0) return;
  const saved = { time: film.video.currentTime, at: Date.now() };
  storyFilmProgressMemory[film.bookId] = saved;
  try { localStorage.setItem(STORY_VIDEO_PROGRESS_PREFIX + film.bookId, JSON.stringify(saved)); } catch {}
}

function seekStoryFilmPoint(film) {
  if (film.pendingSeek === null || film.video.readyState < 1) return;
  let target = film.pendingSeek;
  if (Number.isFinite(film.video.duration) && target >= film.video.duration) {
    target = 0;
    clearStoryFilmPoint(film.bookId);
  }
  try {
    // Buscar 0 cuando ya estamos en 0 fuerza una apertura del decodificador
    // incluso con el video detenido en algunas versiones de WebView.
    if (Math.abs(film.video.currentTime - target) > .01) film.video.currentTime = target;
    film.pendingSeek = null;
  } catch {}
}

function storyFilmIsCurrent(film) {
  return storyFilm === film && route.view === "support-story"
    && storySupportState?.id === film.bookId && storySupportState.panel === "video"
    && document.querySelector(".story-film") === film.video && !document.hidden;
}

function storyFilmControls(message = "") {
  const film = storyFilm;
  const playing = Boolean(film && (film.pending || !film.video.paused));
  const play = document.querySelector('[data-action="story-video-play"]');
  const pause = document.querySelector('[data-action="story-video-pause"]');
  if (play) play.disabled = !film || playing;
  if (pause) pause.disabled = !film || !playing;
  const status = document.querySelector(".story-film-status");
  if (status) status.textContent = message;
}

function releaseStoryFilmVolume(session) {
  if (session?.heartbeat) window.clearInterval(session.heartbeat);
  if (session?.startTimer) window.clearTimeout(session.startTimer);
  if (session?.volume) {
    // También se llama cuando un begin tardío termina después de salir/pausar.
    // Android compara el token: nunca libera la sesión de otra reproducción.
    try { Promise.resolve(session.volume.end({ token: session.token })).catch(() => {}); } catch {}
  }
}

function pauseStoryFilm() {
  const film = storyFilm;
  if (!film) return;
  rememberStoryFilmPoint(film);
  film.playing = false;
  const session = film.session;
  film.session = null;
  film.pending = false;
  // Silenciar antes de pausar corta también la cola de audio de WebView.
  film.video.muted = true;
  film.video.pause();
  releaseStoryFilmVolume(session);
  storyFilmControls();
}

function stopStoryFilm() {
  const film = storyFilm;
  if (!film) return;
  rememberStoryFilmPoint(film);
  const session = film.session;
  film.session = null;
  storyFilm = null;
  film.video.onplaying = film.video.onpause = film.video.onended = film.video.onerror = null;
  film.video.ontimeupdate = film.video.onvolumechange = film.video.oncontextmenu = film.video.onloadedmetadata = null;
  film.video.ondblclick = null;
  film.video.muted = true;
  film.video.pause();
  // Pausar o quitar el nodo no libera inmediatamente MediaCodec en la A8.
  // Vaciar la fuente y cargar el estado vacío sí cierra el reproductor anterior.
  film.video.removeAttribute("src");
  film.video.load();
  releaseStoryFilmVolume(session);
  storyFilmControls();
}

function setupStoryFilm() {
  if (route.view !== "support-story" || storySupportState?.panel !== "video" || document.hidden) return;
  const video = document.querySelector(".story-film");
  if (!video || storyFilm?.video === video) return;
  stopStoryFilm();
  const native = window.Capacitor?.isNativePlatform?.() === true;
  const film = storyFilm = { video, bookId: storyBook().id, native, pending: false, session: null, lastHeartbeat: 0, playing: false, pendingSeek: null };
  film.pendingSeek = storyFilmSavedPoint(film.bookId)?.time ?? 0;
  video.onloadedmetadata = () => { if (storyFilm === film) seekStoryFilmPoint(film); };
  seekStoryFilmPoint(film);
  video.controls = false;
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
  video.muted = true;
  video.volume = native ? 1 : STORY_VIDEO_MAX_PERCENT / 100;
  video.onvolumechange = () => {
    if (!native && video.volume > STORY_VIDEO_MAX_PERCENT / 100) video.volume = STORY_VIDEO_MAX_PERCENT / 100;
  };
  video.oncontextmenu = video.ondblclick = event => event.preventDefault();
  video.onplaying = () => {
    if (!storyFilmIsCurrent(film) || !film.session) {
      video.muted = true;
      return video.pause();
    }
    film.pending = false;
    film.playing = true;
    if (film.session.startTimer) window.clearTimeout(film.session.startTimer);
    storyFilmControls();
  };
  video.onpause = () => { if (storyFilm === film && video.paused && film.session?.playCalled) pauseStoryFilm(); };
  video.onended = () => { if (storyFilm === film) pauseStoryFilm(); };
  video.onerror = () => {
    if (storyFilm !== film) return;
    pauseStoryFilm();
    storyFilmControls("El video no pudo empezar. Podés volver a tocar Reproducir.");
  };
  video.ontimeupdate = () => {
    if (!storyFilmIsCurrent(film)) return stopStoryFilm();
    if (!film.session || video.paused || Date.now() - film.lastHeartbeat < 1000) return;
    film.lastHeartbeat = Date.now();
    rememberStoryFilmPoint(film);
    const session = film.session;
    if (session.volume) {
      try {
        Promise.resolve(session.volume.refresh({ token: session.token })).catch(() => {
          if (storyFilm === film && film.session === session) video.onerror();
        });
      } catch { video.onerror(); }
    }
  };
  storyFilmControls();
}

function playStoryFilm() {
  if (storyInteractionLocked()) return;
  setupStoryFilm();
  const film = storyFilm;
  if (!film || !storyFilmIsCurrent(film) || film.session || !film.video.paused) return;
  const volume = film.native ? window.Capacitor?.Plugins?.StoryVolume : null;
  const session = film.session = { token: `video-${Date.now()}-${++storyFilmSequence}`, volume };
  film.pendingSeek = storyFilmSavedPoint(film.bookId)?.time ?? 0;
  film.pending = true;
  film.lastHeartbeat = 0;
  storyFilmControls("Preparando el video…");
  const fail = () => {
    if (storyFilm === film && film.session === session) film.video.onerror();
    else releaseStoryFilmVolume(session);
  };
  session.startTimer = window.setTimeout(fail, STORY_VIDEO_START_TIMEOUT_MS);
  const play = result => {
    if (!storyFilmIsCurrent(film) || film.session !== session) {
      releaseStoryFilmVolume(session);
      return;
    }
    // Un puente anterior puede restaurar un volumen alto al pausar.
    if (film.native && (!result?.active || result.restoreOnEnd !== false || !Number.isFinite(result.maximum) || result.maximum < 1
      || !Number.isFinite(result.ceiling) || result.ceiling > Math.floor(result.maximum * STORY_VIDEO_MAX_PERCENT / 100)
      || result.current > result.ceiling)) return fail();
    if (volume) session.heartbeat = window.setInterval(() => {
      if (!storyFilmIsCurrent(film) || film.session !== session) return releaseStoryFilmVolume(session);
      Promise.resolve(volume.refresh({ token: session.token })).catch(fail);
    }, 3000);
    // Cargar únicamente después de pulsar Reproducir y aplicar el volumen.
    // load() también permite reintentar un elemento que quedó con error.
    if (!film.video.getAttribute("src") || film.video.error) {
      film.video.src = film.video.dataset.src;
      film.video.load();
    }
    seekStoryFilmPoint(film);
    session.playCalled = true;
    film.video.muted = false;
    try { Promise.resolve(film.video.play()).catch(fail); } catch { fail(); }
  };
  if (film.native) {
    if (!volume) return fail();
    try { Promise.resolve(volume.begin({ token: session.token, maxPercent: STORY_VIDEO_MAX_PERCENT, restoreOnEnd: false })).then(play, fail); } catch { fail(); }
  } else play();
}
