# Prompt for Opus 5.5 — apply the 2026-10-12 improvement report

Copy everything below the line into a fresh Claude Code session on the `babyshower` repo.
Delete any task you do not want before pasting; task IDs match `docs/improvement-report-2026-10-12.md`.

---

You are working in the repo `antonmarklundcom/babyshower`, a static HTML + PHP site for
babyshower.com.py. Read `docs/improvement-report-2026-10-12.md` first; it has the evidence for
every task below. Then do the tasks in the order given, one commit per task, on a new branch
`improvements-2026-10`. Do not open a pull request unless I ask.

## Ground rules

- The generated HTML (`*/index.html`, `404.html`, `gracias.html`, `sitemap.xml`) and the
  `SITE DEFAULTS` block in `lead-forward.php` are build outputs. Never hand-edit them. Change the
  source (`content.mjs`, `ideas.mjs`, `themes.mjs`, `zones.mjs`, `build-site.mjs`,
  `assets/css/site.css`, `assets/js/*.js`) and run `node build-site.mjs`.
- Before every commit run, from the repo root, and paste the last line of each into the commit
  body only if something is noteworthy:
  `node build-site.mjs`, `node verify.mjs --final`, `php -l lead-forward.php`,
  `node docs/qa-tools/php-endpoint.mjs`. All four must pass. If one fails, fix it or stop and
  tell me; do not skip or weaken a check to get green.
- After the build, `git status --porcelain` must show only files you intended to change.
- Hostinger deploys `master` by cloning the repo, so no build step exists on the server and
  nothing may depend on `node_modules`. Add no npm dependencies.
- No secrets, emails, API keys or real lead data anywhere, including docs and fixtures. The
  private config lives outside the repo; keep `deploy/vendercrm-config.example.php` as the only
  example.
- Do not change prices, copy, WhatsApp number or `PRICES.effectiveDate`.
- Keep changes minimal and scoped to the task. No drive-by refactors; task 9 is the only refactor.
- Language: code comments and new docs in English, site copy stays es-PY voseo.
- When done, list for me: each task ID with its commit hash, anything you skipped and why, and
  anything you want me to decide. Keep that report under 40 lines.

## Tasks

### Batch 1 — P1 quick wins (one commit each)

**7. Remove dead `motion.js`.** Confirm with grep that `data-reveal`, `data-count` and
`data-sticky-header` appear nowhere in `build-site.mjs` or generated HTML. Delete
`assets/js/motion.js`, its entry in `ASSET_V` and the `<script>` tag in `render()`. Rebuild; all
57 pages drop one script.

**16. Per-page `og:image`.** In `build-site.mjs`, when a page has a placed hero image (the same
lookup `serviceHero`, theme pages and guides already use via `docs/imagery-manifest.json` and
`assets/img/manifest.json`), emit that image's largest WebP variant as absolute `og:image` with
its real `og:image:width`, `og:image:height` and `og:image:alt`. Pages without an image keep
`/assets/img/og.jpg`. Add a verify check that every guide, theme and service page has a non-default
`og:image`.

**12. Security headers.** In `.htaccess` add `Strict-Transport-Security "max-age=31536000"`,
`Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"` and a
`Content-Security-Policy`:
`default-src 'self'; script-src 'self' https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com; img-src 'self' data: https://*.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'`.
Then move the inline `@font-face` block from `render()` into the top of `assets/css/site.css`
(keep the two `<link rel="preload">` tags) and replace the theme-swatch `style="background-color"`
attributes with a CSS custom property set the same way, so that `'unsafe-inline'` can be dropped
from `style-src`. If the data: favicon or anything else still needs it, keep `'unsafe-inline'` and
tell me why. Extend `deploy/smoke.mjs` to assert all three headers on `/`. The GA hosts stay in
the policy even though `ANALYTICS_ID` is empty today.

**13. Proxy-aware rate limiting.** In `lead-forward.php`, read an optional
`trusted_proxy` key from the private config: `'cloudflare'` or an array of CIDR strings. Resolve
the client IP as: if `REMOTE_ADDR` is inside a trusted range, use `CF-Connecting-IP` when
`trusted_proxy === 'cloudflare'`, otherwise the right-most untrusted address in
`X-Forwarded-For`; else use `REMOTE_ADDR`. Embed Cloudflare's published IPv4 and IPv6 ranges as a
constant with a comment on where they come from. Never trust the headers when `REMOTE_ADDR` is not
in a trusted range. Add the key with a comment to `deploy/vendercrm-config.example.php`. Add two
fixtures to `docs/qa-tools/php-endpoint.mjs`: trusted proxy with distinct `CF-Connecting-IP`
values gets separate limits; untrusted `REMOTE_ADDR` with a spoofed header is still limited by
`REMOTE_ADDR`. Document the key in `docs/DEPLOY.md`.

**18. Smoke test sitemap rule.** In `deploy/smoke.mjs`, compare the sitemap against manifest rows
with `built && indexable`, excluding `/gracias.html` and `/404.html`, mirroring the build. Also
iterate routes from that filtered list.

**4. Fix doc drift.** In `docs/DEPLOY.md` and `REVIEW.md` replace hard-coded "53 rutas/routes"
with wording that points to `docs/routes.json`. Align the preview port: make
`.claude/launch.json` and `docs/DEPLOY.md` both use 4173 (or both 8095, your choice, but one
value). Do not rewrite the rest of those docs.

**1. Root `README.md`.** Write it in English, under 120 lines: what the site is (one
paragraph), stack (static HTML generated by Node 22, PHP 8.1+ endpoint, Hostinger Git deploy of
`master`), the command list from task 2, the "generated output is committed; always rebuild"
rule, a repo map (source files, generated folders, `docs/`, `deploy/`, `plan/`), and links to
`docs/DEPLOY.md`, `docs/HOSTINGER-GIT.md`, `docs/NEW-ARTICLE.md`. No secrets, no emails.

**2. `package.json` with scripts.** Create a dependency-free `package.json`:
`"private": true`, `"type": "module"`, `"engines": {"node": ">=22"}`, scripts
`build`, `verify` (`node verify.mjs --phase B5`), `verify:final`, `preview`
(`node preview-server.mjs`), `smoke`, `css-audit`, `php:lint` (`php -l lead-forward.php`),
`php:test` (`node docs/qa-tools/php-endpoint.mjs`) and `check` that runs build, verify:final,
php:lint and php:test in sequence. Make sure adding `"type": "module"` does not change how any
existing `.mjs` or `.js` file is loaded (the browser JS is plain scripts; the Node files are
already `.mjs`). Update README and `.claude/launch.json` to use the scripts.

**3. `CLAUDE.md`.** Under 40 lines: the `npm run` commands, the generated-files rule, the
"rebuild before commit and keep `git status` clean" rule, "no secrets", "no new dependencies",
"site copy is es-PY voseo", and a pointer to `AGENTS.md` for the Codex worker process.

**6. Stale-output guard.** Add `scripts/check-clean.mjs` that runs the build and fails with a
file list if `git status --porcelain` shows any changed generated file. Wire it as
`npm run check:clean` and include it in `npm run check`. Add `.githooks/pre-push` that runs
`npm run check`, plus a README line on `git config core.hooksPath .githooks`. Do not add a GitHub
Actions workflow; if you think one is worth it, write the YAML to
`docs/next-session/ci-proposal.yml` and explain in your report instead of enabling it.

### Batch 2 — P2 code

**20. Lazy hero slides.** In `build-site.mjs` `heroSlides()`, give slides 2 and 3
`loading="lazy"` (slide 1 stays eager with `fetchpriority="high"`). In `site.js`, stop unhiding
all slides on `load`; unhide and decode only the next slide roughly one second before `go()`
runs, and never under `prefers-reduced-motion` when the user has not pressed play. Keep the dot
and pause controls working, and keep slide 1 visible with JavaScript disabled. Verify with the
existing hero checks in `verify.mjs` and add one that slides 2 and 3 carry `loading="lazy"`.

**17. Sitemap `lastmod`.** For guide routes write `<lastmod>` from the guide's
`dateModified || datePublished` in `ideas.mjs`. Other routes get no `lastmod`. Add a verify check
that every guide URL in `sitemap.xml` has a valid `YYYY-MM-DD` lastmod.

**14. Actionable notification email.** In `lead-forward.php` build the subject as
`Consulta: {nombre} · {tipo label} · {fecha or 'sin fecha'} · {zona}` (strip CR/LF and cap at
120 chars; header injection must stay impossible) and start the body with a
`https://wa.me/{whatsapp}` line, then the SID, then the existing field list. Do not add
`Reply-To`. Update the fixture in `docs/qa-tools/php-endpoint.mjs` if it inspects the mail body.

**10. Route `type` instead of phase.** Add a `type` field to each row of `docs/routes.json`
(`home`, `guide`, `theme`, `zone`, `service`, `services`, `ideas`, `themes`, `zones`, `page`) and
use it in `build-site.mjs` and `verify.mjs` wherever `phase === 'B4'` or similar is used to
classify routes. Keep `phase` in the file untouched. Build output must be byte-identical before
and after (prove it with `git diff --stat` on generated files being empty for this commit).

**8. Remove unused CSS.** Run `node css-audit.mjs`. For every selector it reports, grep the
generated HTML for the class or element; delete rules that match nothing (expected candidates:
`.home-page .dark-band`, `.home-page .hero-desktop`, `.inner-hero .hero-wide`,
`.home-page .theme-heading p`, `.theme-name small`, `.home-page .home-inclusions` if unmatched).
Keep anything used only via JavaScript (`is-open`, `is-stuck`, `is-leaving`, `hero-controls`,
`data-form-fallback` styles, consent classes). Rebuild and re-run the audit; report the before
and after count.

**21. Calculator to form hand-off.** On pages that render both the calculator and the quote
form, make `calc.js` dispatch a `bs:calc-update` event with `{packageName, guests, zone, addons,
total}` on every update. In `site.js`, pre-fill `invitados` and `zona` when those fields are
still empty, and insert a one-line summary (`Combo Estrella, 30 invitados, zona Luque, adicionales:
torta`) as the first line of `mensaje` only if the user has not typed anything yet; replace that
line on later updates but never touch user text. No new fields and no server changes. Add a
rendered check in `verify.mjs` for the pre-fill.

**11. Stop machine-editing `lead-forward.php`.** Have the build write
`lead-defaults.php` (`<?php return '<base64>';` or a plain PHP array) and change
`lead-forward.php` to `require __DIR__ . '/lead-defaults.php'`. Remove the `SITE DEFAULTS`
marker block and the regex replacement in `build-site.mjs`. Keep the file committed and keep the
`.htaccess` `FilesMatch` rules unchanged (it is public data). Update `deploy/make-zip.ps1` so the
ZIP includes the new file, and update `docs/DEPLOY.md`. All PHP fixtures must still pass.

**5. Archive stale material.** Move `codex-input/`, `docs/HANDOFF-*.md`,
`docs/design-*.html`, `docs/design-mix-home/`, `docs/design-canvas-export.html`,
`docs/opus-home-preview.html`, `docs/triage-178-ideas.md`, `docs/codex-review-ideas.md` and
`plan/prompts/` into `docs/archive/` using `git mv`, keeping their names. Leave `plan/0*.md`,
`docs/kwp/`, `docs/qa-tools/`, `docs/routes.json`, `docs/imagery-manifest.json`, the QA reports
and the current operating docs where they are. Update the `.htaccess` deny rule so
`docs/archive` is still blocked (it already is via `docs/`), and fix any relative links in the
moved files that now break. Do not delete anything.

### Batch 3 — optional, only if I did not remove them

**9. Split `build-site.mjs`.** Mechanical refactor into `build/html.mjs`, `build/chrome.mjs`,
`build/schema.mjs`, `build/imagery.mjs`, `build/fonts.mjs`, `build/pages/*.mjs`, with
`build-site.mjs` as the entry point. No behaviour change: the commit must leave every generated
file byte-identical (empty `git diff` on `**/index.html`, `sitemap.xml`, `lead-defaults.php`).
Keep functions' names so `verify.mjs` imports, if any, still resolve. One commit.

**23. `node:test` harness.** Only after 6 and 9. Move `verify.mjs` checks into `verify/*.test.mjs`
runnable with `node --test verify/`, keep `node verify.mjs --final` working as a thin wrapper, and
make `npm run verify:final` use the new runner.

**19. Smaller `og.jpg`.** Re-encode `assets/img/og.jpg` at 1200×630, quality 78, progressive,
target under 95 KB, using the webimg CLI if available or `sharp` via `npx` without adding it to
the repo. Keep the same filename.

### Owner tasks (do not do these, just leave them in your final report)

- **15.** Add SPF and DMARC DNS records for babyshower.com.py so Hostinger mail is not marked
  spam, then run the Gate A real-lead test from `docs/DEPLOY.md`.
- **22.** Choose the GA4 property, set `ANALYTICS_ID` in `content.mjs`, rebuild and run the
  consent fixtures.
