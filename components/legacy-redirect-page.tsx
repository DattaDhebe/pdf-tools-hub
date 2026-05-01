'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface LegacyRedirectPageProps {
  href: string;
  label: string;
}

export function LegacyRedirectPage({ href, label }: LegacyRedirectPageProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="theme-page-home min-h-screen px-4 py-16 text-[var(--app-text)] transition-colors duration-200">
      <div className="mx-auto max-w-2xl rounded-[2rem] border p-8 text-center theme-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">
          Redirecting
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
          Opening the latest page for {label}
        </h1>
        <p className="mt-3 text-sm leading-7 theme-muted sm:text-base">
          This address has moved. If the redirect does not happen automatically, use the link below.
        </p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Go to {label}
        </Link>
      </div>
    </main>
  );
}
