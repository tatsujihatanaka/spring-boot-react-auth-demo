import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      // After successful login, fetch user details
      const userResponse = await axios.get(
        'http://localhost:8080/api/auth/me',
        { withCredentials: true }
      );
      return userResponse.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        'http://localhost:8080/api/auth/logout',
        {},
        { withCredentials: true }
      );
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/auth/me',
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
