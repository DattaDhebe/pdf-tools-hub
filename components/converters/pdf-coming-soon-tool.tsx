'use client';

interface PdfComingSoonToolProps {
  label: string;
  description: string;
}

export function PdfComingSoonTool({ label, description }: PdfComingSoonToolProps) {
  return (
    <div className="theme-card-soft rounded-[1.75rem] border border-dashed p-6 text-center sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-600">
        Coming Soon
      </p>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight theme-title">{label}</h3>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 theme-muted sm:text-base">
        {description}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 theme-muted-2">
        This workflow is one of the most common tasks we saw repeated across major online PDF suites, so it has been placed near the top of PDF Studio.
      </p>
    </div>
  );
}
