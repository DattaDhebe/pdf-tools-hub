import type { MetadataRoute } from 'next';
import { calculatorToolPages } from '@/lib/calculator-tool-pages';
import { getPdfToolPath, pdfToolPages } from '@/lib/pdf-tools-pages';
import { base64ToolPages, getBase64ToolPath } from '@/lib/base64-tool-pages';
import { getImageToolPath, imageToolPages } from '@/lib/image-tools-pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dhebe.com',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://dhebe.com/support',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://dhebe.com/base64-converter',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: 'https://dhebe.com/image-studio',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: 'https://dhebe.com/pdf-studio',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: 'https://dhebe.com/calculator-studio',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: 'https://dhebe.com/email-template-editor',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: 'https://dhebe.com/pdf-tools',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://dhebe.com/calculator-tools',
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    ...pdfToolPages.map((tool) => ({
      url: `https://dhebe.com${getPdfToolPath(tool)}`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...imageToolPages.map((tool) => ({
      url: `https://dhebe.com${getImageToolPath(tool)}`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...calculatorToolPages.map((tool) => ({
      url: `https://dhebe.com${tool.path}`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.84,
    })),
    ...base64ToolPages.map((tool) => ({
      url: `https://dhebe.com${getBase64ToolPath(tool)}`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
