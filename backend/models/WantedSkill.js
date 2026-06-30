const mongoose = require('mongoose');

const wantedSkillSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Prevent duplicate wanted skill per user
wantedSkillSchema.index({ userId: 1, skillName: 1 }, { unique: true });
wantedSkillSchema.index({ userId: 1, categoryId: 1 });

module.exports = mongoose.model('WantedSkill', wantedSkillSchema);
