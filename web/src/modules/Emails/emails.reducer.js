import reducer from 'Src/utils/reducer';
import { EMAIL } from 'Src/constants/actionTypes';

const actionHandlers = {
  [EMAIL.LIST.REQUEST]: (s, a) => ({ ...s, isLoading: true }),
  [EMAIL.LIST.RECEIVE]: (s, a) => ({ ...s, isLoading: false, list: a.payload }),
  [EMAIL.LIST.ERROR]: (s, a) => ({
    ...s,
    isLoading: false,
    message: a.payload
  }),

  [EMAIL.CREATE.REQUEST]: (s, a) => ({ ...s, isLoading: true }),
  [EMAIL.CREATE.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    list: s.list.concat(a.payload)
  }),
  [EMAIL.CREATE.ERROR]: (s, a) => ({
    ...s,
    isLoading: false,
    message: a.payload
  }),

  [EMAIL.UPDATE.REQUEST]: (s, a) => ({ ...s, isLoading: true }),
  [EMAIL.UPDATE.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    list: s.list.map(e => (e.id === a.payload.id ? a : e))
  }),
  [EMAIL.UPDATE.ERROR]: (s, a) => ({
    ...s,
    isLoading: false,
    message: a.payload
  }),

  [EMAIL.DELETE.REQUEST]: (s, a) => ({ ...s, isLoading: true }),
  [EMAIL.DELETE.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    list: s.list.filter(e => (e.id === a.meta.id ? false : true))
  }),
  [EMAIL.DELETE.ERROR]: (s, a) => ({
    ...s,
    isLoading: false,
    message: a.payload
  })
};

const initialState = {
  isLoading: false,
  message: undefined,
  list: []
};

export default reducer(initialState, actionHandlers);
