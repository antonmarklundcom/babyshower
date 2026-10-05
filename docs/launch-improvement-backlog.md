# Next 20 coding tasks

These are additional tasks after the launch-improvements PR, not claims of completed work. Prioritize enquiry delivery and measurement before adding more content. No client reviews or completed-event portfolio entries should be published until real events exist and permission is recorded.

| # | Priority | Task | Acceptance criteria |
|---|---|---|---|
| 1 | P1 | Add continuous integration | Build and verify every PR; run PHP lint and the local endpoint fixture; fail on changed generated outputs. |
| 2 | P1 | Add a private CRM retry outbox | Persist pending CRM delivery separately from email; a CLI job retries with the same idempotency key, bounded backoff and no repeated email. |
| 3 | P1 | Add delivery health reporting | A private CLI command reports pending/failed counts and oldest retry, without exposing names, messages or credentials. |
| 4 | P1 | Enforce retention | A scheduled private CLI job prunes lead logs, receipts, locks and outbox records after the documented retention period, with dry-run mode. |
| 5 | P1 | Add concurrent endpoint regression tests | Two processes sharing state cannot duplicate the same SID; slow CRM calls do not block unrelated enquiries. |
| 6 | P1 | Add a deployment smoke checker | Check canonical host/HTTPS, 57 sitemap routes, security/cache headers, private-path denial and custom 404 after each deployment. |
| 7 | P1 | Add a staged delivery test | With the owner's private settings, send an explicitly authorized synthetic enquiry to a test CRM/site and verify routing and deduplication. |
| 8 | P1 | Add consent-aware attribution | Capture allowlisted UTM/click IDs only with appropriate consent; forward validated values to CRM; never send form data to analytics. |
| 9 | P1 | Configure and verify conversion analytics | Accept a real measurement ID; test reject/accept/revoke and conversion deduplication; confirm no PII in events. |
| 10 | P2 | Transfer calculator selections to the enquiry form | Package, guests, zone and add-ons populate an editable enquiry summary; no selections disappear during navigation. |
| 11 | P2 | Add shareable calculator URLs | Allowlisted query parameters restore a quote; invalid values fall back safely; copied URLs contain no personal data. |
| 12 | P2 | Add an event date to the calculator | Optional date is validated in Asunción time and included in the WhatsApp message; no availability promise is implied. |
| 13 | P2 | Add quote copy/download actions | Copy and print a concise estimate with inclusions, date/version and disclaimer; clearly separate estimated and confirmed amounts. |
| 14 | P2 | Add a venue preparation checklist | Visitors can select indoor/outdoor, space/access and timing needs; a concise result can be included in their enquiry. |
| 15 | P2 | Add theme filtering | Filter by palette and event type using keyboard-accessible controls; all theme links work without JavaScript. |
| 16 | P2 | Add guide search | Search existing guide titles/topics locally with accessible result counts and a useful no-results state. |
| 17 | P2 | Add guide tables of contents | Generate stable heading anchors; focus and sticky-header offsets work; links remain useful without JavaScript. |
| 18 | P2 | Add mobile visual regression coverage | Check 320/375/390/768px layouts, zoom, menu focus, visible image captions, keyboard form entry and sticky-bar overlap. |
| 19 | P2 | Add performance budgets | Track LCP image requests, CLS and transferred bytes on core templates; fail CI on meaningful regressions. |
| 20 | P3 | Add a real-event portfolio publishing workflow | Support dated approved photos and authentic client permission; generated inspiration stays visibly labeled and separate. Hide the portfolio while empty. |

## Owner/deployment inputs

- Private CRM URL/key and notification recipient must be supplied on the host, never committed. The repository's empty public defaults do not prove that the live host is unconfigured.
- A real analytics ID, public operator/contact details and commercial conditions need owner confirmation.
- The existing four additional guide pages need a later authorized deployment; this PR does not change the live server.
- New Higgsfield images are optional. Existing illustrative assets cover the current pages; the next valuable image work is authentic photography after real events, with consent.
