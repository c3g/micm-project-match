import reducer from 'Src/utils/reducer';
import { AUTH, LOADING } from 'Src/constants/actionTypes';

const actionHandlers = {
  [AUTH.RECEIVE]: s => ({ ...s, loggedIn: true }),
  [AUTH.ERROR]: s => ({ ...s, loggedIn: false }),
  [LOADING.START]: s => ({ ...s, loading: true }),
  [LOADING.DONE]: s => ({ ...s, loading: false })
};

const initialState = {
  loggedIn: false,
  loading: true
};

export default reducer(initialState, actionHandlers);
