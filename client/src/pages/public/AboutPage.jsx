import React from 'react';
import { SEO } from '../../components/common/SEO';
import { ShieldCheck, HardHat, Award, Users, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const AboutPage = () => {
  const { settings } = useSettings();

  return (
    <>
      <SEO
        title="About Us | Trusted Noida House Contractor"
        description="Learn about BuildConnect NCR's commitment to structural integrity, transparent contracts, and quality home construction in Noida."
      />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
            About Our Business
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-forest-900">
            Building with Integrity & Transparency
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {settings.businessName} was established to solve the trust deficit in NCR residential construction. We combine senior civil engineering supervision with transparent itemized contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-700 text-sage-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-forest-900">Structural Quality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never compromise on RCC foundation design, cement grades, or steel gauge thickness. Every slab pour undergoes strict slump and curing quality audits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-700 text-sage-300 flex items-center justify-center">
              <HardHat className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-forest-900">Skilled Workforce</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our masons, bar benders, shuttering carpenters, and plumbers have years of experience executing independent houses in Noida & Greater Noida.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest-700 text-sage-300 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-forest-900">Transparent Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hidden charges or surprise mid-project escalation. All material specifications and payment milestones are finalized prior to starting.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
