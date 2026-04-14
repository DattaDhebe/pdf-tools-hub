'use client';

import { useTheme } from '@/lib/hooks/useTheme';
import Link from 'next/link';
import Script from 'next/script';

interface SupportClientProps {
  structuredData: any;
}

export function SupportClient({ structuredData }: SupportClientProps) {
  const { theme, toggleTheme } = useTheme('support-theme');

  return (
    <>
      <Script
        id="support-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,_#fffaf5_0%,_#fff7ed_38%,_#fffdf8_100%)] px-4 py-6 text-[var(--app-text)] transition-colors duration-200 xl:px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="theme-panel rounded-[2rem] border p-6 backdrop-blur sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600">Support</p>
                <h1 className="theme-title mt-3 text-4xl font-semibold tracking-tight">Help, privacy, and Base64 guidance</h1>
              </div>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
              </button>
            </div>
            <p className="theme-muted mt-4 max-w-3xl text-sm leading-7 sm:text-base">
              Base64 Studio is designed to be simple, fast, and privacy-first. This page brings together the most important support information for using the encoder and decoder tools, understanding how your data is handled, and learning when Base64 is useful.
            </p>

            <div className="theme-card-soft mt-6 rounded-[1.5rem] border p-5">
              <p className="theme-muted-2 text-xs font-semibold uppercase tracking-[0.22em]">Contact</p>
              <p className="theme-title mt-2 text-lg font-semibold">Support email</p>
              <a
                href="mailto:support@dhebe.com"
                className="mt-2 inline-flex text-base font-medium text-cyan-700 transition hover:text-cyan-800"
              >
                support@dhebe.com
              </a>
              <p className="theme-muted mt-2 text-sm leading-6">
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

          <section className="theme-privacy rounded-[2rem] border p-6 sm:p-8">
            <p className="theme-privacy-muted text-xs font-semibold uppercase tracking-[0.28em]">Privacy First</p>
            <h2 className="theme-privacy-title mt-3 text-3xl font-semibold tracking-tight">Your data stays with you.</h2>
            <p className="theme-privacy-text mt-4 max-w-4xl text-sm leading-7 sm:text-base">
              Base64 Studio runs entirely in your browser. We do not upload, store, or retain your files, text, or decoded content on our servers, so your conversions remain private and under your control.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="theme-privacy-inner rounded-[1.5rem] border p-5">
                <p className="theme-privacy-muted text-xs font-semibold uppercase tracking-[0.22em]">Processing</p>
                <p className="theme-privacy-title mt-2 text-lg font-semibold">100% client-side</p>
                <p className="theme-privacy-text mt-2 text-sm leading-6">
                  Conversion logic runs locally in the browser for speed, privacy, and reliability.
                </p>
              </div>
              <div className="theme-privacy-inner rounded-[1.5rem] border p-5">
                <p className="theme-privacy-muted text-xs font-semibold uppercase tracking-[0.22em]">Storage</p>
                <p className="theme-privacy-title mt-2 text-lg font-semibold">No server-side retention</p>
                <p className="theme-privacy-text mt-2 text-sm leading-6">
                  Your files and text are not stored on our servers as part of the conversion flow.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="theme-panel rounded-[2rem] border p-6 backdrop-blur sm:p-8">
              <h2 className="theme-title text-2xl font-semibold tracking-tight">Using the tools</h2>
              <ul className="theme-muted mt-4 space-y-3 text-sm leading-7 sm:text-base">
                <li>Paste text or Base64 directly into the relevant tool when working with strings.</li>
                <li>Upload local files when using image, PDF, audio, or generic file conversion flows.</li>
                <li>If a preview does not render, download the recovered file locally and open it in the appropriate app.</li>
                <li>Use dedicated `/tools/...` pages when you want a direct link to a specific converter or decoder.</li>
              </ul>
            </div>

            <div className="theme-panel rounded-[2rem] border p-6 backdrop-blur sm:p-8">
              <h2 className="theme-title text-2xl font-semibold tracking-tight">Why Base64 is used</h2>
              <ul className="theme-muted mt-4 space-y-3 text-sm leading-7 sm:text-base">
                <li>Base64 turns binary data into text so it can move safely through systems that expect strings.</li>
                <li>It is often used in APIs, JSON payloads, email formats, and inline browser data URIs.</li>
                <li>It helps when you need a portable text representation of images, files, PDFs, audio, or raw bytes.</li>
                <li>It is useful for testing, debugging, temporary embedding, and inspecting encoded content.</li>
              </ul>
            </div>
          </section>

          <section className="theme-panel rounded-[2rem] border p-6 backdrop-blur sm:p-8">
            <h2 className="theme-title text-2xl font-semibold tracking-tight">Common Base64 use cases</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="theme-card-soft rounded-[1.5rem] border p-5">
                <p className="text-sm font-semibold text-cyan-700">Web development</p>
                <p className="theme-muted mt-2 text-sm leading-6">
                  Embed small images, icons, or fonts directly into HTML and CSS with data URLs.
                </p>
              </div>
              <div className="theme-card-soft rounded-[1.5rem] border p-5">
                <p className="text-sm font-semibold text-cyan-700">APIs and integrations</p>
                <p className="theme-muted mt-2 text-sm leading-6">
                  Send files and binary content through JSON or text-based request bodies.
                </p>
              </div>
              <div className="theme-card-soft rounded-[1.5rem] border p-5">
                <p className="text-sm font-semibold text-cyan-700">Debugging and analysis</p>
                <p className="theme-muted mt-2 text-sm leading-6">
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
