'use client';

import { useMemo, useState } from 'react';
import { calculateEmi, formatCurrency, formatNumber } from '@/lib/calculators';
import {
  CalculatorEmptyState,
  CalculatorField,
  CalculatorNumberInput,
  CalculatorSection,
  CalculatorSelect,
  CalculatorStat,
} from '@/components/calculators/calculator-ui';

type TenureUnit = 'months' | 'years';

export function EmiCalculatorTool() {
  const [principal, setPrincipal] = useState('1500000');
  const [interestRate, setInterestRate] = useState('10.5');
  const [tenure, setTenure] = useState('5');
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>('years');

  const tenureMonths = useMemo(() => {
    const value = Number(tenure);
    return tenureUnit === 'years' ? value * 12 : value;
  }, [tenure, tenureUnit]);

  const result = useMemo(
    () => calculateEmi(Number(principal), Number(interestRate), tenureMonths),
    [interestRate, principal, tenureMonths],
  );

  return (
    <div className="grid gap-6">
      <CalculatorSection
        title="Estimate monthly EMI"
        description="Useful for home loans, car loans, personal loans, and education financing."
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <CalculatorField label="Loan amount">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="1000"
              value={principal}
              onChange={(event) => setPrincipal(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="Annual interest rate (%)">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="0.01"
              value={interestRate}
              onChange={(event) => setInterestRate(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="Tenure">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="1"
              value={tenure}
              onChange={(event) => setTenure(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="Tenure unit">
            <CalculatorSelect
              value={tenureUnit}
              onChange={(event) => setTenureUnit(event.target.value as TenureUnit)}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </CalculatorSelect>
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection
        title="Loan summary"
        description="EMI assumes a fixed rate for the full tenure."
      >
        {result ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CalculatorStat label="Monthly EMI" value={formatCurrency(result.emi)} tone="highlight" />
            <CalculatorStat label="Total payment" value={formatCurrency(result.totalPayment)} />
            <CalculatorStat label="Total interest" value={formatCurrency(result.totalInterest)} />
            <CalculatorStat
              label="Tenure in months"
              value={formatNumber(tenureMonths, 0)}
            />
          </div>
        ) : (
          <CalculatorEmptyState
            title="Enter valid loan details"
            description="The EMI summary appears as soon as amount, tenure, and rate are valid."
          />
        )}
      </CalculatorSection>
    </div>
  );
}
