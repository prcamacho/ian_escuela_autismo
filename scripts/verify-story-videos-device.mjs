// Usa la A8 existente. No borra datos, escuchas ni esperas para ejecutar la prueba.
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import WebSocket from 'ws';
const execute=promisify(execFile);
const serial='R8MT100KBQD';
const adbPath='C:/Users/pablo/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const adb=async(...args)=>(await execute(adbPath,['-s',serial,...args],{windowsHide:true,maxBuffer:4*1024*1024})).stdout.trim();
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const directory=new URL('../tmp/story-videos/',import.meta.url);
await mkdir(directory,{recursive:true});
await adb('shell','input','keyevent','KEYCODE_WAKEUP');
const pid=(await adb('shell','pidof','com.ian.escuela')).split(/\s+/)[0];
assert.match(pid,/^\d+$/);
await adb('forward','tcp:9226',`localabstract:webview_devtools_remote_${pid}`);
const pages=await(await fetch('http://127.0.0.1:9226/json/list')).json();
const page=pages.find(p=>p.type==='page' && p.url.startsWith('https://localhost'));
assert.ok(page);
const socket=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.once('open',resolve);socket.once('error',reject);});
let nextId=0;
const pending=new Map();
socket.on('message',data=>{
  const result=JSON.parse(data);const call=pending.get(result.id);
  if(!call)return;pending.delete(result.id);clearTimeout(call.timeout);
  if(result.error)call.reject(Error(result.error.message));else call.resolve(result.result);
});
function command(method,params){return new Promise((resolve,reject)=>{
  const id=++nextId;const timeout=setTimeout(()=>{pending.delete(id);reject(Error('Timed out: '+method));},20000);
  pending.set(id,{resolve,reject,timeout});socket.send(JSON.stringify({id,method,params}));
});}
async function evaluate(expression){
  const result=await command('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:false,timeout:15000});
  if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);
  return result.result.value;
}
async function waitFor(expression,timeout=15000){
  const until=Date.now()+timeout;
  while(Date.now()<until){if(await evaluate(expression))return;await delay(100);}
  throw Error('Condition timed out: '+expression);
}
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const entriesExpression='Object.entries(localStorage).sort(([a],[b])=>a.localeCompare(b))';
let before,volumeBefore,wifiBefore;
const checks=[];
try{
  await waitFor('!document.hidden');
  assert.equal(await evaluate('Boolean(storyAudio || appSpeechAudio)'),false,'Do not interrupt a narration');
  before=await evaluate(`({entries:${entriesExpression},support:storySupportState,route,progress:localStorage.getItem(STORY_PROGRESS_KEY)})`);
  const old=JSON.parse(await readFile(new URL('../tmp/story-policy-device/R8MT100KBQD.json',import.meta.url),'utf8'));
  const beforeOther=before.entries.filter(([key])=>!key.startsWith('ian-story-') && key!=='ian-escuela-story-progress-v1');
  assert.equal(hash(beforeOther),old.otherChecksum,'The APK update must preserve the existing school data');
  const initial=await evaluate('window.Capacitor.Plugins.StoryVolume.status()');
  volumeBefore=initial.current;
  wifiBefore=await adb('shell','settings','get','global','wifi_on');
  if(wifiBefore==='1')await adb('shell','svc','wifi','disable');
  assert.equal(await adb('shell','settings','get','global','wifi_on'),'0','Playback is tested with Wi-Fi off');
  const ceiling=Math.floor(initial.maximum*.6);
  const ids=await evaluate('STORY_BOOKS.map(b=>b.id)');
  const open=async id=>evaluate(`storySupportState={id:${JSON.stringify(id)},scene:storySavedProgress()[${JSON.stringify(id)}]||0,panel:'video'};setRoute({view:'support-story'});true`);
  const click=async action=>{
    const p=await evaluate(`(()=>{const r=document.querySelector('[data-action="${action}"]').getBoundingClientRect();return{x:(r.x+r.width/2)*devicePixelRatio,y:(r.y+r.height/2)*devicePixelRatio}})()`);
    await adb('shell','input','tap',String(Math.round(p.x)),String(Math.round(p.y)));
  };
  for(let i=0;i<35;i++){
    await open(ids[i%ids.length]);
    assert.equal(await evaluate("document.querySelector('.story-film').hasAttribute('src')"),false);
    await evaluate("window.__verifiedOldFilm=document.querySelector('.story-film');storySupportState.panel='read';render();true");
    assert.equal(await evaluate("__verifiedOldFilm.paused && !__verifiedOldFilm.hasAttribute('src')"),true);
  }
  for(let i=0;i<ids.length;i++){
    await open(ids[i]);
    assert.equal(await evaluate("document.querySelector('.story-film').paused && storyFilm.session===null"),true);
    if(i===0)await adb('shell','cmd','media_session','volume','--stream','3','--set',String(initial.maximum));
    await click('story-video-play');
    await waitFor("storyFilm?.playing && !storyFilm.video.paused && !storyFilm.video.error && storyFilm.video.currentTime>.15");
    const status=await evaluate('window.Capacitor.Plugins.StoryVolume.status()');
    assert.equal(status.active,true);assert.equal(status.ceiling,ceiling);assert.ok(status.current<=ceiling);
    assert.equal(await evaluate("document.querySelector('.story-film').controls"),false);
    if(i===0){
      await adb('shell','input','keyevent',...Array(15).fill('24'));
      const capped=await evaluate('window.Capacitor.Plugins.StoryVolume.status()');assert.ok(capped.current<=ceiling);
      await adb('shell','input','keyevent','25');
      const lower=await evaluate('window.Capacitor.Plugins.StoryVolume.status()');assert.ok(lower.current<capped.current);
      await adb('shell','input','keyevent',...Array(15).fill('24'));
      assert.ok((await evaluate('window.Capacitor.Plugins.StoryVolume.status()')).current<=ceiling);
    }
    await click('story-video-pause');
    await waitFor('window.Capacitor.Plugins.StoryVolume.status().then(v=>!v.active)');
    const pausedTime=await evaluate("document.querySelector('.story-film').currentTime");await delay(200);
    assert.equal(await evaluate("document.querySelector('.story-film').currentTime"),pausedTime);
    await click('story-video-play');
    await waitFor(`document.querySelector('.story-film').currentTime>${pausedTime+.1}`);
    await evaluate("window.__verifiedOldFilm=document.querySelector('.story-film')");
    await click('story-library');
    assert.equal(await evaluate("__verifiedOldFilm.paused && !__verifiedOldFilm.hasAttribute('src') && storyFilm===null"),true);
    await waitFor('window.Capacitor.Plugins.StoryVolume.status().then(v=>!v.active)');
    checks.push({id:ids[i],ceiling,status,pauseResume:true,stopOnLeave:true});
  }
  // Salir de la pestaña dentro del mismo cuento también detiene y reinicia.
  await open(ids[0]);await click('story-video-play');
  await waitFor("storyFilm && !storyFilm.video.paused && storyFilm.video.currentTime>.15");
  await evaluate("window.__verifiedOldFilm=document.querySelector('.story-film')");
  await evaluate("storySupportState.panel='read';render();true");
  assert.equal(await evaluate("__verifiedOldFilm.paused && !__verifiedOldFilm.hasAttribute('src') && storyFilm===null"),true);
  await open(ids[0]);await click('story-video-play');
  await waitFor("storyFilm && !storyFilm.video.paused && storyFilm.video.currentTime>.15");
  await adb('shell','input','keyevent','KEYCODE_SLEEP');
  await waitFor('storyFilm===null');
  await waitFor('window.Capacitor.Plugins.StoryVolume.status().then(v=>!v.active)');
  await adb('shell','input','keyevent','KEYCODE_WAKEUP');
  await waitFor('!document.hidden');
  assert.equal(await evaluate("document.querySelector('.story-film').paused"),true);
  const savedTime=await evaluate(`storyFilmSavedPoint(${JSON.stringify(ids[0])}).time`);
  await click('story-video-play');
  await waitFor(`storyFilm && !storyFilm.video.paused && storyFilm.video.currentTime>${savedTime}`);
  await click('story-video-pause');
  // Probar la frontera de inactividad con un punto preparado, sin esperar ni alterar el reloj de Android.
  await evaluate(`stopStoryFilm();storyFilmProgressMemory={};localStorage.setItem(STORY_VIDEO_PROGRESS_PREFIX+${JSON.stringify(ids[0])},JSON.stringify({time:60,at:Date.now()-300000}));render();true`);
  await click('story-video-play');
  await waitFor('storyFilm && !storyFilm.video.paused && storyFilm.video.currentTime>.15');
  assert.ok(await evaluate('storyFilm.video.currentTime')<3);
  await click('story-video-pause');
  await evaluate('stopStoryFilm();true');
  // Los puntos creados por la prueba no sustituyen a los del niño.
  await evaluate(`for(const key of Object.keys(localStorage))if(key.startsWith(STORY_VIDEO_PROGRESS_PREFIX))localStorage.removeItem(key);storyFilmProgressMemory={};true`);
  for(const [key,value] of before.entries.filter(([key])=>key.startsWith('ian-story-video-progress-v1:'))){
    await evaluate(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(value)});true`);
  }
  // Restaurar solo el marcador de lectura si el recorrido visual normalizó claves vencidas.
  const after=await evaluate(entriesExpression);
  const mapBefore=new Map(before.entries),mapAfter=new Map(after);
  const changed=[...new Set([...mapBefore.keys(),...mapAfter.keys()])].filter(k=>mapBefore.get(k)!==mapAfter.get(k));
  assert.ok(changed.every(k=>k.startsWith('ian-story-audio-next-at-') && Number(mapBefore.get(k))<=Date.now() && !mapAfter.has(k)),JSON.stringify(changed));
  for(const key of changed)await evaluate(`localStorage.setItem(${JSON.stringify(key)},${JSON.stringify(mapBefore.get(key))});true`);
  assert.equal(hash(await evaluate(entriesExpression)),hash(before.entries));
  await open(ids[0]);
  await waitFor("document.querySelector('.story-film').paused");
  const shot=await command('Page.captureScreenshot',{format:'png'});
  await writeFile(new URL('a8-video.png',directory),Buffer.from(shot.data,'base64'));
  await writeFile(new URL('a8-verified.json',directory),JSON.stringify({videos:checks,tabExit:true,stopsOnScreenOff:true,noAutoplayOnWake:true,resumesBeforeFiveMinutes:true,restartsAfterFiveMinutes:true,realVolumeCeiling:ceiling,maximum:initial.maximum,
    rapidTabChangesWithoutDecoders:35,realScreenTaps:true,wifiDisabledDuringPlayback:true,detachedPlayersUnloaded:true,
    physicalVolumeButtonsCapped:true,allStoragePreserved:true,beforeChecksum:hash(before.entries),afterChecksum:hash(await evaluate(entriesExpression))},null,2));
  console.log('A8 verificada: siete videos reales, botones físicos limitados al 60 %, pausa/reanudación, salida sin audio y datos conservados.');
}finally{
  try{await evaluate("if(typeof stopStoryFilm==='function')stopStoryFilm();delete window.__verifiedOldFilm;true");}catch{}
  if(before){
    const points=before.entries.filter(([key])=>key.startsWith('ian-story-video-progress-v1:'));
    try{await evaluate(`for(const key of Object.keys(localStorage))if(key.startsWith(STORY_VIDEO_PROGRESS_PREFIX))localStorage.removeItem(key);for(const [key,value]of ${JSON.stringify(points)})localStorage.setItem(key,value);storyFilmProgressMemory={};true`);}catch{}
  }
  if(volumeBefore!==undefined)await adb('shell','cmd','media_session','volume','--stream','3','--set',String(volumeBefore));
  if(wifiBefore==='1')await adb('shell','svc','wifi','enable');
  socket.close();
  await new Promise(resolve=>socket.once('close',resolve));
  await adb('forward','--remove','tcp:9226');
}
