import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('pdf-to-jpg')!;
const seoPage = getPdfSeoPageById('pdf-to-jpg')!;

export const metadata = buildPdfToolMetadata(tool);

export default function PdfToJpgPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
