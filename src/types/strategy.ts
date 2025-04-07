export interface Performance {
  h24: number;
  d7: number;
  d28: number;
  m3: number;
  m6: number;
  y1: number;
}

export interface StrategyData {
  name: string;
  totalPnl: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  avgPnlDay: number;
  performance: Performance;
}
