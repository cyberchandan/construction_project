import React from 'react';
import { SEO } from '../../components/common/SEO';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { CheckCircle2, HardHat } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const LabourOnlyServicePage = () => {
  const { settings } = useSettings();
  const rate = settings.calculatorRates?.labourOnlyRate || 500;

  return (
    <>
      <SEO
        title="Labour-Only Civil Construction Contracts in Noida & Greater Noida"
        description="Dedicated labour-only construction work for house building in Noida and Greater Noida. Masons, RCC shuttering, and civil supervision."
      />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="bg-[#384959] text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden border border-[#6A89A7]/40">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#88BDF2] text-[#283542]">
              <HardHat className="w-3.5 h-3.5 text-[#283542]" />
              <span>Labour-Only Civil Contract</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Labour-Only Construction Contracts
            </h1>

            <p className="text-base text-[#BDDDFC] leading-relaxed font-medium">
              Prefer purchasing raw materials yourself? We supply a complete team of master masons, steel bar-benders, RCC shuttering workers, and dedicated site supervisors for independent houses in Noida & Greater Noida.
            </p>

            <div className="pt-2 text-2xl font-bold font-display text-[#88BDF2] bg-[#283542] px-4 py-2 rounded-xl inline-block border border-[#88BDF2]/40">
              Indicative Base Rate: ₹{rate} / sq ft
            </div>
          </div>
        </div>

        {/* Scope & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-[#384959]">
              Labour-Only Scope & Deliverables
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              You provide the raw materials; we handle all execution tools, scaffolding, concrete mixers, shuttering plates, and skilled labour workforce.
            </p>

            <ul className="space-y-3.5 text-sm">
              {[
                'Footing foundation excavation & lean concrete work',
                'RCC column & beam steel binding strictly as per engineer drawing',
                'Slab shuttering framework & concrete pour supervision',
                'Full exterior red brick or AAC block masonry walls',
                'Internal wall double-coat sand-face plastering',
                'Parapet wall construction & terrace waterproofing mortar application',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#88BDF2] flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-[#384959]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <LeadFormSection initialValues={{ serviceType: 'labour_only' }} source="labour_only_page" />
          </div>
        </div>
      </div>
    </>
  );
};

