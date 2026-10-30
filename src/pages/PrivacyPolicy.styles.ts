import styled from 'styled-components';
import { motion } from 'motion/react';

export const PrivacyPageWrapper = styled.div`
  position: relative;
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing[8]};
  padding-bottom: calc(${({ theme }) => theme.spacing[8]} + 4.5rem);
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[32]};
  overflow-x: clip;
  overflow-y: visible;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    padding-top: ${({ theme }) => theme.spacing[4]};
    padding-right: ${({ theme }) => theme.spacing[4]};
    padding-bottom: calc(${({ theme }) => theme.spacing[4]} + 9rem);
    padding-left: ${({ theme }) => theme.spacing[4]};
  }
`;

export const PrivacyBackgroundIcon = styled.div`
  position: absolute;
  top: -5%;
  right: -10vw;
  z-index: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(18rem, 42vw, 44rem);
  opacity: 0.16;
  line-height: 1;
  pointer-events: none;
  transform-origin: center;

  svg {
    display: block;
    width: 1em;
    height: 1em;
  }

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    right: -18vw;
    top: 1rem;
    font-size: clamp(11rem, 48vw, 22rem);
    opacity: 0.08;
  }
`;

export const PrivacyPageContent = styled(motion.article)`
  width: min(100%, 880px);
  margin-top: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.8;
  text-align: justify;

  p {
    margin: 0 0 ${({ theme }) => theme.spacing[4]};
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  code {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.95em;
  }
`;

export const PrivacyMeta = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const PrivacySection = styled.section`
  margin-top: ${({ theme }) => theme.spacing[8]};

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const PrivacySubsection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const PrivacyList = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[6]};

  li {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
`;

export const PrivacyContact = styled.p`
  padding-left: ${({ theme }) => theme.spacing[4]};
  border-left: 2px solid ${({ theme }) => theme.colors.border};

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
