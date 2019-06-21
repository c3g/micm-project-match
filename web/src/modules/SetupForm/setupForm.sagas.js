import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { pickBy, identity } from 'ramda';
import { OAUTH_DATA, SNACKBAR, SETUP } from 'Src/constants/actionTypes';

function* setup({ payload }) {
  if (!payload.data.type) {
    yield put(action(SNACKBAR.DANGER, 'Please choose a role'));
  } else {
    const body = pickBy(identity, payload.data);
    const data = yield call(request, '/user/update', body);
    if (data.success) yield put(action(SETUP.RECEIVE, data.data));
    else yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* oauthData() {
  const data = yield call(request, `/user/oauth`);
  if (data.success) yield put(action(OAUTH_DATA.RECEIVE, data.data));
  else yield put(action(OAUTH_DATA.ERROR));
}

function* setupFormSaga() {
  yield takeLatest(SETUP.REQUEST, setup);
  yield takeLatest(OAUTH_DATA.REQUEST, oauthData);
}

export default setupFormSaga;
