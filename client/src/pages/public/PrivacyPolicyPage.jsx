import React from 'react';
import { SEO } from '../../components/common/SEO';

export const PrivacyPolicyPage = () => {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy policy and customer data handling principles of BuildConnect NCR." />

      <div className="py-12 lg:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-forest-900">
          Privacy Policy & Customer Data Notice
        </h1>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-6 text-sm text-slate-700 leading-relaxed">
          <p>
            At <strong>BuildConnect NCR</strong>, we value your privacy and are committed to protecting the personal information you share with us when requesting house construction estimates or contacting our business.
          </p>

          <h3 className="text-lg font-bold font-display text-forest-900">1. Information We Collect</h3>
          <p>
            When you fill out our free quote form or request a construction cost breakdown, we collect your name, mobile phone number, email address (optional), project plot location, built-up area in square feet, and preferred start timeline.
          </p>

          <h3 className="text-lg font-bold font-display text-forest-900">2. How We Use Your Data</h3>
          <p>
            Your information is used strictly to prepare tailored construction cost estimates, schedule site inspection visits, answer your construction queries, and communicate quote updates via phone, email, or WhatsApp.
          </p>

          <h3 className="text-lg font-bold font-display text-forest-900">3. Data Protection & Non-Disclosure</h3>
          <p>
            We never sell, rent, or publicly expose customer phone numbers or personal project details to third-party telemarketers. All admin API endpoints are protected with strict authentication and role-based access control.
          </p>

          <h3 className="text-lg font-bold font-display text-forest-900">4. Contacting Us</h3>
          <p>
            If you have questions regarding your data or wish to update your contact details, please contact us directly at our office email or business phone number.
          </p>
        </div>
      </div>
    </>
  );
};
