import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/skillSwapApi';

export const fetchRequests = createAsyncThunk('requests/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/skill-requests', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch requests');
  }
});

export const sendRequest = createAsyncThunk('requests/send', async (requestData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/skill-requests', requestData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to send request');
  }
});

export const updateRequestStatus = createAsyncThunk('requests/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/skill-requests/${id}`, { status });
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update request');
  }
});

export const deleteRequest = createAsyncThunk('requests/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/skill-requests/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete request');
  }
});

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    list: [],
    loading: false,
    error: null,
    total: 0,
  },
  reducers: {
    addIncomingRequest: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchRequests.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.data; s.total = a.payload.total; })
      .addCase(fetchRequests.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(sendRequest.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(sendRequest.rejected, (s, a) => { s.error = a.payload; })

      .addCase(updateRequestStatus.fulfilled, (s, a) => {
        const idx = s.list.findIndex((r) => r._id === a.payload._id);
        if (idx !== -1) s.list[idx] = a.payload;
      })

      .addCase(deleteRequest.fulfilled, (s, a) => { s.list = s.list.filter((r) => r._id !== a.payload); });
  },
});

export const { addIncomingRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
