import { call, put, takeLatest } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { KEYWORD, KEYWORD_SELECT } from 'Src/constants/actionTypes';

function* keywordSearch({ payload }) {
  const data = yield call(request, `/tag/search?term=${payload}`);
  if (data.success) yield put(action(KEYWORD.FETCH.RECEIVE, data.data));
  else yield put(action(KEYWORD.FETCH.ERROR));
}

function* createKeyword({ payload }) {
  const data = yield call(request, '/tag/create', { text: payload });
  if (data.success) {
    yield put(action(KEYWORD.CREATE.RECEIVE));
    yield put(action(KEYWORD_SELECT, data.data));
  } else {
    yield put(action(KEYWORD.CREATE.ERROR));
  }
}

function* KeywordSelectorSaga() {
  yield takeLatest(KEYWORD.FETCH.REQUEST, keywordSearch);
  yield takeLatest(KEYWORD.CREATE.REQUEST, createKeyword);
}

export default KeywordSelectorSaga;
