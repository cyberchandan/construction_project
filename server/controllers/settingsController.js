const SiteSettings = require('../models/SiteSettings');

const defaultSettings = {
  businessName: 'BuildConnect NCR',
  ownerName: 'Senior Construction Director',
  tagline: 'Build Your Dream Home with Confidence',
  phone: process.env.BUSINESS_PHONE || '+91 98100 12345',
  whatsapp: process.env.BUSINESS_WHATSAPP || '+91 98100 12345',
  email: process.env.BUSINESS_EMAIL || 'contact@buildconnectncr.com',
  officeAddress: 'Commercial Hub, Sector 62, Noida & Greater Noida West, UP 201301',
  serviceAreas: ['Noida', 'Greater Noida', 'Greater Noida West (Noida Extension)', 'Yamuna Expressway'],
  calculatorRates: {
    materialLabourRate: 1800,
    labourOnlyRate: 500,
  },
  calculatorDisclaimer:
    'This calculation is an indicative estimate only and does not constitute a binding contract. Final costs depend on structural design, material grade selection, site conditions, scope, taxes, and exclusions.',
  primaryColor: '#172C25',
  accentColor: '#B8D9B4',
};

// @desc    Get Public Business & Cost Calculator Settings
// @route   GET /api/v1/settings/public
// @access  Public
const getPublicSettings = async (req, res, next) => {
  try {
    let settings = null;
    try {
      settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(defaultSettings);
      }
    } catch (dbErr) {
      settings = defaultSettings;
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin Update Business Settings
// @route   PATCH /api/v1/settings
// @access  Private (Admin Only)
const updateSettings = async (req, res, next) => {
  try {
    const updates = req.body;

    let settings = null;
    try {
      settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create({ ...defaultSettings, ...updates });
      } else {
        Object.assign(settings, updates);
        await settings.save();
      }
    } catch (dbErr) {
      Object.assign(defaultSettings, updates);
      settings = defaultSettings;
    }

    res.status(200).json({
      success: true,
      message: 'Business settings updated successfully',
      settings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicSettings,
  updateSettings,
};
