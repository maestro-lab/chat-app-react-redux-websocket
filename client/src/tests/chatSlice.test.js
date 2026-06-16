import { describe, it, expect } from 'vitest';
import chatReducer, { addMessage, addUser, updateUsersList, setConnected, setError, loadHistory } from '../store/chatSlice';

describe('chatSlice', () => {
  const initialState = { messages: [], users: [], currentUser: null, isConnected: false, isLoading: false, error: null };

  it('adds message', () => {
    const state = chatReducer(initialState, addMessage({ id: 1, username: 'test', content: 'Hello' }));
    expect(state.messages).toHaveLength(1);
  });

  it('sets user', () => {
    const state = chatReducer(initialState, addUser('test_user'));
    expect(state.currentUser).toBe('test_user');
  });
});