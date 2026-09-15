import test from 'node:test'; import assert from 'node:assert/strict';
import {createProject,createElement,addElement,serializeProject,parseProjectFile,stripStudentData} from '../src/model.js';
import {parseNameList,parseCsvRoster,normalizePersonName} from '../src/importers.js';
import {History} from '../src/history.js';
import {resolveText,calculatePrintLayout} from '../src/renderer.js';
import {APP_VERSION} from '../src/config.js';

test('project defaults and element cap',()=>{const p=createProject(); assert.equal(p.version,1); assert.equal(p.card.widthIn,5); for(let i=0;i<50;i++) addElement(p,createElement('text')); assert.throws(()=>addElement(p,createElement('text')),/50/);});
test('name list creates students',()=>assert.deepEqual(parseNameList('Ada Lovelace\n\nGrace Hopper').map(s=>s.fields.Name),['Ada Lovelace','Grace Hopper']));
test('csv keeps arbitrary fields and quoted commas',()=>{const r=parseCsvRoster('Name,Grade,Favorite\n"Smith, John",3,Blue'); assert.deepEqual(r.fields,['Name','Grade','Favorite']); assert.equal(r.students[0].fields.Name,'Smith, John');});
test('project round trip and template strips students',()=>{const p=createProject(); p.students=[{id:'s1',fields:{Name:'Ada'},photo:null,qr:null}]; p.elements.push(createElement('field',{fieldKey:'Name'})); const q=parseProjectFile(serializeProject(p)); assert.equal(q.students[0].fields.Name,'Ada'); assert.equal(stripStudentData(p).students.length,0);});
test('history undo redo',()=>{const h=new History({n:1}); h.push({n:2}); assert.equal(h.undo().n,1); assert.equal(h.redo().n,2);});
test('dynamic text resolves current student',()=>assert.equal(resolveText({type:'field',fieldKey:'Bus'},{fields:{Bus:'42'}}),'42'));
test('photo matching normalization',()=>assert.equal(normalizePersonName('Smith, John.JPG'),'smith john'));
test('print layout fits 5x3 cards on letter landscape',()=>{const l=calculatePrintLayout({cardW:5,cardH:3,pageW:11,pageH:8.5,margin:.25,gap:.1}); assert.equal(l.columns,2); assert.equal(l.rows,2);});
import {nextSnapshots} from '../src/storage.js'; import {crc32} from '../src/zip.js';
test('recovery keeps newest three',()=>assert.deepEqual(nextSnapshots([2,3,4],1),[1,2,3]));
test('crc32 standard vector',()=>assert.equal(crc32(new TextEncoder().encode('123456789')),0xcbf43926));

test('app exposes a visible semantic build version',()=>assert.match(APP_VERSION,/^0\.1\.3$/));
