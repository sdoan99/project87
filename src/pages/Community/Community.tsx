import React from 'react';
import { HyvorNewsletter } from '../../components/comments/HyvorNewsletter';

export default function Community() {
  return (
    <div className='min-h-screen bg-gray-900 pt-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-4xl md:text-5xl font-bold text-white text-center mb-4'>
          Financial <span className='text-blue-400'>Wellness</span> Coming Soon
        </h1>

        <h1 className='text-4xl md:text-5xl font-bold text-white text-center mb-4'>
          Cash Us If You Can:
        </h1>
        <p className='text-x2 text-gray-400 text-center mb-16'>
          We're still balancing our books—and our lives. Launching soon to stop your budget from
          ghosting you. Thanks for bearing with US.
        </p>

        {/* Add newsletter subscription form */}
        <div className="max-w-2xl mx-auto">
          <HyvorNewsletter />
        </div>
      </div>
    </div>
  );
}
