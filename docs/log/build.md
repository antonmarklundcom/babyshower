
## 2026-09-19 — B1 — generador y primeras páginas

Resultado: 6 rutas construidas de 32; 8 HTML incluidos los especiales; 6 entradas en sitemap.xml. Totales derivados de docs/routes.json.

Fuentes: AGENTS.md; BUILD-SPEC completo (sección 0 primero); 10-REVISION-V2; 04-CONTENT-AND-COPY incluidas 1, 2, 3, 10–15; build-site.mjs, content.mjs y site.js de tasacion-com-py; tokens.css, motion.js y layout-patterns.md de web-design-system. No se copiaron credenciales, precios ni copy de tasacion. Referencias sin modificaciones.

Composición: no existe docs/design-canvas-export.html; se aplicó sección 6: portada P1, cinta P8, paquetes con centro elevado, panel P10 estático, franja P6 oscura con grano y solapamiento, pasos P5, diez temáticas, inclusiones/exclusiones P4, zonas, seis preguntas y contacto P1. Paneles decorativos con tintes; sin galería, pruebas inventadas ni fotos de fases posteriores.

Contenido/configuración centralizados; manifiesto con built:false para fases futuras; sitemap generado; metadatos únicos; Organization/WebSite, LocalBusiness solo en inicio, Service en inicio, BreadcrumbList y FAQPage coherente. Enlaces WA con contexto y href sin JS. Favicon inline; .htaccess nuevo.

Verificador: inventario contra sección 6; archivos, HTML, metadatos, grafo, enlaces/fragmentos, precios, sitemap y peso. Ejecuta el JS real en un adaptador DOM para consentimiento, etiquetas, debounce, conversión confirmada, visitas directas a gracias, panel WA, teclado/foco, menú móvil, SID y fecha desconocida. Comprueba contraste de combinaciones usadas y conservación literal de tokens/motion. Incluye verificadores para calculadora, Jaccard, palabras, HTTP y ZIP; los no aplicables se informan DEFERRED.

### Comandos y comprobaciones

- PASS — node build-site.mjs: salida final 0; rutas B1, especiales y sitemap generados.
- PASS — node verify.mjs --phase B1: salida final 0; máximo HTML + CSS + JS + calc = 57.818 bytes; fuentes locales 0 bytes; imágenes preexistentes más favicon 3.662.259 bytes, aparte.
- FAIL inicial, corregido — node verify.mjs --phase B1: TODO detectaba «Todo listo» del copy aprobado; se restringió el marcador a mayúsculas y pasó.
- PASS — Get-Content / Get-ChildItem: lecturas requeridas, referencias, inventario y preview-server; git status --short: archivos autorizados nuevos.
- FAIL — lectura opcional plan/03-BUILD-PHASES.md: archivo inexistente, no requerido por B1; no se usó para implementar.
- PASS — scripts Node por stdin: manifiesto, copia literal de motion.js, tokens y catálogo de párrafos. El texto literal del primer registro perdió tildes por la codificación de stdin de PowerShell; se corrigió mediante escritura Unicode y se conservó el catálogo importado desde content.mjs.
- PASS — node preview-server.mjs 8096: inició; se detuvo con Ctrl+C (salida 1 por interrupción esperada), sin modificar el servidor.
- NO REALIZADA — revisión visual: navegador integrado no disponible; Chrome rechazó localhost:8096 por permiso denegado. No se intentó una vía alternativa.
- NO DISPONIBLE LOCALMENTE — php -l lead-forward.php; nunca marcado PASS.

### Pendientes y decisiones de alcance

- Sin woff2 locales: Google Fonts Instrument Serif + DM Sans; Satoshi queda pendiente.
- Contraste: #D97B6C no alcanza 4.5:1 en etiquetas pequeñas ni con texto blanco de botones. Se conserva en CTA/regla decorativa con texto #2B2430. El bloque de tokens solo cambia TRACK; adaptaciones posteriores.
- SITE.email y SITE.leadEmail vacíos, sin inventar correos. Cinco párrafos omiten referencias a correo inexistente. Anton configura correo público antes de Gate A y confirma Q21.
- B2: calculadora interactiva/ofertas; B3: temáticas/zonas y similitud; B4: guías/palabras. Sin simular aprobaciones.
- B5: lead-forward.php no es fuente autorizada en B1 y no se creó. Formularios POST completos, todavía sin canal operativo. Validación del servidor, preservación de errores/valores, persistencia y notificación corresponden a B5.
- Integración B5: tras persistencia duradera + email o CRM exitoso, establecer bs_lead_success=BS-yyyymmdd-xxxx (Path=/; Secure; SameSite=Lax; legible por JS; vida corta) y redirigir a /gracias.html. B1 nunca crea esa cookie en submit ni confía en parámetros de URL; consume la señal y deduplica con consentimiento. Mantener o adaptar conjuntamente en B5.
- Contrato de pruebas B2: window.BS_CALCULATOR.calculate(input, {PACKAGES, ADDONS, ZONES}) devuelve total, guests, custom, disabledAddons y whatsapp; render(state) permite verificar ausencia de total numérico para cotizaciones personalizadas. Adaptar junto a calc.js.
- Las 14 preguntas aprobadas no contienen una específica de revelación. Se mantienen todas; la agrupación Revelación enlaza al servicio manifestado sin inventar respuesta.
- B6: visual/móvil, Lighthouse, HTTP y ZIP pendientes. Opciones --http y --zip implementadas. Apache no probado en hosting.
- Anton hace el envío real del formulario en addon domain y comprueba email + log en Gate A. Revisión legal de políticas, clima y alcance antes de Gate C.
- No se inventaron sesión, modelo ni esfuerzo; los agrega el manager o Anton desde el dispatch.

### [REVISAR] Párrafos no literales de plan/04

Catálogo conservador de toda prosa en párrafos no literal de plan/04, incluidas interpolaciones obligatorias de precios y textos exactos de BUILD-SPEC 0/3. Se tradujo backdrop a fondo decorativo y se omitieron referencias a correo no configurado. Texto íntegro para revisión; ningún marcador aparece en HTML.

1. [REVISAR] Precio estimado desde Gs. 1.150.000. El precio final y la disponibilidad se confirman por WhatsApp. (En: index.html)

2. [REVISAR] Decoración lista para tu baby shower en casa: arco de globos orgánico de 2 metros, fondo decorativo y cartel con el nombre del bebé. Montaje y desmontaje incluidos en la estimación. (En: index.html)

3. [REVISAR] No incluye local/salón, mozos, bebidas alcohólicas, mesas y sillas, mantelería, hielo ni limpieza posterior. Torta y souvenirs no incluidos. (En: index.html)

4. [REVISAR] Todo listo: arco de 3 metros en tres colores, fondo decorativo, cartel, mesa dulce de 30 unidades, 60 bocaditos salados, vajilla descartable temática y 3 juegos impresos. (En: index.html)

5. [REVISAR] Invitado extra: Precio estimado desde Gs. 55.000. El precio final y la disponibilidad se confirman por WhatsApp. (En: index.html)

6. [REVISAR] Precio estimado desde Gs. 2.750.000. El precio final y la disponibilidad se confirman por WhatsApp. (En: index.html)

7. [REVISAR] 40 invitados incluidos en la estimación. (En: index.html)

8. [REVISAR] No incluye local/salón, mozos, bebidas alcohólicas, mesas y sillas, mantelería, hielo ni limpieza posterior. Torta y souvenirs incluidos en la estimación. (En: index.html)

9. [REVISAR] Estimación vigente al 19/09/2026 (En: index.html)

10. [REVISAR] Combo Nube Precio estimado desde Gs. 1.150.000. El precio final y la disponibilidad se confirman por WhatsApp. (En: index.html)

11. [REVISAR] Combo Estrella Precio estimado desde Gs. 1.850.000. El precio final y la disponibilidad se confirman por WhatsApp. (En: index.html)

12. [REVISAR] Combo Sueño Precio estimado desde Gs. 2.750.000. El precio final y la disponibilidad se confirman por WhatsApp. (En: index.html)

13. [REVISAR] Atendemos en Asunción y Gran Asunción (En: index.html, como-funciona/index.html, contacto/index.html, preguntas-frecuentes/index.html, privacidad/index.html, terminos/index.html, 404.html, gracias.html)

14. [REVISAR] Se abre WhatsApp con el mensaje ya escrito. (En: index.html, como-funciona/index.html, contacto/index.html, preguntas-frecuentes/index.html, privacidad/index.html, terminos/index.html, 404.html, gracias.html)

15. [REVISAR] Usamos analítica solo si aceptás. Podés rechazarla o revocar tu consentimiento desde el pie de página. Ley 6534/2020. (En: index.html, como-funciona/index.html, contacto/index.html, preguntas-frecuentes/index.html, privacidad/index.html, terminos/index.html, 404.html, gracias.html)

16. [REVISAR] Baby Shower Paraguay, sitio operado desde Asunción. Organizamos y coordinamos propuestas de baby shower, revelación de género y primer añito. Trabajamos con estimaciones orientativas y confirmamos manualmente el alcance, el precio final y la disponibilidad por WhatsApp antes de cualquier acuerdo. Podés contactarnos por WhatsApp. (En: como-funciona/index.html)

17. [REVISAR] Baby Shower Paraguay, sitio operado desde Asunción. Para consultas, reclamos o pedidos de eliminación de datos, escribinos al +595 992 279 599. (En: privacidad/index.html)

18. [REVISAR] Conservamos los datos durante 12 meses desde la última consulta. Podés pedir su eliminación por WhatsApp. (En: privacidad/index.html)

19. [REVISAR] Baby Shower Paraguay, sitio operado desde Asunción. Consultas y reclamos: +595 992 279 599. (En: terminos/index.html)

20. [REVISAR] Tratamos los datos según la política de Privacidad, con conservación de 12 meses desde la última consulta y pedidos de eliminación por WhatsApp. Podés aceptar, rechazar y revocar la analítica desde Preferencias de cookies. Para reclamos, usá nuestros canales de contacto. Referencias: Ley 6534/2020 para datos y Ley 4868/2013 para comercio electrónico. (En: terminos/index.html)

21. [REVISAR] No encontramos esta página. Volvé al inicio o escribinos por WhatsApp. (En: 404.html)

### [REVISAR] Descripciones SEO redactadas

- [REVISAR] /: Consultá combos de baby shower en Asunción y Gran Asunción. Mirá precios estimados, temáticas y qué incluye cada propuesta.

- [REVISAR] /como-funciona/: Conocé cómo consultar por tu evento, coordinar los detalles y confirmar una propuesta por WhatsApp. Leé nuestras políticas previstas.

- [REVISAR] /contacto/: Escribinos por WhatsApp o contanos tu fecha tentativa, zona y cantidad de invitados. Te respondemos dentro de 24 horas hábiles.

- [REVISAR] /preguntas-frecuentes/: Resolvé tus dudas sobre estimaciones, montaje, comida y zonas de atención para tu baby shower. Consultá los detalles por WhatsApp.

- [REVISAR] /privacidad/: Conocé qué datos recibimos, para qué los usamos y cómo pedir su eliminación. Podés aceptar, rechazar o revocar la analítica del sitio.

- [REVISAR] /terminos/: Leé el alcance de las estimaciones, las condiciones del sitio y la política prevista de reserva. Cada acuerdo requiere confirmación escrita.

- [REVISAR] /404.html: La página que buscás no está disponible. Volvé al inicio para ver nuestros combos o escribinos por WhatsApp y contanos tu idea.

- [REVISAR] /gracias.html: Gracias por escribir a Baby Shower Paraguay. Te respondemos dentro de 24 horas hábiles para conversar sobre tu propuesta y disponibilidad.

### [REVISAR] Etiquetas breves añadidas

Títulos SEO únicos y etiquetas funcionales en content.mjs: Saltá al contenido; Principal; Información del sitio; Abrí el menú; Cerrar; ¿Qué necesitás?; Mirá los combos y precios; Consultá tu estimación; Temáticas para tu celebración; Revelación; Consultá por una revelación de género; Impuestos y formas de pago; Tus preferencias de cookies; Elegí una opción; Consultá cómo tratamos tus datos; No encontramos esta página. Los demás textos se reutilizan o derivan de plan/04 y sección 0.

## 2026-09-19 — B2 — ofertas y calculadora

Leídas primero sección 0 de BUILD-SPEC y 10-REVISION-V2, luego AGENTS.md, BUILD-SPEC 4–7 y copy 3–6. Sin export de diseño elegido; se conserva la composición de B1. Matriz, adicionales, zonas y PRICES existentes reutilizados; ofertas de revelación y añito agregadas a content.mjs. Service enlazado en las tres ofertas, LocalBusiness solo en inicio; sin Product/Offer ni precio estructurado estimado.

Calculadora en inicio y combos: controles progresivos, rango 15–60 paso 5, invitados conservados al cambiar combo, total oculto sobre máximo o zona otra, torta/souvenirs deshabilitados e incluidos en Sueño sin cargo duplicado, desglose, vigencia y mensaje WA derivados de datos. Sin JS queda enlace a combos y precios visibles en tarjetas. Tabla con desplazamiento horizontal y primera columna fija bajo 640px. Sitemap regenerado por el generador existente a partir de built; no totales codificados.

- PASS — node build-site.mjs: 9 rutas construidas de 32, 11 HTML incluidos especiales, 9 entradas sitemap; conteos del manifiesto.
- PASS — node verify.mjs --phase B2: checks aplicables; peso máximo 70.048 bytes.
- PASS — node verify.mjs --phase B2 --calc: seis fixtures y ejecución del controlador real sobre adaptador DOM: cambios de paquete, invitados retenidos, adicionales incluidos, zona otra, salida/WA sin total obsoleto, consentimiento y debounce.
- PASS — Get-Content, Select-String, Test-Path, git status --short, git diff --stat: lecturas y revisión de alcance; edición Node por stdin.
- FAIL — rg: The term 'rg' is not recognized; lectura continuada con Select-String.
- FAIL — python por stdin: The term 'python' is not recognized; no archivos escritos por ese intento; edición realizada con Node.
- NO DISPONIBLE LOCALMENTE — php -l lead-forward.php; no es PASS. Anton hace prueba real del formulario alojado, email y log en Gate A.

Pendientes heredados: fuentes locales ausentes (Instrument Serif + DM Sans vía Google Fonts); SITE.email y Q21 sin confirmar; endpoint B5, visual/navegador/HTTP/Lighthouse/ZIP B6. No se ejecutó navegador visual en B2: la prueba de controles usa adaptador DOM, no motor de diseño. Sesión/modelo/esfuerzo quedan para manager o Anton.

### [REVISAR] Prosa nueva o adaptada, no literal de plan/04

- Revelación Completa: «Kit + fondo decorativo + arco pequeño + mesa con 20 dulces + montaje.» Traducción de backdrop.
- Añito: «Arco y fondo decorativo temáticos, cartel con nombre y número 1, mesa dulce 30 unidades, torta temática, 60 bocaditos, vajilla temática, montaje y desmontaje.» Traducción de backdrop.
- Respuesta temática de añito: «Contanos qué temática tenés en mente y confirmamos el alcance por WhatsApp.»
- FAQ de torta: «Torta de revelación: Precio estimado desde Gs. 180.000. El precio final y la disponibilidad se confirman por WhatsApp.» Traducción de reveal; precio derivado.
- SEO combos: «Compará las inclusiones de cada combo de baby shower, sus precios estimados y adicionales. Calculá tu propuesta según invitados y zona.»
- SEO revelación: «Consultá por el Kit Sorpresa o la Revelación Completa en Asunción. Mirá precios estimados y cómo coordinar el color, la entrega y el montaje.»
- SEO añito: «Conocé el Combo Añito para 30 invitados con decoración, torta y bocaditos. Elegí una temática y consultá el precio final y la disponibilidad.»
- Textos derivados: captions de todos los importes, PRICES.label, invitados extra y cotización personalizada según BUILD-SPEC 0/5; sin nueva promesa. Copys B1 reutilizados sin cambios.
- Etiquetas nuevas: Elegí tu combo; Restá 5 invitados; Sumá 5 invitados; Invitados extra; Traslado (recargo estimado); Comparación de combos; Qué incluye cada combo; Detalle; Elegí tu temática; Consultá el alcance (tabla, campos de Sueño no especificados); Torta de revelación. Celdas de tabla resumen inclusiones aprobadas; sin inventar cantidades faltantes.

## 2026-09-19 — B3 — temáticas, zonas y hubs

Leídas BUILD-SPEC sección 0 primero, 10-REVISION-V2, AGENTS.md, BUILD-SPEC 6/7/11 y copy 7/8. No existe export de diseño elegido; componentes y composición de B1 reutilizados. Sin cambios en fuentes fuera de la lista autorizada. Todos los HTML construidos se regeneraron por el hash CSS y la navegación Zonas; sitemap regenerado a partir del manifiesto.

themes.mjs contiene diez temáticas con paleta, elementos, dos combos, tres relacionados y dos FAQ. Párrafos principales de 146–155 palabras. Personajes con «inspirada en», sin productos licenciados. zones.mjs contiene solo slug, nombre, barrios, tipos de lugar, FAQ y párrafo; cinco páginas con 152–160 palabras y dos entradas solo en hub (Capiatá y Mariano Roque Alonso). Importes unidos por slug desde content.mjs; tarjetas y mensajes suman traslado una sola vez. FAQPage visible, BreadcrumbList, Service con ciudad y proveedor enlazado; LocalBusiness solo en inicio.

- PASS — node build-site.mjs: 26/32 rutas, 28 HTML incluyendo especiales, 26 entradas sitemap; totales del manifiesto.
- PASS — node verify.mjs --phase B3: contenido, enlaces, precios por zona, FAQ/schema y controles previos; peso máximo 71.187 bytes sin fuentes/imágenes.
- PASS — node verify.mjs --phase B3 --uniqueness: solo data-main-paragraph; normalización de caja/tildes/puntuación, conjuntos de 5 palabras, 45 pares temáticos y 10 pares de zonas, máximo Jaccard 0.000; falla desde 0.60.
- PASS — Get-Content, Select-String, Test-Path: lecturas; Node por stdin: edición acotada, manifiesto y comprobación independiente de palabras/similitud; git status --short y git diff --stat: revisión de alcance.
- FAIL inicial de edición, corregido — apply_patch: «Failed to find expected lines» al buscar una línea parcial de cards; no modificó archivos en ese intento. Parche reducido aplicado y reemplazo acotado completado.
- NO DISPONIBLE LOCALMENTE — php -l lead-forward.php; no es PASS. Anton realiza el envío real en addon domain y verifica email + log en Gate A.

Pendientes heredados: fuentes locales ausentes y fallback Google Fonts; correo público y Q21; endpoint B5; QA visual/HTTP/Lighthouse/ZIP B6. No se ejecutó revisión visual en B3. Sesión/modelo/esfuerzo los agrega manager o Anton desde dispatch, sin inventarlos.

### [REVISAR] Páginas con párrafos expandidos más allá del seed

- /tematicas/jefe-en-panales/, /tematicas/dino-bebe/, /tematicas/moana-bebe/, /tematicas/minnie-bebe/, /tematicas/mickey-bebe/.
- /tematicas/blanca-nieves-bebe/, /tematicas/frutillita-bebe/, /tematicas/mariposas/, /tematicas/safari/, /tematicas/nubes-y-ositos/.
- /zonas/asuncion/, /zonas/fernando-de-la-mora/, /zonas/lambare/, /zonas/san-lorenzo/, /zonas/luque/.
- /zonas/: reutiliza los párrafos de las cinco ciudades y agrega textos breves para Mariano Roque Alonso y Capiatá sin enlaces a páginas inexistentes.
- También revisar FAQ nuevas, descripciones SEO, etiquetas de secciones y aclaración de alcance temático. Captions, CTA e importes derivados de las fuentes compartidas; ningún marcador REVISAR se imprime en HTML.
## 2026-09-19 — B4 — hub de ideas y cinco guías

Implementación autorizada tras aclaración: Kit Sorpresa lee nombre y precio de REVEAL.packages; todos los importes salen de content.mjs y usan priceCaption. Sin export de diseño elegido; se reutilizan componentes existentes. Guías con H1 y esquema de sección 9, CTA tras la segunda sección H2 y al final, panel ilustrativo tintado, enlaces a temática y combos, Article con datePublished y author enlazado a /#org, y BreadcrumbList con Ideas como nivel intermedio. Manifiesto completo construido; sitemap y HTML regenerados (hash CSS compartido).

- PASS — node build-site.mjs: 32 rutas construidas, 34 HTML, 32 entradas sitemap; totales derivados del manifiesto.
- PASS — node verify.mjs --phase B4: estructura, enlaces, CTA/precios, schema y controles previos.
- PASS — node verify.mjs --phase B4 --words: ideas 818, juegos 834, casa 836, revelación 820, checklist 787 palabras. Excluye navegación, header/footer, CTA, FAQ y panel ilustrativo.
- PASS — Node por stdin, pruebas de límites sobre HTML temporal restaurado en finally: 699 y 1001 rechazados; 700 y 1000 aceptados.
- FAIL inicial de prueba auxiliar, corregido: RangeError: Invalid array length; se amplió el fragmento sustituido. Segundo intento: AssertionError al comparar el guion Unicode por stdin de PowerShell; se corrigió la aserción auxiliar a texto ASCII. Sin cambios al verificador por estos errores; HTML restaurado en ambos casos.
- PASS — Get-Content, Test-Path, git diff --stat, git status --short: lectura y revisión de alcance. No se ejecutó QA visual/HTTP, reservado a B6.
- NO DISPONIBLE LOCALMENTE — php -l lead-forward.php. Anton realiza prueba real de formulario alojado y comprueba email + log en Gate A.

[REVISAR] Redacción expandida de las cinco guías en ideas.mjs, resúmenes del hub, metadatos y etiquetas nuevas. Marcadores solo en este log, nunca en HTML. Pendientes heredados: fuentes locales y fallback Google Fonts, correo público/Q21, endpoint B5 y QA/ZIP B6. Session id/model/effort los agrega manager o Anton desde dispatch; no se inventan.

## 2026-09-19 — B5 — endpoint, empaquetado y documentación

Resolución autorizada: SITE.email y SITE.leadEmail siguen vacíos, sin editar content.mjs. Destinatario privado en vendercrm-config.babyshower.php un nivel encima del document root: constante BABYSHOWER_LEAD_EMAIL, luego array lead_email, luego SITE.leadEmail de un build futuro. Sin destinatario no se intenta mail; CRM opcional puede satisfacer notificación. No se creó configuración real ni se escribió ninguna credencial.

Endpoint implementado con validación, normalización de celular paraguayo, honeypot empresa, cinco intentos/minuto/IP y exclusión mutua. Una línea JSON durable por SID antes de notificar; recibos privados evitan repetir notificaciones exitosas. Fallos devuelven el formulario con valores, resumen accesible, mensajes inline y WhatsApp, sin depender de JS. Éxito exige log y mail o CRM; solo entonces cookie de conversión y redirect a gracias. Campos no mapeados en nota; pipeline Baby Shower/etapa Nuevo se configuran en CRM para el origen, siguiendo payload de tasacion. Corte entre notificación externa y recibo requiere revisión manual (mail no es transaccional).

Generador incorpora defaults públicos en PHP, mantiene sitemap derivado del manifiesto y excluye gracias/404. HTML regenerado con hash JS. robots.txt ya referencia sitemap. Preview copiado/adaptado de embarazo para HTML y bloqueo de archivos privados. Script ZIP usa .NET ZipFile y SHIP derivado del manifiesto más archivos fijos; documentación cubre publicación, config privada, retención y Gate A.

- PASS — node build-site.mjs: 32 rutas, 34 HTML y 32 entradas sitemap, derivados del manifiesto.
- PASS — node verify.mjs --phase B5: controles aplicables, incluyendo JS/calculadora/consentimiento. El verificador solo comprueba existencia del endpoint PHP; no ejecuta PHP.
- PASS — node verify.mjs --final: controles finales, unicidad y palabras de guías.
- FAIL — powershell -NoProfile -File deploy/make-zip.ps1: "cannot be loaded because running scripts is disabled on this system", UnauthorizedAccess. Repetido tras revisión con el mismo resultado. No se cambió la política ni se generó ZIP; empaquetado y validación del archivo ZIP pendientes.
- PASS — System.Management.Automation.Language.Parser::ParseFile: sintaxis del script PowerShell, sin ejecutarlo.
- PASS — node --check preview-server.mjs; node --check assets/js/site.js; git diff --check.
- PASS — Node por stdin: preview HTTP de todas las rutas built del manifiesto, gracias/404, ruta inexistente y bloqueo de PHP/log/.htaccess; servidor detenido al terminar.
- FAIL auxiliar — rg no instalado; se usó Select-String. Lectura inicial de plan/04-COPY.md falló por ruta inexistente; corregida a plan/04-CONTENT-AND-COPY.md. Python no instalado; edición realizada mediante Node y apply_patch.
- NOT AVAILABLE LOCALLY — php -l lead-forward.php. Anton debe validar PHP alojado y realizar envío real, verificando email + log en Gate A; probar CRM y dedupe cuando configure el hosting.

B5 no se declara completo: ZIP bloqueado por política local y PHP no ejecutado. Q21/configuración de destinatario, correo público, fuentes locales y QA visual/Lighthouse siguen pendientes. Peso máximo HTML+CSS+JS+calc: 72.525 bytes; fuentes locales 0 bytes; imágenes 3.662.259 bytes por separado. No se agrega session id/model/effort: corresponde al manager o Anton desde dispatch.

## 2026-09-19 - B7 - existing imagery placement

Placed 13 approved assets in 24 picture elements: home hero/band, package cards on home and combos, eight theme hub tiles and matching theme heroes. Editorial manifest controls placement and alt_es; webimg manifest supplies filenames, available AVIF/WebP widths and converted dimensions. Home hero alone is eager/high priority; all others lazy/async. Visible Imagen ilustrativa captions, responsive sizes and intrinsic dimensions included. Band retains grain and uses a dark scrim with conservative 5.39:1 contrast even over white imagery/grain. No image generation, downloads, conversions or asset edits. Other image slots and copy unchanged; all HTML regenerated for CSS hash.

Mickey remains blocked and unplaced. Blanca Nieves marked rejected/unplaced for recognisable character silhouette. No references to either image in generated pages; no og:image.

- PASS: node build-site.mjs - 32 routes, 34 HTML outputs, 32 sitemap entries.
- PASS: node verify.mjs --final - all applicable final checks; max page/CSS/JS weight 79,573 bytes.
- PASS: powershell -NoProfile -ExecutionPolicy Bypass -File deploy/make-zip.ps1 - 104 entries, all 32 routes, dist/babyshower-2026-09-19.zip.
- PASS: Node stdin imagery audit - 24 pictures; route scope, formats, existing variants, manifest alt, dimensions, sizes, loading priority, captions and exclusions.
- FAIL then fixed: initial imagery audit AssertionError on home picture count (actual 4, expected 5); original hero replacement missed a Unicode motif. Corrected renderer and reran all required commands plus audit successfully.
- FAIL: rg unavailable (CommandNotFoundException); used Select-String/Get-Content.
- PASS: git diff --check and scope review; changes confined to allowed source/manifest/log and generated HTML (ZIP produced by required deploy command).
- Existing flags: local fonts absent (Google Fonts fallback); public/notification email Q21 and hosted PHP checks remain manager-owned. No browser visual QA performed in B7.
