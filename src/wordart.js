export const WORDART_PRESETS={
  rainbow:{label:'Rainbow Pop',fill:'#ff3b30',fill2:'#7c3aed',fillType:'gradient',gradientAngle:90,stroke:'#ffffff',strokeWidth:3,fontFamily:'Impact',fontWeight:900,shadowStyle:'drop',shadowColor:'#111827',shadowX:3,shadowY:3,shadowBlur:1},
  bubble:{label:'Bubble Letters',fill:'#f9a8d4',fill2:'#fde68a',fillType:'gradient',gradientAngle:180,stroke:'#7c3aed',strokeWidth:4,fontFamily:'Arial',fontWeight:900,shadowStyle:'drop',shadowColor:'#ffffff',shadowX:2,shadowY:2,shadowBlur:0,letterSpacing:1},
  neon:{label:'Neon Glow',fill:'#67e8f9',fill2:'#67e8f9',fillType:'solid',stroke:'#ffffff',strokeWidth:1,fontFamily:'Trebuchet MS',fontWeight:900,shadowStyle:'glow',shadowColor:'#22d3ee',shadowBlur:10},
  extrude:{label:'3D Block',fill:'#facc15',fill2:'#fb923c',fillType:'gradient',gradientAngle:180,stroke:'#111827',strokeWidth:2,fontFamily:'Impact',fontWeight:900,shadowStyle:'extrude',shadowColor:'#7c2d12',shadowDepth:7},
  arch:{label:'Big Arch',fill:'#60a5fa',fill2:'#a78bfa',fillType:'gradient',gradientAngle:90,stroke:'#ffffff',strokeWidth:3,fontFamily:'Arial',fontWeight:900,warp:'arch',curve:65,shadowStyle:'drop',shadowColor:'#1e3a8a',shadowX:2,shadowY:3,shadowBlur:2},
  wave:{label:'Wavy Fun',fill:'#34d399',fill2:'#facc15',fillType:'gradient',gradientAngle:90,stroke:'#065f46',strokeWidth:2,fontFamily:'Comic Sans MS',fontWeight:900,warp:'wave',shadowStyle:'drop',shadowColor:'#ffffff',shadowX:2,shadowY:2,shadowBlur:0},
  candy:{label:'Candy Stripe',fill:'#fb7185',fill2:'#ffffff',fillType:'gradient',gradientAngle:135,stroke:'#be123c',strokeWidth:3,fontFamily:'Arial',fontWeight:900,letterSpacing:2,shadowStyle:'drop',shadowColor:'#fecdd3',shadowX:3,shadowY:3,shadowBlur:0},
  comic:{label:'Comic Burst',fill:'#ffffff',fill2:'#ffffff',fillType:'solid',stroke:'#111827',strokeWidth:4,fontFamily:'Impact',fontWeight:900,shadowStyle:'extrude',shadowColor:'#ef4444',shadowDepth:5,skew:-10,warp:'slant'},
  metallic:{label:'Metallic',fill:'#f8fafc',fill2:'#64748b',fillType:'gradient',gradientAngle:180,stroke:'#0f172a',strokeWidth:2,fontFamily:'Impact',fontWeight:900,shadowStyle:'drop',shadowColor:'#000000',shadowX:3,shadowY:4,shadowBlur:3}
};

export function createWordArtDefinition(key='rainbow'){
  const preset=WORDART_PRESETS[key]||WORDART_PRESETS.rainbow;
  return {type:'text',text:'WORD ART',wordArt:true,x:50,y:50,w:58,h:24,fontSize:48,fillType:'solid',fill2:'#60a5fa',gradientAngle:90,letterSpacing:0,shadowStyle:'none',shadowColor:'#000000',shadowDepth:4,shadowX:2,shadowY:2,shadowBlur:4,warp:'none',skew:0,...structuredClone(preset)};
}
