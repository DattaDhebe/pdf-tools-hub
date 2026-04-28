import { notFound, permanentRedirect } from 'next/navigation';
import {
  calculatorToolPages,
  getCalculatorToolPageBySlug,
} from '@/lib/calculator-tool-pages';

interface LegacyCalculatorToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return calculatorToolPages.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function LegacyCalculatorToolPage({
  params,
}: LegacyCalculatorToolPageProps) {
  const { slug } = await params;
  const tool = getCalculatorToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  permanentRedirect(tool.path);
}
