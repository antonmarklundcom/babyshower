# 10 — Revision v2 decisions (Fable 5.1, 2026-09-19, after CODEX-REVIEW-2)

This file is the authority for the v2 edit pass. Where it conflicts with 01–09 or prompts, this file wins and the others are updated to match. Source: `codex-input/CODEX-REVIEW-2.md`. Each item states ADOPT, PARTIAL or REJECT with the reason and the exact change.

## A. Business and customer outcomes

### A1. Inquiry-only launch, made consistent (ADOPT review 7.1)
Add to `content.mjs` and BUILD-SPEC §0:
```
LAUNCH_MODE = 'inquiry'          // inquiry | booking
PRICES.mode = 'estimated'        // estimated | firm
PRICES.effectiveDate = '2026-09-19'
PRICES.label = 'Estimación vigente al 19/09/2026'
BOOKING_ENABLED = false          // no seña requested, no deposit copy in CTAs
```
Derived wording rules (rendered from these flags, never typed per page):
- Primary CTA everywhere: **Consultá por WhatsApp**. "Reservar" appears nowhere while BOOKING_ENABLED is false.
- Price caption on every card, table, calculator, FAQ answer, guide CTA and WhatsApp script: **"Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp."**
- Response promise: **"Te respondemos dentro de 24 horas hábiles."** Never "confirmamos tu fecha en 24 h".
- Remove: "Más elegido" (replace label with the factual **"Combo completo"** on Estrella), "El precio que ves es el precio que pagás", "Los precios son finales", "Sin preguntar precio al privado" stays (it is about transparency, not finality) but the sub becomes "Precios estimados a la vista, sin preguntar al privado."
- Remove all supplier-certainty claims: "llegamos 2 horas antes", "coordinadora presente", "globos de látex biodegradable y estructura propia", "bocaditos elaborados el mismo día", "los sábados se llenan rápido", "temáticas que más se piden", "atendemos domingos". Replace with scope statements: "Montaje y desmontaje incluidos en la estimación", "Coordinamos horario de montaje con vos", "Coordinación del evento (Sueño)".
- Payment and tax: `POLICY.iva` becomes **"Estimaciones orientativas. Impuestos y formas de pago se confirman por escrito antes de cualquier pago."** `POLICY.pagos` becomes **"Te confirmamos las formas de pago disponibles por WhatsApp antes de cualquier pago."** No list of rails until Q2 is answered. `POLICY.sena` and `POLICY.cancel` are shown only on `/como-funciona/` and `/terminos/` under the heading **"Política prevista de reserva (se aplica cuando habilitemos reservas)"**.
- Gallery FAQ answer: **"Todavía no tenemos galería de trabajos propios. Te compartimos ideas ilustrativas por WhatsApp."**
- Trust ribbon, one exact array used everywhere (01, 02, 04, 09): `['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso']`.
- Launch gates split (01 §8, 06 §1, 08 Q14): **Gate A, organic inquiry publication** = site QA passed, WhatsApp answered by Anton, privacy/terms live, lead email working. **Gate B, paid traffic** = Gate A + GA4/Ads conversion verified + 400k envelope approved. **Gate C, bookings** = supplier rate card, seller identity, payment rails, lawyer review → flip BOOKING_ENABLED.

### A2. Packages: frozen matrix, inclusions and exclusions (ADOPT 7.8, PARTIAL section 1 "turnkey")
| Package | Base Gs. | Included guests | Max guests | Extra guest Gs. | Bundled add-ons (disabled in calculator) |
|---|---|---|---|---|---|
| Nube | 1.150.000 | 30 (decor only, guests do not change price) | 30 | 0 | none |
| Estrella | 1.850.000 | 30 | 40 | 55.000 | none |
| Sueño | 2.750.000 | 40 | 60 | 60.000 | torta, souvenirs |
All marked provisional estimates. Add an explicit **Exclusiones** row to the comparison table and to each card's expandable detail: not included in any combo: local/salón, mozos, bebidas alcohólicas, mobiliario (mesas y sillas), mantelería, hielo, limpieza posterior, torta (salvo Sueño), souvenirs (salvo Sueño). The "Sin letra chica" section on `/` becomes **"Qué incluye y qué no incluye"** with two columns, per package where it differs. Extra-guest food rule: +1 dulce y +2 salados por invitado extra (Estrella), +2 y +3 (Sueño).

### A3. Reveal offer cleaned (ADOPT 7.9)
Kit Sorpresa Gs. 390.000: globo gigante negro con confeti del color + cartel + entrega en Asunción, Fernando de la Mora y Lambaré (otras zonas con recargo estimado). Revelación Completa Gs. 690.000: kit + backdrop + arco pequeño + mesa con 20 dulces + montaje. Humo de color and polvo holi: listed under "Adicionales a confirmar, solo exterior", no price, no calculator entry, no imagery in the kit flat lay (07 kit prompt drops the cannons). Colour custody copy: **"Una persona de tu confianza nos pasa solo el color por WhatsApp. No nos envíes estudios médicos."** Remove the "número que solo ve nuestra coordinadora" claim.

### A4. Repeat-customer offer (ADOPT 7.9, REJECT keeping 10%)
Remove the 10% discount everywhere (01, 04 §5 hook, 04 §12 follow-up). Replace with **"Si volvés con nosotros para el baby shower o el primer añito, te armamos una propuesta con un beneficio que cotizamos en el momento."** Reminder timing = the month the customer chooses when asked "¿Querés que te escriba más adelante? Decime qué mes te queda bien." (01 §6, 06 §4). No fixed +8 weeks / +11 months offsets in customer-facing flow; keep them only as internal defaults if the customer says "cuando quieras".

### A5. Delivery scope (ADOPT contradiction P1)
Single rule in `ZONES`: Asunción, Fernando de la Mora, Lambaré = 0; San Lorenzo, Luque = 40.000; Mariano Roque Alonso, Capiatá = 60.000; Otra = cotizar. All labelled "recargo estimado". Copy never says "delivery en toda Gran Asunción"; it says "Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado." Zone pages show the surcharge and no travel minutes (removed from 02 §6 and 04 §8).

### A6. Ads numbers, one source (ADOPT)
400.000 PYG over 14 days, ~30.000/day, CPC cap 2.000. Form submission accepted by the server = inquiry conversion (primary). WhatsApp click = secondary, no value. CRM deposit = business outcome, offline. Update 01 §7 and §8 to match 05.

### A7. Cancellation and balance (ADOPT)
First band "15 días o más". Balance "48 horas antes" everywhere; ops timeline: saldo requested at T-3, must be received by T-2. FAQ "¿Puedo cambiar la fecha?" answer adds "sujeto a disponibilidad". Refund processing target "dentro de 5 días hábiles" added to POLICY.cancel, marked for lawyer review together with weather and scope-change rules.

### A8. Instagram competitor scan (PARTIAL)
Not plan text; a Phase 0 task for Anton in 06 §1: one hour, 10 local operators on Instagram, columns: package contents, price shown or not, response time, proof photos, delivery zones. Result feeds copy tweaks, not a launch blocker.

### A9. Supplier backup, hold IDs, venue check, shareable quote (PARTIAL)
All belong to Gate C (bookings). Add to 06 §2–§4 as booking-mode rules: hold ID + expiry required before any deposit request; two alternative slots when booked; venue photo + dimensions before a fixed quote; one shareable quote message naming the payer, hold expiry and booking reference. Not launch blockers for inquiry mode.

### A10. Operator identity (ADOPT review 8)
Until Q1: site operator shown as **"Baby Shower Paraguay, sitio operado desde Asunción"** with WhatsApp and `SITE.email`. `/como-funciona/` gets a short "Quiénes somos" paragraph: organiser-coordinator model, estimates, manual confirmation. No personal name unless Anton answers Q16.

## B. Technical contract

### B1. Page manifest (ADOPT 7.2)
32 routes, 31 non-root route directories inside 11 top-level directories, 34 HTML files with `404.html` and `gracias.html`. `docs/routes.json` fields: `route, output, phase (B1..B4), indexable, built`. Sitemap, SHIP list, counts in prompts and verify are derived from the manifest; no hardcoded totals anywhere else. Cumulative built after B1/B2/B3/B4 = 6/9/26/32.

### B2. Phase scoping (ADOPT 7.3)
Every phase prompt: "You may regenerate every output HTML file the generator produces. Authored source edits are limited to the files listed." `verify.mjs` phase modes: `--phase B1..B5` reads `built` flags; links to routes with `built:false` are allowed only when the target exists in the manifest; `--final` rejects any `built:false`. Every prompt reads BUILD-SPEC §0 first and states precedence: §0 > 04 copy > design export (composition) > BUILD-SPEC §6 section list.

### B3. Routing (ADOPT 7.4)
`/gracias.html` with `noindex`, not in sitemap. `.htaccess` written fresh for this site (canonical https + non-www, deny `leads.log` and `*.mjs`, custom 404, no legacy redirects). B6 adds an HTTP check of all 32 canonical routes plus 404 and gracias on the preview server.

### B4. Lead handling (ADOPT 7.5)
Visible fields: `nombre` (2–60 chars), `whatsapp` (Paraguayan mobile: accepts `09xxxxxxxx`, `+5959xxxxxxxx`, `5959xxxxxxxx`; normalise to `5959xxxxxxxx`), `fecha` (optional, ISO date, today or later, "no sé todavía" checkbox sets it empty), `invitados` (optional int 5–200), `tipo` (enum baby-shower | revelacion | primer-anito | otro), `zona` (enum of ZONES slugs + otra), `mensaje` (optional ≤ 500). Hidden: `origen` (page path), `sid` (client-generated `BS-yyyymmdd-xxxx`), honeypot `empresa`. Server: validate, rate-limit 5/min/IP, dedupe on `sid`, write one JSON line to `leads.log` (outside public_html when possible, else denied by .htaccess), send email to `SITE.leadEmail` via PHP `mail()`, POST to VenderCRM when configured (pipeline "Baby Shower", stage "Nuevo", fields mapped per the vendercrm-lead-capture skill's payload; unmapped fields go in the note). Success = durable write + (email OR CRM) succeeded; otherwise return the form with **"No pudimos guardar tu consulta. Escribinos por WhatsApp: +595 992 279 599"** and the wa.me link. Error strings and thanks page copy in 04 §13 (new). Config path: one level above public_html, per-domain filename `vendercrm-config.babyshower.php`. B5 may edit `site.js` and the contact page renderer for error display.

### B5. Legal copy (ADOPT 7.6)
04 gets §14 Privacidad and §15 Términos, inquiry-mode, Spanish, written by the worker from a fixed outline: operator identity (A10), data collected (form fields, WhatsApp number), purposes (responder consultas, coordinar eventos), recipients (proveedores solo para eventos confirmados, CRM propio, Google Analytics solo con consentimiento), retention **12 meses desde la última consulta** (default, Q17), deletion contact (WhatsApp or email), cookies/analytics consent with accept, reject and revoke via a footer link, complaints contact, law reference "Ley 6534/2020" for data and "Ley 4868/2013" for e-commerce, and a line that no contract exists until written confirmation. Terms include the reserve policy block from A1 as "política prevista". No placeholders in HTML; unresolved identity uses A10 wording.

### B6. Windows deploy (ADOPT 7.7)
`deploy/make-zip.ps1` (.NET `System.IO.Compression.ZipFile`) builds `dist/babyshower-YYYY-MM-DD.zip` flat, including dotfiles, from the manifest plus the fixed ship list; prints entry count and fails if any manifest route is missing. `deploy/make-zip.sh` optional. `php -l` recorded as "not available locally"; hosted PHP test (submit one real form on the addon domain, check email + log) is a Gate A item owned by Anton.

### B7. Calculator edge behaviour (ADOPT 7.8)
Guests above max: keep the requested number, hide numeric total, show "Para N invitados te cotizamos por WhatsApp" and CTA "Pedir cotización". Zona otra: same. Switching package clamps nothing; recomputes. Bundled add-ons disabled with "incluido" label when Sueño selected. Fixtures in verify: Nube 15 = 1.150.000; Estrella 30 = 1.850.000; Estrella 40 + torta = 2.620.000; Estrella 45 = custom; Sueño 40 + torta = 2.750.000 (torta disabled); Nube 15 Luque = 1.190.000. WhatsApp text: `Hola, usé la calculadora de babyshower.com.py (<ruta>): <Paquete>, <N> invitados, adicionales: <lista|ninguno>, zona <Zona>. Estimación Gs. <total> (<PRICES.label>). Fecha tentativa: ____`. Single price source: `content.mjs`; `zones.mjs` holds only slug, name, barrios, venue types, FAQ, paragraph, joined by slug.

### B8. Schema (ADOPT 7.10)
Graph with `@id`s: `Organization#org`, `WebSite#site`, `Service` per offer page (`provider` → org, `areaServed`, `serviceType`), `BreadcrumbList` on non-root, `Article` on guides, `FAQPage` optional (kept, visible Q/A identical). No `Product/Offer`, no `InStock`, no `priceRange` while PRICES.mode is estimated; `LocalBusiness` only on `/` with no address and `areaServed`. GBP creation conditional on eligibility (in-person service confirmed); documented in 05 §4 and 06 §1 as "evaluate, do not assume".

### B9. Verification definitions (ADOPT section 3)
- Link check: strip `?` and `#`; exempt `mailto:`, `tel:`, `https://wa.me`, external; fragment targets must exist when internal.
- Uniqueness: normalise (lowercase, strip accents and punctuation), 5-gram sets of the main-content paragraphs, Jaccard similarity, fail if ≥ 0.60 for any pair within themes or within zones.
- Words: main article text only (exclude header, footer, nav, CTA cards, FAQ); 700–1000 inclusive.
- Weight: uncompressed bytes of HTML + site.css + site.js + calc.js < 500 KB; fonts and images reported separately.
- Metadata: title 20–60 chars unique across manifest; description 70–155 unique.
- Zone price check: card price on a zone page = base + that zone's delivery.
- Contrast: WCAG 4.5:1 body, 3:1 ≥ 24px text; the "62 percent" wording is replaced everywhere including 09.

### B10. Analytics and consent (ADOPT)
No tag loads before consent; consent banner has Aceptar / Rechazar and a footer link "Preferencias de cookies" to revoke. Events fire once per interaction (debounced 1 s). `form_submit` fires on the thanks page, not on submit click. WhatsApp navigation never depends on the analytics callback (link works with JS disabled). Do not copy tasacion's unconditional `vc-attribution.js` load.

### B11. Assets (PARTIAL)
No `og:image` tag until B7 supplies `assets/img/og.jpg`; favicon as an inline SVG data URI in B1 (allowed new file: `assets/img/favicon.svg`). Fonts fallback per BUILD-SPEC §1.

### B12. Design precedence (ADOPT review 8)
Once Anton picks a design export, it is `docs/design-canvas-export.html` and its composition governs `/` in all modes A/B/C; BUILD-SPEC §6 row for `/` lists content, not layout. Inner pages reuse its components. Until then B1 uses the §6 patterns. Green: WhatsApp glyph and the FAB circle only; 02 and 09 aligned. Horizontal scroll allowed for the calculator breakdown and the mobile theme strip.

### B13. Execution doc fixes (ADOPT)
B6 is a checklist in 03, not a prompt file; 03 no longer references `B6.txt`. Build log: each phase appends its own entry; session id/model/effort added by the manager or Anton from the dispatch output, never invented. GitHub repo name: `anton/babyshower-com-py` private (Q18 if different). CODEX-REVIEW described as plan review.

## C. Rejected or deferred
- Broader visible brand than Baby Shower Paraguay: REJECT for now, nav names all three services; revisit with decoraciones.com.py after data.
- Deferring zone pages until "credible": REJECT, keep 5 with factual content only (barrios, venue types, surcharge, access checklist); no invented minutes or history.
- Requiring the original KWP export before Ads: PARTIAL, listed as Q19, not a blocker; Ads start small and query reports replace the forecast.
- Off-peak supplier-funded offer: DEFERRED to Gate C, noted in 06.
- llms.txt: not a blocker; add a plain `robots.txt` that allows all major bots.

## D. New open questions (append to 08)
Q16 May the site name you as operator? Q17 Data retention 12 months OK? Q18 GitHub repo name? Q19 Original KWP export available? Q20 Which design export is authoritative? Q21 Is `SITE.leadEmail` = antonmarklund.com@gmail.com for lead notifications?
