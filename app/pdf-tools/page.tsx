import type { Metadata } from 'next';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'PDF Tools - Compress, Merge, Split, Rotate & Edit PDFs Online',
  description:
    'Free online PDF tools for compression, merging, splitting, rotation, and page removal. Process your PDFs directly in your browser with 100% privacy and no file uploads.',
  alternates: {
    canonical: 'https://dhebe.com/pdf-tools',
  },
  openGraph: {
    title: 'PDF Tools - Compress, Merge, Split, Rotate & Edit PDFs Online | DHEBE',
    description:
      'Free online PDF tools for compression, merging, splitting, rotation, and page removal. Process your PDFs directly in your browser with 100% privacy.',
    url: 'https://dhebe.com/pdf-tools',
    type: 'website',
  },
  twitter: {
    title: 'PDF Tools - Compress, Merge, Split, Rotate & Edit PDFs Online',
    description:
      'Free online PDF tools for compression, merging, splitting, rotation, and page cleanup. Process PDFs in your browser.',
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
