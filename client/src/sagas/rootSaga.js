import { all } from 'redux-saga/effects';
import { watchChatSaga } from './chatSaga';
import { watchAuthSaga } from './authSaga';

export default function* rootSaga() {
  yield all([watchChatSaga(), watchAuthSaga()]);
}