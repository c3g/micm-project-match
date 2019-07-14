import reducer from 'Src/utils/reducer';
import { USER } from 'Src/constants/actionTypes';

const actionHandlers = {
  [USER.FETCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [USER.FETCH.RECEIVE]: (s, a) => ({
    ...s,
    publicUser: a.payload,
    isLoading: false
  }),
  [USER.FETCH.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  publicUser: {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    type: '',
    cvUploaded: false,
    professor: null
  },
  user: {
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    type: '',
    cvUploaded: false,
    professor: null
  }
};

export default reducer(initialState, actionHandlers);
