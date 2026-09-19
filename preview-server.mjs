// Local static preview server. Not shipped (see plan/02-BUILD-SPEC.md ship list).
// Usage: node preview-server.mjs [root] [port]   defaults: this file's folder, 8095
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve as resolvePath, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const portArg = args.find((a) => /^\d+$/.test(a));
const rootArg = args.find((a) => !/^\d+$/.test(a));
const ROOT = resolvePath(rootArg || dirname(fileURLToPath(import.meta.url)));
const PORT = Number(portArg || process.env.PORT || 8095);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.webmanifest': 'application/manifest+json',
};

async function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const rel = normalize(clean).replace(/^([/\\])+/, '');
  if (rel.split(/[/\\]/).includes('..')) return null;
  const abs = join(ROOT, rel);
  if (!abs.startsWith(ROOT + sep) && abs !== ROOT) return null;
  try {
    const s = await stat(abs);
    if (s.isDirectory()) {
      const index = join(abs, 'index.html');
      await stat(index);
      return index;
    }
    return abs;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url || '/');
  if (!file) {
    const custom = await resolve('/404.html');
    const body = custom ? await readFile(custom) : 'Not found\n';
    res.writeHead(404, { 'content-type': custom ? TYPES['.html'] : TYPES['.txt'] });
    res.end(body);
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-store',
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { 'content-type': TYPES['.txt'] });
    res.end('Server error: ' + err.message + '\n');
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log(`preview: http://localhost:${PORT}/  (root ${ROOT})`);
  console.log(`home design: http://localhost:${PORT}/docs/opus-home-preview.html`);
});
