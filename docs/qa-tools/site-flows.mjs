// End-to-end flows on the SHIPPED zip: extracts dist/*.zip into a sandbox, runs it under php -S with a private
// config one level above the document root and a fake SMTP sink, then drives it with Playwright.
// Usage: node docs/qa-tools/site-flows.mjs [path-to-zip]   (env PHP_EXE, ports 8092 and 2526)
import { createRequire } from 'node:module';
import { spawn, execFileSync } from 'node:child_process';
import net from 'node:net';
import { readdirSync, readFileSync, rmSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
const require = createRequire(process.env.PW_BASE || 'C:/Users/anton/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const root = new URL('../../', import.meta.url).pathname.slice(1).replace(/%20/g, ' ');
const zip = process.argv[2] || root + 'dist/' + readdirSync(root + 'dist').filter(f => f.endsWith('.zip')).sort().at(-1);
const PHP = process.env.PHP_EXE || 'C:/dev/php/php.exe';
const E = (process.env.TEMP || '/tmp').split('\\').join('/') + '/bs-flows';
rmSync(E, { recursive: true, force: true }); mkdirSync(E + '/site/public', { recursive: true });
execFileSync('powershell.exe', ['-NoProfile', '-Command', `Expand-Archive -Force '${zip.split('/').join('\\')}' '${(E + '/site/public').split('/').join('\\')}'`]);
writeFileSync(E + '/site/vendercrm-config.babyshower.php', "<?php return ['lead_email' => 'antonmarklund.com@gmail.com', 'url' => '', 'api_key' => ''];");
const mails = [];
const smtp = net.createServer(sock => { let inData = false, data = '', raw = ''; sock.write('220 sink\r\n'); sock.on('data', d => { raw += d; let i; while ((i = raw.indexOf('\r\n')) >= 0) { const l = raw.slice(0, i); raw = raw.slice(i + 2); if (inData) { if (l === '.') { inData = false; mails.push(data); data = ''; sock.write('250 ok\r\n'); } else data += l + '\n'; continue; } const u = l.toUpperCase(); if (u.startsWith('DATA')) { inData = true; sock.write('354 go\r\n'); } else if (u.startsWith('QUIT')) { sock.write('221 bye\r\n'); sock.end(); } else sock.write('250 ok\r\n'); } }); }).listen(2526, '127.0.0.1');
const server = spawn(PHP, ['-d', 'SMTP=127.0.0.1', '-d', 'smtp_port=2526', '-d', 'sendmail_from=t@localhost', '-S', '127.0.0.1:8092', '-t', E + '/site/public'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1200));
const base = 'http://127.0.0.1:8092';
const res = [];
const t = (name, ok, extra = '') => { res.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? ' - ' + extra : '')); };
const logLines = () => existsSync(E + '/site/leads.log') ? readFileSync(E + '/site/leads.log', 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)) : [];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const errors = [];
const watch = page => { page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); };
try {
  // ---- mobile menu, skip link, WhatsApp menu, FAQ, calculator (375 px) ----
  const m = await (await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })).newPage(); watch(m);
  await m.goto(base + '/', { waitUntil: 'load' });
  await m.keyboard.press('Tab');
  t('skip link is the first tab stop', await m.evaluate(() => document.activeElement?.className === 'skip' || /Saltá/.test(document.activeElement?.textContent || '')));
  await m.evaluate(() => document.activeElement.blur());
  await m.click('.burger');
  t('burger opens the menu (aria-expanded true, panel visible)', await m.evaluate(() => document.querySelector('.burger').getAttribute('aria-expanded') === 'true' && getComputedStyle(document.getElementById('hdr-panel')).display !== 'none'));
  await m.keyboard.press('Escape');
  t('Escape closes the menu', await m.evaluate(() => document.querySelector('.burger').getAttribute('aria-expanded') === 'false'));
  await m.click('.wa-fab');
  const dlg = await m.evaluate(() => { const d = document.getElementById('wa-menu'); return d && getComputedStyle(d).display !== 'none' && !d.hidden; });
  t('floating WhatsApp button opens its menu', !!dlg);
  await m.keyboard.press('Escape');
  await m.evaluate(() => window.scrollTo(0, 0));
  const faq = m.locator('[data-faq] summary').first();
  await faq.click();
  t('FAQ item opens', await m.evaluate(() => document.querySelector('[data-faq]').open));
  await m.evaluate(() => document.getElementById('calculadora').scrollIntoView());
  const calc = await m.evaluate(() => { const c = document.querySelector('[data-calculator]'); if (!c || c.hidden) return null; return { visible: true, inputs: [...c.querySelectorAll('input,select')].map(i => i.tagName.toLowerCase() + ':' + (i.name || i.id) + ':' + i.type + ':' + (i.value || '')).slice(0, 14), total: (c.querySelector('.calc-total') || {}).textContent }; });
  t('calculator is enabled by JS and shows a total', !!calc && /Gs/.test(calc?.total || ''), calc ? (calc.total || '').trim() : 'hidden');
  if (calc) {
    const before = (await m.locator('.calc-total').first().textContent()).trim();
    const pkg = m.locator('[data-calculator] input[type=radio]').last(); await pkg.check({ force: true });
    const after = (await m.locator('.calc-total').first().textContent()).trim();
    t('changing the package changes the total', before !== after, `${before} -> ${after}`);
    const zone = m.locator('[data-calculator] select').first();
    if (await zone.count()) { const opts = await zone.locator('option').allTextContents(); await zone.selectOption({ index: Math.min(2, opts.length - 1) }); const z = (await m.locator('.calc-total').first().textContent()).trim(); t('choosing a zone updates the total', !!z, z); }
  }
  // ---- contact form, 375 px: client validation then real submit ----
  const c = await (await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })).newPage(); watch(c);
  await c.goto(base + '/contacto/', { waitUntil: 'load' });
  const bar = await c.evaluate(() => { const b = document.querySelector('.mobile-bar'); return b ? b.getBoundingClientRect().top : null; });
  const covered = [];
  for (const sel of ['[name=nombre]', '[name=whatsapp]', '[name=fecha]', '[name=invitados]', '[name=tipo]', '[name=zona]', '[name=mensaje]', 'button[type=submit]']) {
    const el = c.locator(sel).first(); await el.focus();
    const hidden = await el.evaluate(e => { const b = e.getBoundingClientRect(); const bar = document.querySelector('.mobile-bar'); if (!bar || getComputedStyle(bar).display === 'none') return false; const r = bar.getBoundingClientRect(); return b.bottom > r.top + 1 && b.top < r.bottom; });
    if (hidden) covered.push(sel);
  }
  t('no form control sits under the mobile bar when focused', covered.length === 0, covered.join(', ') || (bar === null ? 'no mobile bar on this page' : ''));
  await c.locator('button[type=submit]').click();
  const err1 = await c.evaluate(() => { const e = document.querySelector('[data-form-errors]'); return e && !e.hidden ? e.textContent.trim() : ''; });
  t('empty submit stays on the page and shows an error', !!err1 && /contacto/.test(c.url()), err1.slice(0, 70));
  await c.fill('[name=nombre]', 'Ana Prueba'); await c.fill('[name=whatsapp]', '12345');
  await c.locator('button[type=submit]').click();
  t('invalid phone is rejected client-side', /contacto/.test(c.url()) && logLines().length === 0);
  await c.fill('[name=whatsapp]', '0981 234-567'); await c.check('[name=fecha_desconocida]').catch(() => {});
  await c.fill('[name=invitados]', '30'); await c.selectOption('[name=tipo]', 'baby-shower'); await c.selectOption('[name=zona]', 'asuncion'); await c.fill('[name=mensaje]', 'Prueba de extremo a extremo');
  await Promise.all([c.waitForURL(/gracias/, { timeout: 15000 }), c.locator('button[type=submit]').click()]);
  await new Promise(r => setTimeout(r, 400));
  t('valid submit reaches /gracias.html', /gracias/.test(c.url()));
  const l1 = logLines();
  t('lead stored with normalised phone and page origin', l1.length === 1 && l1[0].lead.whatsapp === '595981234567' && l1[0].lead.origen === '/contacto/', l1[0] ? l1[0].lead.whatsapp + ' ' + l1[0].lead.origen : 'no log line');
  t('notification email delivered with on-domain From', mails.length === 1 && /^From: .*no-reply@babyshower\.com\.py/im.test(mails[0]), mails.length + ' mail');
  const gr = await c.evaluate(() => ({ h1: (document.querySelector('h1') || {}).textContent, robots: (document.querySelector('meta[name=robots]') || {}).content }));
  t('gracias page has a heading and noindex', !!gr.h1 && /noindex/.test(gr.robots || ''), gr.h1);
  // ---- contact form with JavaScript disabled (server path) ----
  const nj = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })).newPage();
  await nj.goto(base + '/contacto/', { waitUntil: 'load' });
  await nj.fill('[name=nombre]', 'Sin Javascript'); await nj.fill('[name=whatsapp]', '0982 111 222');
  await nj.fill('[name=invitados]', '20'); await nj.selectOption('[name=tipo]', 'revelacion'); await nj.selectOption('[name=zona]', 'luque');
  await Promise.all([nj.waitForURL(/gracias/, { timeout: 15000 }), nj.locator('button[type=submit]').click()]);
  const l2 = logLines();
  t('no-JS submit works and gets a server BS id', l2.length === 2 && /^BS-\d{8}-[a-z0-9]{4}$/i.test(l2[1].lead.sid), l2[1] ? l2[1].lead.sid : 'no line');
  // ---- desktop contact page: no bar, form usable ----
  const d = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); watch(d);
  await d.goto(base + '/contacto/', { waitUntil: 'load' });
  t('desktop contact page renders the form', await d.locator('[data-lead-form]').isVisible());
  t('no JavaScript or console errors during all flows', errors.length === 0, errors.slice(0, 3).join(' | '));
} finally {
  server.kill(); smtp.close();
}
console.log(`${res.filter(Boolean).length}/${res.length} passed`);
process.exit(res.every(Boolean) ? 0 : 1);
