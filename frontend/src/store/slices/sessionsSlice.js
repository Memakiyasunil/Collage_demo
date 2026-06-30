import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/skillSwapApi';

export const fetchSessions = createAsyncThunk('sessions/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/sessions', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch sessions');
  }
});

export const updateSession = createAsyncThunk('sessions/update', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/sessions/${id}`, updates);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update session');
  }
});

export const fetchReviews = createAsyncThunk('sessions/fetchReviews', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reviews', { params });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews');
  }
});

export const submitReview = createAsyncThunk('sessions/submitReview', async (reviewData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/reviews', reviewData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to submit review');
  }
});

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    list: [],
    reviews: [],
    loading: false,
    error: null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchSessions.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.data; s.total = a.payload.total; })
      .addCase(fetchSessions.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(updateSession.fulfilled, (s, a) => {
        const idx = s.list.findIndex((sess) => sess._id === a.payload._id);
        if (idx !== -1) s.list[idx] = a.payload;
      })

      .addCase(fetchReviews.fulfilled, (s, a) => { s.reviews = a.payload; })

      .addCase(submitReview.fulfilled, (s, a) => { s.reviews.unshift(a.payload); });
  },
});

export default sessionsSlice.reducer;
