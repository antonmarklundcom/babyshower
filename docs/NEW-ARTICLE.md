# Adding a new guide (article)

A guide is one object in `ideas.mjs`. The build creates the page, adds it to
`docs/routes.json`, `sitemap.xml`, the `/ideas/` index and the "Más guías" links.

## Easiest: paste this into Claude Code in this repo

```text
Add a new guide to babyshower.com.py. Topic: <TOPIC>. Target search: <KEYWORD>.
Append one object to IDEAS in ideas.mjs, same shape and tone as the others
(Spanish Paraguay, voseo, 5 sections of 2 paragraphs, 750-950 words, title <= 60
chars, description 120-160 chars, theme = an existing THEMES slug, offer = an
existing imported package). Prices only via priceCaption(); no new amounts, no
"reservar", no popularity or past-event claims, no medical advice, no 5-word
phrases copied from other guides. Then run node build-site.mjs and
node verify.mjs --final, look at the page at 375 and 1440 px, commit and push to master.
```

## By hand

1. Copy the last object in `ideas.mjs`, change `slug`, `title`, `h1`, `description`,
   `datePublished`, `theme`, `offer`, `cta`, `image`, `intro` and `sections`.
2. `node build-site.mjs` then `node verify.mjs --final` (fix anything marked FAIL).
3. Commit everything that changed (including the new `ideas/<slug>/index.html`) and push to `master`.
   Hostinger deploys it through the webhook.

## Good next topics (from the keyword data)

decoración baby shower sencilla · baby shower de niño · mesa dulce para baby shower ·
torta de baby shower · invitaciones de baby shower · souvenirs de baby shower ·
revelación de género: ideas para anunciar · decoración para bebé de 1 año.
