import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://dhebe.com'),
  title: {
    default: 'DHEBE Studios - Base64, PDF & Email Tools',
    template: '%s | DHEBE Studios',
  },
  description:
    'Professional tools suite featuring Base64 Studio for encoding/decoding, PDF Studio for compression/merging/splitting, and Email Template Studio (coming soon). 100% private, fast, and free.',
  applicationName: 'DHEBE Studios',
  keywords: [
    'base64 converter',
    'base64 encoder',
    'pdf compressor',
    'pdf merger',
    'pdf splitter',
    'online tools',
    'free tools',
    'dhebe studios',
  ],
  icons: {
    icon: [
      {
        url: '/LOGO_Dhebe.png',
        type: 'image/png',
      },
    ],
    apple: '/LOGO_Dhebe.png',
  },
  alternates: {
    canonical: 'https://dhebe.com',
  },
  authors: [{ name: 'DHEBE Teams', url: 'https://dhebe.com' }],
  creator: 'DHEBE',
  publisher: 'DHEBE Studios',
  referrer: 'origin-when-cross-origin',
  category: 'technology',
  openGraph: {
    type: 'website',
    url: 'https://dhebe.com',
    siteName: 'DHEBE Studios',
    title: 'DHEBE Studios - Professional Tools Suite',
    description:
      'Free online tools for Base64 encoding/decoding, PDF manipulation, and email template design. 100% private, client-side processing.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DHEBE Studios - Professional Tools Suite',
    description:
      'Free online Base64, PDF, and email tools. No uploads, no tracking, 100% private processing.',
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
            "name":"DHEBE Studios",
            "url":"https://dhebe.com",
            "logo":"https://dhebe.com/LOGO_Dhebe.png",
            "sameAs":["https://twitter.com/dhebestudios"]
          }`}
        </Script>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
