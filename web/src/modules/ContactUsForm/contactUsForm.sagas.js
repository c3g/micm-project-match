import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { CONTACT_US, SNACKBAR } from 'Src/constants/actionTypes';
import { reset } from 'redux-form';

function* sendMessage({ payload }) {
  const data = yield call(request, '/contact', payload);
  if (data.success) {
    yield put(action(CONTACT_US.RECEIVE));
    yield put(reset('contactUs'));
    yield put(action(SNACKBAR.SUCCESS, 'Message sent'));
  } else {
    yield put(action(CONTACT_US.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* contactUsFormSaga() {
  yield takeLatest(CONTACT_US.REQUEST, sendMessage);
}

export default contactUsFormSaga;
