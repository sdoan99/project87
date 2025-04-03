import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { NewTradeData, TradeAction } from '../types/trade';

export function useTradeSubmit() {
  const { user } = useAuthStore();

  const submitTrade = async (data: NewTradeData) => {
    if (!user) {
      throw new Error('User must be logged in to submit trades');
    }

    try {
      // Generate a new bet_id for this group of actions
      const betId = crypto.randomUUID();

      // Determine position based on first action's side
      const position = data.actions[0]?.type === 'BUY' ? 'LONG' : 'SHORT';

      // Insert all trade actions
      const { error: actionsError } = await supabase
        .from('bet_data')
        .insert(
          data.actions.map(action => ({
            user_id: user.id,
            strategy_id: data.strategyId,
            bet_id: betId,
            date: new Date(action.date).toISOString(),
            market: data.market,
            sector: data.sector,
            symbol: data.symbol,
            expiration: data.expiration,
            position: position, // Add position field
            side: action.type,
            quantity: action.quantity,
            price: action.price,
            fee: action.fee
          }))
        );

      if (actionsError) throw actionsError;

      return betId;
    } catch (error) {
      console.error('Error submitting trade:', error);
      throw error;
    }
  };

  const updateTrade = async (betId: string, data: NewTradeData) => {
    if (!user) {
      throw new Error('User must be logged in to update trades');
    }

    try {
      // Delete existing actions
      const { error: deleteError } = await supabase
        .from('bet_data')
        .delete()
        .eq('bet_id', betId);

      if (deleteError) throw deleteError;

      // Determine position based on first action's side
      const position = data.actions[0]?.type === 'BUY' ? 'LONG' : 'SHORT';

      // Insert updated actions
      const { error: updateError } = await supabase
        .from('bet_data')
        .insert(
          data.actions.map(action => ({
            user_id: user.id,
            strategy_id: data.strategyId,
            bet_id: betId,
            date: new Date(action.date).toISOString(),
            market: data.market,
            sector: data.sector,
            symbol: data.symbol,
            expiration: data.expiration,
            position: position, // Add position field
            side: action.type,
            quantity: action.quantity,
            price: action.price,
            fee: action.fee
          }))
        );

      if (updateError) throw updateError;

      return betId;
    } catch (error) {
      console.error('Error updating trade:', error);
      throw error;
    }
  };

  const deleteTrade = async (betId: string) => {
    if (!user) {
      throw new Error('User must be logged in to delete trades');
    }

    try {
      const { error } = await supabase
        .from('bet_data')
        .delete()
        .eq('bet_id', betId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting trade:', error);
      throw error;
    }
  };

  return { submitTrade, updateTrade, deleteTrade };
}