import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const html=await readFile(new URL('../app/index.html',import.meta.url),'utf8');
const sources=await Promise.all([...html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)].filter(([,file])=>!file.startsWith('vendor/')).map(async([,file])=>[file,await readFile(new URL(`../app/${file}`,import.meta.url),'utf8')]));
function setup(storage=new Map()){
  const app={innerHTML:''},listeners=new Map();
  const forbidden=()=>{throw Error('Explorer must not play audio');};
  const context=vm.createContext({console,Audio:forbidden,navigator:{},location:{protocol:'file:'},
    window:{navigator:{},scrollTo(){},addEventListener(){},matchMedia:()=>({matches:true}),speechSynthesis:{speak:forbidden}},
    localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)},
    document:{getElementById:()=>app,querySelector:()=>null,querySelectorAll:()=>[],documentElement:{classList:{toggle(){}}},body:{classList:{toggle(){}}},addEventListener:(type,fn)=>{const previous=listeners.get(type);listeners.set(type,previous?event=>{previous(event);return fn(event);}:fn);}}});
  for(const[file,source]of sources)vm.runInContext(source,context,{filename:file});
  const run=code=>vm.runInContext(code,context);
  const click=(action,other={})=>listeners.get('click')({target:{closest:()=>({dataset:{action,...other}})}});
  const state=()=>JSON.parse(run('JSON.stringify(pxState)'));
  return{run,click,state,app,storage,context,listeners};
}
const h=setup(),levels=JSON.parse(h.run('JSON.stringify(PX_LEVELS)'));
assert.equal(levels.length,12);
assert.equal(new Set(levels.map(level=>level.world)).size,3);
const schoolBefore=h.run('JSON.stringify(data)');

// All maps are valid and solvable; every collectible and closed door has actual
// game semantics, rather than a visual shortcut or a hard-coded right answer.
for(const level of levels){
  assert.equal(new Set(level.path.map(point=>point.join(','))).size,level.path.length);
  for(const p of [...level.path,level.start,level.goal,...level.cherries,...(level.key?[level.key]:[]),...(level.door?[level.door]:[])]){
    assert.ok(p[0]>=0&&p[0]<level.cols&&p[1]>=0&&p[1]<level.rows);
    assert.ok(level.path.some(point=>point[0]===p[0]&&point[1]===p[1]));
  }
  const program=level.solution.map(block=>typeof block==='string'?{op:block}:block);
  const result=h.run(`(()=>{const level=PX_LEVELS[${level.index}];let world=pxInitialWorld(level);const program=pxValidProgram(${JSON.stringify(program)},level);const expanded=pxExpand(program);if(expanded.error)throw Error(expanded.error);for(const step of expanded.steps){const result=pxApply(level,world,step.op);if(result.error)throw Error(result.error);world=result.world;}return{won:pxWon(level,world),world,steps:expanded.steps.length};})()`);
  assert.equal(result.won,true,level.name);
  assert.equal(result.world.cherries.length,level.cherries.length);
  assert.ok(result.steps<=80);
}

h.click('supports');assert.match(h.app.innerHTML,/Pac-Man explorador/);
h.click('px-open');assert.equal(h.run('route.view'),'support-explorer');
assert.match(h.app.innerHTML,/Grandes descubrimientos/);
h.click('px-level',{value:'11'});assert.equal(h.state().screen,'library','Later worlds begin locked');
h.click('px-level',{value:'0'});
assert.equal(h.state().screen,'play');assert.deepEqual(h.state().program,[]);
assert.match(h.app.innerHTML,/Tu aventura empieza acá/);

// Wrong actions preserve the plan for editing and retrying this same map.
h.click('px-add',{value:'open'});assert.equal(h.state().program.length,0);
h.click('px-add',{value:'take'});await h.click('px-run');
assert.equal(h.state().phase,'error');assert.match(h.state().feedback,/Para recoger/);
assert.equal(h.run('pxReadProgress().completed.length'),0);
h.click('px-select',{value:'0'});h.click('px-remove');assert.deepEqual(h.state().program,[]);
for(const command of ['right','take','right','right'])h.click('px-add',{value:command});
h.click('px-select',{value:'1'});h.click('px-order',{value:'1'});
assert.deepEqual(h.state().program.map(block=>block.op),['right','right','take','right']);
await h.click('px-step');assert.equal(h.state().phase,'paused');assert.equal(h.state().cursor,1);
assert.deepEqual(h.state().world.position,[1,3]);
h.click('px-add',{value:'right'});assert.equal(h.state().cursor,0);assert.deepEqual(h.state().world.position,[0,3]);
h.click('px-select',{value:'4'});h.click('px-remove');
await h.click('px-run');assert.equal(h.state().phase,'complete');
assert.equal(h.run('pxUnlocked()'),1);
assert.match(h.app.innerHTML,/Abriste el camino/);

// Every mission is playable through the same runner and unlocks only the next
// one. Completing a replay never creates duplicate progress or skips a world.
for(let index=1;index<12;index++){
  h.click('px-next');assert.equal(h.state().level,index);
  h.run(`pxState.program=pxValidProgram(PX_LEVELS[${index}].solution.map(block=>typeof block==='string'?{op:block}:block),pxLevel())`);
  await h.click('px-run');assert.equal(h.state().phase,'complete',levels[index].name);
  assert.equal(h.run('pxReadProgress().completed.length'),index+1);
}
assert.match(h.app.innerHTML,/Una gran aventura/);
h.click('px-library');assert.match(h.app.innerHTML,/12 de 12/);
h.click('px-level',{value:'0'});for(const op of ['right','right','take','right'])h.click('px-add',{value:op});
await h.click('px-run');assert.equal(h.run('pxReadProgress().completed.length'),12);

// The repeat editor supports adding inside/outside, count changes, reordering
// and removal. Empty and nested loops cannot run or be loaded from storage.
h.click('px-library');h.click('px-level',{value:'9'});h.click('px-repeat');
assert.equal(h.state().insert,0);await h.click('px-run');assert.match(h.state().feedback,/dentro de Repetir/);
h.click('px-add',{value:'take'});h.click('px-add',{value:'right'});
h.click('px-select',{value:'0.0'});h.click('px-order',{value:'1'});
assert.deepEqual(h.state().program[0].body.map(block=>block.op),['right','take']);
h.click('px-count',{index:'0',value:'1'});assert.equal(h.state().program[0].count,3);
h.click('px-outside');h.click('px-add',{value:'right'});
assert.equal(h.state().program.length,2);assert.equal(h.state().program[0].body.length,2);
await h.click('px-run');assert.equal(h.state().phase,'complete');
assert.equal(h.run('pxValidProgram([{op:"repeat",count:2,body:[{op:"repeat"}]}],PX_LEVELS[9]).length'),0);
assert.equal(h.run('pxValidProgram([{op:"repeat",count:500,body:[{op:"right"}]}],PX_LEVELS[9]).length'),0);

// Cap editing size and reject invalid controls without changing game state.
h.click('px-library');h.click('px-level',{value:'0'});
for(let i=0;i<40;i++)h.click('px-add',{value:'right'});
assert.equal(h.state().program.length,18);
const unchanged=JSON.stringify(h.state());
for(const value of ['-1','NaN','999','0.8']){h.click('px-select',{value});h.click('px-remove');}
assert.equal(h.state().program.length,18);
h.click('px-level',{value:'999'});assert.equal(h.state().level,0);
h.click('px-reset');assert.equal(h.state().program.length,18,'Reset retains the editable plan');
h.click('px-clear');assert.equal(h.state().program.length,0);assert.equal(h.state().phase,'edit');

// Pauses and reloads recover a validated prefix of the program, not trusted
// saved coordinates; leaving during a tween cannot advance an abandoned game.
const p=setup();p.click('supports');p.click('px-open');p.click('px-level',{value:'0'});
for(const op of ['right','right','take','right'])p.click('px-add',{value:op});
await p.click('px-step');assert.equal(p.state().cursor,1);
const reloaded=setup(p.storage);reloaded.click('supports');reloaded.click('px-open');reloaded.click('px-level',{value:'0',restore:'true'});
assert.equal(reloaded.state().phase,'paused');assert.equal(reloaded.state().cursor,1);
assert.deepEqual(reloaded.state().world.position,[1,3]);
await reloaded.click('px-run');assert.equal(reloaded.state().phase,'complete');

p.click('px-reset');
p.run('pxAnimateStep=()=>new Promise(resolve=>{pxResolveAnimation=resolve})');
const running=p.click('px-run');assert.equal(p.state().phase,'running');
const beforeDouble=p.state().program.length;p.click('px-add',{value:'right'});p.click('px-run');p.click('px-hint');
assert.equal(p.state().program.length,beforeDouble);assert.equal(p.state().hint,false);
p.click('px-library');await running;assert.equal(p.state().screen,'library');
p.click('px-level',{value:'0',restore:'true'});assert.equal(p.state().cursor,1);
const pausedRun=p.click('px-run');p.click('px-pause');p.run('pxResolveAnimation()');await pausedRun;
assert.equal(p.state().phase,'paused');assert.equal(p.state().cursor,2);
const hiddenRun=p.click('px-run');p.context.document.hidden=true;p.listeners.get('visibilitychange')();await hiddenRun;
assert.equal(p.state().phase,'paused');assert.equal(p.state().cursor,3);
p.click('supports');const outside=JSON.stringify(p.state());p.click('px-add',{value:'right'});assert.equal(JSON.stringify(p.state()),outside);

const bad=new Map([[h.run('PX_SAVE_KEY'),'not-json']]);const recovery=setup(bad);
assert.equal(recovery.run('pxUnlocked()'),0);
recovery.click('supports');recovery.click('px-open');recovery.click('px-level',{value:'0'});
recovery.context.localStorage.setItem=()=>{throw Error('Storage unavailable');};
recovery.click('px-add',{value:'right'});assert.equal(recovery.state().program.length,1);
assert.equal(h.run('JSON.stringify(data)'),schoolBefore,'School data is independent of the adventure');
console.log('Explorador verificado: 12 mapas, secuencias, llaves, puertas, repeticiones, edición, errores recuperables, guardado, paso a paso, pausa y cancelación. Sin audio.');
