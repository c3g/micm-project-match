import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request, action } from 'Src/utils';
import { SNACKBAR, PROFESSOR_SETUP } from 'Src/constants/actionTypes';

function* setProfessorDetails({ payload }) {
  if (!payload.data.department || !payload.data.position) {
    yield put(action(SNACKBAR.DANGER, 'Please fill all fields'));
  } else if (payload.data.department > 150 || payload.data.position > 150) {
    yield put(action(SNACKBAR.DANGER, 'Maximum length allowed is 150'));
  } else {
    const data = yield call(request, '/professor/update', payload.data);
    if (data.success) {
      yield put(action(PROFESSOR_SETUP.RECEIVE, data.data));
      yield payload.push('/cvsetup');
    } else {
      yield put(action(SNACKBAR.DANGER, data.message));
    }
  }
  yield delay(3000);
  yield put(action(SNACKBAR.CLEAR));
}

function* professorSetupForm() {
  yield takeLatest(PROFESSOR_SETUP.REQUEST, setProfessorDetails);
}

export default professorSetupForm;
