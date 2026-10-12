# babyshower.com.py — improvement report (2026-10-12)

Scope: the whole repo on `master` as of commit d985a89. Everything below was checked against the
real files and by running `node build-site.mjs`, `node verify.mjs --final`, `node css-audit.mjs`,
`php -l lead-forward.php` and `node docs/qa-tools/php-endpoint.mjs` (all pass today). Nothing here
was taken from the older `docs/launch-improvement-backlog.md` without re-checking it.

Each item has an ID so you can say "skip 7, 12" when you hand the fix prompt to Opus.
Priority: **P1** = fix before more traffic, **P2** = worth doing this month, **P3** = nice to have.
Effort: S = under an hour, M = a few hours, L = half a day or more.

## What is already good

- Dependency-free generator, one content source (`content.mjs`), deterministic build (a rebuild
  produces zero git diff), 57 routes with unique titles, canonicals, schema and FAQ markup.
- `lead-forward.php` is unusually careful: fail-closed, durable log, idempotent SID receipts, rate
  limit, honeypot, no secrets in the repo. The 13-case endpoint fixture passes on PHP 8.3.
- Self-hosted fonts, AVIF/WebP with `srcset`, `fetchpriority="high"` on the LCP image, no external
  requests before consent.

## Findings

### A. Repo hygiene and developer experience

**1. (P1, S) No root `README.md`.** A new session or collaborator has to read `docs/DEPLOY.md`,
`docs/HOSTINGER-GIT.md`, `AGENTS.md` and `plan/00-README.md` to learn that the built HTML is
committed and that Hostinger clones `master` as-is. Add a README with: what the site is, the
command list, the "built output is committed, always rebuild before committing" rule, repo map,
and links to the deploy docs.

**2. (P1, S) No `package.json`, so no `npm run` entry points.** Commands live only in prose.
Add a `private: true` package with no dependencies, `engines.node >= 22`, and scripts:
`build`, `verify`, `verify:final`, `preview`, `smoke`, `css-audit`, `php:lint`, `php:test`,
`check` (build + verify + php lint + php test). Point the README and `.claude/launch.json` at them.

**3. (P1, S) No `CLAUDE.md`.** `AGENTS.md` is written for Codex workers in a manager/worker
process. Claude Code sessions get no project instructions. Add a short `CLAUDE.md` with the
command list, the generated-files rule, the "never hand-edit `*/index.html`, `sitemap.xml` or the
`SITE DEFAULTS` block in `lead-forward.php`" rule, and the no-secrets rule.

**4. (P1, S) Docs contradict the build.** `docs/DEPLOY.md` (line 34) and `REVIEW.md` say 53
routes; the build prints 57. `.claude/launch.json` uses port 8095 while `docs/DEPLOY.md` says 4173.
Replace hard-coded route counts with "the routes in `docs/routes.json`" and align the port.

**5. (P2, M) Historical material is deployed to the host.** Hostinger Git-deploy clones the
entire repo. `docs/` is 1.5 MB (design canvases, `opus-home-preview.html`, two HANDOFF files,
`next-session/` prompts), plus `codex-input/` and `plan/prompts/`. They are blocked by `.htaccess`
but still land in `public_html` on every deploy. Move finished planning/prompt/handoff material to
`docs/archive/` (or delete it and rely on git history) and keep `docs/` to current operating docs.

**6. (P1, S) Nothing guards against stale generated output.** Someone can edit `content.mjs`,
forget to rebuild, and push HTML that no longer matches. Add a `node verify.mjs --clean` (or
`npm run check`) step that rebuilds and fails if `git status --porcelain` shows changed generated
files. Also add it as an optional `.githooks/pre-push` script (no GitHub Actions minutes needed).
If you want CI, a single workflow on `pull_request` only (Node 22 + PHP, about one minute) is
enough; do not run it on every push to `master`, since the Hostinger webhook already deploys.

**7. (P1, S) `assets/js/motion.js` is dead code shipped on all 57 pages.** It looks for
`[data-reveal]`, `[data-count]` and `[data-sticky-header]`; the generator emits none of those
(0 matches in `build-site.mjs` and in the output). Remove the file and its `<script>` tag. One
fewer request per page view.

**8. (P2, S) Unused CSS.** `node css-audit.mjs` lists 36 "uncertain retained" selectors, among
them `.home-page .dark-band`, `.home-page .hero-desktop`, `.inner-hero .hero-wide`,
`.home-page .theme-heading p`, `.theme-name small`. Delete the ones that have no match in any
generated HTML, then re-run the audit and the build to confirm the CSS hash changes cleanly.

**9. (P2, L) `build-site.mjs` is 339 lines of 200-600 character lines.** Templates, schema,
nav, imagery, fonts and the write loop are all in one file; it is hard to review a diff. Split it
mechanically into `build/` modules (`html.mjs` for `esc`/`link`/`wa`, `chrome.mjs` for header,
footer, WA menu, consent, `pages/*.mjs` per page type, `schema.mjs`, `imagery.mjs`, `fonts.mjs`),
keep `build-site.mjs` as the entry point, and prove the refactor by an empty `git diff` on all
generated files. Do this last and in its own commit.

**10. (P2, S) Legacy phase names drive logic.** Guides are detected with
`r.phase === 'B4'` in `build-site.mjs:18`. Add a `type` field to each row of `docs/routes.json`
(`home`, `guide`, `theme`, `zone`, `service`, `page`) and filter on that; keep `phase` as history
only.

**11. (P2, M) The build mutates two source files in place.** It appends new guides to
`docs/routes.json` and rewrites the `SITE DEFAULTS` block inside the hand-written
`lead-forward.php`. The second one is the risky one: an editor or formatter touching the PHP can
break the marker regex silently. Generate a separate `lead-defaults.php` (`<?php return [...]`)
and `require` it from `lead-forward.php`, so the hand-written file is never machine-edited. Keep
the `.htaccess` deny rules in step (the defaults file is public data anyway).

### B. Security and hosting

**12. (P1, S) Missing security headers.** `.htaccess` sets `X-Content-Type-Options`,
`Referrer-Policy` and `X-Frame-Options` but no `Strict-Transport-Security`, no
`Permissions-Policy` and no `Content-Security-Policy`. Add:
`Strict-Transport-Security "max-age=31536000"` (SSL is already forced),
`Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"`, and a CSP such as
`default-src 'self'; script-src 'self' https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com; img-src 'self' data: https://*.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'`.
`style-src` needs `'unsafe-inline'` only because the font-face block is inline and theme swatches
use `style=""`; moving the font-face rules into `site.css` and the swatch colours into CSS custom
properties lets you drop it. Extend `deploy/smoke.mjs` to assert the new headers.

**13. (P1, S) Rate limiter breaks behind a proxy.** `lead-forward.php` keys the 5-per-minute
limit on `REMOTE_ADDR`. If babyshower.com.py is ever proxied through Cloudflare (your other
domains are on Cloudflare), every visitor shares one IP and the sixth form submission site-wide in
any minute gets a 429. Add a private config key `trusted_proxy` (`'cloudflare'` or a list of
CIDRs); when `REMOTE_ADDR` is inside the trusted ranges, use `CF-Connecting-IP`
(or the last untrusted hop of `X-Forwarded-For`). Never trust the header without that check.
Add a fixture to `docs/qa-tools/php-endpoint.mjs` for both the trusted and the spoofed case.

**14. (P2, S) Notification email is hard to act on.** The email body is raw `key: value` lines
and the subject is always "Nueva consulta Baby Shower". Make the subject
`Consulta: {nombre} · {tipo} · {fecha or "sin fecha"} · {zona}` and put a ready
`https://wa.me/{number}` link as the first line of the body so staff reply in one tap. Keep the
SID and the full field list below. Also set `Reply-To` only if a public mailbox is ever confirmed;
do not invent one.

**15. (P2, S) Email deliverability is unconfigured.** The From is `no-reply@babyshower.com.py`.
Without SPF and DMARC for the domain, Hostinger-sent mail lands in spam. This is a DNS task, not
code: add the SPF include for Hostinger's mail servers and a `p=none` DMARC record, then send one
real test lead (Gate A in `docs/DEPLOY.md`). Document the records in `docs/DEPLOY.md`.

### C. SEO and content

**16. (P1, S) Every page shares the same `og:image`.** All 57 pages use `/assets/img/og.jpg`
even though each guide, theme and service already has its own hero in
`docs/imagery-manifest.json`. Emit the page's placed hero (largest WebP variant) as `og:image`
with its real width/height and alt; fall back to `og.jpg` only for pages without an image. Shared
links on WhatsApp and Instagram will show the right picture.

**17. (P2, S) `sitemap.xml` has no `<lastmod>`.** Guides carry `datePublished`/`dateModified`
in `ideas.mjs`. Write `<lastmod>` for guides from `dateModified` and leave it out for pages
without a real date. Do not fake dates for the rest.

**18. (P2, S) `smoke.mjs` compares the sitemap to the whole manifest.** `locs === manifest.length`
only holds while every manifest row is indexable. Filter the manifest with `built && indexable`
and exclude `/gracias.html` and `/404.html`, matching the build's own rule.

**19. (P3, S) `og.jpg` is 172 KB.** A 1200×630 JPEG at quality 75-80 is usually 70-90 KB.
Re-encode it (or produce it from the same source as the hero) with the webimg pipeline.

### D. Performance and conversion

**20. (P2, S) Home downloads all three hero slides on load.** `site.js` unhides slides 2 and 3
in `activate()` on `window.load`; the generated `<img>` for those slides has no `loading="lazy"`,
so two extra ~130-170 KB images are fetched on every home visit, including for visitors who leave
before the first 6-second rotation. Keep slide 1 eager; give slides 2 and 3 `loading="lazy"` and
only unhide the next slide right before its transition (call `img.decode()` first so the fade is
not blank). Under `prefers-reduced-motion` never unhide them.

**21. (P2, M) Calculator state does not reach the enquiry form.** On `/combos-y-precios/` the
visitor configures combo, guests, add-ons and zone, then the form below starts empty except for
`tipo`. Listen for calculator updates and pre-fill `invitados`, `zona` and a one-line summary at
the top of `mensaje` (editable, never overwriting text the user typed). No new fields, no new
server validation.

**22. (P2, S) Analytics is a dead switch until an ID exists.** `ANALYTICS_ID = ''` means the
consent banner, the GA loader and `thanksConversion()` never run; the code paths are untested in
production. This is an owner input, not a code fix: pick the GA4 property, set the ID, rebuild and
run the consent accept/reject/revoke fixture in `verify.mjs`. Until then nothing measures
WhatsApp clicks or form conversions, so paid traffic cannot be evaluated.

**23. (P3, M) `verify.mjs` is a 683-line bespoke harness.** It works, but failures print as
free text and there is no per-check timing or filtering. Moving the checks to `node:test`
(`node --test verify/`) gives TAP output, `--test-name-pattern`, and lets the pre-push hook and
any CI parse results. Optional; do it only after items 6 and 9.

## Suggested order

1. Quick P1 batch, one commit each: 7, 16, 12, 13, 18, 4, 1, 2, 3, 6.
2. P2 code: 20, 17, 14, 10, 8, 21, 11, 5.
3. Owner tasks (no code): 15, 22, then the Gate A real-lead test from `docs/DEPLOY.md`.
4. Optional refactors last: 9, 23, 19.

The matching Opus prompt is in `docs/next-session/opus-fix-prompt.md`.
