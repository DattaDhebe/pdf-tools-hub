import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('pdf-to-word')!;
const seoPage = getPdfSeoPageById('pdf-to-word')!;

export const metadata = buildPdfToolMetadata(tool);

export default function PdfToWordPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
