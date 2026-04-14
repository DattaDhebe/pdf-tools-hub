import type { Metadata } from 'next';
import { SupportClient } from '@/components/support-client';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help using Base64 Studio, understand privacy and browser-based processing, and learn what Base64 is used for.',
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    title: 'Support | Base64 Studio',
    description:
      'Support and help page for Base64 Studio, including privacy guidance, Base64 basics, and common usage help.',
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
        name: 'Base64 Studio Support',
        url: 'https://dhebe.com/support',
        description:
          'Support page for Base64 Studio with privacy guidance, Base64 basics, usage help, and contact information.',
        mainEntity: {
          '@type': 'Organization',
          name: 'Base64 Studio',
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
            name: 'Does Base64 Studio upload my files to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Base64 Studio runs entirely in your browser and does not upload, store, or retain your files or decoded content on our servers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is a file preview not showing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Some previews depend on the browser recognizing the recovered MIME type. If a preview is unavailable, you can still download the decoded file locally.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Base64 used for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Base64 is commonly used to safely represent binary data as text for APIs, data URIs, email transport, embedded assets, and testing workflows.',
            },
          },
        ],
      },
    ],
  };

  return <SupportClient structuredData={structuredData} />;
}
