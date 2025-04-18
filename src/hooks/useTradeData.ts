import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Trade } from '../types/trade';

/**
 * Fetches and manages trade data for a given strategy.
 * @param strategyId The strategy ID to fetch trades for.
 * @returns trades, loading, error, and a refetch function.
 */
export function useTradeData(strategyId?: string) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformTrades = (data: any[]): Trade[] =>
    data.map(item => ({
      betId: item.bet_id,
      date: new Date(item.date).toLocaleDateString(),
      symbol: item.symbol,
      status: item.status,
      side: item.position?.toLowerCase(),
      qty: item.qty,
      entry: item.entry,
      exit: item.exit,
      entryTotal: item.entry_tot,
      exitTotal: item.exit_tot,
      position: item.qty_rem,
      hold: item.hold,
      return: item.return,
      returnPercentage: item.return_percent,
    }));

  const fetchTrades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!strategyId) {
        setTrades([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('bet_data_metrics')
        .select('*')
        .eq('strategy_id', strategyId)
        .order('date', { ascending: false });

      if (error) throw error;

      setTrades(transformTrades(data));
    } catch (err: any) {
      setError(err.message);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  }, [strategyId]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  return { trades, loading, error, refetch: fetchTrades };
}

