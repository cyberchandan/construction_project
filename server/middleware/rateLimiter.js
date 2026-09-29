const rateLimit = require('express-rate-limit');

// Rate limiter for lead form submissions (10 requests per 15 mins per IP)
const leadFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many quote requests submitted from this device. Please try again after 15 minutes or contact us directly via WhatsApp/Call.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for login endpoint (5 attempts per 15 mins)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many failed login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { leadFormLimiter, loginLimiter };
