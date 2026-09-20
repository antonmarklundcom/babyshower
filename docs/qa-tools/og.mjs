// Usage: node docs/qa-tools/og.mjs (installed Chrome and global Playwright).
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { SITE, PAGES, UI } from '../../content.mjs';

const require = createRequire(process.env.PW_BASE || 'C:/Users/anton/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const photo = readFileSync(new URL('../../assets/img/hero-baby-shower-quincho-1920.webp', import.meta.url)).toString('base64');
const output = new URL('../../assets/img/og.jpg', import.meta.url);
const esc = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="es"><meta charset="utf-8"><style>
    *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}
    body{color:#fff;background:#2b2430;font-family:Arial,sans-serif}
    .photo,.scrim{position:absolute;inset:0;width:100%;height:100%}
    .photo{object-fit:cover;object-position:center}
    /* Same ink and full-image gradients as the home hero; all text stays within the 78% floor. */
    .scrim{background:linear-gradient(to right,rgb(43 36 48/.78) 0,rgb(43 36 48/.78) 720px,transparent 1040px),linear-gradient(to top,rgb(43 36 48/.7),rgb(43 36 48/.12) 85%)}
    main{position:relative;width:720px;height:630px;padding:64px 60px;display:flex;flex-direction:column;align-items:flex-start}
    .brand{margin:0;font-size:27px;line-height:1.3;letter-spacing:1px}
    h1{margin:auto 0;font-family:Georgia,serif;font-size:70px;font-weight:400;line-height:1.08;letter-spacing:-1.5px}
    .caption{margin:0;font-size:22px;line-height:1.4}
  </style><body><img class="photo" alt="" src="data:image/webp;base64,${photo}"><div class="scrim"></div><main><p class="brand">${esc(SITE.name)}</p><h1>${esc(PAGES['/'].h1)}</h1><p class="caption">${esc(UI.illustrativeImages)}</p></main></body></html>`, { waitUntil: 'load' });
  await page.locator('.photo').evaluate(img => img.decode());
  await page.evaluate(() => document.fonts.ready);
  const fits = await page.locator('main').evaluate(main => [...main.children].every(el => {
    const r = el.getBoundingClientRect();
    return r.left >= 60 && r.right <= 720 && r.top >= 0 && r.bottom <= 630 && el.scrollWidth <= el.clientWidth;
  }));
  if (!fits) throw new Error('OG text exceeds the protected text region');
  let jpeg;
  let quality = 95;
  for (; quality >= 50; quality -= 5) {
    jpeg = await page.screenshot({ type: 'jpeg', quality });
    if (jpeg.length <= 190000) break;
  }
  if (jpeg.length > 190000) throw new Error('OG JPEG exceeds 190000 bytes');
  writeFileSync(output, jpeg);
  console.log(`PASS assets/img/og.jpg: 1200x630, ${jpeg.length} bytes, JPEG quality ${quality}`);
} finally {
  await browser.close();
}
