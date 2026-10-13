// ==============================================================================
// INTERACTIVE SYSTEM ARCHITECTURE BLUEPRINT CONTROLLER
// ==============================================================================
import { sound } from './audio-engine.js';

const ARCH_NODES_DATA = [
  {
    id: 'edge-client',
    index: '01',
    name: 'Clients & Runtime Multi-Environnement',
    badge: 'Desktop & Web & Mobile',
    desc: 'Applications clientes découplées conçues pour fonctionner en environnements contraints, hybrides ou connectés.',
    latency: '< 1ms',
    protocol: 'IPC / HTTP/2',
    health: '100% DISPONIBLE',
    tech: 'Electron • React 19 • React Native • Tailwind v4',
    guarantees: 'Rendu optimisé sans blocage du thread principal, bundling modulaire et consommation mémoire maîtrisée.',
    tradeoff: 'Choix d\'Electron pour Study-Agent afin de garantir une installation locale autonome sous Windows avec pilote d\'impression direct (jsPDF).',
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
    groundedProject: 'Study-Agent / LMS & Maboo E-commerce'
  },
  {
    id: 'local-persistence',
    index: '02',
    name: 'Persistance Locale & Cache Résilient',
    badge: 'Offline-First Engine',
    desc: 'Moteur de base de données embarqué à latence zéro pour éliminer toute dépendance au réseau en temps réel.',
    latency: '0.2 ms',
    protocol: 'SQLite WAL / IndexedDB',
    health: 'ZERO PERTE',
    tech: 'SQLite (WAL Mode) • Better-SQLite3 • IndexedDB',
    guarantees: 'Transactions atomiques ACID locales, journal de modifications (Delta Queue) persistant même après coupure de courant.',
    tradeoff: 'Le mode WAL (Write-Ahead Logging) permet des lectures simultanées sans bloquer l\'écriture des notes scolaires et mouvements de stocks.',
    metrics: { 'Write Latency': '0.18ms', 'Offline Max': 'Illimité' },
    codeSnippet: `// Offline-First WAL Transaction Engine
db.pragma('journal_mode = WAL');
db.transaction((entries) => {
  for (const entry of entries) {
    db.prepare(\`INSERT INTO local_audit_ledger 
      (id, tenant_id, payload, synced) VALUES (?, ?, ?, 0)\`
    ).run(entry.id, entry.tenantId, entry.json);
  }
})();`,
    groundedProject: 'Study-Agent (Lycée Privé Manjary Soa)'
  },
  {
    id: 'sync-gateway',
    index: '03',
    name: 'Sync Gateway, RBAC & Déduplication',
    badge: 'Middleware & Security',
    desc: 'Passerelle d\'orchestration assurant le contrôle d\'accès granulaire et la réconciliation bidirectionnelle idempotente.',
    latency: '15 - 35 ms',
    protocol: 'REST / GraphQL / WebSockets',
    health: 'STRICT RBAC',
    tech: 'Express 5 • Zod Validation • JWT Claims • Sync Workers',
    guarantees: 'Filtrage strict par rôle (Directeur, Comptable, Enseignant, Réceptionniste), rejet immédiat des requêtes hors-schéma.',
    tradeoff: 'Détection de conflits basée sur des horodatages vectoriels (Vector Clocks) et résolution automatique "Last-Write-Wins" sécurisée par audit.',
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
    groundedProject: 'ResHPro SaaS & Given Day Tech'
  },
  {
    id: 'cloud-primary',
    index: '04',
    name: 'Persistance Cloud & Isolation Multi-Tenant',
    badge: 'Distributed Database',
    desc: 'Cluster relationnel hébergeant le schéma unifié avec isolation logique stricte (Row-Level Security) et réplication continue.',
    latency: '28 ms',
    protocol: 'PostgreSQL / Supabase',
    health: '99.99% DISPONIBLE',
    tech: 'PostgreSQL 16 • Supabase • Connection Pooling (PgBouncer)',
    guarantees: 'Cloisonnement étanche des locataires (Tenants), transactions financières vérifiables, sauvegardes incrémentales.',
    tradeoff: 'Choix de l\'isolation logique (Single DB, Row-Level Security) vs Multi-DB pour réduire les coûts d\'infrastructure par 5 tout en garantissant l\'étanchéité.',
    metrics: { 'Tenant Isolation': 'Strict RLS', 'Pooling': 'PgBouncer' },
    codeSnippet: `-- Row-Level Security Policy (ResHPro)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON reservations
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);`,
    groundedProject: 'ResHPro & Study-Agent Cloud Replica'
  },
  {
    id: 'search-analytics',
    index: '05',
    name: 'Moteur de Recherche & Analytics Décisionnels',
    badge: 'Fast Indexing & BI',
    desc: 'Sous-système de recherche instantanée full-text et agrégations temps réel pour les tableaux de bord de gestion et stocks.',
    latency: '< 8 ms',
    protocol: 'Meilisearch / Recharts OLAP',
    health: '-40% CHARGEMENT',
    tech: 'Meilisearch • Recharts • Sage API Ingestion • Vector Search',
    guarantees: 'Indexation asynchrone des catalogues et articles, temps de réponse inférieurs à 10ms même sous forte charge.',
    tradeoff: 'Déchargement des requêtes lourdes de recherche de PostgreSQL vers Meilisearch pour préserver les ressources transactionnelles.',
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
    groundedProject: 'ToutPourSaGloire.com & EQIMA (Sage Ingestion)'
  }
];

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
            <span class="node-name">${node.name}</span>
            <span class="node-badge">${node.badge}</span>
          </div>
          <p class="node-desc">${node.desc}</p>
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
          <div class="inspector-label">PALIER ARCHITECTURAL ${node.index}</div>
          <h4 class="inspector-title">${node.name}</h4>
        </div>
        <span class="node-health-status">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
          ${node.health}
        </span>
      </div>

      <div class="inspector-body">
        <div class="spec-group">
          <span class="spec-label">Stack & Pratiques Clés</span>
          <span class="spec-value">${node.tech}</span>
        </div>

        <div class="metrics-chips-grid">
          ${Object.entries(node.metrics).map(([k, v]) => `
            <div class="chip-card">
              <span class="chip-key">${k}</span>
              <span class="chip-val">${v}</span>
            </div>
          `).join('')}
        </div>

        <div class="spec-group">
          <span class="spec-label">Garantie & Rationale Système</span>
          <p class="spec-value">${node.guarantees}</p>
        </div>

        <div class="spec-group">
          <span class="spec-label">Arbitrage & Trade-Off d'Architecte</span>
          <p class="spec-value" style="font-size: 0.825rem; color: var(--text-secondary);">${node.tradeoff}</p>
        </div>

        <div class="spec-group">
          <span class="spec-label">Implémentation de Référence</span>
          <pre class="code-spec-snippet"><code>${escapeHtml(node.codeSnippet)}</code></pre>
        </div>

        <div class="grounded-project-pill">
          <svg class="proj-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          <span>Projet concret : <strong>${node.groundedProject}</strong></span>
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

  renderNodes();
  renderInspector(ARCH_NODES_DATA[0]);
}
