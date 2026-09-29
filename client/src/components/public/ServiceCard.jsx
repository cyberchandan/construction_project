import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const ServiceCard = ({ title, subtitle, priceTag, features, link, image, isHighlighted }) => {
  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between border-2 ${
        isHighlighted
          ? 'bg-[#384959] text-white border-[#88BDF2] shadow-2xl relative scale-105'
          : 'bg-white text-[#384959] border-slate-200 shadow-xl hover:border-[#6A89A7]'
      }`}
    >
      {isHighlighted && (
        <span className="absolute -top-4 right-6 px-4 py-1.5 bg-[#88BDF2] text-[#384959] font-black text-xs rounded-full uppercase tracking-wider shadow-lg">
          Most Popular in Noida
        </span>
      )}

      <div>
        <div className="rounded-2xl overflow-hidden mb-6 h-52 border border-slate-200/20 shadow-inner">
          <img
            src={image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <span className={`text-xs font-black uppercase tracking-wider block mb-1 ${isHighlighted ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`}>
          {subtitle}
        </span>
        
        <h3 className={`text-2xl font-extrabold font-display mb-2 leading-tight ${isHighlighted ? 'text-white' : 'text-[#384959]'}`}>
          {title}
        </h3>

        <div className="my-4 pb-4 border-b border-slate-200/30 flex items-baseline">
          <span className={`text-3xl font-black font-display tracking-tight ${isHighlighted ? 'text-[#88BDF2]' : 'text-[#384959]'}`}>
            {priceTag}
          </span>
          <span className={`text-xs font-bold ml-1.5 ${isHighlighted ? 'text-[#BDDDFC]' : 'text-slate-500'}`}>
            / sq ft (Indicative)
          </span>
        </div>

        <ul className="space-y-3 mb-8 text-sm">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighlighted ? 'text-[#88BDF2]' : 'text-[#384959]'}`} />
              <span className={`font-bold ${isHighlighted ? 'text-[#BDDDFC]' : 'text-slate-700'}`}>
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={link}
        className={`w-full py-4 px-6 rounded-xl font-extrabold text-sm text-center flex items-center justify-center space-x-2 transition ${
          isHighlighted
            ? 'bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white shadow-lg'
            : 'bg-[#384959] hover:bg-[#6A89A7] text-white shadow-md'
        }`}
      >
        <span>View Details & Specs</span>
        <ArrowRight className="w-4 h-4 text-current" />
      </Link>
    </div>
  );
};
