import React from 'react';
import { ShieldCheck, CheckCircle2, MessageSquare, ArrowRight, Building2, Award } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const Hero = () => {
  const { settings } = useSettings();

  const waLink = getWhatsAppLink(
    settings.whatsapp || settings.phone,
    `Hello ${settings.businessName}! I am planning to build a house in Noida/Greater Noida. Please provide details.`
  );

  return (
    <section className="relative bg-[#384959] text-white pt-4 pb-8 lg:pt-6 lg:pb-12 overflow-hidden border-b border-[#6A89A7]/30">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#88BDF2_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 bg-[#283542] border border-[#88BDF2]/50 px-4 py-1.5 rounded-full text-xs font-black text-[#BDDDFC] shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#88BDF2]" />
                <span>Verified Local Builder • Noida & Greater Noida</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/50 px-3.5 py-1.5 rounded-full text-xs font-black text-amber-300 shadow-md">
                <Award className="w-4 h-4 text-amber-400" />
                <span>25+ Years Legacy</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-tight tracking-tight text-white">
              Build Your Dream Home with <span className="text-[#88BDF2]">Confidence.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#BDDDFC] max-w-2xl leading-relaxed font-bold">
              Premier house construction Service in Noida & Greater Noida. Offering complete turnkey contracts (material + labour) and dedicated labour-only construction with 100% transparent pricing and structural guarantees.
            </p>

            {/* Core Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-white">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#88BDF2] flex-shrink-0" />
                <span>Turnkey Material & Labour</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-extrabold text-white">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#88BDF2] flex-shrink-0" />
                <span>Labour-Only Contracts</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-extrabold text-white">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#88BDF2] flex-shrink-0" />
                <span>On-Time Delivery</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="#quote-form"
                className="px-6 py-4 bg-[#88BDF2] hover:bg-[#6A89A7] hover:text-white text-[#384959] font-black text-base rounded-xl shadow-xl transition transform hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
              >
                <span>Get a Free Construction Quote</span>
                <ArrowRight className="w-5 h-5 text-current" />
              </a>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#283542] hover:bg-[#6A89A7] text-white font-bold text-base rounded-xl border border-[#6A89A7] transition text-center flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp Us Direct</span>
              </a>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#88BDF2]/40 bg-[#283542]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Villa House Construction in Noida"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#283542] via-transparent to-transparent" />
              
              {/* Floating Highlight Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#384959]/95 backdrop-blur-md p-4 rounded-2xl border border-[#88BDF2]/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#88BDF2] uppercase tracking-wider block">
                    Turnkey Excellence
                  </span>
                  <span className="text-sm font-bold text-white block">
                    RCC Structural Guarantee & Quality Steel
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#88BDF2] flex items-center justify-center text-[#384959] font-bold">
                  <Building2 className="w-5 h-5 text-[#384959]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
