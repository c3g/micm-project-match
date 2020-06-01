import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, PROJECT, USER_PROJECT } from 'Src/constants/actionTypes';

function* listProjects() {
  const data = yield call(request, '/project/list');
  if (data.success) {
    yield put(action(PROJECT.LIST.RECEIVE, data.data));
  } else {
    yield put(action(PROJECT.LIST.ERROR, data.data));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* listUserProjects() {
  const data = yield call(request, '/project/list-from-user');
  if (data.success) {
    yield put(action(PROJECT.LIST.RECEIVE, data.data));
  } else {
    yield put(action(PROJECT.LIST.ERROR, data.data));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* projectList() {
  yield takeLatest(PROJECT.LIST.REQUEST, listProjects);
  yield takeLatest(USER_PROJECT.LIST.REQUEST, listUserProjects);
}

export default projectList;
