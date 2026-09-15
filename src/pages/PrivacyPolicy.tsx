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
    description: 'Informativa sul trattamento dei dati personali del portfolio di Matteo De Rinaldis.',
    updated: 'Ultimo aggiornamento:',
    updatedDate: '8 settembre 2026',
    intro: 'Questa Privacy Policy descrive come vengono trattati i dati personali degli utenti che visitano il sito portfolio di Matteo De Rinaldis, disponibile all’indirizzo [URL del sito da configurare].',
    sections: [
      { title: '1. Titolare del trattamento', paragraphs: ['Il titolare del trattamento è:', 'Matteo De Rinaldis|Email: matteo_derinaldis@libero.it'] },
      { title: '2. Dati trattati', subsections: [
        { title: 'Dati forniti volontariamente', paragraphs: ['Il modulo di contatto trasmette nome, indirizzo email e messaggio al servizio esterno Web3Forms tramite HTTPS, per inoltrare la richiesta alla casella email del titolare.', 'Web3Forms tratta e conserva le richieste secondo le proprie impostazioni di conservazione e la propria informativa, disponibile su https://web3forms.com/privacy. Il programma di posta del visitatore non viene utilizzato per l’invio.'] },
        { title: 'Dati tecnici', paragraphs: ['Durante la navigazione, il servizio di hosting potrebbe trattare dati tecnici necessari al funzionamento, alla sicurezza e alla manutenzione del sito, come indirizzo IP, data e ora della richiesta e informazioni relative al browser.', 'Il sito non utilizza tali dati per attività di profilazione.'] },
        { title: 'Preferenze locali', paragraphs: ['Il sito utilizza il localStorage del browser per salvare esclusivamente:', 'Questi dati rimangono sul dispositivo dell’utente e non vengono inviati al titolare del sito.'], list: ['la lingua preferita;', 'la modalità di visualizzazione chiara o scura.'] },
      ] },
      { title: '3. Cookie, analytics e tracking', paragraphs: ['Il sito non utilizza cookie di profilazione, strumenti di analytics, sistemi pubblicitari, pixel di tracciamento o tecnologie di fingerprinting.', 'Il localStorage utilizzato per le preferenze del sito non è un cookie e non viene impiegato per identificare o tracciare gli utenti.'] },
      { title: '4. Finalità e base giuridica', paragraphs: ['I dati eventualmente forniti dall’utente vengono trattati per:', 'Il trattamento si basa sul consenso dell’utente, espresso volontariamente attraverso l’invio di una richiesta, e sul legittimo interesse del titolare a mantenere operativo e sicuro il sito.'], list: ['consentire all’utente di contattare il titolare;', 'rispondere alle richieste ricevute;', 'garantire il corretto funzionamento e la sicurezza del sito.'] },
      { title: '5. Conservazione dei dati', paragraphs: ['Il sito non conserva i messaggi inviati tramite il modulo di contatto.', 'Eventuali email ricevute vengono conservate nella casella di posta del titolare per il tempo necessario a gestire la richiesta e, successivamente, secondo gli eventuali obblighi di legge applicabili.', 'Le preferenze salvate nel localStorage rimangono sul dispositivo dell’utente fino alla loro cancellazione o alla rimozione dei dati del sito dal browser.'] },
      { title: '6. Servizi esterni', paragraphs: ['Il sito può contenere collegamenti a servizi esterni, come LinkedIn o altri siti web. Aprendo tali collegamenti, l’utente lascia il presente sito e il trattamento dei dati passa sotto la responsabilità dei rispettivi gestori.', 'Il sito può inoltre essere ospitato su un’infrastruttura di terzi. Il provider di hosting potrebbe trattare dati tecnici e log secondo le proprie condizioni e informative sulla privacy.'] },
      { title: '7. Diritti dell’utente', paragraphs: ['Nei casi previsti dalla normativa applicabile, l’utente può esercitare i diritti di accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità dei dati.', 'Per esercitare tali diritti è possibile contattare il titolare all’indirizzo:', 'L’utente ha inoltre il diritto di proporre reclamo all’autorità di controllo competente.'] },
      { title: '8. Modifiche alla Privacy Policy', paragraphs: ['La presente Privacy Policy può essere aggiornata in caso di modifiche al sito, ai servizi utilizzati o alla normativa applicabile. La versione aggiornata sarà pubblicata su questa pagina.'] },
      { title: '9. Contatti', paragraphs: ['Per qualsiasi domanda relativa alla presente Privacy Policy, è possibile contattare:', 'Matteo De Rinaldis|matteo_derinaldis@libero.it'] },
    ],
  },
  en: {
    description: 'Privacy information for the Matteo De Rinaldis portfolio website.',
    updated: 'Last updated:',
    updatedDate: '8 September 2026',
    intro: 'This Privacy Policy explains how personal data is handled when users visit the portfolio website of Matteo De Rinaldis, available at [website URL to be configured].',
    sections: [
      { title: '1. Data controller', paragraphs: ['The data controller is:', 'Matteo De Rinaldis|Email: matteo_derinaldis@libero.it'] },
      { title: '2. Data processed', subsections: [
        { title: 'Data provided voluntarily', paragraphs: ['The contact form sends your name, email address and message to the external service Web3Forms over HTTPS to forward your request to the controller’s email inbox.', 'Web3Forms processes and stores submissions according to its retention settings and privacy policy, available at https://web3forms.com/privacy. Sending does not use the visitor’s email application.'] },
        { title: 'Technical data', paragraphs: ['During browsing, the hosting service may process technical data needed for operation, security and maintenance, such as IP address, request date and time, and browser information.', 'The website does not use this data for profiling.'] },
        { title: 'Local preferences', paragraphs: ['The website uses browser localStorage only to save:', 'This data remains on the user’s device and is not sent to the site owner.'], list: ['the preferred language;', 'the light or dark display mode.'] },
      ] },
      { title: '3. Cookies, analytics and tracking', paragraphs: ['The website does not use profiling cookies, analytics tools, advertising systems, tracking pixels or fingerprinting technologies.', 'The localStorage used for site preferences is not a cookie and is not used to identify or track users.'] },
      { title: '4. Purposes and legal basis', paragraphs: ['Data voluntarily provided by the user is processed to:', 'Processing is based on the user’s consent, expressed voluntarily by sending a request, and on the controller’s legitimate interest in keeping the website operational and secure.'], list: ['allow the user to contact the controller;', 'respond to received requests;', 'ensure the proper operation and security of the website.'] },
      { title: '5. Data retention', paragraphs: ['The website does not retain messages sent through the contact form.', 'Any emails received are kept in the controller’s mailbox for the time needed to handle the request and subsequently according to applicable legal obligations.', 'Preferences saved in localStorage remain on the user’s device until deleted or site data is removed from the browser.'] },
      { title: '6. External services', paragraphs: ['The website may contain links to external services such as LinkedIn or other websites. By opening these links, the user leaves this website and data processing becomes the responsibility of the respective operators.', 'The website may also be hosted on third-party infrastructure. The hosting provider may process technical data and logs according to its own terms and privacy policy.'] },
      { title: '7. User rights', paragraphs: ['Where provided by applicable law, users may exercise rights of access, rectification, erasure, restriction, objection and data portability.', 'To exercise these rights, users may contact the controller at:', 'Users also have the right to lodge a complaint with the competent supervisory authority.'] },
      { title: '8. Changes to this Privacy Policy', paragraphs: ['This Privacy Policy may be updated when the website, services or applicable law change. The updated version will be published on this page.'] },
      { title: '9. Contact', paragraphs: ['For questions about this Privacy Policy, you may contact:', 'Matteo De Rinaldis|matteo_derinaldis@libero.it'] },
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
