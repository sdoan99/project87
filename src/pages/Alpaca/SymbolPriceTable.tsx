import React from 'react';

interface SymbolPriceTableProps {
  symbolInput: string;
  setSymbolInput: (value: string) => void;
  price: number | string | undefined;
  symbolData?: Record<string, any>;
}

export function SymbolPriceTable({
  symbolInput,
  setSymbolInput,
  price,
  symbolData,
}: SymbolPriceTableProps) {
  return (
    <>
      <div className='flex justify-center items-center mt-16'>
        <table className='border border-black min-w-[220px]'>
          <tbody>
            <tr>
              <td className='border border-black px-4 py-2 font-semibold text-sm text-left'>
                SYMBOL
              </td>
              <td className='border border-black px-4 py-2'>
                <input
                  type='text'
                  value={symbolInput}
                  onChange={e => setSymbolInput(e.target.value)}
                  className='w-20 px-2 py-1 border border-gray-300 rounded text-black bg-white focus:outline-none focus:border-blue-400'
                  placeholder='xxx'
                />
              </td>
            </tr>
            <tr>
              <td className='border border-black px-4 py-2 font-semibold text-sm text-left'>P</td>
              <td className='border border-black px-4 py-2 text-right min-w-[80px]'>
                {price !== undefined ? `$${price}` : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Debug: Show full data object for entered symbol */}
      {symbolInput && symbolData && (
        <div className='mt-4 text-xs text-gray-300 text-center'>
          <span className='font-mono'>{JSON.stringify(symbolData, null, 2)}</span>
        </div>
      )}
    </>
  );
}
