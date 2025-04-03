export type TradeStatus = 'OPEN' | 'WIN' | 'LOSS';

export interface Trade {
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
}