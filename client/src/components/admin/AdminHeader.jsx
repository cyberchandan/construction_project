import React from 'react';
import { Menu, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ title, onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-1xl sm:text-2xl font-bold font-display text-[#384959] leading-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center space-x-1 text-xs font-semibold text-[#384959] bg-[#BDDDFC]/30 border border-[#88BDF2]/40 hover:bg-[#BDDDFC]/60 py-1.5 px-3 rounded-lg transition"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#384959]" />
        </Link>

        <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">{user?.name}</span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            {user?.role}
          </span>
        </div>
      </div>
    </header>
  );
};
