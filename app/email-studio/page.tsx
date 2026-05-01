import type { Metadata } from 'next';
import { LegacyRedirectPage } from '@/components/legacy-redirect-page';
import { emailTemplateEditorPath } from '@/lib/email-template-page';
import { SITE_NAME, siteRoute } from '@/lib/site';

export const metadata: Metadata = {
  title: `Email Studio Redirect | ${SITE_NAME}`,
  description: 'This legacy email editor route now redirects to the current Email Template Editor page.',
  alternates: {
    canonical: siteRoute(emailTemplateEditorPath),
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function LegacyEmailStudioPage() {
  return <LegacyRedirectPage href={emailTemplateEditorPath} label="Email Template Editor" />;
}
