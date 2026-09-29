import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatsCard } from '../../components/admin/StatsCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Users, FileText, CheckCircle2, TrendingUp, Building2, Calendar, Award, DollarSign } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export const AdminDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [range, setRange] = useState('30days');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/dashboard/stats?range=${range}`);
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [range]);

  const metrics = data?.metrics || {};
  const charts = data?.charts || {};

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader title="Business Analytics & Lead Dashboard" onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Lead Performance Metrics Overview
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-semibold">Time Range:</span>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner label="Compiling Dashboard Metrics & Analytics..." />
          ) : (
            <>
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Total Enquiries" value={metrics.totalLeads || 0} subtitle="All inbound quote leads" icon={Users} />
                <StatsCard title="New Enquiries" value={metrics.newLeads || 0} subtitle="Awaiting initial response" icon={Calendar} />
                <StatsCard title="Won Contracts" value={metrics.wonLeads || 0} subtitle="Signed construction deals" icon={Award} />
                <StatsCard title="Conversion Rate" value={`${metrics.conversionRate || 0}%`} subtitle="Won / Total Lead Ratio" icon={TrendingUp} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatsCard title="Site Visits" value={metrics.siteVisits || 0} subtitle="Scheduled on-plot visits" icon={Building2} />
                <StatsCard title="Quotes Sent" value={metrics.quotesSent || 0} subtitle="Proposals dispatched" icon={FileText} />
                <StatsCard title="Total Quoted Value" value={formatCurrencyINR(metrics.totalQuotedValue || 0)} subtitle="Sent & Accepted proposals" icon={DollarSign} />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Line Chart: Enquiry Trends */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                  <h3 className="text-base font-bold font-display text-forest-900">
                    Lead Enquiry Trends over Time
                  </h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={charts.trendData || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                        <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="enquiries" stroke="#172C25" strokeWidth={3} dot={{ fill: '#B8D9B4', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart: Status Distribution */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                  <h3 className="text-base font-bold font-display text-forest-900">
                    Lead Status Distribution
                  </h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={charts.statusDistribution || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {(charts.statusDistribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || '#172C25'} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Bar Chart: Source Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <h3 className="text-base font-bold font-display text-forest-900">
                  Lead Acquisition Source Performance
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={charts.sourceBreakdown || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="source" stroke="#64748B" fontSize={11} />
                      <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#172C25" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
