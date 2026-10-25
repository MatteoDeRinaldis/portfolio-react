import styled, { css } from 'styled-components';
import { CompactCarousel } from '../react-bits/CompactCarousel.styles';

export const FooterWrapper = styled.footer`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition:
    background-color ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: -1px;
  }
`;

export const FooterToggle = styled.button<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => (theme.mode === 'dark'
    ? '0 6px 16px rgba(0, 0, 0, 0.7), 0 2px 5px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
    : '0 6px 16px rgba(17, 17, 17, 0.3), 0 2px 5px rgba(17, 17, 17, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.7)')};
  transform: translate(-50%, -50%);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition:
    opacity ${({ theme }) => theme.transitions.base},
    visibility ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    transform: translate(-50%, -54%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing[4]};
    left: auto;
    width: 3rem;
    height: 3rem;
    top: ${({ theme }) => `calc(-1 * ${theme.spacing[4]})`};
    transform: translateY(-100%);

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-bottom: 2px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:hover {
      transform: translateY(calc(-100% - 4px));
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[32]};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: ${({ theme }) => theme.spacing[4]};
    row-gap: ${({ theme }) => theme.spacing[2]};
    padding-left: ${({ theme }) => theme.spacing[4]};
    padding-right: ${({ theme }) => theme.spacing[4]};
  }
`;

export const FooterText = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    order: 1;
    flex-basis: 100%;
  }
`;

const hideOnDesktop = css<{ $hideOnDesktop?: boolean }>`
  ${({ $hideOnDesktop, theme }) => $hideOnDesktop && css`
    @media (min-width: calc(${theme.breakpoints.mobile} + 1px)) {
      display: none;
    }
  `}
`;

export const FooterSeparator = styled.span<{ $hideOnDesktop?: boolean }>`
  margin: 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
  ${hideOnDesktop}
`;

export const FooterLegal = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: max-content;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: contents;
  }
`;

export const SocialLinks = styled.div<{ $isHomeIdle: boolean }>`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};

  ${({ $isHomeIdle, theme }) => $isHomeIdle && css`
    a, button {
      color: ${theme.mode === 'light' ? '#b9b9b9' : theme.colors.textLight};
      transition: color ${theme.transitions.base};

      &:hover {
        color: ${theme.colors.primary};
      }
    }

    @media (max-width: ${theme.breakpoints.mobile}) {
      ${theme.mode === 'light' && css`
        a, button {
          color: ${theme.colors.textLight};

          &:hover {
            color: ${theme.colors.primary};
          }
        }
      `}
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: contents;
  }
`;

export const SocialLink = styled.a<{ $isHomeEngineerHovered?: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme, $isHomeEngineerHovered }) => (theme.mode === 'dark' && $isHomeEngineerHovered ? '#000' : theme.colors.textLight)};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &:hover {
    color: ${({ theme, $isHomeEngineerHovered }) => (theme.mode === 'dark' && $isHomeEngineerHovered ? '#000' : theme.colors.primary)};
  }
`;

export const CvLink = styled.button<{ $isHomeEngineerHovered?: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[2]};
  margin-bottom: 1px;
  padding-left: ${({ theme }) => theme.spacing[6]};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme, $isHomeEngineerHovered }) => (theme.mode === 'dark' && $isHomeEngineerHovered ? '#000' : theme.colors.textLight)};
  font-size: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    color: ${({ theme, $isHomeEngineerHovered }) => (theme.mode === 'dark' && $isHomeEngineerHovered ? '#000' : theme.colors.primary)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
    padding-left: ${({ theme }) => theme.spacing[4]};
    white-space: nowrap;
  }
`;

export const PrivacyLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing[2]};
  padding-left: ${({ theme }) => theme.spacing[6]};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
    margin-right: 0;
    padding-right: ${({ theme }) => theme.spacing[4]};
    padding-left: 0;
    border-left: 0;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    white-space: nowrap;
  }
`;

export const TechnicalOverviewLink = styled.button<{ $hideOnDesktop?: boolean }>`
  display: inline-flex;
  ${hideOnDesktop}
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  white-space: nowrap;
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 1em;
    height: 1em;
    font-size: inherit;
    vertical-align: -0.08em;
    white-space: nowrap;

    svg {
      width: 0.9em;
      height: 0.9em;
    }
  }

  svg {
    display: block;
    width: 1rem;
    height: 1rem;
  }
`;

export const TechnicalOverviewBody = styled.div`
  overflow: auto;
  padding: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const TechnicalOverviewIntro = styled.p`
  margin: ${({ theme }) => theme.spacing[1]} 0 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

export const TechnicalOverviewHeading = styled.div`
  min-width: 0;
`;

export const TechnicalOverviewSections = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const TechnicalOverviewMobileCarousel = styled(CompactCarousel)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    margin-top: ${({ theme }) => theme.spacing[4]};
  }
`;

export const TechnicalOverviewFullWidth = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[8]};
    margin-top: ${({ theme }) => theme.spacing[8]};
  }
`;

export const TechnicalOverviewSection = styled.section`
  min-width: 0;

  .mobile-only {
    display: none;
  }

  h3 {
    display: inline-flex;
    align-items: center;
    margin: 0 0 ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#080808' : '#dededb')};
  }

  p {
    margin: 0;
    text-align: justify;
    text-justify: inter-word;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: block;
    }
  }
`;

export const TechnicalOverviewTree = styled.pre`
  overflow-x: auto;
  margin: ${({ theme }) => theme.spacing[3]} 0 0;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.mode === 'dark' ? '#090909' : '#f4f4f4'};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.6;

  code {
    padding: 0;
    border-radius: 0;
    background: transparent;
    color: inherit;
    font: inherit;
  }
`;

export const TechnicalOverviewRepository = styled.a`
  display: flex;
  width: fit-content;
  margin-left: auto;
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.border};
  text-underline-offset: 0.2em;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }
`;

export const PdfModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: rgba(0, 0, 0, 0.7);
`;

export const PdfModalContent = styled.div<{ $isGlass?: boolean }>`
  display: flex;
  flex-direction: column;
  width: min(100%, 820px);
  max-height: calc(100vh - 3rem);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isGlass }) => ($isGlass
    ? theme.mode === 'dark' ? 'rgba(8, 8, 8, 0.72)' : 'rgba(255, 255, 255, 0.72)'
    : theme.colors.background)};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  ${({ $isGlass }) => $isGlass && css`
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  `}
`;

export const PdfModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TechnicalOverviewHeader = styled(PdfModalHeader)`
  align-items: flex-start;
  border-bottom: 0;
`;

export const PdfModalTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2em;
  }
`;

export const PdfDownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;

export const PdfCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }
`;

export const PdfDocument = styled('div')`
  overflow: auto;
  padding: ${({ theme }) => theme.spacing[6]};

  .react-pdf__Page {
    width: fit-content;
    max-width: 100%;
    margin: 0 auto ${({ theme }) => theme.spacing[6]};
    box-shadow: ${({ theme }) => theme.shadows.md};

    &:last-child {
      margin-bottom: 0;
    }
  }

  .react-pdf__Page__canvas {
    display: block;
    max-width: 100%;
    height: auto !important;
  }
`;
