import type { Metadata } from 'next';
import { EmailTemplateLandingPage } from '@/components/email-template-landing-page';
import {
  emailTemplateEditorKeywords,
  emailTemplateEditorMetaDescription,
  emailTemplateEditorPath,
  emailTemplateEditorSeoTitle,
} from '@/lib/email-template-page';

export const metadata: Metadata = {
  title: emailTemplateEditorSeoTitle,
  description: emailTemplateEditorMetaDescription,
  keywords: emailTemplateEditorKeywords,
  alternates: {
    canonical: `https://dhebe.com${emailTemplateEditorPath}`,
  },
  openGraph: {
    title: emailTemplateEditorSeoTitle,
    description: emailTemplateEditorMetaDescription,
    url: `https://dhebe.com${emailTemplateEditorPath}`,
    type: 'website',
    siteName: 'DHEBE Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: emailTemplateEditorSeoTitle,
    description: emailTemplateEditorMetaDescription,
  },
};

export default function EmailTemplateEditorPage() {
  return <EmailTemplateLandingPage />;
}
