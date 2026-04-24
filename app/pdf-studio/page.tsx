import type { Metadata } from 'next';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import Link from 'next/link';
import Script from 'next/script';
import { pdfToolPages } from '@/lib/pdf-tools-pages';
import { pdfTools } from '@/lib/pdf-tools';

export const metadata: Metadata = {
  title: 'PDF Studio - Free Online PDF Tools for Merge, Split, Compress, Convert & More',
  description:
    'Free online PDF Studio with popular tools for merge, split, compress, PDF to Word, sign, protect, OCR, rotate, and page cleanup. 100% client-side and privacy-first.',
  keywords: [
    'online pdf converter',
    'pdf converter online',
    'pdf tools',
    'merge pdf',
    'split pdf',
    'compress pdf',
    'pdf to jpg',
    'jpg to pdf',
    'pdf to word',
    'edit pdf online',
    'rotate pdf',
    'remove pdf pages',
    'add page numbers to pdf',
    'extract pdf pages',
    'ocr pdf online',
  ],
  alternates: {
    canonical: 'https://dhebe.com/pdf-studio',
  },
  openGraph: {
    title: 'PDF Studio - Free Online PDF Tools | DHEBE',
    description:
      'Use PDF Studio for merge, split, compress, rotation, page cleanup, and high-demand PDF workflows with browser-based processing.',
    url: 'https://dhebe.com/pdf-studio',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Studio - Free Online PDF Tools',
    description:
      'Popular online PDF workflows with privacy-first browser processing and dedicated pages for each tool.',
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
          'Free online PDF studio covering merge, split, compress, conversion, protection, OCR, and page-management workflows.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: pdfTools.map((tool) => tool.label),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What can I do with PDF Studio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PDF Studio includes ready tools for merge, split, compress, rotate, and page removal, plus dedicated landing pages for additional popular PDF workflows such as PDF to Word, sign, protect, organize, edit, and OCR.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does PDF Studio upload my files?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The ready tools in PDF Studio are designed to process files in the browser so your documents stay on your device.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does PDF Studio have dedicated tool pages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each tool page gives users a direct link to a specific PDF workflow, making it faster to open the exact tool they need.',
            },
          },
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
      <PdfToolsWorkbench />

      <section className="mx-auto max-w-[1600px] px-4 pb-16 xl:px-6 pt-8">
        <div className="theme-panel rounded-[2rem] border p-6 sm:p-8">
          <div className="grid gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-600">
                Tool Directory
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
                Dedicated Pages for Every PDF Workflow
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 theme-muted sm:text-base">
                Browse a dedicated page for each PDF tool. These pages make it easy to open the exact workflow you need from direct links or the studio directory.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <PdfToolLinkGroup
                title="Core Tools"
                tools={pdfToolPages.filter((tool) =>
                  ['compress', 'merge', 'split', 'rotate', 'remove-pages', 'extract-pages', 'jpg-to-pdf', 'pdf-to-jpg', 'add-page-numbers'].includes(tool.id),
                )}
                accentClass="text-purple-600"
              />
              <PdfToolLinkGroup
                title="More Tools"
                tools={pdfToolPages.filter((tool) =>
                  !['compress', 'merge', 'split', 'rotate', 'remove-pages', 'extract-pages', 'jpg-to-pdf', 'pdf-to-jpg', 'add-page-numbers'].includes(tool.id),
                )}
                accentClass="text-cyan-600"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface PdfToolLinkGroupProps {
  title: string;
  accentClass: string;
  tools: typeof pdfToolPages;
}

function PdfToolLinkGroup({ title, accentClass, tools }: PdfToolLinkGroupProps) {
  return (
    <div>
      <h3 className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
        {title}
      </h3>
      <div className="mt-4 space-y-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/pdf-tools/${tool.slug}`}
            className="theme-card-soft rounded-[1.5rem] border px-4 py-4 transition hover:border-[var(--app-card-border)] block"
          >
            <p className="text-sm font-semibold theme-title break-words">{tool.label}</p>
            <p className="mt-1 text-xs sm:text-sm leading-6 theme-muted break-words">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
