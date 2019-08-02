import reducer from 'Src/utils/reducer';
import {
  KEYWORD,
  KEYWORD_SELECT,
  KEYWORD_CLEAR,
  KEYWORD_DESELECT
} from 'Src/constants/actionTypes';

const actionHandlers = {
  [KEYWORD.FETCH.REQUEST]: s => ({ ...s, isLoading: true }),
  [KEYWORD.FETCH.RECEIVE]: (s, a) => ({
    ...s,
    isLoading: false,
    keywords: a.payload
  }),
  [KEYWORD.FETCH.ERROR]: s => ({ ...s, isLoading: false }),
  [KEYWORD_DESELECT]: (s, a) => ({
    ...s,
    selected: s.selected.filter(keyword => keyword.id !== a.payload.id)
  }),
  [KEYWORD_SELECT]: (s, a) => ({
    ...s,
    selected: [
      ...s.selected.filter(keyword => keyword.id !== a.payload.id),
      a.payload
    ]
  }),
  [KEYWORD_CLEAR]: s => ({ ...s, keywords: [], selected: [] }),
  [KEYWORD.CREATE.REQUEST]: s => ({ ...s, isLoading: true }),
  [KEYWORD.CREATE.RECEIVE]: s => ({ ...s, isLoading: false }),
  [KEYWORD.CREATE.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false,
  keywords: [],
  selected: []
};

export default reducer(initialState, actionHandlers);
