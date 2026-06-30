const mongoose = require('mongoose');

const STATUSES = ['Pending', 'Accepted', 'Rejected', 'Cancelled', 'Completed', 'Expired'];
const MEETING_TYPES = ['Online', 'In-Person'];
const DURATIONS = [30, 60, 90, 120];

const skillSwapRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required'],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Receiver ID is required'],
    },
    offeredSkillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Offered skill is required'],
    },
    requestedSkillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Requested skill is required'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required'],
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
    },
    meetingType: {
      type: String,
      enum: { values: MEETING_TYPES, message: '{VALUE} is not a valid meeting type' },
      default: 'Online',
    },
    duration: {
      type: Number,
      enum: { values: DURATIONS, message: 'Duration must be 30, 60, 90, or 120 minutes' },
      default: 60,
    },
    status: {
      type: String,
      enum: { values: STATUSES, message: '{VALUE} is not a valid status' },
      default: 'Pending',
    },
  },
  { timestamps: true }
);

skillSwapRequestSchema.index({ senderId: 1, status: 1 });
skillSwapRequestSchema.index({ receiverId: 1, status: 1 });
skillSwapRequestSchema.index({ offeredSkillId: 1 });
skillSwapRequestSchema.index({ requestedSkillId: 1 });

module.exports = mongoose.model('SkillSwapRequest', skillSwapRequestSchema);
