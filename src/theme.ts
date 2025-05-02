// src/theme.ts
import { createContext, useContext } from 'react';

export const tokens = {
  colors: {
    primary: '#4F46E5',
    secondary: '#10B981',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#111827',
    muted: '#6B7280',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  fontSizes: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
};

export const ThemeContext = createContext(tokens);
export const useTheme = () => useContext(ThemeContext);
