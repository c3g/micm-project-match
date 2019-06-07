import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { reset } from 'redux-form';
import { FORGOT_PASSWORD, SNACKBAR } from 'Src/constants/actionTypes';

function* forgotPasswordSubmit({ payload }) {
  if (
    !payload.email ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(payload.email)
  ) {
    yield put(action(SNACKBAR.DANGER, 'Invalid email'));
    yield delay(3000);
    yield put(action(SNACKBAR.CLEAR));
    return;
  }
  const data = yield call(request, '/forgotpassword', payload);
  if (data.success) {
    yield put(action(SNACKBAR.SUCCESS, data.msg));
    yield put(action(FORGOT_PASSWORD.RECEIVE));
    yield put(reset('forgotPassword'));
  } else {
    yield put(action(SNACKBAR.DANGER, data.msg));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* forgotPasswordFormSaga() {
  yield takeLatest(FORGOT_PASSWORD.REQUEST, forgotPasswordSubmit);
}

export default forgotPasswordFormSaga;
