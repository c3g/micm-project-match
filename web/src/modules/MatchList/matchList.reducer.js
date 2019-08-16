import reducer from 'Src/utils/reducer';
import { MATCH_LIST } from 'Src/constants/actionTypes';

const actionHandlers = {
  [MATCH_LIST.RECEIVE]: (s, a) => ({ ...s, matches: a.payload })
};

const initialState = {
  matches: []
};

export default reducer(initialState, actionHandlers);
