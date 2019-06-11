import reducer from 'Src/utils/reducer';
import { REGISTER } from 'Src/constants/actionTypes';

const actionHandlers = {
  [REGISTER.RECEIVE]: (s, a) => ({ ...s, ...a.payload, complete: true })
};

const initialState = {
  email: '',
  complete: false
};

export default reducer(initialState, actionHandlers);
