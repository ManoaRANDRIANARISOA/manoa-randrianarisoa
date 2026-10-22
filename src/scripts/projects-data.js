// ==============================================================================
// AUTHENTIC PROJECTS & CASE STUDIES DATABASE
// Each entry carries an `en` sub-object with localized display fields.
// `plain` is the one-line plain-language summary for non-technical readers,
// `privacy` states honestly why a repository is not public, and `scoped`
// flags a status that is partial or still in flight.
// ==============================================================================

export const PROJECTS_DATA = [
  {
    id: 'anka',
    title: 'ANKA — Collecte terrain ESG',
    type: 'Plateforme PWA offline-first & back-office (Digital Energy Challenge / AFD)',
    category: 'mobile',
    featured: true,
    scoped: true,
    status: 'MVP en cours de livraison (oct.—déc. 2026)',
    summary: 'Digitalisation ESG du suivi de projets d\'électrification rurale à Madagascar pour ANKA : collecte de données terrain hors-ligne (enquêtes socio-économiques, suivi de chantiers, remontée d\'incidents), synchronisation cloud et pilotage par KPI pour le siège.',
    plain: 'Des agents enquêtent sur le terrain, parfois 14 jours sans réseau. L\'application enregistre tout localement, puis renvoie les données au siège dès qu\'une connexion revient — sans perte ni doublon.',
    privacy: 'Projet financé par un bailleur (AFD) : livrables soumis à accord de confidentialité.',
    architecturePoints: [
      'Cadrage du TDR bailleur (AFD) : matrice de traçabilité de 45 exigences (TR-01→TR-45), levée des contradictions et arbitrages MVP formalisés.',
      'Dimensionnement offline-first pour le terrain déconnecté jusqu\'à 14 jours : volumétrie médias 84–252 Mo, double horodatage, objectifs RPO 24 h / RTO 4 h.',
      'Socle full-stack : PWA React / Dexie (IndexedDB) synchronisée à une API NestJS / PostgreSQL avec modèle hybride relationnel + JSONB, RBAC et auth JWT / MFA.',
      'Encadrement d\'un développeur full-time : backlog, planning hebdomadaire, remises traçables (manifests + preuves) et plan de passation documenté.'
    ],
    stack: ['PWA React', 'NestJS', 'Prisma', 'PostgreSQL (JSONB)', 'Dexie.js Offline', 'OpenAPI', 'JWT / MFA', 'Docker'],
    metrics: '45 exigences tracées · 14 j hors-ligne (RPO 24 h / RTO 4 h)',
    githubUrl: null,
    liveUrl: null,
    role: 'Architecte technique & lead projet',
    en: {
      title: 'ANKA — ESG field data collection',
      type: 'Offline-first PWA & back-office platform (Digital Energy Challenge / AFD)',
      status: 'MVP in delivery (Oct–Dec 2026)',
      summary: 'ESG digitalization of rural electrification project tracking in Madagascar for ANKA: offline field data collection (socio-economic surveys, construction site monitoring, incident reporting), cloud synchronization and KPI-driven oversight for headquarters.',
      plain: 'Field agents survey areas that can go 14 days without network. The app records everything locally, then ships the data back to headquarters as soon as a connection returns — with no loss and no duplicates.',
      privacy: 'Funder-backed project (AFD): deliverables under a confidentiality agreement.',
      architecturePoints: [
        "Framed the funder's Terms of Reference (AFD): 45-requirement traceability matrix (TR-01→TR-45), resolved contradictions and formalized MVP trade-offs.",
        'Offline-first sizing for field operations disconnected up to 14 days: 84–252 MB media volume, double timestamping, RPO 24h / RTO 4h targets.',
        'Full-stack foundation: PWA React / Dexie (IndexedDB) synced to a NestJS / PostgreSQL API with hybrid relational + JSONB model, RBAC and JWT / MFA auth.',
        'Mentoring a full-time developer: backlog, weekly planning, traceable delivery packs (manifests + evidence) and a documented handover plan.'
      ],
      metrics: '45 traced requirements · 14 days offline (RPO 24h / RTO 4h)',
      role: 'Technical architect & project lead'
    }
  },
  {
    id: 'reshpro',
    title: 'ResHPro',
    type: 'SaaS multi-tenant cloud & POS',
    category: 'saas',
    featured: true,
    status: 'Actif & en évolution',
    summary: 'Suite SaaS complète d\'hôtellerie, restauration et gestion de stocks multi-établissements avec contrôle d\'accès granulaire et moteur de réservation temps réel.',
    plain: 'Un logiciel unique que plusieurs hôtels et restaurants utilisent en même temps, chacun voyant uniquement ses propres réservations, stocks et comptes.',
    architecturePoints: [
      'Architecture multi-tenant avec isolation stricte des données et modèle RBAC fin.',
      'Moteur de réservation visuel drag & drop sans chevauchement (module RoomCalendar).',
      'Traçabilité unitaire des stocks, déclarations de pertes (PerteDialog) et réapprovisionnements.',
      'Tableaux de bord financiers et analytics décisionnels en temps réel avec Recharts.'
    ],
    stack: ['React 18', 'TypeScript', 'Express 5', 'PostgreSQL', 'RBAC', 'Recharts', 'TailwindCSS', 'Zod'],
    metrics: 'Multi-tenant RBAC · zéro collision de réservation',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA/ResHPro',
    liveUrl: null,
    role: 'Architecte technique & lead full-stack',
    en: {
      title: 'ResHPro',
      type: 'Multi-tenant cloud SaaS & POS',
      status: 'Active & evolving',
      summary: 'Complete multi-establishment hospitality, restaurant and inventory management SaaS suite with granular access control and a real-time reservation engine.',
      plain: 'One piece of software used simultaneously by several hotels and restaurants, where each one only ever sees its own bookings, stock and accounts.',
      architecturePoints: [
        'Multi-tenant architecture with strict data isolation and a fine-grained RBAC model.',
        'Drag & drop visual reservation engine with zero overlap (RoomCalendar module).',
        'Unit-level stock traceability, loss declarations (PerteDialog) and replenishment workflows.',
        'Real-time financial dashboards and decision-grade analytics with Recharts.'
      ],
      metrics: 'Multi-tenant RBAC · zero reservation collision',
      role: 'Technical architect & lead full-stack'
    }
  },
  {
    id: 'study-agent',
    title: 'Study-Agent / LMS',
    type: 'Système scolaire desktop & cloud hybride',
    category: 'desktop',
    featured: true,
    status: 'En production locale (Lycée Manjary Soa)',
    summary: 'Système de gestion scolaire et administrative complet déployé en production dans un établissement d\'enseignement. Conçu selon un paradigme offline-first strict pour résister aux coupures réseau.',
    plain: 'Le lycée saisit les notes, édite les bulletins et suit les paiements même quand internet ou l\'électricité coupent. Tout part dans le cloud dès que la connexion revient.',
    architecturePoints: [
      'Architecture offline-first : cache local SQLite ultra-rapide combiné à une synchronisation cloud Supabase / Postgres dès rétablissement du réseau.',
      'Moteur de génération vectorielle de bulletins scolaires via jsPDF, avec calcul pondéré instantané des moyennes.',
      'Gestion complète : scolarité, inscriptions, suivi des paiements des frais et comptabilité interne.',
      'Volet recrutement et réception des formulaires externalisé vers Make et n8n : webhooks entrants, relances et écritures en base sans exposer le serveur.',
      'Application packagée sous Electron avec interface réactive en React 19 et Tailwind CSS v4.'
    ],
    stack: ['Electron', 'React 19', 'Tailwind v4', 'SQLite (WAL)', 'Supabase / Postgres', 'jsPDF', 'Make', 'n8n', 'TypeScript'],
    metrics: 'Production locale · saisie garantie hors-ligne',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA/study-agent',
    secondaryGithub: 'https://github.com/ManoaRANDRIANARISOA/lms',
    liveUrl: null,
    role: 'Architecte technique & concepteur',
    en: {
      title: 'Study-Agent / LMS',
      type: 'Hybrid desktop & cloud school system',
      status: 'In local production (Manjary Soa High School)',
      summary: 'Complete school and administrative management system deployed in production at a private education institution. Built on a strict offline-first paradigm to withstand network outages.',
      plain: 'The school enters grades, prints report cards and tracks payments even when internet or power drops. Everything reaches the cloud as soon as the connection returns.',
      architecturePoints: [
        'Offline-first architecture: ultra-fast local SQLite cache combined with Supabase / Postgres cloud sync as soon as the network returns.',
        'Vector-based report card generation via jsPDF, with instant weighted grade computation.',
        'Full management coverage: tuition, enrollments, fee payment tracking and internal accounting.',
        'Recruitment and form intake offloaded to Make and n8n: inbound webhooks, reminders and database writes without exposing the server.',
        'Packaged as an Electron application with a reactive React 19 and Tailwind CSS v4 interface.'
      ],
      metrics: 'Local production · offline-safe entry',
      role: 'Technical architect & designer'
    }
  },
  {
    id: 'maboo',
    title: 'Maboo E-Commerce',
    type: 'Refonte frontend SSR — boutique headless (projet client)',
    category: 'saas',
    featured: false,
    scoped: true,
    status: 'Livré (contribution frontend)',
    summary: 'Contribution lead frontend sur la refonte d\'une boutique headless existante : migration React 19 + React Router 7 SSR, catalogue multilingue et paniers B2B. Le CMS backend et le code client complet ne sont pas publics (propriété du client).',
    plain: 'La boutique en ligne s\'affiche plus vite sur mobile et ses pages sont mieux référencées, sans changer le back-office utilisé par les vendeurs.',
    privacy: 'Code propriétaire du client : contribution frontend non publiée.',
    architecturePoints: [
      'Migration vers React Router 7 avec rendu hybride SSR et streaming des données critiques.',
      'Moteur de catalogue dynamique multilingue (i18n) et gestion fine des devis B2B et paniers complexes.',
      'Gestion des expéditions, alertes automatiques de ruptures de stock et interface d\'administration unifiée.',
      'Gestion d\'état découplée et réactive via Zustand.'
    ],
    stack: ['React 19', 'React Router 7 (SSR)', 'Zustand', 'i18n', 'Node.js', 'TailwindCSS'],
    metrics: 'Streaming SSR · TTFB réduit (mesure en environnement de dev)',
    githubUrl: null,
    liveUrl: null,
    role: 'Lead frontend (refonte SSR)',
    en: {
      title: 'Maboo E-Commerce',
      type: 'SSR frontend overhaul — headless storefront (client project)',
      status: 'Delivered (frontend contribution)',
      summary: 'Lead frontend contribution to the overhaul of an existing headless storefront: React 19 + React Router 7 SSR migration, multilingual catalog and B2B carts. The backend CMS and full client code are not public (client property).',
      plain: 'The online store loads faster on mobile and its pages rank better, without changing the back office the sales team already uses.',
      privacy: 'Client-owned code: the frontend contribution is not published.',
      architecturePoints: [
        'Migration to React Router 7 with hybrid SSR rendering and streaming of critical data.',
        'Dynamic multilingual catalog engine (i18n) and fine-grained B2B quote and complex cart management.',
        'Shipping management, automatic stock-out alerts and a unified administration interface.',
        'Decoupled reactive state management via Zustand.'
      ],
      metrics: 'SSR streaming · reduced TTFB (measured in dev)',
      role: 'Lead frontend (SSR overhaul)'
    }
  },
  {
    id: 'given-day-tech',
    title: 'Given Day Tech',
    type: 'Application mobile solidaire',
    category: 'mobile',
    featured: false,
    status: 'Mission livrée (France / remote)',
    summary: 'Pilotage de l\'architecture technique et coordination d\'une équipe de 4 développeurs pour concevoir une application mobile solidaire moderne et résiliente.',
    plain: 'J\'ai cadré le produit, réparti le travail et relu le code de 4 développeurs à distance jusqu\'à la livraison.',
    privacy: 'Code privé appartenant à l\'association.',
    architecturePoints: [
      'Conception de l\'architecture logicielle mobile-first sous React Native avec backend Node.js et PostgreSQL.',
      'Cadrage fonctionnel, priorisation des livrables selon les principes Agile Scrum et revues de code systématiques.',
      'Gestion du budget technique, modélisation des schémas de données relationnelles et stratégie de tests.'
    ],
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Docker', 'Agile / Scrum', 'CI/CD'],
    metrics: 'Équipe de 4 ingénieurs · cadrage de bout en bout',
    githubUrl: null,
    liveUrl: null,
    role: 'Architecte technique & lead mobile',
    en: {
      title: 'Given Day Tech',
      type: 'Solidarity mobile application',
      status: 'Mission delivered (France / remote)',
      summary: 'Led the technical architecture and coordinated a team of 4 developers to design a modern, resilient solidarity mobile application.',
      plain: 'I framed the product, split the work and reviewed the code of 4 remote developers through to delivery.',
      privacy: 'Private code owned by the non-profit.',
      architecturePoints: [
        'Mobile-first software architecture with React Native and a Node.js / PostgreSQL backend.',
        'Functional framing, deliverable prioritization following Agile Scrum principles and systematic code reviews.',
        'Technical budget management, relational data schema modeling and testing strategy.'
      ],
      metrics: 'Team of 4 engineers · end-to-end framing',
      role: 'Technical architect & mobile lead'
    }
  },
  {
    id: 'toutpoursagloire',
    title: 'ToutPourSaGloire.com',
    type: 'Plateforme média & moteur de recherche',
    category: 'saas',
    featured: false,
    status: 'En production (international)',
    summary: 'Refonte de modules critiques sur une plateforme média à fort trafic. Migration vers une architecture moderne React / Next.js avec moteur de recherche instantané.',
    plain: 'Sur un site à fort trafic, j\'ai refondu la section « Séries » et rendu la recherche instantanée : les pages s\'affichent 40 % plus vite.',
    privacy: 'Code propriété de l\'éditeur ; le site est public.',
    architecturePoints: [
      'Refonte complète de la section « Séries » en architecture modulaire Next.js découplée.',
      'Intégration d\'API GraphQL et optimisation globale des cascades de requêtes.',
      'Infrastructure de recherche instantanée avec Meilisearch, réduisant le temps de chargement de 40 %.'
    ],
    stack: ['React', 'Next.js', 'GraphQL', 'Meilisearch', 'TypeScript', 'Node.js'],
    metrics: '-40 % de temps de chargement · recherche instantanée',
    githubUrl: null,
    liveUrl: 'https://toutpoursagloire.com',
    role: 'Développeur full-stack senior',
    en: {
      title: 'ToutPourSaGloire.com',
      type: 'Media platform & search engine',
      status: 'In production (international)',
      summary: 'Refactored critical modules of a high-traffic media platform. Migration to a modern React / Next.js architecture with instant search.',
      plain: 'On a high-traffic site I rebuilt the “Series” section and made search instant: pages now load 40% faster.',
      privacy: 'Publisher-owned code; the live site is public.',
      architecturePoints: [
        'Complete overhaul of the “Series” section into a decoupled modular Next.js architecture.',
        'GraphQL API integration and global query waterfall optimization.',
        'Instant search infrastructure with Meilisearch, reducing loading time by 40%.'
      ],
      metrics: '-40% loading time · instant search',
      role: 'Senior full-stack developer'
    }
  },
  {
    id: 'eqima',
    title: 'EQIMA — Dématérialisation comptable',
    type: 'Stage — pipeline OCR & ingestion ERP Sage',
    category: 'desktop',
    featured: false,
    status: 'Stage livré (mai—oct. 2022)',
    summary: 'Automatisation de la chaîne de traitement comptable via un pipeline OCR intelligent couplé à l\'API officielle de l\'ERP Sage.',
    plain: 'Les factures sont photographiées, lues automatiquement puis enregistrées dans le logiciel comptable : plus de ressaisie à la main.',
    privacy: 'Stage : pipeline interne à EQIMA, non publié.',
    architecturePoints: [
      'Pipeline de détection et reconnaissance optique de caractères (OCR) pour extraire les données clés des pièces justificatives.',
      'Interfaçage bidirectionnel avec l\'API Sage pour l\'enregistrement automatisé des écritures.',
      'Réduction de 70 % du temps de traitement administratif des équipes comptables.'
    ],
    stack: ['Python', 'OpenCV / OCR', 'TensorFlow.js', 'Angular', 'Node.js', 'Firebase', 'API Sage ERP', 'PostgreSQL'],
    metrics: '-70 % de temps de traitement · zéro saisie manuelle',
    githubUrl: null,
    liveUrl: null,
    role: 'Stagiaire ingénieur full-stack & OCR',
    en: {
      title: 'EQIMA — Accounting dematerialization',
      type: 'Internship — OCR pipeline & Sage ERP ingestion',
      status: 'Internship delivered (May–Oct 2022)',
      summary: 'Automation of the accounting processing chain through an intelligent OCR pipeline coupled with the official Sage ERP API.',
      plain: 'Invoices are photographed, read automatically, then posted into the accounting software: no more manual re-entry.',
      privacy: 'Internship: EQIMA internal pipeline, not published.',
      architecturePoints: [
        'Optical character recognition (OCR) detection and recognition pipeline to extract key data from supporting documents.',
        'Bidirectional interfacing with the Sage API for automated journal entry recording.',
        '70% reduction in administrative processing time for accounting teams.'
      ],
      metrics: '-70% processing time · zero manual entry',
      role: 'Full-stack & OCR engineering intern'
    }
  }
];
