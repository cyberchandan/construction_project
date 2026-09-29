import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { LeadTable } from '../../components/admin/LeadTable';
import { LeadDetailModal } from '../../components/admin/LeadDetailModal';
import { QuoteModal } from '../../components/admin/QuoteModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Search, Filter, RefreshCw } from 'lucide-react';

export const AdminLeadsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [quoteLead, setQuoteLead] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (statusFilter !== 'all') queryParams.append('status', statusFilter);
      if (serviceFilter !== 'all') queryParams.append('serviceType', serviceFilter);

      const res = await fetch(`/api/v1/leads?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, serviceFilter]);

  const handleSelectLead = (id) => {
    setSelectedLeadId(id);
    setIsDetailOpen(true);
  };

  const handleTriggerQuote = (lead) => {
    setIsDetailOpen(false);
    setQuoteLead(lead);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader title="Inbound Construction Lead Enquiries" onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, phone, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchLeads()}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-forest-700"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-500 font-semibold">Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="new">New Lead</option>
                <option value="contacted">Contacted</option>
                <option value="site-visit">Site Visit</option>
                <option value="quote-sent">Quote Sent</option>
                <option value="won">Won Contract</option>
                <option value="lost">Lost</option>
              </select>

              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              >
                <option value="all">All Services</option>
                <option value="material_labour">Material + Labour</option>
                <option value="labour_only">Labour Only</option>
              </select>

              <button
                onClick={fetchLeads}
                className="p-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600"
                title="Refresh leads"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lead Table */}
          {loading ? (
            <LoadingSpinner label="Fetching customer lead enquiries..." />
          ) : leads.length === 0 ? (
            <EmptyState title="No leads match filters" description="Try broadening your search query or status filters." />
          ) : (
            <LeadTable leads={leads} onSelectLead={handleSelectLead} />
          )}
        </main>
      </div>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        leadId={selectedLeadId}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onRefresh={fetchLeads}
        onCreateQuote={handleTriggerQuote}
      />

      {/* Quote Generation Modal */}
      <QuoteModal
        lead={quoteLead}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        onQuoteCreated={() => fetchLeads()}
      />
    </div>
  );
};
