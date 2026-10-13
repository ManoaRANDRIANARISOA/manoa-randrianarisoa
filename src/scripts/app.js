// ==============================================================================
// MAIN APPLICATION ENTRY POINT
// ==============================================================================
import { createIcons, icons } from 'lucide';
import { initNetworkCanvas } from './canvas-network.js';
import { initArchitectureViewer } from './architecture-viewer.js';
import { initProjectsManager } from './projects-manager.js';
import { initAdrsManager } from './adrs-manager.js';
import { initTerminal } from './terminal.js';
import { initThemeManager } from './theme-manager.js';
import { initScrollAnimations } from './scroll-animations.js';
import { sound } from './audio-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  createIcons({ icons });

  // 2. Initialize Theme Manager
  initThemeManager();

  // 3. Initialize Interactive Background Canvas
  initNetworkCanvas('hero-canvas');

  // 4. Initialize Architecture Blueprint Interactive Inspector
  initArchitectureViewer();

  // 5. Initialize Projects Gallery & Filtering
  initProjectsManager();

  // 6. Initialize Architectural Decision Records (ADRs)
  initAdrsManager();

  // 7. Initialize Interactive Terminal / Console
  initTerminal();

  // 8. Initialize Smooth Scrolling & GSAP ScrollTriggers
  initScrollAnimations();

  // 9. Audio Engine Switcher
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    const updateSoundUI = (enabled) => {
      soundBtn.classList.toggle('sound-on', enabled);
      soundBtn.setAttribute('title', enabled ? 'Son télémétrique : Activé' : 'Son télémétrique : Muet');
      const iconWrap = soundBtn.querySelector('.sound-icon-wrap');
      if (iconWrap) {
        iconWrap.innerHTML = enabled
          ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
          : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      }
    };

    updateSoundUI(sound.enabled);

    soundBtn.addEventListener('click', () => {
      const isEnabled = sound.toggle();
      updateSoundUI(isEnabled);
    });
  }

  // 10. CV Modal Triggers
  const cvModal = document.getElementById('cv-modal');
  const openCvBtns = document.querySelectorAll('[data-open-cv]');
  const closeCvBtn = document.getElementById('close-cv-btn');

  openCvBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (cvModal) {
        cvModal.classList.add('active');
        sound.playClick();
      }
    });
  });

  if (closeCvBtn) {
    closeCvBtn.addEventListener('click', () => {
      if (cvModal) {
        cvModal.classList.remove('active');
        sound.playClick();
      }
    });
  }

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        cvModal.classList.remove('active');
        sound.playClick();
      }
    });
  }

  // 11. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      sound.playClick();
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        sound.playClick();
      });
    }

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 12. 1-Click Clipboard Copy with Toast Notice
  const toastEl = document.getElementById('toast-notice');
  const copyButtons = document.querySelectorAll('[data-copy]');

  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('show');
    sound.playClick();
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(val).then(() => {
        showToast(`✓ Copié dans le presse-papier : ${val}`);
      }).catch(() => {
        showToast(`Copié : ${val}`);
      });
    });
  });

  // 13. Contact Form Simulation / Mailto Bridge
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#sender-name')?.value || '';
      const email = contactForm.querySelector('#sender-email')?.value || '';
      const message = contactForm.querySelector('#sender-message')?.value || '';

      sound.playClick();
      formStatus.textContent = '✓ Message enregistré ! Redirection vers votre client mail...';
      formStatus.className = 'form-status-msg success';

      const mailtoUrl = `mailto:manoa.wrk@gmail.com?subject=Contact%20Portfolio%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(`De: ${name} (${email})\n\n${message}`)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }
});
