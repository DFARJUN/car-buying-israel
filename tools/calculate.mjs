import {readFileSync} from 'node:fs';
import {validate,costs,fit,score} from '../app/model.mjs';
try {
 if(!process.argv[2])throw new Error('Usage: node tools/calculate.mjs FILE.json');
 const db=JSON.parse(readFileSync(process.argv[2],'utf8'));
 const errors=validate(db); if(errors.length)throw new Error(errors.join('\n'));
 console.log(JSON.stringify(db.cars.map(c=>({id:c.id,name:c.name,fit:fit(c,db.settings),score:score(c,db.settings.weights),costs:costs(c,db.settings.months)})),null,2));
} catch(e){console.error(e.message);process.exitCode=1;}
