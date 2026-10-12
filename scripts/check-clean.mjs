// Stale-output guard: rebuild the site, then fail if any generated file differs from git.
// Node built-ins only. Run with `npm run check:clean`.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const GENERATED_EXACT = new Set([
  'index.html',
  '404.html',
  'gracias.html',
  'sitemap.xml',
  'lead-forward.php',
  'lead-defaults.php',
  'docs/routes.json',
]);

function isGenerated(file) {
  if (file.startsWith('docs/archive/')) return false;
  return GENERATED_EXACT.has(file) || file.endsWith('/index.html');
}

try {
  execFileSync(process.execPath, ['build-site.mjs'], { cwd: root, stdio: 'inherit' });
} catch (err) {
  console.error('FAIL check:clean: the build did not complete.');
  process.exit(err.status || 1);
}

// -z: NUL-separated, unquoted paths. Records are "XY path"; a rename/copy record is
// followed by one extra NUL-separated entry holding the original path.
const raw = execFileSync(
  'git',
  ['status', '--porcelain=v1', '-z', '--untracked-files=all'],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
const parts = raw.split('\0').filter(Boolean);
const changed = [];
for (let i = 0; i < parts.length; i++) {
  const entry = parts[i];
  const code = entry.slice(0, 2);
  const file = entry.slice(3);
  if (/[RC]/.test(code)) {
    i++;
    const orig = parts[i];
    if (orig && isGenerated(orig)) changed.push(`${code} ${orig}`);
  }
  if (isGenerated(file)) changed.push(`${code} ${file}`);
}

if (changed.length) {
  console.error('FAIL check:clean: Generated files differ from the commit. Run npm run build and commit the output together with the source.');
  console.error('Changed generated files (git status code, path):');
  for (const line of changed) console.error(`  ${line}`);
  process.exit(1);
}

console.log('PASS check:clean: generated output matches the commit.');
