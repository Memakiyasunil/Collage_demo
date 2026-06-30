const mongoose = require('mongoose');

const skillReviewSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SkillSession',
      required: [true, 'Session ID is required'],
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reviewer ID is required'],
    },
    revieweeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reviewee ID is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      trim: true,
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
  },
  { timestamps: true }
);

// One review per session per reviewer
skillReviewSchema.index({ sessionId: 1, reviewerId: 1 }, { unique: true });
skillReviewSchema.index({ revieweeId: 1 });
skillReviewSchema.index({ rating: 1 });

module.exports = mongoose.model('SkillReview', skillReviewSchema);
