// TradeActionType and TradeAction have been centralized in src/types/trade.ts
// import { TradeAction, TradeActionType } from 'src/types/trade';

export interface MarketSelectProps {
  value: string;
  onChange: (value: string) => void;
}
