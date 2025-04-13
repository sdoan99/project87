export type TradeStatus = 'OPEN' | 'WIN' | 'LOSS';
export type TradeActionType = 'BUY' | 'SELL';

export interface TradeAction {
  id?: string;
  type: TradeActionType;
  date: string;
  quantity: number;
  price: number;
  fee: number;
}

export interface Trade {
  betId: string;
  date: string;
  symbol: string;
  status: TradeStatus;
  side: 'long' | 'short';
  qty: number;
  entry: number;
  exit: number | null;
  entryTotal: number;
  exitTotal: number | null;
  position: number | null;
  hold: string | null;
  return: number | null;
  returnPercentage: number | null;
  market?: string;
  sector?: string;
  expiration?: string;
}

export interface NewTradeData {
  market: string;
  sector: string;
  symbol: string;
  expiration: string;
  actions: TradeAction[];
  strategyId: string;
}
