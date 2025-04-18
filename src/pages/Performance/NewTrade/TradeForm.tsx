import React from 'react';
import { MarketSelect } from './MarketSelect';
import { TradeActions } from './TradeActions';
import { TradeInputRow } from './TradeInputRow';
import { DateTimeField } from './DateTimeField';
import { useTradeForm } from './useTradeForm';
import { Trade, TradeAction } from '../../../types/trade';

interface TradeFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialTrade?: Trade;
  initialActions?: TradeAction[];
}

export function TradeForm({
  onClose,
  onSubmit,
  onDelete,
  initialTrade,
  initialActions,
}: TradeFormProps) {
  const {
    market,
    setMarket,
    sector,
    setSector,
    symbol,
    setSymbol,
    expiration,
    setExpiration,
    actions,
    handleAddAction,
    handleRemoveAction,
    handleUpdateAction,
    isValid,
    error,
  } = useTradeForm(initialTrade, initialActions);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const formData = {
        market,
        sector,
        symbol,
        expiration,
        actions,
      };

      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {error && (
        <div className='bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-4 gap-4 items-end'>
        <MarketSelect value={market} onChange={setMarket} />
        <TradeInputRow
          label='Sector'
          placeholder='Enter sector'
          value={sector}
          onChange={e => setSector(e.target.value)}
        />
        <TradeInputRow
          label='Symbol'
          placeholder='Enter symbol'
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          required
        />
        <div>
          <label className='block text-sm font-medium text-gray-400 mb-1.5'>Expiration</label>
          <DateTimeField value={expiration} onChange={setExpiration} />
        </div>
      </div>

      <TradeActions
        actions={actions}
        onAdd={handleAddAction}
        onRemove={handleRemoveAction}
        onUpdateAction={handleUpdateAction}
      />

      <div className='flex justify-between pt-4'>
        <div className='flex gap-2'>
          <button
            type='button'
            className='px-6 py-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors'
            onClick={onClose}
          >
            Cancel
          </button>
          {initialTrade && onDelete && (
            <button
              type='button'
              onClick={onDelete}
              className='px-6 py-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors'
            >
              Delete
            </button>
          )}
        </div>
        <button
          type='submit'
          disabled={!isValid}
          className={`px-6 py-2.5 rounded-lg transition-colors ${
            isValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {initialTrade ? 'Update Trade' : 'Save Trade'}
        </button>
      </div>
    </form>
  );
}
