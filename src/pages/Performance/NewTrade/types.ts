export type TradeActionType = 'BUY' | 'SELL';

export interface TradeAction {
  type: TradeActionType;
  date: string;
  quantity: number;
  price: number;
  fee: number;
}

export interface MarketSelectProps {
  value: string;
  onChange: (value: string) => void;
}