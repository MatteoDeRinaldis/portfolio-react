import React, { FC, useMemo } from 'react';
import { motion } from 'motion/react';
import { FiUser } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useTranslation } from '../i18n';
import { PageTitle, PageDescription } from '../components/PageLayout';
import { FoldText } from '../components/react-bits/FoldText';
import { RotatingText } from '../components/react-bits/RotatingText';
import { AboutPageWrapper, AboutBackgroundIcon, AboutLayout, AboutCopy, AboutReveal, AboutHeading, AboutLead, AboutSectionTitle, AboutAside, AsideTitle, FocusList } from './About.styles';

const revealVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const foldTextProps = {
  foldStyle: 'paper',
  hinge: 'top',
  splitBy: 'char',
  hoverRefold: true,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  style: { letterSpacing: 'inherit', lineHeight: 'inherit' },
} as const;

export const About: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const focusItems = useMemo(
    () => [
      t('about.focusFrontend'),
      t('about.focusCinema'),
      t('about.focusFilmmaking'),
      t('about.focusArchery'),
      t('about.focusDad'),
    ],
    [t],
  );
  const headingWords = useMemo(() => t('about.headingWords').split('|'), [t]);

  return (
    <AboutPageWrapper>
      <PageTitle as="h2">
        <FoldText text={t('pages.aboutTitle')} {...foldTextProps} stagger={0.06} delay={0.1} />
      </PageTitle>
      <PageDescription as="p">
        <FoldText text={t('pages.aboutDescription')} {...foldTextProps} stagger={0.02} delay={0.5} />
      </PageDescription>
      <AboutLayout>
        <AboutCopy
          as={motion.article}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: {} }}
          transition={{ delayChildren: 0.55, staggerChildren: 0.13 }}
        >
          <AboutReveal variants={revealVariants}>
            <AboutHeading aria-label={t('about.heading')}>
              <span aria-hidden="true">{t('about.headingPrefix')}</span>
              <RotatingText
                texts={headingWords}
                effect="slide"
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="first"
                rotationInterval={2200}
                splitLevelClassName="about-rotating-level"
              />
            </AboutHeading>
          </AboutReveal>
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
          <FocusList
            items={focusItems}
            focusStyle="brackets"
            blurAmount={1}
            unfocusedOpacity={0.6}
            borderColor={theme.colors.text}
            cornerSize={10}
            borderWidth={2}
            animationDuration={0.5}
            pauseBetweenAnimations={1.4}
          />
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
