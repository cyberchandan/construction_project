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

      <div className="pt-6 pb-12 lg:pt-8 lg:pb-16 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#384959]">
            Recent Construction Projects
          </h1>
          
        </div>

        <PortfolioGrid />
      </div>
    </>
  );
};
