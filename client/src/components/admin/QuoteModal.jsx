import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';

export const QuoteModal = ({ isOpen, onClose, lead, onQuoteCreated }) => {
  const [estimatedAmount, setEstimatedAmount] = useState(3600000);
  const [contractType, setContractType] = useState('material_labour');
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [materialSpecifications, setMaterialSpecifications] = useState('');
  const [exclusions, setExclusions] = useState('');
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (lead) {
      setContractType(lead.serviceType || 'material_labour');
      const rate = lead.serviceType === 'material_labour' ? 1800 : 500;
      const est = (lead.areaSqFt || 2000) * (lead.floors || 1) * rate;
      setEstimatedAmount(est);
      setScopeOfWork(
        `Complete turnkey civil structural construction of G+${(lead.floors || 1) - 1} residential house in ${lead.location} as per approved structural drawing.`
      );
      setMaterialSpecifications(
        `• Steel: Tata Tiscon / Jindal Panther TMT Fe550\n• Cement: UltraTech / ACC / Ambuja 53 Grade\n• Masonry: First Class Red Clay Bricks / AAC Blocks\n• Electrical: Finolex / Polycab concealed copper wiring\n• Plumbing: Astral / Supreme CPVC & PVC pipes`
      );
      setExclusions(
        `Government approval submission fees, temporary electricity meter connection charges, sub-soil investigation testing fees, and deep borewell setup unless explicitly specified.`
      );
    }
  }, [lead, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lead) return;
    setSaving(true);
    try {
      const res = await fetch('/api/v1/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead._id,
          contractType,
          estimatedAmount: Number(estimatedAmount),
          scopeOfWork,
          materialSpecifications,
          exclusions,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Quotation generated successfully!', 'success');
        onClose();
        if (onQuoteCreated) onQuoteCreated(json.quote);
      } else {
        showToast(json.message || 'Failed to create quotation', 'error');
      }
    } catch (err) {
      showToast('Error generating quotation document', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Generate Formal Quote for ${lead.name}`} maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        <div className="bg-forest-50 p-4 rounded-xl border border-forest-100 flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-forest-900 block">{lead.name} ({lead.phone})</span>
            <span className="text-slate-600">{lead.location} • Plot Area: {lead.areaSqFt} sq ft</span>
          </div>
          <span className="px-3 py-1 bg-forest-700 text-sage-300 font-bold rounded-lg uppercase">
            {contractType === 'material_labour' ? 'Material + Labour' : 'Labour Only'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Contract Type</label>
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
            >
              <option value="material_labour">Material + Labour Turnkey</option>
              <option value="labour_only">Labour Only Civil Contract</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Total Estimated Amount (INR) *</label>
            <input
              type="number"
              required
              value={estimatedAmount}
              onChange={(e) => setEstimatedAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Scope of Civil Work</label>
          <textarea
            rows="2"
            value={scopeOfWork}
            onChange={(e) => setScopeOfWork(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
          ></textarea>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Material Brand Specifications</label>
          <textarea
            rows="3"
            value={materialSpecifications}
            onChange={(e) => setMaterialSpecifications(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
          ></textarea>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Exclusions & Standard Conditions</label>
          <textarea
            rows="2"
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
          ></textarea>
        </div>

        <div className="flex justify-end pt-4 space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white rounded-xl text-xs font-bold shadow transition"
          >
            {saving ? 'Creating Quotation...' : 'Create Quotation Document'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
