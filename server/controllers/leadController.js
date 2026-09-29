const Lead = require('../models/Lead');
const LeadActivity = require('../models/LeadActivity');
const Quote = require('../models/Quote');
const { sendLeadNotificationEmail } = require('../utils/email');

// Memory store fallback if MongoDB is not running locally
let memoryLeads = [];
let memoryActivities = [];

// @desc    Submit Public Lead Quote Enquiry
// @route   POST /api/v1/leads
// @access  Public
const createLead = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      location,
      serviceType,
      projectType,
      areaSqFt,
      floors,
      budget,
      startDate,
      message,
      source,
      landingPage,
      utmSource,
      utmMedium,
      utmCampaign,
      consent,
    } = req.body;

    // Server-side Validation
    if (!name || !phone || !location || !serviceType || !areaSqFt) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields: Name, Phone, Location, Service Type, and Construction Area.',
      });
    }

    if (consent !== true && consent !== 'true') {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the Privacy Policy to submit a quotation request.',
      });
    }

    // Clean Indian Phone Number (extract 10 digits)
    const cleanedPhone = String(phone).replace(/\D/g, '').slice(-10);
    if (cleanedPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit Indian mobile number (e.g. 9810012345).',
      });
    }

    const formattedPhone = `+91 ${cleanedPhone}`;

    // Duplicate check within last 10 minutes
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);

    let newLead;
    try {
      const recentDuplicate = await Lead.findOne({
        phone: formattedPhone,
        createdAt: { $gte: tenMinsAgo },
      });

      if (recentDuplicate) {
        return res.status(400).json({
          success: false,
          message: 'An enquiry with this mobile number was recently submitted. Our team is already reviewing it! You can also chat directly with us on WhatsApp.',
          whatsappUrl: `https://wa.me/91${cleanedPhone}?text=${encodeURIComponent('Hello BuildConnect NCR, I submitted an enquiry for ' + location + '.')}`,
        });
      }

      newLead = await Lead.create({
        name: name.trim(),
        phone: formattedPhone,
        email: email ? email.trim().toLowerCase() : '',
        location: location.trim(),
        serviceType,
        projectType: projectType || 'new_construction',
        areaSqFt: Number(areaSqFt),
        floors: Number(floors || 1),
        budget: budget || 'Not specified',
        startDate: startDate || 'Immediate',
        message: message ? message.trim() : '',
        source: source || 'website_form',
        landingPage: landingPage || '/',
        utmSource,
        utmMedium,
        utmCampaign,
        consent: true,
      });

      // Create activity record
      await LeadActivity.create({
        lead: newLead._id,
        actorName: 'Visitor (Web Form)',
        activityType: 'created',
        details: `Lead created via ${newLead.source} for ${newLead.serviceType} in ${newLead.location} (${newLead.areaSqFt} sq ft).`,
      });
    } catch (dbErr) {
      // Memory Fallback
      newLead = {
        _id: 'lead_' + Date.now(),
        name: name.trim(),
        phone: formattedPhone,
        email: email ? email.trim().toLowerCase() : '',
        location: location.trim(),
        serviceType,
        projectType: projectType || 'new_construction',
        areaSqFt: Number(areaSqFt),
        floors: Number(floors || 1),
        budget: budget || 'Not specified',
        startDate: startDate || 'Immediate',
        message: message ? message.trim() : '',
        source: source || 'website_form',
        landingPage: landingPage || '/',
        status: 'new',
        consent: true,
        createdAt: new Date(),
      };
      memoryLeads.unshift(newLead);
    }

    // Trigger async email notification if configured
    sendLeadNotificationEmail(newLead).catch((err) =>
      console.error('Async email notification error:', err)
    );

    // Build prefilled WhatsApp message for user action
    const bizPhone = (process.env.BUSINESS_WHATSAPP || '919810012345').replace(/\D/g, '');
    const serviceLabel = newLead.serviceType === 'material_labour' ? 'Material + Labour Contract' : 'Labour-Only Contract';
    const waText = encodeURIComponent(
      `Hello BuildConnect NCR! I just submitted a quote request for a ${serviceLabel} in ${newLead.location}.\n` +
      `Area: ${newLead.areaSqFt} sq ft (${newLead.floors} floors)\n` +
      `Name: ${newLead.name}\n` +
      `Phone: ${newLead.phone}`
    );
    const whatsappUrl = `https://wa.me/${bizPhone}?text=${waText}`;

    res.status(201).json({
      success: true,
      message: 'Thank you! Your construction enquiry has been received successfully. Our team will contact you within 24 hours.',
      leadId: newLead._id,
      whatsappUrl,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Paginated & Filtered Leads (Admin/Staff)
// @route   GET /api/v1/leads
// @access  Private (Admin/Staff)
const getLeads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const skip = (page - 1) * limit;

    const { status, serviceType, search, startDate, endDate } = req.query;

    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (serviceType && serviceType !== 'all') {
      query.serviceType = serviceType;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { location: searchRegex },
        { email: searchRegex },
      ];
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    try {
      const total = await Lead.countDocuments(query);
      const leads = await Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return res.status(200).json({
        success: true,
        count: leads.length,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
        leads,
      });
    } catch (dbErr) {
      // Memory fallback
      let filtered = [...memoryLeads];
      if (status && status !== 'all') filtered = filtered.filter((l) => l.status === status);
      if (serviceType && serviceType !== 'all') filtered = filtered.filter((l) => l.serviceType === serviceType);
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.name.toLowerCase().includes(s) ||
            l.phone.includes(s) ||
            l.location.toLowerCase().includes(s)
        );
      }
      return res.status(200).json({
        success: true,
        count: filtered.length,
        total: filtered.length,
        page: 1,
        pages: 1,
        leads: filtered,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Lead Detail by ID
// @route   GET /api/v1/leads/:id
// @access  Private (Admin/Staff)
const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let lead;
    let activities = [];
    let quotes = [];

    try {
      lead = await Lead.findById(id);
      if (lead) {
        activities = await LeadActivity.find({ lead: id }).sort({ createdAt: -1 });
        quotes = await Quote.find({ lead: id }).sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      lead = memoryLeads.find((l) => String(l._id) === String(id));
      activities = memoryActivities.filter((a) => String(a.lead) === String(id));
    }

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    res.status(200).json({
      success: true,
      lead,
      activities,
      quotes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Lead Status / Notes / Followup
// @route   PATCH /api/v1/leads/:id
// @access  Private (Admin/Staff)
const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, nextFollowUp, noteText, lostReason } = req.body;

    let lead;
    try {
      lead = await Lead.findById(id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found.' });
      }

      const prevStatus = lead.status;

      if (status && status !== prevStatus) {
        lead.status = status;
        await LeadActivity.create({
          lead: lead._id,
          actorName: req.user ? req.user.name : 'Staff',
          activityType: 'status_change',
          details: `Status updated from '${prevStatus}' to '${status}'.`,
          previousValue: prevStatus,
          newValue: status,
        });
      }

      if (nextFollowUp) {
        lead.nextFollowUp = new Date(nextFollowUp);
        await LeadActivity.create({
          lead: lead._id,
          actorName: req.user ? req.user.name : 'Staff',
          activityType: 'follow_up_scheduled',
          details: `Next follow-up scheduled for ${new Date(nextFollowUp).toLocaleDateString('en-IN')}`,
        });
      }

      if (lostReason && status === 'lost') {
        lead.lostReason = lostReason;
      }

      if (noteText && noteText.trim()) {
        lead.notes.push({
          text: noteText.trim(),
          addedBy: req.user ? req.user.name : 'Staff',
          createdAt: new Date(),
        });

        await LeadActivity.create({
          lead: lead._id,
          actorName: req.user ? req.user.name : 'Staff',
          activityType: 'note_added',
          details: `Added note: "${noteText.trim()}"`,
        });
      }

      await lead.save();

      return res.status(200).json({
        success: true,
        message: 'Lead updated successfully',
        lead,
      });
    } catch (dbErr) {
      lead = memoryLeads.find((l) => String(l._id) === String(id));
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      if (status) lead.status = status;
      if (lostReason) lead.lostReason = lostReason;
      if (noteText) {
        if (!lead.notes) lead.notes = [];
        lead.notes.push({ text: noteText, addedBy: 'Staff', createdAt: new Date() });
      }
      return res.status(200).json({
        success: true,
        message: 'Lead updated successfully (Memory Mode)',
        lead,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
};
