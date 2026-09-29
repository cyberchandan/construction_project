import React from 'react';
import { SEO } from '../../components/common/SEO';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { CostCalculator } from '../../components/public/CostCalculator';
import { MapPin, CheckCircle2 } from 'lucide-react';

export const GreaterNoidaLandingPage = () => {
  return (
    <>
      <SEO
        title="House Construction Company in Greater Noida & Noida Extension"
        description="House construction contractor in Greater Noida & Greater Noida West. Material + labour turnkey contracts & labour-only civil work."
      />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Local Landing Banner */}
        <div className="bg-gradient-to-br from-[#384959] via-[#283542] to-[#384959] text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-[#88BDF2]/40">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#BDDDFC] text-[#384959]">
              <MapPin className="w-3.5 h-3.5 text-[#384959]" />
              <span>Greater Noida & Noida Extension</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              House Construction in Greater Noida
            </h1>

            <p className="text-base text-slate-200 leading-relaxed">
              Serving Greater Noida West (Noida Extension), Alpha, Beta, Gamma, Omega, Zeta, and Yamuna Expressway plots. Complete turnkey material + labour and labour-only structure contracts.
            </p>
          </div>
        </div>

        {/* Localized Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-[#384959]">
              Greater Noida Construction Excellence
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you own a GNIDA allotted plot or authority approved land in Noida Extension, we deliver engineered RCC construction with fixed timeline commitments.
            </p>

            <ul className="space-y-2.5 text-sm">
              {[
                'Coverage of Greater Noida West (Gaur City, Sector 1, 4, 16)',
                'Coverage of Alpha, Beta, Gamma, Delta & Omega Sectors',
                'Material + Labour Turnkey and Labour-Only options',
                'Stage-wise payment milestones linked to progress',
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
          <LeadFormSection initialValues={{ location: 'Greater Noida West' }} source="greater_noida_landing" />
        </div>
      </div>
    </>
  );
};
