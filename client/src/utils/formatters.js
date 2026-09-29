export const formatCurrencyINR = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDateIN = (dateString) => {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatStatusBadge = (status) => {
  switch (status) {
    case 'new':
      return { label: 'New Lead', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'contacted':
      return { label: 'Contacted', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
    case 'site-visit':
      return { label: 'Site Visit', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    case 'quote-sent':
      return { label: 'Quote Sent', bg: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
    case 'won':
      return { label: 'Won Contract', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    case 'lost':
      return { label: 'Lost', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
    default:
      return { label: status || 'Pending', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
  }
};
