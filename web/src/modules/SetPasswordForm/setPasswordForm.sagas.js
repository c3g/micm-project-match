import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, SET_PASSWORD } from 'Src/constants/actionTypes';

function* setPassword({ payload }) {
  if (
    !payload.data.password ||
    !payload.data.token ||
    payload.data.password.length < 8 ||
    payload.data.password.length > 30
  ) {
    yield put(
      action(SNACKBAR.DANGER, 'Password must be 8 - 30 charaters long')
    );
  } else {
    const data = yield call(request, '/setpassword', payload.data);
    if (data.success) yield put(action(SET_PASSWORD.RECEIVE));
    else yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* setPasswordFormSaga() {
  yield takeLatest(SET_PASSWORD.REQUEST, setPassword);
}

export default setPasswordFormSaga;
