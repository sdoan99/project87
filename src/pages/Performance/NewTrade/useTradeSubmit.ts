import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/authStore';
import { TradeAction } from './types';

interface TradeData {
  market: string;
  sector: string;
  symbol: string;
  expiration: string;
  actions: TradeAction[];
  strategyId: string;
}

export function useTradeSubmit() {
  const { user } = useAuthStore();

  const submitTrade = async (data: TradeData) => {
    if (!user) {
      throw new Error('User must be logged in to submit trades');
    }

    try {
      // Start by inserting the parent bet
      const { data: betParent, error: parentError } = await supabase
        .from('bet_parent')
        .insert({
          user_id: user.id,
          strategy_id: data.strategyId,
          market: data.market,
          sector: data.sector,
          symbol: data.symbol,
          expiration: data.expiration,
          date_time: new Date().toISOString()
        })
        .select()
        .single();

      if (parentError) throw parentError;
      if (!betParent) throw new Error('Failed to create bet parent');

      // Insert child bets
      const childPromises = data.actions.map(action => {
        return supabase
          .from('bet_child')
          .insert({
            bet_id: betParent.id,
            user_id: user.id,
            strategy_id: data.strategyId,
            position: action.type === 'BUY' ? 'LONG' : 'SHORT',
            date_time: action.date,
            side: action.type,
            quantity: action.quantity,
            price: action.price,
            fee: action.fee
          });
      });

      await Promise.all(childPromises);

      // Calculate metrics for bet_parent_metrics
      const totalQuantity = data.actions.reduce((sum, action) => {
        return sum + (action.type === 'BUY' ? action.quantity : -action.quantity);
      }, 0);

      const avgEntry = data.actions
        .filter(action => action.type === 'BUY')
        .reduce((sum, action) => sum + action.price * action.quantity, 0) / 
        data.actions.filter(action => action.type === 'BUY')
          .reduce((sum, action) => sum + action.quantity, 0);

      await supabase
        .from('bet_parent_metrics')
        .insert({
          bet_id: betParent.id,
          strategy_id: data.strategyId,
          position: totalQuantity > 0 ? 'LONG' : 'SHORT',
          quantity: Math.abs(totalQuantity),
          avg_entry: avgEntry,
          status: 'OPEN'
        });

      return betParent.id;
    } catch (error) {
      console.error('Error submitting trade:', error);
      throw error;
    }
  };

  return { submitTrade };
}