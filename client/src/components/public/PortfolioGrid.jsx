import React, { useState, useEffect } from 'react';
import { MapPin, Maximize2, Building, CheckCircle2 } from 'lucide-react';

const sampleProjects = [
  {
    _id: 'p1',
    title: '3-Story Luxury Villa Construction',
    slug: '3-story-luxury-villa-sector-150-noida',
    location: 'Sector 150, Noida',
    serviceType: 'material_labour',
    areaSqFt: 3600,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Turnkey residential villa featuring earthquake resistant RCC structure, high-end elevation stone cladding, and complete interior finishes.',
  },
  {
    _id: 'p2',
    title: 'G+2 Independent House Labour Contract',
    slug: 'labour-only-structure-greater-noida-west',
    location: 'Greater Noida West (Noida Ext.)',
    serviceType: 'labour_only',
    areaSqFt: 2400,
    featuredImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    description: 'RCC column, beam and slab casting with exterior brickwork executed strictly under labour-only contract.',
  },
  {
    _id: 'p3',
    title: 'Modern Turnkey Duplex Residence',
    slug: 'modern-turnkey-duplex-alpha-1-greater-noida',
    location: 'Alpha 1, Greater Noida',
    serviceType: 'material_labour',
    areaSqFt: 4200,
    featuredImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    description: 'Complete civil structure and turnkey handover including weather-shield coating and marble flooring.',
  },
];

export const PortfolioGrid = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'noida') return p.location.toLowerCase().includes('noida') && !p.location.toLowerCase().includes('greater noida');
    if (filter === 'greater_noida') return p.location.toLowerCase().includes('greater noida');
    if (filter === 'material_labour') return p.serviceType === 'material_labour';
    if (filter === 'labour_only') return p.serviceType === 'labour_only';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'noida', label: 'Noida City' },
          { id: 'greater_noida', label: 'Greater Noida' },
          { id: 'material_labour', label: 'Turnkey Material + Labour' },
          { id: 'labour_only', label: 'Labour-Only Work' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === tab.id
                ? 'bg-[#384959] text-[#88BDF2] shadow-md font-extrabold'
                : 'bg-white text-[#384959] border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p._id}
            onClick={() => setSelectedProject(p)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:border-[#88BDF2]/60 transition cursor-pointer flex flex-col justify-between text-[#384959]"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={p.featuredImage || p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#384959]/90 text-[#88BDF2] text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm border border-[#88BDF2]/40">
                {p.serviceType === 'material_labour' ? 'Material + Labour' : 'Labour Only'}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#384959]" />
                <span>{p.location}</span>
              </div>

              <h4 className="text-base font-bold font-display text-[#384959] group-hover:text-[#6A89A7] transition leading-snug">
                {p.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                {p.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Built Area: {p.areaSqFt} sq ft</span>
                <span className="text-[#384959] font-bold flex items-center space-x-1 group-hover:underline">
                  <span>View Details</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail View Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#1C2530]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-[#384959]">
            <div className="relative h-64">
              <img
                src={selectedProject.featuredImage || selectedProject.images?.[0]}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#384959]/80 text-white flex items-center justify-center hover:bg-[#384959]"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <span className="px-3 py-1 bg-[#384959] text-[#88BDF2] rounded-md text-xs font-bold uppercase">
                {selectedProject.serviceType === 'material_labour' ? 'Turnkey Material + Labour' : 'Labour Only Civil Work'}
              </span>

              <h3 className="text-2xl font-bold font-display text-[#384959]">{selectedProject.title}</h3>

              <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-[#384959]" />
                  <span>{selectedProject.location}</span>
                </span>
                <span>•</span>
                <span>Area: {selectedProject.areaSqFt} sq ft</span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                {selectedProject.description}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    const el = document.getElementById('quote-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-[#384959] text-[#88BDF2] text-xs font-extrabold rounded-xl shadow hover:bg-[#283542] transition"
                >
                  Request Similar Project Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
