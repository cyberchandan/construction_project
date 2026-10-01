import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { LeadFormSection } from '../../components/public/LeadFormSection';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const ContactPage = () => {
  const { settings } = useSettings();
  const location = useLocation();
  const initialValues = location.state?.initialValues || {};

  const waUrl = getWhatsAppLink(
    settings.whatsapp || settings.phone,
    `Hello ${settings.businessName}! I would like to schedule a site visit / consultation.`
  );

  return (
    <>
      <SEO title="Contact Us | Noida & Greater Noida Construction Office" />

      <div className="py-12 lg:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-forest-900">
            Contact BuildConnect NCR
          </h1>
          <p className="text-base text-slate-600">
            Have a plot in Noida or Greater Noida? Schedule a free site inspection and consultation with our chief engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <h3 className="text-xl font-bold font-display text-forest-900 border-b pb-3">
                Office & Contact Info
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Office Address:</span>
                    <span className="text-slate-600">{settings.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-forest-700 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Phone Number:</span>
                    <a href={`tel:${settings.phone}`} className="text-forest-700 font-bold hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-forest-700 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Email Address:</span>
                    <a href={`mailto:${settings.email}`} className="text-forest-700 font-bold hover:underline">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-semibold text-slate-500 uppercase block">Quick Action</span>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <LeadFormSection source="contact_page" initialValues={initialValues} />
          </div>
        </div>
      </div>
    </>
  );
};
