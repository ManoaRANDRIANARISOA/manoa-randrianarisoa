// ==============================================================================
// INTERACTIVE SYSTEM ARCHITECTURE BLUEPRINT CONTROLLER
// Localized content: each user-facing field carries { fr, en } pairs.
// ==============================================================================
import { sound } from './audio-engine.js';
import { getLang, onLangChange } from './i18n.js';

function pick(localized) {
  if (localized && typeof localized === 'object' && ('fr' in localized || 'en' in localized)) {
    return getLang() === 'en' ? (localized.en ?? localized.fr) : localized.fr;
  }
  return localized;
}

const ARCH_NODES_DATA = [
  {
    id: 'edge-client',
    index: '01',
    name: {
      fr: 'Clients & Runtime Multi-Environnement',
      en: 'Multi-Environment Clients & Runtime'
    },
    badge: { fr: 'Desktop & Web & Mobile', en: 'Desktop & Web & Mobile' },
    desc: {
      fr: 'Applications clientes découplées conçues pour fonctionner en environnements contraints, hybrides ou connectés.',
      en: 'Decoupled client applications designed to run in constrained, hybrid or connected environments.'
    },
    latency: '< 1ms',
    protocol: 'IPC / HTTP/2',
    health: { fr: '100% DISPONIBLE', en: '100% AVAILABLE' },
    tech: 'Electron • React 19 • React Native • Tailwind v4',
    guarantees: {
      fr: 'Rendu optimisé sans blocage du thread principal, bundling modulaire et consommation mémoire maîtrisée.',
      en: 'Optimized rendering without blocking the main thread, modular bundling and controlled memory consumption.'
    },
    tradeoff: {
      fr: "Choix d'Electron pour Study-Agent afin de garantir une installation locale autonome sous Windows avec pilote d'impression direct (jsPDF).",
      en: 'Electron chosen for Study-Agent to guarantee a standalone local installation on Windows with a direct print driver (jsPDF).'
    },
    metrics: { 'Memory Base': '~65 MB', 'Cold Start': '< 750ms' },
    codeSnippet: `// Study-Agent (Lycée Manjary Soa) - IPC Bridge
const { ipcRenderer } = require('electron');
export const printReportCard = async (studentId, grades) => {
  return await ipcRenderer.invoke('generate-bulletin-pdf', {
    studentId,
    grades,
    sealVerification: true
  });
};`,
    groundedProject: { fr: 'Study-Agent / LMS & Maboo E-commerce', en: 'Study-Agent / LMS & Maboo E-commerce' }
  },
  {
    id: 'local-persistence',
    index: '02',
    name: {
      fr: 'Persistance Locale & Cache Résilient',
      en: 'Local Persistence & Resilient Cache'
    },
    badge: { fr: 'Offline-First Engine', en: 'Offline-First Engine' },
    desc: {
      fr: 'Moteur de base de données embarqué à latence zéro pour éliminer toute dépendance au réseau en temps réel.',
      en: 'Zero-latency embedded database engine eliminating any real-time network dependency.'
    },
    latency: '0.2 ms',
    protocol: 'SQLite WAL / IndexedDB',
    health: { fr: 'ZERO PERTE', en: 'ZERO LOSS' },
    tech: 'SQLite (WAL Mode) • Better-SQLite3 • IndexedDB',
    guarantees: {
      fr: 'Transactions atomiques ACID locales, journal de modifications (Delta Queue) persistant même après coupure de courant.',
      en: 'Local atomic ACID transactions, mutation journal (Delta Queue) persisting even after a power cut.'
    },
    tradeoff: {
      fr: "Le mode WAL (Write-Ahead Logging) permet des lectures simultanées sans bloquer l'écriture des notes scolaires et mouvements de stocks.",
      en: 'WAL mode (Write-Ahead Logging) allows concurrent reads without blocking writes of school grades and stock movements.'
    },
    metrics: { 'Write Latency': '0.18ms', 'Offline Max': { fr: 'Illimité', en: 'Unlimited' } },
    codeSnippet: `// Offline-First WAL Transaction Engine
db.pragma('journal_mode = WAL');
db.transaction((entries) => {
  for (const entry of entries) {
    db.prepare(\`INSERT INTO local_audit_ledger
      (id, tenant_id, payload, synced) VALUES (?, ?, ?, 0)\`
    ).run(entry.id, entry.tenantId, entry.json);
  }
})();`,
    groundedProject: { fr: 'Study-Agent (Lycée Privé Manjary Soa)', en: 'Study-Agent (Manjary Soa Private School)' }
  },
  {
    id: 'sync-gateway',
    index: '03',
    name: {
      fr: 'Sync Gateway, RBAC & Déduplication',
      en: 'Sync Gateway, RBAC & Deduplication'
    },
    badge: { fr: 'Middleware & Security', en: 'Middleware & Security' },
    desc: {
      fr: "Passerelle d'orchestration assurant le contrôle d'accès granulaire et la réconciliation bidirectionnelle idempotente.",
      en: 'Orchestration gateway ensuring granular access control and idempotent bidirectional reconciliation.'
    },
    latency: '15 - 35 ms',
    protocol: 'REST / GraphQL / WebSockets',
    health: { fr: 'STRICT RBAC', en: 'STRICT RBAC' },
    tech: 'Express 5 • Zod Validation • JWT Claims • Sync Workers',
    guarantees: {
      fr: 'Filtrage strict par rôle (Directeur, Comptable, Enseignant, Réceptionniste), rejet immédiat des requêtes hors-schéma.',
      en: 'Strict role-based filtering (Principal, Accountant, Teacher, Receptionist), immediate rejection of out-of-schema requests.'
    },
    tradeoff: {
      fr: 'Détection de conflits basée sur des horodatages vectoriels (Vector Clocks) et résolution automatique "Last-Write-Wins" sécurisée par audit.',
      en: 'Conflict detection based on vector timestamps (Vector Clocks) and audited "Last-Write-Wins" automatic resolution.'
    },
    metrics: { 'Auth Overhead': '< 3ms', 'Deduplication': '100% Idempotent' },
    codeSnippet: `// Multi-Tenant RBAC Middleware (ResHPro)
export const requireTenantPermission = (perm) => (req, res, next) => {
  const { user, tenant } = req.authClaims;
  if (!user.roles.some(r => r.permissions.includes(perm))) {
    return res.status(403).json({ error: 'PERMISSION_DENIED_RBAC' });
  }
  req.tenantFilter = { tenantId: tenant.id };
  next();
};`,
    groundedProject: { fr: 'ResHPro SaaS & Given Day Tech', en: 'ResHPro SaaS & Given Day Tech' }
  },
  {
    id: 'cloud-primary',
    index: '04',
    name: {
      fr: 'Persistance Cloud & Isolation Multi-Tenant',
      en: 'Cloud Persistence & Multi-Tenant Isolation'
    },
    badge: { fr: 'Distributed Database', en: 'Distributed Database' },
    desc: {
      fr: 'Cluster relationnel hébergeant le schéma unifié avec isolation logique stricte (Row-Level Security) et réplication continue.',
      en: 'Relational cluster hosting the unified schema with strict logical isolation (Row-Level Security) and continuous replication.'
    },
    latency: '28 ms',
    protocol: 'PostgreSQL / Supabase',
    health: { fr: '99.99% DISPONIBLE', en: '99.99% AVAILABLE' },
    tech: 'PostgreSQL 16 • Supabase • Connection Pooling (PgBouncer)',
    guarantees: {
      fr: 'Cloisonnement étanche des locataires (Tenants), transactions financières vérifiables, sauvegardes incrémentales.',
      en: 'Air-tight tenant segregation, verifiable financial transactions, incremental backups.'
    },
    tradeoff: {
      fr: "Choix de l'isolation logique (Single DB, Row-Level Security) vs Multi-DB pour réduire les coûts d'infrastructure par 5 tout en garantissant l'étanchéité.",
      en: 'Logical isolation (Single DB, Row-Level Security) chosen over Multi-DB to cut infrastructure costs by 5 while guaranteeing airtightness.'
    },
    metrics: { 'Tenant Isolation': 'Strict RLS', 'Pooling': 'PgBouncer' },
    codeSnippet: `-- Row-Level Security Policy (ResHPro)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON reservations
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);`,
    groundedProject: { fr: 'ResHPro & Study-Agent Cloud Replica', en: 'ResHPro & Study-Agent Cloud Replica' }
  },
  {
    id: 'search-analytics',
    index: '05',
    name: {
      fr: 'Moteur de Recherche & Analytics Décisionnels',
      en: 'Search Engine & Decision Analytics'
    },
    badge: { fr: 'Fast Indexing & BI', en: 'Fast Indexing & BI' },
    desc: {
      fr: 'Sous-système de recherche instantanée full-text et agrégations temps réel pour les tableaux de bord de gestion et stocks.',
      en: 'Instant full-text search subsystem and real-time aggregations for management and inventory dashboards.'
    },
    latency: '< 8 ms',
    protocol: 'Meilisearch / Recharts OLAP',
    health: { fr: '-40% CHARGEMENT', en: '-40% LOAD TIME' },
    tech: 'Meilisearch • Recharts • Sage API Ingestion • Vector Search',
    guarantees: {
      fr: 'Indexation asynchrone des catalogues et articles, temps de réponse inférieurs à 10ms même sous forte charge.',
      en: 'Asynchronous catalog and item indexing, response times under 10ms even under heavy load.'
    },
    tradeoff: {
      fr: 'Déchargement des requêtes lourdes de recherche de PostgreSQL vers Meilisearch pour préserver les ressources transactionnelles.',
      en: 'Offloading heavy search queries from PostgreSQL to Meilisearch to preserve transactional resources.'
    },
    metrics: { 'Search Response': '6ms', 'Speed Gain': '-40% TTFB' },
    codeSnippet: `// Instant Full-Text Search Integration
const client = new MeiliSearch({ host: MEILI_HOST });
const index = client.index('series_catalog');

export const instantLookup = async (query, filters) => {
  return await index.search(query, {
    filter: filters,
    attributesToHighlight: ['title', 'summary'],
    limit: 20
  });
};`,
    groundedProject: { fr: 'ToutPourSaGloire.com & EQIMA (Sage Ingestion)', en: 'ToutPourSaGloire.com & EQIMA (Sage Ingestion)' }
  }
];

const INSPECTOR_LABELS = {
  tier: { fr: 'PALIER ARCHITECTURAL', en: 'ARCHITECTURAL TIER' },
  stack: { fr: 'Stack & Pratiques Clés', en: 'Stack & Key Practices' },
  guarantee: { fr: 'Garantie & Rationale Système', en: 'System Guarantee & Rationale' },
  tradeoff: { fr: "Arbitrage & Trade-Off d'Architecte", en: "Architect's Trade-Off" },
  impl: { fr: 'Implémentation de Référence', en: 'Reference Implementation' },
  grounded: { fr: 'Projet concret :', en: 'Grounded project:' }
};

export function initArchitectureViewer() {
  const nodesContainer = document.getElementById('pipeline-nodes-list');
  const inspectorEl = document.getElementById('architecture-inspector');
  if (!nodesContainer || !inspectorEl) return;

  let activeIndex = 0;

  function renderNodes() {
    nodesContainer.innerHTML = ARCH_NODES_DATA.map((node, i) => `
      <div class="arch-node ${i === activeIndex ? 'selected' : ''}" data-index="${i}">
        <div class="node-index">${node.index}</div>
        <div class="node-body">
          <div class="node-header-row">
            <span class="node-name">${pick(node.name)}</span>
            <span class="node-badge">${pick(node.badge)}</span>
          </div>
          <p class="node-desc">${pick(node.desc)}</p>
        </div>
        <div class="node-meta">
          <span class="latency-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            ${node.latency}
          </span>
          <span class="protocol-label">${node.protocol}</span>
        </div>
      </div>
    `).join('');

    // Attach click handlers
    nodesContainer.querySelectorAll('.arch-node').forEach(nodeEl => {
      nodeEl.addEventListener('click', () => {
        const idx = parseInt(nodeEl.getAttribute('data-index'), 10);
        selectNode(idx);
      });
    });
  }

  function renderInspector(node) {
    inspectorEl.innerHTML = `
      <div class="inspector-header">
        <div class="inspector-title-wrap">
          <div class="inspector-label">${pick(INSPECTOR_LABELS.tier)} ${node.index}</div>
          <h4 class="inspector-title">${pick(node.name)}</h4>
        </div>
        <span class="node-health-status">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          ${pick(node.health)}
        </span>
      </div>

      <div class="inspector-body">
        <div class="spec-group">
          <span class="spec-label">${pick(INSPECTOR_LABELS.stack)}</span>
          <span class="spec-value">${node.tech}</span>
        </div>

        <div class="metrics-chips-grid">
          ${Object.entries(node.metrics).map(([k, v]) => `
            <div class="chip-card">
              <span class="chip-key">${k}</span>
              <span class="chip-val">${pick(v)}</span>
            </div>
          `).join('')}
        </div>

        <div class="spec-group">
          <span class="spec-label">${pick(INSPECTOR_LABELS.guarantee)}</span>
          <p class="spec-value">${pick(node.guarantees)}</p>
        </div>

        <div class="spec-group">
          <span class="spec-label">${pick(INSPECTOR_LABELS.tradeoff)}</span>
          <p class="spec-value" style="font-size: 0.825rem; color: var(--text-secondary);">${pick(node.tradeoff)}</p>
        </div>

        <div class="spec-group">
          <span class="spec-label">${pick(INSPECTOR_LABELS.impl)}</span>
          <pre class="code-spec-snippet"><code>${escapeHtml(node.codeSnippet)}</code></pre>
        </div>

        <div class="grounded-project-pill">
          <svg class="proj-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          <span>${pick(INSPECTOR_LABELS.grounded)} <strong>${pick(node.groundedProject)}</strong></span>
        </div>
      </div>
    `;
  }

  function selectNode(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    sound.playNodeSelect();

    nodesContainer.querySelectorAll('.arch-node').forEach((el, i) => {
      el.classList.toggle('selected', i === activeIndex);
    });

    renderInspector(ARCH_NODES_DATA[activeIndex]);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Presets selector buttons
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const target = chip.getAttribute('data-preset');
      if (target === 'offline') {
        selectNode(1); // Local Persistence
      } else if (target === 'multi-tenant') {
        selectNode(2); // Sync & RBAC
      } else if (target === 'search') {
        selectNode(4); // Search & Analytics
      }
    });
  });

  onLangChange(() => {
    renderNodes();
    renderInspector(ARCH_NODES_DATA[activeIndex]);
  });

  renderNodes();
  renderInspector(ARCH_NODES_DATA[0]);
}
