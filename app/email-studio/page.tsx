import type { Metadata } from 'next';
import { EmailStudioClient } from '@/components/email-studio-client';

export const metadata: Metadata = {
  title: 'Email Template Studio - Build Responsive HTML Emails | DHEBE',
  description:
    'Create responsive HTML email templates with live preview, CTA controls, color customization, and export-ready code.',
  keywords: [
    'email template editor',
    'html email builder',
    'responsive email templates',
    'email studio',
    'email html export',
  ],
  alternates: {
    canonical: 'https://dhebe.com/email-studio',
  },
  openGraph: {
    title: 'Email Template Studio | DHEBE Studios',
    description:
      'Build responsive email templates with live preview and export-ready HTML.',
    url: 'https://dhebe.com/email-studio',
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Template Studio | DHEBE',
    description: 'Create and export responsive HTML email templates.',
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
        description:
          'Browser-based editor for creating responsive HTML email templates with live preview and export.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dhebe.com' },
          { '@type': 'ListItem', position: 2, name: 'Email Studio', item: 'https://dhebe.com/email-studio' },
        ],
      },
    ],
  };

  return <EmailStudioClient structuredData={structuredData} />;
}
