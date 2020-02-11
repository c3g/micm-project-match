import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { request, action } from 'Src/utils';
import { EMAIL, SNACKBAR } from 'Src/constants/actionTypes';

function* listEmails() {
  const data = yield call(request, '/admin/email/list');

  if (data.success) {
    yield put(action(EMAIL.LIST.RECEIVE, data.data));
  } else {
    yield put(action(EMAIL.LIST.ERROR, data.message));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.DANGER,
      message: data.message
    }));
  }
}

function* createEmail({ payload }) {
  const data = yield call(request, '/admin/email/create', payload);

  if (data.success) {
    yield put(action(EMAIL.CREATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.SUCCESS,
      message: 'Your email has been scheduled'
    }));
    yield put(push('/emails'))
  } else {
    yield put(action(EMAIL.CREATE.ERROR, data.message));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.DANGER,
      message: data.message
    }));
  }
}

function* updateEmail({ payload }) {
  const data = yield call(request, '/admin/email/update', payload);

  if (data.success) {
    yield put(action(EMAIL.UPDATE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.SUCCESS,
      message: 'Your email has been updated'
    }));
    yield put(push('/emails'))
  } else {
    yield put(action(EMAIL.UPDATE.ERROR, data.message));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.DANGER,
      message: data.message
    }));
  }
}

function* deleteEmail({ payload }) {
  const data = yield call(request, '/admin/email/delete', payload);

  if (data.success) {
    yield put(action(EMAIL.DELETE.RECEIVE, data.data));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.WARNING,
      message: 'Your email has been delete'
    }));
    yield put(push('/emails'))
  } else {
    yield put(action(EMAIL.DELETE.ERROR, data.message));
    yield put(action(SNACKBAR.SHOW, {
      type: SNACKBAR.DANGER,
      message: data.message
    }));
  }
}

function* emailsSaga() {
  yield takeLatest(EMAIL.LIST.REQUEST, listEmails);
  yield takeLatest(EMAIL.CREATE.REQUEST, createEmail);
  yield takeLatest(EMAIL.UPDATE.REQUEST, updateEmail);
  yield takeLatest(EMAIL.DELETE.REQUEST, deleteEmail);
}

export default emailsSaga;
