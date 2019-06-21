import { call, takeLatest } from 'redux-saga/effects';
import { request } from 'Src/utils';
import { VERIFY_EMAIL } from 'Src/constants/actionTypes';

function* verifyEmail({ payload }) {
  yield call(request, `/email/verify/${payload.token}`);
  yield payload.push('/');
}

function* verifyEmailSaga() {
  yield takeLatest(VERIFY_EMAIL.REQUEST, verifyEmail);
}

export default verifyEmailSaga;
