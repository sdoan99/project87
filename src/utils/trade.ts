import { TradeAction } from '../types/trade';

export const DEFAULT_TRADE_ACTION: TradeAction = {
  type: 'BUY',
  date: new Date().toISOString().slice(0, 16),
  quantity: 0,
  price: 0,
  fee: 0,
};
