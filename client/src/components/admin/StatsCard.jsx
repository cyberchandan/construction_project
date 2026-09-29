import React from 'react';

export const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'forest' }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-md flex items-center justify-between">
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
          {title}
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold font-display text-forest-900 block tracking-tight">
          {value}
        </span>
        {subtitle && <span className="text-xs font-semibold text-slate-400 mt-1 block">{subtitle}</span>}
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-forest-700 text-sage-300 flex items-center justify-center shadow-md">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
