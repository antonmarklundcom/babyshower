import { createRequire } from 'node:module';
const require = createRequire('C:/Users/anton/AppData/Roaming/npm/node_modules/'); const { chromium } = require('playwright');
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
for (const u of process.argv.slice(2)) { const v = [];
  for (let i = 0; i < 5; i++) { const c = await b.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true }); const p = await c.newPage();
    const cdp = await c.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.goto(u, { waitUntil: 'load' }); await p.waitForTimeout(900);
    v.push(Math.round(await p.evaluate(() => performance.getEntriesByName('first-contentful-paint')[0]?.startTime || -1))); await c.close(); }
  v.sort((a, b) => a - b); console.log(u, 'FCP@4xCPU median', v[2], 'all', v.join(',')); }
await b.close();
