import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { LegacyRedirectPage } from '@/components/legacy-redirect-page';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { buildPdfToolMetadata } from '@/lib/pdf-seo-pages';
import { getPdfToolPageBySlug, getPdfToolPath, pdfToolPages } from '@/lib/pdf-tools-pages';
import { siteRoute } from '@/lib/site';

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

  const isLegacyRoute = getPdfToolPath(tool) !== `/pdf-tools/${tool.slug}`;

  return {
    ...buildPdfToolMetadata(tool),
    ...(isLegacyRoute
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: {
              index: false,
              follow: true,
            },
          },
        }
      : {}),
  };
}

export default async function PdfToolPage({ params }: PdfToolPageProps) {
  const { slug } = await params;
  const tool = getPdfToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  const targetPath = getPdfToolPath(tool);
  if (targetPath !== `/pdf-tools/${tool.slug}`) {
    return <LegacyRedirectPage href={targetPath} label={tool.label} />;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${tool.label} | PDF Studio`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: siteRoute(targetPath),
        description: tool.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'PDF Studio', item: '/pdf-studio' },
          { name: tool.label, item: targetPath },
        ]}
      />
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
