import React from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { useStrategyMetrics } from '../../../hooks/useStrategyMetrics';
import { useSortableTable } from '../../../hooks/useSortableTable';

export function StrategyTable() {
  const { strategies, loading, error } = useStrategyMetrics();
  const { sortedData, sortConfig, requestSort } = useSortableTable(strategies);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg border border-gray-800">
        <div className="text-gray-400">Loading strategies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg border border-gray-800">
        <div className="text-red-400">Error loading strategies: {error}</div>
      </div>
    );
  }

  if (!strategies.length) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg border border-gray-800">
        <div className="text-gray-400">No strategies found</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <TableHeader onSort={requestSort} sortConfig={sortConfig} />
        <tbody className="divide-y divide-gray-800">
          {sortedData.map((strategy, index) => (
            <TableRow key={strategy.name || index} strategy={strategy} />
          ))}
        </tbody>
      </table>
    </div>
  );
}