const mongoose = require('mongoose');

const AUDIT_ACTIONS = [
  'SKILL_CREATED',
  'SKILL_UPDATED',
  'SKILL_DELETED',
  'SKILL_ARCHIVED',
  'CATEGORY_CREATED',
  'CATEGORY_UPDATED',
  'CATEGORY_DELETED',
  'SWAP_REQUEST_SENT',
  'SWAP_REQUEST_ACCEPTED',
  'SWAP_REQUEST_REJECTED',
  'SWAP_REQUEST_CANCELLED',
  'SESSION_SCHEDULED',
  'SESSION_RESCHEDULED',
  'SESSION_COMPLETED',
  'SESSION_CANCELLED',
  'REVIEW_SUBMITTED',
  'REVIEW_DELETED',
  'FAVORITE_ADDED',
  'FAVORITE_REMOVED',
];

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: AUDIT_ACTIONS,
      required: true,
    },
    resourceType: {
      type: String,
      required: true, // e.g. 'Skill', 'SkillSwapRequest', 'SkillSession'
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    details: {
      type: mongoose.Schema.Types.Mixed, // arbitrary metadata snapshot
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
