// Statische server voor de prototypes in deze map.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 8731;
const TYPES = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8',
  '.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json; charset=utf-8'};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.join(ROOT, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) {
      if (rel === '/index.html' || rel === '/') { res.writeHead(404).end('Niet gevonden'); return; }
      res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
      const list = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))
        .map(f => `<li><a href="/${f}">${f}</a></li>`).join('');
      res.end(`<meta charset="utf-8"><title>Prototypes</title><h1>Prototypes</h1><ul>${list}</ul>`);
      return;
    }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(PORT, () => console.log(`Prototype-server op http://localhost:${PORT}`));
