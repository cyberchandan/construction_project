const express = require('express');
const router = express.Router();
const { login, logout, getMe, createStaff } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

// Admin-only staff account creation endpoint (/api/v1/admin/staff)
router.post('/admin/staff', protect, authorize('admin'), createStaff);

module.exports = router;
