const {chromium} = require('@playwright/test');
const fs = require('node:fs');
const sharp = require('sharp');
(async()=>{
 const b=await chromium.launch();
 for(const reduced of [false,true]){
  const dir=`tmp/creative-review/motion/${reduced?'reduced':'normal-final'}`;
  fs.mkdirSync(dir,{recursive:true});
  const p=await b.newPage({viewport:{width:1000,height:760},reducedMotion:reduced?'reduce':'no-preference'});
  await p.goto('http://127.0.0.1:3108/es#inicio');
  await p.waitForTimeout(1500);
  await p.locator('#deck-tab-proyectos').hover();
  await p.waitForTimeout(400);
  await p.screenshot({path:`${dir}/frame-00.png`});
  const start=Date.now();
  await p.locator('#deck-tab-proyectos').click();
  const samples=[];
  for(let i=1;i<=6;i++){
   await p.waitForTimeout(i===1?16:120);
   samples.push({elapsedMs:Date.now()-start,...await p.evaluate(()=>({active:document.querySelector('.deck-sheet.is-active')?.textContent.slice(0,30),animations:document.getAnimations().map(a=>({state:a.playState,timing:a.effect?.getTiming()}))}))});
   await p.screenshot({path:`${dir}/frame-0${i}.png`});
  }
  fs.writeFileSync(`${dir}/report.json`,JSON.stringify({reduced,viewport:{width:1000,height:760},method:'Chromium screenshots sampled in wall time after native click; elapsed values include screenshot overhead. No GPU/FPS or scrubbed timeline claim.',toolFailure:'Impeccable capture rejected newly started animations in reduced mode; equivalent interaction captured directly.',samples,limitations:['Not physical devices','Samples include ongoing gallery autoplay under normal motion','No field performance metrics']},null,2));
  const composites=[];
  for(let i=0;i<=6;i++)composites.push({input:await sharp(`${dir}/frame-0${i}.png`).resize(300,228).toBuffer(),left:i*300,top:0});
  await sharp({create:{width:2100,height:228,channels:3,background:'#ddd'}}).composite(composites).png().toFile(`${dir}/filmstrip.png`);
  await p.close();
 }
 await b.close();console.log('Captured normal and reduced transition sequences.');
})().catch(e=>{console.error(e);process.exit(1)});
