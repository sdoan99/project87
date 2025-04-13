import React from 'react';
import { TradingViewWidget } from './TradingViewHeroWidget';
import { AnimatedArrow } from '../../components/common/AnimatedArrow';

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className='relative h-screen flex items-center overflow-hidden'>
      <img
        src='https://i.postimg.cc/KZ15wvVp/Evergreen-Printer-Hero-Bg.png'
        alt='Strategic thinking background'
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-black bg-opacity-0' />
      <div className='relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='w-full md:w-1/3'>
          <h1 className='text-white font-bold leading-tight mb-2'>
            <span className='block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap'>
              Vetted strategies/
            </span>
            <span className='block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl whitespace-nowrap'>
              Open playbooks.
            </span>
          </h1>
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 whitespace-nowrap'>
            Game winning edge starts here
          </p>
          <div className='mt-[100px]'>
            <TradingViewWidget />
          </div>
        </div>
      </div>

      {/* Animated Arrow positioned at bottom center */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        <AnimatedArrow onClick={scrollToContent} />
      </div>
    </section>
  );
}
