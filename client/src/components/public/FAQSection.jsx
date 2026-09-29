import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What is the difference between Material + Labour and Labour-Only contracts?',
    a: 'In a Material + Labour (turnkey) contract, we manage everything: sourcing raw materials (cement, steel, sand, bricks, tiles, paint) as per agreed specifications, as well as providing skilled labour. In a Labour-Only contract, you purchase all raw materials while we provide the complete skilled civil construction team, tools, and supervision.',
  },
  {
    q: 'What are the current average house construction rates in Noida & Greater Noida?',
    a: 'Rates depend on material grade and scope. Turnkey Material + Labour contracts typically range from ₹1,600 to ₹2,400+ per sq ft depending on specs. Labour-only civil structure work typically ranges from ₹450 to ₹650 per sq ft. You can use our interactive calculator for an instant estimate.',
  },
  {
    q: 'Which locations in Noida and Greater Noida do you serve?',
    a: 'We serve all major sectors in Noida (Sectors 62, 137, 150, 128, etc.), Greater Noida West (Noida Extension), Greater Noida (Alpha, Beta, Gamma, Omega, Zeta), and Yamuna Expressway residential plot developments.',
  },
  {
    q: 'How are payment milestones structured during house construction?',
    a: 'Payment is tied to verified construction stages (e.g. 10% advance on booking/architecture, 20% on plinth level, 35% on slab casting, 20% brickwork/plastering, 15% on handover). You never pay 100% upfront.',
  },
  {
    q: 'Do you provide architectural design and layout approval assistance?',
    a: 'Yes, our turnkey material + labour package includes structural drawing creation, 3D elevation concepts, and guidance regarding local authority guidelines (NOIDA / GNIDA authority rules).',
  },
];

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
          >
            <button
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-[#384959] text-sm sm:text-base focus:outline-none"
            >
              <span className="flex items-center space-x-2.5">
                <HelpCircle className="w-4 h-4 text-[#88BDF2] flex-shrink-0" />
                <span>{faq.q}</span>
              </span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-[#88BDF2] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
