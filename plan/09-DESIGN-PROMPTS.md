# 09 — Claude Design prompts (Opus 5, high effort) for the home page

Why a design pass is justified: web-design-system allows Claude Design only for a new track. No existing track (Editorial, Industrial, Clinical, Warm Craft) fits a pastel event brand, so SOFT CRAFT is a new track. Run each prompt once, desktop plus mobile, pick one direction, and paste the winner's exported HTML/CSS into `docs/design-canvas-export.html` for the builder to copy values from. Do not run Claude Design per inner page.

Five standalone prompts, one code block each, in `prompts/DESIGN-1.txt` to `DESIGN-5.txt`. Copy one file whole into Claude Design (Opus 5, high). Nothing else needs pasting.

## Prompt 1 — Direction 1: Editorial magazine

```
Design the home page of babyshower.com.py, a Paraguayan service that sells complete baby shower packages (balloon arch and backdrop, sweet table, savoury bites) with estimated prices shown publicly and inquiries over WhatsApp. Audience: expectant mothers and their sisters or friends, 24 to 38, Gran Asunción, browsing on Android phones on mobile data. Language of all UI text: Paraguayan Spanish with voseo (Escribinos, Calculá, Consultá, Elegí). Currency format Gs. 1.850.000.

Deliver two frames: desktop 1440 wide and mobile 390 wide, same content.

Locked tokens, use exactly these values:
display font Instrument Serif 400, text font Satoshi (fallback DM Sans);
base #FBF6F2, ink #2B2430, accent #D97B6C used only for primary CTAs and one highlight per screen, surface #FFFFFF;
tints for section fills and cards only: sage #DDE8E0, sky #DCE6F2, blush #F6E1DC;
WhatsApp green #25D366 only for the WhatsApp glyph and the FAB circle;
type scale ratio 1.30 from 17px body, H1 clamp(44px, 6vw, 76px) line-height 1.02 weight 400, eyebrow labels 12px uppercase letter-spacing 0.12em;
radii 6px inputs, 14px cards and images, 28px feature panels; borders at 10 percent ink opacity, never solid; two-layer soft shadows; grain overlay on the one dark section.

Section order, do not reorder or drop:
1 sticky header (brand text Baby Shower.com.py, nav Combos y precios, Revelación de género, Temáticas, Primer añito, Ideas, Contacto, WhatsApp button, phone +595 992 279 599 as text)
2 hero: eyebrow Baby shower en Asunción y Gran Asunción; H1 Baby shower en Asunción con precio claro; sub Decoración, mesa dulce y bocaditos para 30 invitados. Precio estimado desde Gs. 1.850.000. El precio final y la disponibilidad se confirman por WhatsApp. Te respondemos dentro de 24 horas hábiles.; CTA Consultá por WhatsApp; secondary CTA Calculá tu precio; large image slot
3 trust ribbon: ['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso']
4 three package cards: Combo Nube desde Gs. 1.150.000, Combo Estrella 30 invitados desde Gs. 1.850.000 marked Combo completo and elevated, Combo Sueño 40 invitados desde Gs. 2.750.000; each with a short inclusion list, expandable exclusions, and its own Consultá por WhatsApp CTA; every card, table, FAQ price, guide CTA and calculator shows the derived caption Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. with X replaced by the configured amount
5 calculator panel: package radio, guests 15 to 60 with plus and minus, add-on checkboxes, zone select, estimated total, itemised list, note Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. (X is rendered from content.mjs, never literal), CTA Consultá por WhatsApp
6 dark full-bleed band with grain: Vos elegís la temática. Coordinamos horario de montaje con vos. CTA Ver temáticas
7 how it works, 4 horizontal steps: Elegís tu combo y temática; Nos contás fecha y zona; Te respondemos dentro de 24 horas hábiles; Coordinamos los detalles con vos
8 themes bento of 10 tiles with tinted backgrounds: Jefe en pañales, Dino bebé, Moana bebé, Minnie bebé, Mickey bebé, Blanca Nieves bebé, Frutillita bebé, Mariposas, Safari, Nubes y ositos
9 Qué incluye y qué no incluye: two columns with inclusions and exclusions per package from plan/04
10 zones text list: Asunción, Fernando de la Mora, Lambaré, San Lorenzo, Luque
11 FAQ accordion, 6 items
12 contact split: WhatsApp block on the left, form with the seven visible fields from BUILD-SPEC section 8 on the right
13 footer with NAP, hours Lun a Sáb 8:00 a 20:00, Privacidad, Términos
plus a floating WhatsApp button bottom right and, on mobile, a sticky bottom bar with WhatsApp primary and Calculá tu precio secondary.

Constraints: no two consecutive sections may share the same layout pattern; at least one element crosses a section boundary; one oversized display statement (a number or headline at 4rem or more); at least three distinct card treatments; no hero as a centred text block; no more than one row of identical cards; no decorative abstract diagrams; no placeholder frames visible; no faces in imagery, image areas shown as soft tinted blocks with a caption Imagen ilustrativa; WCAG contrast at least 4.5:1 for body text and 3:1 for text at least 24px. Mobile first: base layout at 390 must work with one column, 48px tap targets, 16px side gutters, no horizontal scroll except the calculator breakdown table and the mobile theme strip.

Direction: editorial magazine. Hero as an asymmetric 7/5 split with the H1 overlapping the image edge by 40px, eyebrow above, a small price tag chip pinned to the image corner. Package cards as three tall columns with the middle one lifted 24px and given the blush tint. Calculator as a 28px-radius cream panel that overlaps the bottom of the packages section. Themes as an irregular bento (two tiles double width). How-it-works as a horizontal stepper with a thin hairline connecting numbered circles. Generous whitespace, 128px section padding on desktop, 72px on mobile. Show me where the oversized statement goes (suggest the number 24 h hábiles or the estimated price).
```

## Prompt 2 — Direction 2: Warm quincho

```
Design the home page of babyshower.com.py, a Paraguayan service that sells complete baby shower packages (balloon arch and backdrop, sweet table, savoury bites) with estimated prices shown publicly and inquiries over WhatsApp. Audience: expectant mothers and their sisters or friends, 24 to 38, Gran Asunción, browsing on Android phones on mobile data. Language of all UI text: Paraguayan Spanish with voseo (Escribinos, Calculá, Consultá, Elegí). Currency format Gs. 1.850.000.

Deliver two frames: desktop 1440 wide and mobile 390 wide, same content.

Locked tokens, use exactly these values:
display font Instrument Serif 400, text font Satoshi (fallback DM Sans);
base #FBF6F2, ink #2B2430, accent #D97B6C used only for primary CTAs and one highlight per screen, surface #FFFFFF;
tints for section fills and cards only: sage #DDE8E0, sky #DCE6F2, blush #F6E1DC;
WhatsApp green #25D366 only for the WhatsApp glyph and the FAB circle;
type scale ratio 1.30 from 17px body, H1 clamp(44px, 6vw, 76px) line-height 1.02 weight 400, eyebrow labels 12px uppercase letter-spacing 0.12em;
radii 6px inputs, 14px cards and images, 28px feature panels; borders at 10 percent ink opacity, never solid; two-layer soft shadows; grain overlay on the one dark section.

Section order, do not reorder or drop:
1 sticky header (brand text Baby Shower.com.py, nav Combos y precios, Revelación de género, Temáticas, Primer añito, Ideas, Contacto, WhatsApp button, phone +595 992 279 599 as text)
2 hero: eyebrow Baby shower en Asunción y Gran Asunción; H1 Baby shower en Asunción con precio claro; sub Decoración, mesa dulce y bocaditos para 30 invitados. Precio estimado desde Gs. 1.850.000. El precio final y la disponibilidad se confirman por WhatsApp. Te respondemos dentro de 24 horas hábiles.; CTA Consultá por WhatsApp; secondary CTA Calculá tu precio; large image slot
3 trust ribbon: ['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso']
4 three package cards: Combo Nube desde Gs. 1.150.000, Combo Estrella 30 invitados desde Gs. 1.850.000 marked Combo completo and elevated, Combo Sueño 40 invitados desde Gs. 2.750.000; each with a short inclusion list, expandable exclusions, and its own Consultá por WhatsApp CTA; every card, table, FAQ price, guide CTA and calculator shows the derived caption Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. with X replaced by the configured amount
5 calculator panel: package radio, guests 15 to 60 with plus and minus, add-on checkboxes, zone select, estimated total, itemised list, note Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. (X is rendered from content.mjs, never literal), CTA Consultá por WhatsApp
6 dark full-bleed band with grain: Vos elegís la temática. Coordinamos horario de montaje con vos. CTA Ver temáticas
7 how it works, 4 horizontal steps: Elegís tu combo y temática; Nos contás fecha y zona; Te respondemos dentro de 24 horas hábiles; Coordinamos los detalles con vos
8 themes bento of 10 tiles with tinted backgrounds: Jefe en pañales, Dino bebé, Moana bebé, Minnie bebé, Mickey bebé, Blanca Nieves bebé, Frutillita bebé, Mariposas, Safari, Nubes y ositos
9 Qué incluye y qué no incluye: two columns with inclusions and exclusions per package from plan/04
10 zones text list: Asunción, Fernando de la Mora, Lambaré, San Lorenzo, Luque
11 FAQ accordion, 6 items
12 contact split: WhatsApp block on the left, form with the seven visible fields from BUILD-SPEC section 8 on the right
13 footer with NAP, hours Lun a Sáb 8:00 a 20:00, Privacidad, Términos
plus a floating WhatsApp button bottom right and, on mobile, a sticky bottom bar with WhatsApp primary and Calculá tu precio secondary.

Constraints: no two consecutive sections may share the same layout pattern; at least one element crosses a section boundary; one oversized display statement (a number or headline at 4rem or more); at least three distinct card treatments; no hero as a centred text block; no more than one row of identical cards; no decorative abstract diagrams; no placeholder frames visible; no faces in imagery, image areas shown as soft tinted blocks with a caption Imagen ilustrativa; WCAG contrast at least 4.5:1 for body text and 3:1 for text at least 24px. Mobile first: base layout at 390 must work with one column, 48px tap targets, 16px side gutters, no horizontal scroll except the calculator breakdown table and the mobile theme strip.

Direction: warm quincho. Lead with a full-bleed hero image area (21:9 on desktop, 4:5 on mobile) with a gradient scrim and the H1 bottom-left, trust ribbon as a thin band immediately under the hero. Package cards as horizontal rows on desktop (image left, content right, price and CTA on the far right) and stacked cards on mobile. Calculator embedded in a sticky right column next to the packages on desktop, full-width panel on mobile. Dark band with grain uses the plum ink #2B2430. Themes as a 5-by-2 grid of soft tiles with a single-line label each. Contact split with a large WhatsApp panel in sage tint. Keep the accent to the CTAs only.
```

## Prompt 3 — Direction 3: Price-first conversion

```
Design the home page of babyshower.com.py, a Paraguayan service that sells complete baby shower packages (balloon arch and backdrop, sweet table, savoury bites) with estimated prices shown publicly and inquiries over WhatsApp. Audience: expectant mothers and their sisters or friends, 24 to 38, Gran Asunción, browsing on Android phones on mobile data. Language of all UI text: Paraguayan Spanish with voseo (Escribinos, Calculá, Consultá, Elegí). Currency format Gs. 1.850.000.

Deliver two frames: desktop 1440 wide and mobile 390 wide, same content.

Locked tokens, use exactly these values:
display font Instrument Serif 400, text font Satoshi (fallback DM Sans);
base #FBF6F2, ink #2B2430, accent #D97B6C used only for primary CTAs and one highlight per screen, surface #FFFFFF;
tints for section fills and cards only: sage #DDE8E0, sky #DCE6F2, blush #F6E1DC;
WhatsApp green #25D366 only for the WhatsApp glyph and the FAB circle;
type scale ratio 1.30 from 17px body, H1 clamp(44px, 6vw, 76px) line-height 1.02 weight 400, eyebrow labels 12px uppercase letter-spacing 0.12em;
radii 6px inputs, 14px cards and images, 28px feature panels; borders at 10 percent ink opacity, never solid; two-layer soft shadows; grain overlay on the one dark section.

Section order, do not reorder or drop:
1 sticky header (brand text Baby Shower.com.py, nav Combos y precios, Revelación de género, Temáticas, Primer añito, Ideas, Contacto, WhatsApp button, phone +595 992 279 599 as text)
2 hero: eyebrow Baby shower en Asunción y Gran Asunción; H1 Baby shower en Asunción con precio claro; sub Decoración, mesa dulce y bocaditos para 30 invitados. Precio estimado desde Gs. 1.850.000. El precio final y la disponibilidad se confirman por WhatsApp. Te respondemos dentro de 24 horas hábiles.; CTA Consultá por WhatsApp; secondary CTA Calculá tu precio; large image slot
3 trust ribbon: ['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso']
4 three package cards: Combo Nube desde Gs. 1.150.000, Combo Estrella 30 invitados desde Gs. 1.850.000 marked Combo completo and elevated, Combo Sueño 40 invitados desde Gs. 2.750.000; each with a short inclusion list, expandable exclusions, and its own Consultá por WhatsApp CTA; every card, table, FAQ price, guide CTA and calculator shows the derived caption Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. with X replaced by the configured amount
5 calculator panel: package radio, guests 15 to 60 with plus and minus, add-on checkboxes, zone select, estimated total, itemised list, note Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. (X is rendered from content.mjs, never literal), CTA Consultá por WhatsApp
6 dark full-bleed band with grain: Vos elegís la temática. Coordinamos horario de montaje con vos. CTA Ver temáticas
7 how it works, 4 horizontal steps: Elegís tu combo y temática; Nos contás fecha y zona; Te respondemos dentro de 24 horas hábiles; Coordinamos los detalles con vos
8 themes bento of 10 tiles with tinted backgrounds: Jefe en pañales, Dino bebé, Moana bebé, Minnie bebé, Mickey bebé, Blanca Nieves bebé, Frutillita bebé, Mariposas, Safari, Nubes y ositos
9 Qué incluye y qué no incluye: two columns with inclusions and exclusions per package from plan/04
10 zones text list: Asunción, Fernando de la Mora, Lambaré, San Lorenzo, Luque
11 FAQ accordion, 6 items
12 contact split: WhatsApp block on the left, form with the seven visible fields from BUILD-SPEC section 8 on the right
13 footer with NAP, hours Lun a Sáb 8:00 a 20:00, Privacidad, Términos
plus a floating WhatsApp button bottom right and, on mobile, a sticky bottom bar with WhatsApp primary and Calculá tu precio secondary.

Constraints: no two consecutive sections may share the same layout pattern; at least one element crosses a section boundary; one oversized display statement (a number or headline at 4rem or more); at least three distinct card treatments; no hero as a centred text block; no more than one row of identical cards; no decorative abstract diagrams; no placeholder frames visible; no faces in imagery, image areas shown as soft tinted blocks with a caption Imagen ilustrativa; WCAG contrast at least 4.5:1 for body text and 3:1 for text at least 24px. Mobile first: base layout at 390 must work with one column, 48px tap targets, 16px side gutters, no horizontal scroll except the calculator breakdown table and the mobile theme strip.

Direction: price-first conversion. The hero contains the calculator: left column H1 and sub, right column the calculator panel already showing Gs. 1.850.000 as the oversized statement, WhatsApp CTA inside it. Trust ribbon below. Packages as a comparison strip (three cards with equal height, middle elevated) followed by a compact inclusion table. Everything above the fold on mobile must show the H1, the estimated price and the WhatsApp CTA without scrolling. Themes as a horizontal scroll strip on mobile and a bento on desktop. Minimal imagery: one image slot in the dark band only. Prove the design does not look cheap without photography: use tints, hairlines, type scale and one overlap.
```

## What to do with the output

1. Export the chosen direction as HTML/CSS into `docs/design-canvas-export.html` (same as tasacion did).
2. Write the resolved values (section patterns, spacings, card variants) into `02-BUILD-SPEC.md` §2–§3 as numbers. Adjectives do not survive the trip to the builder.
3. Add the SOFT CRAFT track row to `claude-skills/web-design-system/SKILL.md` so the next event-vertical site copies it instead of running Claude Design again.
