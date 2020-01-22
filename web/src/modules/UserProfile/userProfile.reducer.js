import reducer from 'Src/utils/reducer';
import { USER } from 'Src/constants/actionTypes';

const actionHandlers = {
  [USER.FETCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [USER.FETCH.RECEIVE]: (s, a) => ({
    ...s,
    publicUser: a.payload,
    isLoading: false
  }),
  [USER.FETCH.ERROR]: s => ({ ...s, isLoading: false }),

  [USER.UPDATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [USER.UPDATE.RECEIVE]: (s, a) => ({
    ...s,
    user: a.payload,
    isLoading: false
  }),
  [USER.UPDATE.ERROR]: (s, a) => ({
    ...s,
    isLoading: false,
    message: a.payload
  })
};

const initialState = {
  isLoading: false,
  message: undefined,
  publicUser: undefined,
  user: undefined
};

export default reducer(initialState, actionHandlers);
