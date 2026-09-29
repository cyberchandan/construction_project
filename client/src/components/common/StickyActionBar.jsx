import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const StickyActionBar = () => {
  const { settings } = useSettings();

  const waLink = getWhatsAppLink(
    settings.whatsapp || settings.phone,
    `Hello ${settings.businessName}! I am interested in building a house in Noida/Greater Noida. Please share quotation details.`
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#283542] border-t border-[#6A89A7]/30 p-2.5 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${settings.phone}`}
          className="flex items-center justify-center space-x-2 bg-[#384959] border border-[#88BDF2]/40 text-[#BDDDFC] py-3 px-4 rounded-xl font-extrabold text-sm shadow hover:bg-[#6A89A7] hover:text-white active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-[#88BDF2]" />
          <span>Call Business</span>
        </a>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-[#88BDF2] text-[#384959] py-3 px-4 rounded-xl font-extrabold text-sm shadow hover:bg-[#6A89A7] hover:text-white active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 text-[#384959]" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
};
