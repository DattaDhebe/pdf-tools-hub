import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

interface CalculatorSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function CalculatorSection({
  title,
  description,
  children,
}: CalculatorSectionProps) {
  return (
    <section className="theme-card-soft rounded-[1.75rem] border p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold theme-title sm:text-xl">{title}</h3>
        {description ? (
          <p className="mt-2 text-sm leading-6 theme-muted sm:text-base">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

interface CalculatorFieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function CalculatorField({ label, hint, children }: CalculatorFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold theme-title">{label}</span>
      {hint ? <span className="mt-1 block text-xs leading-5 theme-muted-2">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function CalculatorNumberInput(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] px-4 py-3 text-sm theme-title outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 ${props.className ?? ''}`.trim()}
    />
  );
}

export function CalculatorDateInput(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] px-4 py-3 text-sm theme-title outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 ${props.className ?? ''}`.trim()}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function CalculatorSelect(props: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card)] px-4 py-3 text-sm theme-title outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 ${props.className ?? ''}`.trim()}
    />
  );
}

interface CalculatorStatProps {
  label: string;
  value: string;
  tone?: 'default' | 'highlight';
}

export function CalculatorStat({ label, value, tone = 'default' }: CalculatorStatProps) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 ${
        tone === 'highlight'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
          : 'border-[var(--app-card-border)] bg-[var(--app-card)]'
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.24em] ${
          tone === 'highlight' ? 'text-emerald-700' : 'theme-muted-2'
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-2 text-xl font-semibold ${
          tone === 'highlight' ? 'text-emerald-900' : 'theme-title'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

interface CalculatorEmptyStateProps {
  title: string;
  description: string;
}

export function CalculatorEmptyState({
  title,
  description,
}: CalculatorEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--app-card-border)] px-5 py-8 text-center">
      <p className="text-sm font-semibold theme-title">{title}</p>
      <p className="mt-2 text-sm leading-6 theme-muted">{description}</p>
    </div>
  );
}

interface CalculatorNoteProps {
  children: ReactNode;
}

export function CalculatorNote({ children }: CalculatorNoteProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
      {children}
    </div>
  );
}
