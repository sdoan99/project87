import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUserProfile } from '../../hooks/useUserProfile';
import { supabase } from '../../lib/supabase';
import PrivacySettings from './PrivacySettings';

const markets = [
  'Stocks & Equities',
  'Options & Derivatives',
  'Cryptocurrency',
  'Forex',
  'Sports Analytics',
  'Alternatives',
];

const categories = [
  'Trend Analysis',
  'Harmonic Pattern',
  'Chart Pattern',
  'Technical Indicators',
  'Wave Analysis',
  'Gann',
  'Fundamental Analysis',
  'Beyond Technical Analysis',
];

const timeframes = [
  '1 Minute',
  '5 Minutes',
  '15 Minutes',
  '1 Hour',
  '4 Hour',
  'Daily',
  'Weekly',
  'Monthly',
  'Longterm Buy',
];

export default function CreateForm() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { username } = useUserProfile();
  const [isPublic, setIsPublic] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTimeframes, setSelectedTimeframes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleMarketChange = (market: string) => {
    setSelectedMarkets(prev =>
      prev.includes(market) ? prev.filter(m => m !== market) : [...prev, market]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframes(prev =>
      prev.includes(timeframe) ? prev.filter(t => t !== timeframe) : [...prev, timeframe]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('You must be logged in to create a strategy');
      return;
    }

    if (!name.trim()) {
      setError('Strategy name is required');
      return;
    }

    if (selectedMarkets.length === 0) {
      setError('Please select at least one market');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    if (selectedTimeframes.length === 0) {
      setError('Please select at least one timeframe');
      return;
    }

    try {
      const { error: insertError } = await supabase.from('strategy_profile').insert([
        {
          user_id: user.id,
          username: username, // Include the username
          name: name.trim(),
          description: description.trim(),
          market_types: selectedMarkets.join(','),
          timeframes: selectedTimeframes.join(','),
          categories: selectedCategories.join(','),
          public: isPublic.toString(),
        },
      ]);

      if (insertError) throw insertError;

      navigate('/strategy');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-8 text-gray-100 max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl'
    >
      {error && (
        <div className='bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 text-sm'>
          {error}
        </div>
      )}

      <PrivacySettings isPublic={isPublic} onChange={setIsPublic} />

      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-2 text-gray-200'>
          Strategy Name
        </label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Enter strategy name'
          className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label htmlFor='description' className='block text-sm font-medium mb-2 text-gray-200'>
          Strategy Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Describe your strategy'
          rows={4}
          className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <h3 className='text-sm font-medium mb-4 text-gray-200'>Market (Select at least one)</h3>
        <div className='grid grid-cols-2 gap-4'>
          {markets.map(market => (
            <div key={market} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id={`market-${market}`}
                checked={selectedMarkets.includes(market)}
                onChange={() => handleMarketChange(market)}
                className='w-4 h-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500'
              />
              <label
                htmlFor={`market-${market}`}
                className='text-sm text-gray-300 hover:text-gray-100 cursor-pointer'
              >
                {market}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium mb-4 text-gray-200'>Category (Select at least one)</h3>
        <div className='grid grid-cols-2 gap-4'>
          {categories.map(category => (
            <div key={category} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className='w-4 h-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500'
              />
              <label
                htmlFor={`category-${category}`}
                className='text-sm text-gray-300 hover:text-gray-100 cursor-pointer'
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium mb-4 text-gray-200'>Timeframes (Select at least one)</h3>
        <div className='grid grid-cols-2 gap-4'>
          {timeframes.map(timeframe => (
            <div key={timeframe} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id={`timeframe-${timeframe}`}
                checked={selectedTimeframes.includes(timeframe)}
                onChange={() => handleTimeframeChange(timeframe)}
                className='w-4 h-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500'
              />
              <label
                htmlFor={`timeframe-${timeframe}`}
                className='text-sm text-gray-300 hover:text-gray-100 cursor-pointer'
              >
                {timeframe}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium'
      >
        Create Strategy
      </button>
    </form>
  );
}
