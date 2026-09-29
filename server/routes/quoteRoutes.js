const express = require('express');
const router = express.Router();
const { getQuotes, getQuoteById, createQuote, updateQuote } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All quotation operations require authentication

router.get('/', getQuotes);
router.get('/:id', getQuoteById);
router.post('/', createQuote);
router.patch('/:id', updateQuote);

module.exports = router;
