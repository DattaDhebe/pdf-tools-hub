"use client";

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--app-panel-border)] bg-[var(--app-panel)] backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
            <svg
              className="h-8 w-8 text-teal-600"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
                </linearGradient>
              </defs>
              {/* Outer D shape (teal) */}
              <path
                d="M 150 100 L 250 100 Q 320 100 320 200 L 320 312 Q 320 412 250 412 L 150 412 Z"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="45"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner D shape (white) */}
              <path
                d="M 190 140 L 250 140 Q 280 140 280 200 L 280 312 Q 280 372 250 372 L 190 372 Z"
                fill="none"
                stroke="white"
                strokeWidth="35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* S curve (yellow/gold) */}
              <path
                d="M 220 180 Q 340 200 340 256 Q 340 312 220 332"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="50"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrow up (yellow/gold) */}
              <g transform="translate(380, 80)">
                <line x1="0" y1="80" x2="0" y2="0" stroke="url(#grad2)" strokeWidth="45" strokeLinecap="round" />
                <polygon points="0,-20 -40,-80 40,-80" fill="url(#grad2)" />
              </g>
            </svg>
            <span className="sr-only">DHEBE Studios</span>
            <span className="hidden font-bold text-lg sm:inline bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
              DHEBE
            </span>
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
