import reducer from 'Src/utils/reducer';
import { PROFESSOR_LIST } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROFESSOR_LIST.RECEIVE]: (s, a) => ({
    ...s,
    professors: a.payload,
    isLoading: false
  }),
  [PROFESSOR_LIST.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROFESSOR_LIST.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  professors: [],
  isLoading: false
};

export default reducer(initialState, actionHandlers);
