import React, { useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

export const SEO = ({ title, description, keywords, canonical }) => {
  const { settings } = useSettings();

  const fullTitle = title
    ? `${title} | ${settings.businessName || 'BuildConnect NCR'}`
    : `BuildConnect NCR | Construction Company Noida & Greater Noida`;

  const metaDesc =
    description ||
    `Build your home with confidence in Noida & Greater Noida. Offering material + labour turnkey contracts & labour-only construction with transparent cost estimates.`;

  useEffect(() => {
    document.title = fullTitle;

    // Update meta description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.name = 'description';
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.content = metaDesc;
  }, [fullTitle, metaDesc]);

  return null;
};
