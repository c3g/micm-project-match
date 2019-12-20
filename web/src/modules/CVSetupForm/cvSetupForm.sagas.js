import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, CV_UPLOAD } from 'Src/constants/actionTypes';
import { push } from 'connected-react-router';

function* uploadCV({ payload }) {
  if (!payload.cv) {
    yield put(action(SNACKBAR.DANGER, 'Please add your CV'));
  } else {
    const body = new FormData();
    body.append('cv', payload.cv);
    const data = yield call(request, '/cv/update', body, true);
    if (data.success) {
      yield put(action(CV_UPLOAD.RECEIVE, data.data));
      yield put(action(SNACKBAR.SUCCESS, 'CV Uploaded'));
      yield put(push('/'));
    } else {
      yield put(action(SNACKBAR.DANGER, data.message));
    }
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* cvSetupForm() {
  yield takeLatest(CV_UPLOAD.REQUEST, uploadCV);
}

export default cvSetupForm;
