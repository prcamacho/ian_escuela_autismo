import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/pablo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const server=require('http-server').createServer({root:fileURLToPath(new URL('../app/',import.meta.url)),cache:-1});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--mute-audio']});
const output=new URL('../tmp/story-breaks/',import.meta.url);await mkdir(output,{recursive:true});
const errors=[];
try{
 const context=await browser.newContext({viewport:{width:1098,height:686},serviceWorkers:'block'});
 await context.addInitScript(()=>{
   window.__usageNow=Number(sessionStorage.getItem('__usageNow'))||Date.now();
   Date.now=()=>window.__usageNow;
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.server.address().port}`);
 const jump=async ms=>page.evaluate(ms=>{__usageNow+=ms;sessionStorage.setItem('__usageNow',String(__usageNow));storyUsageTick();},ms);
 const nearLimit=async()=>page.evaluate(()=>{Object.assign(storyUsageState(),{usedMs:899999,lastAt:Date.now(),outsideAt:null});storyUsageRunning=true;saveStoryUsage();});
 await page.evaluate(()=>{storySupportState={id:STORY_BOOKS[0].id,scene:0,panel:'read'};setRoute({view:'support-story'});});
 const school=await page.evaluate(()=>JSON.stringify(data));
 await page.locator('[data-action="story-listen"]').click();
 await page.waitForFunction(()=>storyAudio && storyAudio.currentTime>.1);
 await page.evaluate(()=>window.__breakAudio=storyAudio);
 await nearLimit();await jump(1);
 assert.equal(await page.locator('#story-rest-title').textContent(),'Descanso');
 assert.equal(await page.locator('.story-rest-timer').textContent(),'15:00');
 assert.equal(await page.evaluate(()=>__breakAudio.paused && __breakAudio.muted && storyAudio===null),true);
 assert.equal(await page.evaluate(()=>storyListening().readings[STORY_BOOKS[0].id].heard.length),0);
 assert.equal(await page.evaluate(()=>storyAudioRemainingMs()),300000);
 await page.evaluate(()=>{storyPlayAudio();playStoryFilm();});
 assert.equal(await page.evaluate(()=>storyAudio===null && storyFilm===null),true);
 for(const size of [{width:1098,height:686},{width:1024,height:600},{width:390,height:844}]){
   await page.setViewportSize(size);
   const r=await page.locator('.story-rest-card').boundingBox();
   assert.ok(r.x>=0 && r.x+r.width<=size.width && r.y>=0 && r.y+r.height<=size.height);
   await page.screenshot({path:fileURLToPath(new URL(`rest-${size.width}.png`,output))});
 }
 await page.setViewportSize({width:1098,height:686});
 await page.locator('[data-action="supports"]').click();
 assert.equal(await page.evaluate(()=>route.view),'supports');
 await jump(300000);
 await page.locator('[data-action="story-library"]').click();
 assert.equal(await page.locator('.story-rest-timer').textContent(),'10:00','Five minutes outside cannot bypass an active rest');
 await page.reload();await page.evaluate(()=>setRoute({view:'support-stories'}));
 assert.equal(await page.locator('.story-rest-timer').textContent(),'10:00');
 await jump(599999);assert.equal(await page.locator('.story-rest-timer').textContent(),'0:01');
 await jump(1);assert.equal(await page.locator('#story-rest-title').count(),0);
 assert.equal(await page.evaluate(()=>storyAudio===null && storyFilm===null),true);
 await page.evaluate(()=>{storySupportState={id:STORY_BOOKS[0].id,scene:0,panel:'video'};setRoute({view:'support-story'});});
 await page.locator('[data-action="story-video-play"]').click();
 await page.waitForFunction(()=>storyFilm?.playing && storyFilm.video.currentTime>.1);
 await page.evaluate(()=>window.__breakVideo=storyFilm.video);
 await nearLimit();await jump(1);
 assert.equal(await page.evaluate(()=>storyFilm===null && __breakVideo.paused && __breakVideo.muted && !__breakVideo.hasAttribute('src')),true);
 assert.equal(await page.locator('.story-rest-timer').textContent(),'15:00');
 await jump(900000);
 assert.equal(await page.evaluate(()=>storyFilm.video.paused && !storyFilm.video.hasAttribute('src')),true,'Rest expiry never autoplays');
 await page.evaluate(()=>{Object.assign(storyUsageState(),{usedMs:600000,lastAt:Date.now()});storyUsageRunning=true;setRoute({view:'supports'});});
 await jump(299999);await page.evaluate(()=>setRoute({view:'support-stories'}));
 assert.equal(await page.evaluate(()=>storyUsageState().usedMs),600000);
 await page.evaluate(()=>setRoute({view:'supports'}));await jump(300000);
 await page.evaluate(()=>setRoute({view:'support-stories'}));
 assert.equal(await page.evaluate(()=>storyUsageState().usedMs),0);
 assert.equal(await page.evaluate(()=>JSON.stringify(data)),school);
 assert.deepEqual(errors,[]);
 await writeFile(new URL('browser-verified.json',output),JSON.stringify({voiceInterrupted:true,videoInterruptedAndReleased:true,
  noAutoplayAfterRest:true,otherSectionsAvailable:true,restSurvivesReload:true,fiveMinutesOutsideDoesNotCancelRest:true,
  outside299999msPreservesUsage:true,outside300000msResetsUsage:true,restExpiresAt900000ms:true,schoolDataPreserved:true,errors},null,2));
 console.log('Descansos verificados: voz y video, 15 minutos, recarga, otras secciones y frontera exacta de cinco minutos fuera.');
 await context.close();
}finally{await browser.close();server.close();}
