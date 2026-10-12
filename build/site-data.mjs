// Route manifest, guide registration and the PAGES entries derived from themes, zones and guides.
import { writeFileSync, readFileSync } from 'node:fs';
import { THEMES as THEME_DETAILS } from '../themes.mjs';
import { ZONES as ZONE_DETAILS } from '../zones.mjs';
import { IDEAS } from '../ideas.mjs';
import { ZONES, deliveryNote, fmtGs, PACKAGES, NAV, PAGES } from '../content.mjs';

export const manifest = JSON.parse(readFileSync('docs/routes.json', 'utf8'));
// New guides only need an entry in ideas.mjs: register any missing guide route in the manifest.
const missingIdeas = IDEAS.filter(idea => !manifest.some(r => r.route === `/ideas/${idea.slug}/`));
for (const idea of missingIdeas) manifest.push({ route: `/ideas/${idea.slug}/`, type: 'guide', output: `ideas/${idea.slug}/index.html`, phase: 'B4', indexable: true, built: true });
if (missingIdeas.length) writeFileSync('docs/routes.json', JSON.stringify(manifest, null, 2) + '\n');
// Route kind comes from the manifest's type field; phase is build history only.
export const guides = manifest.filter(r => r.type === 'guide').map(r => {
 const detail = IDEAS.find(idea => r.route === `/ideas/${idea.slug}/`);
 if (!detail) throw new Error(`Missing guide ${r.route}`);
 PAGES[r.route] = { ...detail, type: 'guide', detail };
 return { ...r, detail };
});
PAGES['/ideas/'] = { type: 'ideas', title: 'Ideas para tu baby shower | Guías en Paraguay', description: 'Explorá guías para organizar tu baby shower: temáticas, juegos, decoración en casa, revelación de género y una checklist para repartir las tareas.', h1: 'Ideas para tu baby shower' };
export const headerNav = [...NAV];
headerNav.splice(headerNav.findIndex(([href]) => href === '/ideas/'), 0, ['/zonas/', 'Zonas']);
for (const t of THEME_DETAILS) PAGES[`/tematicas/${t.slug}/`] = { type: 'theme', detail: t, title: `Decoración ${t.character ? 'inspirada en' : 'de'} ${t.name} para baby shower`, description: `Explorá la propuesta de ${t.name} para baby shower o primer añito: colores, elementos y combos con precios estimados. Consultá por WhatsApp.`, h1: `Decoración ${t.character ? 'inspirada en' : 'de'} ${t.name} para baby shower y primer añito`, faq: t.faq };
for (const z of ZONE_DETAILS.filter(z => manifest.some(r => r.route === `/zonas/${z.slug}/`))) {
 const delivery = ZONES.find(item => item.slug === z.slug);
 if (!delivery || delivery.delivery === null) throw new Error(`Missing delivery for ${z.slug}`);
 PAGES[`/zonas/${z.slug}/`] = { type: 'zone', detail: z, delivery: delivery.delivery, title: `Baby shower en ${z.name} desde ${fmtGs(Math.min(...PACKAGES.map(p => p.price)) + delivery.delivery)}`, description: `Consultá tu baby shower en ${z.name}. Conocé los espacios, el recargo estimado y los combos con traslado ya sumado al precio mostrado.`, h1: `Baby shower en ${z.name}`, faq: z.faq.map((f, i) => i ? f : { ...f, a: `${deliveryNote(delivery)} ${f.a}` }) };
}
PAGES['/tematicas/'] = { type: 'themes', title: 'Temáticas para baby shower y primer añito', description: 'Elegí una temática para tu baby shower o primer añito. Explorá paletas, elementos decorativos y combos con precios estimados para consultar.', h1: 'Temáticas para baby shower y primer añito' };
PAGES['/zonas/'] = { type: 'zones', title: 'Zonas de baby shower en Gran Asunción', description: 'Consultá las zonas de atención para tu baby shower en Asunción y alrededores. Revisá el recargo estimado de traslado y las propuestas por ciudad.', h1: 'Zonas donde montamos tu baby shower' };
