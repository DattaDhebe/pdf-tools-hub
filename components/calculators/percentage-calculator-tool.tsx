'use client';

import { useMemo, useState } from 'react';
import {
  calculatePercentageChange,
  calculatePercentageOf,
  calculateWhatPercent,
  formatNumber,
  formatPercent,
} from '@/lib/calculators';
import {
  CalculatorEmptyState,
  CalculatorField,
  CalculatorNumberInput,
  CalculatorSection,
  CalculatorSelect,
  CalculatorStat,
} from '@/components/calculators/calculator-ui';

type PercentageMode = 'percent-of' | 'what-percent' | 'change';

export function PercentageCalculatorTool() {
  const [mode, setMode] = useState<PercentageMode>('percent-of');
  const [firstValue, setFirstValue] = useState('18');
  const [secondValue, setSecondValue] = useState('2400');

  const result = useMemo(() => {
    const first = Number(firstValue);
    const second = Number(secondValue);

    if (mode === 'percent-of') {
      const value = calculatePercentageOf(first, second);
      return value === null
        ? null
        : {
            label: `${formatNumber(first)}% of ${formatNumber(second)}`,
            value: formatNumber(value),
            helper: `${formatNumber(first)} / 100 x ${formatNumber(second)}`,
          };
    }

    if (mode === 'what-percent') {
      const value = calculateWhatPercent(first, second);
      return value === null
        ? null
        : {
            label: `${formatNumber(first)} is what percent of ${formatNumber(second)}?`,
            value: formatPercent(value),
            helper: `(${formatNumber(first)} / ${formatNumber(second)}) x 100`,
          };
    }

    const value = calculatePercentageChange(first, second);
    return value === null
      ? null
      : {
          label: `Percentage change from ${formatNumber(first)} to ${formatNumber(second)}`,
          value: formatPercent(value),
          helper: `(${formatNumber(second)} - ${formatNumber(first)}) / ${formatNumber(first)} x 100`,
        };
  }, [firstValue, mode, secondValue]);

  return (
    <div className="grid gap-6">
      <CalculatorSection
        title="Solve percentage problems"
        description="Switch between common percentage calculations without leaving the page."
      >
        <div className="grid gap-4 md:grid-cols-[16rem_minmax(0,1fr)_minmax(0,1fr)]">
          <CalculatorField label="Calculation type">
            <CalculatorSelect value={mode} onChange={(event) => setMode(event.target.value as PercentageMode)}>
              <option value="percent-of">What is X% of Y?</option>
              <option value="what-percent">X is what % of Y?</option>
              <option value="change">Percentage change</option>
            </CalculatorSelect>
          </CalculatorField>
          <CalculatorField
            label={
              mode === 'percent-of'
                ? 'Percentage'
                : mode === 'what-percent'
                  ? 'Part value'
                  : 'Starting value'
            }
          >
            <CalculatorNumberInput
              type="number"
              step="0.01"
              value={firstValue}
              onChange={(event) => setFirstValue(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField
            label={
              mode === 'percent-of'
                ? 'Base value'
                : mode === 'what-percent'
                  ? 'Whole value'
                  : 'Ending value'
            }
          >
            <CalculatorNumberInput
              type="number"
              step="0.01"
              value={secondValue}
              onChange={(event) => setSecondValue(event.target.value)}
            />
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection
        title="Answer"
        description="Results update in real time for shopping, study, and business math."
      >
        {result ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Result
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-950">{result.label}</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-950">{result.value}</p>
              <p className="mt-3 text-sm text-emerald-900">Formula: {result.helper}</p>
            </div>
            <CalculatorStat label="Quick answer" value={result.value} />
          </div>
        ) : (
          <CalculatorEmptyState
            title="Enter valid values"
            description="A result appears as soon as the calculator has enough valid numbers."
          />
        )}
      </CalculatorSection>
    </div>
  );
}
