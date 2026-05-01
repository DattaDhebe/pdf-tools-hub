import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('salary')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function SalaryCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
