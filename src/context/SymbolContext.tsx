import React, { createContext, useContext, useState } from 'react';

interface SymbolContextType {
  activeSymbol: string;
  setActiveSymbol: (symbol: string) => void;
}

const SymbolContext = createContext<SymbolContextType>({
  activeSymbol: 'CRYPTO:BTCUSD',
  setActiveSymbol: () => {},
});

export function SymbolProvider({ children }: { children: React.ReactNode }) {
  const [activeSymbol, setActiveSymbol] = useState('CRYPTO:BTCUSD');

  return (
    <SymbolContext.Provider value={{ activeSymbol, setActiveSymbol }}>
      {children}
    </SymbolContext.Provider>
  );
}

export const useSymbol = () => useContext(SymbolContext);
