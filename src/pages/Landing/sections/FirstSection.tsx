import React from 'react';
import { Grid, MessageSquare } from 'lucide-react';
import FadeInOnScroll from '../Animation/FadeInOnScroll';

const FirstSection = () => {
  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col items-center'>
      {/* Inline CSS for hover effects */}
      <style jsx>{`
        .feature-group:hover + .image-container .strategy-sort {
          border: 4px solid #60a5fa; /* blue-400 */
        }
        .feature-group:hover + .image-container .key-stats {
          border: 4px solid #f87171; /* red-400 */
        }
        /* Ensure the border doesn't affect layout */
        .image-container img {
          box-sizing: border-box;
        }
      `}</style>

      {/* Main Header */}
      <h1 className='text-4xl md:text-5xl font-bold text-white text-center mb-4'>
        Proven Performance.
      </h1>
      <p className='text-xl text-gray-400 text-center mb-16'>
        Unlock market insights and level up your financial game.
      </p>

      {/* Features Container */}
      <div className='w-full bg-transparent rounded-2xl shadow-xl p-8 md:p-12 grid grid-rows-[auto_1fr] gap-12 transition-colors duration-300 hover:bg-gray-800'>
        {/* Features Grid */}
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Groups Feature */}
          <div
            className='flex flex-col items-start feature-group'
            data-image-target='strategy-sort'
          >
            <div className='bg-blue-900/50 p-3 rounded-lg mb-4'>
              <Grid className='w-8 h-8 text-blue-400' />
            </div>
            <h2 className='text-2xl font-semibold mb-2 text-white'>
              Open sourced and <span className='text-blue-400'>Historically tested</span> PnL to see
              what strategies are real and what is social media hype
            </h2>
          </div>

          {/* Threads Feature */}
          <div className='flex flex-col items-start feature-group' data-image-target='key-stats'>
            <div className='bg-red-900/50 p-3 rounded-lg mb-4'>
              <MessageSquare className='w-8 h-8 text-red-400' />
            </div>
            <h2 className='text-2xl font-semibold mb-2 text-white'>
              Save <span className='text-blue-400'>time and money</span> with access to transparent
              research, backtesting, and verified reviews
            </h2>
          </div>
        </div>

        {/* Image Elements */}
        <FadeInOnScroll className='relative mt-8 px-4 sm:px-6 lg:px-8 image-container'>
          <div className='relative flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto'>
            <img
              src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743541332/S1-stratsort_fpov6v.png'
              alt='Strategy Sort'
              className='w-full sm:w-1/2 h-auto object-contain rounded-lg shadow-lg transform -translate-y-6 hover:scale-105 transition-transform strategy-sort'
            />
            <img
              src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743541332/s1-keystats_mnxf3b.png'
              alt='Key Stats'
              className='w-full sm:w-1/2 h-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform key-stats'
            />
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
};

export default FirstSection;
