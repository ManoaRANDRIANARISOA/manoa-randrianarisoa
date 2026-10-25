// ==============================================================================
// ACCENT SWITCHER (TEAL / SILVER / OCHRE)
// ==============================================================================
import { sound } from './audio-engine.js';

const ACCENTS = ['teal', 'silver', 'ochre'];
const STORAGE_KEY = 'manoa_arch_accent';
const LEGACY_KEY = 'manoa_arch_theme';

function readSavedAccent() {
  const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY);
  localStorage.removeItem(LEGACY_KEY);
  return ACCENTS.includes(saved) ? saved : 'teal';
}

export function initThemeManager() {
  setTheme(readSavedAccent(), false);

  document.querySelectorAll('.theme-color-btn').forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme'), true));
  });
}

export function setTheme(themeName, playAudio = true) {
  const accent = ACCENTS.includes(themeName) ? themeName : 'teal';

  if (accent === 'teal') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', accent);
  }

  localStorage.setItem(STORAGE_KEY, accent);

  document.querySelectorAll('.theme-color-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-theme') === accent);
  });

  if (playAudio) sound.playClick();
}
