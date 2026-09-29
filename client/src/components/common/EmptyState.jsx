import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({ title = 'No records found', description = 'There are no items matching your criteria.', action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300 my-4">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <FolderOpen className="w-6 h-6 text-slate-500" />
      </div>
      <h4 className="text-base font-bold text-slate-800 font-display mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
