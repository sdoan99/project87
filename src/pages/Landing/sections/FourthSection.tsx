import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeInOnScroll from '../Animation/FadeInOnScroll';

const FourthSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Community Rewards",
      description: "Earn Token Rewards for Education Milestones & Growing with the Platform + other Community Contributions.",
      buttonText: "Learn More",
      image: "https://res.cloudinary.com/dkwandbbk/image/upload/v1743628292/s4-1b_a83jxx.png"
    },
    {
      title: "Member Achievements",
      description: "Generate insights and expand the collective knowledge base. Utilize growth loops to foster community and encourage participation in meaningful discussions.",
      buttonText: "Sign Up",
      image: "https://res.cloudinary.com/dkwandbbk/image/upload/v1743628292/s4-2b_bugsce.png"
    },
    {
      title: "Financial Wellness",
      description: "Promote the mission of building financial literacy, wellness, education, and onboarding new participants around the world.",
      buttonText: "Join the Movement",
      image: "https://res.cloudinary.com/dkwandbbk/image/upload/v1743628292/s4-3b_1_sizsmc.png"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="w-full bg-transparent rounded-2xl shadow-xl p-8 md:p-12 transition-colors duration-300 hover:bg-gray-800 relative">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Content */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 flex flex-col md:flex-row justify-between items-center gap-12"
                style={{ flex: '0 0 100%' }}
              >
                <div className="max-w-md">
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {slide.title}
                  </h3>
                  <p className="text-gray-400 mb-8">
                    {slide.description}
                  </p>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors duration-200">
                    {slide.buttonText}
                  </button>
                </div>
                <FadeInOnScroll className="w-full md:w-1/2">
                  <img 
                    src={slide.image}
                    alt={slide.title}
                    className="rounded-lg transition-all duration-500 transform hover:scale-105"
                  />
                </FadeInOnScroll>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-6' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourthSection;