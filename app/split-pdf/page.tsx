import { PdfToolLandingPage } from '@/components/pdf-tool-landing-page';
import { buildPdfToolMetadata, getPdfSeoPageById } from '@/lib/pdf-seo-pages';
import { getPdfToolPageById } from '@/lib/pdf-tools-pages';

const tool = getPdfToolPageById('split')!;
const seoPage = getPdfSeoPageById('split')!;

export const metadata = buildPdfToolMetadata(tool);

export default function SplitPdfPage() {
  return <PdfToolLandingPage tool={tool} seoPage={seoPage} />;
}
