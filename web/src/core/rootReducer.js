import { combineReducers } from 'redux';
import { snackbarReducer } from 'Src/modules/Snackbar';
import { registerFormReducer } from 'Src/modules/RegisterForm';
import { loginFormReducer } from 'Src/modules/LoginForm';
import { setupFormReducer } from 'Src/modules/SetupForm';
import { forgotPasswordFormReducer } from 'Src/modules/ForgotPasswordForm';
import { setPasswordFormReducer } from 'Src/modules/SetPasswordForm';
import { professorSetupFormReducer } from 'Src/modules/ProfessorSetupForm';
import { cvSetupFormReducer } from 'Src/modules/CVSetupForm';
import { createProjectFormReducer } from 'Src/modules/CreateProjectForm';
import { projectSearchbarReducer } from 'Src/modules/ProjectSearchbar';
import { projectListReducer } from 'Src/modules/ProjectList';
import { projectDetailsReducer } from 'Src/modules/ProjectDetails';
import { keywordSelectorReducer } from 'Src/modules/KeywordSelector';
import { applicationFormReducer } from 'Src/modules/ApplicationForm';
import { appReducer } from 'Src/core/App';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  snackbar: snackbarReducer,
  app: appReducer,
  form: formReducer,
  register: registerFormReducer,
  forgotPassword: forgotPasswordFormReducer,
  projectList: projectListReducer,
  applicationForm: applicationFormReducer,
  keywordSelector: keywordSelectorReducer,
  projectDetails: projectDetailsReducer,
  projectSearchbar: projectSearchbarReducer,
  createProject: createProjectFormReducer,
  cvSetup: cvSetupFormReducer,
  professorSetup: professorSetupFormReducer,
  setPassword: setPasswordFormReducer,
  login: loginFormReducer,
  setup: setupFormReducer
});
