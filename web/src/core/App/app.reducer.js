import reducer from 'Src/utils/reducer';
import { LOGIN } from 'Src/constants/actionTypes';

const actionHandlers = {
  [LOGIN.RECEIVE]: (s, a) => ({
    ...s,
    loggedIn: true,
    isLoading: false,
    user: a.payload
  }),
  [LOGIN.ERROR]: s => ({ ...s, loggedIn: false, isLoading: false })
};

const initialState = {
  loggedIn: false,
  isLoading: true,
  user: {}
};

export default reducer(initialState, actionHandlers);
