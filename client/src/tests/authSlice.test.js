import { describe, it, expect } from 'vitest';
import authReducer, { loginRequest, loginSuccess, loginFailure, logout } from '../store/authSlice';

describe('authSlice', () => {
  const initialState = { user: null, token: null, isAuthenticated: false, isLoading: false, error: null };

  it('handles login request', () => {
    const state = authReducer(initialState, loginRequest());
    expect(state.isLoading).toBe(true);
  });

  it('handles login success', () => {
    const state = authReducer(initialState, loginSuccess({ user: { id: 1 }, token: 'abc' }));
    expect(state.isAuthenticated).toBe(true);
  });
});