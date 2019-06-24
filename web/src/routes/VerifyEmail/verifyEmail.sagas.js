import { put, call, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { VERIFY_EMAIL } from 'Src/constants/actionTypes';

function* verifyEmail({ payload }) {
  const data = yield call(request, `/email/verify/${payload.token}`);
  if (data.success) yield put(action(VERIFY_EMAIL.RECEIVE));
  yield payload.push('/cvsetup');
}

function* verifyEmailSaga() {
  yield takeLatest(VERIFY_EMAIL.REQUEST, verifyEmail);
}

export default verifyEmailSaga;
