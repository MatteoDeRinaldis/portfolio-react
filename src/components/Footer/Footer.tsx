import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Document as PdfViewerDocument, Page, pdfjs } from 'react-pdf';
import { FiChevronUp, FiDownload, FiFileText, FiHelpCircle, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'styled-components';
import Carousel from '../react-bits/Carousel';
import packageJson from '../../../package.json';
import { useTranslation } from '../../i18n';
import { EXTERNAL_LINKS } from '../../constants/externalLinks';
import {
  CvLink,
  FooterContent,
  FooterLegal,
  FooterSeparator,
  FooterText,
  FooterToggle,
  FooterWrapper,
  PdfCloseButton,
  PdfDownloadButton,
  PdfDocument,
  PrivacyLink,
  PdfModal,
  PdfModalContent,
  PdfModalHeader,
  PdfModalTitle,
  SocialLink,
  SocialLinks,
  TechnicalOverviewBody,
  TechnicalOverviewFullWidth,
  TechnicalOverviewHeading,
  TechnicalOverviewHeader,
  TechnicalOverviewIntro,
  TechnicalOverviewLink,
  TechnicalOverviewMobileCarousel,
  TechnicalOverviewRepository,
  TechnicalOverviewSection,
  TechnicalOverviewSections,
  TechnicalOverviewTree,
} from './Footer.styles';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ChevronUpIcon = FiChevronUp as any;
const technicalOverviewSections = ['Core', 'Architecture', 'Forms', 'Animation', 'Ui', 'Testing'] as const;

type FooterProps = {
  isHomeEngineerHovered: boolean;
  isHomeRoleHovered: boolean;
};

export const Footer: FC<FooterProps> = ({ isHomeEngineerHovered, isHomeRoleHovered }) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const [showToggle, setShowToggle] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isTechnicalOverviewOpen, setIsTechnicalOverviewOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const footerRef = useRef<HTMLElement>(null);
  const technicalOverviewTriggerRef = useRef<HTMLButtonElement>(null);
  const technicalOverviewDialogRef = useRef<HTMLDivElement>(null);
  const technicalOverviewCloseButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const updateFooterHeight = () => {
      document.documentElement.style.setProperty('--footer-height', `${footer.getBoundingClientRect().height}px`);
    };

    updateFooterHeight();
    const observer = new ResizeObserver(updateFooterHeight);
    observer.observe(footer);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--footer-height');
    };
  }, []);

  useEffect(() => {
    if (!isCvOpen && !isTechnicalOverviewOpen) {
      return undefined;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isTechnicalOverviewOpen) {
          setIsTechnicalOverviewOpen(false);
        } else {
          setIsCvOpen(false);
        }
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [isCvOpen, isTechnicalOverviewOpen]);

  useEffect(() => {
    if (!isTechnicalOverviewOpen) return undefined;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    technicalOverviewCloseButtonRef.current?.focus();

    const trapTabFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = technicalOverviewDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', trapTabFocus);

    return () => {
      document.removeEventListener('keydown', trapTabFocus);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isTechnicalOverviewOpen]);

  useEffect(() => {
    const updateToggleVisibility = () => {
      const hasOverflow = document.documentElement.scrollHeight > window.innerHeight + 1;
      const isScrolled = window.scrollY > 0;

      setShowToggle(hasOverflow && isScrolled);
    };

    updateToggleVisibility();
    window.addEventListener('scroll', updateToggleVisibility);
    window.addEventListener('resize', updateToggleVisibility);

    return () => {
      window.removeEventListener('scroll', updateToggleVisibility);
      window.removeEventListener('resize', updateToggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const downloadCv = async () => {
    try {
      const response = await fetch(EXTERNAL_LINKS.cv);

      if (!response.ok) {
        throw new Error('Failed to download CV');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = 'Matteo_De_Rinaldis_Senior_Frontend_Engineer_CV.pdf';

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CV download failed:', error);
    }
  };

  return (
    <>
      <FooterWrapper ref={footerRef}>
        <FooterToggle
          type="button"
          onClick={scrollToTop}
          aria-label={t('common.backToTop')}
          $visible={showToggle}
        >
          <ChevronUpIcon aria-hidden={true} />
        </FooterToggle>
        <FooterContent>
          <FooterLegal>
            <FooterText>
              &copy; 2026 Matteo De Rinaldis · {t('common.allRightsReserved')} · v{packageJson.version}
              <FooterSeparator aria-hidden="true">·</FooterSeparator>
              <TechnicalOverviewLink
                ref={technicalOverviewTriggerRef}
                type="button"
                onClick={() => setIsTechnicalOverviewOpen(true)}
                aria-label={t('common.technicalOverview')}
                title={t('common.technicalOverview')}
              >
                <FiHelpCircle aria-hidden="true" />
              </TechnicalOverviewLink>
            </FooterText>
            <PrivacyLink as={Link} to="/privacy-policy">{t('common.privacyPolicy')}</PrivacyLink>
          </FooterLegal>
          <SocialLinks $isHomeIdle={pathname === '/' && !isHomeRoleHovered}>
            <SocialLink $isHomeEngineerHovered={isHomeEngineerHovered} href="https://github.com/MatteoDeRinaldis" target="_blank" rel="noopener noreferrer">GitHub</SocialLink>
            <SocialLink $isHomeEngineerHovered={isHomeEngineerHovered} href="https://linkedin.com/in/matteo-de-rinaldis" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
            <CvLink $isHomeEngineerHovered={isHomeEngineerHovered} type="button" onClick={() => setIsCvOpen(true)}>{t('common.cv')}</CvLink>
          </SocialLinks>
        </FooterContent>
      </FooterWrapper>
      <AnimatePresence>
        {isCvOpen && (
          <PdfModal
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsCvOpen(false);
              }
            }}
          >
            <PdfModalContent
              as={motion.div}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <PdfModalHeader>
                <PdfModalTitle id="cv-modal-title">
                  <FiFileText aria-hidden="true" />
                  {t('common.cvTitle')}
                </PdfModalTitle>
                <div>
                  <PdfDownloadButton
                    as="button"
                    type="button"
                    onClick={downloadCv}
                    aria-label={t('common.downloadCv')}
                  >
                    <FiDownload aria-hidden="true" />
                  </PdfDownloadButton>
                  <PdfCloseButton type="button" onClick={() => setIsCvOpen(false)} aria-label={t('common.closeCv')}>
                    <FiX aria-hidden="true" />
                  </PdfCloseButton>
                </div>
              </PdfModalHeader>
              <PdfDocument
              >
                <PdfViewerDocument
                  file={EXTERNAL_LINKS.cv}
                  onLoadSuccess={({ numPages: loadedPages }: { numPages: number }) => setNumPages(loadedPages)}
                  loading={t('common.loadingCv')}
                  error={t('common.errorCv')}
                >
                  {Array.from(new Array(numPages || 0), (_, index) => (
                    <Page key={`cv-page-${index + 1}`} pageNumber={index + 1} width={720} renderTextLayer={false} renderAnnotationLayer={false} />
                  ))}
                </PdfViewerDocument>
              </PdfDocument>
            </PdfModalContent>
          </PdfModal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isTechnicalOverviewOpen && (
          <PdfModal
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="technical-overview-title"
            ref={technicalOverviewDialogRef}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsTechnicalOverviewOpen(false);
              }
            }}
          >
            <PdfModalContent
              as={motion.div}
              $isGlass
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <TechnicalOverviewHeader>
                <TechnicalOverviewHeading>
                  <PdfModalTitle id="technical-overview-title">{t('common.technicalOverview')}</PdfModalTitle>
                  <TechnicalOverviewIntro>{t('common.technicalOverviewIntro')}</TechnicalOverviewIntro>
                </TechnicalOverviewHeading>
                <PdfCloseButton
                  ref={technicalOverviewCloseButtonRef}
                  type="button"
                  onClick={() => setIsTechnicalOverviewOpen(false)}
                  aria-label={t('common.closeTechnicalOverview')}
                >
                  <FiX aria-hidden="true" />
                </PdfCloseButton>
              </TechnicalOverviewHeader>
              <TechnicalOverviewBody>
                <TechnicalOverviewSections>
                  {technicalOverviewSections.map((section) => (
                    <TechnicalOverviewSection key={section}>
                      <h3>{t(`common.technicalOverview${section}Title`)}</h3>
                      <p>{t(`common.technicalOverview${section}Description`)}</p>
                    </TechnicalOverviewSection>
                  ))}
                </TechnicalOverviewSections>
                <TechnicalOverviewMobileCarousel $layout="inline">
                  <Carousel
                    items={technicalOverviewSections.map((section) => ({
                      id: section,
                      title: t(`common.technicalOverview${section}Title`),
                      description: t(`common.technicalOverview${section}Description`),
                    }))}
                    baseWidth="100%"
                    aspectRatio={6.2}
                    effect="slide"
                    indicator="bars"
                    frame={false}
                    theme={theme.mode}
                  />
                </TechnicalOverviewMobileCarousel>
                <TechnicalOverviewFullWidth>
                  <TechnicalOverviewSection>
                    <h3>{t('common.technicalOverviewServicesTitle')}</h3>
                    <p className="desktop-only">{t('common.technicalOverviewServicesDescription')}</p>
                    <p className="mobile-only">{t('common.technicalOverviewServicesMobileDescription')}</p>
                  </TechnicalOverviewSection>
                </TechnicalOverviewFullWidth>
                <TechnicalOverviewFullWidth>
                  <TechnicalOverviewSection>
                    <h3>{t('common.technicalOverviewStructureTitle')}</h3>
                    <TechnicalOverviewTree><code>{t('common.technicalOverviewStructure')}</code></TechnicalOverviewTree>
                  </TechnicalOverviewSection>
                </TechnicalOverviewFullWidth>
                <TechnicalOverviewRepository href="https://github.com/MatteoDeRinaldis/portfolio-react" target="_blank" rel="noopener noreferrer">
                  {t('common.technicalOverviewRepository')}
                </TechnicalOverviewRepository>
              </TechnicalOverviewBody>
            </PdfModalContent>
          </PdfModal>
        )}
      </AnimatePresence>
    </>
  );
};
