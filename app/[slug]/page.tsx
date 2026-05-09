import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegacyRedirectPage } from '@/components/legacy-redirect-page';
import {
  buildBase64ToolMetadata,
  getBase64ToolPageBySlug,
  getBase64ToolPath,
  base64ToolPages,
} from '@/lib/base64-tool-pages';

interface Base64ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return base64ToolPages.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: Base64ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    return {};
  }

  // Use base metadata from helper which includes the canonical URL
  return buildBase64ToolMetadata(tool);
}

export default async function Base64ToolPage({
  params,
}: Base64ToolPageProps) {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <LegacyRedirectPage href={getBase64ToolPath(tool)} label={tool.label} />;
}
