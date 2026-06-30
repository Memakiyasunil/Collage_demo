const mongoose = require('mongoose');

const SESSION_STATUSES = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled', 'Missed'];

const skillSessionSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SkillSwapRequest',
      required: [true, 'Request ID is required'],
      unique: true, // one session per request
    },
    sessionDate: {
      type: Date,
      required: [true, 'Session date is required'],
      validate: {
        validator: function (v) {
          // Allow update without re-validating past dates (only on create)
          return this.isNew ? v > new Date() : true;
        },
        message: 'Session date must be in the future',
      },
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [15, 'Duration must be at least 15 minutes'],
    },
    meetingLink: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: { values: SESSION_STATUSES, message: '{VALUE} is not a valid session status' },
      default: 'Upcoming',
    },
  },
  { timestamps: true }
);

skillSessionSchema.index({ requestId: 1 });
skillSessionSchema.index({ status: 1 });
skillSessionSchema.index({ sessionDate: 1, status: 1 });

module.exports = mongoose.model('SkillSession', skillSessionSchema);
