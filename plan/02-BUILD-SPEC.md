# babyshower.com.py — BUILD-SPEC (v2, 2026-09-19)

Zero-output document: no code here. The worker implements this exactly. Deviation requires a note in the report under "Flagged", never a silent substitution.

Reference implementation to copy patterns from: `C:\Claude 1\tasacion-com-py` (same house stack). Reuse patterns, adapting them to the contracts below: `build-site.mjs` structure, `content.mjs` shape, `lead-forward.php`,  `assets/js/site.js` header + WhatsApp menu behaviour.
Design references: `C:\Claude 1\claude-skills\web-design-system\references\tokens.css`, `motion.js`, `layout-patterns.md`, `qa-preflight.md`.

Repo root: `C:\Claude 1\babyshower` (this folder). Site source lives at the root, plan docs stay in `plan/`.

---

## 0. Launch mode: inquiry-only (decided 2026-09-19)

Read this section first. Precedence: §0 > 04 copy > design export (composition) > BUILD-SPEC §6 section list. Revision authority: 10-REVISION-V2.md. Anton has no supplier or RUC yet. Organic inquiry publication, paid traffic and bookings have separate gates in 06 §1.

In content.mjs: LAUNCH_MODE = 'inquiry' (inquiry | booking); PRICES.mode = 'estimated' (estimated | firm); PRICES.effectiveDate = '2026-09-19'; PRICES.label = 'Estimación vigente al 19/09/2026'; BOOKING_ENABLED = false.

Render wording from these flags, never type it per page:
- Primary CTA everywhere: **Consultá por WhatsApp**; no reservation CTA or deposit request while BOOKING_ENABLED is false.
- Every card, table, calculator, FAQ price answer, guide CTA and WhatsApp script uses **Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp.** Replace X with the configured amount. Response promise: **Te respondemos dentro de 24 horas hábiles.**
- Estrella badge: **Combo completo**. Transparency sub: **Precios estimados a la vista, sin preguntar al privado.** No firm prices, popularity or supplier-certainty claims. Scope: **Montaje y desmontaje incluidos en la estimación**, **Coordinamos horario de montaje con vos**, **Coordinación del evento (Sueño)**.
- Trust ribbon exact shared array: ['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso'].
- POLICY.iva: **Estimaciones orientativas. Impuestos y formas de pago se confirman por escrito antes de cualquier pago.** POLICY.pagos: **Te confirmamos las formas de pago disponibles por WhatsApp antes de cualquier pago.** No payment rail list until Q2 is answered.
- POLICY.sena and POLICY.cancel appear only on /como-funciona/ and /terminos/, under **Política prevista de reserva (se aplica cuando habilitemos reservas)**. No contract until written confirmation.
- Gallery answer: **Todavía no tenemos galería de trabajos propios. Te compartimos ideas ilustrativas por WhatsApp.** /trabajos-reales/ deferred; proof slots hidden.
- Operator: **Baby Shower Paraguay, sitio operado desde Asunción**, with WhatsApp and SITE.email; no personal name unless Q16 is answered.
- Lead endpoint and WhatsApp work from day 1; CRM optional, durable log and notification success mandatory per §8.

WA_NUMBER = '595992279599'; display +595 992 279 599. SITE.leadEmail confirmation is Q21; do not expose a guessed public email.

## 1. Stack and constraints

- Hosted site is plain HTML + one PHP file, on Anton's Brazilian Hostinger shared plan (addon domain babyshower.com.py). Nothing Node runs on the server. Node 24 is used only on the laptop as the page generator (`node build-site.mjs` → committed HTML), exactly like tasacion.com.py. Reason: there is no PHP interpreter on the laptop, so PHP-include templating could not be previewed or verified locally; generated HTML can. If Anton later installs PHP locally, the generator can be swapped for PHP includes without changing URLs.
- Generated from `content.mjs` (+ `themes.mjs`, `zones.mjs`, `ideas.mjs` for the programmatic sets). No npm dependencies. No framework. No GitHub Actions.
- Output: one folder per route with `index.html`, plus `404.html`, `gracias.html`, `sitemap.xml`, `robots.txt`, `.htaccess`, `lead-forward.php`, `assets/`.
- Shared CSS in `assets/css/site.css`, shared JS in `assets/js/site.js` and `assets/js/calc.js`, cache-busted with a content hash query (copy the `ASSET_V` pattern).
- Fonts self-hosted in `assets/fonts/` (Instrument Serif 400, Satoshi 400/500/700, woff2, `font-display: swap`). Satoshi is not on Google Fonts. If the woff2 files are not present in `assets/fonts/` when the worker starts, use Google Fonts `<link>` (preconnect) for Instrument Serif and DM Sans 400/500/700 as the text face, keep the token name `--font-text`, and flag it in the report so Anton can swap in Satoshi later.
- Page weight: uncompressed HTML + site.css + site.js + calc.js < 500 KB; fonts and images reported separately, hero image ≤ 180 KB WebP. Lighthouse mobile ≥ 90 performance, 100 SEO, ≥ 95 accessibility (run once at QA, not chased).
- `<html lang="es-PY">`. All UI text Spanish, voseo in CTAs. No English strings anywhere in rendered HTML except brand-neutral technical attributes.
- Deploy: `deploy/make-zip.ps1` uses .NET `System.IO.Compression.ZipFile` to build `dist/babyshower-YYYY-MM-DD.zip`, flat and including dotfiles. Derive route entries from `docs/routes.json` plus the fixed shipping files in §10; print entry count and fail if any manifest route is missing. `deploy/make-zip.sh` is optional. Write `.htaccess` fresh: canonical HTTPS + non-www, deny `leads.log` and `*.mjs`, custom 404, no legacy redirects. Plain `robots.txt` allows all major bots; llms.txt is not a blocker.

## 2. Design tokens (resolved, copy as values)

Track: WARM CRAFT, resolved to the SOFT CRAFT palette below. Replace only the six TRACK lines in `tokens.css`; keep everything else byte-identical.

```
--font-display: 'Instrument Serif', Georgia, serif;
--font-text: 'Satoshi', system-ui, sans-serif;
--base: #FBF6F2;      /* warm cream */
--ink: #2B2430;       /* plum-black */
--accent: #D97B6C;    /* terracotta rose, CTAs only */
--surface: #FFFFFF;
```

Additional named colours allowed (not accents): `--tint-sage: #DDE8E0`, `--tint-sky: #DCE6F2`, `--tint-blush: #F6E1DC` for section fills and theme card backgrounds only. Gender-neutral by default. WhatsApp `#25D366` only for the WhatsApp glyph and the FAB circle.

Type: scale 1.30 from tokens.css. H1 `clamp(44px, 6vw, 76px)` line-height 1.02, weight 400. Eyebrows 12px uppercase 0.12em accent.

Radii: inputs `--r-sm`, cards and images `--r-md`, feature panels and calculator `--r-lg`. Borders always `--hairline`. Shadows only `--shadow-1` / `--shadow-2`. Grain overlay on every dark section (the fallback layout has one full-bleed band; the chosen design may place dark sections differently). Motion: copy `motion.js` verbatim, no hero text entrance animation, `prefers-reduced-motion` respected.

## 3. Global elements (every page)

- Sticky header: brand text "Baby Shower" + ".com.py" span, nav: Combos y precios · Revelación de género · Temáticas · Primer añito · Ideas · Contacto. WhatsApp button (accent-outlined, WhatsApp glyph in green) + phone as plain text. Mobile: burger → panel (copy tasacion pattern).
- Floating WhatsApp FAB bottom-right, `aria-label="Escribinos por WhatsApp"`, 56px, opens the WhatsApp menu panel (copy tasacion's WA_MENU panel: 5 options, each with prefilled text carrying page context).
- Sticky mobile bar (below 1024px): WhatsApp primary, "Calculá tu precio" secondary linking to `/#calculadora` (or in-page anchor when on landing).
- Footer: NAP block (name, service area text "Atendemos en Asunción y Gran Asunción", WhatsApp number as text and link, horario "Lun a Sáb 8:00 a 20:00"), RUC line rendered only if `SITE.ruc` is non-empty, Instagram link if `SITE.instagram` non-empty, links: Cómo funciona · Preguntas frecuentes · Privacidad · Términos. Consent banner (Ley 6534/2020): Aceptar / Rechazar, no pre-checked box; stores choice in localStorage. Footer link Preferencias de cookies allows revocation. No tag loads before consent. Show operator identity from §0 with WhatsApp and SITE.email.
- `data-ev` / `data-ev-loc` attributes on every CTA (analytics-prep shim from web-design-system). `ANALYTICS_ID` constant in `content.mjs`; when empty, no GA tag is emitted; when set and consent is accepted, load gtag and fire `whatsapp_click`, `calc_submit`, `form_submit` once per interaction (debounced 1 s). `form_submit` fires on the thanks page only after server success. WhatsApp navigation never depends on an analytics callback and links work with JS disabled. Never copy tasacion’s unconditional `vc-attribution.js` load.
- `<head>`: unique title 20–60 chars and description 70–155 per page, canonical, og:title/description, viewport, inline SVG data URI favicon in B1 (allowed asset: `assets/img/favicon.svg`); no og:image until B7 supplies `assets/img/og.jpg` 1200×630, JSON-LD per §7.

## 4. WhatsApp contract

`WA_NUMBER = '595992279599'` in `content.mjs`. Link format: `https://wa.me/<number>?text=<urlencoded>`.

WA_MENU options (panel opened by FAB and header button):
1. `combo` — "Quiero consultar por un combo de baby shower" → `Hola, vengo de babyshower.com.py (<page>) y quiero consultar por un combo de baby shower. Fecha tentativa: ____ · Invitados: ____ · Zona: ____`
2. `revelacion` — "Quiero una revelación de género" → `Hola, vengo de babyshower.com.py (<page>) y quiero organizar una revelación de género. Fecha tentativa: ____ · Zona: ____`
3. `anito` — "Quiero organizar un primer añito" → `... primer añito. Temática: ____ · Fecha: ____ · Invitados: ____`
4. `disponibilidad` — "Quiero saber si tienen fecha disponible" → `... consultar disponibilidad para el ____ en ____`
5. `consulta` — "Tengo otra consulta" → `Hola, vengo de babyshower.com.py (<page>) y tengo una consulta.`

Package cards carry their own direct wa.me link (not the panel): `Hola, vengo de babyshower.com.py (<ruta>) y quiero consultar por <Nombre del combo>. Precio estimado desde Gs. <precio>. El precio final y la disponibilidad se confirman por WhatsApp. Fecha tentativa: ____ · Zona: ____ · Invitados: ____`. All primary buttons say Consultá por WhatsApp.

## 5. Calculator (assets/js/calc.js, on / and /combos-y-precios/)

Frozen matrix, provisional estimates from content.mjs only:

| Package / id | Base Gs. | Included guests | Max guests | Extra guest Gs. | Bundled add-ons |
|---|---|---|---|---|---|
| Nube / basico | 1.150.000 | 30, decor only | 30 | 0 | none |
| Estrella / estrella | 1.850.000 | 30 | 40 | 55.000 | none |
| Sueño / premium | 2.750.000 | 40 | 60 | 60.000 | torta, souvenirs |

Inputs: package radio (default estrella); invitados range 15–60 step 5 with number and +/- buttons (48px targets); ADDONS checkboxes; ZONES select. Keep the requested guest number on package changes; clamp nothing. Extra-guest food: Estrella +1 dulce and +2 salados; Sueño +2 dulces and +3 salados. Nube guest count does not change its price.

Formula: base + max(0, invitados - included) * extra + unbundled selected add-ons + zone delivery. Fewer guests never reduce the base. Sueño torta and souvenirs are disabled, labelled incluido, never charged twice. Above package max: retain number, hide numeric total, show Para N invitados te cotizamos por WhatsApp and CTA Pedir cotización. Zona otra: same custom-quote behaviour, no invented total. Switching package recomputes without changing guest count. Never ask pregnancy stage or medical details.

ZONES delivery: Asunción, Fernando de la Mora, Lambaré = 0; San Lorenzo, Luque = 40.000; Mariano Roque Alonso, Capiatá = 60.000; Otra = cotizar. Label recargo estimado. Copy: Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado. zones.mjs contains only slug, name, barrios, venue types, FAQ and paragraph, joined by slug; all prices remain in content.mjs.

Output: es-PY Gs. format, itemised breakdown, derived price caption from §0 and PRICES.label. Primary CTA Consultá por WhatsApp, custom quote CTA as above. WhatsApp text:
Hola, usé la calculadora de babyshower.com.py (<ruta>): <Paquete>, <N> invitados, adicionales: <lista|ninguno>, zona <Zona>. Estimación Gs. <total> (<PRICES.label>). Fecha tentativa: ____
Append the §0 derived caption for numeric estimates; for custom quotes omit numeric estimate/caption and send the requested inputs with Te cotizamos por WhatsApp. Do not serialize an old total.

Fixtures: Nube 15 = 1.150.000; Estrella 30 = 1.850.000; Estrella 40 + torta = 2.620.000; Estrella 45 = custom; Sueño 40 + torta = 2.750.000 (torta disabled); Nube 15 Luque = 1.190.000. Default zone Asunción except where stated.

calc_submit follows consent/event rules. Render package prices as text for SEO/no-JS; without JS calculator degrades to a link to /combos-y-precios/.

## 6. Page inventory (manifest-derived)

Manifest snapshot: 32 routes, 31 non-root route directories inside 11 top-level route directories, 34 HTML files including 404.html and gracias.html. docs/routes.json fields: route, output, phase (B1..B4), indexable, built. Derive sitemap, SHIP list, prompt counts and verification totals from the manifest; never hardcode totals in implementations. Cumulative built routes B1/B2/B3/B4: 6/9/26/32. Special HTML outputs are non-indexable, outside the canonical route count.

Once chosen, docs/design-canvas-export.html governs home composition in modes A/B/C; inner pages reuse its components. The home row lists content, not mandatory layout. Until then B1 uses these patterns. Horizontal scroll is allowed for calculator breakdown and mobile theme strip.

Each row: route · primary keyword · H1 · sections (named patterns from layout-patterns.md) · CTA text.

| Route | Primary kw | H1 | Sections | Primary CTA |
|---|---|---|---|---|
| `/` | baby shower asunción | Baby shower en Asunción con precio claro | P1 hero split 7/5 · P8 trust ribbon · packages (3 cards, elevated middle) · calculator panel `--r-lg` · P6 full-bleed band (dark, grain) · P5 stepper 4 steps · themes bento (10) · "Qué incluye y qué no incluye" two columns · zones text · FAQ (6) · contact split · footer | Consultá por WhatsApp |
| `/combos-y-precios/` | baby shower precio paraguay | Combos y precios de baby shower | hero short · comparison table (sticky first column on mobile, horizontal scroll) · calculator · add-ons grid · estimated tax/payment wording (policy only on the two allowed pages) · FAQ (4) | Consultá por WhatsApp |
| `/revelacion-de-genero/` | revelacion de genero | Revelación de género en Asunción: kit o fiesta completa | P1 hero · 2 package cards · how it works (3 steps) · torta upsell · Adicionales a confirmar, solo exterior (humo de color, polvo holi; no price or calculator entry) · "sencilla en casa" section linking to the idea page · FAQ (4: color secreto, humo en interior, información necesaria, torta) | Consultá por WhatsApp |
| `/primer-anito/` | fiesta para bebe de 1 año | Primer añito con temática, listo para disfrutar | hero · 1 package card · theme picker linking themes · FAQ (3) | Consultá por WhatsApp |
| `/tematicas/` | temáticas para baby shower | Temáticas para baby shower y primer añito | hero short · bento of 10 themes with tint backgrounds · CTA band | Consultá por WhatsApp |
| `/tematicas/<slug>/` ×10 | see themes.mjs | `Decoración de <Tema> para baby shower y primer añito` | hero with theme colour · what the decor includes (list) · which combos apply (2 cards with price) · palette and elements paragraph (unique, 120+ words) · 3 related themes · FAQ (2) | Consultá por WhatsApp |
| `/zonas/` | baby shower gran asunción | Zonas donde montamos tu baby shower | list of 7 zones with delivery note each | Consultá por WhatsApp |
| `/zonas/<slug>/` ×5 | baby shower <ciudad> | Baby shower en <Ciudad> | hero · unique paragraph (barrios, typical venue types, estimated delivery surcharge, access checklist) · packages (3 cards with zone delivery already added) · themes strip · FAQ (2 zone-specific) | Consultá por WhatsApp |
| `/ideas/` | ideas para baby shower | Ideas para tu baby shower | hub cards to 5 guides | Consultá por WhatsApp |
| `/ideas/<slug>/` ×5 | see ideas.mjs | guide title | article layout, 700–1000 words each, H2s, one image slot, in-article CTA card after 2nd H2, end CTA | Consultá por WhatsApp |
| `/como-funciona/` | cómo reservar baby shower | Cómo funciona: consultás y coordinamos | Quiénes somos · inquiry stepper · POLICY.pagos · planned policy heading and texts per §0 · recommendation to consult 3 weeks ahead | Consultá por WhatsApp |
| `/preguntas-frecuentes/` | preguntas baby shower | Preguntas frecuentes | 14 FAQs grouped (Consultas y estimaciones · Montaje · Comida · Revelación · Zonas) + FAQPage JSON-LD | Consultá por WhatsApp |
| `/contacto/` | contacto | Escribinos | WhatsApp block + form with every visible/hidden field in §8 → lead-forward.php · horario | Enviar |
| `/privacidad/`, `/terminos/` | — | — | legal text from content.mjs | — |
| `/404.html`, `/gracias.html` | — | — | custom 404; gracias noindex, outside sitemap, thanks copy in 04 §13 | — |

Theme slugs: `jefe-en-panales`, `dino-bebe`, `moana-bebe`, `minnie-bebe`, `mickey-bebe`, `blanca-nieves-bebe`, `frutillita-bebe`, `mariposas`, `safari`, `nubes-y-ositos`.
Zone slugs (5 at launch): `asuncion`, `luque`, `san-lorenzo`, `fernando-de-la-mora`, `lambare`, `capiata`, `mariano-roque-alonso`. Capiatá and Mariano Roque Alonso got pages in Batch 12 (2026-09-24, Anton: more SEO pages), using their existing ZONES delivery amounts. Counts are derived from the manifest snapshot above. `/trabajos-reales/` is NOT built in this phase (deferred until authorised photos exist).
Idea slugs: `ideas-para-baby-shower`, `juegos-para-baby-shower`, `baby-shower-sencillo-en-casa`, `revelacion-de-genero-sencilla`, `que-se-necesita-para-un-baby-shower`.

Copy for every page is in `plan/04-CONTENT-AND-COPY.md`. Where a paragraph is not written there, the worker writes it in Paraguayan Spanish following the tone rules and marks it `[REVISAR]` in the report list, never in the HTML.

## 7. Structured data

One graph with linked @ids: Organization#org and WebSite#site on every page, name Baby Shower Paraguay, site URL, sameAs only when Instagram is set. Service on each offer page, provider pointing to Organization#org, areaServed and serviceType. LocalBusiness only on /, with areaServed and no address. No Product/Offer, InStock or priceRange while PRICES.mode is estimated. BreadcrumbList on non-root pages; Article on guides with datePublished and author pointing to Organization#org. FAQPage optional, retained only with visible Q/A identical. No fabricated review markup.

## 8. Lead endpoint contract

Adapt the reference endpoint to this contract, never copy credentials.

| Field | Visibility | Validation / meaning |
|---|---|---|
| nombre | visible | 2–60 characters |
| whatsapp | visible | Paraguayan mobile: accepts 09xxxxxxxx, +5959xxxxxxxx, 5959xxxxxxxx; normalise to 5959xxxxxxxx |
| fecha | visible, optional | ISO date, today or later; no sé todavía checkbox sets empty |
| invitados | visible, optional | integer 5–200 |
| tipo | visible | baby-shower / revelacion / primer-anito / otro |
| zona | visible | ZONES slugs plus otra |
| mensaje | visible, optional | at most 500 characters |
| origen | hidden | page path |
| sid | hidden | client-generated BS-yyyymmdd-xxxx, dedupe key |
| empresa | hidden | honeypot |

Server validates, rate-limits 5/min/IP, dedupes on sid, writes one JSON line to leads.log (outside public_html when possible, otherwise denied by .htaccess), sends email to SITE.leadEmail using PHP mail(), POSTs to VenderCRM when configured. Pipeline Baby Shower, stage Nuevo, fields mapped per vendercrm-lead-capture payload; unmapped fields go in the note. Config: one level above public_html, per-domain filename vendercrm-config.babyshower.php; never commit real config.

Success requires durable write AND (email OR CRM succeeded). Only then redirect to /gracias.html (noindex, no sitemap). Failure returns the form with No pudimos guardar tu consulta. Escribinos por WhatsApp: +595 992 279 599 and wa.me fallback. Error and thanks strings: 04 §13. B5 may edit assets/js/site.js and the contact renderer in build-site.mjs for error display. Hosted real-form test, email + log, owned by Anton, is a Gate A item.

## 9. Verification the worker must run (and manager reruns)

Commands per phase: node build-site.mjs; node verify.mjs --phase B1 (replace phase with B2..B5 as appropriate). B2 adds --calc, B3 --uniqueness, B4 --words. After B5: node verify.mjs --final; powershell -NoProfile -File deploy/make-zip.ps1. PHP lint: record php -l lead-forward.php as not available locally; hosted PHP test belongs to Anton at Gate A.

verify.mjs --phase B1..B5 reads manifest built flags. Links to built:false routes are allowed only if the target is in the manifest. --final rejects any built:false. Count outputs and sitemap entries from manifest; sitemap includes only built, indexable routes, never 404 or gracias.

Checks:
- Built outputs exist; one h1; lang es-PY; correct canonical; title 20–60 characters and description 70–155, unique across manifest; context in wa.me links; JSON-LD parses and graph follows §7.
- No placeholder markers or mojibake in visible output. Reject a question mark between letters in visible Spanish text using /[a-z]\?[a-z]/i. Reject the existing review/completion markers, lorem and TODO in output.
- Links: strip query and fragment for route resolution; exempt mailto:, tel:, https://wa.me and external URLs; internal fragments must exist when target is built. Only manifest-listed future routes receive the phase exemption.
- Uniqueness: normalise lowercase, strip accents and punctuation, main-content paragraph 5-gram sets, Jaccard similarity; fail at ≥ 0.60 for any pair within themes or within zones.
- Words: main article text only, excluding header, footer, nav, CTA cards and FAQ; 700–1000 inclusive.
- Weight: uncompressed bytes of HTML + site.css + site.js + calc.js < 500 KB; report fonts and images separately.
- Prices: text equals content.mjs; zone card price = base + zone delivery; calculator fixtures in §5, custom quote retains input/hides total, bundled extras disabled.
- Contrast: WCAG 4.5:1 body, 3:1 text ≥ 24px. Consent accept/reject/revoke, no tags before consent, debounced events, form_submit only after server success, WhatsApp usable without JS.
- Preview HTTP checks at B6 cover every canonical manifest route plus 404 and gracias; zip includes every manifest output and dotfiles.

## 10. File tree to produce

```
babyshower/
  AGENTS.md  BRIEF.md  plan/  codex-input/        (already exist, do not modify)
  content.mjs  themes.mjs  zones.mjs  ideas.mjs
  build-site.mjs  verify.mjs
  lead-forward.php  .htaccess  robots.txt  sitemap.xml (generated)
  404.html  gracias.html  index.html (generated)
  assets/css/site.css  assets/js/site.js  assets/js/calc.js  assets/js/motion.js
  assets/fonts/*  assets/img/* (placeholders until imagery phase; see 07-IMAGERY.md)
  <route dirs>/index.html (generated)
  deploy/make-zip.ps1  deploy/make-zip.sh (optional)  deploy/vendercrm-config.example.php
  docs/routes.json  docs/DEPLOY.md  docs/log/build.md  docs/design-canvas-export.html (when chosen)
  .gitignore (dist/, leads.log, vendercrm-config*.php (except the example), node_modules/)
```

Fixed ship list: index.html, 404.html, gracias.html, lead-forward.php, .htaccess, robots.txt, sitemap.xml, assets/; add route outputs from manifest, deduplicating index.html. Exclude plan, docs, deploy, codex-input, logs, config and source mjs files. B1 favicon asset: assets/img/favicon.svg. preview-server.mjs is local only.

Generated HTML is committed (Hostinger has no build step) exactly like tasacion.

## 11. Image slots (filled in a later phase; ship with tinted placeholder panels, never empty boxes)

`hero-bleed` on `/`, `/revelacion-de-genero/`, `/primer-anito/` · `section-break` on `/` band · `card-motif` 4:3 for each of 10 themes and 3 packages and 2 reveal kits · `og.jpg`. `proof-photo` slots exist in markup but are hidden (`hidden` attribute) until real photos land. Alt text in Spanish, descriptive, no keyword stuffing. Prompts in `07-IMAGERY.md`.

No og:image tag is emitted until B7 provides assets/img/og.jpg; keep the font fallback from §1.
