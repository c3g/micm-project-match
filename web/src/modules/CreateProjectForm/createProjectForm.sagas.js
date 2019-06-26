import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, PROJECT } from 'Src/constants/actionTypes';

function* createProject({ payload }) {
  const data = yield call(request, '/project/create', payload.data);
  if (data.success) yield put(action(PROJECT.CREATE.RECEIVE, data.data));
  else yield put(action(SNACKBAR.DANGER, data.message));
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* createProjectFormSaga() {
  yield takeLatest(PROJECT.CREATE.REQUEST, createProject);
}

export default createProjectFormSaga;
