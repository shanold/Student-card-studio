import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('WordArt picker and editable effect controls are present',()=>{
  for(const id of ['wordArtBtn','wordArtDialog','wordArtGallery','propFillType','propFill2','propGradientAngle','propWarp','propLetterSpacing','propShadowStyle','propShadowColor','propShadowDepth','propShadowBlur','propShadowX','propShadowY']) assert.match(html,new RegExp(`id="${id}"`),id);
});
test('editor hint documents proportional scale and Shift stretch',()=>{
  assert.match(html,/scale the whole design proportionally/i);
  assert.match(html,/hold Shift/i);
});
