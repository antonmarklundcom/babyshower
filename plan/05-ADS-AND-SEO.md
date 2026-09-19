# 05 — Keyword clusters, Google Ads, tracking, SEO

## 1. What the KWP table actually contains

Of 140 rows, about 40 are relevant. The rest is lighting, mirrors, vinyl, interiors, Christmas, weddings, congresses: Google's "related" expansion from the seed "decoración". They are useful for one thing only: the negative keyword list.

Cluster map (page → keywords → intent estimate):

| Cluster | Keywords (vol) | Intent | Page | Ads |
|---|---|---|---|---|
| Head | baby shower (4400) | 10–30% commercial, rest ideas/juegos/regalos | `/` + `/ideas/` hub | capped experiment, exact match only |
| Commercial modifiers (not in KWP, hypothesised) | decoración baby shower asunción · baby shower asunción precio · organización de baby shower · paquete/combo baby shower · mesa dulce baby shower · arco de globos baby shower | 40–70% | `/`, `/combos-y-precios/` | core ad group |
| Reveal | revelacion de genero (720) · revelacion de sexo (110) · revelacion de sexos (110) · fiesta de revelacion de genero (40) · decoracion para revelacion de sexo/del sexo (40+40) | 20–50% | `/revelacion-de-genero/` | ad group 2 |
| Reveal sencilla | decoración de revelación de género sencilla (110) · decoración para ... sencilla (50) · revelacion de genero sencilla (50) | 10–30%, budget research | section on reveal page + `/ideas/revelacion-de-genero-sencilla/` | small ad group pointing to Kit Sorpresa |
| Reveal ideas | ideas para revelacion de genero (90) · revelación de sexos de bebés ideas sencillas (30) | informational | idea guide | organic only |
| Primer añito | fiesta para bebe de 1 año (70) · cumpleaños de 1 añito varon (40) · decoracion para bebe de 1 año (30) + theme "1 año" variants | 20–40% | `/primer-anito/` | ad group 3, after supplier confirms |
| Dino | decoracion de dino bebe (140) · dinosaurios bebes (140) · dino bebe decoracion/decoracion dino bebe (50+50) · dino bebe cumpleaños (70) · dinosaurios bebe cumpleaños (70) | 10–30% | `/tematicas/dino-bebe/` | theme ad group (safe, no IP) |
| Jefe en pañales | decoración de jefe en pañales (140) · ... sencilla (90) · decoraciones ... sencillas (90) | 5–20% | theme page | organic; Ads only after IP stance decided |
| Moana | 6 rows (90+50+50+50+30+30) | 5–20% | theme page (+ añito) | organic |
| Minnie / Mickey / Blanca Nieves / Frutillita | 8 rows (30–50 each) | 5–20% | theme pages | organic |
| Mariposas | decoracion de mariposas (260) · centros de mesa de mariposas (140) | mixed, non-baby too | `/tematicas/mariposas/` | organic; test exact "decoracion de mariposas baby shower" |
| Sencilla / en casa | decoracion sencilla (170) · decoracion con telas (320) · cortina para cumpleaños (390) · centro de mesa (1000) · centro de mesa rustico (140) | DIY/product | `/ideas/baby-shower-sencillo-en-casa/` | organic only |
| Generic | decoración/decoraciones/decorados (2900 each) · evento (1300) · decorar (320) · decoracion de (210) | undefined | none | never bid |
| Noise | everything lighting, mirrors, vinyl, interiors, Christmas, bodas, congresos, despedidas, confirmación, año nuevo, diseño de pie | — | none | negatives |

Do not sum accent/spelling variants as independent demand. Do not build one page per keyword.

## 2. Google Ads structure (Phase 2, after Gate B)

Campaign: `PY | Gran Asunción | Baby Shower | Search`. Search only, no partners, no display expansion. Location: Asunción + Central department cities served, presence targeting. Language Spanish. Schedule: staffed hours (Lun–Sáb 8–20) at launch. Bidding: manual CPC or maximise clicks with a CPC cap (2.000 PYG start), switch to conversion-based only after 30+ primary conversions.

Ad groups → landing page → match types:
1. `Baby shower comercial` → `/` → phrase: "decoración baby shower", "baby shower asunción", "organizar baby shower", "combo baby shower", "mesa dulce baby shower", "arco de globos baby shower"; exact: [baby shower asuncion], [baby shower precio].
2. `Baby shower head (experimento)` → `/` → exact [baby shower] only. Pause when spend reaches 20% of envelope without a qualified lead.
3. `Revelación` → `/revelacion-de-genero/` → phrase: "revelación de género", "revelacion de sexo", "fiesta revelación de género", "decoración revelación de género"; exact for the top 3.
4. `Revelación sencilla` → `/revelacion-de-genero/#kit` → phrase "revelación de género sencilla".
5. `Primer añito` → `/primer-anito/` → phrase "decoración primer añito", "fiesta 1 año bebé", "cumpleaños 1 añito". Enable after supplier confirms añito pricing.
6. `Dino bebé` → `/tematicas/dino-bebe/` → phrase "decoración dino bebé", "dinosaurio bebé cumpleaños".
7. `Zonas` → zone pages → exact [baby shower luque], [baby shower san lorenzo], [baby shower fernando de la mora], [baby shower lambaré]. Expect low search volume status; keep anyway.

Ad copy skeleton (RSA), inquiry mode: headlines Baby Shower en Asunción · Precios Estimados a la Vista · Consultá por WhatsApp · Coordinamos el Montaje. Descriptions: Elegí el combo y consultá por tu fecha y zona. Te respondemos dentro de 24 horas hábiles. Wherever a price is shown, derive Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. from content.mjs; use a non-price variant if the full caption cannot fit. Sitelinks: Combos y precios · Revelación de género · Temáticas · Cómo funciona. Callouts from the exact trust ribbon; no deposit, firm-price or supplier-certainty claims.

Shared negative list (campaign level, phrase unless noted):
- Lighting/electrical: lámpara, lámparas, lampara, lamparas, foco, focos, led, fluorescente, fluorescentes, halógena, halogena, halógenas, luminaria, luminarias, iluminación, iluminacion, aplique, apliques, plafón, plafones, linterna, portalámpara, incandescente, solar, tira, tiras, tubo, tubos, reflector, reflectores, velador, farol, faroles, luz, luces, uv.
- Mirrors/interiors/products: espejo, espejos, vinilo, vinilos, adhesivo, adhesivos, pegatina, pegatinas, cuadro, cuadros, cojín, cojines, alfombra, moldura, molduras, cenefa, cenefas, cortina, cortinas, floreros, candelabro, candelabros, portavelas, "diseño de interiores", "diseño interiores".
- Occasions: navidad, navideño, navideña, "año nuevo", boda, bodas, casamiento, "despedida de soltero", "despedidas de soltero", congreso, congresos, confirmación, comunión, quince, quinceañera, "15 años".
- Informational/product (exact or phrase, review weekly): gratis, pdf, imprimible, imprimibles, "para imprimir", plantilla, plantillas, tutorial, "paso a paso", manualidades, dibujos, significado, "qué es", invitaciones, "tarjetas de invitación", recuerdos, mayorista, "por mayor", "comprar globos", curso, cursos, empleo, trabajo.
- Never add as negatives: precio, económico, barato, sencilla, decoración, cumpleaños, bebé, "1 año", juegos (juegos is a Combo inclusion; watch queries instead).

Budget logic: contribution before ads ≈ 485.000 base / 185.000 stress → ad allowance 150.000 per closed deal. At 20% qualified-lead→deposit, max cost per qualified lead 30.000. At a hypothetical one-in-ten click→qualified rate, CPC ceiling 3.000; start at 2.000. Test envelope: 400.000 PYG over 14 days (~30.000/day). Google may overspend daily up to 2×; check daily, pause at the envelope. Stop rules: 30 relevant clicks with zero qualified leads → inspect landing, tracking, response time, price before expanding. Spend = one target CAC with no deposit → review open quotes. Spend = two CACs with no credible pipeline → pause and diagnose.

## 3. Tracking on a static site

- `ANALYTICS_ID` in content.mjs → gtag (GA4). Events: `whatsapp_click` (params: page, cta_id, package), `calc_submit` (package, guests, total_band), `form_submit` (event_type). Fire once per interaction, debounced 1 s, only after consent. form_submit fires on the thanks page only for server-accepted inquiries. WhatsApp navigation never depends on an analytics callback; wa.me links work with JS disabled. Do not copy unconditional vc-attribution.js loading.
- Ads conversions: import GA4 `form_submit` (server-accepted inquiry) as primary conversion, `whatsapp_click` as secondary (no value, count once per interaction). Never send names, phones, or free text.
- Offline business outcome lives in VenderCRM: deposit paid. Weekly manual cohort table: spend → clicks → chats+forms → qualified → quoted → deposits → delivered contribution → refunds. WhatsApp clicks are never reported as leads.
- Later (month 3+): offline conversion import of deposits with gclid captured into the form's hidden field and into the WhatsApp reference token (`Ref. BS-<yymmdd>-<xx>` generated client-side and shown in the calculator message).
- Consent: no tag loads before acceptance; banner Aceptar / Rechazar and footer Preferencias de cookies to revoke, Ley 6534/2020.

## 4. Organic SEO

- Title pattern: `<Page topic> en Asunción | Baby Shower Paraguay` 20–60 chars unique. Descriptions 70–155 chars unique; estimates and CTA wording follow §0.
- Internal linking: every theme page → 2 combos + 3 related themes + 1 idea guide. Every zone page → combos + themes hub. Every idea guide → 1 package CTA + 1 theme. Hub pages link all children. Footer links to hubs only.
- JSON-LD graph per BUILD-SPEC §7: Organization#org, WebSite#site, Service per offer page (provider → org, areaServed, serviceType), BreadcrumbList non-root, Article guides. Optional FAQPage only with identical visible Q/A. LocalBusiness only on /, no address, areaServed. No Product/Offer, InStock or priceRange while estimated. No review markup until real reviews exist.
- GSC: verify domain, submit sitemap day 1, watch coverage for the manifest-derived indexable URLs, check "baby shower" queries monthly to learn the real modifiers Paraguayans use and feed them to Ads.
- GBP: evaluate, do not assume eligibility; create only if in-person service is confirmed. If eligible: "Baby Shower Paraguay", service-area business, primary category Organizador de fiestas / Servicio de planificación de eventos, weekly post, review link in the post-event script. Run the gbp-optimizer skill at setup.
- embarazo.com.py: add contextual links from pregnancy-week content (weeks 16–20 → reveal, 28+ → shower). Same owner, no scheme concern, but keep it to editorial links, not sitewide footers.
- Instagram: real photos only in the feed; the site links to it once real content exists (SITE.instagram empty until then).
- Content cadence after launch: one idea guide per month targeting a GSC-discovered query; one new theme page only when a customer has actually booked it (real photos become the proof).

Verification: counts and sitemap derive from docs/routes.json (snapshot: 32 routes, 31 non-root route directories, 11 top-level route directories, 34 HTML files). Exclude 404.html and gracias.html from sitemap; gracias noindex. Check unique metadata lengths, internal links/fragments, normalised main-paragraph 5-gram Jaccard < 0.60 within theme and zone sets, guide main article 700–1000 words, zone cards base + recargo estimado, WCAG 4.5:1 body / 3:1 text ≥24px, HTML + site.css + site.js + calc.js <500 KB with fonts/images separate, consent and server-success conversions. No og:image until B7 supplies og.jpg. Plain robots.txt allows major bots; llms.txt is not a blocker. Q19 original KWP export is not a launch blocker; start small and replace forecasts with query reports.
