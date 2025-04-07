import React from 'react';
import { SortableHeader } from '../../../components/table/SortableHeader';
import { StrategyData } from '../../../types/strategy';

interface TableHeaderProps {
  onSort: (key: keyof StrategyData) => void;
  sortConfig: {
    key: string | null;
    direction: 'asc' | 'desc' | null;
  };
}

export function TableHeader({ onSort, sortConfig }: TableHeaderProps) {
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Total PNL', key: 'totalPnl' },
    { label: 'Win Rate', key: 'winRate' },
    { label: 'Avg Win', key: 'avgWin' },
    { label: 'Avg Loss', key: 'avgLoss' },
    { label: 'Profit Factor', key: 'profitFactor' },
    { label: 'Avg PNL/Day', key: 'avgPnlDay' },
    { label: '24H', key: 'performance.h24' },
    { label: '7D', key: 'performance.d7' },
    { label: '28D', key: 'performance.d28' },
    { label: '3M', key: 'performance.m3' },
    { label: '6M', key: 'performance.m6' },
    { label: '1Y', key: 'performance.y1' },
  ];

  return (
    <thead className='bg-gray-800'>
      <tr>
        {headers.map(({ label, key }) => (
          <SortableHeader
            key={key}
            label={label}
            sortKey={key}
            currentSort={sortConfig.key}
            sortDirection={sortConfig.direction}
            onSort={() => onSort(key as keyof StrategyData)}
          />
        ))}
      </tr>
    </thead>
  );
}
