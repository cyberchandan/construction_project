import React from 'react';
import { Modal } from '../common/Modal';
import { Printer, HardHat, FileCheck } from 'lucide-react';
import { formatCurrencyINR, formatDateIN } from '../../utils/formatters';
import { useSettings } from '../../context/SettingsContext';

export const PrintQuoteModal = ({ isOpen, onClose, quote }) => {
  const { settings } = useSettings();

  if (!isOpen || !quote) return null;

  const handlePrint = () => {
    window.print();
  };

  const lead = quote.lead || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Formal Quotation Document (v${quote.version})`} maxWidth="max-w-4xl">
      <div className="space-y-4">
        {/* Modal Action Top Bar */}
        <div className="no-print flex justify-between items-center bg-slate-100 p-3 rounded-xl">
          <span className="text-xs font-bold text-slate-700">Printable Client Proposal Document</span>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white font-bold text-xs rounded-xl shadow flex items-center space-x-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>

        {/* Printable Area Container */}
        <div id="printable-quote-area" className="bg-white p-8 border border-slate-300 rounded-2xl space-y-6 text-slate-800 font-sans">
          {/* Document Header */}
          <div className="flex justify-between items-start border-b-2 border-forest-700 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-forest-700 text-sage-300 flex items-center justify-center font-bold">
                <HardHat className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display text-forest-900 leading-tight">
                  {settings.businessName || 'BuildConnect NCR'}
                </h2>
                <p className="text-xs text-slate-600">Premier House Construction • Noida & Greater Noida</p>
                <p className="text-xs text-slate-500">{settings.officeAddress}</p>
                <p className="text-xs text-slate-500">Phone: {settings.phone} | Email: {settings.email}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-forest-100 text-forest-900 text-xs font-bold rounded-lg uppercase tracking-wider mb-1">
                FORMAL QUOTATION
              </span>
              <p className="text-xs font-bold text-slate-700">Quote Ref: #{quote._id ? quote._id.slice(-6).toUpperCase() : 'BCN-101'}</p>
              <p className="text-xs text-slate-500">Version: v{quote.version}</p>
              <p className="text-xs text-slate-500">Date: {formatDateIN(quote.createdAt)}</p>
              <p className="text-xs text-slate-500">Valid Until: {formatDateIN(quote.validUntil)}</p>
            </div>
          </div>

          {/* Client Details Box */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">PREPARED FOR:</span>
              <p className="font-bold text-sm text-forest-900">{lead.name || 'Valued Customer'}</p>
              <p className="text-slate-600">Mobile: {lead.phone || 'N/A'}</p>
              <p className="text-slate-600">Email: {lead.email || 'N/A'}</p>
            </div>
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">PROJECT DETAILS:</span>
              <p className="font-bold text-sm text-forest-900">Location: {lead.location || 'Noida'}</p>
              <p className="text-slate-600">Contract Mode: {quote.contractType === 'material_labour' ? 'Material + Labour Turnkey' : 'Labour Only'}</p>
              <p className="text-slate-600">Plot / Construction Area: {lead.areaSqFt || 2000} sq ft</p>
            </div>
          </div>

          {/* Total Amount Banner */}
          <div className="bg-forest-900 text-white p-4 rounded-xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-sage-300 uppercase tracking-wider block">Estimated Total Construction Investment</span>
              <span className="text-xs text-slate-300 font-medium">As per specifications & scope detailed below</span>
            </div>
            <div className="text-2xl font-extrabold font-display text-sage-300">
              {formatCurrencyINR(quote.estimatedAmount)}
            </div>
          </div>

          {/* Scope of Work */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wide border-b pb-1">1. Scope of Work</h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{quote.scopeOfWork}</p>
          </div>

          {/* Material Specifications */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wide border-b pb-1">2. Material Brand & Grade Specifications</h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
              {quote.materialSpecifications}
            </p>
          </div>

          {/* Payment Milestones Schedule */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wide border-b pb-1">3. Payment Milestone Schedule</h4>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-700">
                  <th className="p-2 border">Stage / Milestone</th>
                  <th className="p-2 border text-center">% Share</th>
                  <th className="p-2 border text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(quote.paymentMilestones || []).map((m, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2 border font-medium">{m.milestone}</td>
                    <td className="p-2 border text-center font-bold">{m.percentage}%</td>
                    <td className="p-2 border text-right font-bold">{formatCurrencyINR(m.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Exclusions */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm text-forest-900 uppercase tracking-wide border-b pb-1">4. Standard Exclusions</h4>
            <p className="text-slate-600 leading-relaxed italic">{quote.exclusions}</p>
          </div>

          {/* Signatures */}
          <div className="pt-12 grid grid-cols-2 gap-8 text-xs border-t border-slate-200">
            <div>
              <div className="border-b border-slate-400 h-10 mb-2"></div>
              <p className="font-bold text-slate-800">Authorized Signatory</p>
              <p className="text-slate-500">{settings.businessName || 'BuildConnect NCR'}</p>
            </div>
            <div>
              <div className="border-b border-slate-400 h-10 mb-2"></div>
              <p className="font-bold text-slate-800">Client Acceptance Signature</p>
              <p className="text-slate-500">Date: ____ / ____ / ________</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
