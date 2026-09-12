import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8080);
const mime = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".md":"text/markdown; charset=utf-8",".txt":"text/plain; charset=utf-8"};
http.createServer((req,res)=>{
  const raw=decodeURIComponent((req.url||"/").split("?")[0]);
  const rel=raw==="/"?"index.html":raw.replace(/^\/+/,"");
  const file=path.resolve(__dirname,rel);
  if(!file.startsWith(__dirname+path.sep)){res.writeHead(403);return res.end("Forbidden");}
  fs.stat(file,(err,st)=>{if(err||!st.isFile()){res.writeHead(404);return res.end("Not found");}
    res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream","Cache-Control":"public, max-age=300"});
    fs.createReadStream(file).pipe(res);
  });
}).listen(port,"0.0.0.0",()=>console.log(`Shapes Garden listening on ${port}`));
