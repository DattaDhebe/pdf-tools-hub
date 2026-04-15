import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--app-panel-border)] bg-[var(--app-panel)]">
      <div className="mx-auto max-w-[1600px] px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="DHEBE Studios" className="h-8 w-auto" />
              <span className="font-semibold">DHEBE Studios</span>
            </Link>
            <p className="mt-3 text-sm theme-muted">Free online tools for Base64, PDF and Email. 100% client-side and privacy-first.</p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Tools</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/pdf-tools" className="hover:underline">PDF Tools</Link></li>
              <li><Link href="/base64-studio" className="hover:underline">Base64 Studio</Link></li>
              <li><Link href="/email-studio" className="hover:underline">Email Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Support</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/support" className="hover:underline">Help Center</Link></li>
              <li><a href="mailto:support@dhebe.com" className="hover:underline">support@dhebe.com</a></li>
              <li><Link href="/sitemap.xml" className="hover:underline">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 text-center text-sm theme-muted">
          <p>© {year} DHEBE Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
