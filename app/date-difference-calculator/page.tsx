import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('date-diff')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function DateDifferenceCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
