# Triage of docs/codex-review-ideas.md against the built site (Fable 5.1, 2026-09-19)

Verdicts: DONE (built site already does it) · NOW (before the next commit) · GATE-A (before organic publication) · LATER · REJECT.
"obsolete" = the idea targeted docs/opus-home-preview.html or the DESIGN-FINAL prompt and the generator never had the defect.

## Part A (1–100)

| # | Verdict | Reason |
|---|---|---|
| 1 | DONE (obsolete) | Home renders STEPS from content.mjs, the four inquiry steps. |
| 2 | NOW | Hero sub quotes Gs. 1.850.000 without naming Combo Estrella. Add the name in UI.hero. |
| 3 | NOW | Hero sub is one 5-sentence paragraph on a 375px phone; split into offer line + caption + promise. Not a §0 reversal, §0 fixes wording not layout. |
| 4 | LATER | FAQ 2 already says "sin pedir seña"; placing it under the hero is optional. |
| 5 | LATER | Descriptors help but the cards already open with deliverables. |
| 6 | See part 3 | §0 decision; I argue to change it. |
| 7 | See part 3 | Same. |
| 8 | DONE (obsolete) | UI.band is the approved sentence. |
| 9 | DONE (obsolete) | Heading is "Preguntas frecuentes". |
| 10 | LATER | Step 3 body already says "Conversamos sobre el alcance y la disponibilidad". |
| 11 | LATER | Nice, not needed for launch. |
| 12 | LATER | Same. |
| 13 | DONE | "fondo decorativo" replaced backdrop everywhere. |
| 14 | LATER | Nube card is adjacent; low value. |
| 15 | GATE-A | Mobile bar and hero say "Calculá tu precio" while the result is an estimate; UI.calc → "Calculá tu estimación". §0 does not fix this label. |
| 16 | NOW | Generator hardcodes "Calculá tu precio en 30 segundos" (build-site.mjs calculator()) while content.mjs already defines UI.calcTitle = "Consultá tu estimación" and never uses it. Bug, not taste. |
| 17 | DONE | Verified in browser: 45 guests hides total, shows custom-quote copy and CTA. |
| 18 | DONE | Verified: zona otra → custom quote, WA text carries no number. |
| 19 | DONE | calc.js disables bundled add-ons per package; verify --calc fixtures cover switching. |
| 20 | LATER | One line under the total; low cost, low urgency. |
| 21 | DONE (partial) | Table says "30 (solo decoración)"; card chip still "Hasta 30 invitados en el lugar". Acceptable. |
| 22 | LATER | Breakdown shows "Invitados extra: Sin costo adicional" for 15 guests; a one-line note would help. |
| 23 | DONE | EXTRA_FOOD rendered in table and calculator. |
| 24 | LATER | Nice to have. |
| 25 | DONE (partial) | Units are shown; "complete meal" is never claimed. |
| 26 | LATER | |
| 27 | LATER | |
| 28 | DONE (partial) | Zone pages show the surcharge line and "ya incluyen este recargo"; base is not split out. Fine. |
| 29 | LATER | Souvenirs stay 40 above 40 guests; not stated. |
| 30 | DONE | Add-on is named "Souvenirs personalizados x30". |
| 31 | LATER | |
| 32 | GATE-A | "Hora extra de coordinadora" is sold as an add-on for Nube and Estrella, which have no coordinator. Either restrict to Sueño or relabel "Coordinadora por hora". Copy-only, no §0 conflict. |
| 33 | LATER | |
| 34 | DONE | COMPARISON rows cover bebidas, souvenirs, coordinación, torta. |
| 35 | REJECT | Step 5 is a frozen contract and the per-guest price is disclosed. |
| 36 | See part 3 | §0 caption rule; I agree with Codex for the calculator result. |
| 37 | LATER | "Imagen ilustrativa" caption plus terms is adequate for inquiry mode. |
| 38 | GATE-A | One FAQ answer: "Los precios son estimados porque el alcance se confirma con vos antes de cualquier acuerdo." |
| 39 | DONE | "Quiénes somos" on /como-funciona/. |
| 40 | LATER | |
| 41 | LATER | Real ambiguity (mesa dulce vs mesas y sillas), needs Anton's answer, not copy. |
| 42 | DONE (obsolete) | Sentence never made it into the generator. |
| 43 | LATER | |
| 44 | DONE | FAQ 8 is on /combos-y-precios/. |
| 45 | LATER | |
| 46 | GATE-A | Gallery answer only in the full FAQ; add one line on /tematicas/. |
| 47 | REJECT | A worked "hypothetical proposal" invites misreading as a real quote. |
| 48 | LATER | |
| 49 | DONE | Añito FAQ answer is already conditional. |
| 50 | DONE (obsolete) | Eyebrow is "Qué incluye y qué no incluye". |
| 51 | NOW | ideas.mjs H1 still "10 juegos … que funcionan de verdad"; the title tag already says "Guía práctica". Align H1. |
| 52 | LATER | Plan text. |
| 53 | REJECT | Abstract; the built families already differ. |
| 54 | DONE | /zonas/asuncion/ is venue/access content, not a second home. |
| 55 | DONE | Hub is cards, guide is prose. |
| 56 | DONE (obsolete) | Nav points to /combos-y-precios/. |
| 57 | NOW | Home zones section links to /zonas/ but the link text is "Asunción y Gran Asunción" (same as the H2). Relabel "Ver zonas y recargos estimados". |
| 58 | DONE | Reveal page and guide differ. |
| 59 | LATER | H1 template ok; revisit with query data. |
| 60 | LATER | |
| 61 | LATER | |
| 62 | LATER | |
| 63 | DONE | Five guides have distinct scopes (verified games guide). |
| 64 | LATER | |
| 65 | GATE-A | Mobile bar "Calculá tu precio" on /revelacion-de-genero/ and /primer-anito/ sends users to a baby-shower-only calculator. Relabel or hide the bar's secondary link on those two page types. |
| 66 | NOW | Home FAQ (6) has no link to /preguntas-frecuentes/. Add "Ver todas las preguntas". |
| 67 | DONE | Hub has both cities with surcharge. |
| 68 | DONE (obsolete) | Home bento lists all 10 on mobile, no strip. |
| 69 | DONE | Zone titles lead with the city. |
| 70 | DONE | |
| 71 | DONE | Zone paragraphs are access checklists, not doorway filler; Jaccard 0.000. |
| 72 | LATER | Plan text. |
| 73 | DONE | Guide heading says "rangos de los combos". |
| 74 | DONE | Games guide gives materials and rules. |
| 75 | REJECT | Guides landed at 787–836 words without padding. |
| 76 | LATER | |
| 77 | LATER | |
| 78 | DONE | |
| 79 | LATER | |
| 80 | GATE-A | Anton eyeballs the barrio lists once; Laurelty appears on three zone pages, which is geographically plausible but should be his call. |
| 81 | DONE | |
| 82 | LATER | |
| 83 | LATER | Ops. |
| 84 | LATER | Ops. |
| 85 | LATER | Imagery round 2. |
| 86 | LATER | |
| 87 | DONE | Hero shows arch + sweet table, Estrella scope. |
| 88 | DONE (obsolete) | No price chip on the image in the build. |
| 89 | REJECT | Order change buys little; Jefe en Pañales is the highest-volume keyword. |
| 90 | GATE-A | Manifest flags a number-one candle in tema-minnie-bebe; it sits on a "baby shower y primer añito" page, acceptable, but Anton should confirm. |
| 91 | DONE | Mickey and Blanca Nieves hub tiles render palette swatches. |
| 92 | LATER | |
| 93 | LATER | Kit image not generated yet. |
| 94 | LATER | |
| 95 | LATER | Zone images not generated; when they are, caption as venue types. |
| 96 | LATER | |
| 97 | LATER | |
| 98 | DONE (obsolete) | No oversized "24 h" in the build. |
| 99 | LATER | |
| 100 | See part 5 | og decision. |

## Part B (63–140)

| # | Verdict | Reason |
|---|---|---|
| 63 | GATE-A | Nobody has looked at 768–1280px; one pass in the browser. |
| 64 | LATER | |
| 65 | DONE (obsolete) | Same as A68. |
| 66 | See part 5 | og.jpg decision. |
| 67 | LATER | Lighthouse mobile 97–99 already covers the practical concern. |
| 68 | DONE | picture/srcset from assets/img/manifest.json. |
| 69 | DONE | 640px variant served first. |
| 70 | DONE | Two families only (DM Sans + Instrument Serif). |
| 71 | LATER | |
| 72 | DONE | Only the hero is eager. |
| 73 | DONE | calc.js only on / and /combos-y-precios/ (checked a theme page). |
| 74 | LATER | |
| 75 | GATE-A | Anton opens the live site on his Android on mobile data once. |
| 76 | LATER | |
| 77 | GATE-A | Mobile bar + FAB + consent banner + keyboard on the contact form; check on a phone. |
| 78 | REJECT | §3 requires both; FAB opens the menu, bar is the direct action. |
| 79 | LATER | |
| 80 | LATER | |
| 81 | DONE | fieldset/legend in calculator. |
| 82 | LATER | |
| 83 | DONE | verify executes keyboard/focus/Escape on the menus. |
| 84 | DONE (partial) | Sticky first column; no stacked mode. |
| 85 | LATER | |
| 86 | DONE | B5 error summary, inline errors, values preserved. |
| 87 | DONE | Every wa.me link carries route and offer. |
| 88 | DONE | Verified message includes extras, label, route, custom-quote state. |
| 89 | NOW | /gracias.html WhatsApp link is the generic "tengo una consulta" text. Include the SID from the cookie so the chat can be tied to the form. |
| 90 | DONE (obsolete) | Form built per §8. |
| 91 | NOW | One line under the form: "Te respondemos por WhatsApp al número que nos dejás." |
| 92 | NOW | HTML pattern and server regex both reject "0981 234 567". Strip spaces, hyphens, parentheses client- and server-side. |
| 93 | REJECT | WhatsApp route covers foreign organisers. |
| 94 | DONE (partial) | Panel foot says "Se abre WhatsApp con el mensaje ya escrito." |
| 95 | GATE-A | Test in Chrome and Instagram in-app browser. |
| 96 | LATER | Ops. |
| 97 | LATER | |
| 98 | LATER | Ops. |
| 99 | GATE-A | Anton needs a one-page pre-supplier script before the first lead. |
| 100 | GATE-A | Decide internally what "24 horas hábiles" means for a Saturday-evening lead. |
| 101 | GATE-A | A queue, even a spreadsheet. |
| 102 | LATER | |
| 103 | LATER | |
| 104–108 | LATER | Gate C. |
| 109 | LATER | |
| 110 | LATER | |
| 111 | LATER | Gate C per plan; brand-plus-city identity is disclosed. |
| 112 | LATER | Gate C. |
| 113 | LATER | |
| 114 | GATE-A | Codex is right that Ley 6534/2020 is the credit-data law; citing only it is wrong. See part 4. |
| 115 | GATE-A | Verify Ley 7593/2025 and cite it with correct commencement wording. |
| 116 | LATER | Gate C. |
| 117 | LATER | Gate C. |
| 118 | See part 5 | Character names. |
| 119 | GATE-A | Privacy says "CRM propio"; it should name hosting, email, WhatsApp/Meta and consented Google Analytics. Copy edit. |
| 120 | LATER | |
| 121 | LATER | |
| 122 | LATER | |
| 123 | LATER | Gate B. |
| 124 | LATER | Gate B. |
| 125 | LATER | |
| 126 | LATER | |
| 127 | DONE | form_submit fires only on the server-set cookie. |
| 128 | DONE | Event payload is ev_loc and page_path, never the wa.me URL. |
| 129 | DONE | calc_submit fires on the calculator CTA click only. |
| 130 | LATER | |
| 131 | LATER | |
| 132 | LATER | |
| 133 | See part 5 | DESIGN-FINAL decision. |
| 134 | DONE | LAUNCH_MODE and PRICES.mode are separate flags. |
| 135 | DONE | Log line written first; receipt marks notified separately; retry with same SID re-notifies without a new line. |
| 136 | GATE-A | sid is empty without JS and the server rejects it as "invalid". Either generate server-side when empty or accept it as a known no-JS limitation with the WhatsApp fallback shown. |
| 137 | GATE-A | Anton confirms the notification lands in his inbox, not only that mail() returned true. |
| 138 | LATER | |
| 139 | DONE | verify --calc covers switching and zona otra transitions. |
| 140 | DONE | One generator, hashed assets, all 32 routes regenerated per phase. |

Totals: DONE 62 (of which obsolete 12) · NOW 10 · GATE-A 22 · LATER 71 · REJECT 8 · sent to parts 3/5: 5.
