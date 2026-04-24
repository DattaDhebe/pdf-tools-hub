import type { Metadata } from 'next';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'PDF Tools - Dedicated Pages for Popular PDF Workflows',
  description:
    'Dedicated static pages for popular PDF workflows including merge, split, compress, PDF to Word, sign, protect, OCR, rotate, organize, and page cleanup.',
  alternates: {
    canonical: 'https://dhebe.com/pdf-tools',
  },
  openGraph: {
    title: 'PDF Tools - Dedicated Pages for Popular PDF Workflows | DHEBE',
    description:
      'Discover dedicated static pages for high-intent PDF workflows including merge, split, convert, sign, protect, OCR, and page management.',
    url: 'https://dhebe.com/pdf-tools',
    type: 'website',
  },
  twitter: {
    title: 'PDF Tools - Dedicated Pages for Popular PDF Workflows',
    description:
      'Dedicated pages for popular PDF workflows and browser-based PDF utilities.',
  },
};

export default function PdfToolsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PDF Tools Suite | DHEBE',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: 'https://dhebe.com/pdf-tools',
        description:
          'Dedicated static pages for popular PDF workflows including merge, split, compress, convert, protect, sign, OCR, rotate, and page cleanup.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'PDF Compressor',
          'PDF Merger',
          'PDF Splitter',
          'PDF to Word',
          'Edit PDF',
          'Sign PDF',
          'Protect PDF',
          'OCR PDF',
          'Organize PDF',
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
            name: 'PDF Tools',
            item: 'https://dhebe.com/pdf-tools',
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="pdf-tools-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PdfToolsWorkbench />
    </>
  );
}
