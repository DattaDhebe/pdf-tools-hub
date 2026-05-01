import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegacyRedirectPage } from '@/components/legacy-redirect-page';
import {
  buildCalculatorToolMetadata,
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

export async function generateMetadata({
  params,
}: LegacyCalculatorToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getCalculatorToolPageBySlug(slug);

  if (!tool) {
    return {};
  }

  return {
    ...buildCalculatorToolMetadata(tool),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default async function LegacyCalculatorToolPage({
  params,
}: LegacyCalculatorToolPageProps) {
  const { slug } = await params;
  const tool = getCalculatorToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <LegacyRedirectPage href={tool.path} label={tool.label} />;
}
