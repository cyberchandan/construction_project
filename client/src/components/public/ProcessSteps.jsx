import React from 'react';
import { ClipboardCheck, Compass, HardHat, Key } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: ClipboardCheck,
    title: 'Site Survey & Estimation',
    desc: 'We visit your plot in Noida/Greater Noida, evaluate soil levels, architectural desires, and provide a transparent itemized estimate.',
  },
  {
    num: '02',
    icon: Compass,
    title: 'Architectural & Contract Alignment',
    desc: 'Finalize structural drawings, 3D elevation designs, material brand specifications, and sign a binding legal agreement.',
  },
  {
    num: '03',
    icon: HardHat,
    title: 'Civil Construction Execution',
    desc: 'Engineered RCC foundation, column casting, brickwork masonry, and plumbing/electrical execution under senior site engineers.',
  },
  {
    num: '04',
    icon: Key,
    title: 'Quality Audit & Handover',
    desc: 'Multi-point quality checks, final plastering, paint application, cleanup, and key handover on schedule.',
  },
];

export const ProcessSteps = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => {
        const IconComponent = step.icon;
        return (
          <div
            key={step.num}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md relative hover:border-[#88BDF2] transition text-[#384959]"
          >
            <span className="text-4xl font-extrabold font-display text-slate-200 absolute top-4 right-4">
              {step.num}
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#384959] text-[#88BDF2] flex items-center justify-center font-bold mb-4 shadow border border-[#384959]">
              <IconComponent className="w-6 h-6 text-[#88BDF2]" />
            </div>
            <h4 className="text-base font-bold font-display text-[#384959] mb-2">{step.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
};
