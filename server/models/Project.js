const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
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
    areaSqFt: {
      type: Number,
      required: [true, 'Area in sq ft is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      default: '',
    },
    completionDate: {
      type: String,
      default: 'Recently Completed',
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

projectSchema.index({ isPublished: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
