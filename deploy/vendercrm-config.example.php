<?php
// Copy outside the document root: one level above public_html,
// named vendercrm-config.babyshower.php. Never commit the real file.
// Replace placeholders privately; leave unused settings empty.
// Optional constant BABYSHOWER_LEAD_EMAIL overrides lead_email when non-empty.
return [
    'lead_email' => 'REEMPLAZAR', // Notification recipient; never public site content.
    'url' => 'https://crm.clientes.com.py', // VenderCRM base URL; the site's pipeline stage is set in the CRM.
    'api_key' => '',             // Configure the site credential privately on the host.
    // Only if the site sits behind a proxy: 'cloudflare' (uses CF-Connecting-IP from Cloudflare edges)
    // or a list of proxy CIDRs such as ['10.0.0.0/8'] (uses the right-most untrusted X-Forwarded-For hop).
    // Leave null when visitors connect directly; the rate limit then keys on REMOTE_ADDR.
    'trusted_proxy' => null,
];
