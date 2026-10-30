import React, { FC, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiGlobe } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../i18n';

type LanguageBookmarkProps = {
  language: 'it' | 'en';
};

// Animations
const slideInFromLeft = keyframes`
  from {
    width: 4rem;
  }
  to {
    width: 13rem;
  }
`;

const slideOutToLeft = keyframes`
  from {
    width: 13rem;
  }
  to {
    width: 4rem;
  }
`;

const BookmarkContainer = styled.div<{ $isExpanded: boolean; $isHome: boolean }>`
  position: fixed;
  bottom: 4.5rem;
  left: -1rem;
  z-index: 50;
  animation: ${({ $isExpanded }) => ($isExpanded ? slideInFromLeft : slideOutToLeft)} 400ms ease-out both;

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    display: ${({ $isHome }) => $isHome ? 'block' : 'none'};
    top: calc(var(--header-height, 8rem) + 5rem);
    right: 0;
    bottom: auto;
    left: auto;
    width: ${({ $isExpanded }) => $isExpanded ? '13rem' : '4rem'};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const BookmarkContent = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]} ${theme.spacing[3]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => (theme as any).mode === 'light' ? 'rgba(244, 244, 241, 0.35)' : 'rgba(11, 11, 11, 0.35)'};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
  height: 3.5rem;
  transition: all ${({ theme }) => theme.transitions.base};

  @media ${({ theme }) => theme.breakpoints.mobilePortrait} {
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
    border-right: 0;
    border-radius: ${({ theme }) => `${theme.borderRadius.lg} 0 0 ${theme.borderRadius.lg}`};
  }

  &:hover {
    background-color: ${({ theme }) => (theme as any).mode === 'light' ? 'rgba(244, 244, 241, 0.5)' : 'rgba(11, 11, 11, 0.5)'};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all ${({ theme }) => theme.transitions.base};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SwitchContainer = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.base};
  pointer-events: ${({ $isExpanded }) => ($isExpanded ? 'auto' : 'none')};
  padding-right: ${({ theme }) => theme.spacing[2]};
`;

const SwitchValue = styled.span<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textLight)};
  font-weight: ${({ theme, $active }) => ($active ? theme.fontWeights.bold : theme.fontWeights.medium)};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.base};
  min-width: 1.5rem;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-flex;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;

  &:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + span::after {
    transform: translateX(1rem);
  }
`;

const SwitchTrack = styled.span`
  display: inline-flex;
  align-items: center;
  width: 2.5rem;
  height: 1.5rem;
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color ${({ theme }) => theme.transitions.base};

  &::after {
    width: 1rem;
    height: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: ${({ theme }) => theme.colors.surface};
    content: '';
    transition: transform ${({ theme }) => theme.transitions.base};
  }
`;

export const LanguageBookmark: FC<LanguageBookmarkProps> = ({ language }) => {
  const { t, setLanguage } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <BookmarkContainer ref={containerRef} $isExpanded={isExpanded} $isHome={pathname === '/'}>
      <BookmarkContent $isExpanded={isExpanded}>
        <IconButton
          type="button"
          aria-label={t('settings.label')}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FiGlobe aria-hidden="true" />
        </IconButton>
        <SwitchContainer $isExpanded={isExpanded}>
          <SwitchValue $active={language === 'it'}>IT</SwitchValue>
          <SwitchLabel>
            <SwitchInput
              type="checkbox"
              checked={language === 'en'}
              onChange={handleToggle}
              aria-label={t('settings.italian')}
            />
            <SwitchTrack />
          </SwitchLabel>
          <SwitchValue $active={language === 'en'}>EN</SwitchValue>
        </SwitchContainer>
      </BookmarkContent>
    </BookmarkContainer>
  );
};
