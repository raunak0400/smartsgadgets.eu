/* Always-visible fixed bottom Add-to-cart bar.
   Keeps the bar visible at all times (no scroll toggle) and exposes its height
   as --sticky-atc-height so the page can reserve bottom space for it. */
if (!customElements.get('sticky-atc-panel')) {
  class StickyAtcPanel extends HTMLElement {
    connectedCallback() {
      this.classList.remove('sticky-atc-panel--out', 'invisible');
      document.body.classList.add('has-sticky-atc');
      this._update = this.setHeightVar.bind(this);
      this.setHeightVar();

      if (window.ResizeObserver) {
        this._ro = new ResizeObserver(this._update);
        this._ro.observe(this);
      }
      window.addEventListener('resize', this._update);
    }

    disconnectedCallback() {
      document.body.classList.remove('has-sticky-atc');
      if (this._ro) this._ro.disconnect();
      window.removeEventListener('resize', this._update);
    }

    setHeightVar() {
      document.documentElement.style.setProperty('--sticky-atc-height', `${this.offsetHeight}px`);
    }
  }

  customElements.define('sticky-atc-panel', StickyAtcPanel);
}
