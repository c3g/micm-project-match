import reducer from 'Src/utils/reducer';

const actionHandlers = {
  SET_SNACKBAR: (s, a) => ({ ...s, ...a.payload }),
  CLEAR_SNACKBAR: s => ({ ...s, ...initialState })
};

const initialState = {
  message: null,
  type: 'info'
};

export default reducer(initialState, actionHandlers);
