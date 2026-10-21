// ==============================================================================
// INTERACTIVE ARCHITECT CONSOLE (TERMINAL CLI)
// Localized command outputs (FR / EN) via i18n getLang().
// ==============================================================================
import { sound } from './audio-engine.js';
import { setTheme } from './theme-manager.js';
import { getLang, setLang } from './i18n.js';

const TERM_STRINGS = {
  help: {
    fr: `
          <strong>COMMANDES DISPONIBLES :</strong><br>
          • <span class="highlight">whoami</span>       : Profil, formation et statut de disponibilité<br>
          • <span class="highlight">journey</span>      : Parcours chronologique (missions, stage, enseignement, diplômes)<br>
          • <span class="highlight">projects</span>     : Systèmes livrés & liens GitHub<br>
          • <span class="highlight">stack</span>        : Matrice des technologies réellement utilisées<br>
          • <span class="highlight">adrs</span>         : Registre des décisions d'architecture (ADR)<br>
          • <span class="highlight">metrics</span>      : Chiffres clés, avec leur périmètre de mesure<br>
          • <span class="highlight">cv</span>           : Ouvrir le hub de téléchargement CV (PDF)<br>
          • <span class="highlight">theme &lt;nom&gt;</span>  : Couleur d'accent (teal | indigo | ochre | moss)<br>
          • <span class="highlight">lang &lt;fr|en&gt;</span> : Basculer la langue du site<br>
          • <span class="highlight">contact</span>      : Coordonnées directes<br>
          • <span class="highlight">clear</span>        : Effacer la console
        `,
    en: `
          <strong>AVAILABLE COMMANDS:</strong><br>
          • <span class="highlight">whoami</span>       : Profile, education and availability status<br>
          • <span class="highlight">journey</span>      : Chronological career path (missions, internship, teaching, degrees)<br>
          • <span class="highlight">projects</span>     : Shipped systems & GitHub links<br>
          • <span class="highlight">stack</span>        : Matrix of technologies actually used<br>
          • <span class="highlight">adrs</span>         : Architectural decision records (ADR)<br>
          • <span class="highlight">metrics</span>      : Key figures, with their measurement scope<br>
          • <span class="highlight">cv</span>           : Open the resume download hub (PDF)<br>
          • <span class="highlight">theme &lt;name&gt;</span> : Accent colour (teal | indigo | ochre | moss)<br>
          • <span class="highlight">lang &lt;fr|en&gt;</span> : Switch the site language<br>
          • <span class="highlight">contact</span>      : Direct contact details<br>
          • <span class="highlight">clear</span>        : Clear the console
        `
  },
  whoami: {
    fr: `
          <strong>MANOA RANDRIANARISOA</strong><br>
          Architecte technique & développeur full-stack senior — Antananarivo, Madagascar (UTC+3)<br>
          Master Électronique, Informatique & IA (ISPM) : soutenu et validé, diplôme en cours d'émission.<br>
          Licence Électronique & Informatique (ISPM, 2018—2022).<br>
          Spécialisé dans la résilience des systèmes (offline-first), le multi-tenant cloud et l'encadrement d'équipes remote.
        `,
    en: `
          <strong>MANOA RANDRIANARISOA</strong><br>
          Technical architect & senior full-stack developer — Antananarivo, Madagascar (UTC+3)<br>
          MSc Electronics, Computer Science & AI (ISPM): defended and validated, diploma pending issuance.<br>
          Bachelor's in Electronics & Computer Science (ISPM, 2018—2022).<br>
          Specialized in system resilience (offline-first), cloud multi-tenancy and mentoring remote teams.
        `
  },
  journey: {
    fr: `
          <strong>FIL DU PARCOURS :</strong><br>
          • 2025 — présent : Consultant indépendant / architecte technique (ANKA, ResHPro, Study-Agent, Maboo)<br>
          • 2025 — 2026    : Architecte technique & lead mobile, Given Day Tech (France, associatif) — 4 développeurs<br>
          • 2025 — présent : Développeur full-stack senior, ToutPourSaGloire.com (international)<br>
          • 2023 — 2024    : Développeur CMS & designer UI/UX, RICSM (États-Unis, remote) via IKS Antananarivo<br>
          • 2022 (6 mois)  : Stage full-stack & pipeline OCR, EQIMA (Antananarivo)<br>
          • 2020 — 2023    : Enseignant vacataire en informatique, électronique et mathématiques appliquées<br>
          • 2022 — 2024    : Master Électronique, Informatique & IA — ISPM<br>
          • 2018 — 2022    : Licence Électronique & Informatique — ISPM
        `,
    en: `
          <strong>CAREER THREAD:</strong><br>
          • 2025 — present : Independent consultant / technical architect (ANKA, ResHPro, Study-Agent, Maboo)<br>
          • 2025 — 2026    : Technical architect & mobile lead, Given Day Tech (France, non-profit) — 4 developers<br>
          • 2025 — present : Senior full-stack developer, ToutPourSaGloire.com (international)<br>
          • 2023 — 2024    : CMS developer & UI/UX designer, RICSM (United States, remote) via IKS Antananarivo<br>
          • 2022 (6 months): Full-stack & OCR pipeline internship, EQIMA (Antananarivo)<br>
          • 2020 — 2023    : Part-time teacher in computer science, electronics and applied mathematics<br>
          • 2022 — 2024    : MSc Electronics, Computer Science & AI — ISPM<br>
          • 2018 — 2022    : Bachelor's in Electronics & Computer Science — ISPM
        `
  },
  projects: {
    fr: `
          <strong>SYSTÈMES LIVRÉS :</strong><br>
          1. <strong>ANKA (AFD / Digital Energy Challenge)</strong> — collecte terrain ESG offline-first [45 exigences tracées · PWA React-Dexie · NestJS · 14 j hors-ligne]<br>
          2. <strong>ResHPro</strong> — SaaS multi-tenant hôtellerie, POS & stocks [React 18 · PostgreSQL · RBAC]<br>
          3. <strong>Study-Agent / LMS</strong> — ERP scolaire en production locale [offline-first · Electron · SQLite · Supabase]<br>
          4. <strong>Maboo</strong> — boutique headless, contribution frontend [React 19 · React Router 7 SSR · Zustand] — code client non public<br>
          5. <strong>Given Day Tech</strong> — lead mobile & architecture, équipe de 4 [React Native · Node.js]<br>
          6. <strong>ToutPourSaGloire.com</strong> — plateforme média & moteur Meilisearch [-40% temps de chargement]<br>
          7. <strong>EQIMA</strong> — stage : pipeline OCR & ingestion Sage ERP [-70% temps de traitement]<br>
          <span class="system-msg">Les dépôts clients sont privés pour raisons contractuelles ; les dépôts personnels sont publics.</span>
        `,
    en: `
          <strong>SHIPPED SYSTEMS:</strong><br>
          1. <strong>ANKA (AFD / Digital Energy Challenge)</strong> — offline-first ESG field collection [45 traced requirements · PWA React-Dexie · NestJS · 14 days offline]<br>
          2. <strong>ResHPro</strong> — multi-tenant hospitality, POS & inventory SaaS [React 18 · PostgreSQL · RBAC]<br>
          3. <strong>Study-Agent / LMS</strong> — school ERP in local production [offline-first · Electron · SQLite · Supabase]<br>
          4. <strong>Maboo</strong> — headless storefront, frontend contribution [React 19 · React Router 7 SSR · Zustand] — client code not public<br>
          5. <strong>Given Day Tech</strong> — mobile & architecture lead, team of 4 [React Native · Node.js]<br>
          6. <strong>ToutPourSaGloire.com</strong> — media platform & Meilisearch engine [-40% loading time]<br>
          7. <strong>EQIMA</strong> — internship: OCR pipeline & Sage ERP ingestion [-70% processing time]<br>
          <span class="system-msg">Client repositories are private for contractual reasons; personal repositories are public.</span>
        `
  },
  stack: {
    fr: `
          <strong>COMPÉTENCES PRINCIPALES :</strong><br>
          • Frontend : React 18/19, TypeScript, Next.js, React Native, Tailwind CSS, Vite, Zustand<br>
          • Backend : Node.js, NestJS, Express 5, PostgreSQL, Supabase, SQLite (mode WAL), GraphQL, REST<br>
          • Systèmes & architecture : SaaS multi-tenant, RBAC, offline-first, Electron, Docker, CI/CD, Git, Linux<br>
          • Données & IA : Python, OpenCV, TensorFlow, algorithmique
        `,
    en: `
          <strong>CORE SKILLS:</strong><br>
          • Frontend: React 18/19, TypeScript, Next.js, React Native, Tailwind CSS, Vite, Zustand<br>
          • Backend: Node.js, NestJS, Express 5, PostgreSQL, Supabase, SQLite (WAL mode), GraphQL, REST<br>
          • Systems & architecture: multi-tenant SaaS, RBAC, offline-first, Electron, Docker, CI/CD, Git, Linux<br>
          • Data & AI: Python, OpenCV, TensorFlow, algorithms
        `
  },
  adrs: {
    fr: `
          <strong>ARCHITECTURAL DECISION RECORDS :</strong><br>
          • ADR-001 (adopté, en production) : offline-first SQLite (WAL) + Supabase pour résister aux coupures réseau.<br>
          • ADR-002 (cadré, migration en cours) : isolation multi-tenant par PostgreSQL Row-Level Security vs multi-bases.<br>
          • ADR-003 (déployé) : rendu SSR React Router 7 avec streaming des blocs non critiques pour Maboo.
        `,
    en: `
          <strong>ARCHITECTURAL DECISION RECORDS:</strong><br>
          • ADR-001 (adopted, in production): offline-first SQLite (WAL) + Supabase to withstand network outages.<br>
          • ADR-002 (framed, migration in progress): multi-tenant isolation via PostgreSQL Row-Level Security vs multi-database.<br>
          • ADR-003 (deployed): React Router 7 SSR rendering with streaming of non-critical blocks for Maboo.
        `
  },
  metrics: {
    fr: `
          <strong>CHIFFRES CLÉS & PÉRIMÈTRE :</strong><br>
          • Saisie et édition de bulletins sans aucun appel réseau — Study-Agent, ERP scolaire en production (Lycée Manjary Soa)<br>
          • -40% de temps de chargement — ToutPourSaGloire.com, après Meilisearch + refonte Next.js<br>
          • -70% de temps de traitement comptable — EQIMA, pipeline OCR vers Sage ERP (stage, 2022)<br>
          • 45 exigences tracées (TR-01 → TR-45) — ANKA, matrice de traçabilité du TDR bailleur AFD<br>
          • 4 développeurs encadrés en remote — Given Day Tech<br>
          <span class="system-msg">Mesures relevées en environnement de développement ou sur périmètre constaté, pas des engagements de service.</span>
        `,
    en: `
          <strong>KEY FIGURES & SCOPE:</strong><br>
          • Grade entry and report-card generation with no network call at all — Study-Agent, school ERP in production (Manjary Soa High School)<br>
          • -40% loading time — ToutPourSaGloire.com, after Meilisearch + Next.js overhaul<br>
          • -70% accounting processing time — EQIMA, OCR pipeline into Sage ERP (internship, 2022)<br>
          • 45 traced requirements (TR-01 → TR-45) — ANKA, traceability matrix for the AFD terms of reference<br>
          • 4 developers mentored remotely — Given Day Tech<br>
          <span class="system-msg">Measured in development environments or on an observed scope, not service commitments.</span>
        `
  },
  cv: {
    fr: 'Ouverture du sélecteur de curriculum vitae…',
    en: 'Opening the resume selector…'
  },
  themeOk: {
    fr: 'Accent appliqué : <strong>{theme}</strong>',
    en: 'Accent applied: <strong>{theme}</strong>'
  },
  themeErr: {
    fr: 'Accent inconnu "{arg}". Utilisez : teal, indigo, ochre, moss.',
    en: 'Unknown accent "{arg}". Use: teal, indigo, ochre, moss.'
  },
  langOk: {
    fr: 'Langue du site : <strong>français</strong>.',
    en: 'Site language: <strong>English</strong>.'
  },
  langErr: {
    fr: 'Langue inconnue "{arg}". Utilisez : fr ou en.',
    en: 'Unknown language "{arg}". Use: fr or en.'
  },
  contact: {
    fr: `
          <strong>COORDONNÉES DE CONTACT :</strong><br>
          • Email    : <a href="mailto:manoa.wrk@gmail.com" style="color:var(--accent)">manoa.wrk@gmail.com</a><br>
          • Téléphone: <a href="tel:+261347151789" style="color:var(--accent)">+261 34 71 517 89</a><br>
          • GitHub   : <a href="https://github.com/ManoaRANDRIANARISOA" target="_blank" style="color:var(--accent)">github.com/ManoaRANDRIANARISOA</a><br>
          • LinkedIn : <a href="https://linkedin.com/in/manoa-randrianarisoa" target="_blank" style="color:var(--accent)">linkedin.com/in/manoa-randrianarisoa</a><br>
          • Statut   : disponible immédiatement (remote monde entier ou sur site)
        `,
    en: `
          <strong>CONTACT DETAILS:</strong><br>
          • Email    : <a href="mailto:manoa.wrk@gmail.com" style="color:var(--accent)">manoa.wrk@gmail.com</a><br>
          • Phone    : <a href="tel:+261347151789" style="color:var(--accent)">+261 34 71 517 89</a><br>
          • GitHub   : <a href="https://github.com/ManoaRANDRIANARISOA" target="_blank" style="color:var(--accent)">github.com/ManoaRANDRIANARISOA</a><br>
          • LinkedIn : <a href="https://linkedin.com/in/manoa-randrianarisoa" target="_blank" style="color:var(--accent)">linkedin.com/in/manoa-randrianarisoa</a><br>
          • Status   : immediately available (remote worldwide or on-site)
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
  let trigger = null;

  function openTerminal() {
    if (modal.classList.contains('active')) return;
    trigger = document.activeElement;
    modal.classList.add('active');
    modal.removeAttribute('inert');
    document.dispatchEvent(new CustomEvent('overlay:toggle'));
    inputEl.focus();
    sound.playClick();
  }

  function closeTerminal() {
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
    modal.setAttribute('inert', '');
    document.dispatchEvent(new CustomEvent('overlay:toggle'));
    sound.playClick();
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
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

      case 'journey':
      case 'parcours':
        appendLine(pick('journey'));
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
        document.dispatchEvent(new CustomEvent('cv:open'));
        sound.playClick();
        break;

      case 'theme':
        if (['teal', 'indigo', 'ochre', 'moss'].includes(arg)) {
          setTheme(arg, true);
          appendLine(pick('themeOk', { theme: arg }), 'success');
        } else {
          appendLine(pick('themeErr', { arg: escapeHtml(arg) }), 'error');
          sound.playError();
        }
        break;

      case 'lang':
      case 'language':
        if (['fr', 'en'].includes(arg)) {
          setLang(arg);
          appendLine(pick('langOk'), 'success');
        } else {
          appendLine(pick('langErr', { arg: escapeHtml(arg) }), 'error');
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
