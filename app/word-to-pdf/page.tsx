import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('word-to-pdf')!;
const seoPage = getPdfSeoPageById('word-to-pdf')!;

export const metadata = buildPdfToolMetadata(tool);

export default function WordToPdfPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
