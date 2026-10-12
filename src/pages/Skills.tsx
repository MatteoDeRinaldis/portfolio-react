import React, { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import styled, { keyframes } from 'styled-components';
import { FiCode, FiLayers, FiAward, FiDatabase, FiCheckCircle } from 'react-icons/fi';
import { SkillCard } from '../components/common/CvCards';
import { PageDescription, PageSection, PageTitle, PageWrapper } from '../components/PageLayout';
import { useTranslation } from '../i18n';
import { getLocalizedSkillCategories } from '../data/cv';

const LayersIcon = FiLayers as any;
const CodeIconSkill = FiCode as any;
const DatabaseIconSkill = FiDatabase as any;
const QualityIconSkill = FiCheckCircle as any;

const SkillsPageWrapper = styled(PageWrapper)`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 5rem;
    padding-bottom: calc(12rem + env(safe-area-inset-bottom, 0px));
  }
`;

const SkillsBackgroundIcon = styled.div`
  position: absolute;
  top: -12%;
  right: -10vw;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 2rem;
    font-size: clamp(16rem, 56vw, 32rem);
  }
`;

const revealVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const Skills: FC = () => {
  const overviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = overviewRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;

      setIsOverviewAtEnd(
        scrollLeft + clientWidth >= scrollWidth - 2
      );
    };

    handleScroll();

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const { t, language } = useTranslation();
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);
  const [isOverviewAtEnd, setIsOverviewAtEnd] = useState(false);

  const skillCategories = getLocalizedSkillCategories(language);

  useEffect(() => {
    const handleScroll = () => setIsPageScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (index: number) => {
    document.getElementById(`skill-category-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <SkillsPageWrapper>
      <PageTitle
        as={motion.h2}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
      >
        {t('skills.title')}
      </PageTitle>
      <PageDescription
        as={motion.p}
        initial="hidden"
        animate="visible"
        variants={revealVariants}
        transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
      >
        {t('skills.description')}
      </PageDescription>

      <OverviewCarousel $isAtEnd={isOverviewAtEnd}>
        <OverviewGrid as={motion.div} ref={overviewRef} id="skills-overview">
          <OverviewItem
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
          >
            <LayersIcon aria-hidden={true} />
            <span>{t('skills.architecture')}</span>
          </OverviewItem>
          <OverviewItem
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
          >
            <CodeIconSkill aria-hidden={true} />
            <span>{t('skills.react')}</span>
          </OverviewItem>
          <OverviewItem
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.4, delay: 0.85, ease: 'easeOut' }}
          >
            <DatabaseIconSkill aria-hidden={true} />
            <span>{t('skills.integrations')}</span>
          </OverviewItem>
          <OverviewItem
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.4, delay: 1, ease: 'easeOut' }}
          >
            <QualityIconSkill aria-hidden={true} />
            <span>{t('skills.quality')}</span>
          </OverviewItem>
          <OverviewItem
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.4, delay: 1.15, ease: 'easeOut' }}
          >
            <FiAward aria-hidden={true} />
            <span>{t('skills.ai')}</span>
          </OverviewItem>
        </OverviewGrid>
      </OverviewCarousel>

      <SkillsPageLayout>
        <PageSection
          as={motion.section}
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.55, delay: 1.1, ease: 'easeOut' }}
        >
          <SkillsSectionHeader>
            <h3>{t('skills.carouselTitle')}</h3>
          </SkillsSectionHeader>

          <SkillsGrid $hasHoveredItem={hoveredCategoryIndex !== null}>
            {skillCategories.map((skill, index) => (
              <SkillCardItem
                id={`skill-category-${index}`}
                key={skill.title}
                $isHovered={hoveredCategoryIndex === index}
                onMouseEnter={() => setHoveredCategoryIndex(index)}
                onMouseLeave={() => setHoveredCategoryIndex(null)}
              >
                <SkillCard skill={skill} />
              </SkillCardItem>
            ))}
          </SkillsGrid>
        </PageSection>

        <SkillsSidebar $isPageScrolled={isPageScrolled} aria-label="Skill categories">
          <SidebarContent
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          >
            <SidebarTitle $isPageScrolled={isPageScrolled}>{t('skills.carouselTitle')}</SidebarTitle>
            <CategoryList>
              {skillCategories.map((skill, index) => (
                <CategoryListItem $isHovered={hoveredCategoryIndex === index} key={`${skill.title}-sidebar`}>
                  <CategoryLink
                    type="button"
                    $isHovered={hoveredCategoryIndex === index}
                    onClick={() => scrollToCategory(index)}
                    onMouseEnter={() => setHoveredCategoryIndex(index)}
                    onMouseLeave={() => setHoveredCategoryIndex(null)}
                    as={motion.button}
                    whileHover={{ scale: 1.035 }}
                    whileFocus={{ scale: 1.035 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                  >
                    {skill.title}
                  </CategoryLink>
                </CategoryListItem>
              ))}
            </CategoryList>
          </SidebarContent>
        </SkillsSidebar>
      </SkillsPageLayout>

      <SkillsBackgroundIcon
        as={motion.div}
        aria-hidden="true"
        initial={{ opacity: 0, x: 320, rotate: -25 }}
        animate={{ opacity: 0.1, x: 0, rotate: -25 }}
        transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
      >
        <FiAward />
      </SkillsBackgroundIcon>
    </SkillsPageWrapper>
  );
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

      background: linear-gradient(
        to right,
        transparent,
        ${({ theme }) => theme.colors.background}
      );

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

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  span {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SkillsPageLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const SkillsSectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SkillsGrid = styled.div<{ $hasHoveredItem?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};

  ${({ $hasHoveredItem }) =>
    $hasHoveredItem &&
    `
    > * {
      opacity: 0.45;
    }
  `}

  &:hover > * {
    opacity: 0.45;
  }

  &:hover > *:hover {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;

    > *,
    &:hover > *,
    &:hover > *:hover {
      opacity: 1 !important;
    }
  }
`;

const SkillCardItem = styled.div<{ $isHovered?: boolean }>`
  scroll-margin-top: 8rem;
  transition: transform 220ms ease, opacity 180ms ease;

  ${({ $isHovered, theme }) =>
    $isHovered &&
    `
    transform: translateY(-4px) scale(1.03);
    z-index: 2;
    position: relative;
    opacity: 1 !important;

    > article {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 24px ${theme.colors.primary}66, ${theme.shadows.md};
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    transform: none !important;
    opacity: 1 !important;

    > article {
      border-color: ${({ theme }) => theme.colors.border} !important;
      box-shadow: ${({ theme }) => theme.shadows.sm} !important;
    }
  }
`;

const SkillsSidebar = styled.aside<{ $isPageScrolled: boolean }>`
  position: sticky;
  top: 9rem;
  align-self: start;
  justify-self: end;
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing[6]};
  transform: translateY(${({ $isPageScrolled }) => ($isPageScrolled ? '0' : '2.5rem')});
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

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

const SidebarContent = styled(motion.div)`
  width: 100%;
`;

const SidebarTitle = styled.h3<{ $isPageScrolled?: boolean }>`
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

const CategoryList = styled.ul`
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

const CategoryListItem = styled.li<{ $isHovered: boolean }>`
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
    background-color: ${({ theme, $isHovered }) => ($isHovered ? theme.colors.primary : theme.colors.background)};
    box-shadow: ${({ theme, $isHovered }) => ($isHovered ? `0 0 0.45rem ${theme.colors.primary}` : 'none')};
    content: '';
    transform: translateY(-50%);
    transition: background-color 180ms ease, box-shadow 180ms ease;
  }

  &:has(> button:hover)::before,
  &:has(> button:focus-visible)::before {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryLink = styled.button<{ $isHovered: boolean }>`
  display: inline-block;
  width: auto;
  max-width: 100%;
  padding: ${({ theme }) => `${theme.spacing[1]} 0`};
  border: none;
  background: transparent;
  color: ${({ theme, $isHovered }) => ($isHovered ? theme.colors.text : theme.colors.textLight)};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.25;
  text-align: right;
  cursor: pointer;
  transition: color 180ms ease, text-shadow 180ms ease;

  ${({ $isHovered, theme }) => ($isHovered ? `text-shadow: 0 0 0.45rem ${theme.colors.primary};` : '')}

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
