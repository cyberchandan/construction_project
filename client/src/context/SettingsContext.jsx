import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultSettings = {
  businessName: 'BuildConnect NCR',
  ownerName: 'Construction Director',
  tagline: 'Build Your Dream Home with Confidence',
  phone: '+91 98100 12345',
  whatsapp: '+91 98100 12345',
  email: 'contact@buildconnectncr.com',
  officeAddress: 'Office 402, Commercial Hub, Sector 62, Noida & Greater Noida West, UP 201301',
  serviceAreas: ['Noida', 'Greater Noida', 'Greater Noida West (Noida Extension)', 'Yamuna Expressway'],
  calculatorRates: {
    materialLabourRate: 1800,
    labourOnlyRate: 500,
  },
  calculatorDisclaimer:
    'This calculation is an indicative estimate only and does not constitute a binding contract. Final cost depends on structural design, material selection, site conditions, taxes, and custom scope.',
  primaryColor: '#384959',
  accentColor: '#88BDF2',
};

const SettingsContext = createContext({
  settings: defaultSettings,
  loading: false,
  refreshSettings: () => {},
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/v1/settings/public');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings((prev) => ({
          ...prev,
          ...data.settings,
          calculatorRates: {
            ...prev.calculatorRates,
            ...(data.settings.calculatorRates || {}),
          },
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch dynamic site settings, using default placeholders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
