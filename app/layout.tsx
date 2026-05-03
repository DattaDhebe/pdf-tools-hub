import type { Metadata } from 'next';
import Script from 'next/script';
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
  alternates: {
    canonical: '/',
  },
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
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D9BJ344ZDV"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D9BJ344ZDV');
          `}
        </Script>

        <Script id="site-structured-data" type="application/ld+json">
          {`{
            "@context":"https://schema.org",
            "@type":"Organization",
            "name":"${SITE_NAME}",
            "url":"${siteRoute('/')}",
            "logo":"${siteAsset('/logo4-optimized.webp')}",
            "sameAs":["https://twitter.com/dhebestudios"]
          }`}
        </Script>

        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
