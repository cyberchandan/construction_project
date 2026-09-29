const Quote = require('../models/Quote');
const Lead = require('../models/Lead');
const LeadActivity = require('../models/LeadActivity');

let memoryQuotes = [];

// @desc    Get Quotes for a specific lead or all quotes
// @route   GET /api/v1/quotes
// @access  Private (Admin/Staff)
const getQuotes = async (req, res, next) => {
  try {
    const { leadId } = req.query;

    let query = {};
    if (leadId) query.lead = leadId;

    try {
      const quotes = await Quote.find(query).populate('lead', 'name phone location serviceType areaSqFt').sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: quotes.length,
        quotes,
      });
    } catch (dbErr) {
      let filtered = [...memoryQuotes];
      if (leadId) filtered = filtered.filter((q) => String(q.lead) === String(leadId));
      return res.status(200).json({
        success: true,
        count: filtered.length,
        quotes: filtered,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Quote by ID (for print view & detail)
// @route   GET /api/v1/quotes/:id
// @access  Private (Admin/Staff)
const getQuoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let quote;
    try {
      quote = await Quote.findById(id).populate('lead');
    } catch (dbErr) {
      quote = memoryQuotes.find((q) => String(q._id) === String(id));
    }

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quotation document not found' });
    }

    res.status(200).json({
      success: true,
      quote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Formal Quotation linked to Lead
// @route   POST /api/v1/quotes
// @access  Private (Admin/Staff)
const createQuote = async (req, res, next) => {
  try {
    const { leadId, contractType, estimatedAmount, scopeOfWork, materialSpecifications, exclusions, paymentMilestones, validUntil } = req.body;

    if (!leadId || !estimatedAmount) {
      return res.status(400).json({
        success: false,
        message: 'Lead ID and estimated amount are required to create a quotation.',
      });
    }

    let lead;
    try {
      lead = await Lead.findById(leadId);
    } catch (dbErr) {
      lead = { _id: leadId, name: 'Sample Customer', serviceType: contractType || 'material_labour' };
    }

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Associated lead not found.' });
    }

    // Determine version number
    let existingCount = 0;
    try {
      existingCount = await Quote.countDocuments({ lead: leadId });
    } catch (e) {
      existingCount = memoryQuotes.filter((q) => String(q.lead) === String(leadId)).length;
    }
    const version = existingCount + 1;

    // Default milestone schedule if not provided
    const defaultMilestones = [
      { milestone: 'Booking & Architecture Design Approval', percentage: 10, amount: Math.round(estimatedAmount * 0.1) },
      { milestone: 'Foundation & Plinth Level Concrete Work', percentage: 20, amount: Math.round(estimatedAmount * 0.2) },
      { milestone: 'Slab Casting & RCC Superstructure', percentage: 35, amount: Math.round(estimatedAmount * 0.35) },
      { milestone: 'Brickwork, Plastering & Electrical Piping', percentage: 20, amount: Math.round(estimatedAmount * 0.2) },
      { milestone: 'Finishing, Flooring, Paint & Handover', percentage: 15, amount: Math.round(estimatedAmount * 0.15) },
    ];

    let newQuote;
    try {
      newQuote = await Quote.create({
        lead: leadId,
        version,
        contractType: contractType || lead.serviceType || 'material_labour',
        estimatedAmount: Number(estimatedAmount),
        scopeOfWork: scopeOfWork || 'Complete civil structure construction as per architectural drawings.',
        materialSpecifications: materialSpecifications || 'UltraTech/ACC Cement, Tata Tiscon TMT Steel (Fe550), Red Brick / AAC Block masonry.',
        exclusions: exclusions || 'Government submission fees, external main line electrical connection, sub-soil testing charges.',
        paymentMilestones: paymentMilestones || defaultMilestones,
        validUntil: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'draft',
      });

      // Update lead status to quote-sent if not already won/lost
      if (lead.status === 'new' || lead.status === 'contacted' || lead.status === 'site-visit') {
        lead.status = 'quote-sent';
        await lead.save();
      }

      await LeadActivity.create({
        lead: leadId,
        actorName: req.user ? req.user.name : 'Staff',
        activityType: 'quote_created',
        details: `Created Quotation v${version} for ₹${Number(estimatedAmount).toLocaleString('en-IN')}`,
      });
    } catch (dbErr) {
      newQuote = {
        _id: 'q_' + Date.now(),
        lead: leadId,
        version,
        contractType: contractType || 'material_labour',
        estimatedAmount: Number(estimatedAmount),
        scopeOfWork: scopeOfWork || 'Standard civil construction scope.',
        materialSpecifications: materialSpecifications || 'Standard grade materials.',
        exclusions: exclusions || 'Standard exclusions.',
        paymentMilestones: paymentMilestones || defaultMilestones,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'draft',
        createdAt: new Date(),
      };
      memoryQuotes.unshift(newQuote);
    }

    res.status(201).json({
      success: true,
      message: 'Quotation document generated successfully',
      quote: newQuote,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Quote Status (sent, accepted, rejected)
// @route   PATCH /api/v1/quotes/:id
// @access  Private (Admin/Staff)
const updateQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, scopeOfWork, materialSpecifications, exclusions, estimatedAmount } = req.body;

    try {
      const quote = await Quote.findById(id);
      if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' });

      if (status) quote.status = status;
      if (scopeOfWork) quote.scopeOfWork = scopeOfWork;
      if (materialSpecifications) quote.materialSpecifications = materialSpecifications;
      if (exclusions) quote.exclusions = exclusions;
      if (estimatedAmount) quote.estimatedAmount = Number(estimatedAmount);

      await quote.save();

      // If quote status is accepted, automatically update lead status to won
      if (status === 'accepted') {
        await Lead.findByIdAndUpdate(quote.lead, { status: 'won' });
      }

      return res.status(200).json({
        success: true,
        message: 'Quotation updated successfully',
        quote,
      });
    } catch (dbErr) {
      const idx = memoryQuotes.findIndex((q) => String(q._id) === String(id));
      if (idx === -1) return res.status(404).json({ success: false, message: 'Quote not found' });
      memoryQuotes[idx] = { ...memoryQuotes[idx], ...req.body };
      return res.status(200).json({ success: true, message: 'Quotation updated successfully (Memory Mode)', quote: memoryQuotes[idx] });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
};
