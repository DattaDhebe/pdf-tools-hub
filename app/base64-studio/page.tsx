import type { Metadata } from 'next';
import { Base64Workbench } from '@/components/base64-workbench';
import Link from 'next/link';
import Script from 'next/script';
import { toolPages } from '@/lib/tool-pages';

export const metadata: Metadata = {
  title: 'Base64 Studio - Free Online Base64 Encoder & Decoder',
  description:
    'Free online Base64 converter with 18+ tools for encoding and decoding text, images, PDFs, files, audio, URLs, HTML, and CSS. 100% client-side, no uploads required.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 converter',
    'image to base64',
    'base64 to image',
    'text to base64',
    'pdf to base64',
    'base64 tools',
    'online encoder',
  ],
  alternates: {
    canonical: 'https://dhebe.com/base64-studio',
  },
  openGraph: {
    title: 'Base64 Studio - Free Online Encoder & Decoder | DHEBE',
    description:
      'Fast Base64 encoding and decoding tools for text, images, PDFs, audio, and more. Client-side processing, 100% private.',
    url: 'https://dhebe.com/base64-studio',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Studio - Free Online Encoder & Decoder',
    description: 'Encode and decode Base64 with 18+ online tools. No uploads, 100% private.',
  },
};

export default function Base64StudioPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Base64 Studio',
        url: 'https://dhebe.com/base64-studio',
        description:
          'Free online Base64 encoder and decoder tools for text, images, files, PDFs, audio, URLs, HTML, CSS, and hex.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://dhebe.com/base64-studio?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Base64 Studio',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Browser-based Base64 encoding and decoding utilities for common developer and content workflows.',
        url: 'https://dhebe.com/base64-studio',
        featureList: [
          'Text to Base64',
          'Image to Base64',
          'URL to Base64',
          'Hex to Base64',
          'PDF to Base64',
          'HTML to Base64',
          'CSS to Base64',
          'File to Base64',
          'Audio to Base64',
          'Base64 to Text',
          'Base64 to Image',
          'Base64 to URL',
          'Base64 to Hex',
          'Base64 to PDF',
          'Base64 to HTML',
          'Base64 to CSS',
          'Base64 to File',
          'Base64 to Audio',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Base64 Studio used for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Base64 Studio helps you encode files and text into Base64 and decode Base64 back into readable text, media, and downloadable files.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Base64 Studio upload my files to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The tools are designed to run in your browser so your conversions stay client-side.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which Base64 tools are available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The site includes tools for Text, Image, URL, Hex, PDF, HTML, CSS, File, and Audio encoding, plus matching Base64 decoding tools.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="base64-studio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Navigation Banner */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-4 xl:px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-bold text-slate-900 hover:text-orange-600 transition"
            >
              ← DHEBE Studios
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Base64 Studio</h1>
            <Link
              href="/pdf-studio"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-200 transition"
            >
              📄 PDF Studio
            </Link>
          </div>
        </div>
      </nav>
      
      <Base64Workbench />
      <section className="mx-auto max-w-[1600px] px-4 pb-16 xl:px-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-600">
            Tool Directory
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Dedicated Pages for Every Tool
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Browse a dedicated landing page for each Base64 encoder and decoder tool. These static pages help users find the exact utility they need and make the site easier for search engines to crawl.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <ToolLinkGroup
              title="Encoders"
              tools={toolPages.filter((tool) => tool.kind === 'converter')}
              accentClass="text-orange-600"
            />
            <ToolLinkGroup
              title="Decoders"
              tools={toolPages.filter((tool) => tool.kind === 'decoder')}
              accentClass="text-cyan-600"
            />
          </div>
        </div>
      </section>
    </>
  );
}

interface ToolLinkGroupProps {
  title: string;
  accentClass: string;
  tools: typeof toolPages;
}

function ToolLinkGroup({ title, accentClass, tools }: ToolLinkGroupProps) {
  return (
    <div>
      <h3 className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{title}</h3>
      <div className="mt-4 grid gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white"
          >
            <p className="text-sm font-semibold text-slate-950">{tool.label}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
