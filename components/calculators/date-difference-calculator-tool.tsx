'use client';

import { useState } from 'react';
import {
  CalculatorDateInput,
  CalculatorField,
  CalculatorSection,
  CalculatorStat,
} from './calculator-ui';

export function DateDifferenceCalculatorTool() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const diffInMs = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  const years = Math.floor(diffInDays / 365.25);
  const remainingDays = diffInDays % 365.25;
  const months = Math.floor(remainingDays / 30.44);
  const finalDays = Math.floor(remainingDays % 30.44);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <CalculatorSection
        title="Select Dates"
        description="Choose the two dates you want to compare."
      >
        <div className="space-y-4">
          <CalculatorField label="Start Date">
            <CalculatorDateInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="End Date">
            <CalculatorDateInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection title="Duration Result" description="The exact time between the selected dates.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <CalculatorStat label="Total Days" value={`${diffInDays} days`} tone="highlight" />
          </div>
          <CalculatorStat label="Years" value={`${years}`} />
          <CalculatorStat label="Months" value={`${months}`} />
          <CalculatorStat label="Weeks" value={`${Math.floor(diffInDays / 7)}`} />
          <CalculatorStat label="Days" value={`${finalDays}`} />
        </div>
      </CalculatorSection>
    </div>
  );
}
