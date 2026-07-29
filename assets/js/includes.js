
// File: includes.js
// Folder: portfolio_projects/angeln-in-georgien/assets/js
// Created date: 2025-10-12
// Last updated date: 2026-05-17
// Author: Codex
// Purpose: Load shared header/footer partials and normalize root-relative links.
(function(){
  'use strict';
  if (window.__AIG_BOOTED__) return;
  window.__AIG_BOOTED__ = true;

  const __VER__ = '2026-07-29';

  if (!window.__AIG_BASE__) {
    const script = document.currentScript || document.querySelector('script[src*="assets/js/includes.js"]');
    const scriptUrl = new URL(script ? script.getAttribute('src') || 'assets/js/includes.js' : 'assets/js/includes.js', location.href);
    window.__AIG_BASE__ = new URL('../../', scriptUrl).href;
  }
  const base = window.__AIG_BASE__;

  function ensureFavicons() {
    const head = document.head;
    [...head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')].forEach(n => n.remove());
    const imgBase = `${base}assets/img/`;
    const links = [
      { rel: 'icon', type: 'image/svg+xml', href: `${imgBase}favicon.svg` },
      { rel: 'alternate icon', type: 'image/png', href: `${imgBase}favicon-light.png` },
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
      a.setAttribute('href', new URL(raw, base).href);
    });
  }

  function markCurrent(scopeEl) {
    const current = location.href.replace(/\/index\.html$/, '/');
    scopeEl.querySelectorAll('a[data-root]').forEach(a => {
      const target = a.href.replace(/\/index\.html$/, '/');
      if (target === current) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  function initMobileNav(scopeEl) {
    const toggle = scopeEl.querySelector('.nav-toggle');
    const nav = scopeEl.querySelector('#site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const isOpen = scopeEl.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        scopeEl.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && scopeEl.classList.contains('nav-open')) {
        scopeEl.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        scopeEl.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  Promise.all([
    fetch(new URL(`partials/header.html?v=${__VER__}`, base)).then(r => {
      if (!r.ok) throw new Error(`Header konnte nicht geladen werden (${r.status})`);
      return r.text();
    }),
    fetch(new URL(`partials/footer.html?v=${__VER__}`, base)).then(r => {
      if (!r.ok) throw new Error(`Footer konnte nicht geladen werden (${r.status})`);
      return r.text();
    })
  ]).then(([h, f]) => {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) { headerEl.innerHTML = h; prefixRootLinks(headerEl); markCurrent(headerEl); initMobileNav(headerEl); }
    if (footerEl) { footerEl.innerHTML = f; prefixRootLinks(footerEl); markCurrent(footerEl); }
    ensureFavicons();
  }).catch(err => console.error('Include load error:', err));
})();
