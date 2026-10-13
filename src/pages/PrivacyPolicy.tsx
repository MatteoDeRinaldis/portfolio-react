import React, { FC } from 'react';
import { motion } from 'motion/react';
import { FiLock } from 'react-icons/fi';
import { PageDescription, PageTitle } from '../components/PageLayout';
import { useTranslation } from '../i18n';
import { PrivacyPageWrapper, PrivacyBackgroundIcon, PrivacyPageContent, PrivacySection, PrivacySubsection, PrivacyMeta, PrivacyList, PrivacyContact } from './PrivacyPolicy.styles';

type PrivacyCopy = {
  description: string;
  updated: string;
  updatedDate: string;
  intro: string;
  sections: Array<{ title: string; paragraphs?: string[]; subsections?: Array<{ title: string; paragraphs: string[]; list?: string[] }>; list?: string[] }>;
};

const privacyCopy: Record<'it' | 'en', PrivacyCopy> = {
  it: {
    description:
      'Informativa sul trattamento dei dati personali del portfolio di Matteo De Rinaldis.',
    updated: 'Ultimo aggiornamento:',
    updatedDate: '13 ottobre 2026',
    intro:
      'La presente Privacy Policy descrive come vengono trattati i dati personali degli utenti che visitano il sito portfolio di Matteo De Rinaldis, disponibile all’indirizzo https://matteoderinaldis.com.',

    sections: [
      {
        title: '1. Titolare del trattamento',
        paragraphs: [
          'Il titolare del trattamento dei dati personali è:',
          'Matteo De Rinaldis|Email: matteo_derinaldis@libero.it',
        ],
      },

      {
        title: '2. Dati trattati',
        subsections: [
          {
            title: 'Dati forniti volontariamente',
            paragraphs: [
              'Il modulo di contatto consente agli utenti di fornire volontariamente il proprio nome, indirizzo email e un messaggio.',
              'I dati inseriti nel modulo vengono trasmessi tramite connessione HTTPS a Web3Forms, servizio esterno utilizzato per elaborare la richiesta e inoltrare il messaggio alla casella email del titolare.',
              'Web3Forms tratta i dati trasmessi tramite il modulo in qualità di fornitore del servizio e può conservarli secondo le proprie impostazioni di conservazione e la propria Privacy Policy.',
              'Ulteriori informazioni sono disponibili nella Privacy Policy di Web3Forms: https://web3forms.com/privacy',
            ],
          },

          {
            title: 'Dati tecnici',
            paragraphs: [
              'Il sito è ospitato e distribuito tramite Netlify.',
              'Durante la navigazione, Netlify può trattare i dati tecnici necessari per fornire, proteggere e mantenere il servizio. Tali dati possono includere, ad esempio, l’indirizzo IP, informazioni sul browser e sul dispositivo, gli URL richiesti e la data e l’ora delle richieste.',
              'Il titolare del sito non utilizza tali informazioni per finalità pubblicitarie o di profilazione.',
              'Ulteriori informazioni sono disponibili nella Privacy Policy di Netlify: https://www.netlify.com/privacy/',
            ],
          },

          {
            title: 'Preferenze locali',
            paragraphs: [
              'Il sito utilizza il localStorage del browser esclusivamente per memorizzare alcune preferenze dell’utente:',
              'Queste informazioni rimangono memorizzate sul dispositivo dell’utente e non vengono utilizzate per identificarlo, profilarlo o tracciarne l’attività.',
            ],
            list: [
              'la lingua preferita;',
              'la modalità di visualizzazione chiara o scura.',
            ],
          },
        ],
      },

      {
        title: '3. Analytics e tecnologie di archiviazione locale',
        paragraphs: [
          'Il sito utilizza Cloudflare Web Analytics per ottenere statistiche aggregate sull’utilizzo del portfolio e informazioni sulle prestazioni delle pagine.',
          'Cloudflare Web Analytics è progettato per fornire statistiche senza utilizzare cookie, localStorage o altre tecnologie destinate a identificare o seguire individualmente i visitatori.',
          'Il sito non utilizza sistemi pubblicitari, cookie di profilazione, fingerprinting o tecnologie analoghe per creare profili degli utenti.',
          'Il localStorage utilizzato dal sito serve esclusivamente a memorizzare le preferenze relative alla lingua e alla modalità di visualizzazione.',
          'Ulteriori informazioni su Cloudflare Web Analytics e sul trattamento dei dati da parte di Cloudflare sono disponibili all’indirizzo: https://www.cloudflare.com/privacypolicy/',
        ],
      },

      {
        title: '4. Finalità e base giuridica',
        paragraphs: [
          'I dati personali forniti volontariamente tramite il modulo di contatto sono trattati per le seguenti finalità:',
          'I dati tecnici e le informazioni aggregate relative all’utilizzo del sito possono inoltre essere trattati per garantirne il corretto funzionamento, la sicurezza e il monitoraggio delle prestazioni.',
          'A seconda delle circostanze e della normativa applicabile, il trattamento può basarsi sulla richiesta volontaria dell’utente, sul consenso ove richiesto e/o sul legittimo interesse del titolare a gestire e proteggere il sito e a rispondere alle comunicazioni ricevute.',
        ],
        list: [
          'consentire agli utenti di contattare il titolare;',
          'rispondere alle richieste e ai messaggi ricevuti;',
          'gestire le comunicazioni avviate dagli utenti.',
        ],
      },

      {
        title: '5. Conservazione dei dati',
        paragraphs: [
          'I dati inviati tramite il modulo di contatto possono essere conservati da Web3Forms secondo il periodo di conservazione previsto o configurato per il servizio e in conformità alla relativa Privacy Policy.',
          'I messaggi ricevuti dal titolare possono essere conservati nella relativa casella email per il tempo ragionevolmente necessario a gestire la richiesta e le eventuali comunicazioni successive, fatti salvi eventuali obblighi di legge.',
          'Le preferenze salvate nel localStorage rimangono sul dispositivo dell’utente finché non vengono eliminate, sovrascritte dal sito oppure rimossi i dati del sito dal browser.',
          'I dati tecnici eventualmente trattati dai fornitori di hosting, infrastruttura e analytics sono conservati secondo le rispettive policy e configurazioni del servizio.',
        ],
      },

      {
        title: '6. Servizi esterni e destinatari',
        paragraphs: [
          'Per il funzionamento del sito vengono utilizzati i seguenti servizi esterni:',
          'Netlify: hosting, distribuzione dei contenuti, DNS e infrastruttura HTTPS. Privacy Policy: https://www.netlify.com/privacy/',
          'Web3Forms: elaborazione e inoltro dei messaggi inviati tramite il modulo di contatto. Privacy Policy: https://web3forms.com/privacy',
          'Cloudflare Web Analytics: statistiche aggregate sull’utilizzo del sito e monitoraggio delle prestazioni. Privacy Policy: https://www.cloudflare.com/privacypolicy/',
          'Il sito contiene inoltre collegamenti a servizi esterni, tra cui GitHub e LinkedIn. Quando l’utente segue uno di questi collegamenti lascia il presente sito; l’eventuale trattamento dei dati è pertanto disciplinato dalle condizioni e dalle Privacy Policy del rispettivo servizio.',
        ],
      },

      {
        title: '7. Trasferimenti internazionali di dati',
        paragraphs: [
          'Alcuni dei fornitori utilizzati dal sito possono trattare dati in Paesi diversi dalla Svizzera o dal Paese di residenza dell’utente.',
          'Quando previsto dalla normativa applicabile, tali trasferimenti vengono effettuati dai rispettivi fornitori adottando le garanzie previste dalla legislazione in materia di protezione dei dati.',
        ],
      },

      {
        title: '8. Diritti degli utenti',
        paragraphs: [
          'Nei casi previsti dalla normativa applicabile, gli utenti possono esercitare i diritti riconosciuti in materia di protezione dei dati personali, tra cui accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e, ove applicabile, portabilità dei dati.',
          'Per richieste relative ai dati personali trattati direttamente dal titolare è possibile contattare:',
          'matteo_derinaldis@libero.it',
          'Gli utenti possono inoltre rivolgersi all’autorità competente in materia di protezione dei dati personali, nei casi previsti dalla normativa applicabile.',
        ],
      },

      {
        title: '9. Modifiche alla Privacy Policy',
        paragraphs: [
          'La presente Privacy Policy può essere aggiornata in seguito a modifiche del sito, dei servizi utilizzati o della normativa applicabile.',
          'La versione aggiornata sarà pubblicata su questa pagina indicando la relativa data di ultimo aggiornamento.',
        ],
      },

      {
        title: '10. Contatti',
        paragraphs: [
          'Per domande relative alla presente Privacy Policy o al trattamento dei dati personali attraverso questo sito è possibile contattare:',
          'Matteo De Rinaldis|matteo_derinaldis@libero.it',
        ],
      },
    ],
  },

  en: {
    description:
      'Privacy information for the portfolio website of Matteo De Rinaldis.',
    updated: 'Last updated:',
    updatedDate: '13 October 2026',
    intro:
      'This Privacy Policy describes how personal data is handled when users visit the portfolio website of Matteo De Rinaldis, available at https://matteoderinaldis.com.',

    sections: [
      {
        title: '1. Data controller',
        paragraphs: [
          'The controller responsible for the processing of personal data is:',
          'Matteo De Rinaldis|Email: matteo_derinaldis@libero.it',
        ],
      },

      {
        title: '2. Data processed',
        subsections: [
          {
            title: 'Data provided voluntarily',
            paragraphs: [
              'The contact form allows users to voluntarily provide their name, email address and a message.',
              'Information submitted through the form is transmitted over HTTPS to Web3Forms, an external service used to process the request and forward the message to the controller’s email inbox.',
              'Web3Forms processes information submitted through the form as a service provider and may retain it according to its retention settings and Privacy Policy.',
              'Further information is available in the Web3Forms Privacy Policy: https://web3forms.com/privacy',
            ],
          },

          {
            title: 'Technical data',
            paragraphs: [
              'The website is hosted and delivered through Netlify.',
              'When users access the website, Netlify may process technical information necessary to provide, secure and maintain the service. This may include, for example, IP addresses, browser and device information, requested URLs, and the date and time of requests.',
              'The website owner does not use this information for advertising or profiling purposes.',
              'Further information is available in the Netlify Privacy Policy: https://www.netlify.com/privacy/',
            ],
          },

          {
            title: 'Local preferences',
            paragraphs: [
              'The website uses browser localStorage exclusively to store certain user preferences:',
              'This information remains stored on the user’s device and is not used to identify, profile or track individual users.',
            ],
            list: [
              'preferred language;',
              'light or dark display mode.',
            ],
          },
        ],
      },

      {
        title: '3. Analytics and local storage technologies',
        paragraphs: [
          'The website uses Cloudflare Web Analytics to obtain aggregated information about the use of the portfolio and the performance of its pages.',
          'Cloudflare Web Analytics is designed to provide website statistics without using cookies, localStorage or other technologies intended to identify or individually track visitors.',
          'The website does not use advertising systems, profiling cookies, fingerprinting or similar technologies to create user profiles.',
          'Browser localStorage is used exclusively to store language and display preferences.',
          'Further information about Cloudflare Web Analytics and Cloudflare’s data processing practices is available at: https://www.cloudflare.com/privacypolicy/',
        ],
      },

      {
        title: '4. Purposes and legal basis',
        paragraphs: [
          'Personal data voluntarily provided through the contact form is processed for the following purposes:',
          'Technical data and aggregated information relating to website usage may also be processed to ensure the proper operation and security of the website and to monitor its performance.',
          'Depending on the circumstances and applicable law, processing may be based on the user’s voluntary request, consent where required and/or the controller’s legitimate interest in operating and securing the website and responding to communications.',
        ],
        list: [
          'allowing users to contact the controller;',
          'responding to requests and messages;',
          'managing communications initiated by users.',
        ],
      },

      {
        title: '5. Data retention',
        paragraphs: [
          'Information submitted through the contact form may be retained by Web3Forms according to the retention period provided or configured for the service and in accordance with its Privacy Policy.',
          'Messages received by the controller may be retained in the controller’s email inbox for as long as reasonably necessary to handle the request and any related communications, subject to applicable legal requirements.',
          'Preferences stored in localStorage remain on the user’s device until they are deleted, overwritten by the website or the website’s local data is removed from the browser.',
          'Technical information processed by hosting, infrastructure and analytics providers is retained according to their respective policies and service configurations.',
        ],
      },

      {
        title: '6. External services and recipients',
        paragraphs: [
          'The website uses the following external services:',
          'Netlify: hosting, content delivery, DNS and HTTPS infrastructure. Privacy Policy: https://www.netlify.com/privacy/',
          'Web3Forms: processing and forwarding of messages submitted through the contact form. Privacy Policy: https://web3forms.com/privacy',
          'Cloudflare Web Analytics: aggregated website usage statistics and performance monitoring. Privacy Policy: https://www.cloudflare.com/privacypolicy/',
          'The website also contains links to external services, including GitHub and LinkedIn. When users follow one of these links, they leave this website and any subsequent processing of personal data is governed by the terms and Privacy Policy of the respective service.',
        ],
      },

      {
        title: '7. International data transfers',
        paragraphs: [
          'Some service providers used by the website may process data in countries other than Switzerland or the user’s country of residence.',
          'Where required by applicable law, such transfers are carried out by the relevant providers using the safeguards required under applicable data protection legislation.',
        ],
      },

      {
        title: '8. User rights',
        paragraphs: [
          'Where provided by applicable law, users may exercise data protection rights including access, rectification, erasure, restriction of processing, objection and, where applicable, data portability.',
          'For requests concerning personal data processed directly by the controller, users may contact:',
          'matteo_derinaldis@libero.it',
          'Users may also contact the competent data protection supervisory authority where provided by applicable law.',
        ],
      },

      {
        title: '9. Changes to this Privacy Policy',
        paragraphs: [
          'This Privacy Policy may be updated following changes to the website, the services used or applicable legal requirements.',
          'The updated version will be published on this page together with its revised last updated date.',
        ],
      },

      {
        title: '10. Contact',
        paragraphs: [
          'For questions concerning this Privacy Policy or the processing of personal data through this website, please contact:',
          'Matteo De Rinaldis|matteo_derinaldis@libero.it',
        ],
      },
    ],
  },
};

export const PrivacyPolicy: FC = () => {
  const { language } = useTranslation();
  const copy = privacyCopy[language];

  return (
  <PrivacyPageWrapper>
    <PageTitle
      as={motion.h2}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
    >
      Privacy Policy
    </PageTitle>
    <PageDescription
      as={motion.p}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
    >
      {copy.description}
    </PageDescription>

    <PrivacyPageContent as={motion.article} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}>
      <PrivacyMeta><strong>{copy.updated}</strong> {copy.updatedDate}</PrivacyMeta>
      <p>{copy.intro}</p>
      {copy.sections.map((section) => (
        <PrivacySection key={section.title}>
          <h3>{section.title}</h3>
          {section.paragraphs?.map((paragraph) => paragraph.includes('|') ? <PrivacyContact key={paragraph}>{paragraph.split('|').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</PrivacyContact> : <p key={paragraph}>{paragraph}</p>)}
          {section.subsections?.map((subsection) => <PrivacySubsection key={subsection.title}><h4>{subsection.title}</h4>{subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{subsection.list ? <PrivacyList>{subsection.list.map((item) => <li key={item}>{item}</li>)}</PrivacyList> : null}</PrivacySubsection>)}
          {section.list ? <PrivacyList>{section.list.map((item) => <li key={item}>{item}</li>)}</PrivacyList> : null}
        </PrivacySection>
      ))}
    </PrivacyPageContent>
    <PrivacyBackgroundIcon
      as={motion.div}
      aria-hidden="true"
      initial={{ opacity: 0, x: 320, rotate: -25 }}
      animate={{ opacity: 0.16, x: 0, rotate: -25 }}
      transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
    >
      <FiLock />
    </PrivacyBackgroundIcon>
  </PrivacyPageWrapper>
  );
};
