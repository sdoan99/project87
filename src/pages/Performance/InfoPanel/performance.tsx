import { FC } from 'react';

export const Performance: FC = () => {
  return (
    <div>
      <h3 className='text-lg text-white font-semibold mb-2'>Performance</h3>
      <div className='grid grid-cols-3 gap-2'>
        {[
          { label: '1W', value: '12.39%' },
          { label: '1M', value: '66.09%' },
          { label: '3M', value: '80.85%' },
          { label: '6M', value: '9.30%' },
          { label: 'YTD', value: '76.37%' },
          { label: '1Y', value: '80.16%' },
        ].map(period => (
          <div key={period.label} className='bg-gray-800/50 p-2 rounded text-center'>
            <div className='text-emerald-400'>{period.value}</div>
            <div className='text-xs text-gray-400'>{period.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
