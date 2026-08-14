import { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeContextValue } from '../types';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('devlink-theme') as Theme) ?? 'system';
  });

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? getSystemTheme() : theme;

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system preference change
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(getSystemTheme());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('devlink-theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
