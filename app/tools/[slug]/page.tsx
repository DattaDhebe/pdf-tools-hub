import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Base64ToolLandingPage } from '@/components/base64-tool-landing-page';
import {
  buildBase64ToolMetadata,
  getBase64ToolPageBySlug,
  base64ToolPages,
} from '@/lib/base64-tool-pages';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return base64ToolPages.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    return {};
  }

  // Base metadata from helper
  const baseMetadata = buildBase64ToolMetadata(tool);

  // Apply explicit robots config to resolve GSC indexing issues
  return {
    ...baseMetadata,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <Base64ToolLandingPage tool={tool} />;
}
