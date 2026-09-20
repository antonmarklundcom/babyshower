import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompress, gzip } from 'node:zlib';
import { promisify } from 'node:util';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.avif':'image/avif', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.woff2':'font/woff2', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.webmanifest':'application/manifest+json' };
const textExtensions = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt', '.webmanifest']);
const compress = { br: promisify(brotliCompress), gzip: promisify(gzip) };

async function send(request, response, status, headers, data, extension) {
  if (textExtensions.has(extension)) {
    headers.Vary = 'Accept-Encoding';
    const accepted = (request.headers['accept-encoding'] || '').toLowerCase().split(',').map(value => {
      const [name, ...parameters] = value.trim().split(';');
      const quality = parameters.find(parameter => parameter.trim().startsWith('q='));
      return { name: name.trim(), quality: quality ? Number(quality.trim().slice(2)) : 1 };
    });
    const encoding = ['br', 'gzip'].find(name => accepted.some(item => item.name === name && item.quality > 0));
    if (encoding) {
      data = await compress[encoding](data);
      headers['Content-Encoding'] = encoding;
    }
  }
  headers['Content-Length'] = Buffer.byteLength(data);
  response.writeHead(status, headers);
  response.end(data);
}

http.createServer(async (request, response) => {
  try {
    const urlPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    if (request.method !== 'GET' && request.method !== 'HEAD') { await send(request, response, 405, {}, 'Static preview only', '.txt'); return; }
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    let filePath = join(root, safe);
    const rel = relative(root, filePath);
    if (rel.startsWith('..') || isAbsolute(rel) || /(?:^|[\\/])\.|\.(?:php|mjs|log)$|vendercrm-config/i.test(rel) || /^(?:plan|docs|codex-input|dist|deploy)(?:[\\/]|$)/i.test(rel)) throw new Error('Private path');
    try { if ((await stat(filePath)).isDirectory()) filePath = join(filePath, 'index.html'); } catch {}
    if (!extname(filePath)) filePath += '.html';
    const data = await readFile(filePath);
    const extension = extname(filePath);
    await send(request, response, 200, { 'Content-Type': extension === '.html' ? 'text/html; charset=utf-8' : (mime[extension] || 'application/octet-stream'), 'Cache-Control':'no-store' }, data, extension);
  } catch {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    try { await send(request, response, 404, {'Content-Type':'text/html; charset=utf-8'}, await readFile(join(root, '404.html')), '.html'); }
    catch { if (!response.headersSent) response.writeHead(404); response.end('Not found'); }
  }
}).listen(port, '127.0.0.1', () => console.log(`Baby Shower preview: http://127.0.0.1:${port}`));
