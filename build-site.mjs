import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { THEMES as THEME_DETAILS } from './themes.mjs';
import { ZONES as ZONE_DETAILS } from './zones.mjs';
import { IDEAS } from './ideas.mjs';
import { ADDONS, REVEAL, ANITO, COMPARISON, EXTRA_FOOD, CONFIRMATION } from './content.mjs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SITE, WA_NUMBER, ANALYTICS_ID, PRICES, PRIMARY_CTA, RESPONSE, POLICY, TRUST, DELIVERY, PACKAGES, ZONES, THEMES, NAV, FOOTER_NAV, WA_MENU, STEPS, ABOUT, LEGAL, UI, PAGES, EXTRAS, priceCaption, packageMessage } from './content.mjs';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
const manifest = JSON.parse(readFileSync('docs/routes.json', 'utf8'));
const guides = manifest.filter(r => r.phase === 'B4' && r.route !== '/ideas/').map(r => {
 const detail = IDEAS.find(idea => r.route === `/ideas/${idea.slug}/`);
 if (!detail) throw new Error(`Missing guide ${r.route}`);
 PAGES[r.route] = { ...detail, type: 'guide', detail };
 return { ...r, detail };
});
PAGES['/ideas/'] = { type: 'ideas', title: 'Ideas para tu baby shower | Guías en Paraguay', description: 'Explorá guías para organizar tu baby shower: temáticas, juegos, decoración en casa, revelación de género y una checklist para repartir las tareas.', h1: 'Ideas para tu baby shower' };
const headerNav = [...NAV];
headerNav.splice(headerNav.findIndex(([href]) => href === '/ideas/'), 0, ['/zonas/', 'Zonas']);
for (const t of THEME_DETAILS) PAGES[`/tematicas/${t.slug}/`] = { type: 'theme', detail: t, title: `${t.name}: decoración para baby shower`, description: `Explorá la propuesta de ${t.name} para baby shower o primer añito: colores, elementos y combos con precios estimados. Consultá por WhatsApp.`, h1: `Decoración ${t.character ? 'inspirada en' : 'de'} ${t.name} para baby shower y primer añito`, faq: t.faq };
const deliveryNote = z => `Recargo estimado de traslado en ${z.name}: ${priceCaption(z.delivery)}`;
for (const z of ZONE_DETAILS.filter(z => manifest.some(r => r.route === `/zonas/${z.slug}/`))) {
 const delivery = ZONES.find(item => item.slug === z.slug);
 if (!delivery || delivery.delivery === null) throw new Error(`Missing delivery for ${z.slug}`);
 PAGES[`/zonas/${z.slug}/`] = { type: 'zone', detail: z, delivery: delivery.delivery, title: `Baby shower en ${z.name}: combos`, description: `Consultá tu baby shower en ${z.name}. Conocé los espacios, el recargo estimado y los combos con traslado ya sumado al precio mostrado.`, h1: `Baby shower en ${z.name}`, faq: z.faq.map((f, i) => i ? f : { ...f, a: `${deliveryNote(delivery)} ${f.a}` }) };
}
PAGES['/tematicas/'] = { type: 'themes', title: 'Temáticas para baby shower y primer añito', description: 'Elegí una temática para tu baby shower o primer añito. Explorá paletas, elementos decorativos y combos con precios estimados para consultar.', h1: 'Temáticas para baby shower y primer añito' };
PAGES['/zonas/'] = { type: 'zones', title: 'Zonas de baby shower en Gran Asunción', description: 'Consultá las zonas de atención para tu baby shower en Asunción y alrededores. Revisá el recargo estimado de traslado y las propuestas por ciudad.', h1: 'Zonas donde montamos tu baby shower' };
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c');
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex').slice(0, 12);
const ASSET_V = Object.fromEntries(['assets/css/site.css', 'assets/js/site.js', 'assets/js/motion.js', 'assets/js/calc.js'].map(path => [path, hash(path)]));
const asset = path => `/${path}?v=${ASSET_V[path]}`;
const waHref = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const waDefault = route => waHref(WA_MENU.options.at(-1).text(route));
const p = text => `<p>${esc(text)}</p>`;
const icon = '<svg viewBox="0 0 24 24" class="wa-icon" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.4c-.3.7-1.4 1.2-2 1.2-1.4 0-3.3-1-4.9-2.4-1.7-1.5-3-3.5-3-4.9 0-.8.4-1.7.9-2.1.2-.2.5-.3.8-.2l1 2.3c.1.3-.5.9-.7 1.1.5 1.2 2 2.8 3.4 3.4.3-.3.9-1.1 1.2-1l2.3 1.1c.3.1.3.8.1 1.5Z"/></svg>';
function link(href, label, loc, cls = '', extra = '') {
 const event = href.startsWith('https://wa.me/') ? 'whatsapp_click' : 'navigation';
 return `<a href="${esc(href)}"${cls ? ` class="${cls}"` : ''} data-ev="${event}" data-ev-loc="${loc}" ${extra}>${esc(label)}</a>`;
}
function wa(route, loc, cls = 'btn btn--primary', trigger = false) {
 return `<a class="${cls}" href="${esc(waDefault(route))}" data-ev="whatsapp_click" data-ev-loc="${loc}"${trigger ? ' data-wa-trigger aria-haspopup="dialog" aria-controls="wa-menu" aria-expanded="false"' : ''}>${icon}<span>${esc(PRIMARY_CTA)}</span></a>`;
}
const nav = (items, route, loc) => items.map(([href, label]) => link(href, label, loc, '', href === route ? 'aria-current="page"' : '')).join('');
function header(route) {
 return `<a class="skip" href="#contenido">${esc(UI.skip)}</a><header class="hdr" data-hdr><div class="wrap hdr-row"><a href="/" class="brand" data-ev="navigation" data-ev-loc="marca">${esc(SITE.brand)}<span class="brand-suffix">${esc(SITE.suffix)}</span></a><nav class="desktop-nav" aria-label="${esc(UI.mainNav)}">${nav(headerNav, route, 'cabecera')}</nav><div class="header-contact"><span class="phone">${esc(SITE.phone)}</span>${wa(route, 'cabecera', 'btn btn--outline', true)}</div><button type="button" class="burger" data-hdr-burger aria-expanded="false" aria-controls="hdr-panel" aria-label="${esc(UI.menu)}" data-ev="menu_open" data-ev-loc="cabecera"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2"/></svg></button></div><nav id="hdr-panel" data-hdr-panel class="mobile-nav wrap" aria-label="${esc(UI.mainNav)}">${nav(headerNav, route, 'menu-movil')}</nav></header>`;
}
function footer(route) {
 return `<footer class="footer"><div class="wrap footer-grid"><div><strong class="brand">${esc(SITE.name)}</strong>${p(SITE.operator)}${p(SITE.serviceArea)}${p(SITE.hours)}${link(waDefault(route), SITE.phone, 'pie')}${SITE.email ? link('mailto:' + SITE.email, SITE.email, 'pie') : ''}${SITE.ruc ? p(SITE.ruc) : ''}${SITE.instagram ? link(SITE.instagram, UI.instagram, 'pie') : ''}</div><nav aria-label="${esc(UI.footerNav)}">${nav(FOOTER_NAV, route, 'pie')}<button type="button" class="text-button" data-consent-revoke data-ev="consent_revoke" data-ev-loc="pie">${esc(UI.preferences)}</button></nav></div></footer>`;
}
function waMenu(route) {
 return `<div id="wa-menu" class="wa-menu" data-wa-menu hidden><div class="wa-backdrop" data-wa-close aria-hidden="true"></div><div class="wa-panel" data-wa-panel role="dialog" aria-modal="true" aria-labelledby="wa-title"><div class="panel-head"><h2 id="wa-title">${esc(UI.waTitle)}</h2><button class="close" type="button" data-wa-close aria-label="${esc(UI.close)}" data-ev="menu_close" data-ev-loc="whatsapp">×</button></div><ul>${WA_MENU.options.map(o => `<li>${link(waHref(o.text(route)), o.label, 'panel-whatsapp', 'wa-menu__option', `data-wa-option="${o.id}"`)}</li>`).join('')}</ul>${p(UI.waFoot)}</div></div><a class="wa-fab" href="${esc(waDefault(route))}" data-wa-trigger aria-haspopup="dialog" aria-controls="wa-menu" aria-expanded="false" aria-label="${esc(UI.waLabel)}" data-ev="whatsapp_click" data-ev-loc="flotante">${icon}</a><div class="mobile-bar">${wa(route, 'barra-movil')}${link('/#calculadora', UI.calc, 'barra-movil', 'btn btn--ghost')}</div>`;
}
function consent() {
 return `<aside class="consent" data-consent-banner aria-labelledby="consent-title" hidden><strong id="consent-title">${esc(UI.consentTitle)}</strong>${p(UI.consent)}<div class="actions"><button type="button" class="btn btn--primary" data-consent="accepted" data-ev="consent_accept" data-ev-loc="cookies">${esc(UI.accept)}</button><button type="button" class="btn btn--ghost" data-consent="rejected" data-ev="consent_reject" data-ev-loc="cookies">${esc(UI.reject)}</button></div></aside>`;
}
function form(route) {
 const f = UI.form;
 const input = (name, attrs) => `<div class="field"><label for="${name}">${esc(f[name])}</label><input id="${name}" name="${name}" ${attrs} aria-describedby="error-${name}"><span class="field-error" id="error-${name}" hidden></span></div>`;
 const select = (name, options) => `<div class="field"><label for="${name}">${esc(f[name])}</label><select name="${name}" id="${name}" required aria-describedby="error-${name}"><option value="">${esc(f.choose)}</option>${options.map(([value, label]) => `<option value="${value}">${esc(label)}</option>`).join('')}</select><span class="field-error" id="error-${name}" hidden></span></div>`;
 return `<form method="post" action="/lead-forward.php" data-lead-form><p role="alert" tabindex="-1" data-form-errors hidden></p><div class="form-grid">${input('nombre', 'autocomplete="name" minlength="2" maxlength="60" required')}${input('whatsapp', 'type="tel" autocomplete="tel" inputmode="tel" pattern="(?:0|\\+?595)9[0-9]{8}" required')}${input('fecha', 'type="date"')}<label class="checkbox"><input type="checkbox" data-date-unknown>${esc(f.unknown)}</label>${input('invitados', 'type="number" min="5" max="200" step="1"')}${select('tipo', f.types)}${select('zona', ZONES.map(z => [z.slug, z.name]))}<div class="field field-wide"><label for="mensaje">${esc(f.mensaje)}</label><textarea name="mensaje" id="mensaje" maxlength="500" rows="4" aria-describedby="error-mensaje"></textarea><span class="field-error" id="error-mensaje" hidden></span></div></div><input type="hidden" name="origen" value="${route}"><input type="hidden" name="sid" value=""><input type="hidden" name="empresa" value=""><button class="btn btn--primary" type="submit" data-ev="form_attempt" data-ev-loc="formulario">${esc(f.submit)}</button>${p(RESPONSE)}${link('/privacidad/', f.privacy, 'formulario')}</form>`;
}
function contact(route, heading = true) {
 return `<section class="contact-section"><div class="wrap split contact-split"><div>${heading ? `<h2>${esc(UI.contact)}</h2>` : ''}${p(RESPONSE)}${wa(route, 'contacto')}${p(SITE.phone)}${p(SITE.hours)}</div><div class="form-panel">${form(route)}</div></div></section>`;
}
function cards(route, items = PACKAGES, delivery = 0) {
 return `<div class="package-grid">${items.map(item => ({ ...item, price: item.price + delivery })).map((item, i) => `<article class="card ${i === 1 ? 'card--raised featured' : i === 0 ? 'card--hair' : 'card--bare'}" data-package="${item.id}" data-price="${item.price}"><div class="motif motif-${i}" aria-hidden="true"><span></span></div>${item.badge ? `<span class="badge">${esc(item.badge)}</span>` : ''}<h3>${esc(item.name)}</h3><p class="price-caption" data-price-caption>${esc(priceCaption(item.price))}</p>${p(item.description)}${p(item.chip)}<details><summary>${esc(UI.exclusions)}</summary>${p(item.exclusions)}</details>${link(waHref(packageMessage(item, route)), PRIMARY_CTA, 'combo-' + item.id, 'btn btn--primary')}</article>`).join('')}</div>`;
}
const steps = () => `<section class="steps-section"><div class="wrap"><h2>${esc(UI.steps)}</h2><ol class="steps">${STEPS.map(([title, body], i) => `<li><span class="step-number" aria-hidden="true">0${i + 1}</span><h3>${esc(title)}</h3>${p(body)}</li>`).join('')}</ol></div></section>`;
function faq(items, grouped = false) {
 const details = rows => rows.map(f => `<details data-faq><summary>${esc(f.q)}</summary>${p(f.a).replace('/como-funciona/', link('/como-funciona/', '/como-funciona/', 'preguntas'))}</details>`).join('');
 return `<div class="faq-list">${grouped ? [...new Set(items.map(f => f.group))].map(group => `<h2>${esc(group)}</h2>${details(items.filter(f => f.group === group))}`).join('') + `<h2>${esc(UI.reveal)}</h2>${link('/revelacion-de-genero/', UI.revealLink, 'preguntas')}` : details(items)}</div>`;
}
function home(route, page) {
 return `<section class="hero"><div class="wrap split"><div class="hero-copy"><span class="eyebrow">${esc(UI.eyebrow)}</span><h1>${esc(page.h1)}</h1>${p(UI.hero)}<div class="actions">${wa(route, 'portada')}${link('#calculadora', UI.calc, 'portada', 'btn btn--ghost')}</div></div><div class="hero-art" aria-hidden="true"><div class="arch"><span class="star">✦</span><div class="cloud"></div></div><span class="orb orb-one"></span><span class="orb orb-two"></span><span class="orb orb-three"></span></div></div></section><div class="trust-ribbon"><ul class="wrap">${TRUST.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><section><div class="wrap"><span class="eyebrow">${esc(UI.packagesEyebrow)}</span><h2>${esc(UI.packages)}</h2>${cards(route)}</div></section>${calculator(route)}<section class="dark-band grain"><div class="wrap"><h2 class="statement">${esc(UI.band)}</h2><div class="overlap card card--raised">${link('/tematicas/', UI.themeCta, 'franja', 'btn btn--primary')}</div></div></section>${steps()}<section class="theme-section"><div class="wrap"><h2>${esc(UI.themes)}</h2><div class="theme-grid">${THEMES.map((t, i) => `<a class="theme-card theme-${i % 3}" href="/tematicas/${t.slug}/" data-ev="navigation" data-ev-loc="tematicas"><span class="theme-motif" aria-hidden="true">${['✦', '○', '☁'][i % 3]}</span><h3>${esc(t.name)}</h3></a>`).join('')}</div></div></section><section><div class="wrap"><h2>${esc(UI.inclusions)}</h2><div class="editorial"><div><h3>${esc(UI.included)}</h3>${p(UI.montage)}${p(DELIVERY)}${PACKAGES.map(item => `<h3>${esc(item.name)}</h3>${p(item.description)}`).join('')}</div><div><h3>${esc(UI.exclusions)}</h3>${PACKAGES.map(item => `<h3>${esc(item.name)}</h3>${p(item.exclusions)}`).join('')}</div></div></div></section><section class="zones-section"><div class="wrap editorial"><h2>${esc(UI.zones)}</h2><div>${p(DELIVERY)}${link('/zonas/', UI.zones, 'zonas')}</div></div></section><section><div class="wrap editorial"><h2>${esc(UI.faq)}</h2>${faq(page.faq)}</div></section>${contact(route)}`;
}
function policy() { return `<section class="policy"><div class="wrap narrow"><h2>${esc(POLICY.heading)}</h2>${p(POLICY.sena)}${p(POLICY.cancel)}${p(UI.noContract)}</div></section>`; }
function calculator(route) {
 const config = { PACKAGES, ADDONS, ZONES, PRICES, EXTRA_FOOD, WA_NUMBER, route, primaryCta: PRIMARY_CTA, confirmation: CONFIRMATION, pricePrefix: PRICES.mode === 'estimated' ? 'Precio estimado desde' : 'Precio desde' };
 return `<section class="calc-section" id="calculadora"><div class="wrap"><span class="eyebrow">Calculadora</span><h2>Calculá tu precio en 30 segundos</h2>${link('/combos-y-precios/', UI.prices, 'calculadora-sin-js')}<div class="calc-panel" data-calculator hidden><script type="application/json" data-calc-config>${json(config)}</script><div><fieldset><legend>Elegí tu combo</legend>${PACKAGES.map(item => `<label class="calc-choice"><input type="radio" name="calc-package" value="${item.id}"${item.id === 'estrella' ? ' checked' : ''}><span>${esc(item.name)}<small>${esc(priceCaption(item.price))}</small></span></label>`).join('')}</fieldset><fieldset><legend>Invitados: <span data-guest-count>30</span></legend><div class="guest-controls"><button type="button" data-guest-step="-5" aria-label="Restá 5 invitados" data-ev="calc_adjust" data-ev-loc="calculadora">−</button><label class="sr-only" for="calc-guests">Cantidad de invitados</label><input id="calc-guests" data-guests type="range" min="15" max="60" step="5" value="30"><button type="button" data-guest-step="5" aria-label="Sumá 5 invitados" data-ev="calc_adjust" data-ev-loc="calculadora">+</button></div></fieldset><fieldset><legend>Adicionales</legend>${ADDONS.map(a => `<label class="calc-choice"><input type="checkbox" data-addon value="${a.id}"><span>${esc(a.name)} <strong data-addon-note="${a.id}"></strong><small>${esc(priceCaption(a.price))}</small></span></label>`).join('')}</fieldset><label for="calc-zone">Zona</label><select id="calc-zone" data-calc-zone>${ZONES.map(z => `<option value="${z.slug}">${esc(z.name)} — ${z.delivery === null ? 'cotizar' : 'recargo estimado Gs. ' + new Intl.NumberFormat('es-PY').format(z.delivery)}</option>`).join('')}</select>${p(DELIVERY)}</div><div><div data-calc-output aria-live="polite" aria-atomic="true"></div>${link(waDefault(route), PRIMARY_CTA, 'calculadora', 'btn btn--primary', 'data-calc-cta')}</div></div></div></section>`;
}
function offerCard(item, route) {
 return `<article class="card card--hair" data-offer="${item.id}" data-price="${item.price}"><h2>${esc(item.name)}</h2><p data-price-caption>${esc(priceCaption(item.price))}</p>${item.description ? p(item.description) : ''}${item.chip ? p(item.chip) : ''}${link(waHref(packageMessage(item, route)), PRIMARY_CTA, item.id, 'btn btn--primary')}</article>`;
}
function offers(route, page) {
 const questions = `<section><div class="wrap narrow"><h2>${esc(UI.faq)}</h2>${faq(page.faq)}</div></section>`;
 if (page.type === 'combos') {
  const rows = [['Precio estimado', ...PACKAGES.map(a => priceCaption(a.price))], ['Invitados incluidos', ...PACKAGES.map(a => a.id === 'basico' ? `${a.included} (solo decoración)` : a.included)], ['Máximo de invitados', ...PACKAGES.map(a => a.max)], ...COMPARISON, ['Invitado extra', ...PACKAGES.map(a => `${priceCaption(a.extra)} ${EXTRA_FOOD[a.id]}`)], ['Exclusiones', ...PACKAGES.map(a => a.exclusions)]];
  return `<section><div class="wrap">${p(page.intro)}${cards(route)}<div class="comparison-scroll" role="region" aria-label="Comparación de combos" tabindex="0"><table class="comparison"><caption>Qué incluye cada combo</caption><thead><tr><th scope="col">Detalle</th>${PACKAGES.map(a => `<th scope="col">${esc(a.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(([title, ...cells]) => `<tr><th scope="row">${esc(title)}</th>${cells.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>${calculator(route)}<section><div class="wrap"><h2>Adicionales</h2><div class="addon-grid">${ADDONS.map(a => offerCard(a, route)).join('')}</div></div></section><section><div class="wrap narrow"><h2>${esc(UI.payments)}</h2>${p(POLICY.pagos)}${p(POLICY.iva)}${link('/como-funciona/', UI.steps, 'politicas')}</div></section>${questions}`;
 }
 if (page.type === 'reveal') return `<section><div class="wrap">${p(REVEAL.intro)}<div class="offer-grid">${REVEAL.packages.map(a => offerCard(a, route)).join('')}</div><h2>Cómo funciona</h2><ol class="steps">${REVEAL.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>${offerCard(REVEAL.cake, route)}<h2>Adicionales a confirmar, solo exterior</h2><ul><li>Humo de color</li><li>Polvo holi</li></ul><h2>Revelación sencilla en casa</h2>${link('/ideas/revelacion-de-genero-sencilla/', '¿Querés hacerlo simple en casa? Mirá ideas de revelación de género sencilla', 'ideas-revelacion')}${p(REVEAL.repeat)}</div></section>${questions}`;
 return `<section><div class="wrap">${offerCard(ANITO, route)}<h2>Elegí tu temática</h2><div class="theme-grid">${THEMES.filter(t => ANITO.themes.includes(t.slug)).map((t, i) => link('/tematicas/' + t.slug + '/', t.name, 'tematicas-anito', 'theme-card theme-' + i % 3)).join('')}</div></div></section>${questions}`;
}
function themeGrid(items, cls = 'theme-bento') {
 return `<div class="${cls}">${items.map(t => link(`/tematicas/${t.slug}/`, t.name, 'tematicas', `theme-card tint-${t.tint}`)).join('')}</div>`;
}
function programmatic(route, page) {
 const t = page.detail;
 const cta = link(waHref(`Hola, vengo de ${SITE.domain} (${route}) y quiero consultar por ${t?.name || page.h1}. Fecha tentativa: ____ · Invitados: ____ · Zona: ____`), PRIMARY_CTA, 'consulta-tematica-zona', 'btn btn--primary');
 if (page.type === 'themes') return `<section><div class="wrap">${themeGrid(THEME_DETAILS)}</div></section><section class="dark-band grain"><div class="wrap"><h2>Contanos qué temática te gusta</h2>${cta}</div></section>`;
 if (page.type === 'zones') return `<section><div class="wrap">${p(DELIVERY)}<div class="zone-grid">${ZONE_DETAILS.map(z => {
  const child = manifest.find(r => r.route === `/zonas/${z.slug}/`);
  const delivery = ZONES.find(item => item.slug === z.slug);
  if (!delivery) throw new Error(`Missing zone ${z.slug}`);
  return `<article class="card card--hair"><h2>${child ? link(child.route, z.name, 'zona-hub') : esc(z.name)}</h2>${p(z.paragraph)}${p(deliveryNote(delivery))}</article>`;
 }).join('')}</div>${cta}</div></section>`;
 const questions = `<section><div class="wrap narrow"><h2>${esc(UI.faq)}</h2>${faq(page.faq)}${cta}</div></section>`;
 if (page.type === 'theme') {
  const packages = t.combos.map(id => [...PACKAGES, ANITO].find(item => item.id === id));
  if (packages.some(item => !item)) throw new Error(`Unknown combo for ${t.slug}`);
  return `<section><div class="wrap narrow"><h2>Paleta y elementos</h2>${p(t.palette)}<p data-main-paragraph>${esc(t.paragraph)}</p><h2>Elementos decorativos de la propuesta</h2><ul>${t.elements.map(e => `<li>${esc(e)}</li>`).join('')}</ul>${p('Los elementos temáticos y su alcance se confirman por WhatsApp según el combo y el espacio.')}${cta}</div></section><section><div class="wrap"><h2>Combos para esta temática</h2>${cards(route, packages.filter(item => item.id !== ANITO.id))}${packages.some(item => item.id === ANITO.id) ? offerCard(ANITO, route) : ''}</div></section><section><div class="wrap"><h2>Otras temáticas para explorar</h2>${themeGrid(t.related.map(slug => THEME_DETAILS.find(item => item.slug === slug)), 'theme-related')}</div></section>${questions}`;
 }
 return `<section><div class="wrap narrow"><h2>Tu evento en ${esc(t.name)}</h2><p data-main-paragraph>${esc(t.paragraph)}</p>${p(deliveryNote({ name: t.name, delivery: page.delivery }))}${p('Los precios de los combos ya incluyen este recargo estimado; no lo sumes de nuevo.')}${cta}</div></section><section><div class="wrap"><h2>Combos con traslado contemplado</h2>${cards(route, PACKAGES, page.delivery)}</div></section><section><div class="wrap"><h2>Elegí tu temática</h2>${themeGrid(THEME_DETAILS, 'theme-strip')}</div></section>${questions}`;
}
function guideCta(route, idea, location) {
 const offer = idea.offer;
 return `<aside class="cta-card card card--raised" aria-label="Consulta sobre ${esc(offer.name)}"><h3>${esc(idea.cta)}</h3>${p(offer.name)}<p data-price-caption>${esc(priceCaption(offer.price))}</p>${p(RESPONSE)}${link(waHref(packageMessage(offer, route)), PRIMARY_CTA, location, 'btn btn--primary')}</aside>`;
}
function ideasBody(route, page) {
 if (page.type === 'ideas') return `<section><div class="wrap"><div class="ideas-grid">${guides.map(({ route: child, detail }, i) => `<article class="card card--hair tint-${['sage','sky','blush'][i % 3]}"><h2>${link(child, detail.h1, 'ideas-hub')}</h2>${p(detail.description)}${link(child, 'Leé la guía', 'ideas-hub', 'btn btn--ghost')}</article>`).join('')}</div><div class="actions">${wa(route, 'ideas-hub')}</div></div></section>`;
 const idea = page.detail;
 const theme = THEMES.find(t => t.slug === idea.theme);
 return `<article class="guide wrap" data-guide><nav class="guide-breadcrumb" aria-label="Ruta de navegación">${link('/', 'Inicio', 'migas')} / ${link('/ideas/', 'Ideas', 'migas')}</nav>${p(idea.intro)}${idea.sections.map((s, i) => `<section class="guide-section"><h2>${esc(s.heading)}</h2>${s.paragraphs.map(p).join('')}</section>${i === 1 ? guideCta(route, idea, 'guia-intermedia') : ''}${i === 2 ? `<div class="guide-image tint-sky" data-image-slot="article" role="img" aria-label="${esc(idea.image)}"><span aria-hidden="true">✦</span><span>Inspiración ilustrativa</span></div>` : ''}`).join('')}<div class="guide-related"><p>Explorá la temática ${link(`/tematicas/${theme.slug}/`, theme.name, 'guia-tematica')} y compará ${link('/combos-y-precios/', 'combos y precios', 'guia-combos')} para preparar tu consulta.</p>${idea.offer.id === 'kit' ? link('/revelacion-de-genero/', 'Conocé el Kit Sorpresa', 'guia-kit') : ''}</div>${guideCta(route, idea, 'guia-final')}</article>`;
}
function body(route, page) {
 if (page.type === 'home') return home(route, page);
 const hero = `<section class="inner-hero${page.type === 'theme' ? ' tint-' + page.detail.tint : ''}"><div class="wrap"><span class="eyebrow">${esc(SITE.name)}</span><h1>${esc(page.h1)}</h1></div></section>`;
 if (['ideas', 'guide'].includes(page.type)) return hero + ideasBody(route, page);
 if (['themes', 'theme', 'zones', 'zone'].includes(page.type)) return hero + programmatic(route, page);
 if (['combos', 'reveal', 'anito'].includes(page.type)) return hero + offers(route, page);
 if (page.type === 'contact') return hero + contact(route, false);
 if (page.type === 'process') return hero + `<section><div class="wrap editorial"><h2>${esc(UI.who)}</h2><div>${p(ABOUT)}${wa(route, 'quienes-somos')}${SITE.email ? link('mailto:' + SITE.email, SITE.email, 'quienes-somos') : ''}</div></div></section>` + steps() + `<section><div class="wrap narrow"><h2>${esc(UI.payments)}</h2>${p(POLICY.pagos)}${p(POLICY.iva)}${p(POLICY.plazo)}</div></section>` + policy();
 if (page.type === 'faq') return hero + `<section><div class="wrap narrow">${faq(page.faq, true)}${wa(route, 'preguntas')}</div></section>`;
 if (['privacy', 'terms'].includes(page.type)) return hero + `<article class="legal wrap narrow">${LEGAL[page.type === 'privacy' ? 'privacy' : 'terms'].map(([title, ...paras]) => `<section><h2>${esc(title)}</h2>${paras.map(p).join('')}</section>`).join('')}${wa(route, 'legal')}${SITE.email ? link('mailto:' + SITE.email, SITE.email, 'legal') : ''}${page.type === 'terms' ? link('/privacidad/', UI.form.privacy, 'legal') : ''}</article>`;
 return hero + `<section><div class="wrap narrow">${p(UI[page.type])}<div class="actions">${wa(route, page.type)}${link('/', UI.home, page.type, 'btn btn--ghost')}</div></div></section>`;
}
function graph(route, page) {
 const org = SITE.url + '/#org', site = SITE.url + '/#site';
 const data = [ { '@type': 'Organization', '@id': org, name: SITE.name, url: SITE.url + '/', telephone: '+' + WA_NUMBER, ...(SITE.email ? { email: SITE.email } : {}), ...(SITE.instagram ? { sameAs: [SITE.instagram] } : {}) }, { '@type': 'WebSite', '@id': site, name: SITE.name, url: SITE.url + '/', publisher: { '@id': org }, inLanguage: 'es-PY' } ];
 if (route === '/') data.push({ '@type': 'LocalBusiness', '@id': SITE.url + '/#local', name: SITE.name, url: SITE.url + '/', areaServed: SITE.area, parentOrganization: { '@id': org } });
 if (['home', 'combos', 'reveal', 'anito', 'theme', 'zone'].includes(page.type)) data.push({ '@type': 'Service', '@id': SITE.url + route + '#servicio', name: page.h1, provider: { '@id': org }, areaServed: page.type === 'zone' ? page.detail.name : SITE.area, serviceType: page.h1 });
 if (route !== '/') data.push({ '@type': 'BreadcrumbList', '@id': SITE.url + route + '#migas', itemListElement: [{ '@type': 'ListItem', position: 1, name: SITE.name, item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: page.h1, item: SITE.url + route }] });
 if (page.type === 'guide') {
  data.find(n => n['@type'] === 'BreadcrumbList').itemListElement.splice(1, 0, { '@type': 'ListItem', position: 2, name: 'Ideas', item: SITE.url + '/ideas/' });
  data.find(n => n['@type'] === 'BreadcrumbList').itemListElement.at(-1).position = 3;
  data.push({ '@type': 'Article', '@id': SITE.url + route + '#articulo', headline: page.h1, description: page.description, datePublished: page.datePublished, author: { '@id': org }, publisher: { '@id': org }, mainEntityOfPage: SITE.url + route, inLanguage: 'es-PY' });
 }
 if (page.faq) data.push({ '@type': 'FAQPage', '@id': SITE.url + route + '#preguntas', mainEntity: page.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
 return { '@context': 'https://schema.org', '@graph': data };
}
// Only opt into self-hosted fonts when the required faces are all present.
const fontFiles = existsSync('assets/fonts') ? readdirSync('assets/fonts').filter(f => /\.woff2$/i.test(f)) : [];
const serif = fontFiles.find(f => /instrument.*serif/i.test(f));
const satoshi = [400, 500, 700].map(w => fontFiles.find(f => new RegExp(`satoshi.*(${w}|${{400:'regular',500:'medium',700:'bold'}[w]})`, 'i').test(f)));
const localFonts = serif && satoshi.every(Boolean);
const fonts = localFonts ? `<style>${[[serif, 'Instrument Serif', 400], ...satoshi.map((f, i) => [f, 'Satoshi', [400, 500, 700][i]])].map(([f, family, weight]) => `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url('/assets/fonts/${encodeURIComponent(f)}') format('woff2')}`).join('')}</style>` : '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&amp;family=Instrument+Serif&amp;display=swap" rel="stylesheet">';
const favicon = 'data:image/svg+xml,' + encodeURIComponent(readFileSync('assets/img/favicon.svg', 'utf8').trim());
function render(route, page, indexable) {
 const config = { analyticsId: ANALYTICS_ID, errors: UI.errors, form: UI.form, successCookie: 'bs_lead_success', consentKey: 'bs-consent' };
 return `<!doctype html>\n<html lang="es-PY"${localFonts ? '' : ' class="font-fallback"'}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${SITE.url + route}">${indexable ? '' : '<meta name="robots" content="noindex, follow">'}<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${SITE.url + route}"><meta property="og:locale" content="es_PY"><link rel="icon" type="image/svg+xml" href="${esc(favicon)}">${fonts}<link rel="stylesheet" href="${asset('assets/css/site.css')}"><script type="application/ld+json">${json(graph(route, page))}</script><script type="application/json" id="site-config">${json(config)}</script><script defer src="${asset('assets/js/site.js')}"></script><script defer src="${asset('assets/js/motion.js')}"></script>${['home', 'combos'].includes(page.type) ? `<script defer src="${asset('assets/js/calc.js')}"></script>` : ''}</head><body>${header(route)}<main id="contenido">${body(route, page)}</main>${footer(route)}${waMenu(route)}${consent()}</body></html>\n`;
}
for (const row of manifest.filter(r => r.built)) {
 if (!PAGES[row.route]) throw new Error(`No renderer for built route ${row.route}`);
 if (row.output !== (row.route === '/' ? 'index.html' : row.route.slice(1) + 'index.html')) throw new Error('Invalid output: ' + row.output);
 mkdirSync(dirname(row.output), { recursive: true });
 writeFileSync(row.output, render(row.route, PAGES[row.route], row.indexable));
}
for (const [route, page] of Object.entries(EXTRAS)) writeFileSync(route.slice(1), render(route, page, false));
const indexed = manifest.filter(r => r.built && r.indexable);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed.map(r => `  <url><loc>${SITE.url}${r.route}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`PASS: ${manifest.filter(r => r.built).length}/${manifest.length} routes; ${Object.keys(EXTRAS).length} special HTML outputs; ${indexed.length} sitemap entries.`);
if (!localFonts) console.log('FLAG: no complete local font set; Google Fonts Instrument Serif + DM Sans fallback.');
