<?php
declare(strict_types=1);

// Generated public defaults only; private deployment configuration is never read by Node.
// BEGIN SITE DEFAULTS
const SITE_DEFAULTS = 'eyJsZWFkRW1haWwiOiIiLCJ6b25lcyI6WyJhc3VuY2lvbiIsImZlcm5hbmRvLWRlLWxhLW1vcmEiLCJsYW1iYXJlIiwic2FuLWxvcmVuem8iLCJsdXF1ZSIsIm1hcmlhbm8tcm9xdWUtYWxvbnNvIiwiY2FwaWF0YSIsIm90cmEiXSwicm91dGVzIjpbIi8iLCIvY29tby1mdW5jaW9uYS8iLCIvY29udGFjdG8vIiwiL3ByZWd1bnRhcy1mcmVjdWVudGVzLyIsIi9wcml2YWNpZGFkLyIsIi90ZXJtaW5vcy8iLCIvY29tYm9zLXktcHJlY2lvcy8iLCIvcmV2ZWxhY2lvbi1kZS1nZW5lcm8vIiwiL3ByaW1lci1hbml0by8iLCIvdGVtYXRpY2FzLyIsIi90ZW1hdGljYXMvamVmZS1lbi1wYW5hbGVzLyIsIi90ZW1hdGljYXMvZGluby1iZWJlLyIsIi90ZW1hdGljYXMvbW9hbmEtYmViZS8iLCIvdGVtYXRpY2FzL21pbm5pZS1iZWJlLyIsIi90ZW1hdGljYXMvbWlja2V5LWJlYmUvIiwiL3RlbWF0aWNhcy9ibGFuY2EtbmlldmVzLWJlYmUvIiwiL3RlbWF0aWNhcy9mcnV0aWxsaXRhLWJlYmUvIiwiL3RlbWF0aWNhcy9tYXJpcG9zYXMvIiwiL3RlbWF0aWNhcy9zYWZhcmkvIiwiL3RlbWF0aWNhcy9udWJlcy15LW9zaXRvcy8iLCIvem9uYXMvIiwiL3pvbmFzL2FzdW5jaW9uLyIsIi96b25hcy9sdXF1ZS8iLCIvem9uYXMvc2FuLWxvcmVuem8vIiwiL3pvbmFzL2Zlcm5hbmRvLWRlLWxhLW1vcmEvIiwiL3pvbmFzL2xhbWJhcmUvIiwiL3pvbmFzL2NhcGlhdGEvIiwiL3pvbmFzL21hcmlhbm8tcm9xdWUtYWxvbnNvLyIsIi9pZGVhcy8iLCIvaWRlYXMvaWRlYXMtcGFyYS1iYWJ5LXNob3dlci8iLCIvaWRlYXMvanVlZ29zLXBhcmEtYmFieS1zaG93ZXIvIiwiL2lkZWFzL2JhYnktc2hvd2VyLXNlbmNpbGxvLWVuLWNhc2EvIiwiL2lkZWFzL3JldmVsYWNpb24tZGUtZ2VuZXJvLXNlbmNpbGxhLyIsIi9pZGVhcy9xdWUtc2UtbmVjZXNpdGEtcGFyYS11bi1iYWJ5LXNob3dlci8iLCIvaWRlYXMvY2VudHJvcy1kZS1tZXNhLXBhcmEtYmFieS1zaG93ZXIvIiwiL2lkZWFzL3F1ZS1yZWdhbGFyLWVuLXVuLWJhYnktc2hvd2VyLyIsIi9pZGVhcy9iYWJ5LXNob3dlci1kZS1uaW5hLyIsIi9pZGVhcy9maWVzdGEtZGUtcHJpbWVyLWFuaXRvLyIsIi9pZGVhcy9iYWJ5LXNob3dlci1kZS1uaW5vLyIsIi9pZGVhcy9tZXNhLWR1bGNlLXBhcmEtYmFieS1zaG93ZXIvIiwiL2lkZWFzL3NvdXZlbmlycy1wYXJhLWJhYnktc2hvd2VyLyIsIi9pZGVhcy90b3J0YS1wYXJhLWJhYnktc2hvd2VyLyIsIi9pZGVhcy90b3J0YS1wYXJhLXJldmVsYWNpb24tZGUtZ2VuZXJvLyIsIi9pZGVhcy9qdWVnb3MtcGFyYS1yZXZlbGFjaW9uLWRlLWdlbmVyby8iLCIvaWRlYXMvYXJjby1kZS1nbG9ib3MtcGFyYS1iYWJ5LXNob3dlci8iLCIvaWRlYXMvcHJpbWVyLWFuaXRvLXZhcm9uLyJdLCJlcnJvcnMiOnsibm9tYnJlIjoiRXNjcmliw60gdHUgbm9tYnJlLCBlbnRyZSAyIHkgNjAgY2FyYWN0ZXJlcy4iLCJ3aGF0c2FwcCI6IkVzY3JpYsOtIHVuIG7Dum1lcm8gZGUgY2VsdWxhciBwYXJhZ3VheW8gdsOhbGlkby4iLCJmZWNoYSI6IkVsZWfDrSB1bmEgZmVjaGEgZGUgaG95IGVuIGFkZWxhbnRlIG8gbWFyY8OhIE5vIHPDqSB0b2RhdsOtYS4iLCJpbnZpdGFkb3MiOiJFc2NyaWLDrSB1bmEgY2FudGlkYWQgZW50ZXJhIGVudHJlIDUgeSAyMDAgaW52aXRhZG9zLiIsInRpcG8iOiJFbGVnw60gdW4gdGlwbyBkZSBldmVudG8gZGUgbGEgbGlzdGEuIiwiem9uYSI6IkVsZWfDrSB1bmEgem9uYSBkZSBsYSBsaXN0YS4iLCJtZW5zYWplIjoiVHUgbWVuc2FqZSBwdWVkZSB0ZW5lciBoYXN0YSA1MDAgY2FyYWN0ZXJlcy4iLCJpbnZhbGlkIjoiTm8gcHVkaW1vcyB2YWxpZGFyIHR1IGNvbnN1bHRhLiBWb2x2w6kgYSBjYXJnYXIgbGEgcMOhZ2luYSBlIGludGVudMOhIGRlIG51ZXZvLiIsInJhdGUiOiJSZWNpYmltb3MgdmFyaW9zIGludGVudG9zLiBFc3BlcsOhIHVuIG1pbnV0byB5IHZvbHbDqSBhIGludGVudGFyLCBvIGVzY3JpYmlub3MgcG9yIFdoYXRzQXBwLiIsImZhaWx1cmUiOiJObyBwdWRpbW9zIGd1YXJkYXIgdHUgY29uc3VsdGEuIEVzY3JpYmlub3MgcG9yIFdoYXRzQXBwOiArNTk1IDk5MiAyNzkgNTk5Iiwic3VtbWFyeSI6IlJldmlzw6EgbG9zIGNhbXBvcyBtYXJjYWRvcyB5IHZvbHbDqSBhIGVudmlhciB0dSBjb25zdWx0YS4iLCJzdWJtaXR0aW5nIjoiRW52aWFuZG8gdHUgY29uc3VsdGHigKYifSwid2EiOiI1OTU5OTIyNzk1OTkiLCJ1cmwiOiJodHRwczovL2JhYnlzaG93ZXIuY29tLnB5In0=';
// END SITE DEFAULTS
$site = json_decode(base64_decode(SITE_DEFAULTS), true) ?: [];
const JSON_FLAGS = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE;
date_default_timezone_set('America/Asuncion');
header('Cache-Control: no-store');

function field(string $name): string {
    return isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : '';
}
function escape_html(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function fail_form(array $errors, int $status = 422): void {
    global $site;
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('X-Robots-Tag: noindex');
    $html = (string) @file_get_contents(__DIR__ . '/contacto/index.html');
    $messages = $site['errors'];
    $summary = $messages['failure'];
    foreach ($errors as $error) if ($error !== 'failure') $summary .= ' ' . ($messages[$error] ?? $messages['invalid']);
    $alert = '<p role="alert" tabindex="-1" data-form-errors>' . escape_html($summary)
        . ' <a href="https://wa.me/' . escape_html($site['wa']) . '">Consultá por WhatsApp</a></p>';
    $html = preg_replace('~<p role="alert" tabindex="-1" data-form-errors hidden></p>~', $alert, $html);
    $html = str_replace('data-lead-form>', 'data-lead-form data-server-error>', $html);
    foreach (['nombre','whatsapp','fecha','invitados','tipo','zona','mensaje','origen','sid'] as $name) {
        $value = escape_html(field($name));
        $html = preg_replace_callback('~<input\b[^>]*\bname="' . $name . '"[^>]*>~', static function ($m) use ($value) {
            return substr(preg_replace('~\svalue="[^"]*"~', '', $m[0]), 0, -1) . ' value="' . $value . '">';
        }, $html);
        if ($name === 'mensaje') $html = preg_replace_callback('~(<textarea\b[^>]*name="mensaje"[^>]*>).*?(</textarea>)~s', static fn($m) => $m[1] . $value . $m[2], $html);
        if (in_array($name, ['tipo','zona'], true)) $html = preg_replace_callback('~(<select\b[^>]*name="' . $name . '"[^>]*>)(.*?)(</select>)~s', static fn($m) => $m[1] . str_replace('value="' . $value . '"', 'value="' . $value . '" selected', $m[2]) . $m[3], $html);
        if (in_array($name, $errors, true)) {
            $html = str_replace('id="' . $name . '"', 'id="' . $name . '" aria-invalid="true"', $html);
            $html = str_replace('id="error-' . $name . '" hidden></span>', 'id="error-' . $name . '">' . escape_html($messages[$name]) . '</span>', $html);
        }
    }
    if (field('fecha_desconocida') === '1') $html = str_replace('data-date-unknown>', 'data-date-unknown checked>', $html);
    echo $html !== '' ? $html : '<!doctype html><html lang="es-PY"><meta charset="utf-8"><title>Consulta</title>' . $alert . '<a href="/contacto/">Volver al formulario</a></html>';
    exit;
}
function success(string $sid): void {
    setcookie('bs_lead_success', $sid, ['expires' => time() + 3600, 'path' => '/', 'secure' => true, 'httponly' => false, 'samesite' => 'Lax']);
    header('Location: /gracias.html', true, 303);
    exit;
}
function durable_write($handle, string $data): bool {
    $offset = 0;
    while ($offset < strlen($data)) {
        $written = @fwrite($handle, substr($data, $offset));
        if ($written === false || $written === 0) return false;
        $offset += $written;
    }
    return @fflush($handle) && (!function_exists('fsync') || @fsync($handle));
}
function save_state(string $path, array $data): bool {
    $handle = @fopen($path . '.tmp', 'wb');
    if (!$handle) return false;
    $ok = durable_write($handle, json_encode($data, JSON_FLAGS));
    fclose($handle);
    return $ok && @rename($path . '.tmp', $path);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /contacto/', true, 303); exit;
}
// Use the addon domain document root, not the account's main public_html.
$documentRoot = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) ?: __DIR__;
$privateRoot = dirname($documentRoot);
$configPath = $privateRoot . '/vendercrm-config.babyshower.php';
$config = is_file($configPath) ? (require $configPath) : [];
if (!is_array($config)) $config = [];
$notificationEmail = defined('BABYSHOWER_LEAD_EMAIL') && trim((string) BABYSHOWER_LEAD_EMAIL) !== ''
    ? trim((string) BABYSHOWER_LEAD_EMAIL) : trim((string) ($config['lead_email'] ?? ''));
if ($notificationEmail === '') $notificationEmail = $site['leadEmail'] ?? '';

// Private state is required for rate limits and successful-SID receipts; fail closed.
$stateDir = $privateRoot . '/.babyshower-state';
if (!is_dir($stateDir) && !@mkdir($stateDir, 0700, true)) fail_form(['failure'], 503);
$lock = @fopen($stateDir . '/lock', 'c');
if (!$lock || !flock($lock, LOCK_EX)) fail_form(['failure'], 503);
$ratePath = $stateDir . '/rate.json';
$rates = is_file($ratePath) ? json_decode((string) @file_get_contents($ratePath), true) : [];
if (!is_array($rates)) fail_form(['failure'], 503);
$now = time();
foreach ($rates as $key => $times) {
    $rates[$key] = array_values(array_filter($times, static fn($t) => $t > $now - 60));
    if (!$rates[$key]) unset($rates[$key]);
}
$ip = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (count($rates[$ip] ?? []) >= 5) { header('Retry-After: 60'); fail_form(['rate'], 429); }
$rates[$ip][] = $now;
if (!save_state($ratePath, $rates)) fail_form(['failure'], 503);
if (field('empresa') !== '' || (isset($_POST['empresa']) && !is_string($_POST['empresa']))) fail_form(['invalid']);

$lead = [];
$errors = [];
foreach (['nombre','whatsapp','fecha','invitados','tipo','zona','mensaje','origen','sid'] as $name) {
    $lead[$name] = field($name);
    if (isset($_POST[$name]) && !is_string($_POST[$name])) $errors[] = 'invalid';
}
if ($lead['sid'] === '') {
    $lead['sid'] = 'BS-' . date('Ymd') . '-' . bin2hex(random_bytes(2));
}
$length = static function (string $s): int { return preg_match_all('/./us', $s, $matches) ?: 0; };
if ($length($lead['nombre']) < 2 || $length($lead['nombre']) > 60) $errors[] = 'nombre';
$lead['whatsapp'] = str_replace([' ', '-', '(', ')', '.'], '', $lead['whatsapp']);
if (!preg_match('/^(?:0|\+?595)9[0-9]{8}$/D', $lead['whatsapp'])) $errors[] = 'whatsapp';
$lead['whatsapp'] = preg_replace('/^0/', '595', ltrim($lead['whatsapp'], '+'));
if (field('fecha_desconocida') === '1') $lead['fecha'] = '';
if ($lead['fecha'] !== '') {
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $lead['fecha']);
    if (!$date || $date->format('Y-m-d') !== $lead['fecha'] || $lead['fecha'] < date('Y-m-d')) $errors[] = 'fecha';
}
if ($lead['invitados'] !== '' && (!preg_match('/^[0-9]+$/D', $lead['invitados']) || (int)$lead['invitados'] < 5 || (int)$lead['invitados'] > 200)) $errors[] = 'invitados';
if (!in_array($lead['tipo'], ['baby-shower','revelacion','primer-anito','otro'], true)) $errors[] = 'tipo';
if (!in_array($lead['zona'], $site['zones'], true)) $errors[] = 'zona';
if (!preg_match('//u', $lead['mensaje']) || $length($lead['mensaje']) > 500) $errors[] = 'mensaje';
if (!in_array($lead['origen'], $site['routes'], true) || !preg_match('/^BS-[0-9]{8}-[a-z0-9]{4}$/Di', $lead['sid'])) $errors[] = 'invalid';
if ($errors) fail_form(array_unique($errors));
$sid = $lead['sid'];
$fingerprint = hash('sha256', json_encode($lead, JSON_FLAGS));
$receiptPath = $stateDir . '/' . hash('sha256', $sid) . '.json';
if (is_file($receiptPath)) {
    $receipt = json_decode((string) @file_get_contents($receiptPath), true);
    if (($receipt['fingerprint'] ?? '') !== $fingerprint) fail_form(['invalid']);
    if (!empty($receipt['notified'])) success($sid);
}

// A single durable JSON line per SID, before any network side effect.
$logPath = $privateRoot . '/leads.log';
if (!is_file($logPath) && !is_writable($privateRoot)) $logPath = __DIR__ . '/leads.log';
$log = @fopen($logPath, 'c+b');
if (!$log || !flock($log, LOCK_EX)) fail_form(['failure'], 503);
$found = false;
while (($line = fgets($log)) !== false) {
    $row = json_decode($line, true);
    if (!is_array($row)) fail_form(['failure'], 503);
    if (($row['lead']['sid'] ?? '') === $sid) {
        if (($row['fingerprint'] ?? '') !== $fingerprint) fail_form(['invalid']);
        $found = true;
    }
}
if (!$found) {
    fseek($log, 0, SEEK_END);
    $start = ftell($log);
    if (!durable_write($log, json_encode(['ts' => gmdate('c'), 'fingerprint' => $fingerprint, 'lead' => $lead], JSON_FLAGS) . "\n")) {
        @ftruncate($log, $start); @fflush($log); fail_form(['failure'], 503);
    }
}
flock($log, LOCK_UN); fclose($log);

// Payload follows tasacion's /api/v1/leads contract; unmapped fields stay in message.
$note = "Pipeline: Baby Shower\nStage: Nuevo\n";
foreach ($lead as $key => $value) $note .= $key . ': ' . $value . "\n";
$payload = ['phone' => '+' . $lead['whatsapp'], 'name' => $lead['nombre'], 'message' => $note,
    'source' => 'site:babyshower', 'page_url' => $site['url'] . $lead['origen'],
    'idempotency_key' => hash('sha256', 'babyshower|' . $sid)];
$emailed = false;
if ($notificationEmail !== '' && filter_var($notificationEmail, FILTER_VALIDATE_EMAIL) && function_exists('mail')) {
    // An on-domain From keeps shared-hosting mail out of spam; the host comes from the generated site defaults.
    $mailHost = (string) parse_url((string) ($site['url'] ?? ''), PHP_URL_HOST);
    $fromHeader = $mailHost !== '' ? 'From: Baby Shower <no-reply@' . $mailHost . ">\r\n" : '';
    $emailed = @mail($notificationEmail, 'Nueva consulta Baby Shower', $note, $fromHeader . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8");
}
$forwarded = false;
$crmUrl = trim((string) ($config['url'] ?? ''));
$crmKey = (string) ($config['api_key'] ?? '');
if ($crmUrl !== '' && $crmKey !== '' && filter_var($crmUrl, FILTER_VALIDATE_URL) && parse_url($crmUrl, PHP_URL_SCHEME) === 'https' && function_exists('curl_init')) {
    $ch = curl_init(rtrim($crmUrl, '/') . '/api/v1/leads');
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10, CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'X-Api-Key: ' . $crmKey],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_FLAGS)]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $forwarded = $response !== false && in_array($status, [200, 201], true);
    curl_close($ch);
    // Never log response bodies, headers, config, or credentials.
}
if (!$emailed && !$forwarded) fail_form(['failure'], 503);
if (!save_state($receiptPath, ['fingerprint' => $fingerprint, 'notified' => true])) fail_form(['failure'], 503);
success($sid);
