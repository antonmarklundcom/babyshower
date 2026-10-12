// Main content dispatcher: picks the body renderer for each page type.
import { SITE, POLICY, ABOUT, LEGAL, UI } from '../../content.mjs';
import { p, esc, wa, link } from '../html.mjs';
import { faq, contact, hasQuote, quote, quoteType, steps, policy, offers } from './shared.mjs';
import { imagery, imageSizes, imageFigure, themePalette } from '../imagery.mjs';
import { home } from './home.mjs';
import { programmatic } from './programmatic.mjs';
import { moreGuides, ideasBody } from './guides.mjs';
import { serviceHero, servicesBody } from './services.mjs';

export function body(route, page) {
 if (page.type === 'home') return home(route, page);
 // Theme and zone detail pages show the same hub path as their BreadcrumbList; other pages keep the brand eyebrow.
 const hub = { theme: ['/tematicas/', 'Temáticas'], zone: ['/zonas/', 'Zonas'] }[page.type];
 const eyebrow = hub ? `<nav class="eyebrow hero-breadcrumb" aria-label="Ruta de navegación">${link('/', 'Inicio', 'migas')}<span aria-hidden="true">/</span>${link(hub[0], hub[1], 'migas')}</nav>` : `<span class="eyebrow">${esc(SITE.name)}</span>`;
 const hero = `<section class="inner-hero${page.type === 'theme' ? ' tint-' + page.detail.tint : ''}"><div class="wrap">${eyebrow}<h1>${esc(page.h1)}</h1>${page.type === 'theme' ? (imageFigure(imagery.find(image => image.use === route && image.placed && image.status !== 'rejected')?.id, 'theme-hero-image', imageSizes.theme) || themePalette(page.detail, 'theme-hero-image')) : ['reveal', 'anito'].includes(page.type) ? imageFigure(imagery.find(image => image.use === route && image.placed && image.status !== 'rejected')?.id, 'theme-hero-image hero-wide', imageSizes.theme, true) : ''}</div></section>`;
 const lead = hasQuote(page) ? quote(route, quoteType(page)) : '';
 if (['ideas', 'guide'].includes(page.type)) return hero + ideasBody(route, page) + lead + (page.type === 'guide' ? moreGuides(route) : '');
 if (['themes', 'theme', 'zones', 'zone'].includes(page.type)) return hero + programmatic(route, page) + lead;
 if (['combos', 'reveal', 'anito'].includes(page.type)) return (['reveal', 'anito'].includes(page.type) ? serviceHero(route, page) : hero) + offers(route, page) + lead;
 if (['service', 'services'].includes(page.type)) return serviceHero(route, page) + servicesBody(route, page);
 if (page.type === 'contact') return hero + contact(route, false);
 if (page.type === 'process') return hero + `<section><div class="wrap editorial"><h2>${esc(UI.who)}</h2><div>${p(ABOUT)}${wa(route, 'quienes-somos')}${SITE.email ? link('mailto:' + SITE.email, SITE.email, 'quienes-somos') : ''}</div></div></section>` + steps() + `<section><div class="wrap narrow"><h2>${esc(UI.payments)}</h2>${p(POLICY.pagos)}${p(POLICY.iva)}${p(POLICY.plazo)}</div></section>` + policy();
 if (page.type === 'faq') return hero + `<section><div class="wrap narrow">${faq(page.faq, true)}${wa(route, 'preguntas')}</div></section>`;
 if (['privacy', 'terms'].includes(page.type)) return hero + `<article class="legal wrap narrow">${LEGAL[page.type === 'privacy' ? 'privacy' : 'terms'].map(([title, ...paras]) => `<section><h2>${esc(title)}</h2>${paras.map(p).join('')}</section>`).join('')}${wa(route, 'legal')}${SITE.email ? link('mailto:' + SITE.email, SITE.email, 'legal') : ''}${page.type === 'terms' ? link('/privacidad/', UI.form.privacy, 'legal') : ''}</article>`;
 return hero + `<section><div class="wrap narrow">${p(UI[page.type])}<div class="actions">${wa(route, page.type)}${link('/', UI.home, page.type, 'btn btn--ghost')}</div></div></section>`;
}
