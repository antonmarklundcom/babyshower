// Service pages, the services hub and the reveal/anito heroes.
import { THEMES as THEME_DETAILS } from '../../themes.mjs';
import { REVEAL, ANITO, CONFIRMATION, fmtGs, SITE, PRIMARY_CTA, DELIVERY, LAUNCH_NOTE, UI, SERVICE_HUB, SERVICE_NOTE } from '../../content.mjs';
import { p, esc, waHref, wa, svcIcon, link } from '../html.mjs';
import { faq, quote, offerCard, steps, themeGrid } from './shared.mjs';
import { imagery, imageFigure } from '../imagery.mjs';
import { homeZones } from './home.mjs';
import { guideLinks } from './guides.mjs';

function serviceCta(route, subject) {
 return link(waHref(`Hola, vengo de ${SITE.domain} (${route}) y quiero consultar por ${subject}. Fecha tentativa: ____ · Invitados: ____ · Zona: ____`), PRIMARY_CTA, 'consulta-servicio', 'btn btn--primary');
}
// Service cards shared by the home page, /servicios/ and "Otros servicios" on each service page.
export function serviceCards(items, loc, heading = 'h3') {
 return `<div class="service-cards">${items.map(s => `<article class="service-card">${svcIcon(s.icon)}<${heading}>${link(s.route, s.name, loc, 'service-card__link')}</${heading}>${p(s.summary)}<p class="service-card__price"><span class="price-label">${esc(UI.pricePrefix)}</span> <strong>${esc(fmtGs(s.price))}</strong></p></article>`).join('')}</div>`;
}
export function serviceHero(route, page) {
 const s = page.detail;
 const from = s ? Math.min(...s.offers.map(o => o.price)) : page.type === 'reveal' ? Math.min(...REVEAL.packages.map(o => o.price)) : page.type === 'anito' ? ANITO.price : null;
 const figure = imageFigure(s ? s.image : page.image || imagery.find(image => image.use === route && image.placed && image.status !== 'rejected')?.id, 'svc-hero__image', '(max-width: 959px) 90vw, 560px', true);
 return `<section class="svc-hero"><div class="wrap svc-hero__grid"><div class="svc-hero__copy"><span class="eyebrow">${esc(s ? SITE.serviceArea : UI.servicesEyebrow)}</span><h1>${esc(page.h1)}</h1>${p(s ? s.intro : page.intro || page.description)}${from ? `<p class="svc-hero__price"><span class="price-label">${esc(UI.pricePrefix)}</span> <span class="price-amount">${esc(fmtGs(from))}</span></p>` : ''}<div class="actions">${s ? serviceCta(route, s.subject) : wa(route, 'portada-servicios')}${link('#presupuesto', UI.quoteShort, 'portada-servicio', 'btn btn--ghost')}</div><p class="launch-note">${esc(LAUNCH_NOTE)}</p><ul class="check-list check-list--inline">${UI.heroTrust.map(t => `<li>${svcIcon('check', 'check-icon')}${esc(t)}</li>`).join('')}</ul></div>${figure ? `<div class="svc-hero__media">${figure}</div>` : ''}</div></section>`;
}
export function servicesBody(route, page) {
 const questions = `<section><div class="wrap narrow"><h2>${esc(UI.faq)}</h2>${faq(page.faq)}</div></section>`;
 if (page.type === 'services') return `<section class="services-section"><div class="wrap">${serviceCards(SERVICE_HUB, 'servicios-hub', 'h2')}${p(CONFIRMATION)}</div></section>${steps()}${homeZones()}${questions}${quote(route, '')}`;
 const s = page.detail;
 const themes = s.themes.map(slug => THEME_DETAILS.find(t => t.slug === slug)).filter(Boolean);
 return `<section class="svc-options"><div class="wrap"><span class="eyebrow">${esc(UI.optionsTitle)}</span><h2>${esc(s.nav)}: elegí la opción que va con tu evento</h2><div class="offer-grid${s.offers.length === 3 ? ' offer-grid--3' : ''}">${s.offers.map(o => offerCard(o, route)).join('')}</div>${p(SERVICE_NOTE)}</div></section><section class="svc-detail"><div class="wrap svc-detail__grid"><div><span class="eyebrow">${esc(UI.idealTitle)}</span><h2>${esc(UI.idealTitle)}</h2><ul class="ideal-list">${s.ideal.map(item => `<li>${svcIcon('check', 'check-icon')}${esc(item)}</li>`).join('')}</ul></div><div><h2>${esc(UI.howTitle)}</h2><p data-main-paragraph>${esc(s.paragraph)}</p>${p(DELIVERY)}${serviceCta(route, s.subject)}</div></div></section>${steps()}${themes.length ? `<section><div class="wrap"><h2>Temáticas para inspirarte</h2>${themeGrid(themes, 'theme-related')}</div></section>` : ''}${guideLinks(s.guides, 'servicio-guias')}<section class="services-section"><div class="wrap"><h2>${esc(UI.otherServices)}</h2>${serviceCards(SERVICE_HUB.filter(item => item.route !== route), 'servicio-otros')}</div></section>${questions}${quote(route, s.formType)}`;
}
