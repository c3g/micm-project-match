import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  PROFESSOR_LIST,
  APPROVE_PROFESSOR,
  DISAPPROVE_PROFESSOR,
  SNACKBAR
} from 'Src/constants/actionTypes';

function* listProfessors() {
  const data = yield call(request, '/admin/professors/list');
  if (data.success) {
    yield put(action(PROFESSOR_LIST.RECEIVE, data.data));
  } else {
    yield put(action(PROFESSOR_LIST.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* approveProfessor({ payload }) {
  const data = yield call(request, `/admin/professors/${payload}/approve`);
  if (data.success) {
    yield put(action(PROFESSOR_LIST.REQUEST));
  } else {
    yield put(action(APPROVE_PROFESSOR.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* disapproveProfessor({ payload }) {
  console.log(payload);
  const data = yield call(request, `/admin/professors/${payload}/disapprove`);
  if (data.success) {
    yield put(action(PROFESSOR_LIST.REQUEST));
  } else {
    yield put(action(DISAPPROVE_PROFESSOR.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* professorListSaga() {
  yield takeLatest(PROFESSOR_LIST.REQUEST, listProfessors);
  yield takeLatest(APPROVE_PROFESSOR.REQUEST, approveProfessor);
  yield takeLatest(DISAPPROVE_PROFESSOR.REQUEST, disapproveProfessor);
}

export default professorListSaga;
