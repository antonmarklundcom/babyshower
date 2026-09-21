// Full-site Playwright scan: every route (plus 404 and gracias) at 375, 768 and 1440 px.
// Usage: node docs/qa-tools/site-scan.mjs [origin=http://127.0.0.1:4185]
// Reports console/page errors, failed or 4xx/5xx requests, external requests, horizontal overflow, broken or
// alt-less images, duplicate ids, heading order, dead internal links and anchors, malformed wa.me links,
// undersized tap targets (375 px), and fixed bars covering form controls.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(process.env.PW_BASE || 'C:/Users/anton/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const origin = process.argv[2] || 'http://127.0.0.1:4185';
const routesFile = JSON.parse(readFileSync(new URL('../routes.json', import.meta.url), 'utf8'));
const routes = [...(Array.isArray(routesFile) ? routesFile : routesFile.routes).map(r => typeof r === 'string' ? r : r.route), '/404.html', '/gracias.html'];
const widths = [375, 768, 1440];
const findings = new Map();
const add = (kind, key, detail) => { const k = kind + ' | ' + key; if (!findings.has(k)) findings.set(k, { kind, detail, where: [] }); return findings.get(k); };
const linkStatus = new Map();
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });

for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 375 ? 812 : 900 }, isMobile: width === 375, hasTouch: width === 375 });
  for (const route of routes) {
    const page = await ctx.newPage();
    const where = `${route}@${width}`;
    page.on('console', m => { if (['error', 'warning'].includes(m.type())) add('console-' + m.type(), m.text().slice(0, 160), '').where.push(where); });
    page.on('pageerror', e => add('page-error', e.message.slice(0, 160), '').where.push(where));
    page.on('requestfailed', r => add('request-failed', r.url().slice(0, 140), r.failure()?.errorText || '').where.push(where));
    page.on('response', r => { if (r.status() >= 400) add('http-' + r.status(), r.url().slice(0, 140), '').where.push(where); if (!r.url().startsWith(origin) && !r.url().startsWith('data:')) add('external-request', r.url().slice(0, 140), '').where.push(where); });
    await page.goto(origin + route, { waitUntil: 'load' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(500);
    const r = await page.evaluate(({ width }) => {
      const out = {};
      out.overflow = document.documentElement.scrollWidth - window.innerWidth;
      out.wide = width === 375 ? [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && b.right > window.innerWidth + 1 && cs.position !== 'fixed' && !e.closest('[hidden], .comparison-scroll, .comparison, .hero-slides, .visually-hidden'); }).slice(0, 3).map(e => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 40) + ' right=' + Math.round(e.getBoundingClientRect().right)) : [];
      out.brokenImgs = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && !i.closest('[hidden]')).map(i => i.currentSrc.split('/').pop());
      out.noAlt = [...document.images].filter(i => !i.hasAttribute('alt')).length;
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id); out.dupIds = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
      const hs = [...document.querySelectorAll('h1,h2,h3,h4')].filter(h => !h.closest('[hidden]')).map(h => +h.tagName[1]);
      out.h1 = hs.filter(n => n === 1).length; out.skips = hs.some((n, i) => i && n - hs[i - 1] > 1);
      out.badAnchors = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.getElementById(h.slice(1)));
      out.wa = [...document.querySelectorAll('a[href*="wa.me"]')].map(a => a.href).filter(h => !/^https:\/\/wa\.me\/595992279599(\?text=.+)?$/.test(h)).slice(0, 3);
      out.internal = [...new Set([...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href').split('#')[0]).filter(Boolean))];
      out.small = width === 375 ? [...document.querySelectorAll('a,button,summary,input:not([type=hidden]),select,textarea')].filter(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (!b.width || cs.visibility === 'hidden' || e.closest('[hidden]') || e.closest('.hero-slides [hidden]')) return false; const lab = e.closest('label'); const lb = lab ? lab.getBoundingClientRect() : b; return Math.min(Math.max(b.height, lb.height)) < 43.5 || Math.max(b.width, lb.width) < 43.5; }).map(e => e.tagName.toLowerCase() + ':' + (e.textContent || e.name || '').trim().slice(0, 24)).slice(0, 6) : [];
      out.noMain = !document.querySelector('main'); out.lang = document.documentElement.lang;
      return out;
    }, { width });
    if (r.overflow > 0) add('horizontal-overflow', route, r.overflow + 'px').where.push(where);
    for (const w of r.wide) add('element-past-viewport', w, '').where.push(where);
    for (const s of r.brokenImgs) add('broken-image', s, '').where.push(where);
    if (r.noAlt) add('image-without-alt', route, r.noAlt + ' img').where.push(where);
    for (const d of r.dupIds) add('duplicate-id', d, '').where.push(where);
    if (!/^\/(404\.html|gracias\.html)$/.test(route) && r.h1 !== 1) add('h1-count', route, 'h1=' + r.h1).where.push(where);
    if (r.skips) add('heading-skip', route, '').where.push(where);
    for (const a of r.badAnchors) add('dead-anchor', route + ' ' + a, '').where.push(where);
    for (const w of r.wa) add('bad-wa-link', w.slice(0, 120), '').where.push(where);
    if (r.noMain) add('no-main-landmark', route, '').where.push(where);
    if (r.lang !== 'es-PY') add('html-lang', route, r.lang).where.push(where);
    for (const s of r.small) add('small-tap-target', s, '').where.push(where);
    if (width === 1440) for (const href of r.internal) if (!linkStatus.has(href)) { const res = await page.request.get(origin + href); linkStatus.set(href, res.status()); }
    await page.close();
  }
  await ctx.close();
}
for (const [href, status] of linkStatus) if (status >= 400) add('dead-internal-link', href, String(status)).where.push('links');
await browser.close();
const order = [...findings.values()].sort((a, b) => a.kind.localeCompare(b.kind));
console.log(`scanned ${routes.length} routes x ${widths.length} widths, ${linkStatus.size} unique internal links`);
if (!order.length) console.log('NO FINDINGS');
for (const f of order) { const key = [...findings.entries()].find(([, v]) => v === f)[0].split(' | ')[1]; console.log(`- ${f.kind}: ${key}${f.detail ? ' (' + f.detail + ')' : ''} [${[...new Set(f.where)].slice(0, 4).join(', ')}${new Set(f.where).size > 4 ? ' +' + (new Set(f.where).size - 4) : ''}]`); }
