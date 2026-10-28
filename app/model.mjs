export const DIMENSIONS = {reliability:'אמינות', resale:'שמירת ערך', space:'מרחב', safety:'בטיחות', running_cost:'עלות שוטפת'};
export const ANNUAL = {energy:'דלק / טעינה', insurance:'ביטוח', licensing:'רישוי', service:'טיפולים', repairs:'בלאי ותיקונים', other:'אחרות'};
export const STATUSES = ['לבדוק','בקשר','ראינו','הצעה פתוחה','ירד','נמכר','נקנה'];
const finite = (v,min=0,max=1e9) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
const obj = v => v && typeof v === 'object' && !Array.isArray(v);
const str = (v,max=20000) => typeof v === 'string' && v.length <= max;
export function validate(db) {
  const errors=[];
  if (!obj(db) || db.version !== 1 || !Array.isArray(db.cars) || !obj(db.settings)) return ['מבנה הקובץ אינו תקין (version, settings, cars)'];
  if(db.summary!==undefined&&(!obj(db.summary)||['stage','recommendation','rationale','tradeoff','next_action','updated_at','coverage'].some(k=>!str(db.summary[k])))) errors.push('סיכום האייג׳נט אינו תקין');
  const s=db.settings;
  if(!Number.isInteger(s.months)||s.months<1||s.months>120) errors.push('תקופת החזקה: 1-120 חודשים שלמים');
  for(const k of ['budget','max_km']) if(s[k]!==null&&!finite(s[k])) errors.push(`settings.${k}: מספר או null`);
  for(const k of ['usage','must_haves','top_priority']) if(!str(s[k])) errors.push(`settings.${k}: נדרש טקסט`);
  if(typeof s.automatic_only!=='boolean') errors.push('automatic_only חייב להיות בוליאני');
  if(!obj(s.weights)||Object.keys(DIMENSIONS).some(k=>!finite(s.weights[k],0,100))||!Object.keys(DIMENSIONS).some(k=>s.weights[k]>0)) errors.push('משקולות לא תקינות');
  if(db.cars.length>500) errors.push('מקסימום 500 רכבים');
  const ids=new Set();
  db.cars.forEach((c,i)=>{
    const p=`רכב ${i+1}`;
    if(!obj(c)){errors.push(`${p}: מבנה לא תקין`);return;}
    if(!str(c.id,80)||!c.id.trim()||ids.has(c.id)) errors.push(`${p}: מזהה חסר או כפול`); ids.add(c.id);
    for(const k of ['name','variant','notes','source_url','checked_at','flags','plate','model_research','vehicle_research']) if(!str(c[k])) errors.push(`${p}.${k}: נדרש טקסט`);
    if(c.plate && !/^\d{7,8}$/.test(c.plate)) errors.push(`${p}: מספר רישוי צריך לכלול 7-8 ספרות`);
    if(!['ai','personal','demo','unknown'].includes(c.rating_origin)) errors.push(`${p}: מקור דירוג לא תקין`);
    if(!c.name?.trim()) errors.push(`${p}: שם חסר`);
    if(c.source_url && !/^https?:\/\//i.test(c.source_url)) errors.push(`${p}: כתובת מקור חייבת להתחיל ב-http או https`);
    if(c.checked_at && (!/^\d{4}-\d{2}-\d{2}$/.test(c.checked_at)||Number.isNaN(Date.parse(c.checked_at)))) errors.push(`${p}: תאריך בפורמט YYYY-MM-DD`);
    for(const k of ['price','km']) if(c[k]!==null&&!finite(c[k])) errors.push(`${p}.${k}: מספר לא שלילי או null`);
    if(c.year!==null&&(!Number.isInteger(c.year)||c.year<1900||c.year>2100)) errors.push(`${p}: שנת רכב לא תקינה`);
    if(!['used','new','zero-km'].includes(c.purchase_type)) errors.push(`${p}: סוג רכישה לא תקין`);
    if(!['petrol','diesel','hybrid','electric','other','unknown'].includes(c.fuel)) errors.push(`${p}: סוג הנעה לא תקין`);
    if(!['automatic','manual','unknown'].includes(c.transmission)) errors.push(`${p}: תיבה לא תקינה`);
    if(!STATUSES.includes(c.status)||typeof c.hidden!=='boolean') errors.push(`${p}: סטטוס או הסתרה לא תקינים`);
    if(c.personal_rating!==null&&(!Number.isInteger(c.personal_rating)||!finite(c.personal_rating,1,5))) errors.push(`${p}: דירוג אישי 1-5 או null`);
    if(!obj(c.scores)||Object.keys(DIMENSIONS).some(k=>!obj(c.scores[k]) || (c.scores[k].value!==null&&!finite(c.scores[k].value,1,10)) || !str(c.scores[k].reason))) errors.push(`${p}: דירוגי ממדים לא תקינים`);
    const t=c.costs;
    if(!obj(t)||!obj(t.annual)){errors.push(`${p}: חסר מבנה עלויות`);return;}
    if(!Number.isInteger(t.horizon_months)||t.horizon_months<1||t.horizon_months>120) errors.push(`${p}: תקופת הערכת העלות לא תקינה`);
    for(const k of Object.keys(ANNUAL)) if(t.annual[k]!==null&&!finite(t.annual[k])) errors.push(`${p}: annual.${k} לא תקין`);
    for(const k of ['resale','resale_low','resale_high','one_time']) if(t[k]!==null&&!finite(t[k])) errors.push(`${p}: costs.${k} לא תקין`);
    if(t.resale_low!==null&&t.resale!==null&&t.resale_low>t.resale) errors.push(`${p}: מכירה נמוכה מעל הבסיס`);
    if(t.resale_high!==null&&t.resale!==null&&t.resale_high<t.resale) errors.push(`${p}: מכירה גבוהה מתחת לבסיס`);
    if(!str(t.assumptions)) errors.push(`${p}: נדרש תיאור הנחות העלות`);
    if(t.loan!==null){
      const l=t.loan;
      if(!obj(l)||!finite(l.principal,0.01)||!finite(l.annual_rate,0,100)||!Number.isInteger(l.months)||l.months<1||l.months>120||!finite(l.balloon)||l.balloon>l.principal||!finite(l.fees)) errors.push(`${p}: תנאי הלוואה לא תקינים`);
      else if(c.price!==null&&l.principal>c.price) errors.push(`${p}: המחשבון תומך בקרן שאינה גבוהה ממחיר הרכב`);
    }
  });
  return errors;
}
export function loanSchedule(l,holdMonths=l.months) {
  const r=l.annual_rate/1200,n=l.months,p=l.principal,b=l.balloon;
  const growthMinusOne=Math.expm1(n*Math.log1p(r));
  const payment=r===0?(p-b)/n:((p-b)+p*growthMinusOne)*r/growthMinusOne;
  let balance=p,interest=0,paid=0;
  for(let m=1;m<=Math.min(n,holdMonths);m++){
    const charge=balance*r; interest+=charge;
    const due=m===n?payment+b:payment;
    paid+=due; balance=Math.max(0,balance+charge-due);
  }
  return {payment,interest,paid,balance:balance<1e-7?0:balance,total_scheduled:payment*n+b+l.fees,finance_cost_total:payment*n+b-p+l.fees};
}
export function costs(c,months){
  const t=c.costs,missing=[];
  if(t.horizon_months!==months)missing.push(`עדכון הערכת מכירה מ-${t.horizon_months} ל-${months} חודשים`);
  if(c.price===null)missing.push('מחיר');
  if(t.resale===null)missing.push('שווי מכירה');
  if(t.one_time===null)missing.push('הוצאות חד־פעמיות');
  for(const [k,label] of Object.entries(ANNUAL)) if(t.annual[k]===null)missing.push(label);
  if(missing.length)return {complete:false,missing};
  const operating=Object.keys(ANNUAL).reduce((sum,k)=>sum+t.annual[k],0)*months/12;
  const loan=t.loan?loanSchedule(t.loan,months):{payment:0,interest:0,paid:0,balance:0};
  const fees=t.loan?.fees??0;
  const depreciation=c.price-t.resale;
  const total=depreciation+operating+t.one_time+loan.interest+fees;
  const upfront=c.price-(t.loan?.principal??0)+t.one_time+fees;
  const cash_before_sale=upfront+operating+loan.paid;
  return {complete:true,total,monthly:total/months,depreciation,operating,upfront,cash_before_sale,net_sale:t.resale-loan.balance,loan,
    low:t.resale_high===null?null:total+t.resale-t.resale_high,
    high:t.resale_low===null?null:total+t.resale-t.resale_low};
}
export function fit(c,s){
  const failed=[],unknown=[];
  for(const [key,limit,label] of [['price',s.budget,'תקציב'],['km',s.max_km,'ק״מ']]){
    if(limit===null)continue;
    if(c[key]===null)unknown.push(label); else if(c[key]>limit)failed.push(label);
  }
  if(s.automatic_only){if(c.transmission==='unknown')unknown.push('תיבה');else if(c.transmission!=='automatic')failed.push('תיבה');}
  return {failed,unknown,state:failed.length?'fail':unknown.length?'pending':'pass'};
}
export function score(c,weights){
  let weighted=0,total=0;
  for(const k of Object.keys(DIMENSIONS)){
    if(weights[k]===0)continue;
    if(c.scores[k].value===null||!c.scores[k].reason.trim())return null;
    weighted+=c.scores[k].value*weights[k];total+=weights[k];
  }
  return total?weighted/total*10:null;
}
export function blankCar(){return {id:globalThis.crypto?.randomUUID?.()??`car-${Date.now()}`,name:'',variant:'',plate:'',model_research:'',vehicle_research:'',rating_origin:'unknown',year:null,km:null,price:null,purchase_type:'used',fuel:'unknown',transmission:'unknown',status:'לבדוק',hidden:false,personal_rating:null,source_url:'',checked_at:'',notes:'',flags:'',scores:Object.fromEntries(Object.keys(DIMENSIONS).map(k=>[k,{value:null,reason:''}])),costs:{horizon_months:36,resale:null,resale_low:null,resale_high:null,one_time:null,annual:Object.fromEntries(Object.keys(ANNUAL).map(k=>[k,null])),loan:null,assumptions:''}};}
export function emptyDB(){return {version:1,summary:{stage:'',recommendation:'',rationale:'',tradeoff:'',next_action:'',updated_at:'',coverage:''},settings:{usage:'',must_haves:'',top_priority:'',months:36,budget:null,max_km:null,automatic_only:false,weights:Object.fromEntries(Object.keys(DIMENSIONS).map(k=>[k,20]))},cars:[]};}
