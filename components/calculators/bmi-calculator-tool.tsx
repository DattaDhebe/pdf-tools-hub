'use client';

import { useMemo, useState } from 'react';
import {
  calculateBmiImperial,
  calculateBmiMetric,
  formatNumber,
} from '@/lib/calculators';
import {
  CalculatorEmptyState,
  CalculatorField,
  CalculatorNote,
  CalculatorNumberInput,
  CalculatorSection,
  CalculatorStat,
} from '@/components/calculators/calculator-ui';

type UnitSystem = 'metric' | 'imperial';

export function BmiCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [weightKg, setWeightKg] = useState('68');
  const [heightCm, setHeightCm] = useState('170');
  const [weightLb, setWeightLb] = useState('150');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('7');

  const result = useMemo(() => {
    if (unitSystem === 'metric') {
      return calculateBmiMetric(Number(weightKg), Number(heightCm));
    }

    const totalInches = Number(heightFt) * 12 + Number(heightIn);
    return calculateBmiImperial(Number(weightLb), totalInches);
  }, [heightCm, heightFt, heightIn, unitSystem, weightKg, weightLb]);

  return (
    <div className="grid gap-6">
      <CalculatorSection
        title="Check body mass index"
        description="Switch between metric and imperial units. BMI updates instantly with the healthy-weight band for your height."
      >
        <div className="mb-5 inline-flex rounded-full border border-[var(--app-card-border)] bg-[var(--app-card)] p-1">
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              unitSystem === 'metric'
                ? 'bg-slate-950 text-white'
                : 'theme-muted hover:bg-emerald-50'
            }`}
          >
            Metric
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              unitSystem === 'imperial'
                ? 'bg-slate-950 text-white'
                : 'theme-muted hover:bg-emerald-50'
            }`}
          >
            Imperial
          </button>
        </div>

        {unitSystem === 'metric' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <CalculatorField label="Weight (kg)">
              <CalculatorNumberInput
                type="number"
                min="0"
                step="0.1"
                value={weightKg}
                onChange={(event) => setWeightKg(event.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="Height (cm)">
              <CalculatorNumberInput
                type="number"
                min="0"
                step="0.1"
                value={heightCm}
                onChange={(event) => setHeightCm(event.target.value)}
              />
            </CalculatorField>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <CalculatorField label="Weight (lb)">
              <CalculatorNumberInput
                type="number"
                min="0"
                step="0.1"
                value={weightLb}
                onChange={(event) => setWeightLb(event.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="Height (ft)">
              <CalculatorNumberInput
                type="number"
                min="0"
                step="1"
                value={heightFt}
                onChange={(event) => setHeightFt(event.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="Height (in)">
              <CalculatorNumberInput
                type="number"
                min="0"
                step="1"
                value={heightIn}
                onChange={(event) => setHeightIn(event.target.value)}
              />
            </CalculatorField>
          </div>
        )}
      </CalculatorSection>

      <CalculatorSection
        title="BMI result"
        description="BMI is a screening metric and should not replace medical advice."
      >
        {result ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CalculatorStat label="BMI" value={formatNumber(result.bmi)} tone="highlight" />
            <CalculatorStat label="Category" value={result.category} />
            <CalculatorStat label="Healthy weight from" value={`${formatNumber(result.healthyWeightMinKg)} kg`} />
            <CalculatorStat label="Healthy weight to" value={`${formatNumber(result.healthyWeightMaxKg)} kg`} />
          </div>
        ) : (
          <CalculatorEmptyState
            title="Enter valid weight and height"
            description="BMI appears as soon as both values are greater than zero."
          />
        )}
        <div className="mt-5">
          <CalculatorNote>
            Standard BMI bands: under 18.5 is underweight, 18.5 to 24.9 is healthy, 25 to 29.9 is overweight, and 30 or more is obesity.
          </CalculatorNote>
        </div>
      </CalculatorSection>
    </div>
  );
}
