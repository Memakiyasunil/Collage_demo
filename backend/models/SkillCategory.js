const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Category name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SkillCategory',
      default: null,
    },
    icon: {
      type: String,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

skillCategorySchema.index({ name: 1 });
skillCategorySchema.index({ parentCategoryId: 1 });
skillCategorySchema.index({ isActive: 1, displayOrder: 1 });

module.exports = mongoose.model('SkillCategory', skillCategorySchema);
