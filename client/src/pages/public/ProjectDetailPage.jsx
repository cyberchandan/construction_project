import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProject(data.project);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner fullScreen label="Loading project details..." />;

  if (!project) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-sm text-slate-500">The requested portfolio project could not be found.</p>
        <Link to="/projects" className="inline-block px-5 py-2.5 bg-forest-700 text-white rounded-xl text-xs font-bold">
          Back to Projects Gallery
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={project.title} description={project.description} />

      <div className="py-12 lg:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/projects" className="inline-flex items-center space-x-1.5 text-xs font-bold text-forest-700 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Gallery</span>
        </Link>

        <div className="space-y-4">
          <span className="px-3 py-1 bg-forest-100 text-forest-800 rounded-md text-xs font-bold uppercase">
            {project.serviceType === 'material_labour' ? 'Turnkey Material + Labour' : 'Labour Only Civil Work'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-forest-900">{project.title}</h1>
          <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-forest-700" />
              <span>{project.location}</span>
            </span>
            <span>•</span>
            <span>Plot Area: {project.areaSqFt} sq ft</span>
          </div>
        </div>

        {/* Image Display */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-80 sm:h-96">
          <img
            src={project.featuredImage || project.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-xl font-bold font-display text-forest-900">Project Overview</h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{project.description}</p>
        </div>
      </div>
    </>
  );
};
