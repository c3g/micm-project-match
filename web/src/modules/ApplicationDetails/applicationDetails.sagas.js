import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, PASS_APPLICATION } from 'Src/constants/actionTypes';

function* passApplication({ payload }) {
  const data = yield call(request, `/application/${payload}/pass/`);
  if (data.success) {
    yield put(action(PASS_APPLICATION.RECEIVE, data.data));
  } else {
    yield put(action(PASS_APPLICATION.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* applicationDetailsSaga() {
  yield takeLatest(PASS_APPLICATION.REQUEST, passApplication);
}

export default applicationDetailsSaga;
