import * as content from './content.mjs';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, webcrypto } from 'node:crypto';
import vm from 'node:vm';
import { THEMES as THEME_DETAILS } from './themes.mjs';
import { ZONES as ZONE_DETAILS } from './zones.mjs';
import { IDEAS } from './ideas.mjs';
import { REVEAL, ANITO, EXTRA_FOOD, CONFIRMATION } from './content.mjs';
import { SITE, WA_NUMBER, ANALYTICS_ID, LAUNCH_MODE, BOOKING_ENABLED, PRICES, POLICY, TRUST, PRIMARY_CTA, PACKAGES, ADDONS, ZONES, WA_MENU, THEMES, PAGES, EXTRAS, UI, priceCaption, packageMessage } from './content.mjs';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
const args = process.argv.slice(2);
const final = args.includes('--final');
const phase = args.includes('--phase') ? args[args.indexOf('--phase') + 1] : final ? 'B5' : null;
assert(/^B[1-5]$/.test(phase || ''), 'Use --phase B1..B5 or --final');
const failures = [], notes = [];
function check(condition, message) { if (!condition) failures.push(message); }
function test(name, fn) { try { fn(); } catch (error) { failures.push(`${name}: ${error.message}`); } }
const read = path => readFileSync(path, 'utf8');

// Batch 3: verify the cropped sharing asset from its JPEG SOF header.
test('Sharing JPEG', () => {
 assert(existsSync('assets/img/og.jpg'), 'Missing og.jpg');
 const data = readFileSync('assets/img/og.jpg');
 assert(data.length <= 200000, 'og.jpg exceeds 200 KB');
 assert.equal(data.readUInt16BE(0), 0xffd8, 'JPEG SOI');
 let dimensions;
 for (let offset = 2; offset + 4 <= data.length;) {
  assert.equal(data[offset], 0xff, 'JPEG marker');
  const marker = data[offset + 1], length = data.readUInt16BE(offset + 2);
  assert(length >= 2 && offset + 2 + length <= data.length, 'JPEG segment length');
  if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
   dimensions = [data.readUInt16BE(offset + 7), data.readUInt16BE(offset + 5)]; break;
  }
  if (marker === 0xda) break;
  offset += 2 + length;
 }
 assert.deepEqual(dimensions, [1200, 630]);
 console.log('PASS: og.jpg ' + dimensions.join(' x ') + '; ' + data.length + ' bytes');
});
test('Server SID fallback', () => {
 const php = read('lead-forward.php');
 const generation = "if ($lead['sid'] === '') {\n    $lead['sid'] = 'BS-' . date('Ymd') . '-' . bin2hex(random_bytes(2));\n}";
 const validation = "preg_match('/^BS-[0-9]{8}-[a-z0-9]{4}$/Di', $lead['sid'])";
 assert(php.includes(generation), 'Missing empty-only random SID generation');
 assert(php.indexOf(generation) < php.indexOf(validation), 'SID generation must precede validation');
 assert(read('assets/js/site.js').includes('BS-' + String.fromCharCode(92) + 'd{8}-[a-z0-9]{4}'), 'Cookie SID format');
});
check(!/Ley (?:6534\/2020|4868\/2013)/i.test(read('content.mjs')), 'Unreviewed source statute citation');
for (const zone of ZONE_DETAILS.filter(z => ['mariano-roque-alonso', 'capiata'].includes(z.slug))) {
 const words = zone.paragraph.trim().split(/\s+/).length;
 check(words >= 140 && words <= 160, zone.slug + ' access paragraph word count');
}

const manifest = JSON.parse(read('docs/routes.json'));
const built = manifest.filter(r => r.built);
const routes = new Map(manifest.map(r => [r.route, r]));
const extras = Object.entries(EXTRAS).map(([route]) => ({ route, output: route.slice(1), indexable: false, built: true }));
const outputs = [...built, ...extras];
check(routes.size === manifest.length, 'Duplicate manifest routes');
check(new Set(manifest.map(r => r.output)).size === manifest.length, 'Duplicate manifest outputs');
for (const r of manifest) {
 check(/^\/(?:[a-z0-9-]+\/)*$/.test(r.route), `Invalid route ${r.route}`);
 check(r.output === (r.route === '/' ? 'index.html' : r.route.slice(1) + 'index.html'), `Invalid output ${r.output}`);
 check(/^B[1-4]$/.test(r.phase) && typeof r.built === 'boolean' && typeof r.indexable === 'boolean', `Invalid flags ${r.route}`);
 check(!final || r.built, `--final rejects built:false ${r.route}`);
 check(Number(r.phase[1]) > Number(phase[1]) || r.built, `Missing phase-required route ${r.route}`);
}
// Inventory membership comes from the specification, not a numeric total.
const spec = read('plan/02-BUILD-SPEC.md');
const inventory = spec.split('## 6.')[1].split('## 7.')[0];
const expectedRoutes = new Set();
for (const m of inventory.matchAll(/`(\/(?:[a-z0-9-]+\/)*|\/(?:404|gracias)\.html)`/g)) if (!m[1].endsWith('.html') && m[1] !== '/trabajos-reales/') expectedRoutes.add(m[1]);
for (const [label, root] of [['Theme slugs:', '/tematicas/'], ['Zone slugs (5 at launch):', '/zonas/'], ['Idea slugs:', '/ideas/']]) {
 const line = inventory.split('\n').find(s => s.startsWith(label));
 check(Boolean(line), `Missing specification inventory ${label}`);
 for (const m of (line || '').split('. ')[0].matchAll(/`([a-z0-9-]+)`/g)) expectedRoutes.add(root + m[1] + '/');
}
check([...expectedRoutes].every(route => routes.has(route)) && [...routes.keys()].every(route => expectedRoutes.has(route)), 'Manifest differs from complete section 6 route inventory');

const decode = s => String(s).replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (all, key) => key[0] === '#' ? String.fromCodePoint(key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1))) : ({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[key] || all));
const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
// Small HTML tree reader for our generated markup; scripts are raw-text nodes.
function parse(html) {
 const root = { tag: '#document', attrs: {}, children: [], parent: null };
 const stack = [root];
 const tokens = /<!--[\s\S]*?-->|<![^>]*>|<(script|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>|<\/?[a-z][^>]*>|[^<]+/gi;
 const attrs = s => Object.fromEntries([...s.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)].map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3] ?? m[4] ?? '')]));
 for (const m of html.matchAll(tokens)) {
  const token = m[0], parent = stack.at(-1);
  if (token.startsWith('<!')) continue;
  if (m[1]) { parent.children.push({ tag: m[1].toLowerCase(), attrs: attrs(m[2]), children: [{ text: m[3] }], parent }); continue; }
  if (token.startsWith('</')) { const tag = token.slice(2, -1).trim().toLowerCase(); check(stack.at(-1).tag === tag, `Unbalanced HTML closing ${tag}`); if (stack.length > 1) stack.pop(); continue; }
  if (token.startsWith('<')) { const tag = token.match(/^<([^\s/>]+)/)[1].toLowerCase(); const node = { tag, attrs: attrs(token.slice(tag.length + 1, -1)), children: [], parent }; parent.children.push(node); if (!voidTags.has(tag) && !token.endsWith('/>')) stack.push(node); }
  else parent.children.push({ text: decode(token), parent });
 }
 check(stack.length === 1, 'Unclosed HTML element');
 return root;
}
const walk = node => [node, ...(node.children || []).flatMap(walk)];
function matches(node, selector) {
 if (!node.tag || node.tag[0] === '#') return false;
 return selector.split(',').some(part => {
  part = part.trim();
  const tag = part.match(/^[a-z][a-z0-9-]*/i)?.[0];
  if (tag && node.tag !== tag) return false;
  for (const m of part.matchAll(/\.([a-z0-9_-]+)|#([a-z0-9_-]+)|\[([^\s\]=^]+)(?:\s*(\^?=)\s*"?([^\]"]*)"?)?\]/gi)) {
   if (m[1] && !(node.attrs.class || '').split(/\s+/).includes(m[1])) return false;
   if (m[2] && node.attrs.id !== m[2]) return false;
   if (m[3] && (!(m[3] in node.attrs) || (m[4] === '=' && node.attrs[m[3]] !== m[5]) || (m[4] === '^=' && !node.attrs[m[3]].startsWith(m[5])))) return false;
  }
  return true;
 });
}
const all = (node, selector) => walk(node).filter(n => matches(n, selector));
const one = (node, selector) => all(node, selector)[0];
const text = node => node ? node.text ?? (node.children || []).map(text).join('') : '';
const normalize = s => s.replace(/\s+/g, ' ').trim();
function visible(node) { return !node || ['script','style'].includes(node.tag) || node.attrs?.['aria-hidden'] === 'true' ? '' : node.text ?? (node.children || []).map(visible).join(' '); }
const pages = new Map();
const titles = new Set(), descriptions = new Set();
let maxWeight = 0;
const assetBytes = ['assets/css/site.css','assets/js/site.js','assets/js/calc.js'].reduce((n, f) => n + (existsSync(f) ? statSync(f).size : 0), 0);
for (const row of outputs) {
 if (!existsSync(row.output)) { check(false, `Missing ${row.output}`); continue; }
 const html = read(row.output), dom = parse(html);
 pages.set(row.route, { ...row, html, dom });
 test(row.route, () => {
  assert.equal(all(dom, 'h1').length, 1, 'Exactly one h1');
  assert.equal(one(dom, 'html').attrs.lang, 'es-PY');
  assert.equal(one(dom, 'link[rel="canonical"]').attrs.href, SITE.url + row.route);
  const title = text(one(dom, 'title')), desc = one(dom, 'meta[name="description"]').attrs.content;
  assert(title.length >= 20 && title.length <= 60, `Title length ${title.length}`);
  assert(desc.length >= 70 && desc.length <= 155, `Description length ${desc.length}`);
  assert(!titles.has(title), 'Duplicate title'); assert(!descriptions.has(desc), 'Duplicate description');
  titles.add(title); descriptions.add(desc);
  assert.equal(one(dom, 'meta[property="og:title"]').attrs.content, title);
  assert.equal(one(dom, 'meta[property="og:description"]').attrs.content, desc);
  assert(one(dom, 'meta[name="viewport"]'));
  assert(one(dom, 'link[rel="icon"]').attrs.href.startsWith('data:image/svg+xml,'));
  assert.equal(one(dom, 'meta[property="og:image"]').attrs.content, SITE.url + '/assets/img/og.jpg');
  assert(/^https:\/\//.test(one(dom, 'meta[property="og:image"]').attrs.content));
  assert.equal(one(dom, 'meta[property="og:image:width"]').attrs.content, '1200');
  assert.equal(one(dom, 'meta[property="og:image:height"]').attrs.content, '630');
  assert.equal(one(dom, 'meta[property="og:image:alt"]').attrs.content, JSON.parse(read('docs/imagery-manifest.json')).images.find(image => image.id === 'hero-baby-shower-quincho').alt_es);
  assert.equal(one(dom, 'meta[name="twitter:card"]').attrs.content, 'summary_large_image');
  assert(!/Ley (?:6534\/2020|4868\/2013)/i.test(html), 'Unreviewed statute citation');
  if (!row.indexable) assert(/noindex/.test(one(dom, 'meta[name="robots"]')?.attrs.content), 'Special output requires noindex');
  const bodyText = normalize(visible(one(dom, 'body')));
  assert(!/\[(?:REVISAR|COMPLETAR|PENDIENTE)[^\]]*\]|\b(?:lorem|PLACEHOLDER|TBD|FIXME)\b|\{\{[^}]+\}\}|�|Ã[\u0080-\u00bf]|Â[\u0080-\u00bf]|â€|[a-z]\?[a-z]/i.test(bodyText) && !/\bTODO\b/.test(bodyText), 'Placeholder/mojibake in visible Spanish');
  assert(!/\b(?:backdrop|premium|read more|learn more|submit|thank you|loading|coming soon)\b/i.test(bodyText), 'English UI');
  assert(!/\breservar\b|Más elegido|Los precios son finales|llegamos 2 horas antes|coordinadora presente|bocaditos elaborados el mismo día/i.test(bodyText), 'Booking/supplier claim');
  if (!['/como-funciona/','/terminos/'].includes(row.route)) { assert(!bodyText.includes(POLICY.sena)); assert(!bodyText.includes(POLICY.cancel)); }
  else { assert(bodyText.includes(POLICY.heading)); assert(bodyText.includes(POLICY.sena)); assert(bodyText.includes(POLICY.cancel)); }
  for (const selector of ['header','footer','[data-wa-menu]','.wa-fab','.mobile-bar']) assert(one(dom, selector), `Missing shared ${selector}`);
  for (const selector of ['[data-consent-banner]', '[data-consent-revoke]']) assert.equal(Boolean(one(dom, selector)), Boolean(ANALYTICS_ID));
  const mobileLinks = all(one(dom, '.mobile-bar'), 'a');
  assert.equal(mobileLinks.length, ['/revelacion-de-genero/', '/primer-anito/'].includes(row.route) ? 1 : 2);
  if (mobileLinks.length === 2) assert.equal(text(mobileLinks[1]), UI.calc);
  assert.equal(all(dom, '.wa-menu__option').length, WA_MENU.options.length);
  assert.equal(one(dom, '.wa-fab').attrs['aria-label'], UI.waLabel);
  assert(bodyText.includes(SITE.phone) && bodyText.includes(SITE.operator), 'Missing operator/phone');
  for (const a of all(dom, 'a')) {
   if (a.attrs.href?.startsWith('https://wa.me/')) {
    const url = new URL(a.attrs.href);
    assert.equal(url.pathname, '/' + WA_NUMBER);
    assert(url.searchParams.get('text')?.includes(`(${row.route})`), 'WA page context');
    assert(a.attrs['data-ev'] === 'whatsapp_click' && a.attrs['data-ev-loc'], 'WA event attributes');
   }
  }
  for (const el of all(dom, '.btn, button, .theme-card')) assert(el.attrs['data-ev'] && el.attrs['data-ev-loc'], 'CTA event attributes');
  const graph = JSON.parse(text(one(dom, 'script[type="application/ld+json"]')));
  assert.equal(graph['@context'], 'https://schema.org');
  const nodes = graph['@graph']; assert(Array.isArray(nodes));
  assert(nodes.some(n => n['@type'] === 'Organization' && n['@id'] === SITE.url + '/#org'));
  assert(nodes.some(n => n['@type'] === 'WebSite' && n['@id'] === SITE.url + '/#site' && n.publisher['@id'] === SITE.url + '/#org'));
  assert(!nodes.some(n => ['Product','Offer','Review','AggregateRating'].includes(n['@type'])));
  assert(!/"(?:priceRange|availability)"|InStock/.test(JSON.stringify(graph)));
  const local = nodes.find(n => n['@type'] === 'LocalBusiness');
  assert.equal(Boolean(local), row.route === '/'); if (local) assert(local.areaServed && !local.address);
  if (row.route !== '/') assert(nodes.some(n => n['@type'] === 'BreadcrumbList' && n.itemListElement.at(-1).item === SITE.url + row.route));
  if (row.route === '/' || /^\/(combos-y-precios|revelacion-de-genero|primer-anito|tematicas\/[^/]+|zonas\/[^/]+)\/$/.test(row.route)) {
   const service = nodes.find(n => n['@type'] === 'Service'); assert(service?.areaServed && service.serviceType && service.provider['@id'] === SITE.url + '/#org', 'Service graph');
  }
  if (/^\/ideas\/[^/]+\/$/.test(row.route)) { const article = nodes.find(n => n['@type'] === 'Article'); assert(article?.datePublished && article.author['@id'] === SITE.url + '/#org', 'Article graph'); }
  const faq = nodes.find(n => n['@type'] === 'FAQPage');
  if (row.route === '/preguntas-frecuentes/') assert(faq, 'FAQPage required');
  if (faq) {
   const visibleFaq = all(dom, '[data-faq]').map(n => ({ q: normalize(text(one(n, 'summary'))), a: normalize(text(one(n, 'p'))) }));
   assert.equal(faq.mainEntity.length, visibleFaq.length);
   for (const item of faq.mainEntity) assert(visibleFaq.some(f => f.q === item.name && f.a === item.acceptedAnswer.text), `FAQ schema mismatch: ${item.name}`);
  }
  for (const card of all(dom, '[data-package]')) {
   const pkg = PACKAGES.find(p => p.id === card.attrs['data-package']); assert(pkg);
   const zone = ZONES.find(z => row.route === `/zonas/${z.slug}/`);
   const price = pkg.price + (zone?.delivery || 0);
   assert.equal(Number(card.attrs['data-price']), price, 'Zone/package price');
   assert.equal(normalize(text(one(card, '[data-price-caption]'))), `${UI.pricePrefix} Gs. ${new Intl.NumberFormat('es-PY').format(price)}`);
   assert.equal(text(one(card, '.package-confirmation')), CONFIRMATION, 'Cards retain confirmation after CTA');
   assert(one(card, 'details'), 'Expandable exclusions');
   const a = all(card, 'a').find(n => n.attrs.href.startsWith('https://wa.me/'));
   assert(new URL(a.attrs.href).searchParams.get('text').includes(priceCaption(price)), 'WA estimate');
  }
  // Every displayed monetary amount must be configured (or a zone-adjusted price).
  for (const card of all(dom, '[data-offer]')) {
   const offer = [...REVEAL.packages, REVEAL.cake, ANITO, ...ADDONS].find(a => a.id === card.attrs['data-offer']);
   assert(offer); assert.equal(Number(card.attrs['data-price']), offer.price);
   assert.equal(normalize(text(one(card, '[data-price-caption]'))), `${UI.pricePrefix} Gs. ${new Intl.NumberFormat('es-PY').format(offer.price)}`);
   assert.equal(text(one(card, '.package-confirmation')), CONFIRMATION);
   assert.equal(new URL(one(card, 'a').attrs.href).searchParams.get('text'), packageMessage(offer, row.route));
  }
  const amounts = new Set([...REVEAL.packages.map(a => a.price), REVEAL.cake.price, ANITO.price, ...PACKAGES.flatMap(p => [p.price,p.extra,...ZONES.filter(z => z.delivery !== null).map(z => p.price + z.delivery)]), ...ADDONS.map(a => a.price), ...ZONES.map(z => z.delivery)]);
  for (const m of bodyText.matchAll(/Gs\.\s*([\d.]+)/g)) assert(amounts.has(Number(m[1].replaceAll('.', '').replace(/\.$/, ''))), `Unconfigured price ${m[0]}`);
  for (const script of all(dom, 'script[src]')) assert(!/googletagmanager|analytics|vc-attribution/.test(script.attrs.src), 'Unconditional tracking tag');
  for (const el of all(dom, 'script[src],link[rel="stylesheet"]')) {
   const url = el.attrs.src || el.attrs.href;
   if (url.startsWith('/assets/')) { const [path, query] = url.slice(1).split('?'); assert.equal(new URLSearchParams(query).get('v'), createHash('sha256').update(readFileSync(path)).digest('hex').slice(0,12), 'Asset hash'); }
  }
 });
 const weight = Buffer.byteLength(html) + assetBytes; maxWeight = Math.max(maxWeight, weight);
 check(weight < 500000, `${row.route}: HTML + CSS + JS + calc >= 500 KB`);
}

// Links and fragment targets: future-route exemptions only come from the manifest.
for (const page of pages.values()) for (const el of all(page.dom, 'a[href],link[href],script[src],img[src],source[srcset]')) {
 const href = el.attrs.href || el.attrs.src;
 if (!href || /^(?:mailto:|tel:|data:)/i.test(href)) continue;
 let url; try { url = new URL(href, SITE.url + page.route); } catch { check(false, `Bad URL ${href}`); continue; }
 if (url.origin !== SITE.url) continue;
 const target = url.pathname;
 const row = routes.get(target);
 if (row && !row.built) { check(!final, `Future link at final: ${target}`); continue; }
 const destination = pages.get(target);
 if (destination) {
  if (url.hash) check(all(destination.dom, '[id]').some(n => n.attrs.id === decodeURIComponent(url.hash.slice(1))), `${page.route}: missing fragment ${href}`);
 } else check(existsSync(target.slice(1)) && statSync(target.slice(1)).isFile(), `${page.route}: unknown internal link ${href}`);
}
test('Sitemap', () => {
 const actual = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decode(m[1]));
 const expected = manifest.filter(r => r.built && r.indexable).map(r => SITE.url + r.route);
 assert.deepEqual(actual.sort(), expected.sort());
 assert(read('robots.txt').includes('Sitemap: ' + SITE.url + '/sitemap.xml'));
 assert(/User-agent: \*\s+Allow: \//.test(read('robots.txt')));
});
test('Home content and forms', () => {
 const home = pages.get('/').dom;
 for (const item of TRUST) assert(normalize(visible(home)).includes(item));
 assert(one(home, '[id="calculadora"]'));
 assert.equal(all(home, '[data-package]').length, PACKAGES.length);
 assert.equal(all(home, '.theme-card').length, THEMES.length);
 assert(one(home, '.dark-band.grain'));
 assert.equal(all(home, '.home-proposal, .comparison').length, 0, 'Home uses a photo hero and inclusion lists');
 assert.equal(all(pages.get('/combos-y-precios/').dom, '.comparison').length, 1, 'Comparison stays on the combos page');
 assert.deepEqual(all(one(home, '.home-inclusions'), 'li').map(text), UI.homeInclusions.flatMap(group => group.items));
 assert.equal(all(home, '[data-faq]').length, 7);
 assert.equal(text(one(all(home, '[data-faq]')[2], 'summary')), PAGES['/'].faq[2].q);
 for (const card of all(home, '[data-package]')) assert.equal(all(one(card, '.package-rows'), 'div').length, 6, 'Six home comparison rows');
 for (const route of ['/', '/contacto/']) {
  const form = one(pages.get(route).dom, 'form');
  assert.equal(form.attrs.action, '/lead-forward.php'); assert.equal(form.attrs.method, 'post');
  for (const name of ['nombre','whatsapp','fecha','invitados','tipo','zona','mensaje','origen','sid','empresa']) assert(one(form, `[name="${name}"]`), `Missing field ${name}`);
  for (const name of ['origen','sid','empresa']) assert.equal(one(form, `[name="${name}"]`).attrs.type, 'hidden');
  assert.equal(one(form, '[name="origen"]').attrs.value, route);
  assert(one(form, '[data-date-unknown]'));
  const phone = one(form, '[name="whatsapp"]');
  assert(!('pattern' in phone.attrs));
  for (const attr of ['type', 'inputmode', 'autocomplete']) assert.equal(phone.attrs[attr], 'tel');
  assert('required' in phone.attrs); assert(text(form).includes(UI.form.reply));
  assert.equal(one(form, '[name="nombre"]').attrs.minlength, '2');
  assert.equal(one(form, '[name="nombre"]').attrs.maxlength, '60');
  assert.equal(one(form, '[name="invitados"]').attrs.min, '5');
  assert.equal(one(form, '[name="invitados"]').attrs.max, '200');
  assert.equal(one(form, '[name="mensaje"]').attrs.maxlength, '500');
  assert.deepEqual(all(one(form, '[name="tipo"]'), 'option').map(n => n.attrs.value).filter(Boolean), UI.form.types.map(t => t[0]));
  assert.deepEqual(all(one(form, '[name="zona"]'), 'option').map(n => n.attrs.value).filter(Boolean), ZONES.map(z => z.slug));
 }
});
test('Launch settings and server configuration', () => {
 assert.equal(WA_NUMBER, '595992279599'); assert.equal(SITE.phone, '+595 992 279 599');
 assert.equal(LAUNCH_MODE, 'inquiry'); assert.equal(BOOKING_ENABLED, false); assert.equal(PRICES.mode, 'estimated');
 assert.equal(PRIMARY_CTA, 'Consultá por WhatsApp');
 const ht = read('.htaccess');
 assert(/RewriteCond %\{HTTPS\} !=on \[OR\]/.test(ht));
 assert(ht.includes('RewriteCond %{HTTP_HOST} !^babyshower\\.com\\.py$ [NC]'));
 assert(ht.includes('https://babyshower.com.py%{REQUEST_URI}'));
 assert(ht.includes('leads\\.log') && ht.includes('\\.mjs$') && ht.includes('Require all denied'));
 assert(ht.includes('ErrorDocument 404 /404.html'));
 assert(!/tasacion|Redirect\s+301/.test(ht));
 assert(!read('assets/js/site.js').includes('vc-attribution'));
});

// Contrast audit of all text/background pairs used by these B1 components.
function rgb(hex) { return hex.replace('#','').match(/../g).map(v => parseInt(v,16) / 255); }
function luminance(hex) { return rgb(hex).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum,v,i) => sum + v * [.2126,.7152,.0722][i], 0); }
function contrast(a,b) { const values = [luminance(a),luminance(b)].sort((a,b) => b-a); return (values[0]+.05)/(values[1]+.05); }
test('Contrast and reference assets', () => {
 const css = read('assets/css/site.css');
 for (const bg of ['#FBF6F2','#FFFFFF','#DDE8E0','#DCE6F2','#F6E1DC','#D97B6C','#25D366']) assert(contrast('#2B2430', bg) >= 4.5, `Body contrast on ${bg}`);
 assert(contrast('#FBF6F2','#2B2430') >= 3, 'Large text contrast');
 assert(css.includes('.btn--primary{color:var(--ink)}') && css.includes('p{color:var(--ink)}'));
 assert(/\.eyebrow\{font-size:12px;color:var\(--ink\)/.test(css));
 assert(css.includes('prefers-reduced-motion:reduce'));
 const refRoot = 'C:/Claude 1/claude-skills/web-design-system/references/';
 if (existsSync(refRoot + 'motion.js')) assert(readFileSync(refRoot + 'motion.js').equals(readFileSync('assets/js/motion.js')), 'Motion must be byte-identical');
 if (existsSync(refRoot + 'tokens.css')) {
  const expected = read(refRoot + 'tokens.css').replace("--font-display:'Fraunces',Georgia,serif;", "--font-display:'Instrument Serif',Georgia,serif;").replace("--font-text:'Inter Tight',system-ui,sans-serif;", "--font-text:'Satoshi',system-ui,sans-serif;").replace('--base:#F7F4ED;', '--base:#FBF6F2;').replace('--ink:#14241E;', '--ink:#2B2430;').replace('--accent:#C2603A;', '--accent:#D97B6C;');
  // CSS trimming may remove comments and unused reference components; tokens stay exact.
  const tokens = source => source.replace(/\/\*[\s\S]*?\*\//g, '').match(/:root\s*\{([^}]*)\}/)[1].split(';').map(s => s.trim()).filter(Boolean);
  assert.deepEqual(tokens(css), tokens(expected), 'Resolved token declarations changed beyond TRACK');
 }
});

// Evaluar contenido y generador en memoria para ambos estados, sin escribir archivos.
const rendererSource = read('build-site.mjs').replace(/^import .*;\n/gm, '').replace(/^process\.chdir.*;\n/m, '').split('for (const row of manifest.filter(r => r.built))')[0];
function renderWithAnalytics(id) {
 const source = read('content.mjs').replace(/^export /gm, '').replace(/const ANALYTICS_ID = '[^']*';/, `const ANALYTICS_ID = ${JSON.stringify(id)};`);
 const configured = vm.runInNewContext(source + '\n;({ ' + Object.keys(content).join(', ') + ' });');
 const context = { ...configured, THEME_DETAILS, ZONE_DETAILS, IDEAS, readFileSync, existsSync, readdirSync, createHash, console, Buffer };
 vm.createContext(context);
 vm.runInContext(rendererSource, context);
 return route => context.render(route, context.PAGES[route] || EXTRAS[route], !EXTRAS[route]);
}
const analyticsHtml = renderWithAnalytics('G-TEST');
test('Textos legales según la configuración de analítica', () => {
 const disabledHtml = renderWithAnalytics('');
 const inactive = 'Por ahora este sitio no usa analítica de terceros. Si la activamos, te pediremos tu consentimiento antes de cargarla y vas a poder revocarlo desde el pie de página.';
 const originals = {
  '/privacidad/': 'Podés aceptar o rechazar la analítica desde el aviso de cookies. No cargamos etiquetas de analítica antes de tu aceptación. Podés revocar el consentimiento desde Preferencias de cookies, en el pie de página. Guardamos tu elección para respetarla.',
  '/terminos/': 'Podés aceptar, rechazar y revocar la analítica desde Preferencias de cookies.'
 };
 for (const [route, original] of Object.entries(originals)) {
  const disabled = disabledHtml(route), enabled = analyticsHtml(route);
  assert(!/Preferencias de cookies|banner|revocar la anal[ií]tica/i.test(disabled), disabled.match(/.{0,60}(?:Preferencias de cookies|banner|revocar la anal[ií]tica).{0,60}/i)?.[0]);
  assert(disabled.includes(inactive)); assert(!disabled.includes(original));
  assert(enabled.includes(original)); assert(!enabled.includes(inactive));
  assert.equal(pages.get(route).html, ANALYTICS_ID ? renderWithAnalytics(ANALYTICS_ID)(route) : disabled);
 }
});
test('Mensajes de consulta por zona y temática', () => {
 for (const [route, { dom }] of pages) {
  const buttons = all(dom, '[data-ev-loc="consulta-tematica-zona"]');
  if (!/^\/(zonas|tematicas)\//.test(route)) continue;
  const zone = ZONES.find(z => route === `/zonas/${z.slug}/`);
  const theme = THEMES.find(t => route === `/tematicas/${t.slug}/`);
  const subject = route === '/zonas/' ? 'el traslado a mi zona' : route === '/tematicas/' ? 'una temática' : zone ? `un baby shower en ${zone.name}` : `la temática ${theme.name}`;
  assert(buttons.length > 0);
  for (const button of buttons) {
   const url = new URL(button.attrs.href);
   assert.equal(url.origin + url.pathname, `https://wa.me/${WA_NUMBER}`);
   assert.equal(url.searchParams.get('text'), `Hola, vengo de ${SITE.domain} (${route}) y quiero consultar por ${subject}. Fecha tentativa: ____ · Invitados: ____ · Zona: ____`);
   assert.equal(text(button), PRIMARY_CTA); assert.equal(button.attrs['data-ev'], 'whatsapp_click');
  }
 }
});
test('Short unit captions and calculator labels', () => {
 for (const pkg of PACKAGES.filter(p => p.extra)) {
  const caption = content.extraGuestCaption(pkg);
  assert.equal(caption, 'Invitado extra: ' + content.fmtGs(pkg.extra) + ' por invitado (estimado)');
  assert(visible(pages.get('/combos-y-precios/').dom).includes(caption));
 }
 for (const zone of ZONES) {
  const caption = content.deliveryNote(zone);
  assert(caption.includes('estimado')); assert(!caption.includes(CONFIRMATION));
  if (zone.delivery) assert(caption.includes(content.fmtGs(zone.delivery)));
 }
 for (const route of ['/', '/combos-y-precios/']) {
  const calc = one(pages.get(route).dom, '#calculadora');
  assert.equal(text(one(calc, 'h2')), UI.calcTitle); assert.equal(text(one(calc, '.eyebrow')), UI.calculator);
 }
 assert.equal(ADDONS.find(a => a.id === 'hora').name, 'Coordinadora por hora');
});
// Execute the actual site script with a small DOM adapter: consent, tracking,
// direct thanks visits, keyboard focus, no-JS hrefs, and form client state.
function browser(html, route, options = {}) {
 const dom = parse(html), handlers = new Map(), jar = new Map(), storage = options.storage || new Map();
 let clock = 100000;
 const document = { head: null, body: null, activeElement: null };
 function attach(node) {
  if (!node.tag) return;
  node.dataset = Object.fromEntries(Object.entries(node.attrs).filter(([k]) => k.startsWith('data-')).map(([k,v]) => [k.slice(5).replace(/-([a-z])/g, (_,c) => c.toUpperCase()), v]));
  node.style = {}; node.value = node.attrs.value || (node.tag === 'select' ? one(node, 'option')?.attrs.value : '') || ''; node.name = node.attrs.name || ''; node.hidden = 'hidden' in node.attrs; node.checked = 'checked' in node.attrs;
  node.classList = { contains: cls => (node.attrs.class || '').split(/\s+/).includes(cls), add: cls => { if (!node.classList.contains(cls)) node.attrs.class = ((node.attrs.class || '') + ' ' + cls).trim(); }, remove: cls => { node.attrs.class = (node.attrs.class || '').split(/\s+/).filter(c => c !== cls).join(' '); }, toggle: (cls, force) => { const next = force ?? !node.classList.contains(cls); node.classList[next ? 'add' : 'remove'](cls); return next; } };
  node.setAttribute = (key,value) => { node.attrs[key] = String(value); };
  node.getAttribute = key => node.attrs[key]; node.hasAttribute = key => key in node.attrs; node.removeAttribute = key => { delete node.attrs[key]; };
  node.querySelectorAll = selector => all(node, selector).filter(n => n !== node);
  node.querySelector = selector => node.querySelectorAll(selector)[0] || null;
  node.contains = child => walk(node).includes(child);
  node.closest = selector => matches(node, selector) ? node : node.parent?.closest?.(selector) || null;
  node.addEventListener = (name, fn) => { const key = node; if (!handlers.has(key)) handlers.set(key, new Map()); const events = handlers.get(key); if (!events.has(name)) events.set(name, []); events.get(name).push(fn); };
  node.focus = () => { document.activeElement = node; };
  node.appendChild = child => { node.children.push(child); child.parent = node; };
  Object.defineProperty(node, 'textContent', { get: () => text(node), set: value => { node.children = [{ text: String(value) }]; } });
 }
 walk(dom).forEach(attach);
 for (const form of all(dom, 'form')) form.elements = Object.fromEntries(all(form, '[name]').map(n => [n.attrs.name,n]));
 document.querySelectorAll = selector => all(dom, selector); document.querySelector = selector => one(dom, selector) || null;
 document.getElementById = id => all(dom, '[id]').find(n => n.attrs.id === id) || null;
 document.head = one(dom, 'head'); document.body = one(dom, 'body');
 document.createElement = tag => { const n = { tag, attrs: {}, children: [] }; attach(n); return n; };
 document.addEventListener = (name, fn) => { if (!handlers.has(document)) handlers.set(document, new Map()); const events = handlers.get(document); if (!events.has(name)) events.set(name, []); events.get(name).push(fn); };
 Object.defineProperty(document, 'cookie', { get: () => [...jar].map(([k,v]) => `${k}=${v}`).join('; '), set: s => { const [kv] = s.split(';'), [k,v] = kv.split('='); if (/Max-Age=0/.test(s)) jar.delete(k); else jar.set(k,v); } });
 if (options.cookie) document.cookie = options.cookie;
 document.getElementById('site-config').textContent = JSON.stringify({ analyticsId: options.id ?? 'G-TEST', consentKey: 'bs-consent', successCookie: 'bs_lead_success', errors: UI.errors, form: UI.form });
 const context = { document, location: new URL(SITE.url + route), localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key,v) => storage.set(key,v) }, crypto: webcrypto, Intl, Uint8Array, URL, URLSearchParams, Map, Date: class extends Date { static now() { return clock; } }, console, scrollY: 0 };
 context.window = context;
 vm.runInNewContext(read('assets/js/site.js'), context, { timeout: 3000 });
 function fire(target, type, extra = {}) { const event = { target, prevented: false, preventDefault() { this.prevented = true; }, ...extra }; for (let n = target; n; n = n.parent) for (const fn of handlers.get(n)?.get(type) || []) fn(event); for (const fn of handlers.get(document)?.get(type) || []) fn(event); return event; }
 return { context, dom, storage, jar, document, q: document.querySelector, fire, tick: () => { clock += 1001; }, events: () => (context.dataLayer || []).filter(v => v[0] === 'event'), tags: () => document.head.children.filter(n => n.src?.includes('googletagmanager')) };
}
test('Consent and interaction behavior', () => {
 const html = analyticsHtml('/');
 const b = browser(html, '/');
 assert.equal(b.tags().length, 0); assert.equal(b.q('[data-consent-banner]').hidden, false);
 const wa = all(b.dom, 'a').find(n => n.attrs['data-ev'] === 'whatsapp_click' && !('data-wa-trigger' in n.attrs));
 assert.equal(b.fire(wa,'click').prevented, false); assert.equal(b.events().length,0);
 b.fire(b.q('[data-consent="rejected"]'),'click'); assert.equal(b.storage.get('bs-consent'),'rejected'); assert.equal(b.tags().length,0);
 b.fire(b.q('[data-consent-revoke]'),'click'); assert.equal(b.q('[data-consent-banner]').hidden,false);
 b.fire(b.q('[data-consent="accepted"]'),'click'); assert.equal(b.tags().length,1); assert.equal(b.storage.get('bs-consent'),'accepted');
 b.fire(wa,'click'); b.fire(wa,'click'); assert.equal(b.events().filter(e => e[1] === 'whatsapp_click').length,1);
 b.tick(); b.fire(wa,'click'); assert.equal(b.events().filter(e => e[1] === 'whatsapp_click').length,2);
 b.fire(b.document,'bs:calc-submit'); b.fire(b.document,'bs:calc-submit'); assert.equal(b.events().filter(e => e[1] === 'calc_submit').length,1);
 const trigger = b.q('[data-wa-trigger]'); assert.equal(b.fire(trigger,'click').prevented,true); assert.equal(b.q('[data-wa-menu]').hidden,false);
 assert.equal(b.document.activeElement,b.q('.wa-menu__option'));
 const modalButtons = all(b.q('[data-wa-panel]'),'a,button'); modalButtons.at(-1).focus();
 assert.equal(b.fire(b.document,'keydown',{key:'Tab'}).prevented,true); assert.equal(b.document.activeElement,modalButtons[0]);
 b.fire(b.document,'keydown',{key:'Escape'}); assert.equal(b.q('[data-wa-menu]').hidden,true); assert.equal(b.document.activeElement,trigger);
 const burger = b.q('[data-hdr-burger]'); b.fire(burger,'click'); assert.equal(burger.attrs['aria-expanded'],'true'); b.fire(b.document,'keydown',{key:'Escape'}); assert.equal(burger.attrs['aria-expanded'],'false');
 const form = b.q('form'); assert(/^BS-\d{8}-[a-z0-9]{4}$/.test(form.elements.sid.value));
 form.elements.fecha.value = '2027-01-01'; const unknown = b.q('[data-date-unknown]'); unknown.checked = true; b.fire(unknown,'change'); assert.equal(form.elements.fecha.value,''); assert.equal(form.elements.fecha.disabled,true);
 form.elements.nombre.value = 'Ana'; form.elements.whatsapp.value = '0992279599'; b.fire(form,'submit'); assert.equal(form.elements.whatsapp.value,'595992279599'); assert(!b.events().some(e => e[1] === 'form_submit'));
 const before = b.events().length; b.document.cookie = '_ga=test'; b.fire(b.q('[data-consent-revoke]'),'click'); assert.equal(b.context['ga-disable-G-TEST'],true); assert(!b.jar.has('_ga')); b.tick(); b.fire(wa,'click'); assert.equal(b.events().length,before);
 const empty = browser(pages.get('/').html,'/',{ id: '', storage: new Map([['bs-consent','accepted']]) }); assert.equal(empty.tags().length,0);
 const rejected = browser(html,'/',{ storage: new Map([['bs-consent','rejected']]) }); assert.equal(rejected.tags().length,0); assert.equal(rejected.q('[data-consent-banner]').hidden,true);
});
test('Phone separators use actual client validation', () => {
 for (const value of ['0981234567','+595981234567','595981234567','0981 234-567','(0981) 234 567','+595 981 234 567','0981.234.567','0981abc567','0981 234']) {
  const b = browser(pages.get('/contacto/').html, '/contacto/', {id:''});
  const form = b.q('form'); form.elements.nombre.value = 'Ana'; form.elements.whatsapp.value = value;
  const valid = !['0981abc567','0981 234'].includes(value);
  assert.equal(b.fire(form, 'submit').prevented, !valid, value);
  if (valid) assert.equal(form.elements.whatsapp.value, '595981234567');
  else assert.equal(b.q('#error-whatsapp').textContent, UI.errors.whatsapp);
 }
});
test('Thanks conversion requires server success', () => {
 const html = analyticsHtml('/gracias.html');
 const storage = new Map([['bs-consent','accepted']]);
 const direct = browser(html,'/gracias.html?success=1&sid=BS-20260919-abcd',{storage});
 assert(!direct.events().some(e => e[1] === 'form_submit'));
 const waLinks = b => all(b.dom, 'a').filter(a => a.attrs.href?.startsWith('https://wa.me/')).map(a => a.attrs.href);
 assert.deepEqual(waLinks(direct), all(parse(html), 'a').filter(a => a.attrs.href?.startsWith('https://wa.me/')).map(a => a.attrs.href));
 const accepted = browser(html,'/gracias.html',{storage,cookie:'bs_lead_success=BS-20260919-abcd'});
 for (const href of waLinks(accepted)) assert(new URL(href).searchParams.get('text').endsWith('Mi número de consulta es BS-20260919-abcd.'));
 const disabled = browser(pages.get('/gracias.html').html, '/gracias.html', {id:'',cookie:'bs_lead_success=BS-20260919-abcd'});
 for (const href of waLinks(disabled)) assert(new URL(href).searchParams.get('text').includes('BS-20260919-abcd'));
 assert.equal(disabled.events().length, 0);
 assert.equal(accepted.events().filter(e => e[1] === 'form_submit').length,1); assert(!accepted.jar.has('bs_lead_success'));
 const reload = browser(html,'/gracias.html',{storage,cookie:'bs_lead_success=BS-20260919-abcd'}); assert(!reload.events().some(e => e[1] === 'form_submit'));
 const noConsent = browser(html,'/gracias.html',{cookie:'bs_lead_success=BS-20260919-ffff'}); assert(!noConsent.events().some(e => e[1] === 'form_submit')); assert.equal(noConsent.tags().length,0);
});

// Phase-aware checks for programmatic content. No skipped checks reported as PASS.
const words = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}\s]/gu,' ').split(/\s+/).filter(Boolean);
const grams = s => { const w = words(s); return new Set(w.slice(0,-4).map((_,i) => w.slice(i,i+5).join(' '))); };
for (const prefix of ['/tematicas/','/zonas/']) {
 const members = [...pages.values()].filter(p => p.route.startsWith(prefix) && p.route !== prefix);
 for (const member of members) test(`B3 content ${member.route}`, () => {
  const paragraphs = all(member.dom, '[data-main-paragraph]');
  assert.equal(paragraphs.length, 1, 'One dedicated main paragraph');
  assert(words(text(paragraphs[0])).length >= 120, 'Main paragraph requires 120 words');
  assert.equal(all(member.dom, '[data-faq]').length, 2);
  const graph = JSON.parse(text(one(member.dom, 'script[type="application/ld+json"]')))['@graph'];
  assert(graph.some(n => n['@type'] === 'FAQPage'), 'Required FAQPage');
  const links = all(member.dom, 'a').map(a => a.attrs.href);
  const hub = pages.get(prefix);
  assert(hub && all(hub.dom, 'a').some(a => a.attrs.href === member.route), 'Hub links child');
  for (const href of ['/tematicas/', '/zonas/']) assert(all(one(member.dom, 'header'), 'a').some(a => a.attrs.href === href), 'Header hub link');
  if (prefix === '/tematicas/') {
   const detail = THEME_DETAILS.find(t => member.route === `${prefix}${t.slug}/`); assert(detail);
   assert.equal(all(member.dom, '[data-package], [data-offer]').length, 2);
   assert.equal(detail.related.length, 3); assert.equal(new Set(detail.related).size, 3);
   for (const slug of detail.related) assert(slug !== detail.slug && links.includes(`${prefix}${slug}/`));
   for (const element of detail.elements) assert(text(one(member.dom, 'main')).includes(element));
   assert(links.some(href => href.startsWith('https://wa.me/') && new URL(href).searchParams.get('text').includes(detail.name)), 'Theme-specific CTA');
   if (detail.character) assert(text(paragraphs[0]).includes('inspirada en') && !/licenciad[oa]|oficial/i.test(visible(one(member.dom, 'main'))));
  } else {
   const detail = ZONE_DETAILS.find(z => member.route === `${prefix}${z.slug}/`); assert(detail);
   assert.deepEqual(Object.keys(detail).sort(), ['slug','name','barrios','venues','faq','paragraph'].sort());
   assert.equal(all(member.dom, '[data-package]').length, PACKAGES.length);
   assert.equal(graph.find(n => n['@type'] === 'Service').areaServed, detail.name);
   assert(!/\bminutos?\b/i.test(text(paragraphs[0])));
  }
 });
 let maxSimilarity = 0;
 if (args.includes('--uniqueness') || final) for (let i = 0; i < members.length; i++) for (let j = i + 1; j < members.length; j++) {
  const sets = [members[i],members[j]].map(p => grams(text(one(p.dom,'[data-main-paragraph]'))));
  const intersection = [...sets[0]].filter(s => sets[1].has(s)).length;
  const union = new Set([...sets[0],...sets[1]]).size;
  maxSimilarity = Math.max(maxSimilarity, union ? intersection / union : 1);
  check(union > 0 && intersection / union < .60, `Paragraph 5-gram Jaccard >= .60: ${members[i].route}, ${members[j].route}`);
 }
 if (members.length && (args.includes('--uniqueness') || final)) notes.push(`${prefix} main-paragraph uniqueness: ${members.length * (members.length - 1) / 2} pairs; maximum Jaccard ${maxSimilarity.toFixed(3)}.`);
 if (!members.length) notes.push(`DEFERRED B3: ${prefix} uniqueness (no built detail routes).`);
}
function articleText(n) {
 if (!n || ['header','footer','nav','script','style'].includes(n.tag) || n.attrs?.hidden !== undefined || n.attrs?.['aria-hidden'] === 'true' || n.attrs?.['data-faq'] !== undefined || n.attrs?.['data-image-slot'] !== undefined || /(?:^|\s)(?:cta-card|faq)(?:\s|$)/.test(n.attrs?.class || '')) return '';
 return n.text ?? (n.children || []).map(articleText).join(' ');
}
for (const page of [...pages.values()].filter(p => /^\/ideas\/[^/]+\/$/.test(p.route))) test(`B4 guide ${page.route}`, () => {
 const article = one(page.dom,'article[data-guide]');
 assert(article, 'Main guide article required');
 const idea = IDEAS.find(i => page.route === `/ideas/${i.slug}/`); assert(idea);
 assert.equal(text(one(page.dom, 'h1')), idea.h1);
 assert.deepEqual(all(article, 'h2').map(text), idea.sections.map(s => s.heading));
 const ctas = all(article, '.cta-card'); assert.equal(ctas.length, 2);
 const sections = all(article, '.guide-section');
 assert.equal(article.children.indexOf(ctas[0]), article.children.indexOf(sections[1]) + 1, 'CTA follows second H2 section');
 assert.equal(article.children.at(-1), ctas[1], 'End CTA required');
 for (const card of ctas) {
  assert.equal(text(one(card, '[data-price-caption]')), priceCaption(idea.offer.price));
  assert.equal(new URL(one(card, 'a').attrs.href).searchParams.get('text'), packageMessage(idea.offer, page.route));
 }
 assert.equal(all(article, '[data-image-slot]').length, 0, 'No empty guide image placeholder until images exist');
 const links = all(article, 'a').map(a => a.attrs.href);
 assert(links.includes(`/tematicas/${idea.theme}/`) && links.includes('/combos-y-precios/'), 'Theme and package links required');
 assert(all(pages.get('/ideas/').dom, 'a').some(a => a.attrs.href === page.route), 'Hub links guide');
 if (args.includes('--words') || final) {
  const count = words(articleText(article)).length;
  assert(count >= 700 && count <= 1000, `article words ${count}, expected 700–1000`);
  notes.push(`${page.route}: ${count} article words (navigation, CTA, FAQ and image panel excluded).`);
 }
});
if (![...pages.keys()].some(r => /^\/ideas\/[^/]+\/$/.test(r))) notes.push('DEFERRED B4: guide word counts (no built guides).');
if (args.includes('--calc') || Number(phase[1]) >= 2) {
 // B2 supplies this pure contract alongside its browser renderer.
 if (!existsSync('assets/js/calc.js')) check(false,'Calculator required for B2+ / --calc');
 else {
  try {
   const source = read('assets/js/calc.js');
   const context = { window: {}, document: { addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; } }, console };
   vm.runInNewContext(source,context);
   const calc = context.window.BS_CALCULATOR;
   const data = { PACKAGES, ADDONS, ZONES, PRICES, EXTRA_FOOD, confirmation: CONFIRMATION, pricePrefix: PRICES.mode === 'estimated' ? 'Precio estimado desde' : 'Precio desde', primaryCta: PRIMARY_CTA };
   assert.equal(typeof calc?.calculate, 'function', 'Expose window.BS_CALCULATOR.calculate(input, {PACKAGES,ADDONS,ZONES})');
   const fixtures = [ ['basico',15,[],'asuncion',1150000], ['estrella',30,[],'asuncion',1850000], ['estrella',40,['torta'],'asuncion',2620000], ['estrella',45,[],'asuncion',null], ['premium',40,['torta'],'asuncion',2750000], ['basico',15,[],'luque',1190000] ];
   for (const [packageId,guests,addons,zone,total] of fixtures) { const out = calc.calculate({packageId,guests,addons,zone},data); assert.equal(out.total,total); assert.equal(out.guests,guests); assert.equal(out.custom,total === null); assert(out.whatsapp.includes(PRICES.label)); assert(calc.render(out).includes(PRICES.label)); if (total !== null) assert(out.whatsapp.includes(priceCaption(total))); if (packageId === 'premium') assert(out.disabledAddons.includes('torta') && out.disabledAddons.includes('souvenirs')); }
   const other = calc.calculate({packageId:'estrella',guests:35,addons:[],zone:'otra'},data); assert.equal(other.total,null); assert.equal(other.custom,true);
   // UI contract: custom quote must omit a stale numeric total and serialize input.
   assert.equal(typeof calc.render, 'function', 'Expose calculator render(state) for UI fixtures');
   const custom = calc.calculate({packageId:'estrella',guests:45,addons:[],zone:'asuncion'},data);
   const rendered = calc.render(custom); assert(/45/.test(rendered)); assert(!/Gs\.\s*\d/.test(rendered), 'Custom quote hides total');
   assert(!/Gs\.\s*\d/.test(custom.whatsapp || ''), 'Custom WhatsApp omits old total');
   for (const route of ['/', '/combos-y-precios/']) {
    const b = browser(analyticsHtml(route), route);
    b.context.CustomEvent = class { constructor(type) { this.type = type; } };
    b.document.dispatchEvent = event => b.fire(b.document, event.type);
    vm.runInNewContext(source, b.context);
    const root = b.q('[data-calculator]'), range = b.q('[data-guests]'), cta = b.q('[data-calc-cta]');
    const message = () => new URL(cta.href).searchParams.get('text');
    const choose = id => { all(root, '[name="calc-package"]').forEach(n => n.checked = n.value === id); b.fire(root, 'change'); };
    const result = () => parse(b.q('[data-calc-output]').innerHTML);
    assert.equal(text(one(result(), '[data-calc-scope]')), UI.montage);
    assert.equal(text(one(result(), '[data-calc-included]')), UI.includedGuests.replace('{N}', PACKAGES[1].included));
    range.value = '15'; b.fire(range, 'input');
    assert.equal(text(one(result(), '[data-calc-included]')), UI.includedGuests.replace('{N}', PACKAGES[1].included));
    range.value = '35'; b.fire(range, 'input');
    assert.equal(all(result(), '[data-calc-included]').length, 0);
    assert.equal(text(one(result(), '[data-calc-scope]')), UI.montage);
    range.value = '45'; b.fire(range, 'input');
    assert.equal(all(result(), '[data-calc-scope], [data-calc-included]').length, 0);
    range.value = '30'; b.fire(range, 'input');
    assert.equal(root.hidden, false); assert(message().includes(priceCaption(PACKAGES[1].price)));
    range.value = '45'; b.fire(range, 'input'); assert(!/Gs\.\s*\d/.test(message()));
    choose('premium'); assert.equal(range.value, '45'); assert(message().includes('3.050.000'));
    for (const id of ['torta','souvenirs']) { assert(b.q(`[data-addon][value="${id}"]`).disabled); assert.equal(b.q(`[data-addon-note="${id}"]`).textContent, 'incluido'); }
    choose('basico'); assert.equal(range.value, '45'); assert.equal(cta.textContent, 'Pedir cotización'); assert(!/Gs\.\s*\d/.test(b.q('[data-calc-output]').innerHTML));
    choose('estrella'); range.value = '40'; b.q('[data-addon][value="torta"]').checked = true; b.fire(root, 'change'); assert(message().includes('2.620.000'));
    choose('premium'); assert(message().includes('2.750.000')); choose('estrella'); assert(message().includes('2.620.000'));
    b.q('[data-calc-zone]').value = 'otra'; b.fire(root, 'change'); assert(!/Gs\.\s*\d/.test(message())); assert(message().includes('Otra zona'));
    b.fire(b.q('[data-guest-step="5"]'), 'click'); assert.equal(range.value, '45');
    b.fire(cta, 'click'); assert.equal(b.events().length, 0);
    b.fire(b.q('[data-consent="accepted"]'), 'click'); b.fire(cta, 'click'); b.fire(cta, 'click'); assert.equal(b.events().filter(e => e[1] === 'calc_submit').length, 1);
    assert(all(pages.get(route).dom, 'a').some(a => a.attrs.href === '/combos-y-precios/'));
   }
   notes.push('PASS: six calculator fixtures; rendered package switching, bundled add-ons, zona otra, retained guests, WhatsApp and consent/debounce.');
  } catch (error) { check(false, 'Calculator: ' + error.message); }
 }
} else notes.push('DEFERRED B2: JS calculator fixtures; static package prices checked.');
if (Number(phase[1]) >= 5 || final) check(existsSync('lead-forward.php'),'B5 requires lead-forward.php');
else notes.push('DEFERRED B5: lead-forward.php; forms have the full endpoint contract.');

// B6 can opt into live HTTP and ZIP central-directory checks without dependencies.
if (args.includes('--http')) {
 const origin = args[args.indexOf('--http') + 1];
 for (const row of outputs) {
  try { const response = await fetch(new URL(row.route,origin), {redirect:'manual'}); check(response.status === 200, `HTTP ${response.status} ${row.route}`); const html = await response.text(); check(html.includes(`href="${SITE.url + row.route}"`), `HTTP canonical ${row.route}`); }
  catch (error) { check(false, `HTTP ${row.route}: ${error.message}`); }
 }
 try { const response = await fetch(new URL('/__verify-missing-page__/',origin), {redirect:'manual'}); check(response.status === 404, 'Missing URL must return HTTP 404'); check((await response.text()).includes(EXTRAS['/404.html'].h1), 'Missing URL must serve the custom 404 page'); } catch (error) { check(false, 'HTTP custom 404: ' + error.message); }
} else notes.push('DEFERRED B6: live HTTP checks; use --http <preview-origin>.');
if (args.includes('--zip')) test('Deployment ZIP', () => {
 const buf = readFileSync(args[args.indexOf('--zip') + 1]); const entries = new Set();
 for (let pos = 0; pos + 46 <= buf.length; pos++) if (buf.readUInt32LE(pos) === 0x02014b50) { const len = buf.readUInt16LE(pos + 28); entries.add(buf.subarray(pos + 46,pos + 46 + len).toString('utf8')); pos += 45 + len + buf.readUInt16LE(pos + 30) + buf.readUInt16LE(pos + 32); }
 const files = path => readdirSync(path,{withFileTypes:true}).flatMap(d => d.isDirectory() ? files(join(path,d.name)) : [join(path,d.name).replaceAll('\\','/')]);
 for (const name of new Set([...manifest.map(r => r.output),'index.html','404.html','gracias.html','lead-forward.php','.htaccess','robots.txt','sitemap.xml',...files('assets')])) assert(entries.has(name), `ZIP missing ${name}`);
 for (const name of entries) assert(!/^(?:plan|docs|deploy|codex-input)\/|\.mjs$|leads\.log|vendercrm-config/.test(name), `ZIP contains private file ${name}`);
});
else notes.push('DEFERRED B5/B6: deployment ZIP; use --zip <file>.');
function bytes(path) { if (!existsSync(path)) return 0; return readdirSync(path,{withFileTypes:true}).reduce((n,d) => n + (d.isDirectory() ? bytes(join(path,d.name)) : statSync(join(path,d.name)).size),0); }
console.log(`Manifest: ${manifest.length} routes; ${built.length} built; ${outputs.length} HTML outputs; ${manifest.filter(r => r.built && r.indexable).length} sitemap entries.`);
console.log(`Weight: max HTML + CSS + JS + calc ${maxWeight} bytes; fonts ${bytes('assets/fonts')} bytes; images ${bytes('assets/img')} bytes (reported separately).`);
if (!SITE.email) notes.push('FLAG: public SITE.email must be confirmed before Gate A; none invented.');
if (!SITE.leadEmail) notes.push('FLAG: notification email Q21 awaits confirmation for B5/Gate A.');
if (pages.get('/')?.html.includes('fonts.googleapis.com')) notes.push('FLAG: Google Fonts fallback; local Instrument Serif/Satoshi files absent.');
notes.push('PHP lint: php -l lead-forward.php — not available locally; Anton owns hosted form/email/log test at Gate A.');
for (const note of notes) console.log(note);
if (failures.length) { failures.forEach(f => console.error('FAIL: ' + f)); process.exitCode = 1; }
else console.log(`PASS: applicable ${phase} checks, including executed consent/menu/form/analytics behavior.`);
