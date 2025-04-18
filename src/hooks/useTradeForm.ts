import { useState, useMemo, useEffect, useCallback } from 'react';
import { Trade, TradeAction } from '../types/trade';

/**
 * Manages trade form state and validation.
 * @param initialTrade Optional initial trade object.
 * @param initialActions Optional initial trade actions.
 * @returns Form state, handlers, validation state.
 */
export function useTradeForm(initialTrade?: Trade, initialActions?: TradeAction[]) {
  const [market, setMarket] = useState('STOCK');
  const [sector, setSector] = useState('');
  const [symbol, setSymbol] = useState('');
  const [expiration, setExpiration] = useState(new Date().toISOString().slice(0, 16));
  const [actions, setActions] = useState<TradeAction[]>([
    {
      type: 'BUY',
      date: new Date().toISOString().slice(0, 16),
      quantity: 0,
      price: 0,
      fee: 0,
    },
  ]);

  // Initialize form with existing trade data
  useEffect(() => {
    if (initialTrade && initialActions) {
      setMarket(initialTrade.market || 'STOCK');
      setSector(initialTrade.sector || '');
      setSymbol(initialTrade.symbol);
      setExpiration(initialTrade.expiration || new Date().toISOString().slice(0, 16));
      setActions(
        initialActions.map(action => ({
          ...action,
          date: new Date(action.date).toISOString().slice(0, 16),
        }))
      );
    }
  }, [initialTrade, initialActions]);

  const handleAddAction = useCallback(() => {
    setActions(prev => [
      ...prev,
      {
        type: 'BUY',
        date: new Date().toISOString().slice(0, 16),
        quantity: 0,
        price: 0,
        fee: 0,
      },
    ]);
  }, []);

  const handleRemoveAction = useCallback((index: number) => {
    setActions(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  }, []);

  const handleUpdateAction = useCallback(
    <K extends keyof TradeAction>(index: number, field: K, value: TradeAction[K]) => {
      setActions(prev =>
        prev.map((action, i) => (i === index ? { ...action, [field]: value } : action))
      );
    },
    []
  );

  const { isValid, error } = useMemo(() => {
    if (!symbol.trim()) {
      return { isValid: false, error: 'Symbol is required' };
    }

    if (actions.length === 0) {
      return { isValid: false, error: 'At least one trade action is required' };
    }

    const hasInvalidAction = actions.some(
      action => !action.date || action.quantity <= 0 || action.price <= 0
    );

    if (hasInvalidAction) {
      return { isValid: false, error: 'All actions must have valid date, quantity, and price' };
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
