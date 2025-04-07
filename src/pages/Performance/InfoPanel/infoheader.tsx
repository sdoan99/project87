import { FC } from 'react';

interface InfoHeaderProps {
  name: string;
  username: string;
}

export const InfoHeader: FC<InfoHeaderProps> = ({ name, username }) => {
  return (
    <div className='space-y-1'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 rounded-full bg-purple-500' />
          <span className='text-white font-medium'>{name}</span>
          <span className='text-gray-400'>•</span>
          <span className='text-gray-400'>COINBASE</span>
        </div>
      </div>
      <div className='text-sm text-gray-400'>{username}</div>
    </div>
  );
};
