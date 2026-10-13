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
    description: 'Informativa sulla privacy del sito portfolio di Matteo De Rinaldis.',
    updated: 'Ultimo aggiornamento:',
    updatedDate: '13 ottobre 2026',
    intro: 'Questa Privacy Policy spiega come vengono trattati i dati personali quando gli utenti visitano il sito portfolio di Matteo De Rinaldis, disponibile all\'indirizzo https://matteoderinaldis.com.',
    sections: [
      { title: '1. Titolare del trattamento', paragraphs: ['Il titolare del trattamento è:', 'Matteo De Rinaldis|Email: matteo_derinaldis@libero.it'] },
      { title: '2. Dati trattati', subsections: [
        {
          title: 'Dati forniti volontariamente',
          paragraphs: [
            'Il modulo di contatto consente agli utenti di inserire nome, indirizzo email e messaggio.',
            'Le richieste inviate tramite il modulo vengono trasmesse in HTTPS a Web3Forms, un servizio di elaborazione dati terzo utilizzato per inoltrare i messaggi alla casella di posta del titolare.',
            'Web3Forms agisce come data processor per le richieste del modulo e può elaborare e conservare i dati trasmessi in base alle proprie impostazioni di archiviazione e alla relativa privacy policy.',
            'La privacy policy di Web3Forms è disponibile all\'indirizzo: https://web3forms.com/privacy'
          ]
        },
        {
          title: 'Dati tecnici',
          paragraphs: [
            'Il sito è ospitato da Netlify.',
            'Quando gli utenti accedono al sito, Netlify può trattare informazioni tecniche necessarie per erogare, gestire, proteggere e monitorare il servizio. Tra queste possono rientrare l\'indirizzo IP, le informazioni sul browser e sul dispositivo, gli URL richiesti e la data e l\'ora delle richieste.',
            'Il titolare del sito non utilizza questi dati tecnici per finalità pubblicitarie o di profilazione.',
            'Ulteriori informazioni sulle pratiche di trattamento di Netlify sono disponibili nella privacy policy di Netlify: https://www.netlify.com/privacy/'
          ]
        },
        {
          title: 'Preferenze locali',
          paragraphs: ['Il sito utilizza il localStorage del browser solo per salvare:', 'Queste informazioni rimangono sul dispositivo dell\'utente e non vengono usate dal titolare del sito per identificare o tracciare gli utenti.'],
          list: ['la lingua preferita;', 'la modalità di visualizzazione chiara o scura.']
        }
      ] },
      { title: '3. Cookie, analytics e tracking', paragraphs: ['Il sito non utilizza sistemi pubblicitari, tecnologie di profilazione, pixel di tracciamento o fingerprinting.', 'Il sito non utilizza attualmente strumenti di analytics di terze parti per il tracciamento dei visitatori.', 'Il localStorage viene impiegato soltanto per memorizzare preferenze di lingua e display e non viene utilizzato per finalità pubblicitarie o di profilazione.', 'I provider di infrastrutture di terze parti possono comunque trattare informazioni tecniche necessarie al funzionamento e alla sicurezza dei propri servizi, secondo le proprie policy privacy.'] },
      { title: '4. Finalità e base giuridica', paragraphs: ['I dati personali trasmessi volontariamente tramite il modulo di contatto sono trattati per:', 'Il trattamento si basa, a seconda delle circostanze e della normativa applicabile, sulla richiesta volontaria dell\'utente, sul consenso ove applicabile e/o sul legittimo interesse nel gestione e protezione del sito e nella risposta alle comunicazioni.'], list: ['permettere agli utenti di contattare il titolare;', 'rispondere alle richieste e ai messaggi ricevuti;', 'gestire le comunicazioni avviate dagli utenti.'] },
      { title: '5. Conservazione dei dati', paragraphs: ['Le richieste inviate tramite il modulo possono essere conservate da Web3Forms in base al periodo di conservazione configurato dal servizio e alla relativa policy.', 'I messaggi ricevuti dal titolare possono essere conservati nella sua casella email per il tempo ragionevolmente necessario a rispondere alla richiesta e gestire le comunicazioni correlate, salvo obblighi di legge applicabili.', 'Le preferenze memorizzate in localStorage rimangono sul dispositivo dell\'utente finché non vengono eliminate dall\'utente, sovrascritte dal sito o rimossi i dati locali del browser.', 'I dati tecnici e i log elaborati da provider di hosting e infrastrutture sono conservati in base alle policy e alle configurazioni dei rispettivi fornitori.'] },
      { title: '6. Servizi esterni e destinatari', paragraphs: ['Il sito utilizza i seguenti servizi esterni:', 'Netlify: hosting, distribuzione contenuti, DNS e infrastruttura HTTPS. Privacy: https://www.netlify.com/privacy/', 'Web3Forms: elaborazione e inoltro delle richieste del modulo di contatto. Privacy: https://web3forms.com/privacy', 'Il sito contiene inoltre link a siti e servizi esterni, inclusi GitHub e LinkedIn. Quando un utente apre un link esterno, lascia questo sito e il trattamento dei dati personali è disciplinato dal servizio esterno rispettivo.'] },
      { title: '7. Trasferimenti internazionali', paragraphs: ['Alcuni fornitori di servizi utilizzati dal sito possono trattare dati personali fuori dalla Svizzera o dal Paese di residenza dell\'utente.', 'Quando applicabile, tali trasferimenti sono gestiti dal rispettivo fornitore con le misure di sicurezza richieste dalla normativa applicabile in materia di protezione dei dati.'] },
      { title: '8. Diritti dell\'utente', paragraphs: ['Nei casi previsti dalla normativa applicabile, gli utenti possono esercitare diritti quali accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità dei dati.', 'Per esercitare questi diritti riguardo ai dati personali trattati dal titolare, gli utenti possono contattare:', 'matteo_derinaldis@libero.it', 'Gli utenti possono inoltre avere diritto a presentare reclamo all\'autorità competente per la protezione dei dati personali.'] },
      { title: '9. Modifiche alla Privacy Policy', paragraphs: ['La Privacy Policy può essere aggiornata quando il sito, i suoi servizi, i fornitori di terze parti o i requisiti legali applicabili cambiano.', 'La versione aggiornata sarà pubblicata su questa pagina insieme alla nuova data di "Ultimo aggiornamento".'] },
      { title: '10. Contatti', paragraphs: ['Per domande riguardanti questa Privacy Policy o il trattamento dei dati personali tramite questo sito, contattare:', 'Matteo De Rinaldis|matteo_derinaldis@libero.it'] },
    ],
  },
  en: {
    description: 'Privacy information for the Matteo De Rinaldis portfolio website.',
    updated: 'Last updated:',
    updatedDate: '13 October 2026',
    intro: 'This Privacy Policy explains how personal data is handled when users visit the portfolio website of Matteo De Rinaldis, available at https://matteoderinaldis.com.',
    sections: [
      { title: '1. Data controller', paragraphs: ['The data controller is:', 'Matteo De Rinaldis|Email: matteo_derinaldis@libero.it'] },
      { title: '2. Data processed', subsections: [
        {
          title: 'Data provided voluntarily',
          paragraphs: [
            'The contact form allows users to provide their name, email address and message.',
            'Form submissions are transmitted over HTTPS to Web3Forms, a third-party form processing service used to forward messages to the controller\'s email inbox.',
            'Web3Forms acts as a data processor for form submissions and may process and store submitted data according to its applicable retention settings and privacy policy.',
            'Web3Forms\' privacy policy is available at: https://web3forms.com/privacy'
          ]
        },
        {
          title: 'Technical data',
          paragraphs: [
            'The website is hosted by Netlify.',
            'When users access the website, Netlify may process technical information required to deliver, operate, secure and monitor the service. This may include information such as IP address, browser and device information, requested URLs, and date and time of requests.',
            'The website owner does not use this technical data for advertising or profiling purposes.',
            'Further information about Netlify\'s data processing practices is available in Netlify\'s privacy policy: https://www.netlify.com/privacy/'
          ]
        },
        {
          title: 'Local preferences',
          paragraphs: ['The website uses browser localStorage only to save:', 'This information remains on the user\'s device and is not used by the website owner to identify or track users.'],
          list: ['the preferred language;', 'the light or dark display mode.']
        }
      ] },
      { title: '3. Cookies, analytics and tracking', paragraphs: ['The website does not use advertising systems, profiling technologies, tracking pixels or fingerprinting technologies.', 'The website owner does not currently use third-party analytics tools for visitor tracking.', 'Browser localStorage is used only to store language and display preferences and is not used for advertising or profiling.', 'Third-party infrastructure providers may process technical information necessary to operate and secure their services in accordance with their own privacy policies.'] },
      { title: '4. Purposes and legal basis', paragraphs: ['Personal data voluntarily submitted through the contact form is processed for the purpose of:', 'Depending on the circumstances and applicable law, processing may be based on the user\'s voluntary request, consent where applicable, and/or the legitimate interest in operating and securing the website and responding to communications.'], list: ['allowing users to contact the controller;', 'responding to requests and messages;', 'managing communications initiated by users.'] },
      { title: '5. Data retention', paragraphs: ['Form submissions may be retained by Web3Forms according to the retention period configured for the service and its applicable data retention policy.', 'Messages received by the controller may be retained in the controller\'s email inbox for as long as reasonably necessary to respond to the request and manage related communications, subject to applicable legal requirements.', 'Preferences stored in localStorage remain on the user\'s device until they are deleted by the user, overwritten by the website, or the website\'s local data is removed from the browser.', 'Technical data and logs processed by hosting and infrastructure providers are retained according to the respective providers\' policies and service configurations.'] },
      { title: '6. External services and recipients', paragraphs: ['The website uses the following external services:', 'Netlify: hosting, content delivery, DNS and HTTPS infrastructure. Privacy information: https://www.netlify.com/privacy/', 'Web3Forms: processing and forwarding of contact form submissions. Privacy information: https://web3forms.com/privacy', 'The website also contains links to external websites and services, including GitHub and LinkedIn. When users follow an external link, they leave this website and the processing of personal data is governed by the respective external service.'] },
      { title: '7. International data transfers', paragraphs: ['Some service providers used by the website may process personal data outside Switzerland or the user\'s country of residence.', 'Where applicable, such transfers are handled by the relevant service provider using appropriate safeguards required by applicable data protection law.'] },
      { title: '8. User rights', paragraphs: ['Where provided by applicable data protection law, users may have rights including access, rectification, erasure, restriction of processing, objection and data portability.', 'To exercise these rights regarding personal data processed by the controller, users may contact:', 'matteo_derinaldis@libero.it', 'Users may also have the right to lodge a complaint with the competent data protection supervisory authority.'] },
      { title: '9. Changes to this Privacy Policy', paragraphs: ['This Privacy Policy may be updated when the website, its services, third-party providers or applicable legal requirements change.', 'The updated version will be published on this page together with the revised "Last updated" date.'] },
      { title: '10. Contact', paragraphs: ['For questions regarding this Privacy Policy or the processing of personal data through this website, please contact:', 'Matteo De Rinaldis|matteo_derinaldis@libero.it'] },
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
