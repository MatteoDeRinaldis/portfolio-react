import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiAward, FiBriefcase, FiMail } from 'react-icons/fi';
import styled from 'styled-components';

type PageBookmarkProps = {};

const BookmarkContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
`;

const BookmarkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => (theme as any).mode === 'light' ? 'rgba(244, 244, 241, 0.35)' : 'rgba(11, 11, 11, 0.35)'};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
  height: 3.5rem;
  width: 3.5rem;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: ${({ theme }) => (theme as any).mode === 'light' ? 'rgba(244, 244, 241, 0.5)' : 'rgba(11, 11, 11, 0.5)'};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const getPageIcon = (pathname: string) => {
  switch (pathname) {
    case '/':
      return <FiHome aria-hidden="true" />;
    case '/about':
      return <FiUser aria-hidden="true" />;
    case '/skills':
      return <FiAward aria-hidden="true" />;
    case '/projects':
      return <FiBriefcase aria-hidden="true" />;
    case '/contact':
      return <FiMail aria-hidden="true" />;
    default:
      return <FiHome aria-hidden="true" />;
  }
};

const getPageLabel = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/about':
      return 'About';
    case '/skills':
      return 'Skills';
    case '/projects':
      return 'Projects';
    case '/contact':
      return 'Contact';
    default:
      return 'Page';
  }
};

export const PageBookmark: FC<PageBookmarkProps> = () => {
  const { pathname } = useLocation();

  return (
    <BookmarkContainer>
      <BookmarkContent>
        <IconButton
          type="button"
          aria-label={`Current page: ${getPageLabel(pathname)}`}
          disabled
        >
          {getPageIcon(pathname)}
        </IconButton>
      </BookmarkContent>
    </BookmarkContainer>
  );
};
