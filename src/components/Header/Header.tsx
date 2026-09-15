import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
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

  return (
    <HeaderWrapper $isHome={pathname === '/'}>
      <HeaderContent>
        <BrandGroup>
          <BrandLink as={Link} to="/" aria-label="Home">
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
        <Nav>
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
