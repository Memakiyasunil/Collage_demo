const SkillSession = require('../models/SkillSession');
const SkillSwapRequest = require('../models/SkillSwapRequest');
const { createAuditLog } = require('../middleware/auditLogger');

const emitEvent = (req, event, data) => {
  const io = req.app.get('io');
  if (io) io.emit(event, data);
};

// GET /api/sessions
const getSessions = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    // Find sessions belonging to current user's requests
    const userRequestIds = await SkillSwapRequest.find({
      $or: [{ senderId: req.user.id }, { receiverId: req.user.id }],
    }).distinct('_id');

    const filter = { requestId: { $in: userRequestIds } };
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [sessions, total] = await Promise.all([
      SkillSession.find(filter)
        .populate({
          path: 'requestId',
          populate: [
            { path: 'senderId', select: 'name email' },
            { path: 'receiverId', select: 'name email' },
            { path: 'offeredSkillId', select: 'skillName' },
            { path: 'requestedSkillId', select: 'skillName' },
          ],
        })
        .sort('-sessionDate')
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      SkillSession.countDocuments(filter),
    ]);

    res.json({ success: true, count: sessions.length, total, page: Number(page), data: sessions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/sessions/:id
const getSessionById = async (req, res) => {
  try {
    const session = await SkillSession.findById(req.params.id)
      .populate({ path: 'requestId', populate: [{ path: 'senderId', select: 'name email' }, { path: 'receiverId', select: 'name email' }] })
      .lean();
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/sessions  [Auto-created or manual reschedule]
const createSession = async (req, res) => {
  try {
    // Validate session is not in the past
    if (new Date(req.body.sessionDate) <= new Date()) {
      return res.status(400).json({ success: false, message: 'Session date must be in the future.' });
    }
    const session = await SkillSession.create(req.body);
    await createAuditLog({ userId: req.user.id, action: 'SESSION_SCHEDULED', resourceType: 'SkillSession', resourceId: session._id });
    res.status(201).json({ success: true, data: session });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'A session already exists for this request.' });
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/sessions/:id  — update/reschedule
const updateSession = async (req, res) => {
  try {
    const session = await SkillSession.findById(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    // If rescheduling (changing date), validate future date
    if (req.body.sessionDate && new Date(req.body.sessionDate) <= new Date()) {
      return res.status(400).json({ success: false, message: 'Session date must be in the future.' });
    }

    const wasRescheduled = req.body.sessionDate && req.body.sessionDate !== session.sessionDate?.toISOString();
    Object.assign(session, req.body);
    await session.save();

    if (wasRescheduled) {
      await createAuditLog({ userId: req.user.id, action: 'SESSION_RESCHEDULED', resourceType: 'SkillSession', resourceId: session._id, details: { newDate: req.body.sessionDate } });
    }
    if (req.body.status === 'Completed') {
      await createAuditLog({ userId: req.user.id, action: 'SESSION_COMPLETED', resourceType: 'SkillSession', resourceId: session._id });
      // Update parent request status too
      await SkillSwapRequest.findByIdAndUpdate(session.requestId, { status: 'Completed' });
    }
    if (req.body.status === 'Cancelled') {
      await createAuditLog({ userId: req.user.id, action: 'SESSION_CANCELLED', resourceType: 'SkillSession', resourceId: session._id });
      emitEvent(req, 'SessionCancelled', { sessionId: session._id, requestId: session.requestId });
    }

    res.json({ success: true, data: session });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/sessions/:id
const deleteSession = async (req, res) => {
  try {
    const session = await SkillSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getSessions, getSessionById, createSession, updateSession, deleteSession };
