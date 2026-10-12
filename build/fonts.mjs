// Self-hosted font detection and preload tags; @font-face rules live in site.css.
import { readFileSync, existsSync, readdirSync } from 'node:fs';

// Only opt into self-hosted fonts when the required faces are all present. Text face: Satoshi if shipped, otherwise DM Sans (both need 400, 500 and 700).
const fontFiles = existsSync('assets/fonts') ? readdirSync('assets/fonts').filter(f => /\.woff2$/i.test(f)) : [];
const serif = fontFiles.find(f => /instrument.*serif/i.test(f));
export const textFace = [['Satoshi', 'satoshi'], ['DM Sans', 'dm-?sans']].map(([family, pattern]) => ({ family, files: [400, 500, 700].map(w => fontFiles.find(f => new RegExp(`${pattern}.*(${w}|${{400:'regular',500:'medium',700:'bold'}[w]})`, 'i').test(f))) })).find(face => face.files.every(Boolean));
export const localFonts = serif && textFace;
const fontUrl = f => '/assets/fonts/' + encodeURIComponent(f);
// @font-face rules live at the top of site.css (no inline <style>, so the CSP needs no 'unsafe-inline'); fail if they drift from the shipped files.
if (localFonts) { const css = readFileSync('assets/css/site.css', 'utf8'); for (const f of [serif, ...textFace.files]) if (!css.includes(`src:url('${fontUrl(f)}')`)) throw new Error('site.css lacks @font-face for ' + f); }
export const fonts = localFonts ? [serif, textFace.files[0]].map(f => `<link rel="preload" href="${fontUrl(f)}" as="font" type="font/woff2" crossorigin>`).join('')  : '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&amp;family=Instrument+Serif&amp;display=swap" rel="preload" as="style" onload="this.onload=null;this.rel=&quot;stylesheet&quot;"><noscript><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&amp;family=Instrument+Serif&amp;display=swap" rel="stylesheet"></noscript>';
