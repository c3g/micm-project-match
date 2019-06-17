import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, LOGIN } from 'Src/constants/actionTypes';

function* login({ payload }) {
  if (!payload.data.email || !payload.data.password) {
    yield put(action(SNACKBAR.DANGER, 'Fill all fields'));
  } else {
    const data = yield call(request, '/login', payload.data);
    if (data.success) {
      yield put(action(LOGIN.RECEIVE, data.data));
      yield payload.push('/');
    } else {
      yield put(action(LOGIN.ERROR));
      yield put(action(SNACKBAR.DANGER, data.message));
    }
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* loginFormSaga() {
  yield takeLatest(LOGIN.REQUEST, login);
}

export default loginFormSaga;
