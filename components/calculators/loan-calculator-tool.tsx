'use client';

import { useState } from 'react';
import {
  CalculatorField,
  CalculatorNumberInput,
  CalculatorSection,
  CalculatorStat,
} from './calculator-ui';

export function LoanCalculatorTool() {
  const [amount, setAmount] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);

  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - amount;

  const fmt = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <CalculatorSection
        title="Loan Details"
        description="Enter your loan amount, annual interest rate, and duration."
      >
        <div className="space-y-4">
          <CalculatorField label="Loan Amount" hint="The total principal you want to borrow">
            <CalculatorNumberInput
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </CalculatorField>
          <CalculatorField label="Interest Rate (%)" hint="Annual percentage rate (APR)">
            <CalculatorNumberInput
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </CalculatorField>
          <CalculatorField label="Loan Tenure (Years)" hint="Duration of the loan in years">
            <CalculatorNumberInput
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection title="Repayment Summary" description="Overview of your total loan costs.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <CalculatorStat label="Monthly EMI" value={fmt(emi)} tone="highlight" />
          </div>
          <CalculatorStat label="Principal Amount" value={fmt(amount)} />
          <CalculatorStat label="Total Interest" value={fmt(totalInterest)} />
          <div className="sm:col-span-2">
            <CalculatorStat label="Total Repayment" value={fmt(totalPayment)} />
          </div>
        </div>
        <p className="mt-6 text-xs leading-5 theme-muted-2">
          Note: This calculator assumes a fixed interest rate for the entire tenure. Actual loan terms may vary based on bank policies and fees.
        </p>
      </CalculatorSection>
    </div>
  );
}
