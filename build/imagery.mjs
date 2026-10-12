// Image manifests, <picture> markup, palette fallback and the per-page sharing image.
import { readFileSync, existsSync } from 'node:fs';
import { SITE } from '../content.mjs';
import { esc } from './html.mjs';

// Placement approval and alt copy come from the editorial manifest; variants from webimg.
export const imagery = JSON.parse(readFileSync('docs/imagery-manifest.json', 'utf8')).images;
const variants = JSON.parse(readFileSync('assets/img/manifest.json', 'utf8')).images;
export const imageSizes = {
 hero: '(max-width: 959px) 90vw, (max-width: 1023px) calc(100vw - 6rem), (max-width: 1199px) calc((100vw - 9rem) * 5 / 12), 440px',
 card: '(max-width: 639px) calc(90vw - 3rem), (max-width: 959px) calc((90vw - 2rem) / 3 - 2rem), (max-width: 1023px) calc((100vw - 8rem) / 3 - 2rem), (max-width: 1199px) calc((100vw - 9rem) / 3 - 3rem), 304px',
 theme: '(max-width: 959px) 90vw, (max-width: 1199px) calc(100vw - 6rem), 1104px',
 guide: '(max-width: 959px) 90vw, 720px'
};
export function imageFigure(id, cls, sizes, eager = false) {
 const entry = imagery.find(image => image.id === id && image.placed && image.status !== 'rejected');
 if (!entry) return '';
 const files = variants.find(image => image.filename_base === entry.id)?.files;
 if (!files || !entry.alt_es) throw new Error('Missing imagery metadata: ' + id);
 const sets = Object.fromEntries(['avif', 'webp'].map(format => {
  const matches = files.filter(file => file.format === format).sort((a, b) => a.width - b.width);
  if (!matches.length || matches.some(file => !existsSync('assets/img/' + file.file))) throw new Error('Missing image variant: ' + id);
  return [format, matches];
 }));
 const srcset = format => esc(sets[format].map(file => '/assets/img/' + file.file + ' ' + file.width + 'w').join(', '));
 const fallback = sets.webp[0];
 return `<figure class="ai-image ${cls}"><picture><source type="image/avif" srcset="${srcset('avif')}" sizes="${esc(sizes)}"><source type="image/webp" srcset="${srcset('webp')}" sizes="${esc(sizes)}"><img src="/assets/img/${esc(fallback.file)}" srcset="${srcset('webp')}" sizes="${esc(sizes)}" width="${fallback.width}" height="${fallback.height}" alt="${esc(entry.alt_es)}" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} decoding="async"></picture><figcaption>${cls === 'theme-image' ? 'Imagen ilustrativa' : 'Imagen ilustrativa · no corresponde a un evento realizado'}</figcaption></figure>`;
}
export function themePalette(t, cls = 'theme-image') {
 // SVG fill attributes keep the swatch colours out of inline styles (CSP style-src without 'unsafe-inline').
 return `<div class="${cls} theme-palette" aria-hidden="true"><svg viewBox="0 0 ${t.swatches.length} 1" preserveAspectRatio="none" focusable="false">${t.swatches.map((color, i) => `<rect x="${i}" width="1" height="1" fill="${esc(color)}"/>`).join('')}</svg></div>`;
}
// Sharing image: the page's placed hero (same lookup as serviceHero, theme heroes and guides), largest WebP variant; og.jpg otherwise.
export function ogImage(route, page) {
 const placed = id => imagery.find(image => image.id === id && image.placed && image.status !== 'rejected');
 const byUse = () => imagery.find(image => image.use === route && image.placed && image.status !== 'rejected')?.id;
 const id = ['service', 'services', 'reveal', 'anito'].includes(page.type) ? (page.type === 'service' && page.detail ? page.detail.image : page.image || byUse()) : ['theme', 'guide'].includes(page.type) ? byUse() : null;
 const entry = id && placed(id);
 const file = entry && variants.find(image => image.filename_base === entry.id)?.files.filter(f => f.format === 'webp').sort((a, b) => b.width - a.width)[0];
 if (!file) return { url: SITE.url + '/assets/img/og.jpg', width: 1200, height: 630, alt: imagery.find(image => image.id === 'hero-baby-shower-quincho').alt_es };
 return { url: SITE.url + '/assets/img/' + file.file, width: file.width, height: file.height, alt: entry.alt_es };
}
