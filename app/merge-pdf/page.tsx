import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('merge')!;
const seoPage = getPdfSeoPageById('merge')!;

export const metadata = buildPdfToolMetadata(tool);

export default function MergePdfPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
