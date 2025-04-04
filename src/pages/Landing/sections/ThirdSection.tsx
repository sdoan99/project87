import React from 'react';
import { useInView } from 'react-intersection-observer';
import FloatingElements from '../Animation/FloatingElements';

const ThirdSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div 
      ref={ref}
      className="w-full min-h-[600px] relative flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* Floating Elements */}
      <FloatingElements inView={inView} />

      {/* Centered Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
      <h3 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="text-blue-400">StratsPro</span>
          <span className="text-white"> is the platform with educational resources, </span>
          <span className="text-blue-400">trading tools</span>
          <span className="text-white">, live </span>
          <span className="text-blue-400">market insights</span>
          <span className="text-white">, and real news.</span>

        </h3>
      </div>
    </div>
  );
};

export default ThirdSection;