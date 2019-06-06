import { all, put } from 'redux-saga/effects';
import { action } from 'Src/utils';
import { registerFormSaga } from 'Src/modules/RegisterForm';
import { setPasswordFormSaga } from 'Src/modules/SetPasswordForm';

function* init() {
  process.env.NODE_ENV === 'development' &&
    console.log('🍪🍪🍪 cookies:', document.cookie || 'none');
  if (document.cookie.includes('connect.sid'))
    yield put(action('SET_LOGGED_IN', true));
  yield put(action('SET_LOADING', false));
}

export function* rootSaga() {
  yield all([init(), registerFormSaga(), setPasswordFormSaga()]);
}

export default rootSaga;
