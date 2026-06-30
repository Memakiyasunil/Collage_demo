import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://13.53.122.32:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ─── Request Interceptor — attach JWT token ────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor — handle 401 ────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ─── Typed API helpers ─────────────────────────────────────────────
export const skillCategoryApi = {
  getAll: () => api.get('/skill-categories'),
  getById: (id) => api.get(`/skill-categories/${id}`),
  create: (data) => api.post('/skill-categories', data),
  update: (id, data) => api.put(`/skill-categories/${id}`, data),
  delete: (id) => api.delete(`/skill-categories/${id}`),
};

export const skillApi = {
  getAll: (params) => api.get('/skills', { params }),
  getById: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
  toggleArchive: (id) => api.patch(`/skills/${id}/archive`),
};

export const wantedSkillApi = {
  getAll: () => api.get('/wanted-skills'),
  create: (data) => api.post('/wanted-skills', data),
  update: (id, data) => api.put(`/wanted-skills/${id}`, data),
  delete: (id) => api.delete(`/wanted-skills/${id}`),
};

export const matchApi = {
  getMyMatches: () => api.get('/skill-matches'),
  getByUserId: (userId) => api.get(`/skill-matches/${userId}`),
};

export const requestApi = {
  getAll: (params) => api.get('/skill-requests', { params }),
  getById: (id) => api.get(`/skill-requests/${id}`),
  create: (data) => api.post('/skill-requests', data),
  updateStatus: (id, status) => api.put(`/skill-requests/${id}`, { status }),
  delete: (id) => api.delete(`/skill-requests/${id}`),
};

export const sessionApi = {
  getAll: (params) => api.get('/sessions', { params }),
  getById: (id) => api.get(`/sessions/${id}`),
  create: (data) => api.post('/sessions', data),
  update: (id, data) => api.put(`/sessions/${id}`, data),
  delete: (id) => api.delete(`/sessions/${id}`),
};

export const reviewApi = {
  getAll: (params) => api.get('/reviews', { params }),
  create: (data) => api.post('/reviews', data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const favoriteApi = {
  getAll: () => api.get('/favorites'),
  toggle: (skillId) => api.post('/favorites', { skillId }),
  remove: (id) => api.delete(`/favorites/${id}`),
};
