# 08 — Open questions for Anton (defaults assumed until answered)

The build does not block on these. Each has a default baked into content.mjs so the worker can proceed; Anton edits the value later.

| # | Question | Default assumed in the plan |
|---|---|---|
| Q1 | Who sells and invoices? Reseller under which entity/RUC, which sales document, which tax regime? Does the accountant confirm IVA-inclusive pricing? | Reseller model. `SITE.ruc` empty, no RUC line, no "factura" claim anywhere. Use POLICY.iva estimated tax/payment wording; operator Baby Shower Paraguay, sitio operado desde Asunción until resolved. |
| Q2 | Payment rails actually available: bank account, Bancard link, Tigo Money, Billetera Personal, Zimple? | No rail list in copy until answered; confirm available methods by WhatsApp before any payment. Gate C requirement. |
| Q3 | Supplier 1 written rate card. | ANSWERED 2026-09-19: no supplier yet. Launch in pre-supplier mode (BUILD-SPEC section 0): all prices labelled estimates, no supplier guarantees, leads answered manually. |
| Q4 | Dedicated WhatsApp Business number? | ANSWERED 2026-09-19: +595 992 279 599. Convert it to WhatsApp Business (profile, quick replies) before Ads. |
| Q5 | Do we sell primer añito at launch (supplier can do the themed cake and decor at a costed margin)? | Yes, one package, page built; Ads for it disabled until confirmed. |
| Q6 | IP stance on character themes (Moana, Minnie, Mickey, Blanca Nieves, Frutillita, Jefe en Pañales): keep pages with "inspirada en" wording, or drop to generic themes? | Keep pages, "inspirada en" wording, no character imagery, no Ads on them. |
| Q7 | Is decoraciones.com.py wanted as a reserved umbrella domain (redirect only)? | Not bought. Revisit after 3 months of data. |
| Q8 | Authorised supplier photos: how many, credited how? | None at launch; `/trabajos-reales/` deferred, proof slots hidden. |
| Q9 | GA4 property and Google Ads account: currency PYG, billing, who owns access? | `ANALYTICS_ID` empty; tag loads only when set and consent accepted. |
| Q10 | VenderCRM: pipeline name, API key location on Hostinger, task/calendar features available for the ladder reminders? | Pipeline "Baby Shower", stages in 06 §1; config one level above public_html at `vendercrm-config.babyshower.php` per vendercrm-lead-capture skill. |
| Q11 | Who answers WhatsApp Lun–Sáb 8–20 within 15 min, and who handles weekend incidents? | Anton, v1. Copy promises Te respondemos dentro de 24 horas hábiles; 15 min remains an internal target. |
| Q12 | Lawyer review of terms/cancellation (Ley 4868) and privacy (Ley 6534): who and when? | Planned policy in 04 §1 appears only on /como-funciona/ and /terminos/ under its planned-policy heading; legal review before Gate C. |
| Q13 | Cash reserve for the deposit mismatch and refunds; maximum Ads test loss accepted? | 400.000 PYG Ads envelope for 14 days; working capital gap assumed fundable. |
| Q14 | Launch date and the max events per month you will personally coordinate? | Gate A organic inquiries: QA, Anton answering WhatsApp, privacy/terms live, lead email + hosted form test working. Gate B paid traffic: A + verified GA4/Ads conversion + 400k envelope approval. Gate C bookings: supplier rate card, seller identity, payment rails, lawyer review → enable bookings. Cap 4 booked events/month until supplier 2 is live. |
| Q15 | Fonts: do you have Satoshi woff2 files locally (it is not on Google Fonts)? | Worker falls back to Google Fonts for Instrument Serif + a Google-hosted alternative (DM Sans) and flags it. |
| Q16 | May the site name you as operator? | No personal name until answered; Baby Shower Paraguay, sitio operado desde Asunción, with WhatsApp and SITE.email. |
| Q17 | Is retention of 12 months from the last inquiry OK? | 12 meses desde la última consulta; deletion via WhatsApp or email. |
| Q18 | GitHub repo name? | anton/babyshower-com-py, private. |
| Q19 | Original KWP export available? | Not a blocker; start Ads small, use query reports to replace forecast. |
| Q20 | Which design export is authoritative? | Once chosen: docs/design-canvas-export.html governs home composition in A/B/C; until then B1 uses BUILD-SPEC §6 patterns. |
| Q21 | Is SITE.leadEmail = antonmarklund.com@gmail.com for lead notifications? | Proposed notification address awaiting confirmation; configure and test before Gate A, do not infer public SITE.email from it. |
