import React from 'react';
import { SEO } from '../../components/common/SEO';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const MaterialLabourServicePage = () => {
  const { settings } = useSettings();
  const rate = settings.calculatorRates?.materialLabourRate || 1800;

  return (
    <>
      <SEO
        title="Turnkey Material + Labour Construction Contracts in Noida"
        description="Complete turnkey residential house construction contracts in Noida and Greater Noida using Grade-A cement, steel, and branded fixtures."
      />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="bg-[#384959] text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden border border-[#6A89A7]/40">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#88BDF2] text-[#283542]">
              <Sparkles className="w-3.5 h-3.5 text-[#283542]" />
              <span>Turnkey Home Construction</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Material + Labour Construction Contracts
            </h1>

            <p className="text-base text-[#BDDDFC] leading-relaxed font-medium">
              Hassle-free complete house construction in Noida & Greater Noida. We manage raw material sourcing, structural engineering, architectural blueprints, skilled labour, and turnkey finishing.
            </p>

            <div className="pt-2 text-2xl font-bold font-display text-[#88BDF2] bg-[#283542] px-4 py-2 rounded-xl inline-block border border-[#88BDF2]/40">
              Indicative Base Rate: ₹{rate} / sq ft
            </div>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-[#384959]">
              What Is Included in Turnkey Material + Labour Contract?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              We take full responsibility for your project from foundation excavating to key handover. Every material brand and steel gauge is explicitly stated in our contract before work starts.
            </p>

            <ul className="space-y-3.5 text-sm">
              {[
                'Steel: Tata Tiscon / Jindal Panther TMT Fe550 bars for RCC structure',
                'Cement: UltraTech / ACC / Ambuja 53 Grade OPC & PPC',
                'Bricks & Blocks: First Class kiln-fired Red Bricks or AAC Blocks',
                'Plumbing: Concealed Astral / Supreme CPVC pipes with Jaquar fittings',
                'Electrical: Polycab / Havells FRLS copper wires with modular switches',
                'Flooring: 2x2 Vitrified tiles or Italian marble finish',
                'Paint: Asian Paints Apex weather-proof exterior & Royal interior finish',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#88BDF2] flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-[#384959]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <LeadFormSection initialValues={{ serviceType: 'material_labour' }} source="material_labour_page" />
          </div>
        </div>
      </div>
    </>
  );
};

