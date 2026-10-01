import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { PrintQuoteModal } from '../../components/admin/PrintQuoteModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Printer, FileText, Calendar } from 'lucide-react';
import { formatCurrencyINR, formatDateIN } from '../../utils/formatters';

export const AdminQuotesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/quotes');
      const data = await res.json();
      if (data.success) {
        setQuotes(data.quotes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handlePrintLaunch = (quote) => {
    setSelectedQuote(quote);
    setIsPrintOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader title="Client Quotations & Contract Proposals" onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold font-display text-forest-900">Formal Quotation Archive</h3>
              <p className="text-xs text-slate-500">View generated version proposals and print client copies.</p>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner label="Fetching client quotations..." />
          ) : quotes.length === 0 ? (
            <EmptyState title="No quotations generated yet" description="Go to 'Leads & Enquiries' and click 'Manage' -> 'Generate Quotation' on any customer lead." />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-forest-900 text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4">Quote Ref</th>
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">Contract Type</th>
                    <th className="py-3.5 px-4">Estimated Total</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Created Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quotes.map((q) => (
                    <tr key={q._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-forest-900">
                        #{q._id ? q._id.slice(-6).toUpperCase() : 'BCN-101'} (v{q.version})
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {q.lead?.name || 'Customer'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold">
                          {q.contractType === 'material_labour' ? 'Material + Labour' : 'Labour Only'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-forest-900">
                        {formatCurrencyINR(q.estimatedAmount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          q.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                          q.status === 'sent' ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {formatDateIN(q.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handlePrintLaunch(q)}
                          className="px-3 py-1.5 bg-[#88BDF2] hover:bg-[#6A89A7] text-[#384959] hover:text-white text-xs font-bold rounded-lg shadow inline-flex items-center space-x-1 transition"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print / Export</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <PrintQuoteModal
        quote={selectedQuote}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />
    </div>
  );
};
