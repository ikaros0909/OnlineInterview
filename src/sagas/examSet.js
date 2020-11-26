import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_EXAMSET_REQUEST, LOAD_EXAMSET_SUCCESS, LOAD_EXAMSET_FAILURE } from '../reducers/examSet';

const loadExamSetAPI = (data) => {
  return axios.get('/api/rms/examSet', { params: data });
};

function* loadExamSet(action) {
  try {
    const response = yield call(loadExamSetAPI, action.data);
    const examSetInfo = response.data.result.data[0][0];
    yield put({
      type: LOAD_EXAMSET_SUCCESS,
      payload: { examSetInfo },
    });
  } catch (error) {
    yield put({
      type: LOAD_EXAMSET_FAILURE,
      error: error?.response.data || error,
    });
  }
}

function* watchLoadExamSet() {
  yield takeLatest(LOAD_EXAMSET_REQUEST, loadExamSet);
}

export default function* examSetSaga() {
  yield all([fork(watchLoadExamSet)]);
}
