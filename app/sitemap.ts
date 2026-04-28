import type { MetadataRoute } from 'next';
import { toolPages } from '@/lib/tool-pages';
import { calculatorToolPages } from '@/lib/calculator-tool-pages';
import { pdfToolPages } from '@/lib/pdf-tools-pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dhebe.com',
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://dhebe.com/support',
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://dhebe.com/base64-studio',
      lastModified: new Date('2026-04-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://dhebe.com/pdf-studio',
      lastModified: new Date('2026-04-21'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: 'https://dhebe.com/calculator-studio',
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: 'https://dhebe.com/email-studio',
      lastModified: new Date('2026-04-21'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://dhebe.com/pdf-tools',
      lastModified: new Date('2026-04-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://dhebe.com/calculator-tools',
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    ...pdfToolPages.map((tool) => ({
      url: `https://dhebe.com/pdf-tools/${tool.slug}`,
      lastModified: new Date('2026-04-21'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...calculatorToolPages.map((tool) => ({
      url: `https://dhebe.com${tool.path}`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'weekly' as const,
      priority: 0.84,
    })),
    ...toolPages.map((tool) => ({
      url: `https://dhebe.com/tools/${tool.slug}`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
