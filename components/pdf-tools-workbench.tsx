'use client';

import { useEffect, useState } from 'react';
import { PdfCompressorTool } from '@/components/converters/pdf-compressor-tool';
import { PdfMergerTool } from '@/components/converters/pdf-merger-tool';
import { PdfSplitterTool } from '@/components/converters/pdf-splitter-tool';
import { pdfTools } from '@/lib/pdf-tools';

type ActiveTool = 'compress' | 'merge' | 'split';

export function PdfToolsWorkbench() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTool, setActiveTool] = useState<ActiveTool>('compress');

  const activeToolData = pdfTools.find((tool) => tool.id === activeTool);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('pdf-tools-theme');
    const preferredTheme =
      storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';

    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('pdf-tools-theme', nextTheme);
  };

  const ActiveComponent = {
    compress: PdfCompressorTool,
    merge: PdfMergerTool,
    split: PdfSplitterTool,
  }[activeTool];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.16),_transparent_32%),linear-gradient(180deg,_#faf5ff_0%,_#f5fdf8_38%,_#fdf8ff_100%)] text-[var(--app-text)] transition-colors duration-200">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">
                PDF Tools
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 mt-2 sm:text-5xl">
                Powerful PDF Utilities
              </h1>
              <p className="text-base text-slate-600 mt-3 max-w-lg">
                100% client-side PDF processing. Compress, merge, and split PDFs directly in your browser without uploading to any server.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-card inline-flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold text-[var(--app-title)] transition hover:scale-[1.01]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,_rgba(168,85,247,0.2),_rgba(34,197,94,0.2))] text-base">
                {theme === 'dark' ? '☀' : '☾'}
              </span>
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>

        {/* Privacy Banner */}
        <div className="theme-privacy mb-8 rounded-[1.75rem] border p-5 bg-gradient-to-r from-purple-50 to-green-50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="theme-privacy-muted text-xs font-semibold uppercase tracking-[0.28em]">
                Privacy Guaranteed
              </p>
              <h2 className="theme-privacy-title mt-3 text-2xl font-semibold tracking-tight">
                Your PDFs never leave your device.
              </h2>
              <p className="theme-privacy-text mt-3 text-sm leading-7 sm:text-base">
                All processing happens entirely in your browser using JavaScript. We never upload, store, or see your PDF files, so your data remains completely private and under your control.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Navigation */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {pdfTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as ActiveTool)}
              className={`rounded-xl border-2 p-4 text-left transition ${
                activeTool === tool.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 bg-white hover:border-purple-200 hover:bg-purple-50'
              }`}
            >
              <p className="font-semibold text-slate-900">{tool.label}</p>
              <p className="text-sm text-slate-600 mt-1">{tool.description}</p>
            </button>
          ))}
        </div>

        {/* Active Tool Section */}
        <section className="theme-panel rounded-[2rem] border p-6 sm:p-8 mb-8">
          <div className="mb-8 border-b border-slate-200/80 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">
              {activeTool === 'compress' && 'Compressor'}
              {activeTool === 'merge' && 'Merger'}
              {activeTool === 'split' && 'Splitter'}
            </p>
            <h2 className="theme-title mt-3 text-3xl font-semibold tracking-tight">
              {activeToolData?.label}
            </h2>
            <p className="theme-muted mt-3 text-sm leading-6 max-w-2xl">
              {activeToolData?.longDescription}
            </p>
          </div>

          <ActiveComponent />
        </section>

        {/* Features Grid */}
        <section className="grid gap-4 sm:grid-cols-3 mt-12">
          <div className="rounded-xl border border-slate-200/80 p-6">
            <div className="text-2xl mb-3">🚀</div>
            <h3 className="font-semibold text-slate-900">Lightning Fast</h3>
            <p className="text-sm text-slate-600 mt-2">
              All processing happens instantly in your browser without any server requests.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 p-6">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold text-slate-900">Completely Private</h3>
            <p className="text-sm text-slate-600 mt-2">
              Your PDF files never leave your device. No uploads, no cloud storage, no tracking.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 p-6">
            <div className="text-2xl mb-3">∞</div>
            <h3 className="font-semibold text-slate-900">No Limitations</h3>
            <p className="text-sm text-slate-600 mt-2">
              Process as many files as you need, without limits on file size or number of operations.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
