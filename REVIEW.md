# Senior review — 2026-09-26

## Local vs Repo

- Repository: `antonmarklundcom/babyshower`. Started on `master`, with only the two reported untracked design prompts. Read the plan/revision authority and the deployment, handoff, build-log, route, keyword and prior-review documentation before implementation. Later build-log decisions supersede older design instructions; in particular, removal of illustrative-photo disclosures was expressly approved in Batch 10.
- `git fetch origin`: first attempt failed (`Failed to connect to github.com:443`); approved network retry succeeded. `git rev-list --left-right --count master...origin/master` returned **0 0**. Both point to `7aaab87e1f8de3349e0dcbf4a7945f406c0193c4`.
- Created **`codex-review-2026-09`** from that master. No merge, push or deployment was performed. No existing local file or archive was deleted/discarded. No private deployment config was read; no credentials were printed or written. Local endpoint tests used synthetic data and a local SMTP sink.
- Current inventory is **53 routes, 55 HTML outputs, 53 sitemap entries**, not the historical 32-route snapshot. The additions are already on master.

### The two untracked prompts

| File | Applied? | Recommendation |
| --- | --- | --- |
| `plan/prompts/DESIGN-FINAL-4.txt` | Not as the current complete design. Its proposal-sheet direction overlaps the earlier Batch 1 implementation, but Batch 5 explicitly removed `homeProposal` in favor of the approved mixed photographic design. The current carousel, service navigation and sections differ substantially. | Do not commit as an authoritative/current build instruction. It is a superseded alternative, suitable for deletion after the owner no longer needs design history. Preserved unchanged and untracked here. |
| `plan/prompts/DESIGN-FINAL-5.txt` | Partially overlaps common components: tinted package headers, blush calculator and numbered steps. Its defining photo-free invitation hero and theme bento are not the current site. Shared tokens/copy do not prove that this prompt was applied. | Same: obsolete alternative, not missing production work. Recommend eventual deletion rather than committing it as current guidance; preserved unchanged and untracked. |

Evidence: the prompts' `Direction` paragraphs; `docs/log/build.md` Batches 1, 5, 8–10; `docs/HANDOFF-2026-09-20-b.md`; `build-site.mjs` home renderer; `assets/css/site.css`. The older handoff explicitly says not to commit these prompts. Neither is a build dependency.

### Remote Claude branch

`origin/claude/festive-thompson-91te7i` points to `e05e9bcead68747e0550b587e7e078a1a041e00c`. The unmerged-commit list from `git log master..origin/claude/festive-thompson-91te7i` is **empty**. Counts for `master...origin/claude/festive-thompson-91te7i`: **5 0**. It is an ancestor of master, not an alternative implementation worth merging.

Master's five additional commits:

```text
7aaab87 Merge pull request #2 from antonmarklundcom/service-images
b467a73 Service hero photos + confirmed service prices
3f49b7a Merge pull request #1 from antonmarklundcom/lead-gen-design
26261ca Lead capture on every commercial page, service heroes, mega menu
5391d7e Servicios menu, 4 service pages, /servicios/ overview, nombres guide, 53 routes
```

Diff from the old branch to master: **87 files, 725 insertions, 80 deletions**, plus binary image changes. It adds the service hub/four service pages, names guide, service imagery, forms/navigation, and matching data/verification/generated outputs. Diffing in the reverse direction shows these as removals. **Merge recommendation: nothing to merge.**

### Build and dist reproducibility

The pre-existing `dist/babyshower-2026-09-21.zip` and `dist/babyshower-2026-09-24.zip` are **stale**, not builds of current master: each has 147 entries, is missing 41 current shipping files (21 HTML routes and 20 service image variants), and differs in 40 shared entries versus the reviewed working tree. That comparison includes this review's header change; staleness is independently established by the missing routes/images and changed page content.

The initial source rebuild changed all 55 HTML asset-version strings because Git's Windows CRLF checkout changed raw CSS/JS byte hashes. After normalizing text before hashing, all generated HTML plus sitemap match HEAD after line-ending normalization: **zero content differences**. No editorial rewrite was smuggled into regenerated pages.

Two real packaging runs produced:

```text
dist/babyshower-2026-09-26.zip
dist/babyshower-2026-09-26-124657-8708400.zip
```

Both contain **188 entries**. All 188 shipping paths are tracked source/output paths. The first ZIP matches every current shipping file byte-for-byte, with no missing or extra entries. Comparing SHA-256 of every decompressed entry between both builds gives **zero differences**. Whole ZIP bytes differ because ZIP timestamps vary: reproducible file contents are confirmed; byte-identical ZIP containers are not. These new archives include the reviewed `.htaccess` change and therefore are builds of this review working tree, not untouched master. Existing archives were preserved.

`.gitignore` already correctly excludes `dist/`, `node_modules/`, leads, private VenderCRM configs and QA screenshots while retaining the example config. Added `.env`, `.env.*` (except `.env.example`) and `.babyshower-state/` as defensive omissions. `git check-ignore` confirmed those exclusions; the example config remains trackable. No existing ignored private files were inspected.

## Findings ranked P0 / P1 / P2

### P0

**No confirmed P0 defect in the reviewed local build.** This does not certify live hosting configuration, supplier fulfilment, mail delivery or legal readiness.

### P1 — address before relying on acquisition or delivery

1. **Stale deploy artifacts could roll the site back.** Paths: `dist/babyshower-2026-09-21.zip`, `dist/babyshower-2026-09-24.zip`, `deploy/make-zip.ps1`. Evidence: both old archives lack 41 current files; the script previously deleted the same-day ZIP before building. **Fix implemented:** preserve existing archives by suffixing subsequent same-day builds; generated and verified fresh archives. **Remaining:** use only the reviewed current artifact for any future approved deployment, with a commit identifier/content manifest in a future packaging improvement.

2. **Windows verification could not reach its checks.** Paths: `verify.mjs:46`, renderer VM setup, `build-site.mjs` asset hashing. Evidence: initial `SyntaxError: Cannot use import statement outside a module`; after that fix, a false `Missing empty-only random SID generation` failure. Both assumed LF-only source text. Raw asset hashing also caused generated-page churn. **Fix implemented:** CRLF-aware import stripping, normalized SID assertion, platform-independent text hashes with matching verification. Final build/HTTP/ZIP verification passes.

3. **Hosted lead notification remains an operational gate.** Paths: `lead-forward.php` notification/failure path, `content.mjs` `SITE`, `docs/DEPLOY.md`. Evidence: public source defaults have no recipient or CRM credentials; success correctly requires durable storage plus mail or CRM acceptance. Local test without a recipient returns **503 even though the lead is logged**. The build log says a private config was prepared, but that does not prove installation or delivery. **Fix:** owner verifies one real hosted inquiry, received email, single durable log line and retry behavior before acquisition. Do not expose/invent a recipient or weaken success criteria. Local synthetic tests pass; no live inquiry was sent.

4. **Offer language can imply fulfilment the business does not yet have.** Paths: `content.mjs:29` (`Todo listo`), service offer descriptions, `build-site.mjs` zones heading (`Zonas donde montamos tu baby shower`). Evidence: the user confirms no supplier fulfilment, while cards describe concrete food, installation and coordination; estimated-price captions mitigate price certainty but do not fully clarify pre-supplier status. **Fix proposed:** replace readiness language with proposal language and make scope/availability confirmation explicit near offers; validate every new service against an actual supplier rate card before accepting bookings. Keep `BOOKING_ENABLED=false`. No speculative price, capacity, payment or supplier changes made.

5. **Photographs convey stronger proof than the business can substantiate.** Paths: `docs/imagery-manifest.json`, `assets/img/manifest.json`, `build-site.mjs` imagery, `docs/log/build.md` Batches 9–10. Evidence: generated images are used prominently; Batch 10 deliberately removed the last illustrative-image disclosures, and no authorized event gallery exists. **Fix proposed:** a clear inspiration/reference distinction and, later, separately credited real events with permission. This reopens a documented owner decision, so it is recorded rather than silently reversed. Do not manufacture reviews, customer counts or completed-event claims.

### P2 — maintainability, conversion and incremental quality

6. **CSS cleanup could remove keyboard focus styling.** Path: `css-audit.mjs` `live()`. Evidence: after removing its stale 34-file assertion, the dry-run proposed deleting `.service-card:focus-within`; its regex treated `focus` as a complete prefix of `focus-within`. It also treated `@keyframes` as an element selector. **Fix implemented:** exact pseudo-name boundary, conservative at-rule retention, manifest-derived unique-file assertion. Final dry-run retains the focus rule and animations. Eight candidate unused rules remain; no CSS pruning was performed.

7. **Security headers were absent.** Path: `.htaccess`, `mod_headers` block. Evidence: redirect/private-file denial/cache rules existed, but no MIME-sniffing, referrer or framing policy. **Fix implemented:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`. Verify on Apache/Hostinger before deployment; the Node preview and PHP development server do not apply `.htaccess`. CSP/HSTS rollout is deferred pending hosting and analytics compatibility checks, not asserted as complete.

8. **Browser QA depended on a missing global package and a failing archive module.** Paths: `docs/qa-tools/site-flows.mjs`, `docs/qa-tools/site-scan.mjs`. Evidence: initial `Cannot find module 'playwright'`; then Windows `Expand-Archive ... module could not be loaded`. **Fix implemented:** flow runner uses .NET ZIP extraction, passes paths through environment variables, allocates a unique temporary directory without deleting earlier runs, and closes its browser. Existing `PW_BASE` override points to the installed runtime. Final packaged flows: **18/18 passed**. Broader removal of machine-specific tool defaults is deferred.

9. **Image/font URLs are cached as immutable without versioning.** Paths: `.htaccess` assets cache rule; `build-site.mjs` `fontUrl`, `imageFigure`. Evidence: all `/assets/` receive a one-year immutable cache policy, but only CSS/JS have content-version queries. Replacing an image or font under its existing filename can leave repeat visitors with stale assets. **Fix proposed:** content-address/version those URLs or use a shorter revalidation policy for unversioned assets. Deferred because cache behavior should be tested on the host and asset URL changes would touch every page.

10. **Price-date discipline and operating docs lag the expanded site.** Paths: `content.mjs:8`, `docs/DEPLOY.md`, `plan/00-README.md`, `docs/routes.json`. Evidence: estimates still say 19/09/2026 after later service-price additions; docs contain historical 32-route/no-PHP/blocked-packaging statements even though this run built 53 routes and linted PHP. **Fix proposed:** update price date only after the owner validates estimates, and distinguish historical logs from current launch instructions. **Small fix implemented:** verifier no longer falsely prints that PHP is unavailable; it explicitly requests a separate lint check.

11. **Structured data is present, but rich-result expectations need restraint.** Path: `build-site.mjs` `graph()`. Evidence: home has Organization, WebSite, LocalBusiness and Service; offer/theme/zone pages have Service; non-root pages have BreadcrumbList; guides have Article; FAQ markup matches visible answers. LocalBusiness deliberately omits an address. Google's LocalBusiness documentation requires an address for that feature; do not invent one. Keep truthful Organization/Service data and revisit eligibility with real operations. Google stopped showing FAQ rich results on May 7, 2026; existing FAQPage can remain for semantics but is not a growth promise. Sources: [Google LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google Search documentation updates](https://developers.google.com/search/updates#may-2026).

12. **Nested navigation and tap targets have minor polish opportunities.** Paths: `build-site.mjs` breadcrumbs, `assets/css/site.css:528`, service-card link rules. Evidence: schema inserts the Ideas hub for guides but omits Temáticas/Zonas intermediate levels; scan flags narrow `Inicio`, `Ideas` and `Luque` links. Service-card flags are false positives because `::after` stretches the hit area across the card; inline article links also need contextual assessment. **Fix proposed:** add matching visible/schema hub breadcrumbs and minimum width for standalone breadcrumb/footer targets. No claim of a comprehensive WCAG audit; no layout change based solely on heuristic flags.

13. **Some maintenance/provenance files ship unnecessarily.** Paths: `deploy/make-zip.ps1` recursive assets inclusion; `assets/img/manifest.json`; font licenses. Evidence: packaging includes all assets, including the image-generation manifest; CSS audit finds eight candidates for unused rules. **Fix proposed:** distinguish runtime assets from authoring provenance in an explicit shipping list; keep font licenses. Do not blindly delete palette fallbacks, documentation/design exports or every selector a static matcher calls unused. Nothing deleted. Public manifest contents were not copied into this report.

14. **Lead handling serializes all notifications and grows a log scan over time.** Path: `lead-forward.php` global state lock, dedupe log scan, mail/cURL section. Evidence: the single lock spans validation, durable persistence and up-to-10-second CRM calls; dedupe scans the log. **Fix proposed:** retain current simple behavior at low inquiry volume; before scaling, design per-lead idempotency and a durable notification queue, with safe retention of receipts/logs. Avoid a casual concurrency refactor that risks duplicate notifications or false success. Existing retry/rate-limit tests pass.

## Review coverage and positive findings

- **Code/inquiries:** dependency-free generator, central content/prices, shared page components rather than manually duplicated authored markup. Generated HTML duplication is intentional for static hosting. Direct WhatsApp links work without JavaScript. No payment/booking checkout. PHP validates phone/date/count/enums, escapes restored fields, rate-limits, uses private state and stable receipts, and fails closed if notification/storage fails. Logs and source folders are denied in Apache config. No confirmed broken internal links or anchors.
- **SEO/content:** all generated pages pass unique title/description, canonical, H1, Open Graph and schema assertions; 53 indexable routes match the sitemap; gracias/404 are excluded/noindex. Spanish `es-PY`, voseo, Asunción/Gran Asunción, prices and delivery zones are consistently represented. Commercial, theme, city and guide intent have separate URLs with internal links. Nineteen guide bodies contain **735–892 words**. Main-paragraph five-gram similarity maxima: themes **0.000** across 45 pairs, zones **0.028** across 21 pairs. These narrow checks do not establish content usefulness or search demand. Zones/themes still need actual local evidence over time; nombres/ajuar are broad informational acquisition bets, not proven inquiry sources. No new thin keyword pages added.
- **Performance:** maximum uncompressed HTML + CSS + site JS + calculator **140,043 bytes**; fonts **72,918 bytes** total; image directory **6,929,803 bytes**, not a per-page transfer measurement. Largest WebP is **176,806 bytes**. Responsive AVIF/WebP, dimensions, lazy secondary images and an eager first hero are present. Four self-hosted font faces use swap, with two preloads. Browser scan saw no external requests. CSS compresses to **9,170 bytes Brotli**. No new Lighthouse or real-device mobile-network score is claimed; historical scores are not this run's measurements.
- **Design/UX:** automated inspection of every route at 375/768/1440; visually inspected a new 390px home screenshot. H1, estimated amount and primary WhatsApp CTA are readable in the first view; the long page (~16,697 px at 390px) repeats several conversion opportunities. Pause controls/reduced-motion support exist for the carousel. The mobile sticky bar and floating button are conspicuous; consider reducing overlapping CTA chrome only after observing use. Form focus, keyboard menu/escape, skip link and no-JS submission pass the packaged flow test. No missing alt attributes, broken images, heading skips or duplicate IDs were found; alt quality still deserves editorial review when real photos arrive.
- **Business/legal:** every page offers an inquiry route through shared WhatsApp controls; commercial pages also expose relevant forms. Combo comparison, exclusions, per-guest additions, zone surcharges and custom-quote limits are covered by tests. No fabricated review markup or firm-price Product/Offer inventory is added. Privacy/terms explain inquiry handling and future booking policy; legal enforceability and tax/operator readiness were not certified or rewritten. Response within 24 business hours is an operating commitment to staff, not something a code test can establish.

## Quick wins and bigger business ideas

1. Complete a hosted inquiry receipt check and staff WhatsApp before traffic growth; track qualified inquiries and lost reasons manually while analytics is unconfigured.
2. Review all price estimates and the effective date together, then rebuild. Keep estimated totals, included quantities, exclusions and transport in one shareable WhatsApp quote.
3. Obtain a supplier rate card and backup supplier per actual offer before accepting fulfilment. Prioritize a few deliverable offers over expanding the catalogue.
4. Replace generic trust signals with permissioned, accurately attributed photos and case studies once work exists; log venue constraints, actual cost and customer approval.
5. Use the repository's September 24 Paraguay keyword export to prioritize commercial queries and useful guides. Evaluate guide-to-inquiry conversion before commissioning more names/gift content; no keyword-volume or rank guarantees.
6. Longer term: a quote worksheet with date/zone/guest count, availability status, margin floor and expiry; a consented follow-up month for repeat events; reporting by service/zone and lost-sale reason. Keep medical data out of reveal-color handling.

## Actual validation output and limitations

| Command/check | Actual result |
| --- | --- |
| `git fetch origin` | FAIL first sandbox call (network); PASS approved retry. |
| `git rev-list --left-right --count master...origin/master` | PASS: `0 0`. |
| `git log master..origin/claude/festive-thompson-91te7i` | PASS: empty. |
| Initial `node build-site.mjs` | FAIL: `EPERM ... como-funciona/index.html`; approved rerun PASS. |
| Initial `node verify.mjs --final` | FAIL: VM import SyntaxError; then false SID assertion, both fixed. |
| Verification during hash fix | FAIL: asset-hash assertions still expected raw CRLF bytes; matching normalized assertion added. |
| Final `node build-site.mjs` | `PASS: 53/53 routes; 2 special HTML outputs; 53 sitemap entries.` |
| Final `node verify.mjs --final --http http://127.0.0.1:4185 --zip dist/babyshower-2026-09-26.zip` | Exit 0: `PASS: applicable B5 checks, including executed consent/menu/form/analytics behavior.` Six calculator fixtures pass. Source email confirmation flags remain; they are not proof of absent private hosting config. |
| `powershell -NoProfile -File deploy/make-zip.ps1` (twice) | Both PASS: `188 entries; 53 manifest routes.` Earlier archives preserved. |
| Python stdlib ZIP/path/SHA-256 comparison | PASS: fresh ZIP matches 188 current files; rebuilt entry hashes identical; container bytes differ. Old ZIPs fail current-content equivalence as documented above. |
| `C:/dev/php/php.exe -l lead-forward.php` | `No syntax errors detected in lead-forward.php`. |
| `node docs/qa-tools/php-endpoint.mjs` with fresh `PT_ROOT` | PASS: all 14 checks (labels 1–13, with 7a/7b), including failure, retry, no-JS SID, SMTP sink and rate limit. |
| Initial browser scan | FAIL: missing global Playwright; rerun using installed runtime via `PW_BASE`. |
| Final `node docs/qa-tools/site-scan.mjs http://127.0.0.1:4185` | Exit 0: `scanned 55 routes x 3 widths, 53 unique internal links`; only small-tap-target heuristic findings. No console/page/request errors, broken links/images, overflow, missing alts, bad WhatsApp URLs, heading skips or duplicate IDs. |
| Initial packaged browser flows | FAIL: Windows Archive module could not load; runner fixed. |
| Final `node docs/qa-tools/site-flows.mjs dist/babyshower-2026-09-26.zip` | Exit 0: **18/18 passed**. |
| `node css-audit.mjs` | Initially FAIL `55 !== 34`; final PASS: 55 pages, eight candidate unused rules, focus/animation rules retained. No `--write` used. |
| `git diff --check` | PASS, with ordinary Git LF/CRLF warnings. |

Browser commands used `PW_BASE=C:/Users/anton/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/`, installed Chrome, and local ports only. Test notification email was captured by a local SMTP sink; no message was sent to a person. Temporary synthetic test artifacts and local screenshots were retained rather than deleting files.

Changes are deliberately limited to build/test portability, safer packaging, ignore rules, baseline headers and this review. No design overhaul, business claims/prices rewrite, automatic CSS deletion, remote-branch merge, production form submission, push or deployment. No recursive `codex exec` was launched; the pasted command's review instructions were carried out directly in this workspace. No subagents were used. Apache header enforcement, live redirects/compression, real mail/CRM, Search Console indexing, Lighthouse and full manual accessibility/legal review remain unverified and are not presented as passed.
