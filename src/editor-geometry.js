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
