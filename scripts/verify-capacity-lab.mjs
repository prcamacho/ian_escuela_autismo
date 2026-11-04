import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const storage = new Map(), app = {innerHTML:''};
const context = vm.createContext({console, navigator:{}, location:{protocol:'file:'},
  Audio:class {constructor(){throw Error('Capacity activities must not play audio');}},
  window:{addEventListener(){},scrollTo(){},matchMedia:()=>({matches:true}),setTimeout(){}},
  localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)},
  document:{getElementById:()=>app,querySelector:()=>null,addEventListener(){},
    documentElement:{classList:{toggle(){}}},body:{classList:{toggle(){}}}}
});
for(const file of ['pacman-language.js','language-missions.js','language-scenes.js','weight-lab.js','technology.js','capacity-lab.js','school-arcade.js','pacman-quests.js','english-family.js','social-farm.js','pacman-worlds.js','pacman-discoveries.js','app.js'])
  vm.runInContext(await readFile(new URL('../app/'+file,import.meta.url),'utf8'),context,{filename:file});
const run=code=>vm.runInContext(code,context);
const tap=(action,dataset={})=>run(`capacityAction(${JSON.stringify(action)},{dataset:${JSON.stringify(dataset)}})`);
const themes=run('TECHNOLOGY_THEMES.filter(t=>t.capacityMode)');
assert.equal(themes.length,3);
for(let pass=0;pass<200;pass++)for(const theme of themes){
  const rounds=run(`createCapacityExercises(${JSON.stringify(theme)})`);assert.equal(rounds.length,5);
  for(const round of rounds){
    if(round.mode==='fill'){
      const remaining=4-round.initial.reduce((a,b)=>a+b,0);
      assert.ok(remaining>0);assert.equal(remaining%Math.min(...round.allowed),0);
    }else if(round.mode==='sum'){
      assert.equal(round.target,round.bottles.reduce((a,b)=>a+b,0));assert.equal(round.target%4,0);
      assert.equal(new Set(round.options).size,round.options.length);assert.equal(round.options.filter(n=>n===round.target).length,1);
      assert.ok(round.target<=24);assert.notEqual(round.bottles.length,round.target/4);
    }else assert.equal(round.correct,round.object.units<4?'less':round.object.units>4?'more':'equal');
  }
}
run(`var old=clone(DEFAULT_DATA); old.settings.studentName='Conservar';
  old.subjects.find(s=>s.id==='tecnologia').themes=old.subjects.find(s=>s.id==='tecnologia').themes.filter(t=>!t.capacityMode);
  old.subjects[0].themes.push({id:'personal',title:'Personal',exercises:[]}); var migrated=normalizeData(normalizeData(old));`);
assert.equal(run("migrated.settings.studentName"),'Conservar');
assert.equal(run("migrated.subjects.find(s=>s.id==='tecnologia').themes.filter(t=>t.capacityMode).length"),3);
assert.equal(run("migrated.subjects.flatMap(s=>s.themes).filter(t=>t.id==='personal').length"),1);

for(const theme of themes){
  run(`startSession('tecnologia','${theme.id}','activity')`);
  tap('cl-check');assert.equal(run('session.answers.length'),0);
  tap('cl-lesson-unit',{units:1});for(let n=0;n<4;n++)tap('cl-demo');
  assert.equal(run('clTotal(session.capacityLesson.parts)'),4);
  tap('cl-demo');assert.equal(run('session.capacityLesson.parts.length'),4);
  assert.equal(run('session.answers.length'),0);
  tap('cl-lesson-reset');assert.equal(run('session.capacityLesson.parts.length'),0);
  tap('cl-lesson-unit',{units:2});tap('cl-demo');tap('cl-demo');
  assert.equal(run('clTotal(session.capacityLesson.parts)'),4);
  tap('cl-begin');
  for(let i=0;i<5;i++){
    const round=run('clCurrent().exercise');
    if(round.mode==='fill'){
      let remaining=4-round.initial.reduce((a,b)=>a+b,0);
      tap('cl-pour',{units:99});assert.equal(run('clCurrent().state.parts.length'),0);
      tap('cl-pour',{units:round.allowed[0]});tap('cl-undo');
      assert.equal(run('clCurrent().state.parts.length'),0);
      for(const unit of round.allowed)while(remaining>=unit){tap('cl-pour',{units:unit});remaining-=unit;}
      assert.equal(run('clTotal([...clCurrent().exercise.initial,...clCurrent().state.parts])'),4);
      const count=run('clCurrent().state.parts.length');tap('cl-pour',{units:round.allowed[0]});
      assert.equal(run('clCurrent().state.parts.length'),count);
    }else if(round.mode==='sum'){
      tap('cl-choice',{value:String(round.options.find(n=>n!==round.target))});
      assert.equal(run('clCurrent().state.checked'),false);
      for(let n=0;n<round.bottles.length;n++)tap('cl-collect');
      assert.equal(run('clCurrent().state.poured'),round.bottles.length);
      tap('cl-collect');assert.equal(run('clCurrent().state.poured'),round.bottles.length);
      tap('cl-choice',{value:String(round.target)});
    }else{
      tap('cl-choice',{value:'invalid'});assert.equal(run('clCurrent().state.choice'),null);
      tap('cl-measure');assert.equal(run('clCurrent().state.sourceUnits'),Math.max(0,4-round.object.units));
      tap('cl-choice',{value:round.correct});
    }
    tap('cl-help');assert.equal(run('session.capacityLesson.active'),true);
    tap('cl-begin');tap('cl-check');
    assert.equal(run('clCurrent().state.isCorrect'),true);
    const score=run('session.score');tap('cl-check');tap('cl-undo');tap('cl-choice',{value:'less'});
    assert.equal(run('session.score'),score);assert.equal(run('session.answers.length'),i+1);
    tap('cl-next');
  }
  assert.equal(run('session.score'),5);assert.ok(app.innerHTML.includes('¡Terminaste'));
}
// Wrong answers count once, and leaving an activity cancels its in-flight work.
run("startSession('tecnologia','litros-botellas','activity')");tap('cl-begin');
run("clCurrent().state.busy=true");tap('cl-choice',{value:'8'});assert.equal(run('clCurrent().state.choice'),null);
run("clCurrent().state.busy=false; var wrong=String(clCurrent().exercise.options.find(v=>v!==clCurrent().exercise.target))");
tap('cl-choice',{value:run('wrong')});tap('cl-check');tap('cl-check');
assert.equal(run('session.score'),0);assert.equal(run('session.answers.length'),1);
tap('cl-exit');assert.equal(run('route.view'),'subject');
console.log('Litros: 600 partidas, 15 desafíos, medios/cuartos, conservación del agua, ayudas, errores, confirmación única y migración verificados.');
