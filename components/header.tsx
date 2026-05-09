import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--app-panel-border)] bg-[var(--app-panel)] backdrop-blur" role="banner">      
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-3 px-3 sm:gap-6 sm:px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
            <BrandLogo eager />
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden flex-1 sm:block">
          <ul className="flex items-center justify-center gap-4 text-sm">
            <li>
              <Link href="/base64-converter/" className="hover:underline" prefetch={false}>Base64 Converter</Link>
            </li>
            <li>
              <Link href="/pdf-studio/" className="hover:underline" prefetch={false}>PDF Studio</Link>
            </li>
            <li>
              <Link href="/image-studio/" className="hover:underline" prefetch={false}>Image Studio</Link>
            </li>
            <li>
              <Link href="/calculator-studio/" className="hover:underline" prefetch={false}>Calculator Studio</Link>
            </li>
            <li>
              <Link href="/email-template-editor/" className="hover:underline" prefetch={false}>Email Editor</Link>
            </li>
            <li>
              <Link href="/support/" className="hover:underline" prefetch={false}>Support</Link>
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
            <Link href="/base64-converter/" className="theme-card block rounded-full border px-3 py-1.5" prefetch={false}>
              Base64
            </Link>
          </li>
          <li>
            <Link href="/pdf-studio/" className="theme-card block rounded-full border px-3 py-1.5" prefetch={false}>
              PDF
            </Link>
          </li>
          <li>
            <Link href="/image-studio/" className="theme-card block rounded-full border px-3 py-1.5" prefetch={false}>
              Images
            </Link>
          </li>
          <li>
            <Link href="/calculator-studio/" className="theme-card block rounded-full border px-3 py-1.5" prefetch={false}>
              Calculators
            </Link>
          </li>
          <li>
            <Link href="/email-template-editor/" className="theme-card block rounded-full border px-3 py-1.5" prefetch={false}>
              Email
            </Link>
          </li>
          <li>
            <Link href="/support/" className="theme-card block rounded-full border px-3 py-1.5" prefetch={false}>
              Support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
