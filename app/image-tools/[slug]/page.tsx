import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Script from 'next/script';
import { ImageToolsWorkbench } from '@/components/image-tools-workbench';
import { getImageToolPageBySlug, getImageToolPath, imageToolPages } from '@/lib/image-tools-pages';

interface ImageToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return imageToolPages.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ImageToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getImageToolPageBySlug(slug);

  if (!tool) {
    return {};
  }

  return {
    title: `${tool.label} | Image Studio`,
    description: tool.description,
    alternates: {
      canonical: `https://dhebe.com${getImageToolPath(tool)}`,
    },
  };
}

export default async function ImageToolPage({ params }: ImageToolPageProps) {
  const { slug } = await params;
  const tool = getImageToolPageBySlug(slug);

  if (!tool) {
    notFound();
  }

  const targetPath = getImageToolPath(tool);
  if (targetPath !== `/image-tools/${tool.slug}`) {
    permanentRedirect(targetPath);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${tool.label} | Image Studio`,
        applicationCategory: 'MultimediaApplication',
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
            name: 'Image Studio',
            item: 'https://dhebe.com/image-studio',
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
        id={`image-tool-structured-data-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ImageToolsWorkbench
        initialTool={tool.id}
      />
    </>
  );
}
