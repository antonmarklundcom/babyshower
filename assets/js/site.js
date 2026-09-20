/* Shared progressive enhancement. Public strings come from content.mjs. */
(function () {
  'use strict';
  var cfg = JSON.parse(document.getElementById('site-config').textContent);
  var ID = cfg.analyticsId;
  var banner = document.querySelector('[data-consent-banner]');
  function stored(key) { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  var choice = stored(cfg.consentKey);
  var tagLoaded = false;
  var lastEvents = new Map();
  function loadAnalytics() {
    if (choice !== 'accepted' || !ID) return;
    window['ga-disable-' + ID] = false;
    if (tagLoaded) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', ID, { anonymize_ip: true, send_page_view: false });
    // Never pass query strings (which may contain form error state) to analytics.
    window.gtag('event', 'page_view', { page_location: location.origin + location.pathname, page_path: location.pathname });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    document.head.appendChild(script);
    tagLoaded = true;
  }
  function event(name, loc, identity) {
    if (choice !== 'accepted' || !ID || !tagLoaded) return;
    if (!['whatsapp_click', 'calc_submit', 'form_submit'].includes(name)) return;
    var key = name + ':' + (identity || loc);
    var now = Date.now();
    if (lastEvents.has(key) && now - lastEvents.get(key) < 1000) return;
    lastEvents.set(key, now);
    window.gtag('event', name, { ev_loc: loc || '', page_path: location.pathname, page_location: location.origin + location.pathname });
  }
  // B2 can dispatch bs:calc-submit without coupling navigation to analytics.
  document.addEventListener('bs:calc-submit', function () { event('calc_submit', 'calculadora'); });
  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (item) {
      var name = item.split('=')[0].trim();
      if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) return;
      document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax';
      var labels = location.hostname.split('.');
      while (labels.length > 1) {
        document.cookie = name + '=; Max-Age=0; Path=/; Domain=.' + labels.join('.') + '; SameSite=Lax';
        labels.shift();
      }
    });
  }
  function reject() {
    choice = 'rejected';
    save(cfg.consentKey, choice);
    if (ID) window['ga-disable-' + ID] = true;
    if (tagLoaded) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    clearAnalyticsCookies();
  }
  function thanksConversion() {
    // B5 contract: server sets bs_lead_success=BS-yyyymmdd-xxxx only AFTER
    // durable log + notification success, then redirects to /gracias.html.
    // A query parameter, form click or direct visit is never proof of success.
    if (location.pathname !== '/gracias.html' || choice !== 'accepted' || !ID) return;
    var match = document.cookie.match(/(?:^|;\s*)bs_lead_success=(BS-\d{8}-[a-z0-9]{4})(?:;|$)/i);
    if (!match) return;
    var key = 'bs-converted:' + match[1];
    if (stored(key) !== '1') {
      event('form_submit', 'gracias', match[1]);
      save(key, '1');
    }
    document.cookie = cfg.successCookie + '=; Max-Age=0; Path=/; SameSite=Lax';
  }
  if (banner) banner.hidden = choice === 'accepted' || choice === 'rejected';
  loadAnalytics();
  thanksConversion();
  document.querySelectorAll('[data-consent]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (button.dataset.consent === 'accepted') {
        choice = 'accepted'; save(cfg.consentKey, choice); loadAnalytics(); thanksConversion();
      } else reject();
      banner.hidden = true;
    });
  });
  document.querySelectorAll('[data-consent-revoke]').forEach(function (button) {
    button.addEventListener('click', function () {
      reject();
      banner.hidden = false;
      banner.querySelector('[data-consent]').focus();
    });
  });
  document.addEventListener('click', function (e) {
    var target = e.target.closest('[data-ev]');
    if (!target || target.hasAttribute('data-wa-trigger')) return;
    // form_submit is reserved for server-confirmed thanks visits.
    if (target.dataset.ev === 'whatsapp_click') event('whatsapp_click', target.dataset.evLoc);
  });

  /* Header and WhatsApp panel adapted from tasacion-com-py. */
  var hdr = document.querySelector('[data-hdr]');
  var burger = document.querySelector('[data-hdr-burger]');
  var nav = document.querySelector('[data-hdr-panel]');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll(); document.addEventListener('scroll', onScroll, { passive: true });
  }
  if (burger && nav) {
    function closeNav() { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
    burger.addEventListener('click', function () { burger.setAttribute('aria-expanded', nav.classList.toggle('is-open') ? 'true' : 'false'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); burger.focus(); } });
    document.addEventListener('click', function (e) { if (!hdr.contains(e.target)) closeNav(); });
  }
  var menu = document.querySelector('[data-wa-menu]');
  var triggers = Array.from(document.querySelectorAll('[data-wa-trigger]'));
  if (menu && triggers.length) {
    var panel = menu.querySelector('[data-wa-panel]');
    var lastTrigger;
    var inertTargets = Array.from(document.querySelectorAll('header, main, footer, .mobile-bar, .wa-fab, .consent'));
    function closeMenu(returnFocus) {
      menu.hidden = true;
      triggers.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      inertTargets.forEach(function (el) { el.inert = false; });
      document.body.style.overflow = '';
      if (returnFocus && lastTrigger) lastTrigger.focus();
    }
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (!menu.hidden) { closeMenu(true); return; }
        lastTrigger = trigger;
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        inertTargets.forEach(function (el) { el.inert = true; });
        document.body.style.overflow = 'hidden';
        panel.querySelector('.wa-menu__option').focus();
      });
    });
    menu.querySelectorAll('[data-wa-close]').forEach(function (el) { el.addEventListener('click', function () { closeMenu(true); }); });
    menu.querySelectorAll('.wa-menu__option').forEach(function (el) { el.addEventListener('click', function () { closeMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { closeMenu(true); return; }
      if (e.key !== 'Tab') return;
      var all = Array.from(panel.querySelectorAll('a, button'));
      var first = all[0], last = all[all.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  document.querySelectorAll('[data-lead-form]').forEach(function (form) {
    var fields = form.elements;
    var today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Asuncion' });
    // Use formatToParts so browser locale separators cannot change the ISO value.
    var parts = new Intl.DateTimeFormat('en', { timeZone: 'America/Asuncion', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    today = ['year', 'month', 'day'].map(function (type) { return parts.find(function (p) { return p.type === type; }).value; }).join('-');
    fields.fecha.min = today;
    var bytes = new Uint8Array(2); crypto.getRandomValues(bytes);
    if (!fields.sid.value) fields.sid.value = 'BS-' + today.replaceAll('-', '') + '-' + Array.from(bytes, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    if (form.hasAttribute('data-server-error')) {
      var serverSummary = form.querySelector('[data-form-errors]');
      if (serverSummary) serverSummary.focus();
    }
    fields.fecha.disabled = form.querySelector('[data-date-unknown]').checked;
    form.querySelector('[data-date-unknown]').addEventListener('change', function (e) { fields.fecha.disabled = e.target.checked; if (e.target.checked) fields.fecha.value = ''; });
    function showError(field) {
      var message = cfg.errors[field.name] || cfg.errors.invalid;
      field.setAttribute('aria-invalid', 'true');
      var error = document.getElementById('error-' + field.name);
      if (error) { error.textContent = message; error.hidden = false; }
      var summary = form.querySelector('[data-form-errors]');
      summary.textContent = cfg.errors.summary; summary.hidden = false;
    }
    form.addEventListener('invalid', function (e) { showError(e.target); }, true);
    form.addEventListener('input', function (e) {
      var field = e.target;
      field.removeAttribute('aria-invalid');
      var error = document.getElementById('error-' + field.name);
      if (error) error.hidden = true;
    });
    form.addEventListener('submit', function (e) {
      if (fields.nombre.value.trim().length < 2) { e.preventDefault(); showError(fields.nombre); fields.nombre.focus(); return; }
      fields.whatsapp.value = fields.whatsapp.value.replace(/^0/, '595').replace(/^\+/, '');
      // Normal POST: B5 owns validation, persistence, redirect, and error restoration.
    });
  });
})();
