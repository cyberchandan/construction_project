const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    addedBy: { type: String, default: 'System' },
  },
  { timestamps: true }
);

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      enum: ['material_labour', 'labour_only'],
    },
    projectType: {
      type: String,
      enum: ['new_construction', 'renovation', 'other'],
      default: 'new_construction',
    },
    areaSqFt: {
      type: Number,
      required: [true, 'Construction area in sq ft is required'],
      min: [100, 'Minimum area is 100 sq ft'],
    },
    floors: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    budget: {
      type: String,
      default: 'Not specified',
    },
    startDate: {
      type: String,
      default: 'Immediate',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    source: {
      type: String,
      default: 'direct_website',
    },
    landingPage: {
      type: String,
      default: '/',
    },
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'site-visit', 'quote-sent', 'won', 'lost'],
      default: 'new',
      index: true,
    },
    nextFollowUp: Date,
    notes: [noteSchema],
    lostReason: String,
    consent: {
      type: Boolean,
      required: [true, 'Consent is required'],
    },
  },
  { timestamps: true }
);

// Compound indexes for analytics and listing speed
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
