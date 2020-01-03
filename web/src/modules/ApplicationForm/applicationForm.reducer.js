import reducer from 'Src/utils/reducer';
import { APPLICATION } from 'Src/constants/actionTypes';

const actionHandlers = {
  [APPLICATION.CREATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [APPLICATION.CREATE.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    data: a.payload
  }),
  [APPLICATION.CREATE.ERROR]: s => ({ ...s, isLoading: false }),
  [APPLICATION.UPDATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [APPLICATION.UPDATE.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    data: a.payload
  }),
  [APPLICATION.UPDATE.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  data: undefined
};

export default reducer(initialState, actionHandlers);
