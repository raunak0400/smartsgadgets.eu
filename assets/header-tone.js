/*
 * Header text colour on the homepage hero.
 *
 * The homepage header sits on top of the slideshow and its menu / icons are white, which disappears on a light
 * banner. This script sets <body data-header-tone="dark|light"> from the slide that is currently showing and the
 * header CSS (sections/custom-header.liquid) turns the text black for "dark" (= dark text, light image).
 *
 * Each slide has a "Header text colour" setting (data-header-text on the slide element):
 *   light = white text (dark image)    dark = black text (light image)    auto = measured from the image.
 * Auto looks at the strip of the image that is really behind the header (menu + icons side), compares the contrast
 * of white text and black text against its average brightness and picks the better one. It uses a small (240px)
 * copy of the image, so it costs almost nothing. If anything goes wrong the header simply stays white.
 */
(function (root) {
  'use strict';

  var DARK_TEXT_LUM = 0.0056; // relative luminance of #111111

  /* ---- pure helpers (unit tested) ------------------------------------------------------------------- */
  function lin(c) { c = c / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }

  // mean relative luminance (0 = black ... 1 = white) of RGBA pixel data
  function meanLuminance(data) {
    var sum = 0, n = 0;
    for (var i = 0; i + 3 < data.length; i += 4) {
      if (data[i + 3] < 8) continue; // transparent pixel: nothing to read the text against
      sum += 0.2126 * lin(data[i]) + 0.7152 * lin(data[i + 1]) + 0.0722 * lin(data[i + 2]);
      n++;
    }
    return n ? sum / n : 0;
  }

  // 'dark' = use dark text (the image is light), 'light' = use white text (the image is dark)
  function toneFor(lum) {
    var whiteContrast = 1.05 / (lum + 0.05);
    var darkContrast = (lum + 0.05) / (DARK_TEXT_LUM + 0.05);
    return darkContrast >= whiteContrast ? 'dark' : 'light';
  }

  // The part of the image that sits behind the header, in natural-image pixels.
  // box = rendered size of the <img> (object-fit: cover), nat = natural size, headerH = header height in px.
  // Only the menu / icon side (from 30% of the width to the right edge) matters for the text colour.
  function bandRect(box, nat, headerH) {
    var s = Math.max(box.w / nat.w, box.h / nat.h);
    var offX = (box.w - nat.w * s) / 2, offY = (box.h - nat.h * s) / 2;
    var x0 = 0.3 * box.w, x1 = box.w, y0 = 0, y1 = Math.min(headerH, box.h);
    var sx = (x0 - offX) / s, sy = (y0 - offY) / s, ex = (x1 - offX) / s, ey = (y1 - offY) / s;
    sx = Math.max(0, Math.min(nat.w - 1, sx)); sy = Math.max(0, Math.min(nat.h - 1, sy));
    ex = Math.max(sx + 1, Math.min(nat.w, ex)); ey = Math.max(sy + 1, Math.min(nat.h, ey));
    return { sx: sx, sy: sy, sw: ex - sx, sh: ey - sy };
  }

  function smallUrl(src) {
    if (/[?&]width=\d+/.test(src)) return src.replace(/([?&])width=\d+/, '$1width=240');
    return src; // not a Shopify CDN size URL: use as is
  }

  var api = { meanLuminance: meanLuminance, toneFor: toneFor, bandRect: bandRect, smallUrl: smallUrl };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.SGHeaderTone = api;

  /* ---- browser part ---------------------------------------------------------------------------------- */
  var doc = root.document;
  if (!doc) return;

  function setTone(tone) { if (doc.body) doc.body.setAttribute('data-header-tone', tone); }

  function detect(slide, done) {
    var img = slide.querySelector('img');
    var src = img && (img.currentSrc || img.src);
    if (!src) return done(null);
    var probe = new root.Image();
    probe.crossOrigin = 'anonymous';
    probe.onload = function () {
      try {
        var r = img.getBoundingClientRect();
        var header = doc.querySelector('.sg-header');
        var b = bandRect({ w: r.width || probe.naturalWidth, h: r.height || probe.naturalHeight },
          { w: probe.naturalWidth, h: probe.naturalHeight }, header ? header.offsetHeight : 90);
        var canvas = doc.createElement('canvas');
        canvas.width = 48; canvas.height = 12;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(probe, b.sx, b.sy, b.sw, b.sh, 0, 0, 48, 12);
        done(toneFor(meanLuminance(ctx.getImageData(0, 0, 48, 12).data)));
      } catch (e) { done(null); }
    };
    probe.onerror = function () { done(null); };
    probe.src = smallUrl(src);
  }

  function apply(show) {
    var slide = show.querySelector('.slideshow__slide.is-active');
    if (!slide) return;
    var mode = slide.getAttribute('data-header-text') || 'auto';
    if (mode === 'dark' || mode === 'light') { setTone(mode); return; }
    detect(slide, function (tone) { if (tone && slide.classList.contains('is-active')) setTone(tone); });
  }

  function init() {
    if (!doc.body || !doc.body.classList.contains('template-index')) return;
    var show = doc.querySelector('slide-show');
    if (!show) return;
    // only the slideshow at the very top of the page sits behind the header
    if (show.getBoundingClientRect().top + (root.pageYOffset || 0) > 300) return;

    var timer = null;
    function later() { clearTimeout(timer); timer = setTimeout(function () { apply(show); }, 30); }

    var slides = show.querySelectorAll('.slideshow__slide');
    var mo = new root.MutationObserver(later);
    for (var i = 0; i < slides.length; i++) mo.observe(slides[i], { attributes: true, attributeFilter: ['class'] });
    root.addEventListener('resize', later); // the mobile and desktop image differ
    apply(show);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})(typeof window !== 'undefined' ? window : this);
