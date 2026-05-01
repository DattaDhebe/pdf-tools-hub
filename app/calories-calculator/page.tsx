import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('calories')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function CaloriesCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
