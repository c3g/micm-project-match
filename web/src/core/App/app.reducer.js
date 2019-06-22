import reducer from 'Src/utils/reducer';
import { LOGIN, SETUP, LOGOUT } from 'Src/constants/actionTypes';

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
  [LOGOUT.RECEIVE]: s => ({ ...s, loggedIn: false, user: null })
};

const initialState = {
  loggedIn: false,
  isLoading: true,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    type: ''
  }
};

export default reducer(initialState, actionHandlers);
