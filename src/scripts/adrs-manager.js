// ==============================================================================
// ARCHITECTURAL DECISION RECORDS (ADRs) ACCORDION MANAGER
// ==============================================================================
import { sound } from './audio-engine.js';

function sync(card) {
  const open = card.classList.contains('open');
  card.querySelector('.adr-header')?.setAttribute('aria-expanded', String(open));
  // A collapsed panel keeps its height at 0fr, but its content would stay
  // focusable and readable by assistive tech without this.
  const panel = card.querySelector('.adr-content');
  if (panel) panel.toggleAttribute('inert', !open);
}

export function initAdrsManager() {
  const cards = [...document.querySelectorAll('.adr-card')];
  if (cards.length === 0) return;

  cards.forEach((card) => {
    sync(card);

    const header = card.querySelector('.adr-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const willOpen = !card.classList.contains('open');
      cards.forEach((c) => c.classList.toggle('open', c === card && willOpen));
      cards.forEach(sync);
      sound.playClick();
    });
  });
}
