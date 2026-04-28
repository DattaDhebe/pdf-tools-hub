import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('gst')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function GstCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
