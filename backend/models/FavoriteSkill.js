const mongoose = require('mongoose');

const favoriteSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Skill ID is required'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate favorites
favoriteSkillSchema.index({ userId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model('FavoriteSkill', favoriteSkillSchema);
