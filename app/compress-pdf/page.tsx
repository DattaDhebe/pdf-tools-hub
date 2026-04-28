import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('compress')!;
const seoPage = getPdfSeoPageById('compress')!;

export const metadata = buildPdfToolMetadata(tool);

export default function CompressPdfPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
