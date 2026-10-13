import React, { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LanguageProvider, useTranslation } from './i18n';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme, lightTheme, type Theme } from './styles/theme';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeBookmark } from './components/ThemeBookmark';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LanguageBookmark } from './components/LanguageBookmark';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Skills } from './pages/Skills';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:has(.home-page-wrapper) {
      min-height: 100dvh;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

type ThemeMode = Theme['mode'];

const THEME_STORAGE_KEY = 'portfolio-theme-mode';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const AppContent: FC = () => {
  const { language } = useTranslation();
  const [isHomeProfileHovered, setIsHomeProfileHovered] = useState(false);
  const [isHomeEngineerHovered, setIsHomeEngineerHovered] = useState(false);
  const [isHomeRoleHovered, setIsHomeRoleHovered] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    try {
      const savedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedThemeMode === 'light' || savedThemeMode === 'dark') {
        return savedThemeMode;
      }
    } catch {
      // Storage may be unavailable; keep the default dark theme.
    }

    return 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.style.colorScheme = themeMode;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Keep the selected theme usable even when storage is blocked.
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleThemeMode = () => {
    setThemeMode((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const activeTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={activeTheme}>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalStyle />
        <AppLayout>
          <Header
            themeMode={themeMode}
            onToggleTheme={toggleThemeMode}
            isHomeProfileHovered={isHomeProfileHovered}
          />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home onProfileHoverChange={setIsHomeProfileHovered} onEngineerHoverChange={setIsHomeEngineerHovered} onRoleHoverChange={setIsHomeRoleHovered} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </MainContent>
          <Footer isHomeEngineerHovered={isHomeEngineerHovered} isHomeRoleHovered={isHomeRoleHovered} />
          {/* <ThemeBookmark themeMode={themeMode} onToggleTheme={toggleThemeMode} /> */}
          {/* <LanguageBookmark language={language} /> */}
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App: FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
