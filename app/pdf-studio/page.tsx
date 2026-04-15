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
    'pdf tools',
    'merge pdf',
    'split pdf',
    'compress pdf',
    'pdf to word',
    'edit pdf',
    'sign pdf',
    'protect pdf',
    'ocr pdf',
    'rotate pdf',
    'remove pdf pages',
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
      'Popular online PDF workflows with privacy-first browser processing and dedicated SEO pages for each tool.',
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
              text: 'Each tool page makes it easier for users and search engines to find a specific PDF workflow directly, similar to the Base64 Studio SEO structure.',
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
      <nav className="sticky top-0 z-50 border-b theme-card theme-panel border-[var(--app-card-border)] backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 xl:px-6">
          <div className="flex items-center gap-8">
              <Link href="/" className="text-lg font-bold theme-title transition hover:text-orange-600">
                DHEBE Studios
              </Link>
            <h1 className="text-lg font-bold theme-title">PDF Studio</h1>
            <Link
              href="/base64-studio"
              className="theme-accent-chip-orange inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:brightness-105"
            >
              Base64 Studio
            </Link>
          </div>
        </div>
      </nav>

      <PdfToolsWorkbench />

      <section className="mx-auto max-w-[1600px] px-4 pb-16 xl:px-6">
        <div className="theme-panel rounded-[2rem] border p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-600">
            Tool Directory
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
            Dedicated Pages for Every PDF Workflow
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 theme-muted sm:text-base">
            Browse a dedicated landing page for each PDF tool. These static pages mirror Base64 Studio&apos;s SEO structure so users can discover the exact PDF workflow they need through search or direct links.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <PdfToolLinkGroup
              title="Ready Now"
              tools={pdfToolPages.filter((tool) =>
                ['compress', 'merge', 'split', 'rotate', 'remove-pages'].includes(tool.id),
              )}
              accentClass="text-purple-600"
            />
            <PdfToolLinkGroup
              title="Popular Next"
              tools={pdfToolPages.filter((tool) =>
                ['pdf-to-word', 'edit', 'sign', 'protect', 'organize', 'ocr'].includes(tool.id),
              )}
              accentClass="text-cyan-600"
            />
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
      <div className="mt-4 grid gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/pdf-tools/${tool.slug}`}
            className="theme-card-soft rounded-[1.5rem] border px-4 py-4 transition hover:border-[var(--app-card-border)]"
          >
            <p className="text-sm font-semibold theme-title">{tool.label}</p>
            <p className="mt-1 text-sm leading-6 theme-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
