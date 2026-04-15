import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--app-panel-border)] bg-[var(--app-panel)]">
      <div className="mx-auto max-w-[1600px] px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
              <svg
                className="h-8 w-8 text-teal-600"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 150 100 L 250 100 Q 320 100 320 200 L 320 312 Q 320 412 250 412 L 150 412 Z"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 190 140 L 250 140 Q 280 140 280 200 L 280 312 Q 280 372 250 372 L 190 372 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 220 180 Q 340 200 340 256 Q 340 312 220 332"
                  fill="none"
                  stroke="url(#grad2)"
                  strokeWidth="50"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g transform="translate(380, 80)">
                  <line x1="0" y1="80" x2="0" y2="0" stroke="url(#grad2)" strokeWidth="45" strokeLinecap="round" />
                  <polygon points="0,-20 -40,-80 40,-80" fill="url(#grad2)" />
                </g>
              </svg>
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
