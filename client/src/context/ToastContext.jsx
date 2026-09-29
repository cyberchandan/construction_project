import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  showToast: (message, type = 'success') => {},
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-20 right-4 z-50 max-w-sm w-full animate-bounce-in">
          <div
            className={`p-4 rounded-xl shadow-2xl flex items-start space-x-3 text-white border ${
              toast.type === 'error'
                ? 'bg-red-700 border-red-500'
                : toast.type === 'info'
                ? 'bg-blue-700 border-blue-500'
                : 'bg-navy-900 border-gold-500/50 text-gold-300'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-200 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 flex-shrink-0 text-blue-200 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-gold-400 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-semibold leading-snug">{toast.message}</div>
            <button
              onClick={() => setToast(null)}
              className="text-white/80 hover:text-white transition"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
