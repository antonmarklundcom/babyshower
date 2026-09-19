# babyshower.com.py — plan index

Status 2026-09-19: planning complete (Fable 5.1, with Codex gpt-6-astra low critique merged). No site code exists yet. Next step is Phase 0 prerequisites (Anton) in parallel with build phases B1–B5 (Codex).

Revision authority: `10-REVISION-V2.md`; read it first, then BUILD-SPEC §0. Manifest snapshot: 32 routes, 31 non-root route directories inside 11 top-level route directories, 34 HTML files; derive operational counts from docs/routes.json.

## Read in this order

1. `01-MASTER-PLAN.md` — the business: verdict on the Gemini brief, economics, brand, offers, sitemap, funnel, acquisition, roadmap, and the Sonnet-vs-Codex recommendation.
2. `02-BUILD-SPEC.md` — what the worker builds. Tokens, global elements, WhatsApp contract, calculator, route inventory, JSON-LD, lead endpoint, verification, file tree.
3. `03-EXECUTION.md` — how to run the build. Mode A (Codex direct, one command per phase) or Mode B (Sonnet directs Codex) or Mode C (Sonnet builds directly). Phases B1–B7 with verification commands.
4. `04-CONTENT-AND-COPY.md` — the Spanish copy, policies, FAQs, theme/zone/guide seeds, WhatsApp scripts.
5. `05-ADS-AND-SEO.md` — keyword clusters from the KWP table, Ads campaign and negatives, tracking on a static site, organic plan.
6. `06-OPS-PLAYBOOK.md` — launch gates, supplier agreement, order sheet, booking timeline, day-of checklist, reviews.
7. `07-IMAGERY.md` — 30 Higgsfield image slots and prompts (phase B7, after the build).
8. `08-OPEN-QUESTIONS.md` — 21 questions for Anton with the defaults the build assumes.
9. `prompts/` — B1–B5, BUILD-ALL, SONNET-FINAL (the one to paste in a new Sonnet window, with the design export attached), SONNET-DIRECTOR, SONNET-BUILDER variants, CODEX-REVIEW, DESIGN-FINAL-1..3 (standalone Claude Design prompts), fix-template.

Inputs kept for reference: `../BRIEF.md` (Gemini), `../codex-input/CODEX-CRITIQUE.md` (Codex second brain, 5.9k words).

## Quick start without Fable

Mode A, from PowerShell:

```powershell
& "$env:USERPROFILE\.claude\skills\manager-worker-codex\scripts\codex-run.ps1" -Repo "C:\Claude 1\babyshower" -Tier normal -PromptFile "C:\Claude 1\babyshower\plan\prompts\B1.txt"
```

Then `node build-site.mjs; node verify.mjs --phase B1` in the repo. Repeat for B2…B5 with the matching --phase flag; B5 also runs --final and the PowerShell zip script. Then a short Sonnet session with `prompts/SONNET-DIRECTOR.txt` (or only its step 4) for the browser QA gate.

Mode B: open a Sonnet 5 session in this folder and paste `prompts/SONNET-DIRECTOR.txt`.

Mode C: use `prompts/SONNET-BUILDER.txt`, or `prompts/SONNET-BUILDER-WITH-DESIGN.txt` with the chosen export. Its home composition governs modes A/B/C.

## Non-negotiables carried from the house skills

Static HTML on Hostinger, no CI minutes · WhatsApp-first, voseo · no fabricated proof · AI images labelled illustrative · prices in one config with a version date · Codex at low effort unless Anton says otherwise · Fable never spawned.
