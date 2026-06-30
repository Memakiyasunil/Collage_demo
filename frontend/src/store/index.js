import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './slices/skillsSlice';
import requestsReducer from './slices/requestsSlice';
import sessionsReducer from './slices/sessionsSlice';
import notificationsReducer from './slices/notificationsSlice';

const store = configureStore({
  reducer: {
    skills: skillsReducer,
    requests: requestsReducer,
    sessions: sessionsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable date objects in action payloads
        ignoredActions: ['sessions/setSessionDate'],
      },
    }),
});

export default store;
