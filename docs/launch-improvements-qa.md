# Launch improvements: review notes

## Changes

- Clearly state that the service is preparing its first events; label generated inspiration as illustrative and not completed client work.
- Keep package prices, scopes and enquiry-only behavior; remove repeated homepage descriptions, inclusion lists, promotional band and rotating hero imagery.
- Correct Sueño's included souvenir label to x40 in the calculator breakdown and WhatsApp message.
- Support exact guest counts, keep the range synchronized, and explain custom combinations without attributing every custom quote to guest count alone.
- Show price and enquiry actions early on reveal and first-birthday pages; preselect the location on zone enquiry forms.
- Label date and guest fields optional; use wording that does not falsely imply an unsuccessful delivery was never stored.
- Bound AJAX submissions with a 15-second timeout and preserve visitor details in an explicit WhatsApp fallback.
- Generate 128-bit enquiry IDs, accept existing four-character IDs for compatibility, and generate a new ID after editing a failed attempt.
- Release the global rate-limit lock before notification calls; serialize matching SIDs and record separate email/CRM outcomes.
- Make the PHP fixture use an invalid-domain recipient and a local sendmail sink on Unix; failed assertions now return a failing exit status.

## Validation

- `node build-site.mjs`: 57 routes, 2 special outputs, 57 sitemap entries.
- `node verify.mjs --final`: generated structure, SEO/link contracts, calculator and executed interaction fixtures.
- `node verify.mjs --final --http http://127.0.0.1:4173`: all 59 outputs and custom 404, using a local preview process started in the same environment.
- JavaScript syntax checks and `git diff --check`.
- PHP 8.3 syntax check and `PHP_EXE=<php> node docs/qa-tools/php-endpoint.mjs`, with local notification capture; no real external messages.
- New executed form fixtures cover timeout/abort, duplicate clicks, fallback detail preservation, edited-attempt IDs and successful redirects. Calculator fixtures cover exact guest input and x40 souvenirs.

## Remaining limits

This is an unmerged PR, not a deployment. Real host email/CRM delivery, security headers and the four currently missing live guide routes require a later deployment check. Email acceptance by `mail()` is not proof of inbox delivery. Email success still permits the user success redirect when CRM fails; automatic CRM retry remains backlog task 2. The browser download was blocked/corrupted in this environment, so physical mobile/browser visual inspection of the new layout is still outstanding. Private credentials and analytics/operator details were not invented.
