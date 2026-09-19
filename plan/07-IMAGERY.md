# 07 — Imagery spec (Higgsfield)

Process: follow the `higgsfield-image-pipeline` skill (model choice, budget, fetch/convert/place). This file only defines slots and prompts. Generation happens after the site is built (phase B7).

## Rules
- AI images fill `hero-bleed`, `section-break`, `card-motif` and `og` slots only. Never `proof-photo`. Every AI image carries a visible caption on the page: "Imagen ilustrativa". Never described in copy as "nuestros eventos".
- No recognisable characters (Disney, Boss Baby, Moana, Minnie, Mickey, Blanca Nieves, Frutillita). Theme cards for those use palette + generic motifs (bows, polka dots, tropical flowers, apples, strawberries, tie and pacifier shapes). Dino, Safari, Mariposas, Nubes y ositos can be depicted fully.
- No faces. Hands, backs, or empty setups only. No text in image (signs render garbled). Cartels are left blank or shown from an angle.
- Setting: Paraguayan upper-middle-class home: quincho with brick or white-washed walls, ceramic floor tiles, corrugated roof edge, green garden with mango or palm, plastic-free tables with linen. Light: late afternoon (16:00–17:30) warm daylight, soft shadows. Colours: warm cream base, one theme accent, no neon.
- Output: WebP, hero 1920×1080 ≤ 180 KB, card 1200×900, og 1200×630. Filenames Spanish kebab-case (`hero-baby-shower-quincho.webp`). Alt text Spanish, descriptive.

## Base style block (prepend to every prompt)
`Editorial event photography, photorealistic, 35mm lens, f/2.8, natural late-afternoon light through a Paraguayan quincho, warm cream palette, soft pastel accents, neatly styled, no people faces, no text, no logos, no watermark, high detail on fabric and balloon texture, slight film grain.`

Negative block: `cartoon, illustration, 3D render, neon, oversaturated, plastic look, garbled text, letters, logos, faces, children, crowd, cluttered, cheap party store look, fluorescent lighting, motion blur, low resolution`.

## Slots and prompts

| Slot | File | Prompt (after base block) |
|---|---|---|
| hero-bleed `/` | hero-baby-shower-quincho | Organic balloon arch in sage, cream and blush over a wooden sweet table with cupcakes and small pastries, white linen, small neutral cloud motifs, brick quincho wall, garden visible through open side, golden afternoon light |
| hero-bleed `/revelacion-de-genero/` | hero-revelacion-genero | Giant matte black balloon with question mark shape suggested by ribbon, surrounded by half pink and half blue smaller balloons, backyard lawn, two pairs of hands holding the balloon string, late sun |
| hero-bleed `/primer-anito/` | hero-primer-anito | Dinosaur-themed first birthday setup: sage and terracotta balloon arch, foam dinosaur eggs, tropical leaves, single-tier cake with number one topper (no text), quincho setting |
| section-break `/` | band-montaje | Wide shot of a decorator's hands placing a balloon cluster on a backdrop stand, tools and balloon pump visible, tidy, quincho in background, shallow depth |
| card-motif combo Nube | combo-nube | Two-metre organic balloon arch in cream and sage on a white backdrop, small side table, minimal |
| card-motif combo Estrella | combo-estrella | Three-metre arch in blush, cream and sage, backdrop, full sweet table with 30 pieces and savoury bites on wooden boards |
| card-motif combo Sueño | combo-sueno | Double four-metre arch, acrylic sign blank, tiered dessert table with a single-tier cake, drinks station with glass dispensers, souvenirs boxes |
| card-motif kit Sorpresa | kit-sorpresa | Flat lay on wooden table: black giant balloon uninflated, blank card, ribbon, pastel confetti |
| card-motif reveal Completa | revelacion-completa | Small pink and blue arch with backdrop, table with 20 pastel sweets, giant black balloon in center, garden |
| card-motif theme ×10 | tema-<slug> | Each: `<theme motifs>, small tabletop vignette, theme palette, 4:3, quincho light`. Dino: eggs, leaves, sage/terracotta. Safari: plush animals, mustard/green. Mariposas: paper butterflies on backdrop, lilac/pink. Nubes y ositos: foam clouds, beige bear, moon. Jefe en pañales: navy/gold, oversized tie and pacifier shapes, polka dots. Moana: turquoise/coral tropical flowers, cardboard waves, paddle. Minnie: pink polka dots, bows. Mickey: muted red/black/yellow, round ear shapes. Blanca Nieves: red apples, royal blue and yellow fabric, forest greenery. Frutillita: strawberries, red/green/pink dots. |
| card-motif zone ×5 | zona-<slug> | Same setup in a different venue type: Asunción apartment SUM with city window · Luque large quincho · San Lorenzo covered patio · Fernando de la Mora garden with pool edge · Lambaré terrace |
| idea guides ×5 | idea-<slug> | Flat lays: printed games on a table · DIY simple arch on a home wall · reveal cake cut showing pink inside · checklist notebook with balloons · sweets close-up |
| og | og | Crop of hero-baby-shower-quincho, 1200×630, room on the left for the title overlay added in CSS, not in the image |

Total: 3 hero + 1 band + 5 package + 10 theme + 5 zone + 5 idea + 1 og = 30 images. Batch by slot type with `generate_image_batch` when running the pipeline.

OG is deferred: emit no og:image tag until B7 supplies assets/img/og.jpg (1200×630). The kit flat lay depicts only the balloon, card, ribbon and confetti; no smoke or holi extras.
