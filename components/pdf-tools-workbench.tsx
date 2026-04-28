'use client';

import { type ComponentType, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PdfCompressorTool } from '@/components/converters/pdf-compressor-tool';
import { PdfComingSoonTool } from '@/components/converters/pdf-coming-soon-tool';
import { PdfMergerTool } from '@/components/converters/pdf-merger-tool';
import { PdfRemovePagesTool } from '@/components/converters/pdf-remove-pages-tool';
import { PdfRotateTool } from '@/components/converters/pdf-rotate-tool';
import { PdfSplitterTool } from '@/components/converters/pdf-splitter-tool';
import { PdfWatermarkTool } from '@/components/converters/pdf-watermark-tool';
import { PdfAnnotationTool } from '@/components/converters/pdf-annotation-tool';
import { PdfFormFillerTool } from '@/components/converters/pdf-form-filler-tool';
import { PdfEncryptTool } from '@/components/converters/pdf-encrypt-tool';
import { PdfToWordTool } from '@/components/converters/pdf-to-word-tool';
import { PdfEditTool } from '@/components/converters/pdf-edit-tool';
import { PdfSignTool } from '@/components/converters/pdf-sign-tool';
import { PdfOrganizeTool } from '@/components/converters/pdf-organize-tool';
import { PdfOcrTool } from '@/components/converters/pdf-ocr-tool';
import { PdfExtractPagesTool } from '@/components/converters/pdf-extract-pages-tool';
import { PdfAddPageNumbersTool } from '@/components/converters/pdf-add-page-numbers-tool';
import { PdfToJpgTool } from '@/components/converters/pdf-to-jpg-tool';
import { JpgToPdfTool } from '@/components/converters/jpg-to-pdf-tool';
import { PdfBuilderTool } from '@/components/converters/pdf-builder-tool';
import { PdfExporterTool } from '@/components/converters/pdf-exporter-tool';
import { PdfCropTool } from '@/components/converters/pdf-crop-tool';
import { pdfTools } from '@/lib/pdf-tools';
import { getPdfToolPath, pdfToolPages } from '@/lib/pdf-tools-pages';

interface PdfToolsWorkbenchProps {
  initialTool?: string;
}

export function PdfToolsWorkbench({ initialTool = 'pdf-to-word' }: PdfToolsWorkbenchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTool, setActiveTool] = useState<string>(initialTool);

  useEffect(() => {
    setActiveTool(initialTool);
  }, [initialTool]);

  const activeOption = useMemo(
    () => pdfTools.find((tool) => tool.id === activeTool) ?? pdfTools[0],
    [activeTool],
  );

  const activeToolPage = pdfToolPages.find((tool) => tool.id === activeTool) ?? null;
  const isDedicatedToolPage = activeToolPage
    ? pathname === getPdfToolPath(activeToolPage)
    : false;

  const readyIds = new Set(
    pdfTools.filter((tool) => tool.status === 'ready').map((tool) => tool.id),
  );

  const toolComponents: Record<string, ComponentType> = {
    compress: PdfCompressorTool,
    merge: PdfMergerTool,
    split: PdfSplitterTool,
    rotate: PdfRotateTool,
    'remove-pages': PdfRemovePagesTool,
    watermark: PdfWatermarkTool,
    annotate: PdfAnnotationTool,
    'form-fill': PdfFormFillerTool,
    protect: PdfEncryptTool,
    'pdf-to-word': PdfToWordTool,
    edit: PdfEditTool,
    sign: PdfSignTool,
    organize: PdfOrganizeTool,
    ocr: PdfOcrTool,
    'extract-pages': PdfExtractPagesTool,
    'add-page-numbers': PdfAddPageNumbersTool,
    'pdf-to-jpg': PdfToJpgTool,
    'jpg-to-pdf': JpgToPdfTool,
    'scan-to-pdf': () => <PdfBuilderTool mode="scan-to-pdf" />,
    optimize: PdfCompressorTool,
    repair: () => <PdfExporterTool mode="repair" />,
    'convert-to-pdf': () => <PdfBuilderTool mode="convert-to-pdf" />,
    'word-to-pdf': () => <PdfBuilderTool mode="word-to-pdf" />,
    'powerpoint-to-pdf': () => <PdfBuilderTool mode="powerpoint-to-pdf" />,
    'excel-to-pdf': () => <PdfBuilderTool mode="excel-to-pdf" />,
    'html-to-pdf': () => <PdfBuilderTool mode="html-to-pdf" />,
    'convert-from-pdf': () => <PdfExporterTool mode="convert-from-pdf" />,
    'pdf-to-powerpoint': () => <PdfExporterTool mode="pdf-to-powerpoint" />,
    'pdf-to-excel': () => <PdfExporterTool mode="pdf-to-excel" />,
    'pdf-to-pdfa': () => <PdfExporterTool mode="pdf-to-pdfa" />,
    'crop-pdf': PdfCropTool,
  };

  const ActiveComponent = toolComponents[activeTool];

  const handleToolSelect = (toolId: string) => {
    const targetPage = pdfToolPages.find((tool) => tool.id === toolId);

    if (isDedicatedToolPage && targetPage) {
      router.push(getPdfToolPath(targetPage));
      return;
    }

    setActiveTool(toolId);
  };

  return (
    <main className="theme-page-pdf min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-4 py-6 xl:grid xl:grid-cols-[18rem_minmax(0,1fr)_18rem] xl:items-start xl:px-6">
        <PdfRail
          title="Popular PDF Tools"
          badgeLabel={`${readyIds.size}/${pdfTools.length} ready`}
          sectionLabel="Tool List"
          description="High-demand PDF workflows like PDF to Word, JPG to PDF, PDF to JPG, merge PDF, and compress PDF are pinned near the top for faster access."
          options={pdfTools}
          activeId={activeTool}
          readyIds={readyIds}
          accentClasses={{
            eyebrow: 'text-purple-600',
            badge: 'bg-purple-100 text-purple-700',
            hover: 'hover:border-purple-300 hover:bg-purple-50',
          }}
          footerText="Select a PDF tool to work in the center panel, or open its dedicated SEO page from the right rail."
          onSelect={(id) => handleToolSelect(id)}
          compactOnMobile
        />

        <section className="theme-panel min-w-0 rounded-[2rem] border p-6 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600">
                {activeOption.status === 'ready' ? 'Active Tool' : 'Planned Tool'}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title sm:text-4xl">
                {activeOption.label}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 theme-muted sm:text-base">
                {activeOption.longDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div className="theme-card-soft grid gap-2 rounded-2xl border p-4 text-sm theme-muted sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">
                    Processing
                  </p>
                  <p className="mt-1 font-medium theme-title">Fully client-side</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">
                    Status
                  </p>
                  <p className="mt-1 font-medium theme-title">
                    {activeOption.status === 'ready' ? 'Available now' : 'Dedicated page live'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="theme-privacy mb-8 rounded-[1.75rem] border p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] theme-privacy-muted">
                  Privacy First
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight theme-privacy-title">
                  Your PDFs stay on your device.
                </h3>
                <p className="mt-3 text-sm leading-7 theme-privacy-text sm:text-base">
                  PDF Studio is designed around browser-based workflows. Compress, merge, split, rotate, and clean up files locally so the main workbench stays private and fast.
                </p>
              </div>

              <div className="theme-privacy-inner grid min-w-[12rem] gap-2 rounded-2xl border p-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                    Uploads
                  </p>
                  <p className="mt-1 font-medium theme-privacy-title">No server transfer</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                    Workflow
                  </p>
                  <p className="mt-1 font-medium theme-privacy-title">Drag, process, download</p>
                </div>
              </div>
            </div>
          </div>

          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <PdfComingSoonTool
              label={activeOption.label}
              description={activeOption.longDescription}
            />
          )}
        </section>

        <PdfPagesRail
          title="Tool Pages"
          badgeLabel={`${pdfToolPages.length} pages`}
          sectionLabel="Dedicated Links"
          description="Every listed PDF workflow has a dedicated page so users can land directly on the exact tool they need."
          pages={pdfToolPages}
          activeSlug={activeToolPage?.slug ?? null}
          readyIds={readyIds}
        />
      </div>
    </main>
  );
}

interface PdfRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  options: typeof pdfTools;
  activeId: string | null;
  readyIds: Set<string>;
  accentClasses: {
    eyebrow: string;
    badge: string;
    hover: string;
  };
  footerText: string;
  onSelect: (id: string) => void;
  compactOnMobile?: boolean;
}

function PdfRail({
  title,
  badgeLabel,
  sectionLabel,
  description,
  options,
  activeId,
  readyIds,
  accentClasses,
  footerText,
  onSelect,
  compactOnMobile = false,
}: PdfRailProps) {
  return (
    <aside className="theme-panel w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className={`${compactOnMobile ? 'border-0 pb-3 sm:border-b sm:border-slate-200/80 sm:pb-5' : 'border-b border-slate-200/80 pb-5'}`}>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.32em] ${accentClasses.eyebrow}`}>
          PDF Studio
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight theme-title sm:mt-3 sm:text-3xl">{title}</h2>
        <p className={`mt-2 text-sm leading-6 theme-muted ${compactOnMobile ? 'hidden sm:block' : ''}`}>{description}</p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] theme-muted-2">
            {sectionLabel}
          </h3>
          <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${accentClasses.badge}`}>
            {badgeLabel}
          </span>
        </div>

        <div className="theme-rail min-h-0 overflow-hidden rounded-[1.6rem] border p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <nav className={`${compactOnMobile ? 'flex gap-2 overflow-x-auto pb-1 sm:block sm:max-h-[29rem] sm:space-y-2 sm:overflow-y-auto sm:pr-1 xl:h-full xl:max-h-none' : 'max-h-[29rem] space-y-2 overflow-y-auto pr-1 xl:h-full xl:max-h-none'}`}>
            {options.map((option) => {
              const isActive = option.id === activeId;
              const isImplemented = readyIds.has(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(option.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${compactOnMobile ? 'min-w-[16rem] sm:w-full' : 'w-full'} ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]'
                      : `border-slate-200 bg-white text-slate-700 ${accentClasses.hover}`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold leading-5">{option.label}</p>
                      <p
                        className={`mt-1 text-xs leading-5 ${
                          isActive ? 'text-slate-200' : 'text-slate-500'
                        } ${compactOnMobile ? 'sm:block hidden' : ''}`}
                      >
                        {option.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        isImplemented
                          ? isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-emerald-100 text-emerald-700'
                          : isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {isImplemented ? 'Ready' : 'Soon'}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <p className={`mt-3 text-xs leading-5 theme-muted-2 ${compactOnMobile ? 'hidden sm:block' : ''}`}>{footerText}</p>
        <Link
          href="/pdf-tools"
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-title)] transition hover:opacity-80 ${compactOnMobile ? 'sm:inline-flex hidden' : ''}`}
        >
          Browse all PDF pages
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </aside>
  );
}

interface PdfPagesRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  pages: typeof pdfToolPages;
  activeSlug: string | null;
  readyIds: Set<string>;
}

function PdfPagesRail({
  title,
  badgeLabel,
  sectionLabel,
  description,
  pages,
  activeSlug,
  readyIds,
}: PdfPagesRailProps) {
  return (
    <aside className="theme-panel hidden w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className="border-b border-slate-200/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-600">
          PDF Studio
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">{title}</h2>
        <p className="mt-3 text-sm leading-6 theme-muted">{description}</p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] theme-muted-2">
            {sectionLabel}
          </h3>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-semibold text-cyan-700">
            {badgeLabel}
          </span>
        </div>

        <div className="theme-rail min-h-0 overflow-hidden rounded-[1.6rem] border p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <nav className="max-h-[29rem] space-y-2 overflow-y-auto pr-1 xl:h-full xl:max-h-none">
            {pages.map((page) => {
              const isActive = page.slug === activeSlug;
              const isImplemented = readyIds.has(page.id);

              return (
                <Link
                  key={page.slug}
                  href={getPdfToolPath(page)}
                  className={`block rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold leading-5">{page.label}</p>
                      <p
                        className={`mt-1 text-xs leading-5 ${
                          isActive ? 'text-slate-200' : 'text-slate-500'
                        }`}
                      >
                        {page.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        isImplemented
                          ? isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-emerald-100 text-emerald-700'
                          : isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {isImplemented ? 'Live' : 'Soon'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <p className="mt-3 text-xs leading-5 theme-muted-2">
          These dedicated pages make it easy to open specific PDF workflows directly from the studio.
        </p>
        <Link
          href="/support"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-title)] transition hover:opacity-80"
        >
          Support and help center
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </aside>
  );
}
