import React from 'react';
import CreateForm from './CreateForm';
import { Lightbulb } from 'lucide-react';

export default function Create() {
  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-600/10 rounded-full">
              <Lightbulb className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Create Your Strategy
          </h1>
          <p className="text-gray-400 text-lg">
            Share your trading expertise with the community. Define your strategy's parameters
            and help others succeed in their trading journey.
          </p>
        </div>

        {/* Form Section */}
        <div className="mt-8">
          <CreateForm />
        </div>
      </div>
    </div>
  );
}