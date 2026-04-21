"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--app-panel-border)] bg-[var(--app-panel)] backdrop-blur" role="banner">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-3 px-3 sm:gap-6 sm:px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
            <div className="relative h-20 w-[18rem] overflow-visible sm:w-[22rem]">
              <Image
                src="/logo4.png"
                alt="DHEBE Studios"
                width={640}
                height={180}
                className="absolute left-0 top-1/2 h-40 w-auto max-w-none -translate-y-1/2 object-contain object-left sm:h-48"
                priority
              />
            </div>
            <span className="sr-only">DHEBE Studios</span>
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
              <Link href="/support" className="hover:underline">Support</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      <nav aria-label="Mobile Primary" className="border-t border-[var(--app-panel-border)] px-3 py-2 sm:hidden">
        <ul className="flex gap-2 overflow-x-auto pb-1 text-xs whitespace-nowrap">
          <li>
            <Link href="/base64-studio" className="theme-card block rounded-full border px-3 py-1.5">
              Base64
            </Link>
          </li>
          <li>
            <Link href="/pdf-studio" className="theme-card block rounded-full border px-3 py-1.5">
              PDF
            </Link>
          </li>
          <li>
            <Link href="/email-studio" className="theme-card block rounded-full border px-3 py-1.5">
              Email
            </Link>
          </li>
          <li>
            <Link href="/support" className="theme-card block rounded-full border px-3 py-1.5">
              Support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
