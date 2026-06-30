import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addNotification } from '../store/slices/notificationsSlice';
import { addIncomingRequest } from '../store/slices/requestsSlice';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const EVENT_MESSAGES = {
  NewSkillRequest: '📬 You have a new skill swap request!',
  RequestAccepted: '✅ Your skill swap request was accepted!',
  RequestRejected: '❌ Your skill swap request was rejected.',
  SessionReminder: '⏰ You have a session starting in 1 hour.',
  SessionCancelled: '🚫 A session has been cancelled.',
  ReviewSubmitted: '⭐ Someone reviewed your session.',
  NotificationReceived: '🔔 New notification',
};

/**
 * useSocket — initializes Socket.io connection and maps events to Redux actions.
 * @param {string} userId — the logged-in user's ID (null = skip connection)
 */
const useSocket = (userId) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[Socket.io] Connected:', socket.id);
      socket.emit('register', userId);
    });

    // ─── Event Handlers ───────────────────────────────────────────
    const handleNotificationEvent = (event) => (payload) => {
      const message = EVENT_MESSAGES[event] || 'New notification';
      dispatch(addNotification({ type: event, message, payload }));
      toast(message, { icon: message.charAt(0), duration: 5000 });
    };

    socket.on('NewSkillRequest', (payload) => {
      dispatch(addIncomingRequest(payload));
      handleNotificationEvent('NewSkillRequest')(payload);
    });

    socket.on('RequestAccepted', handleNotificationEvent('RequestAccepted'));
    socket.on('RequestRejected', handleNotificationEvent('RequestRejected'));
    socket.on('SessionReminder', handleNotificationEvent('SessionReminder'));
    socket.on('SessionCancelled', handleNotificationEvent('SessionCancelled'));
    socket.on('ReviewSubmitted', handleNotificationEvent('ReviewSubmitted'));
    socket.on('NotificationReceived', handleNotificationEvent('NotificationReceived'));

    socket.on('disconnect', () => console.log('[Socket.io] Disconnected'));
    socket.on('connect_error', (err) => console.error('[Socket.io] Connection error:', err.message));

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, dispatch]);

  return socketRef;
};

export default useSocket;
