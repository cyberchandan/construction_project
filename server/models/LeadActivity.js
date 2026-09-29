const mongoose = require('mongoose');

const leadActivitySchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
      index: true,
    },
    actorName: {
      type: String,
      default: 'System',
    },
    activityType: {
      type: String,
      enum: ['status_change', 'note_added', 'quote_created', 'follow_up_scheduled', 'created'],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    previousValue: String,
    newValue: String,
  },
  { timestamps: true }
);

leadActivitySchema.index({ lead: 1, createdAt: -1 });

module.exports = mongoose.model('LeadActivity', leadActivitySchema);
