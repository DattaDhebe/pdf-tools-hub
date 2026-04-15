'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import Script from 'next/script';

interface EmailStudioClientProps {
  structuredData: any;
}

export function EmailStudioClient({ structuredData }: EmailStudioClientProps) {
  return (
    <>
      <Script
        id="email-studio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ThemeToggle />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.16),_transparent_32%),linear-gradient(180deg,_#f0fdf4_0%,_#f0fdfa_38%,_#fdf8fc_100%)] text-[var(--app-text)] transition-colors duration-200">
        <nav className="sticky top-0 z-50 border-b theme-card theme-panel border-[var(--app-card-border)] backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-bold theme-title transition hover:text-orange-600">
              Back to DHEBE Studios
            </Link>
            <h1 className="text-lg font-bold theme-title">Email Template Studio</h1>
          </div>
        </nav>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight theme-title sm:text-6xl">
              Email Template
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                Studio
              </span>
            </h2>
            <p className="mx-auto mb-4 max-w-2xl text-xl theme-muted">
              Create beautiful, responsive email templates with our powerful drag-and-drop builder.
            </p>
            <p className="mb-8 text-lg font-semibold text-cyan-600">Coming Soon</p>
          </div>

          <div className="mb-16 rounded-3xl border-2 border-cyan-200/50 p-12 theme-card">
            <h3 className="mb-8 text-center text-2xl font-bold theme-title">What to Expect</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <FeatureCard
                title="Drag & Drop Builder"
                description="No coding required. Build beautiful emails by dragging and dropping components."
              />
              <FeatureCard
                title="Fully Responsive"
                description="Templates automatically adapt to all screen sizes and email clients."
              />
              <FeatureCard
                title="Pre-Built Templates"
                description="Choose from a library of professionally designed email templates."
              />
              <FeatureCard
                title="Easy Export"
                description="Export as HTML, send test emails, or integrate with your platform."
              />
              <FeatureCard
                title="Version Control"
                description="Save and manage multiple versions of your email templates."
              />
              <FeatureCard
                title="Performance"
                description="Optimized templates that load fast and display consistently."
              />
            </div>
          </div>

          <div className="rounded-3xl border-2 border-cyan-300/50 p-8 theme-panel sm:p-12">
            <h3 className="mb-4 text-center text-2xl font-bold theme-title">Launch Status</h3>
            <p className="text-center theme-muted">
              Subscription and waitlist options are not active yet. This page will be updated once those features are ready.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="flex gap-4">
      <div>
        <h4 className="mb-2 font-semibold theme-title">{title}</h4>
        <p className="theme-muted">{description}</p>
      </div>
    </div>
  );
}
