import React, { FC, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'styled-components';
import { useTranslation } from '../../i18n';
import profileImage from '../../assets/img/MDR_Profile_Header.png';
import {
  BrandGroup,
  BrandLink,
  BrandLabel,
  HeaderContent,
  HeaderWrapper,
  Logo,
  Nav,
  NavLink,
  ProfileImage,
} from './Header.styles';

type HeaderProps = {
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
  isHomeProfileHovered: boolean;
};

export const Header: FC<HeaderProps> = ({ themeMode, onToggleTheme, isHomeProfileHovered }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const theme = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const content = headerContentRef.current;
    const nav = navRef.current;
    if (!header || !content || !nav) return;
    const mobileMotion = window.matchMedia(`(max-width: ${theme.breakpoints.mobile}) and (prefers-reduced-motion: no-preference)`);
    let previousNavTop = nav.offsetTop;
    let navAnimation: Animation | undefined;

    const updateContentHeight = () => {
      const nextNavTop = nav.offsetTop;
      if (!mobileMotion.matches) {
        navAnimation?.cancel();
      } else if (nextNavTop !== previousNavTop) {
        // Preserve the visible position when flex wrapping moves the links to another row.
        const transform = window.getComputedStyle(nav).transform;
        const currentOffset = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42;
        navAnimation?.cancel();
        navAnimation = nav.animate([
          { transform: `translateY(${previousNavTop - nextNavTop + currentOffset}px)` },
          { transform: 'translateY(0)' },
        ], {
          duration: 800,
          easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
        });
      }
      previousNavTop = nextNavTop;
      header.style.setProperty('--header-content-height', `${content.getBoundingClientRect().height}px`);
    };
    updateContentHeight();
    const contentObserver = new ResizeObserver(updateContentHeight);
    contentObserver.observe(content);
    mobileMotion.addEventListener('change', updateContentHeight);

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
    };
    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      contentObserver.disconnect();
      mobileMotion.removeEventListener('change', updateContentHeight);
      navAnimation?.cancel();
      header.style.removeProperty('--header-content-height');
      document.documentElement.style.removeProperty('--header-height');
    };
  }, [theme.breakpoints.mobile]);

  return (
    <HeaderWrapper ref={headerRef} $isHome={pathname === '/'}>
      <HeaderContent ref={headerContentRef}>
        <BrandGroup>
          <BrandLink as={Link} to="/" aria-label="Home" $isHome={pathname === '/'}>
            <ProfileImage src={profileImage} alt="Matteo De Rinaldis" />
            <Logo className="header-logo" $isHome={pathname === '/'} aria-hidden="true">
              <span>M<span className="logo-expanded-name">atteo</span></span>
              <span>D<span className="logo-expanded-name">e</span></span>
              <span>R<span className="logo-expanded-name">inaldis</span></span>
            </Logo>
          </BrandLink>
          <AnimatePresence mode="wait">
            {(pathname !== '/' || isHomeProfileHovered) && (
              <BrandLabel
                as={motion.span}
                key="header-role"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                Senior Frontend Engineer
              </BrandLabel>
            )}
          </AnimatePresence>
        </BrandGroup>
        <Nav ref={navRef}>
          <NavLink as={Link} to="/about" $active={pathname === '/about'} $isHome={pathname === '/'} aria-current={pathname === '/about' ? 'page' : undefined}>
            {t('navigation.about')}
          </NavLink>
          <NavLink as={Link} to="/skills" $active={pathname === '/skills'} $isHome={pathname === '/'} aria-current={pathname === '/skills' ? 'page' : undefined}>
            {t('navigation.skills')}
          </NavLink>
          <NavLink as={Link} to="/projects" $active={pathname === '/projects'} $isHome={pathname === '/'} aria-current={pathname === '/projects' ? 'page' : undefined}>
            {t('navigation.projects')}
          </NavLink>
          <NavLink as={Link} to="/contact" $active={pathname === '/contact'} $isHome={pathname === '/'} aria-current={pathname === '/contact' ? 'page' : undefined}>
            {t('navigation.contact')}
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderWrapper>
  );
};
