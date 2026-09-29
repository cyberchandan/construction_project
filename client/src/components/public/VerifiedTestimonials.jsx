import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const placeholderTestimonials = [
  {
    id: 1,
    name: 'Sample Client - Sector 150 Noida',
    location: 'Sector 150, Noida',
    service: 'Material + Labour Contract',
    text: 'Placeholder review: Turnkey villa construction executed professionally. Transparency in material brands like Tata Tiscon steel and UltraTech cement was highly impressive.',
    isVerified: true,
  },
  {
    id: 2,
    name: 'Sample Client - Greater Noida West',
    location: 'Greater Noida West',
    service: 'Labour-Only Structure Work',
    text: 'Placeholder review: Labour team was punctual and skilled. Brickwork masonry and RCC slab casting were completed strictly per structural drawings.',
    isVerified: true,
  },
];

export const VerifiedTestimonials = () => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#6A89A7] uppercase tracking-wider">
          Client Feedback
        </span>
        <h3 className="text-2xl font-bold font-display text-[#384959]">
          Verified Customer Testimonials
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          (Sample client placeholder entries. Real verified client reviews will replace these upon business launch.)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {placeholderTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative space-y-4 text-[#384959]"
          >
            <div className="flex items-center justify-between">
              <div className="flex space-x-1 text-[#88BDF2]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#88BDF2]" />
                ))}
              </div>
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#384959] bg-[#88BDF2]/20 px-2.5 py-0.5 rounded-md border border-[#88BDF2]/40">
                <CheckCircle2 className="w-3 h-3 text-[#384959]" />
                <span>Verified Client</span>
              </span>
            </div>

            <p className="text-sm text-slate-700 italic leading-relaxed font-medium">
              "{t.text}"
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#384959] block">{t.name}</span>
                <span className="text-slate-500 font-medium">{t.location}</span>
              </div>
              <span className="font-bold text-[#384959] bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {t.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
