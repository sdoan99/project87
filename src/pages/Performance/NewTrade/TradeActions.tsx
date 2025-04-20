import React from 'react';
import { Plus, X } from 'lucide-react';
import { TradeInputRow } from './TradeInputRow';
import { DateTimeField } from './DateTimeField';
import { TradeAction } from './types';

interface TradeActionsProps {
  actions: TradeAction[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdateAction: (index: number, field: keyof TradeAction, value: any) => void;
}

export function TradeActions({ actions, onAdd, onRemove, onUpdateAction }: TradeActionsProps) {
  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-5 gap-4 text-sm font-medium text-gray-400 px-2'>
        <div className='col-span-1'>Side</div>
        <div className='col-span-1'>Date/Time</div>
        <div className='col-span-1'>Quantity</div>
        <div className='col-span-1'>Price</div>
        <div className='col-span-1'>Fee</div>
      </div>

      <div className='space-y-2'>
        {actions.map((action, index) => (
          <div
            key={index}
            className='grid grid-cols-5 gap-4 items-center bg-gray-800/50 rounded-lg p-2'
          >
            <div className='col-span-1 flex items-center gap-2'>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className='p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors'
              >
                <X className='w-4 h-4' />
              </button>
              <button
                type="button"
                onClick={() =>
                  onUpdateAction(index, 'type', action.type === 'BUY' ? 'SELL' : 'BUY')
                }
                className={`px-4 py-1.5 ${
                  action.type === 'BUY'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                } rounded-lg text-sm font-medium`}
              >
                {action.type}
              </button>
            </div>
            <div className='col-span-1'>
              <DateTimeField
                value={action.date}
                onChange={value => onUpdateAction(index, 'date', value)}
              />
            </div>
            <TradeInputRow
              type='number'
              name='quantity'
              placeholder='0'
              value={action.quantity}
              onChange={e => onUpdateAction(index, 'quantity', Number(e.target.value))}
              className='col-span-1'
              data-testid={`quantity-input-${index}`}
            />
            <TradeInputRow
              type='number'
              name='price'
              placeholder='0.00'
              value={action.price}
              onChange={e => onUpdateAction(index, 'price', Number(e.target.value))}
              className='col-span-1'
              data-testid={`price-input-${index}`}
            />
            <TradeInputRow
              type='number'
              placeholder='0.00'
              value={action.fee}
              onChange={e => onUpdateAction(index, 'fee', Number(e.target.value))}
              className='col-span-1'
            />
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className='flex items-center justify-center w-full gap-2 text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 py-2 rounded-lg transition-colors'
      >
        <Plus className='w-4 h-4' />
        <span>Add Action</span>
      </button>
    </div>
  );
}
