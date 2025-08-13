import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  users: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

const API_URL = 'http://localhost:8080/api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, userData, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number; userData: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
