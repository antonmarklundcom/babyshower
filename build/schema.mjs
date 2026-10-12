// JSON-LD graph for each route.
import { THEMES as THEME_DETAILS } from '../themes.mjs';
import { ZONES as ZONE_DETAILS } from '../zones.mjs';
import { ZONES, SITE, WA_NUMBER, SERVICE_HUB } from '../content.mjs';
import { manifest, guides } from './site-data.mjs';

export function graph(route, page) {
 const org = SITE.url + '/#org', site = SITE.url + '/#site';
 const data = [ { '@type': 'Organization', '@id': org, name: SITE.name, url: SITE.url + '/', telephone: '+' + WA_NUMBER, ...(SITE.email ? { email: SITE.email } : {}), ...(SITE.instagram ? { sameAs: [SITE.instagram] } : {}) }, { '@type': 'WebSite', '@id': site, name: SITE.name, url: SITE.url + '/', publisher: { '@id': org }, inLanguage: 'es-PY' } ];
 if (route === '/') data.push({ '@type': 'LocalBusiness', '@id': SITE.url + '/#local', name: SITE.name, url: SITE.url + '/', areaServed: ZONES.filter(z => z.delivery !== null).map(z => ({ '@type': 'City', name: z.name })), telephone: '+' + WA_NUMBER, image: SITE.url + '/assets/img/og.jpg', openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' }, parentOrganization: { '@id': org } });
 if (['home', 'combos', 'reveal', 'anito', 'theme', 'zone', 'service'].includes(page.type)) data.push({ '@type': 'Service', '@id': SITE.url + route + '#servicio', name: page.h1, provider: { '@id': org }, areaServed: page.type === 'zone' ? page.detail.name : SITE.area, serviceType: page.h1 });
 if (route !== '/') data.push({ '@type': 'BreadcrumbList', '@id': SITE.url + route + '#migas', itemListElement: [{ '@type': 'ListItem', position: 1, name: SITE.name, item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: page.h1, item: SITE.url + route }] });
 // Detail pages sit under their hub; name the hub level so search results show the real path.
 const hub = { guide: ['/ideas/', 'Ideas'], theme: ['/tematicas/', 'Temáticas'], zone: ['/zonas/', 'Zonas'] }[page.type];
 if (hub && route !== hub[0]) {
  const crumbs = data.find(n => n['@type'] === 'BreadcrumbList').itemListElement;
  crumbs.splice(1, 0, { '@type': 'ListItem', position: 2, name: hub[1], item: SITE.url + hub[0] });
  crumbs.at(-1).position = 3;
 }
 if (page.type === 'guide') {
  data.push({ '@type': 'Article', '@id': SITE.url + route + '#articulo', headline: page.h1, description: page.description, datePublished: page.datePublished, dateModified: page.dateModified || page.datePublished, image: SITE.url + '/assets/img/og.jpg', author: { '@id': org }, publisher: { '@id': org }, mainEntityOfPage: SITE.url + route, inLanguage: 'es-PY' });
 }
 const hubItems = page.type === 'services' ? SERVICE_HUB.map(s => [s.route, s.name]) : page.type === 'ideas' ? guides.map(g => [g.route, g.detail.h1]) : page.type === 'themes' ? THEME_DETAILS.map(t => [`/tematicas/${t.slug}/`, t.name]) : page.type === 'zones' ? ZONE_DETAILS.filter(z => manifest.some(r => r.route === `/zonas/${z.slug}/`)).map(z => [`/zonas/${z.slug}/`, z.name]) : null;
 if (hubItems) data.push({ '@type': 'ItemList', '@id': SITE.url + route + '#lista', itemListElement: hubItems.map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, url: SITE.url + href })) });
 if (page.faq) data.push({ '@type': 'FAQPage', '@id': SITE.url + route + '#preguntas', mainEntity: page.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
 return { '@context': 'https://schema.org', '@graph': data };
}
