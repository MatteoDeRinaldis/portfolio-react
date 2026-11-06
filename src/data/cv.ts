import type { Language } from '../i18n';

export type SkillIcon =
  | 'frontend'
  | 'mobile'
  | 'ui'
  | 'tools'
  | 'devops'
  | 'testing'
  | 'design'
  | 'backend'
  | 'security'
  | 'methodologies';

export type SkillCategory = {
  title: string;
  icon: SkillIcon;
  items: string[];
};

export type ProjectExperience = {
  client: string;
  description: string;
  technologies: string[];
};

export type ProfessionalExperience = {
  company: string;
  location: string;
  period: string;
  projects: ProjectExperience[];
};

const skillCategoriesByLanguage: Record<Language, SkillCategory[]> = {
  it: [
    {
      title: 'Tecnologie Frontend',
      icon: 'frontend',
      items: [
        'React',
        'JavaScript',
        'TypeScript',
        'HTML5',
        'CSS/SCSS/LESS',
        'React Hook Form',
        'React Native',
        'Expo',
      ],
    },
    {
      title: 'Gestione dello Stato',
      icon: 'mobile',
      items: ['Redux', 'Redux Toolkit', 'Redux-Saga', 'React Query', 'Axios'],
    },
    {
      title: 'UI & Design',
      icon: 'ui',
      items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Ant Design', 'Storybook', 'PixiJS', 'Figma', 'Zeplin', 'InVision'],
    },
    {
      title: 'Strumenti di Sviluppo',
      icon: 'tools',
      items: ['Vite', 'Webpack', 'npm/yarn', 'yalc', 'Git', 'GitHub', 'BrowserStack', 'GitHub Copilot CLI'],
    },
    {
      title: 'DevOps e Collaborazione',
      icon: 'devops',
      items: ['Azure DevOps', 'Bitbucket', 'Pipeline CI/CD', 'Jira', 'Confluence', 'ServiceNow'],
    },
    {
      title: 'Testing e Qualità',
      icon: 'testing',
      items: ['Vitest', 'Jest', 'React Testing Library', 'Cypress', 'SonarQube', 'SonarCloud', 'Black Duck', 'Veracode'],
    },
    {
      title: 'Backend e Dati',
      icon: 'backend',
      items: ['Supabase', 'MySQL', 'API REST', 'Swagger'],
    },
    {
      title: 'Sicurezza',
      icon: 'security',
      items: ['Keycloak', 'Polaris'],
    },
    {
      title: 'Metodologie e Pratiche',
      icon: 'methodologies',
      items: ['Agile', 'GitFlow', 'Waterfall'],
    },
  ],
  en: [
    {
      title: 'Frontend Technologies',
      icon: 'frontend',
      items: [
        'React',
        'JavaScript',
        'TypeScript',
        'HTML5',
        'CSS/SCSS/LESS',
        'React Hook Form',
        'React Native',
        'Expo',
      ],
    },
    {
      title: 'State Management',
      icon: 'mobile',
      items: ['Redux', 'Redux Toolkit', 'Redux-Saga', 'React Query', 'Axios'],
    },
    {
      title: 'UI & Design',
      icon: 'ui',
      items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Ant Design', 'Storybook', 'PixiJS', 'Figma', 'Zeplin', 'InVision'],
    },
    {
      title: 'Development Tools',
      icon: 'tools',
      items: ['Vite', 'Webpack', 'npm/yarn', 'yalc', 'Git', 'GitHub', 'BrowserStack', 'GitHub Copilot CLI'],
    },
    {
      title: 'DevOps & Collaboration',
      icon: 'devops',
      items: ['Azure DevOps', 'Bitbucket', 'CI/CD Pipelines', 'Jira', 'Confluence', 'ServiceNow'],
    },
    {
      title: 'Testing & Quality',
      icon: 'testing',
      items: ['Vitest', 'Jest', 'React Testing Library', 'Cypress', 'SonarQube', 'SonarCloud', 'Black Duck', 'Veracode'],
    },
    {
      title: 'Backend & Data',
      icon: 'backend',
      items: ['Supabase', 'MySQL', 'REST APIs', 'Swagger'],
    },
    {
      title: 'Security',
      icon: 'security',
      items: ['Keycloak', 'Polaris'],
    },
    {
      title: 'Methodologies & Practices',
      icon: 'methodologies',
      items: ['Agile', 'GitFlow', 'Waterfall'],
    },
  ],
};

const professionalExperiencesByLanguage: Record<Language, ProfessionalExperience[]> = {
  it: [
    {
      company: 'Codeway SA',
      location: 'Chiasso, CH',
      period: '09/2022 - 09/2026',
      projects: [
        {
          client: 'Sisal',
          description:
            'Manutenzione ed evoluzione di applicazioni per lotterie online distribuite su oltre 30 repository. Traduzione dei requisiti business e UI/UX in componenti React riutilizzabili e funzionalità frontend, integrazione di REST API e cura della coerenza tra codebase. Risoluzione di problemi complessi e miglioramento delle piattaforme.',
          technologies: ['JavaScript', 'React', 'TypeScript', 'CSS', 'SCSS', 'Git', 'Webpack', 'GitHub Copilot CLI'],
        },
        {
          client: 'Gimac',
          description:
            'Definizione dell’architettura frontend e della struttura repository per una piattaforma back-office. Sviluppo end-to-end di componenti riutilizzabili e funzionalità business, integrazione di REST API e manutenzione evolutiva. Gestione autonoma delle attività dalla configurazione iniziale all’evoluzione della piattaforma.',
          technologies: ['JavaScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Bip',
          description:
            'Progettazione delle fondamenta frontend di una piattaforma gestionale per uno studio legale internazionale. Definizione della struttura di progetto e sviluppo di componenti riutilizzabili e flussi business. Gestione autonoma di implementazione frontend, integrazione delle API backend e manutenzione della soluzione.',
          technologies: ['TypeScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Accenture',
          description:
            'Gestione della shared component library e del livello d’integrazione tra i moduli di una piattaforma gestionale industriale. Sviluppo di funzionalità business e mantenimento della coerenza tra le integrazioni. Nel ruolo di Security Champion, gestione end-to-end di test e rilasci negli ambienti di sviluppo e test.',
          technologies: [
            'JavaScript',
            'React',
            'React Query',
            'Redux',
            'Axios',
            'Storybook',
            'Azure DevOps',
            'Keycloak',
            'Jest',
            'Cypress',
            'Black Duck',
            'Polaris',
            'Figma',
            'SCSS',
            'Git',
            'Swagger',
          ],
        },
      ],
    },
    {
      company: 'iTuna / WebScience',
      location: 'Milano, IT',
      period: '11/2020 - 09/2022',
      projects: [
        {
          client: 'Fabrick',
          description:
            'Sviluppo e personalizzazione di componenti frontend riutilizzabili per applicazioni bancarie. Integrazione con le API backend e adattamento di componenti UI dinamici ai requisiti di business. Cura della coerenza con i pattern esistenti e manutenzione delle funzionalità nelle diverse aree dell’applicazione.',
          technologies: ['TypeScript', 'React', 'Less', 'Storybook', 'IntelliJ'],
        },
        {
          client: 'Bugnion',
          description:
            'Sviluppo di funzionalità business e componenti UI riutilizzabili in un’architettura micro-frontend per una piattaforma di gestione brevetti. Implementazione della logica applicativa e della gestione dello stato, con integrazione delle API backend. Cura della coerenza tra i moduli e manutenzione delle funzionalità esistenti.',
          technologies: ['TypeScript', 'React', 'Piral', 'Redux-Saga', 'Tailwind CSS', 'SCSS'],
        },
        {
          client: 'Roche',
          description:
            'Sviluppo di funzionalità frontend interattive e strumenti di visualizzazione dati per una piattaforma di presentazione farmaceutica. Implementazione della logica applicativa, di calcoli basati su Excel e grafici dinamici. Manutenzione dei componenti e cura della fruibilità dei contenuti nelle presentazioni.',
          technologies: ['JavaScript', 'jQuery', 'React', 'HTML', 'CSS', 'SCSS', 'Apache ECharts'],
        },
      ],
    },
    {
      company: 'Cathedra Srl',
      location: 'Seregno, IT',
      period: '04/2019 - 11/2020',
      projects: [
        {
          client: 'Faber System',
          description:
            'Sviluppo e manutenzione autonoma di una piattaforma gestionale basata su un’architettura frontend atomica e una libreria di componenti custom. Realizzazione di componenti riutilizzabili, gestione dello stato e logica di business, con attenzione alla coerenza e all’evoluzione delle funzionalità.',
          technologies: ['TypeScript', 'React', 'Redux-Saga', 'SCSS'],
        },
        {
          client: 'Gitto',
          description:
            'Sviluppo e manutenzione autonoma di una piattaforma dinamica per la generazione di contratti personalizzati. Implementazione di flussi configurabili e funzionalità di business, gestione dello stato e aggiornamento dei componenti riutilizzabili, garantendo coerenza e affidabilità nel processo di creazione.',
          technologies: ['TypeScript', 'React', 'Redux-Saga', 'SCSS'],
        },
        {
          client: 'Enigaseluce',
          description:
            'Riprogettazione dei flussi frontend per la sottoscrizione di contratti e sviluppo di interfacce responsive. Integrazione della logica di business e miglioramento della compatibilità cross-browser. Gestione degli ambienti e degli strumenti di progetto, con manutenzione e verifica delle funzionalità.',
          technologies: ['React', 'Redux', 'JavaScript', 'CSS', 'Less', 'Sass', 'SCSS'],
        },
        {
          client: 'Fimelato',
          description:
            'Sviluppo e manutenzione di interfacce web responsive per diversi dispositivi e browser. Realizzazione di componenti UI riutilizzabili e verifica della corretta visualizzazione dei contenuti. Cura della coerenza funzionale e supporto agli aggiornamenti e alla manutenzione delle pagine esistenti.',
          technologies: ['DNN', 'Bootstrap', 'HTML', 'CSS'],
        },
      ],
    },
    {
      company: 'Ant Srl',
      location: 'Milano, IT',
      period: '01/2019 - 04/2019',
      projects: [
        {
          client: 'Java Junior Developer',
          description:
            'Sviluppo e manutenzione di applicazioni Java interne, con implementazione di funzionalità backend e frontend, integrazioni database e correzioni di bug. Acquisizione di esperienza pratica nello sviluppo object-oriented.',
          technologies: [
            'Java',
            'Spring MVC',
            'JDBC',
            'DAO',
            'MVC',
            'design patterns',
            'XML',
            'UML',
            'JPA',
            'JavaScript',
            'jQuery',
            'Ajax',
            'HTML',
            'CSS',
            'MySQL',
            'PHP',
            'Unity',
            'C#',
          ],
        },
      ],
    },
  ],
  en: [
    {
      company: 'Codeway SA',
      location: 'Chiasso, CH',
      period: '09/2022 - 09/2026',
      projects: [
        {
          client: 'Sisal',
          description:
            'Maintained and evolved enterprise online lottery applications across 30+ repositories. Translated business and UI/UX requirements into reusable React components and frontend features, integrated REST APIs, and ensured consistency across codebases. Resolved complex frontend issues and continuously improved the existing platforms.',
          technologies: ['JavaScript', 'React', 'TypeScript', 'CSS', 'SCSS', 'Git', 'Webpack', 'GitHub Copilot CLI'],
        },
        {
          client: 'Gimac',
          description:
            'Defined the frontend architecture and repository structure for a back-office management platform. Owned end-to-end frontend development, building reusable components and business features, integrating REST APIs, and maintaining the application. Managed the work independently from the initial setup through ongoing platform improvements.',
          technologies: ['JavaScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Bip',
          description:
            'Designed the frontend foundation of a management platform for an international law firm. Defined the project structure and developed reusable components and business workflows. Independently delivered the frontend and backend API integrations, supporting the platform from its architectural setup through ongoing evolution.',
          technologies: ['TypeScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Accenture',
          description:
            'Managed the shared component library and integration layer connecting modules of an industrial platform. Developed business features and kept integrations consistent. As Security Champion, handled end-to-end testing and releases across development and test environments, supporting solution quality and security.',
          technologies: [
            'JavaScript',
            'React',
            'React Query',
            'Redux',
            'Axios',
            'Storybook',
            'Azure DevOps',
            'Keycloak',
            'Jest',
            'Cypress',
            'Black Duck',
            'Polaris',
            'Figma',
            'SCSS',
            'Git',
            'Swagger',
          ],
        },
      ],
    },
    {
      company: 'iTuna / WebScience',
      location: 'Milan, IT',
      period: '11/2020 - 09/2022',
      projects: [
        {
          client: 'Fabrick',
          description:
            'Developed and customized reusable frontend components for banking applications. Integrated backend APIs and adapted dynamic UI components to business requirements. Maintained consistency with existing patterns and supported features across the application, including ongoing improvements and maintenance.',
          technologies: ['TypeScript', 'React', 'Less', 'Storybook', 'IntelliJ'],
        },
        {
          client: 'Bugnion',
          description:
            'Developed business features and reusable UI components within a micro-frontend architecture for a patent management platform. Implemented application logic and state management, integrated backend APIs, and maintained consistency across modules while supporting existing functionality.',
          technologies: ['TypeScript', 'React', 'Piral', 'Redux-Saga', 'Tailwind CSS', 'SCSS'],
        },
        {
          client: 'Roche',
          description:
            'Developed interactive frontend features and data visualization for a pharmaceutical presentation platform. Implemented application logic, Excel-based calculations, and dynamic charts. Maintained components and improved how content was presented and accessed throughout the platform.',
          technologies: ['JavaScript', 'jQuery', 'React', 'HTML', 'CSS', 'SCSS', 'Apache ECharts'],
        },
      ],
    },
    {
      company: 'Cathedra Srl',
      location: 'Seregno, IT',
      period: '04/2019 - 11/2020',
      projects: [
        {
          client: 'Faber System',
          description:
            'Independently developed and maintained a management platform built on an atomic frontend architecture and custom component library. Created reusable components, state management, and business logic, while keeping features consistent and supporting the platform’s ongoing evolution.',
          technologies: ['TypeScript', 'React', 'Redux-Saga', 'SCSS'],
        },
        {
          client: 'Gitto',
          description:
            'Independently developed and maintained a dynamic platform for generating customized contracts. Implemented configurable workflows and business features, managed application state, and updated reusable components to keep the contract creation process consistent and reliable.',
          technologies: ['TypeScript', 'React', 'Redux-Saga', 'SCSS'],
        },
        {
          client: 'Enigaseluce',
          description:
            'Redesigned frontend workflows for customer contract subscriptions and developed responsive interfaces. Integrated business logic and improved cross-browser compatibility. Managed development environments and project tooling while maintaining and verifying application features.',
          technologies: ['React', 'Redux', 'JavaScript', 'CSS', 'Less', 'Sass', 'SCSS'],
        },
        {
          client: 'Fimelato',
          description:
            'Developed and maintained responsive web interfaces for different devices. Implemented reusable UI components and verified that content displayed correctly. Ensured consistent functionality across browsers and supported the ongoing improvement of existing pages.',
          technologies: ['DNN', 'Bootstrap', 'HTML', 'CSS'],
        },
      ],
    },
    {
      company: 'Ant Srl',
      location: 'Milan, IT',
      period: '01/2019 - 04/2019',
      projects: [
        {
          client: 'Java Junior Developer',
          description:
            'Developed and maintained internal Java applications, implementing backend and frontend functionality, database integrations, and bug fixes. Gained practical experience with object-oriented development.',
          technologies: [
            'Java',
            'Spring MVC',
            'JDBC',
            'DAO',
            'MVC',
            'design patterns',
            'XML',
            'UML',
            'JPA',
            'JavaScript',
            'jQuery',
            'Ajax',
            'HTML',
            'CSS',
            'MySQL',
            'PHP',
            'Unity',
            'C#',
          ],
        },
      ],
    },
  ],
};

export const skillCategories = skillCategoriesByLanguage.it;
export const professionalExperiences = professionalExperiencesByLanguage.it;

export const getLocalizedSkillCategories = (language: Language) => skillCategoriesByLanguage[language];
export const getLocalizedProfessionalExperiences = (language: Language) => professionalExperiencesByLanguage[language];
