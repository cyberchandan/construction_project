import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';
import { Save, Building2, Phone, Mail, Calculator } from 'lucide-react';

export const AdminSettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { settings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    whatsapp: '',
    email: '',
    officeAddress: '',
    materialLabourRate: 1800,
    labourOnlyRate: 500,
    calculatorDisclaimer: '',
  });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (settings) {
      setFormData({
        businessName: settings.businessName || 'BuildConnect NCR',
        phone: settings.phone || '+91 98100 12345',
        whatsapp: settings.whatsapp || '+91 98100 12345',
        email: settings.email || 'contact@buildconnectncr.com',
        officeAddress: settings.officeAddress || '',
        materialLabourRate: settings.calculatorRates?.materialLabourRate || 1800,
        labourOnlyRate: settings.calculatorRates?.labourOnlyRate || 500,
        calculatorDisclaimer: settings.calculatorDisclaimer || '',
      });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        businessName: formData.businessName,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        officeAddress: formData.officeAddress,
        calculatorRates: {
          materialLabourRate: Number(formData.materialLabourRate),
          labourOnlyRate: Number(formData.labourOnlyRate),
        },
        calculatorDisclaimer: formData.calculatorDisclaimer,
      };

      const res = await fetch('/api/v1/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Business settings updated successfully!', 'success');
        refreshSettings();
      } else {
        showToast(json.message || 'Failed to update settings', 'error');
      }
    } catch (err) {
      showToast('Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader title="Business & Cost Calculator Settings" onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-3xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 text-xs font-medium">
            <h3 className="text-lg font-bold font-display text-forest-900 border-b pb-3 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-forest-700" />
              <span>Public Contact & Branding Settings</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Business Phone Number *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp Mobile Number *</label>
                <input
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Office Address</label>
              <input
                type="text"
                value={formData.officeAddress}
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
              />
            </div>

            <h3 className="text-lg font-bold font-display text-forest-900 border-b pb-3 pt-4 flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-forest-700" />
              <span>Cost Calculator Configurable Base Rates</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Material + Labour Base Rate (₹ / sq ft) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.materialLabourRate}
                  onChange={(e) => setFormData({ ...formData, materialLabourRate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Labour-Only Base Rate (₹ / sq ft) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.labourOnlyRate}
                  onChange={(e) => setFormData({ ...formData, labourOnlyRate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Calculator Disclaimer Text</label>
              <textarea
                rows="2"
                value={formData.calculatorDisclaimer}
                onChange={(e) => setFormData({ ...formData, calculatorDisclaimer: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition"
              >
                <Save className="w-4 h-4 text-sage-300" />
                <span>{saving ? 'Saving Settings...' : 'Save Settings Live'}</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
