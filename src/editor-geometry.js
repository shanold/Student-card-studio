export function resizeElementFromDelta(orig,dx,dy,handle='se',minSize=2){
  const left=orig.x-orig.w/2,right=orig.x+orig.w/2,top=orig.y-orig.h/2,bottom=orig.y+orig.h/2;
  let nl=left,nr=right,nt=top,nb=bottom;
  if(handle.includes('w')) nl+=dx; else nr+=dx;
  if(handle.includes('n')) nt+=dy; else nb+=dy;
  if(nr-nl<minSize){if(handle.includes('w')) nl=nr-minSize;else nr=nl+minSize;}
  if(nb-nt<minSize){if(handle.includes('n')) nt=nb-minSize;else nb=nt+minSize;}
  nl=Math.max(0,Math.min(100-minSize,nl)); nr=Math.max(nl+minSize,Math.min(100,nr));
  nt=Math.max(0,Math.min(100-minSize,nt)); nb=Math.max(nt+minSize,Math.min(100,nb));
  return {x:(nl+nr)/2,y:(nt+nb)/2,w:nr-nl,h:nb-nt};
}

export function scaleElementFromDelta(orig,dx,dy,handle='se',minSize=2){
  const sx=handle.includes('w')?-1:1, sy=handle.includes('n')?-1:1;
  const scaleX=(orig.w+sx*dx)/orig.w, scaleY=(orig.h+sy*dy)/orig.h;
  let scale=Math.abs(scaleX-1)>=Math.abs(scaleY-1)?scaleX:scaleY;
  const left=orig.x-orig.w/2,right=orig.x+orig.w/2,top=orig.y-orig.h/2,bottom=orig.y+orig.h/2;
  const anchorX=handle.includes('w')?right:left, anchorY=handle.includes('n')?bottom:top;
  const maxW=handle.includes('w')?anchorX:100-anchorX, maxH=handle.includes('n')?anchorY:100-anchorY;
  const minScale=Math.max(minSize/orig.w,minSize/orig.h);
  const maxScale=Math.max(minScale,Math.min(maxW/orig.w,maxH/orig.h));
  scale=Math.max(minScale,Math.min(maxScale,scale));
  const w=orig.w*scale,h=orig.h*scale;
  const x=anchorX+(handle.includes('w')?-w/2:w/2),y=anchorY+(handle.includes('n')?-h/2:h/2);
  return {x,y,w,h,scale};
}

const VISUAL_KEYS=['fontSize','strokeWidth','borderWidth','shadowBlur','shadowX','shadowY'];
export function scaledVisualProperties(orig,scale){
  const out={};
  for(const key of VISUAL_KEYS){if(Number.isFinite(Number(orig[key])))out[key]=Math.round(Number(orig[key])*scale*100)/100;}
  return out;
}
