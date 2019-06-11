import { combineReducers } from 'redux';
import { snackbarReducer } from 'Src/modules/Snackbar';
import { registerFormReducer } from 'Src/modules/RegisterForm';
import { appReducer } from 'Src/core/App';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  snackbar: snackbarReducer,
  app: appReducer,
  form: formReducer,
  register: registerFormReducer
});
