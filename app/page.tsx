import type { Metadata } from 'next';
import { StudiosHub } from '@/components/studios-hub';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'DHEBE Studios - Free Online Tools for Base64, PDF, Calculators & Email',
  description:
    'Professional tools suite featuring a Base64 Converter, PDF Studio, Calculator Studio, and a professional Email Template Editor. Encode, decode, compress, merge, calculate, and design with privacy-first browser tools.',
  keywords: [
    'dhebe studios',
    'free online tools',
    'base64 tools',
    'pdf tools',
    'calculator tools',
    'email templates',
    'encoding tools',
    'online utilities',
  ],
  alternates: {
    canonical: 'https://dhebe.com',
  },
  openGraph: {
    title: 'DHEBE Studios - Professional Tools Suite',
    description:
      'Free online tools for Base64 encoding/decoding, PDF manipulation, calculators, and email design. 100% private processing.',
    url: 'https://dhebe.com',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DHEBE Studios - Professional Tools Suite',
    description: 'Free online Base64, PDF, calculator, and email tools. No uploads, no tracking.',
  },
};

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'DHEBE Studios',
        url: 'https://dhebe.com',
        description:
          'Professional tools suite featuring a Base64 Converter, PDF Studio, Calculator Studio, and a professional Email Template Editor.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://dhebe.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'DHEBE Studios',
        url: 'https://dhebe.com',
        email: 'support@dhebe.com',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@dhebe.com',
          availableLanguage: ['English'],
          url: 'https://dhebe.com',
        },
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
      <StudiosHub />
    </>
  );
}
