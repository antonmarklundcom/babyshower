<?php
// Copy outside the document root: one level above public_html,
// named vendercrm-config.babyshower.php. Never commit the real file.
// Replace placeholders privately; leave unused settings empty.
// Optional constant BABYSHOWER_LEAD_EMAIL overrides lead_email when non-empty.
return [
    'lead_email' => 'REEMPLAZAR', // Notification recipient; never public site content.
    'url' => 'REEMPLAZAR',        // HTTPS base URL; pipeline Baby Shower, stage Nuevo.
    'api_key' => '',             // Configure the site credential privately on the host.
];
