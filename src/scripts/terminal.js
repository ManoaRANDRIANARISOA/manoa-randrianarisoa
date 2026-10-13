// ==============================================================================
// INTERACTIVE ARCHITECT CONSOLE (TERMINAL CLI)
// ==============================================================================
import { sound } from './audio-engine.js';
import { setTheme } from './theme-manager.js';

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
        appendLine(`
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
        `);
        sound.playClick();
        break;

      case 'whoami':
      case 'bio':
        appendLine(`
          <strong>MANOA RANDRIANARISOA</strong><br>
          Architecte Technique & Développeur Full-Stack Senior<br>
          Master Électronique, Informatique & IA (ISPM Antananarivo - 2024)<br>
          Spécialisé dans la résilience des systèmes (Offline-First), le multi-tenant cloud et les architectures robustes.
        `, 'highlight');
        sound.playClick();
        break;

      case 'projects':
        appendLine(`
          <strong>PROJETS MAJEURS :</strong><br>
          1. <strong>ResHPro</strong> : SaaS Multi-tenant Hôtellerie, POS & Stocks [React 18 / PostgreSQL / RBAC]<br>
          2. <strong>Study-Agent / LMS</strong> : ERP Scolaire v1.2.2 en Production [Offline-First / Electron / SQLite / Supabase]<br>
          3. <strong>Maboo</strong> : E-Commerce Headless & CMS [React 19 / React Router 7 SSR / Zustand]<br>
          4. <strong>Given Day Tech</strong> : Lead Mobile & Archi (Équipe de 4) [React Native / Node.js]<br>
          5. <strong>ToutPourSaGloire.com</strong> : Média & Moteur Meilisearch [-40% temps de chargement]<br>
          6. <strong>EQIMA</strong> : OCR & Ingestion Sage ERP [-70% traitement factures]
        `);
        sound.playClick();
        break;

      case 'stack':
        appendLine(`
          <strong>COMPÉTENCES PRINCIPALES :</strong><br>
          • Frontend : React 18/19, TypeScript, Next.js, React Native, Tailwind CSS, Vite, Zustand<br>
          • Backend : Node.js, Express 5, PostgreSQL, Supabase, SQLite (WAL Mode), GraphQL, REST<br>
          • Systèmes & Archi : SaaS Multi-tenant, RBAC, Electron, Docker, CI/CD, Git, Linux<br>
          • Données & IA : Python, TensorFlow, OpenCV, Algorithmique avancée
        `);
        sound.playClick();
        break;

      case 'adrs':
        appendLine(`
          <strong>ARCHITECTURAL DECISION RECORDS :</strong><br>
          • ADR-001 : Choix Offline-First SQLite (WAL) + Supabase pour résister aux pannes réseau.<br>
          • ADR-002 : Isolation logique multi-tenant (PostgreSQL Row-Level Security) vs multi-instances.<br>
          • ADR-003 : Migration React Router 7 SSR avec streaming de flux pour Maboo.
        `);
        sound.playClick();
        break;

      case 'metrics':
        appendLine(`
          <strong>BENCHMARKS & RÉSULTATS :</strong><br>
          • 100% Disponibilité locale en mode hors-ligne (Study-Agent)<br>
          • -40% Latence globale grâce à Meilisearch & SSR (ToutPourSaGloire / Maboo)<br>
          • -70% Temps de traitement administratif par automatisation OCR & Sage ERP (EQIMA)<br>
          • Équipe de 4 ingénieurs pilotée avec succès (Given Day Tech)
        `, 'success');
        sound.playClick();
        break;

      case 'cv':
        appendLine(`Ouverture du sélecteur de curriculum vitae...`, 'highlight');
        closeTerminal();
        const cvModal = document.getElementById('cv-modal');
        if (cvModal) cvModal.classList.add('active');
        sound.playClick();
        break;

      case 'theme':
        if (['cyan', 'emerald', 'amber', 'violet'].includes(arg)) {
          setTheme(arg, true);
          appendLine(`Thème appliqué : <strong>${arg.toUpperCase()}</strong>`, 'success');
        } else {
          appendLine(`Thème inconnu "${arg}". Utilisez : cyan, emerald, amber, violet.`, 'error');
          sound.playError();
        }
        break;

      case 'contact':
        appendLine(`
          <strong>COORDONNÉES DE CONTACT :</strong><br>
          • Email    : <a href="mailto:manoa.wrk@gmail.com" style="color:var(--accent-primary)">manoa.wrk@gmail.com</a><br>
          • Téléphone: <a href="tel:+261347151789" style="color:var(--accent-primary)">+261 34 71 517 89</a><br>
          • GitHub   : <a href="https://github.com/ManoaRANDRIANARISOA" target="_blank" style="color:var(--accent-primary)">github.com/ManoaRANDRIANARISOA</a><br>
          • LinkedIn : <a href="https://linkedin.com/in/manoa-randrianarisoa" target="_blank" style="color:var(--accent-primary)">linkedin.com/in/manoa-randrianarisoa</a><br>
          • Statut   : Disponible immédiatement (Remote ou Local)
        `);
        sound.playClick();
        break;

      case 'clear':
        bodyEl.innerHTML = '';
        sound.playClick();
        break;

      default:
        appendLine(`Commande inconnue : "${escapeHtml(trimmed)}". Tapez <span class="highlight">help</span> pour voir la liste des commandes.`, 'error');
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
