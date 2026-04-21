'use client';

import Link from 'next/link';

export function StudiosHub() {
  const studios = [
    {
      id: 'base64',
      name: 'Base64 Studio',
      description: 'Encode and decode files, text, images, PDFs, and more using Base64',
      href: '/base64-studio',
      color: 'from-orange-500 to-orange-600',
      features: ['Text Encoding', 'Image Conversion', 'PDF Handling', 'URL Encoding', 'Audio Files'],
      status: 'live',
    },
    {
      id: 'pdf',
      name: 'PDF Studio',
      description: 'Powerful PDF tools for compression, merging, splitting, and manipulation',
      href: '/pdf-studio',
      color: 'from-purple-500 to-purple-600',
      features: ['Compression', 'Merging', 'Splitting', 'Page Extraction', 'Fast Processing'],
      status: 'live',
    },
    {
      id: 'email',
      name: 'Email Template Studio',
      description: 'Create and manage beautiful responsive email templates with drag-and-drop',
      href: '/email-studio',
      color: 'from-cyan-500 to-cyan-600',
      features: ['Drag & Drop', 'Responsive Design', 'Templates', 'Preview', 'Export'],
      status: 'coming-soon',
    },
  ] as const;

  return (
    <main className="theme-page-home min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight theme-title sm:text-6xl">
            All Your Tools
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              In One Place
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl theme-muted">
            Professional-grade utilities for encoding, PDF manipulation, and email design. All tools run 100% in your browser with complete privacy.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm theme-muted">
            <div className="flex items-center gap-2">
              <span>100% Private</span>
            </div>
            <div className="h-1 w-1 rounded-full theme-muted"></div>
            <div className="flex items-center gap-2">
              <span>Lightning Fast</span>
            </div>
            <div className="h-1 w-1 rounded-full theme-muted"></div>
            <div className="flex items-center gap-2">
              <span>No Limits</span>
            </div>
          </div>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {studios.map((studio) => (
            <Link
              key={studio.id}
              href={studio.status === 'coming-soon' ? '#' : studio.href}
              onClick={(e) => studio.status === 'coming-soon' && e.preventDefault()}
              className={`group relative overflow-hidden rounded-2xl border theme-card px-8 py-8 transition-all duration-300 ${
                studio.status === 'coming-soon'
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:-translate-y-1 hover:border-[var(--app-card-border)] hover:shadow-xl'
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${studio.color} opacity-0 transition-opacity duration-300 ${
                  studio.status !== 'coming-soon' ? 'group-hover:opacity-5' : ''
                }`}
              />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold theme-muted-2">Studio</div>
                  {studio.status === 'coming-soon' ? (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                      Live
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-2xl font-bold theme-title">{studio.name}</h3>
                <p className="mb-6 leading-relaxed theme-muted">{studio.description}</p>

                <div className="mb-6 space-y-2">
                  {studio.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm theme-muted">
                      <span className="h-1.5 w-1.5 rounded-full theme-muted-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                {studio.status === 'coming-soon' ? (
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-lg px-4 py-3 font-semibold theme-card-soft theme-muted-2"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <button
                    className={`w-full rounded-lg bg-gradient-to-r ${studio.color} px-4 py-3 font-semibold text-white transition-all duration-300 group-hover:shadow-lg`}
                  >
                    Access Studio
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-16 rounded-2xl border p-12 theme-panel">
          <h3 className="mb-8 text-center text-2xl font-bold theme-title">Why Choose DHEBE Studios?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h4 className="mb-2 font-semibold theme-title">100% Private</h4>
              <p className="text-sm theme-muted">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="text-center">
              <h4 className="mb-2 font-semibold theme-title">Lightning Fast</h4>
              <p className="text-sm theme-muted">No server delays. Process files instantly on your own device.</p>
            </div>
            <div className="text-center">
              <h4 className="mb-2 font-semibold theme-title">Always Free</h4>
              <p className="text-sm theme-muted">
                No subscriptions, no ads, no limits. Use all tools completely free.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--app-card-border)] pt-16 text-center">
          <p className="mb-6 theme-muted">
            More studios are on the way. We&apos;ll add any contact or subscription options once they&apos;re ready.
          </p>
          <p className="text-sm theme-muted-2">
            For now, every available studio remains free to use with no sign-up required.
          </p>
        </div>
      </section>
    </main>
  );
}
