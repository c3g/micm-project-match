import reducer from 'Src/utils/reducer';
import { SETUP } from 'Src/constants/actionTypes';

const actionHandlers = {
  [SETUP.REQUEST]: s => ({ ...s, isLoading: true }),
  [SETUP.RECEIVE]: (s, a) => ({
    ...s,
    ...a.payload,
    complete: true,
    isLoading: false
  }),
  [SETUP.ERROR]: (s, a) => ({ ...s, ...a.payload, isLoading: false })
};

const initialState = {
  email: '',
  complete: false,
  isLoading: false
};

export default reducer(initialState, actionHandlers);
