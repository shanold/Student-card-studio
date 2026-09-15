import test from 'node:test';
import assert from 'node:assert/strict';
import {BUILTIN_TEMPLATES,DECORATIONS} from '../src/templates.js';
import {backgroundCss,backgroundSizeCss} from '../src/renderer.js';

test('template library has a varied first pack',()=>{
  assert.ok(Object.keys(BUILTIN_TEMPLATES).length >= 15);
  for (const key of ['botanical','paint','storybook','bulletin','woodland','space','ocean','rainbow','minimal']) assert.ok(BUILTIN_TEMPLATES[key],key);
});

test('decorative asset library includes reusable frames and accents',()=>{
  for (const key of ['banner','label','stars','splash','speech','frame']) assert.ok(DECORATIONS[key],key);
});

test('pattern none renders the base color and patterns have sizing',()=>{
  const base={type:'pattern',pattern:'none',color:'#abcdef',color2:'#123456'};
  assert.equal(backgroundCss(base),'#abcdef');
  assert.equal(backgroundSizeCss(base),'cover');
  assert.match(backgroundCss({...base,pattern:'dots'}),/radial-gradient/);
  assert.notEqual(backgroundSizeCss({...base,pattern:'dots'}),'cover');
});
