import reducer from 'Src/utils/reducer';
import { LOGIN } from 'Src/constants/actionTypes';

const actionHandlers = {
  [LOGIN.REQUEST]: s => ({ ...s, isLoading: true }),
  [LOGIN.RECEIVE]: s => ({ ...s, isLoading: false }),
  [LOGIN.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false
};

export default reducer(initialState, actionHandlers);
