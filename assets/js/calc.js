/* Prices and public wording are supplied by the generator from content.mjs. */
(function () {
 'use strict';
 const money = n => 'Gs. ' + new Intl.NumberFormat('es-PY').format(n);
 const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function calculate(input, data) {
  const pkg = data.PACKAGES.find(p => p.id === input.packageId);
  const zone = data.ZONES.find(z => z.slug === input.zone);
  const guests = Number(input.guests);
  const selected = data.ADDONS.filter(a => (input.addons || []).includes(a.id) && !pkg.bundled.includes(a.id));
  const custom = guests > pkg.max || zone.delivery === null;
  const extra = Math.max(0, guests - pkg.included) * pkg.extra;
  const total = custom ? null : pkg.price + extra + selected.reduce((n, a) => n + a.price, 0) + zone.delivery;
  const caption = custom ? '' : `${data.pricePrefix} ${money(total)}. ${data.confirmation}`;
  const included = data.ADDONS.filter(a => pkg.bundled.includes(a.id));
  const list = [...selected.map(a => a.name), ...included.map(a => a.name + ' (incluido)')].join(', ') || 'ninguno';
  const whatsapp = `Hola, usé la calculadora de babyshower.com.py (${input.route || '/'}): ${pkg.name}, ${guests} invitados, adicionales: ${list}, zona ${zone.name}. ` + (custom ? `Te cotizamos por WhatsApp. (${data.PRICES.label}). Fecha tentativa: ____` : `Estimación ${money(total)} (${data.PRICES.label}). Fecha tentativa: ____ ${caption}`);
  return { guests, custom, total, disabledAddons: pkg.bundled.slice(), whatsapp, caption, label: data.PRICES.label, cta: custom ? 'Pedir cotización' : data.primaryCta,
   breakdown: custom ? [] : [[pkg.name, pkg.price], ['Invitados extra', extra], ...selected.map(a => [a.name, a.price]), ...included.map(a => [a.name + ' (incluido)', 0]), ['Traslado (recargo estimado)', zone.delivery]], food: data.EXTRA_FOOD?.[pkg.id] || '' };
 }
 function render(state) {
  if (state.custom) return `<p>Para ${state.guests} invitados te cotizamos por WhatsApp</p><p>${escape(state.label)}</p>`;
  return `<dl class="calc-breakdown">${state.breakdown.map(([label, amount]) => `<div><dt>${escape(label)}</dt><dd>${money(amount)}</dd></div>`).join('')}</dl><p class="calc-total">${money(state.total)}</p><p>${escape(state.caption)}</p><p>${escape(state.label)}</p>${state.food ? `<p>${escape(state.food)}</p>` : ''}`;
 }
 function mount(root, data) {
  const q = s => root.querySelector(s), qa = s => Array.from(root.querySelectorAll(s));
  const range = q('[data-guests]'), count = q('[data-guest-count]'), output = q('[data-calc-output]'), cta = q('[data-calc-cta]');
  function update() {
   const state = calculate({ packageId: qa('[name="calc-package"]').find(el => el.checked).value, guests: range.value, addons: qa('[data-addon]').filter(el => el.checked).map(el => el.value), zone: q('[data-calc-zone]').value, route: data.route }, data);
   count.textContent = range.value;
   qa('[data-addon]').forEach(el => { el.disabled = state.disabledAddons.includes(el.value); q('[data-addon-note="' + el.value + '"]').textContent = el.disabled ? 'incluido' : ''; });
   output.innerHTML = render(state);
   cta.href = 'https://wa.me/' + data.WA_NUMBER + '?text=' + encodeURIComponent(state.whatsapp);
   cta.textContent = state.cta;
   q('[data-guest-step="-5"]').disabled = Number(range.value) <= 15;
   q('[data-guest-step="5"]').disabled = Number(range.value) >= 60;
   return state;
  }
  root.addEventListener('input', update);
  root.addEventListener('change', update);
  qa('[data-guest-step]').forEach(button => button.addEventListener('click', () => { range.value = String(Math.max(15, Math.min(60, Number(range.value) + Number(button.dataset.guestStep)))); update(); }));
  cta.addEventListener('click', () => { update(); document.dispatchEvent(new CustomEvent('bs:calc-submit')); });
  update(); root.hidden = false;
  return { update };
 }
 window.BS_CALCULATOR = { calculate, render, mount };
 document.querySelectorAll('[data-calculator]').forEach(root => mount(root, JSON.parse(root.querySelector('[data-calc-config]').textContent)));
})();
