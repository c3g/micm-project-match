import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { request, action } from 'Src/utils';
import { SNACKBAR, PROJECT } from 'Src/constants/actionTypes';
import { organizations } from 'Src/config/data';
import { pick, omit, filter, identity, keys, compose } from 'ramda';

function* createProject({ payload }) {
  const body = {
    ...omit(organizations, payload.data),
    organizations: compose(
      keys,
      filter(identity),
      pick(organizations)
    )(payload.data)
  };
  const formData = new FormData();
  payload.files.forEach(file => formData.append('files', file));
  formData.append('data', JSON.stringify(body));
  const data = yield call(request, '/project/create', formData, true);
  if (data.success) {
    yield put(action(PROJECT.CREATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SUCCESS, 'Project Created'));
    yield put(push(`/projects/${data.data.id}`));
  } else {
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* updateProject({ payload }) {
  const body = {
    ...omit(organizations, payload.data),
    organizations: compose(
      keys,
      filter(identity),
      pick(organizations)
    )(payload.data)
  };
  const formData = new FormData();
  payload.files.forEach(file => formData.append('files', file));
  formData.append('data', JSON.stringify(body));
  const data = yield call(request, '/project/update', formData, true);
  if (data.success) {
    yield put(action(PROJECT.UPDATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SUCCESS, 'Project Updated'));
    yield put(push(`/project/${data.data.id}`));
  } else {
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* createProjectFormSaga() {
  yield takeLatest(PROJECT.CREATE.REQUEST, createProject);
  yield takeLatest(PROJECT.UPDATE.REQUEST, updateProject);
}

export default createProjectFormSaga;
