import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { EMAIL, SNACKBAR } from 'Src/constants/actionTypes';

function* listEmails() {
  const data = yield call(request, '/admin/email/list');

  if (data.success) {
    yield put(action(EMAIL.LIST.RECEIVE, data.data));
  } else {
    yield put(action(EMAIL.LIST.ERROR, data.message));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(5000);
  yield put(action(SNACKBAR.CLEAR));
}

function* emailsSaga() {
  yield takeLatest(EMAIL.LIST.REQUEST, listEmails);
}

export default emailsSaga;
