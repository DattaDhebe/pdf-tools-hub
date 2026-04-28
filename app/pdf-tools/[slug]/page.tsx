import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Script from 'next/script';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import { buildPdfToolMetadata } from '@/lib/pdf-seo-pages';
import { getPdfToolPageBySlug, getPdfToolPath, pdfToolPages } from '@/lib/pdf-tools-pages';

interface PdfToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return pdfToolPages.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PdfToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getPdfToolPageBySlug(slug);

  if (!tool) {
    return {};
  }

  return buildPdfToolMetadata(tool);
}

export default async function PdfToolPage({ params }: PdfToolPageProps) {
  const { slug } = await params;
  const tool = getPdfToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  const targetPath = getPdfToolPath(tool);
  if (targetPath !== `/pdf-tools/${tool.slug}`) {
    permanentRedirect(targetPath);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${tool.label} | PDF Studio`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: `https://dhebe.com${targetPath}`,
        description: tool.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://dhebe.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'PDF Studio',
            item: 'https://dhebe.com/pdf-studio',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.label,
            item: `https://dhebe.com${targetPath}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id={`pdf-tool-structured-data-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PdfToolsWorkbench
        initialTool={tool.id}
      />
    </>
  );
}
