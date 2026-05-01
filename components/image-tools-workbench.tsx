'use client';

import { type ComponentType, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ImageDropZone } from './converters/image-drop-zone';
import { ImageCompressorTool } from './converters/image-compressor-tool';
import { ImageToolShell } from './converters/image-tool-shell';
import { imageTools } from '@/lib/image-tools';
import { getImageToolPath, imageToolPages } from '@/lib/image-tools-pages';

interface ImageToolsWorkbenchProps {
  initialTool?: string;
}

export function ImageToolsWorkbench({ initialTool = 'image-compressor' }: ImageToolsWorkbenchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTool, setActiveTool] = useState<string>(initialTool);

  useEffect(() => {
    setActiveTool(initialTool);
  }, [initialTool]);

  const activeOption = useMemo(
    () => imageTools.find((tool) => tool.id === activeTool) ?? imageTools[0],
    [activeTool],
  );

  const activeToolPage = imageToolPages.find((tool) => tool.id === activeTool) ?? null;
  const isDedicatedToolPage = activeToolPage
    ? pathname === getImageToolPath(activeToolPage)
    : false;

  const readyIds = new Set(
    imageTools.filter((tool) => tool.status === 'ready').map((tool) => tool.id),
  );

  const toolComponents: Record<string, ComponentType> = {
    'image-compressor': ImageCompressorTool,
    'image-resizer': () => (
      <ImageToolShell
        title="Drop images to resize"
        helperText="Change dimensions and scale images locally."
      />
    ),
    'background-remover': () => (
      <ImageToolShell
        title="Drop images to remove background"
        helperText="AI-powered background removal right in your browser."
      />
    ),
    'jpg-to-png': () => (
      <ImageToolShell
        title="Drop JPG images to convert to PNG"
        helperText="Convert to lossless PNG format with transparency support."
      />
    ),
    'png-to-jpg': () => (
      <ImageToolShell
        title="Drop PNG images to convert to JPG"
        helperText="Convert to lightweight JPG format for better sharing."
      />
    ),
    'webp-converter': () => (
      <ImageToolShell
        title="Drop images to convert to/from WebP"
        helperText="Optimize your images for the modern web."
      />
    ),
    'image-cropper': () => (
      <ImageToolShell
        title="Drop images to crop"
        helperText="Trim and focus your images with custom aspect ratios."
      />
    ),
  };

  const ActiveComponent = toolComponents[activeTool];

  const handleToolSelect = (toolId: string) => {
    const targetPage = imageToolPages.find((tool) => tool.id === toolId);

    if (isDedicatedToolPage && targetPage) {
      router.push(getImageToolPath(targetPage));
      return;
    }

    setActiveTool(toolId);
  };

  return (
    <main className="theme-page-home min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-4 py-6 xl:grid xl:grid-cols-[18rem_minmax(0,1fr)_18rem] xl:items-start xl:px-6">
        <ImageRail
          title="Image Tools"
          badgeLabel={`${readyIds.size}/${imageTools.length} ready`}
          sectionLabel="Tool List"
          description="Compress, resize, remove backgrounds, and convert image formats with these powerful browser-based tools."
          options={imageTools}
          activeId={activeTool}
          readyIds={readyIds}
          accentClasses={{
            eyebrow: 'text-rose-600',
            badge: 'bg-rose-100 text-rose-700',
            hover: 'hover:border-rose-300 hover:bg-rose-50',
          }}
          footerText="Select an image tool to work in the center panel, or open its dedicated page from the right rail."
          onSelect={(id) => handleToolSelect(id)}
          compactOnMobile
        />

        <section className="theme-panel min-w-0 rounded-[2rem] border p-6 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">
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
                    {activeOption.status === 'ready' ? 'Available now' : 'Coming soon'}
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
                  Your images never leave your device.
                </h3>
                <p className="mt-3 text-sm leading-7 theme-privacy-text sm:text-base">
                  Image Studio processing happens entirely in your browser. Compress, resize, and convert your photos locally without any server-side uploads or data storage.
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
                  <p className="mt-1 font-medium theme-privacy-title">Local processing</p>
                </div>
              </div>
            </div>
          </div>

          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="flex h-96 items-center justify-center rounded-3xl border-2 border-dashed border-slate-200">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <span className="text-2xl font-bold">IM</span>
                </div>
                <h3 className="text-xl font-bold theme-title">{activeOption.label}</h3>
                <p className="mt-2 text-sm theme-muted">This tool is currently under development.</p>
              </div>
            </div>
          )}
        </section>

        <ImagePagesRail
          title="Tool Pages"
          badgeLabel={`${imageToolPages.length} pages`}
          sectionLabel="Dedicated Links"
          description="Each image tool has a dedicated page for direct access and better SEO."
          pages={imageToolPages}
          activeSlug={activeToolPage?.slug ?? null}
          readyIds={readyIds}
        />
      </div>
    </main>
  );
}

interface ImageRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  options: typeof imageTools;
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

function ImageRail({
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
}: ImageRailProps) {
  return (
    <aside className="theme-panel w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className={`${compactOnMobile ? 'border-0 pb-3 sm:border-b sm:border-slate-200/80 sm:pb-5' : 'border-b border-slate-200/80 pb-5'}`}>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.32em] ${accentClasses.eyebrow}`}>
          Image Studio
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
          href="/image-studio"
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-title)] transition hover:opacity-80 ${compactOnMobile ? 'sm:inline-flex hidden' : ''}`}
        >
          Browse all image tools
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </aside>
  );
}

interface ImagePagesRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  pages: typeof imageToolPages;
  activeSlug: string | null;
  readyIds: Set<string>;
}

function ImagePagesRail({
  title,
  badgeLabel,
  sectionLabel,
  description,
  pages,
  activeSlug,
  readyIds,
}: ImagePagesRailProps) {
  return (
    <aside className="theme-panel hidden w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className="border-b border-slate-200/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-rose-600">
          Image Studio
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">{title}</h2>
        <p className="mt-3 text-sm leading-6 theme-muted">{description}</p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] theme-muted-2">
            {sectionLabel}
          </h3>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-semibold text-rose-700">
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
                  href={getImageToolPath(page)}
                  className={`block rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50'
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
          These dedicated pages make it easy to open specific image workflows directly from the studio.
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
