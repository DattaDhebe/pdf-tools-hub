'use client';

import { useTheme } from '@/lib/hooks/useTheme';
import Link from 'next/link';
import Script from 'next/script';

interface EmailStudioClientProps {
  structuredData: any;
}

export function EmailStudioClient({ structuredData }: EmailStudioClientProps) {
  const { theme, toggleTheme } = useTheme('email-studio-theme');

  return (
    <>
      <Script
        id="email-studio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.16),_transparent_32%),linear-gradient(180deg,_#f0fdf4_0%,_#f0fdfa_38%,_#fdf8fc_100%)] text-[var(--app-text)] transition-colors duration-200">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b theme-card border-[var(--app-card-border)] theme-panel backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold theme-title hover:text-orange-600 transition"
            >
              ← DHEBE Studios
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-bold theme-title">Email Template Studio</h1>
              <button
                onClick={toggleTheme}
                className="theme-card inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-[var(--app-title)] hover:scale-[1.01] transition"
              >
                <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Coming Soon Content */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-bounce">✉️</div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight theme-title mb-4">
              Email Template
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                Studio
              </span>
            </h2>
            <p className="text-xl theme-muted max-w-2xl mx-auto mb-4">
              Create beautiful, responsive email templates with our powerful drag-and-drop builder.
            </p>
            <p className="text-lg text-cyan-600 font-semibold mb-8">Coming Soon</p>
          </div>

          {/* Feature Preview */}
          <div className="rounded-3xl theme-card border-2 border-cyan-200/50 p-12 mb-16">
            <h3 className="text-2xl font-bold theme-title mb-8 text-center">What to Expect</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h4 className="font-semibold theme-title mb-2">Drag & Drop Builder</h4>
                  <p className="theme-muted">
                    No coding required. Build beautiful emails by dragging and dropping components.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                  <h4 className="font-semibold theme-title mb-2">Fully Responsive</h4>
                  <p className="theme-muted">
                    Templates automatically adapt to all screen sizes and email clients.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h4 className="font-semibold theme-title mb-2">Pre-Built Templates</h4>
                  <p className="theme-muted">
                    Choose from a library of professionally designed email templates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📤</div>
                <div>
                  <h4 className="font-semibold theme-title mb-2">Easy Export</h4>
                  <p className="theme-muted">
                    Export as HTML, send test emails, or integrate with your platform.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🔄</div>
                <div>
                  <h4 className="font-semibold theme-title mb-2">Version Control</h4>
                  <p className="theme-muted">
                    Save and manage multiple versions of your email templates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <h4 className="font-semibold theme-title mb-2">Performance</h4>
                  <p className="theme-muted">
                    Optimized templates that load fast and display consistently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="rounded-3xl theme-panel border-2 border-cyan-300/50 p-8 sm:p-12">
            <h3 className="text-2xl font-bold theme-title mb-4 text-center">
              Be the First to Know
            </h3>
            <p className="theme-muted text-center mb-8">
              Join our waitlist to get early access when Email Template Studio launches.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 theme-card rounded-lg px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <button
                type="submit"
                className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition"
              >
                Notify Me
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
