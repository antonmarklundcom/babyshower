# Run prompt for Opus 5.5 (high) — apply all 2026-10-12 fixes with Sonnet 5.5 sub-agents

Paste everything below the line into a fresh Opus 5.5 session on `antonmarklundcom/babyshower`.

---

Apply every fix in the 2026-10-12 improvement report for this repo. Both documents live on the
branch `claude/admiring-hypatia-4fh5bf`:

- `docs/improvement-report-2026-10-12.md` (findings with evidence)
- `docs/next-session/opus-fix-prompt.md` (task-by-task instructions, ground rules, commands)

Start with `git fetch origin && git checkout -b improvements-2026-10 origin/master && git merge origin/claude/admiring-hypatia-4fh5bf`, then read both files completely. The fix prompt's ground rules apply as written; the only change is the execution plan below. Do all tasks, including the optional batch 3 and the "archive stale material" task. Only tasks 15 and 22 are owner tasks and stay undone.

## Execution plan

The whole site is generated: `*/index.html`, `404.html`, `gracias.html`, `sitemap.xml` and the
`SITE DEFAULTS` block in `lead-forward.php` are rebuilt by `node build-site.mjs`. Any two branches
that both rebuild will conflict on 59 files. So:

**Lane 1, you (Opus), sequential in the main checkout.** Every task that edits `build-site.mjs`,
`site.js`, `calc.js` or `lead-forward.php`: 7, 16, 12, 13, 20, 17, 14, 10, 11, 21, then 9 and 23
last. One commit per task, build and the four checks before each commit, exactly as the fix prompt
says. Task 9 must leave every generated file byte-identical; prove it with `git diff --stat`.

**Lane 2, Sonnet 5.5 sub-agents, in parallel, each in its own git worktree.** Launch these as
soon as you have read the documents, with `model: sonnet`, one agent per task, before you start
lane 1. Each gets: the full text of its task from `opus-fix-prompt.md`, the ground rules, the
list of files it may touch, and this rule: **you may run `node build-site.mjs` and
`node verify.mjs --final` to check your work, but before committing run
`git checkout -- '*/index.html' 404.html gracias.html sitemap.xml lead-forward.php docs/routes.json`
so your commit contains source changes only.** The agent reports files changed, commands run with
PASS/FAIL, and anything it could not do.

- Task 1 (README.md) and task 3 (CLAUDE.md): one agent, those two files only.
- Task 2 (package.json plus `.claude/launch.json` and README command list): one agent. It runs
  after the README agent finishes, so it edits the README that exists.
- Task 4 (doc drift in `docs/DEPLOY.md`, `REVIEW.md`, `.claude/launch.json` port): one agent.
  Give it the port value you chose for task 2 so both agree.
- Task 18 (`deploy/smoke.mjs` sitemap rule): one agent, that file only.
- Task 8 (unused CSS in `assets/css/site.css`): one agent. It must grep the generated HTML for
  every selector before deleting and report before/after counts from `node css-audit.mjs`.
- Task 5 (archive stale material with `git mv`): one agent. It must fix relative links in moved
  files and must not delete anything.
- Task 6 (`scripts/check-clean.mjs`, `.githooks/pre-push`, README line): one agent, after task 2
  exists, because the hook calls `npm run check`.
- Task 19 (`og.jpg` re-encode): one agent, that one file. Report the before and after bytes.

Merge each lane 2 branch into `improvements-2026-10` as it comes back, in this order:
1, 2, 6, 4, 18, 8, 5, 19. After each merge run `node build-site.mjs` and the four checks, and
if the build changed generated files (it will after 8 and 2), commit the rebuilt output as
`Rebuild after task N`. Resolve any conflict yourself; if a Sonnet result is wrong or incomplete,
fix it yourself rather than re-dispatching more than once.

Never use a Fable or Mythos model for any sub-agent; Sonnet 5.5 for lane 2, you do lane 1.

## When everything is merged

1. Run the full check one last time from a clean build and confirm `git status --porcelain` is
   empty.
2. Run `node deploy/smoke.mjs http://127.0.0.1:4173` against `node preview-server.mjs` for the
   route and sitemap checks (the header checks will fail on the static preview; say so, do not
   mark them as passed).
3. Push `improvements-2026-10` with `git push -u origin improvements-2026-10`. Do not open a pull
   request and do not touch `master`.
4. Report to me in under 40 lines: each task ID with its commit hash and which lane did it, the
   final output of the four checks, what you skipped or changed from the plan and why, and the
   two owner tasks (15 SPF/DMARC, 22 GA4 ID) as reminders.
