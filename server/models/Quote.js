const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  milestone: { type: String, required: true },
  percentage: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const quoteSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: [true, 'Associated lead reference is required'],
      index: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    contractType: {
      type: String,
      enum: ['material_labour', 'labour_only'],
      required: true,
    },
    estimatedAmount: {
      type: Number,
      required: [true, 'Estimated amount is required'],
      min: 0,
    },
    scopeOfWork: {
      type: String,
      default: '',
    },
    materialSpecifications: {
      type: String,
      default: '',
    },
    exclusions: {
      type: String,
      default: 'Government approval fees, temporary electricity connection, deep borewell setup unless specified.',
    },
    paymentMilestones: [milestoneSchema],
    validUntil: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days validity
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'accepted', 'rejected'],
      default: 'draft',
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
