import React from 'react';
import { SEO } from '../../components/common/SEO';
import { PortfolioGrid } from '../../components/public/PortfolioGrid';

export const ProjectsGalleryPage = () => {
  return (
    <>
      <SEO
        title="Recent Construction Projects Gallery in Noida"
        description="Browse completed independent houses, luxury villas, and G+2 residential construction contracts in Noida and Greater Noida."
      />

      <div className="py-12 lg:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#6A89A7] uppercase tracking-wider">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#384959]">
            Recent Construction Projects
          </h1>
          <p className="text-base text-slate-600 font-medium">
            Explore independent house constructions and turnkey villa contracts completed across Noida & Greater Noida.
          </p>
        </div>

        <PortfolioGrid />
      </div>
    </>
  );
};
