import React, { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import styled, { keyframes, useTheme } from 'styled-components';
import { FiBriefcase, FiCalendar, FiChevronDown, FiCode, FiGitBranch, FiLayers, FiMapPin, FiUsers } from 'react-icons/fi';
import { PageDescription, PageSection, PageTitle, PageWrapper } from '../components/PageLayout';
import { ChromaGrid } from '../components/react-bits/ChromaGrid';
import { TargetCursor } from '../components/react-bits/TargetCursor';
import { useTranslation } from '../i18n';
import { getLocalizedProfessionalExperiences } from '../data/cv';
import { MobileProjectCard } from '../components/common/MobileProjectCard';
import { ContactStarBorder } from '../components/ContactStarBorder';
import Carousel from '../components/react-bits/Carousel';
import { CompactCarousel } from '../components/react-bits/CompactCarousel.styles';
import GradualBlur from '../components/react-bits/GradualBlur';
import type { ProjectExperience } from '../data/cv';

const ProjectsPageWrapper = styled(PageWrapper)`
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  overflow-y: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 5rem;
    padding-bottom: calc(12rem + env(safe-area-inset-bottom, 0px));
  }
`;

const ProjectsBackgroundIcon = styled.div`
  position: absolute;
  top: -5%;
  left: -10vw;
  z-index: -1;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 8rem;
    font-size: clamp(16rem, 56vw, 32rem);
  }
`;

const revealVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const overviewCarouselEnter = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const OverviewCarousel = styled.div<{ $isAtEnd: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    margin: ${({ theme }) => `${theme.spacing[8]} 0 ${theme.spacing[12]}`};
    animation: ${overviewCarouselEnter} 400ms ease-out 550ms both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      width: 3rem;
      background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.background});
      content: '';
      pointer-events: none;
      opacity: ${({ $isAtEnd }) => ($isAtEnd ? 0 : 1)};
      transition: opacity 200ms ease;
    }
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 82%;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: ${({ theme }) => theme.spacing[2]};
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;

    > div {
      scroll-snap-align: start;
    }
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
  transition: border-color 220ms ease, box-shadow 220ms ease;

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  @media (hover: hover) and (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:hover {
      z-index: 2;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 24px ${({ theme }) => theme.colors.primary}66, ${({ theme }) => theme.shadows.md};
    }
  }
`;

const overviewItemHover = { scale: 1.03, y: -4, transition: { duration: 0.22, ease: 'easeOut' as const } };

const overviewItemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number) => ({ opacity: 1, x: 0, transition: { duration: 0.4, delay, ease: 'easeOut' as const } }),
};

const overviewItemTransition = { duration: 0.22, ease: 'easeOut' as const };

const ExperienceTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[16]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[4]};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing[8]};
    width: 100%;
    min-width: 0;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const CompanySidebarContent = styled(motion.div)`
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 100%;
    opacity: 1 !important;
    transform: none !important;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    height: 100%;
    gap: 0;
    padding: 0;
    direction: ltr;

    &::before {
      top: auto;
      bottom: 6px;
      left: calc(50% / var(--company-count));
      right: calc(50% / var(--company-count));
      width: auto;
      height: 1px;
    }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 0;
    height: 100%;
    margin: 0;
    text-align: center;

    &::before,
    &:has(> button:hover)::before,
    &:has(> button:focus-visible)::before {
      top: auto;
      right: auto;
      left: 47%;
      bottom: 2px;
      width: 9px;
      height: 9px;
      transform: translateX(-50%);
      pointer-events: none;
      background-color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.background};
      box-shadow: ${({ theme, $isActive }) => $isActive ? `0 0 0.45rem ${theme.colors.primary}` : 'none'};
    }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 44px;
    padding: 0 0 22px;
    border: 0;
    background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.35)' : 'rgba(255, 255, 255, 0.35)')};
    font-size: 13px;
    white-space: nowrap;
    text-align: center;
    text-shadow: none;

    > span {
      display: block;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      line-height: 1;
    }

    &:hover, &:focus-visible {
      color: ${({ theme, $isActive }) => $isActive ? theme.colors.text : theme.colors.textLight};
      text-shadow: none;
    }

    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.colors.primary};
      outline-offset: -2px;
    }
  }
`;

const ExperienceTimelineItem = styled(motion.article)<{ $isExpanded: boolean }>`
  position: relative;
  padding: 0;
  margin-bottom: 0;
  scroll-margin-top: 7rem;
  background-image: ${({ theme, $isExpanded }) => ($isExpanded
    ? `linear-gradient(45deg, ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.045)' : 'rgba(17, 17, 17, 0.035)'}, transparent 75%)`
    : 'none')};
  border-radius: ${({ $isExpanded }) => ($isExpanded ? '8px' : 0)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-image: none;
    scroll-margin-top: calc(var(--header-height, 5rem) + 1rem);
  }
`;

const ExperienceHeader = styled.header<{ $isExpanded: boolean; $isActive: boolean }>`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.35)' : 'rgba(255, 255, 255, 0.35)')};
  box-shadow: ${({ theme, $isActive }) => ($isActive
    ? 'none'
    : theme.mode === 'dark'
      ? '0 3px 12px rgba(0, 0, 0, 0.24), 0 1px 3px rgba(255, 255, 255, 0.08)'
      : '0 3px 12px rgba(17, 17, 17, 0.1), 0 1px 3px rgba(17, 17, 17, 0.06)')};
  transition: box-shadow 180ms ease;
  backdrop-filter: blur(22px) saturate(1.2);
  -webkit-backdrop-filter: blur(22px) saturate(1.2);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }

  &::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 0.5px ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(24, 24, 27, 0.12)'};
    content: '';
    pointer-events: none;
    transition: box-shadow 180ms ease;
  }

  &:hover::before,
  &:focus-visible::before,
  &[data-sidebar-hovered='true']::before {
    box-shadow: ${({ theme, $isActive, $isExpanded }) => !$isActive && !$isExpanded
      ? `inset 0 0 0 1px ${theme.colors.primary}, 0 0 0.45rem ${theme.colors.primary}`
      : `inset 0 0 0 0.5px ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(24, 24, 27, 0.12)'}`};
  }

  > * {
    position: relative;
    z-index: 1;
  }

  .contact-star-border-canvas {
    position: absolute;
    top: -48px;
    left: -48px;
    z-index: 0;
    width: calc(100% + 96px);
    height: calc(100% + 96px);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[3]};
    margin: 0;
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[3]}`};
    cursor: default;
  }

  @media (max-width: 360px) {
    grid-template-columns: minmax(0, 1fr);

    > :nth-child(2) {
      justify-self: end;
    }
  }
`;

const ExperienceCardsPanel = styled(motion.div)`
  overflow: hidden;
  padding: 0 10px;
`;

const ExperienceContentFrame = styled.div<{ $isExpanded: boolean }>`
  padding: 0;
`;

const ExperienceIdentity = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-content: flex-start;
  min-width: 0;
  text-align: left;
`;

const ExperienceCompany = styled.h3`
  min-width: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.35;
  text-align: left;
`;

const ExperienceSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const ExperienceLocation = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.35;
`;

const ExperienceDate = styled.span<{ $isActive: boolean; $isExpanded: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex: 0 0 auto;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.text : theme.colors.textLight)};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.35;
  white-space: nowrap;

  svg {
    display: block;
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.875rem;

    &:last-child {
      color: ${({ theme }) => theme.colors.textLight};
      transform: rotate(${({ $isExpanded }) => ($isExpanded ? '180deg' : '0deg')});
      transition: transform 220ms ease;
    }
  }

  .accordion-chevron {
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  }
`;

const ExperienceProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};

  &:has(> section:hover) > section:not(:hover) {
    opacity: 0.42 !important;
  }

  > section {
    transition: opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  }

  > section:hover,
  > section:focus-visible {
    z-index: 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
    padding-left: 0;
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 82%;
    gap: ${({ theme }) => theme.spacing[4]};
    padding-bottom: ${({ theme }) => theme.spacing[2]};
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;

    &:has(> section:only-child) {
      grid-auto-columns: 100%;
    }

    > section {
      scroll-snap-align: start;
    }

    &:has(> section:hover) > section:not(:hover) {
      opacity: 1 !important;
    }
  }
`;

const CompanyProjectsViewport = styled.div<{ $isAtEnd: boolean }>`
  position: relative;
  display: block;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    margin: 0;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      width: 3rem;
      background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.background});
      content: '';
      pointer-events: none;
      opacity: ${({ $isAtEnd }) => ($isAtEnd ? 0 : 1)};
      transition: opacity 200ms ease;
    }
  }
`;

const DesktopCompanyProjects = styled(CompanyProjectsViewport)`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileCompanyProjects = styled(CompactCarousel)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    margin-top: ${({ theme }) => theme.spacing[3]};

    .carousel-card.is-custom {
      overflow: visible;
      border: 0;
      background: transparent;
      box-shadow: none;
    }
  }
`;

const MobilePageScrollBlur = styled(GradualBlur)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const CompanyProjectCarousel: FC<{
  children: React.ReactNode;
  company: string;
  projects: ProjectExperience[];
}> = ({ children, company, projects }) => {
  const theme = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(React.Children.count(children) <= 1);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const updateEdge = () => setIsAtEnd(carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2);
    updateEdge();
    carousel.addEventListener('scroll', updateEdge, { passive: true });
    const observer = new ResizeObserver(updateEdge);
    observer.observe(carousel);
    return () => {
      carousel.removeEventListener('scroll', updateEdge);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <DesktopCompanyProjects $isAtEnd={isAtEnd}>
        <ChromaGrid
          accent={theme.mode === 'dark' ? '#f5f5f5' : '#1a1a1a'}
          radius={300}
          cardRadius={parseFloat(theme.borderRadius.md) * 16 || 8}
        >
          <ExperienceProjects ref={carouselRef} role="group" aria-label={company}>
            {children}
          </ExperienceProjects>
        </ChromaGrid>
      </DesktopCompanyProjects>
      <MobileCompanyProjects $layout="stacked">
        <Carousel
          items={projects.map((project) => (
            <MobileProjectCard
              key={`${company}-${project.client}`}
              client={project.client}
              description={project.description}
              technologies={project.technologies}
            />
          ))}
          baseWidth="100%"
          aspectRatio={1.2}
          effect="slide"
          indicator="bars"
          frame={false}
          theme={theme.mode}
        />
      </MobileCompanyProjects>
    </>
  );
};

const ExperienceProject = styled.section`
  position: relative;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.16)' : 'rgba(255, 255, 255, 0.2)')};
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 70%);
  backdrop-filter: blur(22px) saturate(1.2);
  -webkit-backdrop-filter: blur(22px) saturate(1.2);
  transition: opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
    border: 0;
    background: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transform: none !important;

    &&:hover {
      box-shadow: none;
    }
  }
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

const DesktopProjectContent = styled.div`
  display: contents;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ProjectClient = styled.h4`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#080808' : '#dededb')};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.35;

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
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.02em;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Projects: FC = () => {
  const theme = useTheme();
  const overviewRef = useRef<HTMLDivElement>(null);
  const cursorScopeRef = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslation();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${theme.breakpoints.mobile})`).matches,
  );
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [isOverviewAtEnd, setIsOverviewAtEnd] = useState(false);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState<number | null>(null);
  const [hoveredCompanyIndex, setHoveredCompanyIndex] = useState<number | null>(null);
  const experiences = getLocalizedProfessionalExperiences(language);
  const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(
    () => new Set(experiences.map((_, index) => index)),
  );
  const pendingCompanyScrollRef = useRef<number | null>(null);
  const sidebarSelectedCompanyRef = useRef<number | null>(null);

  useEffect(() => {
    const carousel = overviewRef.current;
    if (!carousel) return undefined;

    const updateOverviewEdge = () => {
      setIsOverviewAtEnd(carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2);
    };

    updateOverviewEdge();
    carousel.addEventListener('scroll', updateOverviewEdge, { passive: true });
    const observer = new ResizeObserver(updateOverviewEdge);
    observer.observe(carousel);

    return () => {
      carousel.removeEventListener('scroll', updateOverviewEdge);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${theme.breakpoints.mobile})`);
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    return () => mediaQuery.removeEventListener('change', updateMobileState);
  }, [theme.breakpoints.mobile]);

  useEffect(() => {
    const handleScroll = () => setIsPageScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const clearSidebarSelection = () => {
      sidebarSelectedCompanyRef.current = null;
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
        clearSidebarSelection();
      }
    };

    window.addEventListener('wheel', clearSidebarSelection, { passive: true });
    window.addEventListener('touchstart', clearSidebarSelection, { passive: true });
    window.addEventListener('pointerdown', clearSidebarSelection);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', clearSidebarSelection);
      window.removeEventListener('touchstart', clearSidebarSelection);
      window.removeEventListener('pointerdown', clearSidebarSelection);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updateActiveCompany = () => {
      if (sidebarSelectedCompanyRef.current !== null) {
        setActiveCompanyIndex(sidebarSelectedCompanyRef.current);
        return;
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        const lastCompanyIndex = experiences.length - 1;
        setActiveCompanyIndex(lastCompanyIndex);
        return;
      }

      const mobile = window.matchMedia(`(max-width: ${theme.breakpoints.mobile})`).matches;
      const firstCompany = document.getElementById('company-0');
      const offset = mobile && firstCompany
        ? parseFloat(window.getComputedStyle(firstCompany).scrollMarginTop)
        : 7 * 16;
      const anchorY = window.scrollY + offset;
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
  }, [experiences, theme.breakpoints.mobile]);

  const scrollToCompany = (index: number) => {
    if (pendingCompanyScrollRef.current === index) return;

    sidebarSelectedCompanyRef.current = index;
    setActiveCompanyIndex(index);

    if (!expandedExperiences.has(index)) {
      pendingCompanyScrollRef.current = index;
      setExpandedExperiences((current) => new Set(current).add(index));
      return;
    }
    pendingCompanyScrollRef.current = null;
    document.getElementById(`company-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleExperience = (index: number) => {
    if (isMobile) return;

    pendingCompanyScrollRef.current = null;
    setExpandedExperiences((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    document.getElementById(`company-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ProjectsPageWrapper>
      <TargetCursor spinDuration={2} parallaxOn container={cursorScopeRef} />
      <div ref={cursorScopeRef}>
      <PageTitle
        className="cursor-target"
        style={{ width: 'fit-content' }}
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

      <OverviewCarousel $isAtEnd={isOverviewAtEnd}>
      <OverviewGrid as={motion.div} ref={overviewRef}>
        <OverviewItem as={motion.div} className="cursor-target" whileHover={overviewItemHover} initial="hidden" animate="visible" variants={overviewItemVariants} custom={0.55} transition={overviewItemTransition}>
          <FiCode aria-hidden={true} />
          <span>{t('projects.experience')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} className="cursor-target" whileHover={overviewItemHover} initial="hidden" animate="visible" variants={overviewItemVariants} custom={0.7} transition={overviewItemTransition}>
          <FiBriefcase aria-hidden={true} />
          <span>{t('projects.industries')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} className="cursor-target" whileHover={overviewItemHover} initial="hidden" animate="visible" variants={overviewItemVariants} custom={0.85} transition={overviewItemTransition}>
          <FiLayers aria-hidden={true} />
          <span>{t('projects.applications')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} className="cursor-target" whileHover={overviewItemHover} initial="hidden" animate="visible" variants={overviewItemVariants} custom={1} transition={overviewItemTransition}>
          <FiUsers aria-hidden={true} />
          <span>{t('projects.teams')}</span>
        </OverviewItem>
        <OverviewItem as={motion.div} className="cursor-target" whileHover={overviewItemHover} initial="hidden" animate="visible" variants={overviewItemVariants} custom={1.15} transition={overviewItemTransition}>
          <FiGitBranch aria-hidden={true} />
          <span>{t('projects.approach')}</span>
        </OverviewItem>
      </OverviewGrid>
      </OverviewCarousel>
      </div>

      <ProjectsExperienceLayout>
        <ExperienceSection
          as={motion.section}
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          transition={{ duration: 0.55, delay: 0.55, ease: 'easeOut' }}
        >
          <TimelineTitle>{t('projects.carouselTitle')}</TimelineTitle>
          <ExperienceTimeline>
            {experiences.map((experience, index) => {
              const isExpanded = isMobile || expandedExperiences.has(index);
              const panelId = `experience-projects-${index}`;

              return (
                <ExperienceTimelineItem
                  id={`company-${index}`}
                  $isExpanded={isExpanded}
                  key={`${experience.company}-${experience.period}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  <ExperienceContentFrame $isExpanded={isExpanded}>
                    <ExperienceHeader
                      $isExpanded={isExpanded}
                      $isActive={activeCompanyIndex === index}
                      data-sidebar-hovered={hoveredCompanyIndex === index ? 'true' : undefined}
                      role={isMobile ? undefined : 'button'}
                      tabIndex={isMobile ? undefined : 0}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => {
                        if (!isMobile) toggleExperience(index);
                      }}
                      onKeyDown={(event) => {
                        if (!isMobile && (event.key === 'Enter' || event.key === ' ')) {
                          event.preventDefault();
                          toggleExperience(index);
                        }
                      }}
                    >
                      <ExperienceIdentity>
                        <ExperienceCompany>{experience.company}</ExperienceCompany>
                        <ExperienceSeparator aria-hidden="true">|</ExperienceSeparator>
                        <ExperienceLocation>
                          <FiMapPin aria-hidden="true" />
                          {experience.location}
                        </ExperienceLocation>
                      </ExperienceIdentity>
                      <ExperienceDate $isActive={activeCompanyIndex === index} $isExpanded={isExpanded}>
                        <FiCalendar aria-hidden="true" />
                        {experience.period}
                        <FiChevronDown className="accordion-chevron" aria-hidden="true" />
                      </ExperienceDate>
                      {activeCompanyIndex === index && (
                        <ContactStarBorder
                          color={theme.mode === 'dark' ? '#ffffff' : '#18181b'}
                          trailColor={theme.mode === 'dark' ? '#ffffff' : '#18181b'}
                          duration={5}
                          direction="clockwise"
                          stars={2}
                          trailLength={1}
                          thickness={1}
                          radius={8}
                          glow={0.5}
                          hover="brighten"
                          sparkle={false}
                          clickPulse
                          theme={theme.mode}
                        />
                      )}
                  </ExperienceHeader>
                  <ExperienceCardsPanel
                      id={panelId}
                      initial={false}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0,
                        paddingTop: isExpanded
                          ? (isMobile ? theme.spacing[2] : `calc(15px + ${theme.spacing[2]})`)
                          : 0,
                        paddingBottom: isExpanded ? (isMobile ? 15 : theme.spacing[6]) : 0,
                      }}
                      transition={{
                        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: isExpanded ? 0.28 : 0.18, ease: 'easeOut' },
                        paddingTop: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        paddingBottom: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        marginBottom: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      }}
                      onAnimationComplete={() => {
                        if (isExpanded && pendingCompanyScrollRef.current === index) {
                          pendingCompanyScrollRef.current = null;
                          document.getElementById(`company-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      aria-hidden={!isExpanded}
                      inert={!isExpanded}
                    >
                      <CompanyProjectCarousel company={experience.company} projects={experience.projects}>
                        {experience.projects.map((project) => (
                          <ExperienceProject
                            as={motion.section}
                            key={`${experience.company}-${project.client}`}
                            animate={{
                              opacity: isExpanded ? (activeCompanyIndex === index ? 1 : 0.68) : 0,
                              y: isExpanded ? 0 : -8,
                            }}
                            whileHover={{ scale: 1.012 }}
                            whileFocus={{ scale: 1.012 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="chroma-card"
                            data-chroma-area=""
                          >
                            <DesktopProjectContent>
                              <ProjectClient className="project-client">{project.client}</ProjectClient>
                              <ProjectDescription>{project.description}</ProjectDescription>
                              <TechnologyList aria-label={`${project.client} technologies`}>
                                {project.technologies.map((technology) => (
                                  <Technology key={`${project.client}-${technology}`}>{technology}</Technology>
                                ))}
                              </TechnologyList>
                            </DesktopProjectContent>
                            <MobileProjectCard client={project.client} description={project.description} technologies={project.technologies} />
                          </ExperienceProject>
                        ))}
                      </CompanyProjectCarousel>
                    </ExperienceCardsPanel>
                  </ExperienceContentFrame>
                </ExperienceTimelineItem>
              );
            })}
          </ExperienceTimeline>
        </ExperienceSection>
        <CompanySidebar $isPageScrolled={isPageScrolled} aria-label="Companies">
          <CompanySidebarContent
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          >
            <CompanySidebarTitle $isPageScrolled={isPageScrolled}>{t('projects.carouselTitle')}</CompanySidebarTitle>
            <CompanyList style={{ '--company-count': experiences.length } as React.CSSProperties}>
              {experiences.map((experience, index) => (
                <CompanyListItem $isActive={activeCompanyIndex === index} key={`${experience.company}-sidebar`}>
                  <CompanyLink
                    as={motion.button}
                    type="button"
                    $isActive={activeCompanyIndex === index}
                    aria-current={activeCompanyIndex === index ? 'location' : undefined}
                    onClick={() => scrollToCompany(index)}
                    onMouseEnter={() => setHoveredCompanyIndex(index)}
                    onMouseLeave={() => setHoveredCompanyIndex(null)}
                    whileHover={{ scale: 1.035 }}
                    whileFocus={{ scale: 1.035 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                  >
                    <span>{experience.company}</span>
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
      <MobilePageScrollBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={1.5}
        layers={8}
        curve="bezier"
        tint={theme.mode === 'dark' ? 'rgba(8, 8, 8, 0.28)' : 'rgba(255, 255, 255, 0.3)'}
        autoHide
        duration={0.25}
        zIndex={5}
      />
    </ProjectsPageWrapper>
  );
};
