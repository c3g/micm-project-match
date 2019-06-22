import { call, takeLatest, put } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { LOGOUT } from 'Src/constants/actionTypes';

function* logout() {
  yield call(request, '/logout');
  yield put(action(LOGOUT.RECEIVE));
}

function* logoutButtonSaga() {
  yield takeLatest(LOGOUT.REQUEST, logout);
}

export default logoutButtonSaga;
