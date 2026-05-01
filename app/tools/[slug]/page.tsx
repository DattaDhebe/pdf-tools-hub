import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegacyRedirectPage } from '@/components/legacy-redirect-page';
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

  return {
    ...buildBase64ToolMetadata(tool),
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

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getBase64ToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <LegacyRedirectPage href={getBase64ToolPath(tool)} label={tool.label} />;
}
