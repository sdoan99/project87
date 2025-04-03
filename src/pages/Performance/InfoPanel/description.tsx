import { FC } from 'react';

interface DescriptionProps {
  description: string;
}

export const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="mt-2 p-3 bg-gray-800/50 rounded-lg text-sm text-gray-300">
      {description}
    </div>
  );
}