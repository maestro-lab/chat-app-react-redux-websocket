import { takeEvery, select, call } from 'redux-saga/effects';
import { addMessage, addUser } from '../store/chatSlice';
import { initSocketSaga, sendMessage, joinChat } from './socketService';

const getCurrentUser = (state) => state.chat.currentUser;
const getToken = (state) => state.auth.token;

function* sendMessageSaga(action) {
  const currentUser = yield select(getCurrentUser);
  if (currentUser) yield call(sendMessage, action.payload, currentUser);
}

function* joinChatSaga(action) {
  const token = yield select(getToken);
  yield call(joinChat, action.payload, token);
}

function* initChatSaga() { yield call(initSocketSaga); }

export function* watchChatSaga() {
  yield takeEvery('chat/initSocket', initChatSaga);
  yield takeEvery('chat/addMessage', sendMessageSaga);
  yield takeEvery('chat/addUser', joinChatSaga);
}