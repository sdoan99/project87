import React from 'react';

interface DateTimeFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateTimeField({ value, onChange }: DateTimeFieldProps) {
  return (
    <input
      type="datetime-local"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors [color-scheme:dark]"
    />
  );
}