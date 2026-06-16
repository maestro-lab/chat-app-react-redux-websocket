import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, token: localStorage.getItem('token') || null,
  isAuthenticated: false, isLoading: false, error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => { state.isLoading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.user = action.payload.user; state.token = action.payload.token;
      state.isAuthenticated = true; state.isLoading = false;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => { state.isLoading = false; state.error = action.payload; },
    logout: (state) => {
      state.user = null; state.token = null; state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;