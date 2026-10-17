import{evaluate}from'./engine.js';import{fixture}from'./fixtures.js';
const $=id=>document.getElementById(id);let report;
const percent=value=>value===null?'Not defined':`${(value*100).toFixed(1)}%`;
function node(tag,text){const el=document.createElement(tag);el.textContent=text;return el;}
function renderRows(){const rows=report.rows.filter(r=>!$('errors').checked||r.cell==='fp'||r.cell==='fn');$('rows').replaceChildren();for(const r of rows){const tr=node('tr','');for(const v of [r.id,r.score.toFixed(2),r.predictedPositive===null?'Excluded':r.predictedPositive?'Positive':'Negative',r.label===null?'Not available':r.label?'Positive':'Negative',r.status,r.cell?r.cell.toUpperCase():r.reason])tr.append(node('td',v));$('rows').append(tr);}if(!rows.length){const tr=node('tr',''),td=node('td','No records match this view.');td.colSpan=6;tr.append(td);$('rows').append(tr);}$('rowCount').textContent=`Showing ${rows.length} of ${report.total} synthetic records. The filter does not change the metrics.`;}
async function run(){
 $('run').disabled=true;
 try{report=await evaluate(fixture($('dataset').value,Number($('threshold').value),$('cutoff').value));$('status').textContent=`${report.scored} scored / ${report.total} synthetic records`;
 $('metrics').replaceChildren();for(const[key,title]of[['accuracy','Accuracy'],['precision','Precision'],['recall','Recall'],['coverage','Label coverage'],['f1','F1 score'],['specificity','Specificity']]){const m=report.metrics[key],card=node('div','');card.append(node('span',title),node('strong',percent(m.value)),node('small',m.denominator===0?'Denominator is zero':`${m.numerator} / ${m.denominator}`));$('metrics').append(card);}
 $('baseline').textContent=`Majority-class reference (scored labels): ${percent(report.metrics.majorityBaseline.value)}. Balanced accuracy: ${percent(report.balancedAccuracy)}. These are fixture results, not real model performance.`;
 $('warnings').textContent=report.warnings.join(' ');
 for(const id of['tp','fp','tn','fn','pending','unlabelled','excluded'])$(id).textContent=String(report.counts[id]);
 $('json').textContent=JSON.stringify(report,null,2);renderRows();
 }catch(error){$('status').textContent=`Refused: ${error.code||'EVALUATION_FAILED'}`;$('warnings').textContent='No confirmed evaluation result. Reload this page before retrying.';}
 finally{$('run').disabled=false;}
}
$('controls').addEventListener('submit',event=>{event.preventDefault();run();});$('errors').addEventListener('change',()=>{if(report)renderRows();});run();
