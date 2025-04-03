import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Trade } from '../types/trade';

export function useTradeData(strategyId?: string) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrades = useCallback(async () => {
    try {
      if (!strategyId) return;

      const { data, error } = await supabase
        .from('bet_data_metrics')
        .select('*')
        .eq('strategy_id', strategyId)
        .order('date', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Trade interface
      const transformedTrades: Trade[] = data.map(item => ({
        betId: item.bet_id,
        date: new Date(item.date).toLocaleDateString(),
        symbol: item.symbol,
        status: item.status,
        side: item.position.toLowerCase(),
        qty: item.qty,
        entry: item.entry,
        exit: item.exit,
        entryTotal: item.entry_tot,
        exitTotal: item.exit_tot,
        position: item.qty_rem,
        hold: item.hold,
        return: item.return,
        returnPercentage: item.return_percent
      }));

      setTrades(transformedTrades);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [strategyId]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  return { trades, loading, error, refetch: fetchTrades };
}