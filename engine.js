export const NOTICE='Synthetic predictions and outcomes only. No real model performance, client results or LLM calls.';
export class Refused extends Error{constructor(code){super(code);this.code=code;this.name='Refused';}}
function exact(value,keys,code){if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==keys.length||keys.some(k=>!Object.hasOwn(value,k)))throw new Refused(code);}
function day(value){if(typeof value!=='string'||!/^20\d{2}-\d{2}-\d{2}$/.test(value))throw new Refused('INVALID_DATE');const n=Date.parse(`${value}T00:00:00.000Z`);if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==value)throw new Refused('INVALID_DATE');return n;}
const ratio=(numerator,denominator)=>({numerator,denominator,value:denominator===0?null:numerator/denominator});
export async function evaluate(input){
 exact(input,['asOf','threshold','records'],'INVALID_INPUT');const cutoff=day(input.asOf);
 if(typeof input.threshold!=='number'||!Number.isFinite(input.threshold)||input.threshold<0||input.threshold>1)throw new Refused('INVALID_THRESHOLD');
 if(!Array.isArray(input.records)||input.records.length>500)throw new Refused('INVALID_RECORDS');
 const seen=new Set();const clean=input.records.map(r=>{
  exact(r,['id','score','predictedAt','windowEndsAt','outcome','synthetic'],'INVALID_RECORD');
  if(typeof r.id!=='string'||!/^demo-[a-z0-9-]{1,30}$/.test(r.id)||seen.has(r.id))throw new Refused('INVALID_ID');seen.add(r.id);
  if(typeof r.score!=='number'||!Number.isFinite(r.score)||r.score<0||r.score>1)throw new Refused('INVALID_SCORE');
  if(r.synthetic!==true)throw new Refused('SYNTHETIC_ONLY');
  const predicted=day(r.predictedAt),end=day(r.windowEndsAt);if(end<predicted)throw new Refused('INVALID_WINDOW');
  let outcome=null;if(r.outcome!==null){exact(r.outcome,['value','observedAt','recordedAt'],'INVALID_OUTCOME');if(typeof r.outcome.value!=='boolean')throw new Refused('INVALID_LABEL');const observed=day(r.outcome.observedAt),recorded=day(r.outcome.recordedAt);if(observed<predicted||recorded<observed)throw new Refused('INVALID_OUTCOME_TIME');outcome={value:r.outcome.value,observedAt:r.outcome.observedAt,recordedAt:r.outcome.recordedAt};}
  return{id:r.id,score:r.score,predictedAt:r.predictedAt,windowEndsAt:r.windowEndsAt,outcome,synthetic:true};
 }).sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0);
 const counts={tp:0,fp:0,tn:0,fn:0,pending:0,unlabelled:0,excluded:0};
 const rows=clean.map(r=>{
  const predicted=day(r.predictedAt),end=day(r.windowEndsAt),o=r.outcome;
  let status,reason,label=null,cell=null;
  const predictedPositive=r.score>=input.threshold;
  if(predicted>cutoff){status='excluded';reason='Prediction occurs after the evaluation cutoff.';}
  else if(o&&day(o.observedAt)<=end&&day(o.observedAt)<=cutoff&&day(o.recordedAt)<=cutoff){status='scored';reason='Outcome is within its window and was recorded by the cutoff.';label=o.value;cell=predictedPositive?(label?'tp':'fp'):(label?'fn':'tn');counts[cell]++;}
  else if(cutoff<end){status='pending';reason='The outcome window is still open; no eligible known label.';}
  else{status='unlabelled';reason=o&&day(o.observedAt)<=cutoff&&day(o.recordedAt)<=cutoff&&day(o.observedAt)>end?'The outcome falls outside the allowed window.':'The window closed without an eligible known outcome at this cutoff.';}
  if(status!=='scored')counts[status]++;
  return{id:r.id,score:r.score,predictedPositive:status==='excluded'?null:predictedPositive,status,label,cell,reason};
 });
 const {tp,fp,tn,fn}=counts,n=tp+fp+tn+fn,eligible=clean.length-counts.excluded;
 const recall=ratio(tp,tp+fn),specificity=ratio(tn,tn+fp);
 const metrics={accuracy:ratio(tp+tn,n),precision:ratio(tp,tp+fp),recall,specificity,f1:ratio(2*tp,2*tp+fp+fn),coverage:ratio(n,eligible),majorityBaseline:ratio(Math.max(tp+fn,tn+fp),n)};
 const balancedAccuracy=recall.value===null||specificity.value===null?null:(recall.value+specificity.value)/2;
 const canonical=JSON.stringify({policy:'synthetic-binary-eval-v1',asOf:input.asOf,threshold:input.threshold,records:clean});
 const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(canonical));
 const fingerprint=[...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');
 return{synthetic:true,notice:NOTICE,policy:'synthetic-binary-eval-v1',asOf:input.asOf,threshold:input.threshold,inputFingerprint:fingerprint,
  counts,scored:n,total:clean.length,eligible,metrics,balancedAccuracy,smallSample:n<30,
  warnings:[...(n<30?['Small illustrative sample: fewer than 30 scored records. This arbitrary demo flag is not a statistical sufficiency test.']:[]),...(n===0?['No eligible labels: performance metrics are undefined.']:[]),...((tp+fn===0||tn+fp===0)&&n>0?['Only one true class is represented; balanced accuracy is undefined.']:[])],rows};
}
