// Guides (/ideas/) and their links.
import { THEMES, PRIMARY_CTA, RESPONSE, UI, priceCaption, packageMessage } from '../../content.mjs';
import { guides } from '../site-data.mjs';
import { p, esc, waHref, wa, link } from '../html.mjs';
import { imagery, imageSizes, imageFigure } from '../imagery.mjs';

function guideCta(route, idea, location) {
 const offer = idea.offer;
 return `<aside class="cta-card card card--raised" aria-label="Consulta sobre ${esc(offer.name)}"><h3>${esc(idea.cta)}</h3>${p(offer.name)}<p data-price-caption>${esc(priceCaption(offer.price))}</p>${p(RESPONSE)}${link(waHref(packageMessage(offer, route)), PRIMARY_CTA, location, 'btn btn--primary')}</aside>`;
}
export const GIRL_THEMES = ['mariposas', 'minnie-bebe', 'frutillita-bebe', 'blanca-nieves-bebe'];
export function guideLinks(slugs, loc) {
 const list = [...new Set(slugs)].map(slug => guides.find(g => g.route === `/ideas/${slug}/`)).filter(Boolean).slice(0, 4);
 return list.length ? `<section><div class="wrap narrow guide-more"><h2>${esc(UI.relatedGuides)}</h2><ul>${list.map(g => `<li>${link(g.route, g.detail.h1, loc)}</li>`).join('')}</ul></div></section>` : '';
}
export function moreGuides(route) {
 const others = guides.filter(g => g.route !== route);
 const start = guides.findIndex(g => g.route === route);
 const pick = [0, 1, 2].map(i => others[(start + i) % others.length]).filter(Boolean);
 return `<nav class="guide-more wrap" aria-label="${esc(UI.moreGuides)}"><h2>${esc(UI.moreGuides)}</h2><ul>${pick.map(g => `<li>${link(g.route, g.detail.h1, 'guia-relacionada')}</li>`).join('')}</ul></nav>`;
}
export function ideasBody(route, page) {
 if (page.type === 'ideas') return `<section><div class="wrap"><div class="ideas-grid">${guides.map(({ route: child, detail }, i) => `<article class="card card--hair tint-${['sage','sky','blush'][i % 3]}">${imageFigure(imagery.find(image => image.use === child && image.placed && image.status !== 'rejected')?.id, 'idea-card-image', '(max-width: 959px) 90vw, 540px')}<h2>${link(child, detail.h1, 'ideas-hub')}</h2>${p(detail.description)}${link(child, 'Leé la guía', 'ideas-hub', 'btn btn--ghost')}</article>`).join('')}</div><div class="actions">${wa(route, 'ideas-hub')}</div></div></section>`;
 const idea = page.detail;
 const theme = THEMES.find(t => t.slug === idea.theme);
 return `<article class="guide wrap" data-guide><nav class="guide-breadcrumb" aria-label="Ruta de navegación">${link('/', 'Inicio', 'migas')} / ${link('/ideas/', 'Ideas', 'migas')}</nav>${p(idea.intro)}${imageFigure(imagery.find(image => image.use === route && image.placed && image.status !== 'rejected')?.id, 'guide-figure', imageSizes.guide)}${idea.sections.map((s, i) => `<section class="guide-section"><h2>${esc(s.heading)}</h2>${s.paragraphs.map(p).join('')}</section>${i === 1 ? guideCta(route, idea, 'guia-intermedia') : ''}`).join('')}<div class="guide-related"><p>Explorá la temática ${link(`/tematicas/${theme.slug}/`, theme.name, 'guia-tematica')} y compará ${link('/combos-y-precios/', 'combos y precios', 'guia-combos')} para preparar tu consulta.</p>${idea.offer.id === 'kit' ? link('/revelacion-de-genero/', 'Conocé el Kit Sorpresa', 'guia-kit') : ''}${idea.service ? `<p>${link(idea.service[0], idea.service[1], 'guia-servicio')}</p>` : ''}${(idea.links || []).map(([href, label]) => `<p>${link(href, label, 'guia-enlace')}</p>`).join('')}</div>${guideCta(route, idea, 'guia-final')}</article>`;
}
