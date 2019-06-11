import reducer from 'Src/utils/reducer';
import { FORGOT_PASSWORD } from 'Src/constants/actionTypes';

const actionHandlers = {
  [FORGOT_PASSWORD.RECEIVE]: (s, a) => ({ ...s, ...a.payload, complete: true })
};

const initialState = {
  email: '',
  complete: false
};

export default reducer(initialState, actionHandlers);
