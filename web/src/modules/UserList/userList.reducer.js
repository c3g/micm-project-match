import reducer from 'Src/utils/reducer';
import { USER_LIST } from 'Src/constants/actionTypes';

const actionHandlers = {
  [USER_LIST.RECEIVE]: (s, a) => ({
    ...s,
    users: a.payload,
    isLoading: false
  }),
  [USER_LIST.REQUEST]: s => ({ ...s, isLoading: true }),
  [USER_LIST.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  users: [],
  isLoading: false
};

export default reducer(initialState, actionHandlers);
