import { call, put, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { PROJECT } from 'Src/constants/actionTypes';

function* fetchProject({ payload }) {
  const data = yield call(request, `/project/${payload.id}`);
  if (data.success) yield put(action(PROJECT.FETCH.RECEIVE, data.data));
  else yield payload.push('/');
}

function* setupFormSaga() {
  yield takeLatest(PROJECT.FETCH.REQUEST, fetchProject);
}

export default setupFormSaga;
