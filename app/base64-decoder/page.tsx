import { Base64CategoryLandingPage } from '@/components/base64-category-landing-page';
import { buildBase64CategoryMetadata } from '@/lib/base64-category-pages';

export const metadata = buildBase64CategoryMetadata('decoder');

export default function Base64DecoderPage() {
  return <Base64CategoryLandingPage view="decoder" />;
}
