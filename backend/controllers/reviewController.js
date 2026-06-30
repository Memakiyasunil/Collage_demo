const SkillReview = require('../models/SkillReview');
const SkillSession = require('../models/SkillSession');
const SkillSwapRequest = require('../models/SkillSwapRequest');
const { createAuditLog } = require('../middleware/auditLogger');

const emitEvent = (req, event, data) => {
  const io = req.app.get('io');
  if (io) io.emit(event, data);
};

// GET /api/reviews  — reviews for a user (revieweeId) or by reviewer
const getReviews = async (req, res) => {
  try {
    const { revieweeId, reviewerId, sessionId } = req.query;
    const filter = {};
    if (revieweeId) filter.revieweeId = revieweeId;
    if (reviewerId) filter.reviewerId = reviewerId;
    if (sessionId) filter.sessionId = sessionId;

    const reviews = await SkillReview.find(filter)
      .populate('reviewerId', 'name email')
      .populate('revieweeId', 'name email')
      .populate('sessionId')
      .sort('-createdAt')
      .lean();

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { sessionId, revieweeId, rating, review } = req.body;

    // Validate session exists and is Completed
    const session = await SkillSession.findById(sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found.' });
    if (session.status !== 'Completed') {
      return res.status(400).json({ success: false, message: 'You can only review a completed session.' });
    }

    // Validate reviewer is part of the session
    const request = await SkillSwapRequest.findById(session.requestId);
    const isParticipant =
      request.senderId.toString() === req.user.id || request.receiverId.toString() === req.user.id;
    if (!isParticipant) return res.status(403).json({ success: false, message: 'You were not part of this session.' });

    const newReview = await SkillReview.create({
      sessionId,
      reviewerId: req.user.id,
      revieweeId,
      rating,
      review,
    });

    await createAuditLog({ userId: req.user.id, action: 'REVIEW_SUBMITTED', resourceType: 'SkillReview', resourceId: newReview._id });
    emitEvent(req, 'ReviewSubmitted', { reviewId: newReview._id, revieweeId });

    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'You have already reviewed this session.' });
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/reviews/:id  [Admin or reviewer]
const deleteReview = async (req, res) => {
  try {
    const reviewDoc = await SkillReview.findById(req.params.id);
    if (!reviewDoc) return res.status(404).json({ success: false, message: 'Review not found.' });
    if (reviewDoc.reviewerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }
    await reviewDoc.deleteOne();
    await createAuditLog({ userId: req.user.id, action: 'REVIEW_DELETED', resourceType: 'SkillReview', resourceId: req.params.id });
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getReviews, createReview, deleteReview };
