import { call, put, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { PROJECT_SEARCH } from 'Src/constants/actionTypes';

function* searchProject({ payload }) {
  const data = yield call(request, `/project/search?term=${payload.search}`, {
    keywords: payload.keywords.map(keyword => keyword.id)
  });
  if (data.success) yield put(action(PROJECT_SEARCH.RECEIVE, data.data));
  else yield put(action(PROJECT_SEARCH.ERROR, data.data));
}

function* projectSearchbar() {
  yield takeLatest(PROJECT_SEARCH.REQUEST, searchProject);
}

export default projectSearchbar;
