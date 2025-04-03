import React from 'react';
import { Lock } from 'lucide-react';

interface PrivacySettingsProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

export default function PrivacySettings({ isPublic, onChange }: PrivacySettingsProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-200">Privacy Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md border transition-colors ${
            isPublic
              ? 'bg-gray-700 border-blue-500 text-white'
              : 'border-gray-600 text-gray-400 hover:border-gray-500'
          }`}
        >
          <span>Public</span>
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md border transition-colors ${
            !isPublic
              ? 'bg-gray-700 border-blue-500 text-white'
              : 'border-gray-600 text-gray-400 hover:border-gray-500'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Private</span>
        </button>
      </div>
      <p className="text-sm text-gray-400">
        {isPublic
          ? "The idea will be visible to all. It'll be listed on public pages (homepage, your profile)."
          : "The idea will only be visible to you and people you share it with."}
      </p>
    </div>
  );
}