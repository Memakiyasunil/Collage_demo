const AuditLog = require('../models/AuditLog');

/**
 * Creates an audit log entry.
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.action - One of the AUDIT_ACTIONS enum values
 * @param {string} params.resourceType - e.g. 'Skill', 'SkillSwapRequest'
 * @param {string} [params.resourceId]
 * @param {Object} [params.details] - Any extra metadata to store
 * @param {string} [params.ipAddress]
 */
const createAuditLog = async ({ userId, action, resourceType, resourceId, details, ipAddress }) => {
  try {
    await AuditLog.create({ userId, action, resourceType, resourceId, details, ipAddress });
  } catch (err) {
    // Audit log failure should never break the main flow
    console.error('[AuditLog] Failed to write audit entry:', err.message);
  }
};

/**
 * Express middleware factory that writes an audit log entry after a successful response.
 * Usage: router.post('/skills', protect, auditLogger('SKILL_CREATED', 'Skill'), createSkill)
 */
const auditLogger = (action, resourceType) => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = async function (body) {
      // Only log on success responses (2xx)
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const resourceId = body?.data?._id || body?.data?.id || null;
        await createAuditLog({
          userId: req.user.id,
          action,
          resourceType,
          resourceId,
          details: body?.data || null,
          ipAddress: req.ip,
        });
      }
      return originalJson(body);
    };

    next();
  };
};

module.exports = { createAuditLog, auditLogger };
