import React from 'react';
import FadeInOnScroll from '../Animation/FadeInOnScroll';

const SecondSection = () => {
  return (
    <div className='w-full max-w-6xl mx-auto'>
      {/* Header */}
      <div className='text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>Refined Metrics.</h2>
        <p className='text-xl text-gray-400'>
          Match risk strategies to various investing/trading goals.
        </p>
      </div>

      {/* Content Container */}
      <div className='w-full bg-transparent rounded-2xl shadow-xl p-8 md:p-12 transition-colors duration-300 hover:bg-gray-800'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
          {/* Left Content */}
          <div className='max-w-md'>
            <h3 className='text-3xl font-bold mb-4 text-white'>
              Discover new <span className='text-blue-400'>emerging markets</span> and
              <span className='text-blue-400'> evolving asset</span> classes.
            </h3>
            <div className='space-y-4 text-gray-400'>
              <p>
                Unlock opportunities across stocks, crypto, and alternative investments with
                real-time data and expert-backed insights.
              </p>

              <p>
                Our platform keeps you ahead of trends, so you can confidently navigate dynamic
                markets.
              </p>
            </div>
          </div>

          {/* Right Decorative Elements */}
          <FadeInOnScroll className='relative w-full md:w-1/2 h-64 px-4 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-center gap-4 max-w-7xl mx-auto'>
              <img
                src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743539942/s2-newassets_ehdru1.png'
                alt='New Assets'
                className='w-full h-auto object-contain rounded-lg shadow-lg transform -translate-y-6 hover:scale-105 transition-transform'
              />
            </div>
          </FadeInOnScroll>
        </div>
      </div>

      {/* Feed Section */}
      <div className='mt-16 w-full bg-transparent rounded-2xl shadow-xl p-8 md:p-12 transition-colors duration-300 hover:bg-gray-800'>
        <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12'>
          {/* Right Content */}
          <div className='max-w-md'>
            <h3 className='text-3xl font-bold mb-4'>
              Find the <span className='text-blue-400'>right trade</span>,
              <span className='text-white'> at the right time.</span>
            </h3>
            <div className='space-y-4 text-gray-400'>
              <p>
                Stay ahead and leverage market insights with signals, market analysis, and
                performance tracking.{' '}
              </p>
              <p>
                Our platform ensures you never miss an opportunity by delivering accurate insights
                tailored to every risk profile and strategy.
              </p>
            </div>
          </div>

          {/* Left Image/Placeholder */}
          <FadeInOnScroll className='relative w-full md:w-1/2 aspect-video px-4 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-center gap-4 max-w-7xl mx-auto'>
              <img
                src='https://res.cloudinary.com/dkwandbbk/image/upload/v1743542488/s2-tradealertblue_gtstry.png'
                alt='Trade Interface'
                className='w-full h-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform'
              />
            </div>
          </FadeInOnScroll>
        </div>
      </div>

      {/* CTA Button */}
      <div className='mt-16 flex justify-center'>
        <button className='bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold border border-gray-700 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2'>
          Join the waitlist
          <span className='text-xl'>→</span>
        </button>
      </div>
    </div>
  );
};

export default SecondSection;
