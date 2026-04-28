import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Base64ToolLandingPage } from '@/components/base64-tool-landing-page';
import {
  buildBase64ToolMetadata,
  getBase64ToolPageBySlug,
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

  return <Base64ToolLandingPage tool={tool} />;
}
