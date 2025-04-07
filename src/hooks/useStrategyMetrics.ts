import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { StrategyData } from '../types/strategy';

export function useStrategyMetrics() {
  const [strategies, setStrategies] = useState<StrategyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStrategyMetrics() {
      try {
        const { data, error } = await supabase.from('strategy_metrics').select(`
            id,
            strategy_id,
            name,
            total_pnl,
            win_rate,
            avg_win,
            avg_loss,
            profit_factor,
            avg_pnl_per_day,
            created_at,
            updated_at
          `);

        if (error) throw error;

        // Transform the data to match our StrategyData interface
        const transformedData: StrategyData[] = data.map(item => ({
          name: item.name,
          totalPnl: item.total_pnl || 0,
          winRate: item.win_rate || 0,
          avgWin: item.avg_win || 0,
          avgLoss: item.avg_loss || 0,
          profitFactor: item.profit_factor || 0,
          avgPnlDay: item.avg_pnl_per_day || 0,
          performance: {
            h24: Math.random() * 20 - 10, // Random value between -10% and +10%
            d7: Math.random() * 30 - 15, // Random value between -15% and +15%
            d28: Math.random() * 40 - 20, // Random value between -20% and +20%
            m3: Math.random() * 50 - 25, // Random value between -25% and +25%
            m6: Math.random() * 60 - 30, // Random value between -30% and +30%
            y1: Math.random() * 100 - 50, // Random value between -50% and +50%
          },
        }));

        // If no data from Supabase, add some mock data
        if (transformedData.length === 0) {
          transformedData.push({
            name: 'BTC Momentum',
            totalPnl: 125000,
            winRate: 68.5,
            avgWin: 2500,
            avgLoss: -1200,
            profitFactor: 2.8,
            avgPnlDay: 342.47,
            performance: {
              h24: 2.5,
              d7: 8.3,
              d28: 15.7,
              m3: 22.4,
              m6: 45.2,
              y1: 76.8,
            },
          });
        }

        setStrategies(transformedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStrategyMetrics();
  }, []);

  return { strategies, loading, error };
}
