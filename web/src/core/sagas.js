import { all, put, call } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { registerFormSaga } from 'Src/modules/RegisterForm';
import { loginFormSaga } from 'Src/modules/LoginForm';
import { setPasswordFormSaga } from 'Src/modules/SetPasswordForm';
import { forgotPasswordFormSaga } from 'Src/modules/ForgotPasswordForm';
import { LOGIN } from 'Src/constants/actionTypes';

function* init() {
  process.env.NODE_ENV === 'development' &&
    console.log('🍪🍪🍪 cookies:', document.cookie || 'none');
  const data = yield call(request, `/user`);
  if (data.data && data.data.loggedIn)
    yield put(action(LOGIN.RECEIVE, data.data.user));
  else yield put(action(LOGIN.ERROR));
}

export function* rootSaga() {
  yield all([
    init(),
    registerFormSaga(),
    setPasswordFormSaga(),
    forgotPasswordFormSaga(),
    loginFormSaga()
  ]);
}

export default rootSaga;
