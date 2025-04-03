import React from 'react';
import { formatPercentage } from '../../../utils/formatters';

interface PerformanceCellProps {
  value: number;
}

export function PerformanceCell({ value }: PerformanceCellProps) {
  const isPositive = value >= 0;
  const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
  
  return (
    <td className={`px-4 py-3 text-sm whitespace-nowrap ${colorClass}`}>
      {formatPercentage(value)}
    </td>
  );
}