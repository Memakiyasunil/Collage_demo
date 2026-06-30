/**
 * Skill Swap Real-Time Events (Socket.io)
 *
 * Events emitted by the server:
 *  - NewSkillRequest        → notify receiver of a new swap request
 *  - RequestAccepted        → notify sender their request was accepted
 *  - RequestRejected        → notify sender their request was rejected
 *  - SessionReminder        → remind participants 1h before session
 *  - SessionCancelled       → notify participants a session was cancelled
 *  - ReviewSubmitted        → notify reviewee they received a review
 *  - NotificationReceived   → generic notification push
 *  - NewMessage             → (placeholder for future chat integration)
 */

const registerSkillSwapEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Client registers with their userId so we can target them
    socket.on('register', (userId) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log(`[Socket.io] User ${userId} joined room user:${userId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });
};

/**
 * Helper to emit an event to a specific user's private room.
 * Usage inside controllers: emitToUser(io, userId, 'NewSkillRequest', payload)
 */
const emitToUser = (io, userId, event, payload) => {
  if (io && userId) {
    io.to(`user:${userId}`).emit(event, { ...payload, timestamp: new Date().toISOString() });
  }
};

/**
 * Session reminder scheduler — checks for upcoming sessions every minute
 * and emits reminders 60 minutes before start.
 */
const startSessionReminderScheduler = (io) => {
  const SkillSession = require('../models/SkillSession');
  const SkillSwapRequest = require('../models/SkillSwapRequest');

  setInterval(async () => {
    try {
      const now = new Date();
      const in60min = new Date(now.getTime() + 60 * 60 * 1000);
      const in61min = new Date(now.getTime() + 61 * 60 * 1000);

      const upcomingSessions = await SkillSession.find({
        status: 'Upcoming',
        sessionDate: { $gte: in60min, $lte: in61min },
      });

      for (const session of upcomingSessions) {
        const request = await SkillSwapRequest.findById(session.requestId).lean();
        if (!request) continue;

        const payload = { sessionId: session._id, sessionDate: session.sessionDate, duration: session.duration };
        emitToUser(io, request.senderId.toString(), 'SessionReminder', payload);
        emitToUser(io, request.receiverId.toString(), 'SessionReminder', payload);
      }
    } catch (err) {
      console.error('[SessionReminder] Scheduler error:', err.message);
    }
  }, 60 * 1000); // every minute
};

module.exports = { registerSkillSwapEvents, emitToUser, startSessionReminderScheduler };
