import React, { FC, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { AnimatePresence, motion } from 'motion/react';
import type { IconType } from 'react-icons';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SiAxios, SiCss, SiCypress, SiGit, SiGithub, SiGithubcopilot, SiHtml5, SiJavascript, SiJest, SiJira, SiMui, SiNpm, SiPostman, SiReact, SiRedux, SiStorybook, SiTailwindcss, SiTypescript, SiWebpack } from 'react-icons/si';
import profileImage from '../assets/img/MDR_Profile.webp';
import frontendProfileImage from '../assets/img/MDR_Profile_FE.webp';
import engineerProfileImage from '../assets/img/MDR_Profile_EN.webp';
import { getLocalizedSkillCategories } from '../data/cv';
import { useTranslation } from '../i18n';
import {
  HomeContainer,
  HomeBackgroundImage,
  HomeProfileTarget,
  HomeProfileOrbit,
  HomeOrbitNode,
  HomeSkillsLayer,
  HomeSkill,
  HomeRoleSkills,
  HomeCornerLabel,
  HomeRoleTitle,
  HomeRoleDescription,
  HomePageWrapper,
  HomeMobileContent,
  HomeMobileTitle,
  HomeMobileToggle,
  HomeMobilePanel,
  HomeMobileDescription,
} from '../styles/Home.styles';

type HomeProps = {
  onProfileHoverChange: (isHovered: boolean) => void;
  onEngineerHoverChange: (isHovered: boolean) => void;
  onRoleHoverChange: (isHovered: boolean) => void;
};

type OrbitTechnology = {
  name: string;
  Icon: IconType;
  documentationUrl: string;
};

const frontendTechnologies: OrbitTechnology[] = [
  { name: 'React', Icon: SiReact, documentationUrl: 'https://react.dev/' },
  { name: 'TypeScript', Icon: SiTypescript, documentationUrl: 'https://www.typescriptlang.org/docs/' },
  { name: 'JavaScript', Icon: SiJavascript, documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'HTML5', Icon: SiHtml5, documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS3', Icon: SiCss, documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'Redux', Icon: SiRedux, documentationUrl: 'https://redux.js.org/' },
  { name: 'Axios', Icon: SiAxios, documentationUrl: 'https://axios-http.com/docs/intro' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, documentationUrl: 'https://tailwindcss.com/docs' },
  { name: 'Material UI', Icon: SiMui, documentationUrl: 'https://mui.com/material-ui/getting-started/' },
  { name: 'Storybook', Icon: SiStorybook, documentationUrl: 'https://storybook.js.org/docs' },
];

const engineerTechnologies: OrbitTechnology[] = [
  { name: 'Git', Icon: SiGit, documentationUrl: 'https://git-scm.com/doc' },
  { name: 'GitHub', Icon: SiGithub, documentationUrl: 'https://docs.github.com/' },
  { name: 'npm', Icon: SiNpm, documentationUrl: 'https://docs.npmjs.com/' },
  { name: 'Webpack', Icon: SiWebpack, documentationUrl: 'https://webpack.js.org/concepts/' },
  { name: 'REST APIs', Icon: SiPostman, documentationUrl: 'https://www.postman.com/api-platform/api-client/' },
  { name: 'Jest', Icon: SiJest, documentationUrl: 'https://jestjs.io/docs/getting-started' },
  { name: 'Cypress', Icon: SiCypress, documentationUrl: 'https://docs.cypress.io/' },
  { name: 'Azure DevOps', Icon: SiGit, documentationUrl: 'https://learn.microsoft.com/en-us/azure/devops/' },
  { name: 'Jira', Icon: SiJira, documentationUrl: 'https://www.atlassian.com/software/jira' },
  { name: 'GitHub Copilot CLI', Icon: SiGithubcopilot, documentationUrl: 'https://github.com/features/copilot/cli' },
];

const frontendSkillOrder = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML5',
  'CSS/SCSS/LESS',
  'Redux',
  'Axios',
  'Tailwind CSS',
  'Material UI',
  'Storybook',
];

const engineerSkillOrder = [
  'Git',
  'GitHub',
  'npm/yarn',
  'Webpack',
  'REST APIs',
  'Jest',
  'Cypress',
  'Azure DevOps',
  'Jira',
  'GitHub Copilot CLI',
];

export const Home: FC<HomeProps> = ({ onProfileHoverChange, onEngineerHoverChange, onRoleHoverChange }) => {
  const { language, t } = useTranslation();
  const theme = useTheme();
  const mobileQuery = `(max-width: ${theme.breakpoints.mobile})`;
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(mobileQuery).matches);
  const [mobileRole, setMobileRole] = useState<'frontend' | 'engineer' | null>(null);
  const isMobileFrontendOpen = mobileRole === 'frontend';
  const isMobileEngineerOpen = mobileRole === 'engineer';

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener('change', updateMobile);
    return () => media.removeEventListener('change', updateMobile);
  }, [mobileQuery]);

  useEffect(() => {
    if (!isMobile || mobileRole === null) return;

    const handleOutsideClick = (event: PointerEvent) => {
      const mobileContent = mobileContentRef.current;

      if (
        mobileContent &&
        !mobileContent.contains(event.target as Node)
      ) {
        setMobileRole(null);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isMobile, mobileRole]);

  const [activeBatchIndex, setActiveBatchIndex] = useState<number | null>(null);
  const [areProfileLabelsVisible] = useState(true);
  const [hasCornerLabelsEntered, setHasCornerLabelsEntered] = useState(false);
  const [activeRole, setActiveRole] = useState<'frontend' | 'engineer' | null>(null);
  const [leavingRole, setLeavingRole] = useState<'frontend' | 'engineer' | null>(null);
  const [isOrbitEntering, setIsOrbitEntering] = useState(false);
  const [hasProfileImageMounted, setHasProfileImageMounted] = useState(false);
  const roleExitTimerRef = useRef<number | null>(null);
  const orbitEntryTimerRef = useRef<number | null>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    onProfileHoverChange(false);
    onEngineerHoverChange(false);
    if (roleExitTimerRef.current !== null) {
      window.clearTimeout(roleExitTimerRef.current);
    }
    if (orbitEntryTimerRef.current !== null) {
      window.clearTimeout(orbitEntryTimerRef.current);
    }
  }, [onProfileHoverChange, onEngineerHoverChange]);

  useEffect(() => {
    onEngineerHoverChange(activeRole === 'engineer');
  }, [activeRole, onEngineerHoverChange]);

  useEffect(() => {
    onRoleHoverChange(activeRole !== null);
    return () => onRoleHoverChange(false);
  }, [activeRole, onRoleHoverChange]);

  useEffect(() => {
    orbitEntryTimerRef.current = window.setTimeout(() => {
      setIsOrbitEntering(false);
      orbitEntryTimerRef.current = null;
    }, 0);

    return () => {
      if (orbitEntryTimerRef.current !== null) {
        window.clearTimeout(orbitEntryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setHasProfileImageMounted(true);
  }, []);

  const handleRoleEnter = (role: 'frontend' | 'engineer') => {
    if (roleExitTimerRef.current !== null) {
      window.clearTimeout(roleExitTimerRef.current);
      roleExitTimerRef.current = null;
    }
    if (orbitEntryTimerRef.current !== null) {
      window.clearTimeout(orbitEntryTimerRef.current);
      orbitEntryTimerRef.current = null;
    }
    setIsOrbitEntering(false);
    setLeavingRole(null);
    setActiveRole(role);
  };

  const handleRoleLeave = (role: 'frontend' | 'engineer') => {
    setActiveRole(null);
    setLeavingRole(role);
    setIsOrbitEntering(false);
    if (orbitEntryTimerRef.current !== null) {
      window.clearTimeout(orbitEntryTimerRef.current);
    }
    roleExitTimerRef.current = window.setTimeout(() => {
      setLeavingRole(null);
      roleExitTimerRef.current = null;
    }, 260);
  };

  const skills = getLocalizedSkillCategories(language)
    .flatMap((category) => category.items)
    .filter((skill) => skill !== 'Cross-platform Development');
  const localizedCategories = getLocalizedSkillCategories(language);
  const frontendSkills = localizedCategories
    .filter(({ icon }) => ['frontend', 'ui', 'design', 'mobile'].includes(icon))
    .flatMap((category) => category.items)
    .filter((skill) => skill !== 'Cross-platform Development')
    .sort((firstSkill, secondSkill) => {
      const firstIndex = frontendSkillOrder.indexOf(firstSkill);
      const secondIndex = frontendSkillOrder.indexOf(secondSkill);

      return (firstIndex === -1 ? Number.MAX_SAFE_INTEGER : firstIndex) - (secondIndex === -1 ? Number.MAX_SAFE_INTEGER : secondIndex);
    })
    .slice(0, 10);
  const engineerSkills = localizedCategories
    .filter(({ icon }) => ['tools', 'devops', 'testing', 'backend', 'security', 'methodologies'].includes(icon))
    .flatMap((category) => category.items)
    .sort((firstSkill, secondSkill) => {
      const firstIndex = engineerSkillOrder.indexOf(firstSkill);
      const secondIndex = engineerSkillOrder.indexOf(secondSkill);

      return (firstIndex === -1 ? Number.MAX_SAFE_INTEGER : firstIndex) - (secondIndex === -1 ? Number.MAX_SAFE_INTEGER : secondIndex);
    })
    .slice(0, 10);
  const leftSkills = skills.filter((_, index) => index % 2 === 0);
  const rightSkills = skills.filter((_, index) => index % 2 !== 0);
  const skillBatchCount = Math.max(Math.ceil(leftSkills.length / 2), Math.ceil(rightSkills.length / 2));
  const leftSlotPatterns = [
    [0, 3],
    [2, 5],
    [1, 4],
    [4, 1],
    [3, 0],
    [5, 2],
  ];
  const rightSlotPatterns = [
    [2, 5],
    [0, 3],
    [4, 1],
    [1, 4],
    [5, 2],
    [3, 0],
  ];
  const activeSkills = false;

  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      setActiveBatchIndex(0);
    }, 1800);
    const skillTimer = window.setInterval(() => {
      setActiveBatchIndex((currentIndex) => (currentIndex === null ? 0 : (currentIndex + 1) % skillBatchCount));
    }, 3600);
    const labelsTimer = window.setTimeout(() => {
      setHasCornerLabelsEntered(true);
    }, 1000);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(skillTimer);
      window.clearTimeout(labelsTimer);
    };
  }, [skillBatchCount]);

  const activeLeftSkills = activeBatchIndex === null ? [] : leftSkills.slice(activeBatchIndex * 2, activeBatchIndex * 2 + 2);
  const activeRightSkills = activeBatchIndex === null ? [] : rightSkills.slice(activeBatchIndex * 2, activeBatchIndex * 2 + 2);
  const leftSlots = activeBatchIndex === null ? [] : leftSlotPatterns[activeBatchIndex % leftSlotPatterns.length];
  const rightSlots = activeBatchIndex === null ? [] : rightSlotPatterns[activeBatchIndex % rightSlotPatterns.length];
  const profileRole = isMobile ? mobileRole : activeRole;
  const activeProfileImage = profileRole === 'frontend'
    ? frontendProfileImage
    : profileRole === 'engineer'
      ? engineerProfileImage
      : profileImage;

  useEffect(() => {
    const preloadImages = [profileImage, frontendProfileImage, engineerProfileImage];

    preloadImages.forEach((src) => {
      const image = new window.Image();
      image.decoding = 'async';
      image.src = src;
    });
  }, []);

  const orbitNodes = [
    ...frontendTechnologies.map((technology, index) => ({ technology, role: 'frontend' as const, index })),
    ...engineerTechnologies.map((technology, index) => ({ technology, role: 'engineer' as const, index })),
  ];

  const renderSkill = (side: 'left' | 'right', skill: string | undefined) => (
    <AnimatePresence mode="wait">
      {skill ? (
        <HomeSkill
          key={`${side}-${skill}-${activeBatchIndex}`}
          $side={side}
          initial={{ opacity: 0, x: side === 'left' ? -48 : 48, clipPath: side === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            x: side === 'left' ? 48 : -48,
            scale: 0.96,
            filter: 'blur(5px)',
          }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        >
          {skill}
        </HomeSkill>
      ) : null}
    </AnimatePresence>
  );

  const renderSkillSlots = (side: 'left' | 'right') =>
    Array.from({ length: 6 }, (_, slotIndex) => {
      const activeSlots = side === 'left' ? leftSlots : rightSlots;
      const skillIndex = activeSlots.indexOf(slotIndex);
      const activeSkills = side === 'left' ? activeLeftSkills : activeRightSkills;

      return (
        <div className="home-skills-slot" key={`${side}-slot-${slotIndex}`}>
          {renderSkill(side, skillIndex >= 0 ? activeSkills[skillIndex] : undefined)}
        </div>
      );
    });

  const renderRoleSkills = (
    role: 'frontend' | 'engineer',
    roleSkills: string[],
    position: 'top-left' | 'bottom-left' = role === 'frontend' ? 'top-left' : 'bottom-left',
  ) => (
    <HomeRoleSkills
      key={`${role}-skills`}
      $fontFamily="Consolas, 'Courier New', monospace"
      $position={position}
      as={motion.ul}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label={`${role} skills`}
    >
      {roleSkills.map((skill, index) => (
        <motion.li
          key={skill}
          initial={{ opacity: 0, y: role === 'frontend' ? -(index + 1) * 20 : (index + 1) * 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.38,
            delay: (role === 'engineer' ? roleSkills.length - 1 - index : index) * 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {skill}
        </motion.li>
      ))}
    </HomeRoleSkills>
  );

  return (
    <HomePageWrapper>
      <HomeContainer>
        <HomeMobileContent ref={mobileContentRef}>
          <section aria-labelledby="mobile-frontend-title">
            <HomeMobileTitle $isOpen={isMobileFrontendOpen}>
              <HomeMobileToggle
                id="mobile-frontend-title"
                type="button"
                aria-expanded={isMobileFrontendOpen}
                aria-controls="mobile-frontend-description"
                onClick={() => setMobileRole((role) => role === 'frontend' ? null : 'frontend')}
              >
                FRONTEND
                {isMobileFrontendOpen ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
              </HomeMobileToggle>
            </HomeMobileTitle>
            <HomeMobilePanel id="mobile-frontend-description" $isOpen={isMobileFrontendOpen} aria-hidden={!isMobileFrontendOpen}>
              <div>
                <HomeMobileDescription>{t('pages.frontendExperience')}</HomeMobileDescription>
              </div>
            </HomeMobilePanel>
          </section>
          <section aria-labelledby="mobile-engineer-title">
            <HomeMobileTitle $isOpen={isMobileEngineerOpen}>
              <HomeMobileToggle
                id="mobile-engineer-title"
                type="button"
                aria-expanded={isMobileEngineerOpen}
                aria-controls="mobile-engineer-description"
                onClick={() => setMobileRole((role) => role === 'engineer' ? null : 'engineer')}
              >
                ENGINEER
                {isMobileEngineerOpen ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
              </HomeMobileToggle>
            </HomeMobileTitle>
            <HomeMobilePanel id="mobile-engineer-description" $isOpen={isMobileEngineerOpen} aria-hidden={!isMobileEngineerOpen}>
              <div>
                <HomeMobileDescription>{t('pages.engineerExperience')}</HomeMobileDescription>
              </div>
            </HomeMobilePanel>
          </section>
        </HomeMobileContent>
        <HomeCornerLabel
          $position="top-left"
          $isDisabled={!areProfileLabelsVisible || !hasCornerLabelsEntered}
          as={motion.button}
          type="button"
          aria-expanded={activeRole === 'frontend'}
          onMouseEnter={() => handleRoleEnter('frontend')}
          onMouseLeave={() => handleRoleLeave('frontend')}
          onFocus={() => handleRoleEnter('frontend')}
          onBlur={() => handleRoleLeave('frontend')}
          initial={{ opacity: 0, x: -96 }}
          animate={{ opacity: areProfileLabelsVisible ? (activeRole ? 1 : 0.45) : 0, x: areProfileLabelsVisible ? 0 : -24 }}
          transition={{
            duration: areProfileLabelsVisible ? hasCornerLabelsEntered ? 0.25 : 0.85 : 0.85,
            delay: 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeRole !== 'engineer' && leavingRole !== 'engineer' && (
              <HomeRoleTitle
                key="frontend-title"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                FRONTEND
              </HomeRoleTitle>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {activeRole === 'frontend' && (
              <HomeRoleDescription
                key="frontend-description"
                $position="top-left"
                initial={{ opacity: 0, y: -28 }}
                animate={{ opacity: 0.72, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('pages.frontendExperience')}
              </HomeRoleDescription>
            )}
          </AnimatePresence>
        </HomeCornerLabel>
        <HomeCornerLabel
          $position="bottom-right"
          $isDisabled={!areProfileLabelsVisible || !hasCornerLabelsEntered}
          as={motion.button}
          type="button"
          aria-expanded={activeRole === 'engineer'}
          onMouseEnter={() => handleRoleEnter('engineer')}
          onMouseLeave={() => handleRoleLeave('engineer')}
          onFocus={() => handleRoleEnter('engineer')}
          onBlur={() => handleRoleLeave('engineer')}
          initial={{ opacity: 0, x: 96 }}
          animate={{ opacity: areProfileLabelsVisible ? (activeRole ? 1 : 0.45) : 0, x: areProfileLabelsVisible ? 0 : 24 }}
          transition={{
            duration: areProfileLabelsVisible ? hasCornerLabelsEntered ? 0.25 : 0.85 : 0.85,
            delay: 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeRole !== 'frontend' && leavingRole !== 'frontend' && (
              <HomeRoleTitle
                key="engineer-title"
                $letterSpacing="0.4rem"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                ENGINEER
              </HomeRoleTitle>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {activeRole === 'engineer' && (
              <HomeRoleDescription
                key="engineer-description"
                $position="bottom-right"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 0.72, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('pages.engineerExperience')}
              </HomeRoleDescription>
            )}
          </AnimatePresence>
        </HomeCornerLabel>
        <AnimatePresence mode="wait" initial={false}>
          {activeRole === 'frontend' && renderRoleSkills('frontend', frontendSkills, 'top-left')}
          {activeRole === 'engineer' && renderRoleSkills('engineer', engineerSkills, 'bottom-left')}
        </AnimatePresence>
        <HomeProfileTarget aria-hidden="true">
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <AnimatePresence mode="sync" initial={false}>
              <HomeBackgroundImage
                as={motion.img}
                key={activeProfileImage}
                src={activeProfileImage}
                alt=""
                    initial={hasProfileImageMounted ? { opacity: 0 } : false}
                    animate={{ opacity: theme.mode === 'light' ? 0.8 : 0.72 }}
                exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </AnimatePresence>
          </motion.div>
        </HomeProfileTarget>
        <HomeProfileOrbit className="home-profile-orbit">
          <AnimatePresence>
            {orbitNodes
              .filter(({ role }) => activeRole === null || role === activeRole)
              .map(({ technology, role, index }) => {
                const TechnologyIcon = technology.Icon;

                return (
                  <HomeOrbitNode
                    key={`${role}-orbit-node-${index}`}
                    href={technology.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${technology.name} documentation`}
                    title={technology.name}
                    $role={role}
                    $index={index}
                    $isFocused={activeRole === role}
                    whileHover={{ scale: 1.24, transition: { duration: 0.04, ease: 'linear' } }}
                    whileFocus={{ scale: 1.24, transition: { duration: 0.04, ease: 'linear' } }}
                    initial={{ opacity: 0, x: '-42vw', scale: 0.72 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.55,
                        delay: isOrbitEntering ? index * 0.08 : 0,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: '-42vw',
                      scale: 0.72,
                      transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                    }}
                    transition={{ duration: 0.04, ease: 'linear', delay: 0 }}
                  >
                    <TechnologyIcon aria-hidden="true" focusable="false" />
                  </HomeOrbitNode>
                );
              })}
          </AnimatePresence>
        </HomeProfileOrbit>
        {activeSkills &&
          <HomeSkillsLayer aria-hidden="true">
            <div className="home-skills-column home-skills-column-left">
              {renderSkillSlots('left')}
            </div>
            <div className="home-skills-column home-skills-column-right">
              {renderSkillSlots('right')}
            </div>
          </HomeSkillsLayer>
        }
        {/* <HomeHero>
          <HomeWordmark
            as={motion.h1}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            MDR
          </HomeWordmark>
          <HomeNameBadge
            as={motion.div}
            initial={{ opacity: 0, x: 'calc(-50% + 32px)', y: '-50%' }}
            animate={{ opacity: 1, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
          >
            <TagStart>{'<'}</TagStart>
            <NameText>MATTEO DE RINALDIS</NameText>
            <TagEnd>{' />'}</TagEnd>
          </HomeNameBadge>
        </HomeHero> */}
      </HomeContainer>
    </HomePageWrapper>
  );
};
