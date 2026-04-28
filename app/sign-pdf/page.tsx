import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('sign')!;
const seoPage = getPdfSeoPageById('sign')!;

export const metadata = buildPdfToolMetadata(tool);

export default function SignPdfPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
