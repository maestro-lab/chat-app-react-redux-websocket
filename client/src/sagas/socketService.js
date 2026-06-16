import { io } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { put, select, take, call } from 'redux-saga/effects';
import { addMessage, updateUsersList, setConnected, setError, loadHistory, userJoined, userLeft } from '../store/chatSlice';

let socket = null;
const getToken = (state) => state.auth.token;

export function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on('CHAT_HISTORY', (messages) => emit({ type: 'CHAT_HISTORY', payload: messages }));
    socket.on('MESSAGE_RECEIVED', (message) => emit({ type: 'MESSAGE_RECEIVED', payload: message }));
    socket.on('USERS_LIST', (users) => emit({ type: 'USERS_LIST', payload: users }));
    socket.on('USER_JOINED', (data) => emit({ type: 'USER_JOINED', payload: data }));
    socket.on('USER_LEFT', (data) => emit({ type: 'USER_LEFT', payload: data }));
    socket.on('disconnect', () => emit({ type: 'DISCONNECT' }));
    socket.on('connect_error', (error) => emit({ type: 'ERROR', payload: error.message }));
    return () => {
      socket.off('CHAT_HISTORY'); socket.off('MESSAGE_RECEIVED'); socket.off('USERS_LIST');
      socket.off('USER_JOINED'); socket.off('USER_LEFT'); socket.off('disconnect'); socket.off('connect_error');
    };
  });
}

export function* initSocketSaga() {
  try {
    const token = yield select(getToken);
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    socket = io(serverUrl, { auth: { token }, transports: ['websocket', 'polling'] });
    const socketChannel = yield call(createSocketChannel, socket);
    yield put(setConnected(true));

    while (true) {
      const event = yield take(socketChannel);
      switch (event.type) {
        case 'CHAT_HISTORY': yield put(loadHistory(event.payload)); break;
        case 'MESSAGE_RECEIVED': yield put(addMessage(event.payload)); break;
        case 'USERS_LIST': yield put(updateUsersList(event.payload)); break;
        case 'USER_JOINED': yield put(userJoined(event.payload)); break;
        case 'USER_LEFT': yield put(userLeft(event.payload)); break;
        case 'DISCONNECT': yield put(setConnected(false)); break;
        case 'ERROR': yield put(setError(event.payload)); break;
      }
    }
  } catch (error) { yield put(setError(error.message)); }
}

export function sendMessage(message, username) {
  if (socket) socket.emit('ADD_MESSAGE', { message, username });
}

export function joinChat(username, token) {
  if (socket) socket.emit('ADD_USER', { username, token });
}