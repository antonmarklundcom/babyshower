// Sliced screenshots of one URL at one width, using the installed Chrome via the global Playwright module.
// Usage: node docs/qa-tools/shots.mjs <url> <width> <prefix> [sliceHeight=1500]
// Output: docs/qa-tools/out/<prefix>-00.png, -01.png ... (gitignore or delete after use).
// Needs: npm i -g playwright (already present on Anton's laptop) and Chrome at the path below.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const require = createRequire(process.env.PW_BASE || 'C:/Users/anton/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const [, , url, width, prefix, sliceH = '1500'] = process.argv;
if (!url || !width || !prefix) { console.error('usage: node docs/qa-tools/shots.mjs <url> <width> <prefix> [sliceHeight]'); process.exit(1); }
const out = fileURLToPath(new URL('./out/', import.meta.url));
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
// scroll through so lazy images and reveals resolve before capturing
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
await page.waitForTimeout(500);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const h = Number(sliceH);
let i = 0;
for (let y = 0; y < total; y += h) {
  await page.screenshot({ path: `${out}${prefix}-${String(i).padStart(2, '0')}.png`, fullPage: true, clip: { x: 0, y, width: Number(width), height: Math.min(h, total - y) } });
  i++;
}
console.log(JSON.stringify({ total, slices: i, width, out }));
await browser.close();
