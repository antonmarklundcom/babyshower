import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire('C:/Users/anton/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const routes = JSON.parse(readFileSync('C:/Claude 1/babyshower/docs/routes.json', 'utf8'));
const list = (Array.isArray(routes) ? routes : routes.routes || Object.keys(routes)).map(r => typeof r === 'string' ? r : r.route || r.path);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
const agg = {};
for (const r of [...list, '/gracias.html', '/404.html']) {
  await page.goto('http://127.0.0.1:4185' + r, { waitUntil: 'load' });
  const bad = await page.evaluate(() => [...document.querySelectorAll('a,button,input:not([type=hidden]):not(.sr-only),select,summary,textarea')].filter(e => {
    const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') return false;
    if (e.closest('[hidden],.sr-only')) return false;
    const rc = e.getBoundingClientRect(); if (!rc.width || !rc.height) return false;
    if (e.tagName === 'A' && e.closest('p') && s.display === 'inline') return false;
    if (e.matches('.skip,.skip-link,[class*=skip]')) return false;
    return rc.height < 43.5 || (rc.width < 43.5 && !e.closest('p,li'));
  }).map(e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '') + ':' + Math.round(e.getBoundingClientRect().height) + 'x' + Math.round(e.getBoundingClientRect().width)));
  for (const b of bad) (agg[b] ||= new Set()).add(r);
}
for (const [k, v] of Object.entries(agg)) console.log(k, '->', v.size, 'pages', [...v].slice(0, 3).join(' '));
if (!Object.keys(agg).length) console.log('no undersized targets');
await browser.close();
