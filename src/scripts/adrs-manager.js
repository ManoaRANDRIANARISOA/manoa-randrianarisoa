// ==============================================================================
// ARCHITECTURAL DECISION RECORDS (ADRs) ACCORDION MANAGER
// ==============================================================================
import { sound } from './audio-engine.js';

export function initAdrsManager() {
  const adrCards = document.querySelectorAll('.adr-card');

  adrCards.forEach(card => {
    const header = card.querySelector('.adr-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      // Close other cards for clean accordion behaviour
      adrCards.forEach(c => {
        if (c !== card) c.classList.remove('open');
      });

      card.classList.toggle('open', !isOpen);
      sound.playClick();
    });
  });
}
