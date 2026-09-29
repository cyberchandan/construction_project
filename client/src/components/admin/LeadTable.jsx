import React from 'react';
import { Phone, MessageSquare, Eye, Calendar, MapPin } from 'lucide-react';
import { formatStatusBadge, formatDateIN } from '../../utils/formatters';
import { getWhatsAppLink } from '../../utils/whatsapp';

export const LeadTable = ({ leads, onSelectLead }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-md">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-forest-900 text-white font-bold text-xs uppercase tracking-wider">
            <th className="py-3.5 px-4">Customer</th>
            <th className="py-3.5 px-4">Location</th>
            <th className="py-3.5 px-4">Service & Area</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Submitted</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => {
            const badge = formatStatusBadge(lead.status);
            const waUrl = getWhatsAppLink(
              lead.phone,
              `Hello ${lead.name}, regarding your BuildConnect NCR construction enquiry for ${lead.location}.`
            );

            return (
              <tr key={lead._id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-bold text-slate-800">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-forest-900">{lead.name}</span>
                    <a href={`tel:${lead.phone}`} className="text-xs font-semibold text-slate-500 hover:text-forest-700 flex items-center space-x-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{lead.phone}</span>
                    </a>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-slate-700 font-medium">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                    <span>{lead.location}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="font-bold block text-slate-800">
                    {lead.serviceType === 'material_labour' ? 'Turnkey Material + Labour' : 'Labour Only'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {lead.areaSqFt} sq ft ({lead.floors || 1} floor/s)
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                    {badge.label}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-500 text-xs font-medium">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDateIN(lead.createdAt)}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right space-x-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onSelectLead(lead._id)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow transition"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    <span>Manage</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
