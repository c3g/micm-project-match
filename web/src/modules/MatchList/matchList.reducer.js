import reducer from 'Src/utils/reducer';
import { MATCH_LIST } from 'Src/constants/actionTypes';

const actionHandlers = {
  [MATCH_LIST.RECEIVE]: (s, a) => ({
    ...s,
    matches: a.payload,
    isLoading: false
  }),
  [MATCH_LIST.REQUEST]: s => ({ ...s, isLoading: true }),
  [MATCH_LIST.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  matches: []
};

export default reducer(initialState, actionHandlers);
