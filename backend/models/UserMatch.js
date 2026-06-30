const mongoose = require('mongoose');

const userMatchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    matchedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Matched user ID is required'],
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  { timestamps: true }
);

// Prevent duplicate match pairs
userMatchSchema.index({ userId: 1, matchedUserId: 1 }, { unique: true });
userMatchSchema.index({ userId: 1, matchScore: -1 }); // for sorted retrieval

module.exports = mongoose.model('UserMatch', userMatchSchema);
