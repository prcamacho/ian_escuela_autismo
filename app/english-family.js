// Personal, offline family activities. All views share each word's audio limit.
const FAMILY_PEOPLE = {
  "grandpa-maternal": { name: "Abuelo materno", word: "grandfather" },
  "grandma-paternal": { name: "Abuela paterna", word: "grandmother" },
  "grandma-maternal": { name: "Abuela materna", word: "grandmother" },
  dad: { name: "Papá", word: "father" },
  mom: { name: "Mamá", word: "mother" },
  iara: { name: "Iara", word: "sister" },
  maria: { name: "María", word: "sister" },
  camilo: { name: "Camilo", word: "brother" },
  aimar: { name: "Aimar", word: "brother" },
  ian: { name: "Ian · Yo", word: null }
};
const FAMILY_WORDS = {
  grandmother: { en: "Grandmother", es: "Abuela", people: ["grandma-maternal", "grandma-paternal"] },
  grandfather: { en: "Grandfather", es: "Abuelo", people: ["grandpa-maternal"] },
  mother: { en: "Mother", es: "Mamá", people: ["mom"] },
  father: { en: "Father", es: "Papá", people: ["dad"] },
  sister: { en: "Sister", es: "Hermana", people: ["iara", "maria"] },
  sisters: { en: "Sisters", es: "Hermanas", people: ["iara", "maria"], plural: true },
  brother: { en: "Brother", es: "Hermano", people: ["camilo", "aimar"] },
  brothers: { en: "Brothers", es: "Hermanos", people: ["camilo", "aimar"], plural: true }
};
const FAMILY_THEMES = [
  { familyMode: "tree", title: "My family · Mi árbol", description: "Conocé las palabras en inglés con las fotos de tu familia.", activityLabel: "10 fotos · 8 palabras", randomExerciseCount: 1 },
  { familyMode: "listen", title: "¿Quién es? · Mi familia", description: "Escuchá la palabra en inglés y elegí la foto o el grupo.", activityLabel: "8 palabras para reconocer", randomExerciseCount: 8 },
  { familyMode: "plural", title: "Uno o varios · Mi familia", description: "Sister y sisters. Brother y brothers. Mirá las fotos y elegí.", activityLabel: "4 desafíos de singular y plural", randomExerciseCount: 4 }
].map((theme) => ({ ...theme, id: `english-family-${theme.familyMode}`, exercises: [{ id: `family-${theme.familyMode}`, type: "english-family", prompt: theme.description }] }));

function withFamilyThemes(subjectId, themes) {
  return subjectId === "ingles" ? [...FAMILY_THEMES, ...themes.filter((theme) => !FAMILY_THEMES.some((item) => item.id === theme?.id))] : themes;
}
function createFamilyExercises(theme) {
  if (theme.familyMode === "tree") return [{ id: uid("family-tree"), type: "english-family", mode: "tree" }];
  const words = theme.familyMode === "plural" ? ["sister", "sisters", "brother", "brothers"] : Object.keys(FAMILY_WORDS);
  return shuffled(words).map((word) => {
    const item = FAMILY_WORDS[word];
    const options = theme.familyMode === "plural" ? (word.startsWith("sister") ? ["sister", "sisters"] : ["brother", "brothers"])
      : [word, ...shuffled(words.filter((id) => id !== word)).slice(0, 2)];
    const portraits = Object.fromEntries(options.map((id) => [id, FAMILY_WORDS[id].plural ? FAMILY_WORDS[id].people : [shuffled(FAMILY_WORDS[id].people)[0]]]));
    return { id: uid("family-round"), type: "english-family", mode: theme.familyMode, word, options: shuffled(options), portraits,
      people: item.plural ? item.people : [shuffled(item.people)[0]] };
  });
}
let familyAudio = null;
let familyAudioFinish = null;
let familyAudioTimer = null;
let familyAudioError = "";

function familyCurrent() {
  const exercise = route.view === "run" ? session?.exercises[session.index] : null;
  return exercise?.type === "english-family" ? { exercise, state: session.family[exercise.id] } : null;
}
function familyAudioKey(word) { return `family-${word}`; }
function familyWriteAudioState(word, state) {
  communicationQuickAudioStatesMemory[familyAudioKey(word)] = state;
  try { localStorage.setItem(COMMUNICATION_QUICK_AUDIO_STATES_KEY, JSON.stringify(communicationQuickAudioStates())); } catch { /* memory still enforces the limit */ }
}
function stopFamilyAudio() {
  if (familyAudio) {
    familyAudioFinish?.();
    stopAppSpeech(familyAudio);
  }
  familyAudio = null;
  familyAudioFinish = null;
  if (familyAudioTimer !== null) window.clearInterval(familyAudioTimer);
  familyAudioTimer = null;
}
function familyAudioAvailability(word) {
  if (appSpeechAudio) return { disabled: true, text: "Escuchando…" };
  const remaining = Math.max(communicationQuickAudioRemainingMs(familyAudioKey(word)), appSpeechRemainingMs());
  return remaining > 0 ? { disabled: true, text: `Volver a escuchar en ${Math.ceil(remaining / 1000)} s` } : { disabled: false, text: "Escuchar" };
}
function refreshFamilyAudioButtons() {
  document.querySelectorAll("[data-family-audio]").forEach((button) => {
    const status = familyAudioAvailability(button.dataset.familyAudio);
    button.disabled = status.disabled;
    const label = button.querySelector("span");
    if (label) label.textContent = status.text;
  });
}
function playFamilyAudio(word) {
  if (!FAMILY_WORDS[word] || !familyCurrent() || familyAudioAvailability(word).disabled) return;
  familyAudioError = "";
  const previous = { ...communicationQuickAudioState(familyAudioKey(word)) };
  // Reserve before playback so leaving/reopening the app cannot skip a repetition.
  advanceCommunicationQuickAudio(familyAudioKey(word));
  const reserved = { ...communicationQuickAudioState(familyAudioKey(word)) };
  const audio = new Audio(`./assets/english/family/audio/${word}.mp3`);
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    const now = Date.now();
    familyWriteAudioState(word, { ...reserved, lastAt: now, nextAt: now + COMMUNICATION_QUICK_AUDIO_DELAYS_MS[reserved.plays - 1] });
  };
  familyAudio = audio;
  familyAudioFinish = finish;
  audio.preload = "auto";
  audio.addEventListener("ended", () => {
    finish();
    if (familyAudio === audio) { familyAudio = null; familyAudioFinish = null; }
    refreshFamilyAudioButtons();
  }, { once: true });
  const failure = () => {
    if (finished) return;
    finished = true;
    familyWriteAudioState(word, previous);
    if (familyAudio === audio) { familyAudio = null; familyAudioFinish = null; }
    familyAudioError = "No se pudo escuchar. Podés volver a intentarlo o seguir con las palabras.";
    if (familyCurrent()) render();
  };
  if (!playAppSpeech(audio, failure)) failure();
  refreshFamilyAudioButtons();
}
function familyPhoto(id) {
  return `<img src="assets/english/family/photos/${id}.png" alt="${escapeHtml(FAMILY_PEOPLE[id].name)}" draggable="false">`;
}
function familyPhotos(ids) { return `<div class="family-portraits ${ids.length > 1 ? "family-pair" : ""}">${ids.map(familyPhoto).join("")}</div>`; }
function familyAudioButton(word) {
  const status = familyAudioAvailability(word);
  return `<button class="family-listen" type="button" data-action="family-audio" data-word="${word}" data-family-audio="${word}" ${status.disabled ? "disabled" : ""}>${icon("speaker")}<span>${status.text}</span></button>`;
}
function familyPersonCard(id, selected) {
  const person = FAMILY_PEOPLE[id];
  if (id === "ian") return `<div class="family-person family-ian">${familyPhoto(id)}<strong>Ian</strong><small>¡Este sos vos!</small></div>`;
  return `<button class="family-person ${selected === id ? "is-selected" : ""}" type="button" data-action="family-person" data-person="${id}" aria-pressed="${selected === id}">${familyPhoto(id)}<strong>${escapeHtml(person.name)}</strong><small lang="en">${FAMILY_WORDS[person.word].en}</small></button>`;
}
function familyTree(state) {
  const selected = FAMILY_PEOPLE[state.person];
  const word = selected?.word || state.word;
  const item = FAMILY_WORDS[word];
  const people = selected ? [state.person] : item.people;
  return `<div class="family-tree-layout"><div class="family-tree" aria-label="Árbol familiar de Ian">
    <div class="family-branches">
      <section class="family-branch"><span class="family-branch-label">Familia de papá</span><div class="family-grandparents">${familyPersonCard("grandma-paternal", state.person)}</div><div class="family-parent">${familyPersonCard("dad", state.person)}</div></section>
      <section class="family-branch"><span class="family-branch-label">Familia de mamá</span><div class="family-grandparents">${["grandpa-maternal", "grandma-maternal"].map((id) => familyPersonCard(id, state.person)).join("")}</div><div class="family-parent">${familyPersonCard("mom", state.person)}</div></section>
    </div>
    <div class="family-children">${["camilo", "aimar", "ian", "iara", "maria"].map((id) => familyPersonCard(id, state.person)).join("")}</div>
    <div class="family-groups"><button type="button" data-action="family-group" data-word="brothers" aria-pressed="${!state.person && word === "brothers"}">Camilo + Aimar <strong lang="en">Brothers</strong><small>Hermanos</small></button><button type="button" data-action="family-group" data-word="sisters" aria-pressed="${!state.person && word === "sisters"}">Iara + María <strong lang="en">Sisters</strong><small>Hermanas</small></button></div>
  </div><aside class="family-detail"><span class="family-eyebrow">TOCÁ UNA FOTO</span>${familyPhotos(people)}<h2 lang="en">${item.en}</h2><p>${item.es}</p><small>${people.map((id) => FAMILY_PEOPLE[id].name).join(" + ")}</small>${familyAudioButton(word)}<p class="family-hint">Mirá, escuchá y decilo a tu ritmo.</p><button class="family-secondary" type="button" data-action="start" data-subject="ingles" data-theme="english-family-listen" data-mode="activity">Practicar →</button></aside></div>`;
}
function familyQuestion(exercise, state) {
  const item = FAMILY_WORDS[exercise.word];
  const plural = exercise.mode === "plural";
  return `<div class="family-quiz"><div class="family-prompt"><span class="family-eyebrow">${plural ? "UNO O VARIOS" : "ESCUCHÁ Y ELEGÍ"}</span><h2 id="family-question" tabindex="-1">${plural ? "¿Cómo se dice en inglés?" : "¿Qué foto va con esta palabra?"}</h2>
    ${plural ? `${familyPhotos(exercise.people)}<p class="family-photo-names">${exercise.people.map((id) => FAMILY_PEOPLE[id].name).join(" + ")}</p><span class="family-count">${exercise.people.length === 1 ? "Una persona" : "Dos personas"}</span>` : `<strong class="family-target" lang="en">${item.en}</strong>${familyAudioButton(exercise.word)}<p class="family-hint">También podés leer la palabra.</p>`}
  </div><div class="family-answer-area"><div class="family-options ${plural ? "family-word-options" : ""}">${exercise.options.map((word) => {
    const option = FAMILY_WORDS[word];
    const status = state.checked ? word === exercise.word ? "is-correct" : word === state.choice ? "is-wrong" : "" : "";
    return `<button class="family-option ${state.choice === word ? "is-selected" : ""} ${status}" type="button" data-action="family-choice" data-word="${word}" aria-pressed="${state.choice === word}" ${state.checked ? "disabled" : ""}>${plural ? `<strong lang="en">${option.en}</strong>` : `${familyPhotos(exercise.portraits[word])}<span>${exercise.portraits[word].map((id) => FAMILY_PEOPLE[id].name).join(" + ")}</span>`}</button>`;
  }).join("")}</div><footer class="family-controls"><div class="family-feedback" role="status">${state.checked ? `<strong>${state.correct ? "¡Muy bien!" : "Lo aprendemos juntos."}</strong><span lang="en">${item.en}</span> = ${item.es.toLowerCase()}.${plural ? `<small>${item.plural ? "La s final indica más de uno." : "Sin s final: una sola persona."}</small>${familyAudioButton(exercise.word)}` : ""}` : "Elegí una opción y tocá Comprobar."}</div><button class="family-primary" type="button" data-action="${state.checked ? "family-next" : "family-check"}" data-round="${exercise.id}" ${!state.checked && !state.choice ? "disabled" : ""}>${state.checked ? session.index + 1 === session.exercises.length ? "Terminar" : "Siguiente →" : "Comprobar"}</button></footer></div></div>`;
}
function renderFamilyRunner(exercise) {
  const state = session.family[exercise.id];
  renderShell(`<section class="family-runner"><header class="family-header"><button class="family-back" type="button" data-action="cancel-run">${icon("arrow")}Inglés</button><div><span>MY FAMILY</span><h1>${exercise.mode === "tree" ? "El árbol de Ian" : session.themeTitle}</h1></div><b>${exercise.mode === "tree" ? "Mi familia" : `${session.index + 1} / ${session.exercises.length}`}</b></header>${exercise.mode === "tree" ? familyTree(state) : familyQuestion(exercise, state)}<p class="family-audio-error" role="status">${escapeHtml(familyAudioError)}</p></section>`);
  if (familyAudioTimer === null) familyAudioTimer = window.setInterval(refreshFamilyAudioButtons, 250);
}
function familyAction(action, target) {
  const current = familyCurrent();
  if (!current) return;
  const { exercise, state } = current;
  if (action === "family-audio") {
    const word = exercise.mode === "tree" ? FAMILY_PEOPLE[state.person]?.word || state.word : exercise.word;
    if (target.dataset.word === word) playFamilyAudio(word);
    return;
  }
  if (exercise.mode === "tree") {
    if (action === "family-person" && FAMILY_PEOPLE[target.dataset.person]?.word) {
      state.person = target.dataset.person;
      state.word = FAMILY_PEOPLE[state.person].word;
    } else if (action === "family-group" && ["sisters", "brothers"].includes(target.dataset.word)) {
      state.person = null;
      state.word = target.dataset.word;
    } else return;
    // Selecting a photo is always visual; the explicit speaker controls audio.
    familyAudioError = "";
    return render();
  }
  if (action === "family-next") {
    if (!state.checked || target.dataset.round !== exercise.id) return;
    stopFamilyAudio();
    session.index += 1;
  } else if (action === "family-check") {
    if (state.checked || !state.choice || target.dataset.round !== exercise.id) return;
    state.checked = true;
    state.correct = state.choice === exercise.word;
    if (state.correct) session.score += 1;
    session.answers.push({ prompt: FAMILY_WORDS[exercise.word].en, selected: state.choice, correct: exercise.word, isCorrect: state.correct });
  } else if (action === "family-choice") {
    if (state.checked || !exercise.options.includes(target.dataset.word)) return;
    state.choice = target.dataset.word;
  } else return;
  render();
}
function renderFamilyFinish() {
  stopFamilyAudio();
  renderShell(`<section class="family-runner family-finish">${familyPhotos(["ian"])}<span class="family-eyebrow">MY FAMILY</span><h2>¡Terminaste, Ian!</h2><p>Reconociste ${session.score} de ${session.exercises.length} palabras.</p><div class="family-review">${session.answers.map((answer) => `<span>${answer.isCorrect ? "✓" : "♡"} <b lang="en">${FAMILY_WORDS[answer.correct].en}</b> · ${FAMILY_WORDS[answer.correct].es}</span>`).join("")}</div><div class="family-finish-actions"><button type="button" class="family-primary" data-action="start" data-subject="ingles" data-theme="${session.themeId}" data-mode="activity">Practicar otra vez</button><button type="button" class="family-secondary" data-action="start" data-subject="ingles" data-theme="english-family-tree" data-mode="activity">Ver mi árbol</button><button type="button" class="family-back" data-action="cancel-run">Volver a Inglés</button></div></section>`);
}
