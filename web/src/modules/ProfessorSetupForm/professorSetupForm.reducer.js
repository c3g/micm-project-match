import reducer from 'Src/utils/reducer';
import { PROFESSOR_SETUP } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROFESSOR_SETUP.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROFESSOR_SETUP.RECEIVE]: s => ({ ...s, isLoading: false }),
  [PROFESSOR_SETUP.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false
};

export default reducer(initialState, actionHandlers);
