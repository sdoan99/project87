import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { TradeForm } from './TradeForm';
import { useTradeSubmit } from '../../../hooks/useTradeSubmit';
import { useParams } from 'react-router-dom';
import { useStrategyProfile } from '../../../hooks/useStrategyProfile';
import { Trade } from '../../../types/trade';
import { useTradeActions } from '../../../hooks/useTradeActions';

interface NewTradeProps {
  onClose: () => void;
  onSubmitSuccess?: () => void;
  initialTrade?: Trade;
}

export function NewTrade({ onClose, onSubmitSuccess, initialTrade }: NewTradeProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { strategyName } = useParams<{ strategyName: string }>();
  const { profile } = useStrategyProfile(strategyName);
  const { submitTrade, updateTrade, deleteTrade } = useTradeSubmit();
  const { actions: initialActions, loading } = useTradeActions(initialTrade?.betId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async (formData: any) => {
    try {
      if (!profile?.id) {
        throw new Error('Strategy profile not found');
      }

      const data = {
        ...formData,
        strategyId: profile.id,
      };

      if (initialTrade?.betId) {
        await updateTrade(initialTrade.betId, data);
      } else {
        await submitTrade(data);
      }

      onSubmitSuccess?.(); // Call the success callback
      onClose();
    } catch (error) {
      console.error('Error saving trade:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (initialTrade?.betId) {
        await deleteTrade(initialTrade.betId);
        onSubmitSuccess?.(); // Call the success callback
        onClose();
      }
    } catch (error) {
      console.error('Error deleting trade:', error);
    }
  };

  if (initialTrade && loading) {
    return (
      <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
        <div className='bg-gray-900/95 rounded-xl w-full max-w-2xl backdrop-blur-sm p-6'>
          <div className='text-center text-gray-400'>Loading trade details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <div ref={modalRef} className='bg-gray-900/95 rounded-xl w-full max-w-2xl backdrop-blur-sm'>
        <div className='flex items-center justify-between p-6'>
          <h2 className='text-xl font-semibold text-gray-200'>
            {initialTrade ? 'Edit Trade' : 'New Trade'}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-white transition-colors rounded-lg p-2 hover:bg-gray-800'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-6 pt-0'>
          <TradeForm
            onClose={onClose}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            initialTrade={initialTrade}
            initialActions={initialActions}
          />
        </div>
      </div>
    </div>
  );
}
