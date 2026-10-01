import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  HardHat,
  Ruler,
  FileText,
  Clock,
  ArrowRight,
  BadgeCheck,
  Star
} from 'lucide-react';
import { getWhatsAppLink } from '../../utils/whatsapp';
import { useSettings } from '../../context/SettingsContext';

export const ExperienceLegacySection = () => {
  const { settings } = useSettings();
  const [activeTab, setActiveTab] = useState(0);

  const whatsappUrl = getWhatsAppLink(
    settings.whatsapp || settings.phone,
    'Hello BuildConnect NCR! I would like to consult with your 25+ years experienced construction team regarding a new home build in Noida/Greater Noida.'
  );

  const statCards = [
    {
      number: '25+',
      unit: 'Years',
      label: 'Of Building Excellence',
      description: 'Serving Noida & Greater Noida since 1999 with structural integrity.',
      icon: Award,
      badgeColor: 'from-[#88BDF2] to-[#6A89A7]',
    },
    {
      number: '500+',
      unit: 'Projects',
      label: 'Homes & Villas Delivered',
      description: 'Turnkey material+labour and dedicated civil structural projects.',
      icon: Building2,
      badgeColor: 'from-amber-400 to-amber-600',
    },
    {
      number: '1.5M+',
      unit: 'Sq. Ft.',
      label: 'Constructed Area',
      description: 'Precision-engineered RCC foundations & modern architectural facades.',
      icon: Ruler,
      badgeColor: 'from-emerald-400 to-teal-600',
    },
    {
      number: '100%',
      unit: 'Verified',
      label: 'Structural Guarantee',
      description: 'Zero structural compromises backed by written quality agreements.',
      icon: ShieldCheck,
      badgeColor: 'from-sky-400 to-blue-600',
    },
  ];

  const pillars = [
    {
      id: 'structural',
      title: 'Structural Integrity & Anti-Seismic Engineering',
      tag: 'Engineering Mastery',
      icon: HardHat,
      description:
        'With 25+ years of local NCR soil experience, our structural designs account for seismic Zone IV requirements, heavy monsoon water table management, and high-load foundation depth.',
      highlights: [
        'Exclusive use of FE-550D Grade Tata Tiscon / Jindal Panther TMT Steel',
        'Ready-Mix / UltraTech PPC Cement with 1:2:4 / M25 design mix for slabs',
        'Anti-termite chemical barrier treatment at foundation level',
        'Rigid 50-year structural stability testing protocol',
      ],
      stat: '50-Yr Warranty',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'transparent',
      title: 'Fixed-Price Turnkey Contracts — No Hidden Escalations',
      tag: 'Financial Protection',
      icon: FileText,
      description:
        'Over two decades, we perfected transparent contracting. You get an itemized bill of quantities (BOQ) with guaranteed locked rates before breaking ground.',
      highlights: [
        'Stage-wise payment schedule tied strictly to construction milestones',
        'Zero mid-project price hikes once contract is executed',
        'Full material brand audit log provided to clients with GST invoices',
        'Clear penalty-backed timeline commitment for delays',
      ],
      stat: '0 Hidden Costs',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'craftsmanship',
      title: 'Master Craftsmen & In-House Civil Engineers',
      tag: 'Workforce Superiority',
      icon: Users,
      description:
        'Unlike local contractors who hire day-laborers off the street, our core masons, shuttering teams, and site supervisors have worked with us for 10 to 20+ years.',
      highlights: [
        'Full-time COA registered architectural supervision on-site',
        'Specialized RCC slab compaction with heavy vibrators for bubble-free concrete',
        'Dedicated site engineers performing daily 42-point QC checklists',
        'Daily digital video & photo progress reporting on WhatsApp',
      ],
      stat: '200+ Craftsmen',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'noida-mastery',
      title: 'Deep Noida & Greater Noida Regulatory Compliance',
      tag: 'Local NCR Authority Experts',
      icon: BadgeCheck,
      description:
        'Building rules in Noida and Greater Noida (GNIDA) require strict setbacks, FAR limits, and height restrictions. We handle compliance effortlessly.',
      highlights: [
        'Full alignment with Noida Authority & GNIDA building byelaws',
        'Soil testing & water depth analysis prior to foundation digging',
        'Seamless utility connection planning (sewerage, water supply, electricity)',
        'Eco-friendly rainwater harvesting pit construction compliance',
      ],
      stat: '100% Compliant',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const comparisonItems = [
    {
      feature: 'Structural Guarantee',
      us: '25-Year Written Warranty on RCC & Foundation',
      others: 'Zero warranty once final payment is made',
    },
    {
      feature: 'Material Transparency',
      us: 'Branded Tata Tiscon / UltraTech with mill test certs',
      others: 'Local unbranded rebar & adulterated cement mixes',
    },
    {
      feature: 'Cost Escalation',
      us: 'Fixed Rate Guarantee — Locked contract price',
      others: 'Constant budget inflations mid-project',
    },
    {
      feature: 'Site Supervision',
      us: 'Full-time civil engineer & daily 42-point QC checks',
      others: 'Unsupervised local labor with no engineering background',
    },
    {
      feature: 'Timelines & Milestones',
      us: 'Legally binding target dates with delay indemnity',
      others: 'Frequent 6-12 month project delays without accountability',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#283542] via-[#384959] to-[#283542] text-white py-16 sm:py-20 lg:py-24 rounded-3xl border border-[#6A89A7]/40 shadow-2xl">
      {/* Background Glowing Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#88BDF2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#88BDF2_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Top Header & Legacy Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#1f2933]/90 border border-amber-400/40 px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
              25+ Years Serving Noida & Greater Noida (1999 - Present)
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
            A Quarter-Century of <span className="text-[#88BDF2]">Unshakable Trust</span> & Excellence
          </h2>

          <p className="text-sm sm:text-base text-[#BDDDFC] font-medium leading-relaxed max-w-2xl mx-auto">
            From laying foundation stones in Sector 62 to crafting luxury villas across Greater Noida Extension, our 25+ year legacy stands on structural perfection, fixed pricing, and master engineering.
          </p>
        </div>

        {/* 4 Premium Metric Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="relative group bg-[#384959]/70 hover:bg-[#384959] backdrop-blur-xl border border-[#6A89A7]/40 hover:border-[#88BDF2] p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${card.badgeColor} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`} />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#283542] border border-[#6A89A7]/50 flex items-center justify-center text-[#88BDF2] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#88BDF2]" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#283542] text-amber-300 border border-amber-400/30">
                    Est. 1999
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black font-display text-white tracking-tight">
                      {card.number}
                    </span>
                    <span className="text-sm font-bold text-[#88BDF2]">{card.unit}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide">{card.label}</h3>
                  <p className="text-xs text-[#BDDDFC]/80 leading-relaxed pt-1 font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Tabbed Legacy Showcase */}
        <div className="bg-[#1f2933]/90 rounded-3xl border border-[#6A89A7]/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#6A89A7]/30 pb-6">
            <div>
              <span className="text-xs font-bold text-[#88BDF2] uppercase tracking-wider block">
                Why 25+ Years Experience Matters
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                The 4 Pillars of BuildConnect NCR Heritage
              </h3>
            </div>

            {/* Pillar Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 ${
                    activeTab === index
                      ? 'bg-[#88BDF2] text-[#283542] shadow-lg shadow-[#88BDF2]/20 scale-105'
                      : 'bg-[#283542] text-[#BDDDFC] hover:bg-[#384959] hover:text-white border border-[#6A89A7]/30'
                  }`}
                >
                  <pillar.icon className="w-4 h-4" />
                  <span>Pillar 0{index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          {pillars[activeTab] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#384959] text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{pillars[activeTab].tag}</span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {pillars[activeTab].title}
                </h4>

                <p className="text-sm text-[#BDDDFC] leading-relaxed">
                  {pillars[activeTab].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {pillars[activeTab].highlights.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs font-semibold text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#88BDF2] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center space-x-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#88BDF2] hover:bg-[#6A89A7] text-[#283542] hover:text-white font-bold text-xs sm:text-sm transition transform hover:-translate-y-0.5 shadow-lg"
                  >
                    <span>Discuss Your Project With Our Senior Engineers</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Pillar Visual Image & Stat Callout */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#88BDF2]/40 shadow-2xl bg-[#283542] group">
                  <img
                    src={pillars[activeTab].image}
                    alt={pillars[activeTab].title}
                    className="w-full h-72 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f2933] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 bg-[#283542]/95 backdrop-blur-md p-4 rounded-xl border border-[#88BDF2]/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-300 block uppercase">
                        25-Year Benchmark
                      </span>
                      <span className="text-base font-black text-white">
                        {pillars[activeTab].stat}
                      </span>
                    </div>
                    <BadgeCheck className="w-8 h-8 text-[#88BDF2]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 25-Year Builder vs Local Unorganized Contractor Comparison Table */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#88BDF2] uppercase tracking-wider">
              Smart Homeowner Comparison
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              25+ Years Legacy Builder vs Unorganized Local Contractor
            </h3>
            <p className="text-xs sm:text-sm text-[#BDDDFC]">
              Why taking chances with local sub-contractors costs more in repairs & structural risks over time.
            </p>
          </div>

          <div className="bg-[#1f2933] rounded-2xl border border-[#6A89A7]/40 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#283542] border-b border-[#6A89A7]/40 text-xs text-[#BDDDFC] uppercase tracking-wider font-extrabold">
                    <th className="p-4 sm:p-5">Key Metric / Scope</th>
                    <th className="p-4 sm:p-5 text-[#88BDF2] bg-[#384959]/50 border-x border-[#6A89A7]/30">
                      BuildConnect NCR (25+ Years)
                    </th>
                    <th className="p-4 sm:p-5 text-rose-300">
                      Typical Unorganized Contractor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6A89A7]/20 text-xs sm:text-sm">
                  {comparisonItems.map((row, index) => (
                    <tr key={index} className="hover:bg-[#283542]/50 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-[#88BDF2] flex-shrink-0 hidden sm:inline" />
                        <span>{row.feature}</span>
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-300 bg-[#384959]/30 border-x border-[#6A89A7]/30">
                        <div className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{row.us}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 font-medium text-slate-300">
                        <div className="flex items-start space-x-2 text-rose-300/90">
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Trust Guarantee & Action Callout */}
        <div className="bg-gradient-to-r from-amber-500/20 via-[#384959] to-[#88BDF2]/20 rounded-2xl border border-amber-400/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-black text-white flex items-center justify-center md:justify-start space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Ready to Build With 25+ Years of NCR Construction Expertise?</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#BDDDFC]">
              Book a free site inspection & architectural consultation with our senior project leaders in Noida or Greater Noida.
            </p>
          </div>

          <a
            href="#quote-form"
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#283542] font-black text-xs sm:text-sm rounded-xl shadow-xl transition transform hover:scale-105 flex-shrink-0 flex items-center space-x-2"
          >
            <span>Request Free Legacy Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
