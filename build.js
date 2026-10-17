import {mkdir,copyFile,writeFile} from 'node:fs/promises';
await mkdir(new URL('./dist/',import.meta.url),{recursive:true});
for(const name of ['index.html','app.js','style.css','engine.js','fixtures.js'])await copyFile(new URL(name,import.meta.url),new URL(`dist/${name}`,import.meta.url));
await writeFile(new URL('dist/_headers',import.meta.url),"/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'\n");
await writeFile(new URL('dist/404.html',import.meta.url),'<!doctype html><html lang="en"><title>Not found</title><p>Page not found. <a href="/">Open the synthetic evaluation lab.</a></p></html>');
