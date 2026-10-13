// ==============================================================================
// THEME & ACCENT SWITCHER (CYAN / EMERALD / AMBER / VIOLET)
// ==============================================================================
import { sound } from './audio-engine.js';

export function initThemeManager() {
  const savedTheme = localStorage.getItem('manoa_arch_theme') || 'cyan';
  setTheme(savedTheme, false);

  const themeBtns = document.querySelectorAll('.theme-color-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme, true);
    });
  });
}

export function setTheme(themeName, playAudio = true) {
  if (themeName === 'cyan') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', themeName);
  }

  localStorage.setItem('manoa_arch_theme', themeName);

  document.querySelectorAll('.theme-color-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-theme') === themeName);
  });

  if (playAudio) {
    sound.playClick();
  }
}
