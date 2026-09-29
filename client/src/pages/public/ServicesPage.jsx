import React from 'react';
import { SEO } from '../../components/common/SEO';
import { ServiceCard } from '../../components/public/ServiceCard';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { useSettings } from '../../context/SettingsContext';

export const ServicesPage = () => {
  const { settings } = useSettings();

  return (
    <>
      <SEO
        title="Construction Services"
        description="Turnkey Material + Labour and Labour-Only construction services in Noida & Greater Noida."
      />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
            Our Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-forest-900">
            House Construction Services
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Whether you want a complete turnkey construction contract or experienced civil labour for your raw materials, we provide reliable, engineered execution across Noida and Greater Noida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ServiceCard
            title="Material + Labour Contract"
            subtitle="Complete Turnkey Solution"
            priceTag={`₹${settings.calculatorRates?.materialLabourRate || 1800}`}
            features={[
              'Structural RCC design + architectural planning',
              'Raw material procurement (Tata Tiscon steel, UltraTech cement, red bricks)',
              'Concealed plumbing and electrical conduits',
              'Flooring tiles, wall plaster, paint & bathroom fittings',
              'Quality inspection and stage-wise handover',
            ]}
            link="/services/material-plus-labour"
            image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            isHighlighted={true}
          />

          <ServiceCard
            title="Labour-Only Civil Work"
            subtitle="Structure & Masonry Work"
            priceTag={`₹${settings.calculatorRates?.labourOnlyRate || 500}`}
            features={[
              'Dedicated team of experienced masons, bar-benders & RCC labourers',
              'Footing foundation, beam casting, column framework & slab pouring',
              'Brick masonry & external double-coat plastering',
              'Client purchases materials; we handle execution, shuttering & supervision',
              'Strict adherence to engineering drawing dimensions',
            ]}
            link="/services/labour-only"
            image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
            isHighlighted={false}
          />
        </div>

        <div className="max-w-4xl mx-auto pt-8">
          <LeadFormSection source="services_page" />
        </div>
      </div>
    </>
  );
};
