
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
