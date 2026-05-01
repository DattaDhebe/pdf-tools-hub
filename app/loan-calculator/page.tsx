import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('loan')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function LoanCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
