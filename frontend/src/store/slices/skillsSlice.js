import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/skillSwapApi';

// ─── Async Thunks ─────────────────────────────────────────────────
export const fetchSkills = createAsyncThunk('skills/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/skills', { params });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch skills');
  }
});

export const fetchMySkills = createAsyncThunk('skills/fetchMine', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/skills/my');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch your skills');
  }
});

export const createSkill = createAsyncThunk('skills/create', async (skillData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/skills', skillData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create skill');
  }
});

export const updateSkill = createAsyncThunk('skills/update', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/skills/${id}`, updates);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update skill');
  }
});

export const deleteSkill = createAsyncThunk('skills/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/skills/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete skill');
  }
});

export const toggleArchiveSkill = createAsyncThunk('skills/archive', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/skills/${id}/archive`);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to archive skill');
  }
});

export const fetchCategories = createAsyncThunk('skills/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/skill-categories');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
  }
});

export const fetchWantedSkills = createAsyncThunk('skills/fetchWanted', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/wanted-skills');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch wanted skills');
  }
});

export const fetchMatches = createAsyncThunk('skills/fetchMatches', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/skill-matches');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch matches');
  }
});

export const fetchFavorites = createAsyncThunk('skills/fetchFavorites', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/favorites');
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch favorites');
  }
});

// ─── Slice ────────────────────────────────────────────────────────
const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    list: [],
    mySkills: [],
    wantedSkills: [],
    matches: [],
    favorites: [],
    categories: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchSkills.fulfilled, (s, a) => { s.loading = false; s.list = a.payload.data; s.total = a.payload.total; s.page = a.payload.page; })
      .addCase(fetchSkills.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchMySkills.fulfilled, (s, a) => { s.mySkills = a.payload.data; })

      .addCase(createSkill.fulfilled, (s, a) => { s.mySkills.unshift(a.payload); })
      .addCase(createSkill.rejected, (s, a) => { s.error = a.payload; })

      .addCase(updateSkill.fulfilled, (s, a) => {
        const idx = s.mySkills.findIndex((sk) => sk._id === a.payload._id);
        if (idx !== -1) s.mySkills[idx] = a.payload;
      })

      .addCase(deleteSkill.fulfilled, (s, a) => { s.mySkills = s.mySkills.filter((sk) => sk._id !== a.payload); })

      .addCase(toggleArchiveSkill.fulfilled, (s, a) => {
        const idx = s.mySkills.findIndex((sk) => sk._id === a.payload._id);
        if (idx !== -1) s.mySkills[idx] = a.payload;
      })

      .addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload; })

      .addCase(fetchWantedSkills.fulfilled, (s, a) => { s.wantedSkills = a.payload; })

      .addCase(fetchMatches.pending, (s) => { s.loading = true; })
      .addCase(fetchMatches.fulfilled, (s, a) => { s.loading = false; s.matches = a.payload; })
      .addCase(fetchMatches.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchFavorites.fulfilled, (s, a) => { s.favorites = a.payload; });
  },
});

export const { clearError } = skillsSlice.actions;
export default skillsSlice.reducer;
