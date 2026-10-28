import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,copyFileSync,writeFileSync,readFileSync,readdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
test('agent writer validates before mutation and retains previous snapshot',()=>{
 const root=mkdtempSync(join(tmpdir(),'car-writer-test-'));
 try{
  mkdirSync(join(root,'tools'));mkdirSync(join(root,'app'));
  copyFileSync(new URL('../tools/save-comparison.mjs',import.meta.url),join(root,'tools/save-comparison.mjs'));
  copyFileSync(new URL('../app/model.mjs',import.meta.url),join(root,'app/model.mjs'));
  const original=readFileSync(new URL('../examples/comparison.json',import.meta.url),'utf8'),input=join(root,'input.json');
  writeFileSync(input,original);
  const run=()=>spawnSync(process.execPath,[join(root,'tools/save-comparison.mjs'),input],{encoding:'utf8'});
  assert.equal(run().status,0);
  const saved=readFileSync(join(root,'my-car/comparison.json'),'utf8');
  writeFileSync(input,'{"version":1}');assert.notEqual(run().status,0);
  assert.equal(readFileSync(join(root,'my-car/comparison.json'),'utf8'),saved);
  const next=JSON.parse(original);next.cars[0].notes='Changed fictional note';writeFileSync(input,JSON.stringify(next));assert.equal(run().status,0);
  const history=readdirSync(join(root,'my-car/history'));assert.equal(history.length,1);
  assert.equal(readFileSync(join(root,'my-car/history',history[0]),'utf8'),saved);
 }finally{rmSync(root,{recursive:true,force:true});}
});
