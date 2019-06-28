import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, PROJECT } from 'Src/constants/actionTypes';
import { organizations } from 'Src/config/data';
import { pick, omit, filter, identity, keys, compose } from 'ramda';

function* createProject({ payload }) {
  console.log(payload.data);
  const body = {
    ...omit(organizations, payload.data),
    organizations: compose(
      keys,
      filter(identity),
      pick(organizations)
    )(payload.data)
  };
  console.log(body);
  const data = yield call(request, '/project/create', body);
  if (data.success) yield put(action(PROJECT.CREATE.RECEIVE, data.data));
  else yield put(action(SNACKBAR.DANGER, data.message));
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* createProjectFormSaga() {
  yield takeLatest(PROJECT.CREATE.REQUEST, createProject);
}

export default createProjectFormSaga;
