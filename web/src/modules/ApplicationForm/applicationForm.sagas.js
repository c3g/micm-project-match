import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, APPLICATION } from 'Src/constants/actionTypes';

function* createApplication({ payload }) {
  const formData = new FormData();
  formData.append('transcript', payload.transcript);
  formData.append('data', JSON.stringify(payload));

  const data = yield call(request, '/application/create', formData, true);

  if (data.success) {
    yield put(action(APPLICATION.CREATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SUCCESS, 'Application completed'));
  } else {
    yield put(action(APPLICATION.CREATE.ERROR, data.data));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* updateApplication({ payload }) {
  const formData = new FormData();
  if (payload.transcript) formData.append('transcript', payload.transcript);
  formData.append('data', JSON.stringify(payload));

  const data = yield call(request, '/application/update', formData, true);

  if (data.success) {
    yield put(action(APPLICATION.UPDATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SUCCESS, 'Application updated'));
  } else {
    yield put(action(APPLICATION.UPDATE.ERROR, data.data));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* applicationFormSaga() {
  yield takeLatest(APPLICATION.CREATE.REQUEST, createApplication);
  yield takeLatest(APPLICATION.UPDATE.REQUEST, updateApplication);
}

export default applicationFormSaga;
