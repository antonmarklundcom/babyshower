// Small HTML helpers: escaping, JSON-in-script, links, WhatsApp buttons and icons.
import { WA_NUMBER, PRIMARY_CTA, WA_MENU } from '../content.mjs';

export const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
export const json = value => JSON.stringify(value).replaceAll('<', '\\u003c');
export const waHref = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const waDefault = route => waHref(WA_MENU.options.at(-1).text(route));
export const p = text => `<p>${esc(text)}</p>`;
export const icon = '<svg viewBox="0 0 24 24" class="wa-icon" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.4c-.3.7-1.4 1.2-2 1.2-1.4 0-3.3-1-4.9-2.4-1.7-1.5-3-3.5-3-4.9 0-.8.4-1.7.9-2.1.2-.2.5-.3.8-.2l1 2.3c.1.3-.5.9-.7 1.1.5 1.2 2 2.8 3.4 3.4.3-.3.9-1.1 1.2-1l2.3 1.1c.3.1.3.8.1 1.5Z"/></svg>';
// Line icons for services (24px grid, stroke only, inherit colour).
const SVC_ICONS = {
 corazon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
 destello: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
 torta: '<path d="M4 20h16v-7H4v7Z"/><path d="M4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1.5 4 0"/><path d="M12 13V9"/><path d="M12 6.5c.8-.8.8-1.7 0-2.5-.8.8-.8 1.7 0 2.5Z"/>',
 globo: '<path d="M12 3a6 6 0 0 0-6 6c0 4 3.5 7 6 7s6-3 6-7a6 6 0 0 0-6-6Z"/><path d="M11 16h2l-1 1.6c0 1.4 1 2 1 3.4"/>',
 gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
 fiesta: '<path d="M4 20 9 7l8 8-13 5Z"/><path d="M14 4v2M18 8h2M16.5 5.5 18 4"/>',
 casa: '<path d="M4 11 12 4l8 7v9H4v-9Z"/><path d="M10 20v-5h4v5"/>',
 check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>'
};
export const svcIcon = (name, cls = 'svc-icon') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${SVC_ICONS[name] || ''}</svg>`;
export function link(href, label, loc, cls = '', extra = '') {
 const event = href.startsWith('https://wa.me/') ? 'whatsapp_click' : 'navigation';
 // WhatsApp buttons always carry the icon: recognition earns the tap.
 const body = event === 'whatsapp_click' && /\bbtn\b/.test(cls) ? `${icon}<span>${esc(label)}</span>` : esc(label);
 return `<a href="${esc(href)}"${cls ? ` class="${cls}"` : ''} data-ev="${event}" data-ev-loc="${loc}" ${extra}>${body}</a>`;
}
export function wa(route, loc, cls = 'btn btn--primary', trigger = false) {
 return `<a class="${cls}" href="${esc(waDefault(route))}" data-ev="whatsapp_click" data-ev-loc="${loc}"${trigger ? ' data-wa-trigger aria-haspopup="dialog" aria-controls="wa-menu" aria-expanded="false"' : ''}>${icon}<span>${esc(PRIMARY_CTA)}</span></a>`;
}
export const nav = (items, route, loc) => items.map(([href, label]) => link(href, label, loc, '', href === route ? 'aria-current="page"' : '')).join('');
export const current = (href, route) => href === route ? 'aria-current="page"' : '';
