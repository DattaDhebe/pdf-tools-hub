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

  return buildCalculatorToolMetadata(tool);
}

export default async function LegacyCalculatorToolPage({
  params,
}: LegacyCalculatorToolPageProps) {
  const { slug } = await params;
  const tool = getCalculatorToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Ensure trailing slash for the redirect target
  const targetPath = tool.path.endsWith('/') ? tool.path : `${tool.path}/`;
  return <LegacyRedirectPage href={targetPath} label={tool.label} />;
}
