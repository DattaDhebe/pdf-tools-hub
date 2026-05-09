import type { Metadata } from 'next';
import { StudiosHub } from '@/components/studios-hub';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { SITE_NAME, SUPPORT_EMAIL, siteRoute } from '@/lib/site';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Free Online Tools for Base64, PDF, Calculators & Email`,
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
    canonical: siteRoute('/'),
  },
  openGraph: {
    title: `${SITE_NAME} - Professional Tools Suite`,
    description:
      'Free online tools for Base64 encoding/decoding, PDF manipulation, calculators, and email design. 100% private processing.',
    url: siteRoute('/'),
    type: 'website',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Professional Tools Suite`,
    description: 'Free online Base64, PDF, calculator, and email tools. No uploads, no tracking.',
  },
};

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: siteRoute('/'),
        description:
          'Professional tools suite featuring a Base64 Converter, PDF Studio, Calculator Studio, and a professional Email Template Editor.',
        potentialAction: {
          '@type': 'SearchAction',
          target: siteRoute('/?q={search_term_string}'),
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: siteRoute('/'),
        email: SUPPORT_EMAIL,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SUPPORT_EMAIL,
          availableLanguage: ['English'],
          url: siteRoute('/'),
        },
      },
    ],
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
        ]}
      />
      <script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StudiosHub />
    </>
  );
}
