import reducer from 'Src/utils/reducer';
import { PROJECT } from 'Src/constants/actionTypes';

const actionHandlers = {
  [PROJECT.FETCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [PROJECT.FETCH.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    project: a.payload.project,
    application: a.payload.application
  }),
  [PROJECT.FETCH.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  application: null,
  project: {
    id: 0,
    title: '',
    abstract: '',
    openForStudents: true,
    authorId: 0,
    firstName: '',
    lastName: '',
    department: '',
    email: '',
    tags: [],
    tagId: [],
    documents: []
  }
};

export default reducer(initialState, actionHandlers);
