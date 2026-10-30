import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { PageWrapper } from '../components/PageLayout';

export const ContactPageWrapper = styled(PageWrapper)`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;

  .contact-typed-title {
    display: inline-block;
    min-height: 1em;
    border-right: 0.08em solid transparent;
  }

  .contact-typed-title.is-typing {
    border-right-color: currentColor;
    animation: contact-caret-blink 0.9s steps(2, start) infinite;
  }

  @keyframes contact-caret-blink {
    to {
      border-color: transparent;
    }
  }

  .swipe-toast.contact-toast[data-inline='false'] {
    --st-offset: ${({ theme }) => theme.spacing[6]};
    bottom: calc(${({ theme }) => theme.spacing[6]} + 4.5rem);
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    .swipe-toast.contact-toast[data-inline='false'] {
      --st-offset: ${({ theme }) => theme.spacing[4]};
      top: calc(var(--header-height, 5rem) + ${({ theme }) => theme.spacing[4]});
      bottom: auto;
    }

    .swipe-toast.contact-toast[data-inline='false'] .swipe-toast__lift {
      transform: translateY(0);
    }

    .swipe-toast.contact-toast[data-inline='false'][data-mounted='false'] .swipe-toast__lift,
    .swipe-toast.contact-toast[data-inline='false'][data-phase='closing'] .swipe-toast__lift,
    .swipe-toast.contact-toast[data-inline='false'][data-phase='gone'] .swipe-toast__lift {
      transform: translateY(-100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-typed-title.is-typing {
      animation: none;
      border-right-color: transparent;
    }
  }

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    padding-top: 5rem;
    padding-bottom: calc(12rem + env(safe-area-inset-bottom, 0px));
  }
`;

export const ContactMail = styled.div`
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

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    top: 2rem;
    font-size: clamp(16rem, 56vw, 32rem);
  }
`;

export const ContactGrid = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

export const ContactForm = styled.form`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 50%;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    width: 100%;
  }
`;

export const ContactCard = styled.div`
  position: relative;
  z-index: 1;
  width: 30%;
  margin-top: 28px;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    width: 100%;
  }
`;

export const ContactCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem 2rem 3rem;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 0.02em;
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin: 0;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    display: none;
  }
`;

export const CardInfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.spacing[6]};
  row-gap: ${({ theme }) => theme.spacing[6]};
`;

export const CardInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  flex: 0 0 auto;
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  padding-left: ${({ theme }) => theme.spacing[3]};

  &:nth-child(odd) {
    min-width: 130px;
  }
`;

export const CardInfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const CardInfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[4]};

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.04em;
`;

export const FieldError = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  svg {
    flex: 0 0 auto;
    width: 1em;
    height: 1em;
  }
`;

const inputStyles = css`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  transition: border-color ${({ theme }) => theme.transitions.base}, box-shadow ${({ theme }) => theme.transitions.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    opacity: 0.8;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const Message = styled.textarea`
  ${inputStyles}
  min-height: 140px;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  position: relative;
  isolation: isolate;
  align-self: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
    pointer-events: none;
  }

  .contact-star-border-canvas {
    position: absolute;
    top: -16px;
    left: -16px;
    z-index: 1;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    pointer-events: none;
  }

  > span {
    position: relative;
    z-index: 2;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-star-border-canvas { display: none; }
  }

  transition: background-color ${({ theme }) => theme.transitions.base}, color ${({ theme }) => theme.transitions.base}, box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

export const Snackbar = styled(motion.div) <{ $variant?: 'error' | 'success' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  position: fixed;
  right: ${({ theme }) => theme.spacing[6]};
  bottom: ${({ theme }) => `calc(${theme.spacing[6]} + 4.5rem)`};
  z-index: 200;
  max-width: min(90vw, 420px);
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ theme, $variant }) => $variant === 'success' ? '#72947a' : theme.colors.warning};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.surface};
  background: color-mix(in srgb, ${({ theme, $variant }) => $variant === 'success' ? '#72947a' : theme.colors.warning} ${({ $variant }) => $variant === 'success' ? '8%' : '12%'}, ${({ theme }) => theme.colors.surface});
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  svg {
    flex: 0 0 auto;
    width: 1.2em;
    height: 1.2em;
    color: ${({ theme, $variant }) => $variant === 'success' ? '#72947a' : theme.colors.warning};
  }

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    right: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => `calc(${theme.spacing[4]} + 9rem)`};
  }
`;
