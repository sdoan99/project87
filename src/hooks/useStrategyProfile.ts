import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface StrategyMetrics {
  total_pnl: number;
  win_rate: number;
  avg_win: number;
  avg_loss: number;
  profit_factor: number;
  avg_pnl_per_day: number;
}

export interface StrategyProfile {
  id: string;
  user_id: string;
  username: string;
  name: string;
  description: string;
  market_types: string;
  timeframes: string;
  categories: string;
  public: string;
  created_at: string;
  updated_at: string;
  strategy_metrics: StrategyMetrics;
}

export function useStrategyProfile(strategyName?: string, refreshTrigger = 0) {
  const [profile, setProfile] = useState<StrategyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStrategyProfile = useCallback(async () => {
    try {
      if (!strategyName) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Join strategy_profile with strategy_metrics using strategy_id
      const { data, error } = await supabase
        .from('strategy_profile')
        .select(`
          *,
          strategy_metrics!inner(
            total_pnl,
            win_rate,
            avg_win,
            avg_loss,
            profit_factor,
            avg_pnl_per_day
          )
        `)
        .eq('name', strategyName)
        .single();

      if (error) throw error;

      // Transform the joined data to match our StrategyProfile interface
      const transformedData: StrategyProfile = {
        ...data,
        strategy_metrics: data.strategy_metrics[0] // Get the first (and should be only) metrics record
      };

      setProfile(transformedData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [strategyName]);

  useEffect(() => {
    fetchStrategyProfile();
  }, [fetchStrategyProfile, refreshTrigger]); // Add refreshTrigger to dependencies

  return { profile, loading, error, refetch: fetchStrategyProfile };
}