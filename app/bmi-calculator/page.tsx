import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('bmi')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function BmiCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
