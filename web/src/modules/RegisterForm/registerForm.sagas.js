import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';

function* register({ payload }) {
  if (!payload.data.captchaResponse) return;
  const { captchaResponse, ...userData } = payload.data;
  const data = yield call(request, '/register', {
    captchaResponse,
    userData
  });
  if (data.success) {
    yield put(
      action('SET_SNACKBAR', { type: 'success', message: data.message })
    );
    yield payload.push('/');
  } else {
    yield put(
      action('SET_SNACKBAR', { type: 'danger', message: data.message })
    );
  }
  yield delay(3000);
  yield put(action('CLEAR_SNACKBAR'));
}

function* registerFormSaga() {
  yield takeLatest('FETCH_REGISTER_BEGIN', register);
}

export default registerFormSaga;
