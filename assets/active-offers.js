/* Active Offers carousel: horizontal scroll with prev/next arrows + dots.
   Progressive enhancement — the track scrolls on touch/trackpad without JS.
   Scoped to [data-offers-scroller]. */
(function () {
  'use strict';

  function init(scroller) {
    if (scroller.dataset.offersInit === '1') return;
    var track = scroller.querySelector('[data-offers-track]');
    if (!track) return;
    scroller.dataset.offersInit = '1';

    var prev = scroller.querySelector('[data-offers-prev]');
    var next = scroller.querySelector('[data-offers-next]');
    var panel = scroller.parentElement;
    var dotsWrap = panel ? panel.querySelector('[data-offers-dots]') : null;
    var cards = Array.prototype.slice.call(track.children);
    var dots = [];

    function scrollCardToStart(card) {
      var delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollBy({ left: delta, behavior: 'smooth' });
    }

    if (dotsWrap && cards.length > 1) {
      cards.forEach(function (card, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'product-offers__dot';
        dot.setAttribute('aria-label', 'Offer ' + (i + 1));
        dot.addEventListener('click', function () { scrollCardToStart(card); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function activeIndex() {
      var mid = track.getBoundingClientRect().left + track.clientWidth / 2;
      var best = 0;
      var bestDist = Infinity;
      cards.forEach(function (card, i) {
        var r = card.getBoundingClientRect();
        var d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function update() {
      var scrollable = track.scrollWidth - track.clientWidth > 2;
      if (!scrollable) {
        if (prev) prev.hidden = true;
        if (next) next.hidden = true;
      } else {
        var atStart = track.scrollLeft <= 1;
        var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        if (prev) prev.hidden = atStart;
        if (next) next.hidden = atEnd;
      }
      if (dots.length) {
        var ai = activeIndex();
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === ai); });
      }
    }

    function step(dir) {
      var amount = Math.max(track.clientWidth * 0.85, 180);
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }

    if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); step(-1); });
    if (next) next.addEventListener('click', function (e) { e.preventDefault(); step(1); });
    track.addEventListener('scroll', update, { passive: true });

    if (window.ResizeObserver) {
      new ResizeObserver(update).observe(track);
    } else {
      window.addEventListener('resize', update);
    }

    track.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', update, { once: true });
    });

    update();
  }

  function initAll(root) {
    (root || document).querySelectorAll('[data-offers-scroller]').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(); });
  } else {
    initAll();
  }

  document.addEventListener('shopify:section:load', function () { initAll(); });
})();
