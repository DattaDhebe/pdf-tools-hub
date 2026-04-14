import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Email Template Studio - Coming Soon | DHEBE',
  description:
    'Professional email template builder with drag-and-drop editor, responsive designs, and easy export. Coming soon to DHEBE Studios. Join our waitlist for early access.',
  keywords: [
    'email templates',
    'email builder',
    'responsive emails',
    'email designer',
    'html email',
    'email editor',
    'coming soon',
  ],
  alternates: {
    canonical: 'https://dhebe.com/email-studio',
  },
  openGraph: {
    title: 'Email Template Studio - Coming Soon | DHEBE Studios',
    description:
      'Professional drag-and-drop email template builder. Create responsive emails easily (coming soon).',
    url: 'https://dhebe.com/email-studio',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Template Studio - Coming Soon',
    description: 'Professional email template builder launching soon. Join our waitlist.',
  },
};

export default function EmailStudioPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Email Template Studio | DHEBE Studios',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: 'https://dhebe.com/email-studio',
        description: 'Professional email template builder coming soon to DHEBE Studios.',
        status: 'Coming Soon',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://dhebe.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Studios',
            item: 'https://dhebe.com',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Email Template Studio',
            item: 'https://dhebe.com/email-studio',
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="email-studio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold text-slate-900 hover:text-orange-600 transition"
            >
              ← DHEBE Studios
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Email Template Studio</h1>
          </div>
        </nav>

        {/* Coming Soon Content */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-bounce">✉️</div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              Email Template
              <br />
              <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                Studio
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
              Create beautiful, responsive email templates with our powerful drag-and-drop builder.
            </p>
            <p className="text-lg text-cyan-600 font-semibold mb-8">Coming Soon</p>
          </div>

          {/* Feature Preview */}
          <div className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-b from-cyan-50 to-white p-12 mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">What to Expect</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Drag & Drop Builder</h4>
                  <p className="text-slate-600">
                    No coding required. Build beautiful emails by dragging and dropping components.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Fully Responsive</h4>
                  <p className="text-slate-600">
                    Templates automatically adapt to all screen sizes and email clients.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Pre-Built Templates</h4>
                  <p className="text-slate-600">
                    Choose from a library of professionally designed email templates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">📤</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Easy Export</h4>
                  <p className="text-slate-600">
                    Export as HTML, send test emails, or integrate with your platform.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🔄</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Version Control</h4>
                  <p className="text-slate-600">
                    Save and manage multiple versions of your email templates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Performance</h4>
                  <p className="text-slate-600">
                    Optimized templates that load fast and display consistently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="rounded-3xl border-2 border-cyan-300 bg-gradient-to-r from-cyan-100 to-cyan-50 p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Be the First to Know
            </h3>
            <p className="text-slate-600 text-center mb-8">
              Join our waitlist to get early access when Email Template Studio launches.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg border-2 border-cyan-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 px-6 py-3 font-semibold text-white hover:shadow-lg transition whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          </div>

          {/* Back to Studios */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition"
            >
              ← Back to DHEBE Studios
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
