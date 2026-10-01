import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { HardHat, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <>
      <SEO title="Page Not Found (404)" />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-[#384959] text-[#88BDF2] flex items-center justify-center mx-auto shadow-md">
            <HardHat className="w-9 h-9" />
          </div>

          <h1 className="text-4xl font-extrabold font-display text-forest-900">404</h1>
          <h2 className="text-xl font-bold font-display text-slate-800">Page Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page or route you are attempting to access does not exist or has been relocated.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 w-full py-3.5 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white font-bold text-sm rounded-xl shadow transition"
          >
            <Home className="w-4 h-4 text-sage-300" />
            <span>Return to Home Page</span>
          </Link>
        </div>
      </div>
    </>
  );
};
