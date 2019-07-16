import reducer from 'Src/utils/reducer';
import { PROJECT } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROJECT.CREATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT.CREATE.RECEIVE]: s => ({ ...s, isLoading: false }),
  [PROJECT.CREATE.ERROR]: s => ({ ...s, isLoading: false }),
  [PROJECT.UPDATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT.UPDATE.RECEIVE]: s => ({ ...s, isLoading: false }),
  [PROJECT.UPDATE.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false
};

export default reducer(initialState, actionHandlers);
