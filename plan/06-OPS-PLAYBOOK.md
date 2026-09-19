# 06 — Operations playbook

## 1. Launch gates

- **Gate A — organic inquiry publication:** site QA passed (03 B6), WhatsApp answered by Anton, privacy and terms live, lead email working. Anton submits one real form on the addon domain and checks email + durable log; local PHP lint is not available locally. Configure SITE.email for public contact and confirm SITE.leadEmail (Q21).
- **Gate B — paid traffic:** Gate A + GA4/Ads conversion verified + 400.000 PYG envelope approved (14 days, ~30.000/day, CPC cap 2.000). Server-accepted form inquiry primary; WhatsApp click secondary without value; deposit is offline business outcome.
- **Gate C — bookings:** supplier rate card, seller identity, payment rails, lawyer review → flip BOOKING_ENABLED and LAUNCH_MODE to booking. Review refund processing target, weather and scope changes. Supplier backup, holds, venue check and shareable quote below belong here, not to inquiry launch.

Phase 0 (Anton): configure WhatsApp Business greeting, away message, quick replies, catalog and labels. VenderCRM pipeline Baby Shower: Nuevo → Contactado → Calificado → Consultando proveedor → Cotizado → Seña pendiente → Confirmado → Realizado → Reseña pedida → Cerrado; side stages Perdido (reason required), Cancelado, Reembolsado. Booking stages are inactive in inquiry mode.

Supplier preparation for Gate C: written itemised rate card for combos/add-ons, food units, guests, transport, setup/teardown windows, validity, capacity, hold duration, milestones, cancellation, rain plan and portfolio permission. Cost each order; margin floor 300.000 PYG before ads. Identify supplier 2 (decor), inspect a sample, and identify mesa dulce backup. Authorised photos can later enable the real-work gallery; their absence does not block inquiry publication.

Phase 0 Instagram scan (Anton): one hour, 10 local operators; record package contents, price shown or not, response time, proof photos, delivery zones. Feed findings into copy tweaks; not a launch blocker. GBP: evaluate, do not assume eligibility; create only if in-person service is confirmed. Original KWP export Q19 is useful, not a blocker; small Ads tests and query reports replace the forecast. Supplier-funded off-peak offer deferred to Gate C.

Booking-mode rules below apply only after Gate C. Inquiry mode never requests a deposit.

## 2. Supplier agreement checklist (send as a one-page Spanish document, sign on WhatsApp is acceptable for v1)

Identidad y facturación · Lista de precios mayoristas con vigencia · Qué incluye cada combo (unidades exactas de comida, medidas del arco y backdrop, materiales) · Sustituciones permitidas · Capacidad y fechas bloqueadas · Tiempo de respuesta para confirmar fecha (objetivo 2 h en horario laboral) · Duración de la reserva tentativa (hold) · Ventanas de montaje y desmontaje · Requisitos de acceso (escaleras, ascensor, electricidad) · Plan de lluvia · Alérgenos y manipulación de alimentos (responsabilidad del proveedor, con registro sanitario si lo tiene) · Daños y roturas de alquiler · Hitos de pago (objetivo: 30% al confirmar, 70% al entregar; no aceptar más de 50% adelantado sin capital propio) · Cancelación y reprogramación · Qué pasa si el proveedor falla (reemplazo o devolución, quién paga) · Derechos de fotos y crédito · El proveedor no contacta al cliente directamente ni entrega material propio con marca en el evento · Datos mínimos compartidos (dirección, hora, contacto del día; nunca la ficha completa del CRM) · Subcontratación solo con aviso.

Hold ID + expiry are required before any deposit request. If booked, offer two alternative slots. Maintain backup supplier contacts and confirmed scope before taking money.

## 3. Order sheet (VenderCRM deal custom fields or a shared spreadsheet, v1)

Booking reference · Hold ID and expiry · Named payer · Venue photo and dimensions (required before fixed quote) · ID · Versión de cotización · Cliente y contacto del día · Tipo de evento · Fecha, hora inicio/fin · Dirección, ciudad, pin de mapa · Acceso (escaleras, ascensor, estacionamiento) · Interior/exterior y plan de lluvia · Contacto del lugar y reglas del salón · Hora lista para montaje y hora de desmontaje · Proveedor y contacto del equipo · Invitados y fecha límite de número final · Combo, temática, colores · Medidas · Cantidades exactas de comida y alérgenos · Custodia del color de la revelación (quién sabe) · Adicionales · Inventario de alquiler · Imagen de referencia (marcada real/ilustrativa) · Sustituciones aprobadas por escrito · Total retail / costo / margen (internos, nunca al proveedor ni al cliente) · Seña, saldo, estado, referencias de pago · Confirmación del proveedor (captura) · Aceptación de términos · Permiso de fotos · Próximas tareas · Incidentes.

## 4. Timeline per booking

- T0 lead: respond within 15 min in hours. Qualify in ≤ 3 messages: fecha/hora, ciudad/barrio, invitados. Then: casa o salón, adentro o afuera, escaleras.
- T0 + 2 h internal target: supplier availability confirmed in writing and hold ID + expiry recorded → send one shareable quote message naming payer, booking reference, hold expiry, venue photo/dimensions, scope, total, seña, saldo due 48 horas antes, cancellation and seller identity. If unavailable, offer two alternative slots.
- Acceptance → verify money actually received (bank app, not screenshot) → re-lock supplier → written confirmation to customer → supplier work order.
- T-7 days: reconfirm venue, access, supplier; final guest count deadline reminder.
- T-3 days: final count, menu/allergens, request saldo, weather fallback, reveal custody (only colour, no medical studies), day-of contacts.
- T-2 days: saldo must be received, 48 horas antes del evento.
- At the agreed setup time: crew on site; setup photos sent to Anton before guests; compare with sheet; host acceptance message.
- T+1 day: "¿Cómo salió todo?" + review link + photo permission ask.
- Follow-up in the customer’s chosen month: ¿Querés que te escriba más adelante? Decime qué mes te queda bien. Record consent date and month. Offer: Si volvés con nosotros para el baby shower o el primer añito, te armamos una propuesta con un beneficio que cotizamos en el momento. Internal +8 weeks / +11 months defaults only if they say cuando quieras.

Cancellation bands: 15 días o más; 4–14 días; menos de 4 días, per POLICY.cancel. Refund processing target dentro de 5 días hábiles; lawyer review before Gate C covers this, weather and scope changes.

## 5. Day-of checklist (crew or Anton for deals 1–3)

Inventory packed against sheet · Venue access and timing confirmed · Backdrop and arch stability, cable routing, nothing blocking exits · Food quantities counted, kept cool, allergens labelled · Setup photos: wide horizontal, vertical, food detail, backdrop without guests · Host acceptance · Shortages logged with remedy · Teardown/pickup time confirmed · Property condition noted.

## 6. Incidents and quality

- Standard: exact quantities, intact rentals, agreed palette and dimensions, ready on time, no unapproved substitutions. The written item list controls, not visual similarity to any image.
- Incident log: time, photos, impact, fix on site, explicit remedy and deadline to the customer, supplier recovery tracked separately.
- Weekly scorecard: response time, date rejection rate, qualified/quoted/deposit rates, actual contribution per event, refunds/rework, on-time setup, supplier concentration, photo permission yield, satisfaction. Track event month separately from inquiry month.

## 7. Photos and reviews

- Separate permission for portfolio use. Default shots without guests or children. Never publish reveal outcome before the host does.
- Review ask T+1 and one reminder at T+7, same neutral message to every customer, no incentives, no filtering. GBP link once the profile is verified; otherwise attributed website testimonial with first name + barrio.
- First three real events produce the `/trabajos-reales/` page and unhide the `proof-photo` slots.

## 8. Ladder automation (Phase 3 only)

Manual v1: WhatsApp labels + VenderCRM tasks + calendar. Automated v2 requires: WhatsApp Business Platform (API) number, approved message templates, consent records, a scheduler (cron on the VenderCRM host) that creates tasks and sends templates, opt-out suppression, and per-message costs accepted. No unofficial bulk-sender extensions.
