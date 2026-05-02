import type { MetadataRoute } from 'next';
import { calculatorToolPages } from '@/lib/calculator-tool-pages';
import { getPdfToolPath, pdfToolPages } from '@/lib/pdf-tools-pages';
import { base64ToolPages, getBase64ToolPath } from '@/lib/base64-tool-pages';
import { base64CategoryPages } from '@/lib/base64-category-pages';
import { getImageToolPath, imageToolPages } from '@/lib/image-tools-pages';
import { siteRoute } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteRoute('/'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: siteRoute('/support'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: siteRoute('/image-studio'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: siteRoute('/pdf-studio'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: siteRoute('/calculator-studio'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: siteRoute('/email-template-editor'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: siteRoute('/pdf-tools'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: siteRoute('/calculator-tools'),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    ...Object.values(base64CategoryPages).map((page) => ({
      url: siteRoute(page.path),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly' as const,
      priority: page.view === 'all' ? 0.92 : 0.82,
    })),
    ...pdfToolPages.map((tool) => ({
      url: siteRoute(getPdfToolPath(tool)),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...imageToolPages.map((tool) => ({
      url: siteRoute(getImageToolPath(tool)),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...calculatorToolPages.map((tool) => ({
      url: siteRoute(tool.path),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly' as const,
      priority: 0.84,
    })),
    ...base64ToolPages.map((tool) => ({
      url: siteRoute(getBase64ToolPath(tool)),
      lastModified: new Date('2026-05-02'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
