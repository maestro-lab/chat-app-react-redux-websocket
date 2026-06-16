import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [], users: [], currentUser: null,
  isConnected: false, isLoading: false, error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => { state.messages.push(action.payload); },
    addUser: (state, action) => { state.currentUser = action.payload; },
    updateUsersList: (state, action) => { state.users = action.payload; },
    setConnected: (state, action) => { state.isConnected = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    loadHistory: (state, action) => { state.messages = action.payload; },
    userJoined: (state, action) => {
      state.messages.push({ type: 'system', content: `${action.payload.username} joined`, created_at: action.payload.time });
    },
    userLeft: (state, action) => {
      state.messages.push({ type: 'system', content: `${action.payload.username} left`, created_at: action.payload.time });
    },
    initSocket: () => {},
  },
});

export const { addMessage, addUser, updateUsersList, setConnected, setError, loadHistory, userJoined, userLeft, initSocket } = chatSlice.actions;
export default chatSlice.reducer;