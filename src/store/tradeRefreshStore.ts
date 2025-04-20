import { create } from 'zustand';

interface TradeRefreshState {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export const useTradeRefreshStore = create<TradeRefreshState>(set => ({
  refreshTrigger: 0,
  triggerRefresh: () => set(state => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
