import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SITE_NAME, SITE_URL, siteAsset, siteRoute } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Base64, PDF, Calculator & Email Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Professional tools suite featuring a Base64 Converter for encoding and decoding, PDF Studio for document workflows, Calculator Studio for high-demand web calculators, and a drag-and-drop Email Template Editor. 100% private, fast, and free.',
  applicationName: SITE_NAME,
  keywords: [
    'base64 converter',
    'base64 encoder',
    'pdf compressor',
    'pdf merger',
    'pdf splitter',
    'age calculator',
    'emi calculator',
    'gst calculator',
    'online tools',
    'free tools',
    'dhebe studios',
  ],
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.svg',
  },
  authors: [{ name: 'DHEBE Teams', url: siteRoute('/') }],
  creator: 'DHEBE',
  publisher: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  category: 'technology',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Professional Tools Suite`,
    description:
      'Free online tools for Base64 encoding/decoding, PDF manipulation, calculators, and email template design. 100% private, client-side processing.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Professional Tools Suite`,
    description:
      'Free online Base64, PDF, calculator, and email tools. No uploads, no tracking, 100% private processing.',
    creator: '@dhebestudios',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteRoute('/'),
    logo: siteAsset('/logo4-optimized.webp'),
    sameAs: ['https://twitter.com/dhebestudios'],
  };

  const analyticsLoader = `
    (function () {
      if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true) {
        return;
      }

      var analyticsId = 'G-D9BJ344ZDV';
      var hasLoaded = false;

      function trackPageView() {
        if (!window.gtag) {
          return;
        }

        window.gtag('config', analyticsId, {
          page_path: window.location.pathname + window.location.search,
        });
      }

      function hookNavigationTracking() {
        if (window.__dhebeHistoryHooked) {
          return;
        }

        window.__dhebeHistoryHooked = true;

        var originalPushState = history.pushState;
        var originalReplaceState = history.replaceState;

        history.pushState = function () {
          var result = originalPushState.apply(this, arguments);
          trackPageView();
          return result;
        };

        history.replaceState = function () {
          var result = originalReplaceState.apply(this, arguments);
          trackPageView();
          return result;
        };

        window.addEventListener('popstate', trackPageView);
      }

      function loadAnalytics() {
        if (hasLoaded) {
          return;
        }

        hasLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsId;
        document.head.appendChild(script);

        window.gtag('js', new Date());
        hookNavigationTracking();
        trackPageView();
      }

      function scheduleAnalytics() {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadAnalytics, { timeout: 5000 });
          return;
        }

        window.setTimeout(loadAnalytics, 4000);
      }

      ['pointerdown', 'keydown', 'touchstart'].forEach(function (eventName) {
        window.addEventListener(eventName, loadAnalytics, { once: true, passive: true });
      });

      if (document.readyState === 'complete') {
        scheduleAnalytics();
      } else {
        window.addEventListener('load', scheduleAnalytics, { once: true });
      }
    })();
  `;

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --app-bg: #fffaf5;
            --app-text: #020617;
            --app-title: #020617;
          }
          [data-theme='dark'] {
            --app-bg: #020617;
            --app-text: #e2e8f0;
            --app-title: #f8fafc;
          }
          body {
            margin: 0;
            padding: 0;
            background-color: var(--app-bg);
            color: var(--app-text);
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
          }
          .theme-title { color: var(--app-title); }
          h1 {
            font-weight: 700;
            letter-spacing: -0.025em;
            margin: 0;
          }
        `}} />
        {process.env.NODE_ENV === 'production' ? (
          <script
            id="analytics-loader"
            dangerouslySetInnerHTML={{ __html: analyticsLoader }}
          />
        ) : null}
      </head>
      <body>
        <script
          id="site-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
