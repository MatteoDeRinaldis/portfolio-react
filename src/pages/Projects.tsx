import React, { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import styled from 'styled-components';
import { FiBriefcase, FiCalendar, FiCode, FiGitBranch, FiLayers, FiMapPin, FiUsers } from 'react-icons/fi';
import { PageDescription, PageSection, PageTitle, PageWrapper } from '../components/PageLayout';
import { useTranslation } from '../i18n';
import { getLocalizedProfessionalExperiences } from '../data/cv';

const ProjectsPageWrapper = styled(PageWrapper)`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    overflow-y: visible;
  }
`;

const ProjectsBackgroundIcon = styled.div`
  position: absolute;
  top: -12%;
  left: -10vw;
  z-index: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(18rem, 42vw, 44rem);
  line-height: 1;
  pointer-events: none;
  transform-origin: center;

  svg {
    display: block;
    width: 1em;
    height: 1em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 12%;
    left: -30vw;
    font-size: clamp(14rem, 48vw, 28rem);
  }
`;

const revealVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const OverviewItem = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.35)' : 'rgba(255, 255, 255, 0.35)')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

const ExperienceTimeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};
  padding-left: ${({ theme }) => theme.spacing[6]};

  &::before {
    position: absolute;
    top: 0.5rem;
    bottom: 0.5rem;
    left: 0.4rem;
    width: 3px;
    border-radius: 999px;
    /* fades progressively from full intensity at the active marker towards the ends */
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent) 0%,
      color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent) calc(var(--active-marker-position, 50%) - 17%),
      ${({ theme }) => theme.colors.primary} var(--active-marker-position, 50%),
      color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent) calc(var(--active-marker-position, 50%) + 17%),
      color-mix(in srgb, ${({ theme }) => theme.colors.primary} 10%, transparent) 100%
    );
    box-shadow: 0 0 0.5rem color-mix(in srgb, ${({ theme }) => theme.colors.primary} 55%, transparent);
    content: '';
    transition: background 260ms ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[8]};
    padding-left: ${({ theme }) => theme.spacing[6]};
  }
`;

const TimelineTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.text};
`;

const ExperienceSection = styled(PageSection)`
  width: 100%;
  min-width: 0;
`;

const ProjectsExperienceLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(220px, 0.65fr);
  gap: ${({ theme }) => theme.spacing[16]};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const CompanySidebar = styled.aside<{ $isPageScrolled: boolean }>`
  position: sticky;
  top: 9rem;
  align-self: start;
  justify-self: end;
  width: min(100%, 315px);
  padding-left: ${({ theme }) => theme.spacing[6]};
  transform: translateY(${({ $isPageScrolled }) => ($isPageScrolled ? '0' : '4.5rem')});
  transition: transform 240ms ease;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    content: '';
    transform: translateX(5rem);
    opacity: 0;
    animation: sidebar-divider-enter 0.8s 1s ease-out forwards;
  }

  @keyframes sidebar-divider-enter {
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;
    justify-self: stretch;
    width: 100%;
    padding-top: ${({ theme }) => theme.spacing[6]};
    padding-left: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    transform: none;
    transition: none;

    &::before {
      top: 0;
      right: 0;
      bottom: auto;
      left: 0;
      width: auto;
      height: 1px;
      transform: none;
      opacity: 1;
      animation: none;
    }
  }
`;

const CompanySidebarContent = styled(motion.div)`
  width: 100%;
`;

const CompanySidebarTitle = styled.h3<{ $isPageScrolled?: boolean }>`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: right;
  opacity: ${({ $isPageScrolled }) => ($isPageScrolled ? 1 : 0)};
  transform: translateY(${({ $isPageScrolled }) => ($isPageScrolled ? '0' : '-0.5rem')});
  pointer-events: ${({ $isPageScrolled }) => ($isPageScrolled ? 'auto' : 'none')};
  transition: opacity 240ms ease, transform 240ms ease;
`;

const CompanyList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing[4]} 0 0;
  list-style: none;
  direction: rtl;

  &::before {
    position: absolute;
    top: 0.35rem;
    bottom: 0.35rem;
    right: 0;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.border};
    content: '';
  }
`;

const CompanyListItem = styled.li<{ $isActive: boolean }>`
  position: relative;
  direction: ltr;
  text-align: right;

  &::before {
    position: absolute;
    top: 50%;
    right: calc(-${({ theme }) => theme.spacing[4]} - 0.25rem);
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    content: '';
    transform: translateY(-50%);
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.background)};
    box-shadow: ${({ theme, $isActive }) => ($isActive ? `0 0 0.45rem ${theme.colors.primary}` : 'none')};
    transition: background-color 180ms ease, box-shadow 180ms ease;
  }

  &:has(> button:hover)::before,
  &:has(> button:focus-visible)::before {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
  }
`;

const CompanyLink = styled.button<{ $isActive: boolean }>`
  display: inline-block;
  width: auto;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.spacing[1]} 0`};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.text : theme.colors.textLight)};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.25;
  text-align: right;
  transition: color 180ms ease, text-shadow 180ms ease;

  ${({ $isActive, theme }) => ($isActive ? `text-shadow: 0 0 0.45rem ${theme.colors.primary};` : '')}

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
    outline: none;
  }

    .project-client::before {
      background-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
    }

  &:hover + *,
  &:focus-visible + * {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
  }
`;

const ExperienceTimelineItem = styled(motion.article)<{ $isActive: boolean }>`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing[5]} 0 ${theme.spacing[6]}`};
  scroll-margin-top: 7rem;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.68)};
  transition: opacity 220ms ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[5]}`};
  }
`;

const ExperienceMarker = styled.span<{ $isActive: boolean }>`
  position: absolute;
  left: calc(-${({ theme }) => theme.spacing[6]} + 0.1rem);
  top: 50%;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.background)};
  box-shadow: ${({ theme, $isActive }) => ($isActive
    ? `0 0 0 0.3rem ${theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)'}, 0 0 0.55rem ${theme.colors.primary}`
    : `0 0 0 0.3rem ${theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)'}`)};
  transform: translateY(-50%);
  transition: background-color 180ms ease, box-shadow 180ms ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: calc(-${({ theme }) => theme.spacing[4]} + 0.1rem);
  }
`;

const ExperienceHeader = styled.header<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  &::before {
    position: absolute;
    top: 50%;
    right: 0;
    left: calc(-${({ theme }) => theme.spacing[4]} + 0.325rem);
    height: 1px;
    background-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};
    box-shadow: ${({ theme, $isActive }) => ($isActive ? `0 0 0.45rem ${theme.colors.primary}` : 'none')};
    content: '';
    transform: translateY(-50%);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[1]};

    &::before {
      display: none;
    }
  }
`;

const ExperienceIdentity = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-start;
  margin-left: calc(${({ theme }) => theme.spacing[4]} + ${({ theme }) => theme.spacing[5]});
  margin-right: auto;
  text-align: left;

  ${ExperienceMarker} {
    top: 50%;
    left: calc(-${({ theme }) => `${theme.spacing[6]} + ${theme.spacing[4]} + ${theme.spacing[5]}`} + 0.1rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: calc(${({ theme }) => theme.spacing[2]} + ${({ theme }) => theme.spacing[4]});

    ${ExperienceMarker} {
      left: calc(-${({ theme }) => `${theme.spacing[6]} + ${theme.spacing[2]} + ${theme.spacing[4]}`} + 0.1rem);
    }
  }
`;

const ExperienceCompany = styled.h3<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-left: 15px;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.92)' : 'rgba(255, 255, 255, 0.92)')};
  color: ${({ theme, $isActive }) => ($isActive
    ? theme.colors.text
    : theme.mode === 'dark' ? 'rgba(243, 243, 243, 0.62)' : 'rgba(18, 18, 18, 0.62)')};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.02em;
  text-align: left;
  box-shadow: ${({ theme, $isActive }) => ($isActive ? `0 0 0.45rem ${theme.colors.primary}` : theme.shadows.sm)};
  border-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
`;

const ExperienceLocation = styled.span<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.92)' : 'rgba(255, 255, 255, 0.92)')};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.textLight : theme.colors.secondary)};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  white-space: nowrap;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};
  box-shadow: ${({ theme, $isActive }) => ($isActive ? `0 0 0.45rem ${theme.colors.primary}` : 'none')};

  svg {
    display: block;
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.95em;
  }
`;

const ExperienceDate = styled.span<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex: 0 0 auto;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.92)' : 'rgba(255, 255, 255, 0.92)')};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.text : theme.colors.textLight)};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.04em;
  line-height: 1;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  align-self: center;
  border-color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};
  box-shadow: ${({ theme, $isActive }) => ($isActive ? `0 0 0.45rem ${theme.colors.primary}` : theme.shadows.sm)};

  svg {
    display: block;
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-self: flex-start;
  }
`;

const ExperienceProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-left: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[5]};

  &:has(> section:hover) > section:not(:hover) {
    opacity: 0.42;
  }

  > section {
    transition: opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: ${({ theme }) => theme.spacing[2]};
    padding-left: ${({ theme }) => theme.spacing[4]};
  }
`;

const ExperienceProject = styled.section`
  position: relative;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.35)' : 'rgba(255, 255, 255, 0.35)')};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  &:hover {
    border-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.86)' : 'rgba(17, 17, 17, 0.62)')};
    box-shadow: ${({ theme }) => (theme.mode === 'dark'
      ? '0 0 0.45rem rgba(255, 255, 255, 0.18), 0 4px 12px rgba(0, 0, 0, 0.16)'
      : '0 0 0.45rem rgba(17, 17, 17, 0.12), 0 4px 12px rgba(17, 17, 17, 0.08)')};

    .project-client::before {
      background-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ProjectClient = styled.h4`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0 0 ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &::before {
    flex: 0 0 auto;
    width: 0.45rem;
    height: 0.45rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    content: '';
    transition: background-color 180ms ease, box-shadow 180ms ease;
  }
`;

const ProjectDescription = styled.p`
  width: min(100%, 760px);
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.7;
  text-align: justify;
  text-justify: inter-word;
`;

const TechnologyList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Technology = styled.li`
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#080808' : '#dededb')};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Projects: FC = () => {
  const { t, language } = useTranslation();
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState<number | null>(null);
  const [activeMarkerPosition, setActiveMarkerPosition] = useState(50);
  const timelineRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const experiences = getLocalizedProfessionalExperiences(language);

  useEffect(() => {
    const handleScroll = () => setIsPageScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveCompany = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        setActiveCompanyIndex(experiences.length - 1);
        return;
      }

      const anchorY = window.scrollY + 7 * 16;
      let nearestIndex: number | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      experiences.forEach((_, index) => {
        const element = document.getElementById(`company-${index}`);
        if (!element) {
          return;
        }

        const distance = Math.abs(element.getBoundingClientRect().top + window.scrollY - anchorY);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveCompanyIndex(nearestIndex);
    };

    updateActiveCompany();
    window.addEventListener('scroll', updateActiveCompany, { passive: true });
    window.addEventListener('resize', updateActiveCompany);

    return () => {
      window.removeEventListener('scroll', updateActiveCompany);
      window.removeEventListener('resize', updateActiveCompany);
    };
  }, [experiences]);

  useEffect(() => {
    const updateActiveMarkerPosition = () => {
      const container = timelineRef.current;
      const marker = activeCompanyIndex !== null ? markerRefs.current[activeCompanyIndex] : null;
      if (!container || !marker) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();
      const percent = ((markerRect.top + markerRect.height / 2 - containerRect.top) / containerRect.height) * 100;

      setActiveMarkerPosition(Math.min(100, Math.max(0, percent)));
    };

    updateActiveMarkerPosition();
    window.addEventListener('scroll', updateActiveMarkerPosition, { passive: true });
    window.addEventListener('resize', updateActiveMarkerPosition);

    return () => {
      window.removeEventListener('scroll', updateActiveMarkerPosition);
      window.removeEventListener('resize', updateActiveMarkerPosition);
    };
  }, [activeCompanyIndex, experiences]);

  const scrollToCompany = (index: number) => {
    document.getElementById(`company-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ProjectsPageWrapper>
      <PageTitle
        as={motion.h2}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
      >
        {t('projects.title')}
      </PageTitle>
      <PageDescription
        as={motion.p}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
      >
        {t('projects.description')}
      </PageDescription>

      <OverviewGrid as={motion.div}>
        <OverviewItem as={motion.div} initial="hidden" animate="visible" variants={revealVariants} transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}>
          <FiCode aria-hidden={true} />
          <span>{t('projects.experience')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} initial="hidden" animate="visible" variants={revealVariants} transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}>
          <FiBriefcase aria-hidden={true} />
          <span>{t('projects.industries')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} initial="hidden" animate="visible" variants={revealVariants} transition={{ duration: 0.4, delay: 0.85, ease: 'easeOut' }}>
          <FiLayers aria-hidden={true} />
          <span>{t('projects.applications')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} initial="hidden" animate="visible" variants={revealVariants} transition={{ duration: 0.4, delay: 1, ease: 'easeOut' }}>
          <FiUsers aria-hidden={true} />
          <span>{t('projects.teams')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} initial="hidden" animate="visible" variants={revealVariants} transition={{ duration: 0.4, delay: 1.15, ease: 'easeOut' }}>
          <FiGitBranch aria-hidden={true} />
          <span>{t('projects.approach')}</span>
        </OverviewItem>
      </OverviewGrid>

      <ProjectsExperienceLayout>
        <ExperienceSection
          as={motion.section}
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
        >
          <TimelineTitle>{t('projects.carouselTitle')}</TimelineTitle>
          <ExperienceTimeline
            ref={timelineRef}
            style={{ '--active-marker-position': `${activeMarkerPosition}%` } as React.CSSProperties}
          >
            {experiences.map((experience, index) => (
              <ExperienceTimelineItem
                id={`company-${index}`}
                $isActive={activeCompanyIndex === index}
                key={`${experience.company}-${experience.period}`}
                initial="hidden"
                animate={{ opacity: activeCompanyIndex === index ? 1 : 0.68, x: 0 }}
                variants={revealVariants}
                transition={{ duration: 0.16, delay: 0, ease: 'easeOut' }}
              >
                <ExperienceHeader $isActive={activeCompanyIndex === index}>
                  <ExperienceIdentity>
                    <ExperienceMarker
                      ref={(element) => {
                        markerRefs.current[index] = element;
                      }}
                      $isActive={activeCompanyIndex === index}
                      aria-hidden="true"
                    />
                    <ExperienceCompany $isActive={activeCompanyIndex === index}>{experience.company}</ExperienceCompany>
                    <ExperienceLocation $isActive={activeCompanyIndex === index}>
                      <FiMapPin aria-hidden="true" />
                      {experience.location}
                    </ExperienceLocation>
                  </ExperienceIdentity>
                  <ExperienceDate $isActive={activeCompanyIndex === index}>
                    <FiCalendar aria-hidden="true" />
                    {experience.period}
                  </ExperienceDate>
                </ExperienceHeader>
                <ExperienceProjects>
                  {experience.projects.map((project) => (
                    <ExperienceProject
                      as={motion.section}
                      key={`${experience.company}-${project.client}`}
                      whileHover={{ scale: 1.012 }}
                      whileFocus={{ scale: 1.012 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                    >
                      <ProjectClient className="project-client">{project.client}</ProjectClient>
                      <ProjectDescription>{project.description}</ProjectDescription>
                      <TechnologyList aria-label={`${project.client} technologies`}>
                        {project.technologies.map((technology) => (
                          <Technology key={`${project.client}-${technology}`}>{technology}</Technology>
                        ))}
                      </TechnologyList>
                    </ExperienceProject>
                  ))}
                </ExperienceProjects>
              </ExperienceTimelineItem>
            ))}
          </ExperienceTimeline>
        </ExperienceSection>
        <CompanySidebar $isPageScrolled={isPageScrolled} aria-label="Companies">
          <CompanySidebarContent
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          >
            <CompanySidebarTitle $isPageScrolled={isPageScrolled}>{t('projects.carouselTitle')}</CompanySidebarTitle>
            <CompanyList>
              {experiences.map((experience, index) => (
                <CompanyListItem $isActive={activeCompanyIndex === index} key={`${experience.company}-sidebar`}>
                  <CompanyLink
                    as={motion.button}
                    type="button"
                    $isActive={activeCompanyIndex === index}
                    onClick={() => scrollToCompany(index)}
                    whileHover={{ scale: 1.035 }}
                    whileFocus={{ scale: 1.035 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                  >
                    {experience.company}
                  </CompanyLink>
                </CompanyListItem>
              ))}
            </CompanyList>
          </CompanySidebarContent>
        </CompanySidebar>
      </ProjectsExperienceLayout>
      <ProjectsBackgroundIcon
        as={motion.div}
        aria-hidden="true"
        initial={{ opacity: 0, x: -320, rotate: 25 }}
        animate={{ opacity: 0.1, x: 0, rotate: 25 }}
        transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
      >
        <FiBriefcase />
      </ProjectsBackgroundIcon>
    </ProjectsPageWrapper>
  );
};
