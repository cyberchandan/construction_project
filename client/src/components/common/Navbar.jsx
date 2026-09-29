import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, HardHat, Calculator, ChevronDown, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const locationsList = [
    { name: 'Noida Sectors', path: '/locations/noida' },
    { name: 'Greater Noida & West', path: '/locations/greater-noida' },
  ];

  const isActive = (path) => location.pathname === path;
  const isLocationActive = () => location.pathname.startsWith('/locations');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#283542] text-white shadow-2xl border-b border-[#6A89A7]/40">
      {/* Top Banner Contact Line */}
      <div className="bg-[#1C2530] border-b border-[#6A89A7]/20 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6 text-[#BDDDFC] font-medium">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#88BDF2]" />
              <span>Serving Noida, Greater Noida & Greater Noida West</span>
            </span>
            <span>✉️ {settings.email}</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${settings.phone}`}
              className="hover:text-[#88BDF2] transition flex items-center space-x-1.5 font-bold text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#88BDF2]" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-[#6A89A7]">|</span>
            <Link to="/admin/login" className="hover:text-[#88BDF2] text-slate-300 font-semibold transition">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with optimized right margin */}
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0 mr-4 xl:mr-8">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-[#88BDF2] flex items-center justify-center text-[#283542] font-bold shadow-lg group-hover:scale-105 transition transform border border-[#88BDF2]">
                <HardHat className="w-5 h-5 lg:w-6 lg:h-6 text-[#283542]" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-black font-display tracking-tight text-white block leading-tight">
                  {settings.businessName || 'BuildConnect NCR'}
                </span>
                <span className="text-[9px] lg:text-[10px] text-[#88BDF2] uppercase tracking-wider block font-bold">
                  Premier House Construction
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition ${
                    isActive(link.path)
                      ? 'bg-[#384959] text-[#88BDF2] border border-[#88BDF2]/40 shadow-sm'
                      : 'text-slate-100 hover:bg-[#384959]/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Locations Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setLocationDropdown(!locationDropdown)}
                  onMouseEnter={() => setLocationDropdown(true)}
                  className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition flex items-center space-x-1 ${
                    isLocationActive()
                      ? 'bg-[#384959] text-[#88BDF2] border border-[#88BDF2]/40'
                      : 'text-slate-100 hover:bg-[#384959]/60 hover:text-white'
                  }`}
                >
                  <span>Locations</span>
                  <ChevronDown className="w-4 h-4 text-[#88BDF2]" />
                </button>

                {locationDropdown && (
                  <div
                    onMouseLeave={() => setLocationDropdown(false)}
                    className="absolute top-full right-0 mt-1 w-52 bg-[#283542] border border-[#6A89A7]/40 rounded-xl shadow-2xl py-2 z-50 text-xs font-bold animate-fade-in"
                  >
                    {locationsList.map((loc) => (
                      <Link
                        key={loc.path}
                        to={loc.path}
                        onClick={() => setLocationDropdown(false)}
                        className="block px-4 py-2.5 text-slate-100 hover:bg-[#384959] hover:text-[#88BDF2] transition"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3 flex-shrink-0 ml-2">
            <Link
              to="/cost-calculator"
              className="flex items-center space-x-1.5 px-3 xl:px-3.5 py-2.5 text-xs font-bold rounded-xl text-[#BDDDFC] border border-[#88BDF2]/50 hover:bg-[#88BDF2]/10 transition whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-[#88BDF2]" />
              <span>Cost Calculator</span>
            </Link>
            <a
              href="#quote-form"
              className="px-4 xl:px-5 py-2.5 bg-[#88BDF2] hover:bg-[#6A89A7] hover:text-white text-[#283542] text-xs xl:text-sm font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-white bg-[#384959] border border-[#6A89A7]/40 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#88BDF2]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="xl:hidden bg-[#1C2530] border-t border-[#6A89A7]/30 px-4 pt-3 pb-6 space-y-2 text-sm font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl ${
                isActive(link.path)
                  ? 'bg-[#384959] text-[#88BDF2] font-extrabold border border-[#88BDF2]/40'
                  : 'text-slate-100 hover:bg-[#283542]'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-[#6A89A7]/20">
            <span className="text-xs font-bold uppercase tracking-wider text-[#88BDF2] px-3 block mb-1">
              Service Locations
            </span>
            {locationsList.map((loc) => (
              <Link
                key={loc.path}
                to={loc.path}
                onClick={() => setIsOpen(false)}
                className="block px-3.5 py-2 rounded-xl text-slate-200 hover:bg-[#283542] text-xs font-semibold"
              >
                📍 {loc.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 space-y-2 border-t border-[#6A89A7]/30">
            <Link
              to="/cost-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-3 bg-[#384959] text-[#BDDDFC] rounded-xl font-bold text-xs border border-[#88BDF2]/40"
            >
              <Calculator className="w-4 h-4 text-[#88BDF2]" />
              <span>Construction Cost Calculator</span>
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center space-x-2 w-full py-3 bg-[#88BDF2] text-[#283542] rounded-xl font-extrabold text-sm shadow-md"
            >
              <Phone className="w-4 h-4 text-[#283542]" />
              <span>Call Business ({settings.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
