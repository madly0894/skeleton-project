import { createContext, useContext, useEffect, useState } from 'react';

import type { TTheme } from '@/shared/types/models';

interface ThemeContextType {
   theme: TTheme;
   toggleTheme: VoidFunction;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getTheme = (isDark: boolean) => (isDark ? 'dark' : 'light');

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
   const [theme, setTheme] = useState<TTheme>('light');

   useEffect(() => {
      const stored = localStorage.getItem('theme') as TTheme | null;
      const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
      const defaultTheme = stored || getTheme(matchMedia.matches);
      touchTheme(defaultTheme);

      const applyPreferenceTheme = (event: MediaQueryListEvent) => {
         const defaultTheme = getTheme(event.matches);
         touchTheme(defaultTheme);
      };
      matchMedia.addEventListener('change', applyPreferenceTheme);
      return () => {
         matchMedia.removeEventListener('change', applyPreferenceTheme);
      };
   }, []);

   const touchTheme = async (newTheme: TTheme) => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
   };

   const toggleTheme = () => {
      const newTheme = getTheme(theme === 'light');
      touchTheme(newTheme);
   };

   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error('useTheme must be used within ThemeProvider');
   }
   return context;
};

export default ThemeProvider;
