const mongoose = require('mongoose');

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const VISIBILITY_OPTIONS = ['Public', 'Private'];

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SkillCategory',
      required: [true, 'Category is required'],
    },
    skillName: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [150, 'Skill name cannot exceed 150 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    experienceLevel: {
      type: String,
      enum: { values: EXPERIENCE_LEVELS, message: '{VALUE} is not a valid experience level' },
      required: [true, 'Experience level is required'],
    },
    yearsExperience: {
      type: Number,
      min: [0, 'Years of experience cannot be negative'],
      max: [50, 'Years of experience cannot exceed 50'],
      default: 0,
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },
    certificateUrl: {
      type: String,
      trim: true,
    },
    visibility: {
      type: String,
      enum: { values: VISIBILITY_OPTIONS, message: '{VALUE} is not a valid visibility option' },
      default: 'Public',
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicate skill names per user
skillSchema.index({ userId: 1, skillName: 1 }, { unique: true });
skillSchema.index({ categoryId: 1 });
skillSchema.index({ experienceLevel: 1 });
skillSchema.index({ visibility: 1, isArchived: 1 });
// Full-text search index
skillSchema.index({ skillName: 'text', description: 'text' });

module.exports = mongoose.model('Skill', skillSchema);
