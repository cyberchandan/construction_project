import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  UserPlus,
  LogOut,
  HardHat,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

export const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { settings } = useSettings();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads & Enquiries', path: '/admin/leads', icon: Users },
    { name: 'Projects Portfolio', path: '/admin/projects', icon: Building2 },
    { name: 'Quotations', path: '/admin/quotes', icon: FileText },
    { name: 'Business Settings', path: '/admin/settings', icon: Settings, adminOnly: true },
    { name: 'Staff Management', path: '/admin/staff', icon: UserPlus, adminOnly: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-navy-950 text-white flex flex-col justify-between border-r border-navy-800 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Top Branding */}
          <div className="p-6 border-b border-navy-800 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center text-navy-950 font-bold shadow-md">
              <HardHat className="w-5 h-5 text-navy-950" />
            </div>
            <div>
              <span className="text-base font-bold font-display text-white block leading-tight">
                {settings.businessName || 'BuildConnect NCR'}
              </span>
              <span className="text-[10px] text-gold-300 uppercase tracking-wider block font-bold">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              if (item.adminOnly && user?.role !== 'admin') return null;
              const IconComp = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition ${
                    active
                      ? 'bg-gold-gradient text-navy-950 shadow-md'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComp className={`w-4 h-4 ${active ? 'text-navy-950' : 'text-gold-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-navy-950" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout at bottom */}
        <div className="p-4 border-t border-navy-800 bg-navy-900/60 space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-navy-800 text-gold-300 border border-gold-500/30 font-bold flex items-center justify-center text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">{user?.name || 'Admin'}</span>
              <span className="text-[10px] text-gold-300 uppercase tracking-wider font-bold block">
                {user?.role || 'Staff'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-bold border border-red-800/40 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
