import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { StrategyData } from '../types/strategy';

/**
 * React hook to fetch and provide strategy metrics from Supabase.
 * Returns strategies, loading, and error states. No mock or random data.
 */
export interface UseStrategyMetricsResult {
  strategies: StrategyData[];
  loading: boolean;
  error: string | null;
}

export function useStrategyMetrics(): UseStrategyMetricsResult {
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
        const transformedData: StrategyData[] = Array.isArray(data)
          ? data.map(item => ({
              name: item.name,
              totalPnl: item.total_pnl || 0,
              winRate: item.win_rate || 0,
              avgWin: item.avg_win || 0,
              avgLoss: item.avg_loss || 0,
              profitFactor: item.profit_factor || 0,
              avgPnlDay: item.avg_pnl_per_day || 0,
              performance: {
                h24: item.performance_h24 || 0,
                d7: item.performance_d7 || 0,
                d28: item.performance_d28 || 0,
                m3: item.performance_m3 || 0,
                m6: item.performance_m6 || 0,
                y1: item.performance_y1 || 0,
              },
            }))
          : [];
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
