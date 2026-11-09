const STORY_USAGE_KEY = "ian-story-usage-v1";
const STORY_USAGE_LIMIT_MS = 15 * 60_000;
const STORY_REST_MS = 15 * 60_000;
const STORY_USAGE_RESET_AFTER_MS = 5 * 60_000;
let storyUsageMemory = null;
let storyUsageRunning = false;
let storyUsageTimer = null;
let storyUsageSaved = "";

function isStoryRoute() {
  return route.view === "support-stories" || route.view === "support-story";
}

function storyUsageState() {
  if (storyUsageMemory) return storyUsageMemory;
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORY_USAGE_KEY)); } catch {}
  const now = Date.now();
  const validTime = value => Number.isFinite(value) && value > 0 && value <= now;
  return storyUsageMemory = {
    usedMs: Number.isFinite(saved?.usedMs) ? Math.max(0, Math.min(STORY_USAGE_LIMIT_MS, saved.usedMs)) : 0,
    lastAt: null,
    // Un proceso nuevo no cuenta como uso el tiempo que la app estuvo cerrada.
    outsideAt: validTime(saved?.outsideAt) ? saved.outsideAt : validTime(saved?.lastAt) ? saved.lastAt : now,
    breakUntil: Number.isFinite(saved?.breakUntil) && saved.breakUntil > now
      && saved.breakUntil <= now + STORY_REST_MS ? saved.breakUntil : 0
  };
}

function saveStoryUsage() {
  const raw = JSON.stringify(storyUsageMemory);
  if (raw === storyUsageSaved) return;
  try { localStorage.setItem(STORY_USAGE_KEY, raw); storyUsageSaved = raw; } catch {}
}

function storyBreakRemainingMs() {
  return Math.max(0, storyUsageState().breakUntil - Date.now());
}

function storyUsageSync(forceOutside = false) {
  if (storyUsageTimer !== null) window.clearTimeout(storyUsageTimer);
  storyUsageTimer = null;
  const state = storyUsageState(), now = Date.now();
  const inside = !forceOutside && isStoryRoute() && !document.hidden;
  if (storyUsageRunning && state.lastAt !== null) state.usedMs += Math.max(0, now - state.lastAt);
  state.lastAt = null;
  storyUsageRunning = false;
  if (state.breakUntil && state.breakUntil <= now) {
    state.breakUntil = 0; state.usedMs = 0; state.outsideAt = now;
  }
  if (!state.breakUntil && state.usedMs >= STORY_USAGE_LIMIT_MS) {
    state.breakUntil = now + STORY_REST_MS;
    state.usedMs = 0;
  }
  if (state.breakUntil) {
    // La finalización por interrupción conserva las esperas de cada locución
    // y el punto del video. El descanso tiene prioridad sobre la navegación.
    if (typeof suspendStoryMedia === "function") suspendStoryMedia();
  } else if (inside) {
    if (state.outsideAt !== null && now - state.outsideAt >= STORY_USAGE_RESET_AFTER_MS) state.usedMs = 0;
    state.outsideAt = null;
    state.lastAt = now;
    storyUsageRunning = true;
  } else {
    if (state.outsideAt === null) state.outsideAt = now;
    if (now - state.outsideAt >= STORY_USAGE_RESET_AFTER_MS) state.usedMs = 0;
  }
  saveStoryUsage();
  if (inside) {
    const until = state.breakUntil ? state.breakUntil - now : STORY_USAGE_LIMIT_MS - state.usedMs;
    storyUsageTimer = window.setTimeout(storyUsageTick, Math.min(1000, Math.max(1, until)));
  }
}

function storyUsageTick() {
  storyUsageSync();
  if (!isStoryRoute() || document.hidden) return;
  const timer = document.querySelector(".story-rest-timer");
  if (storyBreakRemainingMs() > 0) {
    if (timer) timer.textContent = storyRestLabel();
    else render();
  } else if (timer) render();
}

function storyRestLabel() {
  const seconds = Math.ceil(storyBreakRemainingMs() / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function renderStoryRest() {
  renderShell(`<section class="story-rest" aria-labelledby="story-rest-title">
    <div class="story-rest-card"><h2 id="story-rest-title">Descanso</h2>
      <p class="story-rest-timer" role="timer" aria-label="Tiempo de descanso restante">${storyRestLabel()}</p>
      <button class="btn btn-primary" type="button" data-action="supports">Ir a Mis apoyos</button>
    </div></section>`);
}

function storyBackgrounded() {
  storyUsageSync(true);
  suspendStoryMedia();
  // Android puede entregar su aviso después del evento de regreso de WebView.
  if (!document.hidden) {
    storyUsageSync();
    if (isStoryRoute() && storyBreakRemainingMs() > 0) render();
    else setupStoryFilm();
  }
}
