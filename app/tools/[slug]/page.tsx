import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { buildBase64ToolMetadata, getBase64ToolPageBySlug, getBase64ToolPath } from '@/lib/base64-tool-pages';
import { toolPages } from '@/lib/tool-pages';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return toolPages.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    return {};
  }

  return buildBase64ToolMetadata(tool);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }
  permanentRedirect(getBase64ToolPath(tool));
}
