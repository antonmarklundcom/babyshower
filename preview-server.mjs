import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.avif':'image/avif', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.woff2':'font/woff2', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.webmanifest':'application/manifest+json' };

http.createServer(async (request, response) => {
  try {
    const urlPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405); response.end('Static preview only'); return; }
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = join(root, safe);
    const rel = relative(root, filePath);
    if (rel.startsWith('..') || isAbsolute(rel) || /(?:^|[\\/])\.|\.(?:php|mjs|log)$|vendercrm-config/i.test(rel) || /^(?:plan|docs|codex-input|dist|deploy)(?:[\\/]|$)/i.test(rel)) throw new Error('Private path');
    try { if ((await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html'); } catch {}
    if (!extname(filePath)) filePath += '.html';
    const data = await readFile(filePath);
    const extension = extname(filePath);
    response.writeHead(200, { 'Content-Type': extension === '.html' ? 'text/html; charset=utf-8' : (mime[extension] || 'application/octet-stream'), 'Cache-Control':'no-store' });
    response.end(data);
  } catch {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    try { response.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}); response.end(await readFile(join(root, '404.html'))); }
    catch { if (!response.headersSent) response.writeHead(404); response.end('Not found'); }
  }
}).listen(port, '127.0.0.1', () => console.log(`Baby Shower preview: http://127.0.0.1:${port}`));
