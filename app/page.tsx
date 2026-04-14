import type { Metadata } from 'next';
import { Base64Workbench } from '@/components/base64-workbench';
import Link from 'next/link';
import Script from 'next/script';
import { toolPages } from '@/lib/tool-pages';

export const metadata: Metadata = {
  title: 'Base64 Encoder and Decoder Tools',
  description:
    'Encode and decode Base64 online with dedicated tools for text, images, files, PDFs, audio, URLs, HTML, CSS, and hex.',
};

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Base64 Studio',
        url: 'https://dhebe.com',
        description:
          'Free online Base64 encoder and decoder tools for text, images, files, PDFs, audio, URLs, HTML, CSS, and hex.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://dhebe.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'Base64 Studio',
        url: 'https://dhebe.com',
        email: 'support@dhebe.com',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@dhebe.com',
          availableLanguage: ['English'],
          url: 'https://dhebe.com/support',
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
        url: 'https://dhebe.com',
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
              text: 'The site includes tools for Text, Image, URL, Hex, PDF, HTML, CSS, File, and Audio encoding, plus matching Base64 decoding tools for Text, Image, URL, Hex, PDF, HTML, CSS, File, and Audio.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Navigation Banner */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-4 xl:px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-lg font-bold text-slate-900">Base64 Studio</h1>
            <Link
              href="/pdf-tools"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-200 transition"
            >
              📄 PDF Tools Hub
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

          <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5">
            <h3 className="text-lg font-semibold text-slate-950">Need help or deployment guidance?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Visit the support page for privacy details, usage help, and Hostinger deployment guidance.
            </p>
            <Link
              href="/support"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800"
            >
              Open support page
              <span aria-hidden="true">→</span>
            </Link>
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
