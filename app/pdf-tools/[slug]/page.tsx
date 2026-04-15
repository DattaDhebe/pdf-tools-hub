import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { PdfToolsWorkbench } from '@/components/pdf-tools-workbench';
import { getPdfToolPageBySlug, pdfToolPages } from '@/lib/pdf-tools-pages';

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

  const title = `${tool.label} Online`;

  return {
    title,
    description: tool.description,
    keywords: [
      tool.label.toLowerCase(),
      `${tool.label.toLowerCase()} online`,
      'pdf tools',
      'online pdf tools',
      'free tools',
    ],
    alternates: {
      canonical: `https://dhebe.com/pdf-tools/${tool.slug}`,
    },
    openGraph: {
      title: `${title} | PDF Studio`,
      description: tool.description,
      url: `https://dhebe.com/pdf-tools/${tool.slug}`,
      type: 'website',
      siteName: 'DHEBE Studios',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | PDF Studio`,
      description: tool.description,
    },
  };
}

export default async function PdfToolPage({ params }: PdfToolPageProps) {
  const { slug } = await params;
  const tool = getPdfToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${tool.label} | PDF Studio`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: `https://dhebe.com/pdf-tools/${tool.slug}`,
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
            item: `https://dhebe.com/pdf-tools/${tool.slug}`,
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
