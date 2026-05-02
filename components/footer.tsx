import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--app-panel-border)] bg-[var(--app-panel)]" role="contentinfo">
      <div className="mx-auto max-w-[1600px] px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Link href="/" prefetch={false} className="block transition hover:opacity-80">
              <Image
                src="/logo-optimized.svg"
                alt="DHEBE Studios"
                width={200}
                height={50}
                className="h-10 w-auto"
              />
              <span className="sr-only">DHEBE Studios</span>
            </Link>
            <p className="mt-3 text-sm theme-muted">
              Free online tools for Base64, PDF, calculators, and email. 100% client-side and privacy-first.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">Tools</h2>
            <ul className="space-y-1 text-sm">
              <li><Link href="/pdf-tools" prefetch={false} className="hover:underline">PDF Tools</Link></li>
              <li><Link href="/base64-converter" prefetch={false} className="hover:underline">Base64 Converter</Link></li>
              <li><Link href="/calculator-studio" prefetch={false} className="hover:underline">Calculator Studio</Link></li>
              <li><Link href="/email-template-editor" prefetch={false} className="hover:underline">Email Template Editor</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold">Support</h2>
            <ul className="space-y-1 text-sm">
              <li><Link href="/support" prefetch={false} className="hover:underline">Help Center</Link></li>
              <li><a href="mailto:support@dhebe.com" className="hover:underline">support@dhebe.com</a></li>
              <li><Link href="/sitemap.xml" prefetch={false} className="hover:underline">Sitemap</Link></li>
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
