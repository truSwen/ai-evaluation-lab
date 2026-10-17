export const DATASETS=Object.freeze(['mixed','imbalanced','unlabelled','positive-only']);
const row=(id,score,label,extra={})=>({id:`demo-${id}`,score,predictedAt:'2026-01-01',windowEndsAt:'2026-01-31',outcome:label===null?null:{value:label,observedAt:'2026-01-10',recordedAt:'2026-01-11'},synthetic:true,...extra});
export function fixture(name='mixed',threshold=0.5,asOf='2026-01-15'){
 if(!DATASETS.includes(name))throw new Error('UNKNOWN_DATASET');let records;
 if(name==='mixed')records=[row('a',.9,true),row('b',.7,true),row('c',.6,false),row('d',.2,false),row('e',.4,true),row('f',.1,false),row('g',.8,true),row('h',.55,false),row('i',.65,null),row('j',.3,null,{predictedAt:'2025-12-11',windowEndsAt:'2026-01-10'}),row('k',.9,true,{outcome:{value:true,observedAt:'2026-01-10',recordedAt:'2026-02-01'}}),row('l',.15,false,{outcome:{value:false,observedAt:'2026-02-05',recordedAt:'2026-02-06'}}),row('m',.5,null,{predictedAt:'2026-02-01',windowEndsAt:'2026-03-01'})];
 if(name==='imbalanced')records=Array.from({length:20},(_,i)=>row(`imb-${i}`,i===19?.4:.1,i===19));
 if(name==='unlabelled')records=[.2,.4,.7,.9].map((score,i)=>row(`unknown-${i}`,score,null,{predictedAt:'2025-12-11',windowEndsAt:'2026-01-10'}));
 if(name==='positive-only')records=[.2,.4,.8,.9].map((score,i)=>row(`pos-${i}`,score,true));
 return{asOf,threshold,records};
}
