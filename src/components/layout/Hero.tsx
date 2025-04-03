import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <h1 className="text-6xl font-bold text-white tracking-tight">
          Hello World
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          Your gateway to smarter trading and financial success. Join our community of traders and investors today.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}