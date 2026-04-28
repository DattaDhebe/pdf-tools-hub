'use client';

import { useMemo, useState } from 'react';
import { calculateAge, formatNumber } from '@/lib/calculators';
import {
  CalculatorDateInput,
  CalculatorEmptyState,
  CalculatorField,
  CalculatorSection,
  CalculatorStat,
} from '@/components/calculators/calculator-ui';

function getTodayValue() {
  return new Date().toISOString().slice(0, 10);
}

export function AgeCalculatorTool() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [asOfDate, setAsOfDate] = useState(getTodayValue());

  const result = useMemo(() => calculateAge(dateOfBirth, asOfDate), [asOfDate, dateOfBirth]);

  return (
    <div className="grid gap-6">
      <CalculatorSection
        title="Calculate exact age"
        description="Enter a birth date and an as-of date to calculate exact age, total time lived, and the next birthday."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CalculatorField label="Date of birth" hint="Choose the birth date you want to calculate from.">
            <CalculatorDateInput
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </CalculatorField>
          <CalculatorField label="Age as of" hint="Defaults to today, but you can calculate for any date.">
            <CalculatorDateInput
              type="date"
              value={asOfDate}
              onChange={(event) => setAsOfDate(event.target.value)}
            />
          </CalculatorField>
        </div>
      </CalculatorSection>

      <CalculatorSection
        title="Age breakdown"
        description="Results update instantly in your browser."
      >
        {result ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <CalculatorStat
              label="Exact age"
              value={`${result.years}y ${result.months}m ${result.days}d`}
              tone="highlight"
            />
            <CalculatorStat label="Total months" value={formatNumber(result.totalMonths, 0)} />
            <CalculatorStat label="Total weeks" value={formatNumber(result.totalWeeks, 0)} />
            <CalculatorStat label="Total days" value={formatNumber(result.totalDays, 0)} />
            <CalculatorStat
              label="Next birthday"
              value={result.isBirthdayToday ? 'Today' : result.nextBirthdayLabel}
            />
            <CalculatorStat
              label="Days to next birthday"
              value={result.isBirthdayToday ? '0 days' : `${formatNumber(result.nextBirthdayInDays, 0)} days`}
            />
          </div>
        ) : (
          <CalculatorEmptyState
            title="Add a valid birth date to start"
            description="The age calculator will show exact age details as soon as the dates are valid."
          />
        )}
      </CalculatorSection>
    </div>
  );
}
