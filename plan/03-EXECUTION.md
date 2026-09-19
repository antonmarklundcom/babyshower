# 03 — Execution plan (works with Sonnet-directs-Codex OR Codex-direct)

Manager of record for planning: Fable 5.1. Fable does NOT run the build. Builder: Codex CLI `gpt-6-astra`, reasoning effort `low`, always. High effort only if Anton says so in the conversation.

## Mode A — Codex direct (recommended for B1–B5, cheapest)

Anton opens PowerShell in `C:\Claude 1\babyshower` and runs one phase at a time with the dispatch script:

```powershell
& "$env:USERPROFILE\.claude\skills\manager-worker-codex\scripts\codex-run.ps1" -Repo "C:\Claude 1\babyshower" -Tier normal -PromptFile "C:\Claude 1\babyshower\plan\prompts\B1.txt"
```

Then runs the verification block of that phase himself (below). If it fails, resume the printed session id with the exact error text in a file:

```powershell
& "$env:USERPROFILE\.claude\skills\manager-worker-codex\scripts\codex-run.ps1" -Repo "C:\Claude 1\babyshower" -Resume "<session id>" -Tier normal -PromptFile "C:\Claude 1\babyshower\plan\prompts\fix.txt"
```

Phase prompts live in `plan/prompts/B1.txt` … `B5.txt` (no double quotes inside, multi-line, fed over stdin by the script). Each prompt tells Codex to read `AGENTS.md`, `plan/02-BUILD-SPEC.md`, `plan/04-CONTENT-AND-COPY.md` and only the sections it needs.

Alternative single-shot: `plan/prompts/BUILD-ALL.txt` runs B1–B5 in one session. Use only if Anton prefers fewer interactions; a failure mid-way is harder to resume cleanly.

## Mode B — Sonnet directs Codex

Open a Sonnet 5 session in this folder with the prompt in `plan/prompts/SONNET-DIRECTOR.txt`. Sonnet follows the manager-worker-codex skill: dispatches B1–B5 to Codex normal tier, runs each verification block, resumes on failure, and runs the browser QA gate (B6) itself because Codex has no browser here. Sonnet never writes site code itself beyond trivial fixes. Sonnet must not spawn Fable (fable-cost-guardrail).

## Mode C — Sonnet builds directly (added 2026-09-19, while Codex quota is out)

Allowed: the fable-cost-guardrail only forbids Fable as a builder. Open a Sonnet 5 session in this folder with `plan/prompts/SONNET-BUILDER.txt`. Sonnet loads the fable-directs-sonnet-builds skill pattern in reverse: it reads the BUILD-SPEC, implements phases B1 and B2 itself (optionally B3–B5), runs each verification block, and writes `docs/log/build.md`. When Codex quota returns, Codex reviews the plan with `plan/prompts/CODEX-REVIEW.txt`, and later phases can go back to Mode A. Sonnet still never spawns Fable.

## Git

Initialise a local git repo at the start of B1 and commit after every passing phase. Push to private GitHub repo `anton/babyshower-com-py` as backup (Q18 if different). No GitHub Actions and no PR checks: the budgeted-runner rule keeps runners out of the deploy path, and `verify.mjs` plus the B6 gate are the checks. Deploy stays manual via the Hostinger File Manager zip (or Hostinger's Git deploy webhook later, which is free and needs no runners).

## When to prefer which

- Anton has time to run 6 commands and eyeball results: Mode A, then a short Sonnet session only for B6 (QA gate with Lighthouse and screenshots).
- Anton wants hands-off: Mode B.
- Never both on the same phase at the same time.

## Phases

Read BUILD-SPEC §0 first. Precedence: §0 > 04 copy > design export (composition) > BUILD-SPEC §6 section list. Selected docs/design-canvas-export.html governs / in modes A/B/C; inner pages reuse components, until selection B1 uses §6 patterns.

Every phase: You may regenerate every output HTML file the generator produces. Authored source edits are limited to the files listed. Each phase may append its own docs/log/build.md entry; manager or Anton adds session id/model/effort from dispatch output, never invented.

Manifest snapshot: 32 routes, 31 non-root route directories inside 11 top-level route directories, 34 HTML files. Derive totals, sitemap and SHIP list from docs/routes.json (route, output, phase B1..B4, indexable, built). Cumulative built B1/B2/B3/B4 = 6/9/26/32. verify --phase B1..B5 reads built flags; links to built:false are allowed only for manifest targets; --final rejects any built:false.

### B1 — Skeleton and generator
Scope: `content.mjs` (SITE, WA_NUMBER, NAV, PACKAGES, ADDONS, ZONES, WA_MENU, POLICY texts, FAQ arrays), `build-site.mjs` with layout, header, footer, FAB, WhatsApp panel, consent banner, JSON-LD helpers; `assets/css/site.css` with resolved tokens; `assets/js/site.js`, `assets/js/motion.js` (verbatim copy); `docs/routes.json`; `verify.mjs`; `.gitignore`; `robots.txt`; `.htaccess` written fresh per BUILD-SPEC; `assets/img/favicon.svg` allowed (inline SVG data URI favicon); `docs/log/build.md`. Render `/`, `/como-funciona/`, `/contacto/`, `/preguntas-frecuentes/`, `/privacidad/`, `/terminos/`, `404.html`, `gracias.html` with real copy from 04.
Verify:
```
node build-site.mjs
node verify.mjs --phase B1
```
Both exit 0. `verify.mjs` may temporarily allow the routes not yet built by reading `docs/routes.json` `built: false` flags.

### B2 — Packages, calculator, reveal, añito
Scope: `/combos-y-precios/`, `/revelacion-de-genero/`, `/primer-anito/`, `assets/js/calc.js`, calculator on `/`. Service graph per BUILD-SPEC §7.
Verify: `node build-site.mjs`, `node verify.mjs --phase B2`, `node verify.mjs --phase B2 --calc` with all six fixtures and edges in BUILD-SPEC §5.

### B3 — Themes and zones
Scope: `themes.mjs`, `zones.mjs`, 10 theme pages, 5 zone pages, both hubs. Unique paragraphs per page from 04; no city-name swapping.
Verify: `node build-site.mjs`, `node verify.mjs --phase B3`, `node verify.mjs --phase B3 --uniqueness`: normalised main paragraphs, 5-gram sets, Jaccard ≥0.60 fails within themes or zones.

### B4 — Ideas hub and guides
Scope: `ideas.mjs`, 5 guide pages, hub. Article JSON-LD. 700–1000 words each.
Verify: `node build-site.mjs`, `node verify.mjs --phase B4`, `node verify.mjs --phase B4 --words`; main article only, 700–1000 inclusive excluding header/footer/nav/CTA cards/FAQ.

### B5 — Lead endpoint, sitemap, deploy zip
Scope: lead-forward.php, deploy/vendercrm-config.example.php, deploy/make-zip.ps1, build-site.mjs (sitemap and contact renderer for error display), assets/js/site.js, sitemap.xml, docs/DEPLOY.md, docs/log/build.md, preview-server.mjs, .gitignore. The zip SHIP list derives from manifest plus fixed files; include dotfiles, flat archive; print entry count and fail on any missing route. Config one level above public_html: vendercrm-config.babyshower.php. Never commit real config.
Verify, in PowerShell:

- node build-site.mjs
- node verify.mjs --phase B5
- node verify.mjs --final
- powershell -NoProfile -File deploy/make-zip.ps1

Archive inspection uses .NET System.IO.Compression.ZipFile, not bash/unzip. Compare entries with manifest outputs plus fixed ship list. Record php -l lead-forward.php as not available locally; hosted PHP form test belongs to Anton at Gate A (real submission on addon domain, email + log).

### B6 — QA gate checklist (browser: Sonnet or Anton; no prompt file)
- Serve with node preview-server.mjs; HTTP-check every canonical route from the manifest (snapshot 32) plus /404.html and /gracias.html. Check canonical pages and thanks return success, 404 handler returns 404, and a missing URL uses the custom 404. Check gracias noindex and sitemap exclusion.
- Extract zip and repeat route checks on the preview server.
- Run web-design-system/references/qa-runner.md once: Lighthouse mobile once and audit script; 360px screenshots of /, /combos-y-precios/, /revelacion-de-genero/, one theme, one zone. Compare home to selected design export.
- Check no unresolved text, all calculator fixtures/edges, WhatsApp text and links with JS disabled, consent accept/reject/revoke and zero tags before consent, debounced events and server-success-only form_submit, sticky bar/FAB not covering CTAs, mobile comparison table and theme strip scrolling, WCAG contrast ratios.
- Fixes return to the source-owning phase via resume; generated HTML may all regenerate. Hosted PHP email + log test is separately owned by Anton at Gate A.

### B7 — Imagery (separate, after Anton generates images)
Follow `07-IMAGERY.md` and the higgsfield-image-pipeline skill. Codex phase: place WebP files, update alt text, replace placeholder panels, rebuild, re-zip.

## Definition of done for the whole build
- All B1–B6 verification blocks pass.
- `dist/babyshower-<date>.zip` extracted into a local folder passes B6 HTTP checks for every manifest route plus 404 and gracias.
- Each phase appends its own `docs/log/build.md` entry; manager or Anton adds session id, model and effort from dispatch output, never invented.
- Flagged items (estimated prices, confirmed notification email, fonts fallback) listed in `docs/log/build.md` under "Antes de publicar".
