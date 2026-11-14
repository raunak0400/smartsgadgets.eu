/* Product story section (sections/custom-product-story.liquid): collapse the technical parameters, switch the device that
   is shown large on the home map, and scroll smoothly to the story. Delegated listeners, so it keeps working when the
   theme editor re-renders the section. */
(function () {
  if (window.sgStoryReady) return;
  window.sgStoryReady = true;

  function setActive(hotspot) {
    var home = hotspot.closest('[data-story-home]');
    if (!home) return;
    home.querySelectorAll('[data-story-hotspot].is-active').forEach(function (other) {
      if (other !== hotspot) other.classList.remove('is-active');
    });
    hotspot.classList.add('is-active');
    var caption = home.parentElement && home.parentElement.querySelector('[data-story-caption]');
    if (caption) caption.textContent = hotspot.getAttribute('data-label') || '';
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target.closest('[data-story-toggle]');
    if (toggle) {
      var specs = toggle.closest('[data-story-specs]');
      if (specs) {
        var collapsed = specs.getAttribute('data-collapsed') !== 'true';
        specs.setAttribute('data-collapsed', collapsed ? 'true' : 'false');
        toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        var label = toggle.querySelector('[data-story-toggle-label]');
        var text = specs.getAttribute(collapsed ? 'data-expand-label' : 'data-collapse-label');
        if (label && text) label.textContent = text;
      }
      return;
    }

    var pin = event.target.closest('.sg-hotspot__pin');
    if (pin) {
      setActive(pin.closest('[data-story-hotspot]'));
      return;
    }

    var anchor = event.target.closest('[data-story-anchor]');
    if (anchor) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      }
    }
  });

  document.addEventListener('mouseover', function (event) {
    var pin = event.target.closest && event.target.closest('.sg-hotspot__pin');
    if (pin) setActive(pin.closest('[data-story-hotspot]'));
  });

  document.addEventListener('focusin', function (event) {
    var pin = event.target.closest && event.target.closest('.sg-hotspot__pin');
    if (pin) setActive(pin.closest('[data-story-hotspot]'));
  });
})();
