import React from 'react';
import { HeroSection } from './HeroSection';
import FirstSection from './sections/FirstSection';
import SecondSection from './sections/SecondSection';
import ThirdSection from './sections/ThirdSection';
import FourthSection from './sections/FourthSection';
import { MarqueeDemo } from '../../components/ui/marquee-demo';
import { MarqueeDemo2 } from '../../components/ui/marquee-demo2';
import { FaqSectionDemo } from '../../components/ui/faq-demo';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection />
      
      <div className="py-24 px-4">
        <FirstSection />
      </div>

      <div className="py-24 px-4 bg-gray-900/50">
        <SecondSection />
      </div>

      <div className="py-24">
        <ThirdSection />
      </div>

      <div className="py-24">
        <FourthSection />
      </div>

      <div className="py-24">
        <MarqueeDemo/>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Trading is a Team Sport
      </h1>
      <p className="text-x2 text-gray-400 text-center mb-16">
        Cover all your bases with the latest
      </p>
      <h3 className="text-2xl md:text-2xl font-bold text-white text-center mb-4">
      Open Dialogue to <span className="text-blue-400">Distinguish</span> Actionable Insights vs. Crowd Noise
      </h3>

      <div className="py-24">
        <MarqueeDemo2/>
      </div>

      <div className="py-24">
        <FaqSectionDemo />
      </div>
        
    </div>
  );
}