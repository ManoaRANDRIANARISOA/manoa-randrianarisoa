// ==============================================================================
// MAIN APPLICATION ENTRY POINT
// ==============================================================================
import { initNetworkCanvas } from './canvas-network.js';
import { initArchitectureViewer } from './architecture-viewer.js';
import { initProjectsManager } from './projects-manager.js';
import { initAdrsManager } from './adrs-manager.js';
import { initTerminal } from './terminal.js';
import { initThemeManager } from './theme-manager.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initJourney } from './journey.js';
import { sound } from './audio-engine.js';
import { initI18n, t, onLangChange } from './i18n.js';

const CONTACT_EMAIL = 'manoa.wrk@gmail.com';
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

document.addEventListener('DOMContentLoaded', () => {
  // Internationalization first: every dynamic module renders localized content.
  initI18n();

  initThemeManager();
  initNetworkCanvas('hero-canvas');
  initArchitectureViewer();
  initProjectsManager();
  initAdrsManager();
  initTerminal();

  const motion = initScrollAnimations();
  initJourney();

  function lockScroll(locked) {
    document.documentElement.classList.toggle('scroll-locked', locked);
    motion?.lenis && (locked ? motion.lenis.stop() : motion.lenis.start());
  }

  const anyOverlayOpen = () =>
    document.querySelector('#cv-modal.active, #terminal-modal.active, #mobile-nav-drawer.open') !== null;

  const cvModal = document.getElementById('cv-modal');

  // ------------------------------------------------------------------ audio
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    const ICON_ON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    const ICON_OFF = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

    const updateSoundUI = (enabled) => {
      soundBtn.classList.toggle('sound-on', enabled);
      soundBtn.setAttribute('title', t(enabled ? 'header.soundTitleOn' : 'header.soundTitleOff'));
      const iconWrap = soundBtn.querySelector('.sound-icon-wrap');
      if (iconWrap) iconWrap.innerHTML = enabled ? ICON_ON : ICON_OFF;
    };

    updateSoundUI(sound.enabled);
    soundBtn.addEventListener('click', () => updateSoundUI(sound.toggle()));
    onLangChange(() => updateSoundUI(sound.enabled));
  }

  // ------------------------------------------------------------------ mobile drawer
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const scrim = document.getElementById('drawer-scrim');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  const setDrawer = (open, notify = true) => {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    scrim?.toggleAttribute('hidden', !open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    if (notify) sound.playClick();
    lockScroll(open || anyOverlayOpen());
    if (open) drawer.querySelector(FOCUSABLE)?.focus();
    else if (notify) menuBtn?.focus();
  };

  menuBtn?.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
  closeDrawerBtn?.addEventListener('click', () => setDrawer(false));
  scrim?.addEventListener('click', () => setDrawer(false));
  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // ------------------------------------------------------------------ overlays
  // The terminal owns its open/close; it only signals so the drawer can step aside.
  document.addEventListener('overlay:toggle', () => {
    if (document.getElementById('terminal-modal')?.classList.contains('active')) {
      setDrawer(false, false);
    }
    lockScroll(anyOverlayOpen());
  });

  document.addEventListener('keydown', (e) => {
    const openOverlay = document.querySelector(
      '#mobile-nav-drawer.open, #cv-modal.active, #terminal-modal.active'
    );

    if (e.key === 'Escape') {
      if (drawer?.classList.contains('open')) setDrawer(false);
      else if (cvModal?.classList.contains('active')) setCvModal(false);
      return;
    }

    // Keep Tab inside whichever overlay is on top.
    if (e.key !== 'Tab' || !openOverlay) return;
    const items = [...openOverlay.querySelectorAll(FOCUSABLE)].filter(
      (el) => !el.disabled && el.getClientRects().length > 0
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (!openOverlay.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ------------------------------------------------------------------ CV modal
  let cvTrigger = null;

  const setCvModal = (open, trigger = null) => {
    if (!cvModal) return;
    if (open) cvTrigger = trigger || document.activeElement;
    cvModal.classList.toggle('active', open);
    cvModal.toggleAttribute('inert', !open);
    lockScroll(open || anyOverlayOpen());
    sound.playClick();

    if (open) {
      cvModal.querySelector(FOCUSABLE)?.focus();
    } else if (cvTrigger?.isConnected) {
      cvTrigger.focus();
      cvTrigger = null;
    }
  };

  document.querySelectorAll('[data-open-cv]').forEach((btn) => {
    btn.addEventListener('click', () => setCvModal(true, btn));
  });

  // The CLI hands over to the same modal so focus and scroll-lock stay in one place.
  document.addEventListener('cv:open', () => setCvModal(true));

  document.getElementById('close-cv-btn')?.addEventListener('click', () => setCvModal(false));

  cvModal?.addEventListener('click', (e) => {
    if (e.target === cvModal) setCvModal(false);
  });

  // ------------------------------------------------------------------ hero cutout
  // The breakout portrait is optional: it only appears once the cutout PNG exists.
  const cutout = document.querySelector('[data-cutout]');
  if (cutout) {
    const probe = new Image();
    probe.addEventListener('load', () => {
      cutout.hidden = false;
      document.getElementById('hero-figure')?.classList.add('has-cutout');
    });
    probe.src = cutout.getAttribute('src');
  }

  // ------------------------------------------------------------------ clipboard
  const toastEl = document.getElementById('toast-notice');
  let toastTimer = 0;

  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('show');
    sound.playClick();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(val)
        .then(() => showToast(`${t('common.copied')}${val}`))
        .catch(() => showToast(`${t('common.copyFallback')}${val}`));
    });
  });

  // ------------------------------------------------------------------ contact form
  // No backend: the form composes a mailto link. The status message says so
  // plainly and always exposes a clickable fallback.
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#sender-name')?.value.trim() ?? '';
    const email = contactForm.querySelector('#sender-email')?.value.trim() ?? '';
    const message = contactForm.querySelector('#sender-message')?.value.trim() ?? '';

    sound.playClick();

    const mailtoUrl = `mailto:${CONTACT_EMAIL}`
      + `?subject=${encodeURIComponent(`Contact portfolio — ${name}`)}`
      + `&body=${encodeURIComponent(`De : ${name} (${email})\n\n${message}\n`)}`;

    if (formStatus) {
      formStatus.className = 'form-status-msg info';
      formStatus.innerHTML = `${t('contact.statusMailto')}<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
    }

    window.location.href = mailtoUrl;
  });
});
