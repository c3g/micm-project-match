import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  MATCH_LIST,
  APPROVE_MATCH,
  DISAPPROVE_MATCH,
  SNACKBAR
} from 'Src/constants/actionTypes';

function* listMatches() {
  const data = yield call(request, '/admin/matches/list');
  if (data.success) {
    yield put(action(MATCH_LIST.RECEIVE, data.data));
  } else {
    yield put(action(MATCH_LIST.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* approveMatch({ payload }) {
  const data = yield call(request, `/admin/match/${payload}/approve`);
  if (data.success) {
    yield put(action(MATCH_LIST.REQUEST));
  } else {
    yield put(action(APPROVE_MATCH.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* disapproveMatch({ payload }) {
  console.log(payload);
  const data = yield call(request, `/admin/match/${payload}/disapprove`);
  if (data.success) {
    yield put(action(MATCH_LIST.REQUEST));
  } else {
    yield put(action(DISAPPROVE_MATCH.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* professorListSaga() {
  yield takeLatest(MATCH_LIST.REQUEST, listMatches);
  yield takeLatest(APPROVE_MATCH.REQUEST, approveMatch);
  yield takeLatest(DISAPPROVE_MATCH.REQUEST, disapproveMatch);
}

export default professorListSaga;
