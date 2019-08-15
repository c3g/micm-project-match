import { all, put, call } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { registerFormSaga } from 'Src/modules/RegisterForm';
import { loginFormSaga } from 'Src/modules/LoginForm';
import { setupFormSaga } from 'Src/modules/SetupForm';
import { logoutButtonSaga } from 'Src/modules/LogoutButton';
import { setPasswordFormSaga } from 'Src/modules/SetPasswordForm';
import { forgotPasswordFormSaga } from 'Src/modules/ForgotPasswordForm';
import { professorSetupFormSaga } from 'Src/modules/ProfessorSetupForm';
import { cvSetupFormSaga } from 'Src/modules/CVSetupForm';
import { createProjectFormSaga } from 'Src/modules/CreateProjectForm';
import { projectSearchbarSaga } from 'Src/modules/ProjectSearchbar';
import { projectListSaga } from 'Src/modules/ProjectList';
import { verifyEmailSaga } from 'Src/routes/VerifyEmail';
import { projectDetailsSaga } from 'Src/modules/ProjectDetails';
import { applicationFormSaga } from 'Src/modules/ApplicationForm';
import { applicationListSaga } from 'Src/modules/ApplicationList';
import { userProfileSaga } from 'Src/modules/UserProfile';
import { keywordSelectorSaga } from 'Src/modules/KeywordSelector';
import { applicationDetailsSaga } from 'Src/modules/ApplicationDetails';
import { appliedProjectsListSaga } from 'Src/modules/AppliedProjectsList';
import { contactUsFormSaga } from 'Src/modules/ContactUsForm';
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
    verifyEmailSaga(),
    projectSearchbarSaga(),
    projectListSaga(),
    createProjectFormSaga(),
    cvSetupFormSaga(),
    professorSetupFormSaga(),
    forgotPasswordFormSaga(),
    loginFormSaga(),
    setupFormSaga(),
    logoutButtonSaga(),
    keywordSelectorSaga(),
    userProfileSaga(),
    applicationFormSaga(),
    applicationListSaga(),
    projectDetailsSaga(),
    applicationDetailsSaga(),
    appliedProjectsListSaga(),
    contactUsFormSaga()
  ]);
}

export default rootSaga;
