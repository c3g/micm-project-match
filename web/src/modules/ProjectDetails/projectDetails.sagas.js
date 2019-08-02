import { call, put, all, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { PROJECT, DOCUMENT } from 'Src/constants/actionTypes';

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

function* deleteDocument({ payload }) {
  const data = yield call(request, `/document/${payload.id}/delete`);
  if (data.success)
    yield put(
      action(PROJECT.FETCH.REQUEST, {
        id: payload.projectId,
        push: payload.push
      })
    );
}

function* setupFormSaga() {
  yield takeLatest(PROJECT.FETCH.REQUEST, fetchProject);
  yield takeLatest(DOCUMENT.DELETE.REQUEST, deleteDocument);
}

export default setupFormSaga;
