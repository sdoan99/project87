import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AnimatedArrowProps {
  onClick?: () => void;
  className?: string;
}

export function AnimatedArrow({ onClick, className = '' }: AnimatedArrowProps) {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer animate-bounce ${className}`}
      aria-label="Scroll down"
      role="button"
      tabIndex={0}
    >
      <ChevronDown 
        className="w-8 h-8 text-white/80 hover:text-white transition-colors"
      />
    </div>
  );
}