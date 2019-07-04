import reducer from 'Src/utils/reducer';
import { PROJECT, PROJECT_SEARCH } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROJECT.LIST.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT_SEARCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT_SEARCH.ERROR]: s => ({ ...s, isLoading: true }),
  [PROJECT.LIST.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    projects: a.payload
  }),
  [PROJECT_SEARCH.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    projects: a.payload
  }),
  [PROJECT.LIST.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  projects: []
};

export default reducer(initialState, actionHandlers);
