// ==============================================================================
// AUTHENTIC PROJECTS & CASE STUDIES DATABASE
// Each entry carries an `en` sub-object with localized display fields.
// ==============================================================================

export const PROJECTS_DATA = [
  {
    id: 'anka',
    title: 'ANKA — Collecte Terrain ESG',
    type: 'Plateforme PWA Offline-First & Back-Office (Digital Energy Challenge / AFD)',
    category: 'mobile',
    featured: true,
    status: 'MVP en Delivery (Oct.–Déc. 2026)',
    summary: 'Digitalisation ESG du suivi de projets d\'électrification rurale à Madagascar pour ANKA : collecte de données terrain hors-ligne (enquêtes socio-économiques, suivi de chantiers, remontée d\'incidents), synchronisation cloud et pilotage par KPI pour le siège.',
    architecturePoints: [
      'Cadrage du TDR bailleur (AFD) : matrice de traçabilité de 45 exigences (TR-01→TR-45), levée des contradictions et arbitrages MVP formalisés.',
      'Dimensionnement offline-first pour le terrain déconnecté jusqu\'à 14 jours : volumétrie médias 84–252 Mo, double horodatage, objectifs RPO 24 h / RTO 4 h.',
      'Socle full-stack : PWA React / Dexie (IndexedDB) synchronisée à une API NestJS / PostgreSQL avec modèle hybride relationnel + JSONB, RBAC et auth JWT / MFA.',
      'Encadrement d\'un développeur full-time : backlog, planning hebdomadaire, remises traçables (manifests + preuves) et plan de passation documenté.'
    ],
    stack: ['PWA React', 'NestJS', 'Prisma', 'PostgreSQL (JSONB)', 'Dexie.js Offline', 'OpenAPI', 'JWT / MFA', 'Docker'],
    metrics: '45 Exigences Tracées • 14 J Offline (RPO 24 h / RTO 4 h)',
    githubUrl: null,
    liveUrl: null,
    role: 'Architecte Technique & Lead Projet',
    en: {
      title: 'ANKA — ESG Field Data Collection',
      type: 'Offline-First PWA & Back-Office Platform (Digital Energy Challenge / AFD)',
      status: 'MVP in Delivery (Oct–Dec 2026)',
      summary: 'ESG digitalization of rural electrification project tracking in Madagascar for ANKA: offline field data collection (socio-economic surveys, construction site monitoring, incident reporting), cloud synchronization and KPI-driven oversight for headquarters.',
      architecturePoints: [
        "Framed the funder's Terms of Reference (AFD): 45-requirement traceability matrix (TR-01→TR-45), resolved contradictions and formalized MVP trade-offs.",
        'Offline-first sizing for field operations disconnected up to 14 days: 84–252 MB media volume, double timestamping, RPO 24h / RTO 4h targets.',
        'Full-stack foundation: PWA React / Dexie (IndexedDB) synced to a NestJS / PostgreSQL API with hybrid relational + JSONB model, RBAC and JWT / MFA auth.',
        'Mentoring a full-time developer: backlog, weekly planning, traceable delivery packs (manifests + evidence) and a documented handover plan.'
      ],
      metrics: '45 Traced Requirements • 14 Days Offline (RPO 24h / RTO 4h)',
      role: 'Technical Architect & Project Lead'
    }
  },
  {
    id: 'reshpro',
    title: 'ResHPro',
    type: 'SaaS Multi-Tenant Cloud & POS',
    category: 'saas',
    featured: true,
    status: 'Actif & En Évolution',
    summary: 'Suite SaaS complète d\'hôtellerie, restauration et gestion de stocks multi-établissements avec contrôle d\'accès granulaire et moteur de réservation temps réel.',
    architecturePoints: [
      'Architecture multi-tenant avec isolation stricte des données et modèle RBAC fin.',
      'Moteur de réservation visuel drag & drop sans chevauchement (Module RoomCalendar).',
      'Traçabilité unitaire des stocks, déclarations de pertes (PerteDialog) et réapprovisionnements.',
      'Tableaux de bord financiers et analytics décisionnels en temps réel avec Recharts.'
    ],
    stack: ['React 18', 'TypeScript', 'Express 5', 'PostgreSQL', 'RBAC', 'Recharts', 'TailwindCSS', 'Zod'],
    metrics: 'Multi-Tenant RBAC • Zero Collision Réservation',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA/ResHPro',
    liveUrl: null,
    role: 'Architecte Technique & Lead Full-Stack',
    en: {
      title: 'ResHPro',
      type: 'Multi-Tenant Cloud SaaS & POS',
      status: 'Active & Evolving',
      summary: 'Complete multi-establishment hospitality, restaurant and inventory management SaaS suite with granular access control and a real-time reservation engine.',
      architecturePoints: [
        'Multi-tenant architecture with strict data isolation and a fine-grained RBAC model.',
        'Drag & drop visual reservation engine with zero overlap (RoomCalendar module).',
        'Unit-level stock traceability, loss declarations (PerteDialog) and replenishment workflows.',
        'Real-time financial dashboards and decision-grade analytics with Recharts.'
      ],
      metrics: 'Multi-Tenant RBAC • Zero Reservation Collision',
      role: 'Technical Architect & Lead Full-Stack'
    }
  },
  {
    id: 'study-agent',
    title: 'Study-Agent / LMS',
    type: 'Système Scolaire Desktop & Cloud Hybride',
    category: 'desktop',
    featured: true,
    status: 'En Production v1.2.2 (Lycée Manjary Soa)',
    summary: 'Système de gestion scolaire et administrative complet déployé en production dans un établissement d\'enseignement. Conçu selon un paradigme Offline-First strict pour résister aux coupures réseau.',
    architecturePoints: [
      'Architecture Offline-First : cache local ultra-rapide SQLite combiné à une synchronisation cloud Supabase / Postgres dès rétablissement du réseau.',
      'Moteur de génération vectorielle de bulletins scolaires certifiés via jsPDF, avec calcul pondéré instantané des moyennes.',
      'Gestion complète : scolarité, inscriptions, suivi des paiements des frais et comptabilité interne.',
      'Application packagée sous Electron avec interface réactive en React 19 et Tailwind CSS v4.'
    ],
    stack: ['Electron', 'React 19', 'Tailwind v4', 'SQLite (WAL)', 'Supabase / Postgres', 'jsPDF', 'TypeScript'],
    metrics: 'Production v1.2.2 • 100% Uptime Hors-Ligne',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA/study-agent',
    secondaryGithub: 'https://github.com/ManoaRANDRIANARISOA/lms',
    liveUrl: null,
    role: 'Architecte Technique & Concepteur',
    en: {
      title: 'Study-Agent / LMS',
      type: 'Hybrid Desktop & Cloud School System',
      status: 'In Production v1.2.2 (Lycée Manjary Soa)',
      summary: 'Complete school and administrative management system deployed in production at a private education institution. Built on a strict Offline-First paradigm to withstand network outages.',
      architecturePoints: [
        'Offline-First architecture: ultra-fast local SQLite cache combined with Supabase / Postgres cloud sync as soon as the network returns.',
        'Vector-based certified report card generation via jsPDF, with instant weighted grade computation.',
        'Full management coverage: tuition, enrollments, fee payment tracking and internal accounting.',
        'Packaged as an Electron application with a reactive React 19 and Tailwind CSS v4 interface.'
      ],
      metrics: 'Production v1.2.2 • 100% Offline Uptime',
      role: 'Technical Architect & Designer'
    }
  },
  {
    id: 'maboo',
    title: 'Maboo E-Commerce & CMS',
    type: 'Boutique Headless & CMS Hybride',
    category: 'saas',
    featured: false,
    status: 'Livré & Déployé',
    summary: 'Conception d\'un CMS sur mesure et boutique en ligne headless sous React 19 et React Router 7 SSR, optimisée pour le référencement international et les performances d\'affichage instantanées.',
    architecturePoints: [
      'Migration vers React Router 7 avec rendu hybride SSR et streaming des données critiques.',
      'Moteur de catalogue dynamique multilingue (i18n) et gestion fine des devis B2B et paniers complexes.',
      'Gestion des expéditions, alertes automatiques de ruptures de stock et interface d\'administration unifiée.',
      'Gestion d\'état hautement découplée et réactive via Zustand.'
    ],
    stack: ['React 19', 'React Router 7 (SSR)', 'Zustand', 'i18n', 'Node.js', 'TailwindCSS'],
    metrics: 'Streaming SSR • TTFB Ultra-faible',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA/maboo_fe_overhaul',
    liveUrl: null,
    role: 'Architecte & Lead Frontend',
    en: {
      title: 'Maboo E-Commerce & CMS',
      type: 'Headless Storefront & Hybrid CMS',
      status: 'Delivered & Deployed',
      summary: 'Custom CMS and headless online store built with React 19 and React Router 7 SSR, optimized for international SEO and instant display performance.',
      architecturePoints: [
        'Migration to React Router 7 with hybrid SSR rendering and streaming of critical data.',
        'Dynamic multilingual catalog engine (i18n) and fine-grained B2B quote and complex cart management.',
        'Shipping management, automatic stock-out alerts and a unified administration interface.',
        'Highly decoupled reactive state management via Zustand.'
      ],
      metrics: 'SSR Streaming • Ultra-low TTFB',
      role: 'Architect & Lead Frontend'
    }
  },
  {
    id: 'given-day-tech',
    title: 'Given Day Tech',
    type: 'Application Mobile Solidaire',
    category: 'mobile',
    featured: false,
    status: 'Mission Réussie (France / Remote)',
    summary: 'Pilotage de l\'architecture technique et coordination d\'une équipe de 4 développeurs pour concevoir une application mobile solidaire moderne et résiliente.',
    architecturePoints: [
      'Conception de l\'architecture logicielle mobile-first sous React Native avec backend Node.js et PostgreSQL.',
      'Cadrage fonctionnel, priorisation des livrables selon les principes Agile Scrum et revues de code systématiques.',
      'Gestion du budget technique, modélisation des schémas de données relationnelles et stratégie de tests.'
    ],
    stack: ['React Native', 'Node.js', 'PostgreSQL', 'Docker', 'Agile / Scrum', 'CI/CD'],
    metrics: 'Équipe de 4 Ingénieurs • Cadrage de bout en bout',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA',
    liveUrl: null,
    role: 'Architecte Technique & Lead Mobile',
    en: {
      title: 'Given Day Tech',
      type: 'Solidarity Mobile Application',
      status: 'Mission Accomplished (France / Remote)',
      summary: 'Led the technical architecture and coordinated a team of 4 developers to design a modern, resilient solidarity mobile application.',
      architecturePoints: [
        'Mobile-first software architecture with React Native and a Node.js / PostgreSQL backend.',
        'Functional framing, deliverable prioritization following Agile Scrum principles and systematic code reviews.',
        'Technical budget management, relational data schema modeling and testing strategy.'
      ],
      metrics: 'Team of 4 Engineers • End-to-End Framing',
      role: 'Technical Architect & Mobile Lead'
    }
  },
  {
    id: 'toutpoursagloire',
    title: 'ToutPourSaGloire.com',
    type: 'Plateforme Média & Moteur de Recherche',
    category: 'saas',
    featured: false,
    status: 'En Production Internationale',
    summary: 'Refonte de modules critiques sur une plateforme média à fort trafic. Migration vers une architecture moderne React / Next.js avec moteur de recherche instantané.',
    architecturePoints: [
      'Refonte complète de la section "Séries" en architecture modulaire Next.js découplée.',
      'Intégration d\'API GraphQL et optimisation globale des cascades de requêtes.',
      'Infrastructure de recherche instantanée avec Meilisearch, réduisant le temps de chargement de 40%.'
    ],
    stack: ['React', 'Next.js', 'GraphQL', 'Meilisearch', 'TypeScript', 'Node.js'],
    metrics: '-40% Temps de Chargement • Recherche Instantanée',
    githubUrl: 'https://toutpoursagloire.com',
    liveUrl: 'https://toutpoursagloire.com',
    role: 'Développeur Full-Stack Senior',
    en: {
      title: 'ToutPourSaGloire.com',
      type: 'Media Platform & Search Engine',
      status: 'In International Production',
      summary: 'Refactored critical modules of a high-traffic media platform. Migration to a modern React / Next.js architecture with instant search.',
      architecturePoints: [
        'Complete overhaul of the "Series" section into a decoupled modular Next.js architecture.',
        'GraphQL API integration and global query waterfall optimization.',
        'Instant search infrastructure with Meilisearch, reducing loading time by 40%.'
      ],
      metrics: '-40% Loading Time • Instant Search',
      role: 'Senior Full-Stack Developer'
    }
  },
  {
    id: 'eqima',
    title: 'EQIMA — Dématérialisation Comptable',
    type: 'Pipeline OCR & Ingestion ERP Sage',
    category: 'desktop',
    featured: false,
    status: 'Projet d\'Entreprise Livré',
    summary: 'Automatisation de la chaîne de traitement comptable via un pipeline OCR intelligent couplé à l\'API officielle de l\'ERP Sage.',
    architecturePoints: [
      'Pipeline de détection et reconnaissance optique de caractères (OCR) pour extraire les données clés des pièces justificatives.',
      'Interfaçage bidirectionnel avec l\'API Sage pour l\'enregistrement automatisé des écritures.',
      'Réduction de 70% du temps de traitement administratif des équipes comptables.'
    ],
    stack: ['Python', 'OpenCV / OCR', 'API Sage ERP', 'Node.js', 'PostgreSQL'],
    metrics: '-70% Temps de Traitement • Zéro Saisie Manuelle',
    githubUrl: 'https://github.com/ManoaRANDRIANARISOA',
    liveUrl: null,
    role: 'Ingénieur Full-Stack & OCR',
    en: {
      title: 'EQIMA — Accounting Dematerialization',
      type: 'OCR Pipeline & Sage ERP Ingestion',
      status: 'Enterprise Project Delivered',
      summary: 'Automation of the accounting processing chain through an intelligent OCR pipeline coupled with the official Sage ERP API.',
      architecturePoints: [
        'Optical character recognition (OCR) detection and recognition pipeline to extract key data from supporting documents.',
        'Bidirectional interfacing with the Sage API for automated journal entry recording.',
        '70% reduction in administrative processing time for accounting teams.'
      ],
      metrics: '-70% Processing Time • Zero Manual Entry',
      role: 'Full-Stack Engineer & OCR'
    }
  }
];
