import { FC } from 'react';

interface StrategyDetailsProps {
  marketTypes: string;
  categories: string;
  timeframes: string;
}

export const StrategyDetails: FC<StrategyDetailsProps> = ({
  marketTypes,
  categories,
  timeframes,
}) => {
  return (
    <div>
      <h3 className='text-lg text-white font-semibold mb-2'>Strategy Details</h3>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <div className='text-gray-400'>Market</div>
          <div className='ml-4 text-purple-400'>{marketTypes}</div>
        </div>
        <div className='space-y-1'>
          <div className='text-gray-400'>Category</div>
          <div className='ml-4 text-purple-400'>{categories}</div>
        </div>
        <div className='space-y-1'>
          <div className='text-gray-400'>Timeframe</div>
          <div className='ml-4 text-purple-400'>{timeframes}</div>
        </div>
      </div>
    </div>
  );
};
