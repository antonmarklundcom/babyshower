# Codex review — improvement ideas for babyshower.com.py

Source: Codex CLI, model gpt-6-astra, reasoning effort low, 2026-09-19. Two read-only runs over
plan/00,01,02,04,05,06,08,10, plan/prompts/DESIGN-FINAL-1.txt, docs/opus-home-preview.html and
docs/imagery-manifest.json. Codex wrote no files and did not build the site. Not yet triaged by Anton
or the manager session: these are proposals, several of which reopen decisions the plan already froze.

Part A (ideas 1-100) covers conversion and copy, pricing and the calculator, trust, information
architecture, SEO, and imagery and design. Part B (ideas 63-140, numbered by Codex in its own run)
covers mobile performance, accessibility, lead capture and WhatsApp, operations, Paraguayan legal
risk, analytics, and implementation reliability. The two runs numbered independently, so numbers
repeat across the parts.

---

# Part A — conversion, pricing, trust, IA, SEO, imagery

96,173
Reviewed all ten requested files. **100 ideas follow, ranked by expected impact within each area.** Difficulty means the relative effort to make the content or design change, not a delivery estimate.

**Flags:** **[FIX]** corrects a conflict already present in the preview or documents; **[PLAN CHANGE]** reopens a stated decision; **[LATER]** is unsuitable for the current inquiry-only launch. Unflagged ideas fit the existing launch model.

File shorthand: **Copy** = `plan/04-CONTENT-AND-COPY.md`; **Spec** = `plan/02-BUILD-SPEC.md`; **SEO** = `plan/05-ADS-AND-SEO.md`; **Design prompt** = `plan/prompts/DESIGN-FINAL-1.txt`; **Preview** = `docs/opus-home-preview.html`; **Imagery** = `docs/imagery-manifest.json`. Visual observations below come from the preview’s HTML/CSS and manifest descriptions, not a fresh browser rendering.

## 1. Conversion and home-page copy

1. **End the process at the inquiry, not the event. [FIX]**  
   **Touches:** Preview and Design prompt, home process section. Replace “Montamos y disfrutás” and “Llegamos antes…” with the four inquiry steps already approved in Copy. **Why:** The current preview turns an exploratory conversation into an apparent fulfilment promise, despite having no supplier. **Difficulty:** Low.

2. **Identify the hero offer explicitly as Combo Estrella.**  
   **Touches:** `/`, Copy hero and Preview. Put “Combo Estrella · 30 invitados” next to the Gs. 1.850.000 estimate. **Why:** Visitors otherwise have to discover which of the three packages supports the headline description and price. This also prevents associating Nube’s lower price with food. **Difficulty:** Low.

3. **Give the hero a clear reading sequence. [PLAN CHANGE]**  
   **Touches:** Copy §3, Design prompt, Preview hero. Separate service description, named package estimate, confirmation caption and response promise into short blocks instead of one dense paragraph. Preserve all qualifications. **Why:** The essential offer becomes easier to understand before the visitor encounters supporting detail. **Difficulty:** Low; revises prescribed hero copy presentation.

4. **State the launch status beside the first decision.**  
   **Touches:** `/`, immediately below hero actions. Add “Por ahora recibimos consultas, sin pedir seña.” **Why:** This reassurance currently sits deep in the FAQ. Earlier placement explains what the visitor can actually accomplish today. **Difficulty:** Low.

5. **Translate package names into customer situations.**  
   **Touches:** Home package cards, Copy §3. Add concise descriptors: Nube—“Si ya tenés la comida”; Estrella—“Decoración, dulces y bocaditos”; Sueño—“Con torta, souvenirs y coordinación”. **Why:** Names communicate atmosphere; these lines communicate fit. **Difficulty:** Low.

6. **Resolve “completo” versus substantial exclusions. [PLAN CHANGE]**  
   **Touches:** Estrella badge, Copy, `plan/10-REVISION-V2.md` A1. Consider replacing the locked “Combo completo” badge with “Decoración + bocaditos”, or retain it with that immediate explanation. **Why:** “Completo” can imply venue, seating, cake and refreshments that Estrella does not include. **Difficulty:** Low; explicitly reopens the frozen badge wording.

7. **Remove “Todo listo” from Estrella’s description. [PLAN CHANGE]**  
   **Touches:** Copy §3. Start with the actual deliverables instead. **Why:** The phrase implies more completeness and certainty than the exclusions and inquiry status support. This is a remaining tension inside the approved copy itself. **Difficulty:** Low.

8. **Restore the approved dark-band message. [FIX]**  
   **Touches:** Preview, Design prompt. Use “Vos elegís la temática. Coordinamos horario de montaje con vos.” **Why:** “Nosotros coordinamos el montaje y lo dejamos listo” in the preview is stronger than the approved inquiry wording and reinforces the misleading fulfilment sequence. **Difficulty:** Low.

9. **Replace the unsupported FAQ popularity claim. [FIX]**  
   **Touches:** Preview FAQ heading. Replace “Lo que más nos consultan” with “Antes de elegir tu combo” or simply “Preguntas frecuentes”. **Why:** A new service has no supplied evidence about its most common customer questions. **Difficulty:** Low.

10. **Make the outcome of consulting concrete.**  
    **Touches:** `/`, introductory copy above the process. Add “Conversamos sobre el combo, tu zona y qué querés incluir.” **Why:** “Consulta sin compromiso” describes the absence of an obligation; this explains the useful result of the conversation without promising an approved quote or available date. **Difficulty:** Low.

11. **Include the sister, friend or partner arranging the event.**  
    **Touches:** `/`, Copy process introduction. Add “¿Lo organizás para vos o para alguien que querés?” **Why:** The design brief explicitly includes sisters and friends, but the main narrative barely acknowledges them. **Difficulty:** Low.

12. **Welcome visitors who have not decided everything.**  
    **Touches:** `/`, near package selection. Add “Podés empezar por una idea, aunque todavía no hayas elegido temática.” **Why:** The current “Elegís tu combo y temática” sequence can feel like a prerequisite for consultation. **Difficulty:** Low.

13. **Explain the decorating vocabulary.**  
    **Touches:** Home cards and Copy. Introduce “fondo decorativo” before “backdrop”, and briefly explain an organic balloon arch as an arrangement of varied balloon sizes. **Why:** Customers should understand what they are comparing without knowing event-industry terminology. **Difficulty:** Low.

14. **Put the lower-budget option in context.**  
    **Touches:** `/`, package introduction. Add “Si buscás solo decoración, mirá Nube.” **Why:** A visitor who finds Gs. 1.850.000 too high can discover the legitimate lower-scope alternative without mistaking it for a discounted equivalent. **Difficulty:** Low.

15. **Let secondary actions say “estimate”. [PLAN CHANGE]**  
    **Touches:** Copy, Design prompt, home calculator links. Consider “Calculá tu estimación” instead of “Calculá tu precio”. **Why:** It sets the correct expectation before the visitor reaches the calculator. **Difficulty:** Low; changes a prescribed secondary CTA.

16. **Remove the unsupported speed promise. [PLAN CHANGE]**  
    **Touches:** Copy and Preview calculator heading. Replace “Calculá tu precio en 30 segundos” with “Explorá una estimación para tu baby shower”. **Why:** Package, guest, additional-item and zone choices may take longer; the promise adds pressure without explaining value. **Difficulty:** Low.

## 2. Pricing presentation and the calculator

17. **Show no numeric total above package capacity. [FIX]**  
    **Touches:** Preview calculator, `/`, `/combos-y-precios/`. For Estrella at 45 guests, show the approved custom-quote message without a capped numeric total. **Why:** The preview currently displays an estimate covering fewer guests than requested, which materially understates the apparent price. **Difficulty:** Medium.

18. **Treat an unknown zone as an unknown total. [FIX]**  
    **Touches:** Preview calculator. When “Otra zona” is selected, replace the numeric total with the custom-quote state already required by v2. **Why:** A prominent number accompanied by “+ traslado” still looks like an actionable total when an essential component remains unknown. **Difficulty:** Medium.

19. **Prevent package switching from silently adding extras. [FIX]**  
    **Touches:** Preview calculator experience. Moving from Sueño to Estrella should not turn Sueño’s included cake and souvenirs into newly selected paid additions unless the customer chooses them. **Why:** The preview’s selection behavior can create an unexplained price jump. **Difficulty:** Medium.

20. **Make clear that the calculator estimates the package, not the whole celebration.**  
    **Touches:** Calculator result on both pages. Add “Estimación del combo y adicionales seleccionados” and a short reminder that the venue and guest furniture are outside it. **Why:** “Total estimado” can easily be read as the total event budget. **Difficulty:** Low.

21. **Put Nube’s food exclusion beside its price.**  
    **Touches:** Nube card, comparison table and calculator selection. Use “Solo decoración; no incluye comida”. **Why:** “30 invitados” alongside a package price otherwise resembles a catering allowance. **Difficulty:** Low.

22. **Explain that smaller groups do not reduce the base price.**  
    **Touches:** Calculator guest-count explanation. For Estrella at 15 guests, explain that the base package remains Gs. 1.850.000; for Sueño below 40, explain its base similarly. **Why:** A customer should not have to infer the minimum from an unchanged total. **Difficulty:** Low.

23. **Explain what an extra guest adds.**  
    **Touches:** Calculator and comparison table. Pair Estrella’s estimated Gs. 55.000 increment with “+1 dulce y +2 salados”; pair Sueño’s increment with “+2 dulces y +3 salados”. **Why:** The increment looks arbitrary without the corresponding scope. **Difficulty:** Low.

24. **Show food quantities for the selected group.**  
    **Touches:** Calculator summary. For Estrella at 40 guests, show 40 sweets and 80 savoury bites; for Sueño at 60, show 100 sweets and 180 savoury bites. **Why:** These quantities make the existing guest formula tangible without changing the offer. **Difficulty:** Medium.

25. **Distinguish bites from a full meal.**  
    **Touches:** Package table, cards and food FAQ. Explain that Estrella’s base contains 30 sweet units and 60 savoury units; do not describe that as a complete meal for 30. **Why:** “Para 30 invitados” says little about the amount of food each person receives. **Difficulty:** Low.

26. **Compare upgrades at the same guest count.**  
    **Touches:** `/combos-y-precios/`. Add a worked comparison: Estrella for 40 with cake is estimated at Gs. 2.620.000; Sueño for 40 is Gs. 2.750.000, before zone charges. Explain the differing inclusions. **Why:** Comparing only base prices hides a potentially relevant upgrade. **Difficulty:** Medium.

27. **Show a genuine worked estimate.**  
    **Touches:** `/combos-y-precios/`, beside the calculator. Example: Estrella for 35 in Luque = Gs. 1.850.000 + Gs. 275.000 for five extras + Gs. 40.000 transfer = Gs. 2.165.000 estimated. Include the required confirmation caption. **Why:** Visitors can understand how the estimate is assembled. **Difficulty:** Low.

28. **Separate package price from zone-adjusted price.**  
    **Touches:** Five zone pages. Show both the base and estimated transfer beneath the combined amount; for Luque, Nube is Gs. 1.150.000 + Gs. 40.000. **Why:** A different price on the home page and city page can otherwise look inconsistent. **Difficulty:** Low.

29. **Clarify souvenir quantities above the base group.**  
    **Touches:** Sueño calculator summary and comparison details. Explicitly retain “40 souvenirs” when guest count exceeds 40 unless the offer is revised. **Why:** The frozen extra-guest rule increases food, not souvenirs; users may assume every guest receives one. **Difficulty:** Low.

30. **Make the souvenir add-on quantity conspicuous.**  
    **Touches:** Add-on list. Present “30 souvenirs personalizados” before the estimated amount and flag that it is a set of 30, even for 35 or 40 guests. **Why:** “Souvenirs” alone can imply a quantity matched to the guest selector. **Difficulty:** Low.

31. **Distinguish the two cake estimates.**  
    **Touches:** Reveal page and baby-shower add-on catalogue. Explain that the Gs. 180.000 reveal cake and Gs. 220.000 themed cake are different proposed items; do not invent size differences that are not specified. **Why:** Two apparently equivalent cake prices can undermine confidence. **Difficulty:** Low.

32. **Resolve the “extra coordination hour” ambiguity. [PLAN CHANGE]**  
    **Touches:** Add-on descriptions in Copy and Spec. Explain what an extra hour extends, since event coordination is included only in Sueño and its duration is unspecified. Until clarified, consider presenting it as an item to discuss rather than a universally selectable extra. **Why:** The current label implies a base service that Nube and Estrella do not include. **Difficulty:** Medium; changes the frozen catalogue presentation.

33. **Explain the separate confetti-balloon add-on.**  
    **Touches:** Calculator add-ons and reveal page. State how the estimated Gs. 60.000 additional balloon differs in scope from the Gs. 390.000 Kit Sorpresa; if the distinction is not yet defined, say so rather than implying equivalence. **Why:** Otherwise the kit appears inexplicably expensive. **Difficulty:** Low.

34. **Add comparison rows for the most easily missed differences.**  
    **Touches:** Home package summary and `/combos-y-precios/`. Give cake, drinks, souvenirs and event coordination their own concise comparisons rather than burying them in prose. **Why:** These are meaningful budget and scope differences between Estrella and Sueño. **Difficulty:** Low.

35. **Allow exact guest numbers as an alternative. [PLAN CHANGE]**  
    **Touches:** Spec calculator input contract. Consider accommodating 32 or 37 guests rather than only the prescribed increments of five. **Why:** The formula charges per additional guest; rounding the customer’s group to a multiple of five creates a mismatch. The preview currently uses increments of one, so the documents already disagree. **Difficulty:** Medium.

36. **Distinguish a chosen estimate from a starting price. [PLAN CHANGE]**  
    **Touches:** Calculator result wording and v2 price-caption rule. Keep “Precio estimado desde…” for package cards, but consider “Estimación para esta selección…” for a fully specified calculator result. **Why:** “Desde” is useful for a base package but ambiguous after every selection has been made. **Difficulty:** Low; changes the exact shared caption rule.

## 3. Trust and objection handling without invented proof

37. **Explain the difference between inspiration and delivered work at first exposure.**  
    **Touches:** Home hero caption and theme introduction. Supplement “Imagen ilustrativa” with “Idea de ambientación; no es una foto de un evento nuestro.” **Why:** Photorealistic imagery can still be interpreted as a portfolio despite a short illustration label. **Difficulty:** Low.

38. **Explain why prices are estimates.**  
    **Touches:** Pricing FAQ and `/como-funciona/`. Say that the published combinations are orientative proposals whose scope, price and availability remain subject to confirmation. **Why:** Repeating “estimado” without explaining it can feel evasive; a plain explanation makes the uncertainty understandable. **Difficulty:** Low.

39. **Make the organizer role understandable.**  
    **Touches:** `/como-funciona/`, brief home introduction. Describe the site as helping organize and coordinate a proposal, rather than letting visitors assume it is a venue, balloon shop or established catering company. **Why:** The business category shapes expectations about what a package contains. **Difficulty:** Low.

40. **Answer “Will it look exactly like the picture?”**  
    **Touches:** Theme-page FAQs and main FAQ. Suggested answer: “La imagen es una referencia ilustrativa. Los colores, elementos y alcance se revisan antes de confirmar una propuesta.” **Why:** This addresses a predictable concern without guaranteeing an exact reproduction. **Difficulty:** Low.

41. **Separate display tables from guest furniture.**  
    **Touches:** Inclusion explanations and FAQ. Clarify what “mesa dulce” means and whether its display furniture is part of the proposal; until that scope is settled, do not imply that every table pictured is included. **Why:** The plan excludes tables and chairs while repeatedly showing decorated tables. **Difficulty:** Medium; requires a content decision about an existing ambiguity.

42. **Describe the offer as adaptable only where that is established. [FIX]**  
    **Touches:** Preview theme introduction. Replace the sweeping “Cada temática funciona con los tres combos. Adaptamos colores y detalles…” with provisional wording about ideas to discuss. **Why:** A pre-supplier catalogue does not establish that every illustrated treatment is available at every tier. **Difficulty:** Low.

43. **Make exclusions sound like planning help.**  
    **Touches:** Home inclusion section and package details. Add “Para completar tu presupuesto, tené en cuenta…” before venue, seating, ice and other exclusions. **Why:** The information remains explicit but helps the customer plan rather than reading solely as a list of refusals. **Difficulty:** Low.

44. **Answer the “I already have a cake” question beside the comparison.**  
    **Touches:** `/combos-y-precios/`, borrowing the existing FAQ. Explain that Nube and Estrella exclude cake, while Sueño includes it in the estimate; any substitution is discussed separately. **Why:** This helps visitors choose without inventing an automatic discount. **Difficulty:** Low.

45. **Address small gatherings without inventing a cheaper package.**  
    **Touches:** FAQ and Nube description. Explain that a smaller group can still consider decor-only Nube or the existing base packages, whose base price does not automatically fall. **Why:** Visitors planning an intimate event need an answer even though the frozen offer starts with larger reference groups. **Difficulty:** Low.

46. **Make the lack of a portfolio easy to understand.**  
    **Touches:** Theme hub and `/como-funciona/`. Place the already-approved gallery answer where people inspect inspiration, not only in the expanded FAQ. **Why:** Customers looking for previous work should not have to search through unrelated questions to understand its absence. **Difficulty:** Low.

47. **Show a clearly labelled hypothetical proposal example.**  
    **Touches:** `/como-funciona/`. Present an “Ejemplo orientativo, no corresponde a un evento realizado” showing scope, selected theme, exclusions and estimated amount. **Why:** A concrete example demonstrates clarity without inventing a customer, testimonial or completed event. **Difficulty:** Medium.

48. **Clarify what “30 invitados” does and does not certify.**  
    **Touches:** FAQ and package notes. State that it describes the reference package group, not the capacity of the customer’s room or an assurance that every pictured arrangement fits. **Why:** Nube’s “hasta 30 invitados en el lugar” can sound like a venue-capacity statement. **Difficulty:** Low.

49. **Present customization as a discussion, not unlimited choice.**  
    **Touches:** Theme FAQ and primer-añito FAQ. Replace an unqualified “cualquier temática” impression with “Podés proponernos una temática; revisamos qué elementos se pueden incluir.” **Why:** This welcomes personal ideas while keeping the published options credible. **Difficulty:** Low.

50. **Reassure through specifics rather than “Sin sorpresas”. [FIX]**  
    **Touches:** Preview inclusion-section eyebrow. Use “Alcance de la estimación” or “Para que puedas comparar”. **Why:** The v2 plan removed “Sin letra chica”; “Sin sorpresas” recreates an absolute reassurance that provisional scope cannot fully support. **Difficulty:** Low.

51. **Remove unearned experience language from guides. [PLAN CHANGE]**  
    **Touches:** Copy §9, games guide title. Replace “10 juegos… que funcionan de verdad” with a descriptive promise such as “10 juegos… con materiales e instrucciones”. **Why:** The current heading implies testing or experience not supplied in the plan. **Difficulty:** Low.

52. **Preserve inclusion clarity when genuine proof becomes available. [LATER] [PLAN CHANGE]**  
    **Touches:** `plan/01-MASTER-PLAN.md` §5. Add future real work alongside “Qué incluye y qué no incluye”, rather than replacing that section after deal three. **Why:** Proof and scope answer different questions. **Difficulty:** Medium; reopens the planned section replacement and requires real evidence.

## 4. Information architecture and the 32 planned routes

53. **Give every route family a distinct customer job.**  
    **Touches:** Spec §6 and the planned 32-route structure. Define home as orientation, prices as comparison, service pages as event-specific offers, themes as visual choice, zones as geographic scope, and guides as practical answers. **Why:** The same cards and FAQ repeated everywhere otherwise make the architecture feel larger than its useful content. **Difficulty:** Medium.

54. **Separate the home page from the Asunción zone page.**  
    **Touches:** `/` and `/zonas/asuncion/`. Let home explain the whole service; make the city page answer location-specific questions about the estimate and venue context. **Why:** Both currently target almost the same phrase and could become near-substitutes for the visitor. **Difficulty:** Medium.

55. **Separate the ideas hub from the broad ideas guide.**  
    **Touches:** `/ideas/` and `/ideas/ideas-para-baby-shower/`. Use the hub for choosing a question and the guide for a coherent planning overview. **Why:** “Ideas para tu baby shower” and “Ideas para baby shower…” need different purposes beyond one being shorter. **Difficulty:** Low.

56. **Make “Combos y precios” lead to the comparison destination. [FIX]**  
    **Touches:** Preview primary navigation. The preview points to the home cards; the planned navigation points to `/combos-y-precios/`. Preserve a separate home jump link if useful. **Why:** Someone asking to compare prices should reach the full comparison, not only three promotional summaries. **Difficulty:** Low.

57. **Expose the existing zones hub more clearly.**  
    **Touches:** Home zones section and footer. Add “Ver zonas y recargos estimados” linking to `/zonas/`. **Why:** Geography is a major buying constraint, but the preview’s city names are currently just text. **Difficulty:** Low.

58. **Keep service pages separate from instructional guides.**  
    **Touches:** `/revelacion-de-genero/` and `/ideas/revelacion-de-genero-sencilla/`. The first should help choose kit versus setup; the second should explain actual celebration ideas. **Why:** Repeating the same kit pitch on both leaves informational visitors unsatisfied. **Difficulty:** Medium.

59. **Lead character-theme pages with the appropriate occasion. [PLAN CHANGE]**  
    **Touches:** Moana, Minnie, Mickey and other theme-page headings. Where the planned keyword evidence is primarily birthday-related, lead with primer añito and retain baby shower as a second use. **Why:** The universal “para baby shower y primer añito” template obscures meaningful intent differences. **Difficulty:** Medium; revises the fixed H1 pattern.

60. **Group the theme hub by visual preference.**  
    **Touches:** `/tematicas/`. Offer groupings such as neutral, nature-inspired and character-inspired, while retaining all ten routes. **Why:** Ten names are easier to explore when visitors can first choose the look they like. **Difficulty:** Medium.

61. **Differentiate package scale from theme style.**  
    **Touches:** Theme pages and `/combos-y-precios/`. Explain that the package describes proposed quantities and scope while the theme describes visual direction. **Why:** Visitors otherwise have to guess whether choosing Safari creates a new package or changes the published estimate. **Difficulty:** Low.

62. **Choose related themes for an explicit reason.**  
    **Touches:** The ten theme pages. Recommend Nubes y ositos from Safari for a softer neutral look, or Mariposas from Minnie for a pink palette without character inspiration. **Why:** Three arbitrary related links are less useful than a small comparison of alternatives. **Difficulty:** Medium.

63. **Make the five guides complementary.**  
    **Touches:** Copy §9 and `/ideas/`. Assign each a clear scope: inspiration, games, DIY at home, simple reveal, and planning checklist. **Why:** Repeating venue, budget and theme advice in all five creates unnecessary reading and weakens their identities. **Difficulty:** Medium.

64. **Offer a budget-first reading path.**  
    **Touches:** `/ideas/` and `/combos-y-precios/`. Connect “Quiero saber cuánto prever” to the comparison and “Quiero hacerlo en casa” to the DIY guide. **Why:** Visitors may know their constraint before they know the name of the service or package they need. **Difficulty:** Low.

65. **Keep the calculator’s service scope explicit.**  
    **Touches:** Global calculator entry points, reveal and primer-añito pages. Label it as a baby-shower combo calculator and avoid implying it estimates the other two services. **Why:** The global “Calculá tu precio” action currently sends every visitor to a calculator containing only Nube, Estrella and Sueño. **Difficulty:** Low; **[PLAN CHANGE]** if changing the prescribed global label.

66. **Link the compact FAQ to the full explanation. [FIX]**  
    **Touches:** Preview FAQ/footer and `/preguntas-frecuentes/`. Add “Ver todas las preguntas” and make the full FAQ destination discoverable rather than linking only to the six home questions. **Why:** The extra eight answers otherwise have little visible role in the journey. **Difficulty:** Low.

67. **Keep Capiatá and Mariano Roque Alonso understandable without adding routes.**  
    **Touches:** `/zonas/`. Give each a named entry with the estimated surcharge and a clear explanation that it is part of the listed inquiry coverage. **Why:** Their absence from the five detailed city pages should not make them look excluded. **Difficulty:** Low.

68. **Make mobile theme browsing expose the full choice.**  
    **Touches:** Home theme strip. Add a visible “Ver las 10 temáticas” destination and an indication that more options follow. **Why:** The mobile strip starts with Jefe en pañales, while neutral Nubes y ositos is last; visitors may never discover the full range. **Difficulty:** Low.

## 5. SEO and local search

69. **Replace the universal Asunción title pattern with page-specific geography. [PLAN CHANGE]**  
    **Touches:** SEO §4, five zone pages. A Luque page should lead with Luque rather than inheriting “en Asunción”; a guide should lead with its actual topic. **Why:** The current blanket title pattern can contradict the page’s purpose and location. **Difficulty:** Low.

70. **Assign each important search intent a primary page.**  
    **Touches:** SEO cluster map. Give price comparisons to `/combos-y-precios/`, the commercial Asunción overview to `/`, and specific planning questions to their guides. **Why:** The current “head” cluster points broadly to home and ideas; sharper ownership improves editorial focus without adding routes. **Difficulty:** Medium.

71. **Make city pages useful without changing the city name.**  
    **Touches:** Five zone pages, Copy §8. Give each substantive material about its listed venue contexts, estimated surcharge and relevant questions, using only verified local details. **Why:** Near-identical city pages can resemble doorway content; Google explicitly addresses city-targeted pages that funnel users elsewhere without useful differentiation. **Difficulty:** Medium. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

72. **Treat the projected head-term ranking timeline as a hypothesis. [PLAN CHANGE]**  
    **Touches:** `plan/01-MASTER-PLAN.md` §7. Replace “the /ideas/ hub is what earns the head term over 3–6 months” with an objective rather than an expected outcome. **Why:** Five planned guides and an unverified keyword export do not establish a ranking timetable. **Difficulty:** Low.

73. **Keep estimated service prices distinct from market prices.**  
    **Touches:** All guide budget sections. Say “Nuestras estimaciones de combos” rather than presenting the package figures as what baby showers generally cost in Paraguay. **Why:** The plan provides proposed prices for one business, not evidence of a local market range. **Difficulty:** Low.

74. **Write guides to answer the query completely.**  
    **Touches:** Five planned guides. For games, provide materials, group size, instructions and how a winner is chosen; for DIY, provide a usable purchase list and sequence. **Why:** A visitor should leave with a workable answer, which aligns with Google’s people-first guidance. **Difficulty:** Medium. [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

75. **Reconsider rigid guide word counts. [PLAN CHANGE]**  
    **Touches:** Spec and Copy’s 700–1000-word requirement. Prefer complete answers over padding or deleting useful detail to hit that range. **Why:** Google explicitly says it has no preferred word count; the current limit is an editorial constraint, not an SEO requirement. **Difficulty:** Low to agree; medium to revise content briefs. [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

76. **Make every theme page answer theme-specific questions.**  
    **Touches:** Ten theme pages. Mariposas can explain backdrop versus centrepiece inspiration; Nubes y ositos can explain neutral palettes; Dino can contrast a baby-shower treatment with a first-birthday treatment. **Why:** A unique paragraph is more valuable when it answers a distinct question rather than merely using different wording. **Difficulty:** Medium.

77. **Use natural query variants inside the appropriate page.**  
    **Touches:** Reveal, birthday and theme copy. Explain “revelación de género”, “revelación de sexo” and “fiesta de revelación” naturally where relevant; similarly use “primer añito” and “cumpleaños de 1 año”. **Why:** This accommodates vocabulary variation without creating near-duplicate pages or awkward keyword lists. **Difficulty:** Low.

78. **Answer price questions immediately, with the right qualifiers.**  
    **Touches:** Pricing-page introduction and price FAQ. Begin with the three package estimates and their scope distinction before longer explanation. **Why:** Someone searching “baby shower precio Paraguay” should find the requested information without first reading a general introduction. **Difficulty:** Low.

79. **Use descriptive editorial links.**  
    **Touches:** Guides, theme pages and zone pages. Prefer “compará los combos de baby shower” or “ideas para hacerlo en casa” to repeated “ver más”. **Why:** The link itself should explain why the next page is useful. **Difficulty:** Low.

80. **Verify geographic seed details before turning them into local expertise.**  
    **Touches:** Copy §8. Check neighbourhood names and boundary descriptions, particularly the repeated Laurelty references, before writing definitive city-specific prose. **Why:** Geographic specificity only helps credibility when it is correct; the current seeds are not evidence of local service history. **Difficulty:** Medium.

81. **Keep descriptions useful even when omitting a price.**  
    **Touches:** SEO metadata briefs. When the full required estimate caption cannot fit naturally, describe the comparison, theme or local scope instead of squeezing in an inadequately qualified amount. **Why:** The plan’s strict caption and description limits otherwise encourage incomplete price claims. **Difficulty:** Low.

82. **Broaden the editorial role of embarazo.com.py links.**  
    **Touches:** SEO §4. Beyond linking by pregnancy week, connect relevant planning articles to the checklist, home-celebration guide and reveal ideas where they genuinely answer the reader’s next question. **Why:** The receiving page can match the reader’s immediate need more closely than always sending them to a service landing page. **Difficulty:** Medium.

83. **Present Google Maps visibility as conditional, never implied.**  
    **Touches:** SEO local-search plan and any future local-search copy. Keep the website’s inquiry coverage separate from claims of a verified local business presence. **Why:** Google excludes online-only businesses from Business Profile eligibility; the plan correctly makes eligibility conditional. **Difficulty:** Low. [Google eligibility guidance](https://support.google.com/business/answer/13763036?hl=en)

84. **Use one truthful service-area identity when eligible. [LATER]**  
    **Touches:** Future Google Business Profile and corresponding local-page descriptions. Retain the real brand and service area rather than creating a supposed branch for every city page. **Why:** City coverage is not evidence of separate staffed locations; Google’s guidance calls for accurate representation and generally one profile per business. **Difficulty:** Medium; requires actual eligibility. [Google business representation guidelines](https://support.google.com/business/answer/3038177?hl=en)

## 6. Imagery and visual design

85. **Make package pictures comparable in scale and viewpoint.**  
    **Touches:** Imagery’s Nube, Estrella and Sueño slots. Use a similar viewing angle and framing so the two-, three- and four-metre proposed arrangements can be compared visually. **Why:** Different photographic compositions can make a cheaper package look larger or more elaborate than a higher tier. **Difficulty:** Medium.

86. **Show only the proposed package scope as the focal subject.**  
    **Touches:** Package and hero imagery. Distinguish decorative furniture, linens, serving stands and surroundings from included deliverables through composition and captions. **Why:** The current prompts contain attractive objects that the exclusion list may place outside the package. **Difficulty:** Medium.

87. **Align the hero image with the named hero estimate.**  
    **Touches:** Home hero and Imagery’s `hero-baby-shower-quincho`. Ensure the reference scene resembles the proposed Estrella scope rather than an unspecified premium celebration. **Why:** A price chip pinned directly onto an image strongly associates that entire scene with the amount. **Difficulty:** Medium.

88. **Move the price chip away from an apparent exact visual quote. [PLAN CHANGE]**  
    **Touches:** Design prompt and Preview hero. Consider placing the named package estimate in the text block, with the image labelled as inspiration, rather than pinning the amount onto the scene. **Why:** This reduces the impression that everything pictured is included for that figure. **Difficulty:** Low; changes the prescribed image-corner chip.

89. **Give neutral themes the first visual position. [PLAN CHANGE]**  
    **Touches:** Home bento and mobile theme strip. Lead with Nubes y ositos, Safari, Mariposas or Dino rather than Jefe en pañales. **Why:** Those directions better express the plan’s gender-neutral default and do not depend on character recognition. **Difficulty:** Low; revises the prompt’s listed sequence.

90. **Resolve the Minnie first-birthday mismatch.**  
    **Touches:** Imagery’s `tema-minnie-bebe` and home theme tile. The manifest flags a number-one candle. Use it specifically for a birthday context or choose a reference without the numeral for baby-shower browsing. **Why:** An occasion-specific prop can contradict the surrounding page title. **Difficulty:** Medium.

91. **Make palette-only tiles an intentional design treatment.**  
    **Touches:** Mickey and Blanca Nieves tiles in Preview. Give them the same editorial completeness as photo tiles through palette names, material cues and a brief style description. **Why:** Two plain substitutes among eight elaborate images can look unfinished, even though excluding the rejected character imagery is correct. **Difficulty:** Medium.

92. **Clarify that thematic motifs are inspiration, not extra inclusions.**  
    **Touches:** Theme tiles and detail-page images. Label decorative apples, paddles, animal toys, moons and giant props as reference elements whose scope is discussed. **Why:** The package matrix does not establish that every theme-specific prop shown is included. **Difficulty:** Low.

93. **Match Kit Sorpresa imagery to the actual proposed customer experience.**  
    **Touches:** Imagery’s `kit-sorpresa`. The planned flat lay shows an uninflated balloon and loose materials, while the offer could be read as a ready-to-use reveal. Resolve that presentation ambiguity before choosing the image. **Why:** Customers should not have to infer whether they receive components or a prepared arrangement. **Difficulty:** Medium.

94. **Use ordinary homes alongside polished quinchos.**  
    **Touches:** Imagery’s home and DIY references. Include modest, believable indoor corners as well as garden and quincho scenes. **Why:** The budget-conscious visitor should be able to imagine the proposal in her own space rather than only in an aspirational venue. **Difficulty:** Medium.

95. **Do not use fictional city scenes as geographic proof.**  
    **Touches:** Imagery’s five zone slots and their captions. Describe them as illustrative venue types rather than photographs of actual setups in named cities. **Why:** The current descriptions say “en… Luque” or “de Asunción”, which can imply location evidence that generated scenes cannot provide. **Difficulty:** Low.

96. **Make game imagery demonstrate a game. [PLAN CHANGE]**  
    **Touches:** Imagery’s games-guide slot. Replace the concept of blank cards labelled as printed games with a legible, designed example of an actual game described in the article. **Why:** The visual would teach something instead of merely decorating the page. **Difficulty:** Medium; revises the manifest’s no-readable-text direction.

97. **Give the checklist guide a useful visual checklist. [PLAN CHANGE]**  
    **Touches:** Imagery’s checklist-guide slot. Prefer a clearly designed checklist excerpt or annotated planning arrangement over a blank notebook. **Why:** A blank page contradicts the article’s promise of a concrete checklist and contributes little information. **Difficulty:** Medium; revises the current image concept.

98. **Reduce the dominance of the oversized “24 h”. [PLAN CHANGE]**  
    **Touches:** Design prompt and Preview process section. Give the package choice or scope explanation more visual emphasis and keep the response promise secondary. **Why:** The largest statement currently emphasizes waiting time rather than the service’s principal benefit. **Difficulty:** Medium; changes an explicitly required display statement.

99. **Make mobile package comparison less serial. [PLAN CHANGE]**  
    **Touches:** Preview’s stacked package section. Consider a compact three-option summary before the full illustrated cards, with the differences visible together. **Why:** A visitor should not need to remember the first long card while reading the third to understand the offer ladder. **Difficulty:** Medium; adds a comparison treatment to the fixed composition.

100. **Give shared-page artwork the correct occasion. [PLAN CHANGE]**  
     **Touches:** Imagery’s single shared `og` concept. Consider separate sharing visuals for baby shower, reveal and primer añito instead of using the same home hero everywhere. **Why:** A link shared with family should visually match the event being discussed, especially when comparing a reveal kit with a birthday package. **Difficulty:** Medium; expands the planned single-image approach.

**Files changed:** None. **Commands run:** Read-only `Get-Content` / `Select-Object` reads—PASS; truncated outputs were followed by targeted reads. **Flagged or not done:** No files written, site built, browser rendering performed or changes applied.

---

# Part B — performance, accessibility, lead flow, operations, legal, analytics, delivery


63. **Check hierarchy at intermediate screen widths.**  
    **Touches:** Preview header and hero CSS. The layout jumps from a dense desktop header to mobile behavior around 760px, while the hero has special positioning near 1440px. Review 768–1280px widths for navigation crowding, heading overlap and clipped content. **Difficulty: Medium.**

64. **Reduce decorative vertical space on small screens.**  
    **Touches:** Preview section padding, design prompt. Seventy-two pixels above and below many sections, plus tall cards and a five-line ribbon, makes a very long home page. Use tighter spacing for utility sections while retaining breathing room around major decisions. **Conflict:** Changes locked design spacing. **Difficulty: Low.**

65. **Make the theme strip discoverable without swiping.**  
    **Touches:** Mobile theme strip. Add “Ver las 10 temáticas” and a visible indication that more cards exist. Users should not need to discover horizontal scrolling to find Safari or Nubes y ositos. **Difficulty: Low.**

66. **Put social-preview labels into the image itself.**  
    **Touches:** Manifest `og` entry, eventual `og.jpg`. The note says title overlay is added in CSS, but an OG image is shared as a standalone asset. Bake any title and illustration disclosure into the exported image; page CSS will not accompany it. **Difficulty: Low.**

## Mobile performance on slow connections

67. **Budget the complete initial transfer.**  
    **Touches:** `02` performance criteria. The 500KB check excludes fonts and images, which may dominate the download. Add a proposed first-screen transfer budget covering HTML, styles, scripts, hero and fonts, and report both compressed transfer and decoded image dimensions. **Difficulty: Medium.**

68. **Use the local image variants already recorded in the manifest.**  
    **Touches:** Preview-to-production handoff, image renderer. The manifest says AVIF/WebP derivatives exist; the preview hotlinks full PNGs. Build production `picture`, `srcset` and `sizes` from approved local derivatives, with a fallback for missing assets. **Difficulty: Medium.**

69. **Serve a mobile-sized hero.**  
    **Touches:** `/` hero rendering. Do not send the 1920px variant to every 390px phone. Choose candidates appropriate to layout and density, and check that aggressive cropping still shows the actual decor rather than an empty corner. **Difficulty: Low.**

70. **Avoid loading three font families.**  
    **Touches:** Preview font links, `02` fallback rules. The preview requests Instrument Serif, DM Sans and Satoshi from two providers. Ship one body family and one display family, preferably local, with only the needed weights. **Difficulty: Low.**

71. **Make the site usable before fonts arrive.**  
    **Touches:** Typography CSS. Test the hero and buttons with system fallbacks and blocked font requests. Match fallback metrics where practical so font replacement does not push the CTA down or shift the package cards while a visitor taps. **Difficulty: Medium.**

72. **Keep below-fold images out of the critical path.**  
    **Touches:** Package cards, theme strip, dark band. Preserve lazy loading for supporting imagery and avoid preloading an entire gallery. A hero may receive high priority; distant theme cards should not compete with it on mobile data. **Difficulty: Low.**

73. **Load calculator code only where it is needed.**  
    **Touches:** Generated script includes, `02`. Include calculator behavior on `/` and `/combos-y-precios/`, not every article, legal page and zone page. The site’s small static architecture should remain an advantage. **Difficulty: Low.**

74. **Avoid expensive visual effects where they add little.**  
    **Touches:** Sticky header, mobile bar, dark-band grain. Test backdrop blur, layered shadows and SVG turbulence on a lower-end Android phone. Replace costly effects with simple fills if scrolling becomes sluggish; maintain readable contrast. **Difficulty: Medium.**

75. **Test from a Paraguayan mobile connection.**  
    **Touches:** QA plan, hosting acceptance. A desktop Lighthouse score cannot reveal the real latency to the Brazilian hosting location or weak local reception. Time first usable content and the WhatsApp handoff on at least one representative physical phone. **Difficulty: Medium.**

76. **Test partial loading, not just the happy path.**  
    **Touches:** All templates, QA checklist. Block fonts, images, analytics and JavaScript separately. Prices, scope, navigation and ordinary WhatsApp links should remain usable; a missing decorative image must not prevent an inquiry. **Difficulty: Medium.**

## Accessibility and interaction

77. **Test the mobile overlay stack as one system.**  
    **Touches:** Sticky bar, FAB, cookie banner, forms. Verify that these elements do not cover the submit button, errors, calculator total or focused inputs when the keyboard opens. Account for safe-area insets and small-height screens. **Difficulty: Medium.**

78. **Use one persistent mobile WhatsApp control.**  
    **Touches:** `02` global elements, preview. A sticky CTA plus floating FAB duplicates the same action and consumes limited space. Retain one persistent action, with the richer menu available elsewhere. **Conflict:** Changes the requirement to show both controls. **Difficulty: Low.**

79. **Strengthen input boundaries.**  
    **Touches:** Design tokens and form CSS. Ten-percent ink borders on white or cream may be too faint to identify fields. Test component contrast and allow stronger borders or clear filled-field boundaries. **Conflict:** May require an exception to the “hairline borders only” visual rule. **Difficulty: Low.**

80. **Keep critical qualifiers comfortably readable.**  
    **Touches:** Price captions, exclusions, AI labels, preview CSS. Much of the legally and commercially important information is 12–14px. Increase its size and contrast rather than making the attractive price dominant and its conditions hard to read. **Difficulty: Low.**

81. **Give calculator groups proper semantics.**  
    **Touches:** Calculator markup. Use fieldsets and legends for package and extras, associate guest help with its control, and expose the current guest value meaningfully. Visual uppercase labels alone do not provide equivalent navigation for assistive technology. **Difficulty: Low.**

82. **Announce the result without rereading the whole calculator.**  
    **Touches:** Preview `aria-live` result region. Announce a concise updated estimate or custom-quote state, rather than the full breakdown, caption, date and button on every change. This makes repeated adjustments much less noisy. **Difficulty: Medium.**

83. **Preserve real keyboard access to every menu.**  
    **Touches:** Header menu, planned WhatsApp panel. Support Escape, sensible focus movement, visible focus and returning focus to the trigger when closed. Ensure hidden options do not remain in the tab order. **Difficulty: Medium.**

84. **Make tables readable without relying solely on sideways scrolling.**  
    **Touches:** Package comparison and calculator breakdown. Preserve table headers and provide a compact package-by-package reading mode or stacked breakdown on narrow screens. Horizontal scrolling is allowed, but should not hide the meaning of a number. **Difficulty: Medium.**

85. **Test zoom and enlarged Android text.**  
    **Touches:** Preview buttons, package badges, hero and sticky bar. Check at enlarged text settings and narrow widths. The current `white-space: nowrap` buttons and “Combo completo” badge are likely stress points; allow wrapping where necessary. **Difficulty: Medium.**

86. **Make error recovery screen-reader friendly.**  
    **Touches:** `/contacto/`, PHP response, `04` §13. Focus the error summary, link each error to its field, preserve values and indicate required versus optional fields. Keep the honeypot out of keyboard and assistive-technology interaction. **Difficulty: Medium.**

## Lead capture and WhatsApp flow

87. **Preserve context on every WhatsApp link.**  
    **Touches:** Preview package cards, hero, theme links, `02` §4. Most preview links open a bare chat. Include page, selected package or theme, and known event details so Anton does not restart the conversation with questions already answered on the site. **Difficulty: Low.**

88. **Carry the full calculator selection into WhatsApp.**  
    **Touches:** Preview calculator message builder. It currently omits extras, price version, source route and tentative date, despite the build contract. Send the selected extras and distinguish numeric estimates from custom quotes; never serialize a stale amount. **Difficulty: Medium.**

89. **Put the inquiry summary on the thanks-page WhatsApp link.**  
    **Touches:** `/gracias.html`, form receipt flow. A visitor who submitted a form and then opens WhatsApp should be able to continue the same inquiry with a short reference and summary. Otherwise two disconnected records create duplicate work and inconsistent answers. **Difficulty: Medium.**

90. **Complete the form contract before reusing the preview.**  
    **Touches:** Preview form, `02` §8. The preview lacks zone, optional message, “No sé todavía,” the “Otro” event option and the planned hidden fields; its submit action is disabled. Treat it strictly as a design reference, not production-ready form markup. **Difficulty: Medium.**

91. **Explain which channel will be used to reply.**  
    **Touches:** Contact form, thanks page, `04`. Say “Te respondemos por WhatsApp al número que nos dejás.” Display the normalized number before or after submission with an easy correction route. This also makes the purpose of collecting the number clear. **Difficulty: Low.**

92. **Accept normal phone-number formatting.**  
    **Touches:** Client and server validation. Strip spaces, hyphens and parentheses before checking the supported Paraguayan formats. The preview’s own `09xx xxx xxx` placeholder encourages spaces; a literal digits-only validator would reject normal user input. **Difficulty: Low.**

93. **Consider organizers with foreign WhatsApp numbers.**  
    **Touches:** `02` phone validation, `/contacto/`. Family members abroad may organize an event in Paraguay. Either support international numbers or clearly offer the direct WhatsApp route when the form cannot accept them. **Conflict:** Broader form support changes the Paraguay-only validation contract. **Difficulty: Medium.**

94. **Do not imply that opening WhatsApp sends the message.**  
    **Touches:** CTA helper text, fallback page or panel. A short instruction—“Se abre WhatsApp; revisá el mensaje y tocá Enviar”—helps less experienced users and clarifies why clicks are not received inquiries. Keep the link immediate and unobstructed. **Difficulty: Low.**

95. **Test the handoff in common Android browsing contexts.**  
    **Touches:** QA checklist. Test Chrome and at least one in-app browser, with and without WhatsApp installed. Keep the number selectable and provide a copy-message option if the deep link fails. All intended inquiries still go to +595 992 279 599. **Difficulty: Medium.**

96. **Avoid asking the same qualification questions twice.**  
    **Touches:** WhatsApp greeting and quick replies, `04`, `06`. If the prefilled message already contains guests and zone, acknowledge those details and ask only what is missing. A canned three-question reply after a completed calculator feels inattentive. **Difficulty: Low.**

97. **Offer a short path through the long form.**  
    **Touches:** `/contacto/`, homepage contact section. Keep name and WhatsApp prominent, with optional event details grouped beneath “Si ya tenés estos datos.” Preserve the required event/zone choices unless intentionally revising the contract; avoid visually presenting every field as equally mandatory. **Difficulty: Low.**

98. **Add explicit follow-up preferences.**  
    **Touches:** WhatsApp scripts and CRM fields. Ask whether the person wants another message and honor “no gracias” immediately. A request for an estimate should not silently become permission for the reveal-to-shower-to-birthday marketing sequence. **Difficulty: Low.**

## Operations, responsiveness and economics

99. **Write a dedicated pre-supplier operating procedure.**  
    **Touches:** `06`. Most detailed operations begin after Gate C, but current leads need handling now. Define what Anton sends when no provider can confirm scope, how long research may take, when to update the customer and when to close an inquiry honestly. **Difficulty: Medium.**

100. **Define “24 horas hábiles” operationally.**  
     **Touches:** `04`, `06`, hours configuration. Clarify weekends and holidays internally and state whether the promise means the next business day or twenty-four staffed hours. Until resolved, the website and away message can create very different expectations. **Conflict:** Any public rewording changes v2’s exact response promise. **Difficulty: Low.**

101. **Create an unanswered-inquiry queue.**  
     **Touches:** `06`, CRM workflow. Every new chat or form needs an owner, first-response deadline and next-action date. Review the queue at opening, midday and closing; do not rely on WhatsApp’s unread indicator as the entire service system. **Difficulty: Low.**

102. **Provide a coverage plan for Anton’s absence.**  
     **Touches:** `06`, `08` Q11. Define holidays, illness and simultaneous commitments: who can respond, what the away message says, and when paid traffic pauses. Do not publish expanded hours without someone responsible for them. **Difficulty: Medium.**

103. **Define qualified inquiries without requiring a fixed date.**  
     **Touches:** `05`, `06`, CRM definitions. Separate relevant service/zone/budget interest from readiness to book. “Date unknown” is normal at this stage; counting only near-ready buyers would misread inquiry-launch demand. **Difficulty: Low.**

104. **Add a clear date-capacity decision.**  
     **Touches:** `06`, `08` Q14. Four events per month does not prevent three requests for the same Saturday. **Gate C only:** manage capacity by date, setup window, supplier and Anton’s availability before requesting any payment. **Difficulty: Medium.**

105. **Resolve contradictory supplier-deposit assumptions.**  
     **Touches:** `01` working capital, `06` supplier agreement. The economics example accepts a supplier deposit up to 70%, while the checklist says not above 50% without own capital. Define the approved ceiling and the funding source rather than leaving incompatible defaults. **Difficulty: Low.**

106. **Budget beyond the first supplier payment.**  
     **Touches:** `01`, `08` Q13. Include refund exposure, replacement suppliers, failed delivery, transport overruns and simultaneous bookings. “Working capital gap assumed fundable” is not an operating limit. **Gate C only:** set funded exposure limits before accepting deposits. **Difficulty: Medium.**

107. **Resolve the supplier-contact contradiction.**  
     **Touches:** `01`, `06` §§2–3. “Supplier never gets the customer’s phone” conflicts with sharing a day-of contact. Define an operator-first contact model and a documented emergency exception, sharing only necessary information with the customer’s knowledge. **Difficulty: Low.**

108. **Make food-supplier verification concrete.**  
     **Touches:** `06` supplier checklist. “Registro sanitario si lo tiene” is too vague. **Gate C only:** identify applicable requirements for the actual supplier and products, obtain relevant evidence, and document storage, transport and allergen handling. Do not advertise food-safety credentials before verification. **Difficulty: High.**

109. **Build price learning into every relevant conversation.**  
     **Touches:** CRM fields, `06` weekly review. Record expected budget, quoted scope and reason for mismatch. This lets Anton distinguish “too expensive” from “expected venue and full catering” or “only wanted decorations,” improving the offers without indiscriminate discounts. **Difficulty: Low.**

110. **Reconcile the Instagram launch instructions.**  
     **Touches:** `01`, `05`, `08`. One document allows AI package cards in the feed; another says real photos only; the roadmap calls for nine early posts despite no event portfolio. Choose a truthful policy and avoid making a fabricated-looking feed a launch dependency. **Difficulty: Low.**

## Paraguayan legal, consumer-protection and privacy risks

These are issues for local legal/accounting review, not a conclusion that the proposed launch is compliant.

111. **Review inquiry-stage disclosure before Gate A.**  
     **Touches:** `06` gates, `08` Q12/Q16, `/terminos/`. Article 7 of Ley 4868 specifies provider identity and contact disclosures. Ask counsel what applies to this inquiry model; the brand-plus-city fallback is not established compliance. **Conflict:** Moves a narrow legal review ahead of Gate C. [Ley 4868](https://www.bacn.gov.py/leyes-paraguayas/961/comercio-electronico). **Difficulty: High.**

112. **Reassess “taxes confirmed later.”**  
     **Touches:** `POLICY.iva`, `04`, price surfaces. Ley 1334 article 10 addresses precise, tax-inclusive offer prices. Have counsel/accountant assess whether these estimated package presentations constitute offers and define compliant wording before publication. **Conflict:** Challenges the frozen tax disclaimer. [Ley 1334](https://www.bacn.gov.py/leyes-paraguayas/897/ley-n-1334-de-defensa-del-consumidor-y-del-usuario). **Difficulty: High.**

113. **Do not assume “estimated” neutralizes every promise.**  
     **Touches:** Package copy, imagery, terms. Review the entire presentation for misleading scope or implied availability, not merely the price caption. Ley 1334 addresses truthful information and the effect of offers; caveats should not contradict the dominant message. [Ley 1334](https://www.bacn.gov.py/leyes-paraguayas/897/ley-n-1334-de-defensa-del-consumidor-y-del-usuario). **Difficulty: Medium.**

114. **Update the privacy-law research.**  
     **Touches:** `04` privacy, `05` consent references, `08` Q12. Ley 6534 is titled protection of credit-related personal data; do not treat a citation to it as a complete ordinary-lead privacy analysis. Map the applicable provisions with counsel. [Ley 6534](https://www.bacn.gov.py/leyes-paraguayas/9417/ley-n-6534-de-proteccion-). **Difficulty: High.**

115. **Plan for Ley 7593 without misstating its commencement.**  
     **Touches:** `/privacidad/`, privacy maintenance tasks. The plan omits the 2025 general personal-data law. Article 57 specifies entry into force twenty-four months after official publication; verify the publication date and transition requirements rather than describing it as already fully operative. [Ley 7593](https://www.bacn.gov.py/leyes-paraguayas/12924/ley-n-75932025-de-proteccion-de-datos-personales-en-la-republica-del-paraguay). **Difficulty: Medium.**

116. **Distinguish cancellation, withdrawal and service failure.**  
     **Touches:** Planned booking policy, `04`, `06`. **Gate C only:** counsel should distinguish Ley 4868’s withdrawal provisions and exceptions from refunds for mismatched delivery. The business’s five-day refund-processing target is a separate promise, not the statutory claim period. [Ley 4868](https://www.bacn.gov.py/leyes-paraguayas/961/comercio-electronico). **Difficulty: High.**

117. **Do not assume WhatsApp cannot form an agreement.**  
     **Touches:** Terms and operator scripts. Have counsel define the acceptance process and train Anton to avoid accidental confirmation in inquiry mode. Ley 4868 addresses electronic contracting; the phrase “no contract until written confirmation” needs a precise operational meaning. [Ley 4868](https://www.bacn.gov.py/leyes-paraguayas/961/comercio-electronico). **Difficulty: High.**

118. **Review character names, not only character images.**  
     **Touches:** Six character-theme routes, `08` Q6. “Inspirada en” is not itself a license or legal clearance. Review names, motifs, promotional use and confusion risk. **Conflict:** Removing or renaming pages would reverse the decision to retain them. [Paraguayan trademark law](https://www.bacn.gov.py/leyes-paraguayas/862/ley-n-1294-de-marcas-br). **Difficulty: High.**

119. **Describe the actual data recipients.**  
     **Touches:** `/privacidad/`, `04` §14. Account for hosting, lead email, CRM, WhatsApp/Meta and consented Google services, including relevant overseas processing. “CRM propio” alone does not describe the planned data flow. Confirm actual providers and arrangements rather than inventing assurances. **Difficulty: Medium.**

120. **Make deletion workable across every copy.**  
     **Touches:** `06`, privacy procedure, lead logging. Define deletion from logs, email, CRM, WhatsApp exports and backups, with any justified exceptions. Clarify what restarts the twelve-month period; an automated reminder should not silently retain abandoned leads forever. **Difficulty: Medium.**

121. **Make photo permission granular and optional.**  
     **Touches:** `06` portfolio process, future testimonials. Separate event documentation from publication permission, identify channels, and handle identifiable children separately. A supplier’s permission to use a photograph does not necessarily establish every depicted person’s permission. Do not make photos a condition of service. **Difficulty: Medium.**

122. **Avoid blanket safety assurances for reveal products.**  
     **Touches:** `01` “indoor-safe” wording, reveal page and guide. Define product-specific instructions and venue restrictions; neither a balloon nor cake warrants an unconditional safety label. **Gate C only:** approve products and procedures before selling them. Removing smoke/powder entirely would conflict with the retained “a confirmar” option. **Difficulty: Medium.**

## Analytics, advertising and measurement

123. **Remove deposit-based stop rules from the inquiry experiment.**  
     **Touches:** `05` budget logic. “Spend one CAC without a deposit” cannot diagnose a funnel that is prohibited from accepting deposits. Use relevant inquiries, qualified conversations and feasible proposals until Gate C; keep booking metrics in a separate later cohort. **Difficulty: Low.**

124. **Define success for the Gs. 400.000 test before spending.**  
     **Touches:** `05`, `06` Gate B. State what the experiment should learn: demand by service, budget compatibility, zone distribution and response workload. Set a review date and decision criteria without pretending a small sample establishes long-term acquisition economics. **Difficulty: Low.**

125. **Track received WhatsApp conversations manually.**  
     **Touches:** CRM workflow, `05`. Record actual incoming chats by date, source reference and outcome. The plan correctly calls clicks secondary; the missing operational detail is how clicks become verified conversations without double-counting form users. **Difficulty: Low.**

126. **Reconsider form-only bidding optimization later.**  
     **Touches:** `05` conversion strategy. A WhatsApp-first business optimizing solely to forms may optimize toward the less representative channel. Once attribution is reliable, use verified qualified inquiries across both channels. **Conflict:** Changes the frozen form-primary model; never promote raw WhatsApp clicks as equivalent leads. **Difficulty: High.**

127. **Protect the conversion event from thanks-page reloads.**  
     **Touches:** `/gracias.html`, analytics code, endpoint receipt. Fire only with evidence of a successful submission and once for that receipt. Direct visits, refreshes and back-navigation must not generate new primary conversions. A one-second debounce does not solve this. **Difficulty: Medium.**

128. **Prevent personal data leaking through automatic link tracking.**  
     **Touches:** GA4 configuration and WhatsApp event handler. A `wa.me` URL can contain customer-entered details in its text parameter. Audit automatic outbound-link collection as well as custom events; send only allowlisted fields, not the complete URL or message. **Difficulty: Medium.**

129. **Define `calc_submit` precisely.**  
     **Touches:** `02`, `05`, calculator analytics. The estimator updates automatically, so “submit” is ambiguous. Choose one action—such as sending the calculated inquiry—and separate it from start, changes and custom-quote outcomes. Otherwise reports will compare incompatible events. **Difficulty: Low.**

130. **Make attribution useful without pregnancy profiling.**  
     **Touches:** `embarazo.com.py` links, `05`, CRM references. Use broad source and destination identifiers, not pregnancy week, medical-page titles or personal details in campaign parameters. Preserve the commercial referral insight without constructing sensitive audience profiles. **Difficulty: Low.**

131. **Show the measurement gap created by consent.**  
     **Touches:** Weekly reporting, `05`. Report server-accepted forms and manually received chats separately from consented analytics sessions. Missing analytics attribution does not mean no lead, and observed conversion rates apply only to the measured population. **Difficulty: Low.**

132. **Keep the first paid test concentrated.**  
     **Touches:** `05` campaign plan, `01` roadmap. Reconcile the broad seven-ad-group inventory with the explicit initial two-group rollout. Start with the agreed commercial baby-shower and reveal groups; review negative keywords for accidental exclusion of relevant queries before expanding. **Difficulty: Low.**

## Implementation reliability and plan maintenance

133. **Separate the design preview from implementation authority.**  
     **Touches:** `00`, `02`, `08` Q20, design prompt, preview. Record exactly which export governs composition and which text/behavior is superseded. The prompt simultaneously requires a final-price disclaimer and bans “precio final”; resolve that contradiction before another generation or build. **Difficulty: Low.**

134. **Define independent launch and pricing states.**  
     **Touches:** `02`, `10`, future configuration. Inquiry/booking capability and estimated/firm pricing are separate dimensions. Document allowed combinations and the evidence needed for each transition so enabling bookings cannot accidentally convert unverified estimates into firm prices. **Difficulty: Medium.**

135. **Make form idempotency survive partial failure.**  
     **Touches:** `02` endpoint contract. If the durable log succeeds but email and CRM fail, a retry with the same `sid` must retry notification without writing another lead. Track persisted and notified states separately; “seen sid” must not automatically mean success. **Difficulty: High.**

136. **Support form submissions without client JavaScript.**  
     **Touches:** `02` hidden `sid` contract, PHP endpoint. The planned identifier is client-generated, but the site aims for resilient basic functionality. Allow the server to create a safe identifier when appropriate rather than rejecting every no-JavaScript submission. **Conflict:** Extends the current client-generated-ID contract. **Difficulty: Medium.**

137. **Treat mail acceptance and delivery as different checks.**  
     **Touches:** `02`, `06` hosted form test. A successful PHP mail call does not demonstrate that Anton sees the notification. Verify inbox/spam delivery, maintain a recoverable inquiry queue and add a routine check for saved leads whose notifications failed. **Difficulty: Medium.**

138. **Make rate limiting fair on mobile networks.**  
     **Touches:** PHP endpoint contract. Multiple customers may share a carrier IP; five attempts per minute per IP should not be the only abuse signal. Combine conservative limits, honeypot checks and submission identifiers, with accessible retry and WhatsApp fallback. **Difficulty: Medium.**

139. **Expand calculator verification around state transitions.**  
     **Touches:** `02` fixtures, future verification. Test Estrella → Sueño → Estrella, known zone → other zone → known zone, maximum → above maximum, extras added then removed, and returning from WhatsApp. The existing arithmetic fixtures miss the preview’s most consequential state bugs. **Difficulty: Medium.**

140. **Release the whole site as one consistent version.**  
     **Touches:** Deployment plan, price configuration, cached assets. When prices or inclusions change, regenerate all relevant pages and scripts together and retain a rollback package. Verify that cached calculator logic, visible cards and WhatsApp messages use the same price version across all 32 routes. **Difficulty: Medium.**

