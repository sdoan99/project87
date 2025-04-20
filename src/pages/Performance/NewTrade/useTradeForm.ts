import { useState, useMemo, useEffect } from 'react';
import type { TradeAction, TradeActionType } from 'src/types/trade';
import { DEFAULT_TRADE_ACTION } from '../../../utils/trade';

export function useTradeForm(initialTrade?: Trade, initialActions?: TradeAction[]) {
  const [market, setMarket] = useState('STOCK');
  const [sector, setSector] = useState('');
  const [symbol, setSymbol] = useState('');
  const [expiration, setExpiration] = useState(new Date().toISOString().slice(0, 16));
  const [actions, setActions] = useState<TradeAction[]>([{ ...DEFAULT_TRADE_ACTION }]);

  // Initialize form with existing trade data
  useEffect(() => {
    if (initialTrade && initialActions) {
      setSymbol(initialTrade.symbol);
      setActions(initialActions);
    }
  }, [initialTrade, initialActions]);

  const handleAddAction = () => {
    setActions([...actions, { ...DEFAULT_TRADE_ACTION }]);
  };

  const handleRemoveAction = (index: number) => {
    if (actions.length > 1) {
      setActions(actions.filter((_, i) => i !== index));
    }
  };

  const handleUpdateAction = (index: number, field: keyof TradeAction, value: any) => {
    setActions(actions.map((action, i) => (i === index ? { ...action, [field]: value } : action)));
  };

  const { isValid, error } = useMemo(() => {
    if (!symbol.trim()) {
      return { isValid: false, error: 'Symbol is required' };
    }

    if (actions.length === 0) {
      return { isValid: false, error: 'At least one trade action is required' };
    }

    const hasInvalidAction = actions.some(action => action.quantity <= 0 || action.price <= 0);

    if (hasInvalidAction) {
      return { isValid: false, error: 'All quantities and prices must be greater than 0' };
    }

    return { isValid: true, error: null };
  }, [symbol, actions]);

  return {
    market,
    setMarket,
    sector,
    setSector,
    symbol,
    setSymbol,
    expiration,
    setExpiration,
    actions,
    handleAddAction,
    handleRemoveAction,
    handleUpdateAction,
    isValid,
    error,
  };
}
