import reducer from 'Src/utils/reducer';
import { SNACKBAR } from 'Src/constants/actionTypes';

const actionHandlers = {
  [SNACKBAR.INFO]: (s, a) => ({ ...s, message: a.payload, type: 'info' }),
  [SNACKBAR.SUCCESS]: (s, a) => ({ ...s, message: a.payload, type: 'success' }),
  [SNACKBAR.DANGER]: (s, a) => ({ ...s, message: a.payload, type: 'danger' }),
  [SNACKBAR.CLEAR]: s => ({ ...s, ...initialState })
};

const initialState = {
  message: null,
  type: 'info'
};

export default reducer(initialState, actionHandlers);
