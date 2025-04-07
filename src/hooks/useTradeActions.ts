import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TradeAction } from '../types/trade';

export function useTradeActions(betId?: string) {
  const [actions, setActions] = useState<TradeAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActions() {
      try {
        if (!betId) return;

        const { data, error } = await supabase
          .from('bet_data')
          .select('*')
          .eq('bet_id', betId)
          .order('date', { ascending: true });

        if (error) throw error;

        const transformedActions: TradeAction[] = data.map(item => ({
          id: item.id,
          type: item.side,
          date: new Date(item.date).toISOString().slice(0, 16),
          quantity: item.quantity,
          price: item.price,
          fee: item.fee || 0,
        }));

        setActions(transformedActions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, [betId]);

  return { actions, loading, error };
}
