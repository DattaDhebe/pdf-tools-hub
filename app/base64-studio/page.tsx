import type { Metadata } from 'next';
import { LegacyRedirectPage } from '@/components/legacy-redirect-page';
import { buildBase64CategoryMetadata } from '@/lib/base64-category-pages';

export const metadata: Metadata = {
  ...buildBase64CategoryMetadata('all'),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function LegacyBase64StudioPage() {
  return <LegacyRedirectPage href="/base64-converter" label="Base64 Converter" />;
}
