import styled from 'styled-components';
import { motion } from 'motion/react';

export const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  overflow: visible;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: clamp(12px, 2.5dvh, 24px) 1.5rem calc(6.5rem + env(safe-area-inset-bottom, 0px));
  }
`;

export const HomePageWrapper = styled.div.attrs({
  className: 'home-page-wrapper',
})`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  overflow-x: clip;
  overflow-y: clip;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 0;
    overflow-y: visible;
  }
`;

export const HomeMobileContent = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    text-align: left;
  }
`;

export const HomeMobileTitle = styled.h2<{ $isOpen: boolean }>`
  margin: 0 0 0.4em;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  font-size: clamp(24px, 4dvh, 32px);
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  line-height: 1.1;
  letter-spacing: 0.02em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    margin-bottom: ${({ $isOpen }) => $isOpen ? '0.4em' : '0'};
    padding-bottom: ${({ $isOpen }) => $isOpen ? '0.2em' : '0'};
    border-bottom: 1px solid ${({ $isOpen }) => $isOpen ? 'currentColor' : 'transparent'};
    transition: border-color 240ms ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;

export const HomeMobileToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4em;
  width: 100%;
  min-height: 44px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-align: left;

  svg {
    width: 0.7em;
    height: 0.7em;
    flex-shrink: 0;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`;

export const HomeMobilePanel = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => $isOpen ? '1fr' : '0fr'};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition:
    grid-template-rows 320ms ease,
    opacity 240ms ease,
    visibility 0s ${({ $isOpen }) => $isOpen ? '0s' : '320ms'};

  > div {
    min-height: 0;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const HomeMobileDescription = styled.p`
  margin: 0;
  font-size: clamp(14px, 2dvh, 16px);
  line-height: 1.4;
  white-space: normal;
  text-align: justify;
  hyphens: auto;
`;

export const HomeHero = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(52vw, calc(100vh * 490 / 915));
  aspect-ratio: 490 / 915;
  height: auto;
  min-height: 0;
  overflow: visible;
  isolation: isolate;
  pointer-events: none;
  transform: translateY(-50%) scale(0.78);
  transform-origin: right center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(47vw, calc(100vh * 490 / 915));
    transform: translateY(-50%) scale(0.72);
  }
`;

export const HomeSkillsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: visible;

  .home-skills-column {
    position: absolute;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    width: min(34vw, 480px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: ${({ theme }) => `${theme.spacing[8]} 0`};
    overflow: visible;
  }

  .home-skills-column-left {
    left: 2%;
    align-items: flex-start;
  }

  .home-skills-column-right {
    right: 2%;
    align-items: flex-end;
  }

  .home-skills-column-right .home-skills-slot {
    justify-content: flex-end;
  }

  .home-skills-slot {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 4rem;
    overflow: visible;
  }
`;

export const HomeSkill = styled(motion.span)<{ $side: 'left' | 'right' }>`
  display: block;
  position: relative;
  box-sizing: border-box;
  width: max-content;
  min-width: max-content;
  min-height: 1.35em;
  padding: 0.2em 0.45em;
  max-width: none;
  overflow: visible;
  color: ${({ theme }) => theme.colors.textLight};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(1.2rem, 2.8vw, 3rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 0.95;
  letter-spacing: -0.06em;
  text-align: ${({ $side }) => ($side === 'left' ? 'left' : 'right')};
  white-space: nowrap;
  will-change: transform, opacity, clip-path;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
  }

  @media (prefers-reduced-motion: reduce) {
    &:first-child {
      opacity: 0.62;
      clip-path: inset(0 0 0 0);
      transform: none;
    }
  }
`;

export const HomeBackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 0;
  filter: grayscale(100%) contrast(1.1);
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    object-fit: cover;
    object-position: center top;
  }
`;

export const HomeProfileTarget = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  box-sizing: border-box;
  width: min(52vw, calc(100vh * 490 / 915));
  aspect-ratio: 490 / 915;
  height: auto;
  min-width: 0;
  min-height: 0;
  padding: 0;
  border: 0;
  background: transparent;
  border-radius: 0;
  overflow: visible;
  transform: translateY(-50%);
  will-change: auto;
  cursor: default;
  pointer-events: none;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
    opacity: ${({ theme }) => theme.mode === 'light' ? 0.7 : 0.72};
    transform: none;

    > div {
      transform: none !important;
    }
  }
`;

export const HomeProfileAura = styled.span<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 2px solid ${({ theme }) => (theme.mode === 'light' ? 'rgba(0, 0, 0, 0.72)' : 'rgba(255, 255, 255, 0.82)')};
  border-radius: 0;
  box-shadow: ${({ theme }) => (theme.mode === 'light'
    ? '0 0 0.8rem rgba(0, 0, 0, 0.62), 0 0 1.6rem rgba(0, 0, 0, 0.32)'
    : '0 0 0.8rem rgba(255, 255, 255, 0.72), 0 0 1.6rem rgba(255, 255, 255, 0.38)')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: none;
  transform: none;
  transition: opacity 220ms ease;
  z-index: 2;
`;

export const HomeProfileOrbit = styled.div`
  position: absolute;
  inset: 0 auto auto 4.25rem;
  width: 50%;
  max-width: none;
  height: 100%;
  transform: none;
  pointer-events: none;
  z-index: 3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const HomeOrbitNode = styled(motion.a)<{ $role: 'frontend' | 'engineer'; $index: number; $isFocused: boolean }>`
  position: absolute;
  ${({ $role, $index, $isFocused }) => {
    if ($isFocused) {
      return `top: ${[11, 19, 27, 35, 43, 51, 59, 67, 75, 83][$index]}%; left: 55%;`;
    }

    const row = Math.floor($index / 5);
    const column = $index % 5;
    const top = $role === 'frontend' ? [18, 32][row] : [60, 74][row];
    const left = [6, 19, 32, 45, 58][column];

    return `top: ${top}%; left: ${left}%;`;
  }}
  display: block;
  width: clamp(1.9rem, 3.8vw, 3.6rem);
  height: clamp(1.9rem, 3.8vw, 3.6rem);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transform-origin: center;
  transition:
    top 420ms cubic-bezier(0.22, 1, 0.36, 1),
    left 420ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 220ms ease,
    border-color 220ms ease,
    color 220ms ease;
  will-change: transform, opacity;

  svg {
    width: 52%;
    height: 52%;
    display: block;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => (theme.mode === 'light'
      ? `0 0 0.45rem rgba(0, 0, 0, 0.9), 0 0 1.25rem rgba(0, 0, 0, 0.58), 0 0 2.4rem rgba(0, 0, 0, 0.28)`
      : `0 0 0.45rem rgba(255, 255, 255, 0.95), 0 0 1.25rem rgba(255, 255, 255, 0.72), 0 0 2.4rem rgba(255, 255, 255, 0.42)`)};
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $role, $index, $isFocused }) => {
      if ($isFocused) {
        return `top: ${[12, 20, 28, 36, 44, 52, 60, 68, 76, 84][$index]}%; left: 62%;`;
      }

      const row = Math.floor($index / 5);
      const column = $index % 5;
      const top = $role === 'frontend' ? [18, 31][row] : [57, 70][row];
      const left = [3, 16, 29, 42, 55][column];

      return `top: ${top}%; left: ${left}%;`;
    }}
    width: 1.65rem;
    height: 1.65rem;
  }
`;

export const HomeCornerLabel = styled.div<{ $position: 'top-left' | 'bottom-right'; $isDisabled?: boolean }>`
  position: absolute;
  z-index: 4;
  ${({ $position, theme }) => ($position === 'top-left'
    ? 'top: 40%; left: 48.5%;'
    : 'top: 50%; left: 48.5%; right: auto; bottom: auto;')}
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Sora', 'Segoe UI', sans-serif;
  font-size: clamp(1.65rem, 4.8vw, 4.8rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  letter-spacing: -0.08em;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
  user-select: none;
  white-space: nowrap;
  will-change: transform, opacity;
  transition: color 250ms ease, text-shadow 250ms ease;

  &:after {
    content: none;
    position: relative;
    z-index: 5;
    display: block;
    width: 0;
    height: 2px;
    margin-top: 0.28em;
    background: currentColor;
    transition: width 250ms ease;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 0 0 0.08em ${({ theme }) => theme.colors.primary}, 0 0 0.35em ${({ theme }) => theme.colors.primary};
    outline: none;

    &:after {
      width: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const HomeRoleSkills = styled(motion.ul)<{ $position: 'top-left' | 'bottom-left'; $fontFamily?: string }>`
  position: absolute;
  z-index: 4;
  ${({ $position }) => ($position === 'top-left'
    ? 'top: 8rem; left: 8rem;'
    : 'bottom: 8rem; left: 8rem;')}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.38em;
  width: max-content;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ $fontFamily }) => $fontFamily || "'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif"};
  font-size: clamp(0.9rem, 1.3vw, 1.3rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.02em;
  list-style: none;
  text-align: left;
  text-shadow: none;
  white-space: nowrap;
  pointer-events: none;

  li {
    display: block;
    width: max-content;
    font-weight: 400;
    text-shadow: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
    transition: none !important;

    li {
      transform: none !important;
      transition: none !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const HomeRoleTitle = styled(motion.span)<{ $fontFamily?: string; $letterSpacing?: string }>`
  display: block;
  font-family: ${({ $fontFamily }) => $fontFamily || "'Sora', 'Segoe UI', sans-serif"};
  font-size: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? '0.02em'};
  will-change: transform, opacity;
`;

export const HomeRoleDescription = styled(motion.span)<{ $position: 'top-left' | 'bottom-right' }>`
  position: absolute;
  z-index: 1;
  display: block;
  width: 100%;
  margin: 0;
  ${({ $position }) => ($position === 'bottom-right'
    ? 'right: 0; bottom: calc(100% + 3.25rem);'
    : 'top: calc(100% + 1.75rem); right: 0;')}
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: clamp(0.85rem, 1.05vw, 1.05rem);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0.01em;
  text-align: right;
  white-space: pre-line;
  pointer-events: none;
  text-shadow: none !important;
  filter: none;
  will-change: transform, opacity;

  &:before {
    content: ${({ $position }) => ($position === 'bottom-right' ? "''" : 'none')};
    display: block;
    width: 100%;
    height: 2px;
    margin-bottom: 1.75em;
    background: currentColor;
  }

  &:after {
    content: ${({ $position }) => ($position === 'top-left' ? "''" : 'none')};
    display: block;
    width: 100%;
    height: 2px;
    margin-top: 2em;
    background: currentColor;
  }

  strong,
  b {
    font-weight: 400;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    font-size: 0.78rem;
  }
`;

export const HomeWordmark = styled.h1`
  position: relative;
  align-self: center;
  z-index: 2;
  margin: 0;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  font-size: clamp(4rem, 10vw, 10rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  user-select: none;
  will-change: transform, opacity;
  letter-spacing: 0.10em;
`;

export const HomeNameBadge = styled.div`
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 49%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(42vw, 620px);
  height: 42px;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(0.7rem, 1vw, 1rem);
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 1.45em;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: 0;
  box-shadow: none;
  will-change: transform, opacity;
  backface-visibility: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 62%;
    width: 43vw;
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    font-size: 0.55rem;
    letter-spacing: 0.02em;
    white-space: normal;
    text-align: center;
  }
`;

export const TagStart = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0.8em;
  color: ${({ theme }) => theme.colors.text};
`;

export const NameText = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const TagEnd = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 1.4em;
  color: ${({ theme }) => theme.colors.text};
`;
