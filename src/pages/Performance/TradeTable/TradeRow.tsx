import React from 'react';
import { Trade } from './types';
import { formatCurrency, formatPercentage } from './utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useSymbol } from '../../../components/tradingview/context/SymbolContext';

interface TradeRowProps {
  trade: Trade;
  onClick: () => void;
}

export function TradeRow({ trade, onClick }: TradeRowProps) {
  const { setActiveSymbol } = useSymbol();

  const handleRowClick = () => {
    // Update the symbol in context
    setActiveSymbol(trade.symbol);
    onClick();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WIN':
        return 'text-green-400';
      case 'LOSS':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getReturnColor = (value: number | null) => {
    if (!value) return 'text-white';
    return value >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <tr
      data-testid={`trade-row-${trade.symbol}`}
      className='border-b border-gray-800 hover:bg-gray-800/50 transition-colors text-white cursor-pointer'
      onClick={handleRowClick}
    >
      <td className='px-4 py-3'>{trade.date}</td>
      <td className='px-4 py-3'>
        <span className='text-blue-400'>{trade.symbol}</span>
      </td>
      <td className='px-4 py-3'>
        <span className={`inline-flex items-center ${getStatusColor(trade.status)}`}>
          <span className='w-2 h-2 rounded-full mr-2 bg-current' />
          {trade.status}
        </span>
      </td>
      <td className='px-4 py-3'>
        {trade.side === 'long' ? (
          <ArrowUpRight className='w-4 h-4 text-green-400' />
        ) : (
          <ArrowDownRight className='w-4 h-4 text-red-400' />
        )}
      </td>
      <td className='px-4 py-3 text-right'>{trade.qty}</td>
      <td className='px-4 py-3 text-right'>{formatCurrency(trade.entry)}</td>
      <td className='px-4 py-3 text-right'>{trade.exit ? formatCurrency(trade.exit) : '-'}</td>
      <td className='px-4 py-3 text-right'>{formatCurrency(trade.entryTotal)}</td>
      <td className='px-4 py-3 text-right'>
        {trade.exitTotal ? formatCurrency(trade.exitTotal) : '-'}
      </td>
      <td className='px-4 py-3 text-right'>{trade.position || '-'}</td>
      <td className='px-4 py-3 text-center'>
        {trade.hold ? <span className='text-blue-400'>{trade.hold}</span> : '-'}
      </td>
      <td className={`px-4 py-3 text-right ${getReturnColor(trade.return)}`}>
        {trade.return ? formatCurrency(trade.return) : '-'}
      </td>
      <td className={`px-4 py-3 text-right ${getReturnColor(trade.returnPercentage)}`}>
        {trade.returnPercentage ? formatPercentage(trade.returnPercentage) : '-'}
      </td>
    </tr>
  );
}
