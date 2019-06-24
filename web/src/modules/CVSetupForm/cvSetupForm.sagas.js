import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, CV_UPLOAD } from 'Src/constants/actionTypes';

function* uploadCV({ payload }) {
  if (!payload.cv) {
    yield put(action(SNACKBAR.DANGER, 'Please add your CV'));
  } else {
    console.log(payload.cv);
    const body = new FormData();
    body.append('cv', payload.cv);
    for (let file of body.entries()) console.log(file);
    const data = yield call(request, '/cv/update', body, true);
    if (data.success) {
      yield put(action(CV_UPLOAD.RECEIVE, data.data));
      yield put(action(SNACKBAR.SUCCESS, 'CV Uploaded'));
      yield payload.push('/');
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
