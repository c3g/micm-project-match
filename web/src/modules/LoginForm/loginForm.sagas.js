import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, LOGIN } from 'Src/constants/actionTypes';

function* login({ payload }) {
  if (!payload.email || !payload.password) {
    yield put(action(SNACKBAR.DANGER, 'Fill all fields'));
  } else {
    const data = yield call(request, '/login', payload);
    if (data.success) {
      yield put(action(LOGIN.RECEIVE, data.data));
      if (data.data.type === 'PROFESSOR' && data.data.approved === false)
        yield put(
          action(
            SNACKBAR.WARNING,
            'Your account has not been approved yet. Your projects will not be visible.'
          )
        );
    } else {
      yield put(action(LOGIN.ERROR));
      yield put(action(SNACKBAR.DANGER, data.message));
    }
  }
  yield delay(10000);
  yield put(action(SNACKBAR.CLEAR));
}

function* loginFormSaga() {
  yield takeLatest(LOGIN.REQUEST, login);
}

export default loginFormSaga;
