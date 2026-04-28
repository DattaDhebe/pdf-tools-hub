import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DHEBE Studios',
    short_name: 'DHEBE',
    description:
      'Free online tools for Base64, PDF, calculators, and email workflows with privacy-first browser processing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffaf5',
    theme_color: '#0f172a',
    lang: 'en',
  };
}
