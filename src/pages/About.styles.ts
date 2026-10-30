import styled from 'styled-components';
import { motion } from 'motion/react';
import { PageWrapper } from '../components/PageLayout';
import { TrueFocus } from '../components/react-bits/TrueFocus';

export const AboutPageWrapper = styled(PageWrapper)`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    padding-top: 5rem;
    padding-bottom: calc(12rem + env(safe-area-inset-bottom, 0px));
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

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    top: 2rem;
    font-size: clamp(16rem, 56vw, 32rem);
  }
`;

export const AboutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(240px, 0.65fr);
  gap: ${({ theme }) => theme.spacing[16]};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[12]};

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
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
    font-size: 1.0625rem;
    line-height: 1.65;
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
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25em;

  .about-rotating-level {
    overflow: hidden;
    padding: 0 0.12em 0.12em 0;
    margin: 0 -0.12em -0.12em 0;
  }
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

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    display: none;
  }
`;

export const AsideTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const FocusList = styled(TrueFocus)`
  margin: 0;
  gap: ${({ theme }) => theme.spacing[3]};

  li {
    color: ${({ theme }) => theme.colors.textLight};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const AboutReveal = styled(motion.div)`
  display: block;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    p {
      font-size: 0.975rem;
    }
  }
`;

export const AboutLead = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4375rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;