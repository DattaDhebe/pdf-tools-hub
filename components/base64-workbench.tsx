'use client';

import { useMemo, useState } from 'react';
import { Base64ToAudioDecoder } from '@/components/converters/base64-to-audio-decoder';
import { Base64ToCssDecoder } from '@/components/converters/base64-to-css-decoder';
import { Base64ToFileDecoder } from '@/components/converters/base64-to-file-decoder';
import { Base64ToHexDecoder } from '@/components/converters/base64-to-hex-decoder';
import { Base64ToHtmlDecoder } from '@/components/converters/base64-to-html-decoder';
import { Base64ToImageDecoder } from '@/components/converters/base64-to-image-decoder';
import { Base64ToPdfDecoder } from '@/components/converters/base64-to-pdf-decoder';
import { Base64ToTextDecoder } from '@/components/converters/base64-to-text-decoder';
import { Base64ToUrlDecoder } from '@/components/converters/base64-to-url-decoder';
import { AudioToBase64Converter } from '@/components/converters/audio-to-base64-converter';
import { ComingSoonConverter } from '@/components/converters/coming-soon-converter';
import { CssToBase64Converter } from '@/components/converters/css-to-base64-converter';
import { FileToBase64Converter } from '@/components/converters/file-to-base64-converter';
import { HexToBase64Converter } from '@/components/converters/hex-to-base64-converter';
import { HtmlToBase64Converter } from '@/components/converters/html-to-base64-converter';
import { ImageToBase64Converter } from '@/components/converters/image-to-base64-converter';
import { PdfToBase64Converter } from '@/components/converters/pdf-to-base64-converter';
import { TextToBase64Converter } from '@/components/converters/text-to-base64-converter';
import { UrlToBase64Converter } from '@/components/converters/url-to-base64-converter';
import { converterOptions } from '@/lib/converters';
import { decoderOptions } from '@/lib/decoders';
import Link from 'next/link';

const implementedConverters = {
  audio: AudioToBase64Converter,
  css: CssToBase64Converter,
  file: FileToBase64Converter,
  hex: HexToBase64Converter,
  html: HtmlToBase64Converter,
  image: ImageToBase64Converter,
  pdf: PdfToBase64Converter,
  text: TextToBase64Converter,
  url: UrlToBase64Converter,
} as const;

const implementedDecoders = {
  audio: Base64ToAudioDecoder,
  css: Base64ToCssDecoder,
  file: Base64ToFileDecoder,
  hex: Base64ToHexDecoder,
  html: Base64ToHtmlDecoder,
  image: Base64ToImageDecoder,
  pdf: Base64ToPdfDecoder,
  text: Base64ToTextDecoder,
  url: Base64ToUrlDecoder,
} as const;

type ActiveTool =
  | { kind: 'converter'; id: string }
  | { kind: 'decoder'; id: string };

interface Base64WorkbenchProps {
  initialTool?: ActiveTool;
}

export function Base64Workbench({ initialTool }: Base64WorkbenchProps) {
  const [activeTool, setActiveTool] = useState<ActiveTool>(
    initialTool ?? {
      kind: 'converter',
      id: converterOptions[0]?.id ?? 'text',
    },
  );

  const activeConverter = useMemo(
    () => converterOptions.find((option) => option.id === activeTool.id) ?? converterOptions[0],
    [activeTool.id],
  );

  const activeDecoder = useMemo(
    () => decoderOptions.find((option) => option.id === activeTool.id) ?? decoderOptions[0],
    [activeTool.id],
  );

  const isDecoderView = activeTool.kind === 'decoder';

  const ActiveComponent = isDecoderView
    ? implementedDecoders[activeTool.id as keyof typeof implementedDecoders] ?? null
    : implementedConverters[activeTool.id as keyof typeof implementedConverters] ?? null;

  const activeOption = isDecoderView ? activeDecoder : activeConverter;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,_#fffaf5_0%,_#fff7ed_38%,_#fffdf8_100%)] text-[var(--app-text)] transition-colors duration-200">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-4 py-6 xl:grid xl:grid-cols-[18rem_minmax(0,1fr)_18rem] xl:items-start xl:px-6">
        <WorkbenchRail
          title="Encoder Workbench"
          badgeLabel={`${Object.keys(implementedConverters).length}/${converterOptions.length} live`}
          sectionLabel="Encoders"
          description="Pick a converter from the left rail and generate Base64 directly in the browser."
          options={converterOptions}
          activeId={isDecoderView ? null : activeTool.id}
          readyIds={new Set(Object.keys(implementedConverters))}
          accentClasses={{
            eyebrow: 'text-orange-600',
            badge: 'bg-orange-100 text-orange-700',
            hover: 'hover:border-orange-300 hover:bg-orange-50',
          }}
          footerText="The encoder rail stays compact and scrollable so you can keep at least five tools visible."
          onSelect={(id) => setActiveTool({ kind: 'converter', id })}
        />

        <section className="theme-panel min-w-0 rounded-[2rem] border p-6 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.3em] ${
                  isDecoderView ? 'text-cyan-600' : 'text-sky-600'
                }`}
              >
                {isDecoderView ? 'Active Decoder' : 'Active Converter'}
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
                    Output
                  </p>
                  <p className="mt-1 font-medium theme-title">
                    {isDecoderView ? 'Preview, copy, or recover data' : 'Copy or download instantly'}
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
                  Your data stays with you.
                </h3>
                <p className="mt-3 text-sm leading-7 theme-privacy-text sm:text-base">
                  Base64 Studio runs entirely in your browser. We do not upload, store, or retain your files, text, or decoded content on our servers, so your conversions remain private and under your control.
                </p>
              </div>

              <div className="theme-privacy-inner grid min-w-[12rem] gap-2 rounded-2xl border p-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                    Processing
                  </p>
                  <p className="mt-1 font-medium theme-privacy-title">100% client-side</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                    Storage
                  </p>
                  <p className="mt-1 font-medium theme-privacy-title">No server-side retention</p>
                </div>
              </div>
            </div>
          </div>

          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <ComingSoonConverter
              label={activeOption.label}
              nextHint="I will wire this one up in its own commit next."
            />
          )}
        </section>

        <WorkbenchRail
          title="Decoder Workbench"
          badgeLabel={`${Object.keys(implementedDecoders).length}/${decoderOptions.length} live`}
          sectionLabel="Decoders"
          description="Use the right rail to recover text, media, or binary files from Base64 payloads."
          options={decoderOptions}
          activeId={isDecoderView ? activeTool.id : null}
          readyIds={new Set(Object.keys(implementedDecoders))}
          accentClasses={{
            eyebrow: 'text-cyan-600',
            badge: 'bg-cyan-100 text-cyan-700',
            hover: 'hover:border-cyan-300 hover:bg-cyan-50',
          }}
          footerText="The decoder rail mirrors the encoder sequence and keeps at least five tools visible."
          onSelect={(id) => setActiveTool({ kind: 'decoder', id })}
        />
      </div>
    </main>
  );
}

interface WorkbenchRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  options: ReadonlyArray<{
    id: string;
    label: string;
    description: string;
  }>;
  activeId: string | null;
  readyIds: Set<string>;
  accentClasses: {
    eyebrow: string;
    badge: string;
    hover: string;
  };
  footerText: string;
  onSelect: (id: string) => void;
}

function WorkbenchRail({
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
}: WorkbenchRailProps) {
  return (
    <aside className="theme-panel w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className="border-b border-slate-200/80 pb-5">
        <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${accentClasses.eyebrow}`}>
          Base64 Studio
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">{title}</h2>
        <p className="mt-3 text-sm leading-6 theme-muted">{description}</p>
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
          <nav className="max-h-[29rem] space-y-2 overflow-y-auto pr-1 xl:h-full xl:max-h-none">
            {options.map((option) => {
              const isActive = option.id === activeId;
              const isImplemented = readyIds.has(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(option.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]'
                      : `border-slate-200 bg-white text-slate-700 ${accentClasses.hover}`
                  } ${!isImplemented ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold leading-5">{option.label}</p>
                      <p
                        className={`mt-1 text-xs leading-5 ${
                          isActive ? 'text-slate-200' : 'text-slate-500'
                        }`}
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
                          : 'bg-slate-100 text-slate-500'
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

        <p className="mt-3 text-xs leading-5 theme-muted-2">{footerText}</p>
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
