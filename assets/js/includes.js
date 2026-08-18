
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

  const __VER__ = '2026-08-12';

  if (!window.__AIG_BASE__) {
    const script = document.currentScript || document.querySelector('script[src*="assets/js/includes.js"]');
    const scriptUrl = new URL(script ? script.getAttribute('src') || 'assets/js/includes.js' : 'assets/js/includes.js', location.href);
    window.__AIG_BASE__ = new URL('../../', scriptUrl).href;
  }
  const base = window.__AIG_BASE__;


  const ANALYTICS_ID = 'G-BMKYWEPNHB';
  const CONSENT_KEY = 'aigAnalyticsConsent';
  let consentBanner = null;
  let analyticsLoaded = false;

  function loadGoogleAnalytics() {
    if (analyticsLoaded || document.querySelector(`script[data-analytics-id="${ANALYTICS_ID}"]`)) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.analyticsId = ANALYTICS_ID;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_ID)}`;
    document.head.appendChild(script);
  }

  function removeAnalyticsCookies() {
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = `${name}=;${expiry};path=/;SameSite=Lax`;
      document.cookie = `${name}=;${expiry};path=/;domain=${location.hostname};SameSite=Lax`;
      document.cookie = `${name}=;${expiry};path=/;domain=.${location.hostname};SameSite=Lax`;
    });
  }

  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (_) {}
    if (value === 'granted') {
      loadGoogleAnalytics();
    } else {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
      removeAnalyticsCookies();
    }
    consentBanner?.remove();
    consentBanner = null;
  }

  function showConsentBanner() {
    consentBanner?.remove();
    consentBanner = document.createElement('aside');
    consentBanner.className = 'consent-banner';
    consentBanner.setAttribute('role', 'dialog');
    consentBanner.setAttribute('aria-modal', 'true');
    consentBanner.setAttribute('aria-labelledby', 'consent-title');
    consentBanner.innerHTML = `
      <div class="consent-copy">
        <strong id="consent-title">Optionale Statistik</strong>
        <p>Mit Ihrer Einwilligung verwenden wir Google Analytics, um die Nutzung dieser Website besser zu verstehen. Ohne Zustimmung wird der Google-Tag nicht geladen. <a href="${new URL('legal/datenschutz.html', base).href}">Mehr erfahren</a></p>
      </div>
      <div class="consent-actions">
        <button type="button" class="consent-button consent-decline" data-consent="denied">Ablehnen</button>
        <button type="button" class="consent-button consent-accept" data-consent="granted">Statistik erlauben</button>
      </div>`;
    consentBanner.addEventListener('click', event => {
      const button = event.target.closest('[data-consent]');
      if (button) saveConsent(button.dataset.consent);
    });
    document.body.appendChild(consentBanner);
    consentBanner.querySelector('[data-consent="denied"]')?.focus();
  }

  function initAnalyticsConsent() {
    let consent = null;
    try { consent = localStorage.getItem(CONSENT_KEY); } catch (_) {}
    if (consent === 'granted') loadGoogleAnalytics();
    if (consent !== 'granted' && consent !== 'denied') showConsentBanner();
    document.addEventListener('click', event => {
      const settings = event.target.closest('[data-consent-settings]');
      if (!settings) return;
      event.preventDefault();
      showConsentBanner();
    });
  }

  function ensureFavicons() {
    const head = document.head;
    [...head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')].forEach(n => n.remove());
    const imgBase = `${base}assets/img/`;
    const links = [
      { rel: 'icon', type: 'image/svg+xml', href: `${imgBase}favicon.svg` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `${imgBase}apple-touch-icon.png` },
      { rel: 'manifest', href: `${base}manifest.webmanifest` },
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

  initAnalyticsConsent();

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
