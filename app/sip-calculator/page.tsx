import { CalculatorLandingPage } from '@/components/calculator-landing-page';
import {
  buildCalculatorToolMetadata,
  getCalculatorToolPageById,
} from '@/lib/calculator-tool-pages';

const tool = getCalculatorToolPageById('sip')!;

export const metadata = buildCalculatorToolMetadata(tool);

export default function SipCalculatorPage() {
  return <CalculatorLandingPage tool={tool} />;
}
