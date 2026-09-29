import React from 'react';
import { SEO } from '../../components/common/SEO';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { CostCalculator } from '../../components/public/CostCalculator';
import { MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const NoidaLandingPage = () => {
  return (
    <>
      <SEO
        title="House Construction Company in Noida (Sectors 62, 137, 150)"
        description="Premier house construction company in Noida. Turnkey material + labour contracts and labour-only civil work for Noida sectors."
      />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Local Landing Banner */}
        <div className="bg-gradient-to-br from-[#384959] via-[#283542] to-[#384959] text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-[#88BDF2]/40">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#BDDDFC] text-[#384959]">
              <MapPin className="w-3.5 h-3.5 text-[#384959]" />
              <span>Dedicated Local Contractor • Noida City</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              House Construction Services in Noida
            </h1>

            <p className="text-base text-slate-200 leading-relaxed">
              Build your residential house or villa in Noida (Sectors 62, 137, 150, 128, 108 & Noida Expressway). Offering RCC structural guarantees, transparent material brands, and stage-wise payment milestones.
            </p>
          </div>
        </div>

        {/* Localized Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-[#384959]">
              Why Build with Us in Noida?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Noida soil conditions require engineered raft/footing foundations and strict compliance with NOIDA authority building bylaws. We ensure earthquake-resistant RCC frame construction and transparent civil contracts.
            </p>

            <ul className="space-y-2.5 text-sm">
              {[
                'Full compliance with NOIDA Authority ground coverage & setback rules',
                'Grade A materials: Tata Tiscon steel, UltraTech cement, red clay bricks',
                'On-site senior civil engineer supervision',
                'Transparent contracts with zero hidden cost clauses',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#6A89A7] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <CostCalculator />
        </div>

        <div className="max-w-4xl mx-auto pt-4">
          <LeadFormSection initialValues={{ location: 'Sector 150 Noida' }} source="noida_local_landing" />
        </div>
      </div>
    </>
  );
};
