import reducer from 'Src/utils/reducer';
import { PROJECT_SEARCH } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROJECT_SEARCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT_SEARCH.RECEIVE]: s => ({ ...s, isLoading: false }),
  [PROJECT_SEARCH.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false
};

export default reducer(initialState, actionHandlers);
