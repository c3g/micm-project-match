import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, LOGIN, APPLICATION } from 'Src/constants/actionTypes';

function* login({ payload }) {
  if (!payload.email || !payload.password) {
    yield put(action(SNACKBAR.DANGER, 'Fill all fields'));
    yield delay(10000);
    yield put(action(SNACKBAR.CLEAR));
    return;
  }

  const data = yield call(request, '/login', payload);

  if (data.success) {
    const apiData = data.data;

    yield put(action(LOGIN.RECEIVE, apiData));

    if (apiData.type !== 'ADMIN' && apiData.approved === false)
      yield put(
        action(
          SNACKBAR.WARNING,
          'Your account has not been approved yet. Your projects will not be visible.'
        )
      );

    if (apiData.type === 'STUDENT') {
      const applicationData = yield call(request, '/application/get');
      if (applicationData.success && applicationData.data)
        yield put(action(APPLICATION.CREATE.RECEIVE, applicationData.data));
    }
  } else {
    yield put(action(LOGIN.ERROR));
    yield put(action(SNACKBAR.DANGER, data.message));
    yield delay(10000);
    yield put(action(SNACKBAR.CLEAR));
  }
}

function* loginFormSaga() {
  yield takeLatest(LOGIN.REQUEST, login);
}

export default loginFormSaga;
