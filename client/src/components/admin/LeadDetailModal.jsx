import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Phone, MessageSquare, Calendar, FilePlus, History, StickyNote, AlertCircle } from 'lucide-react';
import { formatStatusBadge, formatDateIN } from '../../utils/formatters';
import { getWhatsAppLink } from '../../utils/whatsapp';
import { useToast } from '../../context/ToastContext';

export const LeadDetailModal = ({ leadId, isOpen, onClose, onRefresh, onCreateQuote }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('new');
  const [nextFollowUp, setNextFollowUp] = useState('');
  const [noteText, setNoteText] = useState('');
  const [lostReason, setLostReason] = useState('');
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const fetchDetail = async () => {
    if (!leadId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/leads/${leadId}`);
      const json = await res.json();
      if (json.success) {
        setData(json);
        setStatus(json.lead.status);
        setNextFollowUp(json.lead.nextFollowUp ? json.lead.nextFollowUp.split('T')[0] : '');
        setLostReason(json.lead.lostReason || '');
      }
    } catch (err) {
      showToast('Failed to load lead detail.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && leadId) {
      fetchDetail();
    }
  }, [isOpen, leadId]);

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/v1/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          nextFollowUp,
          noteText,
          lostReason: status === 'lost' ? lostReason : '',
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Lead updated successfully!', 'success');
        setNoteText('');
        fetchDetail();
        if (onRefresh) onRefresh();
      } else {
        showToast(json.message || 'Failed to update lead.', 'error');
      }
    } catch (err) {
      showToast('Error updating lead status.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const lead = data?.lead;
  const activities = data?.activities || [];
  const quotes = data?.quotes || [];

  const waUrl = lead
    ? getWhatsAppLink(
        lead.phone,
        `Hello ${lead.name}, regarding your BuildConnect NCR construction enquiry for ${lead.location}.`
      )
    : '#';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Lead Management: ${lead?.name || 'Loading...'}`} maxWidth="max-w-4xl">
      {loading || !lead ? (
        <LoadingSpinner label="Fetching Lead details..." />
      ) : (
        <div className="space-y-6">
          {/* Top Quick Actions Bar */}
          <div className="bg-forest-50 p-4 rounded-2xl border border-forest-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${formatStatusBadge(lead.status).bg}`}>
                {formatStatusBadge(lead.status).label}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Submitted on {formatDateIN(lead.createdAt)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`tel:${lead.phone}`}
                className="px-3 py-2 bg-white text-forest-800 border border-slate-300 font-bold text-xs rounded-xl hover:bg-slate-50 flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call ({lead.phone})</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 flex items-center space-x-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => onCreateQuote(lead)}
                className="px-3.5 py-2 bg-forest-700 text-sage-300 font-bold text-xs rounded-xl hover:bg-forest-800 flex items-center space-x-1 shadow"
              >
                <FilePlus className="w-3.5 h-3.5" />
                <span>Generate Quotation</span>
              </button>
            </div>
          </div>

          {/* Lead Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Customer Info</span>
              <p className="font-bold text-sm text-forest-900">{lead.name}</p>
              <p className="text-slate-600 mt-0.5">{lead.phone}</p>
              <p className="text-slate-600">{lead.email || 'No email provided'}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Scope</span>
              <p className="font-bold text-sm text-forest-900">{lead.location}</p>
              <p className="text-slate-600 mt-0.5">
                {lead.serviceType === 'material_labour' ? 'Material + Labour' : 'Labour Only'} • {lead.areaSqFt} sq ft ({lead.floors} floors)
              </p>
              <p className="text-slate-600">Timeline: {lead.startDate || 'Immediate'}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Attribution & Source</span>
              <p className="font-bold text-sm text-forest-900">Source: {lead.source}</p>
              <p className="text-slate-600 mt-0.5">Page: {lead.landingPage}</p>
              <p className="text-slate-600">Next Follow-Up: {lead.nextFollowUp ? formatDateIN(lead.nextFollowUp) : 'Not scheduled'}</p>
            </div>
          </div>

          {/* Customer Requirements Message */}
          {lead.message && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
              <span className="font-bold block mb-1">Additional Requirements / Customer Note:</span>
              <p className="italic">{lead.message}</p>
            </div>
          )}

          {/* Update Status & Add Notes Form */}
          <form onSubmit={handleSaveUpdate} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-sm font-bold text-forest-900 font-display">Update Lead Status & Add Log Note</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lead Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="site-visit">Site Visit Scheduled</option>
                  <option value="quote-sent">Quote Sent</option>
                  <option value="won">Won Contract</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Schedule Next Follow-Up Date</label>
                <input
                  type="date"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            {status === 'lost' && (
              <div>
                <label className="block text-xs font-bold text-red-600 uppercase mb-1">Reason for Lost Lead *</label>
                <input
                  type="text"
                  placeholder="e.g. Budget mismatch, hired local contractor, project delayed..."
                  value={lostReason}
                  onChange={(e) => setLostReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-red-300 text-xs font-medium"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Add Internal Follow-Up Note</label>
              <textarea
                rows="2"
                placeholder="Log call discussion, site visit notes, material preference details..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs rounded-xl shadow transition"
              >
                {saving ? 'Saving Updates...' : 'Save Lead Updates'}
              </button>
            </div>
          </form>

          {/* Audit History Log */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-forest-900 font-display flex items-center space-x-1.5">
              <History className="w-4 h-4 text-forest-700" />
              <span>Activity & Audit Trail History</span>
            </h4>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-h-48 overflow-y-auto space-y-2 text-xs">
              {activities.length === 0 ? (
                <p className="text-slate-400 italic">No activity logs recorded yet.</p>
              ) : (
                activities.map((act) => (
                  <div key={act._id} className="pb-2 border-b border-slate-200/60 last:border-none">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>{act.actorName}</span>
                      <span className="text-[11px] text-slate-400">{formatDateIN(act.createdAt)}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{act.details}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
