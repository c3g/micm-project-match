import reducer from 'Src/utils/reducer';
import { PROFESSOR_LIST } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROFESSOR_LIST.RECEIVE]: (s, a) => ({ ...s, professors: a.payload })
};

const initialState = {
  professors: []
};

export default reducer(initialState, actionHandlers);
