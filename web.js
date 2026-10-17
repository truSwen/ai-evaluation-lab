import http from 'node:http';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const assets=new Map([['/',['index.html','text/html; charset=utf-8']],['/app.js',['app.js','text/javascript; charset=utf-8']],['/engine.js',['engine.js','text/javascript; charset=utf-8']],['/fixtures.js',['fixtures.js','text/javascript; charset=utf-8']],['/style.css',['style.css','text/css; charset=utf-8']]]);
export function createWebServer(){return http.createServer((req,res)=>{
 const send=(status,type,body)=>{res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'"});res.end(body);};
 const host=`127.0.0.1:${req.socket.localPort}`;
 if(req.headers.host!==host||(req.headers.origin&&req.headers.origin!==`http://${host}`))return send(403,'text/plain','Local requests only');
 if(req.method!=='GET')return send(405,'text/plain','GET only');
 const route=new URL(req.url,'http://localhost').pathname;
 if(!assets.has(route))return send(404,'text/plain','Not found');
 const [file,type]=assets.get(route);send(200,type,readFileSync(new URL(file,import.meta.url)));
});}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const port=Number(process.env.DEMO_PORT||8769);createWebServer().listen(port,'127.0.0.1',()=>console.log(`Open http://127.0.0.1:${port}`));}
