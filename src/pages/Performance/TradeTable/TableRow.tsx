import React from 'react';
import { Link } from 'react-router-dom';
import { PerformanceCell } from './PerformanceCell';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { StrategyData } from '../../../types/strategy';
import { useSymbol } from '../../../context/SymbolContext';

interface TableRowProps {
  strategy: StrategyData;
}

export function TableRow({ strategy }: TableRowProps) {
  const { setActiveSymbol } = useSymbol();

  const handleRowClick = () => {
    // Format the symbol for TradingView
    // You might need to adjust this formatting based on your data structure
    const formattedSymbol = `NASDAQ:${strategy.name}`;
    setActiveSymbol(formattedSymbol);
  };

  return (
    <tr 
      className="hover:bg-gray-800/50 transition-colors cursor-pointer" 
      onClick={handleRowClick}
    >
      <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
        <Link 
          to={`/performance/${encodeURIComponent(strategy.name)}`}
          className="text-blue-400 hover:text-blue-300 transition-colors"
          onClick={(e) => e.stopPropagation()} // Prevent row click when clicking the link
        >
          {strategy.name}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
        {formatCurrency(strategy.totalPnl)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
        {formatPercentage(strategy.winRate)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
        {formatCurrency(strategy.avgWin)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
        {formatCurrency(strategy.avgLoss)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
        {strategy.profitFactor.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
        {formatCurrency(strategy.avgPnlDay)}
      </td>
      <PerformanceCell value={strategy.performance.h24} />
      <PerformanceCell value={strategy.performance.d7} />
      <PerformanceCell value={strategy.performance.d28} />
      <PerformanceCell value={strategy.performance.m3} />
      <PerformanceCell value={strategy.performance.m6} />
      <PerformanceCell value={strategy.performance.y1} />
    </tr>
  );
}