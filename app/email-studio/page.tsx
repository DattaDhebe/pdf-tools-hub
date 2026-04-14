import type { Metadata } from 'next';
import { EmailStudioClient } from '@/components/email-studio-client';

export const metadata: Metadata = {
  title: 'Email Template Studio - Coming Soon | DHEBE',
  description:
    'Professional email template builder with drag-and-drop editor, responsive designs, and easy export. Coming soon to DHEBE Studios. Join our waitlist for early access.',
  keywords: [
    'email templates',
    'email builder',
    'responsive emails',
    'email designer',
    'html email',
    'email editor',
    'coming soon',
  ],
  alternates: {
    canonical: 'https://dhebe.com/email-studio',
  },
  openGraph: {
    title: 'Email Template Studio - Coming Soon | DHEBE Studios',
    description:
      'Professional drag-and-drop email template builder. Create responsive emails easily (coming soon).',
    url: 'https://dhebe.com/email-studio',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Template Studio - Coming Soon',
    description: 'Professional email template builder launching soon. Join our waitlist.',
  },
};

export default function EmailStudioPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Email Template Studio | DHEBE Studios',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: 'https://dhebe.com/email-studio',
        description: 'Professional email template builder coming soon to DHEBE Studios.',
        status: 'Coming Soon',
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
            name: 'Email Template Studio',
            item: 'https://dhebe.com/email-studio',
          },
        ],
      },
    ],
  };

  return <EmailStudioClient structuredData={structuredData} />;
}
