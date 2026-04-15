'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { PdfCompressorTool } from '@/components/converters/pdf-compressor-tool';
import { PdfComingSoonTool } from '@/components/converters/pdf-coming-soon-tool';
import { PdfMergerTool } from '@/components/converters/pdf-merger-tool';
import { PdfRemovePagesTool } from '@/components/converters/pdf-remove-pages-tool';
import { PdfRotateTool } from '@/components/converters/pdf-rotate-tool';
import { PdfSplitterTool } from '@/components/converters/pdf-splitter-tool';
import { pdfTools } from '@/lib/pdf-tools';
import { pdfToolPages } from '@/lib/pdf-tools-pages';

type ActiveTool =
  | 'pdf-to-word'
  | 'compress'
  | 'merge'
  | 'edit'
  | 'sign'
  | 'split'
  | 'organize'
  | 'protect'
  | 'ocr'
  | 'rotate'
  | 'remove-pages';

interface PdfToolsWorkbenchProps {
  initialTool?: ActiveTool;
}

export function PdfToolsWorkbench({ initialTool = 'compress' }: PdfToolsWorkbenchProps) {
  const [activeTool, setActiveTool] = useState<ActiveTool>(initialTool);
  const pathname = usePathname();
  const router = useRouter();

  const activeToolData = pdfTools.find((tool) => tool.id === activeTool);
  const activeToolPage = pdfToolPages.find((tool) => tool.id === activeTool);
  const isDedicatedToolPage = activeToolPage ? pathname === `/pdf-tools/${activeToolPage.slug}` : false;
  const readyCount = pdfTools.filter((tool) => tool.status === 'ready').length;

  const ActiveComponent = {
    compress: PdfCompressorTool,
    merge: PdfMergerTool,
    split: PdfSplitterTool,
    rotate: PdfRotateTool,
    'remove-pages': PdfRemovePagesTool,
  }[activeTool as 'compress' | 'merge' | 'split' | 'rotate' | 'remove-pages'];

  const handleToolSelect = (toolId: ActiveTool) => {
    const nextPage = pdfToolPages.find((tool) => tool.id === toolId);

    if (isDedicatedToolPage && nextPage) {
      router.push(`/pdf-tools/${nextPage.slug}`);
      return;
    }

    setActiveTool(toolId);
  };

  return (
    <main className="theme-page-pdf min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <ThemeToggle />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-6 pr-24 sm:pr-32">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">PDF Tools</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight theme-title sm:text-5xl">
              Powerful PDF Utilities
            </h1>
            <p className="mt-3 max-w-2xl text-base theme-muted">
              Compress, merge, split, rotate, and clean up PDFs now, with the most-used online PDF workflows surfaced first so PDF Studio stays aligned with what people use most.
            </p>
          </div>
        </header>

        <section className="mb-8 rounded-[2rem] border p-5 theme-panel sm:p-6">
          <div className="border-b border-[var(--app-card-border)] pb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-purple-600">
                  Most Used PDF Tools
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
                  Pick a workflow
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 theme-muted">
                  Based on recurring tool lists from Adobe Acrobat, Smallpdf, and iLovePDF, these are the PDF tasks users reach for most often online.
                </p>
              </div>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold text-purple-700">
                {readyCount}/{pdfTools.length} ready
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="theme-rail overflow-hidden rounded-[1.6rem] border p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <nav className="max-h-[32rem] space-y-2 overflow-y-auto pr-1">
                {pdfTools.map((tool) => {
                  const isActive = tool.id === activeTool;
                  const isReady = tool.status === 'ready';

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleToolSelect(tool.id as ActiveTool)}
                      aria-pressed={isActive}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                        isActive
                          ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50'
                      } ${!isReady ? 'opacity-90' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold leading-5">{tool.label}</p>
                          <p
                            className={`mt-1 text-xs leading-5 ${
                              isActive ? 'text-slate-200' : 'text-slate-500'
                            }`}
                          >
                            {tool.description}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                            isReady
                              ? isActive
                                ? 'bg-white/15 text-white'
                                : 'bg-emerald-100 text-emerald-700'
                              : isActive
                                ? 'bg-white/15 text-white'
                                : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {isReady ? 'Ready' : 'Soon'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </section>

        <div className="mb-8 rounded-[1.75rem] border p-5 theme-privacy">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] theme-privacy-muted">
                Privacy Guaranteed
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight theme-privacy-title">
                Your PDFs never leave your device.
              </h2>
              <p className="mt-3 text-sm leading-7 theme-privacy-text sm:text-base">
                All processing happens entirely in your browser using JavaScript. We never upload, store, or see your PDF files, so your data remains completely private and under your control.
              </p>
            </div>
          </div>
        </div>

        <section className="mb-8 rounded-[2rem] border p-6 theme-panel sm:p-8">
          <div className="mb-8 border-b border-[var(--app-card-border)] pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">
                  {activeToolData?.status === 'ready' ? 'Ready Tool' : 'Planned Tool'}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
                  {activeToolData?.label}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 theme-muted">
                  {activeToolData?.longDescription}
                </p>
              </div>
              {activeToolPage ? (
                isDedicatedToolPage ? (
                  <Link href="/pdf-studio">
                    <button className="theme-accent-chip-purple whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-105">
                      Back to Studio
                    </button>
                  </Link>
                ) : (
                  <Link href={`/pdf-tools/${activeToolPage.slug}`}>
                    <button className="theme-accent-chip-purple whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-105">
                      Open Dedicated Page
                    </button>
                  </Link>
                )
              ) : (
                <span className="rounded-lg border px-4 py-2 text-sm font-semibold theme-card-soft theme-muted-2">
                  Coming Soon
                </span>
              )}
            </div>
          </div>

          {ActiveComponent ? (
            <ActiveComponent />
          ) : activeToolData ? (
            <PdfComingSoonTool
              label={activeToolData.label}
              description={activeToolData.longDescription}
            />
          ) : null}
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-6 theme-card">
            <h3 className="font-semibold theme-title">Lightning Fast</h3>
            <p className="mt-2 text-sm theme-muted">
              All processing happens instantly in your browser without any server requests.
            </p>
          </div>

          <div className="rounded-xl border p-6 theme-card">
            <h3 className="font-semibold theme-title">Completely Private</h3>
            <p className="mt-2 text-sm theme-muted">
              Your PDF files never leave your device. No uploads, no cloud storage, no tracking.
            </p>
          </div>

          <div className="rounded-xl border p-6 theme-card">
            <h3 className="font-semibold theme-title">Growing Toolkit</h3>
            <p className="mt-2 text-sm theme-muted">
              New high-demand PDF workflows are being added while keeping the current tools lightweight and browser-based.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
