import type { MetadataRoute } from 'next';
import { SITE_HOSTNAME, siteAsset } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: siteAsset('/sitemap.xml'),
    host: SITE_HOSTNAME,
  };
}
