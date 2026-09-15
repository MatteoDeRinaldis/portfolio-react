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
      items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS / SCSS / LESS', 'Redux', 'Axios'],
    },
    {
      title: 'Sviluppo Mobile',
      icon: 'mobile',
      items: ['React Native', 'Expo', 'Sviluppo Cross-platform'],
    },
    {
      title: 'UI & Design',
      icon: 'ui',
      items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Ant Design', 'Storybook', 'PixiJS', 'Figma', 'Zeplin', 'InVision'],
    },
    {
      title: 'Strumenti di Sviluppo',
      icon: 'tools',
      items: ['Webpack', 'npm / yarn', 'Git', 'GitHub', 'BrowserStack', 'GitHub Copilot CLI'],
    },
    {
      title: 'DevOps e Collaborazione',
      icon: 'devops',
      items: ['Azure DevOps', 'Bitbucket', 'Pipeline CI/CD', 'Jira', 'Confluence', 'ServiceNow'],
    },
    {
      title: 'Testing e Qualità',
      icon: 'testing',
      items: ['Jest', 'Cypress', 'SonarQube', 'SonarCloud', 'Black Duck', 'Veracode'],
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
      items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS / SCSS / LESS', 'Redux', 'Axios'],
    },
    {
      title: 'Mobile Development',
      icon: 'mobile',
      items: ['React Native', 'Expo', 'Cross-platform Development'],
    },
    {
      title: 'UI & Design',
      icon: 'ui',
      items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Ant Design', 'Storybook', 'PixiJS', 'Figma', 'Zeplin', 'InVision'],
    },
    {
      title: 'Development Tools',
      icon: 'tools',
      items: ['Webpack', 'npm / yarn', 'Git', 'GitHub', 'BrowserStack', 'GitHub Copilot CLI'],
    },
    {
      title: 'DevOps & Collaboration',
      icon: 'devops',
      items: ['Azure DevOps', 'Bitbucket', 'CI/CD Pipelines', 'Jira', 'Confluence', 'ServiceNow'],
    },
    {
      title: 'Testing & Quality',
      icon: 'testing',
      items: ['Jest', 'Cypress', 'SonarQube', 'SonarCloud', 'Black Duck', 'Veracode'],
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
      period: '09/2022 - in corso',
      projects: [
        {
          client: 'Sisal',
          description:
            'Sviluppo di nuove feature e bug fix per applicazioni di lotteria online su oltre 30 repository. Analisi e implementazione dei requisiti UX/UI, sviluppo di componenti riutilizzabili e integrazione di REST API.',
          technologies: ['JavaScript', 'React', 'TypeScript', 'CSS', 'SCSS', 'Git', 'Webpack', 'GitHub Copilot CLI'],
        },
        {
          client: 'Gimac',
          description:
            'Implementazione della repository e dell’architettura del back office. Sviluppo di feature funzionali e grafiche, bug fixing e integrazione API REST con ownership indipendente della piattaforma.',
          technologies: ['JavaScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Bip',
          description:
            'Analisi, design e implementazione della repository e dell’architettura core di una piattaforma gestionale web per uno studio legale internazionale. Sviluppo di feature funzionali e UI, bug fixing e integrazione REST API.',
          technologies: ['TypeScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Accenture',
          description:
            'Sviluppo di nuove feature e bug fix per una piattaforma di gestione industriale. Ownership della shared component library e dell’area di integrazione del core. Ruolo di Security Champion. Gestione end-to-end di test e release.',
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
      company: 'WebScience',
      location: 'Milano, IT',
      period: '07/2022 - 09/2022',
      projects: [
        {
          client: 'Fabrick',
          description:
            'Sviluppo di componenti UI e integrazioni grafiche per il settore bancario, bug fixing, integrazione di endpoint backend e personalizzazione di componenti dinamici riutilizzabili.',
          technologies: ['TypeScript', 'React', 'Less', 'Storybook', 'IntelliJ'],
        },
      ],
    },
    {
      company: 'iTuna',
      location: 'Milano, IT',
      period: '11/2020 - 06/2022',
      projects: [
        {
          client: 'Fabrick',
          description:
            'Sviluppo di componenti UI e integrazioni grafiche per il settore bancario, bug fixing e realizzazione di componenti dinamici riutilizzabili.',
          technologies: ['TypeScript', 'React', 'Less', 'Storybook', 'IntelliJ'],
        },
        {
          client: 'Bugnion',
          description:
            'Miglioramento e implementazione di logica e UI per una piattaforma di gestione brevetti basata su architettura micro-frontend con integrazione API backend.',
          technologies: ['TypeScript', 'React', 'Piral App', 'Redux Saga', 'Tailwind', 'SCSS'],
        },
        {
          client: 'Roche',
          description:
            'Sviluppo e manutenzione di una piattaforma per presentazioni farmaceutiche, inclusi calcoli Excel e integrazione di grafici interattivi.',
          technologies: ['JavaScript', 'jQuery', 'React', 'HTML', 'CSS', 'SCSS', 'eCharts'],
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
            'Sviluppo indipendente e manutenzione di una piattaforma gestionale basata su architettura frontend atomica con component library custom.',
          technologies: ['TypeScript', 'React', 'Redux Saga', 'SCSS'],
        },
        {
          client: 'Gitto',
          description:
            'Sviluppo indipendente e manutenzione di un generatore dinamico per contratti legali personalizzati.',
          technologies: ['TypeScript', 'React', 'Redux Saga', 'SCSS'],
        },
        {
          client: 'Enigaseluce',
          description:
            'Redesign e implementazione di UI e business logic per workflow di sottoscrizione contratti. Gestione ambienti di sviluppo e strumenti di project management. Ottimizzazione responsive e cross-browser.',
          technologies: ['React', 'Redux', 'JavaScript', 'CSS', 'LESS', 'SASS', 'SCSS'],
        },
        {
          client: 'Fimelato',
          description: 'Sviluppo e manutenzione di pagine web con forte attenzione all’ottimizzazione responsive.',
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
          description: 'Sviluppo di progetti software interni e manutenzione degli strumenti di sviluppo.',
          technologies: [
            'Java Spring MVC/JDBC',
            'DAO',
            'MVC',
            'XML',
            'UML',
            'JPA',
            'JavaScript',
            'JQuery',
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
    {
      company: 'Private Tutor',
      location: 'Milano, IT',
      period: '2007 - 2017',
      projects: [
        {
          client: 'Lezioni private',
          description: 'Lezioni private di matematica e fisica per studenti delle scuole superiori e del primo anno universitario.',
          technologies: ['Matematica', 'Fisica', 'Didattica'],
        },
      ],
    },
  ],
  en: [
    {
      company: 'Codeway SA',
      location: 'Chiasso, CH',
      period: '09/2022 - present',
      projects: [
        {
          client: 'Sisal',
          description:
            'Development of new features and bug fixes for online lottery applications across more than 30 repositories. Review, analysis and implementation of UI/UX requirements, reusable UI components, and REST API integration.',
          technologies: ['JavaScript', 'React', 'TypeScript', 'CSS', 'SCSS', 'Git', 'Webpack', 'GitHub Copilot CLI'],
        },
        {
          client: 'Gimac',
          description:
            'Implementation of the project repository and back-office architecture. Development of functional and UI features, bug fixing, and REST API integration with independent ownership of the platform.',
          technologies: ['JavaScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Bip',
          description:
            'Analysis, design and implementation of the repository and core architecture for a web-based management platform for an international law firm. Development of functional and UI features, bug fixing and REST API integration.',
          technologies: ['TypeScript', 'React', 'Axios', 'SCSS', 'Git'],
        },
        {
          client: 'Accenture',
          description:
            'Development of new features and bug fixes for an industrial manufacturing management platform. Ownership of the shared component library and the application core integration area. Security Champion role and end-to-end testing and releases.',
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
      company: 'WebScience',
      location: 'Milan, IT',
      period: '07/2022 - 09/2022',
      projects: [
        {
          client: 'Fabrick',
          description:
            'Development of UI components and graphical integrations for the banking sector, bug fixing, backend endpoint integration, and customization of reusable dynamic components.',
          technologies: ['TypeScript', 'React', 'Less', 'Storybook', 'IntelliJ'],
        },
      ],
    },
    {
      company: 'iTuna',
      location: 'Milan, IT',
      period: '11/2020 - 06/2022',
      projects: [
        {
          client: 'Fabrick',
          description:
            'Development of UI components and graphical integrations for the banking sector, bug fixing, and implementation of reusable dynamic components.',
          technologies: ['TypeScript', 'React', 'Less', 'Storybook', 'IntelliJ'],
        },
        {
          client: 'Bugnion',
          description:
            'Enhancement and implementation of UI and business logic for a patent management platform based on a micro-frontend architecture, including backend API integration.',
          technologies: ['TypeScript', 'React', 'Piral App', 'Redux Saga', 'Tailwind', 'SCSS'],
        },
        {
          client: 'Roche',
          description:
            'Development and maintenance of a pharmaceutical slide presentation platform, including Excel-based calculations and interactive chart integration.',
          technologies: ['JavaScript', 'jQuery', 'React', 'HTML', 'CSS', 'SCSS', 'eCharts'],
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
            'Independent development and maintenance of a management platform built on an atomic frontend architecture with a custom component library.',
          technologies: ['TypeScript', 'React', 'Redux Saga', 'SCSS'],
        },
        {
          client: 'Gitto',
          description:
            'Independent development and maintenance of a dynamic generator for customized legal contracts.',
          technologies: ['TypeScript', 'React', 'Redux Saga', 'SCSS'],
        },
        {
          client: 'Enigaseluce',
          description:
            'Redesign and implementation of UI and business logic for customer contract subscription workflows. Management of development environments and project management tools. Cross-browser responsive optimization and frontend business flow implementation.',
          technologies: ['React', 'Redux', 'JavaScript', 'CSS', 'LESS', 'SASS', 'SCSS'],
        },
        {
          client: 'Fimelato',
          description: 'Development and maintenance of web pages with a strong focus on responsive design optimization.',
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
          description: 'Development of internal software projects and maintenance of development tools.',
          technologies: [
            'Java Spring MVC/JDBC',
            'DAO',
            'MVC',
            'XML',
            'UML',
            'JPA',
            'JavaScript',
            'JQuery',
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
    {
      company: 'Private Tutor',
      location: 'Milan, IT',
      period: '2007 - 2017',
      projects: [
        {
          client: 'Private lessons',
          description: 'Private lessons in mathematics and physics for high school and first-year university students.',
          technologies: ['Mathematics', 'Physics', 'Teaching'],
        },
      ],
    },
  ],
};

export const skillCategories = skillCategoriesByLanguage.it;
export const professionalExperiences = professionalExperiencesByLanguage.it;

export const getLocalizedSkillCategories = (language: Language) => skillCategoriesByLanguage[language];
export const getLocalizedProfessionalExperiences = (language: Language) => professionalExperiencesByLanguage[language];
