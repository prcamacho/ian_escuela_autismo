import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import WebSocket from 'ws';

const device=process.argv.includes('--device');
const execute=promisify(execFile),serial='R8MT100KBQD';
const adbPath='C:/Users/pablo/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const adb=async(...args)=>(await execute(adbPath,['-s',serial,...args],{windowsHide:true})).stdout.trim();
const port=device?9226:9225;
if(device){const pid=(await adb('shell','pidof','com.ian.escuela')).split(/\s+/)[0];assert.match(pid,/^\d+$/);await adb('forward',`tcp:${port}`,`localabstract:webview_devtools_remote_${pid}`);}
const pages=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page=pages.find(page=>page.type==='page'&&page.url.startsWith(device?'https://localhost':'http://127.0.0.1:4187'))||(!device&&pages.find(page=>page.type==='page'));
assert.ok(page,'App preview not found');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});
let id=0;const pending=new Map(),errors=[];
ws.on('message',buffer=>{const data=JSON.parse(buffer);if(data.method==='Runtime.exceptionThrown')errors.push(data.params.exceptionDetails.exception?.description||data.params.exceptionDetails.text);const call=pending.get(data.id);if(!call)return;pending.delete(data.id);clearTimeout(call.timeout);data.error?call.reject(Error(data.error.message)):call.resolve(data.result);});
const send=(method,params={})=>new Promise((resolve,reject)=>{const next=++id;const timeout=setTimeout(()=>{pending.delete(next);reject(Error(`Timeout: ${method}`));},25_000);pending.set(next,{resolve,reject,timeout});ws.send(JSON.stringify({id:next,method,params}));});
const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value;};
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function waitFor(expression){for(let n=0;n<150;n++){if(await evaluate(expression))return;await delay(100);}throw Error(`Condition failed: ${expression}`);}
const click=async selector=>{assert.equal(await evaluate(`(()=>{const b=document.querySelector(${JSON.stringify(selector)});if(!b||b.disabled)return false;b.click();return true})()`),true,selector);};
const screenshots=new URL(`../output/pacman-explorer/${device?'tablet':'preview'}/`,import.meta.url);
await mkdir(screenshots,{recursive:true});
const shot=async name=>{
  const png=device?(await execute(adbPath,['-s',serial,'exec-out','screencap','-p'],{windowsHide:true,encoding:'buffer',maxBuffer:8*1024*1024})).stdout:Buffer.from((await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})).data,'base64');
  await writeFile(new URL(`${name}.png`,screenshots),png);
};
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
let original,successful=false;
try{
  await send('Runtime.enable');
  if(device)await adb('shell','input','keyevent','224');
  if(!device){await send('Network.enable');await send('Network.setBypassServiceWorker',{bypass:true});await send('Page.navigate',{url:'http://127.0.0.1:4187'});}
  if(process.argv.includes('--inspect'))console.log(await evaluate("({url:location.href,title:document.title,text:document.body.innerText.slice(0,300),scripts:[...document.scripts].map(s=>s.src),explorer:typeof pacmanExplorerAction})"));
  if(!device)await send('Emulation.setDeviceMetricsOverride',{width:1280,height:800,deviceScaleFactor:1,mobile:false});
  await waitFor("typeof pacmanExplorerAction === 'function' && typeof data !== 'undefined'");
  if(device)await waitFor("typeof window.Capacitor?.triggerEvent === 'function'");
  // Runtime.enable also replays exceptions buffered before this test attached.
  // Validate the ready bridge, then scope failures to this game's interactions.
  if(errors.length)console.log(`${errors.length} aviso(s) de arranque anteriores a la prueba; el puente Android está disponible.`);
  errors.length=0;
  original=await evaluate("({key:localStorage.getItem(PX_SAVE_KEY),route:JSON.parse(JSON.stringify(route)),state:pxState,other:Object.entries(localStorage).filter(([key])=>key!==PX_SAVE_KEY).sort(([a],[b])=>a.localeCompare(b))})");
  assert.equal(await evaluate("Boolean(typeof storyAudio !== 'undefined' && storyAudio)"),false,'Wait for narration to finish before previewing');
  await evaluate("localStorage.removeItem(PX_SAVE_KEY);pxProgress=null;pxState=null;setRoute({view:'supports'})");
  await click('[data-action="px-open"]');await delay(1000);await shot('01-islas');
  await click('.px-hero-start');await delay(800);await shot('02-mision');
  const metrics=await evaluate("({width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,controls:(()=>{const r=document.querySelector('.px-run-controls').getBoundingClientRect();return {top:r.top,bottom:r.bottom,right:r.right}})()})");
  assert.equal(metrics.overflow,false);assert.ok(metrics.controls.bottom<=metrics.height+1,'Run controls must fit on the tablet');
  for(const op of ['right','right','take','right'])await click(`[data-action="px-add"][data-value="${op}"]`);
  await click('[data-action="px-step"]');await waitFor("pxState.phase==='paused'");assert.equal(await evaluate('pxState.cursor'),1);
  await click('[data-action="px-run"]');await delay(200);await shot('03-en-movimiento');await waitFor("pxState.phase==='complete'");
  await delay(900);await shot('04-isla-descubierta');
  assert.equal(await evaluate('pxReadProgress().completed.length'),1);

  // Real editor interactions for a key-and-door mission, including a recoverable
  // mistake and a correction without leaving the map.
  await evaluate("pxProgress.completed=PX_LEVELS.slice(0,4).map(level=>level.id);pxLoadLevel(4)");await delay(700);
  for(const op of ['right','take','right','open','right','right','up','take','up'])await click(`[data-action="px-add"][data-value="${op}"]`);
  await shot('05-llaves-y-puertas');await click('[data-action="px-run"]');await waitFor("pxState.phase==='complete'");
  assert.equal(await evaluate('pxState.world.door'),true);

  await evaluate("pxProgress.completed=PX_LEVELS.slice(0,9).map(level=>level.id);pxLoadLevel(9)");await delay(700);
  await click('[data-action="px-repeat"]');await click('[data-action="px-count"][data-value="1"]');
  await click('[data-action="px-add"][data-value="right"]');await click('[data-action="px-add"][data-value="take"]');
  await click('[data-action="px-outside"]');await click('[data-action="px-add"][data-value="right"]');
  await shot('06-repetir');await click('[data-action="px-run"]');await waitFor("pxState.phase==='complete'");
  assert.equal(await evaluate('pxState.world.cherries.length'),3);
  await click('[data-action="px-reset"]');
  const workshopWidth=await evaluate("document.querySelector('.px-workshop').getBoundingClientRect().width");
  await click('[data-action="px-motion"]');
  assert.ok(Math.abs(await evaluate("document.querySelector('.px-workshop').getBoundingClientRect().width")-workshopWidth)<1,'Reduced motion preserves the layout');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.px-cloud')).animationName"),'none');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.px-art-cherry')).animationName"),'none');
  if(!device){await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await delay(250);await shot('07-movil');assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);}
  assert.deepEqual(errors,[],'No uncaught animation or interaction errors');
  successful=true;
  console.log(`${device?'A8':'Navegador'}: interfaz, dimensiones, animaciones reales, paso a paso, puertas, repeticiones y movimiento reducido verificados. Capturas guardadas.`);
}finally{
  if(original){
    await evaluate(`leavePacmanExplorer();${original.key===null?'localStorage.removeItem(PX_SAVE_KEY)':`localStorage.setItem(PX_SAVE_KEY,${JSON.stringify(original.key)})`};pxProgress=null;pxState=${JSON.stringify(original.state)};setRoute(${JSON.stringify(original.route)})`);
    const other=await evaluate("Object.entries(localStorage).filter(([key])=>key!==PX_SAVE_KEY).sort(([a],[b])=>a.localeCompare(b))");
    assert.equal(hash(other),hash(original.other),'Preview must preserve other app data');
    if(device&&process.argv.includes('--leave-open')&&successful){await evaluate("setRoute({view:'supports'});pxState={screen:'library'};setRoute({view:'support-explorer'});renderPacmanExplorer(true)");await delay(1000);await shot('00-listo-para-jugar');}
  }
  ws.close();if(device)await adb('forward','--remove',`tcp:${port}`);
}
