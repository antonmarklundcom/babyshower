// Generates the mixed home design (hero from "Babyshower hero", colors + pricing from "Home colors")
// from the real copy in content.mjs. Usage: node gen.mjs   (reads heights.json if present)
import { pathToFileURL } from 'node:url';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
const REPO = 'C:/Claude 1/babyshower';
const C = await import(pathToFileURL(REPO + '/content.mjs').href);
const T = await import(pathToFileURL(REPO + '/themes.mjs').href);
const OUT = new URL('./out/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
mkdirSync(OUT + 'project', { recursive: true });
const heights = existsSync(OUT + 'heights.json') ? JSON.parse(readFileSync(OUT + 'heights.json', 'utf8')) : {};

const BLOB = {
  hero: ['c677c776c09ed0e0584c58568121e692', 'hero-baby-shower-quincho-1920'],
  band: ['91b0093992b1e8f3f3f5ba8ab3977263', 'band-montaje-1280'],
  nube: ['25c4accae62064c31436d8f1fb61a406', 'combo-nube-1168'],
  estrella: ['efb79ca13a7705b53367da0d512d5675', 'combo-estrella-1168'],
  premium: ['32a9d31305f4ef2805a78327c32a234d', 'combo-sueno-1168'],
  'jefe-en-panales': ['fa39409b7db92cb824cd9b2e71eb3293', 'tema-jefe-en-panales-640'],
  'dino-bebe': ['89efca2c4c385f8ed002c1405acb9740', 'tema-dino-bebe-640'],
  'moana-bebe': ['9c37eb8412fc8cb8031e34c27813b1d9', 'tema-moana-bebe-640'],
  'minnie-bebe': ['b070c3bad914abf02d9cda884b3aefaa', 'tema-minnie-bebe-640'],
  'frutillita-bebe': ['a4d53b38deec58b036c6bfcfae7a5c04', 'tema-frutillita-bebe-640'],
  mariposas: ['cd7b6a6588e73f3bd2f8ab989c7f9858', 'tema-mariposas-640'],
  safari: ['f43bf09550507355188562f975e5518c', 'tema-safari-640'],
  'nubes-y-ositos': ['9f5069757d46984c8333caec2121988c', 'tema-nubes-y-ositos-640']
};
let PLAIN = false;
const img = key => PLAIN ? `file:///${REPO}/assets/img/${BLOB[key][1]}.webp` : `/_blob/${BLOB[key][0]}`;

const INK = '#2B2430', IVORY = '#FBF6F2', BLUSH = '#F6E1DC', MINT = '#DDE8E0', SKY = '#DCE6F2', CORAL = '#D97B6C';
const HAIR = 'rgba(43,36,48,0.12)';
const M60 = 'rgba(43,36,48,0.72)', M80 = 'rgba(43,36,48,0.86)';
const SERIF = "'Instrument Serif',Georgia,serif";
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const gs = n => 'Gs. ' + new Intl.NumberFormat('es-PY').format(n);
const WA = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.2 2 11.3c0 2.8 1.4 5.3 3.6 7L4.4 22l4-2.1c1.1.3 2.3.5 3.6.5 5.5 0 10-4.2 10-9.1S17.5 2 12 2z"></path></svg>`;
const [NUBE, ESTRELLA, SUENO] = C.PACKAGES;
const sueDesc = SUENO.description.replace(' (Sueño)', '');

const eyebrow = (t, color = 'rgba(43,36,48,0.70)') => `<div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${color}">${esc(t)}</div>`;
const h2 = (t, size, extra = '') => `<h2 style="margin:12px 0 0 0;font-family:${SERIF};font-weight:400;font-size:${size}px;line-height:1.06;letter-spacing:-0.01em;text-wrap:pretty;${extra}">${esc(t)}</h2>`;
const btn = (label, kind, m, w = false) => {
  const h = m ? 48 : 56;
  const base = `display:${w ? 'flex' : 'inline-flex'};align-items:center;justify-content:center;gap:10px;height:${h}px;padding:0 ${m ? 20 : 28}px;border-radius:6px;font-size:${m ? 16 : 17}px;font-weight:600;white-space:nowrap;${w ? 'width:100%;' : ''}`;
  if (kind === 'wa') return `<a href="#contacto" style="${base}background:${CORAL};color:${INK}">${WA}${esc(label)}</a>`;
  if (kind === 'ghost') return `<a href="#calculadora" style="${base}border:1px solid rgba(251,246,242,0.6);color:${IVORY}">${esc(label)}</a>`;
  return `<a href="#contacto" style="${base}border:1px solid rgba(43,36,48,0.35);color:${INK};background:transparent">${esc(label)}</a>`;
};
const pill = (t, pos) => `<span style="position:absolute;${pos};padding:4px 9px;border-radius:6px;background:rgba(251,246,242,0.92);color:${INK};font-size:11px;letter-spacing:0.06em;line-height:1.3">${esc(t)}</span>`;

// ---------- header ----------
function header(m) {
  const logo = `<span style="font-family:${SERIF};font-size:${m ? 22 : 26}px;line-height:1;white-space:nowrap">${C.SITE.brand}<span style="color:${CORAL}">${C.SITE.suffix}</span></span>`;
  if (m) return `<header style="height:64px;padding:0 16px;display:flex;align-items:center;gap:12px;background:${IVORY};border-bottom:1px solid ${HAIR}">${logo}<a href="#contacto" style="margin-left:auto;display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 14px;border-radius:6px;border:1px solid rgba(43,36,48,0.3);font-size:14px;font-weight:600;color:${INK}">${WA}WhatsApp</a><button type="button" aria-label="${esc(C.UI.menu)}" style="width:44px;height:44px;border:0;background:transparent;color:${INK};display:inline-flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg></button></header>`;
  const nav = [...C.NAV.slice(0, 4), ['/zonas/', 'Zonas'], ...C.NAV.slice(4)];
  return `<header style="height:80px;padding:0 100px;display:flex;align-items:center;gap:36px;background:${IVORY};border-bottom:1px solid ${HAIR}">${logo}<nav style="display:flex;gap:26px;font-size:15px;white-space:nowrap;color:${M80}">${nav.map(n => `<a href="#" style="color:${M80}">${esc(n[1])}</a>`).join('')}</nav><div style="margin-left:auto;display:flex;align-items:center;gap:18px"><a href="#contacto" style="display:inline-flex;align-items:center;gap:9px;height:46px;padding:0 18px;border-radius:6px;border:1px solid rgba(43,36,48,0.3);background:#fff;font-size:15px;font-weight:600;color:${INK};white-space:nowrap">${WA}${esc(C.PRIMARY_CTA)}</a></div></header>`;
}

// ---------- hero (from "Babyshower hero": full-bleed photo + scrim + overlapping ribbon) ----------
function hero(m) {
  const [l0, l1, l2] = C.UI.hero;
  const confirm = C.CONFIRMATION;
  const H = m ? 680 : 720;
  const text = m
    ? `<div style="position:absolute;left:16px;right:16px;bottom:56px;display:flex;flex-direction:column;gap:14px;color:${IVORY}">
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${BLUSH}">${esc(C.UI.eyebrow)}</div>
        <h1 style="margin:0;font-family:${SERIF};font-weight:400;font-size:42px;line-height:1.02;letter-spacing:-0.012em;text-wrap:pretty">${esc(C.PAGES['/'].h1)}</h1>
        <p style="margin:0;font-size:16px;line-height:1.5">${esc(l0)}</p>
        <div><div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:${BLUSH}">Precio estimado desde</div><div style="font-family:${SERIF};font-size:48px;line-height:1.05;margin-top:2px">${gs(ESTRELLA.price)}</div><p style="margin:4px 0 0 0;font-size:14px;line-height:1.45;color:rgba(251,246,242,0.9)">${esc(confirm)}</p></div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">${btn(C.PRIMARY_CTA, 'wa', true, true)}${btn(C.UI.calc, 'ghost', true, true)}</div></div>`
    : `<div style="position:absolute;left:100px;bottom:112px;width:800px;display:flex;flex-direction:column;gap:20px;color:${IVORY}">
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${BLUSH}">${esc(C.UI.eyebrow)}</div>
        <h1 style="margin:0;font-family:${SERIF};font-weight:400;font-size:76px;line-height:1.02;letter-spacing:-0.015em;text-wrap:pretty;max-width:15ch">${esc(C.PAGES['/'].h1)}</h1>
        <p style="margin:0;font-size:19px;line-height:1.5;max-width:56ch">${esc(l0)}</p>
        <div style="display:flex;align-items:baseline;gap:18px"><span style="font-family:${SERIF};font-size:64px;line-height:1;letter-spacing:-0.015em">${gs(ESTRELLA.price)}</span><span style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${BLUSH}">precio estimado desde</span></div>
        <p style="margin:0;font-size:16px;line-height:1.5;max-width:58ch;color:rgba(251,246,242,0.92)">${esc(confirm)} ${esc(l2)}</p>
        <div style="display:flex;gap:14px;margin-top:6px">${btn(C.PRIMARY_CTA, 'wa', false)}${btn(C.UI.calc, 'ghost', false)}</div></div>`;
  const ribbon = m
    ? `<div style="position:relative;z-index:3;margin:-32px 16px 0 16px;display:grid;grid-template-columns:1fr 1fr;background:#fff;border:1px solid ${HAIR};border-radius:14px;box-shadow:0 1px 2px rgba(43,36,48,0.06),0 12px 32px rgba(43,36,48,0.10);overflow:hidden">${C.TRUST.map((t, i) => `<div style="padding:14px 14px;font-size:14px;line-height:1.35;color:${M80};border-top:${i > 1 ? '1px solid ' + HAIR : '0'};border-left:${i % 2 ? '1px solid ' + HAIR : '0'};${i === 4 ? 'grid-column:1 / -1;border-left:0;' : ''}">${esc(t)}</div>`).join('')}</div>`
    : `<div style="position:relative;z-index:3;margin:-46px 100px 0 100px;display:grid;grid-template-columns:repeat(5,1fr);background:#fff;border:1px solid ${HAIR};border-radius:14px;box-shadow:0 1px 2px rgba(43,36,48,0.06),0 14px 36px rgba(43,36,48,0.10);overflow:hidden">${C.TRUST.map((t, i) => `<div style="padding:24px 24px;font-size:15px;line-height:1.35;color:${M80};border-left:${i ? '1px solid ' + HAIR : '0'}">${esc(t)}</div>`).join('')}</div>`;
  return `<section style="position:relative"><div style="position:relative;height:${H}px;overflow:hidden;background:${INK}"><img src="${img('hero')}" alt="Arco de globos organicos en verde salvia, crema y rosa sobre una mesa dulce de madera" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${m ? '62% 0%' : 'center 38%'}"><div style="position:absolute;inset:0;background:${m ? 'linear-gradient(to top,rgba(43,36,48,0.93) 0%,rgba(43,36,48,0.80) 46%,rgba(43,36,48,0.08) 100%)' : 'linear-gradient(to top,rgba(43,36,48,0.92) 0%,rgba(43,36,48,0.72) 38%,rgba(43,36,48,0.10) 100%)'}"></div>${pill('Imagen ilustrativa', m ? 'right:14px;top:12px' : 'right:24px;top:22px')}${text}</div>${ribbon}</section>`;
}

// ---------- packages (from "Home colors": tinted header bands, raised Estrella, coral only on Estrella) ----------
function packageCard(item, i, m) {
  const tint = [MINT, BLUSH, SKY][i];
  const tag = i === 1 ? item.badge : i === 0 ? 'Hasta 30 invitados' : `${item.included} invitados`;
  const key = ['nube', 'estrella', 'premium'][i];
  const idx = [0, 3, 4, 5, 8, 9];
  const rows = idx.map(k => `<div style="display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid ${HAIR};font-size:14px;line-height:1.35"><span style="color:${M60}">${esc(C.COMPARISON[k][0])}</span><span style="text-align:right;font-weight:600">${esc(C.COMPARISON[k][i + 1])}</span></div>`).join('');
  const desc = i === 2 ? sueDesc : item.description;
  const featured = i === 1;
  const tagStyle = featured ? `background:${CORAL};color:${INK};font-weight:700;padding:6px 11px;border-radius:6px` : `color:${M60};font-weight:600`;
  return `<article style="position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid ${HAIR};border-radius:14px;overflow:hidden;${!m && featured ? 'margin-top:-26px;' : ''}box-shadow:${featured ? '0 2px 4px rgba(43,36,48,0.07),0 28px 56px rgba(43,36,48,0.14)' : '0 1px 2px rgba(43,36,48,0.06),0 14px 30px rgba(43,36,48,0.07)'}">
    <div style="background:${tint};padding:${m ? '18px 20px' : '22px 26px'};display:flex;align-items:center;justify-content:space-between;gap:12px"><span style="font-family:${SERIF};font-size:${m ? 28 : 31}px;line-height:1">${esc(item.name)}</span><span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;${tagStyle}">${esc(tag)}</span></div>
    <div style="position:relative;height:${m ? 176 : 196}px"><img src="${img(key)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block">${pill('Imagen ilustrativa', 'left:12px;bottom:12px')}</div>
    <div style="flex:1;display:flex;flex-direction:column;padding:${m ? '20px' : '26px'}">
      <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${M60}">Precio estimado desde</div>
      <div style="font-family:${SERIF};font-size:${featured ? 48 : 44}px;line-height:1.05;margin-top:6px">${gs(item.price)}</div>
      <p style="margin:12px 0 0 0;font-size:15px;line-height:1.55;color:${M80}">${esc(desc)}</p>
      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.45;color:${M60}">${esc(item.chip)}</p>
      <div style="margin-top:16px">${rows}<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-top:1px solid ${HAIR};border-bottom:1px solid ${HAIR};font-size:14px;font-weight:600"><span>${esc(C.UI.exclusions)}</span><span style="font-size:20px;line-height:1;color:${CORAL}">+</span></div></div>
      <div style="margin-top:auto;padding-top:20px">${featured ? btn(C.PRIMARY_CTA, 'wa', m, true) : btn(C.PRIMARY_CTA, 'outline', m, true)}<p style="margin:10px 0 0 0;font-size:12px;line-height:1.4;color:${M60}">${esc(C.CONFIRMATION)}</p></div>
    </div></article>`;
}
function packages(m) {
  const order = m ? [1, 0, 2] : [0, 1, 2];
  const cards = order.map(i => packageCard(C.PACKAGES[i], i, m)).join('');
  return `<section id="combos" style="padding:${m ? '64px 16px 56px' : '116px 100px 120px'}">${eyebrow(C.UI.packagesEyebrow)}${h2(C.UI.packages, m ? 34 : 52, m ? '' : 'max-width:20ch')}
   <p style="margin:${m ? '12px 0 28px' : '16px 0 56px'};max-width:56ch;font-size:${m ? 15 : 17}px;line-height:1.55;color:${M80}">${esc(C.UI.transparency)} ${esc(C.PRICES.label)}.</p>
   <div style="display:grid;grid-template-columns:${m ? '1fr' : 'repeat(3,1fr)'};gap:${m ? 20 : 28}px;align-items:stretch">${cards}</div></section>`;
}

// ---------- calculator (blush panel from "Home colors") with the scope lines from the triage ----------
function calculator(m) {
  const opt = (label, right, on) => `<div style="display:flex;align-items:center;gap:12px;min-height:48px;padding:0 14px;border-radius:6px;background:#fff;border:1px solid ${on ? INK : HAIR};font-size:15px"><span style="width:18px;height:18px;border-radius:50%;border:1px solid rgba(43,36,48,0.4);display:inline-flex;align-items:center;justify-content:center;flex:none">${on ? `<span style="width:9px;height:9px;border-radius:50%;background:${CORAL}"></span>` : ''}</span><span style="font-weight:600">${esc(label)}</span><span style="margin-left:auto;color:${M60};font-size:14px;white-space:nowrap">${right}</span></div>`;
  const chk = a => `<div style="display:flex;align-items:center;gap:11px;min-height:48px;padding:6px 14px;border-radius:6px;background:#fff;border:1px solid ${HAIR};font-size:14px;line-height:1.3"><span style="width:18px;height:18px;border-radius:4px;border:1px solid rgba(43,36,48,0.4);flex:none"></span><span>${esc(a.name)}<br><span style="color:${M60}">+ ${gs(a.price)}</span></span></div>`;
  const lbl = t => `<div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${M60};margin:${m ? '22px' : '26px'} 0 10px 0">${esc(t)}</div>`;
  const stepBtn = s => `<span style="width:48px;height:48px;border-radius:6px;border:1px solid rgba(43,36,48,0.25);background:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:22px">${s}</span>`;
  const left = `<div>${eyebrow(C.UI.calculator)}${h2(C.UI.calcTitle, m ? 30 : 44)}
    ${lbl('Elegí tu combo')}<div style="display:flex;flex-direction:column;gap:8px">${opt(NUBE.name, gs(NUBE.price), false)}${opt(ESTRELLA.name, gs(ESTRELLA.price), true)}${opt(SUENO.name, gs(SUENO.price), false)}</div>
    ${lbl('Invitados: 30')}<div style="display:flex;align-items:center;gap:12px">${stepBtn('&minus;')}<div style="flex:1;height:6px;border-radius:3px;background:rgba(43,36,48,0.15);position:relative"><div style="width:33%;height:6px;border-radius:3px;background:${INK}"></div><div style="position:absolute;left:33%;top:-9px;width:24px;height:24px;border-radius:50%;background:${CORAL};border:2px solid #fff;box-shadow:0 1px 4px rgba(43,36,48,0.3)"></div></div>${stepBtn('+')}</div>
    ${lbl('Adicionales')}<div style="display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:8px">${C.ADDONS.map(chk).join('')}</div>
    ${lbl('Zona')}<div style="display:flex;align-items:center;justify-content:space-between;min-height:48px;padding:0 14px;border-radius:6px;background:#fff;border:1px solid ${HAIR};font-size:15px"><span>Asunción &mdash; ${esc(C.ZERO_PRICE)}</span><span>&#9662;</span></div></div>`;
  const line = (a, b) => `<div style="display:flex;justify-content:space-between;gap:16px;font-size:14px;color:${M60}"><span>${esc(a)}</span><span style="white-space:nowrap">${esc(b)}</span></div>`;
  const right = `<div style="background:#fff;border:1px solid ${HAIR};border-radius:20px;padding:${m ? '24px 20px' : '34px'};box-shadow:0 2px 4px rgba(43,36,48,0.06),0 20px 48px rgba(43,36,48,0.10);align-self:start">
    <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;color:${M60}">${esc(C.UI.estimation)}</div>
    <div style="font-family:${SERIF};font-size:${m ? 54 : 68}px;line-height:1.02;margin:8px 0 18px 0;letter-spacing:-0.015em">${gs(ESTRELLA.price)}</div>
    <div style="display:flex;flex-direction:column;gap:9px;padding-top:16px;border-top:1px solid ${HAIR}">${line(ESTRELLA.name, gs(ESTRELLA.price))}${line('Invitados extra', C.ZERO_PRICE)}${line('Adicionales', 'Ninguno')}${line('Traslado', C.ZERO_PRICE)}</div>
    <p style="margin:18px 0 0 0;font-size:14px;line-height:1.5;color:${M80}">La estimación cubre el combo, los adicionales que elijas y el traslado. No incluye local, mesas ni sillas.</p>
    <p style="margin:8px 0 0 0;font-size:14px;line-height:1.5;color:${M80}">El combo cubre hasta 30 invitados; con menos, la estimación no baja.</p>
    <p style="margin:14px 0 20px 0;font-size:13px;line-height:1.45;color:${M60}">${esc(C.PRICES.label)}. ${esc(C.CONFIRMATION)}</p>${btn(C.PRIMARY_CTA, 'wa', m, true)}</div>`;
  return `<section id="calculadora" style="padding:${m ? '0 16px 64px' : '0 100px 120px'}"><div style="background:${BLUSH};border-radius:28px;padding:${m ? '28px 18px' : '60px'};display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:${m ? 28 : 56}px">${left}${right}</div></section>`;
}

// ---------- dark band with the assembly photo ----------
function band(m) {
  return `<section style="position:relative;background:${INK};color:${IVORY};overflow:hidden;padding:${m ? '72px 16px' : '112px 100px'}"><img src="${img('band')}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.28"><div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(43,36,48,0.92),rgba(43,36,48,0.55))"></div>
   <div style="position:relative;display:flex;flex-direction:${m ? 'column' : 'row'};align-items:${m ? 'flex-start' : 'center'};justify-content:space-between;gap:${m ? 28 : 64}px"><p style="margin:0;max-width:20ch;font-family:${SERIF};font-size:${m ? 38 : 60}px;line-height:1.06;letter-spacing:-0.01em;text-wrap:pretty">${esc(C.UI.band)}</p>${btn(C.UI.themeCta, 'ghost', m)}</div></section>`;
}
function steps(m) {
  return `<section style="padding:${m ? '64px 16px 56px' : '120px 100px 100px'}">${eyebrow(C.UI.steps)}${h2('Cuatro pasos, sin vueltas', m ? 34 : 52)}<div style="display:grid;grid-template-columns:${m ? '1fr' : 'repeat(4,1fr)'};gap:${m ? 14 : 20}px;margin-top:${m ? 28 : 48}px">${C.STEPS.map(([t, b], i) => `<div style="padding:${m ? '22px' : '28px'};border-radius:14px;background:${i === 1 ? MINT : '#fff'};border:1px solid ${HAIR}"><div style="font-family:${SERIF};font-size:40px;line-height:1;color:${CORAL}">0${i + 1}</div><div style="margin-top:14px;font-size:${m ? 18 : 19}px;line-height:1.3;font-weight:600">${esc(t)}</div><p style="margin:8px 0 0 0;font-size:15px;line-height:1.5;color:${M60}">${esc(b)}</p></div>`).join('')}</div></section>`;
}
function themes(m) {
  const cards = T.THEMES.map(t => {
    const has = BLOB[t.slug] && t.slug !== 'mickey-bebe' && t.slug !== 'blanca-nieves-bebe';
    const h = m ? 190 : 250;
    if (has) return `<a href="#" style="position:relative;display:block;height:${h}px;border-radius:14px;overflow:hidden;background:${INK}"><img src="${img(t.slug)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(43,36,48,0.85) 0%,rgba(43,36,48,0) 62%)"></div><span style="position:absolute;left:14px;right:14px;bottom:12px;color:${IVORY};font-size:${m ? 15 : 17}px;font-weight:600;line-height:1.25">${esc(t.name)}</span></a>`;
    const bands = (t.swatches || []).map(c => `<span style="flex:1;background:${c}"></span>`).join('');
    return `<a href="#" style="position:relative;display:flex;flex-direction:column;height:${h}px;border-radius:14px;overflow:hidden;background:${t.tint === 'blush' ? BLUSH : SKY};border:1px solid ${HAIR}"><span style="display:flex;height:60%">${bands}</span><span style="padding:12px 14px;color:${INK};font-size:${m ? 15 : 17}px;font-weight:600;line-height:1.25">${esc(t.name)}<br><span style="font-size:12px;font-weight:400;color:${M60}">Paleta: ${esc(t.palette)}</span></span></a>`;
  }).join('');
  return `<section style="padding:${m ? '0 16px 64px' : '0 100px 120px'}"><div style="display:flex;flex-direction:${m ? 'column' : 'row'};align-items:${m ? 'flex-start' : 'flex-end'};justify-content:space-between;gap:16px;margin-bottom:${m ? 24 : 36}px"><div>${eyebrow('Temáticas')}${h2(C.UI.themes, m ? 34 : 52, 'max-width:18ch')}</div><p style="margin:0;max-width:34ch;font-size:15px;line-height:1.5;color:${M60}">Imágenes ilustrativas generadas. ¿Querés otra temática? La adaptamos y te la estimamos por WhatsApp.</p></div><div style="display:grid;grid-template-columns:repeat(${m ? 2 : 5},1fr);gap:${m ? 12 : 16}px">${cards}</div><a href="#" style="display:inline-flex;align-items:center;min-height:44px;margin-top:20px;font-size:16px;font-weight:600;color:${INK};text-decoration:underline">${esc(C.UI.themesLink)}</a></section>`;
}
function inclusions(m) {
  const inc = ['Arco de 3 metros en tres colores', 'Fondo decorativo y cartel', 'Mesa dulce de 30 unidades', '60 bocaditos salados', 'Vajilla descartable temática', '3 juegos impresos', C.UI.montage];
  const exc = ['Local o salón', 'Mozos', 'Bebidas alcohólicas', 'Mesas y sillas', 'Mantelería', 'Hielo', 'Limpieza posterior', 'Torta y souvenirs (Nube y Estrella)'];
  const list = arr => `<ul style="margin:18px 0 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px;font-size:${m ? 16 : 17}px;line-height:1.4;color:${M80}">${arr.map(x => `<li style="display:flex;gap:12px"><span style="color:${CORAL};font-weight:700">&bull;</span><span>${esc(x)}</span></li>`).join('')}</ul>`;
  return `<section style="padding:${m ? '0 16px 64px' : '0 100px 120px'}"><div style="display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:${m ? 32 : 0}px;border-top:1px solid ${HAIR};padding-top:${m ? 32 : 56}px"><div style="padding-right:${m ? 0 : 72}px;border-right:${m ? 0 : '1px solid ' + HAIR}">${eyebrow('Qué incluye · ' + ESTRELLA.name)}${list(inc)}</div><div style="padding-left:${m ? 0 : 72}px">${eyebrow('Qué no incluye')}${list(exc)}</div></div></section>`;
}
function zones(m) {
  const free = C.ZONES.filter(z => z.delivery === 0).map(z => z.name);
  const paid = C.ZONES.filter(z => z.delivery > 0).map(z => `${z.name}<span style="color:${M60}"> · + ${gs(z.delivery)}</span>`);
  const col = (t, items) => `<div><div style="font-size:15px;font-weight:700;margin-bottom:10px">${esc(t)}</div><div style="display:flex;flex-direction:column;gap:6px;font-size:16px;line-height:1.45;color:${M80}">${items.map(x => `<span>${x}</span>`).join('')}</div></div>`;
  return `<section id="zonas" style="padding:${m ? '0 16px 64px' : '0 100px 120px'}"><div style="display:grid;grid-template-columns:${m ? '1fr' : '360px 1fr'};gap:${m ? 28 : 64}px;padding:${m ? '28px 22px' : '56px'};border-radius:28px;background:${SKY}"><div>${eyebrow('Zonas de cobertura')}${h2(C.UI.zones, m ? 30 : 40)}<p style="margin:14px 0 0 0;font-size:15px;line-height:1.55;color:${M80}">${esc(C.DELIVERY)}</p><a href="#" style="display:inline-flex;align-items:center;min-height:44px;margin-top:12px;font-size:15px;font-weight:600;color:${INK};text-decoration:underline">${esc(C.UI.zonesLink)}</a></div><div style="display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:28px">${col('Sin recargo', free)}${col('Con recargo estimado', paid.concat([`Otra zona<span style="color:${M60}"> · la cotizamos por WhatsApp</span>`]))}</div></div></section>`;
}
function faq(m) {
  const items = C.PAGES['/'].faq.slice(0, 6).map(f => ({ q: f.q, a: f.a }));
  items.splice(2, 0, { q: '¿Por qué los precios son estimados?', a: 'Cada evento cambia según la fecha, la zona y el alcance. Por eso mostramos precios estimados y confirmamos el precio final y la disponibilidad por WhatsApp antes de cualquier pago.', proposed: true });
  const rows = items.map((f, i) => `<div style="border-bottom:1px solid ${HAIR}"><div style="display:flex;align-items:center;gap:20px;min-height:56px;padding:18px 0"><span style="flex:1;font-size:${m ? 17 : 19}px;font-weight:600;line-height:1.35">${esc(f.q)}</span><span style="font-size:24px;line-height:1;color:${CORAL}">${i === 0 ? '&minus;' : '+'}</span></div>${i === 0 ? `<p style="margin:0;padding:0 ${m ? 0 : 56}px 22px 0;font-size:16px;line-height:1.6;color:${M80}">${esc(f.a)}</p>` : ''}</div>`).join('');
  return `<section style="padding:${m ? '0 16px 64px' : '0 100px 120px'}"><div style="display:grid;grid-template-columns:${m ? '1fr' : '380px 1fr'};gap:${m ? 24 : 64}px;align-items:start"><div>${eyebrow(C.UI.faq)}${h2('Lo que conviene saber antes de escribir', m ? 32 : 48)}<a href="#" style="display:inline-flex;align-items:center;min-height:44px;margin-top:14px;font-size:15px;font-weight:600;color:${INK};text-decoration:underline">${esc(C.UI.faqLink)}</a></div><div style="border-top:1px solid ${HAIR}">${rows}</div></div></section>`;
}
function contact(m) {
  const F = C.UI.form;
  const field = (l, ph) => `<div style="display:flex;flex-direction:column;gap:7px;font-size:14px;font-weight:600">${esc(l)}<span style="display:flex;align-items:center;height:48px;padding:0 14px;border-radius:6px;border:1px solid ${HAIR};background:${IVORY};color:${M60};font-size:16px;font-weight:400">${esc(ph)}</span></div>`;
  const left = `<div style="padding:${m ? '28px 22px' : '52px'};border-radius:28px;background:${MINT};display:flex;flex-direction:column">${eyebrow('Escribinos')}${h2(C.UI.contact, m ? 32 : 46)}<p style="margin:16px 0 26px 0;max-width:44ch;font-size:${m ? 16 : 17}px;line-height:1.55;color:${M80}">${esc(C.FAQ[1].a)}</p><div style="font-family:${SERIF};font-size:${m ? 32 : 40}px;line-height:1.1">${esc(C.SITE.phone)}</div><div style="margin:6px 0 26px 0;font-size:15px;color:${M60}">${esc(C.SITE.hours)}</div><div style="margin-top:auto">${btn(C.PRIMARY_CTA, 'wa', m, m)}</div></div>`;
  const right = `<div style="padding:${m ? '28px 22px' : '52px'};border-radius:28px;background:#fff;border:1px solid ${HAIR};display:flex;flex-direction:column;gap:16px">${eyebrow('O dejanos tus datos')}${field(F.nombre, 'Nombre y apellido')}${field(F.whatsapp, '09xx xxx xxx')}<div style="display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:16px">${field(F.fecha, 'dd/mm/aaaa')}${field(F.invitados, '30')}</div><div style="display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:16px">${field(F.tipo, F.choose)}${field(F.zona, F.choose)}</div><a href="#" style="display:flex;align-items:center;justify-content:center;height:${m ? 52 : 56}px;border-radius:6px;background:${CORAL};color:${INK};font-size:17px;font-weight:700;margin-top:6px">${esc(F.submit)}</a><p style="margin:0;font-size:13px;line-height:1.45;color:${M60}">${esc(F.reply)}. ${esc(C.CONFIRMATION)}</p></div>`;
  return `<section id="contacto" style="padding:${m ? '0 16px 64px' : '0 100px 120px'}"><div style="display:grid;grid-template-columns:${m ? '1fr' : '1fr 1fr'};gap:${m ? 16 : 24}px">${left}${right}</div></section>`;
}
function footer(m) {
  return `<footer style="padding:${m ? '40px 16px 48px' : '56px 100px 64px'};border-top:1px solid ${HAIR};display:grid;grid-template-columns:${m ? '1fr' : '1fr auto'};gap:${m ? 24 : 40}px;align-items:start"><div><div style="font-family:${SERIF};font-size:30px;line-height:1">${C.SITE.brand}<span style="color:${CORAL}">${C.SITE.suffix}</span></div><div style="margin-top:10px;font-size:15px;color:${M60}">${esc(C.SITE.serviceArea)}</div><div style="margin-top:4px;font-size:15px;color:${M60}">${esc(C.SITE.hours)} · ${esc(C.SITE.phone)}</div></div><div style="display:flex;flex-wrap:wrap;gap:${m ? '4px 22px' : '28px'};font-size:15px">${C.FOOTER_NAV.map(n => `<a href="#" style="display:inline-flex;align-items:center;min-height:44px;color:${M60}">${esc(n[1])}</a>`).join('')}</div></footer>`;
}

const PARTS = {
  'Main.dc.html': { w: 1440, m: false, html: m => header(m) + hero(m) + packages(m) + calculator(m) },
  'Desktop-2.dc.html': { w: 1440, m: false, html: m => band(m) + steps(m) + themes(m) + inclusions(m) + zones(m) + faq(m) + contact(m) + footer(m) },
  'Mobile-1.dc.html': { w: 390, m: true, html: m => header(m) + hero(m) + packages(m) + calculator(m) },
  'Mobile-2.dc.html': { w: 390, m: true, html: m => band(m) + steps(m) + themes(m) + inclusions(m) + zones(m) + faq(m) + contact(m) + footer(m) }
};
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">`;
const rootStyle = (w, h) => `width:${w}px;${h ? `height:${h}px;overflow:hidden;` : ''}background:${IVORY};color:${INK};font-family:'DM Sans',system-ui,sans-serif;font-size:17px;line-height:1.55;box-sizing:border-box;`;

// plain measuring page
PLAIN = true;
let plain = `<!doctype html><html lang="es"><head><meta charset="utf-8">${FONTS}<style>body{margin:0;background:#ddd}*{box-sizing:border-box}a{color:inherit;text-decoration:none}</style></head><body>`;
for (const [name, p] of Object.entries(PARTS)) plain += `<div data-part="${name}" style="${rootStyle(p.w)}margin-bottom:40px">${p.html(p.m)}</div>`;
writeFileSync(OUT + 'plain.html', plain + '</body></html>');

// canvas boards
PLAIN = false;
const layout = { v: 3, boards: {} };
let x = 0, y = 0, rowH = 0;
const dims = {};
for (const [name, p] of Object.entries(PARTS)) {
  const h = heights[name] ? heights[name] + 4 : 3000;
  dims[name] = h;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Inicio ${name.replace('.dc.html', '')}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<meta name="design_doc_mode" content="canvas">
${FONTS}
<style>*{box-sizing:border-box}body{margin:0;background:${IVORY}}a{color:${INK};text-decoration:none}</style>
</helmet>
<div style="${rootStyle(p.w, h)}">
${p.html(p.m)}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":${p.w},"height":${h}}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`;
  writeFileSync(OUT + 'project/' + name, html);
}
writeFileSync(OUT + 'dims.json', JSON.stringify(dims));
console.log('written', Object.keys(PARTS).join(', '), JSON.stringify(dims));
