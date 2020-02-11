import reducer from 'Src/utils/reducer';
import { SNACKBAR } from 'Src/constants/actionTypes';

const actionHandlers = {
  [SNACKBAR.SHOW]:    (s, a) => ({ ...s, shown: true }),
  [SNACKBAR.HIDE]:    (s, a) => ({ ...s, shown: false }),
  [SNACKBAR.INFO]:    (s, a) => ({ ...s, shown: true, message: a.payload, type: 'info' }),
  [SNACKBAR.SUCCESS]: (s, a) => ({ ...s, shown: true, message: a.payload, type: 'success' }),
  [SNACKBAR.DANGER]:  (s, a) => ({ ...s, shown: true, message: a.payload, type: 'danger' }),
  [SNACKBAR.WARNING]: (s, a) => ({ ...s, shown: true, message: a.payload, type: 'warning' }),
  [SNACKBAR.CLEAR]:   s => ({ ...s, ...initialState })
};

const initialState = {
  shown: false,
  message: null,
  type: 'info'
};

export default reducer(initialState, actionHandlers);
