import test from 'node:test';
import assert from 'node:assert/strict';
import {resizeElementFromDelta} from '../src/editor-geometry.js';

const base={x:50,y:50,w:20,h:20};

test('south-east resize grows width and height',()=>{
  assert.deepEqual(resizeElementFromDelta(base,10,5,'se'),{x:55,y:52.5,w:30,h:25});
});

test('north-west resize grows toward upper left while keeping opposite corner fixed',()=>{
  assert.deepEqual(resizeElementFromDelta(base,-10,-10,'nw'),{x:45,y:45,w:30,h:30});
});

test('resize clamps to minimum size without producing invalid geometry',()=>{
  const r=resizeElementFromDelta(base,-100,-100,'se');
  assert.equal(r.w,2);
  assert.equal(r.h,2);
  assert.ok(Number.isFinite(r.x) && Number.isFinite(r.y));
});
