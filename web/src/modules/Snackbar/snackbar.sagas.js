import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR } from 'Src/constants/actionTypes';

function* show({ payload }) {
  yield put(action(payload.type, payload.message));
  yield delay(8000);
  yield put(action(SNACKBAR.CLEAR));
}

function* snackbarSaga() {
  yield takeLatest(SNACKBAR.SHOW, show);
}

export default snackbarSaga;
