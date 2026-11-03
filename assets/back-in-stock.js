/* "Notify me when back in stock" — product pages.
 *
 * Markup (see snippets/back-in-stock-button.liquid + back-in-stock-dialog.liquid):
 *   [data-bis-controls]  buy-button wrapper; .is-sold-out swaps Add-to-cart for
 *                        the notify button. Carries data-variant-id,
 *                        data-product-title, data-variant-title, data-dialog-id.
 *   .js-bis-open         the notify button (opens the dialog).
 *   dialog.bis-dialog    email form.
 *
 * Variant switching: the theme's <variant-picker> fires `on:variant:change`
 * with { variant }. We update every [data-bis-controls] in that Shopify section
 * (the sticky bottom bar lives outside .js-product, so scope by section).
 */
(() => {
  if (window.backInStockInit) return;
  window.backInStockInit = true;

  const KLAVIYO_REVISION = '2026-10-15';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const variantLabel = (controls) => {
    const product = controls.dataset.productTitle || '';
    const variant = controls.dataset.variantTitle || '';
    return variant && variant !== 'Default Title' ? `${product} – ${variant}` : product;
  };

  /* ---------- keep sold-out state in sync with the selected variant ---------- */
  document.addEventListener('on:variant:change', (evt) => {
    const variant = evt.detail && evt.detail.variant;
    const scope = evt.target.closest('.shopify-section') || document;

    scope.querySelectorAll('[data-bis-controls]').forEach((controls) => {
      // Only offer "notify me" for a real variant that is out of stock.
      // A non-existent option combination keeps the theme's "Unavailable" button.
      const soldOut = Boolean(variant) && !variant.available;
      controls.classList.toggle('is-sold-out', soldOut);

      if (variant) {
        controls.dataset.variantId = variant.id;
        controls.dataset.variantTitle = variant.title || '';
      }
    });
  });

  /* ---------- open / close ---------- */
  let lastControls = null;

  const openDialog = (btn) => {
    const dialog = document.getElementById(btn.getAttribute('aria-controls'));
    const controls = btn.closest('[data-bis-controls]');
    if (!dialog || !controls) return;

    lastControls = controls;
    dialog.dataset.variantId = controls.dataset.variantId;
    dialog.dataset.label = variantLabel(controls);

    dialog.querySelectorAll('.js-bis-product-name').forEach((el) => {
      el.textContent = dialog.dataset.label;
    });

    // Fresh state each time it opens.
    dialog.querySelector('.js-bis-step-form').hidden = false;
    dialog.querySelector('.js-bis-step-success').hidden = true;
    const error = dialog.querySelector('.js-bis-error');
    error.hidden = true;
    error.textContent = '';
    dialog.querySelector('.js-bis-email').removeAttribute('aria-invalid');

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    const email = dialog.querySelector('.js-bis-email');
    if (email && !email.value) email.focus();
  };

  const closeDialog = (dialog) => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    const btn = lastControls && lastControls.querySelector('.js-bis-open');
    if (btn) btn.focus({ preventScroll: true });
  };

  document.addEventListener('click', (evt) => {
    const openBtn = evt.target.closest('.js-bis-open');
    if (openBtn) {
      evt.preventDefault();
      openDialog(openBtn);
      return;
    }

    const closeBtn = evt.target.closest('.js-bis-close');
    if (closeBtn) {
      closeDialog(closeBtn.closest('.bis-dialog'));
      return;
    }

    // Click on the backdrop (the <dialog> itself, outside the inner card) closes it.
    if (evt.target.classList && evt.target.classList.contains('bis-dialog')) {
      closeDialog(evt.target);
    }
  });

  /* ---------- submit ---------- */
  const subscribeKlaviyo = async (dialog, email) => {
    const companyId = dialog.dataset.klaviyoCompanyId;
    if (!companyId) throw new Error('No Klaviyo company id');

    const res = await fetch(
      `https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${encodeURIComponent(companyId)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          accept: 'application/vnd.api+json',
          revision: KLAVIYO_REVISION
        },
        body: JSON.stringify({
          data: {
            type: 'back-in-stock-subscription',
            attributes: {
              channels: ['EMAIL'],
              profile: { data: { type: 'profile', attributes: { email } } }
            },
            relationships: {
              variant: {
                data: {
                  type: 'catalog-variant',
                  id: `$shopify:::$default:::${dialog.dataset.variantId}`
                }
              }
            }
          }
        })
      }
    );
    if (!res.ok) throw new Error(`Klaviyo ${res.status}`);
  };

  // Fallback: send the request to the store inbox via Shopify's contact form.
  const subscribeContactForm = async (dialog, email) => {
    const body = new FormData();
    body.append('form_type', 'contact');
    body.append('utf8', '✓');
    body.append('contact[email]', email);
    body.append('contact[Message]', 'Back-in-stock request: please email this customer when the product is available again.');
    body.append('contact[Product]', dialog.dataset.label || '');
    body.append('contact[Variant ID]', dialog.dataset.variantId || '');
    body.append('contact[Product URL]', `${dialog.dataset.productUrl}?variant=${dialog.dataset.variantId}`);

    const res = await fetch(`${(window.Shopify && Shopify.routes && Shopify.routes.root) || '/'}contact`, {
      method: 'POST',
      body
    });
    if (!res.ok) throw new Error(`Contact ${res.status}`);
  };

  document.addEventListener('submit', async (evt) => {
    const form = evt.target.closest('.js-bis-form');
    if (!form) return;
    evt.preventDefault();

    const dialog = form.closest('.bis-dialog');
    const input = form.querySelector('.js-bis-email');
    const error = form.querySelector('.js-bis-error');
    const submit = form.querySelector('.js-bis-submit');
    const email = input.value.trim();

    if (!EMAIL_RE.test(email)) {
      error.textContent = dialog.dataset.invalidEmailText;
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }

    error.hidden = true;
    input.removeAttribute('aria-invalid');
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');

    try {
      try {
        await subscribeKlaviyo(dialog, email);
      } catch (klaviyoErr) {
        console.warn('[back-in-stock] Klaviyo failed, using contact form fallback', klaviyoErr);
        await subscribeContactForm(dialog, email);
      }
      dialog.querySelector('.js-bis-step-form').hidden = true;
      const success = dialog.querySelector('.js-bis-step-success');
      success.hidden = false;
      const closeBtn = success.querySelector('.js-bis-close');
      if (closeBtn) closeBtn.focus();
    } catch (err) {
      console.error('[back-in-stock]', err);
      error.textContent = dialog.dataset.errorText;
      error.hidden = false;
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });
})();
