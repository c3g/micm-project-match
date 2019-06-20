import { combineReducers } from 'redux';
import { snackbarReducer } from 'Src/modules/Snackbar';
import { registerFormReducer } from 'Src/modules/RegisterForm';
import { loginFormReducer } from 'Src/modules/LoginForm';
import { setupFormReducer } from 'Src/modules/SetupForm';
import { forgotPasswordFormReducer } from 'Src/modules/ForgotPasswordForm';
import { setPasswordFormReducer } from 'Src/modules/SetPasswordForm';
import { appReducer } from 'Src/core/App';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  snackbar: snackbarReducer,
  app: appReducer,
  form: formReducer,
  register: registerFormReducer,
  forgotPassword: forgotPasswordFormReducer,
  setPassword: setPasswordFormReducer,
  login: loginFormReducer,
  setup: setupFormReducer
});
