import { createRequire } from 'node:module'; import { readdirSync, readFileSync } from 'node:fs';
const require = createRequire('C:/Users/anton/AppData/Roaming/npm/node_modules/'); const { chromium } = require('playwright');
const dir = 'C:/Claude 1/babyshower/docs/qa-tools/out/';
const pairs = [['t768','A-t768'],['r375','A-r375'],['c375','A-c375'],['z768','A-z768'],['a375','A-a375'],['h2-1440','A-h1440'],['h2-375','A-h375']];
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true }); const p = await b.newPage();
for (const [o, n] of pairs) { const fo = readdirSync(dir).filter(f => f.startsWith(o + '-') && f.endsWith('.png')).sort(); let tot = 0, diff = 0, note = '';
  for (const f of fo) { const g = f.replace(o + '-', n + '-'); let A, B; try { A = readFileSync(dir + f).toString('base64'); B = readFileSync(dir + g).toString('base64'); } catch { note += ' missing ' + g; continue; }
    const r = await p.evaluate(async ([a, b2]) => { const load = s => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.src = 'data:image/png;base64,' + s; }); const [x, y] = await Promise.all([load(a), load(b2)]);
      if (x.width !== y.width || x.height !== y.height) return { size: [x.height, y.height] }; const c = document.createElement('canvas'); c.width = x.width; c.height = x.height; const t = c.getContext('2d'); t.drawImage(x, 0, 0); const d1 = t.getImageData(0, 0, c.width, c.height).data; t.clearRect(0, 0, c.width, c.height); t.drawImage(y, 0, 0); const d2 = t.getImageData(0, 0, c.width, c.height).data; let n2 = 0; for (let k = 0; k < d1.length; k += 4) if (Math.abs(d1[k] - d2[k]) + Math.abs(d1[k + 1] - d2[k + 1]) + Math.abs(d1[k + 2] - d2[k + 2]) > 30) n2++; return { n: n2, tot: d1.length / 4 }; }, [A, B]);
    if (r.size) note += ` size-mismatch ${f} ${r.size}`; else { diff += r.n; tot += r.tot; } }
  console.log(o, 'slices', fo.length, 'differing px', diff, 'of', tot, note); }
await b.close();
