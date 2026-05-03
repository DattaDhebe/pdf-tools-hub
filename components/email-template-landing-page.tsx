import Link from 'next/link';
import Script from 'next/script';
import { EmailStudioClient } from '@/components/email-studio-client';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import {
  emailTemplateEditorBenefits,
  emailTemplateEditorFaqs,
  emailTemplateEditorHighlightKeywords,
  emailTemplateEditorKeywordGroups,
  emailTemplateEditorMetaDescription,
  emailTemplateEditorPath,
  emailTemplateEditorSections,
  emailTemplateEditorSeoTitle,
  emailTemplateTypes,
} from '@/lib/email-template-page';
import { SITE_NAME, siteRoute } from '@/lib/site';

export function EmailTemplateLandingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${emailTemplateEditorSeoTitle} | ${SITE_NAME}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: siteRoute(emailTemplateEditorPath),
        description: emailTemplateEditorMetaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: emailTemplateEditorFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Email Template Editor', item: emailTemplateEditorPath },
        ]}
      />
      <Script
        id="email-template-editor-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="theme-page-email min-h-screen px-4 py-6 text-[var(--app-text)] transition-colors duration-200 xl:px-6">
        <div className="mx-auto max-w-[1600px] space-y-8">
          <section className="grid gap-6 rounded-[2rem] border p-6 theme-panel sm:p-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                Free Email Template Builder
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight theme-title sm:text-5xl">
                Email Template Editor
              </h1>
              <p className="mt-4 max-w-4xl text-sm leading-7 theme-muted sm:text-base">
                {emailTemplateEditorMetaDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {emailTemplateEditorHighlightKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 sm:text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#email-editor"
                  className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Jump to live editor
                </a>
                <Link
                  href="/support"
                  className="inline-flex items-center rounded-full border border-[var(--app-card-border)] px-4 py-2 text-sm font-semibold theme-title transition hover:bg-sky-50"
                >
                  View support
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border p-5 theme-card-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
                  App-Style Workflow
                </p>
                <p className="mt-3 text-lg font-semibold theme-title">
                  One sidebar, cleaner canvas, stronger preview flow
                </p>
                <p className="mt-3 text-sm leading-7 theme-muted">
                  The editor now feels closer to a professional email product instead of a basic utility page, while still using an original in-house implementation.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-[1.5rem] border p-5 theme-card-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                    Built For
                  </p>
                  <p className="mt-3 text-sm leading-7 theme-muted">
                    Newsletters, welcome emails, product launches, internal comms, and marketing campaigns.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border p-5 theme-card-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
                    Core Value
                  </p>
                  <p className="mt-3 text-sm leading-7 theme-muted">
                    Drag-and-drop layout editing, inbox preview, mobile preview, and clean HTML export in one workflow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border-2 border-sky-200/80 p-4 theme-panel sm:p-5">
            <div className="mb-4 flex flex-col gap-4 rounded-[1.5rem] bg-slate-950 px-5 py-5 text-white xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                  Editor Starts Here
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Live email template workspace
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                  This is the main builder area. Choose a template, drag blocks into the canvas, preview the email, and export the final HTML from the workspace below.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Templates
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Drag & Drop
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Preview
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  HTML Export
                </span>
              </div>
            </div>

            <EmailStudioClient />
          </section>

          <section className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)]">
            <div className="grid gap-6">
              {emailTemplateEditorSections.map((section) => (
                <article key={section.title} className="rounded-[2rem] border p-6 theme-panel sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight theme-title">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 theme-muted sm:text-base">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>

            <aside className="grid gap-6">
              {emailTemplateEditorKeywordGroups.map((group) => (
                <section key={group.title} className="rounded-[2rem] border p-6 theme-panel">
                  <h2 className="text-lg font-semibold theme-title">{group.title}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-900 sm:text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </aside>
          </section>

          <section className="rounded-[2rem] border p-6 theme-panel sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600">
              Why Use It
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
              Why use our email template editor?
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {emailTemplateEditorBenefits.map((benefit) => (
                <div key={benefit} className="rounded-[1.5rem] border p-5 theme-card-soft">
                  <p className="text-sm leading-7 theme-muted sm:text-base">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border p-6 theme-panel sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Popular Templates
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
              Popular email template types
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {emailTemplateTypes.map((template) => (
                <article key={template.title} className="rounded-[1.5rem] border p-5 theme-card-soft">
                  <h3 className="text-lg font-semibold theme-title">{template.title}</h3>
                  <p className="mt-3 text-sm leading-7 theme-muted">{template.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border p-6 theme-panel sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight theme-title">
              Frequently asked questions
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {emailTemplateEditorFaqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] border p-5 theme-card-soft">
                  <h3 className="text-lg font-semibold theme-title">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 theme-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
