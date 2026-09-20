# Publicación en Hostinger

El servidor aloja HTML estático y `lead-forward.php`; Node solo se usa localmente. PHP 8.1 o posterior recomendado, con mail y cURL/HTTPS cuando se use CRM.

1. Desde la raíz del repositorio ejecutá `node build-site.mjs`, `node verify.mjs --phase B5` y `node verify.mjs --final`.
2. Ejecutá `powershell -NoProfile -File deploy/make-zip.ps1`. Regenera el sitio y crea `dist/babyshower-YYYY-MM-DD.zip` con entradas relativas a la raíz, sin carpeta envolvente. La lista de rutas viene de `docs/routes.json`; agrega los archivos fijos y assets, incluyendo `.htaccess`. Falla ante archivos faltantes o privados.
3. Subí el ZIP al document root del addon domain babyshower.com.py y extraelo allí. Confirmá que `index.html` y `.htaccess` están directamente en esa carpeta. Conservá copia de la versión anterior para rollback y eliminá el ZIP del hosting después de extraerlo. Nunca subas fuentes, planes, docs, logs ni configuración privada.
4. Fuera de esa carpeta, exactamente un nivel encima de public_html (o del document root que Hostinger asignó al addon), creá `vendercrm-config.babyshower.php` a partir de `deploy/vendercrm-config.example.php`. El archivo real nunca se comitea ni se incluye en ZIP. Configurá `lead_email`; CRM opcional mediante `url` HTTPS y `api_key`, ingresada únicamente en el hosting. No pegues credenciales en capturas, reportes ni comandos compartidos.

La constante privada `BABYSHOWER_LEAD_EMAIL`, si existe y no está vacía, tiene prioridad; luego `lead_email` del array; luego `SITE.leadEmail` si un build futuro lo establece. Hoy `SITE.email` y `SITE.leadEmail` permanecen vacíos. El generador incorpora solo valores de content.mjs al endpoint, nunca lee el archivo privado. Sin dirección válida no se intenta mail. Sin CRM configurado no se intenta POST. Éxito requiere escritura durable y al menos una notificación aceptada; solo entonces se redirige a gracias. `mail()` aceptado no prueba entrega al buzón: verificá la recepción real.

Configurá en VenderCRM la credencial/origen `site:babyshower` para pipeline **Baby Shower**, etapa **Nuevo**. El endpoint usa `/api/v1/leads`, `X-Api-Key`, phone, name, message, source, page_url e idempotency_key siguiendo tasacion. Fecha, invitados, tipo, zona y demás campos quedan en la nota, junto con pipeline/etapa. No envía campos de API no documentados ni carga scripts de atribución sin consentimiento.

PHP debe poder crear `.babyshower-state/` encima del document root (privado, permisos 0700) para el límite de cinco intentos por minuto/IP y recibos de SID exitosos. La exclusión mutua cubre escritura y notificaciones concurrentes. El log preferido es `leads.log` un nivel arriba; el fallback en la raíz pública está denegado por `.htaccess`. Si no puede mantener estado privado o guardar el log, falla sin confirmar. Un reintento fallido conserva el SID y no añade otra línea; un SID exitoso no vuelve a notificar. No edites ni borres recibos al reintentar. Un corte entre una notificación externa y guardar su recibo puede exigir revisión manual; CRM usa idempotencia estable, PHP mail no ofrece transacciones.

Aplicá la retención de 12 meses a log y recibos privados, con mantenimiento coordinado sin envíos activos; atendé solicitudes de eliminación por WhatsApp. No sirvas esas carpetas desde otro dominio. Para revisar logs, usá acceso privado del hosting y no los copies a reportes.

## Antes de publicar

- Confirmar número de WhatsApp y atención por Anton.
- Revisar `PRICES.label` y las estimaciones vigentes, sin habilitar reservas.
- Configurar el destinatario de notificación privado. Q21 sigue pendiente; no inventar `SITE.leadEmail` ni el correo público `SITE.email`. Este último requiere confirmación antes de publicarse.
- Revisar analytics id y consentimiento; Gate B exige conversiones verificadas antes de tráfico pago.
- Revisar fuentes: actualmente fallback Google Fonts Instrument Serif + DM Sans; faltan los archivos locales Instrument Serif/Satoshi.
- **Anton, Gate A:** enviar un formulario real en el addon domain; verificar email recibido y una sola línea durable en el log. Probar también error con fallback WhatsApp, SID repetido sin nueva línea/notificación y CRM si se configura. Sin destinatario ni CRM disponible el formulario debe fallar, aunque guarde el lead.
- Completar QA de B6: rutas HTTP, 404/gracias, vista móvil, accesibilidad y Lighthouse.

`php -l lead-forward.php` — **not available locally**; no se declara PASS. Validación PHP y prueba real alojada pendientes de Anton en Gate A.

En esta sesión Windows bloqueó el comando de empaquetado porque la política local deshabilita scripts PowerShell. No se cambió esa política; el ZIP queda pendiente de generar en un entorno autorizado para ejecutar el script.

Preview local: `node preview-server.mjs`, http://127.0.0.1:4173 (PORT configurable). Adaptado de embarazo-com-py para index.html/404.html. Es solo estático: bloquea PHP, fuentes mjs y logs; no ejecuta ni valida el endpoint. Sitemap se genera solo con rutas built/indexable del manifiesto, HTTPS y slash final, excluye gracias/404; robots.txt ya lo referencia.
