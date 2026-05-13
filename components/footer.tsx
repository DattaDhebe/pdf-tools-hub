import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--app-panel-border)] bg-[var(--app-panel)]" role="contentinfo">
      <div className="mx-auto max-w-[1600px] px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Link href="/" className="block transition hover:opacity-80">
              <BrandLogo />
            </Link>
            <p className="mt-3 text-sm theme-muted">
              Free online tools for Base64, PDF, calculators, and email. 100% client-side and privacy-first.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">Tools</h2>
            <ul className="space-y-1 text-sm">
              <li><Link href="/pdf-tools/" className="hover:underline" prefetch={false}>PDF Tools</Link></li>
              <li><Link href="/base64-converter/" className="hover:underline" prefetch={false}>Base64 Converter</Link></li>
              <li><Link href="/calculator-studio/" className="hover:underline" prefetch={false}>Calculator Studio</Link></li>
              <li><Link href="/email-template-editor/" className="hover:underline" prefetch={false}>Email Template Editor</Link></li>
              <li><Link href="/dhebevoice/" className="hover:underline" prefetch={false}>DhebeVoice</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">Support</h2>
            <ul className="space-y-1 text-sm">
              <li><Link href="/support/" className="hover:underline" prefetch={false}>Help Center</Link></li>
              <li><Link href="/dhebevoice/privacy-policy" className="hover:underline" prefetch={false}>DhebeVoice Privacy Policy</Link></li>
              <li><a href="mailto:support@dhebe.com" className="hover:underline">support@dhebe.com</a></li>
              <li><Link href="/sitemap.xml" className="hover:underline" prefetch={false}>Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-center text-sm theme-muted">
          <p>&copy; {year} DHEBE Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
