import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  APPLIED_PROJECTS,
  SNACKBAR,
  CLAIM_PROJECT
} from 'Src/constants/actionTypes';

function* getAppliedProjects() {
  const data = yield call(request, '/application/applied/list');
  if (data.success) {
    yield put(action(APPLIED_PROJECTS.RECEIVE, data.data));
  } else {
    yield put(action(APPLIED_PROJECTS.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* claimProject({ payload }) {
  const data = yield call(request, `/application/claim/${payload}`);
  if (data.success) {
    yield put(action(APPLIED_PROJECTS.REQUEST));
    yield put(action(CLAIM_PROJECT.RECEIVE));
    yield put(action(SNACKBAR.SUCCESS, 'Project Claimed'));
  } else {
    yield put(action(CLAIM_PROJECT.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* appliedProjectsListSaga() {
  yield takeLatest(APPLIED_PROJECTS.REQUEST, getAppliedProjects);
  yield takeLatest(CLAIM_PROJECT.REQUEST, claimProject);
}

export default appliedProjectsListSaga;
