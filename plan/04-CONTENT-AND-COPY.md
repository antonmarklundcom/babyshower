# 04 — Content and copy (Spanish, Paraguayan register, voseo)

Rules: voseo in every CTA (Escribinos, Elegí, Consultá, Calculá). Primary CTA: Consultá por WhatsApp. Prices use Gs. 1.850.000 and the derived caption from BUILD-SPEC §0 on every card, table, calculator, FAQ price answer, guide CTA and WhatsApp script: Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. X is the configured amount, never literal. Use LAUNCH_MODE, PRICES and BOOKING_ENABLED from §0, never hand-type per page. Never invent reviews, years, event counts, popularity or supplier certainty. One Guaraní touch allowed: none on site; WhatsApp greeting may open with ¡Mba’éichapa! Guest count: invitados. Event words: baby shower (masculine), revelación de género, primer añito.

## 1. Global strings (content.mjs)

```
SITE.name        Baby Shower Paraguay
SITE.domain      babyshower.com.py
SITE.tagline     Tu baby shower listo, con precio claro.
SITE.area        Asunción y Gran Asunción
SITE.hours       Lun a Sáb, 8:00 a 20:00 (WhatsApp)
SITE.ruc         ''            (empty until Anton confirms)
SITE.instagram   ''            (empty until account exists)
POLICY.sena      Reservás con una seña del 50%. El saldo se paga 48 horas antes del evento.
POLICY.cancel    Podés cambiar la fecha una vez sin costo avisando con 7 días de anticipación, sujeto a disponibilidad. Si cancelás con 15 días o más, te devolvemos la seña menos los costos ya comprometidos que te mostramos detallados. Entre 4 y 14 días descontamos además los insumos de comida y materiales ya comprados, siempre con el detalle por escrito. Con menos de 4 días los costos comprometidos son mayores y te pasamos el cálculo ítem por ítem. Si nosotros o el proveedor fallamos, te ofrecemos un reemplazo equivalente o la devolución completa de lo no entregado. Procesamos la devolución dentro de 5 días hábiles.
                 (Pending review by a Paraguayan lawyer against Ley 4868/2013, including refund timing, weather and scope-change rules, before Gate C. Do not shorten to a flat non-refundable clause.)
POLICY.pagos     Te confirmamos las formas de pago disponibles por WhatsApp antes de cualquier pago.
POLICY.iva       Estimaciones orientativas. Impuestos y formas de pago se confirman por escrito antes de cualquier pago.
POLICY.plazo     Consultá con al menos 3 semanas de anticipación. Con menos tiempo, escribinos para consultar disponibilidad.
```

POLICY.sena and POLICY.cancel appear only on /como-funciona/ and /terminos/ under **Política prevista de reserva (se aplica cuando habilitemos reservas)**. No deposit request while BOOKING_ENABLED is false.

Operator: **Baby Shower Paraguay, sitio operado desde Asunción**, with WhatsApp and SITE.email. Configure the public email before Gate A; Q21 is the separate notification address.

## 2. Trust ribbon (5 items)
['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso']

## 3. Landing `/`

**Eyebrow:** Baby shower en Asunción y Gran Asunción
**H1:** Baby shower en Asunción con precio claro
**Sub:** Decoración, mesa dulce y bocaditos para 30 invitados. Precio estimado desde Gs. 1.850.000. El precio final y la disponibilidad se confirman por WhatsApp. Te respondemos dentro de 24 horas hábiles. Precios estimados a la vista, sin preguntar al privado.
**CTA 1:** Consultá por WhatsApp · **CTA 2:** Calculá tu precio

**Packages section eyebrow:** Combos · **H2:** Tres combos con precios estimados a la vista
Card copy:
- Combo Nube (Básico) — Gs. 1.150.000 — "Decoración lista para tu baby shower en casa: arco de globos orgánico de 2 metros, backdrop y cartel con el nombre del bebé. Montaje y desmontaje incluidos en la estimación." Chip: Hasta 30 invitados en el lugar.
- Combo Estrella (30 invitados) — Gs. 1.850.000 — badge "Combo completo" — "Todo listo: arco de 3 metros en tres colores, backdrop, cartel, mesa dulce de 30 unidades, 60 bocaditos salados, vajilla descartable temática y 3 juegos impresos." Chip: Invitado extra Gs. 55.000.
- Combo Sueño (Premium, 40 invitados) — Gs. 2.750.000 — "Doble arco de 4 metros, cartel en acrílico personalizado, mesa dulce de 60 unidades más torta, 120 bocaditos, bebidas sin alcohol, 40 souvenirs y coordinación del evento (Sueño)."

**Calculator:** eyebrow Calculadora · H2 Calculá tu precio en 30 segundos · helper: derived price caption plus PRICES.label · CTA Consultá por WhatsApp. Custom quote: Para N invitados te cotizamos por WhatsApp · CTA Pedir cotización.

**Band (dark):** Vos elegís la temática. Coordinamos horario de montaje con vos. · CTA Ver temáticas

**Cómo funciona (4 steps):**
1. Elegís tu combo y temática — Desde la web o por WhatsApp.
2. Nos contás fecha y zona — Sumá la cantidad de invitados que tenés en mente.
3. Te respondemos dentro de 24 horas hábiles — Conversamos sobre el alcance y la disponibilidad.
4. Coordinamos los detalles con vos — El precio final y la disponibilidad se confirman por WhatsApp.

**Qué incluye y qué no incluye (replaces proof at launch):** two columns, per package where different. Inclusions from cards and §4; Montaje y desmontaje incluidos en la estimación. Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado. Exclusions: local/salón, mozos, bebidas alcohólicas, mobiliario (mesas y sillas), mantelería, hielo, limpieza posterior; torta y souvenirs excluidos de Nube y Estrella, incluidos en Sueño. Repeat explicit Exclusiones in the comparison table and each card’s expandable detail.

**FAQ landing (6):**
1. ¿Cuánto cuesta un baby shower para 30 personas? — Combo Estrella: Precio estimado desde Gs. 1.850.000. El precio final y la disponibilidad se confirman por WhatsApp. La estimación incluye decoración, mesa dulce y bocaditos salados. Render amount from PACKAGES.
2. ¿Cómo hago una consulta? — Escribinos por WhatsApp con fecha tentativa, zona y cantidad de invitados. Te respondemos dentro de 24 horas hábiles. Por ahora recibimos consultas, sin pedir seña.
3. ¿Qué pasa si llueve y el evento es en el patio o quincho? — Contanos si tenés un espacio bajo techo. Conversamos sobre las alternativas y dejamos el alcance por escrito antes de confirmar un evento.
4. ¿Con cuánta anticipación conviene consultar? — Lo ideal son 3 semanas. Con menos tiempo, consultá disponibilidad por WhatsApp.
5. ¿Puedo cambiar la fecha? — Mientras estamos conversando, podés proponernos otra fecha, sujeto a disponibilidad. Para futuras reservas, consultá la política prevista en /como-funciona/.
6. ¿Qué no incluye la estimación? — No incluye local/salón, mozos, bebidas alcohólicas, mesas y sillas, mantelería, hielo ni limpieza posterior. Torta y souvenirs están incluidos solo en Sueño.

**Contact split:** H2 Escribinos y contanos tu idea · labels: Tu nombre · Tu WhatsApp · Fecha tentativa · No sé todavía · Cantidad de invitados · Tipo de evento (Baby shower / Revelación de género / Primer añito / Otro) · Zona · Mensaje (opcional) · button Enviar consulta · under button: Te respondemos dentro de 24 horas hábiles. All visible/hidden fields and validation follow BUILD-SPEC §8; errors in §13.

## 4. `/combos-y-precios/`
H1: Combos y precios de baby shower
Intro: Acá podés ver qué incluye cada combo y qué queda fuera de la estimación. El precio final y la disponibilidad se confirman por WhatsApp. Montaje y desmontaje incluidos en la estimación.
Comparison table rows: Precio estimado · Invitados incluidos · Máximo de invitados · Arco de globos · Backdrop · Cartel del bebé · Mesa dulce · Bocaditos salados · Bebidas · Vajilla · Juegos · Souvenirs · Coordinación del evento · Invitado extra · Exclusiones. Each price has the §0 caption.
Add-ons (ADDONS): Torta temática 1 piso Gs. 220.000 · Souvenirs personalizados x30 Gs. 180.000 · Mesa de regalos y libro de firmas Gs. 90.000 · Globo confeti gigante Gs. 60.000 · Sesión de fotos 30 min Gs. 250.000 · Hora extra de coordinadora Gs. 120.000.
Zones delivery (ZONES, recargo estimado): Asunción 0 · Fernando de la Mora 0 · Lambaré 0 · San Lorenzo 40.000 · Luque 40.000 · Mariano Roque Alonso 60.000 · Capiatá 60.000 · Otra zona: cotizar.
Payment block: POLICY.pagos + POLICY.iva only; link to /como-funciona/ for the planned policy.

Frozen calculator matrix (provisional estimates; canonical data in content.mjs):

| Package | Base Gs. | Included guests | Max | Extra guest Gs. | Bundled add-ons |
|---|---|---|---|---|---|
| Nube | 1.150.000 | 30 (decor only, guests do not change price) | 30 | 0 | none |
| Estrella | 1.850.000 | 30 | 40 | 55.000 | none |
| Sueño | 2.750.000 | 40 | 60 | 60.000 | torta, souvenirs (disabled, incluido) |

Extra food per guest: Estrella +1 dulce and +2 salados; Sueño +2 dulces and +3 salados. Exclusiones in every card detail and comparison row: local/salón, mozos, bebidas alcohólicas, mobiliario (mesas y sillas), mantelería, hielo, limpieza posterior; torta and souvenirs except in Sueño. Delivery copy: Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado.

## 5. `/revelacion-de-genero/`
H1: Revelación de género en Asunción: kit a domicilio o fiesta completa
Sub: Una persona de tu confianza nos pasa solo el color por WhatsApp. No nos envíes estudios médicos.
Kit Sorpresa — Precio estimado desde Gs. 390.000. El precio final y la disponibilidad se confirman por WhatsApp. Globo gigante negro con confeti del color + cartel + entrega en Asunción, Fernando de la Mora y Lambaré; otras zonas con recargo estimado. Ideal para una revelación sencilla en casa.
Revelación Completa — Precio estimado desde Gs. 690.000. El precio final y la disponibilidad se confirman por WhatsApp. Kit + backdrop + arco pequeño + mesa con 20 dulces + montaje.
Steps: Una persona de tu confianza nos pasa solo el color · Consultamos el alcance del kit con vos · Coordinamos la entrega o el montaje. Adicionales a confirmar, solo exterior: humo de color y polvo holi, sin precio ni entrada en la calculadora.
FAQ (4): ¿Cómo se mantiene el secreto? (Una persona de tu confianza nos pasa solo el color por WhatsApp. No nos envíes estudios médicos.) · ¿El humo se puede usar en interior? (No, solo exterior y a confirmar; para interior consultá por globo con confeti.) · ¿Qué información necesitan? (Fecha tentativa y zona; no necesitamos estudios médicos.) · ¿Puedo sumar la torta? (Torta reveal: Precio estimado desde Gs. 180.000. El precio final y la disponibilidad se confirman por WhatsApp.)
Cross-link: "¿Querés hacerlo simple en casa? Mirá ideas de revelación de género sencilla" → /ideas/revelacion-de-genero-sencilla/.
Ladder hook: Si volvés con nosotros para el baby shower o el primer añito, te armamos una propuesta con un beneficio que cotizamos en el momento.

## 6. `/primer-anito/`
H1: Primer añito con temática, listo para disfrutar
Combo Añito (30 invitados) Gs. 1.950.000: arco y backdrop temáticos, cartel con nombre y número 1, mesa dulce 30 unidades, torta temática, 60 bocaditos, vajilla temática, montaje y desmontaje. Themes strip: Dino bebé, Moana bebé, Minnie bebé, Mickey bebé, Safari, Blanca Nieves bebé, Frutillita bebé.
FAQ: ¿Puedo elegir cualquier temática? · ¿Incluye la torta? (Sí, 1 piso, hasta 30 porciones) · ¿Sirve para salón de eventos? (Sí, coordinamos horario de ingreso con el salón).

## 7. Themes (themes.mjs) — each needs: slug, name, primary kw, palette words, elements list, 120+ word unique paragraph, applicable combos, related themes, 2 FAQs. Seed copy:

- **jefe-en-panales** — Jefe en Pañales — kw "decoración de jefe en pañales" — palette azul marino, celeste, blanco, dorado — elements: corbata y chupete gigantes, cartel "Jefe en Pañales", globos con lunares, maletín de utilería — Paragraph angle: "sencilla" variant for casa exists (90 vol): mention "versión sencilla" with Combo Nube.
- **dino-bebe** — Dino bebé — kw "decoración de dino bebe" — verde salvia, verde oliva, terracota, beige — huevos de dinosaurio de espuma, hojas tropicales, cartel "Dino bebé", globos con estampado — applies to baby shower and añito (70 vol "dino bebe cumpleaños").
- **moana-bebe** — Moana bebé — kw "decoración de moana bebe" — turquesa, coral, arena, verde hoja — flores tropicales, olas de cartón, remo, cartel — strong for añito (30 vol "moana bebe 1 año").
- **minnie-bebe** — Minnie bebé — kw "decoración de la minnie bebe" — rosa bebé, blanco, lunares, dorado — moños, orejas, lunares.
- **mickey-bebe** — Mickey bebé — kw "decoración de bebe mickey" — rojo, negro, amarillo suavizados — orejas, guantes.
- **blanca-nieves-bebe** — Blanca Nieves bebé — kw "decoracion de blanca nieves bebe" — rojo manzana, azul royal, amarillo, blanco — manzanas, moño rojo, bosque.
- **frutillita-bebe** — Frutillita bebé — kw "decoracion de frutillita bebe" — rojo frutilla, verde, rosa — frutillas de espuma, gorro con lunares.
- **mariposas** — Mariposas — kw "decoracion de mariposas" (260) + "centros de mesa de mariposas" (140) — lila, rosa, verde agua — mariposas de papel en backdrop, centros de mesa con mariposas — note: this theme also pulls non-baby traffic (quinceañeras, bodas); copy stays baby-focused but mentions "también para otros eventos, consultá".
- **safari** — Safari — no KWP data — verde, mostaza, marrón, crema — animales de peluche, hojas, cartel "Wild One" for añito.
- **nubes-y-ositos** — Nubes y ositos — neutral — beige, blanco, gris perla, celeste/rosa opcional — nubes de espuma, osito, luna — default for parents who do not reveal the sex.

## 8. Zones (zones.mjs) — each: slug, name, barrios (4–6), venue types, 2 FAQs, unique 120+ word paragraph; delivery values below are reference only, joined by slug from content.mjs ZONES, never duplicated in zones.mjs; include access checklist, no travel minutes or invented history. Seeds:
- asuncion — 0 — Villa Morra, Carmelitas, Las Mercedes, Recoleta, Mburucuyá, Sajonia — quinchos, departamentos con SUM, salones de eventos — "montamos en departamentos con ascensor; si no hay, avisanos."
- fernando-de-la-mora — 0 — Zona Norte, Zona Sur, Laurelty (límite), San Miguel — casas con patio y quincho.
- lambare — 0 — Valle Apu'a, Villa Bonita, Santa Rosa — casas con patio.
- san-lorenzo — 40.000 — Barcequillo, Reducto, Calle'i, Laurelty — quinchos, salones.
- luque — 40.000 — Centro, Mora Cué, Laurelty, Ñu Guazú zone — quinchos grandes, salones.
- mariano-roque-alonso — 60.000 — Centro, zona Expo — quintas.
- capiata — 60.000 — Centro, Ruta 2 zone — quintas y patios grandes.
FAQ seeds per zone: ¿Cobran delivery en <Ciudad>? · ¿Llegan a salones de eventos en <Ciudad>?

## 9. Ideas (ideas.mjs) — 5 guides, 700–1000 words, H2 outline and CTA card text:
1. **ideas-para-baby-shower** — H1 "Ideas para baby shower en Paraguay: temáticas, juegos y cuánto cuesta" — H2s: Temáticas para elegir · Cuántos invitados y dónde · Menú de bocaditos típico (chipitas, empanaditas, alfajores) · Presupuesto real (rangos from PACKAGES) · Cuándo hacerlo (semana 30 a 34) · CTA card "Si querés que lo hagamos nosotros: Combo Estrella Gs. 1.850.000".
2. **juegos-para-baby-shower** — H1 "10 juegos para baby shower que funcionan de verdad" — bingo del bebé, adivinar la panza, no digas bebé, el chupete escondido, carrera de pañales, etc. Downloadable-free promise: none (no PDF). CTA: "Los combos Estrella y Sueño incluyen los juegos impresos".
3. **baby-shower-sencillo-en-casa** — H1 "Baby shower sencillo en casa: cómo armarlo y qué comprar" — kw "decoracion sencilla" — DIY honest guide, then "si preferís que llegue listo, Combo Nube Gs. 1.150.000".
4. **revelacion-de-genero-sencilla** — H1 "Revelación de género sencilla: 7 ideas para hacerla en casa" — globo, humo, torta, piñata, caja de globos, confeti popper, camiseta — CTA Kit Sorpresa Gs. 390.000.
5. **que-se-necesita-para-un-baby-shower** — H1 "Qué se necesita para un baby shower: checklist completa" — checklist by category, timeline 6 semanas antes → día del evento — CTA Combo Estrella.

## 10. /como-funciona/

Expand inquiry steps from §3; POLICY.pagos, POLICY.iva and POLICY.plazo. POLICY.sena and POLICY.cancel appear under Política prevista de reserva (se aplica cuando habilitemos reservas). Lawyer review includes refund timing, weather and scope changes.

**Quiénes somos:** Baby Shower Paraguay, sitio operado desde Asunción. Organizamos y coordinamos propuestas de baby shower, revelación de género y primer añito. Trabajamos con estimaciones orientativas y confirmamos manualmente el alcance, el precio final y la disponibilidad por WhatsApp antes de cualquier acuerdo. Podés contactarnos por WhatsApp o por el correo publicado en este sitio.
Render WhatsApp and SITE.email alongside; no personal name unless Q16 is answered.

## 11. /preguntas-frecuentes/ — 14 FAQs

Use the 6 landing questions verbatim, plus these 8:
7. ¿Puedo consultar por un domingo? — Sí, contanos la fecha que tenés en mente; la disponibilidad se confirma por WhatsApp.
8. ¿Puedo poner mi propia torta? — Contanos qué querés llevar y revisamos el alcance. Sueño incluye torta en la estimación; Nube y Estrella no.
9. ¿Pueden adaptar los bocaditos por alergias? — Contanos qué necesitás antes de confirmar. La opción y sus condiciones deben quedar confirmadas por escrito; no prometemos una preparación específica desde la web.
10. ¿Cómo coordinan el montaje? — Coordinamos horario de montaje con vos y revisamos el acceso y las medidas del espacio.
11. ¿Puedo consultar por un salón de eventos? — Sí, contanos las reglas de ingreso, las medidas y los horarios del lugar.
12. ¿Hasta qué hora desmontan? — Coordinamos el horario de desmontaje con vos y lo dejamos en la propuesta.
13. ¿Puedo ver fotos de eventos anteriores? — Todavía no tenemos galería de trabajos propios. Te compartimos ideas ilustrativas por WhatsApp.
14. ¿Atienden fuera de Gran Asunción? — Consultá por tu zona; el traslado se cotiza por WhatsApp.

## 12. WhatsApp scripts (inquiry mode)

Greeting (auto): ¡Hola! Gracias por escribir a Baby Shower Paraguay. Contanos fecha tentativa, zona y cantidad de invitados. Te respondemos dentro de 24 horas hábiles.
Away (auto): Estamos fuera de horario (Lun a Sáb 8:00 a 20:00). Dejanos fecha tentativa, zona e invitados. Te respondemos dentro de 24 horas hábiles.
/precios: render one line per configured offer (Nube, Estrella, Sueño, Kit Sorpresa, Revelación Completa, Combo Añito), each with name plus Precio estimado desde Gs. X. El precio final y la disponibilidad se confirman por WhatsApp. Append PRICES.label and babyshower.com.py/combos-y-precios/. Never type prices separately.
/seña: Por ahora recibimos consultas, sin pedir seña. Podés leer la política prevista para cuando habilitemos reservas en babyshower.com.py/como-funciona/.
/cancelacion: La política prevista para cuando habilitemos reservas está en babyshower.com.py/como-funciona/. Por ahora recibimos consultas, sin pedir seña.
/zonas: Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado. San Lorenzo y Luque: Gs. 40.000; Mariano Roque Alonso y Capiatá: Gs. 60.000. Otra zona: cotizar. Valores estimados; el precio final y la disponibilidad se confirman por WhatsApp. Render amounts from ZONES.
Inquiry sequence: qualify fecha tentativa, zona, invitados → send package card with derived estimate caption → Te respondemos dentro de 24 horas hábiles → discuss scope and manual availability, without deposit request. Booking-only sequence and shareable quote: 06 §§2–4 after Gate C.
Follow-up +5 días without response: Hola, ¿seguís con la idea del evento? Si querés, contanos qué detalles te faltan y seguimos conversando.
Repeat offer: Si volvés con nosotros para el baby shower o el primer añito, te armamos una propuesta con un beneficio que cotizamos en el momento.
Reminder consent: ¿Querés que te escriba más adelante? Decime qué mes te queda bien. Record chosen month and consent; follow up then, no fixed offset in customer copy.
Post-event +1 día (after bookings enabled): ¿Cómo salió todo? Nos ayudaría mucho conocer tu experiencia. Si querés compartir fotos, las publicamos con tu permiso. Add the real review link only once GBP eligibility and verification are confirmed.

## 13. Form errors and thanks page strings

Follow BUILD-SPEC §8 validation; retain submitted form values on error and show accessible summary plus inline messages.
- nombre: Escribí tu nombre, entre 2 y 60 caracteres.
- whatsapp: Escribí un número de celular paraguayo válido.
- fecha: Elegí una fecha de hoy en adelante o marcá No sé todavía.
- invitados: Escribí una cantidad entera entre 5 y 200 invitados.
- tipo: Elegí un tipo de evento de la lista.
- zona: Elegí una zona de la lista.
- mensaje: Tu mensaje puede tener hasta 500 caracteres.
- invalid origen or sid: No pudimos validar tu consulta. Volvé a cargar la página e intentá de nuevo.
- rate limit: Recibimos varios intentos. Esperá un minuto y volvé a intentar, o escribinos por WhatsApp.
- persistence/notification failure: No pudimos guardar tu consulta. Escribinos por WhatsApp: +595 992 279 599. Link to https://wa.me/595992279599.
- error summary: Revisá los campos marcados y volvé a enviar tu consulta.
- submitting: Enviando tu consulta…
- duplicate successful sid: same success response; never append another lead or send duplicate notifications.

/gracias.html (noindex, excluded from sitemap): H1 Gracias por tu consulta. Body: Recibimos tu consulta. Te respondemos dentro de 24 horas hábiles. El precio final y la disponibilidad se confirman por WhatsApp. CTA Consultá por WhatsApp; secondary Volver al inicio. No booking confirmation or deposit instruction. form_submit fires here only for server-accepted inquiries, subject to consent, once per interaction.

## 14. Privacidad — inquiry-mode copy and outline

**Quién opera este sitio.** Baby Shower Paraguay, sitio operado desde Asunción. Para consultas, reclamos o pedidos de eliminación de datos, escribinos al +595 992 279 599 o al correo publicado en este sitio. Render SITE.email as a real contact link before Gate A.

**Qué datos recibimos y para qué.** Recibimos tu nombre, número de WhatsApp, fecha tentativa si la indicás, cantidad de invitados, tipo de evento, zona y mensaje. También guardamos la página de origen y un identificador de consulta; usamos la dirección IP para limitar intentos. Usamos estos datos para responder consultas y coordinar eventos. No nos envíes estudios médicos; para una revelación necesitamos solo el color, enviado por una persona de tu confianza.

**Con quién compartimos datos.** Gestionamos consultas en nuestro CRM propio. Compartimos con proveedores solo los datos necesarios para eventos confirmados. Google Analytics recibe datos de navegación solo con tu consentimiento; no enviamos nombres, teléfonos ni mensajes a Analytics.

**Cuánto tiempo los guardamos.** Conservamos los datos durante 12 meses desde la última consulta. Podés pedir su eliminación por WhatsApp o por el correo del sitio. Default subject to Q17; update configured period if answered.

**Cookies y preferencias.** Podés aceptar o rechazar la analítica desde el aviso de cookies. No cargamos etiquetas de analítica antes de tu aceptación. Podés revocar el consentimiento desde Preferencias de cookies, en el pie de página. Guardamos tu elección para respetarla.

**Consultas y reclamos.** Podés contactarnos por los canales indicados para consultar sobre tus datos o pedir su corrección o eliminación. Esta política toma como referencia la Ley 6534/2020. Enviar una consulta no crea un contrato; no existe contrato hasta la confirmación por escrito.

## 15. Términos — inquiry-mode copy and outline

**Operador y contacto.** Baby Shower Paraguay, sitio operado desde Asunción. Consultas y reclamos: +595 992 279 599 y el correo publicado en este sitio. Render SITE.email as the configured public email link; no personal name until Q16.

**Alcance del sitio.** Recibimos consultas para baby shower, revelación de género y primer añito. Los importes publicados son estimaciones orientativas. El precio final, el alcance y la disponibilidad se confirman por WhatsApp. No existe contrato hasta la confirmación por escrito. Por ahora no pedimos seña desde este sitio.

**Qué incluye la propuesta.** Revisá las inclusiones y exclusiones de cada combo. Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado. Las imágenes ilustrativas son ideas de ambientación; no son una galería de trabajos propios. Cualquier cambio de alcance debe quedar acordado por escrito antes de confirmar.

**Impuestos y pagos.** Render POLICY.iva and POLICY.pagos verbatim, without unconfirmed payment methods.

**Política prevista de reserva (se aplica cuando habilitemos reservas).** Render POLICY.sena and POLICY.cancel verbatim from §1. This block, including refund processing within 5 business days, weather and scope-change rules, requires lawyer review before Gate C; it does not enable bookings.

**Datos y reclamos.** Tratamos los datos según la política de Privacidad, con conservación de 12 meses desde la última consulta y pedidos de eliminación por WhatsApp o correo. Podés aceptar, rechazar y revocar la analítica desde Preferencias de cookies. Para reclamos, usá nuestros canales de contacto. Referencias: Ley 6534/2020 para datos y Ley 4868/2013 para comercio electrónico.

Builder: use the prose above with configured values; no literal config keys or unresolved markers in HTML. Link to §14 privacy details. Pending legal review belongs to Gate C, not a reason to invent seller identity.
