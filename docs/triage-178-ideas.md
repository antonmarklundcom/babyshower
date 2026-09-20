# Triage of docs/codex-review-ideas.md against the built site (Fable 5.1)

Revision 2, 2026-09-20, after Batch 1 (home composition) and Batch 2 (labels, form, consent). Supersedes the 2026-09-19 revision. Verified against the preview at http://localhost:4173/ (home, combos, mickey-bebe, luque, revelación, añito, temáticas, cómo funciona, privacidad, zonas, juegos guide) at 375 px and desktop.

Verdicts: DONE (built site already does it) · NOW (before the next commit) · GATE-A (before organic publication) · LATER · REJECT · PART-3 / PART-5 (argued in the manager review of 2026-09-20).
"obsolete" = the idea targeted docs/opus-home-preview.html or a DESIGN-FINAL prompt and the generator never had the defect.
"Batch 1" / "Batch 2" = closed by that batch since revision 1.

## Part A (1–100)

| # | Verdict | Reason |
|---|---|---|
| 1 | DONE (obsolete) | Home renders STEPS from content.mjs, the four inquiry steps. |
| 2 | DONE (Batch 1) | UI.hero line 1 names Combo Estrella before the amount. |
| 3 | DONE (Batch 1) | Hero sub is three paragraphs: offer, caption, promise. |
| 4 | LATER | FAQ 2 already says "sin pedir seña". |
| 5 | LATER | Cards open with deliverables; descriptors optional. |
| 6 | PART-3 | §0 badge; argued to change. |
| 7 | PART-3 | §0 "Todo listo"; argued to change. |
| 8 | DONE (obsolete) | UI.band is the approved sentence. |
| 9 | DONE (obsolete) | Heading is "Preguntas frecuentes". |
| 10 | LATER | Step 3 body already covers it. |
| 11 | LATER | |
| 12 | LATER | |
| 13 | DONE | "fondo decorativo" everywhere. |
| 14 | LATER | |
| 15 | DONE (Batch 2) | UI.calc = "Calculá tu estimación" in hero and mobile bar. |
| 16 | DONE (Batch 1) | Calculator heading is UI.calcTitle. |
| 17 | DONE | 45 guests hides the total, custom-quote copy and CTA. |
| 18 | DONE | Zona otra → custom quote, WA text carries no number. |
| 19 | DONE | Bundled add-ons disabled per package; fixtures cover switching. |
| 20 | NOW | Calculator result shows a bare "Gs. 1.850.000" with no scope line. One sentence in calc.js render(): estimate covers combo + selected add-ons + traslado, not venue or furniture. |
| 21 | DONE (partial) | Table says "30 (solo decoración)". |
| 22 | NOW | At 15 guests on Estrella the breakdown reads "Invitados extra: Sin costo adicional.", which implies guests are free. Add "El combo cubre hasta N invitados; con menos, la estimación no baja." in calc.js. |
| 23 | DONE | EXTRA_FOOD in table and calculator. |
| 24 | LATER | |
| 25 | DONE (partial) | Units shown, no "meal" claim. |
| 26 | LATER | |
| 27 | LATER | |
| 28 | NOW | Estrella reads Gs. 1.890.000 on /zonas/luque/ and Gs. 1.850.000 on every other page; the card itself does not reconcile them. In cards() when delivery > 0 add "Gs. 1.850.000 + Gs. 40.000 de traslado estimado" under the caption. |
| 29 | LATER | |
| 30 | DONE | "Souvenirs personalizados x30". |
| 31 | LATER | |
| 32 | DONE (Batch 2) | "Coordinadora por hora". |
| 33 | LATER | |
| 34 | DONE | COMPARISON rows. |
| 35 | REJECT | Step 5 is the frozen contract; per-guest price is disclosed. |
| 36 | PART-3 | Calculator result caption; argued to change. |
| 37 | GATE-A | Fold into the /tematicas/ intro line (A46). |
| 38 | GATE-A | One FAQ sentence explaining why prices are estimates. |
| 39 | DONE | "Quiénes somos" on /como-funciona/. |
| 40 | LATER | |
| 41 | LATER | Needs Anton's answer on display tables, not copy. |
| 42 | DONE (obsolete) | |
| 43 | LATER | |
| 44 | DONE | FAQ 8 on /combos-y-precios/. |
| 45 | LATER | |
| 46 | GATE-A | /tematicas/ has no intro at all; add one line with the gallery answer and "imágenes ilustrativas generadas". |
| 47 | REJECT | A worked "hypothetical proposal" reads as a quote. |
| 48 | LATER | |
| 49 | DONE | |
| 50 | DONE (obsolete) | |
| 51 | DONE (Batch 2) | H1 "10 juegos para baby shower". |
| 52 | LATER | Plan text. |
| 53 | REJECT | |
| 54 | DONE | |
| 55 | DONE | |
| 56 | DONE (obsolete) | |
| 57 | DONE (Batch 1) | "Ver zonas y recargos estimados". |
| 58 | DONE | |
| 59 | LATER | Revisit with query data. |
| 60 | LATER | |
| 61 | LATER | |
| 62 | LATER | |
| 63 | DONE | |
| 64 | LATER | |
| 65 | DONE (Batch 2) | Mobile bar has only WhatsApp on /revelacion-de-genero/ and /primer-anito/. |
| 66 | DONE (Batch 1) | "Ver todas las preguntas". |
| 67 | DONE | |
| 68 | DONE (obsolete) | |
| 69 | DONE | |
| 70 | DONE | |
| 71 | DONE | Jaccard 0.000, access checklists. |
| 72 | LATER | Plan text. |
| 73 | DONE | |
| 74 | DONE | |
| 75 | REJECT | 787–836 words without padding. |
| 76 | LATER | |
| 77 | LATER | |
| 78 | DONE | |
| 79 | LATER | |
| 80 | GATE-A | Anton eyeballs barrio lists; Laurelty on three pages. |
| 81 | DONE | |
| 82 | LATER | |
| 83 | LATER | Ops. |
| 84 | LATER | Ops. |
| 85 | LATER | Imagery round 2. |
| 86 | LATER | |
| 87 | DONE | |
| 88 | DONE (obsolete) | |
| 89 | REJECT | |
| 90 | GATE-A | Minnie number-one candle; Anton confirms. |
| 91 | DONE (hub) / NOW (page) | Hub tiles show swatches; the theme page hero for Mickey and Blanca Nieves shows nothing. See review item 4. |
| 92 | LATER | |
| 93 | PART-5 | Kit image not generated. |
| 94 | LATER | |
| 95 | PART-5 | Zone images: recommend not generating them. |
| 96 | LATER | |
| 97 | LATER | |
| 98 | DONE (obsolete) | |
| 99 | LATER | |
| 100 | PART-5 | og decision. |

## Part B (63–140)

| # | Verdict | Reason |
|---|---|---|
| 63 | GATE-A | 768–1280 px pass still not done (Batch 1 audit covered 375 and 1280 only). |
| 64 | LATER | |
| 65 | DONE (obsolete) | |
| 66 | PART-5 | og.jpg must carry its own text; agree. |
| 67 | LATER | |
| 68 | DONE | |
| 69 | DONE | |
| 70 | DONE | |
| 71 | LATER | |
| 72 | DONE | |
| 73 | DONE | |
| 74 | LATER | |
| 75 | GATE-A | Anton opens the live site on Android on mobile data. |
| 76 | LATER | |
| 77 | GATE-A | FAB sits over card text on 375 px above the bar; expected, but check with keyboard open on /contacto/. |
| 78 | REJECT | §3 requires both; FAB opens the menu, bar is the direct action. |
| 79 | LATER | |
| 80 | LATER | |
| 81 | DONE | |
| 82 | LATER | |
| 83 | DONE | |
| 84 | DONE (partial) | |
| 85 | LATER | |
| 86 | DONE | |
| 87 | DONE | |
| 88 | DONE | |
| 89 | DONE (Batch 2) | Thanks-page WhatsApp link carries the consultation reference. |
| 90 | DONE (obsolete) | |
| 91 | DONE (Batch 2) | "Te respondemos por WhatsApp al número que nos dejás". |
| 92 | DONE (Batch 2) | Separators stripped client and server side. |
| 93 | REJECT | |
| 94 | DONE (partial) | |
| 95 | GATE-A | Chrome and Instagram in-app browser. |
| 96 | LATER | |
| 97 | LATER | |
| 98 | LATER | |
| 99 | GATE-A | One-page pre-supplier reply script. |
| 100 | GATE-A | Define "24 horas hábiles" for a Saturday-evening lead. |
| 101 | GATE-A | A queue, even a spreadsheet. |
| 102 | LATER | |
| 103 | LATER | |
| 104–108 | LATER | Gate C. |
| 109 | LATER | |
| 110 | LATER | |
| 111 | LATER | |
| 112 | LATER | |
| 113 | LATER | |
| 114 | GATE-A | Ley 6534/2020 is the credit-data law; wrong citation in privacy, terms and consent copy. |
| 115 | GATE-A | Verify Ley 7593/2025 wording and commencement; cite it correctly. |
| 116 | LATER | |
| 117 | LATER | |
| 118 | PART-5 | Character names. |
| 119 | GATE-A | Privacy "CRM propio" should name hosting (Hostinger, Brasil), email, WhatsApp/Meta, VenderCRM, Google Analytics when enabled. |
| 120 | LATER | |
| 121 | LATER | |
| 122 | LATER | |
| 123 | LATER | |
| 124 | LATER | |
| 125 | LATER | |
| 126 | LATER | |
| 127 | DONE | |
| 128 | DONE | |
| 129 | DONE | |
| 130 | LATER | |
| 131 | LATER | |
| 132 | LATER | |
| 133 | PART-5 | DESIGN-FINAL decision. |
| 134 | DONE | |
| 135 | DONE | |
| 136 | GATE-A | Empty sid without JS is rejected as "invalid". |
| 137 | GATE-A | Until Q21 is configured every form POST ends in the failure state (no mail, no CRM). |
| 138 | LATER | |
| 139 | DONE | |
| 140 | DONE | |

Totals: DONE 68 (of which obsolete 11, closed by Batch 1/2 12) · NOW 3 · GATE-A 17 · LATER 74 · REJECT 7 · argued in parts 3/5: 9.

## Findings from the build itself, not in the 178 (2026-09-20)

- NOW — Combo Sueño description ends "coordinación del evento (Sueño)". The "(Sueño)" is a spec annotation from BUILD-SPEC §0 copied into customer copy. content.mjs PACKAGES[2].description.
- NOW — Combo Añito, Kit Sorpresa and Revelación Completa cards have no Exclusiones detail; A2 requires it on every card. build-site.mjs offerCard(), content.mjs ANITO/REVEAL.
- NOW — /privacidad/ and /terminos/ promise "Preferencias de cookies, en el pie de página" and an analytics consent banner; with ANALYTICS_ID empty neither exists. Make LEGAL text conditional on ANALYTICS_ID. content.mjs LEGAL.
- NOW — Zone-page WhatsApp text reads "quiero consultar por Luque". build-site.mjs programmatic() cta.
- NOW — Guides render an empty tinted box labelled "Inspiración ilustrativa" where an image is planned. Drop the box until the image exists. build-site.mjs ideasBody().
- NOW — Mobile home shows Estrella three times in the first two screens: hero sub, "Estimación orientativa" card, Estrella package card. Hide .home-proposal under 960 px. assets/css/site.css.
