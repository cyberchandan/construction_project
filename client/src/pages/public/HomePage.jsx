import React from 'react';
import { SEO } from '../../components/common/SEO';
import { Hero } from '../../components/public/Hero';
import { ServiceCard } from '../../components/public/ServiceCard';
import { CostCalculator } from '../../components/public/CostCalculator';
import { PortfolioGrid } from '../../components/public/PortfolioGrid';
import { ProcessSteps } from '../../components/public/ProcessSteps';
import { VerifiedTestimonials } from '../../components/public/VerifiedTestimonials';
import { FAQSection } from '../../components/public/FAQSection';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { LocalSchema } from '../../components/public/LocalSchema';
import { useSettings } from '../../context/SettingsContext';

export const HomePage = () => {
  const { settings } = useSettings();

  const handleCalculatorQuoteRequest = (calcData) => {
    const formEl = document.getElementById('quote-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Build Your Dream Home with Confidence"
        description="Premier house construction company serving Noida and Greater Noida. Turnkey material + labour contracts and labour-only civil work."
      />
      <LocalSchema />

      <div className="space-y-16 lg:space-y-24 pb-16">
        {/* Hero Banner Section */}
        <Hero />

        {/* Core Services Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-[#6A89A7] uppercase tracking-wider">
              Transparent Contract Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#384959]">
              Our Primary Construction Services
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Tailored to your budget and material preferences in Noida & Greater Noida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ServiceCard
              title="Material + Labour Contract"
              subtitle="Turnkey Solution"
              priceTag={`₹${settings.calculatorRates?.materialLabourRate || 1800}`}
              features={[
                'Complete civil structure + interior/exterior finishing',
                'Branded materials: Tata Tiscon steel, UltraTech cement',
                'Architectural drawing creation & 3D elevation',
                'Turnkey key handover with quality warranty',
              ]}
              link="/services/material-plus-labour"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              isHighlighted={true}
            />

            <ServiceCard
              title="Labour-Only Contract"
              subtitle="Civil Structure Work"
              priceTag={`₹${settings.calculatorRates?.labourOnlyRate || 500}`}
              features={[
                'Complete skilled masonry, RCC & brickwork labour',
                'Full footing foundation, column & slab casting',
                'Client supplies raw materials; we provide tools & supervision',
                'Strict compliance with structural engineering drawings',
              ]}
              link="/services/labour-only"
              image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
              isHighlighted={false}
            />
          </div>
        </section>

        {/* Cost Calculator Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostCalculator onRequestQuote={handleCalculatorQuoteRequest} />
        </section>

        {/* Portfolio Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#6A89A7] uppercase tracking-wider">
              Our Recent Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#384959]">
              Completed Construction Projects
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Explore recent independent houses and villas constructed across Noida and Greater Noida.
            </p>
          </div>

          <PortfolioGrid />
        </section>

        {/* Process Steps Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-slate-200/50 p-8 sm:p-12 rounded-3xl border border-slate-300/60 shadow-sm">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#6A89A7] uppercase tracking-wider">
              Transparent Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#384959]">
              Our 4-Step Construction Workflow
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              From site survey to structural handover, we maintain 100% transparency.
            </p>
          </div>

          <ProcessSteps />
        </section>

        {/* Quotation Lead Form Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadFormSection source="homepage_main" />
        </section>

        {/* Verified Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VerifiedTestimonials />
        </section>

        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#6A89A7] uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold font-display text-[#384959]">
              Frequently Asked Questions
            </h2>
          </div>

          <FAQSection />
        </section>
      </div>
    </>
  );
};
