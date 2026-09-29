import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldAlert } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { formatCurrencyINR } from '../../utils/formatters';

export const CostCalculator = ({ onRequestQuote }) => {
  const { settings } = useSettings();

  const [areaSqFt, setAreaSqFt] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [contractType, setContractType] = useState('material_labour');

  const rates = settings.calculatorRates || { materialLabourRate: 1800, labourOnlyRate: 500 };
  const currentRate = contractType === 'material_labour' ? rates.materialLabourRate : rates.labourOnlyRate;

  const totalBuiltArea = Number(areaSqFt || 0) * Number(floors || 1);
  const estimatedTotalCost = totalBuiltArea * currentRate;

  const handleRequestQuoteClick = () => {
    if (onRequestQuote) {
      onRequestQuote({
        areaSqFt,
        floors,
        serviceType: contractType,
        budget: formatCurrencyINR(estimatedTotalCost),
      });
    } else {
      const el = document.getElementById('quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#384959] via-[#283542] to-[#384959] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl border border-[#88BDF2]/40 relative overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#88BDF2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#88BDF2] flex items-center justify-center text-[#384959] font-bold shadow-lg">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-display text-white">
            Construction Cost Calculator
          </h3>
          <p className="text-xs text-[#BDDDFC] font-bold">
            Instant indicative estimate for house construction in Noida & Greater Noida
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contract Type Selection */}
          <div>
            <label className="block text-xs font-extrabold text-[#BDDDFC] uppercase tracking-wider mb-2">
              Select Contract Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setContractType('material_labour')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  contractType === 'material_labour'
                    ? 'bg-[#88BDF2] text-[#384959] border-[#88BDF2] font-extrabold shadow-md'
                    : 'bg-[#283542]/80 text-slate-200 border-[#6A89A7]/40 hover:border-[#88BDF2]'
                }`}
              >
                <span className="block text-sm font-bold">Material + Labour</span>
                <span className="block text-[11px] opacity-90 font-medium">
                  Turnkey complete structure & finishing
                </span>
              </button>

              <button
                type="button"
                onClick={() => setContractType('labour_only')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  contractType === 'labour_only'
                    ? 'bg-[#88BDF2] text-[#384959] border-[#88BDF2] font-extrabold shadow-md'
                    : 'bg-[#283542]/80 text-slate-200 border-[#6A89A7]/40 hover:border-[#88BDF2]'
                }`}
              >
                <span className="block text-sm font-bold">Labour-Only Work</span>
                <span className="block text-[11px] opacity-90 font-medium">
                  Masonry, RCC & civil labour only
                </span>
              </button>
            </div>
          </div>

          {/* Area Per Floor Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-extrabold text-[#BDDDFC] uppercase tracking-wider">
                Plot / Built Area Per Floor (sq ft)
              </label>
              <span className="text-sm font-bold text-[#88BDF2]">{areaSqFt} sq ft</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="50"
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(Number(e.target.value))}
              className="w-full accent-[#88BDF2] h-2 bg-[#283542] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-300 mt-1 font-bold">
              <span>500 sq ft</span>
              <span>2,500 sq ft</span>
              <span>5,000 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          {/* Number of Floors */}
          <div>
            <label className="block text-xs font-extrabold text-[#BDDDFC] uppercase tracking-wider mb-2">
              Number of Floors
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFloors(num)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition ${
                    floors === num
                      ? 'bg-[#88BDF2] text-[#384959] border-[#88BDF2] shadow-md'
                      : 'bg-[#283542] text-slate-200 border-[#6A89A7]/40 hover:bg-[#6A89A7]'
                  }`}
                >
                  {num === 1 ? 'G (1)' : num === 2 ? 'G+1 (2)' : num === 3 ? 'G+2 (3)' : `G+${num - 1}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Display Column */}
        <div className="lg:col-span-5 bg-[#283542]/90 border border-[#88BDF2]/40 p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-4">
            <span className="text-xs font-extrabold text-[#BDDDFC] uppercase tracking-wider block">
              Estimated Cost Breakdown
            </span>

            <div className="space-y-2 border-b border-[#6A89A7]/30 pb-4 text-xs text-slate-200 font-bold">
              <div className="flex justify-between">
                <span>Configured Base Rate:</span>
                <span className="font-extrabold text-white">₹{currentRate} / sq ft</span>
              </div>
              <div className="flex justify-between">
                <span>Total Built-up Area ({floors} floors):</span>
                <span className="font-extrabold text-white">{totalBuiltArea.toLocaleString()} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Contract Mode:</span>
                <span className="font-extrabold text-[#88BDF2]">
                  {contractType === 'material_labour' ? 'Material + Labour' : 'Labour Only'}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-xs text-slate-300 font-bold block mb-1">Estimated Indicative Total</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#88BDF2] tracking-tight">
                {formatCurrencyINR(estimatedTotalCost)}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRequestQuoteClick}
              className="w-full py-3.5 px-4 bg-[#88BDF2] hover:bg-[#6A89A7] hover:text-white text-[#384959] font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm"
            >
              <span>Request Detailed Formal Quotation</span>
              <ArrowRight className="w-4 h-4 text-current" />
            </button>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-300 leading-snug flex items-start space-x-1.5 pt-1 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
              <span>
                {settings.calculatorDisclaimer ||
                  'Indicative estimate only. Actual costs depend on site conditions, structural drawings, material specifications, and exclusions.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
