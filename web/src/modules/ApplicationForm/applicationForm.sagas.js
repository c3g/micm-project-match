import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, APPLICATION } from 'Src/constants/actionTypes';

function* createApplication({ payload }) {
  const data = yield call(request, '/application/create', payload.data);
  if (data.success) {
    yield put(action(APPLICATION.CREATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SUCCESS, 'Application completed'));
    yield payload.push(`/project/${payload.data.project_id}`);
  } else {
    yield put(action(APPLICATION.CREATE.ERROR, data.data));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* applicationFormSaga() {
  yield takeLatest(APPLICATION.CREATE.REQUEST, createApplication);
}

export default applicationFormSaga;
