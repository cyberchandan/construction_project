import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SEO } from '../../components/common/SEO';
import { HardHat, Lock, Mail } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid login credentials.');
    }
  };

  return (
    <>
      <SEO title="Staff & Admin Portal Login" />

      <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-forest-700 text-sage-300 flex items-center justify-center mx-auto shadow-md">
              <HardHat className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-display text-forest-900">
              {settings.businessName || 'BuildConnect NCR'}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Staff & Management Portal
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@buildconnectncr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-forest-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white font-bold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            <span>Secure HTTPOnly Cookie JWT Auth Protection</span>
          </div>
        </div>
      </div>
    </>
  );
};
