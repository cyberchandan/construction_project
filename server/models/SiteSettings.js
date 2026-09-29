const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'BuildConnect NCR',
    },
    ownerName: {
      type: String,
      default: 'Construction Director',
    },
    tagline: {
      type: String,
      default: 'Build Your Dream Home with Confidence',
    },
    phone: {
      type: String,
      default: '+91 98100 12345',
    },
    whatsapp: {
      type: String,
      default: '+91 98100 12345',
    },
    email: {
      type: String,
      default: 'contact@buildconnectncr.com',
    },
    officeAddress: {
      type: String,
      default: 'Office No. 402, Commercial Hub, Sector 62, Noida, Uttar Pradesh 201301',
    },
    serviceAreas: {
      type: [String],
      default: ['Noida', 'Greater Noida', 'Greater Noida West (Noida Extension)', 'Yamuna Expressway'],
    },
    calculatorRates: {
      materialLabourRate: {
        type: Number,
        default: 1800, // ₹1,800 / sqft default sample rate
      },
      labourOnlyRate: {
        type: Number,
        default: 500, // ₹500 / sqft default sample rate
      },
    },
    calculatorDisclaimer: {
      type: String,
      default:
        'This calculation is an indicative estimate only and does not constitute a binding legal contract. Final cost depends on structural design, material grade selection, site accessibility, architectural drawings, taxes, and custom requirements.',
    },
    primaryColor: {
      type: String,
      default: '#172C25',
    },
    accentColor: {
      type: String,
      default: '#B8D9B4',
    },
    isLive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
