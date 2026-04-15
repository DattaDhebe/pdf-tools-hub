"use client";

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--app-panel-border)] bg-[var(--app-panel)] backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="DHEBE Studios" className="h-8 w-auto" />
            <span className="sr-only">DHEBE Studios</span>
            <span className="hidden font-semibold text-lg sm:inline">DHEBE Studios</span>
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden flex-1 sm:block">
          <ul className="flex items-center justify-center gap-4 text-sm">
            <li>
              <Link href="/base64-studio" className="hover:underline">Base64 Studio</Link>
            </li>
            <li>
              <Link href="/pdf-studio" className="hover:underline">PDF Studio</Link>
            </li>
            <li>
              <Link href="/email-studio" className="hover:underline">Email Studio</Link>
            </li>
            <li>
              <Link href="/pdf-tools" className="rounded-md bg-amber-100 px-3 py-1 text-amber-800 hover:opacity-90">PDF Tools</Link>
            </li>
            <li>
              <Link href="/support" className="hover:underline">Support</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
