# Responsive conversion improvements — 4 October 2026 (Paraguay)

Based on merged PR #7 / master 45e024d80daddfb9df12a4006a98f8f78827bcf8. This PR does not merge or deploy.

## Implemented

- Every generated page starts with its mobile action bar hidden. It appears at 120px of scroll, hides again near the top, and hides while an input/select/textarea is focused or navigation is open. Existing in-page enquiry links remain available without JavaScript.
- Homepage headline and responsive typography are shorter; price and both buttons precede confirmation and the concise truthful launch disclosure. Removed tall minimum hero heights and excessive desktop bottom padding.
- Hero image shading is lighter on desktop's image side; mobile retains strong text contrast. Mobile's redundant image caption is replaced by the explicit launch disclosure within the hero copy.
- Homepage shows four selected themes and three core celebration services, linking to the complete collections. No routes or offerings were removed.
- Compact illustrative badges on theme gallery images; full illustrative wording remains elsewhere.
- Calculator option prices no longer repeat the final-price confirmation under every choice. The summary retains the confirmation, price date and inclusions.
- Valid exact guest counts update the total immediately without clamping partial typing. Slider and stepper changes synchronize the exact count; blur still normalizes invalid values.
- Desktop calculator result stays visible while scrolling its options. Breakdown rows can wrap on narrow screens; package headings and tags can wrap.
- Service hero disclosures follow the primary actions; mobile service typography and spacing reduced.
- Removed duplicate brand wording in the shared footer.

## Completed checks

- Build: 57 routes, 59 HTML outputs, 57 sitemap entries.
- `node verify.mjs --final`: PASS, including actual JS executed with a DOM adapter, forms, consent, menus, calculator and all-page mobile-bar scroll/focus/navigation fixtures.
- `node verify.mjs --final --http http://127.0.0.1:4187`: PASS across all local outputs and custom 404; preview and verifier started in the same process environment.
- JS syntax checks and `git diff --check`: PASS.
- Live GET requests: all 59 URLs returned HTTP 200, each with a main landmark and viewport metadata. A GET of the /404.html resource being 200 is normal; unknown-path 404 behavior was checked locally.
- Cloud browser: all 57 live indexable routes checked at 1363px width for horizontal overflow, one H1, and dead in-page anchors: no findings. Both special pages opened. This describes the currently deployed baseline, not the unmerged changes.

## Not completed / not changed

- Full rendered mobile/tablet/desktop scan and screenshot review of the new changes: blocked because the local QA runner has no installed Chrome executable. Cloud browser supports desktop inspection but exposes no viewport resizing, and cannot be used to assert a phone rendering. Responsive CSS was reviewed and behavior tested; this is not equivalent to full visual QA. Keep the PR draft pending that review.
- `node docs/qa-tools/site-scan.mjs http://127.0.0.1:4185`: FAIL at browser launch (configured Chrome executable does not exist), not a claimed passing scan.
- Real hosted CRM/email delivery, physical-device keyboard behavior, and production headers were not tested. No live enquiry was submitted.
- Prices, price-validity date, business credentials, operator identity, booking policies and existing backend logic were not changed or invented.
- No new images, testimonials or client work claims; no merge or deployment.
