'use client';

import { useMemo, useState } from 'react';
import { calculateSip, formatCurrency, formatNumber } from '@/lib/calculators';
import {
  CalculatorEmptyState,
  CalculatorField,
  CalculatorNumberInput,
  CalculatorSection,
  CalculatorStat,
} from '@/components/calculators/calculator-ui';

export function SipCalculatorTool() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [years, setYears] = useState('10');

  const tenureMonths = useMemo(() => Number(years) * 12, [years]);
  const result = useMemo(
    () => calculateSip(Number(monthlyInvestment), Number(annualReturn), tenureMonths),
    [annualReturn, monthlyInvestment, tenureMonths],
  );

  return (
    <div className="grid gap-6">
      <CalculatorSection
        title="Estimate SIP growth"
        description="This SIP calculator uses monthly contributions and a fixed annual return assumption for rough projections."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <CalculatorField label="Monthly investment">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="100"
              value={monthlyInvestment}
              onChange={(event) => setMonthlyInvestment(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="Expected annual return (%)">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="0.01"
              value={annualReturn}
              onChange={(event) => setAnnualReturn(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="Investment period (years)">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="1"
              value={years}
              onChange={(event) => setYears(event.target.value)}
            />
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection
        title="Projection"
        description="Returns are estimates, not guaranteed market outcomes."
      >
        {result ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CalculatorStat label="Maturity value" value={formatCurrency(result.maturityValue)} tone="highlight" />
            <CalculatorStat label="Total invested" value={formatCurrency(result.totalInvested)} />
            <CalculatorStat label="Estimated returns" value={formatCurrency(result.estimatedReturns)} />
            <CalculatorStat label="Total months" value={formatNumber(tenureMonths, 0)} />
          </div>
        ) : (
          <CalculatorEmptyState
            title="Enter a valid SIP plan"
            description="The projection appears when monthly amount, expected return, and tenure are valid."
          />
        )}
      </CalculatorSection>
    </div>
  );
}
