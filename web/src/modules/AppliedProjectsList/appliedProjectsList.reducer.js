import reducer from 'Src/utils/reducer';
import { APPLIED_PROJECTS } from 'Src/constants/actionTypes';

const actionHandlers = {
  [APPLIED_PROJECTS.REQUEST]: s => ({ ...s, isLoading: true }),
  [APPLIED_PROJECTS.ERROR]: s => ({ ...s, isLoading: false }),
  [APPLIED_PROJECTS.RECEIVE]: (s, a) => ({
    ...s,
    appliedProjectsList: a.payload,
    isLoading: false
  })
};

const initialState = {
  appliedProjectsList: [],
  isLoading: false
};

export default reducer(initialState, actionHandlers);
