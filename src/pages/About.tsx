import React, { FC } from 'react';
import { motion } from 'motion/react';
import { FiUser } from 'react-icons/fi';
import { useTranslation } from '../i18n';
import { PageTitle, PageDescription } from '../components/PageLayout';
import { AboutPageWrapper, AboutBackgroundIcon, AboutLayout, AboutCopy, AboutReveal, AboutHeading, AboutLead, AboutSectionTitle, AboutAside, AsideTitle, FocusList } from './About.styles';

const revealVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const About: FC = () => {
  const { t } = useTranslation();

  return (
    <AboutPageWrapper>
      <PageTitle
        as={motion.h2}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
      >
        {t('pages.aboutTitle')}
      </PageTitle>
      <PageDescription
        as={motion.p}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
      >
        {t('pages.aboutDescription')}
      </PageDescription>
      <AboutLayout>
        <AboutCopy
          as={motion.article}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: {} }}
          transition={{ delayChildren: 0.55, staggerChildren: 0.13 }}
        >
          <AboutReveal variants={revealVariants}><AboutHeading>{t('about.heading')}</AboutHeading></AboutReveal>
          <AboutReveal variants={revealVariants}><AboutLead>{t('about.lead')}</AboutLead></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.intro1')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.intro2')}</p></AboutReveal>

          <AboutReveal variants={revealVariants}><AboutSectionTitle>{t('about.approachTitle')}</AboutSectionTitle></AboutReveal>
          <AboutReveal variants={revealVariants}><AboutLead>{t('about.approachLead')}</AboutLead></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.approach1')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.approach2')}</p></AboutReveal>

          <AboutReveal variants={revealVariants}><AboutSectionTitle>{t('about.seniorityTitle')}</AboutSectionTitle></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.seniority1')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.seniority2')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.seniority3')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.seniority4')}</p></AboutReveal>

          <AboutReveal variants={revealVariants}><AboutSectionTitle>{t('about.outsideTitle')}</AboutSectionTitle></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.outside1')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.outside2')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.outside3')}</p></AboutReveal>
          <AboutReveal variants={revealVariants}><p>{t('about.outside4')}</p></AboutReveal>
          <br></br>
          <AboutReveal variants={revealVariants}><p><strong>{t('about.signature')}</strong></p></AboutReveal>
        </AboutCopy>

        <AboutAside
          as={motion.aside}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
        >
          <AsideTitle>{t('about.focusTitle')}</AsideTitle>
          <FocusList>
            <li>{t('about.focusFrontend')}</li>
            <li>{t('about.focusCinema')}</li>
            <li>{t('about.focusFilmmaking')}</li>
            <li>{t('about.focusArchery')}</li>
            <li>{t('about.focusDad')}</li>
          </FocusList>
        </AboutAside>
      </AboutLayout>
      <AboutBackgroundIcon
        as={motion.div}
        aria-hidden="true"
        initial={{ opacity: 0, x: -320, rotate: 25 }}
        animate={{ opacity: 0.1, x: 0, rotate: 25 }}
        transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
      >
        <FiUser />
      </AboutBackgroundIcon>
    </AboutPageWrapper>
  );
};
