// ==============================================================================
// INTERNATIONALIZATION CONTROLLER (FR / EN)
// Central dictionary + static DOM application + language persistence.
// Dynamic modules (projects, architecture viewer, terminal) read getLang()
// and subscribe via onLangChange() to re-render on switch.
// ==============================================================================

const STRINGS = {
  // ---------------------------------------------------------------- META
  'meta.title': {
    fr: 'Manoa Randrianarisoa — Architecte Technique & Lead Full-Stack',
    en: 'Manoa Randrianarisoa — Technical Architect & Lead Full-Stack'
  },
  'meta.description': {
    fr: "Portfolio d'Architecte Technique & Lead Full-Stack Senior de Manoa Randrianarisoa. Systèmes distribués, Offline-First, SaaS Multi-Tenant (ANKA, ResHPro, Study-Agent, Maboo) et Master IA.",
    en: 'Senior Technical Architect & Lead Full-Stack portfolio of Manoa Randrianarisoa. Distributed systems, Offline-First, Multi-Tenant SaaS (ANKA, ResHPro, Study-Agent, Maboo) and an AI MSc.'
  },
  'meta.ogDescription': {
    fr: "Concevoir des architectures logicielles résilientes, mesurables et centrées sur l'impact métier. Découvrir mes systèmes en production.",
    en: 'Designing resilient, measurable software architectures focused on business impact. Explore my production systems.'
  },

  // ---------------------------------------------------------------- HEADER / NAV
  'header.brandTitle': { fr: 'Manoa Randrianarisoa - Accueil', en: 'Manoa Randrianarisoa - Home' },
  'header.navMain': { fr: 'Navigation principale', en: 'Main navigation' },
  'header.statusTitle': { fr: 'Système opérationnel & disponible', en: 'System operational & available' },
  'header.navArchitecture': { fr: 'Architecture', en: 'Architecture' },
  'header.navProjects': { fr: 'Systèmes & Projets', en: 'Systems & Projects' },
  'header.navAdrs': { fr: 'ADRs', en: 'ADRs' },
  'header.navStack': { fr: 'Matrice Tech', en: 'Tech Matrix' },
  'header.navAbout': { fr: 'Parcours', en: 'Journey' },
  'header.navContact': { fr: 'Contact', en: 'Contact' },
  'header.themeTitle': { fr: 'Sélectionner la palette télémétrique', en: 'Select telemetry palette' },
  'header.themeCyan': { fr: 'Thème Cyan Blueprint', en: 'Cyan Blueprint theme' },
  'header.themeEmerald': { fr: 'Thème Émeraude Terminal', en: 'Emerald Terminal theme' },
  'header.themeAmber': { fr: 'Thème Ambre Signal', en: 'Amber Signal theme' },
  'header.themeViolet': { fr: 'Thème Violet Deep', en: 'Violet Deep theme' },
  'header.soundAria': { fr: "Activer/Désactiver le son d'interface", en: 'Toggle interface sound' },
  'header.soundTitleOn': { fr: 'Son télémétrique : Activé', en: 'Telemetry sound: On' },
  'header.soundTitleOff': { fr: 'Son télémétrique : Muet', en: 'Telemetry sound: Muted' },
  'header.cliTitle': { fr: "Ouvrir la console interactive de l'Architecte (Raccourci: Ctrl+K)", en: "Open the Architect's interactive console (Shortcut: Ctrl+K)" },
  'header.cvTitle': { fr: 'Consulter ou télécharger les CVs', en: 'View or download resumes' },
  'header.mobileMenuAria': { fr: 'Ouvrir le menu mobile', en: 'Open mobile menu' },

  // ---------------------------------------------------------------- MOBILE DRAWER
  'drawer.aria': { fr: 'Menu mobile', en: 'Mobile menu' },
  'drawer.closeAria': { fr: 'Fermer le menu mobile', en: 'Close mobile menu' },
  'drawer.home': { fr: 'Accueil', en: 'Home' },
  'drawer.architecture': { fr: 'Architecture Systèmes', en: 'Systems Architecture' },
  'drawer.projects': { fr: 'Systèmes & Projets', en: 'Systems & Projects' },
  'drawer.adrs': { fr: 'Décisions (ADRs)', en: 'Decisions (ADRs)' },
  'drawer.stack': { fr: 'Matrice Technique', en: 'Technical Matrix' },
  'drawer.about': { fr: 'Parcours & Master IA', en: "Journey & AI Master's" },
  'drawer.contact': { fr: 'Contact', en: 'Contact' },
  'drawer.downloadCv': { fr: 'Télécharger CV PDF', en: 'Download Resume PDF' },

  // ---------------------------------------------------------------- HERO
  'hero.canvasHint': {
    fr: 'CANVAS INTERACTIF : CLIQUEZ POUR ÉMETTRE UNE ONDE TÉLÉMÉTRIQUE',
    en: 'INTERACTIVE CANVAS: CLICK TO EMIT A TELEMETRY WAVE'
  },
  'hero.roleTitle': { fr: 'Architecte Technique & Lead Full-Stack', en: 'Technical Architect & Lead Full-Stack' },
  'hero.roleBadgeAi': { fr: 'Master IA / ISPM', en: "AI MSc / ISPM" },
  'hero.roleBadgeOffline': { fr: 'Offline-First & Cloud', en: 'Offline-First & Cloud' },
  'hero.desc': {
    html: true,
    fr: "Concepteur de <strong>systèmes distribués résilients</strong>, d'architectures SaaS multi-tenant et d'applications critiques opérant en environnement contraint. Du composant d'interface aux pipelines de données synchronisées, je transforme des problématiques complexes en <span class=\"highlight-arch\">socles logiciels performants, sécurisés et pérennes</span>.",
    en: 'Designer of <strong>resilient distributed systems</strong>, multi-tenant SaaS architectures and mission-critical applications operating in constrained environments. From UI components to synchronized data pipelines, I turn complex problems into <span class="highlight-arch">high-performing, secure and lasting software foundations</span>.'
  },
  'hero.btnArch': { fr: "Explorer l'Architecture", en: 'Explore the Architecture' },
  'hero.btnProjects': { fr: 'Consulter les Réalisations', en: 'View the Work' },
  'hero.btnCv': { fr: 'Consulter CV (PDF)', en: 'View Resume (PDF)' },
  'hero.metricUnit2': { fr: 'Latence TTFB', en: 'TTFB Latency' },
  'hero.metricUnit3': { fr: 'Temps Ingestion', en: 'Ingestion Time' },
  'hero.metric1Label': {
    fr: 'Zéro interruption locale sur coupure réseau (Study-Agent)',
    en: 'Zero local downtime on network outage (Study-Agent)'
  },
  'hero.metric2Label': {
    fr: 'Optimisation de rendu SSR & recherche instantanée Meilisearch',
    en: 'SSR rendering tuning & instant Meilisearch lookup'
  },
  'hero.metric3Label': {
    fr: 'Automatisation de bout en bout pipeline OCR & ERP Sage',
    en: 'End-to-end OCR & Sage ERP pipeline automation'
  },
  'hero.metric4Label': {
    fr: 'Système ERP scolaire déployé en production continue',
    en: 'School ERP system running in continuous production'
  },

  // ---------------------------------------------------------------- ARCHITECTURE SECTION
  'arch.meta': { fr: 'TOPOLOGIE & CONCEPTION SYSTÈMES', en: 'SYSTEM TOPOLOGY & DESIGN' },
  'arch.heading': { fr: "L'Approche Architecturale : Résilience & Évolutivité", en: 'The Architectural Approach: Resilience & Scalability' },
  'arch.subheading': {
    fr: 'Chaque système que je conçois repose sur une stricte séparation des responsabilités, une isolation des données (RBAC) et une capacité à opérer en mode dégradé ou hors-ligne sans corruption. Cliquez sur chaque palier pour inspecter les garanties techniques et le code de référence.',
    en: 'Every system I design relies on strict separation of concerns, data isolation (RBAC) and the ability to run degraded or fully offline without data corruption. Click each tier to inspect the technical guarantees and reference code.'
  },
  'arch.pipelineTitle': { fr: 'Pipeline Distribué Unifié', en: 'Unified Distributed Pipeline' },
  'arch.inspectorAria': { fr: 'Inspecteur de nœud architectural', en: 'Architectural node inspector' },
  'arch.presetAll': { fr: 'Vue Globale', en: 'Overview' },
  'arch.presetOffline': { fr: 'Flux Offline-First', en: 'Offline-First Flow' },
  'arch.presetTenant': { fr: 'Isolation RBAC', en: 'RBAC Isolation' },
  'arch.presetSearch': { fr: 'Moteur Recherche', en: 'Search Engine' },

  // ---------------------------------------------------------------- PROJECTS SECTION
  'projects.meta': { fr: 'RÉALISATIONS DE PRODUCTION', en: 'PRODUCTION WORK' },
  'projects.heading': { fr: 'Systèmes Livrés & Études de Cas', en: 'Shipped Systems & Case Studies' },
  'projects.subheading': {
    fr: "Des applications concrètes utilisées au quotidien : suites logicielles SaaS multi-établissements, logiciels d'administration scolaire en production locale, boutiques e-commerce headless et pipelines d'intégration d'entreprise.",
    en: 'Concrete applications used every day: multi-establishment SaaS suites, school administration software in local production, headless e-commerce storefronts and enterprise integration pipelines.'
  },
  'projects.filterAll': { fr: 'Tous les systèmes', en: 'All systems' },
  'projects.filterSaas': { fr: 'SaaS & Cloud', en: 'SaaS & Cloud' },
  'projects.filterDesktop': { fr: 'Desktop & Offline-First', en: 'Desktop & Offline-First' },
  'projects.filterMobile': { fr: 'Mobile & Lead', en: 'Mobile & Lead' },

  // ---------------------------------------------------------------- ADRs SECTION
  'adrs.meta': { fr: 'INGÉNIERIE & ARBITRAGES TECHNIQUES', en: 'ENGINEERING & TECHNICAL TRADE-OFFS' },
  'adrs.heading': { fr: 'Architectural Decision Records (ADRs)', en: 'Architectural Decision Records (ADRs)' },
  'adrs.subheading': {
    fr: "L'architecture technique est avant tout l'art du compromis éclairé. Voici les registres de décisions réelles prises face à des contraintes de terrain (infrastructure instable, scalabilité financière, temps de réponse critique).",
    en: 'Software architecture is first and foremost the art of informed compromise. Here are records of real decisions made under field constraints (unstable infrastructure, financial scalability, critical response time).'
  },
  'adrs.colContext': { fr: 'Contexte & Problème', en: 'Context & Problem' },
  'adrs.colDecision': { fr: "Décision d'Architecture", en: 'Architectural Decision' },
  'adrs.colConsequences': { fr: 'Conséquences & Bénéfices', en: 'Consequences & Benefits' },
  'adrs.colContextShort': { fr: 'Contexte', en: 'Context' },
  'adrs.colDecisionShort': { fr: 'Décision', en: 'Decision' },
  'adrs.colConsequencesShort': { fr: 'Conséquences', en: 'Consequences' },
  'adrs.keyTakeaway': { fr: 'Enseignement Clé :', en: 'Key Takeaway:' },

  'adrs.adr1.title': {
    fr: 'Paradigme Hybride Offline-First (SQLite + Supabase) vs Cloud Monolithique',
    en: 'Hybrid Offline-First Paradigm (SQLite + Supabase) vs Monolithic Cloud'
  },
  'adrs.adr1.status': { fr: 'ADOPTÉ & EN PROD', en: 'ADOPTED & IN PROD' },
  'adrs.adr1.context': {
    fr: "Au sein du Lycée Manjary Soa (Madagascar), les coupures d'électricité et d'accès internet sont fréquentes. Une solution 100% Web Cloud bloquait la saisie des notes et la délibération des conseils de classe.",
    en: "At Lycée Manjary Soa (Madagascar), power and internet outages are frequent. A 100% web-cloud solution blocked grade entry and class-council deliberations."
  },
  'adrs.adr1.decision': {
    fr: "Déploiement d'une application Electron avec base locale SQLite en mode WAL (Write-Ahead Logging). File d'attente de mutations (Delta Ledger) synchronisée de manière asynchrone et idempotente vers Supabase dès retour du réseau.",
    en: 'Deployment of an Electron application with a local SQLite database in WAL (Write-Ahead Logging) mode. A mutation queue (Delta Ledger) synchronized asynchronously and idempotently to Supabase as soon as the network returns.'
  },
  'adrs.adr1.consequences': {
    fr: '100% de disponibilité opérationnelle locale, latence de saisie nulle (< 1ms), génération instantanée des bulletins sans dépendance cloud. Conflits résolus via horodatage vectoriel.',
    en: '100% local operational availability, zero input latency (< 1ms), instant report card generation with no cloud dependency. Conflicts resolved via vector timestamping.'
  },
  'adrs.adr1.takeaway': {
    html: true,
    fr: "<strong>Enseignement Clé :</strong> La résilience logicielle doit s'adapter à la réalité des infrastructures physiques, sans sacrifier la centralisation des données de l'administration.",
    en: '<strong>Key Takeaway:</strong> Software resilience must adapt to the reality of physical infrastructure, without sacrificing centralized data management.'
  },

  'adrs.adr2.title': {
    fr: 'Isolation Logique Multi-Tenant (PostgreSQL Row-Level Security) vs Multi-Bases',
    en: 'Multi-Tenant Logical Isolation (PostgreSQL Row-Level Security) vs Multi-Database'
  },
  'adrs.adr2.status': { fr: 'ADOPTÉ DANS RESHPRO', en: 'ADOPTED IN RESHPRO' },
  'adrs.adr2.context': {
    fr: "Pour la suite SaaS hôtelière ResHPro, chaque établissement hôtelier doit disposer d'une étanchéité absolue de ses réservations, stocks et finances, tout en limitant les coûts d'hébergement au lancement.",
    en: 'For the ResHPro hotel SaaS suite, each establishment requires absolute isolation of its reservations, inventory and finances, while limiting hosting costs at launch.'
  },
  'adrs.adr2.decision': {
    fr: "Adoption d'une architecture mono-base PostgreSQL couplée aux politiques natives de Row-Level Security (RLS) injectant le tenant_id validé par JWT dans le contexte de session de chaque requête.",
    en: 'Adoption of a single-database PostgreSQL architecture coupled with native Row-Level Security (RLS) policies injecting the JWT-validated tenant_id into the session context of every query.'
  },
  'adrs.adr2.consequences': {
    fr: "Coût d'infrastructure divisé par 5 par rapport à un modèle multi-bases, migrations de schémas centralisées et sécurité infalsifiable même en cas d'omission d'une clause WHERE applicative.",
    en: 'Infrastructure cost divided by 5 compared to a multi-database model, centralized schema migrations and tamper-proof security even if an application WHERE clause is omitted.'
  },
  'adrs.adr2.takeaway': {
    html: true,
    fr: '<strong>Enseignement Clé :</strong> Déplacer la sécurité d\'isolation au plus près du moteur de base de données élimine les failles humaines du code applicatif.',
    en: '<strong>Key Takeaway:</strong> Moving isolation security as close as possible to the database engine eliminates human flaws in application code.'
  },

  'adrs.adr3.title': {
    fr: 'Rendu Hybride SSR & Streaming (React Router 7) pour Maboo E-Commerce',
    en: 'Hybrid SSR & Streaming Rendering (React Router 7) for Maboo E-Commerce'
  },
  'adrs.adr3.status': { fr: 'DÉPLOYÉ', en: 'DEPLOYED' },
  'adrs.adr3.context': {
    fr: "L'ancienne version SPA souffrait d'un Time-To-Interactive trop élevé sur mobile et d'un indexage SEO insuffisant sur les catalogues multilingues.",
    en: 'The old SPA version suffered from excessive Time-To-Interactive on mobile and insufficient SEO indexing on multilingual catalogs.'
  },
  'adrs.adr3.decision': {
    fr: 'Refonte avec React Router 7 en mode SSR avec streaming HTTP des blocs non critiques (recommandations produits et avis) après le rendu instantané du shell produit.',
    en: 'Overhaul with React Router 7 in SSR mode with HTTP streaming of non-critical blocks (product recommendations and reviews) after instant rendering of the product shell.'
  },
  'adrs.adr3.consequences': {
    fr: 'Score Core Web Vitals LCP inférieur à 1.2s sur réseau mobile 4G, visibilité SEO optimale pour les bots de recherche, et fluidité de navigation conservée via hydratation progressive.',
    en: 'Core Web Vitals LCP score below 1.2s on 4G mobile networks, optimal SEO visibility for search bots, and preserved navigation fluidity via progressive hydration.'
  },
  'adrs.adr3.takeaway': {
    html: true,
    fr: '<strong>Enseignement Clé :</strong> Le streaming HTML moderne permet d\'allier les bénéfices SEO du serveur à la vivacité de navigation d\'une SPA sans compromis.',
    en: '<strong>Key Takeaway:</strong> Modern HTML streaming combines the SEO benefits of server rendering with the snappy navigation of an SPA without compromise.'
  },

  // ---------------------------------------------------------------- STACK SECTION
  'stack.meta': { fr: 'ARSENAL & ÉCOSYSTÈME', en: 'ARSENAL & ECOSYSTEM' },
  'stack.heading': { fr: 'Matrice des Compétences Techniques', en: 'Technical Skills Matrix' },
  'stack.subheading': {
    fr: "Une maîtrise transversale éprouvée, de la conception bas-niveau d'interfaces aux protocoles d'échanges, en passant par l'IA appliquée et la gouvernance d'équipe.",
    en: 'Proven cross-functional mastery, from low-level UI design to exchange protocols, applied AI and team governance.'
  },
  'stack.card1Title': { fr: 'Frontend & Mobile Core', en: 'Frontend & Mobile Core' },
  'stack.card1Note': {
    fr: 'Composants headless hautement découplés, typage strict de bout en bout et optimisation fine du DOM.',
    en: 'Highly decoupled headless components, end-to-end strict typing and fine-grained DOM optimization.'
  },
  'stack.card2Title': { fr: 'Backend & Données', en: 'Backend & Data' },
  'stack.card2Note': {
    fr: 'Schémas relationnels normalisés, politiques RLS, transactions ACID et mise en cache prédictive.',
    en: 'Normalized relational schemas, RLS policies, ACID transactions and predictive caching.'
  },
  'stack.card3Title': { fr: 'Architecture & Systèmes', en: 'Architecture & Systems' },
  'stack.card3Note': {
    fr: 'Tolérance aux pannes, découplage modulaire et élimination proactive de la dette technique.',
    en: 'Fault tolerance, modular decoupling and proactive technical debt elimination.'
  },
  'stack.card4Title': { fr: 'IA, Vision & Traitement', en: 'AI, Vision & Processing' },
  'stack.card4Note': {
    fr: 'Formation universitaire approfondie en traitement du signal, vision par ordinateur et réseaux neuronaux.',
    en: 'In-depth university training in signal processing, computer vision and neural networks.'
  },
  'stack.card5Title': { fr: 'Gouvernance & Produit', en: 'Governance & Product' },
  'stack.card5Note': {
    fr: 'Capacité à faire le pont entre exigences métier complexes, contraintes budgétaires et excellence technique.',
    en: 'Ability to bridge complex business requirements, budget constraints and technical excellence.'
  },
  'stack.card6Title': { fr: 'Intégration ERP & Métier', en: 'ERP & Business Integration' },
  'stack.card6Note': {
    fr: "Expertise solide sur les flux financiers, traçabilité d'inventaires et conformité réglementaire.",
    en: 'Solid expertise in financial flows, inventory traceability and regulatory compliance.'
  },

  // ---------------------------------------------------------------- ABOUT SECTION
  'about.meta': { fr: 'IDENTITÉ & PARCOURS ACADÉMIQUE', en: 'IDENTITY & ACADEMIC JOURNEY' },
  'about.heading': { fr: "L'Ingénieur Derrière les Systèmes", en: 'The Engineer Behind the Systems' },
  'about.subheading': {
    fr: "Double formation d'élite en Électronique, Informatique & IA à l'ISPM, combinée à une pratique intensive du terrain sur des projets internationaux et locaux.",
    en: 'Elite dual training in Electronics, Computer Science & AI at ISPM, combined with intensive field practice on international and local projects.'
  },
  'about.profileAria': { fr: 'Carte profil de Manoa', en: "Manoa's profile card" },
  'about.photoAlt': { fr: 'Photo de Manoa Randrianarisoa', en: 'Photo of Manoa Randrianarisoa' },
  'about.onlineTitle': { fr: 'Actif et disponible', en: 'Active and available' },
  'about.profileTitle': { fr: 'ARCHITECTE TECHNIQUE & FULL-STACK', en: 'TECHNICAL ARCHITECT & FULL-STACK' },
  'about.metaLocation': { fr: 'Antananarivo, Madagascar (UTC+3)', en: 'Antananarivo, Madagascar (UTC+3)' },
  'about.metaAvailability': { fr: 'Disponible : Missions Remote & CDI', en: 'Available: Remote missions & full-time roles' },
  'about.metaDegree': { fr: 'Master Informatique, Électronique & IA', en: 'MSc Computer Science, Electronics & AI' },
  'about.downloadCv': { fr: 'Télécharger Mon CV', en: 'Download My Resume' },
  'about.philoTitle': { fr: "Philosophie d'Ingénierie", en: 'Engineering Philosophy' },
  'about.philoP1': {
    fr: "« Je ne conçois pas le code comme une finalité, mais comme la charpente rigoureuse d'une promesse métier. Une architecture réussie est celle qui sait s'effacer : elle ne fait pas de bruit, répond en quelques millisecondes, absorbe les pannes sans alerter l'utilisateur et permet à l'équipe de déployer sans crainte. »",
    en: '"I do not design code as an end goal, but as the rigorous framework of a business promise. A successful architecture is one that knows how to step aside: it makes no noise, responds within milliseconds, absorbs failures without alerting the user, and lets the team deploy without fear."'
  },
  'about.philoP2': {
    fr: "Mon passage par le cycle Master en Électronique et IA m'a inculqué le respect viscéral de la ressource matérielle : chaque cycle CPU, chaque octet transmis sur le réseau et chaque index SQL ont un coût mesurable.",
    en: 'My Master\'s cycle in Electronics and AI instilled a visceral respect for hardware resources: every CPU cycle, every byte transmitted over the network and every SQL index has a measurable cost.'
  },

  'about.tl1.year': { fr: '2025 — PRÉSENT', en: '2025 — PRESENT' },
  'about.tl1.role': { fr: 'Consultant Indépendant / Architecte Technique', en: 'Independent Consultant / Technical Architect' },
  'about.tl1.company': { fr: 'Multi-projets Internationaux & Locaux', en: 'International & Local Multi-Projects' },
  'about.tl1.desc': {
    html: true,
    fr: "Conception de bout en bout de la plateforme de collecte terrain <strong>ANKA</strong> (Digital Energy Challenge / AFD — PWA offline-first, matrice de 45 exigences), de la suite SaaS <strong>ResHPro</strong> (React 18 / PostgreSQL multi-tenant), du système ERP scolaire <strong>Study-Agent</strong> (en production v1.2.2 avec modèle Offline-First) et de la boutique <strong>Maboo</strong> (React 19 / SSR streaming).",
    en: 'End-to-end design of the <strong>ANKA</strong> field data collection platform (Digital Energy Challenge / AFD — offline-first PWA, 45-requirement matrix), the <strong>ResHPro</strong> SaaS suite (React 18 / multi-tenant PostgreSQL), the <strong>Study-Agent</strong> school ERP (in production v1.2.2 with an Offline-First model) and the <strong>Maboo</strong> storefront (React 19 / SSR streaming).'
  },
  'about.tl2.year': { fr: '2025 — 2026', en: '2025 — 2026' },
  'about.tl2.role': { fr: 'Architecte Technique & Lead Mobile', en: 'Technical Architect & Mobile Lead' },
  'about.tl2.company': { fr: 'Given Day Tech (France / Associatif)', en: 'Given Day Tech (France / Non-profit)' },
  'about.tl2.desc': {
    html: true,
    fr: "Architecture logicielle mobile-first sous React Native et Node.js. Encadrement et coordination d'une équipe technique de <strong>4 développeurs</strong>, gouvernance agile et livraison dans le cadre d'un projet solidaire.",
    en: 'Mobile-first software architecture with React Native and Node.js. Mentoring and coordination of a <strong>4-developer</strong> engineering team, agile governance and delivery within a solidarity project.'
  },
  'about.tl3.year': { fr: '2025 — PRÉSENT', en: '2025 — PRESENT' },
  'about.tl3.role': { fr: 'Développeur Full-Stack Senior', en: 'Senior Full-Stack Developer' },
  'about.tl3.company': { fr: 'ToutPourSaGloire.com (International)', en: 'ToutPourSaGloire.com (International)' },
  'about.tl3.desc': {
    html: true,
    fr: 'Refonte en architecture modulaire Next.js & GraphQL. Intégration du moteur Meilisearch permettant une réduction de <strong>40% du temps de chargement</strong> sur les catalogues multimédias.',
    en: 'Overhaul into a modular Next.js & GraphQL architecture. Integration of the Meilisearch engine enabling a <strong>40% loading time reduction</strong> on multimedia catalogs.'
  },
  'about.tl4.year': { fr: '2023 — 2024', en: '2023 — 2024' },
  'about.tl4.role': { fr: 'Développeur CMS & Designer UI/UX', en: 'CMS Developer & UI/UX Designer' },
  'about.tl4.company': { fr: 'RICSM (États-Unis / Remote)', en: 'RICSM (United States / Remote)' },
  'about.tl4.desc': {
    fr: "Conception des maquettes sous Figma et livraison d'une plateforme web institutionnelle répondant aux standards américains d'accessibilité.",
    en: 'Designed mockups in Figma and delivered an institutional web platform meeting US accessibility standards.'
  },
  'about.tl5.year': { fr: '2022', en: '2022' },
  'about.tl5.role': { fr: 'Développeur Full-Stack & Pipeline OCR', en: 'Full-Stack Developer & OCR Pipeline' },
  'about.tl5.company': { fr: 'EQIMA (Antananarivo)', en: 'EQIMA (Antananarivo)' },
  'about.tl5.desc': {
    html: true,
    fr: "Digitalisation complète de la saisie comptable via OCR et synchronisation directe avec l'API Sage ERP, générant une réduction de <strong>70% du temps de traitement</strong>.",
    en: 'Complete digitization of accounting entry via OCR and direct synchronization with the Sage ERP API, generating a <strong>70% processing time reduction</strong>.'
  },
  'about.tl6.year': { fr: '2022 — 2024', en: '2022 — 2024' },
  'about.tl6.role': { fr: 'Master en Électronique, Informatique & IA', en: "MSc in Electronics, Computer Science & AI" },
  'about.tl6.company': { fr: 'Institut Supérieur Polytechnique de Madagascar (ISPM)', en: 'Institut Supérieur Polytechnique de Madagascar (ISPM)' },
  'about.tl6.desc': {
    fr: "Conception logicielle avancée, algorithmique, traitement d'images (OpenCV), vision industrielle et modèles de Deep Learning.",
    en: 'Advanced software design, algorithms, image processing (OpenCV), industrial vision and Deep Learning models.'
  },
  'about.tl7.year': { fr: '2018 — 2022', en: '2018 — 2022' },
  'about.tl7.role': { fr: 'Licence en Électronique & Informatique', en: "Bachelor's in Electronics & Computer Science" },
  'about.tl7.company': { fr: 'Institut Supérieur Polytechnique de Madagascar (ISPM)', en: 'Institut Supérieur Polytechnique de Madagascar (ISPM)' },
  'about.tl7.desc': {
    fr: 'Génie logiciel, architectures système, programmation concurrente et réseaux de communication.',
    en: 'Software engineering, system architectures, concurrent programming and communication networks.'
  },

  // ---------------------------------------------------------------- CONTACT SECTION
  'contact.meta': { fr: 'ÉCHANGE & COLLABORATION', en: 'CONNECT & COLLABORATE' },
  'contact.heading': { fr: 'Initialiser une Connexion', en: 'Initialize a Connection' },
  'contact.subheading': {
    fr: "Vous cherchez un Architecte Technique pour cadrer une refonte stratégique, un Lead Full-Stack capable d'emmener une équipe, ou un partenaire d'ingénierie sur un projet exigeant ?",
    en: 'Looking for a Technical Architect to frame a strategic overhaul, a Lead Full-Stack who can drive a team, or an engineering partner on a demanding project?'
  },
  'contact.lead': {
    html: true,
    fr: "Disponible pour des missions <strong>internationales en remote</strong>, du conseil d'architecture ou un rôle exécutif. Je réponds sous 24h avec une analyse concrète de votre besoin.",
    en: 'Available for <strong>international remote missions</strong>, architecture consulting or an executive role. I reply within 24h with a concrete analysis of your needs.'
  },
  'contact.labelEmail': { fr: 'Adresse Email', en: 'Email Address' },
  'contact.labelPhone': { fr: 'Téléphone / WhatsApp', en: 'Phone / WhatsApp' },
  'contact.labelGithub': { fr: 'Profil GitHub', en: 'GitHub Profile' },
  'contact.labelLinkedin': { fr: 'Réseau LinkedIn', en: 'LinkedIn Network' },
  'contact.copy': { fr: 'Copier', en: 'Copy' },
  'contact.open': { fr: 'Ouvrir', en: 'Open' },
  'contact.copyEmailTitle': { fr: "Copier l'email", en: 'Copy email' },
  'contact.copyPhoneTitle': { fr: 'Copier le numéro', en: 'Copy number' },
  'contact.availability': {
    fr: 'DISPONIBLE IMMÉDIATEMENT • REMOTE MONDE ENTIER OU LOCAL',
    en: 'IMMEDIATELY AVAILABLE • REMOTE WORLDWIDE OR ON-SITE'
  },
  'contact.formAria': { fr: 'Formulaire de contact', en: 'Contact form' },
  'contact.labelName': { fr: 'Votre Nom & Organisation', en: 'Your Name & Organization' },
  'contact.phName': { fr: 'Ex: Jean Dupont • CTO chez Acme Corp', en: 'E.g. John Smith • CTO at Acme Corp' },
  'contact.labelEmailForm': { fr: 'Votre Adresse Email', en: 'Your Email Address' },
  'contact.phEmail': { fr: 'nom@entreprise.com', en: 'name@company.com' },
  'contact.labelMessage': { fr: 'Nature du Projet ou Enjeu Technique', en: 'Project Nature or Technical Challenge' },
  'contact.phMessage': {
    fr: "Décrivez votre besoin : refonte d'architecture, cadrage SaaS, mission de lead tech, audit de performance...",
    en: 'Describe your need: architecture overhaul, SaaS framing, lead tech mission, performance audit...'
  },
  'contact.submit': { fr: 'Transmettre la Demande', en: 'Send the Request' },
  'contact.statusOk': {
    fr: '✓ Message enregistré ! Redirection vers votre client mail...',
    en: '✓ Message recorded! Redirecting to your mail client...'
  },

  // ---------------------------------------------------------------- FOOTER
  'footer.brand': { fr: 'MANOA RANDRIANARISOA // ARCHITECTE TECHNIQUE', en: 'MANOA RANDRIANARISOA // TECHNICAL ARCHITECT' },
  'footer.top': { fr: 'Haut de page', en: 'Back to top' },
  'footer.architecture': { fr: 'Architecture', en: 'Architecture' },
  'footer.systems': { fr: 'Systèmes', en: 'Systems' },
  'footer.adrs': { fr: 'ADRs', en: 'ADRs' },
  'footer.rights': {
    fr: '© 2026 MANOA RANDRIANARISOA. CONÇU SANS MODÈLE GÉNÉRIQUE.',
    en: '© 2026 MANOA RANDRIANARISOA. BUILT WITHOUT A GENERIC TEMPLATE.'
  },

  // ---------------------------------------------------------------- TERMINAL (static shell)
  'term.aria': { fr: "Console interactive de l'Architecte", en: "The Architect's interactive console" },
  'term.closeTitle': { fr: 'Fermer la console (Échap)', en: 'Close console (Esc)' },
  'term.shortcuts': { fr: "Tapez 'help' • Échap pour fermer", en: "Type 'help' • Esc to close" },
  'term.banner1': {
    fr: 'SYSTÈME TÉLÉMÉTRIQUE DE MANOA RANDRIANARISOA v2.4.0',
    en: 'MANOA RANDRIANARISOA TELEMETRY SYSTEM v2.4.0'
  },
  'term.banner2': {
    fr: 'Architecte Technique & Lead Full-Stack • Master IA ISPM',
    en: "Technical Architect & Lead Full-Stack • ISPM AI MSc"
  },
  'term.banner3': {
    html: true,
    fr: "Tapez <span class=\"highlight\">help</span> pour afficher l'ensemble des commandes.",
    en: 'Type <span class="highlight">help</span> to display all available commands.'
  },
  'term.placeholder': { fr: 'Ex: help, whoami, projects, stack, adrs, metrics, cv...', en: 'E.g. help, whoami, projects, stack, adrs, metrics, cv...' },

  // ---------------------------------------------------------------- CV MODAL
  'cv.aria': { fr: 'Hub de téléchargement des CVs', en: 'Resume download hub' },
  'cv.heading': { fr: 'Curriculum Vitae — Manoa Randrianarisoa', en: 'Curriculum Vitae — Manoa Randrianarisoa' },
  'cv.subtitle': {
    fr: 'Sélectionnez la version adaptée à vos exigences de recrutement',
    en: 'Select the version suited to your hiring requirements'
  },
  'cv.closeAria': { fr: 'Fermer la fenêtre de CV', en: 'Close resume window' },
  'cv.tag1': { fr: 'Offre Technique & Ingénierie', en: 'Technical & Engineering Offer' },
  'cv.title1': { fr: 'Développeur Full-Stack & Architecte Technique Senior', en: 'Senior Full-Stack Developer & Technical Architect' },
  'cv.desc1': {
    fr: 'Focus systèmes distribués, SaaS multi-tenant, architecture Offline-First, React 19, TypeScript, Express 5, PostgreSQL et Master IA.',
    en: 'Focus on distributed systems, multi-tenant SaaS, Offline-First architecture, React 19, TypeScript, Express 5, PostgreSQL and an AI MSc.'
  },
  'cv.tag2': { fr: 'Offre Produit & Gestion Métier', en: 'Product & Business Management Offer' },
  'cv.title2': { fr: 'Product Owner ERP & Recette SQL', en: 'ERP Product Owner & SQL Validation' },
  'cv.desc2': {
    fr: 'Focus cadrage fonctionnel, modélisation de flux stocks & hôtellerie, validation SQL, conformité comptable et pilotage agile.',
    en: 'Focus on functional framing, hotel & inventory flow modeling, SQL validation, accounting compliance and agile steering.'
  },
  'cv.download': { fr: 'Télécharger PDF', en: 'Download PDF' },
  'cv.open': { fr: 'Ouvrir', en: 'Open' },

  // ---------------------------------------------------------------- SHARED (JS modules)
  'common.copied': { fr: '✓ Copié dans le presse-papier : ', en: '✓ Copied to clipboard: ' },
  'common.copyFallback': { fr: 'Copié : ', en: 'Copied: ' },
  'common.codeGithub': { fr: 'Code GitHub', en: 'GitHub Code' },
  'common.lmsRepo': { fr: 'LMS Repo', en: 'LMS Repo' },
  'common.siteLive': { fr: 'Site Live', en: 'Live Site' },
  'common.githubTitle': { fr: 'Consulter le code source sur GitHub', en: 'View source code on GitHub' },
  'common.lmsTitle': { fr: 'Repository LMS lié', en: 'Linked LMS repository' },
  'common.liveTitle': { fr: 'Visiter le site en ligne', en: 'Visit the live site' }
};

const LANG_KEY = 'site-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'fr';
const listeners = new Set();

export function getLang() {
  return currentLang;
}

export function t(key) {
  const entry = STRINGS[key];
  if (!entry) return key;
  return currentLang === 'en' ? (entry.en ?? entry.fr) : entry.fr;
}

export function onLangChange(fn) {
  listeners.add(fn);
}

export function applyStaticStrings() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const entry = STRINGS[key];
    if (!entry) return;
    if (entry.html) {
      el.innerHTML = t(key);
    } else {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
  });

  document.title = t('meta.title');
  document.documentElement.lang = currentLang;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t('meta.title'));
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', t('meta.ogDescription'));
}

function updateLangButtons() {
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    const label = currentLang === 'fr' ? 'EN' : 'FR';
    btn.textContent = label;
    const title = currentLang === 'fr' ? 'Switch to English' : 'Passer en français';
    btn.setAttribute('title', title);
    btn.setAttribute('aria-label', title);
  });
}

export function setLang(lang) {
  if (lang !== 'fr' && lang !== 'en') return;
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyStaticStrings();
  updateLangButtons();
  listeners.forEach((fn) => fn(lang));
}

export function initI18n() {
  applyStaticStrings();
  updateLangButtons();
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(currentLang === 'fr' ? 'en' : 'fr');
    });
  });
}
