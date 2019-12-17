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

function* deleteProject({ payload }) {
  const result = yield call(request, `/project/${payload.id}/delete`, true);
  if (result.success)
    yield put(
      action(PROJECT.DELETE.RECEIVE, {
        id: payload.id
      })
    );
  else
    yield put(
      action(PROJECT.DELETE.ERROR, {
        id: payload.id
      })
    );

  window.location.href = '/projects';
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

function* createDocument({ payload }) {
  const formData = new FormData();
  payload.files.forEach(file => formData.append('files', file));
  formData.append('data', JSON.stringify({ id: payload.id }));
  const data = yield call(request, `/document/create`, formData, true);
  if (data.success)
    yield put(
      action(PROJECT.FETCH.REQUEST, {
        id: payload.id,
        push: payload.push
      })
    );
}

function* setupFormSaga() {
  yield takeLatest(PROJECT.FETCH.REQUEST, fetchProject);
  yield takeLatest(PROJECT.DELETE.REQUEST, deleteProject);
  yield takeLatest(DOCUMENT.DELETE.REQUEST, deleteDocument);
  yield takeLatest(DOCUMENT.CREATE.REQUEST, createDocument);
}

export default setupFormSaga;
