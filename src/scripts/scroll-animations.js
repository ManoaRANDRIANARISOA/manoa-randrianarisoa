// ==============================================================================
// MOTION LAYER — smooth scroll, the thread, reveals and pointer effects.
// Hand-driven on Lenis + IntersectionObserver + requestAnimationFrame: no
// animation library, so every millisecond of motion is accounted for.
// ==============================================================================
import Lenis from 'lenis';
import { t, onLangChange } from './i18n.js';

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

const TICKS = [
  { id: 'hero', key: 'drawer.home' },
  { id: 'architecture', key: 'header.navArchitecture' },
  { id: 'projects', key: 'header.navProjects' },
  { id: 'adrs', key: 'header.navAdrs' },
  { id: 'stack', key: 'header.navStack' },
  { id: 'about', key: 'header.navAbout' },
  { id: 'contact', key: 'header.navContact' }
];

const REVEAL_SELECTOR = '.reveal, .lm, .section-meta-tag, .hero-role, .draw-rule, .project-card';
const BAND_SELECTOR = '.dark-band:not(.terminal-modal-backdrop):not(.cv-modal-backdrop)';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>=+*·#%';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const easeOut = (k) => 1 - Math.pow(1 - k, 3);

export function initScrollAnimations() {
  const root = document.documentElement;
  const reduced = motionQuery.matches;

  // ---------------------------------------------------------------- Lenis
  const lenis = reduced ? null : new Lenis({
    duration: 1.05,
    easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    anchors: false
  });

  if (lenis) {
    const loop = (time) => {
      lenis.raf(time);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -72, duration: 1.2 });
    } else {
      target.scrollIntoView({ block: 'start' });
    }
  }

  // ---------------------------------------------------------------- reveals
  let revealObserver = null;

  if (reduced) {
    document.querySelectorAll(`${REVEAL_SELECTOR}, [data-count]`).forEach((el) => el.classList.add('is-in'));
  } else {
    // The markup carries the final figures so no-JS readers and crawlers see real
    // numbers. Zero them before the first frame so the count-up never runs backwards.
    document.querySelectorAll('[data-count]').forEach((el) => {
      el.textContent = `${el.dataset.prefix || ''}0${el.dataset.suffix || ''}`;
    });

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
        if (entry.target.hasAttribute('data-count')) runCount(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  }

  function scanReveals(scope = document) {
    const targets = scope.querySelectorAll(`${REVEAL_SELECTOR}, [data-count]`);
    if (!revealObserver) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }
    targets.forEach((el) => {
      if (!el.classList.contains('is-in')) revealObserver.observe(el);
    });
  }

  // Safety net: if an observer callback is ever dropped, content must not stay
  // invisible. Anything already on screen is revealed unconditionally.
  function revealInView() {
    if (!revealObserver) return;
    const vh = window.innerHeight;
    document.querySelectorAll(`${REVEAL_SELECTOR}:not(.is-in), [data-count]:not(.is-in)`).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= vh) return;
      el.classList.add('is-in');
      revealObserver.unobserve(el);
      if (el.hasAttribute('data-count')) runCount(el);
    });
  }

  // ---------------------------------------------------------------- counters
  // The strip can sit inside the first viewport: the observer then fires at boot
  // and the count ends before the page is even painted. Hold it until the fonts
  // are in and the hero has drawn, so the 0 -> N run is actually witnessed.
  let countReady = false;
  const countGate = (document.fonts ? document.fonts.ready : Promise.resolve())
    .then(() => new Promise((resolve) => setTimeout(resolve, 450)))
    .then(() => { countReady = true; });

  function runCount(el) {
    if (el.dataset.countStarted) return;
    const target = parseFloat(el.dataset.count);
    if (Number.isNaN(target)) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduced) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }
    if (!countReady) {
      countGate.then(() => runCount(el));
      return;
    }
    el.dataset.countStarted = '1';
    const duration = 1150;
    const start = performance.now();
    const step = (now) => {
      const k = clamp((now - start) / duration, 0, 1);
      el.textContent = `${prefix}${Math.round(easeOut(k) * target)}${suffix}`;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---------------------------------------------------------------- thread
  const rail = document.getElementById('thread-rail');
  const ticksHolder = document.getElementById('thread-ticks');
  const pctEl = document.getElementById('thread-pct');
  const header = document.getElementById('site-header');
  const navLinks = [...document.querySelectorAll('#nav-links .nav-link')];
  const timeline = document.getElementById('timeline-container');
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];

  function buildTicks() {
    if (!ticksHolder) return;
    ticksHolder.innerHTML = '';
    TICKS.forEach(({ id, key }) => {
      if (!document.getElementById(id)) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'thread-tick';
      btn.dataset.target = id;
      btn.setAttribute('aria-label', t(key));
      const label = document.createElement('span');
      label.className = 'tick-label';
      label.textContent = t(key);
      btn.appendChild(label);
      btn.addEventListener('click', () => scrollToId(id));
      ticksHolder.appendChild(btn);
    });
  }

  let sections = [];
  let bands = [];
  const tickEls = () => [...document.querySelectorAll('.thread-tick')];

  function measure() {
    const y = window.scrollY;
    sections = TICKS
      .map(({ id }) => ({ id, el: document.getElementById(id) }))
      .filter((s) => s.el)
      .map((s) => {
        const rect = s.el.getBoundingClientRect();
        return { id: s.id, top: rect.top + y, bottom: rect.bottom + y };
      });

    bands = [...document.querySelectorAll(BAND_SELECTOR)].map((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top + y, bottom: rect.bottom + y };
    });

    const span = Math.max(1, root.scrollHeight - window.innerHeight);
    tickEls().forEach((btn) => {
      const section = sections.find((s) => s.id === btn.dataset.target);
      if (!section) return;
      btn.style.setProperty('--pos', clamp(section.top / span, 0, 1).toFixed(4));
    });

    update();
  }

  function update() {
    const y = window.scrollY;
    const span = Math.max(1, root.scrollHeight - window.innerHeight);
    const p = clamp(y / span, 0, 1);

    root.style.setProperty('--scroll-p', p.toFixed(4));
    if (pctEl) pctEl.textContent = String(Math.round(p * 100)).padStart(2, '0');
    if (header) header.classList.toggle('scrolled', y > 24);

    // The header sits on the paper — unless the page has slid a dark band under it.
    const probe = y + 46;
    const onDark = bands.some((b) => probe >= b.top && probe <= b.bottom);
    root.classList.toggle('chrome-dark', onDark);

    let activeId = sections[0]?.id;
    for (const s of sections) {
      if (y + window.innerHeight * 0.34 >= s.top) activeId = s.id;
    }
    tickEls().forEach((btn) => btn.classList.toggle('active', btn.dataset.target === activeId));
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });

    // The thread hands over to the career spine: it draws itself as you read.
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const line = window.innerHeight * 0.62;
      timeline.style.setProperty('--draw', clamp((line - rect.top) / (rect.height * 0.88), 0, 1).toFixed(4));
    }

    if (!reduced) {
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.setProperty('--py', `${clamp(-progress * 16, -18, 18).toFixed(2)}px`);
      });
    }
  }

  // ---------------------------------------------------------------- pointer
  function trackPointer(el, { tilt = false, spot = false } = {}) {
    if (reduced || !finePointer.matches) return;
    let rect = null;
    let queued = 0;

    el.addEventListener('pointerenter', () => { rect = el.getBoundingClientRect(); });
    el.addEventListener('pointermove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        if (spot) {
          el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
          el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
        }
        if (tilt) {
          el.style.setProperty('--ry', `${((px - 0.5) * 5).toFixed(2)}deg`);
          el.style.setProperty('--rx', `${((0.5 - py) * 3.5).toFixed(2)}deg`);
          el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
          el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
        }
      });
    });
    el.addEventListener('pointerleave', () => {
      rect = null;
      if (queued) { cancelAnimationFrame(queued); queued = 0; }
      ['--rx', '--ry'].forEach((v) => el.style.setProperty(v, '0deg'));
      ['--mx', '--my'].forEach((v) => el.style.removeProperty(v));
    });
  }

  function initMagnets() {
    if (reduced || !finePointer.matches) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      let queued = 0;
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        if (queued) return;
        queued = requestAnimationFrame(() => {
          queued = 0;
          el.style.transform = `translate(${(dx * 7).toFixed(2)}px, ${(dy * 5).toFixed(2)}px)`;
        });
      });
      el.addEventListener('pointerleave', () => {
        if (queued) { cancelAnimationFrame(queued); queued = 0; }
        el.style.transform = '';
      });
    });
  }

  const stage = document.getElementById('blueprint-stage');
  if (stage) trackPointer(stage, { spot: true });

  function bindTilts() {
    document.querySelectorAll('[data-tilt], .project-card').forEach((el) => {
      if (el.dataset.tiltBound) return;
      el.dataset.tiltBound = '1';
      trackPointer(el, { tilt: true });
    });
  }

  bindTilts();
  initMagnets();

  // ---------------------------------------------------------------- scramble
  function scramble(el, text, duration = 640) {
    if (reduced) {
      el.textContent = text;
      return;
    }
    const start = performance.now();
    const len = text.length;
    const step = (now) => {
      const k = clamp((now - start) / duration, 0, 1);
      const settled = Math.floor(easeOut(k) * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        out += i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = text;
    };
    requestAnimationFrame(step);
  }

  function runScrambles() {
    document.querySelectorAll('[data-scramble]').forEach((el) => scramble(el, el.textContent.trim()));
  }

  // ---------------------------------------------------------------- anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, '', `#${id}`);
    });
  });

  // ---------------------------------------------------------------- wiring
  buildTicks();
  measure();
  scanReveals();
  runScrambles();

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measure();
      revealInView();
    }, 140);
  });
  window.addEventListener('load', () => {
    measure();
    revealInView();
  });

  if (!reduced) setTimeout(revealInView, 1400);

  // Lenis drives the native scrollbar, so one throttled scroll listener covers both.
  let scrollQueued = 0;
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = requestAnimationFrame(() => {
      scrollQueued = 0;
      update();
    });
  }, { passive: true });

  // Dynamic content (projects, ADRs, language switch) changes the page height.
  let mutationQueued = 0;
  const observer = new MutationObserver(() => {
    if (mutationQueued) return;
    mutationQueued = requestAnimationFrame(() => {
      mutationQueued = 0;
      scanReveals();
      bindTilts();
      measure();
      lenis?.resize();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  onLangChange(() => {
    buildTicks();
    runScrambles();
    requestAnimationFrame(measure);
  });

  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    if (document.getElementById(id)) {
      requestAnimationFrame(() => scrollToId(id));
    }
  }

  return { lenis, scrollToId, scanReveals };
}
