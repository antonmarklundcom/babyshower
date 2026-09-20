# Fable 5.1 review (open the Fable window yourself, working folder C:\Claude 1\babyshower)

Fable only runs in a window you open by hand (fable-cost-guardrail): never from a script or subagent. Read-only review; it must not write site code and must not dispatch Codex.

Start the preview first, in a terminal:

```bash
cd "C:/Claude 1/babyshower" && PORT=4185 node preview-server.mjs
```

Then paste into Fable:

```text
You are the reviewer of record for babyshower.com.py, the repo is C:\Claude 1\babyshower (branch master, HEAD 72d22df). Do not write site code, do not edit any file except the one review file named below, and do not dispatch Codex. A local preview runs at http://127.0.0.1:4185/ (if it is not running: cd to the repo and run PORT=4185 node preview-server.mjs). Do not use port 4190. The site is a static inquiry-only launch (no supplier, no RUC, prices are estimates, every lead goes to WhatsApp +595 992 279 599; audience: expectant mothers 24 to 38 in Gran Asuncion on Android phones on mobile data). Codex gpt-6-astra (low effort) wrote the code, Sonnet 5 managed and audited it.

Read: docs/HANDOFF-2026-09-20-b.md, docs/HANDOFF-2026-09-20.md, docs/log/build.md (every entry, especially the REVISAR paragraphs), plan/02-BUILD-SPEC.md section 0, plan/04-CONTENT-AND-COPY.md, plan/08-OPEN-QUESTIONS.md, plan/10-REVISION-V2.md, docs/triage-178-ideas.md (your own revision 2), content.mjs, themes.mjs, zones.mjs, build-site.mjs, assets/css/site.css, assets/js/*.js, lead-forward.php, deploy/DEPLOY.md, docs/design-mix-home/ (the approved design). Browse the live preview at 375 px and 1280 px (the app browser pane or node docs/qa-tools/shots.mjs <url> <width> <prefix>).

Deliver in docs/review-fable-2026-09-XX.md (replace XX with the day) and a summary in chat, in this order:
1. Claims audit: every sentence on the home page, the three combo cards, the calculator, the FAQ, the zones panel, the contact section and the legal pages: anything that promises more than an inquiry-only, no-supplier business can deliver, any popularity or urgency claim, any wording that conflicts with section 0. Quote the string and the file.
2. Conversion review of the home page as built (photo hero, price block, tinted pricing cards, Estrella first on mobile, coral button only on Estrella, calculator, ribbon): what a mother on Android on mobile data does in the first 10 seconds; the ten highest-value changes, ranked, that do not reverse section 0. Say plainly where you disagree with the design or with Codex.
3. Correctness review of the code: lead-forward.php (validation, spam handling, log, email, failure states), assets/js/calc.js against the price rules in content.mjs, tracking and consent behaviour, WhatsApp link construction (encoding, length, no personal data in analytics parameters), SEO metadata, sitemap, robots, schema. Point to file and line. Distinguish confirmed defects from suspicions.
4. Everything still missing before the site can go public (Gate A): separate what only Anton can do from what the manager can dispatch.
5. Decisions for Anton, each with your recommendation and the reason: D1, D4, D5, D6, D8, D9, D10, D11 and the three unresolved image items.
Be specific about files. Do not restate the plan. Do not pad.
```

## Codex 6.0 astra review (read-only, after or instead of Fable)

Default effort is low. Use high only if you decide so yourself: change `-Tier normal` to `-Tier hard` in the command.

```bash
powershell -NoProfile -ExecutionPolicy Bypass -File "$USERPROFILE/.claude/skills/manager-worker-codex/scripts/codex-run.ps1" -Repo "C:\Claude 1\babyshower" -Tier normal -Sandbox read-only -PromptFile "C:\Claude 1\babyshower\docs\next-session\codex-review-prompt.txt"
```

The prompt file is `docs/next-session/codex-review-prompt.txt`; the report is printed by the script and the full log is saved under `%TEMP%\codex-runs\`.
