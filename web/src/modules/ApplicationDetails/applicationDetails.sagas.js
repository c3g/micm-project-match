import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  SNACKBAR,
  APPROVE_APPLICATION,
  DISAPPROVE_APPLICATION
} from 'Src/constants/actionTypes';

function* approveApplication({ payload }) {
  const data = yield call(
    request,
    `/application/${payload.applicationId}/approve/`
  );
  if (data.success) {
    yield put(action(APPROVE_APPLICATION.RECEIVE));
    yield put(action(SNACKBAR.SUCCESS, 'Application approved'));
    yield payload.push('/applications');
  } else {
    yield put(action(APPROVE_APPLICATION.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* disapproveApplication({ payload }) {
  const data = yield call(
    request,
    `/application/${payload.applicationId}/disapprove/`
  );
  if (data.success) {
    yield put(action(APPROVE_APPLICATION.RECEIVE));
    yield put(action(SNACKBAR.SUCCESS, 'Application disapproved'));
    yield payload.push('/applications');
  } else {
    yield put(action(APPROVE_APPLICATION.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* applicationDetailsSaga() {
  yield takeLatest(APPROVE_APPLICATION.REQUEST, approveApplication);
  yield takeLatest(DISAPPROVE_APPLICATION.REQUEST, disapproveApplication);
}

export default applicationDetailsSaga;
