import { FC } from 'react';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { StrategyMetrics } from '../../../hooks/useStrategyProfile';

interface KeyStatsProps {
  metrics: StrategyMetrics;
}

export const KeyStats: FC<KeyStatsProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div>
        <h3 className='text-lg text-white font-semibold mb-2'>Key stats</h3>
        <div className='text-gray-400'>No metrics available</div>
      </div>
    );
  }

  const stats = {
    total_pnl: metrics.total_pnl || 0,
    win_rate: metrics.win_rate || 0,
    avg_win: metrics.avg_win || 0,
    avg_loss: metrics.avg_loss || 0,
    profit_factor: metrics.profit_factor || 0,
    avg_pnl_per_day: metrics.avg_pnl_per_day || 0,
  };

  return (
    <div>
      <h3 className='text-lg text-white font-semibold mb-2'>Key stats</h3>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Total P/L</span>
          <span className={`${stats.total_pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(stats.total_pnl)}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Win Rate</span>
          <span className='text-gray-300'>{formatPercentage(stats.win_rate)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Avg Win</span>
          <span className='text-emerald-400'>{formatCurrency(stats.avg_win)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Avg Loss</span>
          <span className='text-red-400'>{formatCurrency(stats.avg_loss)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Profit Factor</span>
          <span className='text-gray-300'>{stats.profit_factor.toFixed(2)}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Avg P/L / Day</span>
          <span className={`${stats.avg_pnl_per_day >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(stats.avg_pnl_per_day)}
          </span>
        </div>
      </div>
    </div>
  );
};
