
const TEXT_DECORATIONS=new Set(['banner','label','speech']);
export function decorationSupportsText(kind){return TEXT_DECORATIONS.has(kind);}
export function decorationTextLayout(kind){
 if(kind==='banner')return {left:12,top:24,width:76,height:52};
 if(kind==='label')return {left:10,top:20,width:80,height:60};
 if(kind==='speech')return {left:10,top:14,width:80,height:52};
 return {left:8,top:8,width:84,height:84};
}

function escXml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));}
export function decorationSvg(el){
 const kind=el.decorationKind||'label',fill=el.fill||'#ffffff',border=el.borderColor||'#17202a',bw=Math.max(0,Number(el.borderWidth??2)),text=escXml(el.text||''),font=escXml(el.fontFamily||'Arial'),weight=Number(el.fontWeight||700),textFill=el.stroke||'#111827';
 const common=`width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" class="decoration-svg"`;
 const textNode=(y=53,size=22)=>`<text x="50" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${textFill}" font-family="${font}" font-size="${size}" font-weight="${weight}" preserveAspectRatio="xMidYMid meet">${text}</text>`;
 if(kind==='banner')return `<svg ${common}><path d="M5 18 H95 L86 50 L95 82 H5 L14 50 Z" fill="${fill}" stroke="${border}" stroke-width="${bw}" vector-effect="non-scaling-stroke"/></svg>`;
 if(kind==='label')return `<svg ${common}><rect x="4" y="12" width="92" height="76" rx="24" ry="24" fill="${fill}" stroke="${border}" stroke-width="${bw}" vector-effect="non-scaling-stroke"/></svg>`;
 if(kind==='speech')return `<svg ${common}><path d="M8 10 H92 Q97 10 97 18 V68 Q97 76 89 76 H42 L24 94 L28 76 H8 Q3 76 3 68 V18 Q3 10 8 10 Z" fill="${fill}" stroke="${border}" stroke-width="${bw}" vector-effect="non-scaling-stroke"/></svg>`;
 if(kind==='stars')return `<svg ${common}><text x="50" y="54" text-anchor="middle" dominant-baseline="middle" fill="${fill}" font-size="42">★ ★ ★</text></svg>`;
 if(kind==='splash')return `<svg ${common}><g fill="${fill}"><path d="M50 8 L59 30 L80 14 L72 38 L96 35 L76 52 L94 68 L69 64 L75 91 L55 72 L43 95 L38 70 L13 86 L25 62 L3 52 L28 43 L12 22 L37 33 Z"/><circle cx="15" cy="12" r="5"/><circle cx="88" cy="13" r="4"/><circle cx="91" cy="89" r="5"/></g></svg>`;
 if(kind==='frame')return `<svg ${common}><rect x="4" y="4" width="92" height="92" rx="10" ry="10" fill="none" stroke="${fill}" stroke-width="${Math.max(2,bw||4)}" vector-effect="non-scaling-stroke"/></svg>`;
 return `<svg ${common}><rect x="4" y="4" width="92" height="92" fill="${fill}" stroke="${border}" stroke-width="${bw}"/></svg>`;
}
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

export function textFillCss(el){
 const gradient=el.fillType==='gradient';
 return gradient?{color:'transparent',backgroundImage:`linear-gradient(${Number(el.gradientAngle??90)}deg,${el.fill||'#111827'},${el.fill2||el.fill||'#111827'})`,backgroundClip:'text',WebkitBackgroundClip:'text'}:{color:el.fill||'#111827',backgroundImage:'none',backgroundClip:'border-box',WebkitBackgroundClip:'border-box'};
}
export function textShadowCss(el){
 const style=el.shadowStyle===undefined?(el.shadow?'drop':'none'):el.shadowStyle,c=el.shadowColor||'#000000';
 if(style==='none')return 'none';
 if(style==='glow')return `0 0 ${Math.max(1,Number(el.shadowBlur??8))}px ${c}`;
 if(style==='extrude'){
  const depth=Math.max(1,Math.round(Number(el.shadowDepth??4))),sx=Number(el.shadowX??1)||1,sy=Number(el.shadowY??1)||1;
  return Array.from({length:depth},(_,i)=>`${Math.round(sx*(i+1)*100)/100}px ${Math.round(sy*(i+1)*100)/100}px ${Number(el.shadowBlur??0)}px ${c}`).join(', ');
 }
 return `${Number(el.shadowX??2)}px ${Number(el.shadowY??2)}px ${Number(el.shadowBlur??4)}px ${c}`;
}
