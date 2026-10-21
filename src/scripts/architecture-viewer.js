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
      fr: 'Clients & runtime multi-environnement',
      en: 'Multi-environment clients & runtime'
    },
    badge: { fr: 'Desktop · web · mobile', en: 'Desktop · web · mobile' },
    desc: {
      fr: 'Applications clientes découplées conçues pour fonctionner en environnements contraints, hybrides ou connectés.',
      en: 'Decoupled client applications designed to run in constrained, hybrid or connected environments.'
    },
    latency: '< 1 ms',
    protocol: 'IPC / HTTP/2',
    status: { fr: 'En production — Study-Agent', en: 'In production — Study-Agent' },
    tech: 'Electron • React 19 • React Native • Tailwind v4',
    guarantees: {
      fr: 'Rendu optimisé sans blocage du thread principal, bundling modulaire et consommation mémoire maîtrisée.',
      en: 'Optimized rendering without blocking the main thread, modular bundling and controlled memory consumption.'
    },
    tradeoff: {
      fr: "Choix d'Electron pour Study-Agent afin de garantir une installation locale autonome sous Windows avec pilote d'impression direct (jsPDF).",
      en: 'Electron chosen for Study-Agent to guarantee a standalone local installation on Windows with a direct print driver (jsPDF).'
    },
    metrics: [
      {
        key: { fr: 'Mémoire résidente', en: 'Resident memory' },
        value: { fr: '~65 Mo (dev)', en: '~65 MB (dev)' }
      },
      {
        key: { fr: 'Démarrage à froid', en: 'Cold start' },
        value: '~750 ms (dev)'
      }
    ],
    codeSnippet: `// Study-Agent (Lycée Manjary Soa) - bridge IPC exposé au renderer via contextBridge
export const printReportCard = async (studentId, grades) => {
  return await window.api.invoke('generate-bulletin-pdf', {
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
      fr: 'Persistance locale & cache résilient',
      en: 'Local persistence & resilient cache'
    },
    badge: { fr: 'Moteur offline-first', en: 'Offline-first engine' },
    desc: {
      fr: 'Moteur de base de données embarqué : les écritures passent par le disque local, jamais par le réseau.',
      en: 'Embedded database engine: writes go to local disk, never through the network.'
    },
    latency: '< 1 ms',
    protocol: 'SQLite WAL / IndexedDB',
    status: {
      fr: 'En production locale — Lycée Manjary Soa',
      en: 'In local production — Manjary Soa School'
    },
    tech: 'SQLite (WAL Mode) • Better-SQLite3 • IndexedDB',
    guarantees: {
      fr: 'Transactions atomiques ACID locales, journal de modifications (Delta Queue) persistant même après coupure de courant.',
      en: 'Local atomic ACID transactions, mutation journal (Delta Queue) persisting even after a power cut.'
    },
    tradeoff: {
      fr: "Le mode WAL (Write-Ahead Logging) permet des lectures simultanées sans bloquer l'écriture des notes scolaires et mouvements de stocks.",
      en: 'WAL mode (Write-Ahead Logging) allows concurrent reads without blocking writes of school grades and stock movements.'
    },
    metrics: [
      {
        key: { fr: "Latence d'écriture", en: 'Write latency' },
        value: '< 1 ms (dev)'
      },
      {
        key: { fr: 'Autonomie hors-ligne', en: 'Offline endurance' },
        value: { fr: 'Non bornée (disque)', en: 'Unbounded (disk)' }
      }
    ],
    codeSnippet: `// Offline-First WAL Transaction Engine
db.pragma('journal_mode = WAL');
const insertLedgerEntry = db.prepare(\`INSERT INTO local_audit_ledger
  (id, tenant_id, payload, synced) VALUES (?, ?, ?, 0)\`);
db.transaction((entries) => {
  for (const entry of entries) {
    insertLedgerEntry.run(entry.id, entry.tenantId, entry.json);
  }
})(pendingEntries);`,
    groundedProject: { fr: 'Study-Agent (Lycée Privé Manjary Soa)', en: 'Study-Agent (Manjary Soa Private School)' }
  },
  {
    id: 'sync-gateway',
    index: '03',
    name: {
      fr: 'Sync gateway, RBAC & déduplication',
      en: 'Sync gateway, RBAC & deduplication'
    },
    badge: { fr: 'Middleware & sécurité', en: 'Middleware & security' },
    desc: {
      fr: "Passerelle d'orchestration assurant le contrôle d'accès granulaire et la réconciliation bidirectionnelle idempotente.",
      en: 'Orchestration gateway ensuring granular access control and idempotent bidirectional reconciliation.'
    },
    latency: '15 – 35 ms',
    protocol: 'REST / GraphQL / WebSockets',
    status: { fr: 'En production — ResHPro', en: 'In production — ResHPro' },
    tech: 'Express 5 • Zod Validation • JWT Claims • Sync Workers',
    guarantees: {
      fr: 'Filtrage strict par rôle (Directeur, Comptable, Enseignant, Réceptionniste), rejet immédiat des requêtes hors-schéma.',
      en: 'Strict role-based filtering (Principal, Accountant, Teacher, Receptionist), immediate rejection of out-of-schema requests.'
    },
    tradeoff: {
      fr: 'Détection de conflits basée sur des horodatages vectoriels (Vector Clocks) et résolution automatique "Last-Write-Wins" sécurisée par audit.',
      en: 'Conflict detection based on vector timestamps (Vector Clocks) and audited "Last-Write-Wins" automatic resolution.'
    },
    metrics: [
      {
        key: { fr: "Contrôle d'accès", en: 'Access control' },
        value: { fr: 'JWT vérifié en mémoire', en: 'In-memory JWT check' }
      },
      {
        key: { fr: 'Déduplication', en: 'Deduplication' },
        value: { fr: 'Idempotente par conception', en: 'Idempotent by design' }
      }
    ],
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
      fr: 'Persistance cloud & isolation multi-tenant',
      en: 'Cloud persistence & multi-tenant isolation'
    },
    badge: { fr: 'Base distribuée', en: 'Distributed database' },
    desc: {
      fr: 'Cluster relationnel hébergeant le schéma unifié, avec réplication continue et cloisonnement des locataires.',
      en: 'Relational cluster hosting the unified schema, with continuous replication and tenant segregation.'
    },
    latency: '~28 ms',
    protocol: 'PostgreSQL / Supabase',
    status: {
      fr: 'Cible de migration — RLS (ADR-002)',
      en: 'Migration target — RLS (ADR-002)'
    },
    target: true,
    tech: 'PostgreSQL 16 • Supabase • Connection Pooling (PgBouncer)',
    guarantees: {
      fr: "Cloisonnement des locataires, transactions financières vérifiables, sauvegardes incrémentales. L'isolation est aujourd'hui portée par la couche applicative ; le passage à Row-Level Security est prototypé.",
      en: "Tenant segregation, verifiable financial transactions, incremental backups. Isolation is currently enforced at the application layer; the move to Row-Level Security is prototyped."
    },
    tradeoff: {
      fr: "Choix de l'isolation logique (Single DB, Row-Level Security) vs Multi-DB pour diviser les coûts d'infrastructure par ~5 à étanchéité égale.",
      en: 'Logical isolation (Single DB, Row-Level Security) chosen over Multi-DB to cut infrastructure costs by ~5 at equal airtightness.'
    },
    metrics: [
      {
        key: { fr: 'Isolation tenant', en: 'Tenant isolation' },
        value: { fr: 'Applicative → RLS (cible)', en: 'App layer → RLS (target)' }
      },
      {
        key: 'Pooling',
        value: 'PgBouncer (cible / target)'
      }
    ],
    codeSnippet: `-- Row-Level Security Policy (cible ResHPro / repo démo offline-sync-engine)
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
      fr: 'Moteur de recherche & analytics décisionnels',
      en: 'Search engine & decision analytics'
    },
    badge: { fr: 'Indexation & BI', en: 'Indexing & BI' },
    desc: {
      fr: 'Sous-système de recherche instantanée full-text et agrégations temps réel pour les tableaux de bord de gestion et stocks.',
      en: 'Instant full-text search subsystem and real-time aggregations for management and inventory dashboards.'
    },
    latency: '< 8 ms',
    protocol: 'Meilisearch / Recharts OLAP',
    status: {
      fr: 'En production — ToutPourSaGloire.com',
      en: 'In production — ToutPourSaGloire.com'
    },
    tech: 'Meilisearch • Recharts • Sage API Ingestion • Vector Search',
    guarantees: {
      fr: 'Indexation asynchrone des catalogues et articles ; la recherche est servie hors du cluster transactionnel.',
      en: 'Asynchronous catalog and item indexing; search is served off the transactional cluster.'
    },
    tradeoff: {
      fr: 'Déchargement des requêtes lourdes de recherche de PostgreSQL vers Meilisearch pour préserver les ressources transactionnelles.',
      en: 'Offloading heavy search queries from PostgreSQL to Meilisearch to preserve transactional resources.'
    },
    metrics: [
      {
        key: { fr: 'Réponse recherche', en: 'Search response' },
        value: '< 10 ms (dev)'
      },
      {
        key: { fr: 'Gain mesuré', en: 'Measured gain' },
        value: {
          fr: '-40 % temps de chargement (TPSG, observé)',
          en: '-40% loading time (TPSG, observed)'
        }
      }
    ],
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
  tier: { fr: 'Palier architectural', en: 'Architectural tier' },
  status: { fr: 'État :', en: 'State:' },
  stack: { fr: 'Stack & pratiques clés', en: 'Stack & key practices' },
  guarantee: { fr: 'Garantie & rationale système', en: 'System guarantee & rationale' },
  tradeoff: { fr: "Arbitrage d'architecte", en: "Architect's trade-off" },
  impl: { fr: 'Implémentation de référence', en: 'Reference implementation' },
  grounded: { fr: 'Projet concret :', en: 'Grounded project:' }
};

export function initArchitectureViewer() {
  const nodesContainer = document.getElementById('pipeline-nodes-list');
  const inspectorEl = document.getElementById('architecture-inspector');
  if (!nodesContainer || !inspectorEl) return;

  let activeIndex = 0;

  function renderNodes() {
    nodesContainer.innerHTML = ARCH_NODES_DATA.map((node, i) => `
      <button type="button" class="arch-node ${i === activeIndex ? 'selected' : ''}" data-index="${i}" aria-pressed="${i === activeIndex}">
        <span class="node-index">${node.index}</span>
        <span class="node-body">
          <span class="node-header-row">
            <span class="node-name">${pick(node.name)}</span>
            <span class="node-badge">${pick(node.badge)}</span>
          </span>
          <span class="node-desc">${pick(node.desc)}</span>
        </span>
        <span class="node-meta">
          <span class="latency-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            ${node.latency}
          </span>
          <span class="protocol-label">${node.protocol}</span>
        </span>
      </button>
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
          <span class="inspector-label">${pick(INSPECTOR_LABELS.tier)} ${node.index}</span>
          <h3 class="inspector-title">${pick(node.name)}</h3>
        </div>
        <span class="node-state${node.target ? ' is-target' : ''}">
          <span class="state-label">${pick(INSPECTOR_LABELS.status)}</span>
          ${pick(node.status)}
        </span>
      </div>

      <div class="inspector-body">
        <div class="spec-group">
          <span class="spec-label">${pick(INSPECTOR_LABELS.stack)}</span>
          <span class="spec-value">${node.tech}</span>
        </div>

        <div class="metrics-chips-grid">
          ${node.metrics.map((metric) => `
            <div class="chip-card">
              <span class="chip-key">${pick(metric.key)}</span>
              <span class="chip-val">${pick(metric.value)}</span>
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
      el.setAttribute('aria-pressed', String(i === activeIndex));
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
  const PRESET_NODE = { all: 0, offline: 1, 'multi-tenant': 2, search: 4 };

  presetChips.forEach(chip => {
    chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));

    chip.addEventListener('click', () => {
      presetChips.forEach(c => {
        const on = c === chip;
        c.classList.toggle('active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      const preset = chip.getAttribute('data-preset');
      if (preset in PRESET_NODE) selectNode(PRESET_NODE[preset]);
    });
  });

  onLangChange(() => {
    renderNodes();
    renderInspector(ARCH_NODES_DATA[activeIndex]);
  });

  renderNodes();
  renderInspector(ARCH_NODES_DATA[0]);
}
