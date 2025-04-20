import { useParams } from 'react-router-dom';
import { Card } from '../ui/card';
import { InfoHeader } from './infoheader';
import { Description } from './description';
import { PriceSection } from './price-section';
import { KeyStats } from './key-stats';
import { Performance } from './performance';
import { StrategyDetails } from './strategy-details';
import { Profile } from './profile';
import { useStrategyProfile } from '../../../hooks/useStrategyProfile';

interface InfoPanelProps {
  refreshTrigger: number;
}

export function InfoPanel({ refreshTrigger }: InfoPanelProps) {
  const { strategyName } = useParams<{ strategyName: string }>();
  const { profile, loading, error, refetch } = useStrategyProfile(strategyName, refreshTrigger);

  if (loading) {
    return (
      <Card className='w-[320px]'>
        <div className='p-4'>
          <div className='animate-pulse space-y-4'>
            <div className='h-8 bg-gray-700 rounded'></div>
            <div className='h-24 bg-gray-700 rounded'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-700 rounded w-3/4'></div>
              <div className='h-4 bg-gray-700 rounded'></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='w-[320px]'>
        <div className='p-4 text-red-400'>Error loading strategy profile: {error}</div>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className='w-[320px]'>
        <div className='p-4 text-gray-400'>Strategy profile not found</div>
      </Card>
    );
  }

  return (
    <Card className='w-[320px]'>
      <div className='p-4 space-y-3'>
            {/*
            <button
              className='mb-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              onClick={refetch}
            >
              Refresh Metrics
            </button>
            */}
        <InfoHeader name={profile.name} username={profile.username} />
        <Description description={profile.description} />
        <PriceSection />
        <KeyStats metrics={profile.strategy_metrics} />
        <Performance />
        <StrategyDetails
          marketTypes={profile.market_types}
          categories={profile.categories}
          timeframes={profile.timeframes}
        />
        <Profile />
      </div>
    </Card>
  );
}
