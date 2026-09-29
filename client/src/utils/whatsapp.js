export const getWhatsAppLink = (phone, text = '') => {
  if (!phone) return '#';
  const cleanPhone = String(phone).replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${formattedPhone}${text ? `?text=${encodedText}` : ''}`;
};

export const generateLeadWhatsAppMessage = (lead, businessName = 'BuildConnect NCR') => {
  const serviceLabel =
    lead.serviceType === 'material_labour' ? 'Complete (Material + Labour)' : 'Labour-Only Construction';
  
  return (
    `Hello ${businessName}!\n` +
    `I am interested in your ${serviceLabel} services in ${lead.location}.\n\n` +
    `📌 Project Details:\n` +
    `• Plot / Construction Area: ${lead.areaSqFt} sq ft (${lead.floors || 1} Floors)\n` +
    `• Name: ${lead.name}\n` +
    `• Mobile: ${lead.phone}\n` +
    `• Timeline: ${lead.startDate || 'Immediate'}\n` +
    `Please connect with me for a detailed discussion.`
  );
};
