import reducer from 'Src/utils/reducer';
import {
  OAUTH_DATA,
  SETUP,
  SETUP_REFILL,
  SETUP_FILLED
} from 'Src/constants/actionTypes';

const actionHandlers = {
  [SETUP.REQUEST]: s => ({ ...s, isLoading: true }),
  [SETUP.RECEIVE]: s => ({ ...s, complete: true, isLoading: false }),
  [SETUP.ERROR]: (s, a) => ({ ...s, ...a.payload, isLoading: false }),
  [OAUTH_DATA.RECEIVE]: (s, a) => ({ ...s, oauth: { ...a.payload } }),
  [SETUP_REFILL]: s => ({ ...s, complete: false }),
  [SETUP_FILLED]: s => ({ ...s, complete: true })
};

const initialState = {
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
