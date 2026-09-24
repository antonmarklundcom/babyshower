# Hostinger Git deploy (babyshower.com.py)

The repo root is the site: the built HTML is committed, Hostinger runs no build. Git deploy
clones the whole repo into `public_html`; `.htaccess` answers 403 (with the 404 page) for
`.git`, dotfiles, `plan/`, `docs/`, `codex-input/`, `deploy/`, `*.md`, `*.mjs` and `*.ps1`.
This file is therefore not public either.

## Once, in hPanel (Anton)

1. **SSL first.** hPanel > Websites > babyshower.com.py > Security > SSL: install the free
   certificate. `.htaccess` forces `https://babyshower.com.py`, so without SSL the site will not load.
2. **PHP.** Advanced > PHP Configuration: PHP 8.3 (8.1+ works). `mail` and `curl` stay enabled.
3. **Empty `public_html`.** File Manager: delete the default `default.php` / `index.php` there.
   Git deploy refuses a non-empty folder.
4. **Connect the repo.** Advanced > Git:
   - Repository: `https://github.com/antonmarklundcom/babyshower.git`
     (if the repo is private: use `git@github.com:antonmarklundcom/babyshower.git`, copy the SSH key
     hPanel shows and add it in GitHub > repo > Settings > Deploy keys, read-only).
   - Branch: `master`
   - Directory: leave empty (= `public_html`).
   - Create, then press Deploy once.
5. **Auto-deploy.** In the same Git screen, open Auto Deployment and copy the webhook URL.
   GitHub > repo > Settings > Webhooks > Add webhook: paste it as Payload URL, event "Just the push
   event", Add. Every push to `master` now redeploys. No GitHub Actions are needed.
6. **Private config.** File Manager: go one level *above* `public_html`
   (`domains/babyshower.com.py/`) and upload `vendercrm-config.babyshower.php` from
   `C:\Claude 1\babyshower-private\`. Never put it in the repo or in `public_html`.
   `lead-forward.php` reads it from `dirname(DOCUMENT_ROOT)`, and writes `leads.log` and
   `.babyshower-state/` in the same private folder.

## Check after the first deploy

- `https://babyshower.com.py/` and `/contacto/` load; `http://` and `www.` redirect to `https://babyshower.com.py/`.
- These must show the "Página no encontrada" page, not content:
  `/.git/config`, `/plan/00-README.md`, `/BRIEF.md`, `/docs/DEPLOY.md`, `/build-site.mjs`, `/leads.log`.
- Send one real form: redirect to `/gracias.html`, email arrives (check spam), and `leads.log`
  appears next to the config file, not inside `public_html`.

## Each change afterwards

Edit, `node build-site.mjs`, `node verify.mjs --final`, commit the regenerated HTML, push to `master`.
The webhook deploys it. If a new non-site folder is ever added at the repo root, add it to the
deny rule in `.htaccess` (verify.mjs checks the current rule).
