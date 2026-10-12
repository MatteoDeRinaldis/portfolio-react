import styled from 'styled-components';

export const BrandGroup = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const BrandLink = styled.a<{ $isHome?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme, $isHome }) => $isHome ? theme.spacing[3] : '0'};
    transition: gap 380ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: ${({ $isHome }) => $isHome ? '0ms' : '1140ms'};

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &:hover .logo-expanded-name,
  &:focus-visible .logo-expanded-name {
    max-width: 8rem;
    opacity: 1;
  }

  &:hover .header-logo > span:nth-child(1) .logo-expanded-name,
  &:focus-visible .header-logo > span:nth-child(1) .logo-expanded-name {
    transition-delay: 0ms !important;
  }

  &:hover .header-logo > span:nth-child(2) .logo-expanded-name,
  &:focus-visible .header-logo > span:nth-child(2) .logo-expanded-name {
    transition-delay: 380ms !important;
  }

  &:hover .header-logo > span:nth-child(3) .logo-expanded-name,
  &:focus-visible .header-logo > span:nth-child(3) .logo-expanded-name {
    transition-delay: 760ms !important;
  }
`;

export const BrandLabel = styled.span`
  margin-left: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[4]};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeaderWrapper = styled.header<{ $isHome?: boolean }>`
  position: ${({ $isHome }) => ($isHome ? 'absolute' : 'sticky')};
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.base};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: visible;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isHome }) => $isHome && 'position: sticky;'}
    height: calc(var(--header-content-height) + 1px);
    flex-shrink: 0;
    overflow: clip;
    transition: height 800ms cubic-bezier(0.45, 0, 0.55, 1);

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;

export const HeaderContent = styled.div`
  margin: 0;
  padding-top: ${({ theme }) => theme.spacing[4]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
  padding-left: ${({ theme }) => theme.spacing[32]};
  padding-right: ${({ theme }) => theme.spacing[32]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const ProfileImage = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

export const Logo = styled.span<{ $isHome?: boolean }>`
  display: flex;
  align-items: center;
  margin: 0;
  text-decoration: none;
  font-family: 'Sora', 'Segoe UI', sans-serif;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 1;
  margin-top: 3px;

  > span {
    display: inline-flex;
    align-items: center;
    margin-right: 0.18em;

    &:last-child {
      margin-right: 0;
    }
  }

  .logo-expanded-name {
    display: inline-block;
    max-width: ${({ $isHome }) => ($isHome ? '8rem' : '0')};
    overflow: hidden;
    opacity: ${({ $isHome }) => ($isHome ? 1 : 0)};
    white-space: nowrap;
    transition:
      max-width 380ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 240ms ease-out;
  }

  > span:nth-child(1) .logo-expanded-name {
    transition-delay: 760ms;
  }

  > span:nth-child(2) .logo-expanded-name {
    transition-delay: 380ms;
  }

  > span:nth-child(3) .logo-expanded-name {
    transition-delay: 0ms;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: ${({ $isHome }) => $isHome ? '24rem' : '0'};
    opacity: ${({ $isHome }) => $isHome ? 1 : 0};
    overflow: hidden;
    transition:
      max-width 380ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 240ms ease-out;
    transition-delay: ${({ $isHome }) => $isHome ? '0ms' : '1140ms'};

    && .logo-expanded-name {
      max-width: ${({ $isHome }) => $isHome ? '8rem' : '0'};
      opacity: ${({ $isHome }) => $isHome ? 1 : 0};
    }

    && > span:nth-child(1) .logo-expanded-name {
      transition-delay: 760ms !important;
    }

    && > span:nth-child(2) .logo-expanded-name {
      transition-delay: 380ms !important;
    }

    && > span:nth-child(3) .logo-expanded-name {
      transition-delay: 0ms !important;
    }

    @media (prefers-reduced-motion: reduce) {
      &, && .logo-expanded-name {
        transition: none !important;
      }
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  margin-left: auto;
  gap: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

export const NavLink = styled.a<{ $active: boolean; $isHome?: boolean }>`
  position: relative;
  display: inline-block;
  color: ${({ theme, $active, $isHome }) => ($isHome ? '#000' : ($active ? theme.colors.primary : theme.colors.textLight))};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: inherit;
  letter-spacing: normal;
  text-decoration: none;
  white-space: nowrap;
  transition: color ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &::after {
    position: absolute;
    right: 0;
    bottom: -${({ theme }) => theme.spacing[2]};
    left: 0;
    height: 2px;
    background-color: ${({ theme, $isHome }) => ($isHome ? '#000' : theme.colors.primary)};
    content: '';
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme, $isHome }) => ($isHome ? '#000' : theme.colors.primary)};

    &::after {
      transform: scaleX(1);
    }
  }

  &:focus-visible {
    color: ${({ $isHome }) => ($isHome ? '#000' : 'inherit')};
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textLight)};

    &::after {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    &:focus-visible {
      color: inherit;
    }
  }
`;

export const LightModeButton = styled.button<{ $isLightMode: boolean }>`
  position: fixed;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  padding-right: ${({ theme }) => theme.spacing[32]};
  color: ${({ theme, $isLightMode }) => ($isLightMode ? theme.colors.primary : theme.colors.text)};
  z-index: 101;
  transition: color ${({ theme }) => theme.transitions.base};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: ${({ theme }) => theme.spacing[4]};
  }
`;

export const LightBulb = styled.div<{ $isLightMode: boolean }>`
  display: flex;
  position: relative;
  transform: rotate(180deg);

  &::before {
    content: '';
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 239, 153, 0.95) 0%,
      rgba(255, 239, 153, 0.35) 38%,
      rgba(255, 239, 153, 0) 72%
    );
    filter: blur(4px);
    opacity: ${({ $isLightMode }) => ($isLightMode ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transitions.base};
    pointer-events: none;
    z-index: -1;
  }

  svg {
    position: relative;
    z-index: 1;
  }
`;

export const LineLightMode = styled.div`
  width: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100px;
`;
