import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { APPLICATION, SNACKBAR } from 'Src/constants/actionTypes';

function* listApplications() {
  const data = yield call(request, '/application/list');
  if (data.success) yield put(action(APPLICATION.LIST.RECEIVE, data.data));
  else yield put(action(SNACKBAR.DANGER, data.message));
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* applicationListSaga() {
  yield takeLatest(APPLICATION.LIST.REQUEST, listApplications);
}

export default applicationListSaga;
