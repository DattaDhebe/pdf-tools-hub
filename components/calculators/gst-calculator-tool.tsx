'use client';

import { useMemo, useState } from 'react';
import {
  calculateGstFromBase,
  calculateGstFromGross,
  formatCurrency,
  formatNumber,
} from '@/lib/calculators';
import {
  CalculatorEmptyState,
  CalculatorField,
  CalculatorNumberInput,
  CalculatorSection,
  CalculatorSelect,
  CalculatorStat,
} from '@/components/calculators/calculator-ui';

type GstMode = 'add' | 'remove';

export function GstCalculatorTool() {
  const [mode, setMode] = useState<GstMode>('add');
  const [amount, setAmount] = useState('1000');
  const [gstRate, setGstRate] = useState('18');
  const numericRate = Number(gstRate);

  const result = useMemo(() => {
    const numericAmount = Number(amount);

    return mode === 'add'
      ? calculateGstFromBase(numericAmount, numericRate)
      : calculateGstFromGross(numericAmount, numericRate);
  }, [amount, mode, numericRate]);

  return (
    <div className="grid gap-6">
      <CalculatorSection
        title="Add or remove GST"
        description="Use this for quotes, invoices, receipts, or quick business calculations."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <CalculatorField label="Mode">
            <CalculatorSelect value={mode} onChange={(event) => setMode(event.target.value as GstMode)}>
              <option value="add">Add GST to base amount</option>
              <option value="remove">Remove GST from gross amount</option>
            </CalculatorSelect>
          </CalculatorField>
          <CalculatorField label={mode === 'add' ? 'Base amount' : 'Gross amount'}>
            <CalculatorNumberInput
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="GST rate (%)" hint="Common slabs include 5, 12, 18, and 28.">
            <CalculatorNumberInput
              type="number"
              min="0"
              step="0.01"
              value={gstRate}
              onChange={(event) => setGstRate(event.target.value)}
            />
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection
        title="GST summary"
        description="CGST and SGST split is shown for quick intra-state reference."
      >
        {result ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <CalculatorStat label="Base amount" value={formatCurrency(result.baseAmount)} />
            <CalculatorStat label="GST amount" value={formatCurrency(result.gstAmount)} tone="highlight" />
            <CalculatorStat label="Gross amount" value={formatCurrency(result.grossAmount)} />
            <CalculatorStat label="CGST" value={formatCurrency(result.cgstAmount)} />
            <CalculatorStat label="SGST" value={formatCurrency(result.sgstAmount)} />
          </div>
        ) : (
          <CalculatorEmptyState
            title="Enter valid amount and GST rate"
            description="The GST summary appears when both values are valid."
          />
        )}
        <p className="mt-5 text-sm leading-6 theme-muted">
          Current rate entered: {Number.isFinite(numericRate) ? formatNumber(numericRate) : '0'}%
        </p>
      </CalculatorSection>
    </div>
  );
}
