import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { TradeAction } from '../types/trade';

/**
 * Fetches and manages trade actions for a given bet.
 * @param betId The bet ID to fetch actions for.
 * @returns actions, loading, error, and a refetch function.
 */
export function useTradeActions(betId?: string) {
  const [actions, setActions] = useState<TradeAction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformActions = (data: any[]): TradeAction[] =>
    data.map(item => ({
      id: item.id,
      type: item.side,
      date: new Date(item.date).toISOString().slice(0, 16),
      quantity: item.quantity,
      price: item.price,
      fee: item.fee || 0,
    }));

  const fetchActions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!betId) {
        setActions([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('bet_data')
        .select('*')
        .eq('bet_id', betId)
        .order('date', { ascending: true });

      if (error) throw error;

      setActions(transformActions(data));
    } catch (err: any) {
      setError(err.message);
      setActions([]);
    } finally {
      setLoading(false);
    }
  }, [betId]);

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  return { actions, loading, error, refetch: fetchActions };
}
