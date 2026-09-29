import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';

export const LeadFormSection = ({ initialValues = {}, source = 'lead_form_section' }) => {
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const { showToast } = useToast();
  const { settings } = useSettings();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialValues.name || '',
      phone: initialValues.phone || '',
      email: initialValues.email || '',
      location: initialValues.location || 'Noida Sector 62',
      serviceType: initialValues.serviceType || 'material_labour',
      projectType: initialValues.projectType || 'new_construction',
      areaSqFt: initialValues.areaSqFt || 2000,
      floors: initialValues.floors || 2,
      budget: initialValues.budget || '₹30 - ₹50 Lakhs',
      startDate: initialValues.startDate || 'Immediate',
      message: initialValues.message || '',
      consent: true,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        source,
        landingPage: window.location.pathname,
      };

      const res = await fetch('/api/v1/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        showToast(result.message, 'success');
        setSubmittedData({
          leadId: result.leadId,
          whatsappUrl: result.whatsappUrl,
          customerName: data.name,
        });
        reset();
      } else {
        showToast(result.message || 'Failed to submit quote enquiry.', 'error');
      }
    } catch (error) {
      showToast('Network error while submitting. Please try calling or WhatsApp directly.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="quote-form" className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Decorative Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#384959] via-[#6A89A7] to-[#88BDF2]" />

      {submittedData ? (
        <div className="py-8 text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 bg-[#BDDDFC] rounded-full flex items-center justify-center mx-auto text-[#384959]">
            <CheckCircle2 className="w-10 h-10 text-[#384959]" />
          </div>
          <h3 className="text-2xl font-extrabold font-display text-[#384959]">
            Quote Enquiry Submitted Successfully!
          </h3>
          <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed font-semibold">
            Thank you <span className="font-extrabold text-[#384959]">{submittedData.customerName}</span>. Our chief engineering estimator will analyze your requirements and call you back within 24 hours.
          </p>

          {submittedData.whatsappUrl && (
            <div className="pt-4 border-t border-slate-100 max-w-md mx-auto space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Want an instant response?
              </p>
              <a
                href={submittedData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          )}

          <button
            onClick={() => setSubmittedData(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-700 underline pt-2"
          >
            Submit another quotation request
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#384959] text-[#BDDDFC] mb-2 border border-[#88BDF2]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#88BDF2]" />
              <span>Free, No-Obligation Consultation</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#384959]">
              Get a Free Construction Quote
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-semibold">
              Fill in your house plot details below for Noida & Greater Noida projects.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Verma"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name.message}</p>}
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    placeholder="98100 12345"
                    {...register('phone', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter a valid 10-digit Indian mobile number',
                      },
                    })}
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Project Location (Sector / Locality) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sector 150 Noida / Greater Noida West"
                  {...register('location', { required: 'Location is required' })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
                />
                {errors.location && <p className="text-red-500 text-xs mt-1 font-bold">{errors.location.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Contract Type *
                </label>
                <select
                  {...register('serviceType', { required: true })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold bg-white text-[#384959]"
                >
                  <option value="material_labour">Turnkey Contract (Material + Labour)</option>
                  <option value="labour_only">Civil Work Contract (Labour Only)</option>
                </select>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Project Type
                </label>
                <select
                  {...register('projectType')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold bg-white text-[#384959]"
                >
                  <option value="new_construction">New Independent House / Villa</option>
                  <option value="renovation">Floor Addition / Renovation</option>
                  <option value="other">Commercial / Boundary / Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Construction Area */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Plot / Built Area (sq ft) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1800"
                  {...register('areaSqFt', {
                    required: 'Area is required',
                    min: { value: 100, message: 'Min area 100 sq ft' },
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
                />
                {errors.areaSqFt && <p className="text-red-500 text-xs mt-1 font-bold">{errors.areaSqFt.message}</p>}
              </div>

              {/* Number of Floors */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Number of Floors
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register('floors')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
                />
              </div>

              {/* Preferred Timeline */}
              <div>
                <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                  Start Timeline
                </label>
                <select
                  {...register('startDate')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold bg-white text-[#384959]"
                >
                  <option value="Immediate">Immediate (Within 2 Weeks)</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="1 to 3 Months">1 to 3 Months</option>
                  <option value="Planning Phase">Planning / Future</option>
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-xs font-bold text-[#384959] uppercase mb-1">
                Additional Requirements / Specific Details
              </label>
              <textarea
                rows="2"
                placeholder="Mention any specific material preferences, architectural layout plan, soil condition, or plot number..."
                {...register('message')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#384959] focus:border-[#384959] text-sm font-bold text-[#384959]"
              ></textarea>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start space-x-2 pt-1">
              <input
                type="checkbox"
                id="consentCheck"
                {...register('consent', { required: 'Consent is required' })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#384959] focus:ring-[#384959]"
              />
              <label htmlFor="consentCheck" className="text-xs text-slate-700 leading-snug font-semibold">
                I authorize BuildConnect NCR to contact me with a custom estimate. Your data is kept private per our{' '}
                <a href="/privacy-policy" target="_blank" className="underline text-[#384959] font-extrabold">
                  Privacy Policy
                </a>.
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-xs font-bold">{errors.consent.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-[#88BDF2] hover:bg-[#6A89A7] hover:text-white text-[#384959] font-extrabold text-base rounded-xl shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <Send className="w-5 h-5 text-current" />
                  <span>Get Free Custom Construction Quote</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
