import reducer from 'Src/utils/reducer';
import {
  CV_UPLOAD,
  PROFESSOR_SETUP,
  LOGIN,
  SETUP,
  LOGOUT,
  VERIFY_EMAIL
} from 'Src/constants/actionTypes';

const actionHandlers = {
  [LOGIN.RECEIVE]: (s, a) => ({
    ...s,
    loggedIn: true,
    isLoading: false,
    user: a.payload
  }),
  [SETUP.RECEIVE]: (s, a) => ({
    ...s,
    user: { ...s.user, ...a.payload }
  }),
  [LOGIN.ERROR]: s => ({ ...s, loggedIn: false, isLoading: false }),
  [LOGOUT.RECEIVE]: s => ({ ...s, loggedIn: false, user: {} }),
  [PROFESSOR_SETUP.RECEIVE]: (s, a) => ({
    ...s,
    user: { ...s.user, professor: a.payload }
  }),
  [VERIFY_EMAIL.RECEIVE]: s => ({
    ...s,
    user: { ...s.user, verified: true }
  }),
  [CV_UPLOAD.RECEIVE]: (s, a) => ({
    ...s,
    user: a.payload
  })
};

const initialState = {
  loggedIn: false,
  isLoading: true,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    type: '',
    cvUploaded: false
  }
};

export default reducer(initialState, actionHandlers);
