import { call, takeLatest } from 'redux-saga/effects';
import { request } from 'Src/utils';
import { LOGOUT } from 'Src/constants/actionTypes';

function* logout({ payload }) {
  yield call(request, '/logout');
  yield payload.push('/');
}

function* logoutButtonSaga() {
  yield takeLatest(LOGOUT, logout);
}

export default logoutButtonSaga;
