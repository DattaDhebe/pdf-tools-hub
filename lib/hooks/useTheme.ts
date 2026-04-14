import { useEffect, useState } from 'react';

export function useTheme(storageKey: string = 'app-theme') {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);
    const preferredTheme =
      storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';

    setTheme(preferredTheme);
    
    // Apply theme to html element using data-theme attribute
    // Only set data-theme for dark mode; light mode is default (no attribute needed)
    if (preferredTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [storageKey]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    
    // Apply theme to html element using data-theme attribute
    // Only set data-theme for dark mode; light mode is default (no attribute needed)
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return { theme, toggleTheme };
}
