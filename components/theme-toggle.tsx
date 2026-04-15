'use client';

import { useTheme } from '@/lib/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-card fixed right-3 top-3 z-[70] inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold text-[var(--app-title)] shadow-lg backdrop-blur transition hover:scale-[1.01] sm:right-5 sm:top-4 sm:px-4 sm:py-2"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,_rgba(249,115,22,0.2),_rgba(56,189,248,0.2))] text-sm sm:h-9 sm:w-9 sm:text-base">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
