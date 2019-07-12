import { call, put, all, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { PROJECT } from 'Src/constants/actionTypes';

function* fetchProject({ payload }) {
  const [projectData, applicationData] = yield all([
    call(request, `/project/${payload.id}`),
    call(request, `/application/${payload.id}/project`)
  ]);
  if (projectData.success && applicationData)
    yield put(
      action(PROJECT.FETCH.RECEIVE, {
        project: projectData.data,
        application: applicationData.data
      })
    );
  else yield payload.push('/');
}

function* setupFormSaga() {
  yield takeLatest(PROJECT.FETCH.REQUEST, fetchProject);
}

export default setupFormSaga;
