import type { Metadata } from 'next';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'PDF Studio - Free Online PDF Compressor, Merger, Splitter & More',
  description:
    'Free online PDF tools for compression, merging, splitting, rotating, and page removal. Process your PDF files directly in your browser with 100% privacy and no file uploads required.',
  keywords: [
    'pdf compressor',
    'pdf merger',
    'pdf splitter',
    'rotate pdf',
    'remove pdf pages',
    'compress pdf',
    'merge pdf',
    'split pdf',
    'pdf tool',
    'online pdf tools',
    'reduce pdf size',
  ],
  alternates: {
    canonical: 'https://dhebe.com/pdf-studio',
  },
  openGraph: {
    title: 'PDF Studio - Free Online PDF Tools | DHEBE',
    description:
      'Fast and secure PDF tools for compression, merging, splitting, rotation, and page cleanup. Client-side processing with 100% privacy.',
    url: 'https://dhebe.com/pdf-studio',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Studio - Free Online PDF Tools',
    description: 'Compress, merge, split, rotate, and clean up PDFs with no file uploads. 100% private processing.',
  },
};

export default function PdfStudioPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PDF Studio | DHEBE Studios',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: 'https://dhebe.com/pdf-studio',
        description:
          'Free online PDF tools including compressor, merger, splitter, rotator, and page remover. 100% client-side processing.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'PDF Compressor',
          'PDF Merger',
          'PDF Splitter',
          'PDF Rotator',
          'PDF Page Remover',
          'No file uploads required',
          'Client-side processing',
          'Privacy guaranteed',
        ],
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
            name: 'PDF Studio',
            item: 'https://dhebe.com/pdf-studio',
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="pdf-studio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="sticky top-0 z-50 border-b theme-card border-[var(--app-card-border)] theme-panel backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-bold theme-title hover:text-orange-600 transition"
            >
              ← DHEBE Studios
            </Link>
            <h1 className="text-lg font-bold theme-title">PDF Studio</h1>
            <Link
              href="/base64-studio"
              className="theme-accent-chip-orange inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:brightness-105"
            >
              🔤 Base64 Studio
            </Link>
          </div>
        </div>
      </nav>
      <PdfToolsWorkbench />
    </>
  );
}
