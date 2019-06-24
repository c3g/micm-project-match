import reducer from 'Src/utils/reducer';
import { CV_UPLOAD } from 'Src/constants/actionTypes';

const actionHandlers = {
  [CV_UPLOAD.REQUEST]: s => ({ ...s, isLoading: true }),
  [CV_UPLOAD.RECEIVE]: s => ({ ...s, isLoading: false }),
  [CV_UPLOAD.ERROR]: s => ({ ...s, isLoading: false })
};

const initialState = {
  isLoading: false
};

export default reducer(initialState, actionHandlers);
