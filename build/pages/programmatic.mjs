// Theme and zone landing pages.
import { THEMES as THEME_DETAILS } from '../../themes.mjs';
import { ZONES as ZONE_DETAILS } from '../../zones.mjs';
import { IDEAS } from '../../ideas.mjs';
import { ZONES, ANITO, deliveryNote, SITE, PRIMARY_CTA, DELIVERY, PACKAGES, UI } from '../../content.mjs';
import { manifest } from '../site-data.mjs';
import { p, esc, waHref, link } from '../html.mjs';
import { faq, cards, themeGrid } from './shared.mjs';
import { guideLinks, GIRL_THEMES } from './guides.mjs';

export function programmatic(route, page) {
 const t = page.detail;
 const subject = page.type === 'zone' ? `un baby shower en ${t.name}` : page.type === 'zones' ? 'el traslado a mi zona' : page.type === 'themes' ? 'una temática' : `la temática ${t.name}`;
 const cta = link(waHref(`Hola, vengo de ${SITE.domain} (${route}) y quiero consultar por ${subject}. Fecha tentativa: ____ · Invitados: ____ · Zona: ____`), PRIMARY_CTA, 'consulta-tematica-zona', 'btn btn--primary');
 if (page.type === 'themes') return `<section><div class="wrap">${themeGrid(THEME_DETAILS, 'theme-bento', true)}</div></section><section class="dark-band grain"><div class="wrap"><h2>Contanos qué temática te gusta</h2>${cta}</div></section>`;
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
  return `<section><div class="wrap narrow"><h2>Paleta y elementos</h2><div class="theme-palette-list">${p(UI.palette)}<ul>${t.palette.split(/,|\s+y\s+/).map(word => word.trim()).filter(Boolean).map(word => `<li>${esc(word.charAt(0).toLocaleUpperCase('es-PY') + word.slice(1))}</li>`).join('')}</ul></div><p data-main-paragraph>${esc(t.paragraph)}</p><h2>Elementos decorativos de la propuesta</h2><ul>${t.elements.map(e => `<li>${esc(e)}</li>`).join('')}</ul>${p('Los elementos temáticos y su alcance se confirman por WhatsApp según el combo y el espacio.')}${cta}</div></section><section><div class="wrap"><h2>Combos para esta temática</h2>${cards(route, packages)}</div></section><section><div class="wrap"><h2>Otras temáticas para explorar</h2>${themeGrid(t.related.map(slug => THEME_DETAILS.find(item => item.slug === slug)), 'theme-related')}</div></section>${guideLinks([GIRL_THEMES.includes(t.slug) ? 'baby-shower-de-nina' : 'baby-shower-de-nino', ...IDEAS.filter(i => i.theme === t.slug).map(i => i.slug), 'centros-de-mesa-para-baby-shower', 'mesa-dulce-para-baby-shower', 'ideas-para-baby-shower'], 'tema-guias')}${questions}`;
 }
 return `<section><div class="wrap narrow"><h2>Tu evento en ${esc(t.name)}</h2><p data-main-paragraph>${esc(t.paragraph)}</p>${p(deliveryNote({ name: t.name, delivery: page.delivery }))}${p('Los precios de los combos ya incluyen este recargo estimado; no lo sumes de nuevo.')}${cta}</div></section><section><div class="wrap"><h2>Combos con traslado contemplado</h2>${cards(route, PACKAGES, page.delivery)}</div></section><section><div class="wrap"><h2>Elegí tu temática</h2>${themeGrid(THEME_DETAILS, 'theme-strip')}</div></section>${guideLinks(['que-se-necesita-para-un-baby-shower', 'ideas-para-baby-shower', 'mesa-dulce-para-baby-shower', 'centros-de-mesa-para-baby-shower'], 'zona-guias')}${questions}`;
}
