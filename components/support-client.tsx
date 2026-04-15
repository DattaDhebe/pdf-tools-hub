'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import Script from 'next/script';

interface SupportClientProps {
  structuredData: any;
}

export function SupportClient({ structuredData }: SupportClientProps) {
  return (
    <>
      <Script
        id="support-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ThemeToggle />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,_#fffaf5_0%,_#fff7ed_38%,_#fffdf8_100%)] px-4 py-6 text-[var(--app-text)] transition-colors duration-200 xl:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-[2rem] border p-6 backdrop-blur theme-panel sm:p-8">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">Support</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight theme-title">
                Help, privacy, and Base64 guidance
              </h1>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 theme-muted sm:text-base">
              Base64 Studio is designed to be simple, fast, and privacy-first. This page brings together the most important support information for using the encoder and decoder tools, understanding how your data is handled, and learning when Base64 is useful.
            </p>

            <div className="mt-6 rounded-[1.5rem] border p-5 theme-card-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">Contact</p>
              <p className="mt-2 text-lg font-semibold theme-title">Support email</p>
              <a
                href="mailto:support@dhebe.com"
                className="mt-2 inline-flex text-base font-medium text-cyan-700 transition hover:text-cyan-800"
              >
                support@dhebe.com
              </a>
              <p className="mt-2 text-sm leading-6 theme-muted">
                Use this address for website support, deployment questions, and tool-related help.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="theme-card inline-flex items-center rounded-2xl border px-4 py-3 text-sm font-semibold text-[var(--app-title)] transition hover:scale-[1.01]"
              >
                Open workbench
              </Link>
              <Link
                href="/tools/text-to-base64"
                className="theme-card inline-flex items-center rounded-2xl border px-4 py-3 text-sm font-semibold text-[var(--app-title)] transition hover:scale-[1.01]"
              >
                Open a tool page
              </Link>
              <a
                href="mailto:support@dhebe.com"
                className="theme-card inline-flex items-center rounded-2xl border px-4 py-3 text-sm font-semibold text-[var(--app-title)] transition hover:scale-[1.01]"
              >
                Email support
              </a>
            </div>
          </section>

          <section className="rounded-[2rem] border p-6 theme-privacy sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] theme-privacy-muted">
              Privacy First
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-privacy-title">
              Your data stays with you.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 theme-privacy-text sm:text-base">
              Base64 Studio runs entirely in your browser. We do not upload, store, or retain your files, text, or decoded content on our servers, so your conversions remain private and under your control.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border p-5 theme-privacy-inner">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                  Processing
                </p>
                <p className="mt-2 text-lg font-semibold theme-privacy-title">100% client-side</p>
                <p className="mt-2 text-sm leading-6 theme-privacy-text">
                  Conversion logic runs locally in the browser for speed, privacy, and reliability.
                </p>
              </div>
              <div className="rounded-[1.5rem] border p-5 theme-privacy-inner">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                  Storage
                </p>
                <p className="mt-2 text-lg font-semibold theme-privacy-title">No server-side retention</p>
                <p className="mt-2 text-sm leading-6 theme-privacy-text">
                  Your files and text are not stored on our servers as part of the conversion flow.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border p-6 backdrop-blur theme-panel sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight theme-title">Using the tools</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 theme-muted sm:text-base">
                <li>Paste text or Base64 directly into the relevant tool when working with strings.</li>
                <li>Upload local files when using image, PDF, audio, or generic file conversion flows.</li>
                <li>If a preview does not render, download the recovered file locally and open it in the appropriate app.</li>
                <li>Use dedicated `/tools/...` pages when you want a direct link to a specific converter or decoder.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border p-6 backdrop-blur theme-panel sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight theme-title">Why Base64 is used</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 theme-muted sm:text-base">
                <li>Base64 turns binary data into text so it can move safely through systems that expect strings.</li>
                <li>It is often used in APIs, JSON payloads, email formats, and inline browser data URIs.</li>
                <li>It helps when you need a portable text representation of images, files, PDFs, audio, or raw bytes.</li>
                <li>It is useful for testing, debugging, temporary embedding, and inspecting encoded content.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-[2rem] border p-6 backdrop-blur theme-panel sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight theme-title">Common Base64 use cases</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border p-5 theme-card-soft">
                <p className="text-sm font-semibold text-cyan-700">Web development</p>
                <p className="mt-2 text-sm leading-6 theme-muted">
                  Embed small images, icons, or fonts directly into HTML and CSS with data URLs.
                </p>
              </div>
              <div className="rounded-[1.5rem] border p-5 theme-card-soft">
                <p className="text-sm font-semibold text-cyan-700">APIs and integrations</p>
                <p className="mt-2 text-sm leading-6 theme-muted">
                  Send files and binary content through JSON or text-based request bodies.
                </p>
              </div>
              <div className="rounded-[1.5rem] border p-5 theme-card-soft">
                <p className="text-sm font-semibold text-cyan-700">Debugging and analysis</p>
                <p className="mt-2 text-sm leading-6 theme-muted">
                  Inspect encoded payloads, recover original content, and verify transformations quickly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
