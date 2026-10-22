/*
 * Estimated delivery date (theme-side, no app).
 *
 * Shopify's native "Estimated delivery dates" only shows in checkout and only for
 * certain origin countries, so the product page and cart need their own estimate.
 * This script turns the numbers set in Theme settings > Delivery estimate into a
 * date range, using Europe/Amsterdam time, business days (Mon-Fri) and public holidays.
 *
 * Markup: <div class="sg-delivery-estimate" data-country="NL" data-cutoff="14"
 *              data-min="1" data-max="3" data-locale="nl" data-prefix="..."> fallback text </div>
 * Without JS the fallback text (a day range, no dates) stays visible.
 */
(function (root) {
  'use strict';

  // The snippet can render on the same page more than once (product form + cart drawer): load only once
  if (root.SGDelivery) return;

  var TZ = 'Europe/Amsterdam';

  /* ---------- date helpers (all dates are UTC-noon, so DST can never shift the day) ---------- */
  function utc(y, m, d) { return new Date(Date.UTC(y, m - 1, d, 12)); }
  function iso(dt) { return dt.toISOString().slice(0, 10); }
  function addDays(dt, n) { return new Date(dt.getTime() + n * 86400000); }

  // Anonymous Gregorian algorithm (Meeus/Jones/Butcher) for Easter Sunday
  function easter(y) {
    var a = y % 19, b = Math.floor(y / 100), c = y % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return utc(y, month, day);
  }

  // Days on which carriers do not deliver / we do not ship (besides Sat+Sun)
  function holidays(year, country) {
    var set = {}, e = easter(year);
    function add(dt) { set[iso(dt)] = true; }
    add(utc(year, 1, 1));            // New Year
    add(addDays(e, 1));              // Easter Monday
    add(addDays(e, 39));             // Ascension Day
    add(addDays(e, 50));             // Whit Monday
    add(utc(year, 12, 25));          // Christmas Day
    if (country === 'NL') {
      add(utc(year, 12, 26));        // Second Christmas Day
      var k = utc(year, 4, 27);      // King's Day (26 April when 27 April is a Sunday)
      add(k.getUTCDay() === 0 ? utc(year, 4, 26) : k);
    } else if (country === 'BE') {
      add(utc(year, 5, 1)); add(utc(year, 7, 21)); add(utc(year, 8, 15));
      add(utc(year, 11, 1)); add(utc(year, 11, 11));
    } else {
      add(utc(year, 12, 26));
    }
    return set;
  }

  function isBusinessDay(dt, country) {
    var dow = dt.getUTCDay();
    if (dow === 0 || dow === 6) return false;
    return !holidays(dt.getUTCFullYear(), country)[iso(dt)];
  }

  function nextBusinessDay(dt, country) {
    var d = addDays(dt, 1);
    while (!isBusinessDay(d, country)) d = addDays(d, 1);
    return d;
  }

  function addBusinessDays(dt, n, country) {
    var d = dt;
    while (n > 0) { d = nextBusinessDay(d, country); n--; }
    return d;
  }

  /* ---------- "what time is it in Amsterdam?" ---------- */
  function amsterdamParts(now) {
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hourCycle: 'h23'
    }).formatToParts(now);
    var o = {};
    for (var i = 0; i < parts.length; i++) o[parts[i].type] = parseInt(parts[i].value, 10);
    return o;
  }

  /*
   * opts: { now: Date, cutoffHour: 14, minDays: 1, maxDays: 3, country: 'NL' }
   * Orders placed on a business day before the cut-off ship the same day; otherwise on the next business day.
   * Returns { shipDate, min, max } as UTC-noon Dates.
   */
  function computeWindow(opts) {
    var p = amsterdamParts(opts.now || new Date());
    var today = utc(p.year, p.month, p.day);
    var country = opts.country || 'NL';
    var ship = (isBusinessDay(today, country) && p.hour < opts.cutoffHour) ? today : nextBusinessDay(today, country);
    return {
      shipDate: ship,
      min: addBusinessDays(ship, opts.minDays, country),
      max: addBusinessDays(ship, opts.maxDays, country)
    };
  }

  function fmt(dt, locale) {
    return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-GB', {
      timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short'
    }).format(dt);
  }

  function message(win, locale, prefix) {
    var same = iso(win.min) === iso(win.max);
    var nl = locale === 'nl';
    if (same) return prefix + ' ' + fmt(win.min, locale);
    return prefix + ' ' + (nl ? 'tussen ' : 'between ') + fmt(win.min, locale) + (nl ? ' en ' : ' and ') + fmt(win.max, locale);
  }

  /* ---------- DOM ---------- */
  function render(el) {
    var cutoff = parseInt(el.getAttribute('data-cutoff'), 10);
    var minD = parseInt(el.getAttribute('data-min'), 10);
    var maxD = parseInt(el.getAttribute('data-max'), 10);
    if (isNaN(cutoff) || isNaN(minD) || isNaN(maxD)) return;
    var win = computeWindow({
      now: new Date(), cutoffHour: cutoff, minDays: minD, maxDays: Math.max(minD, maxD),
      country: el.getAttribute('data-country') || 'NL'
    });
    var target = el.querySelector('[data-delivery-text]') || el;
    target.textContent = message(win, el.getAttribute('data-locale') || 'nl', el.getAttribute('data-prefix') || '');
    el.setAttribute('data-ready', 'true');
  }

  // Only touches elements that have not been rendered yet, so our own text update can never re-trigger us
  function init(scope) {
    var list = (scope || document).querySelectorAll('.sg-delivery-estimate:not([data-ready])');
    for (var i = 0; i < list.length; i++) render(list[i]);
  }

  var api = {
    computeWindow: computeWindow, message: message, isBusinessDay: isBusinessDay,
    addBusinessDays: addBusinessDays, holidays: holidays, easter: easter, init: init
  };

  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  root.SGDelivery = api;
  if (root.document) {
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', function () { init(); });
    else init();
    // The cart drawer and re-rendered sections inject fresh markup later: pick it up (debounced)
    var timer = null;
    new MutationObserver(function () {
      if (timer) return;
      timer = setTimeout(function () { timer = null; init(); }, 60);
    }).observe(root.document.documentElement, { childList: true, subtree: true });
  }
})(typeof window !== 'undefined' ? window : this);
