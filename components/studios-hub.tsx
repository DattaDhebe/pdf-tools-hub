import Link from 'next/link';

const studios = [
  {
    id: 'email',
    category: 'Marketing Tools',
    name: 'Email Template Editor',
    description:
      'Create professional responsive HTML emails with drag-and-drop editing, live preview, and export-ready code.',
    href: '/email-template-editor',
    accent: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-400',
    dot: 'bg-sky-500',
    features: ['Drag and drop builder', 'Responsive preview', 'HTML export'],
    cta: 'Open Email Editor',
    initials: 'EM',
  },
  {
    id: 'pdf',
    category: 'Document Tools',
    name: 'PDF Studio',
    description:
      'Powerful PDF tools for compression, merging, splitting, conversion, and document cleanup.',
    href: '/pdf-studio',
    accent: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400',
    dot: 'bg-purple-500',
    features: ['Merge and split', 'Compress and convert', 'Page extraction'],
    cta: 'Open PDF Studio',
    initials: 'PD',
  },
  {
    id: 'calculator',
    category: 'Utility Tools',
    name: 'Calculator Studio',
    description:
      'Popular everyday and finance calculators for age, BMI, EMI, SIP, GST, and percentage workflows.',
    href: '/calculator-studio',
    accent: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    features: ['Health and age', 'Finance math', 'Percentage tools'],
    cta: 'Open Calculators',
    initials: 'CA',
  },
  {
    id: 'base64',
    category: 'Developer Tools',
    name: 'Base64 Converter',
    description:
      'Encode and decode text, images, URLs, PDF, files, HTML, CSS, audio, and more using Base64.',
    href: '/base64-converter',
    accent: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400',
    dot: 'bg-orange-500',
    features: ['Text encoding', 'Image conversion', 'File utilities'],
    cta: 'Open Converter',
    initials: 'B6',
  },
  {
    id: 'image',
    category: 'Creative Tools',
    name: 'Image Studio',
    description:
      'Professional image tools for compression, resizing, background removal, and format conversion.',
    href: '/image-studio',
    accent: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400',
    dot: 'bg-rose-500',
    features: ['Compress and resize', 'Background removal', 'Format conversion'],
    cta: 'Open Img Studio',
    initials: 'IM',
  },
] as const;

export function StudiosHub() {
  const featuredStudio = studios[0];

  return (
    <main className="theme-page-home min-h-screen text-[var(--app-text)] transition-colors duration-200">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2.25rem] border p-6 theme-panel sm:p-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] xl:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-800 dark:text-sky-400">
                Studio Directory
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight theme-title sm:text-5xl">
                Access every studio from one
                <span className="block bg-gradient-to-r from-slate-950 via-sky-700 to-violet-700 bg-clip-text text-transparent dark:from-sky-300 dark:via-violet-300 dark:to-emerald-300">
                  cleaner workspace
                </span>
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 theme-muted">
                Every studio entry now follows the same visual pattern, so it is easier to scan, compare, and jump into the right tool without hunting for the main action.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={featuredStudio.href}
                  className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-sky-500 dark:text-slate-950"
                  prefetch={false}
                >
                  Open Email Editor
                </Link>
                <Link
                  href="#all-studios"
                  className="inline-flex items-center rounded-full border border-[var(--app-card-border)] px-5 py-3 text-sm font-semibold theme-title transition hover:bg-white/70"
                  prefetch={false}
                >
                  Browse all studios
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm theme-muted">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  100% private
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                  Browser-based
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500"></span>
                  No sign-up required
                </div>
              </div>
            </div>

            <div className="rounded-[1.9rem] border bg-[var(--app-card)] p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-800 dark:text-sky-400">
                    Featured Workspace
                  </p>
                  <h2 className="mt-3 text-2xl font-bold theme-title">{featuredStudio.name}</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Live
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 theme-muted">{featuredStudio.description}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {featuredStudio.features.map((feature) => (
                  <div key={feature} className="rounded-[1.1rem] border p-4 theme-card-soft">
                    <p className="text-sm font-semibold theme-title">{feature}</p>
                  </div>
                ))}
              </div>

              <Link
                href={featuredStudio.href}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Open the live editor
              </Link>
            </div>
          </div>
        </div>

        <div id="all-studios" className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] theme-muted-2">All studios</p>
            <h2 className="mt-2 text-2xl font-bold theme-title">Choose a workspace</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 theme-muted">
            Each card uses the same layout, status badge, feature list, and call-to-action so the whole home page feels more consistent and user friendly.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {studios.map((studio) => (
            <Link
              key={studio.id}
              href={studio.href}
              className="group flex h-full min-h-[25rem] flex-col rounded-[1.9rem] border p-6 theme-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              prefetch={false}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold ${studio.accent}`}
                >
                  {studio.initials}
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Live
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] theme-muted-2">
                  {studio.category}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight theme-title">{studio.name}</h3>
                <p className="mt-4 text-sm leading-7 theme-muted">{studio.description}</p>
              </div>

              <div className="mt-6 space-y-3">
                {studio.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm theme-muted">
                    <span className={`h-2.5 w-2.5 rounded-full ${studio.dot}`}></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-center justify-between rounded-[1.2rem] border px-4 py-3 transition group-hover:bg-slate-950 group-hover:text-white">
                  <span className="text-sm font-semibold">{studio.cta}</span>
                  <span className="text-lg" aria-hidden="true">
                    -&gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-16 rounded-2xl border p-12 theme-panel">
          <h3 className="mb-8 text-center text-2xl font-bold theme-title">Why Choose DHEBE Studios?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                <span className="text-lg">S</span>
              </div>
              <h4 className="mb-2 font-semibold theme-title">100% Private</h4>
              <p className="text-sm theme-muted">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400">
                <span className="text-lg">Z</span>
              </div>
              <h4 className="mb-2 font-semibold theme-title">Lightning Fast</h4>
              <p className="text-sm theme-muted">No server delays. Process files instantly on your own device.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                <span className="text-lg">*</span>
              </div>
              <h4 className="mb-2 font-semibold theme-title">Always Free</h4>
              <p className="text-sm theme-muted">
                No subscriptions, no ads, no limits. Use all tools completely free.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--app-card-border)] pt-16 text-center">
          <p className="mb-6 theme-muted">
            More studios are on the way. We will add any contact or subscription options once they are ready.
          </p>
          <p className="text-sm theme-muted-2">
            For now, every available studio remains free to use with no sign-up required.
          </p>
        </div>
      </section>
    </main>
  );
}
