'use client';

import { type ComponentType, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AgeCalculatorTool } from '@/components/calculators/age-calculator-tool';
import { BmiCalculatorTool } from '@/components/calculators/bmi-calculator-tool';
import { EmiCalculatorTool } from '@/components/calculators/emi-calculator-tool';
import { GstCalculatorTool } from '@/components/calculators/gst-calculator-tool';
import { PercentageCalculatorTool } from '@/components/calculators/percentage-calculator-tool';
import { SipCalculatorTool } from '@/components/calculators/sip-calculator-tool';
import { LoanCalculatorTool } from '@/components/calculators/loan-calculator-tool';
import { SalaryCalculatorTool } from '@/components/calculators/salary-calculator-tool';
import { DateDifferenceCalculatorTool } from '@/components/calculators/date-difference-calculator-tool';
import { PregnancyCalculatorTool } from '@/components/calculators/pregnancy-calculator-tool';
import { CaloriesCalculatorTool } from '@/components/calculators/calories-calculator-tool';
import { calculatorToolPages } from '@/lib/calculator-tool-pages';
import { calculatorTools } from '@/lib/calculator-tools';

interface CalculatorToolsWorkbenchProps {
  initialTool?: string;
}

export function CalculatorToolsWorkbench({
  initialTool = 'age',
}: CalculatorToolsWorkbenchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTool, setActiveTool] = useState(initialTool);

  useEffect(() => {
    setActiveTool(initialTool);
  }, [initialTool]);

  const activeOption = useMemo(
    () => calculatorTools.find((tool) => tool.id === activeTool) ?? calculatorTools[0],
    [activeTool],
  );

  const activeToolPage = calculatorToolPages.find((tool) => tool.id === activeTool) ?? null;
  const isDedicatedToolPage = activeToolPage
    ? pathname === activeToolPage.path
    : false;

  const readyIds = new Set(
    calculatorTools.filter((tool) => tool.status === 'ready').map((tool) => tool.id),
  );

  const toolComponents: Record<string, ComponentType> = {
    age: AgeCalculatorTool,
    bmi: BmiCalculatorTool,
    percentage: PercentageCalculatorTool,
    emi: EmiCalculatorTool,
    sip: SipCalculatorTool,
    gst: GstCalculatorTool,
    loan: LoanCalculatorTool,
    salary: SalaryCalculatorTool,
    'date-diff': DateDifferenceCalculatorTool,
    pregnancy: PregnancyCalculatorTool,
    calories: CaloriesCalculatorTool,
  };

  const ActiveComponent = toolComponents[activeTool];

  const handleToolSelect = (toolId: string) => {
    const targetPage = calculatorToolPages.find((tool) => tool.id === toolId);

    if (isDedicatedToolPage && targetPage) {
      router.push(targetPage.path);
      return;
    }

    setActiveTool(toolId);
  };

  return (
    <main className="theme-page-calculator min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-4 py-6 xl:grid xl:grid-cols-[18rem_minmax(0,1fr)_18rem] xl:items-start xl:px-6">
        <CalculatorRail
          title="Popular Calculators"
          badgeLabel={`${readyIds.size}/${calculatorTools.length} live`}
          sectionLabel="Tool List"
          description="These calculators cover high-demand health, percentage, tax, and Indian personal finance searches."
          options={calculatorTools}
          activeId={activeTool}
          readyIds={readyIds}
          accentClasses={{
            eyebrow: 'text-emerald-600',
            badge: 'bg-emerald-100 text-emerald-700',
            hover: 'hover:border-emerald-300 hover:bg-emerald-50',
          }}
          footerText="Choose a calculator from the rail, or open its dedicated landing page from the right."
          onSelect={handleToolSelect}
          compactOnMobile
        />

        <section className="theme-panel min-w-0 rounded-[2rem] border p-6 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                {activeOption.status === 'ready' ? 'Active Calculator' : 'Planned Calculator'}
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
                  <p className="mt-1 font-medium theme-title">Instant in browser</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">
                    Status
                  </p>
                  <p className="mt-1 font-medium theme-title">
                    {activeOption.status === 'ready' ? 'Available now' : 'Planned'}
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
                  Your inputs stay on your device.
                </h3>
                <p className="mt-3 text-sm leading-7 theme-privacy-text sm:text-base">
                  Calculator Studio runs fully in the browser so your health, finance, and billing inputs are processed locally without account requirements or server-side storage.
                </p>
              </div>

              <div className="theme-privacy-inner grid min-w-[12rem] gap-2 rounded-2xl border p-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                    Speed
                  </p>
                  <p className="mt-1 font-medium theme-privacy-title">Instant recalculation</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-privacy-muted">
                    Storage
                  </p>
                  <p className="mt-1 font-medium theme-privacy-title">No server retention</p>
                </div>
              </div>
            </div>
          </div>

          {ActiveComponent ? <ActiveComponent /> : null}
        </section>

        <CalculatorPagesRail
          title="Tool Pages"
          badgeLabel={`${calculatorToolPages.length} pages`}
          sectionLabel="Dedicated Links"
          description="Each calculator also has its own page so users can land straight on the exact tool they searched for."
          pages={calculatorToolPages}
          activeSlug={activeToolPage?.slug ?? null}
          readyIds={readyIds}
        />
      </div>
    </main>
  );
}

interface CalculatorRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  options: typeof calculatorTools;
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

function CalculatorRail({
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
}: CalculatorRailProps) {
  return (
    <aside className="theme-panel w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className={`${compactOnMobile ? 'border-0 pb-3 sm:border-b sm:border-slate-200/80 sm:pb-5' : 'border-b border-slate-200/80 pb-5'}`}>
        <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.32em] ${accentClasses.eyebrow}`}>
          Calculator Studio
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight theme-title sm:mt-3 sm:text-3xl">
          {title}
        </h2>
        <p className={`mt-2 text-sm leading-6 theme-muted ${compactOnMobile ? 'hidden sm:block' : ''}`}>
          {description}
        </p>
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
                        } ${compactOnMobile ? 'hidden sm:block' : ''}`}
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
                      {isImplemented ? 'Live' : 'Soon'}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <p className={`mt-3 text-xs leading-5 theme-muted-2 ${compactOnMobile ? 'hidden sm:block' : ''}`}>
          {footerText}
        </p>
        <Link
          href="/calculator-tools"
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-title)] transition hover:opacity-80 ${compactOnMobile ? 'hidden sm:inline-flex' : ''}`}
        >
          Browse all calculator pages
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </aside>
  );
}

interface CalculatorPagesRailProps {
  title: string;
  badgeLabel: string;
  sectionLabel: string;
  description: string;
  pages: typeof calculatorToolPages;
  activeSlug: string | null;
  readyIds: Set<string>;
}

function CalculatorPagesRail({
  title,
  badgeLabel,
  sectionLabel,
  description,
  pages,
  activeSlug,
  readyIds,
}: CalculatorPagesRailProps) {
  return (
    <aside className="theme-panel hidden w-full overflow-hidden rounded-[2rem] border p-5 backdrop-blur xl:sticky xl:top-6 xl:flex xl:h-[calc(100vh-3rem)] xl:w-full xl:flex-col">
      <div className="border-b border-slate-200/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-600">
          Calculator Studio
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">{title}</h2>
        <p className="mt-3 text-sm leading-6 theme-muted">{description}</p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] theme-muted-2">
            {sectionLabel}
          </h3>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">
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
                  href={page.path}
                  className={`block rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold leading-5">{page.label}</p>
                      <p className={`mt-1 text-xs leading-5 ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
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
          Dedicated calculator pages help users open the exact tool they searched for in one click.
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
