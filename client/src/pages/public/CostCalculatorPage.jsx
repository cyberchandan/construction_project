import React from 'react';
import { SEO } from '../../components/common/SEO';
import { CostCalculator } from '../../components/public/CostCalculator';
import { LeadFormSection } from '../../components/public/LeadFormSection';

export const CostCalculatorPage = () => {
  return (
    <>
      <SEO
        title="Construction Cost Calculator Noida & Greater Noida"
        description="Calculate estimated house construction costs per sq ft in Noida & Greater Noida. Compare Turnkey Material + Labour vs Labour-Only contracts."
      />

      <div className="py-12 lg:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
            Interactive Cost Estimation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-forest-900">
            Construction Cost Calculator
          </h1>
          <p className="text-base text-slate-600">
            Calculate an indicative cost estimate for building your independent house or villa in Noida & Greater Noida.
          </p>
        </div>

        <CostCalculator />

        <div className="max-w-4xl mx-auto pt-8">
          <LeadFormSection source="calculator_page" />
        </div>
      </div>
    </>
  );
};
