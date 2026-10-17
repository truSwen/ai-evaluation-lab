import{evaluate}from'./engine.js';import{fixture,DATASETS}from'./fixtures.js';
const results=[];for(const dataset of DATASETS)results.push({dataset,report:await evaluate(fixture(dataset))});results.push({dataset:'mixed-later-cutoff',report:await evaluate(fixture('mixed',.5,'2026-02-15'))});console.log(JSON.stringify({synthetic:true,results},null,2));
