import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, REGISTER, REGISTER_EMAIL } from 'Src/constants/actionTypes';

function* register({ payload }) {
  const { captchaResponse, ...userData } = payload.data;
  if (!userData.type) {
    yield put(action(SNACKBAR.DANGER, 'Please choose a role'));
  } else if (!payload.data.captchaResponse) {
    yield put(action(SNACKBAR.DANGER, 'Fill the captcha'));
  } else {
    const data = yield call(request, '/register', {
      captchaResponse,
      userData
    });
    if (data.success) yield put(action(REGISTER.RECEIVE, data.data));
    else yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* resendEmail({ payload }) {
  const data = yield call(request, `/register/resend/${payload.email}`);
  if (data.success) yield put(action(SNACKBAR.SUCCESS, 'E-mail resent'));
  else yield put(action(SNACKBAR.DANGER, data.message));
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* registerFormSaga() {
  yield takeLatest(REGISTER.REQUEST, register);
  yield takeLatest(REGISTER_EMAIL.REQUEST, resendEmail);
}

export default registerFormSaga;
