const express = require('express');
const router = express.Router();
const { createLead, getLeads, getLeadById, updateLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const { leadFormLimiter } = require('../middleware/rateLimiter');

// Public lead submission
router.post('/', leadFormLimiter, createLead);

// Protected admin/staff lead management
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.patch('/:id', protect, updateLead);

module.exports = router;
