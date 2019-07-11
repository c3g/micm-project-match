import reducer from 'Src/utils/reducer';
import { APPLICATION } from 'Src/constants/actionTypes';

const actionHandlers = {
  [APPLICATION.CREATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [APPLICATION.CREATE.RECEIVE]: s => ({ ...s, isLoading: false }),
  [APPLICATION.CREATE.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false
};

export default reducer(initialState, actionHandlers);
