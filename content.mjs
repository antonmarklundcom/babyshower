// Fuente única de contenido, importes y configuración pública. Sin credenciales.
export const LAUNCH_MODE = 'inquiry';
export const BOOKING_ENABLED = false;
export const ANALYTICS_ID = '';
export const WA_NUMBER = '595992279599';
export const SITE = { name: 'Baby Shower Paraguay', brand: 'Baby Shower', suffix: '.com.py', domain: 'babyshower.com.py', url: 'https://babyshower.com.py', phone: '+595 992 279 599', email: '', leadEmail: '', ruc: '', instagram: '', area: 'Asunción y Gran Asunción', serviceArea: 'Atendemos en Asunción y Gran Asunción', hours: 'Lun a Sáb 8:00 a 20:00', operator: 'Baby Shower Paraguay, sitio operado desde Asunción', retentionMonths: 12 };
// Actualizá PRICES.effectiveDate y PRICES.label juntos en Gate A y en cada cambio de precios; después reconstruí dist.
export const PRICES = { mode: 'estimated', effectiveDate: '2026-09-19', label: 'Estimación vigente al 19/09/2026' };
export const fmtGs = n => 'Gs. ' + new Intl.NumberFormat('es-PY').format(n);
export const CONFIRMATION = 'El precio final y la disponibilidad se confirman por WhatsApp.';
export const RESPONSE = 'Te respondemos dentro de 24 horas hábiles.';
export const PRIMARY_CTA = LAUNCH_MODE === 'inquiry' || !BOOKING_ENABLED ? 'Consultá por WhatsApp' : 'Coordiná por WhatsApp';
export const ZERO_PRICE = 'Sin costo adicional.';
export const priceCaption = n => n === 0 ? ZERO_PRICE : `${PRICES.mode === 'estimated' ? 'Precio estimado desde' : 'Precio desde'} ${fmtGs(n)}. ${CONFIRMATION}`;
export const extraGuestCaption = pkg => pkg.extra === 0 ? `Los invitados no cambian la estimación, hasta ${pkg.max} en el lugar.` : `Invitado extra: ${fmtGs(pkg.extra)} por invitado (estimado)`;
export const POLICY = {
 iva: 'Estimaciones orientativas. Impuestos y formas de pago se confirman por escrito antes de cualquier pago.',
 pagos: 'Te confirmamos las formas de pago disponibles por WhatsApp antes de cualquier pago.',
 plazo: 'Consultá con al menos 3 semanas de anticipación. Con menos tiempo, escribinos para consultar disponibilidad.',
 heading: 'Política prevista de reserva (se aplica cuando habilitemos reservas)',
 sena: 'Reservás con una seña del 50%. El saldo se paga 48 horas antes del evento.',
 cancel: 'Podés cambiar la fecha una vez sin costo avisando con 7 días de anticipación, sujeto a disponibilidad. Si cancelás con 15 días o más, te devolvemos la seña menos los costos ya comprometidos que te mostramos detallados. Entre 4 y 14 días descontamos además los insumos de comida y materiales ya comprados, siempre con el detalle por escrito. Con menos de 4 días los costos comprometidos son mayores y te pasamos el cálculo ítem por ítem. Si nosotros o el proveedor fallamos, te ofrecemos un reemplazo equivalente o la devolución completa de lo no entregado. Procesamos la devolución dentro de 5 días hábiles.'
};
export const TRUST = ['Precios estimados a la vista', 'Respuesta en 24 h hábiles', 'Montaje y desmontaje en la estimación', 'Asunción y Gran Asunción', 'Consulta sin compromiso'];
export const DELIVERY = 'Traslado incluido en Asunción, Fernando de la Mora y Lambaré. Otras zonas con recargo estimado.';
export const EXCLUSIONS = 'No incluye local/salón, mozos, bebidas alcohólicas, mesas y sillas, mantelería, hielo ni limpieza posterior.';
export const PACKAGES = [
 { id: 'basico', name: 'Combo Nube', price: 1150000, included: 30, max: 30, extra: 0, bundled: [], description: 'Decoración lista para tu baby shower en casa: arco de globos orgánico de 2 metros, fondo decorativo y cartel con el nombre del bebé. Montaje y desmontaje incluidos en la estimación.', chip: 'Hasta 30 invitados en el lugar.', exclusions: `${EXCLUSIONS} Torta y souvenirs no incluidos.` },
 { id: 'estrella', name: 'Combo Estrella', price: 1850000, included: 30, max: 40, extra: 55000, bundled: [], badge: 'Combo completo', description: 'Todo listo: arco de 3 metros en tres colores, fondo decorativo, cartel, mesa dulce de 30 unidades, 60 bocaditos salados, vajilla descartable temática y 3 juegos impresos.', get chip() { return extraGuestCaption(this); }, exclusions: `${EXCLUSIONS} Torta y souvenirs no incluidos.` },
 { id: 'premium', name: 'Combo Sueño', price: 2750000, included: 40, max: 60, extra: 60000, bundled: ['torta', 'souvenirs'], description: 'Doble arco de 4 metros, cartel en acrílico personalizado, mesa dulce de 60 unidades más torta, 120 bocaditos, bebidas sin alcohol, 40 souvenirs y coordinación del evento.', chip: '40 invitados incluidos en la estimación.', exclusions: `${EXCLUSIONS} Torta y souvenirs incluidos en la estimación.` }
];
export const ADDONS = [{ id: 'torta', name: 'Torta temática 1 piso', price: 220000 }, { id: 'souvenirs', name: 'Souvenirs personalizados x30', price: 180000 }, { id: 'regalos', name: 'Mesa de regalos y libro de firmas', price: 90000 }, { id: 'globo', name: 'Globo confeti gigante', price: 60000 }, { id: 'fotos', name: 'Sesión de fotos 30 min', price: 250000 }, { id: 'hora', name: 'Coordinadora por hora', price: 120000 }];
export const ZONES = [ ['asuncion', 'Asunción', 0], ['fernando-de-la-mora', 'Fernando de la Mora', 0], ['lambare', 'Lambaré', 0], ['san-lorenzo', 'San Lorenzo', 40000], ['luque', 'Luque', 40000], ['mariano-roque-alonso', 'Mariano Roque Alonso', 60000], ['capiata', 'Capiatá', 60000], ['otra', 'Otra zona', null] ].map(([slug, name, delivery]) => ({ slug, name, delivery }));
export const THEMES = [ ['jefe-en-panales', 'Jefe en Pañales'], ['dino-bebe', 'Dino bebé'], ['moana-bebe', 'Moana bebé'], ['minnie-bebe', 'Minnie bebé'], ['mickey-bebe', 'Mickey bebé'], ['blanca-nieves-bebe', 'Blanca Nieves bebé'], ['frutillita-bebe', 'Frutillita bebé'], ['mariposas', 'Mariposas'], ['safari', 'Safari'], ['nubes-y-ositos', 'Nubes y ositos'] ].map(([slug, name]) => ({ slug, name }));
export const NAV = [['/servicios/', 'Servicios'], ['/combos-y-precios/', 'Combos y precios'], ['/tematicas/', 'Temáticas'], ['/ideas/', 'Ideas'], ['/contacto/', 'Contacto']];
// Submenú Servicios de la cabecera y columna del pie; el primer elemento es la página resumen.
export const SERVICE_NAV = [['/servicios/', 'Todos los servicios'], ['/combos-y-precios/', 'Baby shower'], ['/revelacion-de-genero/', 'Revelación de género'], ['/primer-anito/', 'Primer añito'], ['/decoracion-con-globos/', 'Decoración con globos'], ['/bautismo/', 'Bautismo'], ['/cumpleanos-infantil/', 'Cumpleaños infantil'], ['/bienvenida-de-bebe/', 'Bienvenida de bebé']];
export const FOOTER_GUIDES = ['ideas-para-baby-shower', 'que-se-necesita-para-un-baby-shower', 'mesa-dulce-para-baby-shower', 'arco-de-globos-para-baby-shower', 'nombres-de-bebe-paraguay', 'ajuar-para-bebe'];
export const FOOTER_NAV = [['/como-funciona/', 'Cómo funciona'], ['/preguntas-frecuentes/', 'Preguntas frecuentes'], ['/contacto/', 'Contacto'], ['/privacidad/', 'Privacidad'], ['/terminos/', 'Términos']];
const introWA = route => `Hola, vengo de ${SITE.domain} (${route})`;
export const WA_MENU = { options: [
 { id: 'combo', label: 'Quiero consultar por un combo de baby shower', text: route => `${introWA(route)} y quiero consultar por un combo de baby shower. Fecha tentativa: ____ · Invitados: ____ · Zona: ____` },
 { id: 'revelacion', label: 'Quiero una revelación de género', text: route => `${introWA(route)} y quiero organizar una revelación de género. Fecha tentativa: ____ · Zona: ____` },
 { id: 'anito', label: 'Quiero organizar un primer añito', text: route => `${introWA(route)} y quiero organizar un primer añito. Temática: ____ · Fecha: ____ · Invitados: ____` },
 { id: 'servicios', label: 'Quiero globos, bautismo, cumpleaños o bienvenida', text: route => `${introWA(route)} y quiero consultar por decoración para ____ (globos, bautismo, cumpleaños infantil o bienvenida de bebé). Fecha tentativa: ____ · Zona: ____` },
 { id: 'disponibilidad', label: 'Quiero saber si tienen fecha disponible', text: route => `${introWA(route)} y quiero consultar disponibilidad para el ____ en ____` },
 { id: 'consulta', label: 'Tengo otra consulta', text: route => `${introWA(route)} y tengo una consulta.` }
] };
export const packageMessage = (p, route) => `${introWA(route)} y quiero consultar por ${p.name}. ${priceCaption(p.price)} Fecha tentativa: ____ · Zona: ____ · Invitados: ____`;
export const STEPS = [ ['Elegís tu combo y temática', 'Desde la web o por WhatsApp.'], ['Nos contás fecha y zona', 'Sumá la cantidad de invitados que tenés en mente.'], [RESPONSE.replace(/\.$/, ''), 'Conversamos sobre el alcance y la disponibilidad.'], ['Coordinamos los detalles con vos', CONFIRMATION] ];
export const FAQ = [
 { group: 'Consultas y estimaciones', q: '¿Cuánto cuesta un baby shower para 30 personas?', a: `Combo Estrella: ${priceCaption(PACKAGES[1].price)} La estimación incluye decoración, mesa dulce y bocaditos salados.` },
 { group: 'Consultas y estimaciones', q: '¿Cómo hago una consulta?', a: `Escribinos por WhatsApp con fecha tentativa, zona y cantidad de invitados. ${RESPONSE} Por ahora recibimos consultas, sin pedir seña.` },
 { group: 'Montaje', q: '¿Qué pasa si llueve y el evento es en el patio o quincho?', a: 'Contanos si tenés un espacio bajo techo. Conversamos sobre las alternativas y dejamos el alcance por escrito antes de confirmar un evento.' },
 { group: 'Consultas y estimaciones', q: '¿Con cuánta anticipación conviene consultar?', a: 'Lo ideal son 3 semanas. Con menos tiempo, consultá disponibilidad por WhatsApp.' },
 { group: 'Consultas y estimaciones', q: '¿Puedo cambiar la fecha?', a: 'Mientras estamos conversando, podés proponernos otra fecha, sujeto a disponibilidad. Para futuras reservas, consultá la política prevista en /como-funciona/.' },
 { group: 'Consultas y estimaciones', q: '¿Qué no incluye la estimación?', a: `${EXCLUSIONS} Torta y souvenirs están incluidos solo en Sueño.` },
 { group: 'Consultas y estimaciones', q: '¿Puedo consultar por un domingo?', a: 'Sí, contanos la fecha que tenés en mente; la disponibilidad se confirma por WhatsApp.' },
 { group: 'Comida', q: '¿Puedo poner mi propia torta?', a: 'Contanos qué querés llevar y revisamos el alcance. Sueño incluye torta en la estimación; Nube y Estrella no.' },
 { group: 'Comida', q: '¿Pueden adaptar los bocaditos por alergias?', a: 'Contanos qué necesitás antes de confirmar. La opción y sus condiciones deben quedar confirmadas por escrito; no prometemos una preparación específica desde la web.' },
 { group: 'Montaje', q: '¿Cómo coordinan el montaje?', a: 'Coordinamos horario de montaje con vos y revisamos el acceso y las medidas del espacio.' },
 { group: 'Montaje', q: '¿Puedo consultar por un salón de eventos?', a: 'Sí, contanos las reglas de ingreso, las medidas y los horarios del lugar.' },
 { group: 'Montaje', q: '¿Hasta qué hora desmontan?', a: 'Coordinamos el horario de desmontaje con vos y lo dejamos en la propuesta.' },
 { group: 'Zonas', q: '¿Atienden fuera de Gran Asunción?', a: 'Consultá por tu zona; el traslado se cotiza por WhatsApp.' }
];
export const ABOUT = 'Baby Shower Paraguay, sitio operado desde Asunción. Organizamos y coordinamos propuestas de baby shower, revelación de género, primer añito, bautismo, cumpleaños infantil, bienvenida de bebé y decoración con globos. Trabajamos con estimaciones orientativas y confirmamos manualmente el alcance, el precio final y la disponibilidad por WhatsApp antes de cualquier acuerdo. Podés contactarnos por WhatsApp.';
export const LEGAL = {
 privacy: [
 ['Quién opera este sitio', `${SITE.operator}. Para consultas, reclamos o pedidos de eliminación de datos, escribinos al ${SITE.phone}${SITE.email ? ' o al correo publicado en este sitio' : ''}.`],
 ['Qué datos recibimos y para qué', 'Recibimos tu nombre, número de WhatsApp, fecha tentativa si la indicás, cantidad de invitados, tipo de evento, zona y mensaje. También guardamos la página de origen y un identificador de consulta; usamos la dirección IP para limitar intentos. Usamos estos datos para responder consultas y coordinar eventos. No nos envíes estudios médicos; para una revelación necesitamos solo el color, enviado por una persona de tu confianza.'],
 ['Con quién compartimos datos', 'Los datos necesarios para atender tu consulta pueden ser recibidos por el proveedor de alojamiento del sitio, el servicio de correo electrónico que usamos para recibir consultas y nuestro sistema propio de gestión de consultas (CRM). Si nos escribís por WhatsApp, también los recibe WhatsApp, un servicio de Meta. Google Analytics recibe datos de navegación únicamente si aceptaste la analítica y una vez configurada su identificación en el sitio; no enviamos nombres, teléfonos ni mensajes a ese servicio. Compartimos con proveedores de eventos solo los datos necesarios para eventos confirmados.'],
 ['Cuánto tiempo los guardamos', `Conservamos los datos durante ${SITE.retentionMonths} meses desde la última consulta. Podés pedir su eliminación por WhatsApp${SITE.email ? ' o por el correo del sitio' : ''}.`],
 ['Cookies y preferencias', ANALYTICS_ID ? 'Podés aceptar o rechazar la analítica desde el aviso de cookies. No cargamos etiquetas de analítica antes de tu aceptación. Podés revocar el consentimiento desde Preferencias de cookies, en el pie de página. Guardamos tu elección para respetarla.' : 'Por ahora este sitio no usa analítica de terceros. Si la activamos, te pediremos tu consentimiento antes de cargarla y vas a poder revocarlo desde el pie de página.'],
 ['Consultas y reclamos', 'Podés contactarnos por los canales indicados para consultar sobre tus datos o pedir su corrección o eliminación. Esta política toma como referencia la normativa paraguaya aplicable de protección de datos y comercio electrónico. Enviar una consulta no crea un contrato; no existe contrato hasta la confirmación por escrito.']
 ],
 terms: [
 ['Operador y contacto', `${SITE.operator}. Consultas y reclamos: ${SITE.phone}${SITE.email ? ' y el correo publicado en este sitio' : ''}.`],
 ['Alcance del sitio', 'Recibimos consultas para baby shower, revelación de género, primer añito, bautismo, cumpleaños infantil, bienvenida de bebé y decoración con globos. Los importes publicados son estimaciones orientativas. El precio final, el alcance y la disponibilidad se confirman por WhatsApp. No existe contrato hasta la confirmación por escrito. Por ahora no pedimos seña desde este sitio.'],
 ['Qué incluye la propuesta', `Revisá las inclusiones y exclusiones de cada combo. ${DELIVERY} Cualquier cambio de alcance debe quedar acordado por escrito antes de confirmar.`],
 ['Impuestos y pagos', POLICY.iva, POLICY.pagos],
 [POLICY.heading, POLICY.sena, POLICY.cancel],
 ['Con quién compartimos datos', 'Los datos necesarios para atender tu consulta pueden ser recibidos por el proveedor de alojamiento del sitio, el servicio de correo electrónico que usamos para recibir consultas y nuestro sistema propio de gestión de consultas (CRM). Si nos escribís por WhatsApp, también los recibe WhatsApp, un servicio de Meta. Google Analytics recibe datos de navegación únicamente si aceptaste la analítica y una vez configurada su identificación en el sitio; no enviamos nombres, teléfonos ni mensajes a ese servicio. Compartimos con proveedores de eventos solo los datos necesarios para eventos confirmados.'],
 ['Datos y reclamos', `Tratamos los datos según la política de Privacidad, con conservación de ${SITE.retentionMonths} meses desde la última consulta y pedidos de eliminación por WhatsApp${SITE.email ? ' o correo' : ''}. ${ANALYTICS_ID ? 'Podés aceptar, rechazar y revocar la analítica desde Preferencias de cookies.' : 'Por ahora este sitio no usa analítica de terceros. Si la activamos, te pediremos tu consentimiento antes de cargarla y vas a poder revocarlo desde el pie de página.'} Para reclamos, usá nuestros canales de contacto. Referencia: la normativa paraguaya aplicable de protección de datos y comercio electrónico.`]
 ]
};
export const UI = {
 homeSteps: 'Cuatro pasos, sin vueltas', homeFaq: 'Lo que conviene saber antes de escribir',
 pricePrefix: PRICES.mode === 'estimated' ? 'Precio estimado desde' : 'Precio desde',
 homePackageTags: ['Hasta 30 invitados', PACKAGES[1].badge, `${PACKAGES[2].included} invitados`],
 homeInclusions: [
  { title: 'Qué incluye · Combo Estrella', items: ['Arco de 3 metros en tres colores', 'Fondo decorativo y cartel', 'Mesa dulce de 30 unidades', '60 bocaditos salados', 'Vajilla descartable temática', '3 juegos impresos', 'Montaje y desmontaje incluidos en la estimación'] },
  { title: 'Qué no incluye', items: ['Local o salón', 'Mozos', 'Bebidas alcohólicas', 'Mesas y sillas', 'Mantelería', 'Hielo', 'Limpieza posterior', 'Torta y souvenirs (Nube y Estrella)'] }
 ],
 zonesEyebrow: 'Zonas de cobertura', zoneFree: 'Sin recargo', zoneExtra: 'Con recargo estimado', zoneOther: 'la cotizamos por WhatsApp',
 palette: 'Paleta', heroSlides: { label: 'Imágenes de ejemplo', pause: 'Pausar las imágenes', play: 'Reanudar las imágenes', dot: 'Ver la imagen {n} de {total}' },
 zonePriceParts: (base, delivery) => `Base ${fmtGs(base)} + traslado estimado ${fmtGs(delivery)}`,
 includedGuests: 'Incluye hasta {N} invitados en este combo',
 instagram: 'Instagram', noContract: 'No existe contrato hasta la confirmación por escrito.',
 skip: 'Saltá al contenido', mainNav: 'Principal', footerNav: 'Información del sitio', servicesMenu: 'Abrí el submenú de servicios', footerServices: 'Servicios', footerZones: 'Zonas', footerGuides: 'Guías', footerInfo: 'Información', allGuides: 'Todas las guías', allServices: 'Ver el servicio', quoteTitle: 'Pedí tu presupuesto sin compromiso', quoteShort: 'Pedí presupuesto', quoteIntro: 'Dejanos fecha, zona y cantidad de invitados. Te escribimos por WhatsApp con la propuesta y el precio final.', servicesEyebrow: 'Servicios', servicesTitle: 'Decoración para cada celebración de la familia', servicesLink: 'Ver todos los servicios', heroTrust: ['Respuesta en 24 h hábiles', 'Montaje y desmontaje coordinados', 'Asunción y Gran Asunción'], optionsTitle: 'Opciones y precios estimados', idealTitle: 'Ideal para', howTitle: 'Cómo lo organizamos', otherServices: 'Otros servicios', menu: 'Abrí el menú', close: 'Cerrar', waLabel: 'Escribinos por WhatsApp', waTitle: '¿Qué necesitás?', waFoot: 'Se abre WhatsApp con el mensaje ya escrito.',
 calc: 'Calculá tu estimación', prices: 'Mirá los combos y precios', themeCta: 'Ver temáticas', home: 'Volver al inicio', inclusions: 'Qué incluye y qué no incluye', included: 'Qué incluye', exclusions: 'Exclusiones', montage: 'Montaje y desmontaje incluidos en la estimación', transparency: 'Precios estimados a la vista, sin preguntar al privado.',
 eyebrow: 'Baby shower en Asunción y Gran Asunción', packagesEyebrow: 'Combos', packages: 'Tres combos con precios estimados a la vista', calculator: 'Calculadora', calcTitle: 'Consultá tu estimación', band: 'Vos elegís la temática. Coordinamos horario de montaje con vos.', steps: 'Cómo funciona', stepsLink: 'Ver cómo funciona en detalle', moreGuides: 'Más guías para organizar tu evento', relatedGuides: 'Guías para organizar tu baby shower', themes: 'Temáticas para tu celebración', zones: 'Asunción y Gran Asunción', faq: 'Preguntas frecuentes', reveal: 'Revelación', revealLink: 'Consultá por una revelación de género', who: 'Quiénes somos', payments: 'Impuestos y formas de pago', contact: 'Escribinos y contanos tu idea', estimation: 'Estimación orientativa',
 hero: [`${PACKAGES[1].name}: decoración, mesa dulce y bocaditos para ${PACKAGES[1].included} invitados.`, priceCaption(PACKAGES[1].price), `${RESPONSE} Precios estimados a la vista, sin preguntar al privado.`],
 themesLink: `Ver las ${THEMES.length} temáticas`, faqLink: 'Ver todas las preguntas', zonesLink: 'Ver zonas y recargos estimados',
 consentTitle: 'Tus preferencias de cookies', consent: 'Usamos analítica solo si aceptás. Podés rechazarla o revocar tu consentimiento desde el pie de página. Referencia: la normativa paraguaya aplicable de protección de datos y comercio electrónico.', accept: 'Aceptar', reject: 'Rechazar', preferences: 'Preferencias de cookies',
 notFound: 'No encontramos esta página. Volvé al inicio o escribinos por WhatsApp.', thanks: `Recibimos tu consulta. ${RESPONSE} ${CONFIRMATION}`,
 form: { nombre: 'Tu nombre', whatsapp: 'Tu WhatsApp', fecha: 'Fecha tentativa', unknown: 'No sé todavía', invitados: 'Cantidad de invitados', tipo: 'Tipo de evento', zona: 'Zona', mensaje: 'Mensaje (opcional)', submit: 'Enviar consulta', reply: 'Te respondemos por WhatsApp al número que nos dejás', choose: 'Elegí una opción', privacy: 'Consultá cómo tratamos tus datos', types: [['baby-shower', 'Baby shower'], ['revelacion', 'Revelación de género'], ['primer-anito', 'Primer añito'], ['bautismo', 'Bautismo'], ['cumpleanos', 'Cumpleaños infantil'], ['globos', 'Decoración con globos'], ['bienvenida', 'Bienvenida de bebé'], ['otro', 'Otro']] },
 errors: { nombre: 'Escribí tu nombre, entre 2 y 60 caracteres.', whatsapp: 'Escribí un número de celular paraguayo válido.', fecha: 'Elegí una fecha de hoy en adelante o marcá No sé todavía.', invitados: 'Escribí una cantidad entera entre 5 y 200 invitados.', tipo: 'Elegí un tipo de evento de la lista.', zona: 'Elegí una zona de la lista.', mensaje: 'Tu mensaje puede tener hasta 500 caracteres.', invalid: 'No pudimos validar tu consulta. Volvé a cargar la página e intentá de nuevo.', rate: 'Recibimos varios intentos. Esperá un minuto y volvé a intentar, o escribinos por WhatsApp.', failure: `No pudimos guardar tu consulta. Escribinos por WhatsApp: ${SITE.phone}`, summary: 'Revisá los campos marcados y volvé a enviar tu consulta.', submitting: 'Enviando tu consulta…' }
};
export const PAGES = {
 '/': { title: 'Baby shower en Asunción | Precios estimados', description: 'Consultá combos de baby shower en Asunción y Gran Asunción. Mirá precios estimados, temáticas y qué incluye cada propuesta.', h1: 'Baby shower en Asunción con precio claro', type: 'home', faq: [...FAQ.slice(0, 2), { q: '¿Por qué los precios son estimados?', a: 'Cada evento cambia según la fecha, la zona y el alcance. Por eso mostramos precios estimados y confirmamos el precio final y la disponibilidad por WhatsApp antes de cualquier pago.' }, ...FAQ.slice(2, 6)] },
 '/como-funciona/': { title: 'Cómo funciona | Baby Shower Paraguay', description: 'Conocé cómo consultar por tu evento, coordinar los detalles y confirmar una propuesta por WhatsApp. Leé nuestras políticas previstas.', h1: 'Cómo funciona: consultás y coordinamos', type: 'process' },
 '/contacto/': { title: 'Contacto | Baby Shower Paraguay', description: 'Escribinos por WhatsApp o contanos tu fecha tentativa, zona y cantidad de invitados. Te respondemos dentro de 24 horas hábiles.', h1: 'Escribinos', type: 'contact' },
 '/preguntas-frecuentes/': { title: 'Preguntas frecuentes | Baby Shower Paraguay', description: 'Resolvé tus dudas sobre estimaciones, montaje, comida y zonas de atención para tu baby shower. Consultá los detalles por WhatsApp.', h1: 'Preguntas frecuentes', type: 'faq', faq: FAQ },
 '/privacidad/': { title: 'Privacidad | Baby Shower Paraguay', description: ANALYTICS_ID ? 'Conocé qué datos recibimos, para qué los usamos y cómo pedir su eliminación. Podés aceptar, rechazar o revocar la analítica del sitio.' : 'Conocé qué datos recibimos, para qué los usamos y cómo pedir su eliminación. Por ahora este sitio no usa analítica de terceros.', h1: 'Privacidad', type: 'privacy' },
 '/terminos/': { title: 'Términos | Baby Shower Paraguay', description: 'Leé el alcance de las estimaciones, las condiciones del sitio y la política prevista de reserva. Cada acuerdo requiere confirmación escrita.', h1: 'Términos', type: 'terms' }
};
export const EXTRAS = {
 '/404.html': { title: 'Página no encontrada | Baby Shower Paraguay', description: 'La página que buscás no está disponible. Volvé al inicio para ver nuestros combos o escribinos por WhatsApp y contanos tu idea.', h1: 'No encontramos esta página', type: 'notFound' },
 '/gracias.html': { title: 'Gracias por tu consulta | Baby Shower Paraguay', description: 'Gracias por escribir a Baby Shower Paraguay. Te respondemos dentro de 24 horas hábiles para conversar sobre tu propuesta y disponibilidad.', h1: 'Gracias por tu consulta', type: 'thanks' }
};

export const REVEAL = {
 intro: 'Una persona de tu confianza nos pasa solo el color por WhatsApp. No nos envíes estudios médicos.',
 packages: [
  { id: 'kit', name: 'Kit Sorpresa', price: 390000, description: 'Globo gigante negro con confeti del color + cartel + entrega en Asunción, Fernando de la Mora y Lambaré; otras zonas con recargo estimado. Ideal para una revelación sencilla en casa.' },
  { id: 'revelacion', name: 'Revelación Completa', price: 690000, description: 'Kit + fondo decorativo + arco pequeño + mesa con 20 dulces + montaje.' }
 ],
 cake: { id: 'torta-revelacion', name: 'Torta de revelación', price: 180000 },
 steps: ['Una persona de tu confianza nos pasa solo el color', 'Consultamos el alcance del kit con vos', 'Coordinamos la entrega o el montaje'],
 repeat: 'Si volvés con nosotros para el baby shower o el primer añito, te armamos una propuesta con un beneficio que cotizamos en el momento.'
};
export const ANITO = { id: 'anito', name: 'Combo Añito', price: 1950000, description: 'Arco y fondo decorativo temáticos, cartel con nombre y número 1, mesa dulce 30 unidades, torta temática, 60 bocaditos, vajilla temática, montaje y desmontaje.', chip: '30 invitados', themes: ['dino-bebe', 'moana-bebe', 'minnie-bebe', 'mickey-bebe', 'safari', 'blanca-nieves-bebe', 'frutillita-bebe'] };
export const EXTRA_FOOD = { basico: '', estrella: '+1 dulce y +2 salados por invitado extra.', premium: '+2 dulces y +3 salados por invitado extra.' };
export const COMPARISON = [
 ['Arco de globos', '2 metros', '3 metros, tres colores', 'Doble arco de 4 metros'],
 ['Fondo decorativo', 'Incluido', 'Incluido', 'Consultá el alcance'],
 ['Cartel del bebé', 'Incluido', 'Incluido', 'Acrílico personalizado'],
 ['Mesa dulce', 'No incluida', '30 unidades', '60 unidades más torta'],
 ['Bocaditos salados', 'No incluidos', '60 unidades', '120 unidades'],
 ['Bebidas', 'No incluidas', 'No incluidas', 'Sin alcohol'],
 ['Vajilla', 'No incluida', 'Descartable temática', 'Consultá el alcance'],
 ['Juegos', 'No incluidos', '3 juegos impresos', 'Juegos impresos'],
 ['Souvenirs', 'No incluidos', 'No incluidos', '40 unidades'],
 ['Coordinación del evento', 'No incluida', 'No incluida', 'Incluida']
];
Object.assign(PAGES, {
 '/combos-y-precios/': { type: 'combos', title: 'Combos y precios de baby shower | Paraguay', h1: 'Combos y precios de baby shower', description: 'Compará las inclusiones de cada combo de baby shower, sus precios estimados y adicionales. Calculá tu propuesta según invitados y zona.', intro: 'Acá podés ver qué incluye cada combo y qué queda fuera de la estimación. El precio final y la disponibilidad se confirman por WhatsApp. Montaje y desmontaje incluidos en la estimación.', faq: [FAQ[0], FAQ[1], FAQ[5], FAQ[7]] },
 '/revelacion-de-genero/': { type: 'reveal', title: 'Decoración para revelación de género en Asunción', h1: 'Revelación de género en Asunción: kit a domicilio o fiesta completa', description: 'Consultá por el Kit Sorpresa o la Revelación Completa en Asunción. Mirá precios estimados y cómo coordinar el color, la entrega y el montaje.', faq: [
  { q: '¿Cómo se mantiene el secreto?', a: REVEAL.intro },
  { q: '¿El humo se puede usar en interior?', a: 'No, solo exterior y a confirmar; para interior consultá por globo con confeti.' },
  { q: '¿Qué información necesitan?', a: 'Fecha tentativa y zona; no necesitamos estudios médicos.' },
  { q: '¿Puedo sumar la torta?', a: `${REVEAL.cake.name}: ${priceCaption(REVEAL.cake.price)}` }
 ] },
 '/primer-anito/': { type: 'anito', title: 'Decoración para primer añito en Asunción | 1 año', h1: 'Primer añito con temática, listo para disfrutar', description: 'Conocé el Combo Añito para 30 invitados con decoración, torta y bocaditos. Elegí una temática y consultá el precio final y la disponibilidad.', faq: [
  { q: '¿Puedo elegir cualquier temática?', a: 'Contanos qué temática tenés en mente y confirmamos el alcance por WhatsApp.' },
  { q: '¿Incluye la torta?', a: 'Sí, 1 piso, hasta 30 porciones, según la propuesta confirmada por WhatsApp.' },
  { q: '¿Sirve para salón de eventos?', a: 'Sí, coordinamos horario de ingreso con el salón, según la propuesta confirmada por WhatsApp.' }
 ] }
});

export const deliveryNote = z => z.delivery === null ? 'Recargo estimado por traslado: a cotizar por WhatsApp.' : `Recargo estimado por traslado: ${z.delivery === 0 ? ZERO_PRICE : fmtGs(z.delivery)}`;

// Servicios adicionales (2026-09-25, Anton: una página por grupo del KWP). Importes confirmados por Anton el 2026-09-25.
export const SERVICE_NOTE = 'Precios estimados para este servicio. El alcance, el precio final y la disponibilidad se confirman por WhatsApp.';
export const SERVICES = [
 { slug: 'decoracion-con-globos', nav: 'Decoración con globos', icon: 'globo', image: 'servicio-decoracion-con-globos', formType: 'globos', subject: 'decoración con globos',
  title: 'Decoración con globos en Asunción | Arcos y columnas', h1: 'Decoración con globos en Asunción: arcos, columnas y globos personalizados',
  description: 'Arcos de globos orgánicos, columnas y globos personalizados para cumpleaños, bautismos y baby showers en Asunción. Mirá precios estimados.',
  summary: 'Arcos orgánicos, columnas, centros de mesa y globos burbuja con nombre para cualquier celebración.',
  intro: 'Armamos decoración con globos para celebraciones familiares: un arco para la entrada, un rincón para fotos o globos burbuja con el nombre de quien festejás. Trabajamos en Asunción y Gran Asunción y coordinamos el montaje con vos.',
  offers: [
   { id: 'globos-personalizados', name: 'Set de globos personalizados', price: 150000, description: '3 globos burbuja con nombre o frase en vinilo, inflados con helio. Entrega en Asunción, Fernando de la Mora y Lambaré; otras zonas con recargo estimado.' },
   { id: 'globos-arco', name: 'Arco de globos orgánico', price: 550000, description: 'Arco orgánico de 2 metros en hasta tres colores, armado en el lugar. Montaje y desmontaje incluidos en la estimación.' },
   { id: 'globos-completa', name: 'Decoración con globos completa', price: 950000, description: 'Arco orgánico de 3 metros, dos columnas o guirnalda de entrada, 6 centros de mesa con globos y cartel con nombre o frase. Montaje y desmontaje incluidos en la estimación.' }
  ],
  ideal: ['Cumpleaños de chicos y grandes', 'Bautismos y bienvenidas de bebé', 'Baby shower y revelación de género', 'Aniversarios, graduaciones y reuniones familiares'],
  paragraph: 'Un arco orgánico mezcla globos de distintos tamaños para lograr un efecto natural, sin la rigidez de una fila pareja. Funciona en la entrada de un quincho, detrás de la mesa principal o como fondo para fotos. Para elegir la medida, mirá el ancho de la pared: en una sala de casa suele alcanzar un arco de 2 metros, mientras que en un salón o un patio amplio conviene pensar en 3 metros o sumar columnas a los costados. Los colores rinden más cuando elegís dos o tres tonos y los repetís en el cartel y en los centros de mesa. Los globos personalizados con vinilo son una opción práctica para regalar o para marcar la mesa de quien cumple años. Con calor fuerte y sol directo los globos duran menos; por eso conviene montar en un espacio con sombra y coordinar el horario cerca del inicio del evento.',
  themes: [], guides: ['arco-de-globos-para-baby-shower', 'centros-de-mesa-para-baby-shower', 'baby-shower-sencillo-en-casa'],
  faq: [
   { q: '¿Cuánto dura un arco de globos?', a: 'Depende del calor, del sol y del viento. Bajo techo dura bastante más que al sol; por eso coordinamos el montaje cerca del horario del evento.' },
   { q: '¿Puedo elegir los colores?', a: 'Sí. Contanos dos o tres colores y la ocasión; confirmamos por WhatsApp los tonos disponibles para tu fecha.' },
   { q: '¿Hacen globos con nombre?', a: 'Sí, globos burbuja con nombre o frase en vinilo. Set de globos personalizados: ' + priceCaption(150000) }
  ] },
 { slug: 'bautismo', nav: 'Bautismo', icon: 'gota', image: 'servicio-bautismo', formType: 'bautismo', subject: 'decoración para bautismo',
  title: 'Decoración para bautismo en Asunción | Precios estimados', h1: 'Decoración para bautismo en Asunción: arco, mesa dulce y torta',
  description: 'Decoración para bautismo de nena o varón en Asunción: arco de globos, cartel con nombre, mesa dulce y torta. Consultá precios estimados.',
  summary: 'Decoración en tonos claros para el festejo después de la ceremonia, con opción de mesa dulce y torta.',
  intro: 'Preparamos la decoración del festejo después de la ceremonia, en casa, en un quincho o en un salón. Vos elegís los colores y el estilo; nosotros coordinamos el montaje y lo que quieras sumar a la mesa.',
  offers: [
   { id: 'bautismo-deco', name: 'Bautismo Deco', price: 1150000, description: 'Arco de globos de 2 metros en blanco, dorado o tonos pastel, fondo decorativo, cartel con el nombre y la fecha y mesa principal ambientada. Montaje y desmontaje incluidos en la estimación.' },
   { id: 'bautismo-completo', name: 'Bautismo Completo', price: 2050000, description: 'Bautismo Deco más mesa dulce de 30 unidades, torta de 1 piso, 60 bocaditos salados y vajilla descartable, para 30 invitados.' }
  ],
  ideal: ['Bautismo de nena o de varón', 'Festejo en casa, quincho o salón', 'Almuerzo o merienda después de la ceremonia', 'Padrinos que quieren regalar la decoración'],
  paragraph: 'Para un bautismo suelen funcionar los tonos claros: blanco con dorado, celeste con gris perla, rosa empolvado con crema o verde salvia con blanco. Un arco de globos detrás de la mesa principal, un cartel con el nombre y la fecha y algunos detalles en las mesas alcanzan para que el lugar se vea preparado sin recargarlo. Si el festejo es al mediodía, pensá en la sombra y en dónde va a quedar la torta, que suele ser el centro de las fotos. Contanos si la reunión es en casa, en un quincho o en un salón, cuántos invitados esperás y a qué hora termina la ceremonia; con esos datos coordinamos el montaje para que todo esté listo cuando llegue la familia. Los souvenirs y los centros de mesa se suman según el presupuesto y la cantidad de invitados.',
  themes: ['nubes-y-ositos', 'mariposas'], guides: ['mesa-dulce-para-baby-shower', 'centros-de-mesa-para-baby-shower', 'souvenirs-para-baby-shower'],
  faq: [
   { q: '¿Incluye la torta?', a: 'Bautismo Completo incluye una torta de 1 piso en la estimación. En Bautismo Deco podés sumar una ' + ADDONS[0].name.toLowerCase() + ': ' + priceCaption(ADDONS[0].price) },
   { q: '¿Tienen souvenirs para bautismo?', a: 'Sí, podés sumar ' + ADDONS[1].name.toLowerCase() + ': ' + priceCaption(ADDONS[1].price) },
   { q: '¿Pueden montar mientras estamos en la ceremonia?', a: 'Sí, si alguien de confianza nos abre el lugar. Coordinamos el horario de montaje con vos según la propuesta confirmada por WhatsApp.' }
  ] },
 { slug: 'cumpleanos-infantil', nav: 'Cumpleaños infantil', icon: 'fiesta', image: 'servicio-cumpleanos-infantil', formType: 'cumpleanos', subject: 'decoración de cumpleaños infantil',
  title: 'Decoración de cumpleaños infantil en Asunción', h1: 'Decoración de cumpleaños infantil en Asunción, con la temática que elijan',
  description: 'Decoración para cumpleaños infantiles en Asunción: arco de globos temático, cartel con nombre y edad, mesa dulce y torta. Mirá precios estimados.',
  summary: 'Arco temático, cartel con nombre y edad, mesa dulce y torta para cumpleaños en casa o en salón.',
  intro: 'Del primer añito en adelante: armamos la decoración del cumpleaños con la temática que elija la familia, en casa, en un quincho o en un salón de fiestas infantiles.',
  offers: [
   { id: 'cumple-deco', name: 'Cumple Deco', price: 1250000, description: 'Arco de globos de 3 metros con los colores de la temática, fondo decorativo, cartel con nombre y edad y centros de mesa para 5 mesas. Montaje y desmontaje incluidos en la estimación.' },
   { id: 'cumple-completo', name: 'Cumple Completo', price: 2300000, description: 'Cumple Deco más mesa dulce de 40 unidades, torta temática de 1 piso, 80 bocaditos salados y vajilla temática, para 40 invitados entre chicos y adultos.' }
  ],
  ideal: ['Cumpleaños de 1 a 10 años', 'Fiestas en casa, quincho o salón infantil', 'Temáticas elegidas por la familia', 'Festejos con chicos y adultos'],
  paragraph: 'En un cumpleaños infantil la decoración tiene que convivir con chicos corriendo, así que conviene dejar el arco y el fondo contra una pared y liberar el centro para jugar. Elegí una temática y dos o tres colores que se repitan en el cartel, la mesa dulce y los centros de mesa; dinosaurios, safari o mariposas funcionan bien si no se recarga cada rincón. Contanos la edad, porque no se decora igual un cumpleaños de 3 años que uno de 8: a los más grandes les gusta participar en la elección. Si la fiesta es en un salón infantil, pasanos las reglas de ingreso y el horario de montaje. Para calcular la mesa dulce y los bocaditos, contá por separado chicos y adultos: los adultos suelen quedarse más tiempo y comer más salado.',
  themes: ['dino-bebe', 'safari', 'mariposas', 'moana-bebe'], guides: ['fiesta-de-primer-anito', 'primer-anito-varon', 'mesa-dulce-para-baby-shower'],
  faq: [
   { q: '¿Qué temáticas hacen?', a: 'Contanos la temática que eligieron y confirmamos por WhatsApp qué elementos podemos incluir según el alcance.' },
   { q: '¿Sirve para un salón de fiestas infantiles?', a: 'Sí, coordinamos el horario de ingreso con el salón según la propuesta confirmada por WhatsApp.' },
   { q: '¿Para cuántos invitados es el Cumple Completo?', a: 'La estimación contempla 40 invitados entre chicos y adultos. Si son más, lo cotizamos por WhatsApp.' }
  ] },
 { slug: 'bienvenida-de-bebe', nav: 'Bienvenida de bebé', icon: 'casa', image: 'servicio-bienvenida-de-bebe', formType: 'bienvenida', subject: 'una bienvenida de bebé',
  title: 'Bienvenida de bebé en casa | Decoración en Asunción', h1: 'Bienvenida de bebé: decoración para recibirlo en casa',
  description: 'Decoración de bienvenida para el bebé en casa: guirnalda de globos, cartel con el nombre y mesa dulce para las visitas en Asunción.',
  summary: 'Globos y cartel con el nombre para recibir al bebé en casa, con opción de mesa dulce para las visitas.',
  intro: 'Para el regreso a casa después del nacimiento: dejamos lista la entrada o la sala con globos y un cartel con el nombre, coordinando el horario con la familia para que todo esté preparado al llegar.',
  offers: [
   { id: 'bienvenida-casa', name: 'Bienvenida en casa', price: 450000, description: 'Guirnalda de globos para la puerta o la sala, cartel de bienvenida con el nombre y 2 globos burbuja. Montaje incluido en la estimación; coordinamos el horario con la familia.' },
   { id: 'bienvenida-mesa', name: 'Bienvenida con mesa dulce', price: 890000, description: 'Bienvenida en casa más mesa dulce de 20 unidades y 30 bocaditos salados para la visita de familiares.' }
  ],
  ideal: ['Regreso a casa después del nacimiento', 'Sorpresa organizada por familia o amigas', 'Visita de abuelos y padrinos', 'Presentación del bebé a la familia'],
  paragraph: 'La bienvenida suele organizarla alguien de la familia o una amiga mientras la mamá y el bebé todavía no volvieron a casa. Por eso conviene tener resuelto quién abre la puerta, en qué horario y dónde va el cartel. Una guirnalda de globos en la entrada o en la sala, con colores suaves, alcanza para que la llegada se sienta especial sin llenar el lugar de cosas: en los primeros días la casa necesita espacio para descansar. Si van a venir abuelos y tíos a conocer al bebé, una mesa dulce chica y algunos bocaditos resuelven la visita sin que nadie tenga que cocinar. Pedí que los globos queden lejos de la cuna y del paso. Si querés decorar en el sanatorio, consultá primero sus reglas: cada lugar tiene las suyas.',
  themes: ['nubes-y-ositos'], guides: ['ajuar-para-bebe', 'nombres-de-bebe-paraguay', 'que-regalar-en-un-baby-shower'],
  faq: [
   { q: '¿Pueden decorar mientras la familia no está en casa?', a: 'Sí, si alguien de confianza nos abre la casa. Coordinamos el día y el horario por WhatsApp.' },
   { q: '¿Decoran en el sanatorio?', a: 'Cada sanatorio tiene sus propias reglas. Consultá primero con el lugar y contanos qué permiten; confirmamos el alcance por WhatsApp.' },
   { q: '¿Con cuánta anticipación hay que avisar?', a: 'Como la fecha depende del alta, escribinos apenas tengas un día estimado y confirmamos la disponibilidad por WhatsApp.' }
  ] }
];
// Tarjetas del resumen /servicios/: servicios existentes con su importe configurado más los nuevos.
export const SERVICE_HUB = [
 { route: '/combos-y-precios/', name: 'Baby shower', icon: 'corazon', summary: 'Tres combos con decoración, mesa dulce y bocaditos, con precios estimados a la vista y calculadora.', price: PACKAGES[0].price },
 { route: '/revelacion-de-genero/', name: 'Revelación de género', icon: 'destello', summary: 'Kit Sorpresa a domicilio o fiesta completa; el color lo guarda alguien de tu confianza.', price: REVEAL.packages[0].price },
 { route: '/primer-anito/', name: 'Primer añito', icon: 'torta', summary: 'Combo Añito con temática, torta y bocaditos para 30 invitados.', price: ANITO.price },
 ...SERVICES.map(s => ({ route: `/${s.slug}/`, name: s.nav, icon: s.icon, summary: s.summary, price: Math.min(...s.offers.map(o => o.price)) }))
];
for (const s of SERVICES) PAGES[`/${s.slug}/`] = { type: 'service', detail: s, title: s.title, h1: s.h1, description: s.description, faq: s.faq };
PAGES['/servicios/'] = { type: 'services', image: 'servicios-decoracion-eventos', title: 'Servicios de decoración para eventos en Asunción', h1: 'Servicios de decoración para celebraciones familiares', description: 'Baby shower, revelación de género, primer añito, bautismo, cumpleaños infantil, bienvenida de bebé y decoración con globos en Gran Asunción.', intro: 'Organizamos la decoración de las celebraciones de la familia, desde la espera del bebé hasta sus primeros cumpleaños. Elegí el servicio, mirá qué incluye y el precio estimado, y escribinos con la fecha y la zona.', faq: [
 { q: '¿Puedo combinar servicios?', a: 'Sí. Por ejemplo, una revelación de género y después el baby shower, o globos personalizados para un cumpleaños. Contanos qué necesitás y armamos la propuesta por WhatsApp.' },
 { q: '¿En qué zonas trabajan?', a: DELIVERY },
 { q: '¿El precio que veo es definitivo?', a: 'No. Son estimaciones orientativas. ' + CONFIRMATION }
] };
