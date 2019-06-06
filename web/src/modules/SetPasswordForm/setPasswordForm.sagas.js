import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { request, action } from 'Src/utils';

function* setPassword({ payload }) {
  if (
    !payload.data.password ||
    !payload.data.token ||
    payload.data.password.length < 8 ||
    payload.data.password.length > 30
  )
    yield put(
      action('SET_SNACKBAR', {
        type: 'danger',
        message: 'Password must be 8 - 30 charaters long'
      })
    );
  else {
    const data = yield call(request, '/setpassword', payload.data);
    if (data.success) {
      yield put(action('SET_SNACKBAR', { type: 'success', message: data.msg }));
      yield payload.push('/login');
    } else
      yield put(action('SET_SNACKBAR', { type: 'danger', message: data.msg }));
  }
  yield delay(3000);
  yield put(action('CLEAR_SNACKBAR'));
}

function* setPasswordFormSaga() {
  yield takeLatest('FETCH_SET_PASSWORD_BEGIN', setPassword);
}

export default setPasswordFormSaga;
