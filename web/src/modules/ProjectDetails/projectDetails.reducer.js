import reducer from 'Src/utils/reducer';
import { PROJECT } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROJECT.FETCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT.FETCH.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    project: a.payload
  }),
  [PROJECT.FETCH.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  project: {
    id: 0,
    title: '',
    abstract: '',
    openForStudents: true,
    authorId: 0,
    firstName: '',
    lastName: '',
    department: '',
    email: ''
  }
};

export default reducer(initialState, actionHandlers);
