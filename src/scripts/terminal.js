// ==============================================================================
// INTERACTIVE ARCHITECT CONSOLE (TERMINAL CLI)
// Localized command outputs (FR / EN) via i18n getLang().
// ==============================================================================
import { sound } from './audio-engine.js';
import { setTheme } from './theme-manager.js';
import { getLang } from './i18n.js';

const TERM_STRINGS = {
  help: {
    fr: `
          <strong>COMMANDES DISPONIBLES :</strong><br>
          • <span class="highlight">whoami / bio</span> : Profil exécutif & formation Master IA<br>
          • <span class="highlight">projects</span>     : Liste des projets en production & liens GitHub<br>
          • <span class="highlight">stack</span>        : Matrice des technologies maîtrisées<br>
          • <span class="highlight">adrs</span>         : Registre des décisions d'architecture (ADRs)<br>
          • <span class="highlight">metrics</span>      : Indicateurs de performance (-40% TTFB, -70% OCR...)<br>
          • <span class="highlight">cv</span>           : Ouvrir le hub de téléchargement CV PDF<br>
          • <span class="highlight">theme &lt;nom&gt;</span>  : Modifier le thème (cyan | emerald | amber | violet)<br>
          • <span class="highlight">contact</span>      : Coordonnées directes (Email, Tél, GitHub)<br>
          • <span class="highlight">clear</span>        : Effacer la console
        `,
    en: `
          <strong>AVAILABLE COMMANDS:</strong><br>
          • <span class="highlight">whoami / bio</span> : Executive profile & AI MSc background<br>
          • <span class="highlight">projects</span>     : List of production projects & GitHub links<br>
          • <span class="highlight">stack</span>        : Mastered technology matrix<br>
          • <span class="highlight">adrs</span>         : Architectural decision records (ADRs)<br>
          • <span class="highlight">metrics</span>      : Performance indicators (-40% TTFB, -70% OCR...)<br>
          • <span class="highlight">cv</span>           : Open the resume download hub<br>
          • <span class="highlight">theme &lt;name&gt;</span> : Switch theme (cyan | emerald | amber | violet)<br>
          • <span class="highlight">contact</span>      : Direct contact details (Email, Phone, GitHub)<br>
          • <span class="highlight">clear</span>        : Clear the console
        `
  },
  whoami: {
    fr: `
          <strong>MANOA RANDRIANARISOA</strong><br>
          Architecte Technique & Développeur Full-Stack Senior<br>
          Master Électronique, Informatique & IA (ISPM Antananarivo - 2024)<br>
          Spécialisé dans la résilience des systèmes (Offline-First), le multi-tenant cloud et les architectures robustes.
        `,
    en: `
          <strong>MANOA RANDRIANARISOA</strong><br>
          Technical Architect & Senior Full-Stack Developer<br>
          MSc Electronics, Computer Science & AI (ISPM Antananarivo - 2024)<br>
          Specialized in system resilience (Offline-First), cloud multi-tenancy and robust architectures.
        `
  },
  projects: {
    fr: `
          <strong>PROJETS MAJEURS :</strong><br>
          1. <strong>ANKA (AFD / Digital Energy Challenge)</strong> : Collecte Terrain ESG Offline-First [45 exigences tracées / PWA React-Dexie / NestJS / 14 j offline]<br>
          2. <strong>ResHPro</strong> : SaaS Multi-tenant Hôtellerie, POS & Stocks [React 18 / PostgreSQL / RBAC]<br>
          3. <strong>Study-Agent / LMS</strong> : ERP Scolaire v1.2.2 en Production [Offline-First / Electron / SQLite / Supabase]<br>
          4. <strong>Maboo</strong> : E-Commerce Headless & CMS [React 19 / React Router 7 SSR / Zustand]<br>
          5. <strong>Given Day Tech</strong> : Lead Mobile & Archi (Équipe de 4) [React Native / Node.js]<br>
          6. <strong>ToutPourSaGloire.com</strong> : Média & Moteur Meilisearch [-40% temps de chargement]<br>
          7. <strong>EQIMA</strong> : OCR & Ingestion Sage ERP [-70% traitement factures]
        `,
    en: `
          <strong>MAJOR PROJECTS:</strong><br>
          1. <strong>ANKA (AFD / Digital Energy Challenge)</strong> : Offline-First ESG field collection [45 traced requirements / PWA React-Dexie / NestJS / 14 days offline]<br>
          2. <strong>ResHPro</strong> : Multi-tenant Hospitality SaaS, POS & Inventory [React 18 / PostgreSQL / RBAC]<br>
          3. <strong>Study-Agent / LMS</strong> : School ERP v1.2.2 In Production [Offline-First / Electron / SQLite / Supabase]<br>
          4. <strong>Maboo</strong> : Headless E-Commerce & CMS [React 19 / React Router 7 SSR / Zustand]<br>
          5. <strong>Given Day Tech</strong> : Mobile & Archi Lead (Team of 4) [React Native / Node.js]<br>
          6. <strong>ToutPourSaGloire.com</strong> : Media Platform & Meilisearch Engine [-40% loading time]<br>
          7. <strong>EQIMA</strong> : OCR & Sage ERP Ingestion [-70% invoice processing]
        `
  },
  stack: {
    fr: `
          <strong>COMPÉTENCES PRINCIPALES :</strong><br>
          • Frontend : React 18/19, TypeScript, Next.js, React Native, Tailwind CSS, Vite, Zustand<br>
          • Backend : Node.js, Express 5, PostgreSQL, Supabase, SQLite (WAL Mode), GraphQL, REST<br>
          • Systèmes & Archi : SaaS Multi-tenant, RBAC, Electron, Docker, CI/CD, Git, Linux<br>
          • Données & IA : Python, TensorFlow, OpenCV, Algorithmique avancée
        `,
    en: `
          <strong>CORE SKILLS:</strong><br>
          • Frontend: React 18/19, TypeScript, Next.js, React Native, Tailwind CSS, Vite, Zustand<br>
          • Backend: Node.js, Express 5, PostgreSQL, Supabase, SQLite (WAL Mode), GraphQL, REST<br>
          • Systems & Arch: Multi-tenant SaaS, RBAC, Electron, Docker, CI/CD, Git, Linux<br>
          • Data & AI: Python, TensorFlow, OpenCV, Advanced algorithms
        `
  },
  adrs: {
    fr: `
          <strong>ARCHITECTURAL DECISION RECORDS :</strong><br>
          • ADR-001 : Choix Offline-First SQLite (WAL) + Supabase pour résister aux pannes réseau.<br>
          • ADR-002 : Isolation logique multi-tenant (PostgreSQL Row-Level Security) vs multi-instances.<br>
          • ADR-003 : Migration React Router 7 SSR avec streaming de flux pour Maboo.
        `,
    en: `
          <strong>ARCHITECTURAL DECISION RECORDS:</strong><br>
          • ADR-001: Offline-First SQLite (WAL) + Supabase choice to withstand network outages.<br>
          • ADR-002: Logical multi-tenant isolation (PostgreSQL Row-Level Security) vs multi-instances.<br>
          • ADR-003: React Router 7 SSR migration with stream rendering for Maboo.
        `
  },
  metrics: {
    fr: `
          <strong>BENCHMARKS & RÉSULTATS :</strong><br>
          • 100% Disponibilité locale en mode hors-ligne (Study-Agent)<br>
          • -40% Latence globale grâce à Meilisearch & SSR (ToutPourSaGloire / Maboo)<br>
          • -70% Temps de traitement administratif par automatisation OCR & Sage ERP (EQIMA)<br>
          • Équipe de 4 ingénieurs pilotée avec succès (Given Day Tech)
        `,
    en: `
          <strong>BENCHMARKS & RESULTS:</strong><br>
          • 100% Local availability in offline mode (Study-Agent)<br>
          • -40% Global latency thanks to Meilisearch & SSR (ToutPourSaGloire / Maboo)<br>
          • -70% Administrative processing time via OCR & Sage ERP automation (EQIMA)<br>
          • Team of 4 engineers successfully steered (Given Day Tech)
        `
  },
  cv: {
    fr: "Ouverture du sélecteur de curriculum vitae...",
    en: 'Opening the resume selector...'
  },
  themeOk: {
    fr: 'Thème appliqué : <strong>{theme}</strong>',
    en: 'Theme applied: <strong>{theme}</strong>'
  },
  themeErr: {
    fr: 'Thème inconnu "{arg}". Utilisez : cyan, emerald, amber, violet.',
    en: 'Unknown theme "{arg}". Use: cyan, emerald, amber, violet.'
  },
  contact: {
    fr: `
          <strong>COORDONNÉES DE CONTACT :</strong><br>
          • Email    : <a href="mailto:manoa.wrk@gmail.com" style="color:var(--accent-primary)">manoa.wrk@gmail.com</a><br>
          • Téléphone: <a href="tel:+261347151789" style="color:var(--accent-primary)">+261 34 71 517 89</a><br>
          • GitHub   : <a href="https://github.com/ManoaRANDRIANARISOA" target="_blank" style="color:var(--accent-primary)">github.com/ManoaRANDRIANARISOA</a><br>
          • LinkedIn : <a href="https://linkedin.com/in/manoa-randrianarisoa" target="_blank" style="color:var(--accent-primary)">linkedin.com/in/manoa-randrianarisoa</a><br>
          • Statut   : Disponible immédiatement (Remote ou Local)
        `,
    en: `
          <strong>CONTACT DETAILS:</strong><br>
          • Email    : <a href="mailto:manoa.wrk@gmail.com" style="color:var(--accent-primary)">manoa.wrk@gmail.com</a><br>
          • Phone    : <a href="tel:+261347151789" style="color:var(--accent-primary)">+261 34 71 517 89</a><br>
          • GitHub   : <a href="https://github.com/ManoaRANDRIANARISOA" target="_blank" style="color:var(--accent-primary)">github.com/ManoaRANDRIANARISOA</a><br>
          • LinkedIn : <a href="https://linkedin.com/in/manoa-randrianarisoa" target="_blank" style="color:var(--accent-primary)">linkedin.com/in/manoa-randrianarisoa</a><br>
          • Status   : Immediately available (Remote or On-site)
        `
  },
  unknown: {
    fr: 'Commande inconnue : "{cmd}". Tapez <span class="highlight">help</span> pour voir la liste des commandes.',
    en: 'Unknown command: "{cmd}". Type <span class="highlight">help</span> to see the list of commands.'
  }
};

function pick(key, replacements = {}) {
  const entry = TERM_STRINGS[key];
  let str = getLang() === 'en' ? (entry?.en ?? entry?.fr) : entry?.fr;
  Object.entries(replacements).forEach(([k, v]) => {
    str = str.replaceAll(`{${k}}`, v);
  });
  return str;
}

export function initTerminal() {
  const modal = document.getElementById('terminal-modal');
  const openBtns = document.querySelectorAll('[data-open-terminal]');
  const closeBtn = document.getElementById('close-terminal-btn');
  const inputEl = document.getElementById('terminal-input');
  const bodyEl = document.getElementById('terminal-output');

  if (!modal || !inputEl || !bodyEl) return;

  const commandHistory = [];
  let historyIdx = -1;

  function openTerminal() {
    modal.classList.add('active');
    inputEl.focus();
    sound.playClick();
  }

  function closeTerminal() {
    modal.classList.remove('active');
    sound.playClick();
  }

  openBtns.forEach(btn => btn.addEventListener('click', openTerminal));
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Global hotkeys: Ctrl+K or ~ or F1
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeTerminal();
    }
  });

  function appendLine(content, className = '') {
    const p = document.createElement('p');
    p.className = `terminal-line ${className}`;
    p.innerHTML = content;
    bodyEl.appendChild(p);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const trimmed = cmdRaw.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIdx = commandHistory.length;

    appendLine(`<span class="prompt-label">manoa@arch:~$</span> <span class="command-echo">${escapeHtml(trimmed)}</span>`);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    switch (cmd) {
      case 'help':
        appendLine(pick('help'));
        sound.playClick();
        break;

      case 'whoami':
      case 'bio':
        appendLine(pick('whoami'), 'highlight');
        sound.playClick();
        break;

      case 'projects':
        appendLine(pick('projects'));
        sound.playClick();
        break;

      case 'stack':
        appendLine(pick('stack'));
        sound.playClick();
        break;

      case 'adrs':
        appendLine(pick('adrs'));
        sound.playClick();
        break;

      case 'metrics':
        appendLine(pick('metrics'), 'success');
        sound.playClick();
        break;

      case 'cv':
        appendLine(pick('cv'), 'highlight');
        closeTerminal();
        const cvModal = document.getElementById('cv-modal');
        if (cvModal) cvModal.classList.add('active');
        sound.playClick();
        break;

      case 'theme':
        if (['cyan', 'emerald', 'amber', 'violet'].includes(arg)) {
          setTheme(arg, true);
          appendLine(pick('themeOk', { theme: arg.toUpperCase() }), 'success');
        } else {
          appendLine(pick('themeErr', { arg: escapeHtml(arg) }), 'error');
          sound.playError();
        }
        break;

      case 'contact':
        appendLine(pick('contact'));
        sound.playClick();
        break;

      case 'clear':
        bodyEl.innerHTML = '';
        sound.playClick();
        break;

      default:
        appendLine(pick('unknown', { cmd: escapeHtml(trimmed) }), 'error');
        sound.playError();
        break;
    }
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0 && historyIdx > 0) {
        historyIdx--;
        inputEl.value = commandHistory[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < commandHistory.length - 1) {
        historyIdx++;
        inputEl.value = commandHistory[historyIdx];
      } else {
        historyIdx = commandHistory.length;
        inputEl.value = '';
      }
    }
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
