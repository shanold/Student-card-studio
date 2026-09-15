export function resolveText(el,student){return el.type==='field'?String(student?.fields?.[el.fieldKey]??`{${el.fieldKey||'Field'}}`):el.text??'';}
export function calculatePrintLayout({cardW,cardH,pageW,pageH,margin=.25,gap=.1}){const usableW=pageW-margin*2,usableH=pageH-margin*2; const columns=Math.max(1,Math.floor((usableW+gap)/(cardW+gap))); const rows=Math.max(1,Math.floor((usableH+gap)/(cardH+gap))); return {columns,rows,perPage:columns*rows,usedW:columns*cardW+(columns-1)*gap,usedH:rows*cardH+(rows-1)*gap};}
export function backgroundCss(bg){
 if(bg.type==='gradient')return `linear-gradient(${bg.angle||135}deg,${bg.color},${bg.color2})`;
 if(bg.type==='pattern'){
  const c=bg.color||'#ffffff',a=bg.color2||'#94a3b8';
  if(!bg.pattern||bg.pattern==='none')return c;
  if(bg.pattern==='notebook')return `repeating-linear-gradient(${c} 0 27px,${a} 28px,${c} 29px)`;
  if(bg.pattern==='graph')return `linear-gradient(${a} 1px,transparent 1px),linear-gradient(90deg,${a} 1px,transparent 1px),${c}`;
  if(bg.pattern==='dots')return `radial-gradient(circle,${a} 2.5px,transparent 3px),${c}`;
  if(bg.pattern==='checker')return `conic-gradient(${a} 25%,${c} 0 50%,${a} 0 75%,${c} 0)`;
  if(bg.pattern==='confetti')return `radial-gradient(circle at 15% 20%,${a} 2px,transparent 3px),radial-gradient(circle at 70% 65%,#06b6d4 2px,transparent 3px),radial-gradient(circle at 40% 80%,#facc15 2px,transparent 3px),${c}`;
  if(bg.pattern==='wood')return `repeating-linear-gradient(8deg,${c} 0 16px,${a} 17px,${c} 19px)`;
  return c;
 }
 return bg.image?`url(${bg.image})`:bg.color;
}
export function backgroundSizeCss(bg){if(bg.type!=='pattern')return 'cover';return ({graph:'24px 24px',dots:'22px 22px',checker:'32px 32px',confetti:'42px 42px'}[bg.pattern]||'cover');}
