import type { Metadata } from 'next';
import { SupportClient } from '@/components/support-client';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help for Base64 Studio, PDF Studio, Calculator Studio, and the Email Template Editor. Learn tool usage, privacy-first processing, and common workflows across all DHEBE Studios tools.',
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: 'Support | DHEBE Studios',
    description:
      'Support and help page for Base64, PDF, calculator, and email tools, including usage guides, privacy, and contact information.',
    url: 'https://dhebe.com/support',
    type: 'website',
  },
};

export default function SupportPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: 'DHEBE Studios Support',
        url: 'https://dhebe.com/support',
        description:
          'Support page for DHEBE Studios covering Base64, PDF, and Email tools with privacy and usage guidance.',
        mainEntity: {
          '@type': 'Organization',
          name: 'DHEBE Studios',
          email: 'support@dhebe.com',
          url: 'https://dhebe.com',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@dhebe.com',
            url: 'https://dhebe.com/support',
            availableLanguage: ['English'],
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do DHEBE tools upload files to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Core conversion workflows are designed for browser-side processing and privacy-first handling. Files are processed locally in your session.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which tools are available in DHEBE Studios?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'DHEBE Studios includes Base64 tools for encoding and decoding, PDF tools for compression and editing workflows, calculator tools for high-demand utility pages, and an Email Template Editor for responsive campaign layouts.',
            },
          },
          {
            '@type': 'Question',
            name: 'What if preview is not available for a file?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Some formats and browsers have preview limitations. You can still download the generated file and open it in the appropriate desktop or mobile app.',
            },
          },
        ],
      },
    ],
  };

  return <SupportClient structuredData={structuredData} />;
}
