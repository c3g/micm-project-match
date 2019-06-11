import reducer from 'Src/utils/reducer';
import { SET_PASSWORD } from 'Src/constants/actionTypes';

const actionHandlers = {
  [SET_PASSWORD.RECEIVE]: s => ({ ...s, complete: true })
};

const initialState = {
  complete: false
};

export default reducer(initialState, actionHandlers);
