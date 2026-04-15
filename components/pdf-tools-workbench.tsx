'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { PdfCompressorTool } from '@/components/converters/pdf-compressor-tool';
import { PdfMergerTool } from '@/components/converters/pdf-merger-tool';
import { PdfRemovePagesTool } from '@/components/converters/pdf-remove-pages-tool';
import { PdfRotateTool } from '@/components/converters/pdf-rotate-tool';
import { PdfSplitterTool } from '@/components/converters/pdf-splitter-tool';
import { pdfTools } from '@/lib/pdf-tools';
import { pdfToolPages } from '@/lib/pdf-tools-pages';

type ActiveTool = 'compress' | 'merge' | 'split' | 'rotate' | 'remove-pages';

interface PdfToolsWorkbenchProps {
  initialTool?: ActiveTool;
}

export function PdfToolsWorkbench({ initialTool = 'compress' }: PdfToolsWorkbenchProps) {
  const [activeTool, setActiveTool] = useState<ActiveTool>(initialTool);

  const activeToolData = pdfTools.find((tool) => tool.id === activeTool);

  const ActiveComponent = {
    compress: PdfCompressorTool,
    merge: PdfMergerTool,
    split: PdfSplitterTool,
    rotate: PdfRotateTool,
    'remove-pages': PdfRemovePagesTool,
  }[activeTool];

  return (
    <main className="theme-page-pdf min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <ThemeToggle />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">PDF Tools</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight theme-title sm:text-5xl">
              Powerful PDF Utilities
            </h1>
            <p className="mt-3 max-w-lg text-base theme-muted">
              100% client-side PDF processing. Compress, merge, and split PDFs directly in your browser without uploading to any server.
            </p>
          </div>
        </header>

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

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {pdfTools.map((tool) => {
            const toolPage = pdfToolPages.find((p) => p.id === tool.id);
            return (
              <Link
                key={tool.id}
                href={toolPage ? `/pdf-tools/${toolPage.slug}` : '#'}
                onClick={(e) => !toolPage && e.preventDefault()}
              >
                <button
                  onClick={() => setActiveTool(tool.id as ActiveTool)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition theme-card ${
                    activeTool === tool.id
                      ? 'border-purple-500 theme-card-soft'
                      : 'border-[var(--app-card-border)] hover:border-purple-200/50'
                  }`}
                >
                  <p className="font-semibold theme-title">{tool.label}</p>
                  <p className="mt-1 text-sm theme-muted">{tool.description}</p>
                </button>
              </Link>
            );
          })}
        </div>

        <section className="mb-8 rounded-[2rem] border p-6 theme-panel sm:p-8">
          <div className="mb-8 border-b border-[var(--app-card-border)] pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">
                  {activeTool === 'compress' && 'Compressor'}
                  {activeTool === 'merge' && 'Merger'}
                  {activeTool === 'split' && 'Splitter'}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
                  {activeToolData?.label}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 theme-muted">
                  {activeToolData?.longDescription}
                </p>
              </div>
              {(() => {
                const toolPage = pdfToolPages.find((p) => p.id === activeTool);
                return toolPage ? (
                  <Link href={`/pdf-tools/${toolPage.slug}`}>
                    <button className="theme-accent-chip-purple whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-105">
                      View Page
                    </button>
                  </Link>
                ) : null;
              })()}
            </div>
          </div>

          <ActiveComponent />
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
            <h3 className="font-semibold theme-title">No Limitations</h3>
            <p className="mt-2 text-sm theme-muted">
              Process as many files as you need, without limits on file size or number of operations.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
