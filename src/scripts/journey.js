// ==============================================================================
// JOURNEY SCENE — one scroll-scrubbed ink walk.
// Progress is a pure function of scroll position, so the crossing rewinds when you
// scroll back up. The stride count is derived from the ground layer's travel, which
// keeps the feet roughly in step with the rule sliding under them.
// ==============================================================================

const staticScene = window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 600px)');

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const TAU = Math.PI * 2;

// Limb swings in degrees. Positive rotates a hanging limb backwards, and the
// figure faces right, so the front leg takes the negative half of the cycle.
const SWING = { thigh: 24, knee: 34, arm: 20 };

// The near layer is 500% wide and travels 80% of itself: four drawing widths.
const GROUND_TRAVEL = 4;

export function initJourney() {
  const scene = document.getElementById('journey');
  const runway = document.getElementById('journey-runway');
  const stage = document.getElementById('journey-stage');
  const figure = document.getElementById('journey-figure');
  if (!scene || !runway || !stage || !figure) return;

  const drawing = scene.querySelector('.journey-drawing');
  const hint = document.getElementById('journey-hint');
  const indexEl = document.getElementById('journey-index');
  const chapters = [...stage.querySelectorAll('.journey-chapter')];
  const stations = [...stage.querySelectorAll('.journey-station')];
  const dots = [...stage.querySelectorAll('.rail-dot')];
  const limbs = new Map(
    [...figure.querySelectorAll('[data-limb]')].map((el) => [
      el.dataset.limb,
      { el, pivot: el.dataset.pivot.split(' ') }
    ])
  );

  const STOPS = Math.max(1, chapters.length);
  let strides = 24;
  let bob = 4;
  let lean = 0;
  let inView = false;
  let queued = 0;
  let lastP = -1;
  let stop = -1;

  function measure() {
    const figHeight = figure.getBoundingClientRect().height;
    if (!figHeight) return;
    bob = figHeight * 0.022;
    const ground = (drawing?.clientWidth || window.innerWidth) * GROUND_TRAVEL;
    // Whole strides only: the walker starts and finishes standing, never mid-step.
    strides = Math.round(clamp(ground / (figHeight * 0.55), 8, 90));
  }

  function rotate(kind, deg) {
    const limb = limbs.get(kind);
    if (!limb) return;
    const [x, y] = limb.pivot;
    limb.el.setAttribute('transform', `translate(${x} ${y}) rotate(${deg.toFixed(2)})`);
  }

  function walk(p) {
    const phase = p * strides * TAU;
    const s = Math.sin(phase);
    rotate('leg-f', -SWING.thigh * s);
    rotate('leg-b', SWING.thigh * s);
    rotate('shin-f', SWING.knee * Math.max(0, s));
    rotate('shin-b', SWING.knee * Math.max(0, -s));
    rotate('arm-f', SWING.arm * s);
    rotate('arm-b', -SWING.arm * s);
    figure.style.setProperty('--bob', `${(-bob * Math.abs(s)).toFixed(2)}px`);
    figure.style.setProperty('--lean', `${lean.toFixed(2)}deg`);
  }

  function setStop(next) {
    if (next === stop) return;
    stop = next;
    stage.dataset.stop = String(next);
    figure.dataset.stop = String(next);
    chapters.forEach((el, i) => el.classList.toggle('is-active', i === next));
    stations.forEach((el, i) => {
      el.classList.toggle('is-active', i === next);
      el.classList.toggle('is-passed', i < next);
    });
    dots.forEach((el, i) => el.classList.toggle('is-on', i <= next));
    if (indexEl) {
      indexEl.textContent = `${String(next + 1).padStart(2, '0')} / ${String(STOPS).padStart(2, '0')}`;
    }
  }

  function request() {
    if (!queued) queued = requestAnimationFrame(frame);
  }

  function frame() {
    queued = 0;
    if (!inView || staticScene.matches) return;

    const rect = runway.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const p = clamp(-rect.top / travel, 0, 1);
    const delta = lastP < 0 ? 0 : p - lastP;
    lastP = p;

    scene.style.setProperty('--journey-p', p.toFixed(4));

    // The lean chases scroll velocity, then settles back to vertical on its own.
    lean += (clamp(delta * 420, -3.5, 3.5) - lean) * 0.16;
    walk(p);
    setStop(clamp(Math.round(p * (STOPS - 1)), 0, STOPS - 1));

    if (delta !== 0) hint?.classList.add('is-spent');
    if (delta !== 0 || Math.abs(lean) > 0.04) request();
  }

  const observer = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting);
    if (inView) {
      lastP = -1;
      request();
    }
  }, { rootMargin: '15% 0px' });
  observer.observe(runway);

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    lastP = -1;
    request();
  });
  window.addEventListener('load', () => {
    measure();
    request();
  });
  staticScene.addEventListener?.('change', () => {
    lastP = -1;
    request();
  });

  measure();
  setStop(0);
}
