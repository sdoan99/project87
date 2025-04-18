import { useState, useMemo } from 'react';
import { StrategyData } from '../types/strategy';

/**
 * Sorting direction for sortable tables.
 */
export interface SortConfig {
  key: keyof StrategyData | null;
  direction: SortDirection;
}

export type SortDirection = 'asc' | 'desc' | null;

/**
 * Return type for useSortableTable hook.
 */
export interface UseSortableTableResult {
  sortedData: StrategyData[];
  sortConfig: SortConfig;
  requestSort: (key: keyof StrategyData) => void;
}

/**
 * React hook to provide sortable table data and sorting controls for StrategyData arrays.
 * Handles nested performance keys (e.g., 'performance.metricName').
 * Returns sorted data, current sort config, and a requestSort function.
 */
export function useSortableTable(data: StrategyData[]): UseSortableTableResult {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    // Handle nested performance keys or top-level keys
    return [...data].sort((a, b) => {
      // Support 'performance.metricName' keys
      if (typeof sortConfig.key === 'string' && sortConfig.key.startsWith('performance.')) {
        const perfKey = sortConfig.key.split('.')[1] as keyof typeof a.performance;
        const aPerf = a.performance?.[perfKey];
        const bPerf = b.performance?.[perfKey];
        if (aPerf === undefined || bPerf === undefined) {
          console.warn(`Invalid performance key: ${perfKey}`);
          return 0;
        }
        return sortConfig.direction === 'asc' ? (aPerf < bPerf ? -1 : 1) : aPerf > bPerf ? -1 : 1;
      }
      // Fallback to top-level key
      const aValue = a[sortConfig.key as keyof StrategyData];
      const bValue = b[sortConfig.key as keyof StrategyData];
      if (aValue === bValue) return 0;
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
