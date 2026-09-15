import test from 'node:test';
import assert from 'node:assert/strict';
import {scaleElementFromDelta, scaledVisualProperties} from '../src/editor-geometry.js';
import {WORDART_PRESETS, createWordArtDefinition} from '../src/wordart.js';
import {textShadowCss, textFillCss} from '../src/renderer.js';

test('corner scale preserves element proportions and reports scale factor',()=>{
  const base={x:50,y:50,w:20,h:10};
  const r=scaleElementFromDelta(base,20,2,'se');
  assert.equal(r.w,40);
  assert.equal(r.h,20);
  assert.equal(r.scale,2);
  assert.equal(r.x,60);
  assert.equal(r.y,55);
});

test('whole-element scaling scales internal visual measurements',()=>{
  const orig={fontSize:18,strokeWidth:2,borderWidth:3,shadowBlur:4,shadowX:2,shadowY:3};
  assert.deepEqual(scaledVisualProperties(orig,1.5),{
    fontSize:27,strokeWidth:3,borderWidth:4.5,shadowBlur:6,shadowX:3,shadowY:4.5
  });
});

test('wordart provides a varied editable preset gallery',()=>{
  assert.ok(Object.keys(WORDART_PRESETS).length>=8);
  for(const key of ['rainbow','bubble','neon','extrude','arch','wave']) assert.ok(WORDART_PRESETS[key],key);
  const def=createWordArtDefinition('rainbow');
  assert.equal(def.type,'text');
  assert.equal(def.wordArt,true);
  assert.equal(def.fillType,'gradient');
  assert.ok(def.fill2);
});

test('wordart visual helpers expose editable gradient and extrusion',()=>{
  const fill=textFillCss({fill:'#ff0000',fill2:'#0000ff',fillType:'gradient',gradientAngle:90});
  assert.match(fill.backgroundImage,/linear-gradient\(90deg/);
  const shadow=textShadowCss({shadowStyle:'extrude',shadowColor:'#111111',shadowDepth:4,shadowX:1,shadowY:1,shadowBlur:0});
  assert.match(shadow,/1px 1px/);
  assert.match(shadow,/4px 4px/);
});
