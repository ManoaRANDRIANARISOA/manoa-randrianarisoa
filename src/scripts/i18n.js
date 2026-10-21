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
  'header.brandTitle': { fr: 'Manoa Randrianarisoa — Accueil', en: 'Manoa Randrianarisoa — Home' },
  'header.brandSub': { fr: 'Architecte technique & lead full-stack', en: 'Technical architect & lead full-stack' },
  'header.navMain': { fr: 'Navigation principale', en: 'Main navigation' },
  'header.navArchitecture': { fr: 'Architecture', en: 'Architecture' },
  'header.navProjects': { fr: 'Réalisations', en: 'Work' },
  'header.navAdrs': { fr: 'Décisions', en: 'Decisions' },
  'header.navStack': { fr: 'Stack', en: 'Stack' },
  'header.navAbout': { fr: 'Parcours', en: 'Journey' },
  'header.navContact': { fr: 'Contact', en: 'Contact' },
  'header.themeTitle': { fr: "Choisir la couleur d'accent", en: 'Choose the accent colour' },
  'header.themeTeal': { fr: 'Accent sarcelle', en: 'Teal accent' },
  'header.themeIndigo': { fr: 'Accent indigo', en: 'Indigo accent' },
  'header.themeOchre': { fr: 'Accent ocre', en: 'Ochre accent' },
  'header.themeMoss': { fr: 'Accent mousse', en: 'Moss accent' },
  'header.soundAria': { fr: "Activer/désactiver le son d'interface", en: 'Toggle interface sound' },
  'header.soundTitleOn': { fr: "Son d'interface : activé", en: 'Interface sound: on' },
  'header.soundTitleOff': { fr: "Son d'interface : muet", en: 'Interface sound: muted' },
  'header.cliTitle': { fr: 'Ouvrir la console interactive (Ctrl+K)', en: 'Open the interactive console (Ctrl+K)' },
  'header.cvTitle': { fr: 'Consulter ou télécharger les CV', en: 'View or download the resumes' },
  'header.cvBtn': { fr: 'CV', en: 'CV' },
  'header.mobileMenuAria': { fr: 'Ouvrir le menu mobile', en: 'Open mobile menu' },

  // ---------------------------------------------------------------- MOBILE DRAWER
  'drawer.aria': { fr: 'Menu mobile', en: 'Mobile menu' },
  'drawer.closeAria': { fr: 'Fermer le menu mobile', en: 'Close mobile menu' },
  'drawer.home': { fr: 'Accueil', en: 'Home' },
  'drawer.architecture': { fr: 'Architecture', en: 'Architecture' },
  'drawer.projects': { fr: 'Réalisations', en: 'Work' },
  'drawer.adrs': { fr: 'Décisions (ADR)', en: 'Decisions (ADR)' },
  'drawer.stack': { fr: 'Stack technique', en: 'Technical stack' },
  'drawer.about': { fr: 'Parcours', en: 'Journey' },
  'drawer.contact': { fr: 'Contact', en: 'Contact' },
  'drawer.downloadCv': { fr: 'Consulter les CV (PDF)', en: 'View the resumes (PDF)' },

  // ---------------------------------------------------------------- HERO
  'hero.eyebrow1': { fr: 'Antananarivo, Madagascar — UTC+3', en: 'Antananarivo, Madagascar — UTC+3' },
  'hero.eyebrow2': { fr: 'Disponible · remote', en: 'Available · remote' },
  'hero.canvasHint': {
    fr: 'Maillage interactif — cliquez pour émettre une onde',
    en: 'Interactive mesh — click to emit a wave'
  },
  'hero.roleTitle': { fr: 'Architecte technique & lead full-stack', en: 'Technical architect & lead full-stack' },
  'hero.roleBadgeAi': { fr: 'Master IA · ISPM', en: 'AI MSc · ISPM' },
  'hero.roleBadgeOffline': { fr: 'Offline-first & cloud', en: 'Offline-first & cloud' },
  'hero.roleBadgeLang': { fr: 'Français / Anglais', en: 'French / English' },
  'hero.plain': {
    fr: "Je conçois et j'écris le code de logiciels métier qui doivent continuer à tourner même sans réseau — et j'encadre les équipes qui les font vivre.",
    en: 'I design and write the code of business software that has to keep working even with no network — and I lead the teams that keep it alive.'
  },
  'hero.fact1': {
    html: true,
    fr: '<strong>4 systèmes livrés</strong>, dont un ERP scolaire en production locale au Lycée Manjary Soa.',
    en: '<strong>4 shipped systems</strong>, including a school ERP in local production at Manjary Soa High School.'
  },
  'hero.fact2': {
    html: true,
    fr: "<strong>Master IA soutenu et validé</strong> (ISPM) — diplôme en cours d'émission.",
    en: "<strong>AI MSc defended and validated</strong> (ISPM) — diploma pending issuance."
  },
  'hero.fact3': {
    html: true,
    fr: '<strong>4 développeurs encadrés</strong> en remote : cadrage, backlog, revues de code.',
    en: '<strong>4 developers mentored</strong> remotely: framing, backlog, code reviews.'
  },
  'hero.btnCv': { fr: 'Consulter les CV (PDF)', en: 'View the resumes (PDF)' },
  'hero.btnProjects': { fr: 'Voir les réalisations', en: 'See the work' },
  'hero.figNote1': { fr: 'FIG. 01 — Antananarivo', en: 'FIG. 01 — Antananarivo' },
  'hero.figNote2': { fr: 'Échelle 1:1', en: 'Scale 1:1' },
  'hero.figBadge': { fr: 'Ouvert aux missions remote', en: 'Open to remote missions' },
  'hero.scrollCue': { fr: 'Dérouler', en: 'Scroll' },
  'hero.metricUnit1': { fr: 'Systèmes documentés', en: 'Documented systems' },
  'hero.metricUnit2': { fr: 'Ans de pratique', en: 'Years of practice' },
  'hero.metricUnit3': { fr: 'Exigences tracées', en: 'Traced requirements' },
  'hero.metricUnit4': { fr: 'Langues de travail', en: 'Working languages' },
  'hero.metric1Label': {
    fr: 'ANKA · ResHPro · Study-Agent · Maboo · Given Day · TPSG · EQIMA',
    en: 'ANKA · ResHPro · Study-Agent · Maboo · Given Day · TPSG · EQIMA'
  },
  'hero.metric2Label': {
    fr: "De la licence ISPM (2018) au conseil d'architecture (2026)",
    en: 'From the ISPM bachelor degree (2018) to architecture consulting (2026)'
  },
  'hero.metric3Label': {
    fr: 'Matrice de traçabilité du TDR bailleur (AFD) — ANKA',
    en: "Traceability matrix for the funder's terms of reference (AFD) — ANKA"
  },
  'hero.metric4Label': {
    fr: 'Français courant · anglais professionnel · malgache natif',
    en: 'Fluent French · professional English · native Malagasy'
  },

  // ---------------------------------------------------------------- ARCHITECTURE SECTION
  'arch.meta': { fr: 'Topologie & conception systèmes', en: 'System topology & design' },
  'arch.heading': { fr: "L'approche architecturale : résilience et évolutivité", en: 'The architectural approach: resilience and scalability' },
  'arch.subheading': {
    fr: 'Chaque système que je conçois repose sur une stricte séparation des responsabilités, une isolation des données (RBAC) et une capacité à opérer en mode dégradé ou hors-ligne sans corruption. Cliquez sur chaque palier pour inspecter les garanties techniques et le code de référence. Les latences affichées sont des ordres de grandeur mesurés en environnement de développement, pas des engagements de service.',
    en: 'Every system I design relies on strict separation of concerns, data isolation (RBAC) and the ability to run degraded or fully offline without data corruption. Click each tier to inspect the technical guarantees and reference code. Displayed latencies are orders of magnitude measured in development environments, not service commitments.'
  },
  'arch.plain': {
    fr: "Cette planche montre le chemin des données, du poste utilisateur jusqu'au cloud, et ce qui se passe quand le réseau tombe.",
    en: 'This sheet shows the path data takes, from the user machine to the cloud, and what happens when the network drops.'
  },
  'arch.pipelineTitle': { fr: 'Pipeline distribué unifié', en: 'Unified distributed pipeline' },
  'arch.inspectorAria': { fr: 'Inspecteur de nœud architectural', en: 'Architectural node inspector' },
  'arch.presetAll': { fr: 'Vue globale', en: 'Overview' },
  'arch.presetOffline': { fr: 'Flux offline-first', en: 'Offline-first flow' },
  'arch.presetTenant': { fr: 'Isolation RBAC', en: 'RBAC isolation' },
  'arch.presetSearch': { fr: 'Moteur recherche', en: 'Search engine' },

  // ---------------------------------------------------------------- PROJECTS SECTION
  'projects.meta': { fr: 'Réalisations de production', en: 'Production work' },
  'projects.heading': { fr: 'Systèmes livrés & études de cas', en: 'Shipped systems & case studies' },
  'projects.subheading': {
    fr: "Des applications concrètes utilisées au quotidien : suites SaaS multi-établissements, logiciel d'administration scolaire en production locale, boutique e-commerce headless et pipelines d'intégration d'entreprise. Chaque fiche commence par une ligne « En clair », puis détaille les choix techniques.",
    en: 'Concrete applications used every day: multi-establishment SaaS suites, school administration software in local production, a headless e-commerce storefront and enterprise integration pipelines. Each entry opens with a plain-language line, then details the technical choices.'
  },
  'projects.filterAll': { fr: 'Tous les systèmes', en: 'All systems' },
  'projects.filterSaas': { fr: 'SaaS & cloud', en: 'SaaS & cloud' },
  'projects.filterDesktop': { fr: 'Desktop & offline-first', en: 'Desktop & offline-first' },
  'projects.filterMobile': { fr: 'Mobile & lead', en: 'Mobile & lead' },
  'projects.filterGroup': { fr: 'Filtrer les systèmes par domaine', en: 'Filter systems by domain' },
  'projects.filterCount': {
    fr: 'systèmes affichés sur',
    en: 'systems shown out of'
  },

  // ---------------------------------------------------------------- ADRs SECTION
  'adrs.meta': { fr: 'Ingénierie & arbitrages techniques', en: 'Engineering & technical trade-offs' },
  'adrs.heading': { fr: 'Architectural Decision Records (ADR)', en: 'Architectural Decision Records (ADR)' },
  'adrs.subheading': {
    fr: "L'architecture est l'art du compromis éclairé. Voici trois décisions réelles, prises face à des contraintes de terrain : infrastructure instable, budget de lancement, temps de réponse critique.",
    en: 'Architecture is the art of informed compromise. Here are three real decisions taken under field constraints: unstable infrastructure, launch budget, critical response time.'
  },
  'adrs.plain': {
    fr: "Un ADR note le problème, la décision prise et ses conséquences. C'est la trace écrite du raisonnement, pas seulement du résultat.",
    en: 'An ADR records the problem, the decision taken and its consequences. It is the written trace of the reasoning, not only of the result.'
  },
  'adrs.colContext': { fr: 'Contexte & problème', en: 'Context & problem' },
  'adrs.colDecision': { fr: "Décision d'architecture", en: 'Architectural decision' },
  'adrs.colConsequences': { fr: 'Conséquences & bénéfices', en: 'Consequences & benefits' },
  'adrs.colContextShort': { fr: 'Contexte', en: 'Context' },
  'adrs.colDecisionShort': { fr: 'Décision', en: 'Decision' },
  'adrs.colConsequencesShort': { fr: 'Conséquences', en: 'Consequences' },

  'adrs.adr1.title': {
    fr: 'Paradigme hybride Offline-First (SQLite + Supabase) vs cloud monolithique',
    en: 'Hybrid Offline-First paradigm (SQLite + Supabase) vs monolithic cloud'
  },
  'adrs.adr1.status': { fr: 'Adopté & en production', en: 'Adopted & in production' },
  'adrs.adr1.plain': {
    fr: "Même sans courant ni internet, le lycée saisit les notes et édite les bulletins ; tout se resynchronise seul au retour du réseau.",
    en: 'Even with no power and no internet, the school enters grades and prints report cards; everything resyncs on its own once the network is back.'
  },
  'adrs.adr1.context': {
    fr: "Au sein du Lycée Manjary Soa (Madagascar), les coupures d'électricité et d'accès internet sont fréquentes. Une solution 100% Web Cloud bloquait la saisie des notes et la délibération des conseils de classe.",
    en: "At Lycée Manjary Soa (Madagascar), power and internet outages are frequent. A 100% web-cloud solution blocked grade entry and class-council deliberations."
  },
  'adrs.adr1.decision': {
    fr: "Déploiement d'une application Electron avec base locale SQLite en mode WAL (Write-Ahead Logging). File d'attente de mutations (Delta Ledger) synchronisée de manière asynchrone et idempotente vers Supabase dès retour du réseau.",
    en: 'Deployment of an Electron application with a local SQLite database in WAL (Write-Ahead Logging) mode. A mutation queue (Delta Ledger) synchronized asynchronously and idempotently to Supabase as soon as the network returns.'
  },
  'adrs.adr1.consequences': {
    fr: "La saisie des notes et l'édition des bulletins restent possibles sans réseau, à la latence du disque local (< 1 ms en dev). La resynchronisation est idempotente et les conflits sont résolus par horodatage vectoriel.",
    en: 'Grade entry and report-card generation keep working with no network, at local-disk latency (< 1 ms in dev). Resync is idempotent and conflicts are resolved by vector timestamping.'
  },
  'adrs.adr1.takeaway': {
    html: true,
    fr: "<strong>Enseignement clé :</strong> la résilience logicielle doit s'adapter à la réalité des infrastructures physiques, sans sacrifier la centralisation des données de l'administration.",
    en: '<strong>Key takeaway:</strong> software resilience must adapt to the reality of physical infrastructure, without sacrificing centralized data management.'
  },

  'adrs.adr2.title': {
    fr: 'Isolation logique multi-tenant (PostgreSQL Row-Level Security) vs multi-bases',
    en: 'Multi-tenant logical isolation (PostgreSQL Row-Level Security) vs multi-database'
  },
  'adrs.adr2.status': { fr: 'Cadré — migration en cours', en: 'Framed — migration in progress' },
  'adrs.adr2.plain': {
    fr: "Plusieurs hôtels partagent le même logiciel sans jamais pouvoir lire les données d'un autre.",
    en: 'Several hotels share the same software without ever being able to read each other’s data.'
  },
  'adrs.adr2.context': {
    fr: "Pour la suite SaaS hôtelière ResHPro, chaque établissement hôtelier doit disposer d'une étanchéité absolue de ses réservations, stocks et finances, tout en limitant les coûts d'hébergement au lancement.",
    en: 'For the ResHPro hotel SaaS suite, each establishment requires absolute isolation of its reservations, inventory and finances, while limiting hosting costs at launch.'
  },
  'adrs.adr2.decision': {
    fr: "Décision cible : mono-base PostgreSQL avec politiques natives Row-Level Security (RLS) injectant le tenant_id validé par JWT dans le contexte de session. ResHPro ayant démarré sur Firebase Auth (coût de lancement nul), l'isolation est aujourd'hui portée par la couche applicative ; la migration RLS est prototypée et planifiée.",
    en: 'Target decision: single-database PostgreSQL with native Row-Level Security (RLS) policies injecting the JWT-validated tenant_id into each query session context. Since ResHPro started on Firebase Auth (zero launch cost), isolation is currently enforced at the application layer; the RLS migration is prototyped and scheduled.'
  },
  'adrs.adr2.consequences': {
    fr: "Attendu : coût d'infrastructure divisé par ~5 versus multi-bases, migrations de schémas centralisées et isolation infalsifiable même en cas d'oubli d'une clause WHERE applicative. État actuel : isolation applicative en production, RLS en cours de migration.",
    en: 'Expected: infrastructure cost divided by ~5 versus a multi-database model, centralized schema migrations and tamper-proof isolation even if an application WHERE clause is omitted. Current state: application-layer isolation in production, RLS migration in progress.'
  },
  'adrs.adr2.takeaway': {
    html: true,
    fr: "<strong>Enseignement clé :</strong> déplacer la sécurité d'isolation au plus près du moteur de base de données élimine les failles humaines du code applicatif.",
    en: '<strong>Key takeaway:</strong> moving isolation security as close as possible to the database engine eliminates human flaws in application code.'
  },

  'adrs.adr3.title': {
    fr: 'Rendu hybride SSR & streaming (React Router 7) pour Maboo E-Commerce',
    en: 'Hybrid SSR & streaming rendering (React Router 7) for Maboo E-Commerce'
  },
  'adrs.adr3.status': { fr: 'Déployé', en: 'Deployed' },
  'adrs.adr3.plain': {
    fr: "La boutique s'affiche plus vite sur mobile et ses pages sont mieux indexées par Google.",
    en: 'The storefront renders faster on mobile and its pages are better indexed by Google.'
  },
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
    fr: "<strong>Enseignement clé :</strong> le streaming HTML moderne permet d'allier les bénéfices SEO du serveur à la vivacité de navigation d'une SPA sans compromis.",
    en: '<strong>Key takeaway:</strong> modern HTML streaming combines the SEO benefits of server rendering with the snappy navigation of an SPA without compromise.'
  },

  // ---------------------------------------------------------------- STACK SECTION
  'stack.meta': { fr: 'Arsenal & écosystème', en: 'Arsenal & ecosystem' },
  'stack.heading': { fr: 'Matrice des compétences techniques', en: 'Technical skills matrix' },
  'stack.subheading': {
    fr: "Les outils que j'utilise réellement, regroupés par nature de problème — pas de barre de niveau auto-attribuée, chaque ligne correspond à du code livré.",
    en: 'The tools I actually use, grouped by the nature of the problem — no self-rated proficiency bars, every line maps to shipped code.'
  },
  'stack.card1Title': { fr: 'Frontend & mobile core', en: 'Frontend & mobile core' },
  'stack.card1Note': {
    fr: 'Composants headless découplés, typage strict de bout en bout et optimisation fine du DOM.',
    en: 'Decoupled headless components, end-to-end strict typing and fine-grained DOM optimization.'
  },
  'stack.card2Title': { fr: 'Backend & données', en: 'Backend & data' },
  'stack.card2Note': {
    fr: 'Schémas relationnels normalisés, isolation multi-tenant, transactions ACID et mise en cache locale.',
    en: 'Normalized relational schemas, multi-tenant isolation, ACID transactions and local caching.'
  },
  'stack.card3Title': { fr: 'Architecture & systèmes', en: 'Architecture & systems' },
  'stack.card3Note': {
    fr: 'Tolérance aux pannes, découplage modulaire et réduction assumée de la dette technique.',
    en: 'Fault tolerance, modular decoupling and deliberate technical debt reduction.'
  },
  'stack.card4Title': { fr: 'IA, vision & traitement', en: 'AI, vision & processing' },
  'stack.card4Note': {
    fr: 'Formation universitaire en traitement du signal, vision par ordinateur et réseaux de neurones.',
    en: 'University training in signal processing, computer vision and neural networks.'
  },
  'stack.card5Title': { fr: 'Gouvernance & produit', en: 'Governance & product' },
  'stack.card5Note': {
    fr: 'Faire le pont entre exigences métier, contraintes budgétaires et excellence technique.',
    en: 'Bridging business requirements, budget constraints and technical excellence.'
  },
  'stack.card6Title': { fr: 'Intégration ERP & métier', en: 'ERP & business integration' },
  'stack.card6Note': {
    fr: "Flux financiers, traçabilité d'inventaires et conformité comptable.",
    en: 'Financial flows, inventory traceability and accounting compliance.'
  },

  // ---------------------------------------------------------------- ABOUT SECTION
  'about.meta': { fr: 'Identité & parcours', en: 'Identity & journey' },
  'about.heading': { fr: "L'ingénieur derrière les systèmes", en: 'The engineer behind the systems' },
  'about.subheading': {
    fr: "Double formation en Électronique, Informatique & IA à l'ISPM, combinée à une pratique intensive du terrain sur des projets internationaux et locaux.",
    en: 'Dual training in Electronics, Computer Science & AI at ISPM, combined with intensive field practice on international and local projects.'
  },
  'about.profileAria': { fr: 'Carte profil de Manoa', en: "Manoa's profile card" },
  'about.photoAlt': { fr: 'Portrait de Manoa Randrianarisoa', en: 'Portrait of Manoa Randrianarisoa' },
  'about.onlineTitle': { fr: 'Actif et disponible', en: 'Active and available' },
  'about.profileTitle': { fr: 'Architecte technique & full-stack', en: 'Technical architect & full-stack' },
  'about.metaLocation': { fr: 'Antananarivo, Madagascar (UTC+3)', en: 'Antananarivo, Madagascar (UTC+3)' },
  'about.metaAvailability': { fr: 'Disponible : missions remote & CDI', en: 'Available: remote missions & full-time roles' },
  'about.metaDegree': { fr: 'Master Informatique, Électronique & IA', en: 'MSc Computer Science, Electronics & AI' },
  'about.metaLangs': {
    fr: 'Français (courant) · Anglais (professionnel) · Malgache (natif)',
    en: 'French (fluent) · English (professional) · Malagasy (native)'
  },
  'about.proofTitle': { fr: 'Pièces justificatives', en: 'Supporting documents' },
  'about.proofText': {
    fr: "Master soutenu et validé ; diplôme en cours d'émission. Attestation de réussite, relevés et références envoyés sur demande.",
    en: 'MSc defended and validated; diploma pending issuance. Certificate of completion, transcripts and references sent on request.'
  },
  'about.downloadCv': { fr: 'Consulter les CV (PDF)', en: 'View the resumes (PDF)' },
  'about.philoTitle': { fr: "Philosophie d'ingénierie", en: 'Engineering philosophy' },
  'about.philoP1': {
    fr: "« Je ne conçois pas le code comme une finalité, mais comme la charpente rigoureuse d'une promesse métier. Une architecture réussie est celle qui sait s'effacer : elle ne fait pas de bruit, répond en quelques millisecondes, absorbe les pannes sans alerter l'utilisateur et permet à l'équipe de déployer sans crainte. »",
    en: '"I do not design code as an end goal, but as the rigorous framework of a business promise. A successful architecture is one that knows how to step aside: it makes no noise, responds within milliseconds, absorbs failures without alerting the user, and lets the team deploy without fear."'
  },
  'about.philoP2': {
    fr: "Mon passage par le Master en Électronique et IA m'a inculqué le respect de la ressource matérielle : chaque cycle CPU, chaque octet transmis et chaque index SQL ont un coût mesurable.",
    en: "My Master's in Electronics and AI instilled a respect for hardware resources: every CPU cycle, every byte transmitted and every SQL index has a measurable cost."
  },
  'about.philoSign': { fr: 'Manoa Randrianarisoa — Antananarivo, 2026', en: 'Manoa Randrianarisoa — Antananarivo, 2026' },
  'about.timelineHead': { fr: 'Fil du parcours', en: 'Career thread' },
  'about.timelineRange': { fr: '2018 → 2026', en: '2018 → 2026' },
  'about.kindWork': { fr: 'Mission', en: 'Mission' },
  'about.kindIntern': { fr: 'Stage', en: 'Internship' },
  'about.kindTeach': { fr: 'Enseignement', en: 'Teaching' },
  'about.kindStudy': { fr: 'Formation', en: 'Education' },

  'about.tl1.year': { fr: '2025 — présent', en: '2025 — present' },
  'about.tl1.role': { fr: 'Consultant indépendant / Architecte technique', en: 'Independent consultant / Technical architect' },
  'about.tl1.company': { fr: 'Multi-projets internationaux & locaux', en: 'International & local multi-projects' },
  'about.tl1.desc': {
    html: true,
    fr: "Conception de bout en bout de la plateforme de collecte terrain <strong>ANKA</strong> (Digital Energy Challenge / AFD — PWA offline-first, matrice de 45 exigences), de la suite SaaS <strong>ResHPro</strong> (React 18 / multi-tenant, isolation applicative puis migration PostgreSQL RLS), du système ERP scolaire <strong>Study-Agent</strong> (en production locale, modèle Offline-First) et contribution frontend à la boutique <strong>Maboo</strong> (React 19 / SSR streaming).",
    en: 'End-to-end design of the <strong>ANKA</strong> field data collection platform (Digital Energy Challenge / AFD — offline-first PWA, 45-requirement matrix), the <strong>ResHPro</strong> SaaS suite (React 18 / multi-tenant, application-layer isolation then PostgreSQL RLS migration), the <strong>Study-Agent</strong> school ERP (in local production, Offline-First model) and frontend contribution to the <strong>Maboo</strong> storefront (React 19 / SSR streaming).'
  },
  'about.tl2.year': { fr: '2025 — 2026', en: '2025 — 2026' },
  'about.tl2.role': { fr: 'Architecte technique & lead mobile', en: 'Technical architect & mobile lead' },
  'about.tl2.company': { fr: 'Given Day Tech (France / associatif)', en: 'Given Day Tech (France / non-profit)' },
  'about.tl2.desc': {
    html: true,
    fr: "Architecture logicielle mobile-first sous React Native et Node.js. Encadrement et coordination d'une équipe technique de <strong>4 développeurs</strong>, gouvernance agile et livraison dans le cadre d'un projet solidaire.",
    en: 'Mobile-first software architecture with React Native and Node.js. Mentoring and coordination of a <strong>4-developer</strong> engineering team, agile governance and delivery within a solidarity project.'
  },
  'about.tl3.year': { fr: '2025 — présent', en: '2025 — present' },
  'about.tl3.role': { fr: 'Développeur full-stack senior', en: 'Senior full-stack developer' },
  'about.tl3.company': { fr: 'ToutPourSaGloire.com (international)', en: 'ToutPourSaGloire.com (international)' },
  'about.tl3.desc': {
    html: true,
    fr: 'Refonte en architecture modulaire Next.js & GraphQL. Intégration du moteur Meilisearch : <strong>-40% de temps de chargement</strong> sur les catalogues multimédias.',
    en: 'Overhaul into a modular Next.js & GraphQL architecture. Meilisearch integration: <strong>40% less loading time</strong> on multimedia catalogs.'
  },
  'about.tl4.year': { fr: '2023 — 2024', en: '2023 — 2024' },
  'about.tl4.role': { fr: 'Développeur CMS & designer UI/UX', en: 'CMS developer & UI/UX designer' },
  'about.tl4.company': { fr: 'RICSM (États-Unis / remote) — contrat via IKS Antananarivo', en: 'RICSM (United States / remote) — contracted via IKS Antananarivo' },
  'about.tl4.desc': {
    fr: "Conception des maquettes sous Figma et livraison d'une plateforme web institutionnelle répondant aux standards américains d'accessibilité.",
    en: 'Designed mockups in Figma and delivered an institutional web platform meeting US accessibility standards.'
  },
  'about.tl5.year': { fr: '2022 (6 mois)', en: '2022 (6 months)' },
  'about.tl5.role': { fr: 'Stage développeur full-stack & pipeline OCR', en: 'Full-stack & OCR pipeline intern' },
  'about.tl5.company': { fr: 'EQIMA (Antananarivo)', en: 'EQIMA (Antananarivo)' },
  'about.tl5.desc': {
    html: true,
    fr: "Digitalisation de la saisie comptable via OCR et synchronisation directe avec l'API Sage ERP : <strong>-70% de temps de traitement</strong>.",
    en: 'Digitization of accounting entry via OCR and direct synchronization with the Sage ERP API: <strong>70% less processing time</strong>.'
  },
  'about.tl8.year': { fr: '2020 — 2023', en: '2020 — 2023' },
  'about.tl8.role': { fr: 'Enseignant vacataire — informatique & électronique', en: 'Part-time teacher — computer science & electronics' },
  'about.tl8.company': { fr: 'Cours particuliers et groupes, Antananarivo', en: 'Private lessons and group classes, Antananarivo' },
  'about.tl8.desc': {
    fr: "Transmission des bases de la programmation, de l'électronique et des mathématiques appliquées à des lycéens et étudiants. Préparation aux examens, pédagogie par exercices guidés — la même discipline que celle exigée en revue de code.",
    en: 'Teaching the fundamentals of programming, electronics and applied mathematics to high-school and university students. Exam preparation and guided-exercise pedagogy — the same discipline required in code review.'
  },
  'about.tl6.year': { fr: '2022 — 2024', en: '2022 — 2024' },
  'about.tl6.role': { fr: 'Master en Électronique, Informatique & IA', en: 'MSc in Electronics, Computer Science & AI' },
  'about.tl6.company': { fr: 'Institut Supérieur Polytechnique de Madagascar (ISPM)', en: 'Institut Supérieur Polytechnique de Madagascar (ISPM)' },
  'about.tl6.desc': {
    fr: "Conception logicielle avancée, algorithmique, traitement d'images (OpenCV), vision industrielle et modèles de Deep Learning. Master soutenu et validé ; diplôme en cours d'émission.",
    en: 'Advanced software design, algorithms, image processing (OpenCV), industrial vision and Deep Learning models. MSc defended and validated; diploma pending issuance.'
  },
  'about.tl7.year': { fr: '2018 — 2022', en: '2018 — 2022' },
  'about.tl7.role': { fr: 'Licence en Électronique & Informatique', en: "Bachelor's in Electronics & Computer Science" },
  'about.tl7.company': { fr: 'Institut Supérieur Polytechnique de Madagascar (ISPM)', en: 'Institut Supérieur Polytechnique de Madagascar (ISPM)' },
  'about.tl7.desc': {
    fr: 'Génie logiciel, architectures système, programmation concurrente et réseaux de communication.',
    en: 'Software engineering, system architectures, concurrent programming and communication networks.'
  },

  // ---------------------------------------------------------------- JOURNEY SCENE
  'journey.kicker': { fr: 'Traversée 2018 → 2026', en: 'Crossing 2018 → 2026' },
  'journey.heading': { fr: 'Le parcours, en une traversée', en: 'The journey, in one crossing' },
  'journey.subheading': {
    fr: "Cinq étapes, de l'amphithéâtre de l'ISPM au conseil d'architecture. Déroulez : la silhouette avance, change d'attribut à chaque étape et le décor défile derrière elle.",
    en: 'Five stages, from the ISPM lecture hall to architecture consulting. Scroll: the figure walks on, picks up a new attribute at each stage, and the scenery slides past.'
  },
  'journey.plain': {
    fr: "Chaque étape reprend un fait déjà écrit dans le registre ci-dessous : rien n'est ajouté pour faire joli.",
    en: 'Every stage restates a fact already written in the register below: nothing is added for decoration.'
  },
  'journey.drawingLabel': {
    fr: 'Silhouette marchant de gauche à droite devant cinq repères dessinés à la plume : un livre ouvert, un scanner à plat, une toque de diplômé, un ordinateur portable, un plan roulé et une équerre.',
    en: 'A figure walking left to right past five pen-drawn landmarks: an open book, a flatbed scanner, a graduation cap, a laptop, a rolled plan and a set square.'
  },
  'journey.hint': { fr: 'Dérouler pour avancer', en: 'Scroll to walk on' },
  'journey.railLabel': { fr: 'Progression de la traversée', en: 'Crossing progress' },
  'journey.note': {
    fr: 'Les périodes se recoupent en partie ; le registre détaillé ci-dessous fait foi.',
    en: 'The periods partly overlap; the detailed register below is authoritative.'
  },
  'journey.registerLink': { fr: 'Voir le registre détaillé', en: 'See the detailed register' },
  'journey.c1.year': { fr: '2018 — 2022', en: '2018 — 2022' },
  'journey.c1.title': { fr: 'Licence en Électronique & Informatique', en: "Bachelor's in Electronics & Computer Science" },
  'journey.c1.place': { fr: 'ISPM · Antananarivo', en: 'ISPM · Antananarivo' },
  'journey.c1.text': {
    fr: 'Les fondations : génie logiciel, architectures système, réseaux. Les premiers circuits et les premiers dépôts.',
    en: 'The foundations: software engineering, system architectures, networks. The first circuits and the first repositories.'
  },
  'journey.c2.year': { fr: '2022', en: '2022' },
  'journey.c2.title': { fr: 'Stage — pipeline OCR vers Sage ERP', en: 'Internship — OCR pipeline into Sage ERP' },
  'journey.c2.place': { fr: 'EQIMA · Antananarivo', en: 'EQIMA · Antananarivo' },
  'journey.c2.text': {
    fr: "Premier système livré en entreprise : les pièces comptables scannées entrent directement dans l'ERP, -70 % de temps de traitement.",
    en: 'First system shipped in a company: scanned accounting documents go straight into the ERP, 70% less processing time.'
  },
  'journey.c3.year': { fr: '2022 — 2024', en: '2022 — 2024' },
  'journey.c3.title': { fr: 'Master Électronique, Informatique & IA', en: 'MSc Electronics, Computer Science & AI' },
  'journey.c3.place': { fr: "ISPM · soutenu et validé, diplôme en cours d'émission", en: 'ISPM · defended and validated, diploma pending issuance' },
  'journey.c3.text': {
    fr: "Vision par ordinateur, Deep Learning, traitement d'images (OpenCV) et vision industrielle.",
    en: 'Computer vision, Deep Learning, image processing (OpenCV) and industrial vision.'
  },
  'journey.c4.year': { fr: '2023 — 2025', en: '2023 — 2025' },
  'journey.c4.title': { fr: 'Contrats remote internationaux', en: 'International remote contracts' },
  'journey.c4.place': { fr: 'RICSM · ToutPourSaGloire.com · Given Day Tech', en: 'RICSM · ToutPourSaGloire.com · Given Day Tech' },
  'journey.c4.text': {
    fr: "Standards d'accessibilité américains, refonte Next.js + Meilisearch, puis encadrement de 4 développeurs.",
    en: 'US accessibility standards, a Next.js + Meilisearch overhaul, then leading a team of 4 developers.'
  },
  'journey.c5.year': { fr: "2025 — aujourd'hui", en: '2025 — today' },
  'journey.c5.title': { fr: 'Indépendant · architecte technique', en: 'Independent · technical architect' },
  'journey.c5.place': { fr: 'ANKA · ResHPro · Study-Agent · Maboo', en: 'ANKA · ResHPro · Study-Agent · Maboo' },
  'journey.c5.text': {
    fr: 'Conception de bout en bout, décisions tracées en ADR, systèmes qui tiennent quand le réseau tombe.',
    en: 'End-to-end design, decisions traced as ADRs, systems that hold up when the network drops.'
  },

  // ---------------------------------------------------------------- CONTACT SECTION
  'contact.meta': { fr: 'Échange & collaboration', en: 'Connect & collaborate' },
  'contact.heading': { fr: 'Parlons de votre système', en: "Let's talk about your system" },
  'contact.subheading': {
    fr: "Vous cherchez un architecte technique pour cadrer une refonte, un lead full-stack capable d'emmener une équipe, ou un partenaire d'ingénierie sur un projet exigeant ?",
    en: 'Looking for a technical architect to frame an overhaul, a full-stack lead who can drive a team, or an engineering partner on a demanding project?'
  },
  'contact.lead': {
    html: true,
    fr: "Disponible pour des missions <strong>internationales en remote</strong>, du conseil d'architecture ou un rôle de lead. Je réponds sous 24h avec une première analyse concrète de votre besoin.",
    en: 'Available for <strong>international remote missions</strong>, architecture consulting or a lead role. I reply within 24h with a first concrete analysis of your need.'
  },
  'contact.labelEmail': { fr: 'Adresse email', en: 'Email address' },
  'contact.labelPhone': { fr: 'Téléphone / WhatsApp', en: 'Phone / WhatsApp' },
  'contact.labelGithub': { fr: 'Profil GitHub', en: 'GitHub profile' },
  'contact.labelLinkedin': { fr: 'Réseau LinkedIn', en: 'LinkedIn profile' },
  'contact.copy': { fr: 'Copier', en: 'Copy' },
  'contact.open': { fr: 'Ouvrir', en: 'Open' },
  'contact.copyEmailTitle': { fr: "Copier l'email", en: 'Copy email' },
  'contact.copyPhoneTitle': { fr: 'Copier le numéro', en: 'Copy number' },
  'contact.availability': {
    fr: 'Disponible immédiatement · remote monde entier ou sur site',
    en: 'Available immediately · remote worldwide or on-site'
  },
  'contact.formAria': { fr: 'Formulaire de contact', en: 'Contact form' },
  'contact.formNote': {
    fr: "Le formulaire ouvre votre client mail avec le message pré-rempli — aucune donnée n'est stockée sur ce site.",
    en: 'The form opens your mail client with the message pre-filled — no data is stored on this site.'
  },
  'contact.labelName': { fr: 'Votre nom & organisation', en: 'Your name & organization' },
  'contact.phName': { fr: 'Ex : Jean Dupont · CTO chez Acme', en: 'E.g. John Smith · CTO at Acme' },
  'contact.labelEmailForm': { fr: 'Votre adresse email', en: 'Your email address' },
  'contact.phEmail': { fr: 'nom@entreprise.com', en: 'name@company.com' },
  'contact.labelMessage': { fr: 'Nature du projet ou enjeu technique', en: 'Project nature or technical challenge' },
  'contact.phMessage': {
    fr: "Décrivez votre besoin : refonte d'architecture, cadrage SaaS, mission de lead tech, audit de performance…",
    en: 'Describe your need: architecture overhaul, SaaS framing, lead tech mission, performance audit…'
  },
  'contact.submit': { fr: 'Préparer le message', en: 'Prepare the message' },
  'contact.statusMailto': {
    fr: "Votre client mail va s'ouvrir avec le message pré-rempli. S'il ne s'ouvre pas, écrivez directement à ",
    en: 'Your mail client is about to open with the message pre-filled. If it does not, write directly to '
  },

  // ---------------------------------------------------------------- FOOTER
  'footer.brand': { fr: 'Manoa Randrianarisoa — Architecte technique', en: 'Manoa Randrianarisoa — Technical architect' },
  'footer.top': { fr: 'Haut de page', en: 'Back to top' },
  'footer.architecture': { fr: 'Architecture', en: 'Architecture' },
  'footer.systems': { fr: 'Réalisations', en: 'Work' },
  'footer.adrs': { fr: 'Décisions (ADR)', en: 'Decisions (ADR)' },
  'footer.about': { fr: 'Parcours', en: 'Journey' },
  'footer.ckProject': { fr: 'Projet', en: 'Project' },
  'footer.cvProject': { fr: "Portfolio d'architecte", en: 'Architect portfolio' },
  'footer.ckSheet': { fr: 'Planche', en: 'Sheet' },
  'footer.ckScale': { fr: 'Échelle', en: 'Scale' },
  'footer.ckDegree': { fr: 'Diplôme', en: 'Degree' },
  'footer.cvDegree': { fr: 'Master soutenu & validé', en: 'MSc defended & validated' },
  'footer.ckStack': { fr: 'Stack', en: 'Stack' },
  'footer.rights': {
    fr: '© 2026 Manoa Randrianarisoa — conçu et codé sans modèle générique.',
    en: '© 2026 Manoa Randrianarisoa — designed and coded without a generic template.'
  },
  'footer.credits': {
    fr: 'Aucun traceur · Aucune donnée collectée',
    en: 'No trackers · No data collected'
  },

  // ---------------------------------------------------------------- TERMINAL (static shell)
  'term.aria': { fr: "Console interactive de l'Architecte", en: "The Architect's interactive console" },
  'term.closeTitle': { fr: 'Fermer la console (Échap)', en: 'Close console (Esc)' },
  'term.shortcuts': { fr: "Tapez 'help' • Échap pour fermer", en: "Type 'help' • Esc to close" },
  'term.banner1': {
    fr: 'CONSOLE DE MANOA RANDRIANARISOA — PLANCHE INTERACTIVE',
    en: 'MANOA RANDRIANARISOA CONSOLE — INTERACTIVE SHEET'
  },
  'term.banner2': {
    fr: 'Architecte technique & lead full-stack · Master IA ISPM',
    en: 'Technical architect & lead full-stack · ISPM AI MSc'
  },
  'term.banner3': {
    html: true,
    fr: "Tapez <span class=\"highlight\">help</span> pour afficher l'ensemble des commandes.",
    en: 'Type <span class="highlight">help</span> to display all available commands.'
  },
  'term.placeholder': { fr: 'Ex : help, whoami, journey, projects, metrics, theme moss, lang en…', en: 'E.g. help, whoami, journey, projects, metrics, theme moss, lang fr…' },

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
  'common.skip': { fr: 'Aller au contenu', en: 'Skip to content' },
  'common.plainLabel': { fr: 'En clair', en: 'Plainly' },
  'common.role': { fr: 'Rôle', en: 'Role' },
  'thread.aria': { fr: 'Progression de la page', en: 'Page progress' },
  'common.copied': { fr: '✓ Copié dans le presse-papier : ', en: '✓ Copied to clipboard: ' },
  'common.copyFallback': { fr: 'Copié : ', en: 'Copied: ' },
  'common.codeGithub': { fr: 'Code GitHub', en: 'GitHub Code' },
  'common.lmsRepo': { fr: 'LMS Repo', en: 'LMS Repo' },
  'common.siteLive': { fr: 'Site Live', en: 'Live Site' },
  'common.githubTitle': { fr: 'Consulter le code source sur GitHub', en: 'View source code on GitHub' },
  'common.lmsTitle': { fr: 'Repository LMS lié', en: 'Linked LMS repository' },
  'common.liveTitle': { fr: 'Visiter le site en ligne', en: 'Visit the live site' }
};

const LANG_KEY = 'manoa_arch_lang';
const LEGACY_LANG_KEY = 'site-lang';
let currentLang =
  localStorage.getItem(LANG_KEY) || localStorage.getItem(LEGACY_LANG_KEY) || 'fr';
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
  localStorage.removeItem(LEGACY_LANG_KEY);
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
