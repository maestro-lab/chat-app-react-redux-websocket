import { takeEvery, put, call } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../store/authSlice';
import { addUser } from '../store/chatSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function* loginSaga(action) {
  try {
    const response = yield call(fetch, `${API_URL}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(action.payload)
    });
    const data = yield call([response, 'json']);
    if (!response.ok) throw new Error(data.error || 'Login failed');
    yield put(loginSuccess(data));
    yield put(addUser(data.user.username));
  } catch (error) { yield put(loginFailure(error.message)); }
}

export function* watchAuthSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
}