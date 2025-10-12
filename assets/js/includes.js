
// assets/js/includes.js
(function(){
  'use strict';
  if (window.__AIG_BOOTED__) return;
  window.__AIG_BOOTED__ = true;

  // ✅ cache-busting ვერსია — ცვალე როცა partial-ებს ცვლი, განაახლე
  const __VER__ = '2025-10-12';

  if (!window.__AIG_BASE__) {
    const isGhPages = location.pathname.includes('/angeln-in-georgien/');
    window.__AIG_BASE__ = isGhPages ? '/angeln-in-georgien/' : '/';
  }
  const base = window.__AIG_BASE__;

  function ensureFavicons() {
    const head = document.head;
    [...head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')].forEach(n => n.remove());
    const imgBase = `${base}assets/img/`;
    const links = [
      { rel: 'icon', href: `${imgBase}favicon.ico`, sizes: 'any' },
      { rel: 'icon', type: 'image/png', href: `${imgBase}favicon-light.png`, media: '(prefers-color-scheme: light)' },
      { rel: 'icon', type: 'image/png', href: `${imgBase}favicon-dark.png`,  media: '(prefers-color-scheme: dark)'  }
    ];
    links.forEach(opts => {
      const link = document.createElement('link');
      Object.entries(opts).forEach(([k, v]) => link.setAttribute(k, v));
      head.appendChild(link);
    });
  }

  function prefixRootLinks(scopeEl) {
    scopeEl.querySelectorAll('a[data-root]').forEach(a => {
      const raw = a.getAttribute('href') || '';
      if (/^(https?:|mailto:|tel:)/i.test(raw)) return;
      if (/^(\.\/|\.\.\/)/.test(raw)) return;
      a.setAttribute('href', `${base}${raw}`);
    });
  }

  Promise.all([
    fetch(`${base}partials/header.html?v=${__VER__}`).then(r => r.text()),
    fetch(`${base}partials/footer.html?v=${__VER__}`).then(r => r.text())
  ]).then(([h, f]) => {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) { headerEl.innerHTML = h; prefixRootLinks(headerEl); }
    if (footerEl) { footerEl.innerHTML = f; prefixRootLinks(footerEl); }
    ensureFavicons();
  }).catch(err => console.error('Include load error:', err));
})();
