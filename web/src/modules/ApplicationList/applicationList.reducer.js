import reducer from 'Src/utils/reducer';
import { APPLICATION } from 'Src/constants/actionTypes';

const actionHandlers = {
  [APPLICATION.LIST.REQUEST]: s => ({ ...s, isLoading: true }),
  [APPLICATION.LIST.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    applications: a.payload
  }),
  [APPLICATION.LIST.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  applications: []
};

export default reducer(initialState, actionHandlers);
