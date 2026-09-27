// Post-deploy smoke test against the live (or staging) origin. Read-only: GET/HEAD only, never submits a lead.
// Usage: node deploy/smoke.mjs [https://babyshower.com.py]
import { readFileSync } from 'node:fs';

const origin = (process.argv[2] || 'https://babyshower.com.py').replace(/\/$/, '');
const routes = JSON.parse(readFileSync(new URL('../docs/routes.json', import.meta.url), 'utf8'));
const manifest = routes.routes || routes;
let failed = 0;
const check = (ok, label, detail = '') => { if (!ok) failed++; console.log(`${ok ? 'PASS' : 'FAIL'}: ${label}${detail ? ' — ' + detail : ''}`); };
const get = path => fetch(origin + path, { redirect: 'manual', headers: { 'user-agent': 'babyshower-smoke/1' } });

const home = await get('/');
const html = await home.text();
check(home.status === 200, 'home returns 200', String(home.status));
check(home.headers.get('x-content-type-options') === 'nosniff', 'nosniff header on HTML', home.headers.get('x-content-type-options') || 'missing');

// A plain GET must reach PHP and redirect; a host error page here means every form submission fails.
const lead = await get('/lead-forward.php');
check(lead.status === 303 && /\/contacto\/$/.test(lead.headers.get('location') || ''), 'PHP runs: GET /lead-forward.php redirects to /contacto/', `${lead.status} ${lead.headers.get('location') || ''}`);

for (const path of ['/.git/config', '/docs/routes.json', '/content.mjs', '/REVIEW.md', '/assets/img/manifest.json', '/deploy/smoke.mjs']) {
  const res = await get(path);
  check(res.status === 403 || res.status === 404, `private path blocked: ${path}`, String(res.status));
}

const missing = await get('/__smoke-missing-page__/');
check(missing.status === 404, 'unknown URL returns 404', String(missing.status));

const css = html.match(/href="(\/assets\/css\/site\.css\?v=[0-9a-f]{12})"/)?.[1];
if (css) {
  const res = await get(css);
  check(res.status === 200 && /immutable/.test(res.headers.get('cache-control') || ''), 'versioned CSS is immutable', res.headers.get('cache-control') || '');
} else check(false, 'home links versioned CSS');

const sitemap = await (await get('/sitemap.xml')).text();
const locs = (sitemap.match(/<loc>/g) || []).length;
check(locs === manifest.length, 'sitemap lists every manifest route', `${locs}/${manifest.length}`);

let bad = [];
for (const row of manifest) {
  const res = await get(row.route);
  if (res.status !== 200) bad.push(`${row.route} ${res.status}`);
}
check(bad.length === 0, `all ${manifest.length} routes return 200`, bad.slice(0, 5).join(', '));

console.log(failed ? `${failed} check(s) failed on ${origin}` : `All smoke checks passed on ${origin}`);
process.exitCode = failed ? 1 : 0;
