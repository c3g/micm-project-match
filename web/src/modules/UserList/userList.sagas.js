import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import {
  USER_LIST,
  MAKE_ADMIN,
  MAKE_STUDENT,
  MAKE_PROFESSOR,
  SNACKBAR
} from 'Src/constants/actionTypes';

function* listUsers() {
  const data = yield call(request, '/admin/users/list');
  if (data.success) {
    yield put(action(USER_LIST.RECEIVE, data.data));
  } else {
    yield put(action(USER_LIST.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* makeAdmin({ payload }) {
  const data = yield call(request, `/admin/users/${payload}/make-admin`);
  if (data.success) {
    yield put(action(USER_LIST.REQUEST));
  } else {
    yield put(action(MAKE_ADMIN.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* makeStudent({ payload }) {
  const data = yield call(request, `/admin/users/${payload}/make-student`);
  if (data.success) {
    yield put(action(USER_LIST.REQUEST));
  } else {
    yield put(action(MAKE_STUDENT.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* makeProfessor({ payload }) {
  const data = yield call(request, `/admin/users/${payload}/make-professor`);
  if (data.success) {
    yield put(action(USER_LIST.REQUEST));
  } else {
    yield put(action(MAKE_PROFESSOR.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* userListSaga() {
  yield takeLatest(USER_LIST.REQUEST, listUsers);
  yield takeLatest(MAKE_ADMIN.REQUEST, makeAdmin);
  yield takeLatest(MAKE_STUDENT.REQUEST, makeStudent);
  yield takeLatest(MAKE_PROFESSOR.REQUEST, makeProfessor);
}

export default userListSaga;
