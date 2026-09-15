import styled from 'styled-components';
import { motion } from 'motion/react';
import { PageWrapper } from '../components/PageLayout';

export const AboutPageWrapper = styled(PageWrapper)`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    overflow-y: visible;
  }
`;

export const AboutBackgroundIcon = styled.div`
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

export const AboutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(240px, 0.65fr);
  gap: ${({ theme }) => theme.spacing[16]};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

export const AboutCopy = styled.article`
  text-align: justify;
  text-justify: inter-word;

  p {
    margin: 0 0 ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.85;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const AboutHeading = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.04em;
`;

export const AboutSectionTitle = styled.h4`
  margin: ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const AboutAside = styled.aside`
  align-self: start;
  justify-self: end;
  position: sticky;
  top: 7rem;
  width: min(100%, 280px);
  padding-left: ${({ theme }) => theme.spacing[6]};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: static;
    justify-self: stretch;
    width: 100%;
    padding-top: ${({ theme }) => theme.spacing[6]};
    padding-left: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 0;
  }
`;

export const AsideTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const FocusList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    color: ${({ theme }) => theme.colors.textLight};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const AboutReveal = styled(motion.div)`
  display: block;
`;

export const AboutLead = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;