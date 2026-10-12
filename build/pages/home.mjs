// Home page.
import { THEMES as THEME_DETAILS } from '../../themes.mjs';
import { ZONES, COMPARISON, CONFIRMATION, EXCLUSIONS, fmtGs, PRICES, PRIMARY_CTA, TRUST, DELIVERY, PACKAGES, UI, packageMessage, SERVICE_HUB } from '../../content.mjs';
import { manifest } from '../site-data.mjs';
import { p, esc, waHref, wa, link } from '../html.mjs';
import { faq, contact, stepList, themeGrid, calculator } from './shared.mjs';
import { imageFigure } from '../imagery.mjs';
import { serviceCards } from './services.mjs';

function homeCards(route) {
 return `<div class="package-grid">${PACKAGES.map((item, i) => `<article class="card${i === 1 ? ' featured' : ''}" data-package="${item.id}" data-price="${item.price}">
  <div class="package-heading"><h3>${esc(item.name)}</h3><span class="package-tag${item.badge ? ' badge' : ''}">${esc(UI.homePackageTags[i])}</span></div>
  ${imageFigure(['combo-nube', 'combo-estrella', 'combo-sueno'][i], 'package-image', '(max-width: 959px) calc(100vw - 32px), (max-width: 1439px) 30vw, 395px')}
  <div class="package-body"><p class="price-caption" data-price-caption><span class="price-label">${esc(UI.pricePrefix)}</span> <span class="price-amount">${esc(fmtGs(item.price))}</span></p>
  <div class="package-chip">${p(item.chip)}</div>
  <dl class="package-rows">${[0, 3, 4].map(index => COMPARISON[index]).map(row => `<div><dt>${esc(row[0])}</dt><dd>${esc(row[i + 1])}</dd></div>`).join('')}</dl>
  <details><summary>${esc(UI.exclusions)}</summary>${p(i === 0 ? EXCLUSIONS : item.exclusions)}</details>
  <div class="package-action">${link(waHref(packageMessage(item, route)), PRIMARY_CTA, 'combo-' + item.id, i === 1 ? 'btn btn--primary' : 'btn btn--outline')}<p class="package-confirmation">${esc(CONFIRMATION)}</p></div></div>
 </article>`).join('')}</div>`;
}
function homeInclusions() {
 return `<div class="home-inclusions">${UI.homeInclusions.map(group => `<div><h2 class="eyebrow">${esc(group.title)}</h2><ul>${group.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>`).join('')}</div>`;
}
export function homeZones() {
 return `<section class="zones-section" id="zonas"><div class="wrap"><div class="home-zones"><div><span class="eyebrow">${esc(UI.zonesEyebrow)}</span><h2>${esc(UI.zones)}</h2>${p(DELIVERY)}${link('/zonas/', UI.zonesLink, 'zonas', 'home-more')}</div><div class="zone-lists">${[false, true].map(extra => `<div><h3>${esc(extra ? UI.zoneExtra : UI.zoneFree)}</h3><ul>${ZONES.filter(z => extra ? z.delivery !== 0 : z.delivery === 0).map(z => `<li>${manifest.some(r => r.route === `/zonas/${z.slug}/`) ? link(`/zonas/${z.slug}/`, z.name, 'zonas') : esc(z.name)}${extra ? `<span> · ${z.delivery === null ? esc(UI.zoneOther) : '+ ' + esc(fmtGs(z.delivery))}</span>` : ''}</li>`).join('')}</ul></div>`).join('')}</div></div></div></section>`;
}
const HERO_SLIDES = ['hero-baby-shower-quincho', 'hero-revelacion-genero', 'hero-primer-anito'];
// Slide 1 is the LCP image and stays visible without JavaScript; slides 2 and 3 start hidden so they load only after site.js activates the carousel.
function heroSlides() {
 const slides = HERO_SLIDES.map((id, i) => {
  const figure = imageFigure(id, 'hero-art hero-slide' + (i ? '' : ' is-active'), '100vw', i === 0);
  return i ? figure.replace('<figure ', '<figure hidden aria-hidden="true" ') : figure;
 }).join('');
 return `<div class="hero-slides" data-hero-slides role="group" aria-roledescription="carousel" aria-label="${esc(UI.heroSlides.label)}">${slides}</div>`;
}
export function home(route, page) {
 return `<section class="hero grain">${imageFigure(HERO_SLIDES[0], 'hero-art hero-slide is-active', '100vw', true)}<div class="wrap"><div class="hero-copy"><span class="eyebrow">${esc(UI.eyebrow)}</span><h1>${esc(page.h1)}</h1>${p(UI.hero[0])}<div class="hero-price"><span class="price-label">${esc(UI.pricePrefix)}</span><span class="price-amount">${esc(fmtGs(PACKAGES[1].price))}</span></div><div class="actions">${wa(route, 'portada')}${link('#calculadora', UI.calc, 'portada', 'btn btn--ghost')}</div><p class="hero-confirmation">${esc(CONFIRMATION)}</p><p class="launch-note">Estamos preparando nuestros primeros eventos. Imágenes ilustrativas.</p></div></div></section>
 <div class="trust-ribbon"><div class="wrap"><ul>${TRUST.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
 <section class="home-packages" id="combos"><div class="wrap"><span class="eyebrow">${esc(UI.packagesEyebrow)}</span><h2>${esc(UI.packages)}</h2><p class="packages-intro">${esc(UI.transparency)} ${esc(PRICES.label)}.</p>${homeCards(route)}</div></section>
 ${calculator(route)}
 <section class="steps-section"><div class="wrap"><span class="eyebrow">${esc(UI.steps)}</span><h2>${esc(UI.homeSteps)}</h2>${stepList()}${link('/como-funciona/', UI.stepsLink, 'pasos', 'home-more')}</div></section>
 <section class="theme-section"><div class="wrap"><div class="theme-heading"><h2>${esc(UI.themes)}</h2></div>${themeGrid(THEME_DETAILS.filter(t => ['mariposas', 'safari', 'nubes-y-ositos', 'dino-bebe'].includes(t.slug)))}${link('/tematicas/', UI.themesLink, 'tematicas', 'home-more')}</div></section>
 <section class="services-section home-services"><div class="wrap"><span class="eyebrow">${esc(UI.servicesEyebrow)}</span><h2>${esc(UI.servicesTitle)}</h2>${serviceCards(SERVICE_HUB.slice(0, 3), 'inicio-servicios')}${link('/servicios/', UI.servicesLink, 'inicio-servicios', 'home-more')}</div></section>
 ${homeZones()}
 <section class="home-faq"><div class="wrap"><div><span class="eyebrow">${esc(UI.faq)}</span><h2>${esc(UI.homeFaq)}</h2>${link('/preguntas-frecuentes/', UI.faqLink, 'preguntas', 'home-more')}</div>${faq(page.faq)}</div></section>${contact(route)}`;
}
