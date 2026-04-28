import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('emi')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function EmiCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
