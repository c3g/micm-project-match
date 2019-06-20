import reducer from 'Src/utils/reducer';
import { OAUTH_DATA, SETUP } from 'Src/constants/actionTypes';

const actionHandlers = {
  [SETUP.REQUEST]: s => ({ ...s, isLoading: true }),
  [SETUP.RECEIVE]: (s, a) => ({
    ...s,
    ...a.payload,
    complete: true,
    isLoading: false
  }),
  [SETUP.ERROR]: (s, a) => ({ ...s, ...a.payload, isLoading: false }),
  [OAUTH_DATA.RECEIVE]: (s, a) => ({ ...s, oauth: { ...a.payload } })
};

const initialState = {
  email: '',
  complete: false,
  isLoading: false,
  oauth: {
    id: null,
    identifier: null,
    userId: null,
    firstName: '',
    lastName: '',
    email: ''
  }
};

export default reducer(initialState, actionHandlers);
