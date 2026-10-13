// ==============================================================================
// AUTHENTIC PROJECTS & CASE STUDIES DATABASE
// ==============================================================================

export const PROJECTS_DATA = [
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
    role: 'Architecte Technique & Lead Full-Stack'
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
    role: 'Architecte Technique & Concepteur'
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
    role: 'Architecte & Lead Frontend'
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
    role: 'Architecte Technique & Lead Mobile'
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
    role: 'Développeur Full-Stack Senior'
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
    role: 'Ingénieur Full-Stack & OCR'
  }
];
