import { useState, useMemo } from 'react';
import { StrategyData } from '../types/strategy';

type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  key: keyof StrategyData | null;
  direction: SortDirection;
};

export function useSortableTable(data: StrategyData[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof StrategyData];
      const bValue = b[sortConfig.key as keyof StrategyData];

      if (aValue === bValue) return 0;

      // Handle nested performance object
      if (sortConfig.key.startsWith('performance.')) {
        const perfKey = sortConfig.key.split('.')[1] as keyof typeof a.performance;
        const aPerf = a.performance[perfKey];
        const bPerf = b.performance[perfKey];

        return sortConfig.direction === 'asc' ? (aPerf < bPerf ? -1 : 1) : aPerf > bPerf ? -1 : 1;
      }

      return sortConfig.direction === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof StrategyData) => {
    let direction: SortDirection = 'asc';

    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  return { sortedData, sortConfig, requestSort };
}
