import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import WebSocket from 'ws';
const run=promisify(execFile), serial='R8MT100KBQD';
const adb=async(...args)=>(await run('C:/Users/pablo/AppData/Local/Android/Sdk/platform-tools/adb.exe',['-s',serial,...args],{windowsHide:true})).stdout.trim();
const delay=ms=>new Promise(r=>setTimeout(r,ms));
await adb('shell','input','keyevent','KEYCODE_WAKEUP');await delay(700);
const pid=(await adb('shell','pidof','com.ian.escuela')).split(/\s+/)[0];
await adb('forward','tcp:9227',`localabstract:webview_devtools_remote_${pid}`);
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page'&&p.url.startsWith('https://localhost')).webSocketDebuggerUrl);
await new Promise((r,j)=>{ws.once('open',r);ws.once('error',j)});
let id=0;const pending=new Map();
ws.on('message',b=>{const m=JSON.parse(b),p=pending.get(m.id);if(p){pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}});
const command=(method,params={})=>new Promise((resolve,reject)=>{const n=++id,timer=setTimeout(()=>{pending.delete(n);reject(Error('CDP timeout'));},15000);pending.set(n,{resolve,reject,timer});ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>{const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:false});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
const waitFor=async(expression,timeout=15000)=>{const end=Date.now()+timeout;while(Date.now()<end){if(await evaluate(expression))return;await delay(100);}throw Error('Timed out: '+expression);};
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const entries='Object.entries(localStorage).sort(([a],[b])=>a.localeCompare(b))';
const output=new URL('../tmp/story-breaks/',import.meta.url);await mkdir(output,{recursive:true});
let before,volume,isolated=false;
try{
 await waitFor('!document.hidden');
 assert.equal(await evaluate('Boolean(storyAudio||appSpeechAudio||storyFilm?.session)'),false,'Do not interrupt an existing listening session');
 before=await evaluate(entries);
 const baseline=JSON.parse(await readFile(new URL('../tmp/story-policy-device/R8MT100KBQD.json',import.meta.url),'utf8'));
 assert.equal(hash(before.filter(([k])=>!k.startsWith('ian-story-')&&k!=='ian-escuela-story-progress-v1')),baseline.otherChecksum);
 volume=(await evaluate('window.Capacitor.Plugins.StoryVolume.status()')).current;
 await evaluate(`(()=>{
  window.__breakAudit={originals:Object.fromEntries(['getItem','setItem','removeItem'].map(k=>[k,Object.getOwnPropertyDescriptor(Storage.prototype,k)])),shadow:new Map()};
  const audit=__breakAudit, own=k=>String(k).startsWith('ian-story-')||k==='ian-escuela-story-progress-v1';
  Storage.prototype.getItem=function(k){return own(k)?(audit.shadow.get(String(k))??null):audit.originals.getItem.value.call(this,k);};
  Storage.prototype.setItem=function(k,v){if(own(k))audit.shadow.set(String(k),String(v));else audit.originals.setItem.value.call(this,k,v);};
  Storage.prototype.removeItem=function(k){if(own(k))audit.shadow.delete(String(k));else audit.originals.removeItem.value.call(this,k);};
  clearTimeout(storyUsageTimer);storyUsageTimer=null;storyUsageRunning=false;storyUsageMemory=null;storyUsageSaved='';
  storyListeningMemory=null;storyAudioCooldownMemory={};storyFilmProgressMemory={};storyFilmLastMemory=null;
  storySupportState={id:STORY_BOOKS[0].id,scene:0,panel:'read'};setRoute({view:'support-story'});return true;
 })()`);isolated=true;
 const tap=async action=>{const p=await evaluate(`(()=>{const r=document.querySelector('[data-action="${action}"]').getBoundingClientRect();return{x:(r.x+r.width/2)*devicePixelRatio,y:(r.y+r.height/2)*devicePixelRatio}})()`);await adb('shell','input','tap',String(Math.round(p.x)),String(Math.round(p.y)));};
 const nearLimit=()=>evaluate('Object.assign(storyUsageState(),{usedMs:899000,lastAt:Date.now(),outsideAt:null});storyUsageRunning=true;storyUsageSync();true');
 const expireRest=async()=>{await evaluate('storyUsageState().breakUntil=Date.now()+1000;saveStoryUsage();storyUsageTick();true');await waitFor('storyBreakRemainingMs()===0 && !document.querySelector(".story-rest-timer")');};
 await tap('story-listen');await waitFor('storyAudio && storyAudio.currentTime>.1');
 await evaluate('window.__breakAudio=storyAudio;true');await nearLimit();
 await waitFor('storyBreakRemainingMs()>0 && document.querySelector(".story-rest-timer")');
 assert.equal(await evaluate('__breakAudio.paused && __breakAudio.muted && storyAudio===null'),true);
 assert.equal(await evaluate('storyListening().readings[STORY_BOOKS[0].id].heard.length'),0);
 const shot=await command('Page.captureScreenshot',{format:'png'});
 await writeFile(new URL('a8-rest.png',output),Buffer.from(shot.data,'base64'));
 await tap('supports');assert.equal(await evaluate('route.view'),'supports');
 await evaluate('setRoute({view:"support-stories"});true');
 assert.equal(await evaluate('!!document.querySelector(".story-rest-timer")'),true);
 await expireRest();
 await evaluate('storySupportState={id:STORY_BOOKS[0].id,scene:0,panel:"video"};setRoute({view:"support-story"});true');
 await tap('story-video-play');await waitFor('storyFilm?.playing && storyFilm.video.currentTime>.1');
 const cap=await evaluate('window.Capacitor.Plugins.StoryVolume.status()');assert.ok(cap.current<=Math.floor(cap.maximum*.6));
 await evaluate('window.__breakVideo=storyFilm.video;true');await nearLimit();
 await waitFor('storyBreakRemainingMs()>0 && storyFilm===null');
 assert.equal(await evaluate('__breakVideo.paused && __breakVideo.muted && !__breakVideo.hasAttribute("src")'),true);
 await expireRest();
 assert.equal(await evaluate('storyFilm.video.paused && !storyFilm.video.hasAttribute("src")'),true);
 await tap('story-video-play');await waitFor('storyFilm?.playing');
 await evaluate('storyFilm.video.currentTime=storyFilm.video.duration-.15;true');
 await waitFor('storyFilm.video.ended && storyFilm.session===null');
 const finished=await evaluate('JSON.parse(localStorage.getItem(STORY_VIDEO_LAST_KEY))');
 await evaluate('storySupportState={id:STORY_BOOKS[1].id,scene:0,panel:"video"};setRoute({view:"support-story"});true');
 assert.equal(await evaluate('document.querySelector("[data-action=story-video-play]").disabled'),true);
 await waitFor('document.querySelector(".story-film-status").textContent==="Espera: 119s"');
 await tap('story-video-play');assert.equal(await evaluate('storyFilm.video.paused && !storyFilm.video.hasAttribute("src")'),true);
 await evaluate('setRoute({view:"supports"});true');
 console.log('A8: descanso detiene voz y video; comprobando los dos minutos reales después de completar un video.');
 await waitFor(`storyFilmChangeRemainingMs(STORY_BOOKS[1].id)===0`,125000);
 assert.ok((await evaluate('Date.now()'))>=finished.at+120000);
 await evaluate('storySupportState={id:STORY_BOOKS[1].id,scene:0,panel:"video"};setRoute({view:"support-story"});true');
 assert.equal(await evaluate('!document.querySelector("[data-action=story-video-play]").disabled && storyFilm.video.paused'),true);
 await tap('story-video-play');await waitFor('storyFilm?.playing && storyFilm.video.currentTime>.1');
 await writeFile(new URL('a8-feature-results.json',output),JSON.stringify({voiceInterrupted:true,videoInterruptedAndReleased:true,
  restAllowsOtherSections:true,noAutoplayAfterRest:true,completedVideoWaitedReal120Seconds:true,
  realClockUnchanged:true,usageThresholdSeededInIsolatedStorage:true,volume60Preserved:true},null,2));
}finally{
 if(isolated){
  await evaluate(`(()=>{
   suspendStoryMedia();clearTimeout(storyUsageTimer);storyUsageTimer=null;
   __breakAudit.shadow=new Map(Object.entries(localStorage));
   storyUsageMemory=null;storyUsageRunning=false;storyUsageSaved='';storyListeningMemory=null;storyAudioCooldownMemory={};storyFilmProgressMemory={};storyFilmLastMemory=null;
   setRoute({view:'supports'});
   for(const[k,d]of Object.entries(__breakAudit.originals))Object.defineProperty(Storage.prototype,k,d);
   delete window.__breakAudit;delete window.__breakAudio;delete window.__breakVideo;return true;
  })()`);
 }
 if(volume!==undefined)await adb('shell','cmd','media_session','volume','--stream','3','--set',String(volume));
 if(before){const after=await evaluate(entries);assert.equal(hash(after),hash(before),'All real keys must stay unchanged');await writeFile(new URL('a8-storage-verified.json',output),JSON.stringify({allRealStoragePreserved:true,beforeChecksum:hash(before),afterChecksum:hash(after)},null,2));}
 ws.close();await new Promise(r=>ws.once('close',r));await adb('forward','--remove','tcp:9227');
}
console.log('A8 verificada: descansos, espera de dos minutos real y todos los datos originales conservados.');
