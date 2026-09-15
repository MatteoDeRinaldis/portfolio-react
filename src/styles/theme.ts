type Colors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  border: string;
  success: string;
  warning: string;
  error: string;
};

type FontConfig = {
  primary: string;
  mono: string;
};

type FontSizes = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
};

type FontWeights = {
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
};

type Spacing = Record<string, string>;
type BorderRadius = Record<string, string>;
type Breakpoints = Record<string, string>;
type Transitions = Record<string, string>;
type Shadows = Record<string, string>;

export type Theme = {
  mode: 'light' | 'dark';
  colors: Colors;
  fonts: FontConfig;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  spacing: Spacing;
  borderRadius: BorderRadius;
  breakpoints: Breakpoints;
  transitions: Transitions;
  shadows: Shadows;
};

const sharedTheme = {
  fonts: {
    primary: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    mono: "'Courier New', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
    32: '8rem',
  },
  borderRadius: {
    sm: '0.25rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    base: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

export const lightTheme: Theme = {
  mode: 'light',
  ...sharedTheme,
  colors: {
    primary: '#111111',
    secondary: '#4b4b4b',
    background: '#f4f4f1',
    surface: '#ffffff',
    text: '#121212',
    textLight: '#5f5f5f',
    border: 'rgba(17, 17, 17, 0.12)',
    success: '#2d3a2d',
    warning: '#5e4d3b',
    error: '#4e2a2a',
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  ...sharedTheme,
  colors: {
    primary: '#f5f5f5',
    secondary: '#c4c4c4',
    background: '#0b0b0b',
    surface: '#171717',
    text: '#f3f3f3',
    textLight: '#b9b9b9',
    border: 'rgba(255, 255, 255, 0.12)',
    success: '#dce8d9',
    warning: '#e6d9c0',
    error: '#eed1d1',
  },
};
