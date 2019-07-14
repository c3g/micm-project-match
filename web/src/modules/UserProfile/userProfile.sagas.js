import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, USER } from 'Src/constants/actionTypes';

function* fetchUser({ payload }) {
  const data = yield call(request, `/user/${payload.id}`);
  if (data.success) {
    yield put(action(USER.FETCH.RECEIVE, data.data));
  } else {
    yield put(action(USER.FETCH.ERROR));
    yield payload.push('/');
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* userSaga() {
  yield takeLatest(USER.FETCH.REQUEST, fetchUser);
}

export default userSaga;
