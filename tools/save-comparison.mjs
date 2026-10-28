import {readFileSync,mkdirSync,writeFileSync,renameSync,copyFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {validate} from '../app/model.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
try{
 if(!process.argv[2])throw Error('Usage: node tools/save-comparison.mjs INPUT.json');
 const data=JSON.parse(readFileSync(process.argv[2],'utf8'));
 const errors=validate(data);if(errors.length)throw Error(errors.join('\n'));
 const dir=join(root,'my-car');mkdirSync(dir,{recursive:true});
 const target=join(dir,'comparison.json'),temp=join(dir,`comparison.${process.pid}.tmp`);
 if(existsSync(target)){const history=join(dir,'history');mkdirSync(history,{recursive:true});copyFileSync(target,join(history,`comparison-${Date.now()}-${process.pid}.json`));}
 writeFileSync(temp,JSON.stringify(data,null,2)+'\n',{mode:0o600});renameSync(temp,target);
 console.log('Validated and saved my-car/comparison.json. The local summary refreshes automatically.');
}catch(e){console.error(e.message);process.exitCode=1;}
