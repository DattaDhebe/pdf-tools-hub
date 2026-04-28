import { Base64CategoryLandingPage } from '@/components/base64-category-landing-page';
import { buildBase64CategoryMetadata } from '@/lib/base64-category-pages';

export const metadata = buildBase64CategoryMetadata('all');

export default function Base64ConverterPage() {
  return <Base64CategoryLandingPage view="all" />;
}
