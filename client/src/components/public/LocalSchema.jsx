import React from 'react';
import { useSettings } from '../../context/SettingsContext';

export const LocalSchema = () => {
  const { settings } = useSettings();

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: settings.businessName || 'BuildConnect NCR',
    description: 'Premier house construction company serving Noida and Greater Noida.',
    url: window.location.origin,
    telephone: settings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.officeAddress,
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    areaServed: ['Noida', 'Greater Noida', 'Greater Noida West', 'Yamuna Expressway'],
    priceRange: '₹1600 - ₹2500 per sq ft',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
    />
  );
};
