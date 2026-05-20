import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { SITE_NAME, siteAsset, siteRoute } from '@/lib/site';

export const metadata: Metadata = {
  title: 'DhebeVoice Text Reader App',
  description:
    'Discover DhebeVoice, an Android text-to-speech reader for typed, pasted, shared, and imported text. Access the public privacy policy page prepared for Google Play compliance.',
  keywords: [
    'DhebeVoice',
    'text reader app',
    'text to speech app',
    'android voice reader',
    'privacy policy',
    'Google Play policy',
  ],
  alternates: {
    canonical: siteRoute('/dhebevoice'),
  },
  openGraph: {
    title: `DhebeVoice Text Reader App | ${SITE_NAME}`,
    description:
      'Android text-to-speech reader app with a public privacy policy and product details hosted on DHEBE Studios.',
    url: siteRoute('/dhebevoice'),
    type: 'website',
    images: [
      {
        url: siteAsset('/dhebevoice-logo.png'),
        alt: 'DhebeVoice app logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `DhebeVoice Text Reader App | ${SITE_NAME}`,
    description:
      'Android text reader app details and public privacy policy for Google Play submission.',
    images: [siteAsset('/dhebevoice-logo.png')],
  },
};

export default function DhebeVoicePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'DhebeVoice',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Android',
        description:
          'DhebeVoice is an Android text-to-speech reader app for typed, pasted, shared, and imported text.',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: siteRoute('/'),
        },
        url: siteRoute('/dhebevoice'),
        image: siteAsset('/dhebevoice-logo.png'),
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'WebPage',
        name: 'DhebeVoice Text Reader App',
        url: siteRoute('/dhebevoice'),
        description:
          'Product page for DhebeVoice with app overview and public privacy-policy access.',
      },
    ],
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'DhebeVoice', item: '/dhebevoice/' },
        ]}
      />
      <script
        id="dhebevoice-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="theme-page-home text-[var(--app-text)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border p-6 theme-panel sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_20rem] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-400">
                  Mobile App
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight theme-title sm:text-5xl">
                  DhebeVoice
                  <span className="block bg-gradient-to-r from-cyan-700 via-sky-700 to-emerald-700 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-emerald-300">
                    text-to-speech reading made simple
                  </span>
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 theme-muted">
                  DhebeVoice is built for reading typed, pasted, shared, and imported text aloud on Android.
                  This website now hosts the public privacy-policy URL required for Google Play submission.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/dhebevoice/privacy-policy/"
                    className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-cyan-500 dark:text-slate-950"
                    prefetch={false}
                  >
                    View Privacy Policy
                  </Link>
                  <Link
                    href="/support/"
                    className="inline-flex items-center rounded-full border border-[var(--app-card-border)] px-5 py-3 text-sm font-semibold theme-title transition hover:bg-white/70"
                    prefetch={false}
                  >
                    Contact Support
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm theme-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    On-device reading
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                    Public policy URL
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                    Google Play ready
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border bg-[var(--app-card)] p-6 shadow-sm">
                <div className="rounded-[1.4rem] border p-5 theme-card-soft">
                  <img
                    src="/dhebevoice-logo.png"
                    alt="DhebeVoice app logo"
                    width={240}
                    height={240}
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">
                    App Snapshot
                  </p>
                  <div className="mt-3 space-y-3 text-sm theme-muted">
                    <p>Platform: Android</p>
                    <p>Core use: text-to-speech reading</p>
                    <p>Privacy page: live on this website</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border p-6 theme-card">
              <h2 className="text-xl font-bold theme-title">What DhebeVoice does</h2>
              <p className="mt-3 text-sm leading-7 theme-muted">
                The app reads text aloud using the text-to-speech engine installed on the user&apos;s Android device.
                It is designed for quick listening workflows without account creation.
              </p>
            </div>

            <div className="rounded-[1.75rem] border p-6 theme-card">
              <h2 className="text-xl font-bold theme-title">Supported workflows</h2>
              <ul className="mt-3 space-y-3 text-sm leading-7 theme-muted">
                <li>Type or paste text for immediate playback.</li>
                <li>Import local text content from the device.</li>
                <li>Receive shared text from other Android apps.</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border p-6 theme-card">
              <h2 className="text-xl font-bold theme-title">Play policy support</h2>
              <p className="mt-3 text-sm leading-7 theme-muted">
                This page and the linked privacy policy help provide a stable, public, non-PDF destination that can be
                referenced from Play Console during app submission.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
