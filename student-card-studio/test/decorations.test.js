import test from 'node:test';
import assert from 'node:assert/strict';
import {DECORATIONS} from '../src/templates.js';
import {decorationSvg, decorationSupportsText} from '../src/renderer.js';

test('decorations are single scalable elements instead of emoji/text stand-ins',()=>{
  for (const key of ['banner','label','stars','splash','speech','frame']) {
    const def=DECORATIONS[key].elements;
    assert.equal(def.length,1,key);
    assert.equal(def[0].type,'decoration',key);
    assert.equal(def[0].decorationKind,key,key);
  }
});

test('text-bearing decorations keep their text inside the same scalable svg',()=>{
  for (const key of ['banner','label','speech']) {
    assert.equal(decorationSupportsText(key),true,key);
    const el={...DECORATIONS[key].elements[0],text:'Room 12',fill:'#06b6d4',borderColor:'#111827',borderWidth:3,stroke:'#ffffff',fontFamily:'Arial',fontWeight:700};
    const svg=decorationSvg(el);
    assert.match(svg,/viewBox="0 0 100 100"/);
    assert.match(svg,/Room 12/);
  }
});

test('non-text decorations are scalable svg artwork',()=>{
  for (const key of ['stars','splash','frame']) {
    assert.equal(decorationSupportsText(key),false,key);
    assert.match(decorationSvg({...DECORATIONS[key].elements[0],fill:'#ec4899',borderColor:'#111827',borderWidth:3}),/^<svg/);
  }
});
