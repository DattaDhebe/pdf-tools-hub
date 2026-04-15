'use client';

import { useTheme } from '@/lib/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-card fixed right-4 top-4 z-[70] inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--app-title)] shadow-lg backdrop-blur transition hover:scale-[1.01] sm:right-6 sm:top-5"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,_rgba(249,115,22,0.2),_rgba(56,189,248,0.2))] text-base">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
