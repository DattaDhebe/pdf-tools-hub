'use client';

import { useTheme } from '@/lib/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      className="theme-card inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold text-[var(--app-title)] shadow-lg backdrop-blur transition hover:scale-[1.01] sm:px-4 sm:py-2"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,_rgba(249,115,22,0.2),_rgba(56,189,248,0.2))] px-2 text-[10px] sm:h-9 sm:w-11 sm:text-xs"
      >
        {theme === 'dark' ? 'SUN' : 'MOON'}
      </span>
      <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}
