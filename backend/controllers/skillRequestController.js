const SkillSwapRequest = require('../models/SkillSwapRequest');
const SkillSession = require('../models/SkillSession');
const { createAuditLog } = require('../middleware/auditLogger');

const emitEvent = (req, event, data) => {
  const io = req.app.get('io');
  if (io) io.emit(event, data);
};

// GET /api/skill-requests  — sender or receiver
const getRequests = async (req, res) => {
  try {
    const { status, role = 'all', page = 1, limit = 20 } = req.query;
    const filter = {};

    if (role === 'sent') filter.senderId = req.user.id;
    else if (role === 'received') filter.receiverId = req.user.id;
    else filter.$or = [{ senderId: req.user.id }, { receiverId: req.user.id }];

    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [requests, total] = await Promise.all([
      SkillSwapRequest.find(filter)
        .populate('senderId', 'name email')
        .populate('receiverId', 'name email')
        .populate('offeredSkillId', 'skillName categoryId')
        .populate('requestedSkillId', 'skillName categoryId')
        .sort('-createdAt')
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      SkillSwapRequest.countDocuments(filter),
    ]);

    res.json({ success: true, count: requests.length, total, page: Number(page), data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/skill-requests/:id
const getRequestById = async (req, res) => {
  try {
    const request = await SkillSwapRequest.findById(req.params.id)
      .populate('senderId', 'name email')
      .populate('receiverId', 'name email')
      .populate('offeredSkillId')
      .populate('requestedSkillId')
      .lean();
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    // Only sender or receiver can view
    const isInvolved =
      request.senderId._id.toString() === req.user.id || request.receiverId._id.toString() === req.user.id;
    if (!isInvolved && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/skill-requests
const createRequest = async (req, res) => {
  try {
    const requestData = { ...req.body, senderId: req.user.id };

    // Cannot send request to yourself
    if (requestData.receiverId === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot send a request to yourself.' });
    }

    const request = await SkillSwapRequest.create(requestData);
    await createAuditLog({ userId: req.user.id, action: 'SWAP_REQUEST_SENT', resourceType: 'SkillSwapRequest', resourceId: request._id });

    emitEvent(req, 'NewSkillRequest', { requestId: request._id, receiverId: request.receiverId });

    res.status(201).json({ success: true, data: request });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/skill-requests/:id  — update status
const updateRequest = async (req, res) => {
  try {
    const request = await SkillSwapRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    const { status } = req.body;
    const userId = req.user.id;
    const senderId = request.senderId.toString();
    const receiverId = request.receiverId.toString();

    // Status transition rules
    const TRANSITIONS = {
      Pending: {
        Accepted: receiverId,
        Rejected: receiverId,
        Cancelled: senderId,
      },
      Accepted: {
        Cancelled: [senderId, receiverId].includes(userId) ? userId : null,
        Completed: [senderId, receiverId].includes(userId) ? userId : null,
      },
    };

    const allowed = TRANSITIONS[request.status];
    if (!allowed || !allowed[status]) {
      return res.status(400).json({ success: false, message: `Cannot transition from ${request.status} to ${status}.` });
    }
    if (allowed[status] !== userId && allowed[status] !== null) {
      return res.status(403).json({ success: false, message: 'You are not authorized to perform this action.' });
    }

    request.status = status;
    await request.save();

    // Auto-create session when accepted
    if (status === 'Accepted') {
      await SkillSession.create({
        requestId: request._id,
        sessionDate: request.preferredDate,
        duration: request.duration,
      });
      emitEvent(req, 'RequestAccepted', { requestId: request._id, senderId: request.senderId });
    } else if (status === 'Rejected') {
      emitEvent(req, 'RequestRejected', { requestId: request._id, senderId: request.senderId });
    }

    const actionMap = { Accepted: 'SWAP_REQUEST_ACCEPTED', Rejected: 'SWAP_REQUEST_REJECTED', Cancelled: 'SWAP_REQUEST_CANCELLED' };
    if (actionMap[status]) {
      await createAuditLog({ userId, action: actionMap[status], resourceType: 'SkillSwapRequest', resourceId: request._id });
    }

    res.json({ success: true, data: request });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/skill-requests/:id  [Sender or Admin]
const deleteRequest = async (req, res) => {
  try {
    const request = await SkillSwapRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    if (request.senderId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }
    if (!['Pending', 'Rejected', 'Cancelled', 'Expired'].includes(request.status)) {
      return res.status(400).json({ success: false, message: 'Only non-active requests can be deleted.' });
    }
    await request.deleteOne();
    res.json({ success: true, message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getRequests, getRequestById, createRequest, updateRequest, deleteRequest };
