import React, { useState, useEffect } from 'react';
import { TradeRow } from './TradeRow';
import { ArrowDownUp } from 'lucide-react';
import { useTradeData } from '../../../hooks/useTradeData';
import { useParams } from 'react-router-dom';
import { useStrategyProfile } from '../../../hooks/useStrategyProfile';
import { NewTrade } from '../NewTrade';
import { Trade } from '../../../types/trade';

interface TradeTableProps {
  refreshTrigger?: number;
}

export function TradeTable({ refreshTrigger = 0 }: TradeTableProps) {
  const { strategyName } = useParams<{ strategyName: string }>();
  const { profile } = useStrategyProfile(strategyName);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const { trades, loading, error, refetch } = useTradeData(profile?.id);

  // Effect to refetch data when refreshTrigger changes
  useEffect(() => {
    if (profile?.id) {
      refetch();
    }
  }, [refreshTrigger, profile?.id, refetch]);

  if (loading) {
    return (
      <div className='w-full overflow-x-auto rounded-lg border border-gray-800 bg-gray-900'>
        <div className='flex justify-center items-center h-40'>
          <div className='text-gray-400'>Loading trades...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full overflow-x-auto rounded-lg border border-gray-800 bg-gray-900'>
        <div className='flex justify-center items-center h-40'>
          <div className='text-red-400'>Error loading trades: {error}</div>
        </div>
      </div>
    );
  }

  if (!trades.length) {
    return (
      <div className='w-full overflow-x-auto rounded-lg border border-gray-800 bg-gray-900'>
        <div className='flex justify-center items-center h-40'>
          <div className='text-gray-400'>No trades found</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full overflow-x-auto rounded-lg border border-gray-800 bg-gray-900'>
        <table className='w-full min-w-[1200px] table-auto text-white'>
          <thead>
            <tr className='border-b border-gray-800 bg-gray-800/50'>
              <th className='px-4 py-3 text-left'>
                <div className='flex items-center space-x-1'>
                  <span>Date</span>
                  <ArrowDownUp className='w-4 h-4' />
                </div>
              </th>
              <th className='px-4 py-3 text-left'>Symbol</th>
              <th className='px-4 py-3 text-left'>Status</th>
              <th className='px-4 py-3 text-left'>Side</th>
              <th className='px-4 py-3 text-right'>Qty</th>
              <th className='px-4 py-3 text-right'>Entry</th>
              <th className='px-4 py-3 text-right'>Exit</th>
              <th className='px-4 py-3 text-right'>Ent Tot</th>
              <th className='px-4 py-3 text-right'>Ext Tot</th>
              <th className='px-4 py-3 text-right'>Pos</th>
              <th className='px-4 py-3 text-center'>Hold</th>
              <th className='px-4 py-3 text-right'>Return</th>
              <th className='px-4 py-3 text-right'>Return %</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <TradeRow
                key={`${trade.betId}-${index}`}
                trade={trade}
                onClick={() => setSelectedTrade(trade)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedTrade && (
        <NewTrade
          onClose={() => setSelectedTrade(null)}
          onSubmitSuccess={() => {
            setSelectedTrade(null);
            refetch();
          }}
          initialTrade={selectedTrade}
        />
      )}
    </>
  );
}
