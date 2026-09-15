import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { PageWrapper } from '../components/PageLayout';

export const ContactPageWrapper = styled(PageWrapper)`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    overflow-y: visible;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 12%;
    right: -30vw;
    font-size: clamp(14rem, 48vw, 28rem);
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
`;

export const ContactCard = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 28px;
  gap: 2rem;
  padding: 1.5rem 2rem 3rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(23, 23, 23, 0.35)' : 'rgba(255, 255, 255, 0.35)')};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  align-self: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  &:disabled {
    cursor: wait;
    opacity: 0.65;
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

export const Snackbar = styled(motion.div)<{ $variant?: 'error' | 'success' }>`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing[4]};
    bottom: ${({ theme }) => `calc(${theme.spacing[4]} + 9rem)`};
  }
`;
