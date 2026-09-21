// Endpoint test for lead-forward.php: sandbox with a private config one level above the doc root, a fake SMTP sink, 14 checks.
// Usage: node docs/qa-tools/php-endpoint.mjs   (PHP_EXE=path to php.exe; uses ports 8091 and 2525)
import { fileURLToPath } from 'node:url';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { readFileSync, existsSync, rmSync, mkdirSync, copyFileSync, writeFileSync, readdirSync } from 'node:fs';
const ROOT = process.env.PT_ROOT || (process.env.TEMP || '/tmp').split('\\').join('/') + '/bs-phptest';
const SRC = fileURLToPath(new URL('../../', import.meta.url)).replace(/\/$/, '');
const PHP = process.env.PHP_EXE || 'C:/dev/php/php.exe';
const pub = ROOT + '/site/public';
mkdirSync(pub, { recursive: true });
const reset = (withConfig) => {
  for (const f of ['leads.log', '.babyshower-state', 'vendercrm-config.babyshower.php']) rmSync(ROOT + '/site/' + f, { recursive: true, force: true });
  copyFileSync(SRC + '/lead-forward.php', pub + '/lead-forward.php');
  writeFileSync(pub + '/gracias.html', '<p>gracias</p>');
  if (withConfig) writeFileSync(ROOT + '/site/vendercrm-config.babyshower.php', "<?php return ['lead_email' => 'antonmarklund.com@gmail.com', 'url' => '', 'api_key' => ''];");
};
const mails = [];
const smtp = net.createServer(sock => {
  let data = '', inData = false, raw = '';
  sock.write('220 sink ESMTP\r\n');
  sock.on('data', d => {
    raw += d.toString('utf8');
    while (raw.includes('\r\n')) {
      const i = raw.indexOf('\r\n'); const line = raw.slice(0, i); raw = raw.slice(i + 2);
      if (inData) { if (line === '.') { inData = false; mails.push(data); data = ''; sock.write('250 ok\r\n'); } else data += line + '\n'; continue; }
      const u = line.toUpperCase();
      if (u.startsWith('EHLO') || u.startsWith('HELO')) sock.write('250 sink\r\n');
      else if (u.startsWith('DATA')) { inData = true; sock.write('354 go\r\n'); }
      else if (u.startsWith('QUIT')) { sock.write('221 bye\r\n'); sock.end(); }
      else sock.write('250 ok\r\n');
    }
  });
}).listen(2525, '127.0.0.1');
const server = spawn(PHP, ['-d', 'SMTP=127.0.0.1', '-d', 'smtp_port=2525', '-d', 'sendmail_from=test@localhost', '-S', '127.0.0.1:8091', '-t', pub], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1200));
const base = { nombre: 'Ana Prueba', whatsapp: '0981 234-567', fecha: '', invitados: '30', tipo: 'baby-shower', zona: 'asuncion', mensaje: 'Hola, quiero cotizar', origen: '/contacto/', sid: '' };
const post = async (over = {}) => { const r = await fetch('http://127.0.0.1:8091/lead-forward.php', { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ ...base, ...over }) }); return { status: r.status, loc: r.headers.get('location'), body: await r.text() }; };
const log = () => existsSync(ROOT + '/site/leads.log') ? readFileSync(ROOT + '/site/leads.log', 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)) : [];
const out = (name, ok, extra = '') => console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? ' - ' + extra : ''));
const wait = ms => new Promise(r => setTimeout(r, ms));

reset(true);
let r = await post();
await wait(300);
out('1 valid submit redirects to /gracias.html', r.status === 303 && r.loc === '/gracias.html', `${r.status} ${r.loc}`);
out('2 lead written once, phone normalised to 595981234567', log().length === 1 && log()[0].lead.whatsapp === '595981234567', log()[0]?.lead.whatsapp);
out('3 no-JS path (empty sid) got a server BS id', /^BS-\d{8}-[a-z0-9]{4}$/i.test(log()[0]?.lead.sid || ''), log()[0]?.lead.sid);
const m = mails[0] || '';
out('4 email delivered to the configured address', /To: .*antonmarklund\.com@gmail\.com/i.test(m) || /antonmarklund/.test(m), mails.length + ' mail(s)');
out('5 email has on-domain From', /^From: .*no-reply@babyshower\.com\.py/im.test(m), (m.match(/^From:.*$/im) || ['no From'])[0]);
out('6 email body carries name, guests and pipeline lines', /Ana Prueba/.test(m) && /invitados: 30/.test(m) && /Pipeline: Baby Shower/.test(m));
const sid = log()[0].lead.sid;
r = await post({ sid });
await wait(300);
out('7a same SID + same data (retry) succeeds, no 2nd log line, no 2nd email', r.status === 303 && log().length === 1 && mails.length === 1, r.status + ', ' + log().length + ' line, ' + mails.length + ' mail');
r = await post({ sid, mensaje: 'otro texto distinto' });
await wait(200);
out('7b same SID + different data is rejected, log unchanged', r.status === 422 && log().length === 1, String(r.status));
reset(true); mails.length = 0;
r = await post({ whatsapp: '12345' });
out('8 invalid phone -> 422 and nothing stored', r.status === 422 && log().length === 0, `${r.status}, ${log().length} lines`);
r = await post({ empresa: 'spam inc' });
out('9 honeypot field rejected', r.status === 422 && log().length === 0, `${r.status}`);
r = await post({ zona: 'marte' });
out('10 unknown zone rejected', r.status === 422 && log().length === 0, `${r.status}`);
reset(false); mails.length = 0;
r = await post();
out('11 no recipient configured -> safe failure 503 (lead still logged)', r.status === 503 && log().length === 1 && mails.length === 0, `${r.status}, ${log().length} line`);
reset(true); mails.length = 0;
const codes = []; for (let i = 0; i < 7; i++) codes.push((await post({ sid: 'BS-20260921-a' + String(i).padStart(3, '0') })).status);
out('12 rate limit: 6th request within a minute gets 429', codes.slice(0, 5).every(c => c === 303) && codes[5] === 429, codes.join(' '));
const g = await fetch('http://127.0.0.1:8091/lead-forward.php', { redirect: 'manual' });
out('13 GET redirects to /contacto/', g.status === 303 && g.headers.get('location') === '/contacto/', `${g.status}`);
server.kill(); smtp.close();
process.exit(0);
