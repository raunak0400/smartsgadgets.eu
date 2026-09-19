/* Amazon-style variant image swatches: horizontal slider with arrows.
   Progressive enhancement only — the track scrolls on touch/trackpad even
   without this script; here we add arrow buttons + edge fades and keep the
   selected swatch in view. Scoped to [data-amz-swatch-scroller]. */
(function () {
  'use strict';

  function initScroller(scroller) {
    if (scroller.dataset.amzInit === '1') return;
    var track = scroller.querySelector('[data-amz-swatch-track]');
    if (!track) return;
    scroller.dataset.amzInit = '1';

    var prev = scroller.querySelector('[data-amz-swatch-prev]');
    var next = scroller.querySelector('[data-amz-swatch-next]');

    function update() {
      var scrollable = track.scrollWidth - track.clientWidth > 2;
      scroller.classList.toggle('is-scrollable', scrollable);
      if (!scrollable) {
        if (prev) prev.hidden = true;
        if (next) next.hidden = true;
        scroller.classList.remove('can-prev', 'can-next');
        return;
      }
      var atStart = track.scrollLeft <= 1;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      if (prev) prev.hidden = atStart;
      if (next) next.hidden = atEnd;
      scroller.classList.toggle('can-prev', !atStart);
      scroller.classList.toggle('can-next', !atEnd);
    }

    function step(dir) {
      var amount = Math.max(track.clientWidth * 0.8, 140);
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

    // Keep the pre-selected swatch centred/in view on load.
    var checked = track.querySelector('.opt-btn:checked');
    var label = checked && checked.nextElementSibling;
    if (label) {
      var target = label.offsetLeft - (track.clientWidth / 2) + (label.offsetWidth / 2);
      track.scrollLeft = Math.max(0, target);
    }

    // Layout can shift once thumbnails finish loading.
    track.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', update, { once: true });
    });

    update();
  }

  function initAll(root) {
    (root || document).querySelectorAll('[data-amz-swatch-scroller]').forEach(initScroller);
  }

  function ready() { initAll(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }

  // Re-scan when sections reload in the theme editor or content is injected
  // (quick-add drawers, featured product blocks, etc.).
  document.addEventListener('shopify:section:load', function () { initAll(); });

  if (window.MutationObserver) {
    var scheduled = false;
    var mo = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        initAll();
      });
    });
    mo.observe(document.body || document.documentElement, { childList: true, subtree: true });
  }
})();
