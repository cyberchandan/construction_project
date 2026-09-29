const express = require('express');
const router = express.Router();
const { getPublicSettings, updateSettings } = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public settings endpoint (business phone, rates, disclaimer)
router.get('/public', getPublicSettings);

// Admin-only update settings
router.patch('/', protect, authorize('admin'), updateSettings);

module.exports = router;
