import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  OAUTH_DATA,
  SNACKBAR,
  SETUP,
  SETUP_EMAIL
} from 'Src/constants/actionTypes';

function* setup({ payload }) {
  if (!payload.data.type) {
    yield put(action(SNACKBAR.DANGER, 'Please choose a role'));
  } else {
    const data = yield call(request, '/user/update', payload.data);
    if (data.success) yield put(action(SETUP.RECEIVE, data.data));
    else yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* resendEmail({ payload }) {
  const data = yield call(request, `/setup/resend/${payload.email}`);
  if (data.success) yield put(action(SNACKBAR.SUCCESS, 'E-mail resent'));
  else yield put(action(SNACKBAR.DANGER, data.message));
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* oauthData() {
  const data = yield call(request, `/user/oauth`);
  if (data.success) yield put(action(OAUTH_DATA.RECEIVE, data.data));
  else yield put(action(OAUTH_DATA.ERROR));
}

function* setupFormSaga() {
  yield takeLatest(SETUP.REQUEST, setup);
  yield takeLatest(SETUP_EMAIL.REQUEST, resendEmail);
  yield takeLatest(OAUTH_DATA.REQUEST, oauthData);
}

export default setupFormSaga;
