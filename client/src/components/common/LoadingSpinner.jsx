import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ label = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-3 py-8">
      <Loader2 className="w-9 h-9 text-gold-500 animate-spin" />
      <span className="text-sm font-semibold text-navy-900">{label}</span>
    </div>
  );

  if (fullScreen) {
    return <div className="min-h-[60vh] flex items-center justify-center">{content}</div>;
  }

  return content;
};
