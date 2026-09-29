import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#283542] text-slate-200 pt-16 pb-24 md:pb-12 border-t border-[#6A89A7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Business Info Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#88BDF2] flex items-center justify-center text-[#384959] font-bold shadow-md">
                <HardHat className="w-6 h-6 text-[#384959]" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                {settings.businessName || 'BuildConnect NCR'}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Serving Noida & Greater Noida with top-tier house construction contracts. Delivering structural strength, architectural elegance, and transparent cost estimates.
            </p>
            <div className="pt-2 text-xs text-[#88BDF2] font-bold">
              <span>GST & Business License Configured</span>
            </div>
          </div>

          {/* Quick Services Links */}
          <div className="space-y-4">
            <h3 className="text-[#BDDDFC] text-base font-bold font-display tracking-wide uppercase">
              Construction Services
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link to="/services/material-plus-labour" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Material + Labour Contracts</span>
                </Link>
              </li>
              <li>
                <Link to="/services/labour-only" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Labour-Only Civil Work</span>
                </Link>
              </li>
              <li>
                <Link to="/cost-calculator" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Construction Cost Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Recent Projects Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h3 className="text-[#BDDDFC] text-base font-bold font-display tracking-wide uppercase">
              Local Service Areas
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link to="/locations/noida" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Noida Sectors (62, 137, 150, etc.)</span>
                </Link>
              </li>
              <li>
                <Link to="/locations/greater-noida" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Greater Noida West (Noida Ext.)</span>
                </Link>
              </li>
              <li>
                <Link to="/locations/greater-noida" className="hover:text-[#88BDF2] transition flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#88BDF2]" />
                  <span>Greater Noida (Alpha, Beta, Omega)</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Yamuna Expressway Plots</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-[#BDDDFC] text-base font-bold font-display tracking-wide uppercase">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm font-semibold">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#88BDF2] flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">{settings.officeAddress}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#88BDF2] flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#88BDF2] transition">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#88BDF2] flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#88BDF2] transition">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#6A89A7]/20 flex flex-col md:flex-row justify-between items-center text-xs text-slate-300 font-semibold gap-4">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-[#88BDF2] transition">
              Privacy Policy
            </Link>
            <Link to="/admin/login" className="hover:text-[#88BDF2] transition">
              Staff Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
