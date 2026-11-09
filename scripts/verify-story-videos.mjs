import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require("C:/Users/pablo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const httpServer = require("http-server");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "tmp/story-videos");
await mkdir(output, { recursive: true });
const server = httpServer.createServer({ root: path.join(root, "app"), cache: -1 });
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.server.address().port}`;
const browser = await chromium.launch({ channel: "msedge", headless: true, args: ["--mute-audio"] });
const errors = [];
const verified = [];
async function openVideo(page, id) {
  // Continuous-use breaks have their own integration suite. These cases
  // isolate video playback, saved points and the shorter switching waits.
  await page.evaluate(() => { storyUsageSync=()=>{};setRoute({ view: "support-stories" }); });
  await page.locator(`[data-action="story-open"][data-value="${id}"]`).click();
  await page.locator('[data-action="story-panel"][data-value="video"]').click();
}
async function play(page) {
  await page.locator('[data-action="story-video-play"]').click();
  await page.waitForFunction(() => {
    const v = document.querySelector(".story-film");
    return v && !v.paused && v.currentTime > .15 && storyFilm?.playing && !v.error;
  });
}
async function finishVideo(page, expireWait = true) {
  await page.locator('.story-film').evaluate(v=>v.currentTime=v.duration-.15);
  await page.waitForFunction(()=>document.querySelector('.story-film').ended && storyFilm.session===null);
  if(expireWait)await page.evaluate(()=>{
    const saved=JSON.parse(localStorage.getItem(STORY_VIDEO_LAST_KEY));
    saved.at-=120000;localStorage.setItem(STORY_VIDEO_LAST_KEY,JSON.stringify(saved));storyFilmLastMemory=null;
  });
}
try {
  const context = await browser.newContext({ viewport: { width: 1098, height: 686 }, hasTouch: true, serviceWorkers: "block" });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(base);
  const books = await page.evaluate(() => STORY_BOOKS.map(b => ({ id: b.id, video: b.video })));
  assert.equal(books.length, 7);
  await page.evaluate(() => localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(Object.fromEntries(STORY_BOOKS.map(b => [b.id, 3])))));
  const before = await page.evaluate(() => ({ data: JSON.stringify(data), progress: localStorage.getItem(STORY_PROGRESS_KEY), listening: localStorage.getItem(STORY_LISTENING_KEY) }));
  for (const book of books) {
    await openVideo(page, book.id);
    assert.equal(await page.locator('.story-film').evaluate(v=>v.hasAttribute('src')),false,'Opening a tab never starts a decoder');
    assert.equal(await page.locator('.story-film-controls button').count(), 2);
    const attrs = await page.locator('.story-film').evaluate(v => ({ controls: v.controls, nativeControls: v.hasAttribute('controls'), pip: v.disablePictureInPicture,
      remote: v.disableRemotePlayback, inline: v.playsInline, paused: v.paused, time: v.currentTime, volume: v.volume }));
    assert.deepEqual(attrs, { controls: false, nativeControls: false, pip: true, remote: true, inline: true, paused: true, time: 0, volume: .6 });
    assert.equal(await page.locator('.story-film-panel input,.story-film-panel [type=range]').count(), 0);
    await play(page);
    assert.equal(await page.locator('.story-film').evaluate(v=>v.muted),false);
    const metadata = await page.locator('.story-film').evaluate(v => ({ duration: v.duration, width: v.videoWidth, height: v.videoHeight }));
    assert.ok(metadata.duration > 200 && metadata.width === 640 && metadata.height === 360);
    await page.locator('.story-film').evaluate(v => { v.volume = 1; });
    await page.waitForFunction(() => document.querySelector('.story-film').volume === .6);
    await page.locator('[data-action="story-video-pause"]').click();
    const paused = await page.locator('.story-film').evaluate(v => ({ paused: v.paused, time: v.currentTime }));
    assert.equal(paused.paused, true);
    assert.equal(await page.locator('.story-film').evaluate(v=>v.muted),true,'Pause silences the audio tail');
    await page.waitForTimeout(200);
    assert.equal(await page.locator('.story-film').evaluate(v => v.currentTime), paused.time);
    await page.locator('[data-action="story-video-play"]').click();
    await page.waitForFunction(t => document.querySelector('.story-film').currentTime > t + .1, paused.time);
    await page.evaluate(() => window.__oldFilm = document.querySelector('.story-film'));
    await page.locator('[data-action="story-panel"][data-value="read"]').click();
    assert.deepEqual(await page.evaluate(() => ({ paused: __oldFilm.paused, released: !__oldFilm.hasAttribute('src'), detached: storyFilm === null,
      scene: storySupportState.scene, audio: storyAudio === null })), { paused: true, released: true, detached: true, scene: 3, audio: true });
    const savedTime = await page.evaluate(id => JSON.parse(localStorage.getItem(STORY_VIDEO_PROGRESS_PREFIX+id)).time,book.id);
    await page.locator('[data-action="story-panel"][data-value="video"]').click();
    assert.equal(await page.locator('.story-film').evaluate(v => v.paused), true);
    await play(page);
    assert.ok(await page.locator('.story-film').evaluate(v=>v.currentTime)>=savedTime,'Leaving the tab preserves this book position');
    await page.locator('[data-action="story-video-pause"]').click();
    verified.push({ ...book, ...metadata, pauseResume: true, stopOnLeave: true, volume: .6 });
    await play(page);await finishVideo(page);
  }
  const after = await page.evaluate(() => ({ data: JSON.stringify(data), progress: localStorage.getItem(STORY_PROGRESS_KEY), listening: localStorage.getItem(STORY_LISTENING_KEY) }));
  assert.deepEqual(after, before, "Videos never change the school data, reading progress or narration cooldowns");
  for (const size of [{ width:1098,height:686 }, { width:1024,height:600 }, { width:390,height:844 }]) {
    await page.setViewportSize(size);
    const rect = await page.locator('.story-film-frame').boundingBox();
    assert.ok(rect.width <= 641 && rect.x > 10 && rect.y > 10 && rect.y + rect.height < size.height);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: path.join(output, `video-${size.width}.png`) });
  }
  await page.setViewportSize({ width:1098,height:686 });
  const frame = await page.locator('.story-film-frame').boundingBox();
  await page.mouse.dblclick(frame.x+frame.width/2,frame.y+frame.height/2);
  assert.equal(await page.evaluate(()=>document.fullscreenElement===null && document.querySelector('.story-film').paused),true);
  await play(page);
  await page.evaluate(() => {
    window.__oldFilm = document.querySelector('.story-film');
    Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});
    document.dispatchEvent(new Event('visibilitychange'));
  });
  assert.equal(await page.evaluate(() => __oldFilm.paused && !__oldFilm.hasAttribute('src') && storyFilm === null), true);
  await page.evaluate(() => {
    Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});
    document.dispatchEvent(new Event('visibilitychange'));
  });
  assert.equal(await page.locator('.story-film').evaluate(v => v.paused), true);
  await play(page);
  await page.evaluate(() => { window.__oldFilm = document.querySelector('.story-film'); window.dispatchEvent(new Event('pagehide')); });
  assert.equal(await page.evaluate(() => __oldFilm.paused && !__oldFilm.hasAttribute('src') && storyFilm === null), true);
  // Límite exacto: se reanuda a 4:59.999; a 5:00.000 se empieza de nuevo.
  await page.evaluate(()=>{
    window.__realDateNow=Date.now;
    window.__videoNow=Date.now();
    Date.now=()=>window.__videoNow;
  });
  const unfinishedId=books.at(-1).id;
  await openVideo(page,unfinishedId);await play(page);
  await page.locator('[data-action="story-video-pause"]').click();
  const lastPlayback=await page.evaluate(()=>localStorage.getItem(STORY_VIDEO_LAST_KEY));
  for(const book of books.slice(0,-1)){
    await openVideo(page,book.id);
    assert.equal(await page.locator('[data-action="story-video-play"]').isDisabled(),true);
    assert.equal(await page.locator('.story-film-status').textContent(),'Espera: 60s');
    await page.evaluate(()=>playStoryFilm());
    assert.equal(await page.locator('.story-film').evaluate(v=>v.paused && !v.hasAttribute('src')),true,'Even direct play cannot bypass the wait');
  }
  await page.evaluate(()=>{window.__videoNow+=1000;storyFilmControls();});
  assert.equal(await page.locator('.story-film-status').textContent(),'Espera: 59s');
  await page.locator('[data-action="story-panel"][data-value="read"]').click();
  await page.locator('[data-action="story-panel"][data-value="video"]').click();
  assert.equal(await page.evaluate(()=>localStorage.getItem(STORY_VIDEO_LAST_KEY)),lastPlayback,'Browsing a paused video never restarts the minute');
  for(const size of [{width:1098,height:686},{width:1024,height:600},{width:390,height:844}]){
    await page.setViewportSize(size);
    const badge=await page.locator('.story-film-status').boundingBox();
    assert.ok(badge.x>=0 && badge.y>=0 && badge.y+badge.height<=size.height);
    await page.screenshot({path:path.join(output,`wait-${size.width}.png`)});
  }
  await page.setViewportSize({width:1098,height:686});
  await openVideo(page,unfinishedId);
  assert.equal(await page.locator('[data-action="story-video-play"]').isDisabled(),false,'The same video can resume immediately');
  // Reload the blocked target; the last-played record is persistent.
  await openVideo(page,books[0].id);await page.reload();await openVideo(page,books[0].id);
  assert.equal(await page.evaluate(()=>localStorage.getItem(STORY_VIDEO_LAST_KEY)),lastPlayback);
  assert.equal(await page.locator('[data-action="story-video-play"]').isDisabled(),true);
  await page.evaluate(()=>{
    window.__realDateNow=Date.now;
    window.__videoNow=JSON.parse(localStorage.getItem(STORY_VIDEO_LAST_KEY)).at+59999;
    Date.now=()=>window.__videoNow;storyFilmControls();
  });
  assert.equal(await page.locator('.story-film-status').textContent(),'Espera: 1s');
  assert.equal(await page.locator('[data-action="story-video-play"]').isDisabled(),true);
  await page.evaluate(()=>window.__videoNow++);
  await page.waitForFunction(()=>!document.querySelector('[data-action="story-video-play"]').disabled);
  assert.equal(await page.locator('.story-film').evaluate(v=>v.paused),true,'Expiry enables manual play without autoplay');
  assert.equal(await page.locator('.story-film-status').textContent(),'');
  await play(page);await finishVideo(page,false);
  await openVideo(page,books[1].id);
  assert.equal(await page.locator('[data-action="story-video-play"]').isDisabled(),true,'Finishing a video requires two minutes before another');
  assert.equal(await page.locator('.story-film-status').textContent(),'Espera: 120s');
  await page.evaluate(()=>{window.__videoNow+=119999;storyFilmControls();});
  assert.equal(await page.locator('[data-action="story-video-play"]').isDisabled(),true);
  await page.evaluate(()=>window.__videoNow++);
  await page.waitForFunction(()=>!document.querySelector('[data-action="story-video-play"]').disabled);
  await play(page);await page.locator('[data-action="story-video-pause"]').click();
  await page.evaluate(()=>window.__videoNow+=60000);
  const seedPoint = async age => page.evaluate(({id,age})=>{
    stopStoryFilm();
    storyFilmProgressMemory={};
    localStorage.setItem(STORY_VIDEO_PROGRESS_PREFIX+id,JSON.stringify({time:60,at:Date.now()-age}));
    storySupportState={id,scene:3,panel:'video'};
    setRoute({view:'support-story'});
  },{id:books[0].id,age});
  await seedPoint(299999);await play(page);
  assert.ok(await page.locator('.story-film').evaluate(v=>v.currentTime)>=60);
  await page.locator('[data-action="story-video-pause"]').click();
  const pausedAt=await page.evaluate(id=>JSON.parse(localStorage.getItem(STORY_VIDEO_PROGRESS_PREFIX+id)).at,books[0].id);
  await page.evaluate(()=>window.__videoNow+=240000);
  await page.locator('[data-action="story-panel"][data-value="read"]').click();
  assert.equal(await page.evaluate(id=>JSON.parse(localStorage.getItem(STORY_VIDEO_PROGRESS_PREFIX+id)).at,books[0].id),pausedAt,'Leaving an already paused video never extends the idle period');
  await page.evaluate(()=>window.__videoNow+=60000);
  await page.locator('[data-action="story-panel"][data-value="video"]').click();
  await play(page);
  assert.ok(await page.locator('.story-film').evaluate(v=>v.currentTime)<3);
  await seedPoint(300000);await play(page);
  assert.ok(await page.locator('.story-film').evaluate(v=>v.currentTime)<3);
  await page.evaluate(()=>{stopStoryFilm();Date.now=window.__realDateNow;});
  await seedPoint(0);await play(page);
  await page.locator('[data-action="story-video-pause"]').click();
  const reloadTime=await page.evaluate(id=>JSON.parse(localStorage.getItem(STORY_VIDEO_PROGRESS_PREFIX+id)).time,books[0].id);
  await page.reload();
  await openVideo(page,books[0].id);await play(page);
  assert.ok(await page.locator('.story-film').evaluate(v=>v.currentTime)>=reloadTime,'The point survives a full reload');
  await page.locator('.story-film').evaluate(v=>v.currentTime=v.duration-.15);
  await page.waitForFunction(()=>document.querySelector('.story-film').ended && storyFilm.session===null);
  assert.equal(await page.evaluate(id=>localStorage.getItem(STORY_VIDEO_PROGRESS_PREFIX+id),books[0].id),null,'A completed video is no longer unfinished');
  for(let n=0;n<35;n++){
    await openVideo(page,books[n%books.length].id);
    assert.equal(await page.locator('.story-film').evaluate(v=>v.hasAttribute('src')),false);
    await page.evaluate(()=>window.__oldFilm=document.querySelector('.story-film'));
    await page.locator('[data-action="story-panel"][data-value="read"]').click();
    assert.equal(await page.evaluate(()=>!__oldFilm.hasAttribute('src') && __oldFilm.paused),true);
  }
  await context.close();

  // El puente nativo se prueba con comienzo diferido, salida temprana y error.
  const native = await browser.newContext({ viewport: {width:1098,height:686}, serviceWorkers:'block' });
  await native.addInitScript(() => {
    window.__volumeCalls=[]; window.__begins=[]; window.__beginMode='pending'; window.__pauseStates=[];
    window.Capacitor={isNativePlatform:()=>true,Plugins:{StoryVolume:{
      begin(args) {
        __volumeCalls.push(['begin',args]);
        if (__beginMode==='pending') return new Promise(resolve=>__begins.push(resolve));
        return Promise.resolve({active:true,maximum:15,current:9,ceiling:__beginMode==='unsafe'?10:9,restoreOnEnd:__beginMode==='old-restore'?true:false});
      },
      end(args) {__volumeCalls.push(['end',args]);return Promise.resolve();},
      refresh(args) {__volumeCalls.push(['refresh',args]);return __beginMode==='fail-refresh'?Promise.reject(Error('Lease lost')):Promise.resolve({active:true,maximum:15,current:9,ceiling:9});}
    }}};
  });
  const np = await native.newPage();
  np.on('pageerror', error=>errors.push(error.message));
  await np.goto(base);
  await openVideo(np,books[0].id);
  await np.locator('[data-action="story-video-play"]').click();
  assert.equal(await np.locator('.story-film').evaluate(v=>v.paused),true);
  await np.locator('[data-action="story-video-pause"]').click();
  await np.evaluate(()=>__begins.shift()({active:true,maximum:15,current:9,ceiling:9,restoreOnEnd:false}));
  await np.waitForTimeout(100);
  assert.equal(await np.locator('.story-film').evaluate(v=>v.paused && v.currentTime===0),true);
  await np.locator('[data-action="story-video-play"]').click();
  await np.evaluate(()=>window.__oldFilm=document.querySelector('.story-film'));
  await np.locator('[data-action="story-panel"][data-value="read"]').click();
  await np.evaluate(()=>__begins.shift()({active:true,maximum:15,current:9,ceiling:9,restoreOnEnd:false}));
  assert.equal(await np.evaluate(()=>__oldFilm.paused && __oldFilm.currentTime===0 && storyFilm===null),true);
  await np.locator('[data-action="story-panel"][data-value="video"]').click();
  await np.evaluate(()=>__beginMode='unsafe');
  await np.locator('[data-action="story-video-play"]').click();
  await np.waitForFunction(()=>storyFilm.session===null);
  assert.equal(await np.locator('.story-film').evaluate(v=>v.paused),true,'An old 70% bridge cannot start a 60% video');
  await np.evaluate(()=>__beginMode='old-restore');
  await np.locator('[data-action="story-video-play"]').click();
  await np.waitForFunction(()=>storyFilm.session===null);
  assert.equal(await np.locator('.story-film').evaluate(v=>v.paused && v.muted),true,'A bridge that restores volume on pause cannot start a video');
  await np.evaluate(()=>__beginMode='ok');
  await play(np);
  assert.equal(await np.locator('.story-film').evaluate(v=>v.volume),1,'Native Android caps the real media stream');
  await np.evaluate(()=>{
    const v=storyFilm.video;
    const pause=v.pause.bind(v);
    v.pause=()=>{__pauseStates.push({muted:v.muted});return pause();};
  });
  for(let i=0;i<3;i++){
    await np.locator('[data-action="story-video-pause"]').click();
    assert.equal(await np.locator('.story-film').evaluate(v=>v.paused && v.muted),true);
    await play(np);
    assert.equal(await np.locator('.story-film').evaluate(v=>v.muted),false);
  }
  await np.evaluate(()=>{__beginMode='fail-refresh';storyFilm.lastHeartbeat=0;storyFilm.video.ontimeupdate();});
  await np.waitForFunction(()=>storyFilm.session===null && document.querySelector('.story-film').paused);
  await np.evaluate(()=>{
    __beginMode='ok';
    window.__realVideoPlay=storyFilm.video.play.bind(storyFilm.video);
    storyFilm.video.play=()=>new Promise(()=>{});
  });
  await np.locator('[data-action="story-video-play"]').click();
  await np.waitForFunction(()=>storyFilm.session===null && !document.querySelector('[data-action="story-video-play"]').disabled,{},{timeout:16000});
  assert.doesNotMatch(await np.locator('.story-film-status').textContent(),/Preparando/);
  await np.evaluate(()=>storyFilm.video.play=window.__realVideoPlay);
  await play(np);
  const nativeCalls=await np.evaluate(()=>__volumeCalls);
  assert.ok(nativeCalls.filter(([type])=>type==='begin').every(([,args])=>args.maxPercent===60 && args.restoreOnEnd===false));
  assert.ok((await np.evaluate(()=>__pauseStates)).every(state=>state.muted),'Every native pause is muted before calling pause()');
  assert.equal(errors.length,0,JSON.stringify(errors));
  await native.close();
  const offline = await browser.newContext({viewport:{width:1098,height:686}});
  const op = await offline.newPage();
  op.on('pageerror', error=>errors.push(error.message));
  await op.goto(base);
  await op.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
  await offline.setOffline(true);
  for (const book of books) {
    await openVideo(op,book.id);
    await play(op);
    assert.equal(await op.locator('.story-film').evaluate(v=>Number.isFinite(v.duration) && v.currentTime>0),true);
    await finishVideo(op);
  }
  await offline.close();
  assert.equal(errors.length,0,JSON.stringify(errors));
  await writeFile(path.join(output,'browser-verified.json'),JSON.stringify({verified,nativeRaces:true,unsafeBridgeRejected:true,restoringBridgeRejected:true,
    mutesBeforePause:true,unmutesAfterVolumeCap:true,pauseResumeVolumeRegression:true,
    stopsOnHidden:true,stopsOnPageHide:true,schoolAndReadingDataPreserved:true,offlineVideos:7,resumeAcrossTabsAndReload:true,
    resumesAt299999ms:true,restartsAt300000ms:true,pausedBrowsingDoesNotExtendWait:true,completedVideoClearsPoint:true,
    rapidTabsWithoutLoading:35,detachedPlayersUnloaded:true,stalledStartTimesOutAndRetries:true,
    otherSixVideosBlockedForOneMinute:true,countdown59sVisible:true,sameVideoImmediatelyAvailable:true,
    changeWaitSurvivesReload:true,pausedBrowsingDoesNotExtendChangeWait:true,blockedAt59999ms:true,enabledAt60000msWithoutAutoplay:true,
    completionRequiresTwoMinutes:true,errors},null,2));
  console.log('Videos verificados: 7 MP4 reales y offline, 60 %, salida y segundo plano, reanudación persistente, reinicio exacto a cinco minutos, carreras Android y datos conservados.');
} finally {
  await browser.close();
  server.close();
}
