import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import vm from "node:vm";

const app = { innerHTML: "" }, listeners = new Map(), storage = new Map();
const silent = () => { throw Error("School expeditions must remain silent"); };
const context = vm.createContext({ console, navigator: {}, location: { protocol: "file:" }, CSS: { escape: v => v }, Audio: silent,
  window: { scrollY: 0, addEventListener() {}, scrollTo() {}, matchMedia: () => ({ matches: true }), setTimeout() {}, speechSynthesis: { speak: silent } },
  localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) },
  document: { getElementById: () => app, querySelector: () => null, documentElement: { classList: { toggle() {} } }, body: { classList: { toggle() {} } }, addEventListener: (type,cb) => listeners.set(type,cb) }
});
const html = await readFile(new URL("../app/index.html", import.meta.url), "utf8");
for (const [,file] of html.matchAll(/<script src="([^?]+)\?[^\"]+"><\/script>/g)) {
  if (!file.startsWith("vendor/")) vm.runInContext(await readFile(new URL(`../app/${file}`, import.meta.url), "utf8"), context, { filename: file });
}
const run = code => vm.runInContext(code,context);
const click = (action,data={}) => listeners.get("click")({ target: { closest: () => ({ dataset: { action,...data } }) } });
const themes = run("SCHOOL_EXPEDITION_THEMES");
assert.equal(themes.length,6); assert.equal(new Set(themes.map(t=>t.subject)).size,6);
run(`var old=clone(DEFAULT_DATA);old.settings.studentName='Conservar';old.subjects.forEach(s=>{s.themes=s.themes.filter(t=>!t.expeditionMode);s.themes.push({id:'custom-'+s.id,title:'Propio',exercises:[]});});var migrated=normalizeData(normalizeData(old));`);
assert.equal(run("migrated.settings.studentName"),"Conservar");
for (const t of themes) {
  const saved = run(`migrated.subjects.find(s=>s.id==='${t.subject}').themes`);
  assert.equal(saved[0].id,t.id); assert.equal(saved.filter(x=>x.id===t.id).length,1);
  const previous=run(`old.subjects.find(s=>s.id==='${t.subject}').themes.map(t=>t.id)`);
  for(const id of previous)assert.ok(saved.some(x=>x.id===id),id);
}
// Every bank is exhausted over repeated sessions, without duplicate questions.
const seen=new Map();
for(let pass=0;pass<16;pass++)for(const t of themes){
  const rounds=run(`createSchoolExpeditionExercises(SCHOOL_EXPEDITION_THEMES.find(t=>t.id==='${t.id}'))`);
  assert.equal(rounds.length,5);
  const identities=rounds.map(e=>JSON.stringify([e.text,e.place,e.product,e.numerator,e.denominator,e.slices,e.clue,e.name]));
  assert.equal(new Set(identities).size,5);
  if(!seen.has(t.expeditionMode))seen.set(t.expeditionMode,new Set());
  identities.forEach(id=>seen.get(t.expeditionMode).add(id));
  for(const e of rounds){
    if(e.options)assert.equal(new Set(e.options).size,e.options.length);
    if(["causes","design"].includes(e.mode))assert.ok(e.options.includes(e.correct));
    if(["food","journey"].includes(e.mode))for(const v of e.correct)assert.ok(e.options.includes(v));
    if(e.mode==="fractions"){
      assert.ok(Number.isInteger(e.correct));
      // Independent area oracle, including equivalences and extra selections.
      for(let mask=0;mask<2**e.slices;mask++){
        const count=mask.toString(2).replaceAll('0','').length;
        assert.equal(count===e.correct,count*e.denominator===e.numerator*e.slices);
      }
    }
  }
}
assert.deepEqual([...seen].map(([mode,s])=>[mode,s.size]),[["causes",10],["food",8],["journey",8],["fractions",12],["clothes",12],["design",10]]);

function answer(e,wrong=false){
  if(["causes","design"].includes(e.mode))click("se-pick",{value:wrong?e.options.find(v=>v!==e.correct):e.correct});
  if(["food","journey"].includes(e.mode)){
    for(let j=run("seCurrent().state.sequence.length");j>0;j--)click("se-remove",{index:"0"});
    for(const v of wrong?[...e.correct].reverse():e.correct)click("se-add",{value:String(v)});
  }
  if(e.mode==="fractions"){
    click("se-clear");for(let i=0;i<e.correct+(wrong?e.correct<e.slices?1:-1:0);i++)click("se-slice",{index:String(i)});
  }
  if(e.mode==="clothes"){
    click("se-garment",{value:wrong?e.options.find(v=>v!==e.correct[0]):e.correct[0]});
    click("se-colour",{value:e.correct[1]});
  }
}
for(const t of themes){
  click("open-subject",{subject:t.subject});assert.ok(app.innerHTML.includes(t.title));
  click("start",{subject:t.subject,theme:t.id,mode:"activity"});
  for(let i=0;i<5;i++){
    const e=run("seCurrent().exercise");assert.equal(e.type,"school-expedition");
    click("se-check");click("se-next");assert.equal(run("session.index"),i);
    for(const action of ["se-pick","se-add","se-garment","se-colour"])click(action,{value:"__proto__"});
    click("se-remove",{index:"-1"});click("se-slice",{index:"99"});click("se-replay");
    assert.equal(run("seCanCheck(seCurrent().exercise,seCurrent().state)"),false);
    answer(e,true); assert.equal(run("session.answers.length"),i,"Editing cannot grade");
    assert.doesNotMatch(app.innerHTML,/EL CAMINO QUE CONECTASTE|MIRÁ ESTE RECORRIDO|¡Encontraste el camino!/);
    if(i!==0)answer(e);
    click("se-check");assert.equal(run("seCurrent().state.checked"),true);
    assert.equal(run("seCurrent().state.isCorrect"),i!==0);
    const before=JSON.stringify(run("session.answers")), state=JSON.stringify(run("seCurrent().state"));
    answer(e);click("se-check");click("se-replay");
    assert.equal(JSON.stringify(run("session.answers")),before,"A replay or double check cannot change results");
    assert.equal(JSON.stringify(run("seCurrent().state")),state,"Checked responses are locked");
    click("se-next");click("se-next");assert.equal(run("session.index"),i+1,"Double taps cannot skip unanswered questions");
  }
  assert.match(app.innerHTML,/EXPEDICIÓN COMPLETA/);assert.match(app.innerHTML,/4 de 5 desafíos resueltos/);
  click("start",{subject:t.subject,theme:t.id,mode:"activity"});assert.equal(run("session.score"),0);
  click("cancel-run");assert.equal(run("session"),null);assert.equal(run("route.subjectId"),t.subject);
}
// Tapping a filled slot removes exactly that card; it can then be reused.
click("start",{subject:"cs-sociales",theme:"expedition-journey",mode:"activity"});
for(const value of ["2","0","1"])click("se-add",{value});click("se-remove",{index:"1"});
assert.deepEqual([...run("seCurrent().state.sequence")],[2,1]);click("se-add",{value:"0"});
assert.deepEqual([...run("seCurrent().state.sequence")],[2,1,0]);
run("var cancelled=0;seAnimation={kill(){cancelled++}};setRoute({view:'school'})");
assert.equal(run("cancelled"),1,"Leaving an activity must cancel its animation");
assert.equal(run("seAnimation"),null);
// Cover every drawing branch, including scenes not selected in the sample games.
const vectors=run(`[
  ...Object.values(SE_LIFE).map(([,art])=>seArt(art)),
  ...SE_STORIES.map(([scene])=>seStoryScene({scene})),
  ...SE_DESIGNS.map(([test,name,need,correct])=>seMaterialTest({test,correct})),
  ...Object.keys(SE_GARMENTS).map(id=>seGarment(id,'#4c7ecd')),
  ...Object.values(SE_MATERIALS).map(([,color,art])=>seArt(art,color)),
  ...SE_PRODUCTS.flatMap(([,art,stages])=>[seArt(art),...stages.map(s=>seArt(s[2]))])
]`);
for(const svg of vectors){assert.match(svg,/^<svg /);assert.match(svg,/<\/svg>$/);assert.doesNotMatch(svg,/undefined|NaN|Infinity/);}
if(process.argv.includes("--export-vectors")){
  await mkdir(new URL("../tmp/",import.meta.url),{recursive:true});
  await writeFile(new URL("../tmp/expedition-vectors.json",import.meta.url),JSON.stringify(vectors));
}
// Every animation branch is finite and optional. Private storage remains usable.
run("localStorage.getItem=()=>{throw Error('Unavailable')};localStorage.setItem=()=>{throw Error('Unavailable')}");
for(const t of themes)assert.equal(run(`createSchoolExpeditionExercises(SCHOOL_EXPEDITION_THEMES.find(t=>t.id==='${t.id}')).length`),5);
console.log("Expediciones: seis partidas completas, 60 variantes, fracciones equivalentes, errores, edición, doble toque, bloqueo, reinicio, migración y almacenamiento no disponible verificados.");
