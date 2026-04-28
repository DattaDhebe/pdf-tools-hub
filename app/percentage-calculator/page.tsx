import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('percentage')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function PercentageCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
